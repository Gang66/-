<template>
  <div class="tech_AccountingProcessing_AccountingSpecialist">
    <!-- #region  four-->
    <ContractManagerTop />
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
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">逾期量(次)</span>
            <el-tooltip class="box-item" effect="dark" content="≤3个/周，已触碰50%逾期“红线”！" placement="top">
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
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">责任量(次)</span>
            <el-tooltip class="box-item" effect="dark" content="≤2个/周，已触碰50%责任“红线”！" placement="top">
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
          <i class="iconfont icon-dingdan6 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">回款量(%)</span>
            <el-tooltip class="box-item" effect="dark" content="逾期量已超80%，失去考核金额！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">85% <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+6%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan8 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">履约量(%)</span>
            <el-tooltip class="box-item" effect="dark" content="≤90%/周，已触碰50%履约“红线”！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-downall text-green-500"></i></p>
          <p class="text-xs text-red-500">-50%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-mxjl text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">诉讼量(%)</span>
            <el-tooltip class="box-item" effect="dark" content="≤90%/周，已触碰50%售后“红线”！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">80% <i class="iconfont icon-downall text-green-500"></i></p>
          <p class="text-xs text-red-500">-50%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan21 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">投诉量(%)</span>
            <el-tooltip class="box-item" effect="dark" content="≤1次/周，投诉量已达1次，预警！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">1% <i class="iconfont icon-downall text-green-500"></i></p>
          <p class="text-xs text-gray-500">0%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan9 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">审批量(次)</span>
            <el-tooltip class="box-item" effect="dark" content="≥20/周 档案量已超20%！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+15%</p>
        </div>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region  报价等级 预警订单 分配订单 市场份额-->
    <ContractManagerBottom />
    <!-- #endregion -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ContractManagerTop from './_Components/ContractManagerTop.vue'
import ContractManagerBottom from './_Components/ContractManagerBottom.vue'

export default defineComponent({
  components: {
    ContractManagerTop,
    ContractManagerBottom
  },
  setup() {
    const data = reactive({
      show_1: 'all'
    })
    const tabPosition = ref('all')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      data.show_1 = tabPosition.value
      console.log(data.show_1)
    }

    return {
      data,
      allWait,
      tabPosition
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
}
</style>
