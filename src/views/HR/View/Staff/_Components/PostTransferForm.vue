<!--
 * @Author: ZHJ
 * @Date: 2022-08-13 11:03:06
 * @LastEditTime: 2022-08-13 11:42:25
 * @LastEditors: ZHJ
 * @Description: 岗位调岗记录
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Staff\_Components\PostTransferForm.vue
 * 版权声明
-->
<template>
  <div class="PostTransferForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" class="formalForm" title="岗位调岗记录" @closeWindow="closeWindow('close')">
      <div class="bf-window-padding">
        <el-timeline>
          <el-timeline-item v-for="(item, index) in data.ruleForm" :key="index" type="primary" :hollow="true">
            <div class="flex item-center justify-between">
              <div class="flex">
                <div>{{ item.BeCompName }}</div>
                <div class="ml-4">
                  {{ item.BeDeptName }}
                </div>
                <div class="ml-4">
                  {{ item.BePostName }}
                </div>
                <div class="ml-4">{{ item.BeMoney }}</div>
              </div>
              <div class="text-sm bf-text-color-secondary">
                {{ parseTimeEvent(item.CreateOn) }}
              </div>
            </div>
          </el-timeline-item>
        </el-timeline>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import { GetAdjustSalaryReportInfo, GetBeforePostTransfer } from '/@/api/hr/Staff'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetBeforePostTransfer(data.Id)
      .then((res: any) => {
        if (res.code == 1) {
          data.ruleForm = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
      .catch((e) => {
        ElMessage.error(e.message)
      })
  }
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  //时间转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  return {
    ruleFormRef,
    parseTimeEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    info: {
      type: Object,
      default: { Id: 0 }
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {},
      gender: [], //性别数据
      tableData: [],
      Id: props.info.Id
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: '',
      boxPaddingTop: 'pt-10'
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow) }
  }
})
</script>

<style lang="postcss" scoped>
.PostTransferForm {
  :deep(.el-timeline-item__wrapper) {
    position: relative;
    padding-left: 28px;
    top: -4px;
  }
}
</style>

