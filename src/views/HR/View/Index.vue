<template>
    <div class='home-content'>
        <div class='home-bannder w-full h-40 rounded-lg mb-3 clear-both overflow-hidden'>
            <img src='../../../assets/img/hr/home/bannder_01.png' class='h-full float-left'>
            <div class='float-right pr-3'>
                <div class='w-52 h-16 overflow-hidden mb-3'><iframe src='https://i.tianqi.com/?c=code&a=getcode&id=76&icon=1' /></div>
                <!-- <iframe allowtransparency="true" frameborder="0" width="190" height="36" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=&f=ffffff&ltf=ffcccc&htf=ff0000&q=1&e=1&a=1&c=54511&w=180&h=36&align=center"></iframe> -->
                <Clock />
            </div>
        </div>
        <el-row :gutter='10'>
            <el-col :md='24' :lg='12'>
                <div class='bf-card mb-3  amt_left'>
                    <div class='rounded-lg'>
                        <div class='px-3 pt-3 flex justify-between items-center'>
                            <div class='text-1xl font-black bf-title-color'>考勤汇总表</div>
                            <div class=''>
                                <span class='text-xs bf-text-color-regular mr-1'>单位：人</span>
                                <el-select v-model='kaoqinValue' style='width: 70px' size='small'>
                                    <el-option v-for='item in [&apos;今日&apos;, &apos;本周&apos;, &apos;本月&apos;]' :key='item' :label='item' :value='item' />
                                </el-select>
                            </div>
                        </div>
                        <div class='grid gap-3 grid-cols-4 mx-7 mt-3'>
                            <div v-for='o in [&apos;应出勤&apos;, &apos;实出勤&apos;, &apos;累计异常&apos;, &apos;累计离职&apos;]' :key='o' class='p-1 text-center'>
                                <div class='text-xs bf-text-color-regular'>{{ o }}</div>
                                <div class='text-xl font-semibold'>10</div>
                            </div>
                        </div>
                        <div class='grid gap-3 grid-cols-4 px-3 pb-3 mt-1'>
                            <template v-for='(o,index) in [&apos;集团总部&apos;, &apos;第一大区&apos;, &apos;第二大区&apos;, &apos;第三大区&apos;]' :key='index'>
                                <div class='text-center rounded-lg overflow-hidden pb-2 amtlb_section'>
                                    <div class='mb-1 amtlbs_top' :class='index==1?&apos;amtlbs_top_bg&apos;:index==2?&apos;amtlbs_top_bgTwo&apos;:index==3?&apos;amtlbs_top_bgThree&apos;:&apos;&apos;'>{{ o }}</div>
                                    <div class='text-xl font-semibold'>67/6/<span class='text-red-400'>1</span></div>
                                    <div class='text-sm bf-text-color-regular'>应出/实出/离职</div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </el-col>
            <el-col :md='24' :lg='12'>
                <div class='amt_right'>
                    <div class='amtr_title'>我的商学院</div>
                    <div class='amtr_subTitle'>不向前不知道路远，不学习不明白真理</div>
                    <div class=''>
                        <el-link href='/#/SchoolViewHome' target='_blank' :underline='false'>
                            <el-button type='primary' round class='amtr_button'>马上去学习</el-button>
                        </el-link>
                    </div>
                    <img src='/src/assets/img/hr/home/indexshanxueyuan_ren.png' class='amtr_image'>
                </div>
                <!-- <div class="mb-1 cursor-pointer" @click="onGetUser">
          <el-link href="/#/SchoolViewHome" target="_blank" :underline="false"> <img src="../../../assets/img/hr/home/school_bannder.png" /></el-link>
        </div> -->
            </el-col>
            <el-col :md='24' :lg='12'>
                <div class='bf-card mb-2'>
                    <el-card shadow='never'>
                        <template #header>
                            <div class='card-header flex justify-between items-center'>
                                <div class='card-header-title'>待办逾期</div>
                            </div>
                        </template>
                        <div class='grid gap-3 grid-cols-5 p-3 h-40'>
                            <div v-for='o in 10' :key='o' class='p-1 text-center'>
                                <div class='text-2xl font-black font-family-share-tech-mono'>10</div>
                                <div class='text-sm text-gray-400'>招聘审批</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :md='24' :lg='12'>
                <div class='bf-card mb-3'>
                    <el-card shadow='never'>
                        <template #header>
                            <div class='card-header flex justify-between items-center'>
                                <div class='card-header-title'>关停预警</div>
                            </div>
                        </template>
                        <div class='grid gap-3 grid-cols-5 p-3 h-40'>
                            <div v-for='o in 10' :key='o' class='p-1 text-center'>
                                <div class='text-2xl font-black font-family-share-tech-mono'>10</div>
                                <div class='text-sm text-gray-400'>招聘审批</div>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :md='24' :lg='12'>
                <div class='bf-card mb-3'>
                    <el-card shadow='never'>
                        <template #header>
                            <div class='card-header flex justify-between items-center'>
                                <div class='card-header-title'>创新举措公示</div>
                                <div class='card-header-content'>
                                    <ul class='card-header-navi'>
                                        <li>全部</li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                        <div class='pt-1 pl-3 pr-3 h-64 clear-both overflow-hidden'>
                            <div class='infinite-list overflow-y-auto h-full scrollbar'>
                                <template v-for='o in 6' :key='o'>
                                    <dl class='w-full float-left p-2'>
                                        <dt class='float-right truncate w-2/6 text-base text-gray-400 text-right'>匿名 2022-04-08 15:08</dt>
                                        <dd class='float-left truncate w-4/6 text-base text-gray-700'>
                                            <div class='float-left bg-blue-400 rounded-full h-6 w-6 flex items-center justify-center mr-1'>
                                                <span class='text-xs text-white'>问</span>
                                            </div>
                                            V4.0什么时候上限呀？
                                        </dd>
                                    </dl>
                                    <dl class='w-full float-left p-2 bg-gray-100'>
                                        <dt class='float-right truncate w-2/6 text-base text-gray-400 text-right'>部门经理 2022-04-08 15:08</dt>
                                        <dd class='float-left truncate w-4/6 text-base text-gray-700'>
                                            <div class='float-left bg-green-400 rounded-full h-6 w-6 flex items-center justify-center mr-1'>
                                                <span class='text-xs text-white'>答</span>
                                            </div>
                                            预计七月份上限
                                        </dd>
                                    </dl>
                                </template>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :md='24' :lg='12'>
                <div class='bf-card mb-2'>
                    <el-card shadow='never'>
                        <template #header>
                            <div class='card-header flex justify-between items-center'>
                                <div class='card-header-title'>通知公告</div>
                                <div class='card-header-content'>
                                    <ul class='card-header-navi'>
                                        <li>全部</li>
                                    </ul>
                                </div>
                            </div>
                        </template>
                        <div class='pt-1 pl-3 pr-3 h-64 clear-both overflow-hidden divide-y divide-dashed divide-gray-200'>
                            <dl v-for='o in 6' :key='o' class='w-full float-left p-2'>
                                <dt class='float-right truncate w-2/6 text-base text-gray-400 text-right'>2022-04-08 15:08</dt>
                                <dd class='float-left truncate w-4/6 text-base text-gray-700'>V4.0马上要上线了！</dd>
                            </dl>
                        </div>
                    </el-card>
                </div>
            </el-col>
            <el-col :md='24' :lg='24'>
                <div class='clear-both overflow-hidden p-3 rounded-lg bg-gradient-to-b from-blue-300 to-blue-50'>
                    <div class='float-left w-1/6 p-3'><img src='../../../assets/img/hr/home/tuanjian_bg.png' alt=''></div>
                    <ul class='float-right w-4/5 pt-5 grid gap-3 grid-cols-3'>
                        <li v-for='o in 3' :key='o' class='text-1xl text-center cursor-pointer'>
                            <div class='rounded-lg mb-3 overflow-hidden'><img src='../../../assets/img/hr/home/bannder_02.png' alt=''></div>
                            <span>2022年元旦海南旅游</span>
                        </li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
import Clock from '/@/views/Dashboard/Workplace/_Components/Clock.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { ElMessage } from 'element-plus'
const store = useCommonStore() // 记得加这一句
export default defineComponent({
    name: 'Workplace',
    components: {
        Clock
    },
    setup() {
        const { getUserInfo, getUser } = useLayoutStore()
        const kaoqinValue = ref('今日')
        const data = reactive({})
        const onGetUser = async() => {
            await getUser()
        }
        return {
            user: getUserInfo,
            onGetUser,
            kaoqinValue
        }
    }
})
</script>
<style lang="postcss">
.home-content {
  .home-bannder {
    background: url(/src/assets/img/hr/home/bannder_bg.png) repeat-x left top;
    background-size: contain;
  }
  .amt_left {
    height: 210px;
    background: linear-gradient(180deg, #c4ecff 0%, #fff 50%);
    border-radius: 10px;
    .amtlb_section {
      margin-right: 10px;
      padding-bottom: 6px;
      background: #f8f8f8;
      border-radius: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      .amtlbs_top {
        font-size: 14px;
        text-align: center;
        line-height: 28px;
        height: 28px;
        background: #e7ecff;
        color: #6f88e1;
        border-radius: 10px 10px 0px 0px;
      }
      .amtlbs_top_bg {
        background: #fff5d3 !important;
        color: #eab501 !important;
      }
      .amtlbs_top_bgTwo {
        background: #ffe7d6 !important;
        color: #fc954c !important;
      }
      .amtlbs_top_bgThree {
        background: #e2f6d5 !important;
        color: #72c535 !important;
      }
    }
  }
  .amt_right {
    padding: 2rem 3rem;
    background: url(/src/assets/img/hr/home/index_shangxueyuan_bg.png) no-repeat;
    background-size: cover;
    height: 210px;
    min-height: 186px;
    border-radius: 10px;
    position: relative;

    .amtr_image {
      position: absolute;
      right: 20px;
      bottom: 0;
      width: 140px;
      height: 177px;
    }

    .amtr_title {
      font-size: 20px;
      font-weight: bold;
      color: #000000;
      line-height: 24px;
    }

    .amtr_subTitle {
      margin-top: 1rem;
      font-size: 14px;
      font-weight: bold;
      color: #ffe6d6;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .amtr_button {
      background: linear-gradient(180deg, #fff7e9 0%, #ffa935 100%);
      border: none;
      margin-top: 14px;
    }
  }
}
</style>
