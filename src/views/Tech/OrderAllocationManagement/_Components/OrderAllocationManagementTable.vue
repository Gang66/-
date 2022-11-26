<template>
  <div class="Tech_OrderAllocationManagementTable">
    <el-tabs type="border-card" class="OrderAllocationManagementTable-tabs" @tab-click="tabCLick">
      <el-tab-pane label="公共询价单">
        <div class="absolute right-4 -top-9">
          <el-radio-group v-model="form.State" @change="allWait()" size="small">
            <el-radio-button :label="0">待处理</el-radio-button>
            <el-radio-button :label="1">已处理</el-radio-button>
          </el-radio-group>
        </div>
        <div class="ConsultationList-dow-query inline-block">
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
          <div class="inline-block absolute top-4 right-4" @click="openWindowQuotationExport">
            <el-button class=""> <i class="iconfont icon-daochu mr-2"></i><span>报价单导出</span></el-button>
          </div>
        </div>
        <!-- 表格 -->
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="询价时间" width="166">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="CompName" label="所属事业部" width="100" align="center">
                <template #default="scope">{{ scope.row.CompName }}</template>
              </el-table-column>
              <el-table-column prop="SalerName" label="业务员" width="80" align="center">
                <template #default="scope">{{ scope.row.SalerName }}</template>
              </el-table-column>
              <el-table-column prop="ClientName" label="客户名称" min-width="200" show-overflow-tooltip>
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
              <el-table-column prop="InviteName" label="询价等级" width="80" align="center">
                <template #default="scope">
                  <!-- A -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                  <!-- B -->
                  <el-tag class="" v-else-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                  <!-- C -->
                  <el-tag class="" v-else-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="技术员" width="80" align="center">
                <template #default="scope">{{ scope.row.TechnicistName || '-' }}</template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="分配状态" align="center" width="80">
                <template #default="scope">
                  <span class="text-green-500" v-if="scope.row.TechnicistId > 0">已分配</span>
                  <span class="text-orange-500" v-else>待分配</span>
                </template>
              </el-table-column>
              <el-table-column prop="PostName" label="询价状态" width="100" align="center">
                <template #default="scope">
                  <span>{{ getOrderStatus(scope.row.EnquiryCode) }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="PostName" label="订单分析" width="100">
                <template #default="scope">
                  <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                  <div class="inline-block text-blue-600 cursor-pointer" @click="openWindowOrderAnalysis(scope.row)">查看</div>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                <template #default="scope">
                  <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                  <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </el-tab-pane>
      <el-tab-pane label="询价单回收站">
        <div class="ConsultationList-dow-query inline-block">
          <el-input v-model="form.CustomerName" size="default" placeholder="请输入客户名称" style="width: 200px" class="mr-4" />
          <el-button type="primary" class="ml-4" :icon="Search" @click="search">查询</el-button>
          <div class="inline-block absolute top-4 right-4">
            <el-button type="danger" :disabled="data.single" @click="handleOrderRecoverySave"><i class="iconfont icon-huifu mr-2"></i><span>恢复</span></el-button>
          </div>
        </div>
        <!-- 表格 -->
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="询价时间" min-width="166">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="CompName" label="所属事业部" width="100" align="center">
                <template #default="scope">{{ scope.row.CompName }}</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="80" align="center">
                <template #default="scope">{{ scope.row.SalerName }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="200" show-overflow-tooltip>
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
                  <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                  <!-- C -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="拒接时间" min-width="166" align="center">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="拒绝原因" align="center" width="100">
                <template #default="scope">
                  <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                  <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowReasonForRejection(scope.row)">查看</div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </el-tab-pane>
    </el-tabs>

    <!-- 报价单导出 -->
    <QuotationExport :title="'报价单导出'" v-if="quotationExportOpenData.visible" :FormData="quotationExportOpenData.formData" @closeWindow="closeWindowQuotationExport($event)" />
    <!-- 订单分析 -->
    <OrderAnalysis :title="orderAnalysisOpenData.formData.ClientName + '的订单分析'" v-if="orderAnalysisOpenData.visible" :FormData="orderAnalysisOpenData.formData" @closeWindow="closeWindowOrderAnalysis($event)" />
    <!-- 沟通记录 -->
    <RejectOrder :title="rejectOrderOpenData.formData.ClientName" v-if="rejectOrderOpenData.visible" :FormData="rejectOrderOpenData.formData" @closeWindow="closeWindowRejectOrder($event)" />
    <!-- 拒绝原因 -->
    <ReasonForRejection :title="reasonForRejectionOpenData.formData.ClientName + '拒绝原因'" v-if="reasonForRejectionOpenData.visible" :FormData="reasonForRejectionOpenData.formData" @closeWindow="closeWindowReasonForRejection($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import { GetEnquiryOrderPage, GetSetEnquiryOrderRecoverySave } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { parseTime } from '/@/utils/tools'
import { Search } from '@element-plus/icons-vue'
import QuotationExport from './QuotationExport.vue'
import OrderAnalysis from './OrderAnalysis.vue'
import { useCommonStore } from '/@/store/modules/Common'
import RejectOrder from './RejectOrder_s.vue'
import ReasonForRejection from './ReasonForRejection.vue'
import ManufacturerConfirmation from './ManufacturerConfirmation.vue'
import { orderAnalysisOpen, rejectOrderOpen } from '/@/assets/ts/techOpenWindow'
import '/@/assets/css/tech.css'

const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  //订单状态
  store.getDict('tech_order_status').then((res: any) => {
    data.techOrderStatusOptions = res
  })

  // 报价等级
  store.getDict('tech_order_grade').then((res: any) => {
    data.techOrderGradesOptions = res
  })
}

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  if (form.date && form.date.length > 1) {
    form.StartDate = form.date[0]
    form.EndDate = form.date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }
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
    console.log(data.selectDetails[0].Id)
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

//拒绝原因
const reasonForRejectionOpen = (data: any) => {
  let reasonForRejectionOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowReasonForRejection = (row: any) => {
    reasonForRejectionOpenData.formData = {
      Id: row.Id, //询价单Id
      BomId: 0, //报价单Id
      ClientName: row.ClientName,
      RejectionImNewsList: row.RejectionImNewsList
    }
    reasonForRejectionOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowReasonForRejection = (type: string) => {
    reasonForRejectionOpenData.visible = false
    if (type == 'submit') data.getData(data.data)
  }

  return {
    reasonForRejectionOpenData,
    openWindowReasonForRejection,
    closeWindowReasonForRejection
  }
}

// 报价单导出
const quotationExportOpen = (data: any) => {
  let quotationExportOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowQuotationExport = () => {
    quotationExportOpenData.formData = {}
    quotationExportOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowQuotationExport = (type: string) => {
    quotationExportOpenData.visible = false
    if (type == 'submit') data.getData(data.data)
  }

  return {
    quotationExportOpenData,
    openWindowQuotationExport,
    closeWindowQuotationExport
  }
}

//恢复作废的询价单
const setEnquiryOrderRecoverySave = async (data: any) => {
  await GetSetEnquiryOrderRecoverySave(data.id).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)

      data.getData()
    } else {
      ElMessage.error(res.message)
    }
  })
}

export default defineComponent({
  components: {
    TableSearch,
    QuotationExport,
    OrderAnalysis,
    RejectOrder,
    ReasonForRejection,
    ManufacturerConfirmation
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
      totals: 0,
      RefusalState: 0, //公共询价单
      State: 0, //未处理
      CustomerName: '',
      GradeCode: '',
      CompId: null,
      SalerName: '',
      date: []
    })
    const data = reactive({
      // 报价状态
      techOrderGradesOptions: [],
      //事业部信息
      CompList: [],
      //订单状态选项
      techOrderStatusOptions: [],
      // 表格数据
      tableData: [],
      selectDetails: [],
      single: true
    })

    // 全部待处理已处理切换
    const allWait = () => {
      form.page = 1
      renderTableList(form, data)
    }
    // tab切换
    const tabCLick = (tab: any, event: any) => {
      form.page = 1
      form.RefusalState = tab.index
      renderTableList(form, data)
    }

    // 获取订单状态
    const getOrderStatus = (val: number) => {
      let _obj = data.techOrderStatusOptions.find((x: any) => x.DicKey == val.toFixed(0))
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }

    // 恢复作废后的询价单
    const handleOrderRecoverySave = () => {
      if ((data.selectDetails || []).length != 1) {
        ElMessage.error('请选择一行数据')
        return false
      }
      let row: any = data.selectDetails[0] || {}

      ElMessageBox.confirm('确定要恢复该询价单吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setEnquiryOrderRecoverySave({ id: row.Id, getData })
        })
        .catch(() => {})
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
      Search,
      ...tableRender(form, data),
      form,
      shortcuts,
      allWait,
      tabCLick,
      getOrderStatus,
      ...orderAnalysisOpen({ data, getData }),
      ...rejectOrderOpen({ data, getData }),
      ...reasonForRejectionOpen({ data }),
      ...quotationExportOpen({ data }),
      handleOrderRecoverySave
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
