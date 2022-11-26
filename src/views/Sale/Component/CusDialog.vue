<template>
  <OpenWindow :box-style='boxStyle' :is-show='true' class='salerDialog' @closeWindow="closeWindow('close')">
    <template #title>
      <div>
      </div>
    </template>

    <div class='bg relative form-radius'>
      <div class='relative'>
        <div class='form-top absolute' />
      </div>
      <div class='form-pt relative z-50'>
        <div class="z-50">
          <div>
            <div class="absolute top-2 right-4">
              <el-icon class="cursor-pointer w-8" style="    font-size: 16px;">
                <el-icon-Close @click="closeWindow" />
              </el-icon>
            </div>
            <div class="from-title">{{title}}</div>
          </div>
          <slot></slot>
        </div>
        <div class='form-bottom absolute bottom-0 right-0' />
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts" setup>
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { reactive, ref } from 'vue'
const popoverRef = ref()

defineProps({
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: ''
  },
  boxStyle: {
    type: Object,
    default: {
      boxWidth: 'w-740',
      boxHeight: ''
    }
  }
})

const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
</script>

<style lang="postcss" scoped>
</style>