<template>
  <div class="w-full h-full">
    <div class="w-full h-full" id="lossMonth"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
let lossMonth: any = null
export default defineComponent({
  setup() {
    let xData = ['总离职率', '被动离职率', '试用期离职率', '正式工离职率']
    xData = xData.reverse()
    let yData = ['70', '75', '76', '90', '95']
    let colorList = ['#97e7ff', '#75f5ff', '#00deff', '#0093ff', '#2a5fcf']
    let visualMapPiecesData: any = []
    // visualMap: {
    //   pieces: [
    //     { value: 123, label: '123（自定义特殊颜色）', color: 'grey' }
    //   ]
    // }
    for (var i = 0; i < xData.length; i++) {
      visualMapPiecesData.push({
        value: yData[i],
        label: xData[i],
        color: colorList[i]
      })
    }
    const state = () => {
      if (lossMonth != null && lossMonth != '' && lossMonth != undefined) {
        lossMonth.dispose() //解决echarts dom已经加载的报错
      }
      lossMonth = echarts.init(document.getElementById('lossMonth')!)
      lossMonth.setOption({
        title: {
          text: '离职率类别分析',
          textStyle: {
            fontSize: 16
          }
        },

        angleAxis: {
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          },
          clockwise: false
        },
        radiusAxis: {
          type: 'category',
          data: xData,
          z: 100,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: false
          },
          splitLine: {
            show: false
          }
        },
        polar: {},
        tooltip: {
          trigger: 'item',
          formatter: function (params: any, ticket: any, callback: any) {
            return params.name + ' : ' + ' (' + params.data + '%)'
          }
        },
        visualMap: {
          show: false,
          top: 50,
          x: 'right',
          // orient: 'right',
          textStyle: {
            color: '#000'
          },
          pieces: visualMapPiecesData
        },

        series: [
          {
            type: 'bar',
            data: yData,
            coordinateSystem: 'polar',
            itemStyle: {
              // 定制显示（按顺序）
              color: function (params: any) {
                return colorList[params.dataIndex]
              }
            }
          }
        ]
      })
      window.onresize = function () {
        lossMonth.resize()
      }
    }
    onMounted(() => {
      state()
    })
    return {}
  }
})
</script>
<style lang="postcss" scoped></style>
