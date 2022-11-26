<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pl-1">
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="5em" class="bf-window-padding" hide-required-asterisk label-position="top" :inline="true">
        <el-form-item label="库位编号" prop="NameInput">
          <el-input v-model="data.ruleForm.NameInput" placeholder="库位编号" style="width: 320px" />
        </el-form-item>
        <el-form-item label="库位名称" prop="MeasureInput">
          <el-input v-model="data.ruleForm.MeasureInput" placeholder="库位名称" style="width: 320px"> </el-input>
        </el-form-item>
        <el-form-item label="仓库" prop="AdminInput">
          <el-select v-model="data.ruleForm.AdminInput" placeholder="选择选择" style="width: 320px">
            <el-option v-for="item in data.AdminOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="库位类型" prop="TypeInput">
          <el-select v-model="data.ruleForm.TypeInput" placeholder="选择选择" style="width: 320px">
            <el-option v-for="item in data.TypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="RemarksInput" style="width: 700px">
          <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
        </el-form-item>
      </el-form>
    </div>
    <div class="text-sm pl-11 clearfix">
      <div class="float-right p-4">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'

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
    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      ruleForm: {
        NameInput: '',
        MeasureInput: '',
        TypeInput: '',
        AdminInput: '',
        RemarksInput: ''
      },
      props: {
        expandTrigger: 'hover'
      },
      AdminOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      TypeOptions: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ]
    })
    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('success')
        } else {
          ElMessage.error('存在必填项未选')
        }
      })
    }
    // 校验
    const rules = reactive<FormRules>({
      NameInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      MeasureInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      AdminInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      TypeInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      RemarksInput: [{ required: true, message: '请输入', trigger: 'blur' }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-740',
      boxHeight: ''
    })
    // 选取的地址
    const handleChange = (val: any) => {
      console.log(val)
    }
    onMounted(() => {
      console.log(props.FormData.selectDetails)
      if (props.FormData.selectDetails == undefined) {
        console.log('不走接口')
      } else {
        console.log('走接口')
      }
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ruleFormRef,
      rules,
      submitForm,
      handleChange
    }
  }
})
</script>
<style lang="postcss" scoped></style>
