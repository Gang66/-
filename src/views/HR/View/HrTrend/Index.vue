<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between bf-screen-class">
        <div class="bf-table-label">人事去向</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 mr-2 label-width" placeholder="类型" @change="typeChange">
            <el-option label="申请类型" value="1" />
            <el-option label="申请时间" value="5" />
          </el-select>
          <el-select v-model="form.ApplicationType" placeholder="请选择申请类型" filterable class="value-width" v-if="form.type == 1">
            <el-option v-for="item in data.trendType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
          </el-select>
          <el-date-picker v-model="form.time" class="time-width" type="daterange" range-separator="至" v-else-if="form.type == 5" start-placeholder="开始时间" end-placeholder="结束时间"
            @change="timeChange" />
          <el-button plain @click="search()" class="ml-6">
            <img src="/src/assets/img/hr/icon/screen.png" alt="" class="icon-width" />
            搜索
          </el-button>
          <div class="bf-hr-button">
            <el-button type="primary" class="ml-2" @click="opentrendFormWindow(1, 1)">
              <img src="/src/assets/img/hr/icon/wendang.png" alt="" class="icon-width" />
              去向申请
            </el-button>
          </div>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="CreateOn" label="申请日期" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.CreateOn) }}
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="申请类型" align="center">
              <template #default="scope">
                <div v-for="item in data.trendType" :key="item.DicKey">
                  <span v-if="scope.row.ApplicationType == item.DicKey">{{ item.DicValue }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="申请原因" align="center" width="300">
              <template #default="scope">
                <div class="truncate">{{ scope.row.Remark ? scope.row.Remark : '-' }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="状态" align="center" width="100">
              <template #default="scope">
                <template v-for="(item, index) in data.ApprovalList">
                  <div class="bf-button-bl" v-if="item.DicKey == scope.row.State">
                    <el-button text :key="index" :type="item.Remark" @click="openWFManagementFormWindow(scope.row)">{{ item.DicValue }}</el-button>
                  </div>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="Suggestion" label="操作" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openquitFormWindow(scope.row, 3)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 申请表 -->
    <trendForm v-if="data.trendFormWindow.show" @closeWindow="closeWindow" :viewType="data.trendFormWindow.viewType"></trendForm>
    <!-- 离职详情表 -->
    <!-- <quitFormView v-if="data.quitFormViewWindow.show" @closeWindow="closeWindow" :Id="data.quitFormViewWindow.Id" :viewType="data.quitFormViewWindow.viewType"></quitFormView> -->
    <!-- 查看转正申请详情 -->
    <!-- <RegularFormView v-if="data.RegularFormViewWindow.show" @closeWindow="closeWindow" :Id="data.RegularFormViewWindow.Id" :viewType="data.RegularFormViewWindow.viewType" /> -->
    <!-- 查看调岗详情 -->
    <!-- <TransferPostView v-if="data.TransferPostViewWindow.show" @closeWindow="closeWindow" :Id="data.TransferPostViewWindow.Id" :viewType="data.TransferPostViewWindow.viewType">
    </TransferPostView> -->
    <!-- 查看详情 -->
    <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details"> </WFManagementForm>
  </div>
</template>

<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { preview } from 'vue3-preview-image'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import tabs from '/@/components/Tabs/Index.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import quitFormView from './_Components/quitFormView.vue'
import RegularFormView from './_Components/RegularFormView.vue'
import trendForm from './_Components/trendForm.vue'
import TransferPostView from './_Components/TransferPostView.vue'
import { GetTrendPositivePage } from '/@/api/hr/TrendPositive'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetTrendPositivePage(form).then((res) => {
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
  // 监听时间筛选
  const timeChange = (val: any) => {
    if (val) {
      form.BeginDate = parseTime(val[0], '{y}-{m}-{d}')
      form.EndDate = parseTime(val[1], '{y}-{m}-{d}')
    } else {
      form.BeginDate = ''
      form.EndDate = ''
    }
  }
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
    form.time = ''
    form.HRName = ''
    form.BeginDate = ''
    form.EndDate = ''
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
    timeChange,
    typeChange
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  const openImage = () => {
    console.log((imageRef.value.previewTeleported = false))
  }
  // 弹窗 type // 显示类型 1 添加 2修改 3查看 4审批
  const openquitFormWindow = async (val: any, type: number) => {
    debugger
    if (val) {
      var code = ''
      if (val.ApplicationType == 1) {
        code = 'HR_Trend_positive'
        // data.RegularFormViewWindow.Id = val.Id
        // data.RegularFormViewWindow.viewType = type
        // data.RegularFormViewWindow.show = true
      } else if (val.ApplicationType == 2) {
        code = 'StaffQuit'
        // data.quitFormViewWindow.Id = val.Id
        // data.quitFormViewWindow.viewType = type
        // data.quitFormViewWindow.show = true
      } else if (val.ApplicationType == 3) {
        code = 'PostTransfer'
        // data.TransferPostViewWindow.Id = val.Id
        // data.TransferPostViewWindow.viewType = type
        // data.TransferPostViewWindow.show = true
      } else if (val.ApplicationType == 4) {
        code = 'AdjustSalary'
      }
      console.log(code)
      await GetApplyFlowStepEvent({
        DataId: val.Id,
        Code: code
      }).then((res: any) => {
        data.WFManagementFormWindow.details = res.data
        data.WFManagementFormWindow.details.viewType = type
      })
      data.WFManagementFormWindow.show = true
    }
  }
  // 新增弹窗 viewType // 显示类型 1 添加 2修改 3查看 4审批 ****   type 1转正申请
  const opentrendFormWindow = (type: number, viewType: number) => {
    data.trendFormWindow.viewType = viewType
    data.trendFormWindow.show = true
    // if (type == 1) {

    // } else if (type == 2) {
    //   data.quitFormWindow.show = true
    // } else if (type == 3) {
    //   data.TransferPostFormWindow.show = true
    // } else {
    //   data.quitFormWindow.isEdit = true
    //   data.quitFormWindow.show = true
    // }
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.trendFormWindow.show = false
    data.RegularFormViewWindow.show = false
    data.TransferPostViewWindow.show = false
    data.quitFormViewWindow.show = false
    data.WFManagementFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openquitFormWindow,
    closeWindow,
    openImage,
    opentrendFormWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    zStatistic,
    tabs,
    quitFormView,
    trendForm,
    RegularFormView,
    TransferPostView,
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
      type: '1'
    })
    const data = reactive({
      ApprovalList: [], //审批状态
      trendType: [], //申请类型数据
      // 查看离职弹窗数据
      quitFormViewWindow: {
        show: false,
        Id: 0
      },
      // 弹窗数据
      trendFormWindow: {
        show: false,
        Id: 0
      },
      // 查看转正弹窗弹窗数据
      RegularFormViewWindow: {
        show: false,
        Id: 0
      },
      // 查看调岗弹窗数据
      TransferPostViewWindow: {
        show: false,
        Id: 0
      },
      // 弹窗数据
      WFManagementFormWindow: {
        show: false,
        Id: 0
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
      // 申请类型
      store.getDict('hr_trend_type').then((res: any) => {
        data.trendType = res
      })
      // 审批状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalList = res
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
