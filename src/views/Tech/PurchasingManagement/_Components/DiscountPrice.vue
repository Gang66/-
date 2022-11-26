<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 clearfix">
      <div class="mb-4">
        <div class="w-1/4 text-sm text-center inline-block leading-6">
          <p class="text-blue-500">{{ data.AllSellingPrice }}</p>
          <p class="text-gray-400">合计售价</p>
        </div>
        <div class="w-1/4 text-sm text-center inline-block leading-6">
          <p class="text-red-500">{{ data.AllPurchasePrice }}</p>
          <p class="text-gray-400">合计采购价</p>
        </div>
        <div class="w-1/4 text-sm text-center inline-block leading-6">
          <p class="text-green-500">{{ data.DiscountAmount }}</p>
          <p class="text-gray-400">折扣价</p>
        </div>
        <div class="w-1/4 text-sm text-center inline-block leading-6">
          <p class="text-yellow-500">{{ data.SupplyTime }}</p>
          <p class="text-gray-400">周期</p>
        </div>
      </div>
      <div v-if="data.showPrice != 0">
        <div class="flex">
          <el-input type="number" v-model="data.DiscountAmount" placeholder="请输入折扣价" class="flex-1">
            <template #prepend>
              <span class="w-10 text-center">折扣价</span>
            </template>
          </el-input>
          <div class="w-6"></div>
          <el-input type="number" v-model="data.SupplyTime" placeholder="请输入周期" class="flex-1">
            <template #prepend>
              <span class="w-10 text-center">周期</span>
            </template>
            <template #append>天</template>
          </el-input>
        </div>
        <div class="float-right pt-4">
          <el-button @click="closeWindow('close')">取消</el-button>
          <el-button type="primary" @click="SendDiscount">确定</el-button>
        </div>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import OpenWindow from '/@/components/OpenWindow/index.vue'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {
        AllSellingPrice: 0,
        AllPurchasePrice: 0,
        DiscountAmount: 0,
        showPrice: 0,
        SupplyTime: 0
      }
    }
  },
  emits: ['SendDiscount'],
  setup(props, context: SetupContext) {
    const data = reactive({
      discountInput: '',
      showPrice: 1,
      AllSellingPrice: 0,
      AllPurchasePrice: 0,
      DiscountAmount: 0,
      SupplyTime: 0,
      RowIndex: 0,
      CheckedIndex: 0
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })
    // 确定折扣价
    const SendDiscount = () => {
      if (data.DiscountAmount <0 ){
        ElMessage.error('折扣价不得小于0！')
        return false
      }
      if (data.SupplyTime <0 ){
        ElMessage.error('供应周期不得小于0！')
        return false
      }

      let _data = {
        RowIndex: data.RowIndex,
        DiscountAmount: data.DiscountAmount,
        SupplyTime: data.SupplyTime,
      }
      context.emit('SendDiscount', _data)
      closeWindow('close')
    }

    onMounted(() => {
      data.showPrice = props.FormData.showPrice
      data.AllSellingPrice = props.FormData.AllSellingPrice
      data.AllPurchasePrice = props.FormData.AllPurchasePrice
      data.DiscountAmount = props.FormData.DiscountAmount
      data.SupplyTime = props.FormData.SupplyTime
      data.RowIndex = props.FormData.RowIndex
      data.CheckedIndex = props.FormData.CheckedIndex
    })

    return {
      boxStyle,
      closeWindow,
      SendDiscount,
      data
    }
  }
})
</script>
<style lang="postcss" scoped></style>
