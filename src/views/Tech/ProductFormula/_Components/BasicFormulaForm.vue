<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('cancel')" title="编辑配置">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="40px" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="编号" prop="Code">
        <el-input v-model="data.ruleForm.Code" placeholder="请填写编号" />
      </el-form-item>
      <el-form-item label="含义" prop="Mean">
        <el-input v-model="data.ruleForm.Mean" placeholder="请填写含义" />
      </el-form-item>
      <el-form-item label="备注" v-show="data.ruleForm.FormulaType!='type'">
        <el-input v-model="data.ruleForm.Remark" placeholder="请填写备注" />
      </el-form-item>
      <div class="bf-search-formItem">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('cancel')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext, PropType } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { postEditProductFormulaSave } from "/@/api/tech/ProductFormula";

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var info = JSON.parse(JSON.stringify(data.data.ruleForm))
        postEditProductFormulaSave(info).then(res => {
          if(res.code === 1) {
              ElMessage.success(res.message);
              
              //关闭
              data.closeWindow('close')
          }
          else{
              ElMessage.error(res.message);
          }
        })
        .catch(e => { 
            console.log(`postEditProductFormulaSave${e}`) 
        })
        
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    Code: [{ required: true, message: '请填写', trigger: 'blur' }],
    Mean: [{ required: true, message: '请填写', trigger: 'blur' }],
    Remark: [{ required: true, message: '请填写', trigger: 'blur' }],
    PhoneNumber: [
      { required: true, message: '请填写手机号', trigger: 'blur' },
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '手机号码格式不正确',
        trigger: 'blur'
      }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
  }
}

interface IProductFormulaSaveDto {
  Id?:number;
  FormulaTypeId?:number;
  Code:string;
  Mean:string;
  Remark:string;
  Digit:number;
  FormulaType:string;
}

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 用户Uid
    FormData: {
      type: Object as PropType<IProductFormulaSaveDto>,
      default: null
    }
    
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      ruleForm: {
        FormulaTypeId:0,
        Code:null,
        Mean:null,
        Remark:null,
        Digit:null,
        FormulaType:null,
      }
    })
    

   
    // 关闭弹窗
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-400',
      boxHeight: ''
    })

    onMounted(() => {
      data.ruleForm=JSON.parse(JSON.stringify(props.FormData)) 
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent({data, closeWindow}),
      
    }
  }
})
</script>

<style lang="postcss" scoped>

</style>
