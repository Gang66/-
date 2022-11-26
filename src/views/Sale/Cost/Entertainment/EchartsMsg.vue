<template>
  <div class="flex bg-white">
    <div class='w-60 h-60 p-2 bg-white  text-blue-800 font-bold text-center relative border-blue-400 border-solid border-4 rounded-lg mr-2 flex-shrink'>
      <div class='w-1/2  h-1/2 bg-white float-left p-1 border-blue-400 border-dashed border-b border-r'>
        <div class='h-full'>
          <div class='pt-2'>已通过</div>
          <div class='text-xl'>{{ headerInfo.Agree || 0 }}</div>
        </div>
      </div>
      <div class='w-1/2  h-1/2 bg-white float-left p-1'>
        <div class='h-full '>
          <div class='pt-2'>驳回</div>
          <div class='text-xl'>{{ headerInfo.Refuse || 0 }}</div>
        </div>
      </div>
      <div class='w-1/2  h-1/2 bg-white float-left p-1'>
        <div class='h-full '>
          <div class='pt-12'>发放金额</div>
          <div class='text-xl'>{{ headerInfo.GrantAmount || 0 }}</div>
        </div>
      </div>
      <div class='w-1/2  h-1/2 bg-white float-left p-1 border-blue-400 border-dashed border-t border-l'>
        <div class='h-full '>
          <div class='pt-12'>未发放金额</div>
          <div class='text-xl'>{{ headerInfo.UnGrantAmount || 0 }}</div>
        </div>
      </div>
      <div class='w-2/5  h-2/5 p-1 float-left bg-white rounded-full border-blue-400 border-solid border' style='position: absolute; top:4.6rem;left:4.3rem'>
        <div class='h-full text-red-600'>
          <div class='pt-6'>未审批</div>
          <div class='text-xl'>{{ headerInfo.Wait || 0 }}</div>
        </div>
      </div>
    </div>
    <div class="flex h-60 p-2 border-blue-400 border-solid border-4 rounded-lg flex-1">
      <div class="text-blue-800 font-bold flex flex-col">
        <div class='w-40 flex-1 text-center  p-1 border-blue-400 border-dashed border-r'>
          <div class='h-full flex  flex-col justify-center' >
            <div class='pt-4' v-if="prop.MsgType == 0">招待费</div>
            <div class='pt-4' v-else-if="prop.MsgType == 1">礼品费</div>
            <div class='pt-4' v-else-if="prop.MsgType == 2">其他费</div>
            <div class='pt-4' v-else-if="prop.MsgType == 3">居间费</div>
            <div class='pt-4' v-else-if="prop.MsgType == 4">样品费</div>
            <div class='pt-2'>数量/金额</div>
            <div class='text-xl'>{{ headerInfo.Agree || 0 }}/{{ headerInfo.Amount || 0 }}</div>
          </div>
        </div>
      </div>
      <div class="flex-1">
        <div id='myecharts' class="w-full"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetCostEntertainmentAnalysis, GetCostGiftAnalysis, GetCostOtherAnalysis, GetCostSampleAnalysis, GetCostIntermediatorAnalysis } from '/@/api/Sale/Cost'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { number_d } from 'echarts/types/dist/shared'

const prop = defineProps({
  MsgType: { // 0招待费1礼品费2其他费3居间费
    type: Number,
    default: 0
  }
})
//#region 绘制单条柱状图
const { proxy } = getCurrentInstance() as any
const echarts = proxy.$echarts
const mychart: any = ref({})

// 顶部数据
const headerInfo = ref({
  Agree: 0,
  Amount: 0,
  GrantAmount: 0,
  Refuse: 0,
  UnGrantAmount: 0,
  Wait: 0,
})

const option:any = {
  title: {
    text: '费用分布统计',
    subtext: '金额（万）'
  },
  legend: {
    // data: ['居间费'],
    // right: '10%'
  },
  tooltip: {},
  dataset: {
    source: []
  },
  xAxis: { type: 'category', name: '月份' },
  yAxis: {},
  grid: [{ bottom: '10%' }],
  series: [{ type: 'bar' }]
}

const setOption = () => {
  if (prop.MsgType == 0) {
    GetCostEntertainmentAnalysis({Type: 0}).then(res => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm:any) => {return [itm.Month, itm.Amount]})
        option.legend = {data: ['招待费'],right: '10%'}
        option.dataset = {source:[['product', '招待费'],...dataset]}
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait,
        }
      }
    })
  } else if (prop.MsgType == 1) {
    GetCostGiftAnalysis({Type: 0}).then(res => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm:any) => {return [itm.Month, itm.Amount]})
        option.legend = {data: ['礼品费'],right: '10%'}
        option.dataset = {source:[['product', '礼品费'],...dataset]}
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait,
        }
      }
    })
  } else if (prop.MsgType == 2) {
    GetCostOtherAnalysis({Type: 0}).then(res => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm:any) => {return [itm.Month, itm.Amount]})
        option.legend = {data: ['其他费'],right: '10%'}
        option.dataset = {source:[['product', '其他费'],...dataset]}
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait,
        }
      }
    })
  } else if (prop.MsgType == 3) {
    GetCostIntermediatorAnalysis({Type: 0}).then(res => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm:any) => {return [itm.Month, itm.Amount]})
        option.legend = {data: ['居间费'],right: '10%'}
        option.dataset = {source:[['product', '居间费'],...dataset]}
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait,
        }
      }
    })
  } else if (prop.MsgType == 4) {
    GetCostSampleAnalysis({Type: 0}).then(res => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm:any) => {return [itm.Month, itm.Amount]})
        option.legend = {data: ['样品费'],right: '10%'}
        option.dataset = {source:[['product', '样品费'],...dataset]}
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait,
        }
      }
    })
  }
}
//#endregion
onMounted(()=>{
  setOption()
})
</script>

<style scoped>
#myecharts {
  background: #ffffff;
  /* width: 63rem; */
  height: 14rem;
}
</style>