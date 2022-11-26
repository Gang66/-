<template>
  <div class="bf-content">
    <zStatistic v-if="isHeader"></zStatistic>
    <div class="bf-center-content">
      <el-form :model="form" label-width="70px" class="bf-search-formItem">
        <tabs :tabList="data.tabList" @handleClick="selectEvent">
          <template #button>
            <el-row :gutter="0" justify="end" v-if="data.selectIndex == 0">
              <el-col :xs="6" :sm="6" :md="6" :lg="6" :xl="6">
                <el-date-picker v-model="data.time" type="date" placeholder="时间" style="width: 140px" />
              </el-col>
              <el-button type="primary" class="ml-2" @click="searchEvent(1)">搜索</el-button>
              <el-button type="primary" class="ml-2" @click="openLeaveWindow">请假申请</el-button>
            </el-row>
            <el-row :gutter="0" justify="end" v-else>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
                <el-date-picker v-model="data.input" type="date" placeholder="时间" style="width: 140px" />
              </el-col>
              <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
              <el-button type="primary" class="ml-2" @click="openTravelFormWindow">出差申请</el-button>
            </el-row>
          </template>
        </tabs>
      </el-form>
      <LeaveIndex ref="LeaveIndexRef" v-if="data.selectIndex == 0"></LeaveIndex>
      <TravelIndex ref="TravelIndex" v-else></TravelIndex>
    </div>
  </div>
</template>

<script lang="ts">
import LeaveIndex from './_Components/LeaveIndex.vue'
import TravelIndex from './_Components/TravelIndex.vue'
import tabs from '/@/components/Tabs/Index.vue'
import zStatistic from '../../Components/statistic/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
const store = useCommonStore() //记得加这一句
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    filterDatetime,
    tabs,
    LeaveIndex,
    TravelIndex
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const LeaveIndexRef = ref()
    const TravelIndex = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      selectIndex: 0, //tab下标
      leaveType: 0,
      tabList: [
        //tab列表数据
        {
          name: '请假申请'
        },
        {
          name: '出差申请'
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
    // 打开请假申请
    const openLeaveWindow = () => {
      LeaveIndexRef.value.data.LeaveFormWindow.Id = null
      LeaveIndexRef.value.data.LeaveFormWindow.show = true
      LeaveIndexRef.value.data.LeaveFormWindow.isEdit = false
    }
    // 打开请假申请
    const openTravelFormWindow = () => {
      TravelIndex.value.data.TravelFormWindow.show = true
      TravelIndex.value.data.TravelFormWindow.isUpdate = false
    }
    // 筛选请假
    const searchEvent = () => {
      if (data.time) {
        LeaveIndexRef.value.form.BeginDate = parseTime(data.time)
      }
      LeaveIndexRef.value.search()
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
      openLeaveWindow,
      openTravelFormWindow,
      LeaveIndexRef,
      TravelIndex,
      searchEvent
    }
  }
})
</script>
