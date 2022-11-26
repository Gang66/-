<template>
  <OpenWindow class="PositionManagement-OnJob-Components-addPurchaseForm" title="销售专员指标" :isShow="true" :boxStyle="data.boxStyle" @closeWindow="Cancel()">
    <div class="p-4 mt-2 flex">
      <div id="Sales" class="h-96 w-2/3"></div>
      <div id="Sales1" class="h-96 w-1/3"></div>
    </div>
  </OpenWindow>
</template>
<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import * as echarts from 'echarts'
let Sales: any = null
let Sales1: any = null
export default defineComponent({
  emits: ['closeWindow'],
  components: { OpenWindow },
  setup(prop, ctx) {
    const data = reactive({
      boxStyle: {
        boxWidth: 'w-1000',
        boxHeight: ''
      }
    })

    // #region 左侧柱状图
    let dataright = reactive({
      money: [180, 290, 230, 80, 230],
      Xtitle: ['报价量', '金额量', '合同量', '渠道量', '业绩量']
    })

    const Source = () => {
      if (Sales != null && Sales != '' && Sales != undefined) {
        Sales.dispose() //解决echarts dom已经加载的报错
      }
      Sales = echarts.init(document.getElementById('Sales')!)
      Sales.setOption({
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
          data: dataright.Xtitle,
          axisLabel: {
            // interval: 2
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
        Sales.resize()
      }
    }
    //#endregion
    const Cancel = () => {
      ctx.emit('closeWindow')
    }
    // #region 右侧饼图
    var right = [
      [
        { name: '成交率', value: 80 },
        { name: '未成交', value: 20 }
      ],
      [
        { name: '业绩达标率', value: 80 },
        { name: '未达标', value: 20 }
      ]
    ]
    const state = () => {
      if (Sales1 != null && Sales1 != '' && Sales1 != undefined) {
        Sales1.dispose() //解决echarts dom已经加载的报错
      }
      Sales1 = echarts.init(document.getElementById('Sales1')!)
      Sales1.setOption({
        tooltip: {
          trigger: 'item'
        },
        color: ['#0091ff', '#f6f6f6'],
        series: right.map(function (data: any, idx: any) {
          var top = idx * 50
          return {
            type: 'pie',
            radius: [50, 65],
            top: top + '%',
            height: '33.33%',
            left: 'center',
            width: 400,
            itemStyle: {
              borderColor: '#fff',
              borderWidth: 1
            },
            label: {
              show: true,
              position: 'center',
              color: '#9A9EBA',
              formatter: data[0].name + data[0].value + '%'
            },
            labelLine: {
              show: false
            },

            data: data
          }
        })
      })
      window.onresize = function () {
        Sales1.resize()
      }
    }
    // #endregion
    onMounted(() => {
      Source()
      state()
    })
    return {
      right,
      dataright,
      Cancel,
      data
    }
  }
})
</script>
<style lang="postcss" scoped>
.PositionManagement-OnJob-Components-addPurchaseForm {
  :deep(.TableTitle) {
    .el-table__header {
      font-size: 12px;
    }
    .el-input__wrapper {
      box-shadow: none;
    }
    .el-input__inner {
      &::placeholder {
        font-size: 12px;
      }
    }
  }
}
</style>
