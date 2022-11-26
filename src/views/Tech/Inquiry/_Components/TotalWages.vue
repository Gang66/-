<template>
  <div class="inquiry_components_totalwages">
    <div>
      <!-- class="mb-4" -->
      <div class="h-12">
        <filterDatetime @transmitTime="transmitTimeEvent" :list="data.timeList" :key="data.selectIndex"></filterDatetime>
      </div>
      <el-row :gutter="20">
        <!-- 工资合计 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-green-400 grid-content ep-bg-purple rounded-xl">
            <div class="m-8 my-0 pt-5">
              <div class="inline-block text-center leading-8">
                <div class="mt-5">
                  <div>
                    <span class="font-bold text-2xl text-white">{{ data.OrderObj.WagesTotal }}</span>
                  </div>
                  <div>
                    <span class="text-sm text-white">工资合计 (元)</span>
                  </div>
                </div>
              </div>
              <div class="float-right inline-block inquiry_big_img">
                <i class="iconfont icon-qiandai ml-5 text-white" style="font-size: 60px" />
              </div>
            </div>
          </div>
        </el-col>
        <!-- 分配订单 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-yellow-500 grid-content ep-bg-purple rounded-xl">
            <div class="">
              <div class="float-left inquiry_big_img">
                <div class="mt-2 ml-2">
                  <i class="iconfont icon-dingdan2 text-white ml-5 w-7 h-8" style="font-size: 25px" />
                </div>
              </div>
              <div class="float-left leading-8 pt-2 ml-2">
                <div>
                  <span class="text-white text-sm">分配订单（个）</span>
                </div>
                <div>
                  <span class="font-bold text-2xl text-white">{{ data.OrderObj.OrderTotal }}</span>
                </div>
                <div>
                  <span class="text-xs text-white">已处理：{{ data.OrderObj.OrderProcessedTotal }} 个</span>
                  <span class="text-xs text-white ml-2">未处理：{{ data.OrderObj.OrderUntreatedTotal }} 个</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 预警订单 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-red-400 grid-content ep-bg-purple rounded-xl">
            <div class="">
              <div class="h-32 float-left inquiry_big_img">
                <div class="mt-2 ml-2">
                  <i class="iconfont icon-yujing text-white ml-5 w-7 h-8" style="font-size: 25px" />
                </div>
              </div>
              <div class="h-32 float-left leading-8 pt-2 ml-2">
                <div>
                  <span class="text-white text-sm">预警订单（个）</span>
                </div>
                <div>
                  <span class="font-bold text-2xl text-white">{{ data.OrderObj.WarningTotal }}</span>
                </div>
                <div>
                  <span class="text-xs text-white">预警：{{ data.OrderObj.OrderWarningTotal }} 个</span>
                  <span class="text-xs text-white ml-2">超时：{{ data.OrderObj.OrderExceedTotal }} 个</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-blue-500 rounded-xl">
            <div class="leading-7 pl-4 pt-2 text-sm float-left w-9/12">
              <div><span class="text-white">订单明细（个）</span></div>
              <div>
                <span class="text-white">处理：{{ data.OrderObj.OrderProcessedTotal }}个</span><span class="text-white ml-2">标准：{{ data.OrderObj.OrderStandardTotal }}个</span>
              </div>
              <div><span class="text-white">订单级别（个）</span></div>
              <div>
                <span class="text-white">A级：{{ data.OrderObj.AOrderTotal }}个</span><span class="text-white ml-2">B级：{{ data.OrderObj.BOrderTotal }}个</span><span class="text-white ml-2">C级：{{ data.OrderObj.COrderTotal }}个</span>
              </div>
            </div>
            <i class="iconfont icon-dingdan float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { GetOrderTechnicistTreatmStatistics } from '/@/api/tech/EnquiryData'
import { ElMessage } from 'element-plus'
import { parseTime } from '/@/utils/tools'
import filterDatetime from './filterDatetime.vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '/@/store/modules/layout'
import '/@/assets/css/tech.css'

const getOrderTechnicistTreatmStatistics = async (form: any, data: any) => {
  await GetOrderTechnicistTreatmStatistics(form)
    .then((res) => {
      if (res.code == 1) {
        let _obj = res.data || {}
        data.OrderObj = _obj
        data.OrderObj.WarningTotal = _obj.OrderExceedTotal + _obj.OrderWarningTotal
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetMyOrderTechnicistWarningData${e}`)
    })
}

export default defineComponent({
  components: {
    filterDatetime
  },
  setup() {
    const { currentRoute } = useRouter()
    const { getUserInfo } = useLayoutStore()
    // 监听时间筛选
    const transmitTimeEvent = (time: any) => {
      if (time.BeginDate) {
        form.StartDate = parseTime(time.BeginDate, '{y}-{m}-{d}')
      } else {
        form.StartDate = ''
      }
      if (time.EndDate) {
        form.EndDate = parseTime(time.EndDate, '{y}-{m}-{d}')
      } else {
        form.EndDate = ''
      }
      getOrderTechnicistTreatmStatistics(form, data)
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
    }
    const form = reactive({
      UserId: null,
      StartDate: parseTime(new Date(), '{y}-{m}-{d}'),
      EndDate: parseTime(new Date(), '{y}-{m}-{d}')
    })
    const data = reactive({
      OrderObj: {
        WarningTotal: ''
      },
      selectIndex: 0,
      //   时间筛选数据
      timeList: [
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '年', type: 'year' }
      ]
    })
    onMounted(() => {
      //判断是否存在该指令“order_allocation”
      if (currentRoute.value.meta.permission.find((x: any) => x == 'order_allocation')) {
        form.UserId = undefined
      } else {
        form.UserId = getUserInfo.Id || 0
      }
      getOrderTechnicistTreatmStatistics(form, data)
    })
    return { form, parseTimeEvent, data, transmitTimeEvent }
  }
})
</script>

<style lang="postcss" scoped>
.inquiry_components_totalwages {
}
</style>
