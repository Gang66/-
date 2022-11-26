<template>
  <div class="addResult bf-fillet">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
      <template #title>
        <div class="bf-window-header-bg h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100">
          <div class="flex items-center">
            <div class="mr-4">添加工作内容</div>
          </div>
          <div class="flex items-center">
            <el-button type="primary" @click="submitForm(ruleFormRef)" size="small" class="mr-3">提 交</el-button>
            <div class="cursor-pointer rounded-full bg-gray-200 bg-opacity-50 p-0.5" style="line-height: 0; width: 20px; height: 20px">
              <el-icon @click="closeWindow('close')">
                <el-icon-close />
              </el-icon>
            </div>
          </div>
        </div>
      </template>
      <div class="bf-no-error bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <el-form-item label="工作内容" prop="workContent">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="data.ruleForm.workContent"></el-input>
          </el-form-item>
          <el-form-item prop="review" label="自我评定">
            <el-radio-group v-model="data.ruleForm.review">
              <el-radio :label="3" class="success-color">好</el-radio>
              <el-radio :label="2" class="primary-color">中</el-radio>
              <el-radio :label="1" class="danger-color">差</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetWorkSummaryInfo, PostInsertEditWorkSummarySave } from '/@/api/hr/WorkSummary'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const userStore = useLayoutStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any, context: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        context.emit('handleSubmit', data.ruleForm)
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    review: [
      {
        required: true,
        message: '请填写自我评定',
        trigger: 'change'
      }
    ],
    workContent: [
      {
        required: true,
        message: '请填写工作内容',
        trigger: 'blur'
      }
    ]
  })
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    remoteUrlEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow', 'handleSubmit'],
  props: {
    details: { type: Object, default: {} }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      details: props.details,
      time: '',
      ruleForm: {
        workDate: parseTime(new Date(), '{y}-{m}-{d}'),
        StartTime: 0,
        EndTime: 0,
        Remarks: ''
      },
      //   选择课件弹窗
      selectCoursewareWindow: {
        view: false
      }
      // table数据
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-360',
      boxHeight: ''
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow, context)
    }
  }
})
</script>

<style lang="postcss" scoped>
.addResult {
  :deep(.el-input__inner) {
    padding: 0 4px !important;
    border: none;
    border-bottom: 1px solid #dddddd;
  }
  :deep(.el-input--medium .el-input__inner) {
    height: 15px !important;
    line-height: 15px;
  }
  :deep(.el-input__wrapper) {
    box-shadow: none;
  }
  :deep(.el-input-number .el-input__wrapper) {
    padding-left: 0;
    padding-right: 0;
  }
  :deep(.el-input-number__decrease) {
    display: none;
  }
  :deep(.el-input-number__increase) {
    display: none;
  }
}
</style>
