<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="ScoringForm bf-search-formItem">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding" hide-required-asterisk>
      <div class="flex items-center">
        <div class="m-hr bf-bg-blue-color"></div>
        <div class="leading-none ml-2 font-semibold">课程打分</div>
      </div>
      <div class="text-center m-auto mt-2">
        <el-form-item label="目标精准" prop="courseTargetRate">
          <el-rate v-model="data.ruleForm.courseTargetRate" />
        </el-form-item>
        <el-form-item label="内容专业" prop="courseContentRate">
          <el-rate v-model="data.ruleForm.courseContentRate" />
        </el-form-item>
        <el-form-item label="结构合理" prop="courseStructRate">
          <el-rate v-model="data.ruleForm.courseStructRate" />
        </el-form-item>
        <el-form-item label="创意趣味" prop="courseInterestRate">
          <el-rate v-model="data.ruleForm.courseInterestRate" />
        </el-form-item>
        <el-form-item label="效果转化" prop="courseConversionRate">
          <el-rate v-model="data.ruleForm.courseConversionRate" />
        </el-form-item>
      </div>
      <div class="flex items-center mt-4">
        <div class="m-hr bf-bg-blue-color"></div>
        <div class="leading-none ml-2 font-semibold">学习总结</div>
      </div>
      <div class="text-center m-auto mt-2">
        <el-form-item label="" prop="courseSummary" label-width="0">
          <el-input
            v-model="data.ruleForm.courseSummary"
            class="w-full"
            :rows="9"
            type="textarea"
            placeholder="获得的知识点：
1.  —————— 
2.  ——————
3.  ——————
工作反思与行动计划：
1.  —————— 
2.  ——————
3.  ——————"
          />
        </el-form-item>
      </div>
      <div class="bf-search-formItem mt-4">
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
import { PostCompletePlanCourseRate, PostCompletePlanCourseStudy } from '/@/api/hr/School/Train'
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
          planId: data.details.plan.Id,
          CoursewareId: data.details.CoursewareInfo.Id,
          TargetRate: data.ruleForm.courseTargetRate,
          ContentRate: data.ruleForm.courseContentRate,
          StructRate: data.ruleForm.courseStructRate,
          InterestRate: data.ruleForm.courseInterestRate,
          ConversionRate: data.ruleForm.courseConversionRate,
          courseSummary: data.ruleForm.courseSummary,
          summaryAllCount: data.details.numOfPages
        }
        PostCompletePlanCourseRate(arr).then((res) => {
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
    courseTargetRate: [{ required: true, message: '请打分目标精准', trigger: 'change' }],
    courseContentRate: [{ required: true, message: '请打分内容专业', trigger: 'change' }],
    courseStructRate: [{ required: true, message: '请打分结构合理', trigger: 'change' }],
    courseInterestRate: [{ required: true, message: '请打分创意趣味', trigger: 'change' }],
    courseConversionRate: [{ required: true, message: '请打分效果转化', trigger: 'change' }],
    courseSummary: [
      { required: true, message: '请填写学习总结', trigger: 'blur' },
      { min: 20, message: '学习总结至少20字', trigger: 'blur' }
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
const GetContractManagementInfoEvent = async (data: any, closeWindow: any) => {
  var arr = {
    planId: data.details.plan.Id,
    courseId: data.details.CoursewareInfo.Id,
    summaryAllCount: data.details.numOfPages
  }
  await PostCompletePlanCourseStudy(arr).then((res) => {
    if (res.code == 1) {
      if (res.data) data.ruleForm = res.data
    } else {
      // ElMessage.error(res.message)
      // closeWindow('close')
    }
  })
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
        courseTargetRate: '',
        courseContentRate: '',
        courseStructRate: '',
        courseInterestRate: '',
        courseConversionRate: '',
        courseSummary: ''
      },
      details: props.details
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
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data, closeWindow)
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
.ScoringForm {
  :deep(.max-w-screen-xl) {
    background: #fff !important;
  }
  :deep(.el-rate__item) {
    display: flex;
  }
  .m-hr {
    width: 3px;
    height: 16px;
  }
}
</style>
