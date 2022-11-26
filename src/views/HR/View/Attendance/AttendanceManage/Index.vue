<template>
  <div class="bf-content bg-close-table-checkbox">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <tabs :tabList="data.tabList" @handleClick="selectEvent">
          <template #button>
            <div class="flex justify-end items-center">
              <template v-if="data.selectIndex==0">
                <el-date-picker v-model="form.StartDate" type="date" placeholder="时间" style="width:140px" @change="timeChange" />
              </template>
              <template v-if="data.selectIndex==1">
                <el-date-picker v-model="form.StartDate" type="week" format="[Week] ww" placeholder="时间" :picker-options="{ firstDayOfWeek: 1 }" @change="timeChange" />
              </template>
              <template v-if="data.selectIndex==2">
                <el-date-picker v-model="form.StartDate" type="month" placeholder="时间" @change="timeChange" />
              </template>
              <!-- <el-input v-model="form.Name" placeholder="姓名" class="ml-2" style="width:140px" /> -->
              <el-cascader placeholder="事业部筛选" class="ml-2" ref="cascaderAddr" :props="{checkStrictly: true}" :options="data.options" filterable @change="cascaderChange" />
              <el-select v-model="form.UserId" filterable placeholder="用户筛选" class="screen-width">
                <el-option v-for="item in data.optionsUser" :key="item.UserId" :label="item.RealName" :value="item.UserId" />
              </el-select>
              <el-button type="primary" @click="search" class="ml-2">搜索</el-button>
              <el-button type="warning" @click="openAttendancereportWindow" class="ml-2" v-if="data.selectIndex!=0">考勤报告</el-button>
            </div>
            <el-row :gutter="10" justify="end">
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="16">

              </el-col>
              <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="5">

              </el-col>
              <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3">
              </el-col>
            </el-row>
          </template>
        </tabs>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full" ref="multipleTableRef" @selection-change="handleSelectionChange" @select="selectRow" :key="data.selectIndex"
            @sort-change='sortTableFun'>
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="" label="日期" min-width="120" v-if="data.selectIndex==0||data.selectIndex==1">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.WorkDayTime,1) }}
              </template>
            </el-table-column>
            <template v-if="data.selectIndex==1">
              <el-table-column prop="DateNumber" label="周次" min-width="80" />
            </template>
            <template v-if="data.selectIndex==2">
              <el-table-column prop="DateNumber" label="月份" min-width="120" />
            </template>
            <el-table-column prop="UserName" label="姓名" min-width="70" />
            <el-table-column prop="DepartName" label="部门" min-width="140">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.DivisionName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <template v-if="data.selectIndex==0">
              <el-table-column prop="" label="出勤量（分钟）" align="center">
                <el-table-column prop="WorkTime" label="在岗" align="center" min-width="80" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.WorkTime.toFixed(0)}}
                  </template>
                </el-table-column>
                <el-table-column prop="RecordsEvection" label="出差" align="center" min-width="80" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.RecordsEvection.toFixed(0)}}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
            <template v-else-if="data.selectIndex==1">
              <el-table-column prop="WorkTime" label="出勤量（天）" min-width="110" align="center" sortable='custom'>
                <template #default="scope">
                  {{scope.row.WorkTime.toFixed(1)}}
                </template>
              </el-table-column>
            </template>
            <template v-else-if="data.selectIndex==2">
              <el-table-column prop="WorkTime" label="出勤量（天）" min-width="110" align="center" sortable='custom'>
                <template #default="scope">
                  {{scope.row.WorkTime.toFixed(1)}}
                </template>
              </el-table-column>
            </template>
            <template v-if="data.selectIndex==1||data.selectIndex==2">
              <el-table-column prop="" label="异常（天）" align="center">
                <el-table-column prop="BeLate" label="迟到" align="center" min-width="100" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.BeLate.toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column prop="Absenteeism" label="旷工" align="center" min-width="80" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.Absenteeism.toFixed(2)}}
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="请假" align="center" min-width="80" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.Leave.toFixed(2)}}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
            <template v-else>
              <el-table-column prop="" label="异常（分钟）" align="center">
                <el-table-column prop="BeLate" label="迟到" align="center" min-width="100" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.BeLate.toFixed(0)}}
                  </template>
                </el-table-column>
                <el-table-column prop="Absenteeism" label="旷工" align="center" min-width="80" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.Absenteeism.toFixed(0)}}
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="请假" align="center" min-width="80" sortable='custom'>
                  <template #default="scope">
                    {{scope.row.Leave.toFixed(0)}}
                  </template>
                </el-table-column>
              </el-table-column>
            </template>
            <el-table-column label="轨迹" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openTrackWindow( scope.row.UserId,scope.row.WorkDayTime)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column label="打卡状态" align="center" v-if="data.selectIndex==0">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openpunchInRecordWindow( scope.row.UserId,scope.row.WorkDayTime)">预览</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="考勤报告" align="center" v-if="data.selectIndex!=0">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openAttendancereportWindow( scope.row.UserId,scope.row.WorkDayTime)">预览</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 轨迹回放 -->
    <trackIndex v-if="data.TrackWindow.show" @closeWindow="closeWindow" :UserId="data.TrackWindow.UserId" :WorkDayTime="data.TrackWindow.WorkDayTime">
    </trackIndex>
    <!-- 打卡状态 -->
    <punchInRecord v-if="data.punchInRecordWindow.show" @closeWindow="closeWindow" :UserId="data.punchInRecordWindow.UserId" :WorkDayTime="data.punchInRecordWindow.WorkDayTime">
    </punchInRecord>
    <!-- 考勤统计 -->
    <Attendancereport v-if="data.AttendancereportWindow.show" @closeWindow="closeWindow" :UserId="data.AttendancereportWindow.UserId"
      :WorkDayTime="data.AttendancereportWindow.WorkDayTime">
    </Attendancereport>
  </div>
</template>

<script lang="ts">
import tabs from '/@/components/Tabs/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../../Components/statistic/Index.vue'
import { parseTime } from '/@/utils/tools'
import { ElMessage } from 'element-plus'
import trackIndex from '../_Components/Track.vue'
import punchInRecord from '../_Components/PunchInRecords.vue'
import Attendancereport from './_Components/Attendancereport.vue'
import { GetManageUserDayList } from '/@/api/hr/AttendanceManage'
import { getDeptTree } from '/@/api/system/dept'
import { GetDeptOrCompUserList } from '/@/api/system/user'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetManageUserDayList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records.Data
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
  renderTableList(form, data)
  // 标题监听
  const selectEvent = (index: number) => {
    data.single = true
    form.StartDate = ''
    data.selectIndex = index
    if (index == 0) {
      form.DateType = 'Day'
    } else if (index == 1) {
      form.DateType = 'Week'
    } else {
      form.DateType = 'Month'
    }
    search()
  }
  // 时间格式转换
  const parseTimeEvent = (val: any, num: number) => {
    if (num == 1) {
      return parseTime(val, '{y}-{m}-{d}')
    } else {
      return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
    }
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  // 监听排序
  const sortTableFun = (val: any) => {
    console.log(val)
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  // 时间监听
  const timeChange = (val: any) => {
    console.log(val)
    form.StartDate = parseTime(val, '{y}-{m}-{d}')
  }
  return {
    selectEvent,
    search,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent,
    timeChange,
    sortTableFun,
    selectRow
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
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
  // 考勤报告
  const openAttendancereportWindow = (UserId: number, WorkDayTime: any) => {
    data.AttendancereportWindow.UserId = UserId
    data.AttendancereportWindow.WorkDayTime = parseTime(WorkDayTime, '{y}-{m}-{d}')
    data.AttendancereportWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.TrackWindow.show = false
    data.punchInRecordWindow.show = false
    data.AttendancereportWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openTrackWindow,
    openpunchInRecordWindow,
    closeWindow,
    openAttendancereportWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    DepTabridge,
    tabs,
    trackIndex,
    punchInRecord,
    Attendancereport
  },
  props: {},
  setup() {
    const multipleTableRef: any = ref(null)
    const cascaderAddr: any = ref(null)
    // 筛选数据
    const form: any = reactive({
      page: 1,
      size: 10,
      total: 1,
      StartDate: '',
      Name: '',
      DeptId: null,
      UserId: null,
      DateType: 'Day'
    })
    const data = reactive({
      options: [],
      optionsUser: [],
      selectIndex: 0,
      tabList: [
        //tab列表数据
        {
          name: '考勤管理列表'
        },
        {
          name: '周考勤报表'
        },
        {
          name: '月考勤报表'
        }
      ],
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
      // 考勤报告弹窗数据
      AttendancereportWindow: {
        show: false,
        UserId: 0,
        WorkDayTime: ''
      },
      input: '', //测试
      selectDetails: [], //列表当前选中详情
      // 列表数据
      tableData: [],
      single: true, //是否禁用按钮
      Suggestion: {}
    })
    // 监听事业部筛选
    const cascaderChange = (val: any) => {
      form.UserId = null
      console.log(cascaderAddr.value.getCheckedNodes())
      var arr = cascaderAddr.value.getCheckedNodes()
      form.DeptId = arr[0].data.Id
      GetDeptOrCompUserList(form.DeptId).then((res: any) => {
        if (res.code == 1) {
          data.optionsUser = res.data
        }
      })
    }
    onMounted(() => {
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
      getDeptTree().then((res: any) => {
        if (res.code == 1) {
          data.options = res.data
        }
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data, multipleTableRef),
      ...window(form, data, multipleTableRef),
      cascaderChange,
      cascaderAddr,
      multipleTableRef
    }
  }
})
</script>
