<template>
    <div class='flex justify-between items-end mb-3 pr-6'>
        <div>
            <div class='flex justify-between items-center relative pt-4 pl-6'>
                <div class='absolute text-blue-100 font-bold text-2xl italic'>COMPETITOR</div>
                <div class='text-blue-500 text-sm font-semibold relative z-1'>竞争对手</div>
            </div>
            <div class='h-px w-16 bg-blue-500 ml-6' />
        </div>
        <el-button type='primary' color='#027AFF' size='small'>
            <svg-icon icon-class='svg-add_friend' class='text-lg' />新增竞争对手</el-button>
    </div>
    <div class='px-6'>
        <el-table
            :data='jzdsInfo.tableData'
            style='width: 100%'
            :header-cell-style='jzdsInfo.headSty'
        >
            <el-table-column prop='id' label='序号' align='center' width='100' />
            <el-table-column prop='name' label='公司名称' />
            <el-table-column prop='relation' label='客户关系' align='center' />
            <el-table-column prop='address' label='公司驻地' align='center' />
            <el-table-column prop='status' label='合作状态' align='center' />
            <el-table-column label='操作' align='center' width='100'>
                <template #default='scope'>
                    <a href='javascript:;' class='text-blue-500'>去分析</a>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <div>
        <div class='flex justify-between items-end mb-3 pr-6'>
            <div>
                <div class='flex justify-between items-center relative pt-4 pl-6'>
                    <div class='absolute text-blue-100 font-bold text-2xl italic'>PAYMENT</div>
                    <div class='text-blue-500 text-sm font-semibold relative z-1'>付款方式</div>
                </div>
                <div class='h-px w-16 bg-blue-500 ml-6' />
            </div>
            <el-button type='primary' color='#027AFF' size='small'>
                <svg-icon icon-class='svg-xxjl' class='text-lg' />消息记录</el-button>
        </div>
        <div class='flex items-center justify-center text-sm mx-6 py-1' style='background: #E7F4FE'>
            <div class='flex items-center'>
                <div class='border-gray-300 border rounded px-1 mr-1 bg-white'>
                    <input v-model='jzdsInfo.yf' class='sm-ipt w-6' :min='0' type='number' :disabled='jzdsInfo.disabled'>%
                </div>
                <div>预付</div>
            </div>
            <div class='text-2xl px-4 font-extralight'>+</div>
            <div class='flex items-center'>
                <div class='border-gray-300 border rounded px-1 mr-1 bg-white'>
                    <input v-model='jzdsInfo.fh' class='sm-ipt w-6' :min='0' type='number' :disabled='jzdsInfo.disabled'>%
                </div>
                <div>发货</div>
            </div>
            <div class='text-2xl px-4 font-extralight'>+</div>
            <div class='flex items-center'>
                <div class='border-gray-300 border rounded px-1 mr-1 bg-white'>
                    <input v-model='jzdsInfo.dh' class='sm-ipt w-6' :min='0' type='number' :disabled='jzdsInfo.disabled'>%
                </div>
                <div>到货</div>
            </div>
            <div class='text-2xl px-4 font-extralight'>+</div>
            <div class='flex items-center'>
                <div class='border-gray-300 border rounded px-1 mr-1 bg-white'>
                    <input v-model='jzdsInfo.ys' class='sm-ipt w-6' :min='0' type='number' :disabled='jzdsInfo.disabled'>%
                </div>
                <div>验收</div>
            </div>
            <div class='text-2xl px-4 font-extralight'>+</div>
            <div class='flex items-center'>
                <div class='border-gray-300 border rounded px-1 mr-1 bg-white'>
                    <input v-model='jzdsInfo.bzj' class='sm-ipt w-6' :min='0' type='number' :disabled='jzdsInfo.disabled'>%
                </div>
                <div>质保金</div>
            </div>

            <div class='pl-6 text-red-500'>=100%</div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const jzdsInfo:any = reactive({
    disabled: true,
    tableData: [
        {
            id: 1,
            name: '山东XXX装备',
            relation: '利益关系',
            address: '山东潍坊',
            status: '合作顺利'
        },
        {
            id: 2,
            name: '山东XXX装备',
            relation: '利益关系',
            address: '山东潍坊',
            status: '合作顺利'
        }
    ],
    // 列表样式
    headSty: {
        color: '#303133',
        background: '#E7F4FE'
    },
    yf: 30,
    fh: 20,
    dh: 20,
    ys: 20,
    bzj: 10
})
</script>

<style scoped>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
input[type='number'] {
  -moz-appearance: textfield;
}
.sm-ipt{
    background:none;
    outline:none;
    border:none;
}
</style>