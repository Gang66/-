<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="noteForm">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="40px" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="" prop="summary" label-width="0">
        <el-input v-model="data.ruleForm.summary" class="w-full" :autosize="{ minRows: 4, maxRows: 99 }" type="textarea" placeholder="请抄录本业令你印象深刻的内容(至少20字)" />
      </el-form-item>
      <div class="bf-search-formItem">
        <div class="text-center w-full">
          <el-button @click="closeWindow('close')">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
        </div>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetHRInviteManagementInfo } from '/@/api/hr/Invite'
import { PostGetPageSummary, PostSubmitPageSummary } from '/@/api/hr/School/Train'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = {
          page: data.details.page,
          planId: data.details.plan.Id,
          courseId: data.details.CoursewareInfo.Id,
          summary: data.ruleForm.summary
        }
        PostSubmitPageSummary(arr).then((res) => {
          if (res.code == 1) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    summary: [
      { required: true, message: '请填写学习笔记', trigger: 'blur' },
      { min: 20, message: '学习笔记至少20字', trigger: 'blur' }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef
  }
}
const GetContractManagementInfoEvent = async (data: any) => {
  data.ruleForm.summary = data.details.summary
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      ruleForm: {
        summary: '' //笔记
      },
      details: props.details
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.noteForm {
  :deep(.max-w-screen-xl) {
    background: #fff !important;
  }
}
</style>
