<template>
  <el-upload action="#" list-type="picture-card" :auto-upload="false">
    <div class="text-center text-sm font-semibold text-gray-300">
      <el-icon><Plus /> </el-icon>
      <div><span>上传图片</span></div>
    </div>
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
            <el-icon><Download /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, ElMessage, UploadProps, UploadUserFile } from 'element-plus'
export default defineComponent({
  components: {
    Download,
    Delete,
    Plus,
    ZoomIn
  },
  setup() {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    // 删除
    const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
      console.log('删除')
      // if (!uploadFile.raw) {
      //   data.ParentData.forEach((val: any, index: number) => {
      //     if (`${import.meta.env.VITE_UPLOADURL}` + val.Path == uploadFile.url) {
      //       data.ParentData.splice(index, 1)
      //     }
      //   })
      // }
    }

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
      console.log(dialogVisible.value)
    }

    const handleDownload = (file: UploadFile) => {
      console.log(file)
    }

    return {
      disabled,
      handleRemove,
      handlePictureCardPreview,
      handleDownload,
      dialogVisible
    }
  }
})
</script>

<style lang="postcss" scoped></style>
