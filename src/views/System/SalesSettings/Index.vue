<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <tabs :tabList="data.tabList" @handleClick="selectEvent"> </tabs>
      <!-- #region 表格列表-->
      <div class="mt-2 relative">
        <PerformanceSetting v-if="data.tabIndex == 0" />
        <SalaryAssessmentStandard v-else-if="data.tabIndex == 1" />
        <WorkloadAssessmentSettings v-else />
      </div>

      <!-- #endregion -->
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'
import zStatistic from '/@/views/HR/Components/statistic/Index.vue'
import tabs from '/@/components/Tabs/Index.vue'
import PerformanceSetting from './_Components/PerformanceSetting.vue'
import SalaryAssessmentStandard from './_Components/SalaryAssessmentStandard.vue'
import WorkloadAssessmentSettings from './_Components/WorkloadAssessmentSettings.vue'
export default defineComponent({
  components: {
    zStatistic,
    PerformanceSetting,
    SalaryAssessmentStandard,
    WorkloadAssessmentSettings,
    tabs
  },
  setup() {
    const data = reactive({
      tabIndex: 0,
      tabList: [{ name: '业绩量设置' }, { name: '工作量考核标准' }, { name: '工作量考核设置' }]
    })
    //tab
    const selectEvent = (val: any) => {
      console.log(val)
      data.tabIndex = val
    }

    return {
      data,
      selectEvent
    }
  }
})
</script>

<style lang="postcss" scoped></style>
