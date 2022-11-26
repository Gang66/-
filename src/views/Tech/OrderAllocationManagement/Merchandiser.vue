<template>
  <div class="tech_AccountingProcessing_AccountingSpecialist">
    <!-- #region  four-->
    <el-row :gutter="20">
      <!-- 今日 -->
      <el-col :md="24" :lg="6">
        <div class="inquiry_big_bg bg-red-400 grid-content ep-bg-purple rounded-xl">
          <div class="text-white p-3 pt-2">
            <div class="h-32 float-left leading-8 pt-2 ml-2">
              <div>
                <span class="text-white">今日成单量(笔)</span>
              </div>
              <div>
                <span class="font-bold text-2xl text-white">100</span>
              </div>
              <div>
                <span class="text-xs text-white">较昨日 15.9% <i class="iconfont icon-upall"></i> </span>
              </div>
            </div>
            <div>
              <i class="iconfont icon-dingdan1 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 本周 -->
      <el-col :md="24" :lg="6">
        <div class="inquiry_big_bg bg-orange-400 grid-content ep-bg-purple rounded-xl">
          <div class="text-white p-3 pt-2">
            <div class="h-32 float-left leading-8 pt-2 ml-2">
              <div>
                <span class="text-white">本周成单量(笔)</span>
              </div>
              <div>
                <span class="font-bold text-2xl text-white">100</span>
              </div>
              <div>
                <span class="text-xs text-white">较上周 15.9%<i class="iconfont icon-upall"></i> </span>
              </div>
            </div>
            <div>
              <i class="iconfont icon-dingdan3 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 本月 -->
      <el-col :md="24" :lg="6">
        <div class="inquiry_big_bg bg-blue-500 grid-content ep-bg-purple rounded-xl">
          <div class="text-white p-3 pt-2">
            <div class="h-32 float-left leading-8 pt-2 ml-2">
              <div>
                <span class="text-white">本月成单量(笔)</span>
              </div>
              <div>
                <span class="font-bold text-2xl text-white">100</span>
              </div>
              <div>
                <span class="text-xs text-white">较上月 15.9% <i class="iconfont icon-upall"></i> </span>
              </div>
            </div>
            <div>
              <i class="iconfont icon-dingdan21 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 总成交量 -->
      <el-col :md="24" :lg="6">
        <div class="inquiry_big_bg bg-green-400 grid-content ep-bg-purple rounded-xl">
          <div class="text-white p-3 pt-2">
            <div class="h-32 float-left leading-8 pt-2 ml-2">
              <div>
                <span class="text-white">总成单量(笔)</span>
              </div>
              <div>
                <span class="font-bold text-2xl text-white">450</span>
              </div>
              <div>
                <span class="text-xs text-white">较去年 15.9% <i class="iconfont icon-upall"></i> </span>
              </div>
            </div>
            <div>
              <i class="iconfont icon-dingdan2 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- #endregion -->

    <!-- #region 绩效考核 -->
    <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-base">绩效考核</span>
        <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
      </div>
      <div class="float-right">
        <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
          <el-radio-button label="all">本周</el-radio-button>
          <el-radio-button label="wait">上周</el-radio-button>
          <el-radio-button label="reviewed">本月</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="flex bg-white rounded-b-md">
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan4 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-10">
          <p class="text-sm">
            <span class="text-gray-400">报价量(个)</span>
            <el-tooltip class="box-item" effect="dark" content="≥45个/周，任务量已超20%！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+6%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-jiage text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-10">
          <p class="text-sm">
            <span class="text-gray-400">金额量(个)</span>
            <el-tooltip class="box-item" effect="dark" content="≥10个/周，已达到90%金额量！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-downall text-green-500"></i></p>
          <!-- <p class="text-xs text-green-500">+6%</p> -->
          <p class="text-xs text-red-500">-10%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan7 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-10">
          <p class="text-sm">
            <span class="text-gray-400">成单量(%)</span>
            <el-tooltip class="box-item" effect="dark" content=">20%/周，成单量已超20%！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+15%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan6 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">逾期量(个)</span>
            <el-tooltip class="box-item" effect="dark" content="≤4个/周，逾期量已超20%，失去考核金额！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+6%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan8 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">责任量(次)</span>
            <el-tooltip class="box-item" effect="dark" content="≤4个/周，已触碰50%责任“红线”！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-downall text-green-500"></i></p>
          <p class="text-xs text-red-500">-50%</p>
        </div>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region  数据排行-->
    <!-- #region  报价等级 预警订单 分配订单 市场份额-->
    <div class="mb-5">
      <el-row :gutter="20">
        <!-- 报价订单 -->
        <el-col :span="12">
          <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
            <div class="float-left pt-1">
              <span class="ml-4 text-base">报价订单</span>
              <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
            </div>
          </div>
          <div class="bg-white rounded-b-md">
            <div class="flex">
              <div class="w-1/3 pt-6 pb-6 rounded-b-md">
                <div class="w-10 h-10 ml-6 bg-red-400 ring-4 ring-red-300 rounded-full text-white text-center pt-2 float-left inline-block">
                  <span class="">A级</span>
                </div>
                <div class="float-left inline-block ml-2 text-sm">
                  <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                  <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
                </div>
              </div>
              <div class="w-1/3 pt-6 pb-6 rounded-b-md">
                <div class="w-10 h-10 ml-6 bg-blue-400 ring-4 ring-blue-300 rounded-full text-white text-center pt-2 float-left inline-block">
                  <span class="">B级</span>
                </div>
                <div class="float-left inline-block ml-2 text-sm">
                  <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                  <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
                </div>
              </div>
              <div class="w-1/3 pt-6 pb-6 rounded-b-md">
                <div class="w-10 h-10 ml-6 bg-green-400 ring-4 ring-green-300 rounded-full text-white text-center pt-2 float-left inline-block">
                  <span class="">C级</span>
                </div>
                <div class="float-left inline-block ml-2 text-sm">
                  <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                  <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
                </div>
              </div>
            </div>
            <div class="flex p-4 pt-0">
              <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
                <p class="text-gray-400 text-xs">≥ 20万报价</p>
                <p class="text-xl font-semibold text-blue-500">9</p>
              </div>
              <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
                <p class="text-gray-400 text-xs">≥ 1万报价</p>
                <p class="text-xl font-semibold text-blue-500">9</p>
              </div>
              <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
                <p class="text-gray-400 text-xs">&lt;1万报价</p>
                <p class="text-xl font-semibold text-blue-500">9</p>
              </div>
              <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
                <p class="text-gray-400 text-xs">跟进中</p>
                <p class="text-xl font-semibold text-green-500">9</p>
              </div>
              <div class="w-1/5 text-center bg-sky-50 pt-2 pb-1">
                <p class="text-gray-400 text-xs">已结束</p>
                <p class="text-xl font-semibold text-red-500">9</p>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 市场份额 -->
        <el-col :span="12">
          <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
            <div class="float-left pt-1">
              <span class="ml-4 text-base">市场份额</span>
              <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
            </div>
          </div>
          <div class="bg-white rounded-b-md">
            <div class="flex pt-6 pb-2">
              <div>
                <div class="w-20 h-8 ml-6 bg-orange-400 ring-4 ring-orange-300 rounded-full text-white text-center pt-1 float-left inline-block">
                  <span class="text-sm">常规类</span>
                </div>
                <div class="float-left inline-block ml-6 text-sm">
                  <p class="font-semibold text-sm">232 <span class="text-xs">个</span></p>
                  <p class="text-gray-400 text-xs">常用 <span class="font-semibold text-gray-500">226 </span> 非常用 <span class="text-gray-500 font-semibold">226 </span></p>
                </div>
              </div>
              <div class="ml-20">
                <div class="w-20 h-8 ml-6 bg-blue-400 ring-4 ring-blue-300 rounded-full text-white text-center pt-1 float-left inline-block">
                  <span class="text-sm">可代替性</span>
                </div>
                <div class="float-left inline-block ml-6 text-sm">
                  <p class="font-semibold text-sm">232 <span class="text-xs">个</span></p>
                  <p class="text-gray-400 text-xs">有 <span class="font-semibold text-gray-500">226 </span> 无 <span class="text-gray-500 font-semibold">226 </span></p>
                </div>
              </div>
            </div>
            <div class="flex pt-6 pb-8">
              <div>
                <div class="w-20 h-8 ml-6 bg-green-400 ring-4 ring-green-300 rounded-full text-white text-center pt-1 float-left inline-block">
                  <span class="text-sm">非常规类</span>
                </div>
                <div class="float-left inline-block ml-6 text-sm">
                  <p class="font-semibold text-sm">232 个</p>
                  <p class="text-gray-400 text-xs">常用 <span class="font-semibold text-gray-500">226 </span> 非常用 <span class="text-gray-500 font-semibold">226 </span></p>
                </div>
              </div>
              <div class="ml-20">
                <div class="w-20 h-8 ml-6 bg-slate-500 ring-4 ring-slate-300 rounded-full text-white text-center pt-1 float-left inline-block">
                  <span class="text-sm">技术难度</span>
                </div>
                <div class="float-left inline-block ml-6 text-sm">
                  <p class="font-semibold text-sm">232 <span class="text-xs">个</span></p>
                  <p class="text-gray-400 text-xs">一般 <span class="font-semibold text-gray-500">226 </span> 较难 <span class="text-gray-500 font-semibold">226 </span></p>
                </div>
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- #endregion -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import '/@/assets/css/tech.css'

export default defineComponent({
  setup() {
    const form = reactive({
      ScreeningOptions: [
        { Name: '按预警数', Id: 1 },
        { Name: '按超时数', Id: 2 },
        { Name: '按延时数', Id: 3 },
        { Name: '按暂停数', Id: 4 }
      ]
    })
    const data = reactive({
      show_1: 'all',
      show_2: 'week',
      ScreeningValue: ''
    })
    const tabPosition = ref('all')
    const tabAppraisal = ref('week')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      data.show_1 = tabPosition.value
      console.log(data.show_1)
    }
    const allWaitAppraisal = (val: any) => {
      data.show_2 = tabAppraisal.value
    }

    return {
      data,
      form,
      allWait,
      tabPosition,
      tabAppraisal,
      allWaitAppraisal
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_AccountingProcessing_AccountingSpecialist {
  @media only screen and (max-width: 1500px) {
    .inquiry_big_img {
      display: none;
    }
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  @keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    100% {
      -webkit-transform: translate3d(0, -340px, 0);
      transform: translate3d(0, -340px, 0);
    }
  }
  .list .rowup {
    -webkit-animation: 12s rowup linear infinite normal;
    animation: 12s rowup linear infinite normal;
    position: relative;
  }
}
</style>
