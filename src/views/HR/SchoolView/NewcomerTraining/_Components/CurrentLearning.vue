<!--
 * @Author: ZHJ
 * @Date: 2022-06-16 15:04:24
 * @LastEditTime: 2022-11-18 17:26:36
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\SchoolView\NewcomerTraining\_Components\CurrentLearning.vue
 * 版权声明
-->

<template>
  <div class="p-5">
    <div class="relative overflow-hidden grid grid-cols-7 grid-rows-1 gap-3">
      <div class=" cursor-pointer" v-for="(item,index) in data.details.courses" :key="index" :class="[(index+1)>5?'mb-2':'mb-4']">
        <el-card class="reactive  shadow-md" :body-style="{padding:0}" shadow="hover" @click="item.user?viewDetails(item.user):''">
          <div class="relative">
            <div v-if="item.user == null" class="lock">
              <svg-icon icon-class='svg-lock' />
            </div>
            <div style="position: relative;">
              <el-image style="height:125px;" class="w-full" :src="remoteUrlEvent(item.singlePlan.Poster)" fit="cover" />
            </div>
            <div class=" p-2">
              <div class="text-sm font-semibold truncate text-sm">{{item.singlePlan.Name}}</div>
              <div class="text-xs bf-text-color-regular">
                <div class="mt-2">上午：学习课件</div>
                <div class="mt-2">下午：学习课件</div>
              </div>
              <div class="flex items-center justify-between text-sm mt-2 bf-text-color-regular">
                <div>课程：{{item.plancourses.length}}节</div>
                <div class="flex items-center" v-if="item.user">
                  <div class="ml-1" v-if="item.user.Status !== 100">学习中</div>
                  <div class="ml-1" v-else>已通过</div>
                </div>
                <div v-else>
                  <div class="ml-1">未解锁</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
  <CurrentLearningForm v-if="data.CurrentLearningFormWindow.show" CategoryId="A" @closeWindow="closeWindow" @getDteails="getDteailsEvent"
    :planInfo="data.CurrentLearningFormWindow.planInfo">
  </CurrentLearningForm>
  <!-- <el-empty description="暂无数据" class="mt-40" /> -->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, SetupContext } from 'vue'
import { GetCurrentNewestPlanStore, GetAddUserNewestPlan, GetNewTrainUser } from '/@/api/hr/School/NewcomerTraining'
import CurrentLearningForm from './CurrentLearningForm.vue'
import { ElMessage } from 'element-plus'
import { remoteUrl } from '/@/utils/tools'
// 获取页面详情
const getDteails = async (data: any, context: any) => {
  await GetAddUserNewestPlan().then(async (res: any) => {
    await GetCurrentNewestPlanStore(false).then((res: any) => {
      if (res.code == 1) {
        // 赋值数据
        data.details = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
    GetNewTrainUser().then((res: any) => {
      if (res.code == 1) {
        context.emit('returnData', res.data)
      }
    })
  })
}
export default defineComponent({
  components: { CurrentLearningForm },
  emits: ['returnData'],
  props: {},
  setup(props, context: SetupContext) {
    // 监听页面关闭
    const closeWindow = (val: any) => {
      getDteails(data, context)
      data.CurrentLearningFormWindow.show = false
    }
    // 获取数据
    const getDteailsEvent = (val: any) => {
      getDteails(data, context)
    }
    // 显示详情
    const viewDetails = (val: any) => {
      val.PlanInfo.Worked = val.Worked
      data.CurrentLearningFormWindow.show = true
      if (val) data.CurrentLearningFormWindow.planInfo = val.PlanInfo
    }
    // 网址拼接
    const remoteUrlEvent = (val: any) => {
      return remoteUrl(val)
    }
    const data = reactive({
      details: {
        courses: [],
        store: {} //基础信息
      },
      CurrentLearningFormWindow: {
        //学习模板
        show: false,
        planInfo: {
          CoursewareInfo: {}
        } //计划信息
      }
    })
    onMounted(() => {
      // 待修复中（请求后台1遍拿不到新人训计划，需要2遍 禁止修改 等待优化）
      getDteails(data, context)
      getDteails(data, context)
    })
    return {
      data,
      viewDetails,
      remoteUrlEvent,
      closeWindow,
      getDteailsEvent
    }
  }
})
</script>

<style lang="postcss" scoped>
.lock {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center;
  background-color: rgba(121, 121, 121, 0.562);
  z-index: 2;
  & > svg {
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    right: 0;
    color: white;
  }
}
</style>
