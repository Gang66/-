<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4">
      <div>
        <p class="text-base font-semibold pb-2">帮助范围</p>
        <div class="text-gray-400 text-sm">
          <p>1、技术处理中有难点，技术方案不清晰，客户回答不确定；</p>
          <p>2、进口型号没有标准；</p>
          <p>3、感觉技术水平不够的可以选择寻求支援；</p>
        </div>
      </div>
      <div>
        <p class="text-base font-semibold pt-2 pb-2">帮助时长</p>
        <div class="text-gray-400 text-sm">
          <i class="iconfont icon-time mr-2"></i>
          <span>30分钟</span>
        </div>
      </div>
      <div>
        <p class="text-base font-semibold pt-2 pb-2">申请支援</p>
        <el-input v-model="data.supportTextarea" :rows="2" type="textarea" placeholder="请输入内容" />
      </div>
      <div class="float-right pt-4 pb-4">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="primary" @click="determine()">确定</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage } from 'element-plus'

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
      supportTextarea: ''
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
    // 确定支援
    const determine = () => {
      console.log('确定支援')
      if (data.supportTextarea != '') {
        ElMessage({
          message: '确定支援',
          type: 'success'
        })
        closeWindow('submit')
      } else {
        ElMessage.error('您有未填项')

        // closeWindow('submit')
      }
    }

    return {
      boxStyle,
      closeWindow,
      data,
      determine
    }
  }
})
</script>
<style lang="postcss" scoped></style>
