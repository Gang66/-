<template>
  <div class="ContractDetails">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="人事去向">
      <div class="bf-window-padding">
        <el-table :data="data.tableData" style="width: 100%">
          <el-table-column prop="date" label="成交时间" />
          <el-table-column prop="name" label="单位" width="300" />
          <el-table-column prop="address" label="金额（万）" width="180" />
        </el-table>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, SetupContext } from 'vue'
import { ElMessage } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetWorkCourseFinishedEntity } from '/@/api/hr/CourseDevelop'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkCourseFinishedEntity(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        ApplicationType: '1'
      },
      tableData: [],
      trendType: [], //申请类型
      Id: props.Id
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-900',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
