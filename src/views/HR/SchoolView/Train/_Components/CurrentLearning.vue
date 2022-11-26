
<template>
  <div class="p-4 text-sm CurrentLearning">
    <!-- <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
      @current-change="handleCurrentChange"> -->
    <div v-for="(item,index) in data.tableData" :key="index">
      <section v-if="formatTableName(item)[1]!=viewState">
        <header class="bg-gray-50  flex items-center px-4 mb-4 py-3" :class="formatTableName(item)[1]=='success'?'bf-font-green-color':''">
          <div class="text-sm font-semibold  w-6/12"><span>{{formatTableName(item)[0]}}</span></div>
          <div class="text-sm font-semibold text-center w-32">学习时长</div>
          <div class="text-sm font-semibold text-center w-32">状态</div>
          <div class="text-sm font-semibold text-center w-96" v-if="item.plan.UserStatus!=100">
            <div>开始时间：{{ parseTimeEvent(item.plan.BeginDate) }}</div>
            <div>截止时间：{{ parseTimeEvent(item.plan.EndDate) }}</div>
          </div>
          <div class="text-sm font-semibold text-center w-96" v-else>已完成</div>
        </header>
        <main class=" px-4" v-for="(val,index) in item.courses" :key="index">
          <div class="flex items-center">
            <div class="w-6/12 flex items-center">
              <el-image style="width: 160px; height: 80px; border-radius:4px;" :src="remoteUrlEvent(val.CoverImg)" fit="cover" />
              <div class="ml-4 ">
                <div class="mb-3 font-semibold">{{val.Name}}</div>
                <template v-if="val.FileType=='PDF'">
                  <el-icon :size="32">
                    <el-icon-Document />
                  </el-icon>
                </template>
                <template v-else>
                  <el-icon :size="32">
                    <el-icon-VideoPlay />
                  </el-icon>
                </template>
              </div>
            </div>
            <div class="w-32 text-center">
              {{formatUseTime(val)}}
            </div>
            <div class="w-32 text-center">
              <el-button :type="formatStatus(val,item)[1]" link>{{formatStatus(val,item)[0]}}</el-button>
            </div>
            <div class="text-center w-96">
              <template v-if="val.IsPlanExam">
                <template v-if="item.plan.ExamResult === 1">
                  <template v-if="item.plan.Force == 1 && item.plan.IsAuto == 1">
                    <el-button size="small" plain type="success" @click="handleJumpTest(item,val,1)">重新考试
                    </el-button>
                  </template>
                  <template v-else>
                    <el-button size="small" plain type="success" @click="handleJumpTest(item,val,1)">已通过</el-button>
                  </template>
                </template>
                <template v-else>
                  <el-button size="small" plain type="primary" @click="handleJumpTest(item,val,1)">去考试</el-button>
                </template>
              </template>
              <template v-else>
                <template v-if="val.SummaryStatus !== 100">
                  <el-button size="small" plain @click="handleJumpStudy(item,val)">去学习</el-button>
                </template>
                <template v-else>
                  <el-button size="small" plain type="success" @click="handleJumpStudy(item,val)">已学习</el-button>
                </template>
                <template v-if="val.SummaryStatus === 100 && item.plan.IsCourseTest == 1 && val.TestCount>0">
                  <template v-if="val.TestStatus !== 100">
                    <el-button size="small" plain type="primary" @click="handleJumpTest(item,val,0)">去刷题</el-button>
                  </template>
                  <template v-else>
                    <el-button size="small" plain type="success" @click="handleJumpTest(item,val,0)">继续刷题</el-button>
                  </template>
                </template>
                <template
                  v-if="(item.plan.IsCourseTest == 1 && val.TestStatus === 100 || item.plan.IsCourseTest == 0 && val.SummaryStatus === 100) && item.plan.IsCourseExam == 1 && val.Exam != null">
                  <template v-if="val.ExamStatus !== 100">
                    <el-button size="small" plain type="primary" @click="handleJumpTest(item,val,1)">去考试</el-button>
                  </template>
                  <template v-else-if="val.ExamResult === 1">
                    <el-button size="small" plain type="success" @click="handleJumpTest(item,val,1)">已考试 {{val.ExamScore}}分</el-button>
                  </template>
                  <template v-else>
                    <el-button size="small" plain type="danger" @click="handleJumpTest(item,val,1)">去补考</el-button>
                  </template>
                </template>
              </template>
              <!-- <el-button type="success" plain @click="data.StudyTemplateWindow.show=true">已学习</el-button>
              <router-link to="/HR/SchoolView/Video/Index">
                <el-button type="success" plain class="ml-4">视频学习</el-button>
              </router-link>
              <el-button type="success" class="ml-4" plain @click="data.TestQuestionsTemplateWindow.show=true">考试刷题</el-button> -->
            </div>
          </div>
          <el-divider />
        </main>
      </section>
    </div>
    <!-- </table-search> -->
    <!-- pdf模板 -->
    <StudyTemplate v-if="data.StudyTemplateWindow.show" @closeWindow="data.StudyTemplateWindow.show=false" :Id="data.StudyTemplateWindow.Id"
      :CourseId="data.StudyTemplateWindow.CourseId"></StudyTemplate>
    <!--刷题 考试模板 -->
    <TestQuestionsTemplate v-if="data.TestQuestionsTemplateWindow.show" @closeWindow="closeWindow" :details="data.TestQuestionsTemplateWindow.details"></TestQuestionsTemplate>
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, reactive } from 'vue'
import StudyTemplate from '../../StudyTemplate/StudyTemplate.vue'
import TestQuestionsTemplate from '../../_Components/TestQuestionsTemplate.vue'
import { GetStudyTrainInfo } from '/@/api/hr/School/Train'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { ElMessage } from 'element-plus'
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetStudyTrainInfo(form).then((res: any) => {
    if (res.code == 1) {
      // 大考塞进课件中
      res.data.records.forEach((element: any) => {
        if (element.plan.exam != null) {
          element.courses.push({
            CoverImg: element.plan.CoverImg,
            Name: element.plan.exam.Name,
            ContentType: ['EXAM'],
            StudyUseTime: 0,
            SummaryUseTime: 0,
            TestUseTime: 0,
            IsPlanExam: true,
            Exam: element.plan.exam,
            ExamId: element.plan.exam.Id,
            PaperId: element.plan.exam.PaperId,
            PlanId: element.plan.Id
          })
        }
      })
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 网址拼接
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 学习时长
  const formatUseTime = (row: any) => {
    return Math.floor((row.StudyUseTime + row.SummaryUseTime + row.TestUseTime) / 60) + '分钟'
  }
  // 筛选计划 学习进度
  const formatTableName = (train: any) => {
    var courses = []
    var course_total = 0
    var course_success = 0
    // 大考塞进进度
    if (train.plan.exam != null) {
      courses = train.courses.filter((f: any) => !f.IsPlanExam)
      course_total = 1
      if (train.plan.ExamResult === 1) {
        course_success = 1
      }
    } else {
      courses = train.courses
    }
    course_total += courses.length
    for (let i = 0; i < courses.length; i++) {
      if (train.plan.IsCourseExam === 1 && courses[i].Exam != null) {
        if (courses[i].ExamResult === 1) {
          course_success++
        }
      } else if (train.plan.IsCourseTest === 1 && courses[i].TestCount > 0) {
        if (courses[i].TestStatus === 100) {
          course_success++
        }
      } else if (courses[i].StudyStatus == 100 && courses[i].SummaryStatus === 100) {
        course_success++
      }
    }
    return [train.plan.Name + `（${course_success}/${course_total}）${course_success === course_total ? '培训通过' : ''}`, course_success === course_total ? 'success' : 'info']
  }
  // 筛选学习状态
  const formatStatus = (row: any, plan: any) => {
    // IsPlanExam是否大考考试
    if (row.IsPlanExam) return ['考试', 'primary']
    if (plan == null) return ['未知', 'danger']
    // StudyStatus 学习状态 StudyUseTime 学习时间 SummaryStatus 笔记状态 IsCourseTest 是否刷题 TestStatus 刷题状态
    //  IsCourseExam 是否考试  ExamStatus 考试状态 ExamResult 考试通过状态 1是通过
    if (row.StudyStatus === 0 && row.StudyUseTime === 0) {
      return ['未学习', 'primary']
    } else {
      var info = ['学习中', 'warning']
      if (row.SummaryStatus === 100) {
        info = ['已通过', 'success']
      } else {
        return info
      }
      if (plan.IsCourseTest === 1) {
        if (row.TestStatus === 100) {
          info = ['已通过', 'success']
        } else {
          info = [`待刷题(${row.TestStatus} / ${row.TestCount})`, 'danger']
          return info
        }
      }
      if (plan.IsCourseExam === 1 && plan.exam != null) {
        if (row.ExamStatus === 100) {
          if (row.ExamResult === 1) {
            return ['已通过', 'success']
          } else {
            return ['待补考', 'danger']
          }
        } else {
          return ['', '']
        }
      } else {
        return info
      }
    }
  }
  // 监听页面关闭
  const closeWindow = (type: string) => {
    console.log('进来了2')
    data.TestQuestionsTemplateWindow.show = false
    search()
  }
  // 学习课件 val 计划数据
  const handleJumpStudy = (val: any, value: any) => {
    data.StudyTemplateWindow.Id = val.plan.Id
    data.StudyTemplateWindow.CourseId = value.Id
    data.StudyTemplateWindow.show = true
  }
  // 刷题 考试 事件 type 1为考试 0为刷题
  const handleJumpTest = (val: any, value: any, type: any) => {
    if (value.ExamId <= 0 && value.Exam == null) {
      ElMessage({
        message: '警告, 无考试信息',
        type: 'warning'
      })
      return
    }
    var isNum = 100
    if (type == 1) {
      for (var i = 0; i < val.courses.length; i++) {
        if (val.courses[i].IsPlanExam) {
          if (val.courses[i].ExamResult != 1 && val.courses[i].Stage == 1 && val.courses[i].ExamCount != 0) {
            isNum = 1
            break
          } else if (val.courses[i].ExamResult != 1 && val.courses[i].Stage != 1 && val.courses[i].ExamCount != 0) {
            isNum = 2
            break
          } else if (val.courses[i].ExamCount == 0 && val.courses[i].SummaryStatus != 100) {
            isNum = 3
          }
        }
      }
    }
    if (isNum != 100) {
      ElMessage({
        message: '请学习结束后，进行大考',
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
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    remoteUrlEvent,
    formatUseTime,
    formatStatus,
    handleJumpStudy,
    formatTableName,
    handleJumpTest,
    closeWindow
  }
}
export default defineComponent({
  components: { StudyTemplate, TestQuestionsTemplate, TableSearch },
  props: {
    viewState: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10000,
      status: props.viewState == 'info' ? 100 : ''
    })
    var data = reactive({
      tableData: [], //列表数据
      // pdf模板
      StudyTemplateWindow: {
        show: false
      },
      // 客户模板
      TestQuestionsTemplateWindow: {
        show: false
      }
    })

    return { data, form, ...tableRender(form, data) }
  }
})
</script>

<style lang="postcss" scoped>
.CurrentLearning {
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 16px 0;
  }
}
</style>
