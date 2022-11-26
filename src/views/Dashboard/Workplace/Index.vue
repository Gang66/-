<template>
  <div class=" home-content">
    <div class="home-bannder w-full h-40 rounded-lg mb-2 clear-both overflow-hidden">
      <img src="../../../assets/img/hr/home/bannder_01.png" class="h-full float-left" />
      <div class="float-right pr-3">
        <div class="w-52 h-16 overflow-hidden mb-3"><iframe src="https://i.tianqi.com/?c=code&a=getcode&id=76&icon=1"></iframe></div>
        <!-- <iframe allowtransparency="true" frameborder="0" width="190" height="36" scrolling="no" src="//tianqi.2345.com/plugin/widget/index.htm?s=3&z=2&t=0&v=0&d=3&bd=0&k=&f=ffffff&ltf=ffcccc&htf=ff0000&q=1&e=1&a=1&c=54511&w=180&h=36&align=center"></iframe> -->
        <Clock />
      </div>
    </div>
    <el-row :gutter="10">
      <el-col :md="24" :lg="12">
        <div class="bf-card mb-2">
          <div class="rounded-lg bg-gradient-to-b from-blue-200 to-blue-50">
            <div class="p-3 flex justify-between items-center">
              <div class="text-1xl font-black bf-title-color">考勤汇总表</div>
              <div class="">
                <span class="text-xs text-gray-500 mr-1">单位：人</span>
                <el-select v-model="kaoqinValue" style="width: 70px" size="small">
                  <el-option v-for="item in ['今日', '本周', '本月']" :key="item" :label="item" :value="item" />
                </el-select>
              </div>
            </div>
            <div class="grid gap-3 grid-cols-4 ml-5 mr-5 mb-2">
              <div v-for="o in ['应出勤', '实出勤', '累计异常', '累计离职']" :key="o" class="p-1 text-center">
                <div class="text-sm text-gray-600">{{ o }}</div>
                <div class="text-2xl font-black">10</div>
              </div>
            </div>

            <div class="grid gap-3 grid-cols-4 p-3">
              <div v-for="o in ['集团总部', '第一大区', '第二大区', '第三大区']" :key="o" class="text-center rounded-lg bg-gray-200 overflow-hidden pb-2">
                <div class="text-1xl text-gray-100 bg-blue-400 p-2 mb-1">{{ o }}</div>
                <div class="text-2xl font-black">67/6/<span class="text-red-400">1</span></div>
                <div class="text-sm text-gray-400">应出/实出/离职</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="12">
        <div class="mb-1 cursor-pointer" @click="onGetUser">
          <el-link href="/#/SchoolViewHome" target="_blank" :underline="false"> <img src="../../../assets/img/hr/home/school_bannder.png" /></el-link>
        </div>
      </el-col>
      <el-col :md="24" :lg="12">
        <div class="bf-card mb-2">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header flex justify-between items-center">
                <div class="card-header-title">待办逾期</div>
                <div class="card-header-content pr-3">
                  <el-button-group class="ml-4">
                    <el-button size="small">昨天</el-button>
                    <el-button size="small" class="is-active">今天</el-button>
                    <el-button size="small">全部</el-button>
                  </el-button-group>
                </div>
              </div>
            </template>
            <div class="grid gap-3 grid-cols-5 p-3 h-40">
              <div v-for="o in 10" :key="o" class="p-1 text-center">
                <div class="text-2xl font-black font-family-share-tech-mono">10</div>
                <div class="text-sm text-gray-400">招聘审批</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :md="24" :lg="12">
        <div class="bf-card mb-2">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header flex justify-between items-center">
                <div class="card-header-title">关停预警</div>
                <div class="card-header-content pr-3">
                  <el-button-group class="ml-4">
                    <el-button size="small">昨天</el-button>
                    <el-button size="small" class="is-active">今天</el-button>
                    <el-button size="small">全部</el-button>
                  </el-button-group>
                </div>
              </div>
            </template>
            <div class="grid gap-3 grid-cols-5 p-3 h-40">
              <div v-for="o in 10" :key="o" class="p-1 text-center">
                <div class="text-2xl font-black font-family-share-tech-mono">10</div>
                <div class="text-sm text-gray-400">招聘审批</div>
              </div>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :md="24" :lg="12">
        <div class="bf-card mb-2">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header flex justify-between items-center">
                <div class="card-header-title">创新举措公示</div>
                <div class="card-header-content">
                  <ul class="card-header-navi">
                    <li>全部</li>
                  </ul>
                </div>
              </div>
            </template>
            <div class="pt-1 pl-3 pr-3 h-64 clear-both overflow-hidden">
              <div class="infinite-list overflow-y-auto h-full scrollbar">
                <template v-for="o in 6" :key="o">
                  <dl class="w-full float-left p-2">
                    <dt class="float-right truncate w-2/6 text-base text-gray-400 text-right">匿名 2022-04-08 15:08</dt>
                    <dd class="float-left truncate w-4/6 text-base text-gray-700">
                      <div class="float-left bg-blue-400 rounded-full h-6 w-6 flex items-center justify-center mr-1">
                        <span class="text-xs text-white">问</span>
                      </div>
                      V4.0什么时候上限呀？
                    </dd>
                  </dl>
                  <dl class="w-full float-left p-2 bg-gray-100">
                    <dt class="float-right truncate w-2/6 text-base text-gray-400 text-right">部门经理 2022-04-08 15:08</dt>
                    <dd class="float-left truncate w-4/6 text-base text-gray-700">
                      <div class="float-left bg-green-400 rounded-full h-6 w-6 flex items-center justify-center mr-1">
                        <span class="text-xs text-white">答</span>
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
      <el-col :md="24" :lg="12">
        <div class="bf-card mb-2">
          <el-card shadow="hover">
            <template #header>
              <div class="card-header flex justify-between items-center">
                <div class="card-header-title">通知公告</div>
                <div class="card-header-content">
                  <ul class="card-header-navi">
                    <li>全部</li>
                  </ul>
                </div>
              </div>
            </template>
            <div class="pt-1 pl-3 pr-3 h-64 clear-both overflow-hidden divide-y divide-dashed divide-gray-200">
              <dl v-for="o in 6" :key="o" class="w-full float-left p-2">
                <dt class="float-right truncate w-2/6 text-base text-gray-400 text-right">2022-04-08 15:08</dt>
                <dd class="float-left truncate w-4/6 text-base text-gray-700">V4.0马上要上线了！</dd>
              </dl>
            </div>
          </el-card>
        </div>
      </el-col>
      <el-col :md="24" :lg="24">
        <div class="clear-both overflow-hidden p-3 rounded-lg bg-gradient-to-b from-blue-300 to-blue-50">
          <div class="float-left w-1/6 p-3"><img src="../../../assets/img/hr/home/tuanjian_bg.png" alt="" /></div>
          <ul class="float-right w-4/5 pt-5 grid gap-3 grid-cols-3">
            <li v-for="o in 3" :key="o" class="text-1xl text-center cursor-pointer">
              <div class="rounded-lg mb-3 overflow-hidden"><img src="../../../assets/img/hr/home/bannder_02.png" alt="" /></div>
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
// import Chart from '/@/views/Dashboard/Workplace/_Components/Chart.vue'
// import List from '/@/views/Dashboard/Workplace/_Components/List.vue'
import Clock from '/@/views/Dashboard/Workplace/_Components/Clock.vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
export default defineComponent({
  name: 'Workplace',
  components: {
    Clock
  },
  setup() {
    const { getUserInfo, getUser } = useLayoutStore()
    const kaoqinValue = ref('今日')
    const onGetUser = async () => {
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
<style type="postcss" scoped>
.home-content {
  .home-bannder {
    background: url(../../../assets/img/hr/home/bannder_bg.png) repeat-x left
      top;
    background-size: contain;
  }
}
</style>
