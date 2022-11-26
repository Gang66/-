<template>
  <!-- 搜索框 -->
  <div class="ConsultationList-dow-query inline-block pb-1">
    <el-date-picker v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
    <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4 ml-3" />
    <el-button type="primary" class="ml-2" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
    <div class="inline-block absolute top-5 right-4">
      <el-button type="primary" @click="openWindowEditSalesContract()"> <i class="iconfont icon-dingdan9 mr-2"></i>变更合同</el-button>
      <el-button type="warning" @click="openWindowSupplementalAgreement()"><i class="iconfont icon-chuangjian mr-2"></i>补成协议</el-button>
      <el-button type="info" @click="contract()"><i class="iconfont icon-shanchu mr-2"></i>作废合同</el-button>
    </div>
  </div>
  <!-- #region  表格-->
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="54" align="center" />
        <el-table-column prop="CreateOn" label="异常时间" width="166" align="center">
          <template #default="scope">{{ scope.row.ConsultTime }}</template>
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
        <el-table-column prop="WorkAge" label="交货期" width="120" align="center">
          <template #default="scope">
            <span>2022-07-06</span>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="物流状态" width="140" align="center">
          <template #default="scope">
            <span class="text-green-500">已生成</span>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="发票状态" width="140" align="center">
          <template #default="scope">
            <span>待开票</span>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="货款状态" width="140" align="center">
          <template #default="scope">
            <span>预付款中</span>
          </template>
        </el-table-column>

        <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
          <template #default="scope">
            <div>
              <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
              <div class="text-blue-600 inline-block cursor-pointer">预览</div>
            </div>
            <!-- <span class="text-gray-400">无</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <!-- #endregion -->
  <!-- 补充协议 -->
  <SupplementalAgreement title="补充协议" v-if="supplementalAgreementOpenData.visible" :FormData="supplementalAgreementOpenData.formData" @closeWindow="closeWindowSupplementalAgreement($event)" />
  <!-- 变更合同 -->
  <EditSalesContract v-if="EditSalesContractOpenData.visible" :FormData="EditSalesContractOpenData.formData" @closeWindow="closeWindowEditSalesContract($event)"></EditSalesContract>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import SupplementalAgreement from './SupplementalAgreement.vue'
import EditSalesContract from './EditSalesContract.vue'

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
    SupplementalAgreement,
    EditSalesContract
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      CompId: null,
      NameInput: '',
      TimeValue: ''
    })
    const data = reactive({
      // 表格数据
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
      ]
    })
    // 补充协议
    const supplementalAgreementOpen = (data: any) => {
      let supplementalAgreementOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowSupplementalAgreement = (row: any) => {
        supplementalAgreementOpenData.formData = {}
        supplementalAgreementOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowSupplementalAgreement = (type: string) => {
        supplementalAgreementOpenData.visible = false
      }

      return {
        supplementalAgreementOpenData,
        openWindowSupplementalAgreement,
        closeWindowSupplementalAgreement
      }
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
    return {
      form,
      data,
      ...tableRender(form, data),
      ...supplementalAgreementOpen({ data }),
      contract,
      ...editSalesContractOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped></style>
