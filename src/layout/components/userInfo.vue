<template>
  <OpenWindow :box-style="boxStyle" :is-show="true" class="openWindow" @closeWindow="closeWindow('close')" title="修改密码">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding bf-no-error" hide-required-asterisk>
      <el-form-item label="账号" prop="UserName">
        <el-input v-model="data.ruleForm.UserName" disabled />
      </el-form-item>
      <el-form-item label="原密码" prop="OldPassword">
        <el-input v-model="data.ruleForm.OldPassword" />
      </el-form-item>
      <el-form-item label="新密码" prop="NewPassword">
        <el-input v-model="data.ruleForm.NewPassword" />
      </el-form-item>
      <el-form-item label="确认密码" prop="ConfirmPassword">
        <el-input v-model="data.ruleForm.ConfirmPassword" />
      </el-form-item>
    </el-form>
    <div class="text-center relative z-50 mb-4">
      <el-button class="w-20" @click="closeWindow('close')">取 消</el-button>
      <el-button class="w-20" type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { addInnovate, getInnovateDetails } from '/@/api/hr/Innovate'
import { InnovateData } from '/@/type/views/hr/Innovate'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { PostUpdateUserInfo } from '/@/api/system/user'
const store = useCommonStore() // 记得加这一句
const userStore = useLayoutStore() // 记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const { logout } = useLayoutStore()
  const ruleFormRef = ref()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        let arr = JSON.parse(JSON.stringify(data.ruleForm))
        PostUpdateUserInfo(arr).then((res) => {
          if (res.code == 1) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            logout()
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  var validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error('请输入密码'))
    } else {
      if (data.ruleForm.ConfirmPassword !== '') {
        ruleFormRef.value.validateField('ConfirmPassword')
      }
      callback()
    }
  }
  var validatePass2 = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error('请再次输入密码'))
    } else if (value !== data.ruleForm.NewPassword) {
      callback(new Error('两次输入密码不一致!'))
    } else {
      callback()
    }
  }
  // 校验
  const rules = reactive<FormRules>({
    UserName: [{ required: true, message: '请填写账号', trigger: 'blur' }],
    OldPassword: [{ required: true, message: '请填写原密码', trigger: 'blur' }],
    NewPassword: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
      { validator: validatePass, trigger: 'blur' }
    ],
    ConfirmPassword: [
      { required: true, message: '请确认密码', trigger: 'blur' },
      { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' },
      { validator: validatePass2, trigger: 'blur', required: true }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return { rules, submitForm, resetForm, ruleFormRef, logout }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  props: {},
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        UserName: userStore.getUserInfo.UserName,
        ConfirmPassword: '',
        NewPassword: '',
        OldPassword: '',
        Type: 1
      },
      selectIndex: 0
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
    onMounted(() => {})
    return {
      closeWindow,
      boxStyle,
      data,

      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
