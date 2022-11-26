<template>
  <div class="Tec_ContractApproval">
    <!-- 采购合同管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">采购合同管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix">
        <el-input v-model="form.CustomerName" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <!-- <el-date-picker class="align-bottom" v-model="form.Date" size="default" type="date" placeholder="生效时间" style="width: 240px" value-format="YYYY-MM-DD"/> -->
        <el-date-picker
          class="align-bottom"
          v-model="form.Date"
          size="default"
          type="datetimerange"
          :shortcuts="data.shortcuts"
          range-separator="~"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          style="width: 240px"
          value-format="YYYY-MM-DD hh:mm:ss"
        />
        <el-button type="primary" class="ml-2" :icon="Search" @click="search">查询</el-button>
        <div class="float-right mt-px">
          <div class="float-left mr-4">
            <div class="text-blue-500 text-xs">
              <div class="w-2 h-2 bg-blue-400 inline-block"></div>
              运营经理待签订单
            </div>
            <div class="text-red-500 text-xs">
              <div class="w-2 h-2 bg-red-400 inline-block"></div>
              物采经理待签订单
            </div>
            <div class="text-green-500 text-xs">
              <div class="w-2 h-2 bg-green-400 inline-block"></div>
              采购专员待签订单
            </div>
          </div>
          <el-button type="danger"> <i class="iconfont icon-fenxi mr-2"></i>采购分析</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe>
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="生效时间" width="166" align="center">
                <template #default="scope">{{ scope.row.CreateOn }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="360">
                <template #default="scope">
                  <div class="clearfix">
                    <div class="inline-block text-blue-500 mr-2 cursor-pointer"><i class="iconfont icon-khgx"></i></div>
                    <div class="inline-block">{{ scope.row.CustomerName }}</div>
                    <div class="float-right text-center text-white text-xs mt-1">
                      <div class="w-6 h-4 bg-blue-400 rounded-l inline-block">122</div>
                      <div class="w-6 h-4 bg-red-400 inline-block">100</div>
                      <div class="w-6 h-4 bg-green-400 rounded-r inline-block">122</div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" width="150" align="center">
                <template #default="scope">{{ scope.row.Amount }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购合计" width="150" align="center">
                <template #default="scope">
                  <div class="clearfix">
                    <span>{{ scope.row.TempPurchasePrice }}</span>
                    <sup class="text-red-500 text-xs">{{ scope.row.PurchaseRate }}</sup>
                    <!-- <sup class="text-green-500 text-xs">2.01</sup> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="交货期" width="80" align="center">
                <template #default="scope">{{ scope.row.DeliveryTime }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="供应商" width="80" align="center">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer" @click="openWindowPurchaseScheduledSuppliers(scope.row)">{{ scope.row.ConfirmSupplierCount }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购列表" align="center" width="80">
                <template #default="scope">
                  <div @click="openWindowPurchaseScheduledMaterial(scope.row)" class="cursor-pointer">
                    <span class="text-green-400" v-if="scope.row.TempPurchasePrices == scope.row.TotalMaterialCount && scope.row.TotalMaterialCount > 0">{{ scope.row.TempPurchasePrices || 0 }} / {{ scope.row.TotalMaterialCount || 0 }}</span>
                    <span class="text-red-400" v-else>{{ scope.row.TempPurchasePrices || 0 }} / {{ scope.row.TotalMaterialCount || 0 }}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购合同" align="center" width="80">
                <template #default="scope">
                  <div class="cursor-pointer" @click="openWindowPurchaseScheduledContract(scope.row)">
                    <span class="text-green-400 cursor-pointer" v-if="scope.row.TempPurchaseMaterialCount == scope.row.TempPurchaseContractCount && scope.row.TempPurchaseContractCount > 0">{{ scope.row.TempPurchaseMaterialCount || 0 }} / {{ scope.row.TempPurchaseContractCount || 0 }}</span>
                    <span class="text-red-400 cursor-pointer" v-else>{{ scope.row.TempPurchaseMaterialCount || 0 }} / {{ scope.row.TempPurchaseContractCount || 0 }}</span>
                  </div>
                  <!-- <span class="text-red-400">0 / 16</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购汇总" align="center">
                <template #default="scope">
                  <div @click="openWindowPurchaseSummary(scope.row)">
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div>
                  </div>
                  <!-- <span class="text-gray-400">无</span> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 供应商 -->
    <PurchaseScheduledSuppliers :title="`${purchaseScheduledSuppliersOpenData.formData.Name} - 供应商`" v-if="purchaseScheduledSuppliersOpenData.visible" :FormData="purchaseScheduledSuppliersOpenData.formData" @closeWindow="closeWindowPurchaseScheduledSuppliers($event)" />
    <!-- 物料采购列表 -->
    <PurchaseScheduledMaterial :title="`${PurchaseScheduledMaterialOpenData.formData.Name} - 物料合同`" v-if="PurchaseScheduledMaterialOpenData.visible" :FormData="PurchaseScheduledMaterialOpenData.formData" @closeWindow="closeWindowPurchaseScheduledMaterial($event)" />
    <!-- 合同采购列表 -->
    <PurchaseScheduledContract :title="`${PurchaseScheduledContractOpenData.formData.Name} - 采购合同`" v-if="PurchaseScheduledContractOpenData.visible" :FormData="PurchaseScheduledContractOpenData.formData" @closeWindow="closeWindowPurchaseScheduledContract($event)" />
    <!-- 采购汇总表 -->
    <PurchaseSummary title="采购汇总表" v-if="purchaseSummaryOpenData.visible" :FormData="purchaseSummaryOpenData.formData" @closeWindow="closeWindowPurchaseSummary($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetMaterialBillConfirmMainPage } from '/@/api/tech/Material'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'
import PurchaseScheduledSuppliers from './_Components/PurchaseScheduledSuppliers.vue'
import PurchaseScheduledMaterial from './_Components/PurchaseScheduledMaterial.vue'
import PurchaseScheduledContract from './_Components/PurchaseScheduledContract.vue'
import PurchaseSummary from './_Components/PurchaseSummary.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  if (form.Date != null && form.Date.length > 0) {
    form.StartDate = form.Date[0]
    form.EndDate = form.Date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }

  await GetMaterialBillConfirmMainPage(form).then((res) => {
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
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange
  }
}
//  供应商
const purchaseScheduledSuppliersOpen = (data: any) => {
  let purchaseScheduledSuppliersOpenData: any = reactive({
    visible: false,
    formData: {
      Name: '',
      BillId: 0
    }
  })

  //打开弹窗
  const openWindowPurchaseScheduledSuppliers = (val: any) => {
    purchaseScheduledSuppliersOpenData.formData = {
      Name: val.CompanyName,
      BillId: val.Id
    }
    purchaseScheduledSuppliersOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowPurchaseScheduledSuppliers = (type: string) => {
    purchaseScheduledSuppliersOpenData.visible = false
  }

  return {
    purchaseScheduledSuppliersOpenData,
    openWindowPurchaseScheduledSuppliers,
    closeWindowPurchaseScheduledSuppliers
  }
}
//  物料采购
const PurchaseScheduledMaterialOpen = (data: any) => {
  let PurchaseScheduledMaterialOpenData: any = reactive({
    visible: false,
    formData: {
      Name: '',
      BillId: 0
    }
  })

  //打开弹窗
  const openWindowPurchaseScheduledMaterial = (val: any) => {
    PurchaseScheduledMaterialOpenData.formData = {
      Name: val.CustomerName,
      BillId: val.Id
    }
    PurchaseScheduledMaterialOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowPurchaseScheduledMaterial = (type: string) => {
    PurchaseScheduledMaterialOpenData.visible = false
    data.getData()
  }

  return {
    PurchaseScheduledMaterialOpenData,
    openWindowPurchaseScheduledMaterial,
    closeWindowPurchaseScheduledMaterial
  }
}
//  采购合同
const PurchaseScheduledContractOpen = (data: any) => {
  let PurchaseScheduledContractOpenData: any = reactive({
    visible: false,
    formData: {
      Name: '',
      BillId: 0
    }
  })

  //打开弹窗
  const openWindowPurchaseScheduledContract = (val: any) => {
    PurchaseScheduledContractOpenData.formData = {
      Name: val.CustomerName,
      BillId: val.Id
    }
    PurchaseScheduledContractOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowPurchaseScheduledContract = (type: string) => {
    PurchaseScheduledContractOpenData.visible = false
    data.getData()
  }

  return {
    PurchaseScheduledContractOpenData,
    openWindowPurchaseScheduledContract,
    closeWindowPurchaseScheduledContract
  }
}
// 采购汇总表
const purchaseSummaryOpen = (data: any) => {
  let purchaseSummaryOpenData: any = reactive({
    visible: false,
    formData: {
      BillId: 0
    }
  })

  //打开弹窗
  const openWindowPurchaseSummary = (val: any) => {
    purchaseSummaryOpenData.formData = {
      BillId: val.Id
    }
    purchaseSummaryOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowPurchaseSummary = (type: string) => {
    purchaseSummaryOpenData.visible = false
    data.getData()
  }

  return {
    purchaseSummaryOpenData,
    openWindowPurchaseSummary,
    closeWindowPurchaseSummary
  }
}
export default defineComponent({
  components: {
    TableSearch,
    PurchaseScheduledSuppliers,
    PurchaseScheduledMaterial,
    PurchaseScheduledContract,
    PurchaseSummary
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      CustomerName: '',
      Date: '',
      StartDate: '',
      EndDate: ''
    })
    const data = reactive({
      tableData: [],
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
      ],
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      ...purchaseScheduledSuppliersOpen({ data }),
      ...PurchaseScheduledMaterialOpen({ data, getData }),
      ...PurchaseScheduledContractOpen({ data, getData }),
      ...purchaseSummaryOpen({ data, getData })
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
