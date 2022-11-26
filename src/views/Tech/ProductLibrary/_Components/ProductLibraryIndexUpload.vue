<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="w-96 h-28 border-dashed border m-auto mt-4 bg-slate-50">
      <div class="inline-block p-4">
        <p class="text-sm font-semibold">上传产品封面</p>
        <p class="text-xs text-gray-400 mt-3">仅支持上传jpg/png格式文件</p>
        <p class="text-xs text-gray-400 mt-2">图片尺寸：600*600</p>
      </div>
      <div class="float-right">
        <el-upload action="#" list-type="picture-card" :auto-upload="false" :limit="1" :class="{ hide: data.hideUpload }">
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
      </div>
    </div>
    <div class="mr-6 float-right mt-2 mb-2">
      <div class="inline-block mr-3">
        <el-button @click="">取消</el-button>
      </div>
      <el-button type="primary" class="" @click="">确定</el-button>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, SetupContext, reactive, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow,
    Download,
    Delete,
    Plus,
    ZoomIn
  },
  emits: ['closeWindow'],
  props: {},
  setup(props, context: SetupContext) {
    const data = reactive({
      hideUpload: true
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

    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    const handleRemove = (file: UploadFile) => {
      console.log(file)
    }

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
      console.log(dialogVisible.value)
    }

    return {
      data,
      closeWindow,
      boxStyle,
      disabled,
      handleRemove,
      handlePictureCardPreview,
      dialogVisible
    }
  }
})
</script>

<style lang="postcss" scoped>
:deep(.el-upload) {
  width: 100px !important;
  height: 100px !important;
  margin-right: 10px;
  margin-top: 5px;
}
:deep(.el-upload-list__item is-ready) {
  width: 100px !important;
  height: 100px !important;
}
</style>
