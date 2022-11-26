<template>
  <div class="tech_orderinput_order">
    <!-- 工资合计 分配  预警 -->
    <TotalWages />
    <el-row :gutter="20" class="mt-4">
      <el-col :span="getSetting.showLayoutRight ? 24 : 18">
        <div class="grid-content ep-bg-purple">
          <!-- 订单明细 -->
          <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
            <div class="float-left pt-1 pb-1">
              <span class="ml-4 text-sm">订单明细</span>
            </div>
          </div>
          <div class="h-full mb-12 bg-white overflow-x-hidden">
            <OrderInputLeft />
          </div>
        </div>
      </el-col>
      <el-col :span="6" v-show="!getSetting.showLayoutRight">
        <!-- 右侧 -->
        <OrderinputRight />
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
import TotalWages from '../Inquiry/_Components/TotalWages.vue'
import OrderinputRight from '../OrderInput/_Components/Orderinput_right.vue'
import OrderInputLeft from './_Components/OrderInput_left.vue'

export default defineComponent({
  components: {
    TotalWages,
    OrderinputRight,
    OrderInputLeft
  },
  setup() {
    const { getSetting } = useLayoutStore()

    return {
      getSetting
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_orderinput_order {
}
</style>
