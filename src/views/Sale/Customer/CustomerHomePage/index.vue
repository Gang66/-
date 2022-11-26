<template>
    <div class='container text-gray-800'>
        <!-- 头部 -->
        <div class='bg-white rounded-lg w-full mb-2'>
            <div class='w-full p-4 border-b border-blue-300'>
                <el-icon :size='26'>
                    <Back @click="routerGoEvent"/>
                </el-icon>
                <h1 class='font-bold text-center text-base flex justify-center'>
                    <span class='mr-2'>江苏华晨变压器股份有限公司</span>
                    <img v-for='(itm, idx) in client.rank_list[client.dataInfo.rank].num' :key='idx' class='title-icon mr-1.5' :src='jp' alt=''>
                </h1>
            </div>
            <div class='p-4 flex w-full'>
                <div class='flex flex-col items-center flex-none'>
                    <div class='w-24 h-24 bg-blue-300 rounded-lg text-white font-bold flex flex-col items-center justify-center shadow-xl'>江苏华晨</div>
                    <img class='relative -top-4' :src='client.dataInfo.cooperation ? yhz : whz' alt=''>
                </div>
                <div class='w-full'>
                    <div class='flex items-center mb-1 text-sm'>
                        <div
                            class='px-3.5 border mr-2'
                            :class='[
                                client.rank_list[client.dataInfo.rank].bg_color,
                                client.rank_list[client.dataInfo.rank].border_color,
                                client.rank_list[client.dataInfo.rank].text_color
                            ]'
                        >{{ client.rank_list[client.dataInfo.rank].name }}</div>
                        <div
                            class='px-3.5 border mr-2'
                            :class='[
                                client.industry_type_list[client.dataInfo.industry_type].bg_color,
                                client.industry_type_list[client.dataInfo.industry_type].border_color,
                                client.industry_type_list[client.dataInfo.industry_type].text_color
                            ]'
                        >{{ client.industry_type_list[client.dataInfo.industry_type].name }}-机电安装</div>
                    </div>
                    <div class='p-4 bg-blue-50 text-sm'>
                        <div class='grid grid-cols-3 gap-2'>
                            <div><span class='text-gray-400'>法定代表人：</span>测试1</div>
                            <div><span class='text-gray-400'>注册资金：</span>1000000000万</div>
                            <div><span class='text-gray-400'>统一社会信用代码：</span>99711684845T</div>
                            <div><span class='text-gray-400'>联系方式：</span>05386-5642154</div>
                            <div><span class='text-gray-400'>客户性质：</span>省管国企</div>
                            <div><span class='text-gray-400'>邮箱：</span>154348@163.com</div>
                            <div><span class='text-gray-400'>社保人员：</span>0人</div>
                            <div><span class='text-gray-400'>网址：</span><span class='text-blue-500'>www.baidu.com</span></div>
                            <div><span class='text-gray-400'>合作单位：</span>奥术大师多</div>
                            <div class='col-span-3'><span class='text-gray-400'>地址：</span>山东潍坊奎文胜利街</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 中间 -->
        <div class='grid grid-cols-12 gap-2 mb-2'>
            <div class='bg-white rounded-lg col-span-9 grid grid-cols-6 text-center center-line '>
                <div class='pt-6 pb-3'>
                    <div class='text-3xl font-bold pb-2 font-mono'>138000</div>
                    <div class='text-sm'>合同金额</div>
                </div>
                <div class='pt-6 pb-3'>
                    <div class='text-3xl font-bold pb-2 font-mono'>138000</div>
                    <div class='text-sm'>欠款金额</div>
                </div>
                <div class='pt-6 pb-3'>
                    <div class='text-3xl font-bold pb-2 font-mono'>138000</div>
                    <div class='text-sm'>逾期金额</div>
                </div>
                <div class='pt-6 pb-3'>
                    <div class='text-3xl font-bold pb-2 font-mono'>138000</div>
                    <div class='text-sm'>售后次数</div>
                </div>
                <div class='pt-6 pb-3'>
                    <div class='text-3xl font-bold pb-2 font-mono'>138000</div>
                    <div class='text-sm'>报价数量</div>
                </div>
                <div class='pt-6 pb-3'>
                    <div class='text-3xl font-bold pb-2 font-mono'>138000</div>
                    <div class='text-sm'>报价金额</div>
                </div>
            </div>
            <div class='bg-white rounded-lg col-span-3 px-3 py-4'>
                <div class='flex justify-between items-center relative'>
                    <div class='absolute text-blue-100 font-bold text-2xl italic'>OWNER</div>
                    <div class='text-blue-500 text-sm font-semibold relative z-1'>当前归属人</div>
                </div>
                <div class='h-px w-16 bg-blue-500' />
                <div class='flex items-center mt-5 ml-14 text-sm'>
                    <img class='mr-3' :src='man' alt=''>
                    <img class='mr-1' :src='wei' alt=''>
                    <div class='w-20'>庞小白</div>
                    <img class='mr-2' :src='phone' alt=''>
                    <div>1888888888</div>
                </div>
            </div>
        </div>
        <!-- 底部 -->
        <div class='grid grid-cols-12 gap-2 mb-2'>
            <div class='col-span-9'>
                <div class='bg-white rounded-lg w-full shadow-md pb-4 mb-2'>
                    <div class='shadow-inner shadow'>
                        <div class='border mx-16 flex divide-x border-b-0'>
                            <div v-for='(itm, idx) in dataInfo.tab_list' :key='itm.id' :class='dataInfo.current == idx ? &apos;change&apos; : &apos;&apos;' class='py-3 text-sm font-bold flex-1 text-center hover:bg-blue-400 hover:text-white pointer' @click='changeCurrent(idx)'>{{ itm.name }}</div>
                        </div>
                    </div>
                    <div class='w-full h-px bg-gray-200' />
                    <template v-if='dataInfo.current == 0'>
                        <!-- 竞争对手\付款方式 -->
                        <jzds />
                        <!-- 采购习惯 -->
                        <cgxg />
                        <!-- 沟通信息 -->
                        <gtxx />
                    </template>
                    <!-- 报价列表 -->
                    <bjlb v-if='dataInfo.current > 0' :type='dataInfo.current' />
                </div>
            </div>
            <div class='col-span-3 place-self-start w-full'>
                <!-- 联系人 -->
                <lxr />
                <!-- 备忘录 -->
                <bwl />
                <!-- 客户经历 -->
                <khjl />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
const table = () => {
    const dataInfo: any = reactive({
        current: 0,
        tab_list: [
            { id: 1, name: '情报管理' },
            { id: 2, name: '报价管理' },
            { id: 3, name: '合同管理' },
            { id: 4, name: '账款管理' },
            { id: 4, name: '售后管理' },
            { id: 4, name: '物流管理' },
            { id: 4, name: '项目管理' },
            { id: 4, name: '拜访记录' }
        ]
    })
    // 选择tab
    function changeCurrent(idx: number) {
        dataInfo.current = -1
        nextTick(() => {
            dataInfo.current = idx
        })
    }

    return {
        dataInfo,
        changeCurrent
    }
}
</script>
<script lang="ts" setup>
import { reactive, nextTick } from 'vue'
import { Back } from '@element-plus/icons-vue'
import router from '/@/router/index'
// 导入图片
import jp from '/@/assets/img/sale/client/jp.png'
import yhz from '/@/assets/img/sale/client/yhz.png'
import whz from '/@/assets/img/sale/client/whz.png'
import man from '/@/assets/img/sale/client/man.png'
import wei from '/@/assets/img/sale/client/wei.png'
import phone from '/@/assets/img/sale/client/phone.png'
// 导入组件
import bjlb from '/@/views/Sale/Customer/CustomerHomePage/Component/bjlb.vue'
import khjl from '/@/views/Sale/Customer/CustomerHomePage/Component/khjl.vue'
import bwl from '/@/views/Sale/Customer/CustomerHomePage/Component/bwl.vue'
import lxr from '/@/views/Sale/Customer/CustomerHomePage/Component/lxr.vue'
import cgxg from '/@/views/Sale/Customer/CustomerHomePage/Component/cgxg.vue'
import gtxx from '/@/views/Sale/Customer/CustomerHomePage/Component/gtxx.vue'
import jzds from '/@/views/Sale/Customer/CustomerHomePage/Component/jzds.vue'

// 客户信息
const client: any = reactive({
    dataInfo: {
        rank: 1, // 4、50强3、40强2、30强1、20强、0、10强
        industry_type: 2, // 行业类型 0、配套类 1、工业类 2、市政类
        cooperation: 0 // 是否合作
    },
    // 1-50强列表
    rank_list: [
        { name: '10强', num: 5, text_color: 'text-red-600', border_color: 'border-red-600', bg_color: 'bg-red-50' },
        { name: '20强', num: 4, text_color: 'text-blue-600', border_color: 'border-blue-600', bg_color: 'bg-blue-50' },
        { name: '30强', num: 3, text_color: 'text-yellow-800', border_color: 'border-yellow-800', bg_color: 'bg-yellow-bg' },
        { name: '40强', num: 2, text_color: 'text-green-600', border_color: 'border-green-600', bg_color: 'bg-green-50' },
        { name: '50强', num: 1, text_color: 'text-indigo-700', border_color: 'border-indigo-700', bg_color: 'bg-indigo-50' }
    ],
    // 行业类型列表
    industry_type_list: [
        { name: '配套类',text_color: 'text-purple-800', border_color: 'border-purple-800', bg_color: 'bg-purple-50' },
        { name: '工业类',text_color: 'text-blue-600', border_color: 'border-blue-600', bg_color: 'bg-blue-50' },
        { name: '市政类',text_color: 'text-yellow-500', border_color: 'border-yellow-500', bg_color: 'bg-yellow-50' }
    ]
})

const routerGoEvent = (val: any) => {
    router.go(-1)
}

const { dataInfo, changeCurrent } = table()
</script>
<style scoped>
.title-icon {
  width: 17px;
  height: 22px;
}
.el-icon {
  position: absolute;
}
.shadow {
  box-shadow: 0 -1px 3px rgb(231, 229, 229) inset;
}
.pointer {
  cursor: pointer;
}
.change {
  color: #fff;
  background: rgba(59, 130, 246, var(--tw-bg-opacity));
}
.center-line{
    background: url(../../../../assets/img/sale/client/lang-tab.png);
    background-size: 100% 100%;
}
</style>