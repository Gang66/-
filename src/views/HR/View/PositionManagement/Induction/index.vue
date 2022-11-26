<template>
  <div class="PositionManagement-Induction-index">
    <!-- 数据筛选 -->
    <div>
      <el-card>
        <div class="flex justify-between items-center">
          <div class="font-black">数据筛选</div>
          <div class="flex items-center">
            <div class="flex mr-4">
              <span v-for="(item, index) in data.TopTimes" :key="index" @click="changetime(index)" class="mr-4 text-gray-400 cursor-pointer" :class="{ 'text-blue-500': data.currentday === index }">{{ item }}</span>
            </div>
            <div class="flex items-center">
              <el-date-picker class="mr-2" v-model="data.query.period" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
              <el-cascader v-model="data.query.department" :options="data.department" />
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- ECharts图表 -->
    <div class="flex justify-between mt-2 w-9/10">
      <!-- 左侧在职员工分析 -->
      <div class="h-96 w-1/4 flex flex-col justify-between bg-blue-500 rounded-md">
        <div class="h-1/3 w-full p-4">
          <div class="text-sm text-white">在职员工分析</div>
          <div class="text-5xl mt-4 text-white">{{ data.numberAssets }} <span class="text-xl">人</span></div>
          <div class="flex justify-between mt-4">
            <div class="flex flex-col text-white"><span>+5.3% (400)</span> <span class="text-blue-300">环比</span></div>
            <div class="flex flex-col text-white"><span>+3.2% (420)</span> <span class="text-blue-300">同比</span></div>
          </div>
        </div>
        <div id="myChart" class="h-2/3 mt-2 w-full p-2"></div>
      </div>
      <!-- 高层领导 -->
      <div class="h-96 w-1/4 ml-2 flex flex-col justify-between rounded-md">
        <div class="h-28 w-full bg-white mb-3 rounded-md flex justify-around items-center">
          <div class="flex mr-4">
            <div class="flex">
              <!-- 左侧图表 -->
              <div class="w-14 h-14 rounded bg-blue-200 text-center leading-12 text-4xl pt-2 text-blue-400">
                <el-icon><el-icon-Avatar /></el-icon>
              </div>
              <!-- 右侧文字 -->
              <div class="flex flex-col justify-between ml-4">
                <!-- 上方文字 -->
                <span>高层领导</span>
                <!-- 下方数字 -->
                <span class="text-gray-400 text-sm">均龄45岁</span>
              </div>
            </div>
          </div>
          <!-- 右侧柱形图 -->
          <div class="flex items-end h-20 w-1/4 justify-between">
            <!-- 左边 -->
            <div class="flex flex-col justify-end">
              <div class="h-10 w-5 bg-blue-500" :class="{ 'h-6': data.demo.nan < data.demo.nv }"></div>
              <span class="text-xs">男({{ data.demo.nan }})</span>
            </div>
            <!-- 右边 -->
            <div class="flex flex-col justify-end">
              <div class="h-6 w-5 bg-orange-400" :class="{ 'h-14': data.demo.nan < data.demo.nv }"></div>
              <span class="text-xs">女({{ data.demo.nv }})</span>
            </div>
          </div>
        </div>
        <div class="h-64 w-full bg-white rounded-md">
          <div class="flex justify-around mt-2">
            <span class="cursor-pointer" @click="trigger(0)" :class="{ 'text-blue-400': CenterPostCurrent === 0 }">员工学历分析</span>
            <span class="cursor-pointer" @click="trigger(1)" :class="{ 'text-blue-400': CenterPostCurrent === 1 }">年龄结构分析</span>
          </div>
          <div id="myChart1" class="h-60 w-full"></div>
        </div>
      </div>
      <!-- 中层领导 -->
      <div class="h-96 w-1/4 ml-2 flex flex-col justify-between rounded-md">
        <div class="h-28 w-full bg-white mb-3 rounded-md flex justify-around items-center">
          <div class="flex mr-4">
            <div class="flex">
              <!-- 左侧图表 -->
              <div class="w-14 h-14 rounded bg-blue-200 text-center leading-12 text-4xl pt-2 text-blue-400">
                <el-icon><el-icon-Avatar /></el-icon>
              </div>
              <!-- 右侧文字 -->
              <div class="flex flex-col justify-between ml-4">
                <!-- 上方文字 -->
                <span>中层领导</span>
                <!-- 下方数字 -->
                <span class="text-gray-400 text-sm">均龄32岁</span>
              </div>
            </div>
          </div>
          <!-- 右侧柱形图 -->
          <div class="flex items-end h-20 w-1/4 justify-between">
            <!-- 左边 -->
            <div class="flex flex-col justify-end">
              <div class="h-10 w-5 bg-blue-500" :class="{ 'h-6': data.demo.nan < data.demo.nv }"></div>
              <span class="text-xs">男({{ data.demo.nan }})</span>
            </div>
            <!-- 右边 -->
            <div class="flex flex-col justify-end">
              <div class="h-6 w-5 bg-orange-400" :class="{ 'h-14': data.demo.nan < data.demo.nv }"></div>
              <span class="text-xs">女({{ data.demo.nv }})</span>
            </div>
          </div>
        </div>
        <div class="h-64 w-full bg-white rounded-md pl-2">
          <div class="flex justify-around mt-2">
            <span class="cursor-pointer" @click="triggerPost(0)" :class="{ 'text-blue-400': CenterPostCurrent === 0 }">岗位结构分析</span>
            <span class="cursor-pointer" @click="triggerPost(1)" :class="{ 'text-blue-400': CenterPostCurrent === 1 }">归案归档分析</span>
          </div>
          <div id="myChart2" class="h-60 w-full"></div>
        </div>
      </div>
      <!-- 基层员工 -->
      <div class="h-96 w-1/4 ml-2 flex flex-col justify-between rounded-md">
        <div class="h-28 w-full bg-white mb-3 rounded-md flex justify-around items-center">
          <div class="flex mr-4">
            <div class="flex">
              <!-- 左侧图表 -->
              <div class="w-14 h-14 rounded bg-blue-200 text-center leading-12 text-4xl pt-2 text-blue-400">
                <el-icon><el-icon-Avatar /></el-icon>
              </div>
              <!-- 右侧文字 -->
              <div class="flex flex-col justify-between ml-4">
                <!-- 上方文字 -->
                <span>基层员工</span>
                <!-- 下方数字 -->
                <span class="text-gray-400 text-sm">均龄28岁</span>
              </div>
            </div>
          </div>
          <!-- 右侧柱形图 -->
          <div class="flex items-end h-20 w-1/4 justify-between">
            <!-- 左边 -->
            <div class="flex flex-col justify-end">
              <div class="h-10 w-5 bg-blue-500" :class="{ 'h-6': data.demo.nan < data.demo.nv }"></div>
              <span class="text-xs">男({{ data.demo.nan }})</span>
            </div>
            <!-- 右边 -->
            <div class="flex flex-col justify-end">
              <div class="h-6 w-5 bg-orange-400" :class="{ 'h-14': data.demo.nan < data.demo.nv }"></div>
              <span class="text-xs">女({{ data.demo.nv }})</span>
            </div>
          </div>
        </div>
        <div class="h-64 w-full bg-white rounded-md">
          <div class="flex justify-around mt-2">
            <span class="cursor-pointer" @click="triggerbasic(0)" :class="{ 'text-blue-400': CenterbasicCurrent === 0 }">员工籍贯分析</span>
            <span class="cursor-pointer" @click="triggerbasic(1)" :class="{ 'text-blue-400': CenterbasicCurrent === 1 }">工龄结构分析</span>
          </div>
          <div id="myChart3" class="h-60 w-full"></div>
        </div>
      </div>
      <!-- <div id="myChart2" class="h-96 w-1/4 bg-white pt-6 pl-2 ml-2"></div>
      <div id="myChart2" class="h-96 w-1/4 bg-white pt-6 pl-2 ml-2"></div> -->
    </div>
    <!-- 下列table表格 -->
    <div class="mt-2">
      <el-card> <purchaseForm /></el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import purchaseForm from './_Components/purchaseForm.vue'
import * as echarts from 'echarts'
let myChart: any = null
let myChart1: any = null
let myChart2: any = null
let myChart3: any = null
export default defineComponent({
  name: '',
  components: { purchaseForm },
  setup() {
    // 定义的所有变量
    const data = reactive({
      // 顶部筛选的高亮
      currentday: 0,
      // 筛选的部门数据
      department: [
        {
          value: 'guide',
          label: '集团',
          children: [
            {
              value: 'disciplines',
              label: '第一大区',
              children: [
                {
                  value: 'consistency',
                  label: '南京事业部',
                  children: [
                    {
                      value: 'ceshi',
                      label: '某XX'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX1'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX2'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX3'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX4'
                    }
                  ]
                },
                {
                  value: 'feedback',
                  label: '测试1'
                },
                {
                  value: 'efficiency',
                  label: '测试2'
                },
                {
                  value: 'controllability',
                  label: '测试3'
                }
              ]
            },
            {
              value: 'navigation',
              label: '第二大区',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation'
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation'
                }
              ]
            },
            {
              value: 'navigation',
              label: '第三大区',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation'
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation'
                }
              ]
            }
          ]
        }
      ],
      query: {
        // 筛选时间的开始和结束
        period: [],
        // 筛选的部门
        department: ''
      },
      // 顶部的时间渲染
      TopTimes: ['最近7天', '日', '周', '月', '季', '年'],
      // 资产数量
      numberAssets: '68000',
      //在高层领导中测试男女人数不同 div高度变化
      demo: {
        nan: 18,
        nv: 10
      }
    })
    // 每三个数字加一个逗号
    data.numberAssets = data.numberAssets.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

    // #region 顶部筛选代码
    // 切换时间时的高亮以及数据更新
    const changetime = (val: any) => {
      data.currentday = val
      if (val === 0) {
      } else if (val === 1) {
        // dataright = dataright2
      } else if (val === 2) {
      }
    }

    // #endregion

    // #region 左侧ECharts
    let dataLeft = reactive({
      money: [430, 330, 480, 220],
      Xtitle: ['直属部门', '第一大区', '第二大区', '销售大区'],
      totalMoney: '8600'
    })

    const PurchaseCost = () => {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose() //解决echarts dom已经加载的报错
      }
      myChart = echarts.init(document.getElementById('myChart')!)
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: '10%'
        },
        xAxis: {
          type: 'category',
          axisTick: {
            show: false
          },
          axisLine: false,
          splitLine: {
            show: false
          },
          axisline: {
            show: false
          },
          axisLabel: {
            color: 'white'
          },

          data: dataLeft.Xtitle
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false
            },
            axisLabel: {
              show: false
            }
          }
        ],
        series: [
          {
            name: '员工',
            data: dataLeft.money,
            type: 'bar',
            showBackground: true,
            barWidth: 25,
            backgroundStyle: {
              color: 'rgba(0,0,0,0)'
            },
            itemStyle: {
              color: '#fff',
              emphasis: {
                color: '#30e0bc'
              }
            }
          }
        ]
      })
      window.onresize = function () {
        myChart.resize()
      }
    }
    //#endregion

    // #region 高层领导
    let dataCenter = reactive([
      { value: 120, name: '博士' },
      { value: 220, name: '研究生' },
      { value: 420, name: '本科' }
    ])

    let ChangeCenterTitle = ref('员工学历分析')
    const proportion = () => {
      if (myChart1 != null && myChart1 != '' && myChart1 != undefined) {
        myChart1.dispose() //解决echarts dom已经加载的报错
      }
      myChart1 = echarts.init(document.getElementById('myChart1')!)
      myChart1.setOption({
        title: {
          text: data.numberAssets,
          subtext: '总人数',
          left: 'center',
          top: '40%',
          textStyle: {
            fontSize: 24,
            align: 'center'
          },
          subtextStyle: {
            fontSize: 12,
            color: '#c2c2c2'
          }
        },
        tooltip: {
          trigger: 'item'
        },

        series: [
          {
            name: ChangeCenterTitle.value,
            type: 'pie',
            radius: ['50%', '65%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{b}: {@2012}',
              align: 'center',
              baseline: 'middle',
              fontSize: 12
            },

            data: dataCenter
          }
        ]
      })
      window.onresize = function () {
        myChart1.resize()
      }
    }
    // 点击切换占比以及鼠标移入的标题
    const CenterCurrent = ref(0)
    const trigger = (val: any) => {
      CenterCurrent.value = val
      if (val === 0) {
        ChangeCenterTitle.value = '员工学历分析'
      } else if (val === 1) {
        ChangeCenterTitle.value = '年龄结构分析'
      }
      proportion()
    }
    // #endregion

    // #region 中层领导

    // 点击切换占比以及鼠标移入的标题
    const CenterPostCurrent = ref(0)
    let ChangePostTitle = ref('岗位结构分析')
    const triggerPost = (val: any) => {
      CenterPostCurrent.value = val
      if (val === 0) {
        ChangeCenterTitle.value = '岗位结构分析'
      } else if (val === 1) {
        ChangePostTitle.value = '归案归档分析'
      }
    }
    let dataPost = reactive({
      number: [350, 480, 100, 200]
    })
    const PostStructure = () => {
      if (myChart2 != null && myChart2 != '' && myChart2 != undefined) {
        myChart2.dispose() //解决echarts dom已经加载的报错
      }
      myChart2 = echarts.init(document.getElementById('myChart2')!)
      myChart2.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },

        legend: {},
        // grid: {
        //   left: '0',
        //   right: '4%',
        //   bottom: '14%',
        //   containLabel: true
        // },
        grid: {
          top: '6%',
          bottom: '20%',
          right: '4%',
          containLabel: true,
          left: '0'
        },
        xAxis: {
          type: 'value',

          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        yAxis: {
          type: 'category',
          data: ['销售', '营销', '后勤', '研发'],
          axisTick: false
        },
        series: [
          {
            type: 'bar',
            data: dataPost.number,
            barWidth: 20,
            backgroundStyle: {
              color: 'rgba(0,0,0,0)'
            },
            itemStyle: {
              color: '#0091ff'
            }
          }
        ]
      })
      window.onresize = function () {
        myChart1.resize()
      }
    }
    // #endregion

    // #region 基层员工
    // 点击切换占比以及鼠标移入的标题
    const CenterbasicCurrent = ref(0)
    let ChangebasicTitle = ref('员工籍贯分析')
    const triggerbasic = (val: any) => {
      CenterbasicCurrent.value = val
      if (val === 0) {
        ChangebasicTitle.value = '员工籍贯分析'
      } else if (val === 1) {
        ChangebasicTitle.value = '工龄结构分析'
      }
      basicStructure()
    }

    let databasic = reactive({
      number: [430, 330, 480, 220, 520],
      Xtitle: ['山东', '河南', '江西', '福建', '江苏']
    })
    const basicStructure = () => {
      if (myChart3 != null && myChart3 != '' && myChart3 != undefined) {
        myChart3.dispose() //解决echarts dom已经加载的报错
      }
      myChart3 = echarts.init(document.getElementById('myChart3')!)
      myChart3.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          top: '10%',
          bottom: '20%',
          right: '4%'
        },
        xAxis: {
          type: 'category',
          data: databasic.Xtitle,
          axisTick: false
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
            name: ChangebasicTitle.value,
            data: databasic.number,
            type: 'bar',
            showBackground: true,
            barWidth: 20,
            backgroundStyle: {
              color: 'rgba(0,0,0,0)'
            },
            itemStyle: {
              color: '#0091ff'
            }
          }
        ]
      })
      window.onresize = function () {
        myChart1.resize()
      }
    }
    // #endregion
    onMounted(() => {
      PurchaseCost()
      proportion()
      PostStructure()
      basicStructure()
    })
    return {
      CenterbasicCurrent,
      triggerbasic,
      databasic,
      dataPost,
      trigger,
      dataLeft,
      CenterCurrent,
      CenterPostCurrent,
      data,
      changetime,
      ChangePostTitle,
      triggerPost,
      dataCenter
    }
  }
})
</script>
<style lang="postcss" scoped>
.PositionManagement-Induction-index {
  :deep(.el-date-editor) {
    width: 220px;
  }
}
</style>
