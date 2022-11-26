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
        <el-radio-group v-model="tabPosition" @change="allWait()">
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
            <span class="text-gray-400">履约量(%)</span>
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
            <span class="text-gray-400">违章量(次)</span>
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
            <span class="text-gray-400">费用量(次)</span>
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
    <!-- #region 采购金额 -->
    <div class="flex">
      <div class="w-1/4 mt-4 mr-6">
        <div class="bg-white rounded-md">
          <div class="pl-4 pt-6">
            <p class="text-sm text-gray-400">今日运单数</p>
            <p class="text-4xl font-semibold mt-3 mb-3 text-center">120<span class="text-lg font-normal ml-3">单</span></p>
          </div>
          <div class="pl-4 pb-6">
            <div class="inline-block text-xs text-gray-400">
              <span class="">结算运费：</span>
              <span class="text-red-500 mr-1 font-semibold">3680</span>元
            </div>
            <div class="inline-block text-xs text-gray-400 ml-16">
              <span class="">运输车次：</span>
              <span class="text-green-500 mr-1 font-semibold">10</span>车
            </div>
          </div>
        </div>

        <div class="mt-6 bg-white rounded-md">
          <div class="pl-4 pt-6">
            <p class="text-sm text-gray-400">总运单数</p>
            <p class="text-4xl font-semibold mt-3 mb-3 text-center">120000<span class="text-lg font-normal ml-3">单</span></p>
          </div>
          <div class="pl-4 pb-6">
            <div class="inline-block text-xs text-gray-400">
              <span class="">累计车次：</span>
              <span class="text-red-500 mr-1 font-semibold">11290</span>次
            </div>
            <div class="inline-block text-xs text-gray-400 ml-16">
              <span class="">累计金额：</span>
              <span class="text-green-500 mr-1 font-semibold">1860</span>万元
            </div>
          </div>
        </div>
      </div>
      <div class="w-4/5 mt-4 rounded-md">
        <div class="h-12 bg-slate-100 rounded-t-md leading-10">
          <span class="ml-4 text-base">运量走势图</span>
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

const option = {
  tooltip: {
    // trigger: 'axis',
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      // 方法一
      type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
      shadowStyle: {
        color: 'rgba(220, 220, 220, 0.2)'
      }
    }
  },
  legend: {
    data: ['运输量', '在途量']
  },
  toolbox: {
    show: true
  },
  calculable: true,
  xAxis: [
    {
      type: 'category',
      // prettier-ignore
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    }
  ],
  yAxis: [
    {
      type: 'value'
    }
  ],
  series: [
    {
      name: '运输量',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
      itemStyle: {
        normal: {
          color: '#409EFF',
          lineStyle: {
            color: '#409EFF'
          }
        }
      }
      // markPoint: {
      //   data: [
      //     { type: 'max', name: 'Max' },
      //     { type: 'min', name: 'Min' }
      //   ]
      // },
      // markLine: {
      //   data: [{ type: 'average', name: 'Avg' }]
      // }
    },
    {
      name: '在途量',
      type: 'bar',
      data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
      itemStyle: {
        normal: {
          color: '#FE87A9',
          lineStyle: {
            color: '#FE87A9'
          }
        }
      }
      // markPoint: {
      //   data: [
      //     { name: 'Max', value: 182.2, xAxis: 7, yAxis: 183 },
      //     { name: 'Min', value: 2.3, xAxis: 11, yAxis: 3 }
      //   ]
      // },
      // markLine: {
      //   data: [{ type: 'average', name: 'Avg' }]
      // }
    }
  ]
}

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
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['运输量', '在途量']
        },
        xAxis: {
          type: 'category',
          data: MaterialDatademo.Xtitle
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '运输量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
            itemStyle: {
              normal: {
                color: '#409EFF',
                lineStyle: {
                  color: '#409EFF'
                }
              }
            }
          },
          {
            name: '在途量',
            type: 'bar',
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
            itemStyle: {
              normal: {
                color: '#FE87A9',
                lineStyle: {
                  color: '#FE87A9'
                }
              }
            }
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
  @media only screen and (max-width: 1500px) {
    .inquiry_big_img {
      display: none;
    }
  }
  #myechart {
    background: #ffffff;
    width: 100%;
    height: 18rem;
  }
}
</style>
