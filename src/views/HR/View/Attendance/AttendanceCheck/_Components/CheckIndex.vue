<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <div class="bf-table-content leaveIndex">
      <el-table :data="data.tableData" class="w-full" :key="1">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="UserName" label="姓名" align="center" />
        <el-table-column prop="DeptName" label="部门" align="center" width="140">
          <template #default="scope">
            <DepTabridge :key="scope.row.UserId" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
          </template>
        </el-table-column>
        <el-table-column prop="" label="在岗分钟" align="center" width="100">
          <template #default="scope">
            <div class="truncate">{{ scope.row.WorkTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="BeLate" label="迟到分钟" align="center" width="100" />
        <el-table-column prop="ClockAbsenteeism" label="旷工分钟" align="center" width="100" />
        <!-- <el-table-column prop="LeaveEarly" label="早退分钟" align="center" width="100" /> -->
        <el-table-column prop="Leave" label="请假分钟" align="center" width="100" />
        <el-table-column prop="CreateName" label="出差分钟" align="center" width="100">
          <template #default="scope">
            <div class="truncate">{{ scope.row.BusinessTrip + scope.row.RecordsEvection }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Lackint" label="缺卡次数" align="center" width="100" />
        <el-table-column prop="SpotCheckNum" label="抽检次数" align="center" width="100" />
        <el-table-column prop="" label="操作" align="center">
          <template #default="scope">
            <el-button text key="primary" type="primary" @click="CheckUser(scope.row.UserId)">抽检</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <!-- 随机抽检 -->
  <CheckForm v-if="data.CheckFormWindow.show" @closeWindow="closeWindow"></CheckForm>
</template>

<script lang="ts">
import DepTabridge from '/@/components/DepTabridge/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import CheckForm from './CheckForm.vue'
import { FaceCheckWorkAppointSave, GetFaceCheckStatisticsListPage } from '/@/api/hr/AttendanceManage'
import { useLayoutStore } from '/@/store/modules/layout'
import { ElMessage } from 'element-plus'
const lStore = useLayoutStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetFaceCheckStatisticsListPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
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
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent
  }
}
const window = (form: any, data: any): any => {
  // 手动抽检
  const CheckUser = (UserId: number) => {
    FaceCheckWorkAppointSave(UserId).then((res: any) => {
      if (res.code == 1) {
        ElMessage({
          message: '抽检成功',
          type: 'success'
        })
      } else {
        ElMessage.error('抽检失败')
      }
    })
  }
  // 随机抽检 弹窗
  const openCheckFormWindow = (Id: number) => {
    data.CheckFormWindow.Id = Id
    data.CheckFormWindow.isEdit = true
    data.CheckFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.CheckFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openCheckFormWindow,
    closeWindow,
    CheckUser
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    CheckForm,
    DepTabridge
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      BeginDate: parseTime(new Date(), '{y}-{m}-{d}'),
      EndDate: parseTime(new Date(), '{y}-{m}-{d}')
    })
    const data = reactive({
      // 轨随机抽检弹窗数据
      CheckFormWindow: {
        show: false,
        Id: 0,
        isEdit: false
      },
      urlPath: [], //证明url
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {})
    return {
      form,
      data,
      ...tableRender(form, data),
      ...window(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.leaveIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
