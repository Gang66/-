<template>
  <div class="content">
    <el-button @click="show = true">打开窗体</el-button>
    <open-window
      v-model:show="show"
      :is-show="show"
      title="选择页1"
      :box-style="boxStyle"
    >
      <p style="height: 1500px">aaa</p>
      <template #btn>
        <el-button @click="show1 = true">默认按钮1</el-button>
        <el-button>默认按钮</el-button>
        <el-button>默认按钮</el-button>
      </template>
    </open-window>
    <open-window v-model:show="show1" :is-show="show1" title="选择页2">
      <p style="height: 150px">1111</p>
      <template #btn>
        <el-button>默认按钮</el-button>
        <el-button>默认按钮</el-button>
      </template>
    </open-window>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
export default defineComponent({
  name: 'OpenWindowTest',
  components: {
    OpenWindow
  },
  setup() {
    const show = ref(false)
    const boxStyle = reactive({
      boxWidth: 'w-3/5',
      boxHeight: 'h-3/5'
    })
    const show1 = ref(false)
    return {
      show,
      show1,
      boxStyle
    }
  }
})
</script>
