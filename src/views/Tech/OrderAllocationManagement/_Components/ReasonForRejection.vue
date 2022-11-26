<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="text-sm p-8">
      <div class="mb-3" v-for="(item, index) in data.rejectionImNewsList" :key="index">
        <p>
          <span>审核人：</span> <span>{{ item.RealName }} ({{ item.CreateOn }} )</span>
        </p>
        <p>
          <span>审核结论：</span> <span>{{ item.NewsInfo }} </span>
        </p>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, SetupContext, reactive, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0, //询价单Id
        BomId: 0, //报价单Id
        ClientName: '',
        RejectionImNewsList: [] //拒单记录
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      rejectionImNewsList: [
        {
          RealName: '',
          CreateOn: '',
          NewsInfo: ''
        }
      ]
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-400',
      boxHeight: ''
    })

    onMounted(() => {
      data.rejectionImNewsList = props.FormData.RejectionImNewsList
    })

    return {
      closeWindow,
      boxStyle,
      data
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
