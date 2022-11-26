<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content leaveIndex">
      <el-table :data="data.tableData" class="w-full">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="CreateOn" label="申请日期" align="center">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.CreateOn) }}
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="发起人" align="center" />
        <el-table-column prop="Days" label="申请时长" align="center" width="140" />
        <el-table-column prop="" label="申请原因" align="center" width="300">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Remark }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CreateName" label="证明" align="center" width="100">
          <el-button text key="primary" type="primary" @click="$preview(0, data.urlPath)">预览</el-button>
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
        <el-table-column prop="Suggestion" label="操作" align="center">
          <template #default="scope">
            <el-button text key="primary" type="primary" @click="openLeaveFormWindow(scope.row)">预览</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <LeaveForm v-if="data.LeaveFormWindow.show" @closeWindow="closeWindow" :Id="data.LeaveFormWindow.Id" title="请假申请" :isEdit="data.LeaveFormWindow.isEdit"></LeaveForm>
  <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details"> </WFManagementForm>
</template>

<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { preview } from 'vue3-preview-image'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import LeaveForm from './LeaveForm.vue'
import { GetAttendanceVacationPage } from '/@/api/hr/MyWhereabouts'
import { set } from 'nprogress'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetAttendanceVacationPage(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        if (element.ImgUrl) {
          element.ImgUrl = eval('(' + element.ImgUrl + ')')
          element.ImgUrl.forEach((val: any) => {
            val.Path = remoteUrl(val.Path)
            data.urlPath.push(remoteUrl(val.Path))
          })
        }
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
const window = (form: any, data: any, imageRef: any): any => {
  const openImage = () => {
    console.log((imageRef.value.previewTeleported = false))
  }
  // 请假申请 弹窗
  const openLeaveFormWindow = async (val: any) => {
    await GetApplyFlowStepEvent({
      DataId: val.Id,
      Code: 'RecordsVacation'
    }).then((res: any) => {
      console.log(res)
      data.WFManagementFormWindow.details = res.data
      data.WFManagementFormWindow.details.viewType = 3
    })

    data.WFManagementFormWindow.show = true
    // data.LeaveFormWindow.Id = val.Id
    // if (val.State == -1) {
    //   data.LeaveFormWindow.isEdit = false
    // } else {
    //   data.LeaveFormWindow.isEdit = true
    // }
    // data.LeaveFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.LeaveFormWindow.show = false
    data.WFManagementFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openLeaveFormWindow,
    closeWindow,
    openImage
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    LeaveForm,
    WFManagementForm
  },
  props: {},
  setup() {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      BeginDate: ''
    })
    const data = reactive({
      // 请假弹窗数据
      LeaveFormWindow: {
        show: false,
        Id: 0,
        isEdit: false
      },
      WFManagementFormWindow: {
        show: false,
        Id: 0
      },
      urlPath: [], //证明url
      // 列表数据
      tableData: [],
      ApprovalData: {}
    })
    onMounted(() => {
      // 获取审批流程状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalData = res
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data),
      ...window(form, data, imageRef),
      imageRef
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
