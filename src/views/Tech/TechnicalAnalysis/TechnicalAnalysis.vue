<template>
  <div class="tech_technicalanalys">
    <div class="h-12">
      <TechnicalTop></TechnicalTop>
      <!-- 技术分析 -->
      <div class="clearfix pt-1 pr-4 pb-1 pl-0 mt-4 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
        <div class="float-left pt-1 mb-1">
          <span class="ml-4 text-sm">技术分析</span>
        </div>
        <div class="float-right">
          <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="wait">待审核</el-radio-button>
            <el-radio-button label="reviewed">已审核</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="bf-table-content bg-white">
        <!-- 搜索框 -->
        <div class="clearfix pt-3 pl-4 pr-4 pb-3">
          <div class="float-left">
            <div class="float-left mr-1">
              <el-input v-model="form.title" placeholder="请输入客户名称" />
            </div>
            <div class="float-right pt-1 ml-2">
              <el-button type="primary" :icon="Search" @click="searchEvent">查询</el-button>
            </div>
          </div>
          <div class="float-right">
            <el-button type="warning"><i class="iconfont icon-dingdan8 mr-2"></i> 撤销审批</el-button>
          </div>
        </div>
        <!-- 表格 -->
        <div class="pt-0 pl-4 pr-4 pb-4">
          <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="询价时间" width="166">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="160">
                <template #default="scope">
                  <!-- 必 -->
                  <div class="customerName inline-block bg-red-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeCode === 'A'">
                    <span class="text-xs text-white">必</span>
                  </div>
                  <!-- 重 -->
                  <div class="customerName inline-block bg-blue-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeCode === 'B'">
                    <span class="text-xs text-white">重</span>
                  </div>
                  <!-- 普 -->
                  <div class="customerName inline-block bg-green-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeCode === 'C'">
                    <span class="text-xs text-white">普</span>
                  </div>
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="InviteName" label="等级" width="100">
                <template #default="scope">
                  <!-- A -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                  <!-- B -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                  <!-- C -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="100">
                <template #default="scope">刘某某</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="询价状态" width="100">
                <template #default="scope">跟进过程</template>
              </el-table-column>
              <el-table-column prop="PostName" label="审批状态" width="120" align="center">
                <template #default="scope">
                  <!-- 已通过 -->
                  <!-- <span class=" text-green-500 cursor-pointer" @click="openWindowApprovalStatus()">审批通过</span> -->
                  <!-- 待审核 -->
                  <span class="text-yellow-500 cursor-pointer" @click="openWindowApprovalStatus()">待审核</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="100">
                <template #default="scope"><div class="text-blue-600 cursor-pointer">查看</div></template>
              </el-table-column>
            </el-table>
          </table-search>
        </div>
      </div>
      <!-- </div> -->
    </div>
    <!-- 审批状态 -->
    <ApprovalStatus title="询价单质量确认" v-if="approvalStatusOpenData.visible" :FormData="approvalStatusOpenData.formData" @closeWindow="closeWindowApprovalStatus($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import filterDatetime from '../Inquiry/_Components/filterDatetime.vue'
import TechnicalTop from '../Inquiry/_Components/TotalWages.vue'
import { Search } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetPageList } from '/@/api/tech/EnquiryData'
import ApprovalStatus from './_Components/ApprovalStatus.vue'
import { approvalStatusOpen } from '/@/assets/ts/techOpenWindow'
import '/@/assets/css/tech.css'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPageList(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data
      //   data.tableData = res.data.records
      //   data.PathList
      //   form.totals = res.data.totals
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
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails)
    // console.log(data.selectDetails[0].Id)
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent
    // GetOverTimeLists,
    // GetBeOverTimeLists
  }
}
export default defineComponent({
  components: {
    filterDatetime,
    TechnicalTop,
    TableSearch,
    ApprovalStatus
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })
    const tabPosition = ref('all')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      console.log(tabPosition.value)
      data.show_1 = tabPosition.value
    }
    const data = reactive({
      show_1: 'all'
    })
    // 查询
    const searchEvent = () => {
      console.log('查询')
    }
    return {
      data,
      tabPosition,
      allWait,
      Search,
      form,
      ...tableRender(form, data),
      searchEvent,
      ...approvalStatusOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_technicalanalys {
  .bf-table-content {
    margin-top: 0;
  }
  :deep(.el-input__wrapper) {
    margin-top: 4px !important;
  }
}
</style>
