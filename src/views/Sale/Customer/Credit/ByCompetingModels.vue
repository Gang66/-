<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <el-tabs v-model="data.activeName" class="demo-tabs" @tab-change="handleClick">
        <el-tab-pane label="采购原则(2)" :name="1">
          <!-- 采购原则 -->
          <AddPurchase v-if="data.purchaseView.view && !isShowOld" :ViewType="data.purchaseView.viewtype" :CustomerId='data.purchaseView.dataid' @closeWindow='closeWindow'/>
          <!-- 采购原则 -->
          <PurchaseList v-if='messagelog.View && isShowOld' :CustomerId='messagelog.CusId' @closeWindow='closeWindow' />
        </el-tab-pane>
        <el-tab-pane label="情报跟进(1)" :name="2">
          <!-- 情报跟进 -->
          <Communicate v-if="data.AddCommunicate.view" :ViewType="data.AddCommunicate.viewtype" :CustomerId='data.AddCommunicate.dataid' @closeWindow='closeWindow'/>
          <IntelligenceLog v-if='messagelog.View && isShowOld' :CustomerId='messagelog.CusId'></IntelligenceLog>
        </el-tab-pane>
        <el-tab-pane label="竞争对手(0)" :name="3">
          <CompeteList v-if="data.competeView.view" :ViewType="data.competeView.viewtype" :CustomerId='data.competeView.dataid'  @closeWindow='closeWindow'/>
        </el-tab-pane>
        <el-tab-pane label="付款方式(0)" :name="4">
          <AddPayment v-if="data.paymentView.view && !isShowOld" :ViewType="data.paymentView.viewtype" :CustomerId='data.paymentView.dataid' @closeWindow='closeWindow'/>
          <PaymentList v-if='messagelog.View && isShowOld' :CustomerId='messagelog.CusId' @closeWindow='closeWindow' />
        </el-tab-pane>
      </el-tabs>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'

import AddPurchase from '/@/views/Sale/Customer/Credit/AllCredit/AddPurchaseCopy.vue'
import Communicate from '/@/views/Sale/Customer/Credit/AllCredit/CommunicateCopy.vue'
import CompeteList from '/@/views/Sale/Customer/Credit/AllCredit/CompeteListCopy.vue'
import AddPayment from '/@/views/Sale/Customer/Credit/AllCredit/AddPaymentCopy.vue'

import PurchaseList from '/@/views/Sale/Customer/Credit/AllCredit/PurchaseListCopy.vue'
import PaymentList from '/@/views/Sale/Customer/Credit/AllCredit/PaymentListCopy.vue'
import IntelligenceLog from '/@/views/Sale/Customer/Credit/AllCredit/IntelligenceLog.vue'

import { reactive, ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '采情竞款'
  },
  type: { // 四个类型
    type: Number,
    default: 1
  },
  data: {
    type: Object,
    default: ()=>{}
  },
  isShowOld: { // 0 不变 1直接查看详情
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['closeWindow'])
const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

// 编辑处
const data = <any>reactive({
  activeName: 1,
  AddCommunicate: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  },
  purchaseView: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  },
  paymentView: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  },
  competeView: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  }
})

// 历史详情
const messagelog = reactive({
  View: false,
  CusId: 0
})


const openCredit = (val: any, type: any) => {
  // 查看历史记录
  if (props.isShowOld) {
    if (type == 3) {
      data.competeView.viewtype = 2
      data.competeView.dataid = val.Id
      data.competeView.view = true
      data.competeView.CusName = val.Name
      data.competeView.title = val.Name + '-竞争对手'
    } else {
      messagelog.View = true
      messagelog.CusId = val.Id
    }
  } else {  // 新增
    if (type != 2) {
      if (type == 1) {
        if (val.ProcurementState == true) {
          data.purchaseView.viewtype == 1
        } else {
          data.purchaseView.viewtype == 2
        }
        data.purchaseView.dataid = val.Id
        data.purchaseView.view = true
        data.purchaseView.CusName = val.Name
        data.purchaseView.title = val.Name + '-采购原则'
      } else if (type == 4) {
        if (val.PaymentState == true) {
          data.paymentView.viewtype == 1
        } else {
          data.paymentView.viewtype == 2
        }
        data.paymentView.dataid = val.Id
        data.paymentView.view = true
        data.paymentView.CusName = val.Name
        data.paymentView.title = val.Name + '-付款方式'
      } else if (type == 3) {
        if (val.CompetitorState == true) {
          data.competeView.viewtype == 1
        } else {
          data.competeView.viewtype == 2
        }
        data.competeView.dataid = val.Id
        data.competeView.view = true
        data.competeView.CusName = val.Name
        data.competeView.title = val.Name + '-竞争对手'
      }
    } else {
      data.AddCommunicate.CusName = val.Name
      data.AddCommunicate.dataid = val.Id
      data.AddCommunicate.view = true
    }
  }
}


// 切换tabs事件
const handleClick = (val: any) => {
  openCredit(props.data, val)
}

onMounted(() => {
  data.activeName = props.type
  openCredit(props.data, data.activeName)
})
</script>
<style lang="postcss" scoped>
/* :deep(.el-tabs__item ){
  font-size: 14px !important;
  line-height: 1.5em;
  height: auto;
  font-weight: 400 !important;
} */

</style>
