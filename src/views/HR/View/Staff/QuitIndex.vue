<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">离职管理</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="姓名" value="1" />
            <el-option label="事业部" value="2" />
            <el-option label="离职时间" value="5" />
          </el-select>
          <el-input v-model="form.UserName" placeholder="请输入" class="screen-width" v-if="form.type == 1" />
          <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class="screen-width" v-else-if="form.type == 2">
            <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-select v-model="data.DepartId" placeholder="请选择岗位" filterable class="screen-width" v-else-if="form.type == 3">
            <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
          </el-select>
          <el-input v-model="form.RealName" placeholder="请输入" class="screen-width" v-if="form.type == 4" />
          <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type == 5" start-placeholder="开始时间" end-placeholder="结束时间" @change="timeChange" />
          <el-button @click="search()" class="ml-3" type="primary" plain>
            <el-icon>
              <el-icon-Search />
            </el-icon>
            <span>搜索</span>
          </el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="CreateOn" label="离职时间" align="center" width="110">
              <template #default="scope">{{ parseTimeEvent(scope.row.CreateOn) }}</template>
            </el-table-column>
            <el-table-column prop="Name" label="姓名" align="center" />
            <el-table-column prop="WorkAge" label="工龄" align="center" />
            <el-table-column prop="PostTransCount" label="调岗" align="center" />
            <el-table-column prop="Days" label="部门" align="center" width="130">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="岗位" align="center" />
            <el-table-column prop="" label="员工档案" align="center" width="160">
              <template #default="scope">
                <el-button type="primary" link @click="openViewFileFormWindow(scope.row.StaffId)">入职档案</el-button>
                <el-button type="primary" link @click="openreportWindow(scope.row)">综合报告</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" label="离职阶段" align="center">
              <template #default="scope">
                <div class="truncate" v-if="scope.row.QuitStage == 0">-</div>
                <div v-else>
                  <template v-for="(item, index) in data.quitStage">
                    <div class="truncate" v-if="scope.row.QuitStage == item.DicKey">{{ item.DicValue }}</div>
                  </template>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="社保情况" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openSocialSecurityFormWindow(scope.row)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" label="离职资料" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openquitFormViewWindow(scope.row)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" label="审批状态" align="center">
              <template #default="scope">
                <template v-for="(item, index) in data.ApprovalData">
                  <el-button :type="item.Remark" text v-if="scope.row.State == item.DicKey">{{ item.DicValue }}</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 完善档案表单 -->
    <ViewFileForm v-if="data.ViewFileFormWindow.show" @closeWindow="closeWindow" :details="data.details" :Id="data.ViewFileFormWindow.Id" :type="data.ViewFileFormWindow.type"> </ViewFileForm>
    <!-- 正式期报告列表 -->
    <formalList v-if="data.formalListWindow.show" @closeWindow="closeWindow" :userId="data.formalListWindow.userId"></formalList>
    <!-- 试用期报告 -->
    <ProbationForm v-if="data.ProbationFormWindow.show" @closeWindow="closeWindow" :userId="data.ProbationFormWindow.userId"></ProbationForm>
    <!-- 离职详情表 -->
    <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details"> </WFManagementForm>
    <!-- 社保情况 -->
    <SocialSecurityForm v-if="data.SocialSecurityForm.view" @closeWindow="data.SocialSecurityForm.view = false" :UserId="data.SocialSecurityForm.UserId" :viewType="3"> </SocialSecurityForm>
  </div>
</template>

<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import ProbationForm from './_Components/ProbationForm.vue'
import ViewFileForm from '/@/views/HR/View/Induction/_Components/ViewFileForm.vue'
import quitFormView from '/@/views/HR/View/HrTrend/_Components/quitFormView.vue'
import SocialSecurityForm from '/@/views/HR/View/Staff/_Components/SocialSecurityForm.vue'
import formalList from '/@/views/HR/View/Staff/_Components/formalList.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import zStatistic from '../../Components/statistic/Index.vue'
import { GetHRStaffQuitPage } from '/@/api/hr/Staff'
import { PostGetStaffManagementInfo } from '/@/api/hr/Induction'
import { ElMessage } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetHRStaffQuitPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 打开入职档案表
  const openViewFileFormWindow = async (Id: any) => {
    var arr = {
      Id: Id,
      DealWith: '2'
    }
    data.ViewFileFormWindow.Id = Id
    data.ViewFileFormWindow.type = 2
    await PostGetStaffManagementInfo(arr).then((res) => {
      if (res.code == 1) {
        data.details = res.data
        data.ViewFileFormWindow.show = true
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 打开综合报告
  const openreportWindow = (val: any) => {
    console.log(val)
    if (val.QuitStage == 3) {
      data.formalListWindow.userId = val.CreateBy
      data.formalListWindow.show = true
    } else {
      data.ProbationFormWindow.userId = val.CreateBy
      data.ProbationFormWindow.show = true
    }
  }
  // 打开社保详情
  const openSocialSecurityFormWindow = (val: any) => {
    data.SocialSecurityForm.view = true
    data.SocialSecurityForm.UserId = val.CreateBy
  }
  // 弹窗 type // 显示类型 1 添加 2修改 3查看 4审批
  const openquitFormViewWindow = async (val: any, type: number) => {
    if (val) {
      await GetApplyFlowStepEvent({
        DataId: val.Id,
        Code: 'StaffQuit'
      }).then((res: any) => {
        data.WFManagementFormWindow.details = res.data
        data.WFManagementFormWindow.details.viewType = type
      })
      data.WFManagementFormWindow.show = true
    }
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
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    openViewFileFormWindow,
    openreportWindow,
    openquitFormViewWindow,
    typeChange,
    timeChange,
    openSocialSecurityFormWindow
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  const openImage = () => {
    console.log((imageRef.value.previewTeleported = false))
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.ViewFileFormWindow.show = false
    data.formalListWindow.show = false
    data.ProbationFormWindow.show = false
    data.WFManagementFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    closeWindow,
    openImage
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    zStatistic,
    DepTabridge,
    ViewFileForm,
    formalList,
    ProbationForm,
    quitFormView,
    SocialSecurityForm,
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
      BeginDate: '',
      type: '1'
    })
    const data = reactive({
      deptList: [], //部门数据
      details: {}, //档案信息
      quitStage: [], //离职阶段
      // 弹窗数据
      formalListWindow: {
        show: false,
        Id: 0
      },
      // 审批弹窗数据
      WFManagementFormWindow: {
        show: false,
        Id: 0
      },
      // 社保弹窗数据
      SocialSecurityForm: {
        show: false,
        Id: 0
      },
      // 试用期弹窗数据
      ProbationFormWindow: {
        show: false,
        Id: 0
      },
      //员工档案
      ViewFileFormWindow: {
        show: false
      },
      // 列表数据
      tableData: [],
      ApprovalData: {}
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
      // 获取审批流程状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalData = res
      })
      // 获取离职阶段
      store.getDict('hr_quit_stage').then((res: any) => {
        data.quitStage = res
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
