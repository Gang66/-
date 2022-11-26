<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addass text-base' v-loading="modelLoding" element-loading-text="Loading...">
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>

            <el-card class='sale_card '>
              <el-form-item label='品牌名称' prop="Rename">
                <el-input :readonly='data.disabled' v-model='data.form.Rename' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='品牌简称' prop="Name">
                <el-input :readonly='data.disabled' v-model='data.form.Name' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='联系电话' prop="Telephone">
                <el-input :readonly='data.disabled' v-model='data.form.Telephone' placeholder='请输入' class="inputwidth" />
              </el-form-item>

              <el-form-item label='地址' prop="Address">
                <el-input :readonly='data.disabled' v-model='data.form.Address' placeholder='请输入' style="width:410px" />
              </el-form-item>
              <el-form-item label='邮编' prop="PostalCode">
                <el-input :readonly='data.disabled' v-model='data.form.PostalCode' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='传真' prop="Fax">
                <el-input :readonly='data.disabled' v-model='data.form.Fax' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='邮箱' prop="Email">
                <el-input :readonly='data.disabled' v-model='data.form.Email' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='法定代表' prop="LegalPerson">
                <el-input :readonly='data.disabled' v-model='data.form.LegalPerson' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='委托代理' prop="Entrust">
                <el-input :readonly='data.disabled' v-model='data.form.Entrust' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='银行' prop="Bank">
                <el-input :readonly='data.disabled' v-model='data.form.Bank' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='银行账户' prop="BankAccount">
                <el-input :readonly='data.disabled' v-model='data.form.BankAccount' placeholder='请输入' class="inputwidth" />
              </el-form-item>

              <div class="flex justify-end p-2">
                <span v-if="!data.disabled" class="mr-2 cursor-pointer text-blue-400" @click="ShowUpload">上传封面</span>
                <span class="cursor-pointer text-blue-400" @click="$preview(0,retviewurl(data.form.ImgUrl))">查看封面</span>
              </div>

            </el-card>
          </el-form>
          <div v-if="data.disabled==false" class="text-center pt-6">
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
    <el-dialog v-model="data.uploadShow" v-if="data.uploadShow" width="600px" :append-to-body='true'>
      <uploadimg :uploadFileData='data.form.ImgUrl' @uploadFileDataEvent='uploadFileData' @closeWindow='closeData'></uploadimg>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import uploadimg from '/@/components/Upload/uploadimg.vue'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { PostAddCompany, GetCompanyInfo } from '/@/api/Sale/CustomerOder'
import { remoteUrl } from '/@/utils/tools'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { isMobileTel, isEmail } from '/@/utils/validate'
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
    default: '考核设置'
  }
})

//#region 上传查看
const retviewurl = (list: any) => {
  var retlist: any = []
  if (list.length > 0) {
    list.forEach((f: any) => {
      var item = remoteUrl(f.Path)
      retlist.push(item)
    })
  }
  return retlist
}
const ShowUpload = () => {
  data.uploadShow = true
}
const closeData = (val: any) => {
  data.uploadShow = false
}

const uploadFileData = (val: any) => {
  data.form.ImgUrl = val
  data.uploadShow = false
}

//#endregion
const modelLoding = ref(true)
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Rename: [
    {
      required: true,
      message: '请输入品牌名称',
      trigger: 'change'
    }
  ],
  Name: [
    {
      required: true,
      message: '请输入品牌简称',
      trigger: 'change'
    }
  ],
  Telephone: [
    {
      required: true,
      message: '请选入联系电话',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  Address: [
    {
      required: true,
      message: '请输入地址',
      trigger: 'change'
    }
  ],
  PostalCode: [
    {
      required: true,
      message: '请输入邮编',
      trigger: 'change'
    }
  ],
  Fax: [
    {
      required: true,
      message: '请输入传真',
      trigger: 'change'
    }
  ],
  Email: [
    {
      required: true,
      message: '请输入邮箱',
      trigger: 'change'
    },
    {
      validator: isEmail,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  LegalPerson: [
    {
      required: true,
      message: '请输入法定代表',
      trigger: 'change'
    }
  ],
  Entrust: [
    {
      required: true,
      message: '请输入委托代理',
      trigger: 'change'
    }
  ],
  Bank: [
    {
      required: true,
      message: '请输入银行',
      trigger: 'change'
    }
  ],
  BankAccount: [
    {
      required: true,
      message: '请输入银行账户',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data: any = reactive({
  uploadShow: false,
  disabled: false,
  form: {
    Id: 0,
    CreateName: '',
    Name: '',
    Address: '',
    PostalCode: '',
    Fax: '',
    Email: '',
    website: '',
    Rename: '',
    Code: '',
    LegalPerson: '',
    Entrust: '',
    Bank: '',
    BankAccount: '',
    Telephone: '',
    Duty: '',
    ImgUrl: []
  }
})

// 获取详情信息
const getCostSampleInfo = () => {
  GetCompanyInfo({ DataId: props.DataId }).then((res) => {
    if (res.code == 1) {
      data.form = res.data
      if (data.form.ImgUrl) {
        data.form.ImgUrl = JSON.parse(res.data.ImgUrl)
      }

      modelLoding.value = false
    }
  })
}

///提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    console.log(valid, fields)
    if (valid) {
      if (data.form.ImgUrl.length <= 0) {
        ElMessage.warning('请先上传封面')
        return false
      }
      let dataInfo: any = {}
      for (let itm in data.form) {
        if (itm == 'ImgUrl') {
          dataInfo.ImgUrl = JSON.stringify(data.form[itm])
        } else {
          dataInfo[itm] = data.form[itm]
        }
      }
      console.log(dataInfo)
      PostAddCompany(dataInfo).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          closeWindow()
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      ElMessage.warning('请检查表单内容是否填写完整')
    }
  })
}

onMounted(() => {
  if (props.ViewType == 3) {
    data.disabled = true
  }
  if (props.ViewType == 1) {
    modelLoding.value = false
    // getuserinfo()
  } else {
    getCostSampleInfo()
  }
})
</script>
<style lang="postcss" scoped>
.addass {
  :deep(.el-card__body) {
    padding: 0rem;
  }
  .inputwidth {
    width: 170px;
  }
  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 4.45rem;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
}
</style>
