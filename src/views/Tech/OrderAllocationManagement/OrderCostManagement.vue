<template>
  <div class="tech_technicalanalys">
    <div class="h-12">
      <filterDatetime @transmitTime="transmitTimeEvent" :list="data.timeList" :key="data.selectIndex"></filterDatetime>
      <OrderCostManagementTop />
      <!-- 订单成本管理 -->
      <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
        <div class="float-left pt-1">
          <span class="ml-4 text-sm">订单成本管理</span>
        </div>
        <div class="float-right mb-1">
          <el-radio-group v-model="form.State" @change="allWait()" size="small">
            <el-radio-button :label="null">全部</el-radio-button>
            <el-radio-button :label="0">待处理</el-radio-button>
            <el-radio-button :label="1">已处理</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="bf-table-content bg-white pl-4 pr-4 pt-4 rounded-b-md mb-6">
        <!-- 搜索框 -->
        <div class="ConsultationList-dow-query inline-block pb-4">
          <el-date-picker v-model="form.date" type="daterange" unlink-panels range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" size="default" style="width: 260px" class="mr-4 align-middle" />
          <el-input v-model="form.CustomerName" size="default" placeholder="请输入客户名称" style="width: 200px" class="mr-4" />
          <el-select v-model="form.GradeCode" placeholder="报价等级" style="width: 100px" class="mr-4">
            <el-option v-for="item in data.techOrderGradesOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
          </el-select>
          <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
            <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-input v-model="form.SalerName" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
          <el-button type="primary" :icon="Search" @click="search">查询</el-button>
        </div>
        <!-- 表格 -->
        <div class="pb-4">
          <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column type="index" label="序号" width="54" align="center" />
                <el-table-column prop="CreateOn" label="询价时间" width="166">
                  <template #default="scope">{{ scope.row.ConsultTime }}</template>
                </el-table-column>
                <el-table-column prop="CompName" label="所属事业部" width="120">
                  <template #default="scope">{{ scope.row.CompName }}</template>
                </el-table-column>
                <el-table-column prop="DepartName" label="业务员" width="100">
                  <template #default="scope">{{ scope.row.SalerName }}</template>
                </el-table-column>
                <el-table-column prop="Name" label="客户名称" min-width="166" show-overflow-tooltip>
                  <template #default="scope">
                    <!-- 必 -->
                    <div class="customerName inline-block bg-red-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '必跟'">
                      <span class="text-xs text-white">必</span>
                    </div>
                    <!-- 重 -->
                    <div class="customerName inline-block bg-blue-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '重要'">
                      <span class="text-xs text-white">重</span>
                    </div>
                    <!-- 普 -->
                    <div class="customerName inline-block bg-green-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '普通'">
                      <span class="text-xs text-white">普</span>
                    </div>
                    <div class="inline-block">
                      {{ scope.row.ClientName }}
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="InviteName" label="询价等级" width="100" align="center">
                  <template #default="scope">
                    <!-- A -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                    <!-- B -->
                    <el-tag class="" v-else-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                    <!-- C -->
                    <el-tag class="" v-else-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="核算员" width="100" align="center">
                  <template #default="scope">{{ scope.row.AccounterName || '-' }}</template>
                </el-table-column>

                <el-table-column prop="PostName" label="询价状态" width="100">
                  <template #default="scope">
                    <span class=" cursor-pointer" :class="scope.row.IsConfirmSupplier ? 'text-green-400' : 'text-yellow-400' " @click="openWindowApprovalStatus({EnquiryDataId: scope.row.Id, IsConfirmSupplier: scope.row.IsConfirmSupplier})">厂家确认</span>
                  </template>
                </el-table-column>
                <el-table-column prop="PostName" label="加价管理" width="100">
                  <template #default="scope">
                    <span class="text-yellow-400 cursor-pointer" @click="openWindowHechnicalMarkup()">销售加价</span>
                  </template>
                </el-table-column>
                <el-table-column prop="PostName" label="订单分析" width="100">
                  <template #default="scope"
                    ><i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="inline-block text-blue-600 cursor-pointer" @click="openWindowOrderAnalysis(scope.row)">查看</div></template
                  >
                </el-table-column>
                <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                  <template #default="scope"
                    ><i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div></template
                  >
                </el-table-column>
              </el-table>
            </div>
          </table-search>
        </div>
      </div>
    </div>
    <!-- 订单分析 -->
    <OrderAnalysisCost :title="orderAnalysisOpenData.formData.ClientName + '的订单分析'" v-if="orderAnalysisOpenData.visible" :FormData="orderAnalysisOpenData.formData" @closeWindow="closeWindowOrderAnalysis($event)" />
    <!-- 沟通记录 -->
    <RejectOrder :title="rejectOrderOpenData.formData.ClientName" v-if="rejectOrderOpenData.visible" :FormData="rejectOrderOpenData.formData" @closeWindow="closeWindowRejectOrder($event)" />
    <!-- 审批状态 -->
    <ManufacturerConfirmation title="核算单质量确认" v-if="approvalStatusOpenData.visible" :FormData="approvalStatusOpenData.formData" @closeWindow="closeWindowApprovalStatus($event)" />
    <!-- 销售加价 -->
    <PriceIncreaseManagement title="加价管理" v-if="hechnicalMarkupOpenData.visible" :FormData="hechnicalMarkupOpenData.formData" @closeWindow="closeWindowHechnicalMarkup($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import filterDatetime from '../Inquiry/_Components/filterDatetime.vue'
import OrderCostManagementTop from './_Components/OrderCostManagementTop.vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { GetEnquiryOrderCostPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import OrderAnalysisCost from './_Components/OrderAnalysisCost.vue'
import RejectOrder from './_Components/RejectOrder_s.vue'
import ManufacturerConfirmation from './_Components/ManufacturerConfirmation.vue'
import PriceIncreaseManagement from './_Components/PriceIncreaseManagement.vue'
import { orderAnalysisOpen, rejectOrderOpen, approvalStatusOpen } from '/@/assets/ts/techOpenWindow'
import { GetTypeDepartList } from '/@/api/system/dept'
import { ElMessage } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import '/@/assets/css/tech.css'

const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  // 报价等级
  store.getDict('tech_order_grade').then((res: any) => {
    data.techOrderGradesOptions = res
  })
}

export default defineComponent({
  components: {
    filterDatetime,
    OrderCostManagementTop,
    TableSearch,
    OrderAnalysisCost,
    RejectOrder,
    ManufacturerConfirmation,
    PriceIncreaseManagement
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
    const form = <any>reactive({
      page: 1,
      size: 10,
      totals: 0,
      // 搜索
      State: null,
      CustomerName: '',
      RefusalState: 0,
      StartDate: '',
      EndDate: '',
      GradeCode: '',
      CompId: null,
      SalerName: '',
      IsCloseTrack: 0,
      date: [],
    })

    // 全部待审核已审核切换
    const allWait = () => {
      form.page = 1
      renderTableList(form, data)
    }
    const data = reactive({
      //事业部信息
      CompList: [],
      tableData: [],
      input2: '',
      // 报价状态
      techOrderGradesOptions: [],
      show_1: 'all',
      selectIndex: 0,
      //   时间筛选数据
      timeList: [
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '年', type: 'year' }
      ]
    })
    // 列表数据请求
    const renderTableList = async (form: any, data: any) => {
      if (form.date && form.date.length > 1) {
        form.StartDate = form.date[0]
        form.EndDate = form.date[1]
      } else {
        form.StartDate = ''
        form.EndDate = ''
      }
      await GetEnquiryOrderCostPage(form).then((res) => {
        // console.log(res.data)
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
    //获取事业部列表
    const getCompList = (data: any) => {
      // 获取事业部列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.CompList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    const transmitTimeEvent = () => {}

    // 销售加价管理
    const hechnicalMarkupOpen = (data: any) => {
      let hechnicalMarkupOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHechnicalMarkup = (val: any) => {
        hechnicalMarkupOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        hechnicalMarkupOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHechnicalMarkup = (type: string) => {
        hechnicalMarkupOpenData.visible = false
        if(type=='submit')
        data.getData(data.data)
      }

      return {
        hechnicalMarkupOpenData,
        openWindowHechnicalMarkup,
        closeWindowHechnicalMarkup
      }
    }
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
      getCompList(data)
    })
    return {
      data,
      allWait,
      Search,
      RefreshLeft,
      form,
      ...tableRender(form, data),
      shortcuts,
      transmitTimeEvent,
      ...orderAnalysisOpen({ data, getData }),
      ...rejectOrderOpen({ data, getData }),
      ...approvalStatusOpen({ data, getData }),
      ...hechnicalMarkupOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_technicalanalys {
  .bf-table-content {
    margin-top: 0;
  }
}
</style>
