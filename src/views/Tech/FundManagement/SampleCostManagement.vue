<template>
  <div class="Tec_ContractApproval">
    <!-- 样品费用管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">样品费用管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-3 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix">
        <el-date-picker class="align-bottom mr-4" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 240px" />
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-select v-model="form.ApprovalStatusValue" class="mr-2" placeholder="审批状态" style="width: 120px">
          <el-option v-for="item in data.ApprovalStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-select v-model="form.ExpenseCategory" class="mr-2" placeholder="费用类别" style="width: 120px">
          <el-option v-for="item in data.ExpenseCategoryOptions" :key="item.value" :label="item.label" :value="item.value" />
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
              <el-table-column prop="Name" label="申请人" width="80">
                <template #default="scope">
                  <span>刘某某</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="使用客户" min-width="166" align="center">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>

              <el-table-column prop="DepartName" label="样品费用" width="100" align="center">
                <template #default="scope">
                  <span>5000</span>
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="使用时间" width="166" align="center">
                <template #default="scope">2021-06-10</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="审核状态" align="center" min-width="100">
                <template #default="scope">
                  <!-- <span>审批通过</span> -->
                  <span>大区经理审批</span>
                  <!-- <span>大区经理驳回</span> -->
                  <!-- <span>总经理审批</span> -->
                  <!-- <span>总经理驳回</span> -->
                  <!-- <span>销售经理审批</span> -->
                  <!-- <span>销售经理驳回</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="样品状态" align="center" width="100">
                <template #default="scope">
                  <!-- <span>生产确认</span> -->
                  <span>已归还</span>
                  <!-- <span>已领取</span> -->
                  <!-- <span>-</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="费用类别" align="center" width="100">
                <template #default="scope">
                  <span>转为库存</span>
                  <!-- <span>-</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="操作" align="center" width="100">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer"> <i class="iconfont icon-zitiyulan"></i> 详情</span>
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
    const shortcuts = [
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
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      TimeValue: '',
      NameInput: '',
      ApprovalStatusValue: '',
      ExpenseCategory: ''
    })
    const data = reactive({
      ApprovalStatusOptions: [
        {
          value: '1',
          label: '销售经理审批'
        },
        {
          value: '2',
          label: '大区经理审批'
        },
        {
          value: '3',
          label: '总经理审批'
        },
        {
          value: '4',
          label: '销售经理驳回'
        },
        {
          value: '5',
          label: '大区经理驳回'
        },
        {
          value: '6',
          label: '总经理驳回'
        },
        {
          value: '7',
          label: '审批通过'
        }
      ],
      ExpenseCategoryOptions: [
        {
          value: '1',
          label: '转为库存'
        },
        {
          value: '2',
          label: '转为欠款'
        },
        {
          value: '3',
          label: '赠送客户'
        }
      ]
    })
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      shortcuts
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
