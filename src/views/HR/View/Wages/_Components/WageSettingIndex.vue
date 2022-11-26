<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <div class="bf-table-content WageSettingIndex">
      <el-table :data="data.tableData">
        <el-table-column type="index" label="序号" width="55" align="center" />
        <el-table-column prop="UserName" label="姓名" align="center" min-width="70" />
        <el-table-column prop="DeptName" label="部门" align="center" min-width="120">
          <template #default="scope">
            <DepTabridge :key="scope.row.UserId" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
          </template>
        </el-table-column>
        <el-table-column prop="" label="岗位类别" align="center" min-width="80">
          <template #default="scope">
            <div class="truncate">{{ scope.row.WorkTime }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="BeLate" label="入职时间" align="center" min-width="80" />
        <el-table-column prop="ClockAbsenteeism" label="年承包类(承包量中1，2，3月前缀金额含13薪及年薪)" align="center">
          <el-table-column prop="BaseTotal" label="基本工资" align="center" min-width="80" />
          <el-table-column prop="SecrecyTotal" label="竟保工资" align="center" min-width="80" />
          <el-table-column prop="OverTimeTotal" label="加班工资" align="center" min-width="80" />
          <el-table-column prop="NoteTotal" label="总结工资" align="center" min-width="80" />
          <el-table-column prop="StudyTotal" label="学习工资" align="center" min-width="80" />
          <el-table-column prop="WaiTotal" label="承包量" align="center" min-width="80" />
        </el-table-column>
        <el-table-column prop="" label="社保金额" align="center">
          <el-table-column prop="SheBaoGeTotal" label="个人" align="center" min-width="70" />
          <el-table-column prop="SheBaoGongTotal" label="公司" align="center" min-width="80" />
        </el-table-column>
        <el-table-column prop="MonthTotal" label="年承包月薪" align="center" min-width="100">
          <template #default="scope">
            <div class="truncate">{{ scope.row.MonthTotal }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Lackint" label="岗位状态" align="center" min-width="100">
          <template #default="scope">
            <div class="truncate">{{ scope.row.IsFormal==1?'正式期':'试用期' }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>

</template>

<script lang="ts">
import DepTabridge from '/@/components/DepTabridge/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { FaceCheckWorkAppointSave, GetFaceCheckStatisticsListPage } from '/@/api/hr/AttendanceManage'
import { GetSalarySetting } from '../../../../../api/hr/Salary'
import { useLayoutStore } from '/@/store/modules/layout'
import { ElMessage } from 'element-plus'
const lStore = useLayoutStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetSalarySetting(form).then((res) => {
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
    // CheckForm,
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
.WageSettingIndex {
  :deep(.el-scrollbar) {
    overflow: visible;
  }
  :deep(.el-scrollbar__wrap) {
    overflow: inherit;
  }
  :deep(.el-table__inner-wrapper) {
    width: fit-content;
  }
  :deep(.el-table__header-wrapper) {
    overflow: inherit;
  }
  :deep(.el-table--scrollable-x) {
    overflow: auto !important;
  }
  :deep(.el-table--border::after) {
    top: -1px;
    right: 0;
    width: 0px;
    height: 100%;
    z-index: 3;
  }
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
