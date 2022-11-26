<template>
  <div class="w-full h-full" id="attrition"></div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
let attrition: any = null
export default defineComponent({
  setup() {
    let databasic = reactive({
      number: [430, 330, 480, 220, 520, 200],
      Xtitle: ['不适应企业文化', '薪酬待遇低', '缺少发展空间', '与上/下级关系不和', '无法胜任工作', '其他']
    })
    const state = () => {
      if (attrition != null && attrition != '' && attrition != undefined) {
        attrition.dispose() //解决echarts dom已经加载的报错
      }
      attrition = echarts.init(document.getElementById('attrition')!)
      attrition.setOption({
        title: {
          text: '部门流失原因',
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
          bottom: '16%'
        },
        xAxis: {
          type: 'category',
          data: databasic.Xtitle,
          axisTick: false,
          axisLabel: {
            show: true,
            interval: 0,
            formatter: (params: any) => {
              let newParamsName = ''
              let paramsNameNumber = params.length
              let provideNumber = 4 //显示每行几个字
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                  let tempStr = ''
                  let start = p * provideNumber
                  let end = start + provideNumber
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          }
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
        attrition.resize()
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
