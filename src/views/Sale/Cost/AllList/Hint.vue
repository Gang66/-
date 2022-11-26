<template>
  <div>
    <CusDialog :box-style='CusDialogInfo.boxStyle' :title='CusDialogInfo.title' :is-show='true' @closeWindow='closeWindow'>
      <div class="text-sm">
        <el-card>
          <div class="flex items-center ml-2">
            <el-switch v-model="CusDialogInfo.HintInfo.IsSettle" class="mr-2"/>
            <div :class="CusDialogInfo.HintInfo.IsSettle ? 'text-blue-500' : ''">款已结清</div>
            <el-switch v-model="CusDialogInfo.HintInfo.IsBill" class="mr-2 mx-3"/>
            <div :class="CusDialogInfo.HintInfo.IsBill ? 'text-blue-500' : ''">单据已到</div>
          </div>
          <div v-if="prop.HintInfo.IsSettle || prop.HintInfo.IsBill">
            <div class="ml-2 leading-6 mt-2">确认时间：{{ prop.HintInfo.ConfirmDate }}</div>
            <div class="ml-2 leading-6">经办人员：{{ prop.HintInfo.ConfirmUserName }}</div>
          </div>
        </el-card>
        <div class="text-center pt-6" >
          <el-button class="cancelbut" @click="closeWindow">
            取消
          </el-button>
          <el-button type="primary" @click="submitForm()">
            确认
          </el-button>
        </div>
      </div>
    </CusDialog>
  </div>
</template>

<script lang="ts" setup>
import { PostConfirmCostEntertainment, PostConfirmCostGift, PostConfirmCostOther, PostConfirmCostIntermediator } from '/@/api/Sale/Cost'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { ElMessage } from 'element-plus'
import { onMounted, reactive } from 'vue'
// 确认提交后事件
const emit = defineEmits(['setInfo','closeWindow'])
const prop = defineProps({
  HintInfo: {
    type: Object,
    default: {}
  },
  HintType: {
    type: Number,
    default: 0
  }
})
const CusDialogInfo = reactive({
  boxStyle: {
    boxWidth: 'w-300',
    boxHeight: '',
    boxPaddingTop: 'pt-12'
  },
  HintInfo: {},
  title: '提示',
  disabled: false,
  kyjq: false,
  djyd: false,
})

const submitForm = () => {
  if (prop.HintType == 0) {
    PostConfirmCostEntertainment(CusDialogInfo.HintInfo).then(res => {
      if(res.code == 1) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
      closeWindow()
      emit('setInfo')
    })
  } else if (prop.HintType == 1) {
    PostConfirmCostGift(CusDialogInfo.HintInfo).then(res => {
      if(res.code == 1) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
      closeWindow()
      emit('setInfo')
    })
  } else if (prop.HintType == 2) {
    PostConfirmCostOther(CusDialogInfo.HintInfo).then(res => {
      if(res.code == 1) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
      closeWindow()
      emit('setInfo')
    })
  } else {
    PostConfirmCostIntermediator(CusDialogInfo.HintInfo).then(res => {
      if(res.code == 1) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
      } else {
        ElMessage({
          message: res.message,
          type: 'error'
        })
      }
      closeWindow()
      emit('setInfo')
    })
  }
}

const closeWindow = () => {
  emit('closeWindow')
}

onMounted(()=>{
  CusDialogInfo.HintInfo = JSON.parse(JSON.stringify(prop.HintInfo))
})

</script>
