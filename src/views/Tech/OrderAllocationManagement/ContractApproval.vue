<template>
  <div class="Tech_ContractApproval">
    <!-- 合同审批管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1 pb-1">
        <span class="ml-4 text-sm">合同审批管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query inline-block pb-2">
        <el-date-picker v-model="form.date" type="daterange" unlink-panels range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" size="default" style="width: 260px" class="mr-4 align-middle" />
        <el-input v-model="form.CustomerName" size="default" placeholder="请输入客户名称" style="width: 200px" class="mr-4" />
        <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
          <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-input v-model="form.SalerName" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
        <el-button type="primary" :icon="Search" @click="search">查询</el-button>
        <div class="inline-block absolute top-4 right-4">
          <el-button type="danger" @click="openWindowReturnContract()"><i class="iconfont icon-tuihui mr-2"></i>退回订单</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="申请时间" width="166">
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
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" width="160" align="center">
                <template #default="scope">380400000.00</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="交货期" width="120" align="center">
                <template #default="scope">2021-11-20</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="生效状态" width="140" align="center">
                <template #default="scope">
                  <!-- <span class="text-yellow-400">领导审批</span> -->
                  <!-- <span class="text-red-400">待生效</span> -->
                  <!-- <span class="text-green-400">已生效</span> -->
                  <!-- <span class="text-red-400">等待盖章</span> -->
                  <span class="text-red-400">等待原件</span>
                  <!-- <span class="text-green-400">备货通过</span> -->
                  <!-- <span class="text-green-400">已生效</span> -->
                  <!-- <span class="text-green-400">审批通过</span> -->
                  <!-- <span class="text-yellow-400">销售审批</span> -->
                  <!-- <span class="text-yellow-400">运营审批</span> -->
                </template>
              </el-table-column>

              <el-table-column prop="PostName" label="审批状态" width="100" align="center">
                <template #default="scope">
                  <!-- <span class=" text-red-400">销售未通过</span> -->
                  <!-- <span class=" text-yellow-400">总经理审批</span> -->
                  <span class="text-green-400">总经理审批</span>
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
                    <div class="inline-block text-blue-600 cursor-pointer" @click="openWindowEditContract()">编辑</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 沟通记录 -->
    <RejectOrder :title="rejectOrderOpenData.formData.ClientName" v-if="rejectOrderOpenData.visible" :FormData="rejectOrderOpenData.formData" @closeWindow="closeWindowRejectOrder($event)" />
    <!-- 编辑（编辑合同） -->
    <EditContract title="编辑合同" v-if="editContractOpenData.visible" :FormData="editContractOpenData.formData" @closeWindow="closeWindowEditContract($event)" />
    <!--查看（合同详情） -->
    <ContractDetails title="合同详情" v-if="contractDetailsOpenData.visible" :FormData="contractDetailsOpenData.formData" @closeWindow="closeWindowContractDetails($event)" />
    <!--  -->
    <ReturnContract title="请编辑回复通知相关人员" v-if="returnContractOpenData.visible" :FormData="returnContractOpenData.formData" @closeWindow="closeWindowReturnContract($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import RejectOrder from './_Components/RejectOrder_s.vue'
import EditContract from './_Components/EditContract.vue'
import ContractDetails from './_Components/ContractDetails.vue'
import { rejectOrderOpen } from '/@/assets/ts/techOpenWindow'
import ReturnContract from './_Components/ReturnContract.vue'
import { ElMessage } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import '/@/assets/css/tech.css'

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
  components: {
    TableSearch,
    RejectOrder,
    EditContract,
    ContractDetails,
    ReturnContract
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
      CompId: null,
      date: [],
      CustomerName: ''
    })
    const data = reactive({
      //事业部信息
      CompList: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    // 编辑  编辑合同
    const editContractOpen = (data: any) => {
      let editContractOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowEditContract = (val: any) => {
        editContractOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        editContractOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowEditContract = (type: string) => {
        editContractOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        editContractOpenData,
        openWindowEditContract,
        closeWindowEditContract
      }
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
    // 退回合同
    const returnContractOpen = (data: any) => {
      let returnContractOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowReturnContract = (val: any) => {
        returnContractOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        returnContractOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowReturnContract = (type: string) => {
        returnContractOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        returnContractOpenData,
        openWindowReturnContract,
        closeWindowReturnContract
      }
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

    onMounted(() => {
      getCompList(data)
    })
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      shortcuts,
      ...rejectOrderOpen({ data, getData }),
      ...editContractOpen({ data }),
      ...contractDetailsOpen({ data }),
      ...returnContractOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tech_ContractApproval {
}
</style>
