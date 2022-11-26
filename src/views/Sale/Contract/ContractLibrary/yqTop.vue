<template>
    <div class='w-full h-full flex'>
        <el-col :md='24' :lg='5'>
            <div class='h-350 flex flex-col justify-between'>
                <htzl :type='2' />
                <!-- 危机专栏 -->
                <wjzl :list='wjzlList' />
            </div>
        </el-col>
        <el-col :md='24' :lg='12'>
            <div class='h-350 flex flex-col bg-white rounded border-blue-300 h-full p-3'>
                <div class='flex items-top justify-between'>
                    <div class='text-blue-800'>客户逾期分析</div>
                </div>
                <div class='flex-1'>
                    <div id='basicOverdue' ref='basicOverdue' class='w-full h-full' />
                </div>
            </div>
        </el-col>
        <el-col :md='24' :lg='7'>
            <yqlb :admin-user='1' />
        </el-col>
    </div>
</template>
<script lang='ts' setup>
import { ref,getCurrentInstance, reactive } from 'vue'
import htzl from './components/htzl.vue'
import wjzl from './components/wjzl.vue'
import yqlb from './components/yqlb.vue'

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
// 客户逾期分析
const overdue: any = ref({})
const overdueOption = () => {
    let option = {
        color: ['#027AFF', '#FFA319'],
        tooltip: {
        },
        legend: {
            data: ['逾期金额', '逾期合同'],
            selectedMode: false,
            right: 'right'
        },
        xAxis: [
            {
                type: 'category',
                data: ['山东远大','山东华隆','河北金昌','甘肃路桥','甘肃酒钢','华能山东','陈山东实','中车山东','中铝山东']
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '金额（万）',
                axisLabel: {
                    formatter: '{value} 万'
                }
            },
            {
                type: 'value',
                name: '数量',
                show: false,
                axisLabel: {
                    formatter: '{value}'
                }
            }
        ],
        series: [
            {
                name: '逾期金额',
                type: 'bar',
                barWidth: 30,
                data: [
                    1500,1400,1300,1200,1100,1000,900,800,700
                ]
            },
            {
                name: '逾期合同',
                type: 'line',
                yAxisIndex: 1,
                data: [30,50,40,10,20,60,70,50,40]
            }
        ]
    }
    return option
}
// 绘制逾期分析
const makeOverdue = () => {
    let domMap = <any>document.getElementById('basicOverdue')
    domMap.removeAttribute('_echarts_instance_')
    overdue.value = echarts.init(domMap)
    overdue.value.setOption(overdueOption(), true)
}

// 向父组件暴露方法
defineExpose({
    makeOverdue
})
</script>