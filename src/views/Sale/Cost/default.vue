<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addquotation text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
            </el-card>
          </el-form>
        </div>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  DataId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  form: {}
})
</script>
<style lang="postcss" scoped>
</style>
