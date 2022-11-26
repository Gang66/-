<template>
  <div>
    <div class="bf-window-padding">
      <slot name="title"></slot>
      <el-upload ref="uploadRef" action multiple :auto-upload="false" :disabled="data.isView" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :on-change="handleChange" :file-list="fileList">
        <el-icon>
          <el-icon-Plus />
        </el-icon>
      </el-upload>
      <div class="text-sm bf-error-color mt-3">说明：</div>
      <div class="text-sm">1：可以同时选择多张文件，点击“上传至服务器”批量上传；</div>
      <div class="text-sm">2：所有文件全部上传后可根据左右箭头调整文件位置；</div>
      <div class="text-sm">3：点击“确定”后上传的图片才生效</div>
      <div class="mt-4 text-right" v-if="!data.isView">
        <el-button size="large" @click="closeWindow()">取 消</el-button>
        <el-button type="primary" size="large" @click="submitUpload">确 定</el-button>
      </div>
    </div>
    <el-dialog v-model="dialogVisible" :append-to-body="true">
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { preview } from 'vue3-preview-image'
import OpenWindow from '/@/components/OpenWindow/index.vue'
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
      console.log('--------------', uploadFile)
      console.log('**************', data.ParentData)
      data.ParentData.forEach((val: any, index: number) => {
        if (`${import.meta.env.VITE_UPLOADURL}` + val.Path == uploadFile.url) {
          data.ParentData.splice(index, 1)
        }
      })
    }
  }

  //   监听选中
  const handleChange = (val: any, _list: any) => {
    console.log('_list', _list)
    fileList = _list
    console.log('fileList', fileList.length)
  }
  //确定数据
  const submitUpload = () => {
    var fileData = new FormData()
    uploadRef.value.submit
    if (fileList && fileList.length > 0) {
      fileList.forEach((element: any) => {
        fileData.append('files', element.raw)
      })
    } else {
      data.PathList = []
      if (data.ParentData && data.ParentData.length > 0) {
        data.PathList = data.ParentData.concat(data.PathList)
      }
      context.emit('uploadFileDataEvent', data.PathList)
      return
    }
    PostUploadFile({ type: 'HR', data: fileData }).then((res) => {
      let PathList = res.data.PathList
      data.PathList = []
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
      context.emit('uploadFileDataEvent', data.PathList)
    })
  }
  const closeWindow = () => {
    context.emit('closeWindow')
  }

  return {
    closeWindow,
    handlePictureCardPreview,
    handleRemove,
    handleChange,
    submitUpload,
    uploadRef
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  //   uploadFileData 返回上传数据
  emits: ['uploadFileDataEvent', 'closeWindow'],
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
      isView: props.isView, //是否是查看
      PathList: [], //返回给父类数据
      ParentData: props.uploadFileData ? props.uploadFileData : [] //父类带过来的数据
    })
    onMounted(() => {
      // 赋值
      if (props.uploadFileData && props.uploadFileData.length > 0) {
        props.uploadFileData.forEach((val: any) => {
          fileList.value.push({ url: remoteUrl(val.Path) })
        })
      }
    })
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-820',
      boxHeight: ''
    })

    return {
      ...uploadEvent(fileList, dialogImageUrl, dialogVisible, context, data),
      data,
      dialogImageUrl,
      fileList,
      dialogVisible,
      boxStyle
    }
  }
})
</script>

<style lang="scss" scoped></style>
