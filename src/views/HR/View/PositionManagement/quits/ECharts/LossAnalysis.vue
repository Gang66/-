<template>
  <div class="w-full h-full" id="analysis"></div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
let analysis: any = null
export default defineComponent({
  setup() {
    let databasic = reactive({
      number: [430, 330, 480, 220],
      Xtitle: ['直属部门', '第一大区', '第二大区', '第三大区']
    })
    const state = () => {
      if (analysis != null && analysis != '' && analysis != undefined) {
        analysis.dispose() //解决echarts dom已经加载的报错
      }
      analysis = echarts.init(document.getElementById('analysis')!)
      analysis.setOption({
        title: {
          text: '部门流失分析',
          textStyle: {
            fontSize: 16,
            fontWeight: 'bolder'
          }
        },
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
            data: databasic.number,
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
        analysis.resize()
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
