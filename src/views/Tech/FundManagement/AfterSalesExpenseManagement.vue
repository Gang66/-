<template>
  <div class="Tec_ContractApproval">
    <!-- 售后费用管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">售后费用管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-4">
        <el-date-picker class="align-bottom mr-4" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 240px" />
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-select v-model="form.ApprovalStatusValue" class="mr-2" placeholder="审批状态" style="width: 120px">
          <el-option v-for="item in data.ApprovalStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="ml-2" :icon="Search" @click="search">查询</el-button>
        <el-button class=""> <i class="iconfont icon-daochu mr-2"></i><span>导出数据</span></el-button>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="申请时间" width="166" align="center">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166" align="center">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="申请人" width="80">
                <template #default="scope">
                  <span>刘某某</span>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="合同金额" width="100" align="center">
                <template #default="scope">
                  <span>1000000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同欠款" align="center" min-width="100">
                <template #default="scope">
                  <span>2000000</span>
                </template>
              </el-table-column>
              <el-table-column prop="InviteName" label="等级" width="60">
                <template #default="scope">
                  <!-- A -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                  <!-- B -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                  <!-- C -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="申请费用" align="center">
                <template #default="scope">
                  <span>1000000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="处理详情" align="center" width="100">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer"> <i class="iconfont icon-zitiyulan"></i> 预览</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="举证" align="center" width="100">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer"> <i class="iconfont icon-zitiyulan"></i> 查看</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="状态" align="center" width="100">
                <template #default="scope">
                  <span class="text-orange-400">待报销</span>
                  <!-- <span class="text-green-400">已报销</span> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
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
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
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
    TableSearch
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      TimeValue: '',
      NameInput: '',
      ApprovalStatusValue: ''
    })
    const data = reactive({
      ApprovalStatusOptions: [
        {
          value: '1',
          label: '待报销'
        },
        {
          value: '2',
          label: '已报销'
        }
      ],
      shortcuts: [
        {
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          }
        },
        {
          text: '最近一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          }
        },
        {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          }
        }
      ]
    })
    return {
      data,
      form,
      Search,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.inquiry_components_totalwages {
  @media only screen and (max-width: 1500px) {
    .inquiry_big_img {
      display: none;
    }
  }
}
</style>
