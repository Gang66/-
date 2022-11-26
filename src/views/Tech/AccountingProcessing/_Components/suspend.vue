<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-6 pl-10">
      <div class="mb-4"><el-alert title=" 审核通过前，仍作为正常报价单进行计时。" type="warning" show-icon /></div>
      <div>
        <span class="text-sm text-gray-400 mr-3">申请暂停</span>
        <el-input disabled placeholder="经同意后，直至恢复处理" style="width: 360px" />
      </div>
      <div class="mt-4">
        <span class="text-sm text-gray-400 float-left mr-3">申请理由</span>
        <el-input v-model="data.ReasonTextarea" maxlength="30" placeholder="请输入内容" show-word-limit type="textarea" style="width: 360px" />
      </div>
      <div class="float-right mt-4 mb-4 mr-2">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="primary" @click="applyForPostponesClick()">申请</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage } from 'element-plus'
import { GetApplyForProvisional } from '/@/api/tech/EnquiryData'

// 申请暂停
const ApplyForProvisionals = async (data: any) => {
  await GetApplyForProvisional(data.Id)
    .then((res) => {
      if (res.code === 1) {
        ElMessage.success(res.message)
        data.closeWindow('submit')
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetApplyForProvisional${e}`)
    })
}

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0 //询价单Id
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      ReasonTextarea: '',
      Id: 0 //询价单Id
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
    // 申请
    const applyForPostponesClick = () => {
      if (data.ReasonTextarea == '') {
        ElMessage.error('请填写申请理由')
        return
      }
      ApplyForProvisionals({ data, closeWindow })
    }
    onMounted(() => {
      data.Id = props.FormData.entityById
    })

    return {
      boxStyle,
      closeWindow,
      data,
      applyForPostponesClick
    }
  }
})
</script>
<style lang="postcss" scoped></style>
