<template>
  <div class="tech_purchasingManagement_procurementPerformanceAnalysis">
    <!-- #region 今日合同额........ -->
    <ProcurementSpecialistTop />
    <!-- #endregion -->
    <!-- #region 总额采购...... -->
    <div class="mt-3">
      <el-row :gutter="20">
        <el-col :md="24" :lg="6">
          <div class="bg-white rounded-md shadow-lg p-4">
            <div class="w-14 h-14 bg-red-100 rounded-full inline-block text-center align-top leading-loose">
              <i class="iconfont icon-xjd text-red-500 pt-2" style="font-size: 30px"></i>
            </div>
            <div class="inline-block ml-6">
              <p>总采购额（元）</p>
              <p class="text-2xl font-semibold">715,600</p>
              <p class="text-xs text-green-500">+10% <i class="iconfont icon-upall"></i></p>
              <!-- <p class="text-xs text-red-500">-10% <i class="iconfont icon-downall"></i></p> -->
            </div>
          </div>
        </el-col>
        <el-col :md="24" :lg="6">
          <div class="bg-white rounded-md shadow-lg p-4">
            <div class="w-14 h-14 bg-green-100 rounded-full inline-block text-center align-top leading-loose">
              <i class="iconfont icon-hsfx text-green-500 pt-2" style="font-size: 30px"></i>
            </div>
            <div class="inline-block ml-6">
              <p>实际完成（元）</p>
              <p class="text-2xl font-semibold">586,200</p>
              <!-- <p class="text-xs text-green-500">+10% <i class="iconfont icon-upall"></i></p> -->
              <p class="text-xs text-red-500">-10% <i class="iconfont icon-downall"></i></p>
            </div>
          </div>
        </el-col>
        <el-col :md="24" :lg="6">
          <div class="bg-white rounded-md shadow-lg p-4">
            <div class="w-14 h-14 bg-blue-100 rounded-full inline-block text-center align-top leading-loose">
              <i class="iconfont icon-order text-blue-500 pt-2" style="font-size: 30px"></i>
            </div>
            <div class="inline-block ml-6">
              <p>合同履约率</p>
              <p class="text-2xl font-semibold">71.52%</p>
              <!-- <p class="text-xs text-green-500">+10% <i class="iconfont icon-upall"></i></p> -->
              <p class="text-xs text-red-500">-10% <i class="iconfont icon-downall"></i></p>
            </div>
          </div>
        </el-col>
        <el-col :md="24" :lg="6">
          <div class="bg-white rounded-md shadow-lg p-4">
            <div class="w-14 h-14 bg-orange-100 rounded-full inline-block text-center align-top leading-loose">
              <i class="iconfont icon-jsfx text-orange-500 pt-2" style="font-size: 30px"></i>
            </div>
            <div class="inline-block ml-6">
              <p>完成率</p>
              <p class="text-2xl font-semibold">79.63%</p>
              <p class="text-xs text-green-500">+10% <i class="iconfont icon-upall"></i></p>
              <!-- <p class="text-xs text-red-500">-10% <i class="iconfont icon-downall"></i></p> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- #endregion -->

    <!-- #region 物料统计............ -->
    <el-row :gutter="20" class="">
      <!-- 物料统计 -->
      <el-col :span="12">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md relative">
          <div class="absolute right-4 top-1">
            <el-radio-group v-model="form.amountCheck" size="small">
              <el-radio-button :label="0">一部</el-radio-button>
              <el-radio-button :label="1">二部</el-radio-button>
            </el-radio-group>
          </div>
          <div class="float-left pt-1">
            <span class="ml-4 text-base">物料统计</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="flex bg-white rounded-b-md">
          <div class="w-1/3 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm text-gray-400">核准采购额/物料量</p>
              <p class="text-2xl">120 <span class="text-sm">万</span> / 16 <span class="text-sm">个</span></p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/3 bg-white">
            <div class="p-4 pl-8">
              <p class="text-sm text-gray-400">成本量/比例值</p>
              <p class="text-2xl">8 <span class="text-sm">个</span> / 2.51</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/3 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm text-gray-400">售后量/解决量</p>
              <p class="text-2xl">8 <span class="text-sm">个</span> / 5 <span class="text-sm">个</span></p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 供应商统计 -->
      <el-col :span="12">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="absolute right-4 top-4">
            <el-radio-group v-model="form.supplierCheck" size="small">
              <el-radio-button :label="0">一部</el-radio-button>
              <el-radio-button :label="1">二部</el-radio-button>
            </el-radio-group>
          </div>
          <div class="float-left pt-1">
            <span class="ml-4 text-base">供应商统计</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="flex bg-white rounded-b-md">
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/4 bg-white">
            <div class="p-4 pl-8">
              <p class="text-sm text-gray-400">今日比价</p>
              <p class="text-sm"><span class="text-2xl font-semibold mr-1">16</span>家</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/4 bg-white">
            <div class="p-4 pl-8">
              <p class="text-sm text-gray-400">今日失单</p>
              <p class="text-sm"><span class="text-2xl font-semibold mr-1">16</span>家</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/4 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm text-gray-400">今日生效</p>
              <p class="text-sm"><span class="text-2xl font-semibold mr-1">1</span>家</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/4 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm text-gray-400">今日驳回</p>
              <p class="text-sm"><span class="text-2xl font-semibold mr-1">16</span>次</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 采购分析 -->
      <el-col :span="12">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">采购分析</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="bg-white rounded-b-md">
          <div class="flex">
            <div class="w-1/3 pt-6 pb-6 rounded-b-md">
              <div class="w-10 h-10 ml-6 bg-red-400 ring-4 ring-red-300 rounded-full text-white text-center pt-2 float-left inline-block">
                <span class="text-sm">成本</span>
              </div>
              <div class="float-left inline-block ml-2 text-sm">
                <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
              </div>
            </div>
            <div class="w-1/3 pt-6 pb-6 rounded-b-md">
              <div class="w-10 h-10 ml-6 bg-blue-400 ring-4 ring-blue-300 rounded-full text-white text-center pt-2 float-left inline-block">
                <span class="text-sm">比价</span>
              </div>
              <div class="float-left inline-block ml-2 text-sm">
                <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
              </div>
            </div>
            <div class="w-1/3 pt-6 pb-6 rounded-b-md">
              <div class="w-10 h-10 ml-6 bg-green-400 ring-4 ring-green-300 rounded-full text-white text-center pt-2 float-left inline-block">
                <span class="text-sm">物流</span>
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
              <p class="text-gray-400 text-xs">≥ 10万报价</p>
              <p class="text-xl font-semibold text-blue-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">&lt;5万报价</p>
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
          <div class="flex pt-6 pb-0">
            <div>
              <div class="w-20 h-8 ml-6 bg-orange-400 ring-4 ring-orange-300 rounded-full text-white text-center pt-1 float-left inline-block">
                <span class="text-sm">独立件</span>
              </div>
              <div class="float-left inline-block ml-6 text-sm">
                <p class="text-gray-400 text-sm"><span class="text-base font-semibold text-black">232</span> <span class="text-xs">个</span></p>
                <p class="text-gray-400 text-xs">采购一部 <span class="font-semibold text-gray-500">226 </span> 采购二部 <span class="text-gray-500 font-semibold">226 </span></p>
              </div>
            </div>
            <div class="ml-20">
              <div class="w-20 h-8 ml-6 bg-blue-400 ring-4 ring-blue-300 rounded-full text-white text-center pt-1 float-left inline-block">
                <span class="text-sm">组合件</span>
              </div>
              <div class="float-left inline-block ml-6 text-sm">
                <p class="text-gray-400 text-sm"><span class="text-base font-semibold text-black">232</span> <span class="text-xs">个</span></p>
                <p class="text-gray-400 text-xs">采购一部 <span class="font-semibold text-gray-500">226 </span> 采购二部 <span class="text-gray-500 font-semibold">226 </span></p>
              </div>
            </div>
          </div>
          <div class="flex p-4 pt-6">
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">≥ 1.8采购比例</p>
              <p class="text-xl font-semibold text-blue-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">≥ 2.0采购比例</p>
              <p class="text-xl font-semibold text-blue-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">&lt;2.0采购比例</p>
              <p class="text-xl font-semibold text-blue-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">已核准</p>
              <p class="text-xl font-semibold text-green-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">未核准</p>
              <p class="text-xl font-semibold text-red-500">9</p>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- #endregion -->
    <!-- #region 月采购金额。。。。。。。。。。 -->
    <el-row :gutter="20" class="pb-6">
      <!-- 月采购金额 -->
      <el-col :span="8">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">物料统计</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="flex bg-white rounded-b-md">
          <div id="myechart" class="rounded-b-md" />
        </div>
      </el-col>
      <!-- 物料采购统计 -->
      <el-col :span="8">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">物料采购统计</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="flex bg-white rounded-b-md">
          <div id="PurchaseEchart" class="rounded-b-md" />
        </div>
      </el-col>
      <!-- 供应商采购统计 -->
      <el-col :span="8">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">供应商采购统计</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="bg-white rounded-b-md">
          <div id="StatisticsEchart" class="rounded-b-md" />
        </div>
      </el-col>
    </el-row>
    <!-- #endregion -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import ProcurementSpecialistTop from './_Components/ProcurementSpecialistTop.vue'
import * as echarts from 'echarts'
let myChart: any = null
let myChart1: any = null
let myChart2: any = null

export default defineComponent({
  components: {
    ProcurementSpecialistTop
  },
  setup() {
    const data = reactive({})
    const form = reactive({
      amountCheck: 0, //一部
      supplierCheck: 0 //一部
    })
    // #region  物料统计
    let datademo = reactive({
      Xtitle: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    })
    const PurchaseCost = () => {
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
          data: ['采购一部', '采购二部']
        },
        xAxis: {
          type: 'category',
          data: datademo.Xtitle
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
            name: '采购一部',
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
            name: '采购二部',
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
    // #region  物料采购统计
    let MaterialDatademo = reactive({
      Xtitle: [0, 1]
    })
    const PurchaseMaterial = () => {
      if (myChart1 != null && myChart1 != '' && myChart1 != undefined) {
        myChart1.dispose() //解决echarts dom已经加载的报错
      }
      myChart1 = echarts.init(document.getElementById('PurchaseEchart')!)
      myChart1.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['失单', '超时']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: MaterialDatademo.Xtitle
        },
        yAxis: [
          {
            type: 'category',
            data: ['采购一部', '采购二部']
          }
        ],
        series: [
          {
            name: '失单',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230],
            itemStyle: {
              normal: {
                color: '#F56C6C',
                lineStyle: {
                  color: '#F56C6C'
                }
              }
            }
          },
          {
            name: '超时',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807],
            itemStyle: {
              normal: {
                color: '#FE9400',
                lineStyle: {
                  color: '#FE9400'
                }
              }
            }
          }
        ]
      })
      window.onresize = function () {
        myChart1.resize()
      }
    }
    // #endregion
    // #region 供应商采购统计

    let StatisticsDatademo = reactive({
      Xtitle: [0, 1]
    })
    const StatisticsCost = () => {
      if (myChart2 != null && myChart2 != '' && myChart2 != undefined) {
        myChart2.dispose() //解决echarts dom已经加载的报错
      }
      myChart2 = echarts.init(document.getElementById('StatisticsEchart')!)
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['供应商', '物料']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          boundaryGap: StatisticsDatademo.Xtitle
        },
        yAxis: [
          {
            type: 'category',
            data: ['采购一部', '采购二部']
          }
        ],
        series: [
          {
            name: '供应商',
            type: 'bar',
            data: [18203, 23489, 29034, 104970, 131744, 630230],
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
            name: '物料',
            type: 'bar',
            data: [19325, 23438, 31000, 121594, 134141, 681807],
            itemStyle: {
              normal: {
                color: '#19BE6B',
                lineStyle: {
                  color: '#19BE6B'
                }
              }
            }
          }
        ]
      })
      window.onresize = function () {
        myChart2.resize()
      }
    }
    // #endregion

    onMounted(() => {
      PurchaseCost()
      PurchaseMaterial()
      StatisticsCost()
    })

    return {
      data,
      form
    }
  }
})
</script>

<style lang="postcss" scoped>
#myechart,
#PurchaseEchart,
#StatisticsEchart {
  background: #ffffff;
  width: 100%;
  height: 18rem;
}
</style>
