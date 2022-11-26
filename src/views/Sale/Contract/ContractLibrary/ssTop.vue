<template>
    <div class='w-full h-full flex'>
        <el-col :md='24' :lg='5'>
            <div class='h-350 flex flex-col justify-between'>
                <htzl :type='3' />
                <!-- 危机专栏 -->
                <wjzl :list='wjzlList' />
            </div>
        </el-col>
        <el-col :md='24' :lg='7'>
            <div class='h-350 flex flex-col bg-white rounded border-blue-300 h-full p-3'>
                <div class='flex items-top justify-between'>
                    <div class='text-blue-800'>诉讼客户分析</div>
                </div>
                <div class='flex-1'>
                    <div id='basicLawsuit' ref='basicLawsuit' class='w-full h-full' />
                </div>
            </div>
        </el-col>
        <el-col :md='24' :lg='12'>
            <sslb :admin-user='1' />
        </el-col>
    </div>
</template>
<script lang='ts' setup>
import { ref,getCurrentInstance, reactive } from 'vue'
import htzl from './components/htzl.vue'
import wjzl from './components/wjzl.vue'
import sslb from './components/sslb.vue'

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
// 诉讼客户分析
const lawsuit: any = ref({})
const lawsuitOption = () => {

    let option = {
        color: '#FFA319',
        legend: {
            selectedMode: false,
            right: 'right'
        },
        tooltip: {},
        xAxis: {
            type: 'category',
            data: ['山东远大', '山东华隆', '河北金昌', '甘肃路桥', '甘肃酒钢']
        },
        yAxis: {
            name: '金额(万)',
            type: 'value'
        },
        series: [
            {
                name: '诉讼金额',
                data: [1200, 200, 150, 80, 70],
                type: 'bar',
                barWidth: 30
            }
        ]
    }
    return option
}
// 绘制诉讼客户分析
const makeLawsuit = () => {
    let domMap = <any>document.getElementById('basicLawsuit')
    domMap.removeAttribute('_echarts_instance_')
    lawsuit.value = echarts.init(domMap)
    lawsuit.value.setOption(lawsuitOption(), true)
}

// 向父组件暴露方法
defineExpose({
    makeLawsuit
})
</script>