<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="字典名称" prop="Name">
        <el-input v-model="data.ruleForm.Name" />
      </el-form-item>
      <el-form-item label="字典类型" prop="Type">
        <el-input v-model="data.ruleForm.Type" placeholder="例：sys_user_sex " />
      </el-form-item>
      <el-form-item label="字典状态" prop="Status">
        <el-radio-group v-model="data.ruleForm.Status">
          <el-radio :label="item.DicKey" v-for="(item, index) in data.ruleForm.job" :key="index" :value="item.DicValue">{{ item.DicValue }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="备注" prop="Remark">
        <el-input v-model="data.ruleForm.Remark" type="textarea" placeholder="例：男、女、未知" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
        <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
      </el-form-item>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { dictionaryData } from '/@/type/views/system/dictionary'
import { addDictionaryIndex, editDictionaryIndex, getDict, getIndexDetails } from '/@/api/system/dictionary'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (data.Id) {
          editDictionaryIndex(data.ruleForm).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: 'success'
              })
              closeWindow('submit')
            } else {
              ElMessage.error(res.message)
            }
          })
        } else {
          addDictionaryIndex(data.ruleForm).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: 'success'
              })
              closeWindow('submit')
            } else {
              ElMessage.error(res.message)
            }
          })
        }
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    Name: [{ required: true, message: '请填写字典名称', trigger: 'blur' }],
    Type: [{ required: true, message: '请填写字典类型', trigger: 'blur' }],
    Status: [{ required: true, message: '请选择字典状态', trigger: 'changge' }],
    Remark: [{ required: true, message: '请填写字典备注', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return { rules, submitForm, resetForm, ruleFormRef }
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
    let data: dictionaryData = reactive({
      ruleForm: {
        Name: '',
        Type: '',
        Remark: '',
        job: {}
      },
      Id: props.Id
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1/4',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      if (props.Id) {
        getIndexDetails(props.Id).then((res) => {
          if (res.code == 1) {
            data.ruleForm = res.data
            console.log(data)
          } else {
            ElMessage.error(res.message)
          }
        })
      }
      let storeData = store.getDict('sys_job_status')
      // 获取字典
      storeData.then((res: any) => {
        data.ruleForm.job = res
      })
    })
    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow) }
  }
})
</script>

<style scoped></style>
