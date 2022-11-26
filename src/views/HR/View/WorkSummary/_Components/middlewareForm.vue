<!--
 * @Author: ZHJ
 * @Date: 2022-08-01 14:22:05
 * @LastEditTime: 2022-11-23 10:36:48
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\WorkSummary\_Components\middlewareForm.vue
 * 版权声明
-->
<template>
  <div>
    <!-- 正式员工工作总结 -->
    <WorkSummaryForm v-if="data.WorkSummaryFormWindow.show" @closeWindow="closeWindow" :details="data.details"></WorkSummaryForm>
    <!-- 新人工作总结 -->
    <NewWorkSummaryForm v-if="data.NewWorkSummaryFormWindow.show" @closeWindow="closeWindow" :details="data.details"></NewWorkSummaryForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, SetupContext } from 'vue'
import WorkSummaryForm from './WorkSummaryForm.vue'
import NewWorkSummaryForm from './NewWorkSummaryForm.vue'
import { GetWorkType } from '/@/api/hr/WorkSummary'
import { ElMessage } from 'element-plus'
export default defineComponent({
  props: {
    details: { type: Object, default: {} },
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  components: {
    WorkSummaryForm,
    NewWorkSummaryForm
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    const data = reactive({
      details: {}, //详情
      // 正式工作总结弹窗数据
      WorkSummaryFormWindow: {
        show: false,
        Id: 0
      },
      // 新人工作总结弹窗数据
      NewWorkSummaryFormWindow: {
        show: false,
        Id: 0
      }
    })
    // 关闭弹窗
    const closeWindow = (type: string) => {
      data.WorkSummaryFormWindow.show = false
      data.NewWorkSummaryFormWindow.show = false
      context.emit('closeWindow', type)
    }
    onMounted(() => {
      // WorkPeriod 1新人训 2试用期 3正式期 WorkType 1日总结 2周总结 3月总结 4出差总结
      GetWorkType().then((res: any) => {
        if (res.code == 1) {
          data.details = Object.assign(res.data, props.details)
          // if (props.isHeader == false) {
          //   res.data.WorkPeriod = 1
          // }
          switch (res.data.WorkPeriod) {
            case 1:
              data.NewWorkSummaryFormWindow.show = true
              break
            case 2:
              data.WorkSummaryFormWindow.show = true
              break
            case 3:
              data.WorkSummaryFormWindow.show = true
              break
          }
        } else {
          ElMessage.error('获取总结状态失败,请联系开发人员')
        }
      })
    })
    return { data, closeWindow }
  }
})
</script>

<style lang="scss" scoped>
</style>
