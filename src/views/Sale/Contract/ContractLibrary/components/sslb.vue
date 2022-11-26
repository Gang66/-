<template>
    <div class='h-350 flex flex-col bg-white rounded border-blue-300 h-full p-1 ranking'>
        <div class='rounded border-blue-300 h-full w-full overflow-hidden'>
            <div
                class='flex items-center justify-center bg-qing h-12 font-semibold relative'
            >
                <div class='flex items-center text-base text-black'>
                    <div>诉讼列表排行榜</div>
                    <!-- <img :src='down' alt='' class='ml-1'> -->
                </div>     
                <div class='absolute w-5 h-5 bg-blue-50 rounded-sm right-4'>
                    <img :src='find' alt='' class='w-full h-full p-0.5'>
                </div>
            </div>
            <el-table :data='dataInfo.list' style='width: 100%;height: 290px' :fit='false' :header-cell-style='dataInfo.table_header'>
                <el-table-column type='index' label=' ' align='center' :width='30'>
                    <template #default='scope'>
                        <span v-if='scope.$index==0'>
                            <svg-icon icon-class='svg-jp1' style='font-size: 1.75rem; margin: 0 auto 0;' />
                        </span>
                        <span v-else-if='scope.$index==1'>
                            <svg-icon icon-class='svg-jp2' style='font-size: 1.75rem; margin: 0 auto 0;' />
                        </span>
                        <span v-else-if='scope.$index==2'>
                            <svg-icon icon-class='svg-jp3' style='font-size: 1.75rem; margin: 0 auto 0;' />
                        </span>
                        <span v-else style='line-height: 1.75rem' class='font-bold'>{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop='name' :label='dataInfo.frist_name' align='center' :width='85'>
                    <template #default='scope'>
                        <span 
                            class='flex items-center justify-center'
                            :class='scope.$index == 0 ? &apos;text-red-600&apos; : scope.$index == 1 ? &apos;text-blue-600&apos; : scope.$index == 2 ? &apos;text-yellow-600&apos; : &apos;&apos;'
                        >
                            {{ scope.row.name }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column prop='people' :label='dataInfo.second_name' align='center' :width='95'>
                    <template #default='scope'>
                        <div class='flex items-center justify-center'>
                            <div class='w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-0.5'>潍</div>
                            <div>{{ scope.row.people }}</div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop='ywy_num' label='诉讼合同/涉案金额' align='center' :width='140' />
                <el-table-column prop='ywy_num' label='起诉合同/涉案金额' align='center' :width='140' />
                <el-table-column prop='ywy_num' label='执行合同/涉案金额' align='center' :width='140' />
                <el-table-column prop='ywy_num' label='诉讼占比' align='center' :width='80' />
            </el-table> 
        </div>
    </div>
</template>
<script lang="ts" setup>
import find from '/@/assets/img/sale/contractlibrary/find.png'
import { reactive, onMounted } from 'vue'
const prop = defineProps({
    // 用户身份 1、人员看板2、部门经理3、事业部经理4、大区经理页面
    adminUser: {
        type: Number,
        default: 1
    }
})

const { adminUser } = reactive(prop)

const dataInfo = reactive({
    frist_name: '',
    second_name: '',
    list: [
        {
            name: '司徒坚强',
            people: '张默默',
            ywy_num: 11,
            num: '689',
            money: '126',
            ratio: '12.8%'
        },
        {
            name: '司徒坚强',
            people: '张默默',
            num: '689',
            ywy_num: 11,
            money: '126',
            ratio: '12.8%'
        },
        {
            name: '司徒坚强',
            people: '张默默',
            num: '689',
            ywy_num: 11,
            money: '126',
            ratio: '12.8%'
        },
        {
            name: '司徒坚强',
            people: '张默默',
            num: '689',
            ywy_num: 11,
            money: '126',
            ratio: '12.8%'
        },
        {
            name: '司徒坚强',
            people: '张默默',
            num: '689',
            ywy_num: 11,
            money: '126',
            ratio: '12.8%'
        },
        {
            name: '司徒坚强',
            people: '张默默',
            num: '689',
            ywy_num: 11,
            money: '126',
            ratio: '12.8%'
        },
        {
            name: '司徒坚强',
            people: '张默默',
            num: '689',
            ywy_num: 11,
            money: '126',
            ratio: '12.8%'
        }
    ],
    table_header: {
        color: '#000',
        'border-bottom': '1px solid #707070'
    }
})
// 根据用户身份改变列表
const setTable = () => {
    if(adminUser == 1) {
        dataInfo.frist_name = '姓名'
        dataInfo.second_name = '部门'
    } else if (adminUser == 2) {
        dataInfo.frist_name = '部门'
        dataInfo.second_name = '事业部'
    } else if (adminUser == 3) {
        dataInfo.frist_name = '事业部'
        dataInfo.second_name = '大区'
    } else if (adminUser == 4) {
        dataInfo.frist_name = '事业部'
        dataInfo.second_name = '事业部数量'
    }
}

onMounted(() => {
    setTable()
})

</script>

<style scoped>
.ranking{
    :deep(.el-table .cell){
        padding: 0;
    }
    :deep(.el-table .el-table__cell){
        padding: 2px 0;
    }
}
.bg-qing{
    background: #76D2FF;
}
</style>
