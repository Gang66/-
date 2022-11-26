<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-2">
      <div class="pt-2 pb-2">
        <div class="flex items-center mb-2">
          <div class="font-bold text-base">模板名称：</div>
          <div>
            <el-input v-model="contract_emplate.client_title" placeholder="请输入客户模板名称" />
          </div>
        </div>
        <div class="font-bold text-base mb-1">模板内容：</div>
        <Editor v-model="contract_emplate.client_content" api-key='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc' :init="{language: 'zh_CN',height: 450}"></Editor>
      </div>
      <div>
        <div class="bf-search-formItem mt-4 mb-4 float-right">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button>取 消</el-button>
              <el-button type="primary" @click="submitClient()">确 定</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import { isMobileTel, isNumber } from '/@/utils/validate'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import Editor from '@tinymce/tinymce-vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow,
    Editor
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
    })
    const contract_emplate = reactive({
      client_title: '',
      client_content: ''
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-800',
      boxHeight: ''
    })

    // 提交
    const submitClient = () => {
      if (!contract_emplate.client_title) {
        ElMessage.warning('模板名称不得为空')
        return false
      }
      if (!contract_emplate.client_content) {
        ElMessage.warning('模板模板内容不得为空')
        return false
      }
      console.log(contract_emplate.client_title, contract_emplate.client_content)
    }

    return {
      boxStyle,
      closeWindow,
      submitClient,
      contract_emplate,
      data,
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-input-group__prepend) {
  padding: 0 10px;
}
:deep(.el-form--inline .el-form-item){
  margin-right: 0;
}
</style>
