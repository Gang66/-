<template>
    <div class='flex justify-between items-end mb-2 pr-6'>
        <div>
            <div class='flex justify-between items-center relative pt-4 pl-6'>
                <div class='absolute text-blue-100 font-bold text-2xl italic'>COMMUNICATE</div>
                <div class='text-blue-500 text-sm font-semibold relative z-1'>沟通信息</div>
            </div>
            <div class='h-px w-16 bg-blue-500 ml-6' />
        </div>
        <div class='flex'>
            <el-button type='primary' color='#027AFF' size='small' :icon='Plus'> 新增联系人
            </el-button>
            <el-button
                type='primary'
                plain
                :icon='Plus'
                size='small'
                color='#027AFF'
                style='--el-button-bg-color: #fff;border-color: #027AFF'
            >沟通记录</el-button>
            <el-button
                type='primary'
                plain
                size='small'
                color='#027AFF'
                style='--el-button-bg-color: #fff;border-color: #027AFF'
                @mouseover='dataInfo.hover = true'
                @mouseleave='dataInfo.hover = false'
            >
                <svg-icon v-if='dataInfo.hover' icon-class='svg-xxjl' class='text-lg ' />
                <svg-icon v-else icon-class='svg-xxjl-blue' class='text-lg ' />
                消息记录
            </el-button>
        </div>
                    
    </div>
    <div class='px-12 pb-4 pt-2'>
        <div v-for='itm in 3' class='border-l-2 border-blue-500 border-dashed pb-6'>
            <div class='flex items-end relative yuan-sty'>
                <div class='w-3 h-3 rounded-full bg-blue-500 mr-4 relative -top-1' />
                <div class='text-sm mr-4 font-semibold'>胖小白</div>
                <div class='text-xs mr-4'>采购经理</div>
                <div class='text-xs text-gray-500'>2022/05/12</div>
            </div>
            <p class='flex items-center text-xs pl-6'>
                上门沟通促进成交量奥术大师大所大所多阿萨德静安寺；
                <span class='flex ml-2 items-center'>
                    ——
                    <img class='mx-1' :src='wei' alt=''>
                    <div class='font-semibold text-xs'>胖小白</div>
                </span>
            </p>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import wei from '/@/assets/img/sale/client/wei.png'
import { reactive } from 'vue'

const dataInfo = reactive({
    hover: false
})
</script>
<style scoped>
.yuan-sty{
    right: 7px;
    top: -4px;
}
</style>