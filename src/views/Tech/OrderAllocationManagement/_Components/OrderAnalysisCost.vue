<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="tech_OrderAllocationManagement_OrderAnalysis">
      <div class="h-14 bg-blue-50">
        <div class="p-2 pl-6">
          <div class="inline-block float-left">
            <!-- 必跟 -->
            <img v-if="data.orderInfo.Grade == 'A'" src="../../../../assets/img/tech/bigen.png" alt="" />
            <!-- 重要 -->
            <img v-else-if="data.orderInfo.Grade == 'B'" src="../../../../assets/img/tech/zhongyao.png" alt="" />
            <!-- 普通 -->
            <img v-else-if="data.orderInfo.Grade == 'C'" src="../../../../assets/img/tech/putong.png" alt="" />
          </div>
          <div class="inline-block ml-3 mt-1">
            <span>{{ data.orderInfo.CustomerName }}</span>
            <!-- <i class="iconfont icon-goutong text-yellow-500 ml-3"></i> -->
            <img class="inline-block w-6 h- ml-3" src="../../../../assets/img/tech/xaioxi.png" alt="" />
          </div>

          <div class="float-right">
            <el-button type="primary" size="small">预览报价单</el-button>
          </div>
        </div>
      </div>

      <div class="h-72 p-5">
        <div class="w-72 h-52 inline-block">
          <div class="h-14">
            <div class="w-28 h-14 inline-block">
              <div class="w-8 h-8 bg-blue-100 rounded text-center text-xl text-blue-400 inline-block">
                <i class="iconfont icon-name"></i>
              </div>
              <div class="inline-block ml-3 align-bottom">
                <p class="text-sm">{{ data.orderInfo.CustomerConName }}</p>
                <p class="text-xs text-gray-400">联系人</p>
              </div>
            </div>
            <div class="w-36 h-14 inline-block float-right">
              <div class="w-8 h-8 bg-yellow-100 rounded text-center text-xl text-yellow-400 inline-block">
                <i class="iconfont icon-iPhone"></i>
              </div>
              <div class="inline-block ml-3 align-bottom">
                <p class="text-sm">{{ data.orderInfo.CC_Telephone }}</p>
                <p class="text-xs text-gray-400">手机</p>
              </div>
            </div>
          </div>

          <div class="flex">
            <div class="w-44 h-40 text-sm text-center relative cursor-pointer" @click="openWindowCreditReport()">
              <img class="w-28 m-auto" src="../../../../assets/img/tech/xinyong.png" alt="" />
              <span class="absolute w-14 top-5 left-12 font-semibold text-base text-yellow-600">{{ data.orderInfo.CreditScore || 0 }}分</span>
              <p class="mt-2">
                <span class="text-gray-400">成单率：</span>
                <span class="text-xs">{{ data.customerOrderStatistics.AllContractCont }} / {{ data.customerOrderStatistics.AllOrderCount }}</span>
              </p>
              <p>
                <span class="text-gray-400">成单金额：</span>
                <span class="text-xs">￥{{ data.customerOrderStatistics.AllContractAmount }}</span>
              </p>
            </div>
            <div class="w-44 h-40 text-sm text-center cursor-pointer" @click="openWindowProcurementReport()">
              <img class="w-28 m-auto" src="../../../../assets/img/tech/caigou.png" alt="" />
              <p class="mt-2">
                <span class="text-gray-400">成交率：</span>
                <span class="text-xs">{{ data.customerOrderStatistics.EffectiveContractCount }} / {{ data.customerOrderStatistics.AllContractCont }}</span>
              </p>
              <p>
                <span class="text-gray-400">合同金额：</span>
                <span class="text-xs">￥{{ data.customerOrderStatistics.EffectiveContractAmount }}</span>
              </p>
            </div>
          </div>
        </div>
        <!-- #region  右侧  -->
        <div class="OrderAnalysis_right h-52 float-right">
          <div class="OrderAnalysis_right h-14 bg-slate-100 text-xs inline-block p-4 relative rounded-lg">
            <el-tag class="ml-2" type="danger" v-if="data.orderInfo.Grade == 'A'">报价等级 {{ data.orderInfo.Grade }}</el-tag>
            <el-tag class="ml-2" v-else-if="data.orderInfo.Grade == 'B'">报价等级 {{ data.orderInfo.Grade }}</el-tag>
            <el-tag class="ml-2" type="success" v-else>报价等级 {{ data.orderInfo.Grade }}</el-tag>
            <div class="w-2 h-2 inline-block rounded-full bg-yellow-500 ml-3"></div>
            <span class="ml-2">询价时间：</span>
            <span>{{ data.orderInfo.CreateOn }}</span>
            <div class="w-2 h-2 inline-block ml-3 mr-3 rounded-full bg-green-500"></div>
            <span>订单编号</span>
            <span>{{ data.orderInfo.OrderNo }}</span>
            <div class="w-1 h-14 bg-slate-300 absolute top-0 left-0"></div>
          </div>
          <!-- #region 优先订单 -->
          <div class="h-20 bg-red-100 flex relative rounded-lg mt-2" v-if="data.orderInfo.Grade === 'A'">
            <div class="w-1/4 h-20 mr-2 text-center pt-6">
              <p class="text-red-400" v-if="data.orderInfo.Grade === 'A'">优先订单</p>
            </div>
            <div class="w-1/4 h-20 mr-2 text-center text-sm">
              <p class="text-gray-500 mt-3">询价阶段</p>
              <p class="m-1">
                {{ data.orderInfo.IS_State }} <span class="font-semibold"> {{ data.orderInfo.IS_Rate }}%</span>
              </p>
              <el-progress :show-text="false" :percentage="data.orderInfo.IS_Rate" />
            </div>
            <div class="w-1/4 h-20 mr-2 text-center text-sm">
              <p class="text-gray-500 mt-3">询价性质</p>
              <p class="m-1">
                {{ data.orderInfo.IN_State }} <span class="font-semibold"> {{ data.orderInfo.IN_Rate }}%</span>
              </p>
              <el-progress :show-text="false" status="warning" :percentage="data.orderInfo.IN_Rate" />
            </div>
            <div class="w-1/4 h-20 text-center text-sm">
              <p class="text-gray-500 mt-3">询价数量</p>
              <p class="m-1">
                {{ data.orderInfo.IQ_State }} <span class="font-semibold"> {{ data.orderInfo.IQ_Rate }}%</span>
              </p>
              <el-progress :show-text="false" status="success" :percentage="data.orderInfo.IQ_Rate" />
            </div>
            <div class="w-1 h-20 bg-red-300 absolute top-0 left-0"></div>
          </div>
          <!-- #endregion -->

          <!-- #region  重点订单-->
          <div class="h-20 bg-blue-100 flex relative rounded-lg mt-2" v-if="data.orderInfo.Grade === 'B'">
            <div class="w-1/4 h-20 mr-2 text-center pt-6">
              <p class="text-blue-400">重点订单</p>
            </div>
            <div class="w-1/4 h-20 mr-2 text-center text-sm">
              <p class="text-gray-500 mt-3">询价阶段</p>
              <p class="m-1">
                {{ data.orderInfo.IS_State }} <span class="font-semibold"> {{ data.orderInfo.IS_Rate }}%</span>
              </p>
              <el-progress :show-text="false" :percentage="data.orderInfo.IS_Rate" />
            </div>
            <div class="w-1/4 h-20 mr-2 text-center text-sm">
              <p class="text-gray-500 mt-3">询价性质</p>
              <p class="m-1">
                {{ data.orderInfo.IN_State }} <span class="font-semibold"> {{ data.orderInfo.IN_Rate }}%</span>
              </p>
              <el-progress :show-text="false" status="warning" :percentage="data.orderInfo.IN_Rate" />
            </div>
            <div class="w-1/4 h-20 text-center text-sm">
              <p class="text-gray-500 mt-3">询价数量</p>
              <p class="m-1">
                {{ data.orderInfo.IQ_State }} <span class="font-semibold"> {{ data.orderInfo.IQ_Rate }}%</span>
              </p>
              <el-progress :show-text="false" status="success" :percentage="data.orderInfo.IQ_Rate" />
            </div>
            <div class="w-1 h-20 bg-blue-300 absolute top-0 left-0"></div>
          </div>
          <!-- #endregion -->

          <!-- #region  普通订单-->
          <div class="h-20 bg-green-100 flex relative rounded-lg mt-2" v-if="data.orderInfo.Grade === 'C'">
            <div class="w-1/4 h-20 mr-2 text-center pt-6">
              <p class="text-green-400">普通订单</p>
            </div>
            <div class="w-1/4 h-20 mr-2 text-center text-sm">
              <p class="text-gray-500 mt-3">询价阶段</p>
              <p class="m-1">
                {{ data.orderInfo.IS_State }} <span class="font-semibold"> {{ data.orderInfo.IS_Rate }}%</span>
              </p>
              <el-progress :show-text="false" :percentage="data.orderInfo.IS_Rate" />
            </div>
            <div class="w-1/4 h-20 mr-2 text-center text-sm">
              <p class="text-gray-500 mt-3">询价性质</p>
              <p class="m-1">
                {{ data.orderInfo.IN_State }} <span class="font-semibold"> {{ data.orderInfo.IN_Rate }}%</span>
              </p>
              <el-progress :show-text="false" status="warning" :percentage="data.orderInfo.IN_Rate" />
            </div>
            <div class="w-1/4 h-20 text-center text-sm">
              <p class="text-gray-500 mt-3">询价数量</p>
              <p class="m-1">
                {{ data.orderInfo.IQ_State }} <span class="font-semibold"> {{ data.orderInfo.IQ_Rate }}%</span>
              </p>
              <el-progress :show-text="false" status="success" :percentage="data.orderInfo.IQ_Rate" />
            </div>
            <div class="w-1 h-20 bg-green-300 absolute top-0 left-0"></div>
          </div>
          <!-- #endregion -->
          <div class="h-16 bg-slate-100 flex relative rounded-lg mt-2">
            <div class="text-sm inline-block pl-3 pt-3">
              <p class="text-gray-400">
                报价单位：<span class="text-black">{{ RetCompanySimplify(data.orderInfo.CompanyName) }}</span>
              </p>
              <p class="text-gray-400">
                物流运输：<span class="text-black">{{ getOrderFreightType(data.orderInfo.Freight) }}</span>
              </p>
            </div>
            <div class="text-sm inline-block pl-2 pt-3">
              <p class="text-gray-400">
                付款方式：<span class="text-black">{{ data.orderInfo.Payment }}</span>
              </p>
              <p class="text-gray-400">
                税收情况：<span class="text-black">{{ getTaxType(data.orderInfo.TaxType) }}</span>
                <span class="text-gray-400 pl-10">所属事业部：</span>
                <span class="text-black">{{ data.orderInfo.CompName }}</span>
              </p>
            </div>
            <div class="w-1 h-16 bg-slate-300 absolute top-0 left-0"></div>
          </div>
        </div>
        <!-- #endregion -->

        <!-- #region  沟通对策 -->
        <div class="h-14 bg-orange-50 mt-6 rounded-lg">
          <div class="inline-block pl-4 float-left pt-4">
            <i class="iconfont icon-yichang text-yellow-500 text-lg"></i>
          </div>
          <div class="text-sm inline-block p-2 pl-5">
            <p class="text-gray-400">沟通对策</p>
            <p class="text-red-500">第一次给报价，通过这次的报价了解，对方的采购原则，和竞争对手。</p>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #region  产品信息  附件列表-->
      <div class="chanpin mt-12">
        <el-tabs v-model="data.activeName" class="demo-tabs">
          <el-tab-pane label="产品信息" name="first">
            <div class="p-5 pt-1">
              <el-table
                :data="data.productList"
                border
                style="width: 100%"
                :header-cell-style="{
                  background: '#f7faff',
                  color: '#606266'
                }"
              >
                <el-table-column prop="date" label="产品名称" width="180" align="center">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Name }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="型号" align="center" width="120">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Model }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="规格" align="center" width="100">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Specifications }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="材质" align="center">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Material }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="单位" align="center" width="80">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Unit }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="数量" align="center">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Quantity }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="单价" align="center">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Price }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="金额" align="center">
                  <template #default="scope">
                    <span class="text-xs">{{ Number(scope.row.Price) * Number(scope.row.Quantity) || ''}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="备注" align="center">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.Note }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="附件列表" name="second">
            <div class="p-5 pt-1">
              <el-table
                :data="data.fileList"
                border
                style="width: 100%"
                :header-cell-style="{
                  background: '#f7faff',
                  color: '#606266'
                }"
              >
                <el-table-column prop="date" label="附件" width="500">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.name }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="大小" align="center" width="200">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.size }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="操作" align="center">
                  <template #default="scope">
                    <!-- <span class=" text-blue-500 text-sm"><i class=" iconfont icon-zitiyulan"></i>预览</span> -->
                    <span class=" text-blue-500 text-sm mr-4" @click="openFile(scope.row)"><i class=" iconfont icon-zitiyulan"></i>预览</span>
                    <span class="text-blue-500 text-sm" @click="downFiles(scope.row.url, scope.row.name)"><i class="iconfont icon-download"></i>下载</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <el-tab-pane label="方案意见" name="third">
            <div class="pl-4 pr-4 pt-2">
              <p class="text-xs pt-3 pb-3">跟进下客户，信息反馈一下。</p>
              <div class="border-dashed border pb-4">
                <div class="pl-4 pr-4 pt-3 text-xs flex" v-for="item in 6">
                  <div class="w-3 h-3 mt-1 mr-2 border-4 border-blue-400 rounded-full"></div>
                  <div>
                    <p class="text-sm">报价专员 - 马玉先 (2021-11-23 14:01:15)</p>
                    <p class="text-xs text-gray-400">最低价中标</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="pl-4 pr-4 pt-1">
              <el-input class="mt-4 mb-4" v-model="data.commentsTextarea" maxlength="200" placeholder="请输入方案意见" show-word-limit type="textarea" />
            </div>
            <div class="float-right mr-4 pb-16">
              <el-button type="danger" plain>方案驳回</el-button>
              <el-button type="primary">提交分析</el-button>
            </div>
          </el-tab-pane>
          <el-tab-pane label="订单跟踪" name="four">
            <div class="p-4 pt-1">
              <div class="clearfix">
                <div class="h-10 float-left bg-orange-50 rounded-lg">
                  <div class="inline-block pl-4 float-left pt-2">
                    <i class="iconfont icon-yichang text-yellow-500 text-lg"></i>
                  </div>
                  <div class="text-sm inline-block p-4 pl-5">
                    <p class="text-xs">必跟订单2天跟进一次；重点订单4天跟进一次；一般订单6天跟进一次</p>
                  </div>
                </div>
                <div class="h-10 float-right">
                  <el-button type="primary" @click="openWindowNewPhase()"> <i class="iconfont icon-chuangjian mr-2"></i> 新增阶段</el-button>
                </div>
              </div>
              <div class="mt-5">
                <el-table
                  :data="data.fileList"
                  border
                  style="width: 100%"
                  :header-cell-style="{
                    background: '#f7faff',
                    color: '#606266'
                  }"
                >
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="name" label="跟踪时间" align="center">
                    <template #default="scope">
                      <span class="text-xs">2022-06-23</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="必跟阶段" align="center">
                    <template #default="scope">
                      <span class="text-xs">第一阶段</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="跟进人" align="center">
                    <template #default="scope">
                      <span class="text-xs">刘某某</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="预警情况" align="center">
                    <template #default="scope">
                      <span class="text-xs">正常</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="订单状态" align="center">
                    <template #default="scope">
                      <span class="text-xs text-green-500">已沟通</span>
                      <!-- <span class="text-xs text-orange-500">跟进中</span> -->
                      <!-- <span class="text-xs text-blue-500">成单</span> -->
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="操作" align="center">
                    <template #default="scope">
                      <span class="text-xs text-blue-500 cursor-pointer" @click="openWindowOrderTracking()"> <i class="iconfont icon-yulan"></i> 查看</span>
                      <span class="text-xs text-blue-500 cursor-pointer" @click="openWindowOrderTracking(data.id)"> <i class="iconfont icon-xiaoxi"></i> 跟进</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- #endregion  -->
      <!-- 订单跟踪 -->
      <OrderTracking title="订单跟踪" v-if="orderTrackingOpenData.visible" :FormData="orderTrackingOpenData.formData" @closeWindow="closeWindowOrderTracking($event)" />
      <!-- 新增阶段 -->
      <NewPhase title="订单跟踪" v-if="newPhaseOpenData.visible" :FormData="newPhaseOpenData.formData" @closeWindow="closeWindowNewPhase($event)" />
      <!-- 信用报告 -->
      <CreditReport v-if="creditReportOpenData.visible" :FormData="creditReportOpenData.formData" @closeWindow="closeWindowCreditReport($event)" />
      <!-- 采购报告 -->
      <ProcurementReport v-if="procurementReportOpenData.visible" :FormData="procurementReportOpenData.formData" @closeWindow="closeWindowProcurementReport($event)" />

      <FileWindowOpen title="文件预览" v-if="FileOpenData.visible" :FormData="FileOpenData.formData" @closeWindow="closeFileOpen($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { onMounted, reactive, defineComponent, Ref, ref, SetupContext } from 'vue'
import { ElMessage } from 'element-plus'
import { GetEnquiryIdToSaleCustomerOrderInfo } from '/@/api/tech/EnquiryData'
import GradeConfirmation from './GradeConfirmation.vue'
import RejectOrder from './RejectOrder.vue'
import AssignOrder from './AssignOrder.vue'
import { downloadFiles, RetCompanySimplify } from '/@/utils/tools'
import { useCommonStore } from '/@/store/modules/Common'
import OrderTracking from './OrderTracking.vue'
import NewPhase from './NewPhase.vue'
const store = useCommonStore() //记得加这一句
import { orderTrackingOpen, newPhaseOpen } from '/@/assets/ts/techOpenWindow'
import CreditReport from './CreditReport.vue'
import ProcurementReport from './ProcurementReport.vue'
import FileWindowOpen from '/@/views/Tech/AccountingProcessing/_Components/FileOpen.vue'
import { FileOpen } from '/@/assets/ts/techOpenWindow'

//获取字典数据
const getDictionaryData = (data: any) => {
  //运费选项
  store.getDict('sale_Order_FreightType').then((res: any) => {
    data.orderFreightTypeOptions = res
  })
  //税收情况
  store.getDict('sale_Order_TaxType').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    data.TaxType = res
  })
}

// 信用报告
const creditReportOpen = (data: any) => {
  let creditReportOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowCreditReport = () => {
    creditReportOpenData.formData = {
      Id: data.data.id
    }
    creditReportOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowCreditReport = (type: string) => {
    creditReportOpenData.visible = false
  }

  return {
    creditReportOpenData,
    openWindowCreditReport,
    closeWindowCreditReport
  }
}
// 采购报告
const procurementReportOpen = (data: any) => {
  let procurementReportOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowProcurementReport = () => {
    procurementReportOpenData.formData = {
      Id: data.data.id
    }
    procurementReportOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowProcurementReport = (type: string) => {
    procurementReportOpenData.visible = false
  }

  return {
    procurementReportOpenData,
    openWindowProcurementReport,
    closeWindowProcurementReport
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    GradeConfirmation,
    RejectOrder,
    AssignOrder,
    OrderTracking,
    NewPhase,
    CreditReport,
    FileWindowOpen,
    ProcurementReport
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0,
        ClientName: ''
      }
    }
  },
  setup(props, context: SetupContext) {
    const prop = {
      expandTrigger: 'hover'
    }

    const data = reactive({
      commentsTextarea: '',
      id: 0,
      bomId: 0,
      orderInfo: {
        Id: 0,
        IS_State: '',
        IN_State: '',
        IQ_State: '',
        Grade: ''
      },
      productList: [],
      fileList: [],
      orderFreightTypeOptions: [],
      TaxType: [],
      customerOrderStatistics: {},
      RejectOrderShow: false,
      AssignOrderShow: false,
      formData: {},
      activeName: 'first'
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

    //下载文件
    const downFiles = (url: string, name: string) => {
      downloadFiles({ url, name })
    }

    const FileOpenWindow= FileOpen({data})
    // 浏览文件或图片
    const openFile = (val:any) => {
      console.log(val.name.includes('.jpg'))
      if (val.name.includes('.img') || val.name.includes('.jpg') || val.name.includes('.jpeg') || val.name.includes('.png')) {
        downFiles(val.url, val.name)
      }else {
        FileOpenWindow.openFileOpen(val)
      }
    }

    // 获取运费信息
    const getOrderFreightType = (val: number) => {
      let dicValue = '-'
      let _obj = data.orderFreightTypeOptions.find((x) => x.DicKey === (val || 0).toFixed(0))
      if (_obj) dicValue = _obj.DicValue
      return dicValue
    }

    // 获取运费信息
    const getTaxType = (val: number) => {
      let dicValue = '-'
      let _obj = data.TaxType.find((x) => x.DicKey === (val || 0).toFixed(0))
      if (_obj) dicValue = _obj.DicValue
      return dicValue
    }

    //获取数据
    const getData = async () => {
      data.id = props.FormData.Id
      data.bomId = props.FormData.BomId
      await GetEnquiryIdToSaleCustomerOrderInfo(data.id)
        .then((res) => {
          console.log(res)
          if (res.code == 1) {
            let _obj = res.data || {}

            data.orderInfo = _obj.bill || {}
            data.customerOrderStatistics = _obj.CustomerOrderStatistics || {}
            data.productList = _obj.entities
            data.fileList = JSON.parse((_obj.bill || {}).FileList || '[]')
            console.log(data.fileList)
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch((e) => {
          console.log(`错误：${e}`)
        })
    }

    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)

      getData()
    })

    return {
      boxStyle,
      closeWindow,
      prop,
      data,
      RejectOrder,
      AssignOrder,
      getOrderFreightType,
      downFiles,
      openFile,
      getTaxType,
      RetCompanySimplify,
      ...orderTrackingOpen({ data }),
      ...newPhaseOpen({ data }),
      ...creditReportOpen({ data }),
      ...procurementReportOpen({ data }),
      ...FileOpenWindow
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_OrderAllocationManagement_OrderAnalysis {
  .OrderAnalysis_right {
    width: 620px;
  }
  .chanpin {
    :deep(.el-tabs__header) {
      background: #f0f7ff;
    }
    :deep(.el-tabs__nav) {
      margin-left: 27px;
    }
  }
  :deep(.el-progress) {
    width: 134px !important;
    margin: auto;
  }
}
</style>
