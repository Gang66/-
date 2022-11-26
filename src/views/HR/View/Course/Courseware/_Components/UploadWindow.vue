<template>
  <div>
    <OpenWindow title="课件下载" :isShow="true" :boxStyle="data.boxStyle" @closeWindow="closeuploadnWindow">
      <div class="p-4">
        <uploads :isdisabled="true" @uploadFileData="uploadFileData($event)" :uploadFileList="uploadData.FilePathList" />
        <div class="flex justify-center mt-4">
          <el-button size="large" @click="closeuploadnWindow">关闭</el-button>
          <!-- <el-button size="large" type="primary" @click="submit">提交</el-button> -->
          <!-- {{ uploadData.FilePathList }} -->
        </div>
      </div>
    </OpenWindow>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import uploads from '/@/components/Upload/uploadfile.vue'
import { PostHRPlanCourseUpload } from '/@/api/hr/Course'
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    uploads,
    OpenWindow
  },
  emits: ['closeuploadnWindow', 'successUpload'],
  props: {
    uploadData: {
      type: Object,
      default: {
        Id: null as any,
        FilePathList: null as any
      }
    }
  },
  setup(prop, context) {
    const data = reactive({
      boxStyle: {
        boxWidth: 'w-600',
        boxHeight: ''
      },
      fileList: null as any,
      FilePathList: null as any
    })

    const uploadFileData = (fileList: any) => {
      // console.log(fileList)
      data.fileList = fileList
    }

    const closeuploadnWindow = () => {
      context.emit('closeuploadnWindow')
    }
    // const submit = async () => {
    //   if (data.fileList.length <= 0) return
    //   const arr: any = []
    //   data.fileList.map((item: any) => {
    //     arr.push({
    //       FileName: item.name,
    //       State: item.status === 'success' ? true : false,
    //       Size: item.size,
    //       Path: item.url,
    //       FileId: item.uid
    //     })
    //   })
    //   await PostHRPlanCourseUpload({ Id: prop.uploadData.Id, FilePath: arr })
    //   context.emit('successUpload')
    //   ElMessage({
    //     message: '提交课件成功',
    //     type: 'success'
    //   })
    //   closeuploadnWindow()
    // }

    return {
      data,
      closeuploadnWindow,
      // submit,
      uploadFileData
    }
  }
})
</script>
<style lang="postcss" scoped></style>
