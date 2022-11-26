<template>
  <div class="NewcomerTrainingIndex">
    <header class="mt-4 flex justify-between px-52 items-center">
      <el-card shadow="never" class="w-316 h-216 rounded-lg">
        <div class="p-3 flex items-center">
          <el-avatar :size="55" :src="data.avatar" />
          <div class="ml-3">
            <div class="flex">
              <div class="mb-2">导师</div>
              <div class="ml-4">{{ data.info.MasterWorkerName }}</div>
            </div>
            <div class="text-sm flex justify-between w-74">
              <div>{{ data.info.MasterWorkerDeptName }}</div>
              <div class="ml-4">{{ data.info.MasterWorkerPhone }}</div>
            </div>
          </div>
        </div>
        <div class="p-3 flex items-center">
          <el-avatar :size="55" :src="data.avatar" />
          <div class="ml-3">
            <div class="flex">
              <div class="mb-2">人事</div>
              <div class="ml-4">{{ data.info.HRName }}</div>
            </div>
            <div class="text-sm flex justify-between w-74">
              <div>{{ data.info.HRDeptName }}</div>
              <div class="ml-4">{{ data.info.HRPhone }}</div>
            </div>
          </div>
        </div>
        <el-divider />
        <div class="flex items-center justify-around mt-5">
          <div class="text-center text-white">
            <div class="text-2xl mb-1">0</div>
            <div class="text-sm">总收入</div>
          </div>
          <el-divider direction="vertical" />
          <div class="text-center text-white">
            <div class="text-2xl mb-1">0</div>
            <div class="text-sm">今日工资</div>
          </div>
        </div>
      </el-card>
      <div class="header-bg">
        <div class="flex justify-end">
          <div class="time_bg flex items-center justify-center">
            <template v-if="data.info.TrainStudyStatus == 100">
              <div class="text-white text-lg">新人训计划已结束</div>
            </template>
            <template v-else>
              <div class="text-white text-lg">倒计时：</div>
              <div class="expectTime_bg">
                {{ data.expectTime.hour }}
              </div>
              <span class="text-white text-xl mx-2"> : </span>
              <div class="expectTime_bg">
                {{ data.expectTime.minute }}
              </div>
              <span class="text-white text-xl mx-2"> : </span>
              <div class="expectTime_bg">
                {{ data.expectTime.second }}
              </div>
            </template>
          </div>
        </div>
      </div>
    </header>
    <div class="px-52 Train pt-4">
      <el-row :gutter="15">
        <el-col :span="24">
          <div class="bg-white h-full right-minHeight rounded-lg">
            <div v-if="data.selectIndex == 1">
              <img src="/src/assets/img/hr/SchoolView/currentLeaming/teshutongdao.png" class="footer_image" alt="" />
              <img src="/src/assets/img/hr/SchoolView/currentLeaming//shenqingyanshi.png" class="footer_imageTwo" alt="" />
            </div>
            <CurrentLearning v-if="data.selectIndex == 1" @returnData="returnDataEvent"></CurrentLearning>
            <PracticalBase v-if="data.selectIndex == 2"></PracticalBase>
            <WorkSummary v-if="data.selectIndex == 3" :isHeader="false"></WorkSummary>
            <MyAttendance v-if="data.selectIndex == 4" :isHeader="false"></MyAttendance>
            <MyWhereabouts v-if="data.selectIndex == 5" :isHeader="false"></MyWhereabouts>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import ceshiTwo from '/@/assets/img/hr/SchoolView/home/ceshiTwo.png'
import { defineComponent, onMounted, reactive } from 'vue'
import CurrentLearning from './_Components/CurrentLearning.vue'
import MyAttendance from '/@/views/HR/View/Attendance/MyAttendance/Index.vue'
import WorkSummary from '/@/views/HR/View/WorkSummary/Index.vue'
import MyWhereabouts from '/@/views/HR/View/MyWhereabouts/Index.vue'
import PracticalBase from '/@/views/HR/View/PracticalBase/Index.vue'
import { onUpdated } from 'vue'

export default defineComponent({
  components: { CurrentLearning, MyAttendance, MyWhereabouts, WorkSummary, PracticalBase },
  props: {},
  setup() {
    const router = useRouter()
    const data: any = reactive({
      avatar: ceshiTwo, //头像图片
      selectIndex: 1,
      info: {} as any,
      expectTime: '00:00:00'
    })
    const createInterval = () => {
      clearInterval(data.timeInterval)
      data.timeInterval = setInterval(() => {
        var expectTime = (<any>new Date(data.info.EndDate) - <any>new Date()) / 1000
        if (expectTime > 0) {
          var otherTime = 0
          var hour = Math.floor(expectTime / 60 / 60)
          otherTime = expectTime - 60 * 60 * hour
          var minute = Math.floor(otherTime / 60)
          otherTime = otherTime - 60 * minute
          var second = Math.floor(otherTime)
          data.expectTime = { hour: hour, minute: minute, second: second }
        } else {
          data.expectTime = { hour: '00', minute: '00', second: '00' }
          clearInterval(data.timeInterval)
        }
      }, 1000)
    }
    // 监听返回数据
    const returnDataEvent = (val: any) => {
      data.info = val
      createInterval()
    }
    onUpdated(() => {
      if (router.currentRoute.value.query.Id) {
        data.selectIndex = router.currentRoute.value.query.Id
      } else {
        data.selectIndex = '1'
      }
    })
    onMounted(() => {})
    return {
      data,
      createInterval,
      returnDataEvent
    }
  }
})
</script>

<style lang="postcss" scoped>
.NewcomerTrainingIndex {
  .header-bg {
    background-image: url(/src/assets/img/hr/SchoolView/NewcomerTraining/NewcomerTraining_bg.png);
    background-size: 100% 100%;
    background-repeat: no-repeat;
    width: 77%;
    height: 283px;
    :deep(.el-card__body) {
      padding: 10px;
    }
    .h-180 {
      height: 11.25rem;
    }
    .b-center {
      height: 10rem;
      background: linear-gradient(309deg, #1e6ceb, #6acefb);
      border-radius: 0.4rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -ms-flex-pack: distribute;
      justify-content: space-around;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
  .el-menu-item {
    text-align: center;
    span {
      margin: auto;
    }
  }
  .el-menu-item.is-active {
    color: var(--el-color-white);
    background: var(--el-menu-active-color);
  }
  .el-menu {
    border-right: none !important;
  }
  .right-minHeight {
    min-height: calc(100vh - 34rem);
    overflow-y: auto;
  }
  .w-316 {
    width: 30%;
    margin-right: 16px;
    border-radius: 10px;
    background: #468bfd;
    color: #fff;
  }
  .h-216 {
    height: 283px;
  }
  :deep(.el-divider--horizontal) {
    margin: 10px 0;
    border-top: 1px solid #ffffff;
    opacity: 0.18;
  }
  :deep(.el-divider--vertical) {
    height: 3em;
    border-top: 1px solid #ffffff;
    opacity: 0.18;
  }
  .time_bg {
    width: 244px;
    text-align: center;
    line-height: 46px;
    height: 46px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 4px;
    margin: 14px 10px;
    .expectTime_bg {
      width: 32px;
      height: 32px;
      line-height: 32px;
      color: #468bfd;
      background: #ffffff;
      border-radius: 4px;
      font-size: 1.125rem;
    }
  }
  .footer_image {
    position: fixed;
    right: 60px;
    bottom: 350px;
    width: 64px;
    height: 64px;
  }
  .footer_imageTwo {
    width: 64px;
    height: 64px;
    position: fixed;
    right: 60px;
    bottom: 260px;
  }
  :deep(.text-2xl) {
    font-size: 32px;
  }
}
</style>
