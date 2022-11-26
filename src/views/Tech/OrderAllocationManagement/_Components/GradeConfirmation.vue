<template>
  <OpenWindow :box-style="boxStyle" :is-show="true" class="tech_order_allocation_management_grade_confirmation" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="8em" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="询价阶段" prop="StageState">
        <el-radio-group v-model="data.ruleForm.StageState" placeholder="请选择" @change="handleRadioChange">
          <el-radio v-for="item in data.stageOptions" :key="item.value" :label="item.label">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="询价性质" prop="RtypeState">
        <el-radio-group v-model="data.ruleForm.RtypeState" placeholder="请选择" @change="handleRadioChange">
          <el-radio v-for="item in data.rtypeOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="询价数量" prop="QuantityState">
        <el-radio-group v-model="data.ruleForm.QuantityState" placeholder="请选择" @change="handleRadioChange">
          <el-radio v-for="item in data.quantityOptions" :key="item.value" :label="item.label">{{ item.label }} </el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="质量等级" prop="QualityLevel">
        <el-radio-group v-model="data.ruleForm.QualityLevel" placeholder="请选择">
          <el-radio v-for="item in data.techQualityLevelOptions" :key="item.DicKey" :label="item.DicKey">{{ item.DicValue }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="text-sm pl-11">
        <div class="mt-2">
          <span class="mr-4">报价程度</span>
          <span v-if="data.ruleForm.GradeCode == 'A'" class="mr-4 text-red-500">优先订单</span>
          <span v-else-if="data.ruleForm.GradeCode == 'B'" class="mr-4 text-blue-500">重点订单</span>
          <span v-else-if="data.ruleForm.GradeCode == 'C'" class="text-green-500">普通订单</span>
        </div>
        <div class="float-right p-4">
          <el-button @click="closeWindow('close')">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        </div>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, onMounted, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { PostEditCustomerOrderGradeSave } from '/@/api/tech/EnquiryData'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() // 记得加这一句

// 获取字典数据
const getDictionaryData = (data: any) => {
  // 技术产品常规性选项
  store.getDict('tech_product_quality').then((res: any[]) => {
    res.forEach((item) => {
      item.DicKey = Number(item.DicKey || 0)
    })
    data.techQualityLevelOptions = res
  })
}

// 计算报价程度
const getGradeCode = (data: any) => {
  let arr = []
  // 询价阶段
  arr.push((data.stageOptions.find((x: any) => x.label == data.ruleForm.StageState) || { value: '-' }).value)

  // 询价性质
  arr.push((data.rtypeOptions.find((x: any) => x.label == data.ruleForm.RtypeState) || { value: '-' }).value)

  // 询价数量
  arr.push((data.quantityOptions.find((x: any) => x.label == data.ruleForm.QuantityState) || { value: '-' }).value)

  if (arr.filter((x) => x == 'A').length > 1) {
    data.ruleForm.GradeCode = 'A'
  } else if (arr.filter((x) => x == 'B').length > 1) {
    data.ruleForm.GradeCode = 'B'
  } else if (arr.filter((x) => x == 'C').length > 1) {
    data.ruleForm.GradeCode = 'C'
  } else {
    data.ruleForm.GradeCode = 'B'
  }
}

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0,
        StageState: '',
        RtypeState: '',
        QuantityState: '',
        QualityLevel: 0,
        GradeCode: ''
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      // 询价阶段
      stageOptions: [
        { value: 'A', label: '采购阶段' },
        { value: 'B', label: '比价阶段' },
        { value: 'C', label: '预算阶段' }
      ],
      // 询价性质
      rtypeOptions: [
        { value: 'A', label: '重点比价' },
        { value: 'B', label: '选择比价' },
        { value: 'C', label: '陪衬比价' }
      ],
      // 询价数量
      quantityOptions: [
        { value: 'A', label: '新项目' },
        { value: 'B', label: '检修或批量' },
        { value: 'C', label: '零星采购' }
      ],
      // 质量等级
      techQualityLevelOptions: [],
      ruleForm: {
        Id: 0,
        StageState: '',
        RtypeState: '',
        QuantityState: '',
        QualityLevel: 0,
        GradeCode: ''
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })

    const ruleFormRef = ref<FormInstance>()
    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          // 重新计算一次
          getGradeCode(data)

          PostEditCustomerOrderGradeSave(data.ruleForm)
            .then((res) => {
              if (res.code == 1) {
                ElMessage.success(res.message)

                closeWindow('submit')
              } else {
                ElMessage.error(res.message)
              }
            })
            .catch((e) => {
              console.log(`错误：${e}`)
            })
        } else {
          ElMessage.error('存在必填项未选')
        }
      })
    }
    // 校验
    const rules = reactive<FormRules>({
      StageState: [{ required: true, message: '请选择', trigger: 'blur' }],
      RtypeState: [{ required: true, message: '请选择', trigger: 'blur' }],
      QuantityState: [{ required: true, message: '请选择', trigger: 'blur' }],
      QualityLevel: [{ required: true, message: '请选择', trigger: 'blur' }]
    })

    // 询价阶段、询价性质、询价数量选择后执行
    const handleRadioChange = () => {
      getGradeCode(data)
    }

    // 获取数据
    const getData = () => {
      data.ruleForm = JSON.parse(JSON.stringify(props.FormData))
    }

    onMounted(() => {
      // 获取字典数据
      getDictionaryData(data)

      // 获取数据
      getData()
    })

    return {
      boxStyle,
      closeWindow,
      data,
      rules,
      ruleFormRef,
      submitForm,
      handleRadioChange
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_order_allocation_management_grade_confirmation {
  :deep(.el-form) {
    .el-form-item {
      .el-form-item__label {
        color: #000;
      }
    }
  }
}
</style>
