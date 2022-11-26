<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="UploadIndex">
    <div class="bf-window-padding">
      <slot name="title"></slot>
      <ul>
        <li v-for="(item,index) in data.ParentData" :key="'img'+index">
          <div class="img-box">
            <img :src="remoteUrlEvent(item.Path)" />
          </div>
          <div class="but">
            <div class="but-box">
              <span @click="handleMove(index,-1)" title="前移">
                <el-icon>
                  <el-icon-back />
                </el-icon>
              </span>
              <span @click="handlePictureCardPreview(item,1)" style="margin: 0 10px;" title="查看图片">
                <el-icon>
                  <el-icon-zoom-in />
                </el-icon>
              </span>
              <span @click="handleRemove(item)" class="btn-del" title="删除">
                <el-icon>
                  <el-icon-circle-close />
                </el-icon>
              </span>
              <span @click="handleMove(index,1)" title="后移">
                <el-icon>
                  <el-icon-right />
                </el-icon>
              </span>
            </div>
          </div>
        </li>
        <template v-if="data.dialogIsUpload">
          <li class="img-change" v-for="(item,index) in fileList" :key="'ch'+index">
            <div class="img-box">
              <img :src="item.url" />
            </div>
            <div class="but">
              <div class="but-box">
                <span @click="handlePictureCardPreview(item)" style="margin: 0 10px;" title="查看图片">
                  <el-icon>
                    <el-icon-zoom-in />
                  </el-icon>
                </span>
                <span @click="handleRemove(item)" class="btn-del" title="删除">
                  <el-icon>
                    <el-icon-circle-close />
                  </el-icon>
                </span>
              </div>
            </div>
          </li>
        </template>
        <li>
          <el-upload ref="uploadRef" action multiple :auto-upload="false" :disabled="data.isView" list-type="picture-card" :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove" :on-change="handleChange">
            <template #file>
            </template>
            <el-icon>
              <el-icon-Plus />
            </el-icon>
          </el-upload>
        </li>
        <li v-show="data.isSubmit">
          <el-button @click="submitUpload" type="primary" style="height: 148px;width:148px;">
            <el-icon>
              <el-icon-upload />
            </el-icon>
            <span style=" font-size: 14px;">上传</span>
          </el-button>
        </li>
      </ul>
      <div class="text-sm bf-error-color mt-3">说明：</div>
      <div class="text-sm">1：可以同时选择多张图片，点击“上传至服务器”批量上传；</div>
      <div class="text-sm">2：所有文件全部上传后可根据左右箭头调整文件位置；</div>
      <div class="text-sm">3：点击“确定”后上传的图片才生效</div>
      <div class="mt-4 text-right" v-if="!data.isView">
        <el-button size="large" @click="closeWindow('close')">取 消</el-button>
        <el-button type="primary" size="large" @click="submitClose" :disabled="fileList.length == 0&&data.ParentData.length==0">确 定</el-button>
      </div>
    </div>
    <el-dialog v-model="dialogVisible">
      <img class="w-full" :src="dialogImageUrl" alt="Preview Image" />
    </el-dialog>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, UploadProps, UploadUserFile } from 'element-plus'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, SetupContext } from 'vue'
import { PostUploadFile } from '/@/api/upload/upload'
import { remoteUrl } from '/@/utils/tools'
const uploadRef = ref()
// 上传事件
const uploadEvent = (fileList: any, dialogImageUrl: any, dialogVisible: any, context: any, data: any, _this: any) => {
  // 图片展示
  const handlePictureCardPreview = (uploadFile: any, type: any) => {
    if (type == 1) {
      dialogImageUrl.value = remoteUrlEvent(uploadFile.Path)
    } else {
      dialogImageUrl.value = uploadFile.url
    }
    dialogVisible.value = true
  }
  // 删除
  const handleRemove: UploadProps['onRemove'] = (uploadFile: any, uploadFiles) => {
    if (!uploadFile.raw) {
      data.ParentData.forEach((val: any, index: number) => {
        if (val.Path == uploadFile.Path) {
          data.ParentData.splice(index, 1)
        }
      })
    } else {
      fileList.value.forEach((val: any, index: number) => {
        if (val.url == uploadFile.url) {
          fileList.value.splice(index, 1)
        }
      })
    }
  }
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  //   监听选中
  const handleChange = (val: any, _list: any) => {
    data.isSubmit = true
    data.dialogIsUpload = true
    fileList.value.push(val)
  }
  const submitClose = () => {
    if ((fileList.value.length > 0 && data.PathList.length == 0) || (data.ParentData && data.ParentData.length > 0 && fileList.value.length > 0)) {
      ElMessage.error('还有未上传文件')
      return
    }
    context.emit('uploadFileData', data.ParentData)
    closeWindow('close')
    // if (fileList.value.length > 0 && data.PathList.length > 0) {
    //   if (data.ParentData && data.ParentData.length > 0) {
    //     data.PathList = data.ParentData.concat(data.PathList)
    //   }

    // } else if (data.ParentData && data.ParentData.length > 0 && fileList.value.length == 0) {
    //   context.emit('uploadFileData', data.ParentData)
    //   closeWindow('close')
    // } else {
    // }
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
      PostUploadFile({ type: 'HR', data: fileData }).then((res) => {
        if (res.code == 1 && res.data) {
          data.PathList = []
          let PathList = res.data.PathList
          PathList.forEach((val: any, index: number) => {
            if (val.State) {
              data.PathList.push(val)
            }
          })
          if (data.ParentData && data.ParentData.length > 0) {
            data.PathList = data.ParentData.concat(data.PathList)
          }
          data.ParentData = data.PathList
          data.isSubmit = false
          data.dialogIsUpload = false
          fileList.value = []
          _this.$forceUpdate()
          ElMessage({
            message: res.message,
            type: 'success'
          })
        }
      })
    } else {
      data.PathList = []
    }
  }
  // 监听页面关闭
  const closeWindow = (type: string) => {
    context.emit('closeWindow', type)
  }
  //移动图片
  const handleMove = (index: any, num: any) => {
    let len = data.ParentData.length
    if (index + num >= 0 && index + num < len && index < len && index >= 0) {
      let oldImg = data.ParentData[index + num]
      let newImg = data.ParentData[index]
      data.ParentData[index + num] = newImg
      data.ParentData[index] = oldImg
      // let PoldImg = data.ParentData[index + num]
      // let PnewImg = data.ParentData[index]
      // data.ParentData[index + num] = newImg
      // data.ParentData[index] = oldImg
      console.log(data.ParentData)
      // this.$forceUpdate();
    } else {
      ElMessage.warning('无法移动')
    }
  }
  return {
    handlePictureCardPreview,
    handleRemove,
    handleChange,
    submitUpload,
    uploadRef,
    closeWindow,
    handleMove,
    remoteUrlEvent,
    submitClose
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
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
    const { ctx: _this }: any = getCurrentInstance()
    let fileList: any = ref([])
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const data = reactive({
      isSubmit: false,
      dialogIsUpload: true,
      display: props.isView ? 'none' : 'flex',
      isView: props.isView, //是否是查看
      PathList: [], //返回给父类数据
      ParentData: props.uploadFileData ? props.uploadFileData : [] //父类带过来的数据
    })
    onMounted(() => {
      console.log(data.ParentData)
      // 赋值
      // if (props.uploadFileData && props.uploadFileData.length > 0) {
      //   console.log(props.uploadFileData)
      //   props.uploadFileData.forEach((val: any) => {
      //     fileList.value.push({ url: remoteUrl(val.Path) })
      //   })
      // }
    })
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-830',
      boxHeight: ''
    })

    return {
      ...uploadEvent(fileList, dialogImageUrl, dialogVisible, context, data, _this),
      data,
      dialogImageUrl,
      fileList,
      dialogVisible,
      boxStyle
    }
  }
})
</script>

<style lang="postcss" scoped>
.UploadIndex {
  :deep(.el-upload--picture-card) {
    display: v-bind(data.display);
  }
  :deep(.el-upload-list--picture-card .el-upload-list__item) {
    overflow: hidden;
    background-color: var(--el-fill-color-blank);
    border: 1px solid var(--el-border-color);
    border-radius: 6px;
    box-sizing: border-box;
    width: var(--el-upload-list-picture-card-size);
    height: var(--el-upload-list-picture-card-size);
    margin: 0 8px 8px 0;
    padding: 0;
    display: none;
  }
  ul {
    overflow: hidden;

    li {
      width: 148px;
      height: 148px;
      overflow: hidden;
      float: left;
      position: relative;
      margin: 0 10px 10px 0px;
      .img-box {
        overflow: hidden;
      }

      img {
        width: 148px;
        height: 148px;
        border: 1px solid #d9d9d9;
        border-radius: 6px;
        object-fit: contain;
      }

      .but {
        visibility: hidden;
        position: absolute;
        top: 0px;
        right: 0px;
        bottom: 0px;
        left: 0px;
        border-radius: 6px;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;

        .but-box {
          width: 100%;
          align-self: center;
          text-align: center;
          font-size: 24px;
          color: #fff;
          cursor: pointer;

          span {
            display: inline-block;
          }
          .btn-del {
            position: absolute;
            top: -1px;
            right: 1px;
          }
        }
      }
    }

    li:hover {
      .but {
        visibility: visible;
      }
    }

    li.img-change {
      img {
        border: 1px dashed red;
      }
    }
  }
}
</style>
