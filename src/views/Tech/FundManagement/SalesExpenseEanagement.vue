<template>
  <el-tabs type="border-card">
    <el-tab-pane label="提成费用"> <CommissionFee /> </el-tab-pane>
    <el-tab-pane label="居间费用"> <BrokerageFee /> </el-tab-pane>
    <el-tab-pane label="加价费用"><MarkUpFee /></el-tab-pane>
    <el-tab-pane label="奖金费用"><BonusExpenses /></el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import CommissionFee from './_Components/CommissionFee.vue'
import BrokerageFee from './_Components/BrokerageFee.vue'
import MarkUpFee from './_Components/MarkUpFee.vue'
import BonusExpenses from './_Components/BonusExpenses.vue'

export default defineComponent({
  components: { CommissionFee, BrokerageFee, MarkUpFee, BonusExpenses },
  setup() {}
})
</script>

<style lang="postcss" scoped></style>
