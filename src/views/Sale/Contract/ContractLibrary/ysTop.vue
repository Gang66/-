<template>
    <div class='w-full h-full flex'>
        <el-col :md='24' :lg='5'>
            <div class='h-350 flex flex-col justify-between'>
                <htzl :type='1' />
                <!-- 危机专栏 -->
                <wjzl :list='wjzlList' />
            </div>
        </el-col>
        <el-col :md='24' :lg='9'>
            <div class='h-350 flex flex-col bg-white rounded overflow-hidden border-blue-300 h-full p-3'>
                <div class='flex items-top justify-between'>
                    <div class='text-blue-800'>客户应收到期账款分析</div>
                    <div class='w-32'>
                        <el-select v-model='topData.ys_money' class='' placeholder='按应收排序'>
                            <el-option
                                :key='0'
                                :value='0'
                                label='测试'
                            >测试</el-option>
                        </el-select>
                    </div>
                </div>
                <div class='flex-1'>
                    <div id='expire' ref='expire' class='w-full h-full' />
                </div>
            </div>
        </el-col>
        <el-col :md='24' :lg='10'>
            <htlb />
        </el-col>
    </div>
</template>
<script lang='ts' setup>
import { ref,getCurrentInstance, reactive } from 'vue'
import htzl from './components/htzl.vue'
import wjzl from './components/wjzl.vue'
import htlb from './components/htlb.vue'

const prop = defineProps({
    // 危机专栏
    wjzlList: {
        type: Array,
        default: []
    }
})
const { wjzlList } = reactive(prop)

// 绘制柱状图
const { proxy } = getCurrentInstance() as any
const echarts = proxy.$echarts
// 客户应收到期账款分析柱状图
const expire: any = ref({})
const expireOption = () => {
    let option = {
        color: ['#027AFF', '#FFA319'],
        legend: {
            selectedMode: false,
            right: 'right'
        },
        tooltip: {},
        dataset: {
            source: [
                ['product', '应收账款', '到期账款'],
                ['山东远大', 1500, 450],
                ['山东华隆', 1200, 250],
                ['河北金昌', 200, 950],
                ['甘肃路桥', 100, 450],
                ['甘肃酒钢', 1000, 410]
            ]
        },
        xAxis: { type: 'category' },
        yAxis: {
            name: '金额(万)'
        },
        series: [{ type: 'bar',barGap: 0 }, { type: 'bar',barGap: 0 }]
    }
    return option
}
// 绘制柱状图
const makeExpire = () => {
    let domMap = <any>document.getElementById('expire')
    domMap.removeAttribute('_echarts_instance_')
    expire.value = echarts.init(domMap)
    expire.value.setOption(expireOption(), true)
}

// 顶部筛选
const topData = reactive({
    ys_money: undefined
})

// 向父组件暴露方法
defineExpose({
    makeExpire
})
</script>
