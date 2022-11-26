<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div>
      <div class="p-4 pl-14 leading-10">
        <div>
          <span class="mr-12">业务员</span>
          <span>刘某某</span>
        </div>
        <div>
          <span class="mr-12">常规性</span>
          <span>常规常见类</span>
        </div>
        <div>
          <span class="mr-4">加价比例</span>
          <el-input-number style="width: 200px" v-model="data.PriceNum" class="mx-4" :min="1" controls-position="right" @change="handleChange" />
        </div>
        <div>
          <span class="mr-8">是否启用</span>
          <el-switch v-model="data.Enable" inline-prompt active-text="开" inactive-text="关" />
        </div>
      </div>

      <div class="float-right mr-6 mb-3">
        <el-button @click="closeWindow('close')">取消</el-button>
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
      PriceNum: 1,
      Enable: false
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
    const handleChange = (value: number) => {
      console.log(value)
    }

    return {
      boxStyle,
      closeWindow,
      data,
      handleChange
    }
  }
})
</script>
<style lang="postcss" scoped></style>
