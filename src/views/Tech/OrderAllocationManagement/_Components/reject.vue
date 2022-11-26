<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 clearfix">
      <el-input v-model="data.rejectTextarea" maxlength="100" placeholder="请输入驳回原因" show-word-limit type="textarea" />
      <div class="float-right mt-4">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
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
      rejectTextarea: ''
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

    return {
      boxStyle,
      closeWindow,
      data
    }
  }
})
</script>
<style lang="postcss" scoped></style>
