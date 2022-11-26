<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex">
      <el-table :data="data.tableData" class="w-full">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="CreateOn" label="申请日期" align="center">
          <template #default="scope">
            {{parseTimeEvent(scope.row.CreateOn)}}
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="申请人" align="center">
          <template #default="scope">
            <div class="truncate">{{scope.row.CreateName}}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Type" label="申请类型" align="center" />
        <el-table-column prop="" label="操作" align="center" width="140" v-if="form.State==1">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openWFManagementFormWindow( scope.row,4)">待审批</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="审批状态" align="center" width="140" v-else>
          <template #default="scope">
            <template v-for="(item, index) in data.ApprovalList">
              <div class="bf-button-bl" v-if="item.DicKey==scope.row.State">
                <template v-if="scope.row.Code=='TrainTestImportFile'||scope.row.Code=='WorkCourseFinished'||scope.row.Code=='TrainCourseWare'">
                  <el-button text :key="index" :type="item.Remark" @click="openWFManagementFormWindow(scope.row,5)">{{item.DicValue }}</el-button>
                </template>
                <template v-else>
                  <el-button text :key="index" :type="item.Remark" @click="openWFManagementFormWindow(scope.row,3)">{{item.DicValue }}</el-button>
                </template>
              </div>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details">
  </WFManagementForm>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive ,defineExpose} from 'vue'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetApprovalStepPage } from '/@/api/wf/WFManagement'
import WFManagementForm from './WFManagementForm.vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetApprovalStepPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  // renderTableList(form, data)
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
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent
  }
}
const window = (form: any, data: any): any => {
  // 弹窗
  const openWFManagementFormWindow = (val: any, viewType: any) => {
    data.WFManagementFormWindow.details = val
    data.WFManagementFormWindow.details.viewType = viewType
    data.WFManagementFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    if (type == 'submit') {
      form.page = 1
      renderTableList(form, data)
    }
    data.WFManagementFormWindow.show = false
  }
  return {
    openWFManagementFormWindow,
    closeWindow
  }
}

export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    WFManagementForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      State: 1,
      Name:''
    })
    const data = reactive({
      ApprovalList: [],
      // 弹窗数据
      WFManagementFormWindow: {
        show: false,
        details: {}
      },
      // 列表数据
      tableData: []
    })
    onMounted(() => {
      // 审批状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalList = res
      })
    })
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="postcss" scoped>
</style>
