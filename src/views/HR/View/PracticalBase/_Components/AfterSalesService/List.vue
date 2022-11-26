<template>
  <div>
    <CusDialog :box-style="boxStyle" title="相关单据" :is-show="true" @closeWindow="closeWindow">
      <div class="aftersalelist text-base">
        <div class="salerDialog">
          <el-card class="sale_card">
            <el-tabs v-model="data.tableTop" class="demo-tabs" @tab-change="cliketop(0)">
              <el-tab-pane label="售后列表" :name="0"></el-tab-pane>
              <el-tab-pane label="退货列表" :name="1"></el-tab-pane>
              <el-tab-pane label="开票列表" :name="2"></el-tab-pane>
              <el-tab-pane label="收款列表" :name="3"></el-tab-pane>
            </el-tabs>
            <div v-if="data.tableTop == 0">
              <el-table border :data="data.AfterSaleList" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="CreateOn" label="提交时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="业务员">
                  <template #default="scope">{{ scope.row.Salerman }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="售后等级">
                  <template #default="scope">{{ dic.Stage.find((f) => f.DicKey == scope.row.AfterSalesStage).DicValue || '' }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="状态">
                  <template #default="scope">
                    <span class="text-red-400" v-if="scope.row.State == -2">已驳回</span>
                    <span class="text-green-400" v-else-if="scope.row.State == 100">已通过</span>
                    <span v-else>审批中</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="操作">
                  <template #default="scope">
                    <el-link type="primary" @click="ViewAfterSales(scope.row.Id)"> 查看</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div v-if="data.tableTop == 1">
              <el-table border :data="data.ReturnList" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="CreateOn" label="提交时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="业务员">
                  <template #default="scope">{{ scope.row.Salerman }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="退货原因">
                  <template #default="scope">{{ dic.Reason.find((f) => f.DicKey == scope.row.Reason).DicValue || '' }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="退货联系人">
                  <template #default="scope">{{ scope.row.T_Contacts }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="状态">
                  <template #default="scope">
                    <span class="text-red-400" v-if="scope.row.State == -2">已驳回</span>
                    <span class="text-green-400" v-else-if="scope.row.State == 100">已通过</span>
                    <span v-else>审批中</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="操作">
                  <template #default="scope">
                    <el-link type="primary" @click="Viewreturnproducts(scope.row.Id)"> 查看</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="data.tableTop == 2">
              <el-table border :data="data.InvoicingList" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="CreateOn" label="提交时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="业务员">
                  <template #default="scope">{{ scope.row.Salerman }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="出票单位">
                  <template #default="scope">{{ scope.row.CompanyName }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="开票金额">
                  <template #default="scope">{{ scope.row.Amount }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="状态">
                  <template #default="scope">
                    <span class="text-red-400" v-if="scope.row.State == -2">已驳回</span>
                    <span class="text-green-400" v-else-if="scope.row.State == 100">已通过</span>
                    <span v-else>审批中</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="操作">
                  <template #default="scope">
                    <el-link type="primary" @click="ViewInvoicing(scope.row.Id)"> 查看</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div v-if="data.tableTop == 3">
              <el-table border :data="data.CollectionList" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="CreateOn" label="提交时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="业务员">
                  <template #default="scope">{{ scope.row.UserName }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="付款方式">
                  <template #default="scope">{{ dic.PaymentList.find((f) => f.DicKey == scope.row.PaymentType).DicValue || '' }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="收款金额">
                  <template #default="scope">{{ scope.row.Amount }}</template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="状态">
                  <template #default="scope">
                    <span class="text-red-400" v-if="scope.row.State == -2">已驳回</span>
                    <span class="text-green-400" v-else-if="scope.row.State == 100">已通过</span>
                    <span v-else>审批中</span>
                  </template>
                </el-table-column>
                <el-table-column prop="CreateOn" label="操作">
                  <template #default="scope">
                    <el-link type="primary" @click="ViewCollectionEvent(scope.row.Id)"> 查看</el-link>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="flex justify-end">
              <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
            </div>
          </el-card>
        </div>
      </div>
    </CusDialog>
    <AfterSales :title="'售后申请'" v-if="ShowAfterSales.show" :ContractId="ShowAfterSales.contractid" :ViewType="ShowAfterSales.viewtype" :DataId="ShowAfterSales.dataId" @cancelContract="cancelAfterSales"></AfterSales>

    <ReturnProducts :title="'退货申请'" v-if="Showreturnproducts.show" :ContractId="Showreturnproducts.contractid" :ViewType="Showreturnproducts.viewtype" :DataId="Showreturnproducts.dataId" @cancelContract="cancelreturnproducts"> </ReturnProducts>

    <Invoicing :title="'开票申请'" v-if="ShowInvoicing.show" :ViewType="ShowInvoicing.viewtype" :ContractId="ShowInvoicing.contractid" :DataId="ShowInvoicing.dataId" @cancelContract="cancelInvoicing"> </Invoicing>

    <AddCollection :title="'新增收款'" v-if="ShowCollection.show" :ViewType="ShowCollection.viewtype" :ContractId="ShowCollection.contractid" :DataId="ShowCollection.dataId" @cancelContract="cancelCollection"> </AddCollection>
  </div>
</template>
<script lang="ts" setup>
import AddCollection from '../Collection/AddCollection.vue'
import AfterSales from './AfterSales.vue'
import ReturnProducts from './ReturnProducts.vue'
import Invoicing from './Invoicing.vue'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { GetCollectionList } from '/@/api/hr/School/Receivable'
import { GetAfterSalesList, GetReturnProductseList, GetInvoicingList } from '/@/api/hr/School/AfterSale'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

const dic = reactive({
  Stage: [],
  Reason: [],
  PaymentList: []
})
//获取字典数据
const getDictionaryData = () => {
  //售后等级
  store.getDict('sale_AfterSales_State').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Stage = res
  })
  //付款方式
  store.getDict('sale_Collection_Type').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.PaymentList = res
  })
  //售后原因阶段
  store.getDict('sale_AfterSale_Reason').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Reason = res
    console.log(' dic.Reason', dic.Reason)
  })
}
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  ContractId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})
//#region 查看售后
const ShowAfterSales = reactive({
  show: false,
  viewtype: 2,
  dataId: 0,
  contractid: 0
})

const ViewAfterSales = (val: any) => {
  ShowAfterSales.dataId = val
  ShowAfterSales.show = true
}

const cancelAfterSales = () => {
  ShowAfterSales.show = false
}
//#endregion

//#region 查看退货

const Showreturnproducts = reactive({
  contractid: 0,
  show: false,
  viewtype: 2,
  dataId: 0
})

const Viewreturnproducts = (val: any) => {
  Showreturnproducts.dataId = val
  Showreturnproducts.show = true
}

const cancelreturnproducts = () => {
  Showreturnproducts.show = false
}
//#endregion

//#region 查看收款

const ShowCollection = reactive({
  show: false,
  contractid: 0,
  viewtype: 2,
  dataId: 0
})

const ViewCollectionEvent = (val: any) => {
  ShowCollection.dataId = val
  ShowCollection.show = true
}

const cancelCollection = () => {
  ShowCollection.show = false
}
//#endregion

//#region 查看开票

const ShowInvoicing = reactive({
  show: false,
  contractid: 0,
  viewtype: 2,
  dataId: 0
})

const ViewInvoicing = (val: any) => {
  ShowInvoicing.dataId = val
  ShowInvoicing.show = true
}

const cancelInvoicing = () => {
  ShowInvoicing.show = false
}
//#endregion

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  tableTop: 0,
  form: {},
  AfterSaleList: [],
  ReturnList: [],
  InvoicingList: [],
  CollectionList: []
})
const page = reactive({
  page: 1,
  size: 10,
  ContractId: props.ContractId ? props.ContractId : 0,
  count: 0
})

const handleSizeChange = (val: number) => {
  page.size = val
  cliketop(1)
}
const handleCurrentChange = (val: number) => {
  page.page = val
  cliketop(1)
}
const cliketop = (val: any) => {
  if (val == 0) {
    page.page = 1
    page.size = 10
    page.count = 0
  }
  if (data.tableTop == 0) {
    AfterSalesList()
  } else if (data.tableTop == 1) {
    ReturnProductseList()
  } else if (data.tableTop == 2) {
    InvoicingListEven()
  } else if (data.tableTop == 3) {
    CollectionListEven()
  }
}
const AfterSalesList = () => {
  GetAfterSalesList(page).then((res) => {
    if (res.code == 1) {
      data.AfterSaleList = res.data.list
      page.count = res.data.count
    }
  })
}

const ReturnProductseList = () => {
  GetReturnProductseList(page).then((res) => {
    if (res.code == 1) {
      data.ReturnList = res.data.list
      page.count = res.data.count
    }
  })
}

const InvoicingListEven = () => {
  GetInvoicingList(page).then((res) => {
    if (res.code == 1) {
      data.InvoicingList = res.data.list
      page.count = res.data.count
    }
  })
}
const CollectionListEven = () => {
  GetCollectionList(page).then((res) => {
    if (res.code == 1) {
      data.CollectionList = res.data.list
      page.count = res.data.count
    }
  })
}

onMounted(() => {
  getDictionaryData()
  cliketop(0)
})
</script>
<style lang="postcss" scoped>
.aftersalelist {
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
}
</style>
