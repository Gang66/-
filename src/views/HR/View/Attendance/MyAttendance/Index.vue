<template>
  <div class="bf-content myAttendance">
    <zStatistic v-if="isHeader"></zStatistic>
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">我的考勤</div>
            <div>
              <filterDatetime @transmitTime="transmitTimeEvent" :format="'{y}-{m}-{d} {h}:{i}:{s}'"></filterDatetime>
            </div>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="CreateOn" label="日期" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.WorkDayTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="" label="汇总类(分)" align="center">
              <el-table-column prop="Specified" label="应出勤" align="center">
                <template #default="scope">
                  {{ scope.row.Specified.toFixed(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="WorkTime" label="实出勤" align="center">
                <template #default="scope">
                  {{ scope.row.WorkTime.toFixed(0) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="异常类(分)" align="center">
              <el-table-column prop="BeLate" label="迟到" align="center">
                <template #default="scope">
                  {{ scope.row.BeLate.toFixed(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="Absenteeism" label="旷工" align="center">
                <template #default="scope">
                  {{ scope.row.Absenteeism.toFixed(0) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="申报类(分)" align="center">
              <el-table-column prop="Leave" label="请假" align="center">
                <template #default="scope">
                  {{ scope.row.Leave.toFixed(0) }}
                </template>
              </el-table-column>
              <el-table-column prop="RecordsEvection" label="出差" align="center">
                <template #default="scope">
                  {{ scope.row.RecordsEvection.toFixed(0) }}
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="轨迹回放" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openTrackWindow(scope.row.UserId, scope.row.WorkDayTime)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" label="打卡状态" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openpunchInRecordWindow(scope.row.UserId, scope.row.WorkDayTime)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 轨迹回放 -->
    <trackIndex v-if="data.TrackWindow.show" @closeWindow="closeWindow" :UserId="data.TrackWindow.UserId" :WorkDayTime="data.TrackWindow.WorkDayTime"> </trackIndex>
    <!-- 打卡状态 -->
    <punchInRecord v-if="data.punchInRecordWindow.show" @closeWindow="closeWindow" :UserId="data.punchInRecordWindow.UserId" :WorkDayTime="data.punchInRecordWindow.WorkDayTime"> </punchInRecord>
  </div>
</template>

<script lang="ts">
import zStatistic from '../../../Components/statistic/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import trackIndex from '../_Components/Track.vue'
import punchInRecord from '../_Components/PunchInRecords.vue'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetAttendanceUserDayPage } from '/@/api/hr/AttendanceManage'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetAttendanceUserDayPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records.Data
      form.totals = res.data.totals
    }
  })
}

// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.Suggestion.length > 0) {
      data.Suggestion.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue
        }
      })
    }
    return title
  }
  // 监听时间筛选
  const transmitTimeEvent = (time: any) => {
    console.log(time)
    if (time.BeginDate) {
      form.StartDate = time.BeginDate
    } else {
      form.StartDate = ''
    }
    if (time.EndDate) {
      form.EndDate = time.EndDate
    } else {
      form.EndDate = ''
    }
    renderTableList(form, data)
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    transmitTimeEvent,
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent
  }
}
const window = (form: any, data: any): any => {
  // 轨迹回放 弹窗
  const openTrackWindow = (UserId: number, WorkDayTime: any) => {
    data.TrackWindow.UserId = UserId
    data.TrackWindow.WorkDayTime = WorkDayTime
    data.TrackWindow.show = true
  }
  // 打卡记录 弹窗
  const openpunchInRecordWindow = (UserId: number, WorkDayTime: any) => {
    data.punchInRecordWindow.UserId = UserId
    data.punchInRecordWindow.WorkDayTime = parseTime(WorkDayTime, '{y}-{m}-{d}')
    data.punchInRecordWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.TrackWindow.show = false
    data.punchInRecordWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openTrackWindow,
    openpunchInRecordWindow,
    closeWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    trackIndex,
    punchInRecord,
    filterDatetime
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      value: '', //测试
      // 轨迹回放弹窗数据
      TrackWindow: {
        show: false,
        UserId: 0,
        WorkDayTime: ''
      },
      // 打卡记录弹窗数据
      punchInRecordWindow: {
        show: false,
        UserId: 0,
        WorkDayTime: ''
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 根据Id获取详情
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
    })
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="postcss" scoped>
.myAttendance {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
