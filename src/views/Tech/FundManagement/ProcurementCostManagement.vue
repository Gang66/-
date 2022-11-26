<template>
  <div class="Tech_OrderAllocationManagementTable">
    <el-tabs type="border-card" class="OrderAllocationManagementTable-tabs">
      <el-tab-pane label="应付账款"> <AccountsPayable /> </el-tab-pane>
      <el-tab-pane label="付款进度">
        <div class="absolute right-4 -top-9">
          <el-radio-group v-model="form.State" @change="allWait()" size="small">
            <el-radio-button :label="0">线上</el-radio-button>
            <el-radio-button :label="1">线下</el-radio-button>
          </el-radio-group>
        </div>
        <!-- 付款记录 -->
        <div class="bg-white pl-4 pr-4 pt-1 relative">
          <!-- 搜索框 -->
          <div class="ConsultationList-dow-query clearfix pb-1">
            <el-input v-model="form.NameInput" size="default" placeholder="供应商" style="width: 200px" class="mr-4" />
            <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
            <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
          </div>
          <!-- 表格 -->
          <div class="pb-3">
            <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
              <div class="bf-table-content">
                <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="50" align="center" />
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="Name" label="供应商" min-width="166" align="center">
                    <template #default="scope">
                      <div class="inline-block">钜雄自控</div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="RecruitChannel" label="采购合同" align="center" width="80">
                    <template #default="scope">
                      <div>
                        <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                        <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="WorkAge" label="申请金额" min-width="160" align="center">
                    <template #default="scope">
                      <div>
                        <span>380000</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="DepartName" label="申请人" width="100" align="center">
                    <template #default="scope">
                      <span>桂某某</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="WorkAge" label="运营经理" align="center">
                    <template #default="scope">
                      <!-- <span>未核准</span> -->
                      <!-- <span>核准中</span> -->
                      <div>
                        <p>徐玉智 - 通过</p>
                        <p class="text-xs">2021-09-14 11:57</p>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="WorkAge" label="总经理" align="center">
                    <template #default="scope">
                      <!-- <span>未审批</span> -->
                      <div>
                        <p>洪树心 - 通过</p>
                        <p class="text-xs">2021-09-14 12:07</p>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="WorkAge" label="财务执行" align="center">
                    <template #default="scope">
                      <!-- <span>未审批</span> -->
                      <span>审批中</span>
                      <div>
                        <p>桂秀珍- 通过</p>
                        <p class="text-xs">2021-09-14 14:31</p>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="RecruitChannel" label="操作" align="center" width="80">
                    <template #default="scope">
                      <!-- <span class="text-red-500">已驳回</span> -->
                      <!-- <span class="text-green-500">已通过</span> -->
                      <div>
                        <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                        <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                      </div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </table-search>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="物流中转"><LogisticsTransit /></el-tab-pane>
      <el-tab-pane label="合同档案"><ContractFile /></el-tab-pane>
      <el-tab-pane label="付款记录"><PaymentRecord /></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import AccountsPayable from './_Components/AccountsPayable.vue'
import ContractFile from './_Components/ContractFile.vue'
import LogisticsTransit from './_Components/LogisticsTransit.vue'
import PaymentRecord from './_Components/PaymentRecord.vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'

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
  }
}

export default defineComponent({
  components: { AccountsPayable, ContractFile, LogisticsTransit, PaymentRecord, TableSearch },
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
      name: '',
      TimeValue: '',
      NameInput: '',
      State: 0 //未处理
    })
    const data = reactive({
      tableData: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    // 全部待处理已处理切换
    const allWait = () => {
      form.page = 1
      renderTableList(form, data)
    }

    onMounted(() => {})
    return {
      data,
      form,
      ...tableRender(form, data),
      shortcuts,
      allWait
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tech_OrderAllocationManagementTable {
  :deep(.OrderAllocationManagementTable-tabs) {
    .el-tabs__content {
      overflow: initial;
    }
  }
}
</style>
