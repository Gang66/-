<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="面试短信">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="40px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10"> </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="17">
          <div>
            <div class="bf-font-blue-color mb-2">链接分享</div>
            <el-row :gutter="10">
              <el-col :md="24" :lg="24">
                <el-form-item label="有效期限" prop="ShareExpireTime" label-width="70px">
                  <el-date-picker v-model="data.ruleForm.ShareExpireTime" type="date" placeholder="请选择" value-format="YYYY-MM-DD" :disabled="data.isHeavy && data.isEdit"
                    :disabled-date="disabledDate" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="24" :lg="24">
                <el-form-item label="面试内容" prop="ContractUnitName" label-width="70px">
                  <div class="InviteContent">
                    <div class="flex items-end">
                      <template v-if="data.userInfo.InviteName">
                        <span class="leading-none">{{ data.userInfo.InviteName }}{{ data.userInfo.Sex == 1 ? "先生" : "女士" }}：</span>
                      </template>
                      <template v-else>
                        <div class="ic-name w-14"></div>
                        <div class="leading-none">女士/先生：</div>
                      </template>
                    </div>
                    <div class="leading-5 mt-2 text-sm">您好！北方阀门集团初步认为您符合招聘要求，诚邀您前来面试。请点击链接了解公司详情并预约面试时间：</div>
                    <div class="overflow-clip text-sm bf-font-blue-color">{{ data.url }}</div>
                    <div @click="copy" class="bf-warning-color cursor-pointer">复制内容</div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :md="24" :lg="7">
          <div class="bf-font-blue-color text-center">面试二维码</div>
          <qrcode :url="data.url" v-if="data.url"></qrcode>
        </el-col>
      </el-row>

      <div class="bf-search-formItem" v-if="data.isHeavy == false || !data.isEdit">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import qrcode from '/@/components/qrcode/index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'

import useClipboard from 'vue-clipboard3'
import { PostEditInterViewShareExpireTimeSave } from '/@/api/hr/Interview'
import { GetHRInviteManagementInfo } from '/@/api/hr/Invite'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = {
          Id: data.Id,
          ShareExpireTime: data.ruleForm.ShareExpireTime
        }
        PostEditInterViewShareExpireTimeSave(arr).then((res) => {
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
    })
  }
  //校验
  const rules = reactive<FormRules>({
    DepartIds: [
      { required: true, message: '请选择事业部门', trigger: 'change' }
    ],
    Sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    RecruitChannel: [
      { required: true, message: '请选择招聘渠道', trigger: 'change' }
    ],
    ShareExpireTime: [
      { required: true, message: '请选择有效时间', trigger: 'change' }
    ],
    InviteName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
    PostName: [{ required: true, message: '请选择岗位', trigger: 'blur' }],
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
  // 监听岗位返回数据
  const transferData = (val: any) => {
    data.ruleForm.PostName = val.Details.label
    data.ruleForm.PostIds = val.Details.Id + ''
    data.ruleForm.DeptIds = JSON.stringify(val.DeptIds)
  }
  return { rules, submitForm, resetForm, ruleFormRef, transferData }
}
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    // 根据面试Uid获取登记表详情
    GetHRInviteManagementInfo(data.Uid).then((res) => {
      if (res.code == 1) {
        data.userInfo = res.data
      }
    })
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    qrcode
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    Id: {
      type: Number,
      default: null
    },
    // 用户Uid
    Uid: {
      type: Number,
      default: null
    },
    // 延迟时间
    ShareExpireTime: {
      type: String,
      default: ''
    }
  },
  setup(props, context: SetupContext) {
    const { toClipboard } = useClipboard()
    let data: any = reactive({
      ruleForm: {
        ShareExpireTime: props.ShareExpireTime //有效时间
      },
      userInfo: {}, //用户信息
      // 查看详情Id
      Id: props.Id,
      // 用户Uid
      Uid: props.Uid,
      url: `${import.meta.env.VITE_HR_H5}#/?uid=` + props.Uid
    })
    // 有效期限只能选择当前时间之后
    const disabledDate = (time: Date) => {
      return time.getTime() < Date.now() - 8.64e7
    }
    // 复制路径
    const copy = async () => {
      try {
        await toClipboard(
          data.userInfo.InviteName +
            (data.userInfo.Sex == '1' ? '先生' : '女士') +
            '您好！北方阀门集团初步认为您符合招聘要求，诚邀您前来面试。 请点击链接了解公司详情并预约面试时间：' +
            data.url
        )
        ElMessage({
          message: '复制成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
      }
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      disabledDate,
      copy
    }
  }
})
</script>

<style lang="postcss" scoped>
.buttonHeight {
  height: 28px;
}
.InviteContent {
  border: 1px solid var(--el-border-color);
  padding: 16px;
  width: 375px;
  min-height: 142px;
  .ic-name {
    border-bottom: 1px solid var(--el-border-color);
  }
}
</style>
