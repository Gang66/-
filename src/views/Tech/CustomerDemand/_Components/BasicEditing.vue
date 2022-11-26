<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="tech_BasicEditing">
      <div class="p-4 pl-14 leading-10">
        <div class="ml-8">
          <span class="mr-8">类别</span>
          <span>常规类</span>
        </div>
        <div>
          <span class="mr-4">基础比例</span>
          <el-input-number style="width: 200px" v-model="data.PriceNum" class="mx-4" :min="1" controls-position="right" @change="handleChange" />
        </div>
        <div class="text-center text-sm mt-3 mb-3">金额或数量</div>
        <el-divider />
        <div class="ml-8">
          <span class="mr-4">较大</span>
          <el-input-number style="width: 200px" v-model="data.PriceNum" class="mx-4" placeholder="输入比例" :min="1" controls-position="right" @change="handleChange" />
        </div>
        <div class="ml-8">
          <span class="mr-4">正常</span>
          <el-input-number style="width: 200px" v-model="data.PriceNum" class="mx-4" placeholder="输入比例" :min="1" controls-position="right" @change="handleChange" />
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
      PriceNum: 1
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
<style lang="postcss" scoped>
.tech_BasicEditing {
  .el-divider--horizontal {
    width: 94% !important;
    margin: 0 auto 20px auto;
  }
}
</style>
