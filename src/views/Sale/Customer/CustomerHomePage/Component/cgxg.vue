<template>
    <div>
        <div class='flex justify-between items-end mb-2 pr-6'>
            <div>
                <div class='flex justify-between items-center relative pt-4 pl-6'>
                    <div class='absolute text-blue-100 font-bold text-2xl italic'>PURCHASE</div>
                    <div class='text-blue-500 text-sm font-semibold relative z-1'>采购习惯</div>
                </div>
                <div class='h-px w-16 bg-blue-500 ml-6' />
            </div>
            <el-button type='primary' color='#027AFF' size='small'>
                <svg-icon icon-class='svg-xxjl' class='text-lg' />消息记录
            </el-button>
        </div>
        <div class='px-12 pb-4 pt-2'>
            <div v-for='(itm, idx) in 3' :key='idx' class='border-l-2 border-blue-500 border-dashed pb-4'>
                <div class='flex items-end relative yuan-sty'>
                    <div class='w-3 h-3 rounded-full bg-blue-500 mr-4 relative -top-1' />
                    <div class='text-sm mr-4 font-semibold'>胖小白</div>
                    <div class='text-xs text-gray-500'>2022/05/12</div>
                </div>
                <p class='text-xs pl-6 leading-5'>
                    1、厂家对供应商的要求更倾向于品牌，另外合作客户优先，以前都是货到票到付90%，留10%质保金，质量等级要求较高，每批阀门都需要检测报告；<br>
                    2、可通过品牌或专业性或同类使用案例，主要是品牌，资质以及产品的质量；通过客户给指导价格，成交量多，因为采购告诉我，给我们的都是少量的，量多的都在领导手里
                    把控。
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
</script>

<style>
    .yuan-sty{
    right: 7px;
    top: -4px;
}
</style>