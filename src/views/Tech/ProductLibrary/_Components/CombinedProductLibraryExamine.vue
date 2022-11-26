<template>
  <OpenWindow
    :boxStyle="boxStyle"
    :isShow="true"
    @closeWindow="closeWindow('close')"
  >
    <div>
       <div class=" pl-6 pt-4">
        <div class="inline-block">
         <span class="text-sm">产品类别：</span>
      </div>
      <div class="  inline-block">
        <el-radio-group v-model="radio1" class=" w-72">
           
          <el-radio label="1" size="large">常规常用</el-radio>
          <el-radio label="2" size="large">常规非常用</el-radio>
          <el-radio label="3" size="large">非常规常用</el-radio>
          <el-radio label="4" size="large">非常规非常用</el-radio>
          <el-radio label="5" size="large">配件产品库</el-radio>
          <el-radio label="6" size="large">电气液动产品库</el-radio>
        </el-radio-group>
      </div>
       </div>
      <div class=" float-right mr-6 mt-4 mb-4">
         <div class="inline-block mr-3">
        <el-button @click="closeWindow()">取消</el-button>
      </div>
      <el-button type="primary" class="" @click="">确定</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, SetupContext, reactive, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {},
  setup(props, context: SetupContext) {
    const radio1 = ref('')
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-400',
      boxHeight: ''
    })

    return {
      closeWindow,
      boxStyle,
      radio1
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
