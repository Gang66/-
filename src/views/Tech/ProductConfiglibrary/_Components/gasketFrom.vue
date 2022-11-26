<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="垫片" prop="BasicType">
        <el-select v-model="data.ruleForm.BasicType" class="w-full" placeholder="请选择垫片">
          <el-option v-for="item in data.sonList" :key="item.Id" :label="item.ProductTypeName" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="常用性" prop="CommonState">
        <el-select v-model="data.ruleForm.CommonState" class="w-full" placeholder="请选择常用性">
          <el-option v-for="item in data.commonOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
      </el-form-item>
      <el-form-item label="压力(MPa)" prop="MPa">
        <el-input v-model="data.ruleForm.MPa" placeholder="请输入编码压力" />
      </el-form-item>
      <el-form-item label="通径(DN)" prop="DN">
        <el-input v-model="data.ruleForm.DN" placeholder="请输入名称通径" />
      </el-form-item>
      <el-form-item label="型号" prop="Version">
        <el-input v-model="data.ruleForm.Version" placeholder="请输入型号" />
      </el-form-item>
      <el-form-item label="数量" prop="Quantity">
        <el-input-number v-model="data.ruleForm.Quantity" :min="1" :max="999" placeholder="请输入排序" />
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
import { GetEntityMountingsById, PostEditEntitySaveMountings } from '/@/api/tech/BasicProductType'
import { useCommonStore } from '/@/store/modules/Common'
// import { arrayAvg } from "handsontable/helpers";
const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  //技术产品常规性选项
  store.getDict('tech_product_general_options').then((res: any) => {
    data.commonOptions = res
  })
}

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    id: {
      type: Number,
      default: null
    },
    ParentId: {
      type: Number,
      default: null
    },
    sonList: {
      type: Array,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        Id: 0,
        DN: '',
        MPa: '',
        Version: null,
        Quantity: null,
        BasicType: null,
        ExtendType: null,
        PertainType: 4,
        CommonState: null
      },
      commonOptions: [],
      ParentOptions: [],
      Id: props.id,
      ParentId: props.ParentId,
      sonList: props.sonList
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
    // 根据Id获取详情
    const GetEntityByIdFun = () => {
      if (data.Id) {
        GetEntityMountingsById(data.Id).then((res) => {
          if (res.code == 1) {
            data.ruleForm = res.data
            console.log(data)
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    }
    const ruleFormRef = ref<FormInstance>()
    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          data.ruleForm.Id = data.Id
          PostEditEntitySaveMountings(data.ruleForm).then((res) => {
            if (res.code == 1) {
              ElMessage({
                showClose: true,
                message: '保存成功！',
                type: 'success'
              })
              closeWindow('submit')
            }
          })
        }
      })
    }
    //校验
    const rules = reactive<FormRules>({
      DN: [{ required: true, message: '请填写通径', trigger: 'blur' }],
      MPa: [{ required: true, message: '请填写压力', trigger: 'blur' }],
      Version: [{ required: true, message: '请填写型号', trigger: 'blur' }],
      Quantity: [{ required: true, message: '请填写数量', trigger: 'blur' }],
      ExtendType: [{ required: true, message: '请填写阀门类型', trigger: 'blur' }],
      BasicType: [{ required: true, message: '请选择法兰类型', trigger: 'changge' }],
      CommonState: [{ required: true, message: '请选择常用性', trigger: 'changge' }]
    })
    // 表单重置
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    onMounted(() => {
      data.Id = props.id
      data.ParentId = props.ParentId
      data.sonList = props.sonList

      //获取字典数据
      getDictionaryData(data)

      GetEntityByIdFun()
    })
    return {
      boxStyle,
      data,
      ruleFormRef,
      rules,
      closeWindow,
      submitForm,
      resetForm
    }
  }
})
</script>