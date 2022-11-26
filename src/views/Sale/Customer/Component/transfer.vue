<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addtogether text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <div>
                <el-form-item label='客户名称' prop="CustomerName">
                  <el-input v-model='data.form.CustomerName' :readonly='true' placeholder='请输入' style='width:620px;' />

                </el-form-item>
                <el-form-item label='所属人员' prop="AfterUserName">
                  <el-input v-model='data.form.AfterUserName' :readonly='true' placeholder='请输入' style='width:274px;' />

                </el-form-item>
                <el-form-item label='事业部' prop="AfterCompName">
                  <el-input v-model='data.form.AfterCompName' :readonly='true' placeholder='请输入' style='width:274px;' />
                </el-form-item>
              </div>
              <el-form-item label='申请人' prop="BeforeUserName">
                <el-input v-model='data.form.BeforeUserName' :readonly='true' placeholder='请输入' style='width:274px;' />
              </el-form-item>
              <el-form-item label='事业部' prop="CompName">
                <el-input v-model='data.form.CompName' :readonly='true' placeholder='请输入' style='width:274px;' />
              </el-form-item>

              <el-form-item label='选择类型' prop="ChangeDescription">
                <el-select :disabled='data.disabled' v-model="data.form.ChangeDescription" placeholder="请选择" style='width:620px;'>
                  <el-option label="有合作意向" :value="0"></el-option>
                  <el-option label="特殊申请" :value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='申请理由' prop="Remark">
                <el-input v-model='data.form.Remark' type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" :readonly='data.disabled' placeholder='请输入' style='width:620px;' />
              </el-form-item>
            </el-card>
          </el-form>
        </div>
      </div>
      <div v-if="data.disabled==false" class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          提交
        </el-button>
      </div>
      <div v-if="data.ViewType==4" class="text-center pt-6">
        <template v-if="data.ViewType != 1">
          <!-- 审批记录 -->
          <slot name="ApprovalProcess"></slot>
          <!-- 审批 -->
          <template v-if="data.ViewType==4">
            <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
            <div class="bf-search-formItem ">
              <div class="text-center w-full mt-4">
                <el-button type="danger" @click="Appchange(0)">驳 回</el-button>
                <el-button type="primary" @click="Appchange(1)">审 批</el-button>
              </div>
            </div>
          </template>
        </template>

        <!--         <el-button class="cancelbut" @click="Appchange(0)">
          拒绝
        </el-button>
        <el-button type="primary" @click="Appchange(1)">
          同意
        </el-button> -->
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { PostAddCustomerTogether, GetChangeRecordById, GetAppCustomerTogther, GetCustomer, PostApprovalCustomerChange } from '/@/api/Sale/Customer'
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
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
    default: 1 //1是添加  2是修改 3是查看
  },
  CustomerName: {
    type: String,
    default: ''
  },
  CustomerId: {
    type: Number,
    default: 0
  },
  DataId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  Data: {
    type: Object,
    default: {}
  },
  title: {
    type: String,
    default: '申请划拨'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  ChangeDescription: [
    {
      required: true,
      message: '',
      trigger: 'change'
    }
  ],
  Remark: [
    {
      required: true,
      message: '请选择付款方式',
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

const data = reactive({
  Approval: {
    remark: ''
  },
  ViewType: 1,
  customerId: 0,
  Company: [],
  disabled: false,
  form: {
    CustomerId: 0,
    CustomerName: '',
    Type: 1,
    CompanyId: null,
    Remark: '',
    BeforeUserName: '',
    BeforeUserId: 0,
    AfterUserId: null,
    AfterUserName: '',
    AfterCompId: null,
    AfterCompName: '',
    AfterDeptName: '',
    AfterPostName: '',
    AfterDeptId: 0,
    AfterPostId: 0,
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0
  }
})
const Appchange = (num: any) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: data.Approval.remark,
    dataid: data.form.CustomerId
  }
  PostApprovalCustomerChange(arr).then((res: any) => {
    if (res.code == 1) {
      ElMessage({
        message: res.message,
        type: 'success'
      })
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
}
//获取协作详情
const getInfoById = () => {
  var Id = props.DataId != 0 ? props.DataId : props.info.Id
  GetChangeRecordById({ DataId: Id }).then((res) => {
    if (res.code == 1) {
      data.form = res.data
    }
  })
}

///提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      data.form.CustomerId = props.CustomerId
      var postdata = data.form
      PostAddCustomerTogether(postdata).then((res) => {
        if (res.code == 1) {
          ElMessage.success('提交成功')
          closeWindow()
        } else {
          ElMessage.warning(res.message)
        }
      })
    }
  })
}

const Depts = reactive({
  Coms: [],
  Users: [],
  CheckUser: <any>[]
})
const checkcom = () => {
  var comp: any = Depts.Coms.find((f: any) => f.Id == data.form.AfterCompId)
  data.form.AfterCompName = comp.Name

  Depts.CheckUser = Depts.Users.filter((f: any) => f.CompId == data.form.AfterCompId)
  console.log('asdassdasdadasd', Depts.CheckUser)
  data.form.AfterUserId = null
  data.form.AfterUserName = ''
}

const checkuser = () => {
  var user: any = Depts.CheckUser.find((f: any) => f.UserId == data.form.AfterUserId)
  data.form.AfterUserName = user.RealName
}

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    data.form.BeforeUserId = res.data.UserId
    data.form.BeforeUserName = res.data.RealName

    data.form.DeptName = res.data.DeptName
    data.form.PostName = res.data.PostName
    data.form.CompName = res.data.CompName
    data.form.CompId = res.data.CompId
    data.form.DeptId = res.data.DeptId
    data.form.PostId = res.data.PostId
  })
}
const getcusinfo = () => {
  GetCustomer({ CustomerId: data.customerId }).then((res) => {
    data.form.AfterUserName = res.data.Cus.UserName
    data.form.AfterUserId = res.data.Cus.CreateBy

    data.form.AfterDeptName = res.data.Cus.DeptName
    data.form.AfterPostName = res.data.Cus.PostName
    data.form.AfterCompName = res.data.Cus.CompName
    data.form.AfterCompId = res.data.Cus.CompId
    data.form.AfterDeptId = res.data.Cus.DeptId
    data.form.AfterPostId = res.data.Cus.PostId
    data.form.CustomerId = res.data.Cus.Id
    data.form.CustomerName = res.data.Cus.Name
  })
}

onMounted(() => {
  if (props.info.viewType != 1) {
    data.customerId = props.info.Id
    data.ViewType = props.info.viewType
  } else {
    data.customerId = props.CustomerId
    data.ViewType = props.ViewType
  }
  if (data.ViewType == 1) {
    getuserinfo()
    getcusinfo()
  } else {
    getInfoById()
    data.disabled = true
  }
})
</script>
<style lang="postcss" scoped>
.addtogether {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 4.5rem;
  }
}
</style>
