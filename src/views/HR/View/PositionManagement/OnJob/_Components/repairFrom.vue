<template>
  <OpenWindow :boxStyle="Allvar.boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="h-96"></div>
  </OpenWindow>
</template>
<script lang="ts">
import { defineComponent, reactive, SetupContext } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['CloseWindow'],
  setup(prop, context: SetupContext) {
    const Allvar = reactive({
      //   弹窗样式
      boxStyle: {
        boxWidth: 'w-820',
        boxHeight: ''
      }
    })
    const closeWindow = (val: any) => {
      context.emit('CloseWindow', val)
    }
    return { Allvar, closeWindow }
  }
})
</script>
<style lang="postcss" scoped></style>
