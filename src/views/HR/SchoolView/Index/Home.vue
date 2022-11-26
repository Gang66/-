<template>
  <!-- 商学院根目录 -->
  <div class="SchoolViewHome relative">
    <el-carousel trigger="click" height="409px">
      <el-carousel-item v-for="item in data.imgList" :key="item">
        <img :src="item.src" style="width: 100%; height: 100%" />
      </el-carousel-item>
    </el-carousel>
    <div class="absolute top-10 right-72">
      <div>
        <el-card shadow="never" class="w-7/12 m-auto h-10 text-center leading-10 bg-blue-400 z-10 relative" :body-style="bodyStyle">我的排名<span class="ml-1">0</span></el-card>
      </div>
      <!-- <div class="bg-white w-20 h-60">年后</div> -->
      <el-card shadow="never" class="w-60 -mt-5">
        <div class="flex justify-between items-center text-sm mt-4">
          <div class="flex items-center">
            <el-icon :size="24">
              <el-icon-Box />
            </el-icon>
            <div class="ml-2">培训工资</div>
          </div>
          <div>{{ data.myInfo.money }}</div>
        </div>
        <el-divider />
        <div class="flex justify-between items-center text-sm mt-4">
          <div class="flex items-center">
            <el-icon :size="24">
              <el-icon-Box />
            </el-icon>
            <div class="ml-2">课程完成数</div>
          </div>
          <div>{{ data.myInfo.courseNum }}</div>
        </div>
        <el-divider />
        <div class="flex justify-between items-center text-sm mt-4">
          <div class="flex items-center">
            <el-icon :size="24">
              <el-icon-Box />
            </el-icon>
            <div class="ml-2">考试次数</div>
          </div>
          <div>{{ data.myInfo.examNum }}</div>
        </div>
        <el-divider />
        <div class="flex justify-between items-center text-sm mt-4">
          <div class="flex items-center">
            <el-icon :size="24">
              <el-icon-Box />
            </el-icon>
            <div class="ml-2">当前积分</div>
          </div>
          <div>{{ data.myInfo.point }}</div>
        </div>
        <div class="m-auto text-center mt-6">
          <el-button type="primary">签到得积分</el-button>
        </div>
      </el-card>
    </div>
    <div class="flex px-52 mt-6">
      <div>
        <el-card class="box-card w-1075" shadow="never">
          <el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane :label="item.label" :name="item.Id" v-for="(item, index) in data.courseTab" :key="index">
              <div class="p-2 grid grid-cols-5 grid-rows-1 gap-3">
                <div class="cursor-pointer" v-for="(val, index) in item.List" :key="index" :class="[index + 1 > 4 ? 'mb-2' : 'mb-5']" @click="openCourseEvent(val)">
                  <el-card class="shadow-md" style="min-height: 270px" :body-style="{ padding: 0 }" shadow="hover">
                    <el-image style="height: 131px" class="w-full" :src="remoteUrlEvent(val.CoverImg)" fit="cover" />
                    <div class="p-2">
                      <div class="text-sm truncate">{{ val.Name }}</div>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <el-tooltip class="box-item" effect="light" content="浏览量" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-View />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">{{ val.Browse ? val.Browse : 0 }}</div>
                        </div>
                        <!-- <div class="flex  items-center ml-3">
                          <el-tooltip class="box-item" effect="light" content="评论量" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-ChatRound />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">0</div>
                        </div>
                        <div class="flex  items-center ml-3">
                          <el-tooltip class="box-item" effect="light" content="收藏量" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-Collection />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">0</div>
                        </div> -->
                        <div class="flex items-center ml-3">
                          <el-tooltip class="box-item" effect="light" content="学习次数" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-Notebook />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">{{ val.CourseFinishCount ? val.CourseFinishCount : 0 }}</div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <el-rate v-model="val.Rate" disabled />

                        <div class="flex items-center">
                          <el-tooltip class="box-item" effect="light" content="课程时长" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-Clock />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">{{ val.MinMinutes }}分钟</div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <el-card class="box-card mt-3" shadow="never" v-if="data.trainList.length > 0">
          <el-tabs v-model="data.activeNameOne2" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="培训江湖" name="1">
              <div class="p-2">
                <div class="float-left mr-4 mb-5 cursor-pointer" v-for="(item, index) in data.trainList" :class="[(index + 1) % 4 ? 'mr-4' : 'mr-0', index + 1 > 4 ? 'mb-2' : 'mb-5']" @click="data.StudyTemplateWindow.show = true">
                  <el-card class="shadow-md" style="min-height: 270px" :body-style="{ padding: 0, width: '15.119rem' }" shadow="hover">
                    <el-image style="width: 15.119rem" src="/src/assets/img/hr/SchoolView/home/home-pxjh-bg.png" fit="cover" />
                    <div class="p-2">
                      <div>{{ item.plan.Name }}</div>
                      <div class="flex items-center mt-1">
                        <div class="flex items-center">
                          <el-tooltip class="box-item" effect="light" content="浏览量" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-View />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">{{ item.plan.Browse ? item.plan.Browse : 0 }}</div>
                        </div>
                        <!-- <div class="flex  items-center ml-3">
                          <el-tooltip class="box-item" effect="light" content="评论量" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-ChatRound />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">0</div>
                        </div>
                        <div class="flex  items-center ml-3">
                          <el-tooltip class="box-item" effect="light" content="收藏量" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-Collection />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">0</div>
                        </div> -->
                        <div class="flex items-center ml-3">
                          <el-tooltip class="box-item" effect="light" content="个人学习次数" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-Notebook />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">{{ item.plan.CourseFinishCount ? item.plan.CourseFinishCount : 0 }}</div>
                        </div>
                      </div>
                      <div class="flex items-center justify-between">
                        <el-rate v-model="item.plan.Rate" disabled />

                        <div class="flex items-center">
                          <el-tooltip class="box-item" effect="light" content="课程时长" placement="bottom">
                            <el-icon :size="16" class="cursor-pointer">
                              <el-icon-Clock />
                            </el-icon>
                          </el-tooltip>
                          <div class="ml-1">{{ item.plan.MinMinutes ? item.plan.MinMinutes : 0 }}分钟</div>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <!-- <el-card class="box-card mt-3" shadow="never">
          <el-tabs v-model="data.activeNameOne1" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="讲师擂台" name="1">
              <div class="p-2">
                <div class="float-left mr-4 mb-5 cursor-pointer" v-for="(item,index) in 5" :class="[(index+1)%5?'mr-4':'mr-0',(index+1)>5?'mb-2':'mb-5']">
                  <el-card class=" h-60 shadow-md text-center" :body-style="{padding:0,width:'11.89rem'}" shadow="hover">
                    <el-avatar :size="140" src="/src/assets/img/hr/SchoolView/home/ceshiTwo.png" class="m-auto" fit="cover" />
                    <div class="bf-font-blue-color font-semibold">谭琦</div>
                    <div class="text-left  p-2 mt-2">
                      <div class="text-sm">鲜花：<el-icon :size="16" class="cursor-pointer">
                          <el-icon-HotWater />
                        </el-icon>37
                      </div>
                      <div class="flex "><span class="truncate text-sm">擅长领域：技术、销售、培训、售前</span>
                      </div>
                    </div>
                  </el-card>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-card> -->
      </div>
      <div class="flex-grow ml-3 w-432">
        <el-card class="box-card box-Ranking min-w-432" shadow="never">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <el-icon :size="24">
                <el-icon-Box />
              </el-icon>
              <div class="ml-1">学霸风采</div>
            </div>
            <div>更多</div>
          </div>
          <el-tabs v-model="data.activeNameOne" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="周排名" name="1">
              <template v-for="(item, index) in 8" :key="index">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-14">NO.{{ index + 1 }}</div>
                    <div class="flex items-center ml-2">
                      <el-avatar :size="45" :src="data.avatar" class="m-auto" fit="cover" />
                      <el-image :src="data.RankingOne" v-if="index == 0" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <el-image :src="data.RankingTwo" v-if="index == 1" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <el-image :src="data.RankingThree" v-if="index == 2" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <div class="ml-3">谭琦</div>
                    </div>
                  </div>
                  <div>300积分</div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="月排名" name="2">
              <template v-for="(item, index) in 8" :key="index">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-14">NO.{{ index + 1 }}</div>
                    <div class="flex items-center ml-2">
                      <el-avatar :size="45" :src="data.avatar" class="m-auto" fit="cover" />
                      <el-image :src="data.RankingOne" v-if="index == 0" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <el-image :src="data.RankingTwo" v-if="index == 1" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <el-image :src="data.RankingThree" v-if="index == 2" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <div class="ml-3">谭琦</div>
                    </div>
                  </div>
                  <div>300积分</div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="总排名" name="3">
              <template v-for="(item, index) in 8" :key="index">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-14">NO.{{ index + 1 }}</div>
                    <div class="flex items-center ml-2">
                      <el-avatar :size="45" :src="data.avatar" class="m-auto" fit="cover" />
                      <el-image :src="data.RankingOne" v-if="index == 0" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <el-image :src="data.RankingTwo" v-if="index == 1" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <el-image :src="data.RankingThree" v-if="index == 2" fit="cover" style="position: absolute; width: 47px; height: 55px" />
                      <div class="ml-3">谭琦</div>
                    </div>
                  </div>
                  <div>300积分</div>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-card>
        <!-- <el-card class="box-card box-Ranking mt-3" shadow="never">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <el-icon :size="24">
                <el-icon-Box />
              </el-icon>
              <div class="ml-1">学霸风采</div>
            </div>
            <div>更多</div>
          </div>
          <el-tabs v-model="data.activeNameTwo" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="周排名" name="4">
              <template v-for="(item,index) in 8" :key="index">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-14">NO.{{index+1}}</div>
                    <div class="flex items-center ml-2">
                      <el-avatar :size="45" src="/src/assets/img/hr/SchoolView/home/ceshiTwo.png" class="m-auto" fit="cover" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingOne.png" v-if="index==0" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingTwo.png" v-if="index==1" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingThree.png" v-if="index==2" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <div class="ml-3">谭琦</div>
                    </div>
                  </div>
                  <div>300积分</div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="月排名" name="5">
              <template v-for="(item,index) in 8" :key="index">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-14">NO.{{index+1}}</div>
                    <div class="flex items-center ml-2">
                      <el-avatar :size="45" src="/src/assets/img/hr/SchoolView/home/ceshiTwo.png" class="m-auto" fit="cover" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingOne.png" v-if="index==0" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingTwo.png" v-if="index==1" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingThree.png" v-if="index==2" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <div class="ml-3">谭琦</div>
                    </div>
                  </div>
                  <div>300积分</div>
                </div>
              </template>
            </el-tab-pane>
            <el-tab-pane label="总排名" name="6">
              <template v-for="(item,index) in 8" :key="index">
                <div class="flex items-center justify-between mb-3">
                  <div class="flex items-center">
                    <div class="w-14">NO.{{index+1}}</div>
                    <div class="flex items-center ml-2">
                      <el-avatar :size="45" src="/src/assets/img/hr/SchoolView/home/ceshiTwo.png" class="m-auto" fit="cover" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingOne.png" v-if="index==0" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingTwo.png" v-if="index==1" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <el-image src="/src/assets/img/hr/SchoolView/home/RankingThree.png" v-if="index==2" fit="cover" style="position: absolute;width: 47px;height: 55px;" />
                      <div class="ml-3">谭琦</div>
                    </div>
                  </div>
                  <div>300积分</div>
                </div>
              </template>
            </el-tab-pane>
          </el-tabs>
        </el-card> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import ceshiTwo from '/@/assets/img/hr/SchoolView/home/ceshiTwo.png'
import RankingOne from '/@/assets/img/hr/SchoolView/home/RankingOne.png'
import RankingTwo from '/@/assets/img/hr/SchoolView/home/RankingTwo.png'
import RankingThree from '/@/assets/img/hr/SchoolView/home/RankingThree.png'
import homeOne from '/public/img/hr/SchoolView/home/home-one.jpeg'
import homeTwo from '/public/img/hr/SchoolView/home/home-two.jpg'
import homeThree from '/public/img/hr/SchoolView/home/home-three.jpg'
import homeFuro from '/public/img/hr/SchoolView/home/home-four.jpg'
import SchoolNavbar from '../_Components/navbar.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { relative } from 'path'
import { TabsPaneContext } from 'element-plus'
import { GetHomeCourseList, GetHomeUserInfo } from '/@/api/hr/School/Home'
import router from '/@/router/index'
import { remoteUrl } from '/@/utils/tools'
import { GetStudyTrainInfo } from '/@/api/hr/School/Train'
// 首次加载页面启动函数
const getDetails = (data: any, form: any) => {
  GetHomeCourseList().then((res) => {
    if (res.code == 1) {
      // 课程数据数据拼接到tab中
      data.courseTab.forEach((element: any) => {
        switch (element.Id) {
          case 1:
            element.List = res.data.newest
            break
          case 2:
            element.List = res.data.recommend
            break
          // case 3:
          //   element.List = res.data.top
          //   break
        }
      })
    }
  })
  // 获取学霸风采
  GetHomeUserInfo().then((res) => {
    if (res.code == 1) {
      console.log(res.data)
      data.myInfo = res.data
    }
  })
  // 培训江湖数据
  GetStudyTrainInfo(form).then((res: any) => {
    if (res.code == 1) {
      data.trainList = res.data.records
    }
  })
}
// 弹窗事件函数
const windowEvent = (data: any) => {
  // 打开课件事件函数
  const openCourseEvent = (val: any) => {
    router.push({
      name: 'HRSchoolViewVideoIndex',
      query: { Id: val.Id }
    })
  }
  return { openCourseEvent }
}
// 常用事件函数
const publicEvent = (data: any) => {
  // 网址拼接
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  return { remoteUrlEvent }
}
export default defineComponent({
  components: {
    SchoolNavbar
  },
  props: {},
  setup() {
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
    const bodyStyle = {
      padding: 0,
      background: '#1e6ceb',
      color: '#fff',
      border: 'none'
    }
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      planStatus: '10,20,30'
    })
    const data = reactive({
      avatar: ceshiTwo, //头像图片
      RankingOne: RankingOne, //
      RankingTwo: RankingTwo, //
      RankingThree: RankingThree, //
      RankingList: [], //排行榜列表
      myInfo: [], //我的排名信息
      activeName: 1, //课程tab列表下标
      //课程tab列表
      courseTab: [
        {
          label: '最新课程',
          Id: 1,
          List: []
        },
        {
          label: '推荐课程',
          Id: 2,
          List: []
        }
        // {
        //   label: '精品课程',
        //   Id: 3,
        //   List: []
        // }
      ],
      trainList: [], //培训江湖数据
      imgList: [{ src: homeOne }, { src: homeTwo }, { src: homeThree }, { src: homeFuro }],
      activeNameOne: '1',
      activeNameOne1: '1',
      activeNameOne2: '1',
      activeNameTwo: '4',
      value: '',
      StudyTemplateWindow: {
        show: false
      }
    })
    onMounted(() => {
      getDetails(data, form)
    })
    return {
      data,
      bodyStyle,
      handleClick,
      ...windowEvent(data),
      ...publicEvent(data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.SchoolViewHome {
  .el-carousel__item h3 {
    line-height: 20vw;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }
  .el-card {
    border: none;
  }
  .el-divider--horizontal {
    display: block;
    height: 1px;
    width: 100%;
    margin: 10px 0;
    border-top: 1px solid var(--el-border-color);
  }
  /* :deep(.el-card__body) {
    padding: 10px 20px 20px !important;
  } */
  .shadow-md {
    --tw-shadow: 0 4px 6px -15px rgb(0 0 0 / 0.1), 0 2px 4px 3px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    -webkit-box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  }
  .box-Ranking {
    :deep(.el-tabs__item) {
      width: 62% !important;
      text-align: center;
    }
  }
  .w-1075 {
    width: 60vw !important;
  }
  .min-w-1075 {
    min-width: 969px;
  }
  .w-432 {
    width: 410px;
  }
  .min-w-432 {
    min-width: 410px;
  }
}
</style>
