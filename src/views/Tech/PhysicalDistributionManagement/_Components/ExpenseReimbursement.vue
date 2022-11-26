<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pl-1">
      <el-form ref="ruleFormRef" :model="data.ruleForm" :hide-required-asterisk="true" :rules="rules" label-width="5em" class="bf-window-padding" label-position="top" :inline="true">
        <el-form-item label="发生日期" prop="WarehousingDate">
          <el-date-picker v-model="data.ruleForm.WarehousingDate" type="date" placeholder="请选择日期" style="width: 260px" />
        </el-form-item>
        <el-form-item label="报销金额" prop="MoneyInput">
          <el-input v-model="data.ruleForm.MoneyInput" placeholder="请输入内容" style="width: 260px"> </el-input>
        </el-form-item>
        <el-form-item label="关联报销单" prop="ReimbursementInput">
          <el-input v-model="data.ruleForm.ReimbursementInput" placeholder="关联报销单" style="width: 260px"> </el-input>
        </el-form-item>
        <el-form-item label="费用类别" prop="TypeInput">
          <el-select v-model="data.ruleForm.TypeInput" placeholder="请选择" style="width: 260px">
            <el-option v-for="item in data.TypeOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="收款方式" prop="PaymentInput">
          <el-select v-model="data.ruleForm.PaymentInput" placeholder="请选择" style="width: 260px">
            <el-option v-for="item in data.PaymentOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="收款账号" prop="AccountNumberInput">
          <el-input v-model="data.ruleForm.AccountNumberInput" placeholder="请输入内容" style="width: 260px"> </el-input>
        </el-form-item>
        <el-form-item label="报销内容" prop="RemarksInput" style="width: 405px">
          <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
        </el-form-item>
        <el-form-item label="费用明细 " prop="DetailedInput" style="width: 405px">
          <el-input v-model="data.ruleForm.DetailedInput" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
        </el-form-item>
        <el-form-item label="相关附件 " prop="DetailedInput">
          <div class="text-xs text-gray-400">支持格式：JPG/JPEG/PNG，单个文件不能超过5MB</div>
        </el-form-item>
      </el-form>
      <div class="pl-10">
        <el-upload action="#" list-type="picture-card" :auto-upload="false">
          <i class="iconfont icon-chuangjian"></i>
          <template #file="{ file }">
            <div>
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
              <span class="el-upload-list__item-actions">
                <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                  <i class="iconfont icon-fangda"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                  <i class="iconfont icon-download"></i>
                </span>
                <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                  <i class="iconfont icon-shanchu"></i>
                </span>
              </span>
            </div>
          </template>
        </el-upload>
        <el-dialog v-model="dialogVisible">
          <img w-full :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
      </div>
    </div>
    <div class="text-sm pl-11 clearfix">
      <div class="float-right p-4 pr-12">
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
import type { UploadFile } from 'element-plus'

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
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      ruleForm: {
        WarehousingDate: '',
        MoneyInput: '',
        TypeInput: '',
        PaymentInput: '',
        ReimbursementInput: '',
        RemarksInput: '',
        AccountNumberInput: '',
        DetailedInput: ''
      },
      props: {
        expandTrigger: 'hover'
      },
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
      ],
      PaymentOptions: [
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
      WarehousingDate: [{ required: true, message: '请选择', trigger: 'blur' }],
      MoneyInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      ReimbursementInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      TypeInput: [{ required: true, message: '请选择', trigger: 'blur' }],
      RemarksInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      PaymentInput: [{ required: true, message: '请选择', trigger: 'blur' }],
      AccountNumberInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      DetailedInput: [{ required: true, message: '请输入', trigger: 'blur' }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-940',
      boxHeight: ''
    })
    // 选取的地址
    const handleChange = (val: any) => {
      console.log(val)
    }
    onMounted(() => {
      console.log(props.FormData.selectDetails)
    })

    const handleRemove = (file: UploadFile) => {
      console.log(file)
    }

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }

    const handleDownload = (file: UploadFile) => {
      console.log(file)
    }

    return {
      boxStyle,
      closeWindow,
      data,
      ruleFormRef,
      rules,
      submitForm,
      handleChange,
      handleRemove,
      handlePictureCardPreview,
      handleDownload,
      disabled,
      dialogImageUrl,
      dialogVisible
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.bf-window-padding) {
  padding: 18px 0 0 46px;
}
</style>
