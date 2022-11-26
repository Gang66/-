<template>
  <OpenWindow :boxStyle="boxStyle" title="查看文件" :isShow="true" @closeWindow="closeWindow('close')" class="edit-sales-contract-open-window">
    <div>
      <iframe 
        height="600px" scrolling="no" frameborder="0"
        width="100%"
        v-bind:src="'http://192.168.0.80/op/view.aspx?src=http://code.zgbffm.com:2280' + data.file_url"></iframe>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted, computed } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
export default defineComponent({
  emits: ['closeWindow'],
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {
        file_url: ''
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      file_url: ''
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })

    onMounted(() => {
      data.file_url = props.FormData.file_url
    })

    return {
      boxStyle,
      data,
      closeWindow,
    }
  }
})
</script>