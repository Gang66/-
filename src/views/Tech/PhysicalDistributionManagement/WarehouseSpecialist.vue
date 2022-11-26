<template>
  <div class="tech_AccountingProcessing_AccountingSpecialist">
    <!-- #region  four-->
    <LogisticsSpecialistTop />
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
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">责任量(次)</span>
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
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">整理量(次)</span>
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
            <span class="text-gray-400">库存量(次)</span>
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
            <span class="text-gray-400">售后量(次)</span>
            <el-tooltip class="box-item" effect="dark" content="≤4个/周，已触碰50%责任“红线”！" placement="top">
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
            <span class="text-gray-400">履约量(%)</span>
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
    <!-- #region 出入库趋势 -->
    <div class="flex pb-6">
      <div class="w-1/4 mt-4 mr-6">
        <div class="bg-white rounded-md">
          <div class="pl-4 pt-6">
            <p class="text-sm text-gray-400">当前库存商品总额（元）</p>
            <p class="text-4xl font-semibold mt-3 mb-3 text-center"><span class="text-lg">¥</span>1200000</p>
          </div>
          <div class="pl-4 pb-6">
            <div class="inline-block">
              <span class="text-xs text-gray-400">周同比</span>
              <i class="iconfont icon-xiangshang text-red-500 ml-1 mr-1" style="font-size: 8px"></i>
              <!-- <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i> -->
              <span class="text-xs text-gray-400">12%</span>
            </div>
            <div class="inline-block ml-16">
              <span class="text-xs text-gray-400">月环比</span>
              <!-- <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i> -->
              <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i>
              <span class="text-xs text-gray-400">12%</span>
            </div>
          </div>
        </div>

        <div class="mt-6 bg-white rounded-md">
          <div class="pl-4 pt-6">
            <p class="text-sm text-gray-400">当前库存商品总数</p>
            <p class="text-4xl font-semibold mt-3 mb-3 text-center">2000</p>
          </div>
          <div class="pl-4 pb-6">
            <div class="inline-block">
              <span class="text-xs text-gray-400">周同比</span>
              <i class="iconfont icon-xiangshang text-red-500 ml-1 mr-1" style="font-size: 8px"></i>
              <!-- <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i> -->
              <span class="text-xs text-gray-400">12%</span>
            </div>
            <div class="inline-block ml-16">
              <span class="text-xs text-gray-400">月环比</span>
              <!-- <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i> -->
              <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i>
              <span class="text-xs text-gray-400">12%</span>
            </div>
          </div>
        </div>
      </div>
      <div class="w-4/5 mt-4 rounded-md">
        <div class="h-12 bg-slate-100 rounded-t-md leading-10">
          <span class="ml-4 text-base">出入库趋势图</span>
        </div>
        <div id="myechart" class="rounded-b-md" />
      </div>
    </div>
    <!-- #endregion -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import LogisticsSpecialistTop from './_Components/LogisticsSpecialistTop.vue'
import * as echarts from 'echarts'
let myChart: any = null

export default defineComponent({
  components: {
    LogisticsSpecialistTop
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

    // #region
    let MaterialDatademo = reactive({
      Xtitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    })
    const PurchaseMaterial = () => {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose() //解决echarts dom已经加载的报错
      }
      myChart = echarts.init(document.getElementById('myechart')!)
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['入库', '出库']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: MaterialDatademo.Xtitle
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: '入库',
            type: 'line',
            stack: 'Total',
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '出库',
            type: 'line',
            stack: 'Total',
            data: [220, 182, 191, 234, 290, 330, 310]
          }
        ]
      })
      window.onresize = function () {
        myChart.resize()
      }
    }
    // #endregion
    onMounted(() => {
      PurchaseMaterial()
    })

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
  #myechart {
    background: #ffffff;
    width: 100%;
    height: 18rem;
  }
}
</style>
