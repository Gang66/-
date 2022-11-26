<template>
  <div class="Tec_ContractApproval">
    <!-- 采购预定审批库 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">采购预定审批库</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.CustomerName" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
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
        <el-input v-model="form.Salerman" size="default" placeholder="业务员" style="width: 100px" class="ml-4 mr-4" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right mt-px">
          <el-button type="primary" @click="openWindowCostAnalysis()"> <i class="iconfont icon-jiage mr-2"></i>成本分析</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe>
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="转入时间" width="166" align="center">
                <template #default="scope">{{ scope.row.CreateOn }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.CustomerName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Salerman" label="业务员">
                <template #default="scope">
                  <div class="w-5 h-5 inline-block bg-green-500 text-center text-xs text-white mr-2 leading-5 rounded-md">{{ scope.row.DeptName && scope.row.DeptName[0] }}</div>
                  <span>{{ scope.row.Salerman }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" width="160" align="center">
                <template #default="scope">{{ scope.row.RealAmount }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="交货期" width="160" align="center">
                <template #default="scope">{{ scope.row.DeliveryTime }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购成本" align="center">
                <template #default="scope">
                  <span>{{ scope.row.PurchasePrice }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购比例" align="center" width="80">
                <template #default="scope">
                  <span class="text-red-400">{{ scope.row.PurchaseRate }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="厂商确认" align="center" width="80">
                <template #default="scope">
                  <span class="text-green-600" v-if="scope.row.SupplierMaterialCount == scope.row.GroupMaterialCount && scope.row.GroupMaterialCount > 0">{{ scope.row.SupplierMaterialCount }} / {{ scope.row.GroupMaterialCount }}</span>
                  <span class="text-red-400" v-else>{{ scope.row.SupplierMaterialCount }} / {{ scope.row.GroupMaterialCount }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="分组数量" align="center" width="80">
                <template #default="scope">
                  <span class="text-red-400">{{ scope.row.GroupConfirmCount }} / {{ scope.row.GroupCount }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购清单" align="center" width="80">
                <template #default="scope">
                  <span class="text-blue-600 cursor-pointer" @click="openWindowPurchaseList(scope.row)"><i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>查看</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                  </div>
                  <!-- <span class="text-gray-400">无</span> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 成本分析 -->
    <CostAnalysis title="成本分析" v-if="costAnalysisOpenData.visible" :FormData="costAnalysisOpenData.formData" @closeWindow="closeWindowCostAnalysis($event)" />
    <!-- 供应商 -->
    <!-- <PurchaseScheduledSupp title="成本分析" v-if="purchaseScheduledSuppOpenData.visible" :FormData="purchaseScheduledSuppOpenData.formData" @closeWindow="closeWindowPurchaseScheduledSupp($event)" /> -->

    <!-- 采购清单 -->
    <PurchaseList :title="purchaseListOpenData.formData.CustomerName + '-分项清单'" v-if="purchaseListOpenData.visible" :FormData="purchaseListOpenData.formData" @closeWindow="closeWindowPurchaseList($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetGroupMaterialBillPage } from '/@/api/tech/Material'
import TableSearch from '/@/components/TableSearch/index.vue'
import CostAnalysis from './_Components/CostAnalysis.vue'
import '/@/assets/css/tech.css'
import PurchaseReservation from './_Components/PurchaseReservation.vue'
// import PurchaseScheduledSupp from './_Components/PurchaseScheduledSupp.vue'
import PurchaseList from './_Components/PurchaseList.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  if (form.Date != null && form.Date.length > 0) {
    form.StartDate = form.Date[0]
    form.EndDate = form.Date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }
  await GetGroupMaterialBillPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.records
      // data.tableData = [{Id: 6}]
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
export default defineComponent({
  components: {
    TableSearch,
    CostAnalysis,
    PurchaseReservation,
    // PurchaseScheduledSupp,
    PurchaseList
  },
  setup() {
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      CustomerName: '',
      Salerman: '',
      Date: [],
      StartDate: '',
      EndDate: ''
    })
    const data = reactive({
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
      tableData: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }

    // 成本分析 弹框
    const costAnalysisOpen = (data: any) => {
      let costAnalysisOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowCostAnalysis = (val: any) => {
        costAnalysisOpenData.formData = {}
        costAnalysisOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowCostAnalysis = (type: string) => {
        costAnalysisOpenData.visible = false
      }

      return {
        costAnalysisOpenData,
        openWindowCostAnalysis,
        closeWindowCostAnalysis
      }
    }

    // //供应商
    // const purchaseScheduledSuppOpen = (data: any) => {
    //   let purchaseScheduledSuppOpenData: any = reactive({
    //     visible: false,
    //     formData: {
    //       CustomerName: '',
    //       BillId: 0
    //     }
    //   })

    //   //打开弹窗
    //   const openWindowPurchaseScheduledSupp = (val: any) => {
    //     purchaseScheduledSuppOpenData.formData = {
    //       CustomerName: val.CustomerName,
    //       BillId: val.Id
    //     }
    //     purchaseScheduledSuppOpenData.visible = true
    //   }

    //   //关闭弹窗
    //   const closeWindowPurchaseScheduledSupp = (type: string) => {
    //     purchaseScheduledSuppOpenData.visible = false
    //   }

    //   return {
    //     purchaseScheduledSuppOpenData,
    //     openWindowPurchaseScheduledSupp,
    //     closeWindowPurchaseScheduledSupp
    //   }
    // }

    // 采购清单
    const purchaseListOpen = (data: any) => {
      let purchaseListOpenData: any = reactive({
        visible: false,
        formData: {
          OnlyType: 1,
          CustomerName: '',
          BillId: 0,
        }
      })

      //打开弹窗
      const openWindowPurchaseList = (val: any) => {
        purchaseListOpenData.formData = {
          OnlyType: 1,
          CustomerName: val.CustomerName,
          BillId: val.Id
        }
        purchaseListOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowPurchaseList = (type: string) => {
        purchaseListOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        purchaseListOpenData,
        openWindowPurchaseList,
        closeWindowPurchaseList
      }
    }

    return {
      data,
      form,
      Search,
      ...purchaseListOpen({ data }),
      ...tableRender(form, data),
      ...costAnalysisOpen({ data }),
      // ...purchaseScheduledSuppOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
