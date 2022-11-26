<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow()">
    <div class="p-4 clearfix">
      <el-input v-model="data.timeValue" type="number"/>
      <!-- <el-date-picker
      v-model="data.timeValue"
      type="datetimerange"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      value-format="YYYY-MM-DD HH:mm:ss"
      @change="timeChange"
      /> -->
      <div class="float-right pt-4">
        <el-button @click="closeWindow()">取消</el-button>
        <el-button type="primary" @click="Submit">确定</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {
        SupplyTime: null,
        RowIndex: 0
      }
    }
  },
  emits: ['SendSupplyTime'],
  setup(props, context: SetupContext) {
    const data = reactive({
      timeValue: <any>null,
      RowIndex: 0
    })
    // 监听页面关闭
    const closeWindow = () => {
      context.emit('closeWindow')
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })
    // 获取选择的时间
    const timeChange = (value: any) => {
      data.timeValue = value
    }
    // 提交
    const Submit = () => {
      if (data.timeValue <0 ){
        ElMessage.error('供应周期不得小于0！')
        return false
      }
      context.emit('SendSupplyTime', data.timeValue, data.RowIndex)
      closeWindow()
    }
    
    

    onMounted(()=>{
      data.RowIndex = props.FormData.RowIndex
      data.timeValue = props.FormData.SupplyTime
    })
    return {
      boxStyle,
      closeWindow,
      Submit,
      data,
      timeChange
    }
  }
})
</script>
<style lang="postcss" scoped></style>
