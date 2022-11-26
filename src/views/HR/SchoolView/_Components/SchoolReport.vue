<template>
  <div class="SchoolReport">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
      <template #title>
        <div></div>
      </template>
      <div :class="data.info.exam.Score<data.info.exam.MinScore?'SchoolReport':'SchoolReport_bg'" class="" v-if="JSON.stringify(data.info)!='{}'">
        <div class="absolute bottom-12 w-360 h-36">
          <div class="scoreResultScore">本次考试{{data.info.exam.Score}}分</div>
          <div class="text-xs text-center" v-if="data.details.CoursewareInfo.IsPlanExam">{{data.details.plan.Name}}（大考）</div>
          <div class="text-xs text-center" v-else>{{data.details.plan.Name}}-{{data.details.CoursewareInfo.Name}}（小考）</div>
          <div class="flex  px-14 mt-7 justify-between items-center">
            <div class="text-center">
              <div>{{data.errorList}}</div>
              <div class="bf-text-color-regular">错题数</div>
            </div>
            <div class="text-center">
              <div>{{data.datetime}}</div>
              <div class="bf-text-color-regular">考试时间</div>
            </div>
            <div class="text-center">
              <div>{{data.info.logList.length}}</div>
              <div class="bf-text-color-regular">全部试题</div>
            </div>
          </div>
          <div class="text-center mt-3">
            <el-button @click="closeWindow('submit')">确定</el-button>
          </div>
        </div>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import { useLayoutStore } from '/@/store/modules/layout'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { PostSaveStaffFileArchiving } from '/@/api/hr/Induction'
import tabs from '/@/components/Tabs/Index.vue'
import { GetAddUserNewestPlan, GetCompleteNewestStore, PostGetCourseExamResult, PostSystemExam } from '/@/api/hr/School/Train'
import { PostCheckPlanStudyComplete } from '/@/api/hr/Further'
const { getUser, getUserInfo } = useLayoutStore()
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
  return {
    submitForm,
    ruleFormRef
  }
}
// 页面渲染触发
const GetContractManagementInfoEvent = async (data: any) => {
  var val = {
    planId: data.details.plan.Id,
    courseId: data.details.CoursewareInfo.Id,
    examId: data.details.CoursewareInfo.ExamId,
    paperId: data.details.CoursewareInfo.Exam.PaperId
  }
  if (data.details.isEndTime) {
    PostSystemExam(val)
  }
  // 强制交卷
  PostGetCourseExamResult(val).then((res: any) => {
    if (res.data) {
      var d1: any = new Date(res.data.exam.CreateOn)
      var d2: any = new Date(res.data.exam.UpdateOn)
      var a = d2 - d1
      var hour = Math.floor((a / 1000 / 60 / 60) % 24)
      var second = Math.floor((a / 1000 / 60) % 60)
      var minute = Math.floor((a / 1000) % 60)
      var str = ''
      if (hour > 0) {
        str += hour.toString() + ':'
      }
      str += (second < 10 ? '0' + second : second) + ':' + (minute < 10 ? '0' + minute : minute)
      data.datetime = str
      data.info = res.data
      console.log(data.info)
      var errorList = res.data.logList.filter((x: any) => x.Result !== 1)
      data.errorList = errorList.length
      if (data.info.exam.Score >= data.info.exam.MinScore) {
        if (getUserInfo.TrainStudyStatus === 0) {
          GetCompleteNewestStore(data.details.plan.Id).then((res: any) => {
            if (res.code == 1) {
              GetAddUserNewestPlan()
            } else {
              getUser()
            }
          })
        }
      }
    }
  })

  // 关停期间
  if (getUserInfo.UnWorkStudyStatus == 2) {
    var arr = {
      planId: data.details.plan.Id
    }
    PostCheckPlanStudyComplete(arr).then((res: any) => {
      if (res.code == 1) {
        getUser()
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    tabs
  },
  emits: ['closeWindow'],
  props: {
    // 打卡记录数据
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      info: {}, //考试结果详情
      details: props.details,
      datetime: 0
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
.SchoolReport {
  .SchoolReport {
    background: url(/src/assets/img/hr/SchoolView/TestQuestions/achievementQualified.png);
    background-size: 100% 100%;
    width: 360px;
    background-repeat: no-repeat;
    height: 520px;
  }
  .SchoolReport_bg {
    background: url(/src/assets/img/hr/SchoolView/TestQuestions/achievementUnqualified.png);
    background-size: 100% 100%;
    width: 360px;
    background-repeat: no-repeat;
    height: 520px;
  }
  .scoreResultScore {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #f74e10;
    text-align: center;
  }
}
</style>
