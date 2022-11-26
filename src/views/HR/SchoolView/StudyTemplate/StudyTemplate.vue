<template>
  <div class="StudyTemplate">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="">
      <template #title>
        <div class="absolute right-10 top-5 z-50">
          <!-- <el-button plain class="w-20" @click="closeWindow('close')">关闭</el-button> -->
        </div>
      </template>
      <div class="flex" v-if="temData">
        <div class="w-full">
          <div class="bg-white m-2 p-3">
            <div class="font-semibold text-lg">{{ temData.plan.Name }}</div>
            <div class="flex">
              <el-progress :percentage="Number((100 / data.numOfPages) * data.pagenum)" :stroke-width="10" class="w-3/6" :show-text="false" />
              <div class="ml-6">
                <span class="bf-font-blue-color">已学习{{ data.pagenum }}页</span>/<span>共{{ data.numOfPages }}页</span>
              </div>
            </div>
          </div>
          <div class="flex PDFTemplate" v-if="temData.CoursewareInfo.FileType == 'PDF'">
            <div class="relative w-full" v-if="temData.CoursewareInfo.pdf">
              <PDFTemplate ref="PDFTemplateRef" :key="temData.CoursewareInfo.pdf" @watchPDFEvent="watchPDFEvent" :url="remoteUrlPDF(temData.CoursewareInfo.pdf.SavePath)">
                <template #note>
                  <div class="absolute z-50 bottom-10 right-16" v-show="data.pagenum != 1 && temData.CoursewareInfo.Note == 1 && data.pagenum != data.numOfPages">
                    <el-button :type="isNote ? 'success' : 'danger'" plain @click="noteFormEvent(temData, data.pagenum)">第{{ data.pagenum }}页笔记</el-button>
                  </div>
                  <div class="absolute z-50 bottom-10 right-16" v-show="interval">
                    <el-button type="primary" plain @click="ScoringFormEvent(temData, data.pagenum)">评价本课程</el-button>
                  </div>
                </template>
              </PDFTemplate>
            </div>
          </div>
          <VideoTemplate v-else :url="remoteUrlEvent(temData.CoursewareInfo.video.SavePath)" @endedEvent="ScoringFormEvent(temData, data.pagenum)"></VideoTemplate>
        </div>
        <div class="absolute top-0 right-0">
          <el-button @click="closeWindow('close')" class="w-16 elButton" style="height: 64px">
            <img class="img" src="/src/assets/img/hr/SchoolView/NewcomerTraining/close_mask.png" />
            <div class="btn-bg"><img class="bg" src="/src/assets/img/hr/SchoolView/NewcomerTraining/close_bg.png" /></div>
          </el-button>
        </div>
        <!-- 计划信息 -->
        <div class="">
          <div class="bg-white my-2 mr-2 p-2">
            <div class="flex">
              <div class="h-6 bf-bg-blue-color w-1 rounded"></div>
              <div class="ml-1">计划信息</div>
            </div>
            <el-card shadow="always" class="mt-2" style="width: 268px; height: 134px" :body-style="{ padding: '0', width: '268px', height: '134px' }">
              <el-image style="width: 268px; height: 134px" :src="remoteUrlEvent(temData.plan.CoverImg)" fit="cover" />
            </el-card>
            <div class="font-semibold text-lg mt-2 bf-text-color-regular">{{ temData.plan.Name }}</div>
          </div>
          <div class="bg-white my-2 mr-2 p-2 min-h-Courseware">
            <div class="flex">
              <div class="h-6 bf-bg-blue-color w-1 rounded"></div>
              <div class="ml-1">课件列表</div>
            </div>
            <template v-if="data.courseList.length > 0">
              <el-card shadow="always" class="mt-2" :body-style="{ padding: '0' }" v-for="(item, index) in data.courseList">
                <el-image style="width: 268px; height: 134px" :src="remoteUrlEvent(item.CoverImg)" fit="cover" />
                <div class="bg-blue-50 p-2">
                  <div class="text-base font-medium">{{ item.Name }}</div>
                  <div class="text-xs flex items-center justify-between">
                    <div class="mt-2">
                      <div class="text-xs mb-1">最低时长：{{ item.MinMinutes }}分钟</div>
                      <div>
                        已 学 习 ：<span class="bf-font-green-color">{{ formatUseTime(item) }}</span>
                      </div>
                    </div>
                    <el-button @click="openCourseWares(item)">开始学习</el-button>
                  </div>
                </div>
              </el-card>
            </template>
            <template v-else>
              <el-card shadow="always" class="mt-2" :body-style="{ padding: '0' }" v-for="(item, index) in temData.courses">
                <el-image style="width: 268px; height: 134px" :src="remoteUrlEvent(item.CoverImg)" fit="cover" />
                <div class="bg-blue-50 p-2">
                  <div class="text-base font-medium">{{ item.Name }}</div>
                  <div class="text-xs flex items-center justify-between">
                    <div class="mt-2">
                      <div class="text-xs mb-1">最低时长：{{ item.MinMinutes }}分钟</div>
                      <div>
                        已 学 习 ：<span class="bf-font-green-color">{{ formatUseTime(item) }}</span>
                      </div>
                    </div>
                    <el-button @click="openCourseWares(item)">开始学习</el-button>
                  </div>
                </div>
              </el-card>
            </template>
          </div>
        </div>
      </div>
    </OpenWindow>
    <!-- 学习笔记 -->
    <noteForm v-if="data.noteFormWindow.show" @closeWindow="noteFormCloseWindow" :title="'第' + data.pagenum + '学习笔记'" :details="data.noteFormWindow.details"></noteForm>
    <!-- 评分 -->
    <ScoringForm v-if="data.ScoringFormWindow.show" @closeWindow="ScoringFormWindowEvent" title="课程评价" :details="data.ScoringFormWindow.details"> </ScoringForm>
  </div>
</template>
 
<script lang="ts">
import { defineComponent, getCurrentInstance, onBeforeUnmount, onMounted, onUnmounted, reactive, ref, SetupContext, watch } from 'vue'
import PDFTemplate from '../_Components/PDFTemplate.vue'
import VideoTemplate from '../_Components/VideoTemplate.vue'
import noteForm from './_Components/noteForm.vue'
import ScoringForm from './_Components/ScoringForm.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { Action, ElMessage, ElMessageBox } from 'element-plus'
import { GetPlanInfoForUser, PostAddCoursewareInfoWithUser, PostGetPageSummary, PostSaveStudyTime } from '/@/api/hr/School/Train'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { type } from 'os'
export default {
  name: 'PdfViewer',
  props: {
    url: {
      type: String,
      default: '/src/assets/img/hr/SchoolView/home/5345293d15804f21b03e05872e12c3ea.pdf'
    }, // pdf文件路径
    Id: {
      type: Number,
      default: null
    },
    CourseId: {
      type: Number,
      default: null
    },
    courseList: {
      type: Array,
      default: []
    }
  },
  // PDFViewer
  components: {
    OpenWindow,
    PDFTemplate,
    noteForm,
    ScoringForm,
    VideoTemplate
  },

  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    const PDFTemplateRef = ref()
    const { ctx: _this }: any = getCurrentInstance()
    // 计划数据
    let temData: any = ref()
    let isNote: any = ref(false) //true 为笔记已经书写
    const data = reactive({
      pagenum: 1, //当前页
      numOfPages: 0, //总页数
      isShow: false, //显示笔记按钮
      isVideo: false, //显示视频 测试数据
      Id: props.Id,
      courseList: props.courseList, //新人训上午下午课件
      noteList: [] as any[], //笔记列表
      // 笔记弹窗参数
      noteFormWindow: {
        show: false,
        Id: 0,
        details: { page: 0, summary: '' }
      },
      // 评分弹窗参数
      ScoringFormWindow: {
        show: false,
        Id: 0,
        details: { page: 0, summary: '', numOfPages: 0 }
      }
    })
    watch(
      data,
      (newValue, oldValue) => {
        if (data.noteList.length <= 0) {
          isNote.value = false
          return
        }
        for (var i = 0; i < data.noteList.length; i++) {
          if (data.noteList[i].PageId == newValue.pagenum) {
            isNote.value = true
            return
          } else {
            isNote.value = false
          }
        }
      },
      { immediate: true }
    )
    // 停留时间
    const timer: any = ref(null)
    // 定时时间(超过300秒提示)
    let TimingTime: any = ref(0)
    // 学习时间
    let Studytimer: any = ref(0)
    // 学习定时时间
    let StudyTime: any = ref(0)
    // 是否滚动到底部
    let interval: any = ref(false)
    // 点击后保存当前节点
    const nodeList: any = []
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-full',
      boxHeight: '',
      boxPaddingTop: 'pt-0',
      boxPaddingBottom: 'pb-0'
    })
    // 监听页面关闭
    const closeWindow = (type: any) => {
      context.emit('closeWindow', type)
    }
    // 监听笔记页面管理
    const noteFormCloseWindow = (type: any) => {
      if (type == 'submit') {
        PostGetPageSummaryEvent()
      }
      data.noteFormWindow.show = false
    }
    // 监听评分数据管理
    const ScoringFormWindowEvent = (type: any) => {
      data.ScoringFormWindow.show = false
      if (type == 'submit') {
        closeWindow('close')
      }
    }
    const watchPDFEvent = (value: any) => {
      data.pagenum = value.currentPageNum
      data.numOfPages = value.pdfPages
      let num = true
      if (data.pagenum >= data.numOfPages) {
        if (num == true) {
          num = false
          interval.value = true
          // data.ScoringFormWindow.show = true
          setTimeout(() => {
            num = true
          }, 2000)
        }
      } else {
        interval.value = false
      }
    }
    // 查询笔记数据
    const PostGetPageSummaryEvent = () => {
      var arr = {
        planId: temData.value.plan.Id,
        courseId: temData.value.CoursewareInfo.Id
      }
      PostGetPageSummary(arr).then((val: any) => {
        data.noteList = val.data
      })
    }
    let canvasHeight = 0
    let canvasE: any = null
    let num = true
    // 滚动监听
    const rollScroll = () => {
      data.numOfPages = PDFTemplateRef.value.data.pdfPages
      canvasE = document.getElementsByClassName('infinite-list')[0]
      data.pagenum = PDFTemplateRef.value.data.pdfPages
      if (data.pagenum >= data.numOfPages) {
        if (num == true) {
          num = false
          interval.value = true
          // data.ScoringFormWindow.show = true
          setTimeout(() => {
            num = true
          }, 2000)
        }
      } else {
        interval.value = false
      }
    }
    // 定时器任务
    const timerEvent = () => {
      clearInterval(timer.value)
      clearInterval(Studytimer.value)
      if (temData.value.CoursewareInfo.FileType == 'PDF') {
        // 停留学习时间
        timer.value = setInterval(() => {
          TimingTime.value++
          if (TimingTime.value >= 300) {
            clearInterval(timer.value)
            clearInterval(Studytimer.value)
            ElMessageBox.alert('学习停留超时5分钟，请尽快学习。', '学习停留超时', {
              confirmButtonText: '确定',
              callback: (action: Action) => {
                TimingTime.value = 0
                timerEvent()
              }
            })
          }
        }, 1000)
      }
      // 定时1分钟向后台提交一次数据
      Studytimer.value = setInterval(() => {
        StudyTime.value++
        if (StudyTime.value == 60) {
          StudyTime.value = 0
          PostSaveStudyTime({
            CoursewareId: temData.value.CoursewareInfo.Id,
            PlanId: temData.value.plan.Id
          })
          getDetailsEvent(1)
        }
      }, 1000)
    }
    // 学习时长
    const formatUseTime = (row: any) => {
      return Math.floor((row.StudyUseTime + row.SummaryUseTime + row.TestUseTime) / 60) + '分钟'
    }
    // 切换学习课件
    const openCourseWares = (value: any) => {
      temData.value.CoursewareInfo = value
      timerEvent()
      postUserEvent()
      PostGetPageSummaryEvent()
      setTimeout(() => {
        data.pagenum = PDFTemplateRef.value.data.currentPageNum
        data.numOfPages = PDFTemplateRef.value.data.pdfPages
      }, 1000)
    }
    // 监听页面滚动
    const handleScroll = () => {
      TimingTime.value = 0
      rollScroll()
    }
    // 网址拼接
    const remoteUrlEvent = (val: any) => {
      return remoteUrl(val)
    }
    const remoteUrlPDF = (val: any) => {
      return '/hr' + val
    }
    // 笔记事件
    const noteFormEvent = (val: any, page: number) => {
      data.noteFormWindow.details = val
      data.noteFormWindow.details.page = page
      if (data.noteList.length <= 0) {
        data.noteFormWindow.details.summary = ''
      } else {
        for (var i = 0; i < data.noteList.length; i++) {
          if (data.noteList[i].PageId == page) {
            data.noteFormWindow.details.summary = data.noteList[i].Summary
            data.noteFormWindow.show = true
            return
          } else {
            data.noteFormWindow.details.summary = ''
          }
        }
      }
      data.noteFormWindow.show = true
    }
    // 评价课程
    const ScoringFormEvent = (val: any, page: number) => {
      data.ScoringFormWindow.details = val
      data.ScoringFormWindow.details.page = page
      data.ScoringFormWindow.details.numOfPages = data.numOfPages
      data.ScoringFormWindow.show = true
    }
    // 提交学习人员
    const postUserEvent = () => {
      var arr = {
        CoursewareId: temData.value.CoursewareInfo.Id,
        Category: 1
      }
      PostAddCoursewareInfoWithUser(arr)
    }
    // 获取详情数据
    const getDetailsEvent = async (num: number) => {
      await GetPlanInfoForUser(props.Id, props.CourseId).then((res: any) => {
        if (res.code == 1) {
          if (num != 1) {
            temData.value = res.data
            if (res.data.courses.length > 0) {
              res.data.courses.forEach((element: any) => {
                if (element.Id == props.CourseId) {
                  temData.value.CoursewareInfo = element
                }
              })
            }
          } else {
            temData.value.courses = res.data.courses
            // 更新新人训课件学习时间
            if (data.courseList.length > 0) {
              var arr: any = []
              res.data.courses.forEach((element: any) => {
                if (element.Stage == data.courseList[0].Stage) {
                  arr.push(element)
                }
              })
              data.courseList = arr
            }
          }
        } else {
          ElMessageBox.alert(res.message, '警告', {
            confirmButtonText: '确定',
            callback: (action: Action) => {
              closeWindow('close')
            }
          })
        }
      })
    }
    onMounted(() => {
      // 创建监听滚动
      // window.addEventListener('scroll', handleScroll, true)
      setTimeout(() => {
        // rollScroll()
        data.numOfPages = PDFTemplateRef.value.data.pdfPages
      }, 1000)
      // 根据Id查询课件内容
      if (props.Id) {
        getDetailsEvent(0).then(() => {
          postUserEvent()
          PostGetPageSummaryEvent()
          timerEvent()
        })
      }
    })
    onUnmounted(() => {
      window.removeEventListener('scroll', handleScroll, true)
      clearInterval(timer.value)
      clearInterval(Studytimer.value)
    })
    return {
      closeWindow,
      boxStyle,
      data,
      rollScroll,
      handleScroll,
      timer,
      TimingTime,
      temData,
      remoteUrlEvent,
      remoteUrlPDF,
      openCourseWares,
      formatUseTime,
      PDFTemplateRef,
      interval,
      noteFormEvent,
      ScoringFormEvent,
      isNote,
      noteFormCloseWindow,
      ScoringFormWindowEvent,
      watchPDFEvent
    }
  }
}
</script>
<style lang="postcss" scoped>
.StudyTemplate {
  :deep(.max-w-screen-xl) {
    max-width: none !important;
    background: #a0cfff;
  }
  /* 去除表单错误提示文字 */
  :deep(.el-form-item__error) {
    color: var(--el-color-danger);
    font-size: 12px;
    line-height: 1;
    padding-top: 2px;
    position: absolute;
    top: 100%;
    left: 0;
    display: block;
  }
  .min-h-Courseware {
    overflow-y: auto;
    height: 74.2vh;
  }
  .PDFTemplate {
    ::-webkit-scrollbar {
      width: 10px;
      background: #a0cfff;
    }
    ::-webkit-scrollbar-thumb {
      background: var(--el-color-primary);
    }
  }
  .elButton {
    background: none;
    width: 64px;
    height: 64px;
    border: none;
    padding: 0;
    margin: 0;
    transition: linear 0.35s;
    position: relative;
    z-index: 9999;
    img {
      display: block;
      &.img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 2;
      }
      &.bg {
        position: absolute;
        top: 0;
        right: 0;
        width: 100px;
        height: 100px;
        -webkit-clip-path: polygon(36% 0%, 100% 0%, 100% 64%);
        -o-clip-path: polygon(36% 0%, 100% 0%, 100% 64%);
        clip-path: polygon(36% 0%, 100% 0%, 100% 64%);
        transition: linear 0.35s;
      }
    }
    .btn-bg {
      position: absolute;
      top: 0;
      right: 0;
      width: 100px;
      height: 100px;
      overflow: hidden;
    }
    &:hover {
      width: 100px !important;
      height: 100px !important;
      img {
        &.bg {
          -webkit-clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
          -o-clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
          clip-path: polygon(0% 0%, 100% 0%, 100% 100%);
        }
      }
    }
  }
  :deep(.d-player-wrap) {
    width: 99%;
    height: 90.5vh;
  }
}
</style>