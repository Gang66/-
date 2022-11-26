<template>
  <div>
    <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
  </div>
</template>
<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { reactive, ref, defineComponent, SetupContext } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

export default defineComponent({
  components: {
    WFManagementForm
  },
  emits: ['closeWindow'],
  props: {
    // 审批列表详情
    WFManagementFormWindow: {
      type: Object,
      default: {
        show: false,
        details: {}
      }
    }
  },
  setup(props, context: SetupContext) {
    const wfcloseWindow = () => {
      context.emit('closeWindow')
    }
  }
})
</script>
<style lang="postcss" scoped>
</style>
