<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">岗位管理</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="姓名" value="1" />
            <el-option label="事业部" value="2" />
            <el-option label="预约时间" value="5" />
          </el-select>
          <el-input v-model="form.UserName" placeholder="请输入" class=" screen-width" v-if="form.type==1" />
          <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class=" screen-width" v-else-if="form.type==2">
            <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type==5" start-placeholder="开始时间"
            end-placeholder="结束时间" @change="timeChange" />
          <el-button @click="search()" class="ml-3" type="primary" plain>
            <el-icon>
              <el-icon-Search />
            </el-icon>
            <span>搜索</span>
          </el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="StartDate" label="转入时间" width="110" align="center"><template #default="scope">{{parseTimeEvent(scope.row.StartDate)}}</template>
            </el-table-column>
            <el-table-column prop="Name" label="姓名" align="center" />
            <el-table-column prop="WorkAge" label="工龄" align="center" />
            <el-table-column prop="Sex" label="性别" align="center" />
            <el-table-column prop="Phone" label="电话" align="center" />
            <el-table-column prop="" label="部门" align="center" width="140">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="Count" label="调岗次数" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openPostTransferFormWindow(scope.row)"> {{scope.row.Count}}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openTransferPostWindow(scope.row,3)">详情</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 查看详情 -->
    <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details">
    </WFManagementForm>
    <PostTransferForm v-if="data.PostTransferFormWindow.show" @closeWindow="closeWindow" :info="data.PostTransferFormWindow.info"></PostTransferForm>
  </div>
</template>

<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import PostTransferForm from './_Components/PostTransferForm.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import zStatistic from '../../Components/statistic/Index.vue'
import TransferPostView from '/@/views/HR/View/HrTrend/_Components/TransferPostView.vue'
import { GetPostTransferList } from '/@/api/hr/Staff'
import { GetTypeDepartList } from '/@/api/system/dept'
import { ElMessage } from 'element-plus'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPostTransferList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
    form.time = ''
    form.BeginDate = ''
    form.EndDate = ''
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
  // 岗位次数查看
  const openPostTransferFormWindow = (val: any) => {
    data.PostTransferFormWindow.info = val
    data.PostTransferFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.WFManagementFormWindow.show = false
    data.PostTransferFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      search()
    }
  }
  // 打开岗位详情
  const openTransferPostWindow = async (val: any, type: number) => {
    await GetApplyFlowStepEvent({
      DataId: val.Id,
      Code: 'PostTransfer'
    }).then((res: any) => {
      data.WFManagementFormWindow.details = res.data
      data.WFManagementFormWindow.details.viewType = type
    })
    data.WFManagementFormWindow.show = true
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    val = new Date(val)
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
    typeChange,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    openTransferPostWindow,
    timeChange,
    closeWindow,
    openPostTransferFormWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    zStatistic,
    DepTabridge,
    TransferPostView,
    WFManagementForm,
    PostTransferForm
  },
  props: {},
  setup() {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      BeginDate: '',
      type: '1'
    })
    const data = reactive({
      // 审批弹窗数据
      WFManagementFormWindow: {
        show: false,
        Id: 0
      },
      PostTransferFormWindow: {
        show: false
      },
      deptList: [], //部门数据
      // 列表数据
      tableData: [],
      TransferPostViewWindow: {
        show: false
      }
    })
    onMounted(() => {
      // 获取部门列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data),
      imageRef
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
