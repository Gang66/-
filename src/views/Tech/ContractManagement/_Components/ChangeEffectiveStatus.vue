<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="5em" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="变更状态" prop="StageState">
        <el-radio-group v-model="data.ruleForm.StageState" placeholder="请选择" @change="handleRadioChange">
          <el-radio v-for="item in data.stageOptions" :key="item.value" :label="item.label">
            {{ item.label }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <div class="text-sm pl-11">
        <div class="float-right p-4">
          <el-button @click="closeWindow('close')">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确定</el-button>
        </div>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow
  },
  setup(props, context: SetupContext) {
    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      // 变更状态
      stageOptions: [
        { value: 'A', label: '等待原件' },
        { value: 'B', label: '等待盖章' },
        { value: 'C', label: '等待款项' },
        { value: 'D', label: '合同生效' }
      ],
      ruleForm: {
        StageState: ''
      }
    })
    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('success')
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
    const handleRadioChange = (e: any) => {
      console.log(e)
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-540',
      boxHeight: ''
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ruleFormRef,
      rules,
      handleRadioChange,
      submitForm
    }
  }
})
</script>
<style lang="postcss" scoped></style>
