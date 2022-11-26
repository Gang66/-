<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 tech_purchasingManagement_billMaterials">
      <div class="flex items-center text-sm mt-2">
        <div class="w-28 flex">
          <div>总数量：</div>
          <div>{{ data.Quantity }}</div>
        </div>
        <div class="flex-1 flex items-center">
          <div>分组一：</div>
          <div class="w-5">
            <el-input-number
              v-model="data.num1"
              :min="1"
              controls-position="right"
              @change="handleChange"
            />
          </div>
        </div>
        <div class="flex-1 flex items-center">
          <div>分组二：</div>
          <div class="w-5">
            <el-input-number
              v-model="data.num2"
              :min="1"
              controls-position="right"
              @change="handleChange"
            />
          </div>
        </div>
      </div>
      <div class="w-full h-px my-4 bg-gray-100"></div>
      <div class="float-right mr-2 pb-4" v-if="data.IsConfirmSupplier != 1">
        <el-button @click="closeWindow">取消</el-button>
        <el-button type="primary" @click="Submit">确定</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { PostSetSplitMaterialNumSave } from '/@/api/tech/Material'

export default defineComponent({
  components: {
    OpenWindow,
  },
  props: {
    FormData: {
      type: Object,
      default: {
        Quantity: 0,
        Id: 0
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      num1: 1,
      num2: 1,
      Quantity: 0,
      Id: 0
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })

    // 提交
    const Submit = () => {
      if ((Number(data.num1) + Number(data.num2)) > Number(data.Quantity)){
        ElMessage.error('分组数量不得大于总数量')
        return false
      }
      if ((Number(data.num1) + Number(data.num2)) < Number(data.Quantity)){
        ElMessage.error('分组数量不得小于总数量')
        return false
      }
      PostSetSplitMaterialNumSave(data.Id, data.num1, data.num2).then(res=>{
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
        if(res.code == 1) {
          context.emit('closeWindow', 'submit')
        }
      })
    }

    onMounted(() => {
      data.Quantity = props.FormData.Quantity
      data.Id = props.FormData.Id
    })
    return {
      boxStyle,
      closeWindow,
      Submit,
      data
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-input-number){
  width: 100px;
}
</style>
