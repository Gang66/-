<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-2">
      <!-- #region  基本信息-->
      <!-- <div class="flex">
        <div class="flex-auto">
          <img class="inline-block h-4 mr-2 align-middle" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span class="text-sm">基本信息</span>
        </div>
      </div> -->
      <div class="pt-2 pb-2">
        <el-form ref='ruleFormRef' :inline="true" :model='data.information'>
          <el-form-item prop='CompanyName'>
            <el-input v-model="data.information.CompanyName" style="width: 410px; margin-right:15px" placeholder="请输入报价单位">
              <template #prepend>
                <span style="width: 68px;text-align: center;">报价单位</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Name'>
            <el-input v-model="data.information.Name" style="width: 262px;margin-right:15px" placeholder="请输入单位简称">
              <template #prepend>
                <span style="width: 68px;text-align: center;">单位简称</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='numberInput'>
            <el-input v-model="data.information.numberInput" style="width: 262px" :readonly="true" placeholder="请选择合同模板">
              <template #prepend>
                <span style="width: 68px;text-align: center;">合同模板</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Address'>
            <el-input v-model="data.information.Address" style="width: 410px;margin-right:15px" placeholder="请输入地址">
              <template #prepend>
                <span style="width: 68px;text-align: center;">地址</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Code'>
            <el-input v-model="data.information.Code" style="width: 262px;margin-right:15px" placeholder="请输入合同编码">
              <template #prepend>
                <span style="width: 68px;text-align: center;">合同编码</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Duty'>
           <el-input v-model="data.information.Duty" style="width: 262px;" placeholder="请输入税号">
              <template #prepend>
                <span style="width: 68px;text-align: center;">税号</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='LegalPerson'>
           <el-input v-model="data.information.LegalPerson" style="width: 230px; margin-right:15px" placeholder="请输入法定代表人">
              <template #prepend>
                <span style="width: 68px;text-align: center;">法定代表人</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Entrust'>
           <el-input v-model="data.information.Entrust" style="width: 230px; margin-right:15px" placeholder="请输入委托代表人">
              <template #prepend>
                <span style="width: 68px;text-align: center;">委托代表人</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Telephone'>
            <el-input v-model="data.information.Telephone" style="width: 230px; margin-right:15px" placeholder="请输入公司电话">
              <template #prepend>
                <span style="width: 68px;text-align: center;">公司电话</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Fax'>
            <el-input v-model="data.information.Fax" style="width: 230px;" placeholder="请输入公司传真">
              <template #prepend>
                <span style="width: 68px;text-align: center;">公司传真</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='PersonalTelephone'>
            <el-input v-model="data.information.PersonalTelephone" style="width: 262px;margin-right:15px" placeholder="请输入个人电话">
              <template #prepend>
                <span style="width: 68px;text-align: center;">个人电话</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='PersonalFax'>
            <el-input v-model="data.information.PersonalFax" style="width: 262px;margin-right:15px" placeholder="请输入个人传真">
              <template #prepend>
                <span style="width: 68px;text-align: center;">个人传真</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='PersonalAddress'>
            <el-input v-model="data.information.PersonalAddress" style="width: 410px;" placeholder="请输入住所">
              <template #prepend>
                <span style="width: 68px;text-align: center;">住所</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='TaxPoint'>
            <el-input v-model="data.information.TaxPoint" type="number" style="width: 262px;margin-right:15px" placeholder="请输入增值税">
              <template #prepend>
                <span style="width: 68px;text-align: center;">增值税</span>
              </template>
              <template #suffix>%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop='BankAccount'>
            <el-input v-model="data.information.BankAccount" style="width: 262px;margin-right:15px" placeholder="请输入银行账号">
              <template #prepend>
                <span style="width: 68px;text-align: center;">银行账号</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Bank'>
            <el-input v-model="data.information.Bank" style="width: 410px;" placeholder="请输入开户银行">
              <template #prepend>
                <span style="width: 68px;text-align: center;">开户银行</span>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop='GeneralTaxPoint'>
            <el-input v-model="data.information.GeneralTaxPoint" type="number" style="width: 262px;margin-right:15px" placeholder="请输入普通税">
              <template #prepend>
                <span style="width: 68px;text-align: center;">普通税</span>
              </template>
              <template #suffix>%</template>
            </el-input>
          </el-form-item>
          <el-form-item prop='Remark'>
            <el-input v-model="data.information.Remark" style="width: 687px;" placeholder="请输入">
              <template #prepend>
                <span style="width: 68px;text-align: center;">备注</span>
              </template>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <!-- #endregion -->

      <!-- #region  附件信息-->
      <div class="flex p-2 text-sm">
        <span class="mr-2 cursor-pointer text-blue-400" @click="ShowUpload">上传LOGO</span>
        <span class="cursor-pointer text-blue-400" @click="$preview(0,retviewurl(data.information.ImgUrl))" v-if="data.information.ImgUrl.length > 0">查看LOGO</span>
      </div>
      <div>
        <OpenWindow title="上传图片" :boxStyle="{boxWidth: 'w-600'}" :isShow="data.uploadShow" @closeWindow="closeData">
          <uploadimg :uploadFileData='data.information.ImgUrl' @uploadFileDataEvent='uploadFileData' @closeWindow='closeData'></uploadimg>
        </OpenWindow>
      </div>
      <!-- #endregion -->
      
      <div>
        <div class="bf-search-formItem mt-4 mb-4 float-right">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
      <!-- #endregion -->
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import { isMobileTel, isNumber } from '/@/utils/validate'
import { remoteUrl } from '/@/utils/tools'
import uploadimg from '/@/components/Upload/uploadimg.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { PostInsertEditPurchaseDemandCompanySave, GetPurchaseDemandCompanyInfo } from '/@/api/tech/Material'

const UploadImgData = (data: any) => {
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
    data.information.ImgUrl = val
    data.uploadShow = false
  }
  return {
    ShowUpload,
    retviewurl,
    closeData,
    uploadFileData
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    uploadimg
  },
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0
      }
    }
  },
  setup(props, context: SetupContext) {
    const form = reactive({
      NameId: '',
      resultsId: ''
    })
    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      incurredRadio: '',
      incurredInput: '',
      incurredChecked: false,
      // 基本信息
      information: <any>{
        Id: 0,
        Name: '',
        Address: '',
        Fax: '',
        Code: '',
        CompanyName: '',
        PersonalTelephone: '',
        TaxPoint: '',
        GeneralTaxPoint: '',
        PersonalAddress: '',
        PersonalFax: '',
        Remark: '',
        LegalPerson: '',
        Entrust: '',
        Bank: '',
        BankAccount: '',
        Telephone: '',
        Duty: '',
        ImgUrl: []
      },
      uploadShow: false,
    })

    const rules = reactive<FormRules>({
      CompanyName: [
        { required: true, message: '请输入报价单位', trigger: 'blur' },
      ],
      Name: [
        { required: true, message: '请输入单位简称', trigger: 'blur' },
      ],
      Address: [
        { required: true, message: '请输入地址', trigger: 'blur' },
      ],
      Code: [
        { required: true, message: '请输入合同编码', trigger: 'blur' },
      ],
      Duty: [
        { required: true, message: '请输入税号', trigger: 'blur' },
      ],
      LegalPerson: [
        { required: true, message: '请输入法定代表人', trigger: 'blur' },
      ],
      Entrust: [
        { required: true, message: '请输入委托代表人', trigger: 'blur' },
      ],
      Telephone: [
        { required: true, message: '请输入公司电话', trigger: 'blur' }
      ],
      Fax: [
        { required: true, message: '请输入公司传真', trigger: 'blur' },
      ],
      PersonalTelephone: [
        { required: true, message: '请输入个人电话', trigger: 'blur' },
        {
          validator: isMobileTel,
          message: '格式不正确',
          trigger: 'blur'
        }
      ],
      PersonalFax: [
        { required: true, message: '请输入个人传真', trigger: 'blur' },
      ],
      PersonalAddress: [
        { required: true, message: '请输入住所', trigger: 'blur' },
      ],
      // NameInput: [
      //   { required: true, message: '请输入增值税', trigger: 'blur' },
      // ],
      BankAccount: [
        { required: true, message: '请输入银行账号', trigger: 'blur' },
      ],
      Bank: [
        { required: true, message: '开户银行', trigger: 'blur' },
      ],
      TaxPoint: [
        { required: true, message: '请输入增值税', trigger: 'blur' },
        {
          validator: isNumber,
          message: '格式不正确',
          trigger: 'blur'
        }
      ],
      GeneralTaxPoint: [
        { required: true, message: '请输入普通税', trigger: 'blur' },
        {
          validator: isNumber,
          message: '格式不正确',
          trigger: 'blur'
        }
      ],
      Remark: [
        { required: true, message: '请输入备注', trigger: 'blur' },
      ],
    })

    const submitForm = (formEl: FormInstance | undefined) => {
      if (!formEl) return
      formEl.validate((valid) => {
        if (valid) {
          if(data.information.ImgUrl.length <= 0) {
            ElMessage.error('请上传图片')
            return false
          }

          var _data = JSON.parse(JSON.stringify(data.information))
          _data.ImgUrl = JSON.stringify(data.information.ImgUrl)
          PostInsertEditPurchaseDemandCompanySave(_data).then(res => {
            res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
            if(res.code == 1){
              closeWindow('submit')
            }
          })
        }
      })
    }

    // 回显
    const getInfo = () => {
      GetPurchaseDemandCompanyInfo(data.information.Id).then((res: any) => {
        if(res.code == 1) {
          let _data = res.data
          data.information = {
            Id: _data.Id,
            Name: _data.Name,
            Address: _data.Address,
            Fax: _data.Fax,
            Code: _data.Code,
            CompanyName: _data.CompanyName,
            LegalPerson: _data.LegalPerson,
            Entrust: _data.Entrust,
            Bank: _data.Bank,
            BankAccount: _data.BankAccount,
            Telephone: _data.Telephone,
            Duty: _data.Duty,
            PersonalTelephone: _data.PersonalTelephone,
            PersonalFax: _data.PersonalFax,
            TaxPoint: _data.TaxPoint,
            GeneralTaxPoint: _data.GeneralTaxPoint,
            PersonalAddress: _data.PersonalAddress,
            Remark: _data.Remark,
            ImgUrl: JSON.parse(_data.ImgUrl)
          }
          console.log(data.information)
        }
      })
    }

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })

    onMounted(()=>{
      data.information.Id = props.FormData.Id
      console.log(props.FormData, 888)
      if (data.information.Id > 0) {
        getInfo()
      }
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ruleFormRef,
      submitForm,
      getInfo,
      rules,
      ...UploadImgData(data),
      form
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-input-group__prepend) {
  padding: 0 10px;
}
:deep(.el-form--inline .el-form-item){
  margin-right: 0;
}
</style>
