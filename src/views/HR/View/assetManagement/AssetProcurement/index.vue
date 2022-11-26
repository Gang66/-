<template>
  <div class="assetManagement-AssetProcurement-index">
    <div>
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
                <el-date-picker class="mr-2" v-model="data.query.period" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                <!-- <el-select placeholder="请选择" v-model="data.query.department">
                  <el-option v-for="item in data.DepartmentDrop" :key="item.value" :label="item.label" :value="item.value" />
                </el-select> -->
                <el-cascader v-model="data.query.department" :options="data.DepartmentDrop" />
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- ECharts图表 -->
      <div class="flex justify-between mt-2">
        <!-- 左侧部门采购费用 -->

        <div id="myChart" class="h-96 w-2/5 bg-white p-2"></div>

        <!-- 右侧采购费用对比 -->
        <div id="myChart1" class="h-96 w-3/5 bg-white p-2 ml-2"></div>
      </div>
      <!-- 下列table表格 -->
      <div class="mt-4">
        <el-card> <purchaseForm /></el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import purchaseForm from './_Components/purchaseForm.vue'
import { getTime } from '/@/utils/tools'
import * as echarts from 'echarts'
let myChart: any = null
let myChart1: any = null
export default defineComponent({
  name: 'AssetProcurement',
  components: {
    purchaseForm
  },
  setup() {
    // 定义的所有变量
    const data = reactive({
      // 当月所有的天数
      MonthDay: [],
      // 顶部筛选的高亮
      currentday: 0,
      // 筛选的部门数据
      DepartmentDrop: [
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
      // 顶部的时间
      TopTimes: ['最近7天', '日', '周', '月', '季', '年'],
      // 筛选的数据
      query: {
        // 筛选时间的开始和结束
        period: [],
        // 筛选的部门
        department: ''
      }
    })

    /**
     * 根据当前日期获取其前七天的日期
     * @param month
     * @return {Array|*}
     */
    const getRecentDay = () => {
      let arr = []
      for (let i = 6; i >= 0; i--) {
        let temp = getDay(-i)
        arr.push(temp)
      }
      return arr
    }

    const getDay = (day: any) => {
      var today = new Date()
      var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
      today.setTime(targetday_milliseconds)
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      tMonth = doHandleMonth(tMonth + 1)
      tDate = doHandleMonth(tDate)
      return tMonth + '-' + tDate
    }
    const doHandleMonth = (month: any) => {
      var m = month
      if (month.toString().length == 1) {
        m = '0' + month
      }
      return m
    }
    // 获取当月的天数
    const { days } = getTime('month')
    for (let i = 1; i <= days; i++) {
      data.MonthDay.push(`${i}天`)
    }

    /**
     * 顶部筛选代码
     */

    // 切换时间时的高亮以及数据更新
    const changetime = (val: any) => {
      data.currentday = val
      if (val === 0) {
        datademo = datademo1
        dataright.Xtitle = getRecentDay()
      } else if (val === 1) {
        dataright.Xtitle = ['8点', '9点', '10点', '11点', '12点', '13点', '14点', '15点', '16点', '17点', '18点', '19点', '20点', '21点', '22点', '23点', '24点', '1点', '2点', '3点', '4点', '5点', '6点', '7点']
        datademo = datademo2
      } else if (val === 2) {
        datademo = datademo3
        dataright.Xtitle = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      } else if (val === 3) {
        dataright.Xtitle = data.MonthDay
      } else if (val === 4) {
        datademo = datademo3
        dataright.Xtitle = ['第一季度', '第二季度', '第三季度', '第四季度']
      } else if (val === 5) {
        dataright.Xtitle = ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
      }
      PurchaseCost()
      costComparison()
    }
    /**
     * 顶部筛选代码结束
     */

    /**
     * 左侧ECharts
     */
    let datademo = reactive({
      money: [430, 330, 480, 220],
      Xtitle: ['直属部门', '第一大区', '第二大区', '销售大区'],
      totalMoney: '8600'
    })
    const datademo1 = {
      money: [430, 330, 480, 220],
      Xtitle: ['直属部门', '第一大区', '第二大区', '销售大区'],
      totalMoney: '8600'
    }
    const datademo2 = {
      money: [30, 330, 80, 220],
      Xtitle: ['直属部门', '第一大区', '第二大区', '销售大区'],
      totalMoney: '8600'
    }
    const datademo3 = {
      money: [230, 330, 480, 20],
      Xtitle: ['直属部门', '第一大区', '第二大区', '销售大区'],
      totalMoney: '8600'
    }
    const PurchaseCost = () => {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose() //解决echarts dom已经加载的报错
      }
      myChart = echarts.init(document.getElementById('myChart')!)
      myChart.setOption({
        title: [
          {
            text: '部门采购费用',

            textStyle: {
              fontSize: 16
            }
          },
          {
            text: '记录审批通过的采购单',
            left: 110,
            top: 3,
            textStyle: {
              fontSize: 12,
              color: 'rgba(172, 172, 172)'
            }
          },
          {
            text: `${datademo.totalMoney}元`,
            left: '80%',
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
            name: '费用',
            data: datademo.money,
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

    /**
     * 右侧ECharts
     */
    let dataright = reactive({
      money: [100, 200, 100, 300, 200, 400, 100, 500, 300, 200, 400, 300, 200, 100, 500, 600, 700, 800, 100, 200, 200, 100, 300, 400],
      Xtitle: getRecentDay()
    })

    const costComparison = () => {
      if (myChart1 != null && myChart1 != '' && myChart1 != undefined) {
        myChart1.dispose() //解决echarts dom已经加载的报错
      }

      myChart1 = echarts.init(document.getElementById('myChart1')!)

      myChart1.setOption({
        title: [
          {
            text: '采购费用对比',

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
          boundaryGap: false,
          data: dataright.Xtitle
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            name: '费用',
            data: dataright.money,
            type: 'line'
          }
        ]
      })
      window.onresize = function () {
        myChart1.resize()
      }
    }
    /**
     * 右侧ECharts结束
     */

    onMounted(() => {
      PurchaseCost()
      costComparison()
    })
    return {
      getRecentDay,
      data,
      changetime,
      datademo,
      dataright
    }
  }
})
</script>
<style lang="postcss" scoped>
.assetManagement-AssetProcurement-index {
  :deep(.el-date-editor) {
    width: 220px;
  }
}
</style>
