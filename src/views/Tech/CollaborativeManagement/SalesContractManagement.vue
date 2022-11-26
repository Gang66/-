<template>
  <el-tabs type="border-card">
    <el-tab-pane label="待生效合同"> <ContractEffective /> </el-tab-pane>
    <el-tab-pane label="生效合同"> <EffectiveContract /> </el-tab-pane>
    <el-tab-pane label="异常合同"> <AbnormalContract /> </el-tab-pane>
    <el-tab-pane label="合同回收站"> <ContractRecycleBin /> </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContractEffective from './_Components/ContractEffective.vue'
import EffectiveContract from './_Components/EffectiveContract.vue'
import AbnormalContract from './_Components/AbnormalContract.vue'
import ContractRecycleBin from './_Components/ContractRecycleBin.vue'
import '/@/assets/css/tech.css'

export default defineComponent({
  components: { ContractEffective, EffectiveContract, AbnormalContract, ContractRecycleBin },
  setup() {}
})
</script>

<style lang="postcss" scoped></style>
