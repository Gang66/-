<template>
  <div>
    <CusDialog :box-style="boxStyle" :title="title" :is-show="true" @closeWindow="closeWindow">
      <div class="addtogether text-base">
        <div class="salerDialog">
          <el-form ref="ruleFormRef" :model="data.form" :rules="rules" :inline="true">
            <el-card class="sale_card">
              <div v-if="ViewType != 1">
                <el-form-item label="邀请人" prop="AfterCompId">
                  <el-input v-model="data.form.BeforeUserName" :readonly="data.disabled" placeholder="请输入" style="width: 280px" />
                </el-form-item>
                <el-form-item label="发起时间" prop="AfterCompId">
                  <el-input v-model="data.form.CreateOn" :readonly="data.disabled" placeholder="请输入" style="width: 280px" />
                </el-form-item>
              </div>

              <el-form-item label="事业部" prop="AfterCompId">
                <el-select :disabled="data.disabled" @change="checkcom" filterable v-model="data.form.AfterCompId" placeholder="请选择事业部" style="width: 280px">
                  <el-option v-for="item in Depts.Coms" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="受享人" prop="AfterUserId">
                <el-select v-if="ViewType == 1" :disabled="data.disabled" @change="checkuser" filterable v-model="data.form.AfterUserId" placeholder="请选择受享人" style="width: 280px">
                  <el-option v-for="item in Depts.CheckUser" :key="item.UserId" :label="item.RealName" :value="item.UserId"></el-option>
                </el-select>
                <el-input v-else v-model="data.form.AfterUserName" :readonly="true" placeholder="请输入" style="width: 280px" />
              </el-form-item>
              <el-form-item label="报价单位" prop="CompanyId">
                <el-select :disabled="data.disabled" v-model="data.form.CompanyId" placeholder="请选择" style="width: 633px">
                  <el-option v-for="item in data.Company" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="申请理由" prop="Remark">
                <el-input v-model="data.form.Remark" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" :readonly="data.disabled" placeholder="请输入" style="width: 633px" />
              </el-form-item>
            </el-card>
          </el-form>
        </div>
      </div>
      <div v-if="data.disabled == false" class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
      </div>
      <div v-if="ViewType == 4" class="text-center pt-6">
        <el-button class="cancelbut" @click="Appchange(-2)"> 拒绝 </el-button>
        <el-button type="primary" @click="Appchange(100)"> 同意 </el-button>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { GetSaleCompUserList, PostAddCustomerTogether, GetChangeRecordById, GetAppCustomerTogther } from '/@/api/hr/School/PracticalBase'
import { GetOrderCompany } from '/@/api/hr/School/PracticalBase'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
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
    default: '邀请协作'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  AfterCompId: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  AfterUserId: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Remark: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  CompanyId: [
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
  Company: [],
  disabled: false,
  form: {
    CustomerId: 0,
    CustomerName: '',
    Type: 2,
    CompanyId: null,
    Remark: '',
    BeforeUserName: '',
    AfterUserId: null,
    AfterUserName: '',
    AfterCompId: null,
    AfterCompName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    AfterDeptName: '',
    AfterPostName: '',
    AfterDeptId: 0,
    AfterPostId: 0
  }
})
const Appchange = (val: any) => {
  if (val == -2) {
    ElMessageBox.confirm('确定要拒绝此协作吗', '', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        GetAppCustomerTogther({ DataId: props.DataId, State: val }).then((res) => {
          if (res.code == 1) {
            ElMessage.success('操作成功')
            closeWindow()
          } else {
            ElMessage.error(res.message)
          }
        })
      })
      .catch(() => {})
  } else {
    GetAppCustomerTogther({ DataId: props.DataId, State: val }).then((res) => {
      if (res.code == 1) {
        ElMessage.success('操作成功')
        closeWindow()
      } else {
        ElMessage.error(res.message)
      }
    })
  }
}
//获取协作详情
const getInfoById = () => {
  GetChangeRecordById({ DataId: props.DataId }).then((res) => {
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
      data.form.CustomerName = props.CustomerName
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

//获取报价单位
const GetOrderCompanyEvent = () => {
  GetOrderCompany().then((res) => {
    if (res.code == 1) {
      data.Company = res.data
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

const GetDeptAndUser = () => {
  GetSaleCompUserList().then((res) => {
    if (res.code == 1) {
      Depts.Coms = res.data.comp
      Depts.Users = res.data.user
    }
  })
}
const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (props.ViewType == 1) {
      data.form.BeforeUserName = res.data.RealName
      data.form.CompName = res.data.CompName
      data.form.DeptName = res.data.DeptName
      data.form.PostName = res.data.PostName
      data.form.CompId = res.data.CompId
      data.form.DeptId = res.data.DeptId
      data.form.PostId = res.data.PostId
    } else {
      data.form.AfterUserName = res.data.RealName
      data.form.AfterCompName = res.data.CompName
      data.form.AfterDeptName = res.data.DeptName
      data.form.AfterPostName = res.data.PostName
      data.form.AfterCompId = res.data.CompId
      data.form.AfterDeptId = res.data.DeptId
      data.form.AfterPostId = res.data.PostId
    }
  })
}

onMounted(() => {
  console.log('props.ViewType', props.ViewType)
  if (props.ViewType == 1) {
    getuserinfo()
  } else {
    getInfoById()
    data.disabled = true
  }
  GetOrderCompanyEvent()
  GetDeptAndUser()
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
