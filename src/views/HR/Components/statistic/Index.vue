<template>
  <div>
    <!-- <div class="statistic-container mb-4">
      <div class="flex items-center justify-end">
        <div class="text-sm bf-font-white-color">{{ title }}</div>
        <img src="/src/assets/img/hr/components/header_theme.png" class="w-7 h-7" />
      </div>
      <el-row :gutter="10">
        <div class="flex items-center justify-between w-full h-full">
          <div class="statistic-card">
            <el-col :md="12" :lg="9">
              <div style="display: flex">
                <img src="/src/assets/img/hr/components/header_trophy.png" class="w-12 h-12" />
                <div class="pt-2.5 pl-1">
                  <div class="bf-text-color-primary text-sm" style="line-height: 1">当前排名</div>
                  <div class="lining-none">第{{ statisticData.ranking }}名</div>
                </div>
              </div>
              <div class="bf-font-white-color cursor-pointer text-sm mt-1" @click="openRankingDialog">查看所有排行榜</div>
            </el-col>
            <el-col :md="12" :lg="5" class="col-content ml-12">
              <div class="value">{{ statisticData.intervieweeTotal }}</div>
              <div class="label">{{ statisticData.intervieweeTotalLable }}</div>
            </el-col>
            <el-col :md="12" :lg="5" class="col-content">
              <div class="value">
                {{ statisticData.interviewPer }}
                <small>%</small>
              </div>
              <div class="label">{{ statisticData.interviewPerLabel }}</div>
            </el-col>
            <el-col :md="12" :lg="5" class="col-content">
              <div class="value">
                {{ statisticData.alivePer }}
                <small>%</small>
              </div>
              <div class="label">{{ statisticData.alivePerLabel }}</div>
            </el-col>
          </div>
          <div class="flex items-center">
            <div>
              <el-select v-model="data.DepartId" placeholder="请选择事业部" style="width: 130px">
                <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </div>
            <filterDatetime class="ml-6"></filterDatetime>
          </div>
          <slot name="button"></slot>
        </div>
      </el-row>
    </div> -->
    <div class="statistic-container mb-4">
      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <el-avatar :size="64" :src="data.avatar" />
          <div class="text-sm text-white ml-2">
            <div class="flex items-center">
              <div class="mr-2 mb-0.5">{{ data.userInfo.RealName }}</div>
              <el-icon>
                <el-icon-Iphone />
              </el-icon>
              <div class="font-normal">{{ data.userInfo.UserName }}</div>
            </div>
            <div class="font-normal mt-1">{{ data.userInfo.company }}·{{ data.userInfo.department }}·{{ data.userInfo.postname }}</div>
          </div>
          <img src="/src/assets/img/hr/components/header_theme.png" class="w-7 h-7 ml-2" />
        </div>
        <div>
          <div class="flex justify-between">
            <div class="flex items-center text-white font-medium">
              <div>早上好，{{ data.userInfo.RealName }}！</div>
              <div class="text-sm ml-4 font-normal">今天是</div>
              <div class="text-sm ml-4 font-normal">2022年3月30日 星期三</div>
            </div>
            <div class="containerButton">
              <el-button type="primary">
                <el-icon :size="20">
                  <el-icon-Setting />
                </el-icon>
                <div class="ml-1">设置座右铭</div>
              </el-button>
            </div>
          </div>
          <div class="text-sm text-white mt-2 font-normal">才华并不能使你坚韧不拔，宝剑锋从磨砺出，有辉煌成就的那些人，大抵都是用毅力获得成功的吧。</div>
          <div class="flex items-center mt-3">
            <div class="money-bg flex items-center">
              <el-image style="width: 21px; height: 21px" :src="data.moneyImage" fit="cover" />
              <div class="money-title">今日工资：100元</div>
            </div>
            <div class="money-bg flex items-center ml-4">
              <el-image style="width: 21px; height: 21px" :src="data.moneyImage" fit="cover" />
              <div class="money-title">本月累计工资：2000元</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import money from '/@/assets/img/hr/home/money.png'
import ceshiTwo from '/@/assets/img/hr/SchoolView/home/ceshiTwo.png'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, reactive } from 'vue'
import { GetTypeDepartList } from '/@/api/system/dept'
import filterDatetime from '../filterDatetime/Index.vue'
import { useLayoutStore } from '/@/store/modules/layout'
const useStore = useLayoutStore() //记得加这一句
// 头部事件
const headerEvent = (val: any) => {
  return {}
}
export default defineComponent({
  components: {
    filterDatetime
  },
  props: {
    //是否显示筛选事业部
    isDept: {
      type: Boolean,
      default: true
    },
    // 是否显示综合搜索
    isComprehensive: {
      type: Boolean,
      default: true
    },
    // 是否显示时间筛选
    isTime: {
      type: Boolean,
      default: true
    },
    // 统计数据
    statisticData: {
      type: Object,
      default: () => {
        return {
          intervieweeTotal: 0, // 邀约人数
          intervieweeTotalLable: '入职人数',
          interviewPer: 100, // 面试率
          interviewPerLabel: '现存人数',
          alivePer: 100, // 现存率
          alivePerLabel: '现存率',
          ranking: 1 // 我的排名，规则：时间段内，所有hr_interviewee表里的create_uid
        }
      }
    },
    // 筛选参数
    pageInfo: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 标题
    title: {
      type: String,
      default: '才华并不能使你坚韧不拔，宝剑锋从磨砺出，有辉煌成就的那些人，大抵都是用毅力获得成功的吧。'
    }
  },
  setup() {
    // 数据信息
    const data = reactive({
      moneyImage: money, //工资图片
      avatar: ceshiTwo, //头像图片
      queryParams: {}, //筛选数据
      deptList: [], //部门数据
      userInfo: {} //用户信息
    })
    onMounted(() => {
      // 获取部门列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
      // 获取当前考生信息
      data.userInfo = useStore.getUserInfo
    })
    return { data, ...headerEvent(data) }
  }
})
</script>

<style lang="postcss" scoped>
.statistic-container {
  min-height: 120px;
  border-radius: 8px;
  padding: 15px 20px;
  background: url('/src/assets/img/hr/components/header_bg.png') no-repeat left center;
  background-size: cover;
  .statistic-bottom {
    height: 100%;
    display: flex;
    align-items: center;
  }
  .statistic-card {
    /* min-width: 420px; */
    .el-col.col-icon {
      img.icon {
        width: 48px;
        height: 49px;
        text-align: center;
        margin-top: -8px;
      }
    }
    .el-col.col-content {
      text-align: center;
      padding: 0;
      .value {
        font-size: 24px;
        margin-bottom: 5px;
      }
      .label {
        font-size: 14px;
        font-weight: 400;
      }
    }
  }
  .money-bg {
    padding: 5px 10px;
    min-width: 160px;
    height: 32px;
    background: #fff2d0;
    border-radius: 18px;
    .money-title {
      color: #fa6a0b;
      margin-left: 8px;
    }
  }
  .containerButton {
    :deep(.el-button) {
      background: #007bd8;
      border-radius: 14px;
      padding: 8px 9px;
    }
  }
}
</style>
