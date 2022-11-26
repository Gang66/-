<template>
  <div class="w-full h-full" id="monthAnalysis"></div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
let monthAnalysis: any = null
export default defineComponent({
  setup() {
    let databasic = reactive({
      number: [430, 330, 480, 220, 520, 200],
      Xtitle: ['不适应企业文化', '薪酬待遇低', '缺少发展空间', '与上/下级关系不和', '无法胜任工作', '其他']
    })
    const state = () => {
      if (monthAnalysis != null && monthAnalysis != '' && monthAnalysis != undefined) {
        monthAnalysis.dispose() //解决echarts dom已经加载的报错
      }
      monthAnalysis = echarts.init(document.getElementById('monthAnalysis')!)
      monthAnalysis.setOption({
        title: {
          text: '流失月份分析',
          textStyle: {
            fontSize: 16
          }
        },
        legend: {},
        tooltip: {
          trigger: 'axis',
          showContent: true
        },
        dataset: {
          source: [
            ['product', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            ['2020', 20, 10, 30, 19, 31, 20, 31, 21, 20, 10, 30, 10],
            ['2021', 20, 10, 30, 20, 11, 63, 21, 11, 30, 30, 20, 50],
            ['2022', 40, 62, 69, 36, 45.2, 32.5, 20, 50, 30, 10, 40]
          ]
        },
        xAxis: { type: 'category' },
        yAxis: { gridIndex: 0 },
        grid: { top: '20%', bottom: '15%' },
        series: [
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            showSymbol: false
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            showSymbol: false
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            showSymbol: false
          },
          {
            type: 'line',
            smooth: true,
            seriesLayoutBy: 'row',
            emphasis: { focus: 'series' },
            showSymbol: false
          }
        ]
      })
      window.onresize = function () {
        monthAnalysis.resize()
      }
    }
    onMounted(() => {
      state()
    })
    return { databasic }
  }
})
</script>
<style lang="postcss" scoped></style>
