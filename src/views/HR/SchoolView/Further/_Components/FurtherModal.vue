<!--
 * @Author: ZHJ
 * @Date: 2022-08-09 14:28:30
 * @LastEditTime: 2022-08-29 09:34:47
 * @LastEditors: ZHJ
 * @Description: 关停弹窗提示
 * @FilePath: \beifangrenzixitong\src\views\HR\SchoolView\Further\_Components\FurtherModal.vue
 * 版权声明
-->
<template>
  <div class="FurtherModal bf-fillet">
    <OpenWindow :boxStyle="boxStyle" :isShow="data.isShow" @closeWindow="closeWindow('close')" title="关停提醒">
      <div class="bf-window-padding">
        <div class="text-sm">您的账号已被关停请前往深造营地进行学习</div>
        <div class="bf-font-blue-color mt-2">关停信息</div>
        <div class="text-sm mt-1" v-for="item in data.list" :key="item">
          {{ item }}
        </div>
        <div class="FurtherModal_btn" @click="goFurther">前往深造营地</div>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { GetAlertReasonInfoByUser } from '/@/api/hr/School/Train'
// 表单事件
const formEvent = (data: any, closeWindow: any, context: any) => {
  const ruleFormRef = ref<FormInstance>()

  // 表单提交
  const submitForm = () => {
    context.emit('selectDetails', data.userDetailsList)
    closeWindow()
  }
  return {
    submitForm,
    ruleFormRef
  }
}
export default defineComponent({
  beforeRouteEnter(to, form, next) {
    next((vm) => {
      console.log(to)
    })
    // return false
  },
  components: {
    OpenWindow
  },
  emits: ['closeWindow', 'selectDetails'],
  props: {
    router: {
      type: Object,
      default: {}
    },
    // 请假Id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      isShow: true,
      Id: props.Id,
      list: []
    })
    //前往深造营地
    const goFurther = () => {
      props.router.push({
        path: '/HR/SchoolView/Further/Index',
        query: { Id: 8 }
      })
      data.isShow = false
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: 'h-72'
    })
    onMounted(() => {
      GetAlertReasonInfoByUser().then((res: any) => {
        if (res.code == 1) {
          data.list = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow, context),
      goFurther
    }
  }
})
</script>

<style lang="postcss" scoped>
.FurtherModal {
  position: relative;
  :deep(.w-500) {
    position: relative;
  }
  :deep(.p-0\.5) {
    padding: 0;
  }
  .FurtherModal_btn {
    cursor: pointer;
    width: 163px;
    height: 42px;
    line-height: 42px;
    border-radius: 3px;
    background-color: var(--el-color-primary);
    text-align: center;
    color: #fff;
    /* position: absolute; */
    bottom: 20px;
    margin: auto;
    right: 0;
    left: 0;
  }
}
</style>
