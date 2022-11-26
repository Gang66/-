<template>
  <div class="bf-content hr_practicalBase_index">
    <div class="bf-center-content">
      <tabs :tabList="data.tabList" @handleClick="selectEvent"> </tabs>
      <CustomerQuantification v-if="data.selectIndex == 0" />
      <QuotationQuantification v-else-if="data.selectIndex == 1" />
      <ContractQuantification v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import tabs from '/@/components/Tabs/Index.vue'
import CustomerQuantification from './_Components/CustomerQuantification.vue'
import ContractQuantification from './_Components/ContractQuantification.vue'
import QuotationQuantification from './_Components/QuotationQuantification.vue'

export default defineComponent({
  components: {
    tabs,
    CustomerQuantification,
    ContractQuantification,
    QuotationQuantification
  },
  setup() {
    const data = reactive({
      tabList: [
        {
          name: '客户量化'
        },
        {
          name: '报价量化'
        },
        {
          name: '合同量化'
        }
      ],
      selectIndex: 0
    })
    // tab  量化切换
    const selectEvent = (index: number) => {
      data.selectIndex = index
      console.log(data.selectIndex)
    }

    return {
      data,
      selectEvent
    }
  }
})
</script>

<style lang="postcss" scoped>
.hr_practicalBase_index {
  :deep(.bf-tabs-content) {
    font-size: 18px !important;
    margin-right: 4px;
  }
}
</style>
