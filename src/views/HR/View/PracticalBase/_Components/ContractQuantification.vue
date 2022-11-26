<template>
  <div class="contractlist">
    <div class="py-1">
      <div class="hom_custab pt-2 flex justify-between border-gray-400 border-dashed">
        <div class="w-72">
          <el-tabs v-model="data.tableTop" class="demo-tabs" @tab-change="cliketop">
            <el-tab-pane label="待生效列表" :name="0"></el-tab-pane>
            <el-tab-pane label="生效列表" :name="1"></el-tab-pane>
            <el-tab-pane label="回收站" :name="2"></el-tab-pane>
          </el-tabs>
        </div>
        <div class="flex pt-1">
          <el-input style="width: 200px; height: 32px" v-model="form.CustomerName" placeholder="请输入客户名" class="pr-2"></el-input>
          <el-button type="primary" @click="search" class="butclass mr-2"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>

          <div v-if="data.tableTop == 0" class="flex">
            <el-button type="primary" class="butclass" @click="AddLostOrder"> <el-icon-List class="w-4 h-4 mr-2" />作废合同 </el-button>
            <el-button type="primary" class="addbutclass" @click="AddApprovalContract"> <svg-icon icon-class="svg-tbsp" />提报审批 </el-button>

            <el-button type="primary" class="addbutclass" @click="AddContractEvent"> <svg-icon icon-class="svg-addht" />新增合同 </el-button>
          </div>
          <div v-if="data.tableTop == 1" class="flex">
            <el-button type="primary" class="butclass" @click="AddAfterSales"> <svg-icon icon-class="svg-addsh" />售后录入 </el-button>
            <el-button type="primary" class="butclass" @click="Addreturnproducts"> <svg-icon icon-class="svg-addth" />退货录入 </el-button>
            <el-button type="primary" class="butclass" @click="AddInvoicing"> <svg-icon icon-class="svg-addkp" />申请开票 </el-button>
            <el-button type="primary" class="addbutclass" @click="AddCollectionEvent"> <svg-icon icon-class="svg-addsk" />新增收款 </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="">
      <!--       <div class="w-full h-12 rounded-t-lg flex justify-between px-4" style="background:#468bfd">
        <div class="text-white" style="display: flex;">
          <div @click="cliketop(0)" :class="data.tableTop==0?'bg-white text-blue-500':''" class="h-12 p-2">
            待生效列表
          </div>
          <div @click="cliketop(1)" :class="data.tableTop==1?'bg-white text-blue-500':''" class="h-12 p-2">
            生效列表
          </div>
          <div @click="cliketop(2)" :class="data.tableTop==2?'bg-white text-blue-500':''" class="h-12 p-2">
            回收站
          </div>
        </div>
        <div>
        </div>
      </div> -->
      <div v-if="data.tableTop == 0">
        <el-table :data="data.tableData" @selection-change="handleSelectionChange" border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px">
          <el-table-column type="selection" width="50" />
          <el-table-column type="index" width="60" label="序号"> </el-table-column>
          <el-table-column prop="CreateOn" width="130" label="录入时间">
            <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
          </el-table-column>

          <el-table-column label="客户名称">
            <template #default="scope">{{ scope.row.CustomerName }}</template>
          </el-table-column>

          <el-table-column label="签约单位" width="200">
            <template #default="scope">{{ scope.row.CompanyName }}</template>
          </el-table-column>

          <el-table-column label="合同金额" width="140">
            <template #default="scope">{{ scope.row.Amount }}</template>
          </el-table-column>
          <el-table-column label="成交金额" width="140">
            <template #default="scope">{{ scope.row.DiscountAmount }}</template>
          </el-table-column>
          <el-table-column label="业绩金额" width="140">
            <template #default="scope">
              {{ scope.row.RealAmount }}
            </template>
          </el-table-column>
          <el-table-column label="合同状态" width="100">
            <template #default="scope">
              <div class="text-red-600" v-if="scope.row.BillState < 0">驳回</div>
              <div class="text-yellow-600" v-else-if="scope.row.BillState == 0">等待提交</div>
              <div class="text-blue-500" v-else-if="scope.row.BillState >= 1 && scope.row.BillState < 100">审核中</div>
              <div class="text-green-500" v-else-if="scope.row.BillState == 100">已通过</div>
            </template>
          </el-table-column>

          <el-table-column label="操作" width="100">
            <template #default="scope">
              <el-link type="primary" @click="ViewContractEvent(scope.row)"> 详情 </el-link>
              <el-link type="primary" v-if="scope.row.BillState <= 0" @click="EditContractEvent(scope.row)" class="ml-2"> 编辑 </el-link>
            </template>
          </el-table-column>

          <!--         <el-table-column label='事业部'>
          <template #default="scope">{{ scope.row.ComName }}</template>
        </el-table-column>
        <el-table-column label='业务员'>
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column> -->

          <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
 -->
        </el-table>
      </div>

      <div v-if="data.tableTop == 1">
        <el-table :data="data.tableData" @selection-change="handleSelectionChange" border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px">
          <el-table-column type="selection" width="50" />
          <el-table-column type="index" width="60" label="序号"> </el-table-column>
          <el-table-column prop="CreateOn" width="120" label="生效时间">
            <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
          </el-table-column>

          <el-table-column label="客户名称">
            <template #default="scope">{{ scope.row.CustomerName }}</template>
          </el-table-column>
          <el-table-column label="签约单位" width="140">
            <template #default="scope">{{ scope.row.CompanyName }}</template>
          </el-table-column>

          <el-table-column label="合同金额" width="100">
            <template #default="scope">{{ scope.row.Amount }}</template>
          </el-table-column>

          <el-table-column label="成交金额" width="120">
            <template #default="scope">{{ scope.row.DiscountAmount }}</template>
          </el-table-column>

          <el-table-column label="业绩金额" width="100">
            <template #default="scope">{{ scope.row.RealAmount }}</template>
          </el-table-column>

          <el-table-column label="合同状态" width="100">
            <template #default="scope">
              <div class="text-green-500">已通过</div>
            </template>
          </el-table-column>
          <el-table-column label="退货金额" width="100">
            <template #default="scope">
              <span class="mr-4 cursor-pointer">0</span>
            </template>
          </el-table-column>

          <el-table-column label="相关单据" width="100">
            <template #default="scope">
              <el-link @click="OpenListView(scope.row.Id)">查看</el-link>
            </template>
          </el-table-column>

          <!--  <el-table-column label='售后信息' width="100">
            <template #default="scope"></template>
          </el-table-column>

          <el-table-column label='发票状态' width="100">
            <template #default="scope"></template>
          </el-table-column> -->

          <el-table-column label="操作" width="80">
            <template #default="scope">
              <el-link type="primary" @click="opencontract(scope.row)"> 详情 </el-link>
            </template>
          </el-table-column>

          <!--<el-table-column label='事业部'>
          <template #default="scope">{{ scope.row.ComName }}</template>
        </el-table-column>
        <el-table-column label='业务员'>
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column> -->

          <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
         -->
        </el-table>
      </div>

      <div v-if="data.tableTop == 2">
        <el-table :data="data.tableData" @selection-change="handleSelectionChange" border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px">
          <el-table-column type="selection" width="50" />
          <el-table-column type="index" width="60" label="序号"> </el-table-column>
          <el-table-column prop="CreateOn" width="140" label="录入时间">
            <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
          </el-table-column>

          <el-table-column label="客户名称">
            <template #default="scope">{{ scope.row.CustomerName }}</template>
          </el-table-column>
          <el-table-column label="签约单位">
            <template #default="scope">{{ scope.row.CompanyName }}</template>
          </el-table-column>

          <el-table-column label="合同金额">
            <template #default="scope">{{ scope.row.Amount }}</template>
          </el-table-column>

          <el-table-column label="成交金额" width="120">
            <template #default="scope">{{ scope.row.DiscountAmount }}</template>
          </el-table-column>

          <el-table-column label="业绩金额" width="120">
            <template #default="scope">{{ scope.row.RealAmount }}</template>
          </el-table-column>

          <el-table-column label="操作" width="120">
            <template #default="scope">
              <el-link type="primary" @click="ViewContractEvent(scope.row)" class="mr-2"> 详情 </el-link>
              <el-link type="primary" @click="Recoverycontract(scope.row.Id)"> 恢复 </el-link>
            </template>
          </el-table-column>

          <!--         <el-table-column label='事业部'>
          <template #default="scope">{{ scope.row.ComName }}</template>
        </el-table-column>
        <el-table-column label='业务员'>
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column> -->

          <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
 -->
        </el-table>
      </div>

      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <Add :title="'新增销售合同'" v-if="ShowContract.show" :ViewType="ShowContract.viewtype" :DataId="ShowContract.dataId" @closeWindow="cancelContract"></Add>

    <AfterSales :title="'售后申请'" v-if="ShowAfterSales.show" :ContractId="ShowAfterSales.contractid" :ViewType="ShowAfterSales.viewtype" :DataId="ShowAfterSales.dataId" @cancelContract="cancelAfterSales"></AfterSales>

    <ReturnProducts :title="'退货申请'" v-if="Showreturnproducts.show" :ContractId="Showreturnproducts.contractid" :ViewType="Showreturnproducts.viewtype" :DataId="Showreturnproducts.dataId" @cancelContract="cancelreturnproducts"> </ReturnProducts>

    <Invoicing :title="'开票申请'" v-if="ShowInvoicing.show" :ViewType="ShowInvoicing.viewtype" :ContractId="ShowInvoicing.contractid" :DataId="ShowInvoicing.dataId" @cancelContract="cancelInvoicing"> </Invoicing>

    <AddCollection :title="'新增收款'" v-if="ShowCollection.show" :ViewType="ShowCollection.viewtype" :ContractId="ShowCollection.contractid" :DataId="ShowCollection.dataId" @cancelContract="cancelCollection"> </AddCollection>
    <List v-if="ShowList.show" :ContractId="ShowList.contractid" @cancelContract="CloseListView"> </List>

    <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
  </div>
</template>
<script lang="ts" setup>
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'

import { GetContractList, GetCancelContractById, GetApprovalContractById, GetContractRankByUserId, GetRecoveryContract } from '/@/api/hr/School/PracticalBase'
import Add from './AddContract.vue'
import List from './AfterSalesService/List.vue'
import AddCollection from './Collection/AddCollection.vue'
import AfterSales from './AfterSalesService/AfterSales.vue'
import ReturnProducts from './AfterSalesService/ReturnProducts.vue'
import Invoicing from './AfterSalesService/Invoicing.vue'

import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const page = reactive({
  page: 1,
  size: 10,
  type: 0,
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
const search = () => {
  getlist()
}

//#region 申请售后
const ShowAfterSales = reactive({
  show: false,
  viewtype: 1,
  dataId: 0,
  contractid: 0
})

const AddAfterSales = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowAfterSales.contractid = multipleSelection.value[0].Id
  ShowAfterSales.show = true
}

const cancelAfterSales = () => {
  ShowAfterSales.show = false
}
//#endregion

//#region 申请退货

const Showreturnproducts = reactive({
  contractid: 0,
  show: false,
  viewtype: 1,
  dataId: 0
})

const Addreturnproducts = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  Showreturnproducts.contractid = multipleSelection.value[0].Id
  Showreturnproducts.show = true
}

const cancelreturnproducts = () => {
  Showreturnproducts.show = false
}
//#endregion
//#region 相关单据
const ShowList = reactive({
  show: false,
  contractid: 0
})

const OpenListView = (val: any) => {
  ShowList.show = true
  ShowList.contractid = val
}
const CloseListView = () => {
  ShowList.show = false
}

//#endregion

//#region 申请收款

const ShowCollection = reactive({
  show: false,
  contractid: 0,
  viewtype: 1,
  dataId: 0
})

const AddCollectionEvent = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowCollection.contractid = multipleSelection.value[0].Id
  ShowCollection.show = true
}

const cancelCollection = () => {
  ShowCollection.show = false
}
//#endregion

//#region 申请开票

const ShowInvoicing = reactive({
  show: false,
  contractid: 0,
  viewtype: 1,
  dataId: 0
})

const AddInvoicing = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowInvoicing.contractid = multipleSelection.value[0].Id
  ShowInvoicing.show = true
}

const cancelInvoicing = () => {
  ShowInvoicing.show = false
}
//#endregion

///新增合同
const AddContractEvent = () => {
  ShowContract.value.show = true
  ShowContract.value.viewtype = 1
}
//恢复合同
const Recoverycontract = (val: any) => {
  ElMessageBox.confirm('确认要恢复此合同到未生效状态吗？', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      GetRecoveryContract({ DataId: val }).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          getlist()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    .catch(() => {})
}
///查看合同
const ViewContractEvent = (val: any) => {
  if (val.BillState == 0) {
    ShowContract.value.show = true
    ShowContract.value.dataId = val.Id
    ShowContract.value.viewtype = 3
  } else {
    opencontract(val, 3)
  }
}
//编辑合同
const EditContractEvent = (val: any) => {
  if (val.BillState == 0) {
    ShowContract.value.show = true
    ShowContract.value.dataId = val.Id
    ShowContract.value.viewtype = 2
  } else {
    opencontract(val)
  }
}
const AddTrack = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowContract.value.show = true
  ShowContract.value.viewtype = 5
  ShowContract.value.dataId = multipleSelection.value[0].Id
}
const AddApprovalContract = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ElMessageBox.confirm('确定要对此合同提报审批吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      GetApprovalContractById({ Id: multipleSelection.value[0].Id }).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          getlist()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    .catch(() => {})
}

const AddLostOrder = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ElMessageBox.confirm('确定要作废此合同吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      GetCancelContractById({ Id: multipleSelection.value[0].Id }).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          getlist()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    .catch(() => {})
}
const getlist = () => {
  GetContractList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
      console.log('---------------------------------------', data.tableData)
    }
  })
}
const form = reactive({
  QueryType: null,
  CustomerName: '',
  Ranking: null,
  Checked: null,
  SeachDate: [],
  timetype: ''
})
const data = reactive({
  Rank: {
    ContractRank: 0,
    ContractCount: 0,
    AddCount: 0,
    DelContractCount: 0,
    ContractYJRank: 0,
    SuccessAmount: 0,
    UnSuccessAmount: 0,
    SuccessRate: 0,
    AfterSalesRank: 0,
    AfterSalesCount: 0,
    UnAfterSalesCount: 0,
    CostRank: 0,
    CostAmount: 0,
    CostRate: 0,
    YJAmount: 0,
    RealAmount: 0,
    ReturnCost: 0
  },
  viewType: 1,
  DataId: 0,
  tableTop: 0,
  AddCustomerData: {
    view: false,
    currentCustomerId: 0,
    isEdit: false,
    otherRegion: {},
    InfoDisabled: false,
    screenCustomer: null,
    isReadOnly: false
  },
  tableData: []
})

const clicktime = (val: any) => {
  form.timetype = val
}
//#region 合同
const WFManagementFormWindow = ref({
  details: {
    viewType: 1
  },
  show: false,
  Id: 0
})
const wfcloseWindow = () => {
  WFManagementFormWindow.value.show = false
  getlist()
}

const opencontract = (row: any, type: number = 0) => {
  GetApplyFlowStepEvent({
    DataId: row.Id,
    Code: 'Contract_BaseInfo'
  }).then((res: any) => {
    WFManagementFormWindow.value.details = res.data
    if (row.BillState == -1 && type == 0) {
      WFManagementFormWindow.value.details.viewType = 2
    } else {
      WFManagementFormWindow.value.details.viewType = 3
    }
    WFManagementFormWindow.value.show = true
  })
}

const cancelContract = () => {
  ShowContract.value.show = false
  getlist()
}

const ShowContract = ref({
  show: false,
  viewtype: 1,
  dataId: 0
})

//#endregion

const viewQuotationEvent = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowContract.value.show = true
  ShowContract.value.viewtype = 2
  ShowContract.value.dataId = multipleSelection.value[0].Id
}

const cliketop = (val: any) => {
  data.tableTop = val
  page.type = val
  multipleSelection.value = []
  getlist()
}

const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}
const closePostWindow = () => {
  getlist()
  data.AddCustomerData.view = false
}

const handleClick = (val: any) => {
  data.DataId = val.Id
  data.viewType = 2
  data.AddCustomerData.view = true
}
//新增客户
const addCustomerview = () => {
  data.viewType = 1
  data.DataId = 0
  data.AddCustomerData.view = true
}
const GetRank = () => {
  GetContractRankByUserId().then((res) => {
    data.Rank = res.data
  })
}

onMounted(() => {
  GetRank()
  getlist()
})
</script>
<style lang="postcss" scoped>
.contractlist {
  .butclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #468bfd;
    background: #ffffff;
    &:focus {
      background-color: #e3ebf3;
    }
    &:hover {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
    &:active {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
  }
  .addbutclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #fff;
    background: #468bfd;
    &:focus {
      background-color: #3971ce;
    }
    &:hover {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
    &:active {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
  }
  :deep(.el-tabs__item.is-active) {
    color: #468bfd;
  }
  :deep(.el-tabs__item) {
    font-size: 16px;
    color: #666;
    font-weight: 550;
  }
  :deep(.el-tabs__header) {
    margin: 0px 0 5px;
  }
  .hom_custab {
    .tabinput {
      width: 10rem;
      margin-right: 1rem;
    }
    .tabselect {
      margin-left: 1rem;

      width: 10rem;
    }
    .tabbutselect {
      color: #ffffff;
      margin-left: 1rem;
      margin-top: -3px;
      width: 6rem;
      background: linear-gradient(180deg, #33b3ff 0%, #92d1ff 100%);
      border: 0rem;
    }
    .tabbutclear {
      color: #ffffff;
      margin-left: 1rem;
      margin-top: -3px;
      width: 6rem;
      background: linear-gradient(180deg, #db0c0c 0%, #eb7373 100%);
      border: 0rem;
    }
  }
  .listtop {
    background: url(../../../assets/img/sale/result/topbj.png);
    background-size: 100% 100%;
    height: 100px;
    .rank {
      background: url(../../../assets/img/sale/contract/ht_rank.png);
      background-size: 100% 100%;
      height: 90px;
      width: 90px;
      z-index: 1;
    }
    .yjrank {
      background: url(../../../assets/img/sale/contract/yj_rank.png);
      background-size: 100% 100%;
      height: 90px;
      width: 90px;
      z-index: 1;
    }
    .shrank {
      background: url(../../../assets/img/sale/contract/sh_rank.png);
      background-size: 100% 100%;
      height: 90px;
      width: 90px;
      z-index: 1;
    }
    .fyrank {
      background: url(../../../assets/img/sale/contract/fy_rank.png);
      background-size: 100% 100%;
      height: 90px;
      width: 90px;
      z-index: 1;
    }
    .hjmoney {
      background: url(../../../assets/img/sale/contract/hj_jine.png);
      background-size: 105% 150%;
      height: 30px;
      width: 155px;
    }
  }
  .custtj {
    background: url(../../../assets/img/sale/customer/customer_tj.png) repeat-x left top;
    background-size: 100% 100%;
    .tjtitle {
      position: relative;
      top: -13px;
      background: url(../../../assets/img/sale/customer/tj_title.png);
      background-size: 100% 100%;
    }
  }
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
</style>
