<template>
  <div class="quotationlist">
    <el-button @click="AddQuotationEvent">新增报价单</el-button>
    <el-button @click="viewQuotationEvent">编辑报价单</el-button>
    <el-button @click="ShiftToTechFun">转入技术</el-button>
    <div class="pt-4">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange"
        :header-cell-style='{ background: &apos;#4E8AFC&apos;, color: &apos;#F5F8FF&apos;,height:&apos;50px&apos;, textAlign: &apos;center&apos;,fontWeight:&apos;600&apos; }'
        :cell-style='{ textAlign: &apos;center&apos;,color: &apos;#333&apos;,height:&apos;45px&apos;,padding:&apos;0px&apos; }'>
        <el-table-column type='selection' width='30' />
        <el-table-column type="index" width='60' label='序号'>

        </el-table-column>
        <el-table-column prop='CreateOn' label='询价时间'>
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column label='事业部'>
          <template #default="scope">{{ scope.row.ComName }}</template>
        </el-table-column>
        <el-table-column label='业务员'>
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column>
        <el-table-column label='客户名称' width="200">
          <template #default="scope">{{ scope.row.CustomerName }}</template>
        </el-table-column>
        <el-table-column label='金额'>
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>
        <el-table-column label='等级'>
          <template #default="scope">{{ scope.row.Grade }}</template>
        </el-table-column>
        <el-table-column label='订单状态'>
          <template #default="scope"></template>
        </el-table-column>
        <el-table-column label='报价单'>
          <template #default="scope">
            <span class="mr-4 cursor-pointer" @click="printorder(scope.row.Id)">查看</span>
          </template>
        </el-table-column>
        <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
 -->
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>

    <Add :title="'新增报价单'" v-if="ShowQuotation.show" :ViewType='ShowQuotation.viewtype' :DataId='ShowQuotation.dataId' @cancelQuotation="cancelQuotation"></Add>
    <printindex v-if="printdata.view" :DataId='printdata.dataid' @closeWindow='cancelprint'></printindex>
  </div>
</template>
<script lang="ts" setup>
import printindex from '../Print/printindex.vue'
import { GetCustomerOrderList, GetSaleCustomerOrderToEnquirySave } from '/@/api/Sale/CustomerOder'
import Add from './AddQuotation.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const page = reactive({
  page: 1,
  size: 10,
  count: 0
})
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}

const printdata = ref({
  view: false,
  dataid: 0
})

const printorder = (val: number) => {
  printdata.value.dataid = val
  console.log('-------', val)
  printdata.value.view = true
}
const cancelprint = () => {
  printdata.value.view = false
}
//技术转入
const ShiftToTechFun = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }
  ElMessageBox.confirm('是否确认转入技术？', '提示', {
    confirmButtonText: '转入技术',
    cancelButtonText: '否',
    type: 'warning'
  }).then(() => {
    var id = multipleSelection.value[0].Id
    GetSaleCustomerOrderToEnquirySave(id).then((res) => {
      if (res.code == 1) {
        ElMessage.success('操作成功！')
      }
      else{
        ElMessage.error(res.message)
      }
    })
  })
}
const getlist = () => {
  GetCustomerOrderList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
      console.log('---------------------------------------', data.tableData)
    }
  })
}

const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}

const data = reactive({
  count: 0,
  tableData: []
})

const ShowQuotation = ref({
  show: false,
  viewtype: 1,
  dataId: 0
})

const viewQuotationEvent = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowQuotation.value.show = true
  ShowQuotation.value.viewtype = 2
  ShowQuotation.value.dataId = multipleSelection.value[0].Id
}

const AddQuotationEvent = () => {
  ShowQuotation.value.show = true
  ShowQuotation.value.viewtype = 1
}
const cancelQuotation = () => {
  ShowQuotation.value.show = false
  getlist()
}
onMounted(() => {
  getlist()
})
</script>
<style lang="postcss" scoped>
.quotationlist {
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
</style>
