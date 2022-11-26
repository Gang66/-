<template>
  <div class="tech-customerDemand-form-product-info pt-4 pb-4 pl-2 pr-2 flex justify-around">
    <!-- #region 左侧 -->
    <div class="w-650 border-solid border border-light-blue-600">
      <div class="flex p-4">
        <div>基础参数</div>
        <div>按钮</div>
      </div>
      <div class="product-info-form p-4">
        <el-form ref="ruleFormRef" :model="data.ProductInfo" :rules="rules" status-icon :hide-required-asterisk="true" :show-message="false" label-width="100px">
          <el-row class="el-row" gutter="11">
            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="客用名称" prop="ClientName">
                <el-input v-model="data.ProductInfo.ClientName" placeholder="请输入客用名称" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="系统名称" prop="SystemName">
                <el-input v-model="data.ProductInfo.SystemName" placeholder="请输入系统名称" />
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
              <el-form-item class="w-full" label="材质" prop="Material">
                <el-input v-model="data.ProductInfo.Material" placeholder="请输入材质" />
              </el-form-item>
            </el-col>

            <!-- #region 动态属性 (1输入框、2单选框、3复选框、4下拉框) -->
            <el-col :md="24" :lg="12" v-for="(item, index) in data.ProductInfo.ProductPropertyMapping" :key="item.Id">
              <el-form-item class="w-full" :label="item.Name" :prop="'ProductPropertyMapping.' + index + '.Value'" :rules="rules.ComInput" v-if="item.PropertyTypeInfo === 1">
                <el-input v-model="item.Value" :placeholder="'请输入' + item.Name" />
              </el-form-item>
              <el-form-item class="w-full" :label="item.Name" :prop="'ProductPropertyMapping.' + index + '.Value'" :rules="rules.ComSelect" v-else-if="item.PropertyTypeInfo === 3">
                <el-select class="w-full" v-model="item.ArrayData" multiple collapse-tags collapse-tags-tooltip>
                  <el-option v-for="row in item.ItemVlaVos" :key="row.Id" :label="row.Value" :value="row.Id" />
                </el-select>
              </el-form-item>
              <el-form-item class="w-full" :label="item.Name" :prop="'ProductPropertyMapping.' + index + '.Value'" :rules="rules.ComSelect" v-else>
                <el-select class="w-full" v-model="item.Value">
                  <el-option v-for="row in item.ItemVlaVos" :key="row.Id" :label="row.Value" :value="row.Id" />
                </el-select>
              </el-form-item>
            </el-col>
            <!-- #endregion -->

            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="常规类别" prop="RoutineType">
                <el-select v-model="data.ProductInfo.RoutineType" class="w-full" placeholder="请选择常规类别">
                  <el-option v-for="item in dictionaryData.ClassOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="质量等级" prop="QualityLevel">
                <el-select v-model="data.ProductInfo.QualityLevel" class="w-full" placeholder="请选择质量等级">
                  <el-option v-for="item in dictionaryData.QualityOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="单位" prop="UnitInfo">
                <el-select v-model="data.ProductInfo.UnitInfo" class="w-full" placeholder="请选择单位">
                  <el-option v-for="item in dictionaryData.UnitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="数量" prop="Quantity">
                <el-input v-model="data.ProductInfo.Quantity" placeholder="请输入数量" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="可替代性" prop="Fungible">
                <el-select v-model="data.ProductInfo.Fungible" class="w-full" placeholder="请选择可替代性">
                  <el-option v-for="item in dictionaryData.FungibilityOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item class="w-full" label="技术难度" prop="TechHard">
                <el-select v-model="data.ProductInfo.TechHard" class="w-full" placeholder="请选择技术难度">
                  <el-option v-for="item in dictionaryData.DifficultyOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region 右侧 -->
    <div class="w-500 border-solid border border-light-blue-600" v-if="compuIsDecompose">分解</div>
    <!-- #endregion -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed, SetupContext } from 'vue'
import { FormRules, ElMessage } from 'element-plus'

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref()
  // 表单提交
  const submitForm = async () => {
    const valid = await ruleFormRef.value.validate()
    if (valid) {
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
    Material: [{ required: true, message: '请填写', trigger: 'blur' }],
    RoutineType: [{ required: true, message: '请选择', trigger: 'blur' }],
    QualityLevel: [{ required: true, message: '请选择', trigger: 'blur' }],
    UnitInfo: [{ required: true, message: '请选择', trigger: 'blur' }],
    Quantity: [{ required: true, message: '请填写', trigger: 'blur' }],
    Fungible: [{ required: true, message: '请选择', trigger: 'blur' }],
    TechHard: [{ required: true, message: '请选择', trigger: 'blur' }],

    ComInput: [{ required: true, message: '请填写', trigger: 'blur' }],
    ComSelect: [{ required: true, message: '请选择', trigger: 'blur' }]
  })

  return {
    rules,
    submitForm,
    ruleFormRef
  }
}

export default defineComponent({
  components: {},
  emits: ['updata'],
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
        ProductPropertyMapping: [], //映射属性
        ProductMinMain: [], //阀体
        AccessoriesList: [] //配件
      }
    })

    // 判断是否分解
    const compuIsDecompose = computed(() => {
      return data.ProductInfo.ProductMinMain.length > 0
    })

    // 更新数据
    const updataProductInfo = () => {
      context.emit('updata', data.ProductInfo)
    }

    //页面完成加载后执行
    onMounted(() => {
      data.ProductInfo = props.productInfo
    })

    return {
      data,
      updataProductInfo,
      compuIsDecompose,
      ...formEvent(data)
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech-customerDemand-form-product-info {
  .product-info-form {
    :deep(.el-form) {
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
