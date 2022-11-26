<template>
  <div class="ExamineAllocation">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="社保金额">
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex justify-between">
            <el-form-item label="社保情况：" prop="Situation">
              <el-select v-model="data.ruleForm.Situation" class="screen-width" placeholder="社保情况" :disabled="data.isDisabled">
                <el-option v-for="item in data.basicSocialInsuranceOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <!-- :disabled="true" -->
            <el-form-item label="社保公司：" prop="SocialSecurityCompany">
              <el-select v-model="data.ruleForm.SocialSecurityCompany" class="screen-width" placeholder="社保公司" :disabled="data.isDisabled">
                <el-option v-for="item in data.contractList" :key="item.Id" :label="item.ContractUnitName" :value="item.ContractUnitName" />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex justify-between">
            <el-form-item label="个人：" prop="PersonalMoney">
              <el-input v-model.number="data.ruleForm.PersonalMoney" placeholder="请输入个人所交社保金额" class="screen-width" @input="MoneyChange" :disabled="data.isDisabled" />
            </el-form-item>
            <el-form-item label="公司：" prop="CompanyMoney">
              <el-input v-model.number="data.ruleForm.CompanyMoney" placeholder="请输入公司所交社保金额" class="screen-width" @input="MoneyChange" :disabled="data.isDisabled" />
            </el-form-item>
          </div>
          <el-form-item label="社保总计：" prop="TotalMoney">
            <el-input v-model="data.ruleForm.TotalMoney" placeholder="请输入社保金额总计" class="screen-width" :disabled="data.isDisabled" />
          </el-form-item>
          <div class="bf-search-formItem mt-4" v-if="data.isDisabled == false">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import { GetContractManagementList } from '/@/api/system/contractSetting'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetSocialSecurityInfo, PostAddEditSocialSecuritySave } from '/@/api/hr/Staff'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.UserId) {
    GetSocialSecurityInfo(data.UserId).then((res: any) => {
      if (res.code == 1 && res.data) {
        data.ruleForm = res.data
        console.log(data.ruleForm)
      } else {
        // ElMessage.error(res.message)
      }
    })
    data.ruleForm.SocialSecurityCompany = data.SocialSecurityCompany
  }
  GetContractManagementList().then((res: any) => {
    if (res.code == 1) {
      data.contractList = res.data
      console.log(data.contractList)
    } else {
      ElMessage.error(res.message)
    }
  })
  if (data.viewType == 3 || data.viewType == 4) {
    data.isDisabled = true
  }
  // 社会保险
  store.getDict('social_security').then((res: any) => {
    data.basicSocialInsuranceOptions = res
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        PostAddEditSocialSecuritySave(arr).then((res) => {
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
    TotalMoney: [
      {
        required: true,
        message: '请填写社保总计',
        trigger: 'blur'
      }
    ],
    CompanyMoney: [
      {
        required: true,
        message: '请填写社保公司所交社保',
        trigger: 'blur'
      }
    ],
    PersonalMoney: [
      {
        required: true,
        message: '请填写个人所缴纳金额',
        trigger: 'blur'
      }
    ],
    Situation: [
      {
        required: true,
        message: '请选择社保金额',
        trigger: 'change'
      }
    ],
    SocialSecurityCompany: [
      {
        required: true,
        message: '请选择社保公司',
        trigger: 'change'
      }
    ]
  })
  // 监听社保金额
  const MoneyChange = (val: any) => {
    data.ruleForm.TotalMoney = data.ruleForm.PersonalMoney + data.ruleForm.CompanyMoney
  }
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
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
    remoteUrlEvent,
    MoneyChange
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    Id: {
      type: Number,
      default: 0
    },
    // 显示类型 1 添加 2修改 3查看 4审批
    viewType: {
      type: Number,
      default: 1
    },
    SocialSecurityCompany: {
      type: String,
      default: ''
    },
    UserId: {
      type: Number,
      default: 0
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      SocialSecurityCompany: props.SocialSecurityCompany,
      isDisabled: false, //是否禁用
      contractList: [], //合同列表数据
      viewType: props.viewType, // 显示类型 1 添加 2修改 3查看 4审批
      basicSocialInsuranceOptions: [], //社保情况
      ruleForm: {
        Situation: '', //社保情况
        SocialSecurityCompany: null, //社保公司
        PersonalMoney: null, //个人社保
        CompanyMoney: null, //公司社保
        TotalMoney: null, //社保总计
        Id: props.Id,
        UserId: props.UserId
      },
      Id: props.Id,
      UserId: props.UserId,
      visible: false, //
      quitOptions: {}, //离职类别
      quitWorkOptions: {}, //离职交接工作
      //   选择课件弹窗
      selectCoursewareWindow: {
        view: false
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: '',
      boxPaddingTop: 'pt-40'
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.ExamineAllocation {
  :deep(.el-form-item__label) {
    color: var(--el-text-color-primary);
    padding: 0;
  }
  :deep(.screen-width) {
    width: 200px !important;
  }
}
</style>
