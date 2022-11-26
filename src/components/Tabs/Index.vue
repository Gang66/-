<!--
 * @Author: ZHJ
 * @Date: 2022-04-28 09:56:49
 * @LastEditTime: 2022-11-10 08:43:41
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\components\Tabs\Index.vue
 * 版权声明
-->
<template>
  <el-row :gutter="10" class="items-center">
    <el-col :md="24" :lg="12">
      <div class="flex bf-tabs-content">
        <div class="cursor-pointer mr-3" :class="data.selectIndex == index ? 'bf-title-color font-semibold' : 'bf-no-color'" v-for="(item, index) in tabList" :key="index"
          @click="selectEvent(index)">
          {{ item.name }}
          <slot :data="index">{{item.subTitle}}</slot>
        </div>
      </div>
    </el-col>
    <el-col :md="24" :lg="12" class="text-right">
      <slot name="button"></slot>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'vue'
export default defineComponent({
  props: {
    tabList: {
      type: Array,
      default: []
    }
  },
  emits: ['handleClick'],
  setup(props, context: SetupContext) {
    const data = reactive({
      selectIndex: 0
    })
    const selectEvent = (index: number) => {
      data.selectIndex = index
      context.emit('handleClick', index)
    }
    return { data, selectEvent }
  }
})
</script>

<style lang="scss" scoped></style>
