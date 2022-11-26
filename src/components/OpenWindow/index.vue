<template>
  <transition name="el-fade-in">
    <div v-if="isShow" class="open-select-mask w-full h-full bg-black bg-opacity-30 z-50 fixed top-0 left-0 flex flex-center items-start pt-24 overflow-y-auto pb-12"
      :class="[boxStyle.boxPaddingTop, boxStyle.boxPaddingBottom]">
      <div class="bf-window-cp overflow-y-auto" :class="[boxStyle.boxWidth, boxStyle.boxHeight]">
        <!-- <div class="max-w-screen-xl bg-white flex flex-col overflow-x-hidden bf-windows-content"> -->
        <div class="bg-white flex flex-col overflow-x-hidden bf-windows-content">
          <slot name="title">
            <div class="bf-window-header-bg h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100">
              <div class="flex items-center justify-between w-full mr-4">
                <div>{{ title }}</div>
                <slot name="topBtn" />
              </div>
              <div class="cursor-pointer rounded-full bg-gray-200 bg-opacity-50 p-0.5" style="line-height: 0">
                <el-icon @click="close">
                  <el-icon-close />
                </el-icon>
              </div>
            </div>
          </slot>
          <div class="flex-1 overflow-hidden">
            <el-scrollbar>
              <slot name="default" />
            </el-scrollbar>
          </div>
          <div v-if="slots.btn" class="open-select-btn h-12 flex border-t border-gray-100">
            <slot name="btn" />
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from 'vue'
export default defineComponent({
  name: 'SelectPage',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '新窗口'
    },
    boxStyle: {
      type: Object,
      default: {
        //内边距距离顶部
        boxPaddingTop: {
          type: String,
          default: 'pt-24'
        },
        // 内边距 距离底部
        boxPaddingBottom: {
          type: String,
          default: 'pb-12'
        },
        // 窗体高度
        boxWidth: {
          type: String,
          default: 'w-11/12'
        },
        // 窗体高度
        boxHeight: {
          type: String,
          default: 'h-0'
        }
      }
    }
  },

  emits: ['update:show', 'closeWindow'],
  setup(props, context: SetupContext) {
    const close = () => {
      context.emit('update:show', !props.isShow)
      context.emit('closeWindow')
    }
    return {
      close,
      slots: context.slots
    }
  }
})
</script>

<style lang="postcss" scoped>
:deep(.open-select-btn .el-button) {
  border-radius: 0;
  flex: 1;
  min-height: 46px;

  & + .el-button {
    margin-left: -1px;
  }

  &:hover {
    z-index: 1;
  }
}
</style>
