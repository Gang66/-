<!--
 * @Author: ZHJ
 * @Date: 2022-08-08 14:37:07
 * @LastEditTime: 2022-08-27 10:22:19
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\SchoolView\Further\_Components\CurrentIndex.vue
 * 版权声明
-->

<template>
  <div class="FurtherCurrentIndex bf-SchoolView-margin">
    <header class="mt-4">
      <el-carousel trigger="click" height="286px">
        <el-carousel-item v-for="item in data.imgList" :key="item">
          <img :src="item.src" style="width: 100%; height: 100%" />
        </el-carousel-item>
      </el-carousel>
    </header>
    <div class="Train pt-4">
      <div class="flex items-start">
        <div class="w-1075">
          <div class="flex justify-between h-9">
            <div class="flex">
              <img src="/src/assets/img/hr/SchoolView/home/zizhuxuexi.png" alt="" style="width: 24px; height: 24px" />
              <div class="ml-2 text-lg" style="line-height: 1.3">学习任务</div>
            </div>
          </div>
          <el-card class="box-card right-minHeight" shadow="never">
            <div class="float-left mr-4 cursor-pointer" v-for="(item, index) in data.planList" :key="index" :class="[(index + 1) % 5 ? 'mr-4' : 'mr-0', index + 1 > 5 ? 'mb-2' : 'mb-4']">
              <el-card class="reactive shadow-md" :body-style="{ padding: 0, width: '197px' }" shadow="hover" @click="viewDetails(item)">
                <div class="relative">
                  <div style="position: relative">
                    <el-image style="width: 206px; height: 125px" :src="remoteUrlEvent(item.plan.CoverImg)" fit="cover" />
                  </div>
                  <div class="p-2">
                    <div class="text-sm font-semibold">{{ item.plan.Name }}</div>
                    <div class="text-xs bf-text-color-regular">
                      <div class="mt-2">上午：学习课件</div>
                      <div class="mt-2">下午：学习课件</div>
                    </div>
                    <div class="flex items-center justify-between text-sm mt-2 bf-text-color-regular">
                      <div>课程：{{ item.courses.length }}节</div>
                    </div>
                  </div>
                </div>
              </el-card>
            </div>
          </el-card>
        </div>
        <div class="w-432 ml-3">
          <div class="flex justify-between h-9">
            <div class="flex">
              <img src="/src/assets/img/hr/SchoolView/home/xueximao.png" alt="" style="width: 24px; height: 24px" />
              <div class="ml-2 text-lg" style="line-height: 1.3">课程学习榜</div>
            </div>
            <div class="bf-text-color-regular flex items-center h-5">
              <div>更多</div>
              <el-icon>
                <el-icon-ArrowRight />
              </el-icon>
            </div>
          </div>
          <el-card class="box-card box-Ranking min-w-432 relative" shadow="never" :body-style="{ padding: '10px 10px' }">
            <div class="FurtherCurrentIndex_hr"></div>
            <el-table :data="data.RankingList" height="400">
              <el-table-column type="index" prop="name" label="排名" width="55" align="center" />
              <el-table-column prop="StutyType" label="类型" align="center" min-width="70" />
              <el-table-column prop="CourseName" label="课件" align="center" min-width="120">
                <template #default="scope">
                  <div class="truncate">
                    {{ scope.row.CourseName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Count" label="次数" align="center" min-width="60" />
              <el-table-column prop="Point" label="积分" align="center" min-width="60" />
            </el-table>
          </el-card>
        </div>
      </div>
    </div>
    <CurrentLearningForm v-if="data.CurrentLearningFormWindow.show" CategoryId="A" @closeWindow="closeWindow" :planInfo="data.CurrentLearningFormWindow.planInfo"> </CurrentLearningForm>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import CurrentLearningForm from './CurrentLearningForm.vue'
import { GetStudyTrainInfo, GetTrainForceRank } from '/@/api/hr/School/Train'
import homeOne from '/public/img/hr/SchoolView/home/home-one.jpeg'
import homeTwo from '/public/img/hr/SchoolView/home/home-two.jpg'
import homeThree from '/public/img/hr/SchoolView/home/home-three.jpg'
import homeFuro from '/public/img/hr/SchoolView/home/home-four.jpg'
import ceshiTwo from '/@/assets/img/hr/SchoolView/home/ceshiTwo.png'
import { defineComponent, onBeforeMount, onMounted, reactive } from 'vue'
import { remoteUrl } from '/@/utils/tools'
import { ElMessage } from 'element-plus'
// 获取页面详情
const getDteails = async (data: any, form: any) => {
  GetStudyTrainInfo(form).then((res: any) => {
    if (res.code == 1) {
      data.planList = res.data.records
    } else {
      ElMessage.error(res.message)
    }
  })
  GetTrainForceRank().then((res: any) => {
    if (res.code == 1) {
      data.RankingList = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}
export default defineComponent({
  components: { CurrentLearningForm },
  props: {},
  setup() {
    const router = useRouter()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10000,
      planStatus: '10,20,30',
      force: 1
    })
    const data: any = reactive({
      planList: {}, //计划列表
      imgList: [{ src: homeOne }, { src: homeTwo }, { src: homeThree }, { src: homeFuro }],
      CurrentLearningFormWindow: {
        //学习模板
        show: false
      },
      RankingList: [],
      activeNameOne: '1',
      avatar: ceshiTwo, //头像图片
      selectIndex: 1,
      info: {} as any,
      expectTime: '00:00:00'
    })
    // 显示详情
    const viewDetails = (val: any) => {
      console.log(val)
      if (val) data.CurrentLearningFormWindow.planInfo = val
      data.CurrentLearningFormWindow.show = true
    }
    // 监听页面关闭
    const closeWindow = (val: any) => {
      getDteails(data, form)
      data.CurrentLearningFormWindow.show = false
    }
    // 网址拼接
    const remoteUrlEvent = (val: any) => {
      return remoteUrl(val)
    }
    onMounted(() => {
      getDteails(data, form)
    })
    return {
      data,
      remoteUrlEvent,
      closeWindow,
      viewDetails
    }
  }
})
</script>

<style lang="postcss" scoped>
.FurtherCurrentIndex {
  .w-1075 {
    width: 64vw !important;
  }
  .right-minHeight {
    min-height: calc(100vh - 36.6rem);
    overflow-y: auto;
  }
  .w-432 {
    width: 410px;
  }
  .min-w-432 {
    min-width: 410px;
  }
  :deep(.el-table .el-table__cell) {
    border-bottom: none !important;
  }
  :deep(.el-table th.el-table__cell > .cell) {
    color: var(--el-text-color-primary) !important;
  }
  :deep(.el-table__inner-wrapper::before) {
    background-color: #fff;
  }
  .FurtherCurrentIndex_hr {
    position: absolute;
    top: 46px;
    width: 100%;
    margin-left: -10px;
    z-index: 10;
    border-bottom: var(--el-border);
  }
}
</style>
