<template>
  <div class="flex justify-between">
    <slot name="leftContent">
      <div>
      </div>
    </slot>
    <div class="flex">
      <slot name="rightContent"></slot>
      <el-upload ref="uploadRef" v-if="!isdisabled" :show-file-list='false' :on-change="handleChange" :file-list="checkfileList" :auto-upload="false">
        <template #trigger>
          <el-button type="primary">
            <el-icon>
              <el-icon-Plus />
            </el-icon>新增
          </el-button>
        </template>
        <el-button class="ml-3 -mt-2" type="success" :disabled="checkfileList.length == 0" @click="submitUpload">
          <el-icon>
            <el-icon-Upload />
          </el-icon>上传
        </el-button>

      </el-upload>
    </div>
  </div>
  <div class="pt-2">
    <el-table border :data='list'
      :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
      :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
      <el-table-column type="index" width="60" label='序号' />
      <el-table-column prop='name' label='文件名'>
        <template #default="scope">{{ scope.row.name}}</template>
      </el-table-column>
      <el-table-column prop='size' label='大小'>
        <template #default="scope">{{ changeByte(scope.row.size)}}</template>
      </el-table-column>
      <el-table-column prop='status' label='状态'>
        <template #default="scope">
          <span :style="scope.row.status=='success'?'color:#07C160;':''">{{ retstatus(scope.row.status)}}</span>
        </template>
      </el-table-column>
      <el-table-column prop='address' label='操作'>
        <template #default="scope">
          <span v-if="scope.row.status=='success'" class="text-blue-400 cursor-pointer pr-2" @click="viewfile(scope.row)">下载</span>
          <span v-if="!isdisabled" class="text-blue-400 cursor-pointer " style="color:#DB0C0C;" @click="delfile(scope.row.uid)">删除</span>
        </template>
      </el-table-column>
      <slot name='defaultBtn'>
      </slot>
    </el-table>
  </div>

</template>
<script lang="ts" setup>
import { ref, onMounted, computed, watch } from 'vue'
import type { UploadInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { PostUploadFile } from '/@/api/upload/upload'
import { remoteUrl, changeByte } from '/@/utils/tools'

const props = defineProps({
  isdisabled: {
    type: Boolean,
    default: false
  },
  uploadFileList: {
    type: Array,
    default: []
  }
})
const emit = defineEmits(['uploadFileData'])
var num = ref(0)
//返回文件路径
const uploadFileData = () => {
  console.log('asdasdasdsadsadsa', fileList.value)
  emit('uploadFileData', fileList.value)
}

const checkfileList = ref<any[]>([])
const fileList = ref<any[]>(props.uploadFileList ? props.uploadFileList : [])
//   监听选中
const handleChange = (val: any, _list: any) => {
  checkfileList.value = []
  _list.forEach((item: any) => {
    /*     if (item.size > 1024 * 1024 * 30) {
      ElMessage.warning('所选文件不能超过30MB')
    } else {
      checkfileList.value.push(item)
    } */
    checkfileList.value.push(item)
  })
  console.log(' fileList.value', checkfileList.value)
}
//返回状态
const retstatus = (val: String) => {
  switch (val) {
    case 'success':
      return '上传成功'
      break
    case 'ready':
      return '未上传'
      break
    case 'error':
      return '上传失败'
      break
  }
}

//删除文件
const delfile = (val: any) => {
  var cindex = checkfileList.value.findIndex((c) => c.uid == val)
  var index = fileList.value.findIndex((f) => f.uid == val)
  if (cindex > -1) {
    checkfileList.value.splice(cindex, 1)
  }
  if (index > -1) {
    fileList.value.splice(index, 1)
    uploadFileData()
  }
}
//查看文件
const viewfile = (val: any) => {
  var a = document.createElement('a') //生成一个a元素
  var event = new MouseEvent('click') //创建一个单击事件
  a.download = val.name || 'pic' //设置图片名称
  a.target = '_blank'
  // 设置图片地址
  a.href = remoteUrl(remoteUrl(val.url))
  a.dispatchEvent(event) //触发a的单击事件
}

const uploadRef = ref<UploadInstance>()

//提交
const submitUpload = () => {
  var fileData = new FormData()
  uploadRef.value!.submit
  if (checkfileList.value && checkfileList.value.length > 0) {
    checkfileList.value.forEach((element: any) => {
      console.log(element)
      fileData.append('files', element.raw)
    })
  } else {
    return
  }
  PostUploadFile({ type: 'HrSale', data: fileData }).then((res) => {
    let resPathList = res.data.PathList
    checkfileList.value = []
    //fileList.value = res.data
    resPathList.forEach((val: any, index: number) => {
      if (val.State) {
        let item: any = {}
        item.uid = val.FileId
        item.name = val.FileName
        item.size = val.Size
        item.url = val.Path
        item.status = 'success'
        fileList.value.push(item)
      }
    })

    console.log('success', fileList.value)
    // fileList.value.forEach
    ElMessage.success(res.message)
    if (fileList.value && fileList.value.length > 0) {
      uploadFileData()
    }
  })

  //context.emit('uploadFileData', PathList.value)
}
watch(
  () => props.uploadFileList,
  () => {
    if (props.uploadFileList && props.uploadFileList.length > 0) {
      console.log('props.uploadFileList+++++', props.uploadFileList)
      if (num.value == 0) {
        props.uploadFileList.forEach((val: any) => {
          if (fileList.value.findIndex((f) => f == val) == -1) {
            fileList.value.push(val)
          }
        })
        num.value++
      }
    }
  }
)
onMounted(() => {
  // 赋值
  /* if (props.uploadFileList && props.uploadFileList.length > 0) {
    props.uploadFileList.forEach((val: any) => {
      fileList.value.push(val)
    })
  } */
})
//列表数据
const list = computed(() => {
  return fileList.value.concat(checkfileList.value)
})
</script>
