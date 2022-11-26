<template>
  <div>
    <div class='bg-white rounded border-blue-300 py-5 mb-1 flex flex-col justify-center'>
      <div class='flex items-center justify-center'>
        <img :src='topLeft' alt=''>
        <div class='text-lg font-medium mx-2'>合同总量/总金额</div>
        <img :src='topRight' alt=''>
      </div>
      <div v-if='!type' class='text-center text-4xl font-medium mt-2'>{{data.ContractCount}}/{{data.ContractAmount}}</div>

      <template v-else>
        <div class='text-center text-4xl font-medium mt-2 border-b border-blue-400 border-dashed pb-2'>88888/88888</div>
        <div class='flex items-center'>
          <div class='flex-1 flex flex-col items-center'>
            <div class='flex items-center text-sm mt-3'>
              <img :src='topLeft' class='w-6' alt=''>
              <div class='mx-1 mb-1'>{{ type == 1 ? '应收账款' : type == 2 ? '逾期合同' : '诉讼合同' }}</div>
              <img :src='topRight' class='w-6' alt=''>
            </div>
            <div class='w-28 h-8 bg-left text-white font-bold text-center'>
              138000
            </div>
          </div>
          <div class='flex-1 flex flex-col items-center'>
            <div class='flex items-center text-sm mt-3'>
              <img :src='smPinkLeft' class='w-6' alt=''>
              <div class='mx-1 mb-1'>{{ type == 1 ? '到期账款' : type == 2 ? '逾期金额' : '诉讼金额' }}</div>
              <img :src='smPinkRight' class='w-6' alt=''>
            </div>
            <div class='w-28 h-8 bg-right text-white font-bold text-center'>
              138000
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
import topLeft from '/@/assets/img/sale/contractlibrary/top_left.png'
import topRight from '/@/assets/img/sale/contractlibrary/top_right.png'
import smPinkLeft from '/@/assets/img/sale/contractlibrary/sm-pink-left.png'
import smPinkRight from '/@/assets/img/sale/contractlibrary/sm-pink-right.png'

const prop = defineProps({
  data: {
    type: Object,
    default() {
      return {}
    }
  },
  // 栏目类型
  type: {
    type: Number,
    default() {
      return 0
    }
  }
})
const { type } = reactive(prop)
</script>

<style scoped>
.bg-left {
  background: url(/@/assets/img/sale/contractlibrary/blue-left.png);
  background-size: 100% 100%;
}
.bg-right {
  background: url(/@/assets/img/sale/contractlibrary/pink-right.png);
  background-size: 100% 100%;
}
</style>
