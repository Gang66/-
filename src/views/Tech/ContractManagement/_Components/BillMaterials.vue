<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="py-4 px-4 tech_contractManagement_billMaterials">
      <div class="material_baseInfo">
        <div id="printMe" class="px-2">
          <p class="text-xl text-center">北方阀门集团物料采购单</p>
          <p class="float-left text-sm">{{ data.Bill.BillNo || '-' }}</p>
          <p class="text-sm float-right mb-3">{{ data.Bill.AgreeDate || '-' }}</p>
          <div class="bf-table-style pt-2 text-xl">
            <table border="1" class="relative" style="border-collapse: collapse; width: 100%; text-align: center">
              <colgroup>
                <col width="10%" />
                <col width="14%" />
                <col width="8%" />
                <col width="8%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
                <col width="10%" />
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
                <td>{{ data.Bill.PercentageRate || '-' }}</td>
                <th>居间费</th>
                <td>{{ data.Bill.IntroductionFee || '-' }}</td>
                <th>加价费</th>
                <td>{{ data.Bill.MarkupFee || '-' }}</td>
              </tr>
              <tr>
                <th>合作状态</th>
                <td><span style="text-overflow: ellipsis; overflow: hidden; white-space: nowrap">{{ GetCooperationVal(data.Bill.Cooperation) }}</span></td>
                <th>供货周期</th>
                <td>
                  <!-- <el-input v-model="form.LogisticsModel" v-if="!data.DemanderOk && data.type == 1" placeholder="请输入内容" /> -->
                  <span>{{ data.Bill.DeliveryTime || '-' }}</span>
                </td>
                <th>税费</th>
                <td>{{ data.Bill.Taxrate || '-' }}</td>
                <th>运费</th>
                <td>{{ data.Bill.FreightRate || '-' }}</td>
                <th>紧急程度</th>
                <td>{{ GetUrgencyVal(data.Bill.Urgency) || '-' }}</td>
              </tr>
              <tr>
                <th>事业部</th>
                <td>{{ data.Bill.CompName || '-' }}</td>
                <th>业务员</th>
                <td>{{ data.Bill.SalerName || '-' }}</td>
                <th>标牌证件</th>
                <td>{{ GetSignageVal(data.Bill.Signage) || '-' }}</td>
                <th>开票信息</th>
                <td>{{ GetinvoiceTypeVal(data.Bill.InvoiceType) || '-' }}</td>
                <th>物流方式</th>
                <td>
                  <el-select v-if="!data.DemanderOk && data.type == 1" v-model="form.LogisticsModel" placeholder="请选择物流方式">
                    <el-option label="快递配送" value="快递配送">快递配送</el-option>
                    <el-option label="物流站自提" value="物流站自提">物流站自提</el-option>
                    <el-option label="送货到厂" value="送货到厂">送货到厂</el-option>
                  </el-select>
                  <span v-else>{{ form.LogisticsModel }}</span>
                </td>
              </tr>
              <tr>
                <th>物款信息</th>
                <td colspan="9" style="white-space: pre-wrap; text-align: left; padding-left: 10px">
                  付款信息：<span v-for="(item,index) in data.Paymentlist" :key="index">{{ GetStageTypeVal(item.Stage) }}{{ item.Proportion }}%；</span>
                  <span v-for="item in data.Receivinglist" :key="item.Id">&nbsp;收货信息： {{ item.Consignee || '-' }},{{ item.Contacts || '' }},{{ item.Address || '' }},{{ item.Batch }}</span>
                </td>
              </tr>
              <tr v-if="data.type == 1">
                <td colspan="10" style="white-space: pre-wrap; text-align: left; padding-left: 10px">
                  <div class="clearfix">
                    <div class="float-right">
                      <p><span class="text-red-500">【审核】</span> 请确认供货期及物款信息是否正确</p>
                      <el-button type="primary" class="float-right mt-2 mb-2" @click="DemanderClick(1)"> <i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
                    </div>
                  </div>
                </td>
              </tr>
              <img src="../../../../assets/img/tech/ContractApproval/ok.png" class="w-24 h-20 absolute right-8 bottom-16" alt="" v-if="data.DemanderOk && data.type"/>
            </table>
            <table border="1" class="relative" style="border-collapse: collapse; width: 100%; text-align: center; margin-top: 20px">
              <!-- <thead>
                <tr>
                  <th>序号</th>
                  <th v-for="(item,idx) in data.Bill.ColumnData2" :key="idx">{{item.rename == '' ? item.colname : item.rename}}</th>
                </tr>
              </thead> -->
              <thead>
                <tr>
                  <th>序号</th>
                  <th>产品名称</th>
                  <th>型号</th>
                  <th>规格</th>
                  <th>单位</th>
                  <th>数量</th>
                  <th>单价</th>
                  <th>金额</th>
                  <th>备注</th>
                </tr>
              </thead>
              <tbody>
                <!-- <tr v-for="(item,index) in data.Bill.DetailList2" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td v-for="(itm,idx) in data.Bill.ColumnData2" :key="idx">{{ item[itm.name] || '-' }}</td>
                </tr>
                <tr>
                  <td colspan="2">总计金额</td>
                  <td :colspan="data.Bill.ColumnData2 && data.Bill.ColumnData2.length - 4">大写：{{ toChies(data.Bill.Amount) }}</td>
                  <td>小写</td>
                  <td colspan="2">￥{{ data.Bill.Amount }}</td>
                </tr> -->
                <tr v-for="(item,index) in data.Bill.DetailList2" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.Name || '-' }}</td>
                  <td>{{ item.Model || '-' }}</td>
                  <td>{{ item.Specifications || '-' }}</td>
                  <td>{{ item.Unit || '-' }}</td>
                  <td>{{ item.Quantity || '-' }}</td>
                  <td>{{ item.Price || '-' }}</td>
                  <td>{{ item.Amount || '-' }}</td>
                  <td>{{ item.Note || '-' }}</td>
                </tr>
                <tr>
                  <td colspan="2">总计金额</td>
                  <td colspan="4">大写：{{ toChies(data.Bill.Amount) }}</td>
                  <td>小写</td>
                  <td colspan="2">￥{{ data.Bill.Amount }}</td>
                </tr>
                <tr v-if="data.type == 1">
                  <td colspan="10" style="white-space: pre-wrap; text-align: left; padding-left: 10px">
                    <div class="clearfix">
                      <div class="float-right">
                        <p><span class="text-red-500">【审核】</span> 请确认供货期及物款信息是否正确</p>
                        <el-button type="primary" class="float-right mt-2 mb-2" @click="DemanderClick(2)"> <i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">备注</td>
                  <td colspan="7">
                    <el-input v-model="form.Remark" placeholder="请输入内容" v-if="!data.RemarksOk && data.type == 1"/>
                    <div style="text-align: left" v-else>{{ form.Remark }}</div>
                  </td>
                </tr>
                <tr>
                  <td colspan="2">合同特殊条款</td>
                  <td colspan="7">
                    <el-input v-model="form.SpecialExplain" placeholder="请输入内容" v-if="!data.RemarksOk && data.type == 1"/>
                    <div style="text-align: left" v-else>{{ form.SpecialExplain }}</div>
                  </td>
                </tr>
                <tr v-if="data.type == 1">
                  <td colspan="9" style="white-space: pre-wrap; text-align: left; padding-left: 10px">
                    <div class="clearfix">
                      <div class="float-right">
                        <p><span class="text-red-500">【审核】</span> 请确认供货期及物款信息是否正确</p>
                        <el-button type="primary" class="float-right mt-2 mb-2" @click="DemanderClick(3)"> <i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td colspan="9" style="border: 0px">
                    <div class="w-full flex px-4">
                      <div style="text-align: left;flex:1;border: 0px">编制：</div>
                      <div style="text-align: left;flex:1;border: 0px">物采经理：</div>
                      <div style="text-align: left;flex:1;border: 0px">运营总监：</div>
                      <div style="text-align: left;flex:1;border: 0px">总经理：</div>
                      <div style="text-align: left;flex:1;border: 0px">财务复核：</div>
                    </div>
                    
                  </td>
                  
                </tr>
              </tbody>
              <img src="../../../../assets/img/tech/ContractApproval/ok.png" class="w-24 h-20 absolute right-8 bottom-72" alt="" v-if="data.ProductOk && data.type"/>
              <img src="../../../../assets/img/tech/ContractApproval/ok.png" class="w-24 h-20 absolute right-8 bottom-28" alt="" v-if="data.RemarksOk && data.type"/>
            </table>
          </div>
        </div>
      </div>
      <!-- #endregion -->
      <div class="mt-4 clearfix" v-if="data.viewType != 4">
        <div class="float-left">
          <el-button type="success">合同确认 <i class="iconfont icon-wancheng ml-2"></i></el-button>
          <el-button @click="openWindowOrderAnalysis(1)" type="success">订单确认 <i class="iconfont icon-wancheng ml-2"></i></el-button>
          <el-button @click="MaterialClick()" type="success" v-if="data.DemanderOk && data.ProductOk && data.RemarksOk && !data.type">物料确认 <i class="iconfont icon-wancheng ml-2"></i></el-button>
          <el-button @click="MaterialClick()" v-else>物料确认 <i class="iconfont icon-wancheng ml-2"></i></el-button>
        </div>
        <div class="float-right" v-if="data.EndStatus != 1">
          <template v-if="data.type == 1">
            <el-button @click="data.type = 0">取消</el-button>
            <el-button type="primary" @click="submit()" :disabled="data.EndStatus == 1">确认</el-button>
          </template>
          <template v-else>
            <el-button @click="closeWindow('close')">取消</el-button>
            <el-button type="primary" v-print="print" @click="PrintShow">打印</el-button>
          </template>
        </div>
      </div>


      <div class="px-2">
        <template v-if="data.viewType != 1">
          <!-- 审批记录 -->
          <slot name="ApprovalProcess"></slot>
          <!-- 审批 -->
          <template v-if="data.viewType == 4">
            <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
            <div class="bf-search-formItem ">
              <div class="text-center w-full mt-4">
                <el-button type="danger" @click="ApprovalForm(0)">驳 回</el-button>
                <el-button type="primary" @click="ApprovalForm(1)">审 批</el-button>
              </div>
            </div>
          </template>
        </template>
      </div>
      <!-- 订单分析 -->
      <!-- :title="orderAnalysisOpenData.formData.ClientName + '的订单分析'" -->
      <Acknowledgement title="订单分析" v-if="orderAnalysisOpenData.visible" :FormData="orderAnalysisOpenData.formData" @closeWindow="closeWindowOrderAnalysis($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted, nextTick } from 'vue'
import { GetContractInfo, } from '/@/api/Sale/Contract'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import Acknowledgement from './Acknowledgement.vue'
import { orderAnalysisOpen } from '/@/assets/ts/techOpenWindow'
import { useCommonStore } from '/@/store/modules/Common'
import { PostInsertEditMaterialSave, GetMaterialBillContractInfo, PostApprovalMaterialBillSave } from '/@/api/tech/Material'
import { ElMessage } from 'element-plus'
import { remoteUrl, toChies, parseTime, getTime } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句

// 新增时根据合同id查询
const ContractInfo = async (data: any, form:any) => {
  await GetContractInfo({Id: form.Id}).then((res) => {
    if (res.code == 1) {
      let _Bill = res.data.bill
      let FieldData1List = JSON.parse(_Bill.FieldData1)
      let FieldDataValue1List = JSON.parse(_Bill.FieldDataValue1)
      _Bill.ColumnData2 = getTableColumn(FieldDataValue1List,FieldData1List)
      _Bill.DetailList2 = res.data.entities || []
    
      data.Bill = _Bill
      console.log(_Bill, 222)
      data.Receivinglist = res.data.receivinglist
      data.Paymentlist = res.data.paymentlist
      // form.LogisticsModel: '',
      // form.Remark: '',
      // form.SpecialExplain: '',
    }
  })
}

// 查看，审批时根据物料单id查询
const MaterialInfo = async (data: any, form:any) => {
  await GetMaterialBillContractInfo({billId: form.Id}).then((res) => {
    if (res.code == 1) {
      let _Bill = res.data.bill
      // let FieldData1List = JSON.parse(_Bill.FieldData1)
      // let FieldDataValue1List = JSON.parse(_Bill.FieldDataValue1)
      // _Bill.ColumnData2 = getTableColumn(FieldDataValue1List,FieldData1List)
      _Bill.DetailList2 = res.data.entities || []
      
      
      data.Bill = _Bill
      form.LogisticsModel = _Bill.LogisticsModel
      data.Receivinglist = res.data.receivinglist
      data.Paymentlist = res.data.paymentlist
      // form.LogisticsModel: '',
      // form.Remark: '',
      // form.SpecialExplain: '',
    }
  })
}

///获取列表列
const getTableColumn = (ValueList: any, DataList: any) => {
  var columns: any = []
  ValueList.forEach((item: any) => {
    var index = DataList.findIndex((f: any) => f.id == item)
    if (index >= 0) {
      var column = DataList[index]
      columns.push(column)
    }
  })
  return columns
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
  components: {
    OpenWindow,
    Acknowledgement
  },
  props: {
    info: {
      type: Object,
      default: {
        checkId: null,
        Id: null,
        // 显示类型 1 添加 2修改 3查看 4审批
        viewType: 1
      }
    },
    FormData: {
      type: Object,
      default: {}
    },
    DataId: {
      type: Number,
      default: 0
    },
    // 显示类型 1 添加 2修改 3查看 4审批
    viewType: {
      type: Number,
      default: 1
    },
    // 审批checkId
    checkId: {
      type: Number,
      default: null
    },
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      DemanderOk: 0,
      ProductOk: 0,
      RemarksOk: 0,
      Bill: {},
      Receivinglist: [],
      Paymentlist: [],
      type: 0, // 0基础状态，1物料确认
      EndStatus: 0,

      viewType: 0,
      Approval: {
        remark: ''
      },
      form: {
        Id: 0,
        UserName: '',
        CompName: '',
        DeptName: '',
        PostName: '',
        CompId: 0,
        DeptId: 0,
        PostId: 0,
        CreateOn: parseTime(getTime('day'), ''),
        Amount: 0
      }
    })
    const dic = reactive({
      Cooperation: [],
      PaymentStage: [],
      Urgency: [],
      invoiceType: [],
      Signage: []
    })

    const form = reactive({
      Id: 0,
      LogisticsModel: '',
      Remark: '',
      SpecialExplain: '',
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })
    //物料确认
    const MaterialClick = () => {
      data.type = 1
    }
    // 确认合同
    const submit = () => {
      if (!data.DemanderOk || !data.ProductOk || !data.RemarksOk) {
        ElMessage.error('请全部确认无误后再进行提交')
        return false
      }
      PostInsertEditMaterialSave(form).then(res=>{
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
        if(res.code == 1) {
          data.EndStatus = 1
          data.type = 0
        }
      })
    }
    // 确认无误
    const DemanderClick = (num: any) => {
      if (num == 1) {
        data.DemanderOk = 1
      } else if (num == 2) {
        data.ProductOk = 1
      } else if (num == 3) {
        data.RemarksOk = 1
      }
    }
    const getData = () => {}
    const PrintShow = () => {
    }
    let print = reactive({
      id: 'printMe',
      popTitle: '物料单',
      openCallback() {
        console.log('点击v-print绑定的按钮了！')
      },
      closeCallback() {
        console.log('关闭了打印工具！')
      }
    })

    const ApprovalForm = (num: number) => {
      var arr = {
        checkId: props.info.checkId,
        state: num,
        remark: data.Approval.remark,
        dataid: form.Id,
        sign: '',
        workLog: '',
      }
      
      PostApprovalMaterialBillSave(arr).then((res: any) => {
        if (res.code == 1) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
          closeWindow('submit')
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    onMounted(()=>{
      console.log(props, 888)
      if (props.info.viewType != 1) {
        data.viewType = props.info.viewType
      } else {
        data.viewType = props.viewType
      }

      // 不可编辑审核，查看
      console.log(props, 888)
      if (data.viewType == 3 || data.viewType == 4) {
        data.EndStatus = 1
      }
      form.Id = props.info.Id ? props.info.Id : props.FormData.Id
      console.log(form.Id)

      // // 当状态为审核通过或审核中时不可编辑
      // if(props.FormData.BillId > 0){
      //   data.EndStatus = 1
      // }

      if (data.EndStatus == 1) {
        data.DemanderOk = 1
        data.ProductOk = 1
        data.RemarksOk = 1
      }
      
      if (data.viewType == 1) {
        ContractInfo(data, form)
      }else {
        MaterialInfo(data,form)
      }
      
    })
    return {
      boxStyle,
      closeWindow,
      data,
      dic,
      form,
      MaterialClick,
      DemanderClick,
      ...orderAnalysisOpen({ data, getData }),
      ...GetDictionaryValue(dic),
      toChies,
      print,
      submit,
      PrintShow,
      ApprovalForm
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_contractManagement_billMaterials {
  .material_baseInfo th {
    font-size: 14px;
  }
  .material_baseInfo tr,
  .material_baseInfo td {
    font-size: 14px;
    padding: 6px 6px;
    border: 1px solid #333;
  }
  :deep(.el-input__inner) {
    color: #409eff !important;
  }
}
</style>
