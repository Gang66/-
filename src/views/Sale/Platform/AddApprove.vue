<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addapprove text-base'>
        <div class='infoclass'>
          <el-form ref='ruleFormRef' :model='formdata.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <el-form-item label='申请人员' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.UserName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='事业部' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.CompName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='职务' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.PostName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='申请时间' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.CreateOn' placeholder='请输入' class="inputwidth" />
              </el-form-item>
            </el-card>
            <el-card class='sale_card mt-2'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>平台详情</div>
                  <div class='header-right text-right'>
                  </div>
                </div>
              </template>
              <div class="infoclass pt-2">
                <el-form-item label='平台名称' prop="Name">
                  <el-input :readonly='true' v-model='formdata.form.Name' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='平台网址' prop="Website">
                  <el-input :readonly='true' v-model='formdata.form.Website' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='使用厂家' prop="CompanyId">
                  <el-select :disabled='true' v-model="formdata.form.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
                    <el-option v-for="item in formdata.Company " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='所属人员' prop="BillUserName">
                  <el-input :readonly='true' v-model='formdata.form.BillUserName' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='事业部' prop="BillComp">
                  <el-input :readonly='true' v-model='formdata.form.BillComp' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='申请理由' prop="Note">
                  <el-input :readonly='formdata.disabled' :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" v-model='formdata.form.Note' placeholder='请输入'
                    style="width:660px" />
                </el-form-item>
              </div>
            </el-card>
          </el-form>
          <div v-if="formdata.disabled==false" class="text-center pt-6">
            <el-button class="cancelbut" @click="closeWindow">
              取消
            </el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              提交
            </el-button>
          </div>
          <div>
            <template v-if="formdata.ViewType != 1">
              <!-- 审批记录 -->
              <slot name="ApprovalProcess"></slot>
              <!-- 调薪审批 -->
              <template v-if="formdata.ViewType==4">
                <el-input v-model="formdata.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
                <div class="bf-search-formItem ">
                  <div class="text-center w-full mt-4">
                    <el-button type="danger" @click="ApprovalForm(0)">驳 回</el-button>
                    <el-button type="primary" @click="ApprovalForm(1)">审 批</el-button>
                  </div>
                </div>
              </template>
            </template>
          </div>
        </div>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import { GetUserinformation } from '/@/api/layout/index'
import { PostAddPlatfromApprove, GetPlatfromApprove, PostApprovalPlatform } from '/@/api/Sale/Platfrom'
import { remoteUrl, toChies, parseTime, getTime } from '/@/utils/tools'
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
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  DataId: {
    type: Number,
    default: 0
  },
  BillId: {
    type: Number,
    default: 0
  },
  Data: {
    type: Object,
    default: {}
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增平台'
  }
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  CompanyId: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  Type: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  TypeName: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  FileName: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ]
})

const ApprovalForm = (num: number) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: formdata.Approval.remark,
    dataid: formdata.form.Id
  }
  PostApprovalPlatform(arr).then((res: any) => {
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

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      formdata.form.UserName = res.data.RealName
      formdata.form.CompName = res.data.CompName
      formdata.form.DeptName = res.data.DeptName
      formdata.form.PostName = res.data.PostName
      formdata.form.CompId = res.data.CompId
      formdata.form.DeptId = res.data.DeptId
      formdata.form.PostId = res.data.PostId
    }
  })
}

//获取报价单位
const GetOrderCompanyEvent = () => {
  GetOrderCompany().then((res) => {
    if (res.code == 1) {
      formdata.Company = res.data
    }
  })
}
const getApproveInfo = () => {
  console.log(props.Data)
  if (formdata.ViewType == 1) {
    formdata.form.Website = props.Data.Website
    formdata.form.Name = props.Data.PlatformName
    formdata.form.BillId = props.Data.Id
    formdata.form.CompanyId = props.Data.CompanyId
    formdata.form.BillUserId = props.Data.CreateBy
    formdata.form.BillUserName = props.Data.UserName
    formdata.form.BillCompId = props.Data.CompId
    formdata.form.BillComp = props.Data.CompName
  } else {
    var postdata: any = {}
    postdata.Id = props.info.Id ? props.info.Id : props.DataId
    postdata.BillId = props.BillId
    GetPlatfromApprove(postdata).then((res) => {
      if (res.code == 1) {
        formdata.form = res.data
      }
    })
  }
}
const emit = defineEmits(['closeWindow'])

const closeWindow = (type = '1') => {
  emit('closeWindow', type)
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const uploadFileData = (data: any) => {
  formdata.FileList = data
}

const formdata = <any>reactive({
  ViewType: 0,
  Approval: {
    remark: ''
  },
  form: {
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompanyId: null,
    Website: '',

    BillId: null,
    BillUserId: 0,
    BillUserName: '',
    BillCompId: 0,
    BillComp: '',
    Name: '',
    Note: '',
    Type: '',
    TypeName: '',
    FileName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CreateOn: parseTime(getTime('day'), ''),
    Amount: 0
  },
  Company: [],
  FileList: [],
  uploadShow: false,
  disabled: false
})

///提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (formdata.form.Note == '') {
        ElMessage.warning('请输入申请理由')
        return false
      }
      var postdata: any = {}
      postdata = formdata.form
      postdata.AddOrEdit = 1
      if (props.ViewType != 1) {
        postdata.AddOrEdit = 2
      }
      PostAddPlatfromApprove(postdata).then((res) => {
        if (res.code == 1) {
          if (res.data == true) {
            ElMessage.success(res.message)
            closeWindow()
          } else {
            ElMessage.error(res.message)
          }
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
    }
  })
}
onMounted(() => {
  if (props.info.viewType != 1) {
    formdata.ViewType = props.info.viewType
  } else {
    formdata.ViewType = props.ViewType
  }
  if (formdata.ViewType == 3 || formdata.ViewType == 4) {
    formdata.disabled = true
  }

  if (formdata.ViewType == 1) {
    getuserinfo()
  }

  GetOrderCompanyEvent()
  getApproveInfo()
})
</script>
<style lang="postcss" scoped>
.addapprove {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  :deep(.el-card__body) {
    padding: 0rem;
  }
  .inputwidth {
    width: 172px;
  }
  .otherinputwidth {
    width: 172px;
  }
  .infoclass {
    :deep(.el-form-item__label) {
      padding: 0 5px 0 5px;
      width: 4.45rem;
    }
  }

  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
}
</style>
