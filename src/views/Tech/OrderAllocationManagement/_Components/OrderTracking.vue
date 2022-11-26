<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-3 pt-1">
      <div v-if="data.hide == 24">
        <el-input class="mt-4 mb-4" v-model="data.textarea" maxlength="200" placeholder="请输入沟通内容" show-word-limit type="textarea" />
      </div>
      <div v-else>
        <p class="text-xs pt-3 pb-3">跟进下客户，信息反馈一下。</p>
        <div class="border-dashed border w-740 pb-4">
          <div class="pl-4 pr-4 pt-3 text-xs flex" v-for="item in 6">
            <div class="w-3 h-3 mt-1 mr-2 border-4 border-blue-400 rounded-full"></div>
            <div>
              <p class="text-sm">报价专员 - 马玉先 (2021-11-23 14:01:15)</p>
              <p class="text-xs text-gray-400">最低价中标</p>
            </div>
          </div>
        </div>
        <el-input class="mt-4 mb-4" v-model="data.textarea" maxlength="200" placeholder="请输入沟通内容" show-word-limit type="textarea" />
      </div>
      <div class="float-right pb-6">
        <el-button>结束</el-button>
        <el-button type="primary">提交</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
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
      textarea: '',
      hide: 0
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-760',
      boxHeight: ''
    })
    onMounted(() => {
      console.log(props.FormData)
      data.hide = props.FormData.Id
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
