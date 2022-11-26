<template>
  <div id="myecharts" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { reactive, onMounted, ref } from 'vue'
import { getCurrentInstance } from 'vue'
const option = {
  tooltip: {
    // trigger: 'axis'
  },
  legend: {
    data: ['报价量', '成交量']
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
      name: '报价量',
      type: 'bar',
      data: [
        2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3
      ]
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
      name: '成交量',
      type: 'bar',
      data: [
        2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
      ]
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
  setup() {
    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts
    const mychart: any = ref({})

    onMounted(() => {
      mychart.value = echarts.init(document.getElementById('myecharts'))
      mychart.value.setOption(option)
    })

    return {
      echarts,
      mychart,
      option,
      onMounted
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
