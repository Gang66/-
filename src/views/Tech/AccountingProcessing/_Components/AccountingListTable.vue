<template>
  <div class="tech_AccountingProcessing_AccountingListTable">
    <el-tabs type="border-card" @tab-click="tabCLick" class="OrderAllocationManagementTable-tabs">
      <el-tab-pane label="我的报价单">
        <div class="absolute right-4 -top-9">
          <el-radio-group v-model="form.State" @change="allWait()" size="small">
            <el-radio-button :label="0">待处理</el-radio-button>
            <el-radio-button :label="1">已处理</el-radio-button>
          </el-radio-group>
        </div>
        <div class="">
          <div class="bf-center-content">
            <!-- 搜索框 -->
            <div class="clearfix pl-4 pr-4">
              <div class="float-left">
                <div class="float-left mr-1">
                  <el-input v-model="form.CustomerName" size="large" placeholder="请输入客户名称" />
                </div>
                <div class="float-right pt-1 ml-2">
                  <el-button type="primary" @click="search()"><i class="iconfont icon-huntfor mr-2"></i>查询</el-button>
                </div>
              </div>
              <div class="float-right">
                <el-button type="info" :disabled="data.single" @click="preview(1, data.selectDetails[0].Id)"><i class="iconfont icon-zitiyulan mr-2"></i>预览</el-button>
                <el-button type="primary" :disabled="data.single" @click="openWindowDelayed(data.selectDetails[0])"><i class="iconfont icon-shijian mr-2"></i>延时</el-button>
                <el-button type="danger" :disabled="data.single" @click="openWindowSuspend(data.selectDetails[0])"><i class="iconfont icon-zanting mr-2"></i>暂停</el-button>
                <!-- :disabled="data.single" -->
                <el-button type="warning" :disabled="data.single" @click="underlying()"><i class="iconfont icon-jieshou mr-2"></i> 优先</el-button>
                <el-button type="success" :disabled="data.single" v-action="['order_allocation']" @click="openWindowAssignOrder(data.selectDetails[0].Id)">分配订单</el-button>
              </div>
            </div>
            <!-- 表格 -->
            <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
              <div class="bf-table-content">
                <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                  <el-table-column type="selection" width="50" align="center" />
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="CreateOn" label="询价时间" width="166">
                    <template #default="scope">{{ scope.row.ConsultTime }}</template>
                  </el-table-column>
                  <el-table-column prop="DepartName" label="所属事业部" align="center" width="100">
                    <template #default="scope">{{ scope.row.CompName }}</template>
                  </el-table-column>
                  <el-table-column prop="DepartName" label="业务员" width="80" align="center">
                    <template #default="scope">{{ scope.row.SalerName }}</template>
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
                  <el-table-column prop="Age" label="预警" v-if="form.State == 0" align="center" min-width="60">
                    <template #default="scope">
                      <!-- 正常 -->
                      <div v-if="scope.row.TechnicistWarning == 0">正常</div>
                      <!-- 预警 -->
                      <div class="text-red-500" v-if="scope.row.TechnicistWarning == 1 || scope.row.TechnicistWarning == 2"><img src="../../../../assets/img/tech/inquiry/warninggif.gif" class="inline-block h-5 align-top" alt="" /> 预警</div>
                      <!-- 超时 -->
                      <!-- <div class="text-red-500" v-if="scope.row.TechnicistWarning == 2">超时</div> -->
                    </template>
                  </el-table-column>

                  <el-table-column prop="PostName" label="报价状态" width="110">
                    <template #default="scope">{{ getOrderStatus(scope.row.EnquiryCode) }}</template>
                  </el-table-column>
                  <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                    <template #default="scope"><div class="text-blue-600 cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div></template>
                  </el-table-column>
                  <el-table-column prop="RecruitChannel" label="核算报告" align="center" width="80" v-if="form.State == 1">
                    <template #default="scope"><div class="text-blue-600 cursor-pointer" @click="openWindowTechnicalReport(scope.row)">查看</div></template>
                  </el-table-column>
                </el-table>
              </div>
            </table-search>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="公共报价单">
        <div class="bf-center-content">
          <!-- 搜索框 -->
          <div class="clearfix pl-4 pr-4">
            <div class="float-left">
              <div class="float-left mr-1">
                <el-input v-model="form.title" size="large" placeholder="请输入客户名称" />
              </div>
              <div class="float-right pt-1 ml-2">
                <el-button type="primary" @click="search()"><i class="iconfont icon-huntfor mr-2"></i>查询</el-button>
              </div>
            </div>
            <div class="float-right">
              <el-button type="info" @click="preview(1, data.selectDetails.Id)" :disabled="data.single"><i class="iconfont icon-zitiyulan mr-2"></i>预览</el-button>
              <el-button type="warning" :disabled="data.single" @click="openWindowReceiveRfq(data.selectDetails)"><i class="iconfont icon-jieshou mr-2"></i>接收</el-button>
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
                <el-table-column prop="DepartName" label="所属事业部" align="center" width="100">
                  <template #default="scope">{{ scope.row.CompName || '-' }}</template>
                </el-table-column>
                <el-table-column prop="DepartName" label="业务员" width="80" align="center">
                  <template #default="scope">{{ scope.row.SalerName || '-' }}</template>
                </el-table-column>
                <el-table-column prop="Name" label="客户名称" min-width="200" show-overflow-tooltip	>
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
                <el-table-column prop="DepartName" label="技术员" width="70" align="center">
                  <template #default="scope">{{ scope.row.TechnicistName || '-' }}</template>
                </el-table-column>
                <el-table-column prop="DepartName" label="核算员" width="70" align="center">
                  <template #default="scope">{{ scope.row.AccounterName || '-' }}</template>
                </el-table-column>

                <el-table-column prop="PostName" label="报价状态" width="110">
                  <template #default="scope">{{ getOrderStatus(scope.row.EnquiryCode) }}</template>
                </el-table-column>
              </el-table>
            </div>
          </table-search>
        </div>
      </el-tab-pane>
    </el-tabs>

    <!-- 分配订单 -->
    <AssignOrder title="核算部" v-if="assignOrderOpenData.visible" :FormData="assignOrderOpenData.formData" @closeWindow="closeWindowAssignOrder($event)" />
    <!-- 沟通记录 -->
    <RejectOrder :title="rejectOrderOpenData.formData.ClientName" v-if="rejectOrderOpenData.visible" :FormData="rejectOrderOpenData.formData" @closeWindow="closeWindowRejectOrder($event)" />
    <!-- 核算报告 -->
    <TechnicalReport v-if="technicalReportOpenData.visible" :FormData="technicalReportOpenData.formData" @closeWindow="closeWindowTechnicalReport($event)" />
    <!-- 延时 -->
    <Delayed title="预警延时" v-if="delayedOpenData.visible" :FormData="delayedOpenData.formData" @closeWindow="closeWindowDelayed($event)" />
    <!-- 暂停 -->
    <Suspend title="预警暂停" v-if="suspendOpenData.visible" :FormData="suspendOpenData.formData" @closeWindow="closeWindowSuspend($event)" />
    <!-- 接收 -->
    <ReceiveRfq title="接收公共报价单" v-if="receiveRfqOpenData.visible" :FormData="receiveRfqOpenData.formData" @closeWindow="closeWindowReceiveRfq($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetEntityById } from '/@/api/tech/EnquiryData'
import { GetEnquiryOrderAccounterTreatmPage } from '/@/api/tech/EnquiryData'
import AssignOrder from './AssignOrder.vue'
import RejectOrder from '../../OrderAllocationManagement/_Components/RejectOrder_s.vue'
import { rejectOrderOpen } from '/@/assets/ts/techOpenWindow'
import TechnicalReport from '../../Inquiry/_Components/TechnicalReport.vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '/@/store/modules/layout'
import Delayed from './delayed.vue'
import Suspend from './suspend.vue'
import ReceiveRfq from './ReceiveRfq.vue'
import '/@/assets/css/tech.css'
import { ElMessage, ElMessageBox } from 'element-plus'

import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  //订单状态
  store.getDict('tech_order_status').then((res: any) => {
    data.techOrderStatusOptions = res
  })
}
// 获取单个预览
const GetEntityByIds = async (entityById: any) => {
  await GetEntityById(entityById).then((res) => {
    console.log(res)
  })
}

// 获取列表

const renderTableList = async (form: any, data: any) => {
  if (form.date && form.date.length > 1) {
    form.StartDate = form.date[0]
    form.EndDate = form.date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }
  await GetEnquiryOrderAccounterTreatmPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })

  // getOrderTechnicistTreatmStatistics(form, data)
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
    data.selectDetails = val
    console.log(data.selectDetails)
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

export default defineComponent({
  components: {
    TableSearch,
    AssignOrder,
    RejectOrder,
    TechnicalReport,
    Delayed,
    Suspend,
    ReceiveRfq
  },
  setup() {
    const multipleTableRef: any = ref(null)
    const { currentRoute } = useRouter()
    const { getUserInfo } = useLayoutStore()
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      // 搜索
      CustomerName: '',
      RefusalState: 0,
      State: 0, //未处理
      UserId: null
    })
    const data = reactive({
      //订单状态选项
      techOrderStatusOptions: [],
      // 预览
      single: true,
      // 实现单个单体预览id
      entityById: 0,
      // 左侧表格数据
      tableData: [],
      selectDetails: []
    })

    // tab切换
    const tabCLick = (tab: any, event: any) => {
      form.page = 1
      form.RefusalState = tab.index
      renderTableList(form, data)
    }
    // 预览按钮
    const preview = (type: number, entityById: number) => {
      data.entityById = entityById
      GetEntityByIds(entityById)
      console.log('预览', data.entityById)
    }
    // 全部待处理已处理切换
    const allWait = () => {
      form.page = 1
      renderTableList(form, data)
    }
    //获取数据
    const getData = () => {
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
    // 核算报告
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

    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
      //判断是否存在该指令“order_allocation”
      if (currentRoute.value.meta.permission.find((x: any) => x == 'order_allocation')) {
        form.UserId = undefined
      } else {
        form.UserId = getUserInfo.Id || 0
      }
      renderTableList(form, data)
    })
    // 获取订单状态
    const getOrderStatus = (val: number) => {
      let str = '-'
      if (val != undefined) {
        let _obj = data.techOrderStatusOptions.find((x: any) => x.DicKey == val.toFixed(0))
        if (_obj) str = _obj.DicValue
      }
      return str
    }

    // 优先
    const underlying = () => {
      ElMessageBox.confirm('确定将订单更新为优先订单？', '提示', {
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
      data,
      allWait,
      form,
      ...tableRender(form, data, multipleTableRef),
      preview,
      tabCLick,
      ...rejectOrderOpen({ data, getData }),
      ...assignOrderOpen({ data, getData }),
      ...technicalReportOpen({ data }),
      getOrderStatus,
      ...delayedOpen({ data, getData }),
      ...suspendOpen({ data, getData }),
      ...ReceiveRfqOpen({ data, getData }),
      multipleTableRef,
      underlying
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_AccountingProcessing_AccountingListTable {
  :deep(.OrderAllocationManagementTable-tabs) {
    .el-tabs__content {
      overflow: initial;
    }
  }
  :deep(.el-tabs--border-card > .el-tabs__content) {
    padding: 0;
  }
}
</style>
