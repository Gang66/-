<template>
  <!-- 搜索框 -->
  <div class="ConsultationList-dow-query clearfix pb-1">
    <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
    <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4 ml-3" />
    <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
      <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
    </el-select>
    <el-input v-model="form.SalesmanInput" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
    <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
    <el-button> <i class="iconfont icon-daochu mr-2"></i> 导出数据</el-button>
    <div class="float-right mt-px">
      <el-button type="primary" @click="openWindowContractDetails()"> <i class="iconfont icon-jpg mr-2"></i> 电子版</el-button>
      <el-button type="warning" @click="abnormal()"><i class="iconfont icon-dingdan8 mr-2"></i>转为异常</el-button>
    </div>
  </div>
  <!-- #region  四个计数-->
  <div class="inquiry_components_totalwages">
    <div class="mb-3 mt-3">
      <el-row :gutter="20">
        <!-- 本页小计 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-red-400 grid-content ep-bg-purple rounded-xl">
            <div class="float-left text-white ml-8 mt-8">
              <p class="text-2xl font-semibold">30 <span class="text-xs">条</span></p>
              <p>本页小计</p>
            </div>
            <i class="iconfont icon-hetong float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
          </div>
        </el-col>
        <!-- 本页总计 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-orange-400 rounded-xl">
            <div class="float-left text-white ml-8 mt-8">
              <p class="text-2xl font-semibold">100</p>
              <p>本页总计（元）</p>
            </div>
            <i class="iconfont icon-qiandai float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
          </div>
        </el-col>
        <!-- 全表总计 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-blue-400 grid-content ep-bg-purple rounded-xl">
            <div class="float-left text-white ml-8 mt-8">
              <p class="text-2xl font-semibold">3200 <span class="text-xs">条</span></p>
              <p>全表总计</p>
            </div>
            <i class="iconfont icon-hetong float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
          </div>
        </el-col>
        <!-- 全表总计 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-green-500 rounded-xl">
            <div class="float-left text-white ml-8 mt-8">
              <p class="text-2xl font-semibold">100000000.00</p>
              <p>全表总计（元）</p>
            </div>
            <i class="iconfont icon-qiandai float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
  <!-- #endregion -->
  <!-- #region  表格-->
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="54" align="center" />
        <el-table-column prop="CreateOn" label="生效时间" width="166" align="center">
          <template #default="scope">{{ scope.row.ConsultTime }}</template>
        </el-table-column>
        <el-table-column prop="PostName" label="事业部" width="120">
          <template #default="scope">潍坊事业部</template>
        </el-table-column>
        <el-table-column prop="DepartName" label="业务员" width="100" align="center">
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column>
        <el-table-column prop="Name" label="客户名称" min-width="180">
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
          <template #default="scope">
            <span>2022-07-06</span>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="物流状态" width="100" align="center">
          <template #default="scope">
            <span>采购处理</span>
            <!-- <span>已收到</span>
            <span>生产过程</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="发票状态" width="100" align="center">
          <template #default="scope">
            <span class="text-gray-400">待开票</span>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="货款状态" width="100" align="center">
          <template #default="scope">
            <!-- <span class="text-gray-400">待收款</span> -->
            <span class="text-blue-500 cursor-pointer" @click="openWindowReceipt()">1650000</span>
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
  <!-- #endregion -->

  <!--查看（合同详情） -->
  <ContractDetails title="合同详情" v-if="contractDetailsOpenData.visible" :FormData="contractDetailsOpenData.formData" @closeWindow="closeWindowContractDetails($event)" />
  <!--贷款状态 -->
  <Receipts title="已收款项" v-if="receiptOpenData.visible" :FormData="receiptOpenData.formData" @closeWindow="closeWindowReceipt($event)" />
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'
import ContractDetails from '../../OrderAllocationManagement/_Components/ContractDetails.vue'
import Receipts from './Receipts.vue'

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
    // GetOverTimeLists,
    // GetBeOverTimeLists
  }
}

export default defineComponent({
  components: {
    TableSearch,
    ContractDetails,
    Receipts
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      CompId: null,
      NameInput: '',
      TimeValue: '',
      SalesmanInput: ''
    })
    const data = reactive({
      // 表格数据
      tableData: [],
      //事业部信息
      CompList: [],
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
      ]
    })

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
    // 转为异常
    const abnormal = () => {
      ElMessageBox.confirm('确定将此合同转为异常合同？', '提示', {
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
    // 贷款状态  已收款
    const receiptOpen = (data: any) => {
      let receiptOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowReceipt = (val: any) => {
        receiptOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        receiptOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowReceipt = (type: string) => {
        receiptOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        receiptOpenData,
        openWindowReceipt,
        closeWindowReceipt
      }
    }

    onMounted(() => {
      getCompList(data)
    })
    return {
      form,
      data,
      ...tableRender(form, data),
      ...contractDetailsOpen({ data }),
      abnormal,
      ...receiptOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.inquiry_components_totalwages {
  @media only screen and (max-width: 1500px) {
    .inquiry_big_img {
      display: none;
    }
  }
}
</style>
