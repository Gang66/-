<template>
  <p class="text-xl text-center">北方阀门集团物料采购单</p>
  <p class="text-sm float-right mb-3">NO： <span class="text-red-500 font-semibold">{{ data.Bill.BillNo || '-' }}</span></p>
  <div class="material_baseInfo">
    <table border="1" style="border-collapse: collapse; width: 100%; text-align: center">
      <colgroup>
        <col width="10%" class="bg-slate-100" />
        <col width="14%" />
        <col width="8%" class="bg-slate-100" />
        <col width="8%" />
        <col width="10%" class="bg-slate-100" />
        <col width="10%" />
        <col width="10%" class="bg-slate-100" />
        <col width="10%" />
        <col width="10%" class="bg-slate-100" />
        <col width="10%" />
      </colgroup>
      <tr>
        <th>需求方</th>
        <td colspan="3" style="text-align: left; padding-left: 10px">{{ data.Bill.CustomerName || '-' }}</td>
        <th>合同金额</th>
        <td>{{ data.Bill.Amount || '-' }}</td>
        <th>实际金额</th>
        <td>{{ data.Bill.DiscountAmount || '-' }}</td>
        <th>最低销售价</th>
        <td>{{ data.Bill.SaleMinPrice || '-' }}</td>
      </tr>
      <tr>
        <th>供货方</th>
        <td colspan="3" style="text-align: left; padding-left: 10px">{{ data.Bill.CompanyName || '-' }}</td>
        <th>提成费</th>
        <td>{{ data.Bill.Percentage || '-' }}</td>
        <th>居间费</th>
        <td>{{ data.Bill.IntroductionFee || '-' }}</td>
        <th>加价费</th>
        <td>{{ data.Bill.MarkupFee || '-' }}</td>
      </tr>
      <tr>
        <th>合作状态</th>
        <td><span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap">{{ GetCooperationVal(data.Bill.Cooperation) }}</span></td>
        <th>供货周期</th>
        <td>{{ data.Bill.DeliveryTime || '-' }}</td>
        <th>税费</th>
        <td>{{ data.Bill.Taxrate || '-' }}</td>
        <th>运费</th>
        <td>{{ data.Bill.Freight || '-' }}</td>
        <th>紧急程度</th>
        <td>{{ GetUrgencyVal(data.Bill.Urgency) || '-' }}</td>
      </tr>
      <tr>
        <th>事业部</th>
        <td>{{ data.Bill.CompName || '-' }}</td>
        <th>业务员</th>
        <td>{{ data.Bill.Salerman || '-' }}</td>
        <th>标牌证件</th>
        <td>{{ GetSignageVal(data.Bill.Signage) || '-' }}</td>
        <th>开票信息</th>
        <td>{{ GetinvoiceTypeVal(data.Bill.InvoiceType) || '-' }}</td>
        <th>物流方式</th>
        <td class="arriveSelect">{{ data.Bill.LogisticsModel || '-' }}</td>
      </tr>
      <tr>
        <th>物款信息</th>
        <td colspan="9" style="white-space: pre-wrap; text-align: left; padding-left: 10px">
          付款信息：<span v-for="(item,index) in data.Paymentlist" :key="index">{{ GetStageTypeVal(item.Stage) }}{{ item.Proportion }}%；</span>
          <span v-for="item in data.Receivinglist" :key="item.Id">&nbsp;收货信息： {{ item.Consignee || '-' }},{{ item.Contacts || '' }},{{ item.Address || '' }},{{ item.Batch }}</span>
        </td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, nextTick, SetupContext } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { GetMaterialBillContractInfo } from '/@/api/tech/Material'
import { empty } from 'handsontable/helpers/dom'
const store = useCommonStore() //记得加这一句


// 合同详情
const MaterialInfo = async (data: any, form:any, context:any) => {
  await GetMaterialBillContractInfo({billId: form.billId}).then((res) => {
    if (res.code == 1) {
      data.Bill = res.data.bill
      data.Receivinglist = res.data.receivinglist
      data.Paymentlist = res.data.paymentlist

      // 向父组件返回销售总价、采购总价、采购比例
      let _InfoData = {
        TotalPurchasePrice: data.Bill.TotalPurchasePrice,
        TotalSaleAmount: data.Bill.TotalSaleAmount,
        ContractRealRate: data.Bill.ContractRealRate,
        AllRate: data.Bill.TotalPurchasePrice > 0 ?((Number(data.Bill.TotalSaleAmount) / Number(data.Bill.TotalPurchasePrice)) * Number(data.Bill.ContractRealRate)).toFixed(2) : '-'
      }
      context.emit('GetInfoData', _InfoData)
    }
  })
}

//获取字典数据
const getDictionaryData = (dic:any) => {
  //合作状态
  store.getDict('sale_Order_Cooperation').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Cooperation = res
  })
  // 紧急程度
  store.getDict('sale_Order_Urgency').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Urgency = res
  })
  //发票种类
  store.getDict('sale_Contract_InvoiceType').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.invoiceType = res
  })
  //付款阶段
  store.getDict('sale_Order_Signage').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Signage = res
  })
  //付款阶段
  store.getDict('sale_Contract_PaymentStage').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.PaymentStage = res
  })
}

const GetDictionaryValue = (dic:any) => {
  getDictionaryData(dic)
  const GetCooperationVal = (val:any) => {
    if(dic.Cooperation.length > 0){
      let _idx = dic.Cooperation.findIndex((item:any) => item.DicKey == val)
      return _idx != -1 ? dic.Cooperation[_idx].DicValue : '-'
    }
  }
  const GetUrgencyVal = (val:any) => {
    if(dic.Urgency.length > 0){
      let _idx = dic.Urgency.findIndex((item:any) => item.DicKey == val)
      return _idx != -1 ?  dic.Urgency[_idx].DicValue : '-'
    }
  }
  const GetSignageVal = (val:any) => {
    if(dic.Signage.length > 0){
      let _idx = dic.Signage.findIndex((item:any) => item.DicKey == val)
      return _idx != -1 ? dic.Signage[_idx].DicValue : '-'
    }
  }
  const GetinvoiceTypeVal = (val:any) => {
    if(dic.invoiceType.length > 0){
      let _idx = dic.invoiceType.findIndex((item:any) => item.DicKey == val)
      return _idx != -1 ? dic.invoiceType[_idx].DicValue : '-'
    }
  }
  const GetStageTypeVal = (val:any) => {
    if(dic.PaymentStage.length > 0){
      let _idx = dic.PaymentStage.findIndex((item:any) => item.DicKey == val)
      return _idx != -1 ? dic.PaymentStage[_idx].DicValue : '-'
    }
  }
  return {
    GetCooperationVal,
    GetUrgencyVal,
    GetinvoiceTypeVal,
    GetStageTypeVal,
    GetSignageVal
  }
}

export default defineComponent({
  emits: ['GetInfoData'],
  setup(props,context: SetupContext) {
    const data = reactive({
      Receivinglist: [],
      Paymentlist: [],
      Bill: {}
    })
    const form = reactive({
      billId: 0,
    })
    const dic = reactive({
      Cooperation: [],
      PaymentStage: [],
      Urgency: [],
      invoiceType: [],
      Signage: []
    })
    const getData = (BillId: number) => {
      form.billId = BillId
      MaterialInfo(data, form, context)
    }
    onMounted(() => {
    })
    return{
      data,
      form,
      dic,
      getData,
      ...GetDictionaryValue(dic),
    }
  }
})
</script>
<style lang="postcss" scoped>
.material_baseInfo th {
  font-size: 14px;
}
.material_baseInfo tr,
.material_baseInfo td {
  font-size: 14px;
  padding: 6px 6px;
  border: 1px solid #eee;
}
</style>
