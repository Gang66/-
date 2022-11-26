<template>
  <div class="bf-content">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <el-form :model="form" label-width="70px" class="bf-search-formItem">
        <tabs :tabList="data.tabList" @handleClick="selectEvent">
          <template #button>
            <el-row :gutter="0" justify="end" v-if="data.selectIndex==0">
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-date-picker v-model="data.time" type="date" placeholder="时间" style="width:140px" />
              </el-col>
              <el-button type="primary" class="ml-2" @click="searchEvent(1)">搜索</el-button>
              <el-button type="primary" class="ml-2" @click="openProbationWindow">一键离职</el-button>
            </el-row>
            <el-row :gutter="0" justify="end" v-else>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-date-picker v-model="data.input" type="date" placeholder="时间" style="width:140px" />
              </el-col>
              <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
              <el-button type="primary" class="ml-2" @click="openProbationWindow">一键离职</el-button>
            </el-row>
          </template>
        </tabs>
      </el-form>
      <!-- 试用期管理 -->
      <ProbationIndex ref="ProbationIndexRef" v-if="data.selectIndex==0"></ProbationIndex>
      <!-- 正用期管理 -->
      <formalIndex ref="ProbationIndexRef" v-if="data.selectIndex==1"></formalIndex>
      <!-- 社保管理 -->
      <SocialSecurityIndex ref="ProbationIndexRef" v-if="data.selectIndex==2"></SocialSecurityIndex>
      <!-- 离职管理 -->
      <QuitIndex ref="ProbationIndexRef" v-if="data.selectIndex==3"></QuitIndex>
      <!-- 岗位管理 -->
      <PostTransferIndex ref="ProbationIndexRef" v-if="data.selectIndex==4"></PostTransferIndex>

    </div>
  </div>
</template>

<script lang="ts">
import tabs from '/@/components/Tabs/Index.vue'
import zStatistic from '../../Components/statistic/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
// import ProbationIndex from './ProbationIndex.vue'
// import formalIndex from './formalIndex.vue'
// import SocialSecurityIndex from './SocialSecurityIndex.vue'
// import QuitIndex from './QuitIndex.vue'
// import PostTransferIndex from './PostTransferIndex.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
const store = useCommonStore() //记得加这一句
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    filterDatetime,
    tabs
    // ProbationIndex,
    // formalIndex,
    // SocialSecurityIndex,
    // QuitIndex,
    // PostTransferIndex
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const ProbationIndexRef = ref()
    const TravelIndex = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      selectIndex: 0, //tab下标
      ProbationType: 0,
      tabList: [
        //tab列表数据
        {
          name: '试用期管理'
        },
        {
          name: '正式期管理'
        },
        {
          name: '社保管理'
        },
        {
          name: '离职管理'
        },
        {
          name: '岗位管理'
        }
      ],
      time: '',
      value: '', //测试
      // 轨迹回放弹窗数据
      TrackWindow: {
        show: false,
        Id: 0
      },
      // 打卡记录弹窗数据
      punchInRecordWindow: {
        show: false,
        Id: 0
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    //   监听筛选
    const changeEvent = (val: any) => {}
    // 标题监听
    const selectEvent = (index: number) => {
      data.selectIndex = index
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
    }
    // 打开一键离职申请
    const openProbationWindow = () => {
      ProbationIndexRef.value.data.ProbationFormWindow.Id = null
      ProbationIndexRef.value.data.OneClickQuitFormWindow.show = true
    }
    // 筛选
    const searchEvent = () => {
      ProbationIndexRef.value.form.BeginDate = parseTime(data.time)
      ProbationIndexRef.value.search()
    }
    onMounted(() => {
      // 根据Id获取详情
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
    })
    return {
      form,
      data,
      changeEvent,
      selectEvent,
      openProbationWindow,
      ProbationIndexRef,
      TravelIndex,
      searchEvent
    }
  }
})
</script>
