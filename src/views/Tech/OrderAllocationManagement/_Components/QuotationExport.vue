<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-6">
      <el-date-picker v-model="data.value2" type="daterange" unlink-panels range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" size="default" style="width: 260px" class="mr-4" />
    </div>
    <div class="w-800 h-80 border-dashed border border-gray-400 m-auto mb-8">
      <div class="w-40 h-40 m-auto mt-3">
        <svg-icon icon-class="svg-Tech_QuotationExport" style="font-size: 10rem" />
      </div>
      <div class="text-center">
        <p class="text-sm mt-3">请筛选时间范围/当前筛选2022-06-20 ~ 2022-06-26，点击导出文件按钮</p>
        <p class="text-xs text-gray-400 mt-3">温馨提示：选择的时间区间范围，导出的数据含有报价和无报价销售人员明细</p>
        <el-button type="primary" class="mt-4"><i class="iconfont icon-daochu mr-2"></i> 导出EXL文件</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0, //询价单Id
        BomId: 0, //报价单Id
        ClientName: ''
      }
    }
  },
  setup(props, context: SetupContext) {
    const shortcuts = [
      {
        text: '最近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '最近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: '最近三个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        }
      }
    ]
    const data = reactive({
      value2: ''
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-840',
      boxHeight: ''
    })

    return {
      closeWindow,
      boxStyle,
      data,
      shortcuts
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
