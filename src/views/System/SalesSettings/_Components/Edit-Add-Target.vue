<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="0px" class="bf-window-padding" hide-required-asterisk>
      <div class="flex">
        <el-form-item label="启动日期" label-width="40" prop="StartDate">
          <el-date-picker v-model="data.ruleForm.StartDate" type="date" placeholder="请选择日期" style="width: 210px" />
        </el-form-item>
        <el-form-item label="目标周期" label-width="40" class="ml-4" prop="TargetPeriod">
          <el-select v-model="data.ruleForm.TargetPeriod" placeholder="请选择目标周期" style="width: 210px">
            <el-option v-for="item in data.TargetOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
          </el-select>
        </el-form-item>
      </div>
      <div class="flex">
        <el-form-item label="目标业绩" label-width="80" prop="performanceInput">
          <el-input v-model="data.ruleForm.performanceInput" style="min-width: 210px" placeholder="请填写" />
        </el-form-item>
        <el-form-item label="备注" label-width="80" class="ml-11" prop="remarksInput">
          <el-input v-model="data.ruleForm.remarksInput" style="min-width: 210px" placeholder="请填写" />
        </el-form-item>
      </div>
    </el-form>
    <div class="text-center mb-6">
      <el-button class="w-20" @click="closeWindow('close')">取 消</el-button>
      <el-button class="w-20" type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { GetWorkSetupKachEntity, PostEditWorkSetupKachSave } from '/@/api/system/SalesSettings'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  //获取销售设置目标周期
  store.getDict('salestetting_trage_cycle').then((res: any) => {
    data.TargetOptions = res
    console.log(res)
  })
}

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      type: 0, // 1 编辑
      ruleForm: {
        remarksInput: '',
        performanceInput: '',
        StartDate: '',
        TargetPeriod: ''
      },
      TargetOptions: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: ''
    })
    //获取业绩设置详情数据
    const getData = () => {
      GetWorkSetupKachEntity(props.FormData.Id).then((res) => {
        if (res.code == 1) {
          console.log(res)
          data.ruleForm.StartDate = res.data.StartDate
          data.ruleForm.TargetPeriod = res.data.Cycle.toString()
          data.ruleForm.remarksInput = res.data.Remarks
          data.ruleForm.performanceInput = res.data.TargetAmount
        }
      })
    }
    // 获取销售设置目标周期
    const getCriteria = (val: number) => {
      let _obj = data.TargetOptions.find((x: any) => x.DicKey == val.toFixed(0))
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    // 表单事件
    const formEvent = (data: any, closeWindow: any) => {
      const ruleFormRef = ref<FormInstance>()
      // 表单提交
      const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
          if (valid) {
            console.log('success')
            // const datas = JSON.parse(JSON.stringify(data.ruleForm))
            const datas = {
              Id: props.FormData.Id,
              StartDate: data.ruleForm.StartDate,
              TargetAmount: data.ruleForm.performanceInput,
              Remarks: data.ruleForm.remarksInput,
              TargetType: 1,
              Cycle: data.ruleForm.TargetPeriod
            }
            //编辑业绩设置
            PostEditWorkSetupKachSave(datas).then((res) => {
              if (res.code == 1) {
                console.log(res)
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
        })
      }
      // 校验
      const rules = reactive<FormRules>({
        StartDate: [{ required: true, message: '请选择启动日期', trigger: 'blur' }],
        TargetPeriod: [{ required: true, message: '请选择目标周期', trigger: 'blur' }],
        performanceInput: [{ required: true, message: '请填写目标业绩', trigger: 'blur' }],
        remarksInput: [{ required: true, message: '请填写备注', trigger: 'blur' }]
      })
      // 表单重置
      const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
      }
      return { rules, submitForm, resetForm, ruleFormRef }
    }
    onMounted(() => {
      if (props.FormData.type == 1) {
        getData()
      }
      console.log(props.FormData)
      getDictionaryData(data)
      data.type = props.FormData.type
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ...formEvent(data, closeWindow),
      getCriteria
    }
  }
})
</script>
<style lang="postcss" scoped></style>
