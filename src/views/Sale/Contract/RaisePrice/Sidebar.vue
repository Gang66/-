<template>
  <div>
    <div class="fixed z-50" :style="{'top': '8rem','left': dataInfo.left + 'px'}">
      <div class="card relative w-full rounded-2xl" style="background: linear-gradient(180deg, #E6F6FF 0%, #FEFEFF 100%);">
        <div class="w-full rounded-2xl text-xs pb-3 relative z-50" style="backdrop-filter: blur(10px);">
          <div class="w-2/3 text-center text-white font-bold bg-blue-500 rounded-full h-6 relative -top-3 leading-6 top-title">价格趋势</div>
          <div class="rounded-md border border-blue-500 px-3 py-1 mx-3 leading-5 mb-2">
            <div>最低价：{{Info.SaleMinPrice}}</div>
            <div>销售额：{{Info.DiscountAmount}}</div>
            <div>加价费：{{Info.MarkupFee}}</div>
            <div>居间费：{{Info.IntroductionFee}}</div>
          </div>
          <div class="text-white font-bold text-center leading-8 shadow mx-0.5 rounded mb-1" style="background: #51B2FF">固定成本管理</div>
          <div class="flex leading-5">
            <div class="text-right w-20">税收：</div>
            <div>{{Info.Taxrate}}%</div>
          </div>
          <div class="flex leading-5">
            <div class="text-right w-20">质保金：</div>
            <div>{{Info.BondRate}}%</div>
          </div>
          <div class="flex leading-5">
            <div class="text-right w-20">风险金：</div>
            <div>{{Info.RiskFundRate}}%</div>
          </div>
          <div class="flex leading-5">
            <div class="text-right w-20">运费：</div>
            <div>{{Info.FreightRate}}%</div>
          </div>
          <div class="flex leading-5">
            <div class="text-right w-20">提成：</div>
            <div>{{Info.PercentageRate}}%</div>
          </div>
          <div class="font-bold text-center leading-8 shadow mx-0.5 rounded my-1" style="background: #BFF8FD">销售加价管理</div>
          <div class="flex leading-5">
            <div class="text-right" style="width: 90px">常规类：</div>
            <div>{{Info.RoutineRate}}%</div>
          </div>
          <div class="flex leading-5">
            <div class="text-right" style="width: 90px">非常规类：</div>
            <div>{{Info.UnRoutineRate}}%</div>
          </div>
          <div class="flex leading-5">
            <div class="text-right" style="width: 90px">居间费：</div>
            <div>{{Info.IntermediatorRate}}%</div>
          </div>
        </div>
        <div class="absolute w-24 h-24 rounded-full top-28 bg-blue-300 left-4 shadow-xl"></div>
        <div class="absolute w-16 h-16 rounded-full top-64 bg-blue-300 left-6 shadow-xl"></div>
        <img :src="bootomImg" class="absolute w-full bottom-0 z-10" alt="">
        <img :src="topImg" class="absolute w-full top-0 z-10" alt="">
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import bootomImg from '/@/assets/img/sale/contract/bottom-img.png'
import topImg from '/@/assets/img/sale/contract/top-img.png'
const prop = defineProps({
  Info: {
    type: Object,
    default: {}
  },
  width: {
    // 模态框宽度
    type: Number,
    default: 1200
  }
})

const dataInfo = reactive({
  WindowWidth: 0,
  left: 0
})
// 获取向右偏移量
const getWindowWidth = () => {
  dataInfo.WindowWidth = document.body.clientWidth
  dataInfo.left = (dataInfo.WindowWidth - prop.width) / 2 + prop.width + 10
}

onMounted(() => {
  // 监听浏览器变化
  window.onresize = () => {
    return (() => {
      getWindowWidth()
    })()
  }
  getWindowWidth()
})
</script>

<style scoped lang="postcss">
.card {
  min-width: 130px;
  .top-title {
    margin: 0 auto;
  }
}
</style>
