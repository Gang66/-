<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4">
      <div>
        <i class="iconfont icon-chanpin text-red-500"></i>
        <span class="text-sm ml-2 mr-2">全部</span>
        <el-button size="small">系统内置</el-button>
        <div class="float-right text-sm">
          <span class="mr-1 text-red-500">22</span>
          <span>个全部产品</span>
        </div>
      </div>
      <div class="mt-3">
        <i class="iconfont icon-chanpin text-red-500"></i>
        <span class="text-sm ml-2 mr-2">未分组</span>
        <el-button size="small">系统内置</el-button>
        <div class="float-right text-sm">
          <span class="mr-1 text-red-500">5</span>
          <span>个未分组产品</span>
        </div>
      </div>
      <div class="mt-3" v-for="(item, index) in data.groupingList">
        <i class="iconfont icon-chanpin text-green-500"></i>
        <span class="text-sm ml-2 mr-2 text-blue-500">{{ index++ + 1 }}组</span>
        <div class="float-right text-sm">
          <span class="mr-1 text-green-500">1</span>
          <span>个分组产品</span>
        </div>
      </div>
      <div class="float-right mt-2 mb-4">
        <el-button @click="deleteAll()">全部删除</el-button>
        <el-button type="primary" @click="addGrouping()">新建分组</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      groupingList: [{ id: 1 }] //分组列表
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

    // 添加分组
    const addGrouping = () => {
      data.groupingList.unshift({ id: 2 })
    }
    // 全部删除
    const deleteAll = () => {
      data.groupingList = []
    }

    return {
      boxStyle,
      closeWindow,
      data,
      addGrouping,
      deleteAll
    }
  }
})
</script>
<style lang="postcss" scoped></style>
