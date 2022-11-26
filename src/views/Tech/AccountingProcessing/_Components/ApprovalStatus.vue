<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="m-5">
      <div class="h-24 bg-pink-50 rounded-t-xl tech_AccountingProcessing_ApprovalStatus">
        <div class="float-left text-white w-72 relative ml-8">
          <span class="absolute right-0 top-14">山东长林新材料有限公司</span>
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
                  <span class="text-blue-400 cursor-pointer" @click="openWindowHistoricalContract()">10</span><span class="text-gray-400 ml-1 mr-1">/</span><span class="text-blue-400 cursor-pointer" @click="openWindowHistoricalQuotation()">9</span>
                  <p class="text-xs text-gray-400 mt-2">成交量/报价数</p>
                </div>
              </div>
              <div class="w-1/3 h-16 mr-2 pt-2 pl-2">
                <div class="text-center">
                  <i class="iconfont icon-dunpai text-red-300 mr-2"></i>
                  <span class="text-red-500 cursor-pointer">好</span>
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
            <p>黄金涛</p>
            <p class="text-gray-400 mt-2">联系人</p>
          </div>
          <div class="inline-block text-sm mr-4">
            <p>18653533626</p>
            <p class="text-gray-400 mt-2">手机</p>
          </div>
          <div class="inline-block text-sm mt-2">
            <p>0531-8688528</p>
            <p class="text-gray-400 mt-2">电话</p>
          </div>
        </div>
        <div class="float-right text-sm mt-3 mr-2">
          <span class="">产品成本：</span>
          <span class="text-orange-400 mr-4">￥550580</span>
          <span>核算成本：</span>
          <span class="text-orange-400 mr-4">￥812146.50</span>
          <span>技术成本：</span>
          <span class="text-orange-400 mr-4">￥812146.50</span>
        </div>
        <div :class="data.isfo ? '' : 'yinc'">
          <div class="w-2/3 mt-2 inline-block">
            <p class="text-sm ml-4"><i class="iconfont icon-lianxiren mr-1"></i>业务信息</p>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">报价单位：</span><span>北京高中压</span></p>
              <p class="mt-1"><span class="text-gray-400">询价阶段：</span><span>采购阶段</span></p>
              <p class="mt-1"><span class="text-gray-400">业务员：</span><span>张苹</span></p>
              <p class="mt-1"><span class="text-gray-400">手机：</span><span>13306446073</span></p>
            </div>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">报价等级：</span><span>A</span></p>
              <p class="mt-1"><span class="text-gray-400">询价性质：</span><span>选择比价</span></p>
              <p class="mt-1"><span class="text-gray-400">运费：</span><span>含运费（到厂）</span></p>
              <p class="mt-1"><span class="text-gray-400">电话：</span><span>13306446073</span></p>
            </div>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">税收情况：</span><span>含增值税</span></p>
              <p class="mt-1"><span class="text-gray-400">询价数量：</span><span>新项目</span></p>
              <p class="mt-1"><span class="text-gray-400">周期备注：</span><span>侧是是是</span></p>
              <p class="mt-1"><span class="text-gray-400">QQ：</span><span>1299441254</span></p>
            </div>
          </div>
          <div class="w-1/3 float-right mt-2">
            <div class="text-sm">
              <div class="inline-block">
                <i class="iconfont icon-shujuku"></i>
                <span>附件预览</span>
              </div>
              <div class="inline-block float-right mr-6"><span class="text-orange-400">2</span>个</div>
            </div>
            <div>
              <div v-for="item in 2" :key="item" class="text-sm">
                <span>长林造纸自控阀明细</span>
                <span>（终）</span>
                <span>09.09.xlsx</span>
                <span class="text-blue-500 ml-2">预览</span>
                <span class="text-blue-500 ml-2">下载</span>
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
            <el-select v-model="data.filterValue" class="m-2" placeholder="分组筛选">
              <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div class="text-blue-500 text-sm inline-block cursor-pointer" @click="approvalStatusFilterings()">
            <i class="iconfont icon-shaixuan mr-2"></i>
            <span>高级筛选</span>
          </div>
        </div>
        <div class="float-right pt-2">
          <el-button type="success" @click="openWindowHechnicalMarkup()"><i class="iconfont icon-jiage mr-2"></i> 技术加价</el-button>
          <!-- <el-button type="primary" @click="openWindowOrderPriceComparison()"><i class="iconfont icon-chuangjian mr-2"></i> 新增供应商</el-button> -->
        </div>
      </div>
      <!-- #region 产品信息-->
      <div v-infinite-scroll="load" style="overflow: auto" class="h-96">
        <div class="border rounded mb-6 relative" v-for="(item, index) in data.radioData">
          <div class="absolute left-0">
            <!-- <img class=" w-14 h-14" src="../../../../assets/img/tech/one.png" alt=""> -->
            <!-- <img class=" w-14 h-14" src="../../../../assets/img/tech/two.png" alt=""> -->
            <img class="w-14 h-14" src="../../../../assets/img/tech/three.png" alt="" />
          </div>
          <el-checkbox-group v-model="radio1" class="ml-4 w-0 inline-block float-left mt-8" @change="change(index)">
            <el-checkbox :label="item.value" size="large"> <br /></el-checkbox>
          </el-checkbox-group>
          <div class="w-2/5 h-24 inline-block ml-8">
            <div class="inline-block mt-3">
              <span class="text-xs text-gray-400 mb-2">产品信息</span>
              <el-tag class="ml-2" type="danger" size="small"><span class="text-xs">体</span></el-tag>
              <div class="inline-block float-right ml-56">
                <el-tooltip class="box-item" effect="dark" content=" 点右下角“比对”查看详细属性" placement="top">
                  <i class="iconfont icon-beizhu text-green-500"></i>
                </el-tooltip>
              </div>
              <p class="text-xs mt-1 mb-2">蝶阀，DS343H-16C，DN500, 非常规常用</p>
              <p class="text-gray-400 text-xs">F304，φ22</p>
            </div>
            <div class="float-right text-xs mt-8 text-center">
              <p class="text-xs">数量</p>
              <p class="text-gray-400 text-xs mt-1">10</p>
            </div>
          </div>
          <div class="w-500 h-24 float-right pt-4">
            <!-- <div class=" w-1/6 h-16  mr-4  rounded-tr-md bg-blue-400 rounded-br-md float-left text-center" >
                        <div class=" mt-3">
                            <p class=" text-xs text-white">￥<span class=" text-sm font-semibold text-white ">6140</span></p>
                        </div>
                        <p class=" text-white text-xs">凯宏阀门</p>
                    </div> -->
            <div class="w-1/6 h-16 mr-4 rounded-tr-md border rounded-br-md float-left text-center relative">
              <div class="w-1 h-16 bg-blue-400 inline-block absolute left-0"></div>
              <div class="mt-3">
                <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
              </div>
              <p class="text-gray-400 text-xs">凯宏阀门</p>
            </div>

            <div class="w-1/6 h-16 mr-4 rounded-tr-md bg-red-400 rounded-br-md float-left text-center">
              <div class="mt-3">
                <p class="text-xs text-white">￥<span class="text-sm font-semibold text-white">6140</span></p>
              </div>
              <p class="text-white text-xs">凯宏阀门</p>
            </div>
            <!-- <div class=" w-1/6 h-16  mr-4  rounded-tr-md border rounded-br-md float-left text-center relative" >
                        <div class=" w-1 h-16 bg-red-400 inline-block absolute left-0"></div>
                        <div class=" mt-3">
                            <p class=" text-xs ">￥<span class=" text-sm font-semibold  ">6140</span></p>
                        </div>
                        <p class=" text-gray-400 text-xs">凯宏阀门</p>
                    </div> -->

            <!-- <div class=" w-1/6 h-16  mr-4  rounded-tr-md bg-yellow-400 rounded-br-md float-left text-center" >
                        <div class=" mt-3">
                            <p class=" text-xs text-white">￥<span class=" text-sm font-semibold text-white ">6140</span></p>
                        </div>
                        <p class=" text-white text-xs">凯宏阀门</p>
                    </div> -->
            <div class="w-1/6 h-16 mr-4 rounded-tr-md border rounded-br-md float-left text-center relative">
              <div class="w-1 h-16 bg-yellow-400 inline-block absolute left-0"></div>
              <div class="mt-3">
                <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
              </div>
              <p class="text-gray-400 text-xs">凯宏阀门</p>
            </div>

            <div class="w-1/6 h-16 mr-4 rounded-tr-md bg-cyan-400 rounded-br-md float-left text-center">
              <div class="mt-3">
                <p class="text-xs text-white">￥<span class="text-sm font-semibold text-white">6140</span></p>
              </div>
              <p class="text-white text-xs">凯宏阀门</p>
            </div>
            <!-- <div class=" w-1/6 h-16  mr-4  rounded-tr-md border rounded-br-md float-left text-center relative" >
                        <div class=" w-1 h-16 bg-cyan-400 inline-block absolute left-0"></div>
                        <div class=" mt-3">
                            <p class=" text-xs ">￥<span class=" text-sm font-semibold  ">6140</span></p>
                        </div>
                        <p class=" text-gray-400 text-xs">凯宏阀门</p>
                    </div> -->

            <!-- <div class=" w-1/6 h-16  mr-4  rounded-tr-md bg-green-400 rounded-br-md float-left text-center" >
                        <div class=" mt-3">
                            <p class=" text-xs text-white">￥<span class=" text-sm font-semibold text-white ">6140</span></p>
                        </div>
                        <p class=" text-white text-xs">凯宏阀门</p>
                    </div> -->
            <div class="w-1/6 h-16 mr-4 rounded-tr-md border rounded-br-md float-left text-center relative">
              <div class="w-1 h-16 bg-green-400 inline-block absolute left-0"></div>
              <div class="mt-3">
                <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
              </div>
              <p class="text-gray-400 text-xs">凯宏阀门</p>
            </div>
          </div>
          <div class="absolute top-22 right-5 w-10 h-5 bg-green-400 leading-4 text-center rounded-b z-50 cursor-pointer">
            <span class="text-xs text-white" @click="comparison()">对比</span>
          </div>
          <!-- #region  配件 -->
          <div class="border-t rounded relative bg-blue-50" v-for="(item, index) in 2">
            <div class="absolute left-0">
              <!-- <img class=" w-14 h-14" src="../../../../assets/img/tech/one.png" alt=""> -->
              <img class="w-14 h-14" src="../../../../assets/img/tech/two.png" alt="" />
              <!-- <img class=" w-14 h-14" src="../../../../assets/img/tech/three.png" alt=""> -->
            </div>
            <el-checkbox-group v-model="radio1" class="ml-4 w-0 inline-block float-left mt-8" @change="change(index)">
              <el-checkbox :label="item.value" size="large"> <br /></el-checkbox>
            </el-checkbox-group>
            <div class="w-2/5 h-24 inline-block ml-8">
              <div class="inline-block mt-3">
                <span class="text-xs text-gray-400 mb-2">产品信息</span>
                <el-tag class="ml-2" size="small">配</el-tag>
                <div class="inline-block float-right ml-56">
                  <el-tooltip class="box-item" effect="dark" content=" 点右下角“比对”查看详细属性" placement="top">
                    <i class="iconfont icon-beizhu text-green-500"></i>
                  </el-tooltip>
                </div>
                <p class="text-xs mt-1 mb-2">蝶阀，DS343H-16C，DN500, 非常规常用</p>
                <p class="text-gray-400 text-xs">F304，φ22</p>
              </div>
              <div class="float-right text-xs mt-8 text-center">
                <p class="text-xs">数量</p>
                <p class="text-gray-400 text-xs">10</p>
              </div>
            </div>
            <div class="w-500 h-24 float-right pt-4">
              <!-- <div class="w-1/6 h-16 mr-4 rounded-tr-md bg-blue-400 rounded-br-md float-left text-center">
                <div class="mt-3">
                  <p class="text-xs text-white">￥<span class="text-sm font-semibold text-white">6140</span></p>
                </div>
                <p class="text-white text-xs">凯宏阀门</p>
              </div> -->
              <div class="w-1/6 h-16 bg-white mr-4 rounded-tr-md border rounded-br-md float-left text-center relative">
                <div class="w-1 h-16 bg-blue-400 inline-block absolute left-0"></div>
                <div class="mt-3">
                  <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
                </div>
                <p class="text-gray-400 text-xs">凯宏阀门</p>
              </div>

              <!-- <div class="w-1/6 h-16 mr-4 rounded-tr-md bg-red-400 rounded-br-md float-left text-center">
                <div class="mt-3">
                  <p class="text-xs text-white">￥<span class="text-sm font-semibold text-white">6140</span></p>
                </div>
                <p class="text-white text-xs">凯宏阀门</p>
              </div> -->
              <div class="w-1/6 h-16 mr-4 bg-white rounded-tr-md border rounded-br-md float-left text-center relative">
                <div class="w-1 h-16 bg-red-400 inline-block absolute left-0"></div>
                <div class="mt-3">
                  <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
                </div>
                <p class="text-gray-400 text-xs">凯宏阀门</p>
              </div>

              <!-- <div class="w-1/6 h-16 mr-4 rounded-tr-md bg-yellow-400 rounded-br-md float-left text-center">
                <div class="mt-3">
                  <p class="text-xs text-white">￥<span class="text-sm font-semibold text-white">6140</span></p>
                </div>
                <p class="text-white text-xs">凯宏阀门</p>
              </div> -->
              <div class="w-1/6 h-16 mr-4 bg-white rounded-tr-md border rounded-br-md float-left text-center relative">
                <div class="w-1 h-16 bg-yellow-400 inline-block absolute left-0"></div>
                <div class="mt-3">
                  <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
                </div>
                <p class="text-gray-400 text-xs">凯宏阀门</p>
              </div>

              <div class="w-1/6 h-16 mr-4 rounded-tr-md bg-cyan-400 rounded-br-md float-left text-center">
                <div class="mt-3">
                  <p class="text-xs text-white">￥<span class="text-sm font-semibold text-white">6140</span></p>
                </div>
                <p class="text-white text-xs">凯宏阀门</p>
              </div>
              <!-- <div class="w-1/6 h-16 mr-4 bg-white rounded-tr-md border rounded-br-md float-left text-center relative">
                <div class="w-1 h-16 bg-cyan-400 inline-block absolute left-0"></div>
                <div class="mt-3">
                  <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
                </div>
                <p class="text-gray-400 text-xs">凯宏阀门</p>
              </div> -->

              <!-- <div class="w-1/6 h-16 mr-4 rounded-tr-md bg-green-400 rounded-br-md float-left text-center">
                <div class="mt-3">
                  <p class="text-xs text-white">￥<span class="text-sm font-semibold text-white">6140</span></p>
                </div>
                <p class="text-white text-xs">凯宏阀门</p>
              </div> -->
              <div class="w-1/6 h-16 mr-4 bg-white rounded-tr-md border rounded-br-md float-left text-center relative">
                <div class="w-1 h-16 bg-green-400 inline-block absolute left-0"></div>
                <div class="mt-3">
                  <p class="text-xs">￥<span class="text-sm font-semibold">6140</span></p>
                </div>
                <p class="text-gray-400 text-xs">凯宏阀门</p>
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

      <!-- #endregion -->
      <!-- 历史合同 -->
      <HistoricalContract title="历史合同" v-if="historicalContractOpenData.visible" :FormData="historicalContractOpenData.formData" @closeWindow="closeWindowHistoricalContract($event)" />
      <!-- 历史合同 -->
      <HistoricalQuotation title="历史报价单" v-if="historicalQuotationOpenData.visible" :FormData="historicalQuotationOpenData.formData" @closeWindow="closeWindowHistoricalQuotation($event)" />
      <!-- 右侧弹出层 -->
      <ApprovalStatusFiltering :visible="data.approvalStatusFiltering" @closeApprovalStatusFiltering="closeApprovalStatusFiltering" />
      <!-- 技术加价  核算分析 -->
      <AccountingTechnicalMarkup title="技术加价管理" v-if="hechnicalMarkupOpenData.visible" :FormData="hechnicalMarkupOpenData.formData" @closeWindow="closeWindowHechnicalMarkup($event)" />
      <!-- 对比 -->
      <Comparison :visible="data.visibleComparison" @closeComparison="closeComparison" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
import HistoricalContract from './HistoricalContract.vue'
import HistoricalQuotation from './HistoricalQuotation.vue'
import ApprovalStatusFiltering from './ApprovalStatusFiltering.vue'
import AccountingTechnicalMarkup from './AccountingTechnicalMarkup.vue'
import Comparison from './comparison.vue'

export default defineComponent({
  components: {
    OpenWindow,
    HistoricalContract,
    HistoricalQuotation,
    ApprovalStatusFiltering,
    AccountingTechnicalMarkup,
    Comparison
  },
  emits: ['closeApprovalStatusFiltering', 'closeWindow'],
  setup(props, context: SetupContext) {
    const radio1 = ref([])
    const data = reactive({
      visibleComparison: false,
      approvalStatusFiltering: false,
      filterValue: '',
      isfo: false,
      showDetail: -1,
      options: [
        {
          value: '1',
          label: 'G593099'
        },
        {
          value: '2',
          label: 'G593099'
        }
      ],
      radioData: [
        { value: '0', label: '1', show: '1' },
        { value: '1', label: '0', show: '0' },
        { value: '2', label: '0', show: '0' },
        { value: '3', label: '0', show: '0' },
        { value: '4', label: '0', show: '0' },
        { value: '5', label: '0', show: '0' },
        { value: '6', label: '0', show: '0' },
        { value: '7', label: '0', show: '0' },
        { value: '8', label: '0', show: '0' },
        { value: '9', label: '0', show: '0' }
      ]
    })
    const change = (index: any, val: any) => {
      console.log(radio1.value)
    }

    const count = ref(0)
    const load = () => {
      count.value += 2
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })
    const clickMouseenter = () => {
      data.isfo = !data.isfo

      console.log(data.isfo)
      if (!data.isfo) {
        data.showDetail = -1
      } else {
        data.showDetail = 0
      }
    }
    const approvalStatusFilterings = () => {
      data.approvalStatusFiltering = true
    }
    // 关闭抽屉 高级筛选
    const closeApprovalStatusFiltering = () => {
      data.approvalStatusFiltering = false
    }
    // 对比
    const comparison = () => {
      data.visibleComparison = true
    }
    const closeComparison = () => {
      data.visibleComparison = false
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
    // 技术加价管理
    const hechnicalMarkupOpen = (data: any) => {
      let hechnicalMarkupOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHechnicalMarkup = (val: any) => {
        hechnicalMarkupOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        hechnicalMarkupOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHechnicalMarkup = (type: string) => {
        hechnicalMarkupOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        hechnicalMarkupOpenData,
        openWindowHechnicalMarkup,
        closeWindowHechnicalMarkup
      }
    }

    onMounted(() => {})

    return {
      closeWindow,
      data,
      boxStyle,
      clickMouseenter,
      radio1,
      change,
      count,
      load,
      ...historicalContractOpen({ data }),
      ...historicalQuotationOpen({ data }),
      ...hechnicalMarkupOpen({ data }),
      closeApprovalStatusFiltering,
      approvalStatusFilterings,
      comparison,
      closeComparison
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
</style>
