<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-6 pl-10">
      <div class="mb-4"><el-alert title=" 审核通过前，仍作为正常报价单进行计时。" type="warning" show-icon /></div>
      <div>
        <span class="text-sm text-gray-400 mr-3">申请延时</span>
        <el-input disabled :placeholder="data.placeholder" style="width: 360px" />
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
import { GetApplyForPostpone } from '/@/api/tech/EnquiryData'
import { ElMessage } from 'element-plus'

// 申请延期
const PostApplyForPostpones = async (data: any) => {
  await GetApplyForPostpone(data.data.Id)
    .then((res) => {
      console.log(res)
      if (res.code === 1) {
        ElMessage.success(res.message)
        data.closeWindow('submit')
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetApplyForPostpone${e}`)
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
        Id: 0, //询价单Id
        GradeCode: ''
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      ReasonTextarea: '',
      Id: 0, //询价单Id
      placeholder: ''
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
      PostApplyForPostpones({ data, closeWindow })
    }
    onMounted(() => {
      data.Id = props.FormData.entityById
      let GradeCode = props.FormData.GradeCode
      if (GradeCode == 'A') {
        data.placeholder = props.FormData.GradeCode + '级延时2小时'
      } else if (GradeCode == 'B') {
        data.placeholder = props.FormData.GradeCode + '级延时3小时'
      } else {
        data.placeholder = props.FormData.GradeCode + '级延时4小时'
      }
      console.log(props.FormData.entityById)
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
