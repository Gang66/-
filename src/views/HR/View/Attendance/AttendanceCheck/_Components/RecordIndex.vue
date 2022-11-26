<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <div class="bf-table-content leaveIndex">
      <el-table :data="data.tableData" class="w-full" :key="2">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="RealName" label="姓名" align="center" width="140" />
        <el-table-column prop="" label="部门" width="240">
          <template #default="scope">
            <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="打卡开始时间">
          <template #default="scope">
            <div class="truncate">{{ parseTimeEvent(scope.row.StartTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="打卡结束时间" align="center" width="200">
          <template #default="scope">
            <div class="truncate">{{ parseTimeEvent(scope.row.EndTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="状态" align="center" width="140">
          <template #default="scope">
            <el-button type="text" @click="openRecordFormWindow(scope.row.FaceMatchList)" v-if="scope.row.FaceMatchList.length > 0">已打卡</el-button>
            <span v-else>
              <font color="red">未打卡</font>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="抽检类型" align="center" width="140">
          <template #default="scope">
            <div class="truncate">{{ extractionTypeFilters(scope.row.ExtractionType) }}</div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <!-- 打卡记录 -->
  <RecordForm v-if="data.RecordFormWindow.show" @closeWindow="closeWindow" :FaceMatchList="data.RecordFormWindow.FaceMatchList"></RecordForm>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import RecordForm from './RecordForm.vue'
import { GetFaceCheckCheckedListPage } from '/@/api/hr/AttendanceManage'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetFaceCheckCheckedListPage(form).then((res) => {
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
    return parseTime(val)
  }
  //抽取类型
  const extractionTypeFilters = (type: any) => {
    var str = '-'
    switch (type) {
      case 1:
        str = '系统随机'
        break
      case 2:
        str = '手动抽取'
        break
      case 3:
        str = '手动随机抽取'
        break
    }
    return str
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
    parseTimeEvent,
    extractionTypeFilters
  }
}
const window = (form: any, data: any): any => {
  // 打卡记录弹窗数据
  const openRecordFormWindow = (FaceMatchList: any) => {
    data.RecordFormWindow.FaceMatchList = FaceMatchList
    data.RecordFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.RecordFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openRecordFormWindow,
    closeWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    RecordForm,
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
      value: '', //测试
      // 打卡记录弹窗数据
      RecordFormWindow: {
        show: false,
        Id: 0,
        isEdit: false
      },
      urlPath: [], //证明url
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
