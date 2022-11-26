<template>
  <div class="tech_inquiry_big">
    <!-- 工资合计 分配  预警 -->
    <TotalWages ref="TotalWagesRef"></TotalWages>
    <el-row :gutter="20" class="mt-4">
      <el-col :span="18">
        <div class="grid-content ep-bg-purple">
          <!-- 咨询列表 -->
          <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
            <div class="float-left pt-1 pb-1">
              <span class="ml-4 text-sm">询价列表</span>
            </div>
            <div class="float-right">
              <el-radio-group v-model="form.State" @change="allWait()" size="small">
                <el-radio-button :label="0">待处理</el-radio-button>
                <el-radio-button :label="1">已处理</el-radio-button>
              </el-radio-group>
            </div>
          </div>
          <div class="h-full mb-12 bg-white rounded-b-md">
            <div class="bf-center-content">
              <!-- 搜索框 -->
              <div class="clearfix">
                <div class="float-left">
                  <div class="float-left mr-1">
                    <el-input v-model="form.CustomerName" placeholder="请输入客户名称" class="align-middle" />
                  </div>
                  <div class="float-right pt-1 ml-2">
                    <el-button type="primary" @click="search()"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
                  </div>
                </div>
                <div class="float-right mt-1" v-if="form.State == 0">
                  <el-button type="info" @click="techprintorder(data.selectDetails.BomId)" :disabled="data.single"><i class="iconfont icon-zitiyulan mr-2"></i>预览</el-button>
                  <el-button type="primary" :disabled="data.single" @click="openWindowDelayed(data.selectDetails)"><i class="iconfont icon-shijian mr-2"></i>延时</el-button>
                  <el-button type="danger" :disabled="data.single" @click="openWindowSuspend(data.selectDetails)"><i class="iconfont icon-zanting mr-2"></i>暂停</el-button>
                  <!-- @click="suspend(1, data.selectDetails.Id)" -->
                  <el-button type="warning" :disabled="data.single" v-action="['order_allocation']" @click="openWindowReceiveRfq(data.selectDetails)"><i class="iconfont icon-beizhu mr-2"></i>接收</el-button>
                  <el-button type="success" :disabled="data.single" v-action="['order_allocation']" @click="openWindowAssignOrder(data.selectDetails.Id)"><i class="iconfont icon-dingdan4 mr-2"></i>分配订单</el-button>
                </div>
                <div class="float-right mt-1" v-if="form.State == 1">
                  <el-button type="info" @click="techprintorder(data.selectDetails.BomId)" :disabled="data.single"><i class="iconfont icon-zitiyulan mr-2"></i>预览</el-button>
                  <el-button type="primary" :disabled="data.single" @click="compile()"> <i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
                </div>
              </div>
              <!-- 表格 -->
              <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                <div class="bf-table-content">
                  <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange" ref="multipleTableRef" @select="selectRow">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column type="index" label="序号" width="54" align="center" />
                    <el-table-column prop="CreateOn" label="询价时间" width="166">
                      <template #default="scope">{{ scope.row.ConsultTime }}</template>
                    </el-table-column>
                    <el-table-column prop="Name" label="客户名称" min-width="200" show-overflow-tooltip>
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
                    <el-table-column prop="Age" label="预警" width="60" v-if="form.State == 0">
                      <template #default="scope">
                        <!-- 正常 -->
                        <div v-if="scope.row.TechnicistWarning == 0">正常</div>
                        <!-- 预警 -->
                        <div class="text-red-500" v-if="scope.row.TechnicistWarning == 1 || scope.row.TechnicistWarning == 2">预警</div>
                        <!-- 超时 -->
                        <!-- <div class="text-red-500" v-if="scope.row.TechnicistWarning == 2">超时</div> -->
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="技术员" min-width="70" align="center">
                      <template #default="scope">{{ scope.row.TechnicistName || '-' }}</template>
                    </el-table-column>
                    <el-table-column prop="DepartName" label="业务员" min-width="70" align="center">
                      <template #default="scope">{{ scope.row.SalerName || '-' }}</template>
                    </el-table-column>
                    <el-table-column prop="PostName" label="询价状态" width="80" align="center">
                      <template #default="scope">
                        <span>{{ getOrderStatus(scope.row.EnquiryCode) || '-' }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                      <template #default="scope">
                        <div class="text-blue-600 cursor-pointer"><i class="iconfont icon-zitiyulan"></i> 查看</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="技术报告" align="center" width="80" v-if="form.State == 1">
                      <template #default="scope">
                        <div class="text-blue-600 cursor-pointer" @click="openWindowTechnicalReport()"><i class="iconfont icon-zitiyulan"></i> 查看</div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </table-search>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-show="!getSetting.showLayoutRight">
        <!-- 右侧 -->
        <div class="right grid-content ep-bg-purple mb-0 ml-px">
          <div class="rounded-xl bg-white h-28">
            <div>
              <h6 class="text-sm text-gray-400 leading-4 p-3 inline-block">单位：条</h6>
            </div>
            <div class="flex m-3 text-center mt-0">
              <div class="w-2/6">
                <div style="position: relative">
                  <span class="text-3xl font-semibold">{{ data.Company.OrderTotal }}</span>
                  <div class="inline-block absolute w-8 -top-1 right-2">
                    <div>
                      <span v-if="data.Company.OrderTotals > 0" class="text-xs text-red-500">{{ data.Company.OrderTotals }}%</span>
                      <span v-else class="text-xs text-green-500">{{ data.Company.OrderTotals }}%</span>
                    </div>
                    <div class="">
                      <i v-if="data.Company.OrderTotals > 0" class="iconfont icon-shangsheng text-red-500"></i>
                      <i v-else class="iconfont icon-xiajiang text-green-500"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm">询价单总计</span>
                </div>
              </div>
              <div class="w-2/6">
                <div style="position: relative">
                  <span class="text-3xl font-semibold">{{ data.Company.OrderExceedTotal }}</span>
                  <div class="inline-block absolute w-8 -top-1 right-2">
                    <div>
                      <span v-if="data.Company.OrderExceedTotals > 0" class="text-xs text-red-500">{{ data.Company.OrderExceedTotals }}%</span>
                      <span v-else class="text-xs text-green-500">{{ data.Company.OrderExceedTotals }}%</span>
                    </div>
                    <div class="">
                      <i v-if="data.Company.OrderExceedTotals > 0" class="iconfont icon-shangsheng text-red-500"></i>
                      <i v-else class="iconfont icon-xiajiang text-green-500"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm">超时待办同比</span>
                </div>
              </div>
              <div class="w-2/6">
                <div style="position: relative">
                  <span class="text-3xl font-semibold">{{ data.Company.OrderNormalTotal }}</span>
                  <div class="inline-block absolute w-8 -top-1 right-2">
                    <div>
                      <span v-if="data.Company.OrderNormalTotals > 0" class="text-xs text-red-500">{{ data.Company.OrderNormalTotals }}%</span>
                      <span v-else class="text-xs text-green-500">{{ data.Company.OrderNormalTotals }}%</span>
                    </div>
                    <div class="">
                      <i v-if="data.Company.OrderNormalTotals > 0" class="iconfont icon-shangsheng text-red-500"></i>
                      <i v-else class="iconfont icon-xiajiang text-green-500"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm">正常待办同比</span>
                </div>
              </div>
            </div>
          </div>
          <div class="personal rounded-2xl mt-3 bg-white">
            <div class="text-xs h-12 bg-blue-100 pb-3 pt-3 clearfix relative">
              <div class="inline-block">
                <span class="ml-2 text-xs">个人预警平台</span>
              </div>
              <div class="text-gray-400 float-right pr-3.5 text-xs">
                <span>共{{ getArrNum(data.ExceedInquirySheetList) + getArrNum(data.WarningInquirySheetList) }}条</span>
              </div>
              <div class="absolute top-2 left-20 ml-2">
                <el-radio-group v-model="data.show" size="small">
                  <el-radio-button :label="'overtime'">
                    <span class="">超时待办（{{ getArrNum(data.ExceedInquirySheetList) }}）</span>
                  </el-radio-button>
                  <el-radio-button :label="'soon'">
                    <span class="">即将超时（{{ getArrNum(data.WarningInquirySheetList) }}）</span>
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <!-- 超时待办 -->
            <div v-if="data.show == 'overtime'">
              <el-table :data="data.ExceedInquirySheetList" stripe class="w-full" :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <el-table-column type="index" label="序号" width="54" align="center" class="text-xs" />
                <el-table-column prop="date" label="客户名称" min-width="180">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.ClientName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="等级" width="60" align="center">
                  <template #default="scope">
                    <!-- A -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                    <!-- B -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                    <!-- C -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="超时" width="70" align="center">
                  <template #default="scope">
                    <span class="text-xs text-red-500">{{ scope.row.ExceedOutTime || 0 }}h</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 即将超时 -->
            <div v-if="data.show == 'soon'">
              <el-table :data="data.WarningInquirySheetList" stripe class="w-full" :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <el-table-column type="index" label="序号" width="54" align="center" class="text-xs" />
                <el-table-column prop="date" label="客户名称" min-width="180">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.ClientName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="等级" width="60" align="center">
                  <template #default="scope">
                    <!-- A -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                    <!-- B -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                    <!-- C -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="超时" width="70" align="center">
                  <template #default="scope">
                    <span class="text-xs text-red-500">{{ scope.row.ExceedOutTime || 0 }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 分配订单 -->
    <AssignOrder title="技术部" v-if="assignOrderOpenData.visible" :FormData="assignOrderOpenData.formData" @closeWindow="closeWindowAssignOrder($event)" />
    <!-- 技术报告 -->
    <TechnicalReport title="技术报告" v-if="technicalReportOpenData.visible" :FormData="technicalReportOpenData.formData" @closeWindow="closeWindowTechnicalReport($event)" />
    <!-- 延时 -->
    <Delayed title="预警延时" v-if="delayedOpenData.visible" :FormData="delayedOpenData.formData" @closeWindow="closeWindowDelayed($event)" />
    <!-- 暂停 -->
    <Suspend title="预警暂停" v-if="suspendOpenData.visible" :FormData="suspendOpenData.formData" @closeWindow="closeWindowSuspend($event)" />
    <!-- 接收 -->
    <ReceiveRfq title="接收询价单" v-if="receiveRfqOpenData.visible" :FormData="receiveRfqOpenData.formData" @closeWindow="closeWindowReceiveRfq($event)" />
    <!-- 预览报价单 -->
    <techprintindex v-if="techprintdata.view" :DataId='techprintdata.dataid' @closeWindow='canceltechprint'></techprintindex>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import AssignOrder from '../OrderAllocationManagement/_Components/AssignOrder.vue'
import TotalWages from './_Components/TotalWages.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetEnquiryOrderTechnicistTreatmPage, GetEntityById, GetMyOrderTechnicistWarningData } from '/@/api/tech/EnquiryData'
import { ElTable } from 'element-plus'
import filterDatetime from './_Components/filterDatetime.vue'
import { parseTime } from '/@/utils/tools'
import { useCommonStore } from '/@/store/modules/Common'
import TechnicalReport from './_Components/TechnicalReport.vue'
import Delayed from './_Components/delayed.vue'
import Suspend from './_Components/suspend.vue'
import { useLayoutStore } from '/@/store/modules/layout'
import ReceiveRfq from './_Components/ReceiveRfq.vue'
import techprintindex from '/@/views/Sale/Print/printindex.vue'
// import {techprintindex} from '/@/assets/ts/TechUseSale'

const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  //订单状态
  store.getDict('tech_order_status').then((res: any) => {
    data.techOrderStatusOptions = res
  })
}

// 获取即将超时   获取超时
const getMyOrderTechnicistWarningData = async (form: any, data: any) => {
  await GetMyOrderTechnicistWarningData(form.UserId)
    .then((res) => {
      if (res.code == 1) {
        var _obj = res.data || {}
        data.WarningInquirySheetList = _obj.WarningInquirySheetList
        data.ExceedInquirySheetList = _obj.ExceedInquirySheetList
        data.Company = _obj
        data.Company.OrderNormalTotals = _obj.OrderNormalTotal - _obj.OldOrderNormalTotal
        data.Company.OrderExceedTotals = _obj.OrderExceedTotal - _obj.OldOrderExceedTotal
        data.Company.OrderTotals = _obj.OrderTotal - _obj.OldOrderTotal
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetMyOrderTechnicistWarningData${e}`)
    })
}

// 获取单个预览
const GetEntityByIds = async (entityById: any) => {
  await GetEntityById(entityById)
    .then((res) => {
      if (res.code === 1) {
        ElMessage.success(res.message)
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetEntityById${e}`)
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
  await GetEnquiryOrderTechnicistTreatmPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
  getMyOrderTechnicistWarningData(form, data)
}

// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
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
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent,
    selectRow
  }
}
// 筛选
const techprintWindow = (data: any) => {
  const techprintdata: any = reactive({
    view: false,
    dataid: 0
  })

  const techprintorder = (val: number) => {
    techprintdata.dataid = val
    techprintdata.view = true
  }

  const canceltechprint = () => {
    techprintdata.view = false
  }

  return {
    techprintdata,
    techprintorder,
    canceltechprint
  }
}

export default defineComponent({
  components: {
    filterDatetime,
    AssignOrder,
    TableSearch,
    TotalWages,
    TechnicalReport,
    Delayed,
    Suspend,
    ReceiveRfq,
    techprintindex
  },
  setup() {
    const multipleTableRef: any = ref(null)
    const TotalWagesRef = ref()
    const { currentRoute } = useRouter()
    const { getUserInfo } = useLayoutStore()
    const { getSetting } = useLayoutStore()

    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      // 搜索
      CustomerName: '',
      State: 0, //未处理
      UserId: null
    })
    const background = ref(true)
    const data = reactive({
      //订单状态选项
      techOrderStatusOptions: [],
      // 预览
      single: true,
      // 实现单个单体预览、延期id
      entityById: 0,
      // 左侧表格数据
      tableData: [],
      // 右侧表格数据
      WarningInquirySheetList: [],
      ExceedInquirySheetList: [],
      show: 'overtime',
      Company: {
        OrderNormalTotals: '',
        OrderTotals: '',
        OrderExceedTotals: ''
      }
    })
    // 预览按钮
    const preview = (type: number, entityById: number) => {
      data.entityById = entityById
      GetEntityByIds(entityById)
      console.log('预览')
    }
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      form.page = 1
      renderTableList(form, data)
    }

    // 分配订单
    const assignOrderOpen = (data: any) => {
      let assignOrderOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowAssignOrder = (row: any) => {
        assignOrderOpenData.formData = {
          Id: row
        }
        console.log(row)
        assignOrderOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowAssignOrder = (type: string) => {
        assignOrderOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        assignOrderOpenData,
        openWindowAssignOrder,
        closeWindowAssignOrder
      }
    }
    // 技术报告
    const technicalReportOpen = (data: any) => {
      let technicalReportOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowTechnicalReport = (row: any) => {
        technicalReportOpenData.formData = {}
        technicalReportOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowTechnicalReport = (type: string) => {
        technicalReportOpenData.visible = false
      }

      return {
        technicalReportOpenData,
        openWindowTechnicalReport,
        closeWindowTechnicalReport
      }
    }
    // 延时
    const delayedOpen = (data: any) => {
      let delayedOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowDelayed = (row: any) => {
        delayedOpenData.formData = {
          entityById: row.Id,
          GradeCode: row.GradeCode
        }
        console.log(row.Id, row.GradeCode)
        delayedOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowDelayed = (type: string) => {
        delayedOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        delayedOpenData,
        openWindowDelayed,
        closeWindowDelayed
      }
    }
    // 预警暂停
    const suspendOpen = (data: any) => {
      let suspendOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowSuspend = (row: any) => {
        suspendOpenData.formData = {
          entityById: row.Id
        }
        suspendOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowSuspend = (type: string) => {
        suspendOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        suspendOpenData,
        openWindowSuspend,
        closeWindowSuspend
      }
    }

    // 接收
    const ReceiveRfqOpen = (data: any) => {
      let receiveRfqOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowReceiveRfq = (row: any) => {
        receiveRfqOpenData.formData = {
          dataList: row
        }
        receiveRfqOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowReceiveRfq = (type: string) => {
        receiveRfqOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        receiveRfqOpenData,
        openWindowReceiveRfq,
        closeWindowReceiveRfq
      }
    }

    // 获取订单状态
    const getOrderStatus = (val: number) => {
      let str = '-'
      if (val != undefined) {
        let _obj = data.techOrderStatusOptions.find((x: any) => x.DicKey == val.toFixed(0))
        if (_obj) str = _obj.DicValue
      }
      return str
    }

    //获取数组长度
    const getArrNum = (val: any): number => {
      return (val || []).length
    }

    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
      console.log(getUserInfo.Id)
      //判断是否存在该指令“order_allocation”
      if (currentRoute.value.meta.permission.find((x: any) => x == 'order_allocation')) {
        form.UserId = undefined
      } else {
        form.UserId = getUserInfo.Id || 0
      }
      renderTableList(form, data)
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }

    // 编辑
    const compile = () => {
      ElMessageBox.confirm('确定将此订单退回到技术处理状态？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }

    return {
      ElTable,
      data,
      background,
      allWait,
      form,
      ...tableRender(form, data, multipleTableRef),
      getOrderStatus,
      ...assignOrderOpen({ data, getData }),
      ...technicalReportOpen({ data }),
      ...delayedOpen({ data, getData }),
      ...suspendOpen({ data, getData }),
      ...ReceiveRfqOpen({ data, getData }),
      getArrNum,
      TotalWagesRef,
      preview,
      getSetting,
      compile,
      ...techprintWindow({data}),
      multipleTableRef
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_inquiry_big {
  :deep(.el-input__wrapper) {
    margin-top: 4px !important;
  }
}
</style>
