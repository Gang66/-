<template>
  <div class="Tech_OrderAllocationManagement">
    <div class="h-8">
      <filterDatetime @transmitTime="transmitTimeEvent" :list="data.timeList" :key="data.selectIndex"></filterDatetime>
    </div>
    <OrderAllocationManagementTop />
    <!-- 公共询价单   询价单回收站 -->
    <OrderAllocationManagementTable />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import filterDatetime from '../Inquiry/_Components/filterDatetime.vue'
import OrderAllocationManagementTop from './_Components/OrderAllocationManagementTop.vue'
import OrderAllocationManagementTable from './_Components/OrderAllocationManagementTable.vue'

export default defineComponent({
  components: {
    filterDatetime,
    OrderAllocationManagementTop,
    OrderAllocationManagementTable
  },
  setup() {
    const data = reactive({
      selectIndex: 0,
      //   时间筛选数据
      timeList: [
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '年', type: 'year' }
      ]
    })

    const transmitTimeEvent = () => {}

    return {
      data,
      transmitTimeEvent
    }
  }
})
</script>

<style lang="postcss" scoped></style>
