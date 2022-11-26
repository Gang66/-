<template>
  <div class="TestQuestionsTemplate">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="考试中心">
      <template #title>
        <div></div>
      </template>
      <div class="QuestionBankIndex-content">
        <div class="expect-time">
          <div class="time-box flex justify-center items-center mb-3 flex-row" v-html="data.expectTime"></div>
          <div class="time-text text-sm text-center bf-font-blue-color">剩余时间</div>
        </div>
        <header class="bg-white test-header">
          <div class="flex justify-between items-center">
            <div>
              <div class="text-lg font-semibold">考试中心</div>
              <div class="flex w-full mt-2">
                <template v-if="data.total > 0">
                  <el-progress :percentage="(100 / Number(data.total)) * data.testQuestionsDetails.index" :stroke-width="10" class="w-600" :show-text="false" />
                  <div class="ml-6">
                    <span class="bf-font-blue-color">已完成{{ data.testQuestionsDetails.index }}题</span>/<span>共{{ data.total }}题</span>
                  </div>
                </template>
              </div>
            </div>
            <div>
              <el-button type="primary" plain @click="closeWindow('close')">回到工作台</el-button>
              <el-button type="primary" plain @click="closeWindow('close')">关闭</el-button>
            </div>
          </div>
        </header>
        <main class="mt-2">
          <div class="flex">
            <div class="bg-white m_left h-full">
              <div class="flex items-center">
                <div>{{ data.testQuestionsDetails.index }}、</div>
                <template v-for="val in data.questionTypeList">
                  <div class="bf-font-blue-color" v-if="val.DicKey == data.testQuestionsDetails.QuestionType">【{{ val.DicValue }}】</div>
                </template>
                <div style="width: 656px">{{ data.testQuestionsDetails.Title }}（{{ data.testQuestionsDetails.Score }}分）</div>
              </div>
              <div class="mt-5">
                <template v-if="data.testQuestionsDetails.QuestionType == 1">
                  <!-- 单选题 -->
                  <el-radio-group v-model="data.testQuestionsDetails.Answer" class="ml-4" @change="AnswerEvent">
                    <template v-for="(option, i) in data.testQuestionsDetails.Options">
                      <el-radio :label="option.label" size="large">{{ option.label }}、 {{ option.value }}</el-radio>
                    </template>
                  </el-radio-group>
                </template>
                <!-- 多选题 -->
                <template v-else-if="data.testQuestionsDetails.QuestionType == 2">
                  <el-checkbox-group v-model="data.testQuestionsDetails.AnswerArray" class="question-options-component" @change="AnswerEvent">
                    <template v-for="(option, i) in data.testQuestionsDetails.Options">
                      <el-checkbox :label="option.label">{{ option.label }}、 {{ option.value }}</el-checkbox>
                    </template>
                  </el-checkbox-group>
                </template>
                <!-- 判断题 -->
                <template v-else-if="data.testQuestionsDetails.QuestionType == 3">
                  <el-radio-group v-model="data.testQuestionsDetails.Answer" class="question-options-component" @change="AnswerEvent">
                    <template v-for="(option, i) in data.testQuestionsDetails.Options">
                      <el-radio :label="option.label">{{ option.label }}、 {{ option.value }}</el-radio>
                    </template>
                  </el-radio-group>
                </template>
              </div>
              <div class="mt-2" v-if="data.testQuestionsDetails.isAnswer && !data.details.isExamination">
                <!-- 单选答案 -->
                <div class="text-sm" v-if="data.testQuestionsDetails.QuestionType != 2">答案：{{ data.testQuestionsDetails.Correct }}</div>
                <!-- 多选答案 -->
                <div class="text-sm" v-else>答案：{{ data.testQuestionsDetails.CorrectArray }}</div>
                <div class="text-sm">解析：{{ data.testQuestionsDetails.Analyze }}</div>
              </div>
              <div class="mt-5">
                <!-- 刷题 -->
                <template v-if="!data.details.isExamination">
                  <template v-if="data.testQuestionsDetails.index > 1">
                    <el-button @click="nextQuestion(data.testQuestionsDetails.index, 'up')">上一题</el-button>
                  </template>
                  <template v-if="data.testQuestionsDetails.index == data.testQuestionsList.length">
                    <el-button @click="handleSaveAndNext">交卷</el-button>
                  </template>
                  <el-button v-else @click="nextQuestion(data.testQuestionsDetails.index, 'down', data.testQuestionsDetails)">下一题</el-button>
                </template>
                <!-- 考试 -->
                <template v-else>
                  <template v-if="data.testQuestionsDetails.index == data.total.total && data.details.isExamination">
                    <el-button @click="handleSaveAndNext(data.testQuestionsDetails, true)">交卷</el-button>
                  </template>
                  <el-button v-else @click="handleSaveAndNext(data.testQuestionsDetails, false)">下一题</el-button>
                </template>
              </div>
            </div>
            <div class="overflow-hidden">
              <div class="bg-white ml-2 m-right flex-grow">
                <div class="mr_header flex items-center">
                  <div class="mrh_hr"></div>
                  <div class="ml-2">试题卡</div>
                </div>
                <!-- 刷题 -->
                <div class="mrh_content mt-2 overflow-hidden" v-if="!data.details.isExamination">
                  <div v-for="(item, index) in data.total" :key="index"
                    :class="item.isStudy == true ? 'bg-red-500 text-white' : item.isStudy == false ? 'bg-green-500 text-white' : ''" class="left-answer-tip">
                    {{ item.index }}
                  </div>
                </div>
                <!-- 考试 -->
                <div class="mrh_content mt-2 overflow-hidden" v-else>
                  <div v-for="(item, index) in data.total" :key="index" :class="formatAnswerColor(item.result)" class="left-answer-tip">
                    {{ item.num }}
                  </div>
                </div>
              </div>
              <div class="bg-white ml-2 mt-2 m-right flex-grow" style="min-height: 100px">
                <div class="mr_header flex items-center">
                  <div class="mrh_hr"></div>
                  <div class="ml-2">考生信息</div>
                </div>
                <div class="mrh_content mt-2 overflow-hidden flex items-center">
                  <el-avatar shape="square" :size="80" src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" />
                  <div class="ml-2">
                    <div>
                      <span>姓　名：</span>
                      <span class="bf-text-color-regular">{{ data.userInfo.RealName }}</span>
                    </div>
                    <div>
                      <span>事业部：</span>
                      <span class="bf-text-color-regular">{{ data.userInfo.company }}</span>
                    </div>
                    <div>
                      <span>部　门：</span>
                      <span class="bf-text-color-regular">{{ data.userInfo.department }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </OpenWindow>
    <SchoolReport v-if="data.SchoolReportWindow.view" @closeWindow="closeWindow('submit', false)" :details="data.details"></SchoolReport>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { changeLearningStatus } from '/@/assets/ts/hr/FurtherModalIndex'
import { defineComponent, onMounted, onUnmounted, reactive, ref, SetupContext } from 'vue'
import SchoolReport from '../_Components/SchoolReport.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetExamTimeSpan, PostCheatExam, PostCompletePlanCourseTest, PostGetCourseTest, PostGetNextTestFromPaper, PostSaveTestFormPaper } from '/@/api/hr/School/Train'
import { useRouter } from 'vue-router'
const store = useCommonStore() //获取缓存数据
const useStore = useLayoutStore() //获取用户缓存数据
const PostGetNextTestFromPaperEvent = async (data: any, closeWindow: any) => {
  var val = {
    planId: data.details.plan.Id,
    ExamId: data.details.CoursewareInfo.ExamId,
    PaperId: data.details.CoursewareInfo.Exam.PaperId
  }
  // 获取考试试卷
  await PostGetNextTestFromPaper(val).then((res: any) => {
    if (res.code == 1) {
      res.data.next.Options = JSON.parse(res.data.next.Options) //选择数据
      data.testQuestionsDetails = res.data.next
      data.testQuestionsDetails.AnswerArray = []
      data.testQuestionsDetails.index = res.data.result.length + 1
      var answers = []
      for (let index = 0; index < res.data.total; index++) {
        answers.push({
          num: index + 1,
          result: 0
        })
      }
      for (let r = 0; r < res.data.result.length; r++) {
        answers[r].result = res.data.result[r]
      }
      data.total = answers
      data.total.total = res.data.total
    } else {
      ElMessageBox.alert(res.message, '警告', {
        // if you want to disable its autofocus
        // autofocus: false,
        confirmButtonText: '确定',
        callback: (action: any) => {
          closeWindow('submit', false)
        }
      })
    }
  })
}
const GetContractManagementInfoEvent = async (data: any, setSecondInterval: any, closeWindow: any) => {
  if (JSON.stringify(data.details) != '{}') {
    // 是否是考试
    if (data.details.isExamination) {
      await PostGetNextTestFromPaperEvent(data, closeWindow)
      // 获取考试剩余时间
      await GetExamTimeSpan(data.details.CoursewareInfo.ExamId).then((res: any) => {
        if (res.code == 1) {
          data.examTimeSeconds = res.data
          // 定时器开始
          setSecondInterval()
        }
      })
    } else {
      // 刷题
      var arr = {
        planId: data.details.plan.Id,
        courseId: data.details.CoursewareInfo.Id,
        ExamId: ''
      }
      PostGetCourseTest(arr).then((res: any) => {
        if (res.code == 1) {
          if (res.data) {
            res.data.forEach((element: any, index: number) => {
              element.Options = JSON.parse(element.Options) //选择数据
              element.index = index + 1 //第几道题
              element.isStudy = null //答题卡样式显示
              element.isAnswer = false //答案显示
            })
            data.testQuestionsList = res.data
            data.total = data.testQuestionsList
            data.testQuestionsDetails = res.data[0]
          }
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  }
  // 获取试题类型
  store.getDict('hr_question_type').then((res: any) => {
    data.questionTypeList = res
  })
  // 获取当前考生信息
  data.userInfo = useStore.getUserInfo
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  // 监听试题选择
  const AnswerEvent = () => {
    data.testQuestionsDetails.isAnswer = true
  }
  // 刷题考试公用方法
  const publicEvent = () => {
    var isReturn = false
    var c = false
    // QuestionType == 2 多选 考试是后台判断答案（formatAnswerColor()方法） 刷题是前台判断答案(publicEvent()方法)
    if (data.testQuestionsDetails.QuestionType == 2) {
      if (!data.testQuestionsDetails.AnswerArray || data.testQuestionsDetails.AnswerArray.length <= 0) {
        ElMessage({
          message: '未进行作答，无法进入下一道题',
          type: 'warning'
        })
        return (isReturn = true)
      }
      // 排序后比较答案
      if (!data.details.isExamination) {
        c = data.testQuestionsDetails.AnswerArray.length === JSON.parse(data.testQuestionsDetails.CorrectArray).length && data.testQuestionsDetails.AnswerArray.sort().toString() === JSON.parse(data.testQuestionsDetails.CorrectArray).sort().toString()
        if (c) {
          data.testQuestionsDetails.isStudy = false
        } else {
          data.testQuestionsDetails.isStudy = true
        }
      }
    } else {
      if (!data.testQuestionsDetails.Answer) {
        ElMessage({
          message: '未进行作答，无法进入下一道题',
          type: 'warning'
        })
        return (isReturn = true)
      }
      if (data.testQuestionsDetails.Answer == data.testQuestionsDetails.Correct) {
        data.testQuestionsDetails.isStudy = false
      } else {
        data.testQuestionsDetails.isStudy = true
      }
    }
    return isReturn
  }
  // 上一道 下一道 题
  const nextQuestion = async (index: number, type: string, val: any) => {
    //刷题
    if (type == 'up') {
      data.testQuestionsDetails = data.testQuestionsList[index - 2]
    } else {
      var isReturn: any = publicEvent()
      if (isReturn == false) {
        data.testQuestionsDetails = data.testQuestionsList[index]
      }
    }
  }
  // 交卷 考试
  const handleSaveAndNext = (val: any, type: any) => {
    var isReturn: any = publicEvent()
    if (isReturn) {
      return
    }
    let v = JSON.parse(JSON.stringify(val))
    var arr = {
      planId: data.details.plan.Id,
      courseId: data.details.CoursewareInfo.Id
    }
    // isExamination 是否是考试
    if (data.details.isExamination) {
      v.Options = JSON.stringify(v.Options)
      v.AnswerArray = JSON.stringify(v.AnswerArray)
      arr = Object.assign(arr, v)
      PostSaveTestFormPaper(arr).then((res: any) => {
        if (res.code == 1) {
          if (type) {
            data.SchoolReportWindow.view = true
          } else {
            PostGetNextTestFromPaperEvent(data, closeWindow)
          }
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      PostCompletePlanCourseTest(arr).then((res: any) => {
        if (res.code == 1) {
          ElMessageBox.alert('刷题结束，是否退出刷题', '刷题结束', {
            confirmButtonText: '确定',
            callback: (action: any) => {
              closeWindow('submit')
            }
          })
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  }
  // 筛选 试题卡答案
  const formatAnswerColor = (val: any) => {
    var c = ''
    switch (val) {
      case 1:
        c = 'bg-green-500 text-white'
        break
      case 2:
        c = 'bg-red-500 text-white'
        break
      default:
        break
    }
    return c
  }
  return {
    nextQuestion,
    handleSaveAndNext,
    AnswerEvent,
    formatAnswerColor
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    SchoolReport
  },
  emits: ['closeWindow'],
  props: {
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const router = useRouter()
    let data = reactive({
      userInfo: {}, //用户信息
      testQuestionsList: [], //试题列表
      testQuestionsDetails: { index: 0 }, //试题详情
      questionTypeList: [], //试题类型
      num: 0, //考试中途离开次数
      total: 0, //试题总数
      details: props.details,
      examTimeSeconds: 3000,
      SchoolReportWindow: {
        view: false
      },
      expectTime: '<div class="item hour"><span>0</span>时</div> <div class="item minute"><span>0</span>分</div> <div class="item second"><span>0</span>秒</div> '
    })
    let secondInterval = ref()
    // 开启定时器
    const setSecondInterval = () => {
      clearInterval(secondInterval.value)
      secondInterval.value = setInterval(() => {
        var expectTime = data.examTimeSeconds
        if (expectTime > 0) {
          var otherTime = 0
          var hour = Math.floor(expectTime / 60 / 60)
          otherTime = expectTime - 60 * 60 * hour
          var minute = Math.floor(otherTime / 60)
          otherTime = otherTime - 60 * minute
          var second = Math.floor(otherTime)
          data.expectTime = `<div class="item hour"><span>${hour}</span>时</div> <div class="item minute"><span>${minute}</span>分</div> <div class="item second"><span>${second}</span>秒</div> `
          data.examTimeSeconds--
        } else {
          data.expectTime = '考试结束'
          data.details.isEndTime = true
          data.SchoolReportWindow.view = true

          clearInterval(secondInterval.value)
        }
      }, 1000)
    }
    // 监听页面关闭 isShow false 为不显示中体离场
    const closeWindow = (type: string, isShow: Boolean) => {
      if (isShow == false) {
        context.emit('closeWindow', type)
        data.SchoolReportWindow.view = false
        setTimeout(() => {
          changeLearningStatus(useStore.getUserInfo, router)
        }, 500)
        return
      }
      if (data.details.isExamination) {
        ElMessageBox.confirm('中途离开考试，考试时间不会停止，请谨慎选择！', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            data.SchoolReportWindow.view = false
            context.emit('closeWindow', type)
          })
          .catch(() => {})
      } else {
        context.emit('closeWindow', type)
        data.SchoolReportWindow.view = false
      }
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-full',
      boxHeight: 'h-full',
      boxPaddingTop: 'pt-0',
      boxPaddingBottom: 'pb-0'
    })
    onMounted(() => {
      // 离开当前页面(防作弊)
      window.onblur = function () {
        if (data.details.isExamination == false) return
        data.num++
        PostCheatExam({
          planId: data.details.plan.Id,
          courseId: data.details.CoursewareInfo.Id,
          examId: data.details.CoursewareInfo.ExamId
        })
        if (data.num >= 3) {
          data.SchoolReportWindow.view = true
          clearInterval(secondInterval.value)
        } else {
          ElMessageBox.alert('考试途中请勿进行其他操作， 超过3次将强制交卷！（第' + data.num + '次）', '警告', {
            dangerouslyUseHTMLString: true
          })
        }
      }
      onUnmounted(() => {
        window.onblur = null
        clearInterval(secondInterval.value)
      })
      // 回到当前页面
      window.onfocus = function () {}
      // 根据Id获取详情
      GetContractManagementInfoEvent(data, setSecondInterval, closeWindow)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      setSecondInterval,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.TestQuestionsTemplate {
  :deep(.bf-windows-content) {
    max-width: none !important;
    background: url(../../../../assets/img/hr/SchoolView/TestQuestions/TestQuestions-bg.jpg) no-repeat;
    background-size: 100% 100%;
    height: 100%;
  }
  /* 最大宽度限制 */
  @media screen and (min-width: 106rem) {
    /*   .bf-content {
        width: 90rem;
        margin: 0 auto;
    } */
    .QuestionBankIndex-content {
      height: 100vh;
      width: 70rem;
      margin: 0 auto;
      padding-top: 2rem;
    }
  }
  .test-header {
    min-height: 85px;
    border-radius: 4px;
    padding: 20px;
  }
  .expect-time {
    margin-bottom: 20px;
    .time-box {
      :deep(.item) {
        width: 80px;
        height: 80px;
        background-color: #fff;
        border-radius: 4px;
        margin: 0 8px;
        text-align: center;
        font-size: 0.9rem;
        line-height: 1.1;
        color: #183059;
        display: flex;
        flex-direction: column;
        justify-content: center;
        span {
          display: block;
          font-size: 35px;
          margin-bottom: 2px;
        }
        &.hour {
          background-color: #ef2f3c;
          color: #fff;
          span {
            color: #183059;
          }
        }
        &.minute {
          background-color: #276fbf;
          color: #fff;
          span {
            color: #183059;
          }
        }
        &.second {
          background-color: #f0a202;
          color: #fff;
          span {
            color: #183059;
          }
        }
      }
    }
  }
  main {
    .left-answer-tip {
      width: 28px;
      height: 30px;
      margin: 5px;
      border: 1px solid rgba(180, 180, 180, 0.5);
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      border-radius: 4px;
      float: left;
    }
    .m_left {
      width: 825px;
      min-height: 275px;
      border-radius: 4px;
      padding: 20px;
      padding-top: 30px;
      font-size: 18px;
    }
    .m-right {
      min-height: 300px;
      border-radius: 4px;
      padding: 10px;
      width: 287px;
      .mr_header {
        font-size: 16px;
        border-bottom: 1px solid var(--el-border-color);
        padding-bottom: 9px;
        .mrh_hr {
          content: '';
          width: 6px;
          height: 1.2rem;
          border: 1px solid #ff4001;
          border-radius: 3px;
          background-color: #ff4001;
          display: block;
        }
        .mrh_content {
          overflow: hidden;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .answer-success {
            background-color: #85ce61;
            border-color: #85ce61;
            color: white;
          }
          .answer-warning {
            background-color: #909399;
            border-color: #909399;
            color: white;
          }
          .answer-error {
            background-color: #f56c6c;
            border-color: #f56c6c;
            color: #fff;
          }
        }
      }
    }
    :deep(.el-radio) {
      width: 100%;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    :deep(.el-checkbox) {
      width: 100%;
    }
    :deep(.el-checkbox__label) {
      word-break: normal;
      display: inline-grid;
      white-space: pre-line;
      word-wrap: break-word;
      overflow: hidden;
      line-height: 15px;
    }
  }
}
</style>
