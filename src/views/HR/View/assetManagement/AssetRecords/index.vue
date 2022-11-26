<template>
  <div class="assetsa-AssetRecords-index">
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
              <!-- <el-select placeholder="请选择" v-model="query.department">
                <el-option v-for="item in data.department" :key="item.value" :label="item.label" :value="item.value" />
              </el-select> -->
              <el-cascader v-model="data.query.department" :options="data.department" />
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- ECharts图表 -->
    <div class="flex justify-between mt-2 w-9/10">
      <!-- 左侧部门采购费用 -->
      <div class="h-96 w-1/3 flex flex-col justify-between">
        <div class="h-48 w-full bg-white p-4">
          <div class="text-sm">资产数量</div>
          <div class="text-5xl mt-4">{{ data.numberAssets }}</div>
          <div class="flex justify-between mt-4">
            <div class="flex flex-col text-blue-400"><span>+5.3% (400)</span> <span>环比</span></div>
            <div class="flex flex-col text-orange-400"><span>+3.2% (420)</span> <span>同比</span></div>
          </div>
        </div>
        <div id="myChart" class="h-48 mt-2 w-full bg-white p-2"></div>
      </div>
      <!-- 右侧采购费用对比 -->
      <div class="h-96 w-1/3 bg-white ml-2">
        <div class="flex justify-around mt-6">
          <span class="text-xs cursor-pointer" @click="ChangeProportion(index)" v-for="(item, index) in data.CenterTitle" :key="index" :class="{ 'text-blue-400': CenterCurrent === index }">{{ item }}</span>
          <!-- <span class="text-xs cursor-pointer">资产数量占比</span> -->
        </div>
        <div id="myChart1" class="h-80 w-full bg-white"></div>
      </div>
      <div id="myChart2" class="h-96 w-1/2 bg-white pt-6 pl-2 ml-2"></div>
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
      // 中间ECharts的标题切换
      CenterTitle: ['资产类别占比', '资产数量占比']
    })
    // 每三个数字加一个逗号
    data.numberAssets = data.numberAssets.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

    /**
     * 顶部筛选代码
     */

    // 切换时间时的高亮以及数据更新
    const changetime = (val: any) => {
      data.currentday = val
      if (val === 0) {
        dataLeft = dataLeft1
        dataright = dataright1
      } else if (val === 1) {
        dataLeft = dataLeft2
        dataright = dataright2
      } else if (val === 2) {
        dataLeft = dataLeft3
        dataright = dataright3
      }
      state()
      Source()
      proportion()
    }

    /**
     * 顶部筛选代码结束
     */

    /**
     * 左侧ECharts
     */
    let dataLeft = reactive({
      number: [350, 480]
    })
    const dataLeft1 = {
      number: [350, 480]
    }
    const dataLeft2 = {
      number: [30, 30]
    }
    const dataLeft3 = {
      number: [230, 330]
    }
    const state = () => {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose() //解决echarts dom已经加载的报错
      }
      myChart = echarts.init(document.getElementById('myChart')!)
      myChart.setOption({
        title: {
          text: '状态',
          left: 10,
          top: 15,
          textStyle: {
            fontSize: 12
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {},
        grid: {
          left: '0',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
          // data:
        },
        yAxis: {
          type: 'category',
          data: ['闲置', '在用']
        },
        series: [
          {
            type: 'bar',
            data: dataLeft.number,
            barWidth: 20,
            backgroundStyle: {
              color: 'rgba(0,0,0,0)'
            },
            itemStyle: {
              color: function (params: any) {
                // 定义一个颜色数组colorList
                var colorList = ['#fc701b', '#0091ff', '#d7a02b', '#c8ba23']
                return colorList[params.dataIndex]
              }
            }
          }
        ]
      })
      window.onresize = function () {
        myChart.resize()
      }
    }
    /**
     * 左侧ECharts结束
     */

    /**
     * 中间ECharts
     */
    let dataCenter = reactive([
      { value: 120, name: '家具用具' },
      { value: 220, name: '电子设备' },
      { value: 420, name: '图书文物' },
      { value: 320, name: '仪器仪表' }
    ])
    const dataCenter1 = [
      { value: 120, name: '家具用具' },
      { value: 220, name: '电子设备' },
      { value: 420, name: '图书文物' },
      { value: 320, name: '仪器仪表' }
    ]
    const dataCenter2 = [
      { value: 120, name: '沙发' },
      { value: 220, name: '桌子' },
      { value: 420, name: '椅子' },
      { value: 320, name: '空调' },

      { value: 520, name: '培训书籍' }
    ]
    let ChangeCenterTitle = ref('资产类别占比')
    const proportion = () => {
      if (myChart1 != null && myChart1 != '' && myChart1 != undefined) {
        myChart1.dispose() //解决echarts dom已经加载的报错
      }
      myChart1 = echarts.init(document.getElementById('myChart1')!)
      myChart1.setOption({
        title: {
          text: data.numberAssets,
          subtext: '全部数据',
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
        legend: {
          top: 'bottom',
          left: 'center',
          type: 'scroll'
        },
        series: [
          {
            name: ChangeCenterTitle.value,
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: '{d}%',

              align: 'center',
              baseline: 'middle',
              fontSize: 12
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
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
    const ChangeProportion = (val: any) => {
      CenterCurrent.value = val
      if (val === 0) {
        dataCenter = dataCenter1
        ChangeCenterTitle.value = '资产类别占比'
      } else if (val === 1) {
        dataCenter = dataCenter2
        ChangeCenterTitle.value = '资产数量占比'
      }
      proportion()
    }
    /**
     * 右侧ECharts结束
     */
    /**
     * 右侧ECharts
     */
    let dataright = reactive({
      money: [430, 330, 480, 220, 520],
      Xtitle: ['购入', '自建', '租赁物', '其他', '捐赠']
    })
    const dataright1 = {
      money: [120, 330, 380, 220, 20],
      Xtitle: ['购入', '自建', '租赁物', '其他', '捐赠']
    }
    const dataright2 = {
      money: [530, 130, 380, 220, 220],
      Xtitle: ['购入', '自建', '租赁物', '其他', '捐赠']
    }
    const dataright3 = {
      money: [130, 330, 380, 220, 420],
      Xtitle: ['购入', '自建', '租赁物', '其他', '捐赠']
    }
    const Source = () => {
      if (myChart2 != null && myChart2 != '' && myChart2 != undefined) {
        myChart2.dispose() //解决echarts dom已经加载的报错
      }
      myChart2 = echarts.init(document.getElementById('myChart2')!)
      myChart2.setOption({
        title: [
          {
            text: '来源统计',

            textStyle: {
              fontSize: 16
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: dataright.Xtitle
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
            name: '费用',
            data: dataright.money,
            type: 'bar',
            showBackground: true,
            barWidth: 30,
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
        myChart.resize()
      }
    }
    /**
     * 左侧ECharts结束
     */
    onMounted(() => {
      state()
      proportion()
      Source()
    })
    return {
      // ChangeCenterTitle,
      CenterCurrent,
      ChangeProportion,
      data,
      changetime,
      dataLeft,
      dataright,
      dataCenter
    }
  }
})
</script>
<style lang="postcss" scoped>
.assetsa-AssetRecords-index {
  :deep(.el-date-editor) {
    width: 13.75rem;
  }
}
</style>
