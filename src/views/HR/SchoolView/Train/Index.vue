<template>
  <div class="px-52 Train pt-4">
    <el-row :gutter="15">
      <el-col :span="3">
        <el-menu class="el-menu-vertical-demo h-80" default-active="1" @open="handleOpen" @close="handleClose" @select="handleSelect">
          <el-menu-item index="1">
            <span>当前学习</span>
          </el-menu-item>
          <el-menu-item index="2">
            <span>学习记录</span>
          </el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div class="bg-white h-full right-minHeight">
          <CurrentLearning v-if="data.selectIndex == 1" viewState="success"></CurrentLearning>
          <CurrentLearning v-if="data.selectIndex == 2" viewState="info"></CurrentLearning>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import CurrentLearning from './_Components/CurrentLearning.vue'
export default defineComponent({
  components: { CurrentLearning },
  props: {},
  setup() {
    const data: any = reactive({
      selectIndex: 1
    })
    const handleOpen = (key: string, keyPath: string[]) => {}
    const handleClose = (key: string, keyPath: string[]) => {}
    const handleSelect = (key: string, keyPath: string[]) => {
      data.selectIndex = key
    }
    return { handleOpen, handleClose, handleSelect, data }
  }
})
</script>

<style lang="postcss" scoped>
.Train {
  .el-menu-item {
    text-align: center;
    span {
      margin: auto;
    }
  }
  .el-menu-item.is-active {
    color: var(--el-color-white);
    background: var(--el-menu-active-color);
  }
  .el-menu {
    border-right: none !important;
  }
  .right-minHeight {
    height: calc(100vh - 19rem);
    overflow-y: auto;
  }
  /* ::-webkit-scrollbar {
    display: none;
  } */
}
</style>
