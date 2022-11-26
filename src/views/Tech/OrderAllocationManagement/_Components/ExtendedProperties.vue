<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pl-16 pt-4 pb-4">
      <el-checkbox-group v-model="data.checkList">
        <el-checkbox label="材质" />
        <el-checkbox label="重量" />
        <el-checkbox label="客用名称" />
        <el-checkbox label="客用型号" />
        <el-checkbox label="电装厂家" />
        <el-checkbox label="技术要求" />
        <el-checkbox label="备用" />
        <el-checkbox label="产品参数3" />
      </el-checkbox-group>
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
  setup(props, context: SetupContext) {
    const data = reactive({
      input: '',
      value: '',
      checkList: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
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
