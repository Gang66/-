<template>
    <div class='bg-white rounded-lg px-3 py-4 w-full mb-2'>
        <div class='justify-between flex items-end mb-2'>
            <div>
                <div class='flex justify-between items-center relative'>
                    <div class='absolute text-blue-100 font-bold text-2xl italic'>EXPERIENCE</div>
                    <div class='text-blue-500 text-sm font-semibold relative z-1'>客户经历</div>
                </div>
                <div class='h-px w-16 bg-blue-500 ' />
            </div>
        </div>
        <div class='relative pt-3'>
            <div v-for='(itm, idx) in khjlInfo.data_list' :key='idx'>
                <div v-if='itm.type != 4' class='w-2 h-2 rounded-full bg-blue-500 float-left relative jl-yuan' />
                <div v-else class='w-2 h-2 rounded-full bg-red-500 float-left relative jl-yuan' />
                <div class='border-l-2 border-blue-500 border-dashed ml-3'>
                    <p class=' text-xs pl-3 pb-6 relative -top-1.5'>
                        <span class='mr-3'>{{ itm.time }}</span>
                        <!-- 1、创建 -->
                        <template v-if='itm.type == 1'>
                            由
                            <span class=''>
                                <img class='mx-1 inline' :src='wei' alt=''>
                                <span class='text-xs text-blue-700 mr-1 font-semibold'>{{ itm.name }}</span>
                            </span>
                            创建
                        </template>
                        <!-- 2、共享 -->
                        <template v-else-if='itm.type == 2'>
                            由
                            <span class=''>
                                <img class='mx-1 inline' :src='wei' alt=''>
                                <span class='text-xs text-blue-700 mr-1 font-semibold'>{{ itm.name }}</span>
                            </span>
                            申请共享
                        </template>
                        <!-- 3、终止共享 -->
                        <template v-else-if='itm.type == 3'>
                            由
                            <span class=''>
                                <img class='mx-1 inline' :src='wei' alt=''>
                                <span class='text-xs text-blue-700 mr-1 font-semibold'>{{ itm.name }}</span>
                            </span>
                            结束共享
                        </template>
                        <!-- 4、员工离职，客户无报价： -->
                        <template v-else-if='itm.type == 4'>
                            由
                            <span class=''>
                                <img class='mx-1 inline' :src='wei' alt=''>
                                <span class='text-xs text-blue-700 mr-1 font-semibold'>{{ itm.name }}</span>
                            </span>
                            离职，客户流入公海
                        </template>
                        <!-- 5、领导/管理员分配 -->
                        <template v-else-if='itm.type == 5'>
                            由系统管理员分配给
                            <span class=''>
                                <img class='mx-1 inline' :src='wei' alt=''>
                                <span class='text-xs text-blue-700 mr-1 font-semibold'>{{ itm.name }}</span>
                            </span>
                        </template>
                        <!-- 6、客户有报价/合同，员工离职： -->
                        <template v-else-if='itm.type == 6'>
                            由
                            <span class=''>
                                <img class='mx-1 inline' :src='wei' alt=''>
                                <span class='text-xs text-blue-700 mr-1 font-semibold'>{{ itm.name }}</span>
                            </span>
                            离职，客户自动转入
                            <span class=''>
                                <img class='mx-1 inline' :src='wei' alt=''>
                                <span class='text-xs text-blue-700 mr-1 font-semibold'>{{ itm.name }}</span>
                            </span>
                        </template>
                    </p>
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import wei from '/@/assets/img/sale/client/wei.png'
const khjlInfo:any = reactive({
    data_list: [
        { name: '测试', text: '创建', time: '2021/05/30', type: 1 },
        { name: '胖小白', text: '离职，客户流入公海', time: '2021/06/30', type: 2 },
        { name: '胖小白', text: '离职，客户流入公海', time: '2021/06/30', type: 3 },
        { name: '胖小白', text: '离职，客户流入公海', time: '2021/06/30', type: 4 },
        { name: '胖小白', text: '离职，客户流入公海', time: '2021/06/30', type: 5 },
        { name: '胖小白', text: '离职，客户流入公海', time: '2021/06/30', type: 6 }
    ]
})
</script>

<style>
.jl-yuan{
    top: 0px;
    left: 9px;
}
</style>