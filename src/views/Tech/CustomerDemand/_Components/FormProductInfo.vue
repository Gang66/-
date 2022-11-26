<template>
  <div class="tech-customerDemand-form-product-info pt-4 pl-2 pr-2 flex justify-around">
    <!-- #region 左侧 -->
    <div class="w-650 border-solid border rounded relative" :class="data.configInfo.left != '' ? 'border-blue-400' : 'border-gray-300'">
      <!-- #region 主产品 -->
      <div>
        <div class="p-4 flex">
          <div class="flex-grow pt-1">
            <div class="border-solid border-blue-500 border-l-8 pl-2 text-base h-5 leading-5">基础参数</div>
          </div>
          <div class="flex-none">
            <el-button type="success" link @click="getValveModelAnalysis">
              <el-icon><el-icon-switch /></el-icon>解析
            </el-button>
            <el-button type="danger" link @click="openSelectAttribute(false)" v-if="data.configInfo.right == 'productAttribute'">
              <el-icon><el-icon-circle-plus /></el-icon>关闭属性
            </el-button>
            <el-button type="primary" link @click="openSelectAttribute(true)" v-else>
              <el-icon><el-icon-circle-plus /></el-icon>属性
            </el-button>

            <el-button type="warning" link @click="addProductMinMain" v-if="!compuIsDecompose">
              <el-icon><el-icon-setting /></el-icon>配件
            </el-button>
          </div>
        </div>
        <div class="product-info-form pl-4 pr-4 pb-4">
          <el-form ref="ruleFormRef" :model="data.ProductInfo" :rules="rules" status-icon :hide-required-asterisk="true" :show-message="false" label-width="100px">
            <el-row class="product-info-row" :gutter="11">
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="客用名称" prop="ClientName">
                  <el-input v-model="data.ProductInfo.ClientName" placeholder="请输入客用名称" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="系统名称" prop="SystemName">
                  <el-select class="w-full" v-model="data.ProductInfo.SystemName" placeholder="请选择系统名称" v-if="data.ProductSystemNameArr.length > 1">
                    <el-option v-for="(item, index) in data.ProductSystemNameArr" :key="index" :label="item" :value="item" />
                  </el-select>
                  <el-input v-model="data.ProductInfo.SystemName" placeholder="请输入系统名称" v-else />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="客用型号" prop="ClientModel">
                  <el-input v-model="data.ProductInfo.ClientModel" placeholder="请输入客用型号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="系统型号" prop="SystemModel">
                  <el-input v-model="data.ProductInfo.SystemModel" placeholder="请输入系统型号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="客用规格" prop="ClientSpecification">
                  <el-input v-model="data.ProductInfo.ClientSpecification" placeholder="请输入客用规格" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="系统规格" prop="SystemSpecification">
                  <el-input v-model="data.ProductInfo.SystemSpecification" placeholder="请输入系统规格" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="压力" prop="Pressure">
                  <el-input v-model="data.ProductInfo.Pressure" placeholder="请输入压力" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="材质" prop="Materials">
                  <el-input v-model="data.ProductInfo.Materials" placeholder="请输入材质" />
                </el-form-item>
              </el-col>

              <!-- #region 动态属性 (1输入框、2单选框、3复选框、4下拉框) -->
              <el-col :md="24" :lg="12" v-for="(item, index) in data.ProductInfo.PropertysList" :key="item.Id">
                <el-form-item class="w-full" :label="item.Name" :prop="'PropertysList.' + index + '.Value'" :rules="item.IsRequired==1?rules.ComInput:[]" v-if="item.PropertyTypeInfo === 1">
                  <el-input v-model="item.Value" :placeholder="'请输入' + item.Name" />
                </el-form-item>
                <el-form-item class="w-full" :label="item.Name" :prop="'PropertysList.' + index + '.Value'" :rules="item.IsRequired==1?rules.ComSelect:[]" v-else-if="item.PropertyTypeInfo === 3">
                  <el-select class="w-full" v-model="item.ArrayData" multiple collapse-tags collapse-tags-tooltip>
                    <el-option v-for="row in item.ItemVlaVos" :key="row.Id" :label="row.Value" :value="row.Id" />
                  </el-select>
                </el-form-item>
                <el-form-item class="w-full" :label="item.Name" :prop="'PropertysList.' + index + '.Value'" :rules="item.IsRequired==1?rules.ComSelect:[]" v-else>
                  <el-select class="w-full" v-model="item.Value">
                    <el-option v-for="row in item.ItemVlaVos" :key="row.Id" :label="row.Value" :value="row.Id" />
                  </el-select>
                </el-form-item>
              </el-col>
              <!-- #endregion -->

              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="常规类别" prop="RoutineType">
                  <el-select v-model="data.ProductInfo.RoutineType" class="w-full" placeholder="请选择常规类别" @blur="productSyncData($event)">
                    <el-option v-for="item in dictionaryData.ClassOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="质量等级" prop="QualityLevel">
                  <el-select v-model="data.ProductInfo.QualityLevel" class="w-full" placeholder="请选择质量等级" @blur="productSyncData($event)">
                    <el-option v-for="item in dictionaryData.QualityOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="单位" prop="UnitInfo">
                  <el-select v-model="data.ProductInfo.UnitInfo" class="w-full" placeholder="请选择单位" @blur="productSyncData($event)">
                    <el-option v-for="item in dictionaryData.UnitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="数量" prop="Quantity">
                  <el-input v-model="data.ProductInfo.Quantity" placeholder="请输入数量" @blur="productSyncData($event)" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="可替代性" prop="Fungible">
                  <el-select v-model="data.ProductInfo.Fungible" class="w-full" placeholder="请选择可替代性" @blur="productSyncData($event)">
                    <el-option v-for="item in dictionaryData.FungibilityOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item class="w-full" label="技术难度" prop="TechHard">
                  <el-select v-model="data.ProductInfo.TechHard" class="w-full" placeholder="请选择技术难度" @blur="productSyncData($event)">
                    <el-option v-for="item in dictionaryData.DifficultyOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="24">
                <el-form-item class="w-full" label="备注">
                  <el-input v-model="data.ProductInfo.Remark" placeholder="请输入备注" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
          <div class="w-full h-11" v-for="item in countHighSurplusNum" :key="item"><!-- 防止阀体或者附件属性比产品多 导致页面高度不够  -->></div>
        </div>
      </div>
      <!-- #endregion -->
      <div class="absolute inset-0 z-50 bg-white rounded" v-if="data.configInfo.left != ''">
        <template v-if="data.configInfo.left == 'productEdit'">
          <FormEditValve title="阀体编辑" v-if="currValveInfo.SystemModel != ''" v-model:valve="currValveInfo" :dictionaryData="dictionaryData" @updata="updataRightParts($event)" />
        </template>
        <template v-else-if="data.configInfo.left == 'partsEdit'">
          <FormEditAccessory title="配件编辑" v-if="currPartsInfo.AccessoriesTypeId > 0" v-model:parts="currPartsInfo" :dictionaryData="dictionaryData" @updata="updataRightParts($event)" />
        </template>
        <template v-else-if="data.configInfo.left == 'partsSeletc'">
          <FormSeletcAccessories title="选择配件" :productInfo="data.ProductInfo" @updata="updataSeletcAccessories($event)" />
        </template>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region 右侧 -->
    <div class="w-500 border-solid border rounded relative" :class="data.configInfo.right != '' ? 'border-blue-400' : 'border-gray-300'" v-if="compuIsDecompose || productInfo.IsSetAttribute">
      <!-- 加载配件 -->
      <FormProductInfoRightParts ref="productInfoRightPartsRef" v-model:product="data.ProductInfo.ProductMinMain" v-model:parts="data.ProductInfo.AccessoriesList" @updata="updataRightParts($event)" />
      <div class="absolute inset-0 z-50 bg-white rounded" v-if="data.configInfo.right != ''">
        <template v-if="data.configInfo.right == 'productAttribute'">
          <FormSelectAttribute title="主产品属性" :productInfo="data.ProductInfo" @updata="updataSelectAttribute($event, data.ProductInfo)" v-if="data.configInfo.left == ''" />
          <FormSelectAttribute title="阀体属性属性" :productInfo="currValveInfo" @updata="updataSelectAttribute($event, currValveInfo)" v-else />
        </template>
        <template v-else="data.configInfo.right == 'partsAttribute'">
          <FormSelectAttribute title="配件属性" :productInfo="currPartsInfo" @updata="updataSelectAttribute($event, currPartsInfo)" />
        </template>
      </div>
    </div>
    <!-- #endregion -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed, SetupContext } from 'vue'
import { FormRules, ElMessage } from 'element-plus'
import { getGBValveModelAnalysis } from '/@/api/tech/ProductFormula'
import FormProductInfoRightParts from './FormProductInfoRightParts.vue'
import FormSeletcAccessories from './FormSeletcAccessories.vue'
import FormEditAccessory from './FormEditAccessory.vue'
import FormEditValve from './FormEditValve.vue'
import FormSelectAttribute from './FormSelectAttribute.vue'

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref()
  // 表单提交
  const submitForm = async () => {
    const valid = await ruleFormRef.value.validate().catch(() => {})
    if (valid) {
      data.submitProductInfo()
    }
  }

  //校验
  const rules = reactive<FormRules>({
    ClientName: [{ required: true, message: '请填写', trigger: 'blur' }],
    SystemName: [{ required: true, message: '请填写', trigger: 'blur' }],
    ClientModel: [{ required: true, message: '请填写', trigger: 'blur' }],
    SystemModel: [{ required: true, message: '请填写', trigger: 'blur' }],
    ClientSpecification: [{ required: true, message: '请填写', trigger: 'blur' }],
    SystemSpecification: [{ required: true, message: '请填写', trigger: 'blur' }],
    Pressure: [{ required: true, message: '请填写', trigger: 'blur' }],
    Materials: [{ required: true, message: '请填写', trigger: 'blur' }],
    RoutineType: [{ required: true, message: '请选择', trigger: 'blur' }],
    QualityLevel: [{ required: true, message: '请选择', trigger: 'blur' }],
    UnitInfo: [{ required: true, message: '请选择', trigger: 'blur' }],
    Quantity: [{ required: true, message: '请填写', trigger: 'blur' }],
    Fungible: [{ required: true, message: '请选择', trigger: 'blur' }],
    TechHard: [{ required: true, message: '请选择', trigger: 'blur' }],

    ComInput: [{ required: true, message: '请填写', trigger: 'blur' }],
    ComSelect: [{ required: true, message: '请选择', trigger: 'blur' }]
  })

  //阀体同步数据
  const productSyncData = (e: any) => {
    if (data.data.ProductInfo.ProductMinMain && data.data.ProductInfo.ProductMinMain.length > 0) {
      // 延迟赋值，防止未赋值就执行
      setTimeout(() => {
        data.data.ProductInfo.ProductMinMain.forEach((item: any) => {
          // 系统名称
          item.SystemName = data.data.ProductInfo.SystemName
          // 常规类别
          item.RoutineType = data.data.ProductInfo.RoutineType
          // 质量等级
          item.QualityLevel = data.data.ProductInfo.QualityLevel
          // 单位
          item.UnitInfo = data.data.ProductInfo.UnitInfo
          // 数量
          item.Quantity = data.data.ProductInfo.Quantity
          // 可替代性
          item.Fungible = data.data.ProductInfo.Fungible
          // 技术难度
          item.TechHard = data.data.ProductInfo.TechHard
        })
      }, 200)
    }
  }

  return {
    rules,
    submitForm,
    ruleFormRef,
    productSyncData
  }
}

export default defineComponent({
  components: {
    FormProductInfoRightParts,
    FormSeletcAccessories,
    FormEditAccessory,
    FormEditValve,
    FormSelectAttribute
  },
  emits: ['updata', 'submit'],
  props: {
    productInfo: {
      type: Object,
      default: {}
    },
    //数据字典数据
    dictionaryData: {
      type: Object,
      default: {
        ClassOptions: [], //常规类别
        UnitOptions: [], //产品单位
        QualityOptions: [], //质量等级
        FungibilityOptions: [], //可替代性
        DifficultyOptions: [] //技术难度
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      ProductInfo: <any>{
        PropertysList: [], //映射属性
        ProductMinMain: [], //阀体
        AccessoriesList: [], //配件
        IsSetAttribute: false //是否设置属性（仅前端交互）
      },
      ProductSystemNameArr: [],
      //配置信息
      configInfo: {
        left: '',
        right: ''
      },
      //当前选中信息
      currInfo: {
        AccessoriesTypeId: 0, //当前选中的配件类型Id
        ValveModel: '' //当前选中的阀体系统型号
      }
    })
    const productInfoRightPartsRef = ref()

    // 选择配件被修改
    const updataSeletcAccessories = (val: any) => {
      data.ProductInfo = val

      updataProductInfo()
      //切换到主产品界面
      setConfigInfo('', '')
      productInfoRightPartsRef.value.data.isCloseParts = false
    }

    // 加载配件数据修改
    const updataRightParts = (val: any) => {
      if (val.type == 'updataProductInfo') {
        updataProductInfo()
      } else if (val.type == 'setConfigInfo') {
        setConfigInfo(val.info.left, val.info.right)
        if (val.info.left == 'partsEdit' && val.info.right == '') {
          //编辑配件信息
          if (val.info.partsInfo) {
            data.currInfo.AccessoriesTypeId = val.info.partsInfo.AccessoriesTypeId
          } else {
            data.currInfo.AccessoriesTypeId = 0
          }
        } else if (val.info.left == 'productEdit' && val.info.right == 'productAttribute') {
          //编辑阀体信息
          if (val.info.valveInfo) {
            data.currInfo.ValveModel = val.info.valveInfo.SystemModel
          } else {
            data.currInfo.ValveModel = ''
          }
        }
      }
    }
    //当前选中的配件信息
    const currPartsInfo = computed((): any => {
      let partsInfo = data.ProductInfo.AccessoriesList.find((x: any) => x.AccessoriesTypeId == data.currInfo.AccessoriesTypeId)
      if (partsInfo && partsInfo.AccessoriesTypeId > 0) return partsInfo
      else return { AccessoriesTypeId: 0 }
    })
    //当前选中的阀体信息
    const currValveInfo = computed((): any => {
      let partsInfo = data.ProductInfo.ProductMinMain.find((x: any) => x.SystemModel == data.currInfo.ValveModel)
      if (partsInfo && (partsInfo.SystemModel || '').length > 0) return partsInfo
      else return { SystemModel: '' }
    })
    //计算多余的高度个数
    const countHighSurplusNum = computed((): any => {
      let num = 0
      /*
        防止阀体或者附件属性比产品多 导致页面高度不够
        公式为：(当前设备属性个数-阀体属性个数)/2  每行两列所以除以二
      */
      if (data.currInfo.ValveModel != '') {
        //当前编辑的是阀体
        if (currValveInfo.value!.PropertysList) num = currValveInfo.value!.PropertysList.length - data.ProductInfo.PropertysList.length
      } else if (data.currInfo.AccessoriesTypeId > 0) {
        //当前编辑的是配件
        if (currPartsInfo.value!.PropertysList) num = currPartsInfo.value!.PropertysList.length - data.ProductInfo.PropertysList.length
      }

      if (num > 0) {
        // 向上取整数(小数舍去,正数部分+1)
        num = Math.ceil(num / 2)
      } else num = 0

      return num
    })

    //修改属性(主产品、阀体和配件属性)
    const updataSelectAttribute = (val: any, info: any) => {
      if (val && info) {
        info.PropertysList = val.PropertysList
      }
    }

    // 是否打开属性选择
    const openSelectAttribute = (val: boolean) => {
      if (val) {
        // 打开
        data.ProductInfo.IsSetAttribute = true
        setConfigInfo('', 'productAttribute')
      } else {
        //关闭
        data.ProductInfo.IsSetAttribute = false
        setConfigInfo('', '')
      }

      // 不存在阀体而又修改属性时
      if (!compuIsDecompose.value) {
        updataProductInfo()
      }
    }

    // 设置配置
    const setConfigInfo = (left: string, right: string) => {
      /*
      left： productEdit阀体编辑、partsEdit配件编辑、partsSeletc配件选择
      right：productAttribute阀体属性和产品属性、partsAttribute配件属性

      左右都为空 显示主产品
      左为空，编辑主产品
      右为空，显示主产品配件

      编辑阀体：左productEdit 右productAttribute
      产品添加属性：左空 右productAttribute
      编辑配件： 左partsEdit 右空
      配件属性： 左partsEdit 右partsAttribute
      配件选择： 左partsSeletc 右空

      */
      data.configInfo.left = left
      data.configInfo.right = right

      if (left == '') {
        //初始化默认选中项
        data.currInfo.AccessoriesTypeId = 0 //当前选中的配件类型Id
        data.currInfo.ValveModel = '' //当前选中的阀体系统型号
      }
    }

    //阀门型号解析
    const getValveModelAnalysis = async () => {
      if (data.ProductInfo.SystemModel.length < 3) {
        ElMessage.error('请输入正确的系统型号')
        return false
      }
      data.ProductSystemNameArr = []
      await getGBValveModelAnalysis(data.ProductInfo.SystemModel)
        .then(res => {
          if (res.code == 1) {
            let row = res.data || {}
            var item: any = { Name: [] }
            item.IsAnalysis = row.IsAnalysis
            item.Model = row.Model
            item.oldModel = row.OldModel

            item.Specifications = row.OtherList || []

            if (row.IsAnalysis) {
              // 解析成功
              row.ProductModelAnalysisList.forEach((f: any, index: number) => {
                item.Name.push(f.Name)
                //存在多个名称时，其他参数只取第一个信息
                if (index == 0) {
                  item.Driving = f.ProductModelAnalysisList.find((c: any) => c.Digit == 2).Mean //驱动方式
                  item.Connection = f.ProductModelAnalysisList.find((c: any) => c.Digit == 3).Mean //连接形式
                  item.Structural = f.ProductModelAnalysisList.find((c: any) => c.Digit == 4).Mean //结构形式
                  item.Sealing = f.ProductModelAnalysisList.find((c: any) => c.Digit == 5).Mean //密封面
                  item.Pressure = f.ProductModelAnalysisList.find((c: any) => c.Digit == 6).Mean //压力
                  item.Materials = f.ProductModelAnalysisList.find((c: any) => c.Digit == 7).Mean //材质
                }
              })
            }

            //解析出多个产品名称
            data.ProductSystemNameArr = item.Name

            data.ProductInfo.SystemName = item.Name.length > 1 ? '' : item.Name[0] //系统名称
            data.ProductInfo.SystemModel = item.Model //型号
            data.ProductInfo.Materials = item.Materials //材质
            data.ProductInfo.Pressure = item.Pressure //压力
            data.ProductInfo.DriveWay = item.Driving //驱动方式
            data.ProductInfo.ConnectioneWay = item.Connection //连接方式
            data.ProductInfo.StructureShape = item.Structural //结构形式
            data.ProductInfo.SealingSurface = item.Sealing //密封面
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch(e => {
          console.log(`postGBValveModelBatchAnalysis${e}`)
        })
    }

    // 创建阀体（增加配件）
    const addProductMinMain = () => {
      if (data.ProductInfo.ProductMinMain.length > 0) {
        ElMessage.error('已存在阀体')
        return false
      }

      //复制一份产品，清除阀体和配件后作为阀体
      let copyProductInfo = JSON.parse(JSON.stringify(data.ProductInfo))

      copyProductInfo.ProductMinMain = undefined //清除阀体
      copyProductInfo.AccessoriesList = undefined //清除配件
      copyProductInfo.Quantity = 1 //阀体数量数量改为1
      copyProductInfo.Id = '' //清除主产品的Id

      data.ProductInfo.ProductMinMain.push(copyProductInfo)

      // 更新数据
      updataProductInfo()
    }

    // 判断是否分解
    const compuIsDecompose = computed(() => {
      // 无阀体则表示不分解
      return data.ProductInfo.ProductMinMain.length > 0
    })

    // 更新数据
    const updataProductInfo = () => {
      context.emit('updata', data.ProductInfo)
    }
    // 提交数据
    const submitProductInfo = () => {
      context.emit('submit', data.ProductInfo)
    }

    //页面完成加载后执行
    onMounted(() => {
      data.ProductSystemNameArr = []
      data.ProductInfo = props.productInfo
      // 默认编辑主产品
      setConfigInfo('', '')
    })

    return {
      data,
      updataProductInfo,
      compuIsDecompose,
      ...formEvent({ data, submitProductInfo }),
      getValveModelAnalysis,
      addProductMinMain,
      openSelectAttribute,
      setConfigInfo,
      updataRightParts,
      currPartsInfo,
      currValveInfo,
      countHighSurplusNum,
      updataSeletcAccessories,
      updataSelectAttribute,
      productInfoRightPartsRef
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech-customerDemand-form-product-info {
  .product-info-form {
    min-height: 40vh;
  }
  :deep(.product-info-form) {
    .el-form {
      .el-form-item {
        margin-bottom: 10px;
        .el-form-item__label {
          background-color: #f9f9f9;
          border: 1px solid #e1e1e1;
          border-right-color: #f9f9f9;
          border-radius: 4px 0 0 4px;
          justify-content: center;
          padding: 0 5px;
          position: relative;
          &:before {
            position: absolute;
            bottom: -14px;
            right: -5px;
          }
        }
        .el-input__wrapper {
          border-radius: 0 4px 4px 0;
        }
      }
    }
  }
}
</style>
