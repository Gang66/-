<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addother text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='formdata.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <el-form-item label='添加人员' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.UserName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='所在部门' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.DeptName' placeholder='请输入' class="inputwidth" />
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
                  <div class='header-left'>报销明细</div>
                  <div class='header-right text-right'>
                  </div>
                </div>
              </template>
              <div class=" pt-2">
                <el-form-item label='公司名称' prop="CompanyId">
                  <el-select v-model="formdata.form.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
                    <el-option v-for="item in formdata.Company " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='文件类型' prop="Type">
                  <el-select v-model="formdata.form.Type" placeholder="请选择文件类型" class="otherinputwidth">
                    <el-option label="资质文件" value="资质文件"></el-option>
                    <el-option label="安全证书" value="安全证书"></el-option>
                    <el-option label="营业执照" value="营业执照"></el-option>
                    <el-option label="自定义" value="自定义"></el-option>
                  </el-select>

                </el-form-item>
                <el-form-item prop="TypeName" label='自定义' v-if="formdata.form.Type=='自定义'">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.TypeName' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>

                <el-form-item label='文件名称' prop="FileName">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.FileName' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <div class="">
                  <uploadfile :isdisabled='ViewType!=1' :uploadFileList='formdata.FileList' @uploadFileData='uploadFileData'>

                  </uploadfile>
                </div>
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
        </div>
      </div>

    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import { GetUserinformation } from '/@/api/layout/index'
import {
  PostAddOrEditQualifications,
  GetQualificationsById
} from '/@/api/Sale/Platfrom'
import { remoteUrl, toChies, parseTime, getTime } from '/@/utils/tools'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  DataId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增报价单'
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
const getCostOtherInfo = () => {
  GetQualificationsById({ Id: props.DataId }).then((res) => {
    if (res.code == 1) {
      formdata.form = res.data
      formdata.FileList = JSON.parse(res.data.FileList)
    }
  })
}
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const uploadFileData = (data: any) => {
  formdata.FileList = data
}

const formdata = reactive({
  form: {
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompanyId: null,
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
      if (formdata.FileList.length <= 0) {
        ElMessage.warning('请先上传文件')
        return false
      }
      var postdata: any = {}
      postdata = JSON.parse(JSON.stringify(formdata.form))
      postdata.FileList = JSON.stringify(formdata.FileList)

      postdata.AddOrEdit = 1
      if (props.ViewType != 1) {
        postdata.AddOrEdit = 2
      }

      PostAddOrEditQualifications(postdata).then((res) => {
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
  GetOrderCompanyEvent()
  if (props.ViewType == 1) {
    getuserinfo()
  } else {
    getCostOtherInfo()
  }
  if (props.ViewType == 3) {
    formdata.disabled = true
  }
})
</script>
<style lang="postcss" scoped>
.addother {
  :deep(.el-card__body) {
    padding: 0rem;
  }
  .inputwidth {
    width: 172px;
  }
  .otherinputwidth {
    width: 172px;
  }
  :deep(.el-form-item__label) {
    padding: 0 5px 0 5px;
    width: 4.45rem;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
}
</style>
