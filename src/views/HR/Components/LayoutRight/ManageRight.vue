
<template>
  <div class="ManageRight">
    <div class="w-full mb-3 rounded-lg bg-white">
      <div class="w-full card-header-title truncate font-black rounded-t-lg bg-blue-500 p-2">创新直通车</div>
      <div class="grid gap-3 grid-cols-2 p-3">
        <div v-for="(item, index) in data.InnovateData" @click="openInnovateWindow(item.DicKey)" :key="index"
          class="h-10 relative cursor-pointer rounded-full flex justify-center items-center bg-gradient-to-b"
          :class="[item.DicKey == 0 ? 'bg-green-z-100' : item.DicKey == 1 ? 'bg-yellow-z-100' : item.DicKey == 2 ? 'bg-Cyan-z-100' : item.DicKey == 3 ? 'bg-Cy-z-100' : '']">
          <div class="flex items-center justify-center">
            <!-- <el-icon color="#fff" :size="20">
              <el-icon-edit />
            </el-icon> -->
            <img src="/src/assets/img/hr/LayoutRight/xiugai.png" alt="" width="20">
            <div class="w-full pl-1 pr-3 text-white text-sm text-center truncate">{{ item.DicValue }}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="bf-card mb-3">
      <el-card shadow="hover">
        <template #header>
          <div class="card-header flex justify-between items-center bg-blue-500 rounded-t-lg">
            <div class="card-header-title">常用工具</div>
          </div>
        </template>
        <div class="flex flex-wrap p-2 pb-0">
          <div v-for="o in 7" :key="o" class="p-1 w-1/4 cursor-pointer">
            <div class="flex items-center justify-center  h-12 rounded text-2xl mb-1">
              <!-- <el-icon color="#fff">
                <el-icon-guide />
              </el-icon> -->
              <img src="/src/assets/img/hr/LayoutRight/gonggao.png" alt="" width="">
            </div>
            <div class="text-xs text-center text-gray-500 mt-2 mb-2">发起公告</div>
          </div>
        </div>
      </el-card>
    </div>
    <div class="bf-card mb-3">
      <el-card shadow="hover">
        <div class="card-header el-card__header flex items-center bg-blue-500 rounded-t-lg">
          <!-- <div class="card-header-title truncate">排行榜</div> -->
          <el-dropdown>
            <div class="flex items-center">
              <div class="card-header-title truncate">{{data.RankingList.length>0?data.RankingList[0].Title:'排行榜'}}
              </div>
              <el-icon class="el-icon--right" color="#fff">
                <el-icon-arrow-down />
              </el-icon>
            </div>
            <!-- <span class="el-dropdown-link">
              Dropdown List
              
            </span> -->
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="(item, index) in data.RankingList" :key="index" @click="selectEvent(index, item)">{{ item.Title }}</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <!-- <div class="flex items-center px-3 pt-2">
          <template>
            <div :class="data.rankingIndex == index ? 'text-blue-500' : ''" class="cursor-pointer mr-4" @click="selectEvent(index, item)">{{ item.Title }}</div>
          </template>
        </div> -->
        <div class="flex flex-col p-2">
          <div class="flex justify-between items-center text-center text-1xl mb-1">
            <div class="w-1/5 p-1 font-black">排名</div>
            <div class="w-2/5 p-1 font-black">事业部</div>
            <div class="w-2/5 p-1 font-black">培训专员</div>
          </div>
          <div v-for="(item, index) in data.RankingInfoList" :key="index" class="flex justify-between items-center text-center text-1xl">
            <div class="w-1/5 p-1">
              <div class="inline-block  w-6 h-6 rounded">
                <img src="/src/assets/img/hr/LayoutRight/one.png" v-if="index==0" alt="" width="">
                <img src="/src/assets/img/hr/LayoutRight/two.png" v-else-if="index==1" alt="" width="">
                <img src="/src/assets/img/hr/LayoutRight/three.png" v-else-if="index==2" alt="" width="">
                <span class="text-sm text-black" v-else>{{ index + 1 }}</span>
              </div>
            </div>
            <div class="w-2/5 p-1 text-gray-600 truncate">{{ item.CompName }}</div>
            <div class="w-2/5 p-1 text-gray-600">{{ item.HRName ? item.HRName : '无' }}</div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="bf-card mb-2 userAttainment">
      <div class="rounded-lg">
        <div class="p-3 pb-0">
          <!-- <div class="inline-block text-2xl mr-2">
            <svg-icon icon-class="svg-hr-home-jianbei" />
          </div> -->
          <span class="card-header-title truncate mr-3">个人素养展示区</span>
          <!-- <el-button text key="primary" type="primary">查看详情</el-button> -->
        </div>
        <div class="grid gap-3 grid-cols-2 p-3 flex items-center">
          <div class="p-1 text-center">
            <div class="inline-block text-6xl relative">
              <svg-icon icon-class="svg-hr-home-jinpai" />
              <div class="absolute left-3 right-3 bottom-1 rounded-full overflow-hidden border-2 border-solid border-white"><img
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" /></div>
            </div>
            <div class="text-sm text-white">第一名：张铁锤</div>
          </div>
          <div class="p-1 text-center">
            <div class="inline-block text-4xl mt-6">
              <svg-icon icon-class="svg-hr-home-zanmei" />
            </div>
            <div class="text-sm text-white">获赞：10个</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 创新举措表单 -->
    <InnovateForm title="创新举措" v-if="data.InnovateFormWindow.show" @closeWindow="data.InnovateFormWindow.show = false" :selectIndex="data.selectIndex"></InnovateForm>
  </div>
</template>

<script lang="ts">
import InnovateForm from '/@/views/HR/View/Innovate/_Components/Form.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { GetRankingsList } from '/@/api/hr/Home'
import { ElMessage } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 页面加载完毕获取详情
const getInfo = (data: any) => {
  GetRankingsList().then((res: any) => {
    if (res.code == 1) {
      data.RankingList = res.data
      data.RankingInfoList = res.data[data.rankingIndex].RankingDtaes[0].RankingLists
    } else {
      ElMessage.error(res.message)
    }
  })
  let storeData = store.getDict('hr_Innovate_status')
  // 获取字典
  storeData.then((res: any) => {
    data.InnovateData = res
  })
}

// 事件方法
const usedEvent = (data: any) => {
  // 监听排行榜下标
  const selectEvent = (index: number, item: any) => {
    data.rankingIndex = index
    data.RankingInfoList = item.RankingDtaes[0].RankingLists
    console.log(data.RankingInfoList)
  }
  return { selectEvent }
}
export default defineComponent({
  components: {
    InnovateForm
  },
  props: {},
  setup() {
    const data = reactive({
      RankingList: [], //排行榜列表
      rankingIndex: 0, //排行榜下标
      RankingInfoList: [], //排行榜详情列表
      InnovateData: [],
      selectIndex: 0,
      InnovateFormWindow: {
        show: false
      }
    })
    const openInnovateWindow = (val: any) => {
      data.selectIndex = val
      data.InnovateFormWindow.show = true
    }
    onMounted(() => {
      getInfo(data)
    })
    return { data, openInnovateWindow, ...usedEvent(data) }
  }
})
</script>

<style lang="postcss" scoped>
.ManageRight {
  .bg-green-z-100 {
    background-image: linear-gradient(180deg, #00c4ff 0%, #0091ff 100%);
  }
  .bg-blue-z-200 {
    background-image: linear-gradient(180deg, #477efc 0%, #47a5ff 100%);
  }
  .bg-yellow-z-100 {
    background-image: linear-gradient(0deg, #f7b500 0%, #f3d402 100%);
  }
  .bg-Cyan-z-100 {
    background-image: linear-gradient(180deg, #5fe4ff 0%, #4ec8f9 100%);
  }
  .bg-Cy-z-100 {
    background-image: linear-gradient(180deg, #18f5d4 0%, #31d8b3 100%);
  }
  :deep(.card-header-title) {
    color: #fff !important;
    font-weight: 500 !important;
    padding-right: 0 !important;
    line-height: 1.6;
  }
  .userAttainment {
    background-image: linear-gradient(154deg, #477efc 1%, #47a5ff 92%);
    border-radius: 8px;
  }
}
</style>
