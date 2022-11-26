<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="m-5">
      <div class="h-24 bg-pink-50 rounded-t-xl tech_AccountingProcessing_ApprovalStatus">
        <div class="float-left text-white w-72 relative ml-8">
          <span class="absolute right-0 top-14">{{ data.CompanyData.CustomerName }}</span>
          <i class="iconfont icon-up absolute -right-5 top-14 arrow" :class="{ open: data.showDetail === 0 }" @click="clickMouseenter"></i>
        </div>
        <div class="float-right h-24 p-3 pt-4">
          <!-- <div class=""> -->
          <div class="w-20 h-16 bg-white rounded-md inline-block mr-3 float-left text-center">
            <p class="text-xs text-red-500 pt-3">优先订单</p>
            <p class="text-xs pt-1">加价处理</p>
          </div>
          <div class="w-80 h-16 bg-yellow-50 rounded-md inline-block mr-3 float-left">
            <div class="flex">
              <div class="w-1/2 h-16 mr-2 pl-3 pt-2">
                <i class="iconfont icon-shijian text-gray-400 mr-1"></i>
                <span class="text-sm font-semibold">2021-09-13</span>
                <p class="text-xs text-gray-400 mt-2">业务时间</p>
              </div>
              <div class="w-1/3 h-16 mr-2 pt-2">
                <div class="text-center">
                  <i class="iconfont icon-fenxi text-blue-300 mr-2"></i>
                  <span class="text-blue-400 cursor-pointer" @click="openWindowHistoricalContract()">{{ data.CustomerOrderStatistics.EffectiveOrderCount || 0 }}</span><span class="text-gray-400 ml-1 mr-1">/</span><span class="text-blue-400 cursor-pointer" @click="openWindowHistoricalQuotation()">{{  data.CustomerOrderStatistics.AllOrderCount || 0 }}</span>
                  <p class="text-xs text-gray-400 mt-2">成交量/报价数</p>
                </div>
              </div>
              <div class="w-1/3 h-16 mr-2 pt-2 pl-2">
                <div class="text-center">
                  <i class="iconfont icon-dunpai text-red-300 mr-2"></i>
                  <span class="text-red-500 cursor-pointer" v-if="data.CompanyData.CreditScore >= 90">好</span>
                  <span class="text-red-500 cursor-pointer" v-else-if="data.CompanyData.CreditScore >= 60">一般</span>
                  <span class="text-red-500 cursor-pointer" v-else-if="data.CompanyData.CreditScore <60">差</span>
                  <span class="text-red-500 cursor-pointer" v-else>暂无</span>
                  <p class="text-xs text-gray-400 mt-2">信用等级</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-16 h-16 bg-green-100 rounded-md inline-block mr-4">
            <div class="text-center text-blue-500 cursor-pointer">
              <i class="iconfont icon-xiaoxi" style="font-size: 30px"></i>
              <p class="text-xs">沟通记录</p>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- #region  上半部分 -->
      <div class="bg-yellow-50 pb-4 rounded-b-xl border-dashed border border-yellow-300 border-t-0 relative">
        <div class="w-24 h-24 bg-blue-50 rounded-lg inline-block absolute -top-10 left-4 z-50">
          <img class="rounded-lg" src="../../../../assets/img/tech/header.jpg" alt="" />
        </div>
        <div class="inline-block ml-36 mt-2">
          <div class="inline-block text-sm mr-4">
            <p>{{ data.CompanyData.CustomerConName || '-' }}</p>
            <p class="text-gray-400 mt-2">联系人</p>
          </div>
          <div class="inline-block text-sm mr-4">
            <p>{{ data.CompanyData.CC_Telephone || '-' }}</p>
            <p class="text-gray-400 mt-2">手机</p>
          </div>
          <div class="inline-block text-sm mt-2">
            <p>{{ '-' }}</p>
            <p class="text-gray-400 mt-2">电话</p>
          </div>
        </div>
        <div class="float-right text-sm mt-3 mr-2">
          <span class="">产品成本：</span>
          <span class="text-orange-400 mr-4">￥{{ data.AllProductPrice }}</span>
          <span>核算成本：</span>
          <span class="text-orange-400 mr-4">￥{{ data.AllAccountAdvancePrice }}</span>
          <span>技术成本：</span>
          <span class="text-orange-400 mr-4">￥{{ data.AllTechAdvancePrice }}</span>
        </div>
        <div :class="data.isfo ? '' : 'yinc'">
          <div class="w-2/3 mt-2 inline-block">
            <p class="text-sm ml-4"><i class="iconfont icon-lianxiren mr-1"></i>业务信息</p>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">报价单位：</span><span>{{ data.CompanyData.CompanyName || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">询价阶段：</span><span>{{ data.CompanyData.IS_State || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">业务员：</span><span>{{ data.CompanyData.SalerName || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">事业部：</span><span>{{ data.CompanyData.CompName || '-' }}</span></p>
            </div>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">报价等级：</span><span>{{ data.CompanyData.Grade || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">询价性质：</span><span>{{ data.CompanyData.IN_State || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">手机：</span><span>{{ data.CompanyData.S_Telephone || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">运费：</span><span>{{ getFreight(data.CompanyData.Freight) || '-' }}</span></p>
            </div>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">税收情况：</span><span>{{ GetTaxType(data.CompanyData.Taxation)}}</span></p>
              <p class="mt-1"><span class="text-gray-400">询价数量：</span><span>{{ data.CompanyData.IQ_State || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">电话：</span><span>{{ data.CompanyData.S_Mobile || '-' }}</span></p>
              <p class="mt-1"><span class="text-gray-400">信用分数：</span><span>{{ data.CompanyData.CreditScore || '-' }}</span></p>
            </div>
          </div>
          <div class="w-1/3 float-right mt-2">
            <div class="text-sm">
              <div class="inline-block">
                <i class="iconfont icon-shujuku"></i>
                <span>附件预览</span>
              </div>
              <div class="inline-block float-right mr-6"><span class="text-orange-400">{{ data.fileList.length }}</span>个</div>
            </div>
            <div>
              <div v-for="item in data.fileList" :key="item" class="text-sm">
                <span>{{item.name}}</span>
                <span class="text-blue-500 ml-2 cursor-pointer" @click="downFiles(item.url, item.name)">预览</span>
                <span class="text-blue-500 ml-2 cursor-pointer" @click="downFiles(item.url, item.name)">下载</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <!-- #region  下半部分-->
      <div class="pt-3 mb-3 clearfix">
        <div class="float-left">
          <div class="inline-block">
            <el-select v-model="form.SupplierGroup" class="m-2" placeholder="分组筛选" @change="SearchGroup">
              <el-option label="全部" value="" />
              <el-option v-for="item in data.options.Groups" :key="item" :label="item" :value="item" />
            </el-select>
          </div>
          <div class="text-blue-500 text-sm inline-block cursor-pointer" @click="approvalStatusFilterings()">
            <i class="iconfont icon-shaixuan mr-2"></i>
            <span>高级筛选</span>
          </div>
        </div>
        <div class="float-right pt-2">
          <el-button type="success" @click="SetProductList"><i class="iconfont icon-jiage mr-2"></i> 技术加价</el-button>
          <el-button type="primary" @click="AddSupplier"><i class="iconfont icon-chuangjian mr-2"></i> 新增供应商</el-button>
        </div>
      </div>
      <!-- #region 产品信息-->
      <div style="overflow: auto">
        <div class="border rounded mb-6 relative" v-for="(item, index) in data.radioData">
          <template v-if="item.children.length == 0">
            <div class="absolute left-0">
              <img class=" w-14 h-14" src="../../../../assets/img/tech/one.png" alt="" v-if="item.QualityLevel == 1">
              <img class=" w-14 h-14" src="../../../../assets/img/tech/two.png" alt="" v-else-if="item.QualityLevel == 2">
              <img class="w-14 h-14" src="../../../../assets/img/tech/three.png" alt="" v-else-if="item.QualityLevel == 3"/>
            </div>
            <!-- 一层 -->
            <el-checkbox v-model="item.BoxChange" size="large" class="ml-4 w-0 inline-block float-left mt-8" v-if="data.checkboxShow"> <br /></el-checkbox>
            <div class="w-2/5 h-24 inline-block ml-8">
              <div class="inline-block mt-3">
                <span class="text-xs text-gray-400 mb-2">产品信息</span>
                <el-tag class="ml-2" type="danger" size="small"><span class="text-xs">{{ item.ProductName }}</span></el-tag>
                <div class="inline-block float-right ml-56">
                  <el-tooltip class="box-item" effect="dark" content=" 点右下角“比对”查看详细属性" placement="top">
                    <i class="iconfont icon-beizhu text-green-500"></i>
                  </el-tooltip>
                </div>
                <p class="text-xs mt-1 mb-2">{{ item.SystemName }}，{{ item.SystemModel }}，{{ item.SystemSpecification }}</p>
                <p class="text-gray-400 text-xs">{{ item.Remark }}</p>
              </div>
              <div class="float-right text-xs mt-8 text-center">
                <p class="text-xs">数量</p>
                <p class="text-gray-400 text-xs mt-1">{{ item.Quantity }}</p>
              </div>
            </div>
            <!-- 一层供应商 -->
            <div class="w-500 h-24 float-right pt-4">
              <div
              class="w-1/6 h-16 mr-4 rounded-tr-md rounded-br-md float-left text-center cursor-pointer"
              v-for="(row, rIdx) in item.NewSupplierPriceList"
              :key="rIdx"
              @click="changeSupplier(item.NewSupplierPriceList, row, -1)"
              :class="row.IsChange && rIdx == 0 ? 'bg-blue-400' :
              row.IsChange && rIdx == 1 ? 'bg-red-400' :
              row.IsChange && rIdx == 2 ? 'bg-yellow-400' :
              row.IsChange && rIdx == 3 ? 'bg-cyan-400' :
              row.IsChange && rIdx == 4 ? 'bg-green-400' : 'border relative'"
              >
                <div
                  class="w-1 h-16 bg-blue-400 inline-block absolute left-0"
                  v-if="!row.IsChange"
                  :class="rIdx == 0 ? 'bg-blue-400' :
                  rIdx == 1 ? 'bg-red-400' :
                  rIdx == 2 ? 'bg-yellow-400' :
                  rIdx == 3 ? 'bg-cyan-400' :
                  'bg-green-400'"
                ></div>
                <div v-if="row.SupplierId">
                  <div class="mt-3">
                    <p class="text-xs" :class="row.IsChange ? 'text-white' : ''">￥<span class="text-sm font-semibold">{{ row.SupplierPrice }}</span></p>
                  </div>
                  <p class="text-gray-400 text-xs flow-2" :class="row.IsChange ? 'text-white' : ''">{{ row.SupplierName }}</p>
                </div>
                <p class="text-gray-400 text-xs mt-6" v-else>暂无</p>
              </div>
            </div>
            <div class="absolute top-22 right-5 w-10 h-5 bg-green-400 leading-4 text-center rounded-b z-50 cursor-pointer">
              <span class="text-xs text-white" @click="comparison()">对比1</span>
            </div>
          </template>
          <!-- #region  二层配件 -->
          <div class="border-t rounded relative bg-blue-50" v-for="(row, rIdx) in item.children" :key="rIdx">
            <div class="absolute left-0">
              <img class=" w-14 h-14" src="../../../../assets/img/tech/one.png" alt="" v-if="row.QualityLevel == 1">
              <img class=" w-14 h-14" src="../../../../assets/img/tech/two.png" alt="" v-else-if="row.QualityLevel == 2">
              <img class="w-14 h-14" src="../../../../assets/img/tech/three.png" alt="" v-else-if="row.QualityLevel == 3"/>
            </div>
            <el-checkbox v-model="row.BoxChange" size="large" class="ml-4 w-0 inline-block float-left mt-8" v-if="data.checkboxShow"> <br /></el-checkbox>
            <div class="w-2/5 h-24 inline-block ml-8">
              <div class="inline-block mt-3">
                <span class="text-xs text-gray-400 mb-2">产品信息</span>
                <el-tag class="ml-2" size="small">{{ row.ProductName }}</el-tag>
                <div class="inline-block float-right ml-56">
                  <el-tooltip class="box-item" effect="dark" content=" 点右下角“比对”查看详细属性" placement="top">
                    <i class="iconfont icon-beizhu text-green-500"></i>
                  </el-tooltip>
                </div>
                <p class="text-xs mt-1 mb-2">{{ row.SystemName }}，{{ row.SystemModel }}，{{ row.SystemSpecification }}</p>
                <p class="text-gray-400 text-xs">{{ row.Remark }}</p>
              </div>
              <div class="float-right text-xs mt-8 text-center">
                <p class="text-xs">数量</p>
                <p class="text-gray-400 text-xs">{{ row.Quantity }}</p>
              </div>
            </div>
            <!-- 二层供应商 -->
            <div class="w-500 h-24 float-right pt-4">
              <div
              class="w-1/6 h-16 bg-white mr-4 rounded-tr-md border rounded-br-md float-left text-center relative cursor-pointer"
              v-for="(t,i) in row.NewSupplierPriceList"
              :key="i"
              @click="changeSupplier(row.NewSupplierPriceList, t, i)"
              :class="t.IsChange && i == 0 ? 'bg-blue-400' :
              t.IsChange && i == 1 ? 'bg-red-400' :
              t.IsChange && i == 2 ? 'bg-yellow-400' :
              t.IsChange && i == 3 ? 'bg-cyan-400' :
              t.IsChange && i == 4 ? 'bg-green-400' :
              'border relatives'">
                <div class="w-1 h-16 bg-blue-400 inline-block absolute left-0" v-if="!t.IsChange" :class="i == 0 ? 'bg-blue-400' : i == 1 ? 'bg-red-400' : i == 2 ? 'bg-yellow-400' : i == 3 ? 'bg-cyan-400' : 'bg-green-400'"></div>
                <div v-if="t.SupplierId">
                  <div class="mt-3">
                    <p class="text-xs" :class="t.IsChange ? 'text-white' : ''">￥<span class="text-sm font-semibold">{{ t.SupplierPrice }}</span></p>
                  </div>
                  <p class="text-gray-400 text-xs flow-2" :class="t.IsChange ? 'text-white' : ''">{{ t.SupplierName }}</p>
                </div>
                <p class="text-gray-400 text-xs mt-6" v-else>暂无</p>
              </div>
            </div>
            <div class="absolute -bottom-5 right-5 w-10 h-5 bg-green-400 leading-4 text-center rounded-b z-50 cursor-pointer">
              <span class="text-xs text-white" @click="comparison()">对比</span>
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </div>
      <!-- #endregion -->

      <div class="float-right mr-2 pt-4 pb-4">
        <el-button @click="RejectProduct">驳回</el-button>
        <el-button type="primary" @click="Submit">提交</el-button>
      </div>
      <!-- #endregion -->
      <!-- 历史合同 -->
      <HistoricalContract title="历史合同" v-if="historicalContractOpenData.visible" :FormData="historicalContractOpenData.formData" @closeWindow="closeWindowHistoricalContract($event)" />
      <!-- 历史合同 -->
      <HistoricalQuotation title="历史报价单" v-if="historicalQuotationOpenData.visible" :FormData="historicalQuotationOpenData.formData" @closeWindow="closeWindowHistoricalQuotation($event)" />
      <!-- 右侧弹出层 -->
      <ApprovalStatusFiltering ref="ApprovalStatusFilteringRef" :visible="data.approvalStatusFiltering" :FormData="data.options" @closeApprovalStatusFiltering="closeApprovalStatusFiltering"/>
      <!-- 技术加价 -->
      <TechnicalMarkup title="技术加价管理" v-if="hechnicalMarkupOpenData.visible" :FormData="hechnicalMarkupOpenData.formData" @closeWindow="closeWindowHechnicalMarkup($event)" />
      <!-- 新增供应商订单比价 -->
      <OrderPriceComparison title="订单比价" v-if="orderPriceComparisonOpenData.visible" :FormData="orderPriceComparisonOpenData.formData" @closeWindow="closeWindowOrderPriceComparison($event)" :EnquiryDataId="form.EnquiryDataId"/>
      <!-- 对比 -->
      <Comparison :visible="data.visibleComparison" @closeComparison="closeComparison" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext, nextTick, watch } from 'vue'
import { PostOrderConfirmProductList, GetProductBasicsSearchfInfo, PostEditConfirmSupplierPriceSave, PostSetEnquiryOrderAccountTreatmSave, GetEnquiryIdToSaleCustomerOrderInfo } from '/@/api/tech/EnquiryData'
import { useCommonStore } from '/@/store/modules/Common'
import { downloadFiles } from '/@/utils/tools'
import HistoricalContract from '../../AccountingProcessing/_Components/HistoricalContract.vue'
import HistoricalQuotation from '../../AccountingProcessing/_Components/HistoricalQuotation.vue'
import ApprovalStatusFiltering from '../../AccountingProcessing/_Components/ApprovalStatusFiltering.vue'
import TechnicalMarkup from '../../AccountingProcessing/_Components/TechnicalMarkup.vue'
import OrderPriceComparison from '../../AccountingProcessing/_Components/OrderPriceComparison.vue'
import Comparison from '../../AccountingProcessing/_Components/comparison.vue'
import { orderPriceComparisonOpen, hechnicalMarkupOpen } from '/@/assets/ts/techOpenWindow'
import { ElMessage } from 'element-plus'

const store = useCommonStore() //记得加这一句
//获取字典数据
const getDictionaryData = (data: any) => {
  // 运费
  store.getDict('sale_Order_FreightType').then((res: any) => {
    data.FreightType = res
  })
  //税收情况
  store.getDict('sale_Order_TaxType').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    data.TaxType = res
  })
}


// 获取产品列表
const getProductList = async (form: any, data: any) => {
  await PostOrderConfirmProductList(form).then(res => {
    if (res.code == 1) {
      // 将主体跟配件合并为同级数组
      // let _mergeData = <any>[]
      // res.data.forEach((item:any) => {
      //   if (item.children.length > 0){
      //     item.children.forEach((row: any) => {
      //       row.ProductName = row.TypeInfo == 1 ? '阀体' : '配件'
      //       row.Quantity = row.Quantity * item.Quantity
      //       _mergeData.push(row)
      //     })
      //   } else {
      //     item.ProductName = '产品'
      //     _mergeData.push(item)
      //   }
      // })
      // --------------------

      let _radioData = res.data
      // let _AllAccountAdvancePrice = <number>0
      // let _AllTechAdvancePrice = <number>0
      // let _AllProductPrice = <number>0
      if (_radioData.length>0) {
        _radioData.forEach((item:any) => {
          // 增加是否选中产品
          item.BoxChange = false
          item.ProductName = '产品'
          // 给主体增加是否选中供应商
          if(item.SupplierPriceList.length > 0){
            item.SupplierPriceList.forEach((row:any) => {
              // 是否已选中供应商
              if (item.SupplierId == row.SupplierId && Number(item.SupplierPrice) == Number(row.SupplierPrice)) {
                row.IsChange = true
              } else {
                row.IsChange = false
              }
            })
          }
          
          // 获取产品、核算、技术成本
          // _AllAccountAdvancePrice += Number(item.AccountAdvancePrice) * Number(item.Quantity)
          // _AllTechAdvancePrice += Number(item.TechAdvancePrice) * Number(item.Quantity)
          // _AllProductPrice += Number(item.SupplierPrice) * Number(item.Quantity)

          // 设置供应商列表为5个
          item.NewSupplierPriceList = <any>[]
          for(let i = 0;i<5;i++){
            if(item.SupplierPriceList[i] != null)
            item.NewSupplierPriceList.push(item.SupplierPriceList[i])
            else
            item.NewSupplierPriceList.push({})
          }

          if (item.children.length > 0) {
            item.children.forEach((row:any) => {
              // 增加是否选中产品
              item.BoxChange = false
              row.ProductName = row.TypeInfo == 1 ? '阀体' : '配件'
              // 给配件增加是否选中供应商
              if (row.SupplierPriceList.length > 0) {
                row.SupplierPriceList.forEach((son:any) => {
                  if (row.SupplierId == son.SupplierId && Number(row.SupplierPrice) == Number(son.SupplierPrice)) {
                    son.IsChange = true
                  } else {
                    son.IsChange = false
                  }
                })
              }

              // 获取产品、核算、技术成本
              // _AllAccountAdvancePrice += Number(item.AccountAdvancePrice) * Number(item.Quantity)
              // _AllTechAdvancePrice += Number(item.TechAdvancePrice) * Number(item.Quantity)
              // _AllProductPrice += Number(item.SupplierPrice) * Number(item.Quantity)

              // 设置供应商列表为5个
              row.NewSupplierPriceList = <any>[]
              for(let i = 0;i<5;i++){
                if(row.SupplierPriceList[i]!= null)
                row.NewSupplierPriceList.push(row.SupplierPriceList[i])
                else
                row.NewSupplierPriceList.push({})
              }
            })
          }
        })
      }
      
      data.radioData = _radioData
      // data.AllAccountAdvancePrice = (_AllAccountAdvancePrice).toFixed(2)
      // data.AllTechAdvancePrice = (_AllTechAdvancePrice).toFixed(2)
      // data.AllProductPrice = (_AllProductPrice).toFixed(2)
    } else {
      ElMessage.error(res.message)
    }
  })
}

// 获取分组列表
const GroupList = async (form:any, data: any, ApprovalStatusFilteringRef: any) => {
  GetProductBasicsSearchfInfo({EnquiryDataId:form.EnquiryDataId}).then(res => {
    if(res.code == 1){
      data.options = res.data
      ApprovalStatusFilteringRef.value.setCheckList()
    } else {
      ElMessage.error(res.message)
    }
  })
}

export default defineComponent({
  components: {
    OpenWindow,
    HistoricalContract,
    HistoricalQuotation,
    ApprovalStatusFiltering,
    TechnicalMarkup,
    OrderPriceComparison,
    Comparison
  },
  props: {
    FormData:{
      type: Object,
      default: {
        EnquiryDataId: 0, // 询价单id
        IsConfirmSupplier: 0 // 厂家是否确认
      }
    }
  },
  emits: ['closeApprovalStatusFiltering', 'closeWindow'],
  setup(props, context: SetupContext) {
    const ApprovalStatusFilteringRef = ref<any>(null)
    const radio1 = ref([])
    const data = <any>reactive({
      visibleComparison: false,
      approvalStatusFiltering: false,
      isfo: false,
      showDetail: -1,
      options: [],
      radioData: [],
      storeInfo: {},
      IsConfirmSupplier: 0,
      checkboxShow: false,
      CompanyData: {},
      CustomerOrderStatistics: [],
      FreightType: [],
      TaxType: [],
      fileList: [],
      AllAccountAdvancePrice: 0, // 核算成本
      AllTechAdvancePrice: 0, // 技术成本
      AllProductPrice: 0, // 产品成本
    })

    const getData = () => {
      getProductList(form, data)
    }
    
    const Markup=hechnicalMarkupOpen({data, getData})
    const ComparisonOpen=orderPriceComparisonOpen({data, getData})

    const form = <any>reactive({
      EnquiryDataId: 0, // 询价单ID
      SupplierGroup: '', // 组id
      ProductNames: [], // 名称
      Models: [], // 型号
      Specifications: [], // 规格
    })

    const count = ref(0)
    const load = () => {
      count.value += 2
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      SetBuffer()
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })
    const clickMouseenter = () => {
      data.isfo = !data.isfo

      if (!data.isfo) {
        data.showDetail = -1
      } else {
        data.showDetail = 0
      }
    }

    // 获取公司信息
    const getCompany = () => {
      GetEnquiryIdToSaleCustomerOrderInfo(form.EnquiryDataId).then(res => {
        if (res.code == 1) {
          data.CompanyData = res.data.bill
          data.CustomerOrderStatistics = res.data.CustomerOrderStatistics
          data.fileList = JSON.parse((res.data.bill || {}).FileList || '[]')
        }
      })
    }

    const approvalStatusFilterings = () => {
      data.approvalStatusFiltering = true
    }
    // 关闭抽屉 高级筛选
    const closeApprovalStatusFiltering = (val:any) => {
      form.ProductNames = val[0].ChangeList
      form.Models = val[1].ChangeList
      form.Specifications = val[2].ChangeList
      getProductList(form, data)
      data.approvalStatusFiltering = false
    }
    // 对比
    const comparison = () => {
      data.visibleComparison = true
    }
    const closeComparison = () => {
      data.visibleComparison = false
    }
    // 获取运费
    const getFreight = (val: number) => {
      let str = '-'
      if (val != undefined) {
        let _obj = data.FreightType.find((x: any) => x.DicKey == val.toFixed(0))
        if (_obj) str = _obj.DicValue
      }
      return str
    }
    const GetTaxType = (val:any) => {
      let _index = data.TaxType.findIndex((item:any) => item.DicKey == val )
      if (_index>=0){
        return data.TaxType[_index].DicValue
      } else {
        return '-'
      }
    }

    const AddSupplier = () => {
      
      let _ProductIds = <any>[]
      if (data.radioData.length > 0) {
        data.radioData.forEach((item:any) => {
          if(item.BoxChange) {
            _ProductIds.push(item.Id)
          }
          if (item.children && item.children.length > 0) {
            item.children.forEach((row:any) => {
              if (row.BoxChange){
                _ProductIds.push(row.Id)
              }
            })
          }
        })
      }
      
      if(_ProductIds.length <= 0) {
        ElMessage.error('请至少选择一个产品')
        return false
      }

      ComparisonOpen.openWindowOrderPriceComparison('', _ProductIds)
    }

    //  关闭抽屉 对比
    // 历史合同
    const historicalContractOpen = (data: any) => {
      let historicalContractOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHistoricalContract = (val: any) => {
        historicalContractOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        historicalContractOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHistoricalContract = (type: string) => {
        historicalContractOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        historicalContractOpenData,
        openWindowHistoricalContract,
        closeWindowHistoricalContract
      }
    }
    // 历史报价单
    const historicalQuotationOpen = (data: any) => {
      let historicalQuotationOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHistoricalQuotation = (val: any) => {
        historicalQuotationOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        historicalQuotationOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHistoricalQuotation = (type: string) => {
        historicalQuotationOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        historicalQuotationOpenData,
        openWindowHistoricalQuotation,
        closeWindowHistoricalQuotation
      }
    }

    const SearchGroup = () => {
      form.page = 1
      getProductList(form, data)
    }

    // 选择供应商
    const changeSupplier = (list:any, val:any, i: any) =>{
      // 厂家确认后不可编辑供应商
      // if (data.IsConfirmSupplier == 1) {
      //   ElMessage.error('厂家已确认，请勿反复修改')
      //   return false
      // }

      // 判断是否有供应商
      if(val.SupplierId){
        // 将该行选中状态统一设置为false
        list.forEach((item:any) => {
          item.IsChange = false
        })
        val['IsChange'] = true
      }
    }

    // 技术加价
    const SetProductList = () => {
      let _radioData = <any>[]
      // 整理选中产品
      data.radioData.forEach((item:any) => {
        // 选中供应商
        let _Supplier = <any>{}
        let _SupplierIndex = <number>item.NewSupplierPriceList.findIndex((x:any)=>x.IsChange)
        _Supplier = item
        if(_SupplierIndex >= 0){
          _Supplier.SupplierList = item['NewSupplierPriceList'][_SupplierIndex]
        }else{
          _Supplier.SupplierList = {}
        }
        _radioData.push(_Supplier)

        if(item.children.length > 0){
          item.children.forEach((row:any) => {
            let _SupplierSon = <any>{}
            let _SupplierSonIndex = <number>row.NewSupplierPriceList.findIndex((x:any)=>x.IsChange)
            _SupplierSon = row
            if(_SupplierSonIndex >= 0){
              _SupplierSon.SupplierList = row['NewSupplierPriceList'][_SupplierSonIndex]
            }else{
              _Supplier.SupplierList = {}
            }
            _radioData.push(_SupplierSon)
          })
        }
        // 是否选中
        _Supplier.SupplierChange = true
      })


      Markup.openWindowHechnicalMarkup({EnquiryDataId: form.EnquiryDataId, ProductList: _radioData})
    }

    // 核算单质量提交
    const Submit = () => {
      try{
        let _data = <any>[]
        data.radioData.forEach((item:any) => {
          // 有配件的产品不循环父级
          if(item.children.length == 0) {
            // 获取选中供应商索引
            let _SupplierIndex = <number>item.NewSupplierPriceList.findIndex((x:any)=>x.IsChange)
            if (_SupplierIndex == -1) { // 若有未选中供应商跳出循环
              throw new Error('End Loop')
            } else {
              _data.push({
                ProductId: item.Id, // 产品id
                EnquiryDataId: form.EnquiryDataId, // 询价单id
                Price: item['NewSupplierPriceList'][_SupplierIndex]['SupplierPrice'], // 供应商价格
                SupplierId: item['NewSupplierPriceList'][_SupplierIndex]['SupplierId'], // 供应商id
              })
            }
          }
          

          // 配件
          if(item.children.length > 0){
            item.children.forEach((row:any) => {
              let _SupplierSonIndex = <number>row.NewSupplierPriceList.findIndex((x:any)=>x.IsChange)
              if (_SupplierSonIndex == -1) { // 若有未选中供应商跳出循环
                throw new Error('End Loop')
              } else{
                _data.push({
                  ProductId: row.Id, // 产品id
                  // EnquiryDataId: form.EnquiryDataId, // 询价单id
                  Price: row['NewSupplierPriceList'][_SupplierSonIndex]['SupplierPrice'], // 供应商价格
                  SupplierId: row['NewSupplierPriceList'][_SupplierSonIndex]['SupplierId'], // 供应商id
                })
              }
            })
          }
        })
        
        PostEditConfirmSupplierPriceSave(form.EnquiryDataId, _data).then(res => {
          res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
          if(res.code == 1){
            context.emit('closeWindow', 'submit')
          }
        })
      } catch (e:any) {
        if(e.message === 'End Loop') {
          ElMessage.error('供应商有拉漏')
        }
      }
    }

    // 核算质量驳回
    const RejectProduct = () => {
      PostSetEnquiryOrderAccountTreatmSave(form.EnquiryDataId).then(res => {
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
        if(res.code == 1){
          context.emit('closeWindow', 'submit')
        }
      })
    }

    // 加入缓存
    const SetBuffer = () =>{
      let GroupStoreList = <any>localStorage.getItem('GroupStoreList') || ''
      let storage = <any>GroupStoreList ? JSON.parse(GroupStoreList) : {}
      let EnquiryDataId = <any>form.EnquiryDataId
      storage[EnquiryDataId] = data.radioData
      localStorage.setItem('GroupStoreList', JSON.stringify(storage))
    }

    // 读取缓存
    const GetBuffer = () =>{
      let _EnquiryDataId = <any>''
      let GroupStoreList = <any>localStorage.getItem('GroupStoreList') || ''
      data.storeInfo = GroupStoreList ? JSON.parse(GroupStoreList) : ''
      if (data.storeInfo != '') {
        // 查询缓存中是否存在相同询价单id
        for (let i in data.storeInfo) {
          if (i == form.EnquiryDataId) {
            _EnquiryDataId = i
            break
          }
        }
      }
      // 没有缓存该询价单或已厂家确认的重新获取数据否则走缓存
      if (!_EnquiryDataId || data.IsConfirmSupplier) {
        getProductList(form, data)
      } else {
        nextTick(()=>{
          data.radioData = data.storeInfo[_EnquiryDataId]
        })
      }
    }

    // 清空当条缓存
    const cleanOneBuffer = () => {
      delete data.storeInfo[form.EnquiryDataId]
      if (data.storeInfo != '') {
        localStorage.setItem('GroupStoreList', JSON.stringify(data.storeInfo))
      } else {
        localStorage.setItem('GroupStoreList', '')
      }
    }

    //下载文件
    const downFiles = (url: string, name: string) => {
      downloadFiles({ url, name })
    }

    watch(
      () => data.radioData,
      (nowList) => {
        let _AllAccountAdvancePrice = <number>0
        let _AllTechAdvancePrice = <number>0
        let _AllProductPrice = <number>0
        if(nowList.length > 0) {
          nowList.forEach((item:any) => {
            if(item.SupplierPriceList.length > 0){
              item.SupplierPriceList.forEach((row:any) => {
                if(row.IsChange){
                  // 获取产品、核算、技术成本
                  _AllProductPrice += Number(row.SupplierPrice) * Number(item.Quantity)
                  _AllAccountAdvancePrice += Number(row.SupplierPrice) * Number(item.Quantity) * (1 + (Number(item.AccountAdvanceRate) / 100))
                  _AllTechAdvancePrice += Number(row.SupplierPrice) * Number(item.Quantity) * (1 + (Number(item.AccountAdvanceRate) + Number(item.TechAdvanceRate)) / 100)
                }
              })
            }
            // 配件、阀体
            if(item.children.length > 0){
              item.children.forEach((row:any) => {
                if(row.SupplierPriceList.length > 0){
                  row.SupplierPriceList.forEach((son:any) => {
                    if(son.IsChange){
                      // 获取产品、核算、技术成本
                      _AllProductPrice += Number(son.SupplierPrice) * Number(row.Quantity)
                      _AllAccountAdvancePrice += Number(son.SupplierPrice) * Number(row.Quantity) * (1 + Number(row.AccountAdvanceRate) / 100)
                      _AllTechAdvancePrice += Number(son.SupplierPrice) * Number(row.Quantity) * (1 + (Number(row.AccountAdvanceRate) + Number(row.TechAdvanceRate))/100)
                    }
                  })
                }
              })
            }
          })
        }
        data.AllAccountAdvancePrice = _AllAccountAdvancePrice
        data.AllTechAdvancePrice = _AllTechAdvancePrice
        data.AllProductPrice = _AllProductPrice
      },
      { deep: true }
    );

    onMounted(() => {
      form.EnquiryDataId = props.FormData.EnquiryDataId
      data.IsConfirmSupplier = props.FormData.IsConfirmSupplier
      
      //获取字典数据
      getDictionaryData(data)

      getCompany() // 获取公司信息
      getProductList(form, data)
      // GetBuffer()
      GroupList(form, data, ApprovalStatusFilteringRef)

      nextTick(()=>{
        data.checkboxShow = true
      })
    })

    return {
      closeWindow,
      data,
      form,
      boxStyle,
      clickMouseenter,
      radio1,
      count,
      load,
      Submit,
      downFiles,
      changeSupplier,
      SetProductList,
      AddSupplier,
      SearchGroup,
      ...historicalContractOpen({ data }),
      ...historicalQuotationOpen({ data }),
      ...Markup,
      ...ComparisonOpen,
      closeApprovalStatusFiltering,
      approvalStatusFilterings,
      comparison,
      closeComparison,
      SetBuffer,
      GetBuffer,
      cleanOneBuffer,
      ApprovalStatusFilteringRef,
      RejectProduct,
      getFreight,
      GetTaxType,
      getData
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_AccountingProcessing_ApprovalStatus {
  background-image: url('/@/assets/img/tech/hesuan.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.arrow {
  width: 18px;
  height: 18px;
  display: inline-block;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  &.open {
    transform: rotate(180deg);
  }
}
.yinc {
  height: 0;
  overflow: hidden;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
:deep(.el-checkbox__label) {
  padding-left: 0;
  color: #ffffff;
}
::v-depp(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #ffffff;
}
.flow-2{
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
