<template>
    <div class='bg-white rounded-lg px-3 py-4 w-full mb-2'>
        <div class='justify-between flex items-end mb-3'>
            <div>
                <div class='flex justify-between items-center relative'>
                    <div class='absolute text-blue-100 font-bold text-2xl italic'>CONTACTS</div>
                    <div class='text-blue-500 text-sm font-semibold relative z-1'>联系人</div>
                </div>
                <div class='h-px w-16 bg-blue-500 ' />
            </div>
            <a href='javascript:;' class='text-blue-500 text-xs'>更多 >></a>
        </div>
        <div>
            <div v-for='itm in 4' class='flex items-center p-2 bg-gray-50 border border-gray-200 rounded mb-1'>
                <div class='w-14 h-14 rounded flex items-center justify-center flex-col bg-green-400 text-white text-sm font-bold flex-none mr-2'>居间人</div>
                <div class='flex-grow'>
                    <div class='flex items-center justify-between mb-2'>
                        <div class='flex items-end'>
                            <img class='w-3 h-3 mr-1 mb-1' :src='man' alt=''>
                            <div class='mr-1 text-sm font-semibold'>常远</div>
                            <div class='mr-1 text-xs text-gray-400'>男</div>
                            <div class='mr-1 text-xs text-gray-400'>经理</div>
                        </div>
                        <a href='javascript:;' class='text-blue-500 text-xs'>详情</a>
                    </div>
                    <div class='grid gap-y-1 grid-cols-2 text-xs'>
                        <div class='flex items-center'>
                            <img class='w-3 h-3 mr-1' :src='phone' alt=''>
                            <div>15265652154</div>
                        </div>
                        <div class='flex items-center'>
                            <img class='w-3 h-3 mr-1' :src='mobile' alt=''>
                            <div>0539-5684614</div>
                        </div>
                        <div class='flex items-center'>
                            <img class='w-3 h-3 mr-1' :src='wixin' alt=''>
                            <div>15265652154</div>
                        </div>
                        <div class='flex items-center'>
                            <img class='w-3 h-3 mr-1' :src='email' alt=''>
                            <div>1545467@qq.com</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import csImg from '/@/assets/img/cs_img.jpeg'
import man from '/@/assets/img/sale/client/man.png'
import phone from '/@/assets/img/sale/client/phone.png'
import wixin from '/@/assets/img/sale/client/wixin.png'
import mobile from '/@/assets/img/sale/client/mobile.png'
import email from '/@/assets/img/sale/client/email.png'
</script>

<style>
</style>