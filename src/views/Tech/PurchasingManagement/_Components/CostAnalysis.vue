<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pt-4 pb-4">
      <div id="myechart" class="rounded-b-md" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted, getCurrentInstance } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'

const option = {
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  legend: {
    data: ['高于2.0', '1.8~2.0', '低于1.8']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '高于2.0',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210, 20, 700, 600, 100, 158],
      itemStyle: {
        normal: {
          color: '#33CC33',
          lineStyle: {
            color: '#33CC33'
          }
        }
      }
    },
    {
      name: '1.8~2.0',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320, 120, 132, 101, 134, 90],
      itemStyle: {
        normal: {
          color: '#0066FF',
          lineStyle: {
            color: '#0066FF'
          }
        }
      }
    },
    {
      name: '低于1.8',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320, 120, 132, 101, 134, 90],
      itemStyle: {
        normal: {
          color: '#FF0000',
          lineStyle: {
            color: '#FF0000'
          }
        }
      }
    }
  ]
}

export default defineComponent({
  components: {
    OpenWindow
  },
  setup(props, context: SetupContext) {
    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts
    const mychart: any = ref({})

    const data = reactive({
      input: '',
      value: ''
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })

    onMounted(() => {
      mychart.value = echarts.init(document.getElementById('myechart'))
      mychart.value.setOption(option)
    })

    return {
      boxStyle,
      closeWindow,
      data
    }
  }
})
</script>
<style lang="postcss" scoped>
#myechart {
  background: #ffffff;
  width: 100%;
  height: 18rem;
}
</style>
