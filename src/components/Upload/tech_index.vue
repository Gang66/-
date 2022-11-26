<template>
  <div class="bf-window-padding">
    <el-upload ref="uploadRef" action multiple :auto-upload="false" :disabled="data.isView" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="handleChange" :file-list="fileList">
      <el-icon>
        <el-icon-Plus />
      </el-icon>
    </el-upload>
    <div class="text-right" v-if="!data.isView">
      <el-button type="primary" @click="submitUpload" :disabled="fileList.length == 0">上 传</el-button>
    </div>
  </div>
  <el-dialog v-model="dialogVisible">
    <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts">
import { ElMessage, UploadProps, UploadUserFile } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { PostUploadFile } from '/@/api/upload/upload'
import { remoteUrl } from '/@/utils/tools'
const uploadRef = ref()
// 上传事件
const uploadEvent = (fileList: any, dialogImageUrl: any, dialogVisible: any, context: any, data: any) => {
  // 图片展示
  const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
    dialogImageUrl.value = uploadFile.url
    dialogVisible.value = true
  }
  // 删除
  const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    if (!uploadFile.raw) {
      data.ParentData.forEach((val: any, index: number) => {
        if (`${import.meta.env.VITE_UPLOADURL}` + val.Path == uploadFile.url) {
          data.ParentData.splice(index, 1)
        }
      })
    }
  }
  //   监听选中
  const handleChange = (val: any, _list: any) => {
    fileList.value = _list
  }

  //确定数据
  const submitUpload = () => {
    var fileData = new FormData()
    uploadRef.value.submit
    if (fileList.value && fileList.value.length > 0) {
      fileList.value.forEach((element: any) => {
        if (element.raw) {
          fileData.append('files', element.raw)
        }
      })
    } else {
      data.PathList = []
      return
    }
    PostUploadFile({ type: 'HR', data: fileData }).then((res) => {
      if (res.code == 1 && res.data) {
        data.PathList = []
        let PathList = res.data.PathList
        PathList.forEach((val: any, index: number) => {
          if (val.State) {
            data.PathList.push(val)
          }
        })
        ElMessage({
          message: res.message,
          type: 'success'
        })
        if (data.ParentData && data.ParentData.length > 0) {
          data.PathList = data.ParentData.concat(data.PathList)
        }
        context.emit('uploadFileData', data.PathList)
      }
    })
  }
  return {
    handlePictureCardPreview,
    handleRemove,
    handleChange,
    submitUpload,
    uploadRef
  }
}
export default defineComponent({
  //   uploadFileData 返回上传数据
  emits: ['uploadFileData'],
  props: {
    // 传递过来展示的数据
    uploadFileData: {
      type: Array,
      default: []
    },
    // 是否查看
    isView: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {
    let fileList: any = ref([])
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const data = reactive({
      display: props.isView ? 'none' : 'flex',
      isView: props.isView, //是否是查看
      PathList: [], //返回给父类数据
      ParentData: props.uploadFileData ? props.uploadFileData : [] //父类带过来的数据
    })
    onMounted(() => {
      // 赋值
      if (props.uploadFileData && props.uploadFileData.length > 0) {
        console.log(props.uploadFileData)
        props.uploadFileData.forEach((val: any) => {
          fileList.value.push({ url: remoteUrl(val.Path) })
        })
      }
    })

    return {
      ...uploadEvent(fileList, dialogImageUrl, dialogVisible, context, data),
      data,
      dialogImageUrl,
      fileList,
      dialogVisible
    }
  }
})
</script>

<style lang="postcss" scoped>
.UploadIndex {
  :deep(.el-upload--picture-card) {
    display: v-bind(data.display);
  }
}
</style>
