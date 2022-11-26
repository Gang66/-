<!--
 * @Author: ZHJ
 * @Date: 2022-08-09 10:19:20
 * @LastEditTime: 2022-10-12 16:55:17
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\SchoolView\Further\_Components\CurrentLearningForm.vue
 * 版权声明
-->
<template>
  <div class="CurrentLearningForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="data.planInfo.plan.Name">
      <div class="bf-window-padding" style="padding-top: 6px">
        <main class="mt-4">
          <div class="flex main-bg relative bg-white rounded items-end mb-3 justify-between" v-for="(item, index) in data.courseList" :class="index + 1 == 4 ? 'mb-0' : ''">
            <div class="Score_bg text-xs text-white" v-if="item.ExamResult === 1">课件成绩{{ item.ExamScore }}分</div>
            <div class="flex items-center">
              <el-image style="width: 160px; height: 90px" class="rounded" :src="remoteUrlEvent(item.CoverImg)" fit="cover" />
              <div class="ml-2">
                <div>{{ item.Name }}</div>
                <div class="text-xs mt-2">{{ item.No }}</div>
                <div class="flex mt-3">
                  <div class="text-xs bf-text-color-regular">学习时间：{{ item.MinMinutes }}分钟</div>
                  <div class="text-xs ml-2">已学习：{{ formatUseTime(item) }}分钟</div>
                </div>
                <el-progress class="mt-1 w-72" :stroke-width="10" :show-text="false" :percentage="(formatUseTime(item) / item.MinMinutes) * 100" color="#FFAF5A" />
              </div>
            </div>
            <!-- <div class="flex items-center text-sm">
              <div :class="formatCourseState(item)[1]">{{ formatCourseState(item)[0] }}</div>
              <div class="ml-4 bf-text-color-regular" v-if="item.ExamResult === 1">{{ item.ExamScore }}分</div>
            </div> -->
            <div class="flex">
              <template v-if="item.SummaryStatus !== 100">
                <el-button plain @click="handleJumpStudy(item)">去学习</el-button>
              </template>
              <template v-else>
                <el-button plain @click="handleJumpStudy(item)">已学习</el-button>
              </template>
              <template v-if="item.SummaryStatus === 100 && data.planInfo.plan.IsCourseTest == 1 && item.TestCount > 0">
                <template v-if="item.TestStatus !== 100">
                  <el-button plain @click="handleJumpTest(data.planInfo, item, 0)">去刷题</el-button>
                </template>
                <template v-else>
                  <el-button plain @click="handleJumpTest(data.planInfo, item, 0)">继续刷题</el-button>
                </template>
              </template>
              <template
                v-if="((data.planInfo.plan.IsCourseTest >= 1 && item.TestStatus === 100) || (data.planInfo.plan.IsCourseTest == 0 && item.SummaryStatus === 100)) && data.planInfo.plan.IsCourseExam == 1 && item.Exam != null && item.ExamCount > 0">
                <template v-if="item.ExamStatus !== 100">
                  <el-button plain type="primary" @click="handleJumpTest(data.planInfo, item, 1)">去考试</el-button>
                </template>
                <template v-else-if="item.ExamResult === 1">
                  <el-button plain type="warning" @click="handleJumpTest(data.planInfo, item, 1)">重新考试</el-button>
                </template>
                <template v-else>
                  <el-button plain type="danger" @click="handleJumpTest(data.planInfo, item, 1)">去补考</el-button>
                </template>
              </template>
            </div>
          </div>
        </main>
        <footer class="relative main-bg mt-2" v-if="data.planInfo.plan.exam != null">
          <img src="/src/assets/img/hr/SchoolView/currentLeaming/icon_dakao.png" alt="" style="width: 38px; height: 38px" />
          <div class="Score_bgTwo text-xs text-white" v-if="data.planInfo.plan.ExamScore">考试成绩{{ data.planInfo.plan.ExamScore }}分</div>
          <div class="flex bg-white rounded items-center justify-between">
            <div class="flex items-center">
              <div class="">
                <div>{{ data.planInfo.plan.exam.Name }}</div>
              </div>
            </div>
            <!-- <div class="flex items-center text-sm">
              <div class="bf-font-green-color ">考试成绩</div>
              <div class="ml-4 bf-text-color-regular">{{ data.planInfo.plan.ExamScore }}分</div>
            </div> -->
            <div class="exam-btns">
              <template v-if="data.planInfo.plan.ExamResult == 1">
                <el-button type="success" plain>考试通过</el-button>
              </template>
              <template v-else>
                <el-button type="primary" plain @click="handleJumpTest(data.planInfo, data.planInfo.CoursewareInfo, 1, true)">开始考试</el-button>
              </template>
            </div>
          </div>
        </footer>
      </div>
    </OpenWindow>
    <!-- pdf模板 -->
    <StudyTemplate v-if="data.StudyTemplateWindow.show" @closeWindow="closeWindow" :Id="data.StudyTemplateWindow.Id" :CourseId="data.StudyTemplateWindow.CourseId"
      :courseList="data.courseList"></StudyTemplate>
    <!--刷题 考试模板 -->
    <TestQuestionsTemplate v-if="data.TestQuestionsTemplateWindow.show" @closeWindow="closeWindow" :details="data.TestQuestionsTemplateWindow.details"></TestQuestionsTemplate>
  </div>
</template>

<script lang="ts">
import { remoteUrl } from '/@/utils/tools'
import { parseTime } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { PostSaveStaffFileArchiving } from '/@/api/hr/Induction'
import { useLayoutStore } from '/@/store/modules/layout'
import StudyTemplate from '../../StudyTemplate/StudyTemplate.vue'
import TestQuestionsTemplate from '../../_Components/TestQuestionsTemplate.vue'
import tabs from '/@/components/Tabs/Index.vue'
const store = useCommonStore() //记得加这一句
const lStore = useLayoutStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostSaveStaffFileArchiving(data.ruleForm).then((res) => {
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
  const rules = reactive<FormRules>({})
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 根据上传文件拼接路径
  const remoteUrlEvent = (url: string) => {
    return remoteUrl(url)
  }
  // 学习时长
  const formatUseTime = (row: any) => {
    return Math.floor((row.StudyUseTime + row.SummaryUseTime + row.TestUseTime) / 60)
  }
  // 学习课件 val 计划数据
  const handleJumpStudy = (value: any) => {
    data.StudyTemplateWindow.Id = data.planInfo.plan.Id
    data.StudyTemplateWindow.CourseId = value.Id
    data.StudyTemplateWindow.show = true
  }
  // 刷题 考试 事件 type 1为考试 0为刷题
  const handleJumpTest = (val: any, value: any, type: any, isBigTest: any) => {
    var isReturn: any = true
    if (isBigTest) {
      data.planInfo.courses.forEach((element: any) => {
        if (element.ExamResult != 1) {
          isReturn = false
        } else if (element.ExamCount == 0 && element.SummaryStatus != 100) {
          isReturn = false
        }
      })
    }
    if (isReturn == false) {
      ElMessage({
        message: '警告, 请小考结束后，进行大考',
        type: 'warning'
      })
      return
    }
    if (value.ExamId <= 0 && value.Exam == null) {
      ElMessage({
        message: '警告, 无考试信息',
        type: 'warning'
      })
      return
    }
    data.TestQuestionsTemplateWindow.details = val
    data.TestQuestionsTemplateWindow.details.CoursewareInfo = value
    if (type == 0) {
      data.TestQuestionsTemplateWindow.details.isExamination = false
    } else {
      data.TestQuestionsTemplateWindow.details.isExamination = true
    }
    data.TestQuestionsTemplateWindow.show = true
  }
  // 筛选学习状态
  const formatCourseState = (course: any) => {
    var info = ['未学习', 'bf-error-color', '开始学习', 'bf-warning-color']
    if (course.StudyUseTime === 0) return info
    // var StudyStatus = course.StudyStatus
    var SummaryStatus = course.SummaryStatus
    var TestStatus = course.TestStatus
    // var ExamStatus = course.ExamStatus
    var TestCount = course.TestCount
    var ExamCount = course.ExamCount
    var ExamResult = course.ExamResult
    if (SummaryStatus !== 100) {
      return ['学习中', 'bf-warning-color', '继续学习', 'bf-warning-color']
    } else {
      if (TestCount === 0 || TestStatus === 100) {
        if (ExamCount === 0 || ExamResult === 1) {
          return ['课件通过', 'bf-font-green-color', '再次学习', 'bf-font-green-color']
        } else {
          return ['学习中', 'bf-warning-color', '继续学习', 'bf-warning-color']
        }
      } else {
        return ['学习中', 'bf-warning-color', '继续学习', 'bf-warning-color']
      }
    }
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    parseTimeEvent,
    remoteUrlEvent,
    formatCourseState,
    handleJumpStudy,
    formatUseTime,
    handleJumpTest
  }
}
// 加载事件
const GetContractManagementInfoEvent = async (data: any) => {
  console.log(data.planInfo)
  data.planInfo.courses.forEach((element: any) => {
    if (element.Stage == 1) {
      data.courseList.push(element)
    }
  })
  data.planInfo.CoursewareInfo = {
    CoverImg: data.planInfo.plan.CoverImg,
    ContentType: ['EXAM'],
    StudyUseTime: 0,
    SummaryUseTime: 0,
    TestUseTime: 0,
    IsPlanExam: true,
    PlanId: data.planInfo.plan.Id
  }
  if (data.planInfo.plan.exam) {
    data.planInfo.CoursewareInfo.Name = data.planInfo.plan.exam.Name
    data.planInfo.CoursewareInfo.Exam = data.planInfo.plan.exam
    data.planInfo.CoursewareInfo.ExamId = data.planInfo.plan.exam.Id
    data.planInfo.CoursewareInfo.PaperId = data.planInfo.plan.exam.PaperId
  }
  // 获取打卡状态
  store.getDict('hr_attendance_state').then((res: any) => {
    data.attendanceState = res
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    tabs,
    StudyTemplate,
    TestQuestionsTemplate
  },
  emits: ['closeWindow'],
  props: {
    // 计划详情
    planInfo: {
      type: Object,
      default: {}
    },
    // ==A是新人训
    CategoryId: {
      type: String,
      default: ''
    }
  },
  setup(props, context: SetupContext) {
    const checkedCities = ref()
    let data: any = reactive({
      courseList: [], //课件列表
      selectIndex: 0, //tab下标
      CategoryId: props.CategoryId,
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      ruleForm: {},
      planInfo: props.planInfo,
      tabList: [{ name: '上午' }, { name: '下午' }], //tabs数据
      StudyTemplateWindow: {
        //pdf模板显示数据
        show: false
      },
      // 客户模板
      TestQuestionsTemplateWindow: {
        show: false
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-900',
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
      checkedCities,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.CurrentLearningForm {
  :deep(.bf-window-header-bg) {
    background: none !important;
    color: var(--el-text-color-primary);
    border: none;
    box-shadow: none;
  }
  :deep(.bf-no-color) {
    color: rgba(113, 119, 134, 0.616);
    font-size: 18px;
  }
  :deep(.bf-title-color) {
    font-weight: 500;
  }
  :deep(.bf-title-color) {
    font-size: 22px;
  }
  :deep(.bf-tabs-content) {
    align-items: end;
    width: 110px;
  }
  :deep(.el-divider--horizontal) {
    margin: 10px 0;
    border-color: #d9ecff;
    border-width: 3px;
  }
  .main-bg {
    border: 1px solid #dcdcdc;
    border-radius: 8px;
    padding: 12px 12px;
    /* background: #d9ecff;
    padding: 10px; */
  }
  .Score_bg {
    line-height: 28px;
    text-align: center;
    position: absolute;
    right: -1px;
    top: -1px;
    min-width: 100px;
    height: 28px;
    background: #36a6fb;
    border-radius: 0 9px 0 11px;
  }
  .Score_bgTwo {
    line-height: 28px;
    text-align: center;
    position: absolute;
    right: -1px;
    top: -1px;
    min-width: 100px;
    height: 28px;
    background: #f27b33;
    border-radius: 0 9px 0 11px;
  }
  :deep(.w-900) {
    border-radius: 6px;
  }
  :deep(.el-button--warning.is-link) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-warning);
    --el-button-hover-text-color: var(--el-color-warning);
  }
  :deep(.el-button--warning.is-plain) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-warning);
    --el-button-hover-text-color: var(--el-color-warning);
  }
  :deep(.el-button--warning.is-text) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-warning);
    --el-button-hover-text-color: var(--el-color-warning);
  }
  :deep(.el-button--primary.is-link) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-primary);
    --el-button-hover-text-color: var(--el-color-primary);
  }
  :deep(.el-button--primary.is-plain) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-primary);
    --el-button-hover-text-color: var(--el-color-primary);
  }
  :deep(.el-button--primary.is-text) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-primary);
    --el-button-hover-text-color: var(--el-color-primary);
  }
  :deep(.el-button--success.is-link) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-success);
    --el-button-hover-text-color: var(--el-color-success);
  }
  :deep(.el-button--success.is-plain) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-success);
    --el-button-hover-text-color: var(--el-color-success);
  }
  :deep(.el-button--success.is-text) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-success);
    --el-button-hover-text-color: var(--el-color-success);
  }
  :deep(.el-button--danger.is-link) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-danger);
    --el-button-hover-text-color: var(--el-color-danger);
  }
  :deep(.el-button--danger.is-plain) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-danger);
    --el-button-hover-text-color: var(--el-color-danger);
  }
  :deep(.el-button--danger.is-text) {
    --el-button-bg-color: #fff;
    --el-button-hover-bg-color: #fff;
    --el-button-active-text-color: var(--el-color-danger);
    --el-button-hover-text-color: var(--el-color-danger);
  }
}
</style>
