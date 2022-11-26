<template>
  <div class="tech_inquiry_big">
    <!-- 工资合计 分配  预警 -->
    <TotalWages></TotalWages>
    <el-row :gutter="20" class="mt-4">
      <el-col :span="getSetting.showLayoutRight ? 24 : 18">
        <div class="grid-content ep-bg-purple">
          <!-- 我的报价单   公共报价单 -->
          <AccountingListTable />
        </div>
      </el-col>
      <el-col :span="6" v-show="!getSetting.showLayoutRight">
        <!-- 右侧 -->
        <div class="right grid-content ep-bg-purple mb-0 ml-px">
          <div class="rounded-xl bg-white h-28">
            <div>
              <h6 class="text-sm text-gray-400 leading-4 p-3 inline-block">单位：条</h6>
            </div>
            <div class="flex m-3 text-center mt-0">
              <div class="w-2/6">
                <div style="position: relative">
                  <span class="text-3xl font-semibold">{{ data.Company.OrderTotal }}</span>
                  <div class="inline-block absolute w-8 -top-1 right-2">
                    <div>
                      <span v-if="data.Company.OrderTotals > 0" class="text-xs text-red-500">{{ data.Company.OrderTotals }}%</span>
                      <span v-else class="text-xs text-green-500">{{ data.Company.OrderTotals }}%</span>
                    </div>
                    <div class="">
                      <i v-if="data.Company.OrderTotals > 0" class="iconfont icon-shangsheng text-red-500"></i>
                      <i v-else class="iconfont icon-xiajiang text-green-500"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm">询价单总计</span>
                </div>
              </div>
              <div class="w-2/6">
                <div style="position: relative">
                  <span class="text-3xl font-semibold">{{ data.Company.OrderExceedTotal }}</span>
                  <div class="inline-block absolute w-8 -top-1 right-2">
                    <div>
                      <span v-if="data.Company.OrderExceedTotals > 0" class="text-xs text-red-500">{{ data.Company.OrderExceedTotals }}%</span>
                      <span v-else class="text-xs text-green-500">{{ data.Company.OrderExceedTotals }}%</span>
                    </div>
                    <div class="">
                      <i v-if="data.Company.OrderExceedTotals > 0" class="iconfont icon-shangsheng text-red-500"></i>
                      <i v-else class="iconfont icon-xiajiang text-green-500"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm">超时待办同比</span>
                </div>
              </div>
              <div class="w-2/6">
                <div style="position: relative">
                  <span class="text-3xl font-semibold">{{ data.Company.OrderNormalTotal }}</span>
                  <div class="inline-block absolute w-8 -top-1 right-2">
                    <div>
                      <span v-if="data.Company.OrderNormalTotals > 0" class="text-xs text-red-500">{{ data.Company.OrderNormalTotals }}%</span>
                      <span v-else class="text-xs text-green-500">{{ data.Company.OrderNormalTotals }}%</span>
                    </div>
                    <div class="">
                      <i v-if="data.Company.OrderNormalTotals > 0" class="iconfont icon-shangsheng text-red-500"></i>
                      <i v-else class="iconfont icon-xiajiang text-green-500"></i>
                    </div>
                  </div>
                </div>
                <div>
                  <span class="text-sm">正常待办同比</span>
                </div>
              </div>
            </div>
          </div>
          <div class="personal rounded-2xl mt-3 bg-white">
            <div class="text-xs h-12 bg-blue-100 pb-3 pt-3 clearfix relative">
              <div class="inline-block">
                <span class="ml-2 text-xs">个人预警平台</span>
              </div>
              <div class="text-gray-400 float-right pr-3.5 text-xs">
                <span>共{{ getArrNum(data.ExceedInquirySheetList) + getArrNum(data.WarningInquirySheetList) }}条</span>
              </div>
              <div class="absolute top-2 left-20 ml-2">
                <el-radio-group v-model="data.show" size="small">
                  <el-radio-button :label="'overtime'">
                    <span class="">超时待办（{{ getArrNum(data.ExceedInquirySheetList) }}）</span>
                  </el-radio-button>
                  <el-radio-button :label="'soon'">
                    <span class="">即将超时（{{ getArrNum(data.WarningInquirySheetList) }}）</span>
                  </el-radio-button>
                </el-radio-group>
              </div>
            </div>
            <!-- 超时待办 -->
            <div v-if="data.show == 'overtime'">
              <el-table :data="data.ExceedInquirySheetList" stripe class="w-full" :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <el-table-column type="index" label="序号" width="54" align="center" class="text-xs" />
                <el-table-column prop="date" label="客户名称" min-width="180">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.ClientName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="等级" width="60" align="center">
                  <template #default="scope">
                    <!-- A -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                    <!-- B -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                    <!-- C -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="超时" width="70" align="center">
                  <template #default="scope">
                    <span class="text-xs text-red-500">{{ scope.row.ExceedOutTime || 0 }}h</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 即将超时 -->
            <div v-if="data.show == 'soon'">
              <el-table :data="data.WarningInquirySheetList" stripe class="w-full" :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                <el-table-column type="index" label="序号" width="54" align="center" class="text-xs" />
                <el-table-column prop="date" label="客户名称" min-width="180">
                  <template #default="scope">
                    <span class="text-xs">{{ scope.row.ClientName }}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="name" label="等级" width="60" align="center">
                  <template #default="scope">
                    <!-- A -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                    <!-- B -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                    <!-- C -->
                    <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column prop="address" label="超时" width="70" align="center">
                  <template #default="scope">
                    <span class="text-xs text-red-500">{{ scope.row.ExceedOutTime || 0 }}</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '/@/store/modules/layout'
import TotalWages from './_Components/TotalWages.vue'
import { ElTable } from 'element-plus'
import { ElMessage } from 'element-plus'
import AccountingListTable from './_Components/AccountingListTable.vue'
import { GetMyOrderAccounterWarningData } from '/@/api/tech/EnquiryData'

// 获取即将超时   获取超时
const getMyOrderAccounterWarningData = async (form: any, data: any) => {
  await GetMyOrderAccounterWarningData(form.UserId)
    .then((res) => {
      if (res.code == 1) {
        var _obj = res.data || {}
        data.WarningInquirySheetList = _obj.WarningInquirySheetList
        data.ExceedInquirySheetList = _obj.ExceedInquirySheetList
        data.Company = _obj
        data.Company.OrderNormalTotals = _obj.OrderNormalTotal - _obj.OldOrderNormalTotal
        data.Company.OrderExceedTotals = _obj.OrderExceedTotal - _obj.OldOrderExceedTotal
        data.Company.OrderTotals = _obj.OrderTotal - _obj.OldOrderTotal
        console.log(_obj)
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetMyOrderAccounterWarningData${e}`)
    })
}
export default defineComponent({
  components: {
    TotalWages,
    AccountingListTable
  },
  setup() {
    const { currentRoute } = useRouter()
    const { getUserInfo } = useLayoutStore()
    const { getSetting } = useLayoutStore()

    const background = ref(true)
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      // 搜索
      CustomerName: '',
      State: 0, //未处理
      UserId: null
    })
    const data = reactive({
      show: 'overtime',
      // 右侧表格数据
      Company: {
        OrderNormalTotals: '',
        OrderTotals: '',
        OrderExceedTotals: ''
      }
    })
    onMounted(() => {
      //判断是否存在该指令“order_allocation”
      if (currentRoute.value.meta.permission.find((x: any) => x == 'order_allocation')) {
        form.UserId = undefined
      } else {
        form.UserId = getUserInfo.Id || 0
      }
      getMyOrderAccounterWarningData(form, data)
    })

    //获取数组长度
    const getArrNum = (val: any): number => {
      return (val || []).length
    }
    return {
      ElTable,
      form,
      data,
      background,
      getArrNum,
      getSetting
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_inquiry_big {
}
</style>
