<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex">
      <el-table :data="data.tableData" class="w-full">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="CreateOn" label="出差日期" align="center">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.CreateOn) }}
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="发起人" align="center" width="80">
          <template #default="scope">
            <div class="truncate">{{ scope.row.CreateName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="客户名称" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.CustomerName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Days" label="出差时长" align="center" width="140">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Days }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Vehicle" label="出差工具" align="center" width="100" />
        <el-table-column prop="Purpose" label="出差地点" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Purpose }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="状态" align="center" width="100">
          <template #default="scope">
            <div class="truncate">
              <div v-for="(item, index) in data.ApprovalData" :key="index">
                <template v-if="item.DicKey == scope.row.State">
                  <el-button :type="item.Remark" text>{{ item.DicValue }}</el-button>
                </template>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center" width="70">
          <template #default="scope">
            <el-button text key="primary" type="primary" @click="openTravelWindow(scope.row.Id, scope.row.Type)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <TravelForm v-if="data.TravelFormWindow.show" @closeWindow="closeWindow" :Id="data.TravelFormWindow.Id" :Type="data.TravelFormWindow.Type" :isUpdate="data.TravelFormWindow.isUpdate"></TravelForm>
  <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details"> </WFManagementForm>
</template>

<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { getInnovateList } from '/@/api/hr/Innovate'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import TravelForm from './TravelForm.vue'
import { GetAttendanceRecordsBusinessTripEvectionPage } from '/@/api/hr/MyWhereabouts'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetAttendanceRecordsBusinessTripEvectionPage(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        element.Suggestion = eval('(' + element.Suggestion + ')')
      })
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
  // 出差申请 弹窗
  const openTravelWindow = async (Id: number, Type: string) => {
    var Code = 'RecordsEvection'
    if (Type == 'Evection') {
      Code = 'RecordsEvection'
    } else {
      Code = 'RecordsBusinessTrip'
    }
    await GetApplyFlowStepEvent({
      DataId: Id,
      Code: Code
    }).then((res: any) => {
      data.WFManagementFormWindow.details = res.data
      data.WFManagementFormWindow.details.viewType = 3
    })
    data.WFManagementFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.WFManagementFormWindow.show = false
    data.TravelFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openTravelWindow,
    closeWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    TravelForm,
    WFManagementForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      value: '', //测试
      // 出差申请弹窗数据
      TravelFormWindow: {
        show: false,
        Id: 0
      },
      WFManagementFormWindow: {
        show: false,
        Id: 0
      },
      // 列表数据
      tableData: [],
      Suggestion: {},
      ApprovalData: {}
    })
    onMounted(() => {
      // 根据Id获取详情
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
      // 获取审批流程状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalData = res
      })
    })
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="postcss" scoped>
.travelIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
