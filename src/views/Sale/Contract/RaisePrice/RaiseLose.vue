<template>
  <div>
    <CusDialog v-if="dataInfo.show" :box-style="dataInfo.boxStyle" title="标记失单" :is-show="true" @closeWindow="closeWindow">
      <div class="px-10">
        <div class="text-sm mb-1">请填写原因</div>
        <div>
          <el-input v-model="dataInfo.text" size="large" placeholder="请输入原因" />
        </div>
      </div>
      <div class="text-center pt-6 pb-2">
        <el-button class="cancelbut" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="checkcontractentity">
          确定
        </el-button>
      </div>
    </CusDialog>
  </div>
</template>

<script lang="ts" setup>
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'

const dataInfo = reactive({
  show: false,
  boxStyle: {
    boxWidth: 'w-900',
    boxHeight: '',
    boxPaddingTop: 'pt-12'
  },
  text: ''
})

const closeWindow = () => {
  dataInfo.show = false
}
const openWindow = (data) => {
  console.log(data)
  dataInfo.show = true
}
const checkcontractentity = () => {
  if (!dataInfo.text) {
    ElMessage({
      message: '请填写原因',
      type: 'warning'
    })
    return false
  }

  ElMessage({
    message: '成功',
    type: 'success'
  })
  closeWindow()
  console.log(dataInfo.text)
}

defineExpose({
  openWindow
})
</script>

<style lang="postcss" scoped>
:deep(.el-dialog__header) {
  margin: 0;
  padding: 0;
}
:deep(.el-dialog) {
  border-radius: 10px;
  overflow: hidden;
}
:deep(.el-dialog__body) {
  background: linear-gradient(180deg, #e6f6ff 0%, #fefeff 100%);
  padding: 0;
}
.form-bottom {
  background-image: var(--7ba5bd90-salerDialogStyle_diaogBottom);
}
:deep(.salerDialog .el-card .el-card__body) {
  padding: 0 0.5em;
}
</style>