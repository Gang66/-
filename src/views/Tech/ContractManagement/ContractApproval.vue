<template>
  <div class="Tec_ContractApproval">
    <!-- 合同审批管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">合同审批管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
          <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-input v-model="form.Salesman" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right mt-px">
          <el-button type="primary"> <i class="iconfont icon-chuangjian mr-2"></i> 新建合同</el-button>
          <el-button type="danger" @click="approval()"><i class="iconfont icon-dingdan9 mr-2"></i>提报审批</el-button>
          <el-button type="success" @click="openWindowChangeEffective()"><i class="iconfont icon-mxjl mr-2"></i>变更状态</el-button>
          <el-button type="warning" @click="openWindowStockApplication()"><i class="iconfont icon-dingdan4 mr-2"></i>备货申请</el-button>
          <el-button type="info" @click="contract()"><i class="iconfont icon-shanchu mr-2"></i>作废合同</el-button>
        </div>
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
              <el-table-column prop="PostName" label="所属事业部" width="120" align="center">
                <template #default="scope">潍坊事业部</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="100" align="center">
                <template #default="scope">{{ scope.row.SalerName }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" width="160" align="center">
                <template #default="scope">380400000.00</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="生效状态" width="120" align="center">
                <template #default="scope">
                  <span class="text-orange-400">领导审批</span>
                  <!-- <span class="text-red-400">待生效</span>
                  <span class="text-green-400">已生效</span>
                  <span class="text-green-400">合同生效</span>
                  <span class="text-red-400">等待盖章</span>
                  <span class="text-red-400">等待原件</span>
                  <span class="text-red-400">等待款项</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="审批状态" width="140" align="center">
                <template #default="scope">
                  <span class="text-yellow-400 cursor-pointer" @click="openWindowApprovalRecord()">总经理审批</span>
                  <!-- <span class="text-red-400 cursor-pointer" @click="openWindowApprovalRecord()">销售未通过</span>
                  <span class="text-green-400 cursor-pointer" @click="openWindowApprovalRecord()">备货通过</span>
                  <span class="text-green-400 cursor-pointer" @click="openWindowApprovalRecord()">已生效</span>
                  <span class="text-green-400 cursor-pointer" @click="openWindowApprovalRecord()">审批通过</span>
                  <span class="text-green-400 cursor-pointer" @click="openWindowApprovalRecord()">审批通过</span>
                  <span class="text-yellow-400 cursor-pointer" @click="openWindowApprovalRecord()">销售审批</span>
                  <span class="text-yellow-400 cursor-pointer" @click="openWindowApprovalRecord()">运营审批</span>
                  <span class="text-red-400 cursor-pointer" @click="openWindowApprovalRecord()"> 运营未通过</span> -->
                  <!-- <span class="text-gray-400 cursor-pointer" @click="openWindowApprovalRecord()">未提报</span> -->
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
              <el-table-column prop="PostName" label="操作" width="100" align="center">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="inline-block text-blue-600 cursor-pointer" @click="openWindowContractDetails()">查看</div>
                  </div>
                  <div>
                    <i class="iconfont icon-bianji1 inline-block mr-1 text-blue-600"></i>
                    <div class="inline-block text-blue-600 cursor-pointer" @click="openWindowEditSalesContract()">编辑</div>
                  </div>
                  <div>
                    <i class="iconfont icon-bianji1 inline-block mr-1 text-blue-600"></i>
                    <div class="inline-block text-blue-600 cursor-pointer" @click="openWindowApprovalContractDetails()">审批</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!--查看（合同详情） -->
    <ContractDetails title="合同详情" v-if="contractDetailsOpenData.visible" :FormData="contractDetailsOpenData.formData" @closeWindow="closeWindowContractDetails($event)" />
    <!--审批（合同详情） -->
    <ApprovalContractDetails title="合同详情" v-if="approvalContractDetailsOpenData.visible" :FormData="approvalContractDetailsOpenData.formData" @closeWindow="closeWindowApprovalContractDetails($event)" />
    <!-- 变更生效状态 -->
    <ChangeEffectiveStatus title="变更生效状态" v-if="changeEffectiveOpenData.visible" :FormData="changeEffectiveOpenData.formData" @closeWindow="closeWindowChangeEffective($event)" />
    <!-- 备货申请 -->
    <StockApplication title="备货申请" v-if="stockApplicationOpenData.visible" :FormData="stockApplicationOpenData.formData" @closeWindow="closeWindowStockApplication($event)" />
    <!-- 备货申请 -->
    <ApprovalRecord title="审批记录" v-if="ApprovalRecordOpenData.visible" :FormData="ApprovalRecordOpenData.formData" @closeWindow="closeWindowApprovalRecord($event)" />
    <!-- 销售合同 -->
    <EditSalesContract v-if="EditSalesContractOpenData.visible" :FormData="EditSalesContractOpenData.formData" @closeWindow="closeWindowEditSalesContract($event)"></EditSalesContract>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import ContractDetails from '../OrderAllocationManagement/_Components/ContractDetails.vue'
import ApprovalContractDetails from './_Components/ApprovalContractDetails.vue'
import ChangeEffectiveStatus from './_Components/ChangeEffectiveStatus.vue'
import StockApplication from './_Components/StockApplication.vue'
import ApprovalRecord from './_Components/ApprovalRecord.vue'
import '/@/assets/css/tech.css'
import EditSalesContract from './_Components/EditSalesContract.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  data.tableData = [1,2]
  // await GetEnquiryOrderPage(form).then((res) => {
  //   console.log(res.data)
  //   data.tableData = [1,2]
  //   // if (res.code == 1) {
  //   //   data.tableData = res.data.records
  //   //   form.totals = res.data.totals
  //   // }
  // })
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
    console.log('ces', form.title)
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
    TableSearch,
    ContractDetails,
    ChangeEffectiveStatus,
    StockApplication,
    ApprovalRecord,
    EditSalesContract,
    ApprovalContractDetails
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
      title: '',
      CompId: null,
      NameInput: '',
      Salesman: ''
    })
    const data = reactive({
      //事业部信息
      CompList: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    //获取事业部列表
    const getCompList = (data: any) => {
      // 获取事业部列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.CompList = res.data
          console.log(data.CompList)
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    // 查看 合同详情
    const contractDetailsOpen = (data: any) => {
      let contractDetailsOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowContractDetails = (val: any) => {
        contractDetailsOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        contractDetailsOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowContractDetails = (type: string) => {
        contractDetailsOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        contractDetailsOpenData,
        openWindowContractDetails,
        closeWindowContractDetails
      }
    }
    // 审批 合同详情
    const approvalContractDetailsOpen = (data: any) => {
      let approvalContractDetailsOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowApprovalContractDetails = (val: any) => {
        approvalContractDetailsOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        approvalContractDetailsOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowApprovalContractDetails = (type: string) => {
        approvalContractDetailsOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        approvalContractDetailsOpenData,
        openWindowApprovalContractDetails,
        closeWindowApprovalContractDetails
      }
    }

    // 变更生效状态
    const changeEffectiveOpen = (data: any) => {
      let changeEffectiveOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowChangeEffective = (row: any) => {
        changeEffectiveOpenData.formData = {}
        changeEffectiveOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowChangeEffective = (type: string) => {
        changeEffectiveOpenData.visible = false
      }

      return {
        changeEffectiveOpenData,
        openWindowChangeEffective,
        closeWindowChangeEffective
      }
    }
    // 备货申请
    const stockApplicationOpen = (data: any) => {
      let stockApplicationOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowStockApplication = (row: any) => {
        stockApplicationOpenData.formData = {}
        stockApplicationOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowStockApplication = (type: string) => {
        stockApplicationOpenData.visible = false
      }

      return {
        stockApplicationOpenData,
        openWindowStockApplication,
        closeWindowStockApplication
      }
    }
    // 审批状态

    const approvalRecordOpen = (data: any) => {
      let ApprovalRecordOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowApprovalRecord = (row: any) => {
        ApprovalRecordOpenData.formData = {}
        ApprovalRecordOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowApprovalRecord = (type: string) => {
        ApprovalRecordOpenData.visible = false
      }

      return {
        ApprovalRecordOpenData,
        openWindowApprovalRecord,
        closeWindowApprovalRecord
      }
    }
    // 销售合同弹框
    const editSalesContractOpen = (data: any) => {
      let EditSalesContractOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowEditSalesContract = (row: any) => {
        EditSalesContractOpenData.formData = {}
        EditSalesContractOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowEditSalesContract = (type: string) => {
        EditSalesContractOpenData.visible = false
      }

      return {
        EditSalesContractOpenData,
        openWindowEditSalesContract,
        closeWindowEditSalesContract
      }
    }
    // 提报审批
    const approval = () => {
      ElMessageBox.confirm('确定提报审批？', '提报审批', {
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
    // 作废合同
    const contract = () => {
      ElMessageBox.confirm('确定作废此合同？', '警告', {
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

    onMounted(() => {
      getCompList(data)
    })
    return {
      data,
      form,
      ...tableRender(form, data),
      ...contractDetailsOpen({ data }),
      ...changeEffectiveOpen({ data }),
      ...stockApplicationOpen({ data }),
      shortcuts,
      approval,
      contract,
      ...approvalRecordOpen({ data }),
      ...editSalesContractOpen({ data }),
      ...approvalContractDetailsOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
