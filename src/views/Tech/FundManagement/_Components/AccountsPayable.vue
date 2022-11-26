<template>
  <div class="Tec_ContractApproval">
    <!-- 应收账款 -->
    <div class="bg-white pl-4 pr-4 pt-1 relative">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-2">
        <el-input v-model="form.keywords" size="default" placeholder="供应商" style="width: 200px" class="mr-4" />
        <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right">
          <el-button type="primary" class="ml-4" @click="OpenPayableWindow"> <i class="iconfont icon-hsfx mr-2"></i> 付款申请</el-button>
          <!-- <el-button type="danger" class="ml-4" @click="search"> <i class="iconfont icon-xjd mr-2"></i> 付款申请（线下）</el-button> -->
          <el-button type="success" class="ml-4" @click="search"> <i class="iconfont icon-chanpin mr-2"></i> 对账管理</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="60" align="center" />
              <el-table-column prop="AgreeDate" label="生效时间" width="170" align="center">
                <template #default="scope">{{ scope.row.AgreeDate }}</template>
              </el-table-column>
              <el-table-column prop="SupplierName" label="供应商" width="230" align="center" show-overflow-tooltip>
                <template #default="scope">
                  <div class="inline-block">{{ scope.row.SupplierName }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="SupplierName" label="合同金额" align="center" width="130">
                <template #default="scope">
                  <div class="inline-block">{{ scope.row.TotalContractAmount }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="ContractCount" label="合同数量" width="90" align="center">
                <template #default="scope">
                  <div class="inline-block">{{ scope.row.ContractCount }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="PaidAmount" label="已付金额" align="center" width="130">
                <template #default="scope">
                  <div>
                    <span>{{ scope.row.PaidAmount }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="ExpirePayAmount" label="到期应付" width="130" align="center">
                <template #default="scope">
                  <div>
                    <span>{{ scope.row.ExpirePayAmount }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="AfterSaleAmount" label="售后费用" width="130" align="center">
                <template #default="scope">
                  <div class="clearfix">
                    <span>{{ scope.row.AfterSaleAmount }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="合同档案" align="center">
                <template #default="scope">
                  <div @click="openReconcile(scope.row)">
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="付款记录" align="center">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <div class="zong h-10 flex text-center leading-10 border-b overflow-x-scroll" style="min-width: 1120px">
              <div class="h-10" style="width: 510px"><span class="text-sm">本表合计</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.PageTotalAmount }}</span></div>
              <div class="sum2 h-10"><span class="text-sm">{{ data.PageContractCount }}</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.PagePaidAmount  }}</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.PageExpirePayAmount  }}</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.PageAfterSaleAmount  }}</span></div>
            </div>
            <div class="zong h-10 flex text-center leading-10 border-b overflow-x-scroll" style="min-width: 1120px">
              <div class="h-10" style="width: 510px"><span class="text-sm">全表合计</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.TotalAmount }}</span></div>
              <div class="sum2 h-10"><span class="text-sm">{{ data.TotalContractCount }}</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.TotalPaidAmount }}</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.TotalExpirePayAmount }}</span></div>
              <div class="sum1 h-10"><span class="text-sm">{{ data.TotalAfterSaleAmount }}</span></div>
            </div>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 对账列表 -->
    <ReconcileList v-if="ReconcileData.visible" :FormData="ReconcileData.formData" @closeWindow="closeReconcile($event)" />
    <!-- 付款申请 -->
    <PurchasePaymentRequest v-if="PaymentRequestData.visible" :FormData="PaymentRequestData.formData" :ViewType="PaymentRequestData.ViewType" @closeWindow="closeWindowPaymentRequest($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetPurchaseSupplierPaymentPage, GetPurchasePaymentTotalInfo } from '/@/api/tech/Material'
import ReconcileList from './ReconcileList.vue'
import PurchasePaymentRequest from './PurchasePaymentRequest.vue'
import { ReconcileOpen, PaymentRequestOpen } from '/@/assets/ts/techOpenWindow'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElNotification } from 'element-plus'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPurchaseSupplierPaymentPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data?.records?.Items || []
      data.PageAfterSaleAmount = res.data?.records?.PageAfterSaleAmount
      data.PageContractCount = res.data?.records?.PageContractCount
      data.PageExpirePayAmount = res.data?.records?.PageExpirePayAmount
      data.PagePaidAmount = res.data?.records?.PagePaidAmount
      data.PageShouldPayAmount = res.data?.records?.PageShouldPayAmount
      data.PageTotalAmount = res.data?.records?.PageTotalAmount
      form.totals = res.data.totals
    }
  })
}
// 列表数据请求
const getAllInfo = async (form: any, data: any) => {
  await GetPurchasePaymentTotalInfo(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.TotalAfterSaleAmount = res?.data?.TotalAfterSaleAmount
      data.TotalAmount = res?.data?.TotalAmount
      data.TotalContractCount = res?.data?.TotalContractCount
      data.TotalExpirePayAmount = res?.data?.TotalExpirePayAmount
      data.TotalPaidAmount = res?.data?.TotalPaidAmount
      data.TotalShouldPayAmount = res?.data?.TotalShouldPayAmount
    }
  })
}

// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  getAllInfo(form, data)
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const search = () => {
    form.page = 1
    renderTableList(form, data)
    getAllInfo(form, data)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  }
}
export default defineComponent({
  components: {
    TableSearch,
    ReconcileList,
    PurchasePaymentRequest
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      keywords: ''
    })
    const data = reactive({
      tableData: [],
      PageAfterSaleAmount: 0,
      PageContractCount: 0,
      PageExpirePayAmount: 0,
      PagePaidAmount: 0,
      PageShouldPayAmount: 0,
      PageTotalAmount: 0,
      TotalAfterSaleAmount: 0,
      TotalAmount: 0,
      TotalContractCount: 0,
      TotalExpirePayAmount: 0,
      TotalPaidAmount: 0,
      TotalShouldPayAmount: 0,

      selectDetails: []
    })
    
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }

    const PaymentRequestOpenData = PaymentRequestOpen({data, getData})
    const OpenPayableWindow = () => {
      if (data.selectDetails.length == 0) {
        ElNotification({
          title: '提示',
          message: '请选择一条记录',
          type: 'warning',
        })
        return false
      }
      if (data.selectDetails.length > 1) {
        ElNotification({
          title: '提示',
          message: '请最多选择一条记录',
          type: 'warning',
        })
        return false
      }
      PaymentRequestOpenData.openWindowPaymentRequest()
    }
    onMounted(() => {
      PaymentRequestOpenData.openWindowPaymentRequest()
    })
    return {
      data,
      form,
      TableSearch,
      OpenPayableWindow,
      ...PaymentRequestOpenData,
      ...tableRender(form, data),
      ...ReconcileOpen({data})
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
  .sum1 {
    width: 130px;
  }
  .sum2 {
    width: 90px;
  }
  .sum3 {
    width: 240px;
  }
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>
