<template>
  <div class="addSample text-base">
    <CusDialog :box-style="boxStyle" :title="title" :is-show="true" @closeWindow="closeWindow">
      <el-form ref="ruleFormRef" :model="formdata.form" :rules="rules" :inline="true">
        <!-- #region top -->
        <!-- #endregion -->
        <el-card class="mb-2">
          <!-- :readonly="true" -->
          <el-form-item label="申请人" prop="UserName">
            <el-input v-model="formdata.form.UserName" placeholder="请输入" style="width: 100px" disabled />
          </el-form-item>
          <el-form-item label="部门" prop="department">
            <el-input v-model="formdata.form.department" placeholder="请输入" style="width: 100px" disabled />
          </el-form-item>
          <el-form-item label="职务" prop="PostName">
            <el-input v-model="formdata.form.PostName" placeholder="请输入" style="width: 100px" disabled />
          </el-form-item>
          <el-form-item label="时间" prop="CreateOn">
            <el-input v-model="formdata.form.CreateOn" placeholder="请输入" style="width: 100px" disabled />
          </el-form-item>
        </el-card>
        <!-- #region  bottom -->
        <el-card class="mb-2">
          <el-form-item label="异常金额" prop="AbnormalAmount">
            <el-input v-model="formdata.form.AbnormalAmount" placeholder="请输入" style="width: 100px" :disabled="data.single" />
          </el-form-item>
          <el-form-item label="申请金额" prop="RequestedAmount">
            <el-input v-model="formdata.form.RequestedAmount" placeholder="请输入" style="width: 100px" :disabled="data.single" />
          </el-form-item>
          <el-form-item label="申请承诺" prop="ApplicationCommitment">
            <el-select v-model="formdata.form.ApplicationCommitment" placeholder="请选择">
              <el-option v-for="item in data.ApplicationOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
          <el-form-item label="理由" prop="Reason">
            <el-input v-model="formdata.form.Reason" type="textarea" placeholder="请输入" style="width: 640px" />
          </el-form-item>
        </el-card>
        <!-- #endregion -->
      </el-form>
      <div class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef, 1)"> 提交 </el-button>
      </div>
    </CusDialog>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, reactive, ref } from 'vue'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { parseTime, getTime } from '/@/utils/tools'
import { useLayoutStore } from '/@/store/modules/layout'

//详情实体
const formdata = reactive({
  ViewType: 1,
  Approval: {
    remark: ''
  },
  form: {
    UserName: '',
    CompName: '',
    PostName: '',
    CreateOn: parseTime(getTime('day'), ''),
    ApplicationCommitment: '',
    RequestedAmount: '',
    AbnormalAmount: '',
    department: '',
    Reason: ''
  }
})
const data = reactive({
  single: false,
  ApplicationOptions: [{ DicValue: '测试', DicKey: 1 }]
})

const { getUserInfo } = useLayoutStore()
const props = defineProps({
  info: {
    type: Object,
    default: {
      checkId: null,
      Id: null,
      // 显示类型 1 添加 2修改 3查看 4审批
      viewType: 1
    }
  },
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看 4审批
  },
  DataId: {
    type: Number,
    default: 0
  },
  title: {
    // 标题
    type: String,
    default: '居间人申请'
  }
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  AbnormalAmount: [
    {
      required: true,
      message: '请输入异常金额',
      trigger: 'change'
    }
  ],
  RequestedAmount: [
    {
      required: true,
      message: '请输入申请金额',
      trigger: 'change'
    }
  ],
  ApplicationCommitment: [
    {
      required: true,
      message: '请选择申请承诺',
      trigger: 'change'
    }
  ],
  Reason: [
    {
      required: true,
      message: '请输入理由',
      trigger: 'change'
    }
  ]
})

const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-800',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

///提交
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    if (valid) {
      console.log('🚀 ~ file: ExceptionRequest.vue ~ line 86 ~ formEl.validate ~ valid', valid, 'success')
    } else {
      ElMessage.warning('请完善相关信息')
    }
  })
}
onMounted(() => {
  formdata.form.UserName = getUserInfo.RealName
  formdata.form.department = getUserInfo.department
  formdata.form.PostName = getUserInfo.postname
  console.log('🚀 ~ file: ExceptionRequest.vue ~ line 161 ~ onMounted ~ getUserInfo', getUserInfo)
})
</script>

<style lang="postcss" scoped>
.addSample {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
    }
  }
  :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    .el-input__prefix {
      display: none;
    }
  }

  .tableclass {
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: #fff;
    }
    :deep(.el-table .cell) {
      padding: 0px;
      text-align: center;
    }
    .el-form-item {
      margin-bottom: 0px;
      width: 100%;
      .el-form-item__content {
        .el-input {
          :deep(.el-input__wrapper) {
            box-shadow: none;
          }
        }
        .el-textarea {
          :deep(.el-textarea__inner) {
            box-shadow: none;
          }
        }
        .el-select {
          :deep(.el-input__wrapper) {
            box-shadow: none;
          }
        }
      }
    }
  }
  :deep(.el-card__body) {
    padding: 1rem;
  }
  .inputwidth {
    width: 100px;
  }
  .otherinputwidth {
    width: 100px;
    :deep(.el-input-group__append) {
      padding: 0 5px;
    }
  }

  :deep(.el-form-item__label) {
    padding: 0 5px 0 0px;
    /* height: 0 !important; */
    /* line-height: 32px !important; */
    width: 4.2rem;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 16px;
  }
  :deep(.el-select) {
    border: none;
  }
}
.tableclass {
  :deep(.el-input__inner) {
    text-align: center;
  }
}
:deep(.el-radio) {
  margin-right: 8px;
}
:deep(.el-input.is-disabled .el-input__inner) {
  -webkit-text-fill-color: var(--el-input-text-color, var(--el-text-color-regular));
}
:deep(.salerDialog .el-card) {
  padding: 0 !important;
}
</style>
