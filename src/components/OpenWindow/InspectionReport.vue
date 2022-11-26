<template>
  <transition name="el-fade-in">
    <div v-if="isShow" class="open-select-mask w-full h-full bg-black bg-opacity-30 z-50 fixed top-0 left-0 flex flex-center items-start pt-24 overflow-y-auto pb-12" :class="[boxStyle.boxPaddingTop, boxStyle.boxPaddingBottom]">
      <div class="max-w-screen-xl bg-white flex flex-col overflow-x-hidden overflow-y-auto bf-windows-content" :class="[boxStyle.boxWidth, boxStyle.boxHeight]" style="width: 740px">
        <slot name="title">
          <div class="h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100 relative tech_TechnicalReport_bg_top">
            <div class="cursor-pointer rounded-full bg-gray-200 bg-opacity-50 p-0.5 absolute right-14 top-14 z-30" style="line-height: 0">
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
.tech_TechnicalReport_bg_top {
  height: 38px;
  background-image: url('/@/assets/img/tech/TechnicalReport/bg3.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: 100%;
  display: flex;
  flex-direction: row;
  margin-bottom: -1px;
}
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
