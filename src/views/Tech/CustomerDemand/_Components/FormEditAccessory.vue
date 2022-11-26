<template>
  <div>
    <div class="p-4 flex">
      <div class="flex-grow pt-1">
        <div class="border-solid border-blue-500 border-l-8 pl-2 text-base h-5 leading-5">配件参数</div>
      </div>
      <div class="flex-none">
        <el-button type="primary" link @click="openAttribute">
          <el-icon><el-icon-circle-plus /></el-icon>属性
        </el-button>
        <el-button type="danger" link @click="submitForm">
          <el-icon><el-icon-home-filled /></el-icon>返回
        </el-button>
      </div>
    </div>
    <div class="product-info-form pl-4 pr-4 pb-4">
      <el-form ref="ruleFormRef" :model="partsInfo" :rules="rules" status-icon :hide-required-asterisk="true" :show-message="false" label-width="100px">
        <el-row class="product-info-row" :gutter="11">
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="客用名称" prop="ClientName">
              <el-input v-model="partsInfo.ClientName" placeholder="请输入客用名称" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="系统名称" prop="SystemName">
              <el-input v-model="partsInfo.SystemName" placeholder="请输入系统名称" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="客用型号" prop="ClientModel">
              <el-input v-model="partsInfo.ClientModel" placeholder="请输入客用型号" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="系统型号" prop="SystemModel">
              <el-input v-model="partsInfo.SystemModel" placeholder="请输入系统型号" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="客用规格" prop="ClientSpecification">
              <el-input v-model="partsInfo.ClientSpecification" placeholder="请输入客用规格" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="系统规格" prop="SystemSpecification">
              <el-input v-model="partsInfo.SystemSpecification" placeholder="请输入系统规格" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="压力" prop="Pressure">
              <el-input v-model="partsInfo.Pressure" placeholder="请输入压力" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="材质" prop="Materials">
              <el-input v-model="partsInfo.Materials" placeholder="请输入材质" />
            </el-form-item>
          </el-col>

          <!-- #region 动态属性 (1输入框、2单选框、3复选框、4下拉框) -->
          <el-col :md="24" :lg="12" v-for="(item, index) in partsInfo.PropertysList" :key="item.Id">
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
              <el-select v-model="partsInfo.RoutineType" class="w-full" placeholder="请选择常规类别">
                <el-option v-for="item in dictionaryData.ClassOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="质量等级" prop="QualityLevel">
              <el-select v-model="partsInfo.QualityLevel" class="w-full" placeholder="请选择质量等级">
                <el-option v-for="item in dictionaryData.QualityOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="单位" prop="UnitInfo">
              <el-select v-model="partsInfo.UnitInfo" class="w-full" placeholder="请选择单位">
                <el-option v-for="item in dictionaryData.UnitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="数量" prop="Quantity">
              <el-input v-model="partsInfo.Quantity" placeholder="请输入数量" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="可替代性" prop="Fungible">
              <el-select v-model="partsInfo.Fungible" class="w-full" placeholder="请选择可替代性">
                <el-option v-for="item in dictionaryData.FungibilityOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item class="w-full" label="技术难度" prop="TechHard">
              <el-select v-model="partsInfo.TechHard" class="w-full" placeholder="请选择技术难度">
                <el-option v-for="item in dictionaryData.DifficultyOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="24">
            <el-form-item class="w-full" label="备注">
              <el-input v-model="partsInfo.Remark" placeholder="请输入备注" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <!-- <AccessorySelectAttribute ref="AccessorySelectAttributeRef" @SetPropertysList="SetPropertysList($event)"> </AccessorySelectAttribute> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, SetupContext, computed } from 'vue'
import { ElMessage, FormRules } from 'element-plus'

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref()
  // 表单提交
  const submitForm = async () => {
    const valid = await ruleFormRef.value.validate().catch(() => {})
    if (valid) {
      // 更新父级数据
      data.updataParentData('setConfigInfo', { left: '', right: '' })
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

  return {
    rules,
    submitForm,
    ruleFormRef
  }
}

export default defineComponent({
  components: {},
  emits: ['updata', 'update:parts'],
  props: {
    parts: {
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
    let data = reactive({
      ProductInfo: <any>{}
    })

    // 打开属性选择
    const openAttribute = () => {
      updataParentData('setConfigInfo', { left: 'partsEdit', right: 'partsAttribute' })
    }

    // 更新父级数据
    const updataParentData = (type: string, info: any) => {
      context.emit('updata', { type, info })
    }

    //阀体
    const partsInfo = <any>computed({
      get() {
        return props.parts
      },
      set(val) {
        context.emit('update:parts', val)
      }
    })

    return {
      data,
      openAttribute,
      partsInfo,
      ...formEvent({ updataParentData })
    }
  }
})
</script>
<style lang="postcss" scoped></style>
