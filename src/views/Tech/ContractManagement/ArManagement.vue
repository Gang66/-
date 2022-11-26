<template>
  <el-tabs type="border-card">
    <el-tab-pane label="合约管理">
      <ContractManagement />
    </el-tab-pane>
    <el-tab-pane label="法务处理">
      <LegalAffairsManagement />
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ContractManagement from './_Components/ContractManagement.vue'
import LegalAffairsManagement from './_Components/LegalAffairsManagement.vue'
import '/@/assets/css/tech.css'

export default defineComponent({
  components: {
    ContractManagement,
    LegalAffairsManagement
  },
  setup() {}
})
</script>

<style lang="postcss" scoped></style>
