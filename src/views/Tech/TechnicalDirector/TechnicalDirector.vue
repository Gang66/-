<template>
  <div class="tech_AccountingProcessing_AccountingSpecialist">
    <!-- #region  four-->
    <TechnicalAttacheTop />
    <!-- #endregion -->
    <!-- #region 绩效考核 -->
    <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-base">绩效考核</span>
        <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
      </div>
      <div class="float-right">
        <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
          <el-radio-button label="all">本周</el-radio-button>
          <el-radio-button label="wait">上周</el-radio-button>
          <el-radio-button label="reviewed">本月</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="flex bg-white rounded-b-md">
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan4 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-10">
          <p class="text-sm">
            <span class="text-gray-400">报价量(个)</span>
            <el-tooltip class="box-item" effect="dark" content="≥45个/周，任务量已超20%！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+6%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-jiage text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-10">
          <p class="text-sm">
            <span class="text-gray-400">金额量(个)</span>
            <el-tooltip class="box-item" effect="dark" content="≥10个/周，已达到90%金额量！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-downall text-green-500"></i></p>
          <!-- <p class="text-xs text-green-500">+6%</p> -->
          <p class="text-xs text-red-500">-10%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan7 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-10">
          <p class="text-sm">
            <span class="text-gray-400">成单量(%)</span>
            <el-tooltip class="box-item" effect="dark" content=">20%/周，成单量已超20%！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+15%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan6 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">逾期量(个)</span>
            <el-tooltip class="box-item" effect="dark" content="≤4个/周，逾期量已超20%，失去考核金额！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-upall text-red-500"></i></p>
          <p class="text-xs text-green-500">+6%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-dingdan8 text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">责任量(次)</span>
            <el-tooltip class="box-item" effect="dark" content="≤4个/周，已触碰50%责任“红线”！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-downall text-green-500"></i></p>
          <p class="text-xs text-red-500">-50%</p>
        </div>
      </div>
      <div class="w-1/5 pt-2 pb-5">
        <div class="inline-block relative w-10">
          <i class="iconfont icon-mxjl text-gray-400 absolute -top-16 -right-6 inquiry_big_img" style="font-size: 40px"></i>
        </div>
        <div class="inline-block pt-3 ml-8">
          <p class="text-sm">
            <span class="text-gray-400">学习量(个)</span>
            <el-tooltip class="box-item" effect="dark" content="≥5个/周，本周考核供应商的录入量！" placement="top">
              <i class="iconfont icon-beizhu ml-2 text-gray-400"></i>
            </el-tooltip>
          </p>
          <p class="text-2xl font-semibold">48 <i class="iconfont icon-downall text-green-500"></i></p>
          <p class="text-xs text-red-500">-50%</p>
        </div>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region  数据排行-->
    <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-base">数据排行</span>
        <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
      </div>
      <div class="float-right">
        <el-radio-group v-model="tabAppraisal" @change="allWaitAppraisal()">
          <el-radio-button label="week">本周</el-radio-button>
          <el-radio-button label="month">本月</el-radio-button>
          <el-radio-button label="year">今年</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="bg-white flex">
      <div class="w-1/2 pb-6">
        <div class="clearfix">
          <div class=""><span class="float-left p-3 pl-4 text-base">预警排行</span></div>
          <div class="float-right mr-6">
            <el-select v-model="data.ScreeningValue" class="m-2" placeholder="精准筛选" style="width: 120px">
              <el-option v-for="item in form.ScreeningOptions" :key="item.Id" :label="item.Name" :value="item.Id" />
            </el-select>
          </div>
        </div>
        <div class="h-80 w-11/12 m-auto list" style="overflow: auto">
          <div class="h-14 bg-blue-50 rounded-md mt-2 mb-2 rowup flex" v-for="(item, index) in 10">
            <div class="w-14 h-14 rounded relative">
              <img src="../../../assets/img/tech/TechnicalDirector/yujingbg.png" alt="" />
              <span class="text-xl text-white absolute top-3 left-6">{{ index + 1 }}</span>
            </div>
            <div class="w-9 h-9 rounded-full mt-3 ml-4">
              <img src="../../../assets/img/tech/header.jpg" class="rounded-full" alt="" />
            </div>
            <div class="w-520 ml-4 pt-3">
              <p class="text-sm">刘某某</p>
              <el-progress :percentage="50" />
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/2">
        <div class="clearfix">
          <div class=""><span class="float-left p-3 pl-4 text-base">绩效排行</span></div>
          <div class="float-right mr-6">
            <el-select v-model="data.achievementsValue" class="m-2" placeholder="精准筛选" style="width: 120px">
              <el-option v-for="item in form.achievementsOptions" :key="item.Id" :label="item.Name" :value="item.Id" />
            </el-select>
          </div>
        </div>
        <div class="h-80 w-11/12 m-auto list" style="overflow: auto">
          <div class="h-14 bg-green-50 rounded-md mt-2 mb-2 rowup flex" v-for="(item, index) in 10">
            <div class="w-14 h-14 rounded relative">
              <img src="../../../assets/img/tech/TechnicalDirector/jixiaobg.png" alt="" />
              <span class="text-xl text-white absolute top-3 left-6">{{ index + 1 }}</span>
            </div>
            <div class="w-9 h-9 rounded-full mt-3 ml-4">
              <img src="../../../assets/img/tech/header.jpg" class="rounded-full" alt="" />
            </div>
            <div class="w-520 ml-4 pt-3">
              <p class="text-sm">刘某某</p>
              <el-progress :percentage="percentage" :color="data.customColor" />
              <el-progress :percentage="50" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region  报价等级 预警订单 分配订单 市场份额-->
    <TechnicalAttacheBottom />
    <!-- #endregion -->
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import TechnicalAttacheTop from '../TechnicalAttache/_Components/TechnicalAttacheTop.vue'
import TechnicalAttacheBottom from '../TechnicalAttache/_Components/TechnicalAttacheBottom.vue'

export default defineComponent({
  components: {
    TechnicalAttacheTop,
    TechnicalAttacheBottom
  },
  setup() {
    const form = reactive({
      ScreeningOptions: [
        { Name: '按预警数', Id: 1 },
        { Name: '按超时数', Id: 2 },
        { Name: '按延时数', Id: 3 },
        { Name: '按暂停数', Id: 4 }
      ],
      achievementsOptions: [
        { Name: '按报价量', Id: 1 },
        { Name: '按金额量', Id: 2 },
        { Name: '按成单量', Id: 3 },
        { Name: '按逾期量', Id: 4 },
        { Name: '按责任量', Id: 5 }
      ]
    })
    const data = reactive({
      show_1: 'all',
      show_2: 'week',
      ScreeningValue: '',
      achievementsValue: '',
      customColor: [
        {
          color: '#409EFF'
        }
      ]
    })
    const tabPosition = ref('all')
    const tabAppraisal = ref('week')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      data.show_1 = tabPosition.value
      console.log(data.show_1)
    }
    const allWaitAppraisal = (val: any) => {
      data.show_2 = tabAppraisal.value
    }

    return {
      data,
      form,
      allWait,
      tabPosition,
      tabAppraisal,
      allWaitAppraisal
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_AccountingProcessing_AccountingSpecialist {
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  @keyframes rowup {
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }

    100% {
      -webkit-transform: translate3d(0, -340px, 0);
      transform: translate3d(0, -340px, 0);
    }
  }
  .list .rowup {
    -webkit-animation: 12s rowup linear infinite normal;
    animation: 12s rowup linear infinite normal;
    position: relative;
  }
}
</style>
