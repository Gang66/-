<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addquotation text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <el-radio-group v-model="data.form.State">
                <el-radio v-for="(item,index) in dic.State.filter(f=>f.DicKey>90)" :key="index" :label="item.DicKey">{{item.DicValue}}</el-radio>
              </el-radio-group>
            </el-card>
            <div class="text-center pt-6">
              <el-button class="cancelbut" @click="closeWindow()">
                取消
              </el-button>
              <el-button type="primary" @click="submitForm()">
                提交
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetUpdateContractState } from '/@/api/Sale/Contract'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

const dic = reactive({
  State: []
})
//获取字典数据
const getDictionaryData = () => {
  //运费
  store.getDict('sale_ContractState').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.State = res
  })
}
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  DataId: {
    type: Number,
    default: 0
  },
  State: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '状态变更'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const submitForm = () => {
  GetUpdateContractState({ Id: props.DataId, State: data.form.State }).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
}
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}
const boxStyle = reactive({
  boxWidth: 'w-600',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  form: {
    State: props.State
  }
})
onMounted(() => {
  console.log('props.State', props.State)
  getDictionaryData()
})
</script>
<style lang="postcss" scoped>
</style>
