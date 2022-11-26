<template>
  <div class="px-52 pt-4 CourseMarket">
    <el-card shadow="never" class="relative">
      <!-- 顶部 -->
      <div class="w-full h-14 flex justify-between">
        <!-- tab栏切换 -->
        <div class="w-3/4">
          <el-scrollbar ref="ref_scrollbar" @scroll="scroll">
            <div class="w-full flex">
              <div v-for="(item, index) in data.CoursewareClass" :key="item.id" class="scrollbar-item cursor-pointer" :class="{ 'text-blue-400 Underline': activeName === index }" @click="ChangeTitClick(index, item.DicKey)">{{ item.DicValue }}</div>
            </div>
          </el-scrollbar>
        </div>
        <!-- 右侧搜索 -->
        <div class="w-1/4">
          <div class="flex items-center absolute top-6 right-5 z-10">
            <el-input v-model="form.CurrName" placeholder="请输入搜索内容" />
            <el-button type="primary" :icon="Search" class="ml-3" @click="screenEvent()" />
          </div>
        </div>
      </div>
      <hr />
      <div class="mt-3">
        <el-radio-group v-model="form.MakeState" @change="isMakeEvent">
          <el-radio label="2" border>已制作</el-radio>
          <el-radio label="1" border>未制作</el-radio>
        </el-radio-group>
      </div>
      <div class="flex items-center mt-3 mb-5 ChangeAll" v-if="data.noMake">
        <el-radio-group v-model="form.FileType" @change="radioTypeEvent">
          <el-radio label="0">全部</el-radio>
          <el-radio label="VIDEO">视频</el-radio>
          <el-radio label="PDF">PDF</el-radio>
        </el-radio-group>
        <div class="h-3 w-0.5 bg-slate-400 ml-4 mr-4"></div>
        <el-radio-group v-model="form.StudyState" @change="radioStudyEvent">
          <el-radio label="1">未学习</el-radio>
          <el-radio label="2">学习中</el-radio>
        </el-radio-group>
      </div>
      <div class="flex justify-between">
        <div class="w-52 bg-gray-50 HStyle p-6 rounded">
          <div v-for="(item, index) in LeftStudy" :key="index" class="flex justify-between mb-4 cursor-pointer" :class="{ 'text-blue-400': LeftActiveColor === item.DicKey }" @click="LeftTabClick(item.DicKey)">
            <span>● {{ item.DicValue }}</span>
          </div>
        </div>
        <div class="w-full ml-8">
          <div class="relative overflow-hidden grid grid-cols-5 grid-rows-1 gap-3">
            <div class="cursor-pointer" v-for="(item, index) in data.tableList" :key="index" :class="[index + 1 > 6 ? 'mb-2' : 'mb-4']">
              <el-card class="" :body-style="{ padding: 0 }" shadow="never" @click="viewDetails(item)" :class="{ 'cursor-not-allowed': form.MakeState === '1' }">
                <el-image style="height: 131px" class="w-full" :src="remoteUrlEvent(item.CoverImg)" fit="cover" />
                <div class="p-2">
                  <div class="truncate">{{ item.CourseName }}</div>
                  <div class="flex items-center mt-1" v-if="form.MakeState === '2'">
                    <div class="flex items-center">
                      <el-tooltip class="box-item" effect="light" content="浏览量" placement="bottom">
                        <el-icon :size="14" class="cursor-pointer">
                          <el-icon-View />
                        </el-icon>
                      </el-tooltip>
                      <div class="ml-1 text-sm">{{ item.Browse ? item.Browse : 0 }}</div>
                    </div>
                    <div class="flex items-center ml-3">
                      <el-tooltip class="box-item" effect="light" content="学习次数" placement="bottom">
                        <el-icon :size="14" class="cursor-pointer">
                          <el-icon-Notebook />
                        </el-icon>
                      </el-tooltip>
                      <div class="ml-1 text-sm">{{ item.CourseFinishCount ? item.CourseFinishCount : 0 }}</div>
                    </div>
                  </div>
                  <div class="FileType" v-if="form.MakeState === '2'">
                    <span v-if="item.FileType == 'PDF'"> PDF </span>
                    <span v-if="item.FileType == 'VIDEO'">视频</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <el-rate v-model="item.Rate" disabled v-if="form.MakeState === '2'" />

                    <div class="flex items-center">
                      <div v-if="form.MakeState === '2'" class="ml-1">{{ item.MinMinutes ? item.MinMinutes : 0 }}分钟</div>
                      <div v-if="form.MakeState === '1'">
                        <!-- <span>人员</span>
                        <span>时间</span> -->
                      </div>
                    </div>
                  </div>
                  <div v-if="form.MakeState === '1'" style="font-size: 14px">
                    <div class="mt-2"><span class="text-gray-400"> 创建时间:</span> {{ item.CreationTime }}</div>
                    <div class="mt-2"><span class="text-gray-400"> 制作人:</span> {{ item.Allocator }}</div>
                    <div class="mt-2"><span class="text-gray-400"> 分配时间:</span>{{ item.AllocationTime }}</div>
                    <div class="mt-2"><span class="text-gray-400"> 完成时间:</span> {{ item.FinishTime }}</div>
                  </div>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </div>
      <el-pagination class="justify-center" :current-page="data.currentPage" background layout="prev, pager, next,total" :total="data.totals" @current-change="sizeChangeEvent" />
    </el-card>
    <PDFTemplate v-if="data.StudyTemplateWindow.show" @closeWindow="data.StudyTemplateWindow.show = false" ref="PDFTemplateRef" :url="remoteUrlPDF(data.StudyTemplateWindow.details.SavePath)"> </PDFTemplate>
  </div>
</template>

<script lang="ts">
import { Search } from '@element-plus/icons-vue'
import { TabsPaneContext } from 'element-plus'
import { useRouter } from 'vue-router'
import { defineComponent, onMounted, onUpdated, reactive, ref } from 'vue'
import StudyTemplate from '../StudyTemplate/StudyTemplate.vue'
import PDFTemplate from '../_Components/PDFTemplate.vue'
import { GetTrainCourseWare, GetWorkCourseHistoryPage } from '/@/api/hr/School/Train'
import router from '/@/router/index'
import { useCommonStore } from '/@/store/modules/Common'
import { remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
// 获取列表数据
const getList = (form: any, data: any) => {
  // console.log(data.selectIndex)
  if (data.selectIndex == 6) {
    GetTrainCourseWare(form).then((res: any) => {
      console.log(res)

      data.tableList = res.data.records
      data.totals = res.data.totals
    })
  } else {
    GetWorkCourseHistoryPage(form).then((res: any) => {
      res.data.records.forEach((element: any) => {
        element.CourseName = element.Name
      })
      data.tableList = res.data.records
      data.totals = res.data.count
    })
  }
}
// 监听事件
const changeEvent = (data: any, form: any) => {
  // 筛选
  const screenEvent = () => {
    form.page = 1
    data.currentPage = 1
    getList(form, data)
  }
  // 监听分类
  const handleClick = (tab: TabsPaneContext, event: Event) => {
    form.Class = tab.props.name
    screenEvent()
  }

  // 监听课件类型
  const radioTypeEvent = (val: any) => {
    form.StudyState = ''
    form.FileType = val
    screenEvent()
  }
  // 监听学习状态
  const radioStudyEvent = (val: any) => {
    form.FileType = ''
    form.StudyState = val
    screenEvent()
  }
  // 监听分页
  const sizeChangeEvent = (val: any) => {
    form.page = val
    data.currentPage = val
    getList(form, data)
  }
  return {
    radioStudyEvent,
    screenEvent,
    handleClick,
    radioTypeEvent,
    sizeChangeEvent
  }
}

export default defineComponent({
  components: { StudyTemplate, PDFTemplate },
  props: {},
  setup() {
    const router = useRouter()
    // 顶部tab颜色
    const activeName = ref(0)
    // 左侧学习tab颜色
    const LeftActiveColor = ref('A')
    const selectIndex = ref(0)
    const tabList = ref([
      {
        name: '最新课'
      },
      {
        name: '点击量'
      },
      {
        name: '评论数'
      },
      {
        name: '点赞数'
      },
      {
        name: '评分数'
      }
    ])
    // 左侧课程字典内容
    const LeftStudy = ref([])
    var data = reactive({
      selectIndex: '6' as any,
      StudyTemplateWindow: {
        show: false,
        CourseId: 0,
        details: {}
      },
      CoursewareClass: [] as any, //课件分类
      tableList: [], //列表数据
      totals: 0, //总数
      currentPage: null as any, //当前页
      noMake: true,
      scroll_frequency: 0,
      num: 0,
      setTimeoutScroll: null as any
    })

    // 点击内容滚动条滚动
    const ref_scrollbar = ref()
    // 顶部tab点击事件
    const ChangeTitClick = async (index: number, id: any) => {
      activeName.value = index
      // console.log(id)
      // 清除定时器
      clearInterval(data.setTimeoutScroll)
      // 每一次滚动位置

      var scrollnum = 130 * index
      console.log(scrollnum)
      if (scrollnum > 520) {
        scrollnum -= 520
      } else if (scrollnum <= 520) {
        scrollnum = 0
      }

      //向左滚动
      if (data.scroll_frequency > scrollnum) {
        data.scroll_frequency = scrollnum
        // 记录上次滚动的位置
        data.setTimeoutScroll = setInterval(() => {
          data.num -= 1
          ref_scrollbar.value.setScrollLeft(data.num)

          if (data.num <= scrollnum) {
            clearInterval(data.setTimeoutScroll)
            data.num = scrollnum
          }
        }, 1)
      }
      // 向右滚动
      else {
        data.scroll_frequency = scrollnum
        data.setTimeoutScroll = setInterval(() => {
          data.num += 1
          ref_scrollbar.value.setScrollLeft(data.num)
          if (data.num >= scrollnum) {
            console.log(data.scroll_frequency, data.num, scrollnum)
            clearInterval(data.setTimeoutScroll)
            data.num = scrollnum
          }
        }, 1)
      }
      if (index === 0) {
        form.PostIds = null
      } else {
        form.PostIds = id
      }
      getList(form, data)
    }
    const scroll = ({ scrollLeft }) => {
      data.scroll_frequency = Math.floor(scrollLeft)
      data.num = Math.floor(scrollLeft)
    }

    // 获取左侧课程计划类型字典
    let storeData = store.getDict('CoursewareClass')
    storeData.then((res: any) => {
      // console.log(res)
      LeftStudy.value = res
    })
    // 获取路由Id
    const getRouteId = (form: any, data: any) => {
      // console.log('nihjao')
      if (router.currentRoute.value.query.Id) {
        data.selectIndex = router.currentRoute.value.query.Id
      } else {
        data.selectIndex = '6'
      }
      getList(form, data)
    }
    var form = reactive({
      page: 1,
      size: 10,
      Class: 'A',
      StudyState: null as any,
      PostIds: null as any,
      CurrName: null as any,
      MakeState: '2',
      FileType: '0'
    })

    // 左侧tab点击事件
    const LeftTabClick = async (index: any) => {
      console.log(index)
      LeftActiveColor.value = index
      form.Class = index
      getList(form, data)
    }

    // 制作未制作的点击事件
    const isMakeEvent = (val: any) => {
      if (val === '1') {
        data.noMake = false
      } else if (val === '2') {
        data.noMake = true
      }
      form.MakeState = val
      getList(form, data)
    }

    // 网址拼接
    const remoteUrlEvent = (val: any) => {
      return remoteUrl(val)
    }
    // 网址拼接
    const remoteUrlPDF = (val: any) => {
      return '/hr/' + val
    }
    // 查看详情
    const viewDetails = (val: any) => {
      if (form.MakeState === '1') return
      router.push({
        path: '/HR/SchoolView/Video/Index',
        query: { Id: val.Id }
      })
      // data.StudyTemplateWindow.details = val
      // data.StudyTemplateWindow.show = true
    }
    onUpdated(() => {
      getRouteId(form, data)
    })
    onMounted(() => {
      getRouteId(form, data)
      // 获取课件分类
      store.getDict('CoursewareCodeType').then((res: any) => {
        // arr = {}
        var arr: any = {
          DicValue: '全部课程',
          DicKey: '0'
        }
        data.CoursewareClass = res
        let flag = false
        data.CoursewareClass.forEach((val: any) => {
          if (val.DicKey == 0) flag = true
        })
        if (!flag) {
          data.CoursewareClass.unshift(arr)
        }

        console.log(data.CoursewareClass)
      })
    })
    return {
      ref_scrollbar,
      scroll,
      isMakeEvent,
      LeftTabClick,
      LeftActiveColor,
      LeftStudy,
      ChangeTitClick,
      activeName,
      ...changeEvent(data, form),
      tabList,
      selectIndex,
      Search,
      viewDetails,
      data,
      form,
      remoteUrlEvent,
      remoteUrlPDF
    }
  }
})
</script>

<style lang="postcss" scoped>
.CourseMarket {
  :deep(.el-radio) {
    margin-right: 10px;
  }
  :deep(.el-divider--vertical) {
    display: inline-block;
    width: 1px;
    height: 2em;
    margin: 0 8px;
    vertical-align: middle;
    position: relative;
    border-left: 2px var(--el-border-color) var(--el-border-style);
  }
  :deep(.el-divider--horizontal) {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
  }
  :deep(.el-tabs__item) {
    padding: 0 32px;
  }
  :deep(.el-rate) {
    --el-rate-icon-size: 25px;
    --el-rate-icon-margin: 0px;
  }
  :deep(.ChangeAll) {
    .el-radio__inner {
      display: none !important;
    }
  }
  .FileType {
    margin: 10px 0 3px;
    width: 52px;
    height: 24px;
    line-height: 24px;
    border: 1px solid #468bfd;
    border-radius: 4px;
    font-size: 12px;
    color: #468bfd;
    text-align: center;
  }
  .scrollbar-item {
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 110px;
    height: 20px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    position: relative;
  }
  .Underline {
    &::after {
      content: '';
      display: block;
      position: absolute;
      left: 30px;
      top: 30px;
      height: 5px;
      width: 40px;
      background-color: #508ae5;
      border-radius: 14px;
    }
  }
  .HStyle {
    height: 573px;
  }
}
</style>
