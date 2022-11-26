<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="所属上级" prop="ParentProductTypeId">
        <el-select v-model="data.ruleForm.ParentProductTypeId" class="w-full" placeholder="请选择所属上级">
          <el-option v-for="item in data.ParentOptions" :key="item.Id" :label="item.ProductTypeName" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="编码" prop="ProductTypeCode">
        <el-input v-model="data.ruleForm.ProductTypeCode" placeholder="请输入编码" />
      </el-form-item>
      <el-form-item label="名称" prop="ProductTypeName">
        <el-input v-model="data.ruleForm.ProductTypeName" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="排序" prop="OrderNum">
        <el-input-number v-model="data.ruleForm.OrderNum" :min="1" :max="999" placeholder="请输入排序" />
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
import { GetBasicProductChildrenList, GetEntityById, PostEditEntitySave } from '/@/api/tech/BasicProductType'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        Id: null,
        ProductTypeCode: '',
        ProductTypeName: '',
        ParentProductTypeId: null,
        OrderNum: null
      },
      ParentOptions: [],
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
    const loadParentData = () => {
      GetBasicProductChildrenList().then(res => {
        if (res.code == 1) {
          data.ParentOptions = res.data
        }
      })
    }
    // 根据Id获取详情
    const GetEntityByIdFun = () => {
      if (data.Id) {
        GetEntityById(data.Id).then(res => {
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
          console.log(data.ruleForm)
          PostEditEntitySave(data.ruleForm).then(res => {
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
      ProductTypeCode: [{ required: true, message: '请填写编码', trigger: 'blur' }],
      ProductTypeName: [{ required: true, message: '请填写名称', trigger: 'blur' }],
      ParentProductTypeId: [{ required: true, message: '请选择所属上级', trigger: 'changge' }],
      OrderNum: [{ required: true, message: '请填写排序', trigger: 'blur' }]
    })
    // 表单重置
    const resetForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.resetFields()
    }
    onMounted(() => {
      loadParentData()
      data.Id = props.id
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
