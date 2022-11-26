<template>
  <div class="w-full h-full">
    <div class="font-bold">工龄流失分析</div>
    <div class="w-full h-full" id="lossAge"></div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import * as echarts from 'echarts'
let lossAge: any = null
export default defineComponent({
  setup() {
    let dataright = reactive([
      {
        value: 200,
        name: '<7天'
      },
      {
        value: 300,
        name: '一年以上'
      },
      {
        value: 210,
        name: '半年'
      },
      {
        value: 110,
        name: '大半年'
      }
    ])
    const state = () => {
      if (lossAge != null && lossAge != '' && lossAge != undefined) {
        lossAge.dispose() //解决echarts dom已经加载的报错
      }
      lossAge = echarts.init(document.getElementById('lossAge')!)
      lossAge.setOption({
        tooltip: {
          trigger: 'item'
        },

        series: [
          {
            name: '等级结构',
            type: 'pie',
            radius: ['55%', '75%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'outside',
              formatter: '{d}%'
            },
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            labelLine: {
              show: true,
              label: {
                show: true,
                position: 'outside',
                formatter: '{b}: {@2012}',
                align: 'center',
                baseline: 'middle',
                fontSize: 12
              }
            },
            data: dataright
          }
        ]
      })
      window.onresize = function () {
        lossAge.resize()
      }
    }
    onMounted(() => {
      state()
    })
    return { dataright }
  }
})
</script>
<style lang="postcss" scoped></style>
