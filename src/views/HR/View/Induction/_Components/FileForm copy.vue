<!--
 * @Author: ZHJ
 * @Date: 2022-11-03 07:55:13
 * @LastEditTime: 2022-11-03 07:55:15
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Induction\_Components\FileForm copy.vue
 * 版权声明
-->
<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="完善入职资料">
    <!--  -->
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding" hide-required-asterisk>
      <div v-show="data.step == 1">
        <div class="flex justify-between">
          <div class="bf-font-blue-color font-semibold">请上传身份证照片</div>
          <div class="absolute right-4 cursor-pointer" @click="data.CodeFormWindow.view = true">
            <img src="/src/assets/img/hr/Induction/FileFormCode.png" alt="" class="w-16 h-16" />
            <div class="absolute top-8 -left-7">
              <p class="text-sm bf-font-blue-color">手机扫码</p>
              <p class="text-sm bf-font-blue-color">完善资料</p>
            </div>
          </div>
        </div>
        <div class="px-14 mt-5">
          <div class="flex justify-evenly">
            <div>
              <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="handleChange">
                <template #trigger>
                  <img :src="remoteUrlEvent(data.ruleForm.IdCardFrontFilePath)" alt="" class="userId-bg" v-if="data.ruleForm.IdCardFrontFilePath" />
                  <img src="/src/assets/img/hr/Induction/FileFormUserId.png" alt="" class="userId-bg" v-else />
                </template>
              </el-upload>
              <div class="text-center mt-2 bf-font-blue-color">请上传身份证正面照</div>
            </div>
            <div>
              <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="handleTwoChange">
                <img :src="remoteUrlEvent(data.ruleForm.IdCardBackFilePath)" alt="" class="userId-bg" v-if="data.ruleForm.IdCardBackFilePath" />
                <img src="/src/assets/img/hr/Induction/FileFormUserIdTwo.png" alt="" class="userId-bg" v-else />
              </el-upload>
              <div class="text-center mt-2 bf-font-blue-color">请上传身份证背面照</div>
            </div>
          </div>
        </div>
        <div class="mt-8">
          <el-row :gutter="10">
            <el-col :md="24" :lg="6">
              <el-form-item label="姓　　名" prop="Name">
                <el-input v-model="data.ruleForm.Name" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="6">
              <el-form-item label="性　　别" prop="Sex">
                <el-input v-model="data.ruleForm.Sex" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="6">
              <el-form-item label="民　　族" prop="Nationality">
                <el-input v-model="data.ruleForm.Nationality" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="6">
              <el-form-item label="年　　龄" prop="Age">
                <el-input v-model="data.ruleForm.Age" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24" :lg="12">
              <el-form-item label="身份证号" prop="IdCard">
                <el-input v-model="data.ruleForm.IdCard" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="发证机构" prop="IdCardOffice">
                <el-input v-model="data.ruleForm.IdCardOffice" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="10">
            <el-col :md="24" :lg="12">
              <el-form-item label="有效期限" prop="IdCardterm">
                <el-input v-model="data.ruleForm.IdCardterm" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="12">
              <el-form-item label="家庭地址" prop="HomeAddress">
                <el-input v-model="data.ruleForm.HomeAddress" placeholder="" :disabled="data.isEdit" />
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <div class="bf-search-formItem mt-2">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')" size="large">取 消</el-button>
              <el-button type="primary" @click="stepEvent(2)" size="large">下一步</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
      <div v-show="data.step == 2">
        <div>
          <div>
            <el-row :gutter="10">
              <el-col :md="24" :lg="6">
                <el-form-item label="手机" prop="PhoneNumber" label-width="40">
                  <el-input v-model="data.ruleForm.PhoneNumber" placeholder="请填写手机号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="微信" prop="VXNumber" label-width="40">
                  <el-input v-model="data.ruleForm.VXNumber" placeholder="请填写微信" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="QQ" prop="QQNumber" label-width="40">
                  <el-input v-model="data.ruleForm.QQNumber" placeholder="请填写QQ" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="邮箱" prop="Email" label-width="40">
                  <el-input v-model="data.ruleForm.Email" placeholder="请填写邮箱" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="24" :lg="12">
                <el-form-item label="开户行" prop="OpeningBank" label-width="70">
                  <el-input v-model="data.ruleForm.OpeningBank" placeholder="请填写手机号" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="12">
                <el-form-item label="银行卡号" prop="BankCard" label-width="40">
                  <el-input v-model="data.ruleForm.BankCard" placeholder="请填写微信" />
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="10">
              <el-col :md="24" :lg="6">
                <el-form-item label="失信记录" prop="DishonestyRecord">
                  <el-radio-group v-model="data.ruleForm.DishonestyRecord">
                    <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="劳务纠纷" prop="LaborDispute">
                  <el-radio-group v-model="data.ruleForm.LaborDispute">
                    <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="犯罪记录" prop="CriminalRecord">
                  <el-radio-group v-model="data.ruleForm.CriminalRecord">
                    <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="法律纠纷" prop="LegalDisputes">
                  <el-radio-group v-model="data.ruleForm.LegalDisputes">
                    <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                  </el-radio-group>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <div>
            <div class="bf-font-blue-color text-sm font-semibold mb-2">家庭情况</div>
            <div v-for="(item, index) in data.ruleForm.FamilySituations" :key="index">
              <el-row :gutter="10">
                <el-col :md="24" :lg="4">
                  <el-form-item label="关系" prop="FamilyRelat" label-width="40">
                    <el-input v-model="item.FamilyRelat" placeholder="请填写" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="4">
                  <el-form-item label="姓名" prop="Name" label-width="40">
                    <el-input v-model="item.Name" placeholder="请填写" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="6">
                  <el-form-item label="电话" prop="PhoneNumber" label-width="40">
                    <el-input v-model="item.PhoneNumber" placeholder="请填写" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="5">
                  <el-form-item label="生日" prop="Brith" label-width="40">
                    <el-input v-model="item.Brith" placeholder="请填写" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="5">
                  <el-form-item label="职业" prop="Profession" label-width="40">
                    <el-input v-model="item.Profession" placeholder="请填写" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <div class="bf-font-blue-color text-sm font-semibold mb-2">紧急联系人</div>
            <div>
              <el-row :gutter="10">
                <el-col :md="24" :lg="8">
                  <el-form-item label="姓　　名" prop="EmergencyName">
                    <el-input v-model="data.ruleForm.EmergencyName" placeholder="请填写" class="w-full" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="8">
                  <el-form-item label="关　　系" prop="EmergencyRelation">
                    <el-input v-model="data.ruleForm.EmergencyRelation" placeholder="请填写" class="w-full" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="8">
                  <el-form-item label="联系方式" prop="EmergencyNumber">
                    <el-input v-model="data.ruleForm.EmergencyNumber" placeholder="请填写" class="w-full" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <div class="flex w-full justify-between">
              <div class="bf-font-blue-color text-sm font-semibold mb-2">职业信息</div>
              <div class="bf-font-blue-color text-sm cursor-pointer" @click="addWork">添加职业信息</div>
            </div>
            <div>
              <el-row :gutter="10" v-for="(item, index) in data.ruleForm.StaffProInfos" :key="index">
                <el-col :md="24" :lg="8">
                  <el-date-picker v-model="item.time" type="daterange" value-format="YYYY-MM-DD" range-separator="于" start-placeholder="在职开始时间" end-placeholder="在职结束时间"
                    style="width: 230px" @change="dateTimeChange($event,item)" />
                  <!-- <div class="text-sm bf-text-color-regular" style="line-height:32px;">{{item.InductionBeginDate}}-{{item.InductionEndDate}}</div> -->
                </el-col>
                <el-col :md="24" :lg="6">
                  <el-form-item label="" prop="QuitReason" label-width="0">
                    <el-input v-model="item.CompanyName" placeholder="请填写离职公司" class="w-full" />
                  </el-form-item>
                  <!-- <div class="flex">
                    <div class="text-sm bf-text-color-regular truncate" style="line-height:32px;">{{item.CompanyName}}</div>
                  </div> -->
                </el-col>
                <el-col :md="24" :lg="5">
                  <el-form-item label="" prop="QuitReason" label-width="0">
                    <el-input v-model="item.QuitReason" placeholder="请填写离职原因" class="w-full" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="5">
                  <el-form-item label="" prop="QuitNameorNumber" label-width="0">
                    <el-input v-model="item.QuitNameorNumber" placeholder="证明人及联系方式" class="w-full" />
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div>
            <div class="bf-font-blue-color text-sm font-semibold mb-2">证明文件上传</div>
            <div>
              <el-row :gutter="10">
                <el-col :md="24" :lg="6">
                  <el-form-item label="学历证明" prop="EducationFile">
                    <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="EducationFileHandleChange">
                      <div class="bf-remove-input-disabled-bg">
                        <el-input v-model="data.ruleForm.EducationFile" placeholder="选择文件" disabled />
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="6">
                  <el-form-item label="资格证书" prop="CertificateFile">
                    <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="CertificateFileHandleChange">
                      <div class="bf-remove-input-disabled-bg">
                        <el-input v-model="data.ruleForm.CertificateFile" placeholder="选择文件" disabled />
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="6">
                  <el-form-item label="驾驶证" prop="DriveFile">
                    <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="DriveFileHandleChange">
                      <div class="bf-remove-input-disabled-bg">
                        <el-input v-model="data.ruleForm.DriveFile" placeholder="选择文件" disabled />
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="6">
                  <el-form-item label="其它文件" prop="OtherFile">
                    <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="OtherFileHandleChange">
                      <div class="bf-remove-input-disabled-bg">
                        <el-input v-model="data.ruleForm.OtherFile" placeholder="选择文件" disabled />
                      </div>
                    </el-upload>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="bf-warning-color text-center cursor-pointer" @click="data.CodeFormWindow.view = true">请点击此处，扫码电子签名</div>
        </div>
        <div class="bf-search-formItem mt-4">
          <el-form-item class="justify-center" label-width="0">
            <div class="text-center w-full">
              <el-button @click="stepEvent(1)" size="large">上一步</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)" size="large">提 交</el-button>
            </div>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </OpenWindow>
  <CodeForm v-if="data.CodeFormWindow.view" @closeWindow="data.CodeFormWindow.view = false" :title="data.step == 1 ? '扫码完善资料' : '扫码签字'"></CodeForm>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import OrgTreeDrawer from '../../../Components/OrgTree/drawer.vue'
import { remoteUrl } from '/@/utils/tools'
import CodeForm from './CodeForm.vue'
import { PostStaffEnrollmentfile } from '/@/api/hr/Induction'
import { Postidcard, PostUploadFile } from '/@/api/upload/upload'
const uploadRef = ref()
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, num: number) => {
    data.step = num
    PostStaffEnrollmentfile(data.ruleForm).then((res) => {
      if (res.code == 1) {
        if (num != 2) {
          ElMessage({
            message: res.message,
            type: 'success'
          })
        }
        if (num) {
          return
        }
        closeWindow('submit')
      } else {
        ElMessage.error(res.message)
      }
    })
    // if (!formEl) return
    // await formEl.validate((valid, fields) => {
    //   if (valid) {
    //     data.step = num
    //     PostStaffEnrollmentfile(data.ruleForm).then((res) => {
    //       if (res.code == 1) {
    //         if (num != 2) {
    //           ElMessage({
    //             message: res.message,
    //             type: 'success'
    //           })
    //         }
    //         if (num) {
    //           return
    //         }
    //         closeWindow('submit')
    //       } else {
    //         ElMessage.error(res.message)
    //       }
    //     })
    //   }
    // })
  }
  // 身份证识别
  const PostidcardEvent = (arr: any) => {
    Postidcard(arr).then((res) => {
      if (res.code == 1) {
        data.ruleForm = Object.assign(data.ruleForm, res.data)
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 上传文件
  const PostUploadFileEvent = (type: string) => {
    var arr = {
      file: '',
      side: type
    }
    var fileData = new FormData()
    if (type == 'front') {
      fileData.append('files', data.UserIdFront.raw)
    } else if (type == 'back') {
      fileData.append('files', data.UserIdBack.raw)
    } else if (type == 'Education') {
      fileData.append('files', data.Education.raw)
    } else if (type == 'CertificateFile') {
      fileData.append('files', data.CertificateFile.raw)
    } else if (type == 'DriveFile') {
      fileData.append('files', data.DriveFile.raw)
    } else if (type == 'OtherFile') {
      fileData.append('files', data.OtherFile.raw)
    }
    PostUploadFile({ type: 'HR', data: fileData }).then((res) => {
      if (res.code == 1) {
        res.data.PathList.forEach((val: any) => {
          if (val.State) arr.file = val.Path
        })
        if (type == 'front') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.IdCardFrontFilePath = val.Path
          })
          PostidcardEvent(arr)
        } else if (type == 'back') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.IdCardBackFilePath = val.Path
          })
          PostidcardEvent(arr)
        } else if (type == 'Education') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.EducationFile = val.Path
          })
        } else if (type == 'CertificateFile') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.CertificateFile = val.Path
          })
        } else if (type == 'DriveFile') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.DriveFile = val.Path
          })
        } else if (type == 'OtherFile') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.OtherFile = val.Path
          })
        }
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 根据上传文件拼接路径
  const remoteUrlEvent = (url: string) => {
    return remoteUrl(url)
  }
  //监听身份证正面上传选中
  const handleChange = (val: any, _list: any) => {
    data.UserIdFront = val
    PostUploadFileEvent('front')
  }
  // 监听身份证背面照
  const handleTwoChange = (val: any) => {
    data.UserIdBack = val
    PostUploadFileEvent('back')
  }
  //监听学历证明
  const EducationFileHandleChange = (val: any, _list: any) => {
    data.Education = val
    PostUploadFileEvent('Education')
  }
  //监听资格证书
  const CertificateFileHandleChange = (val: any, _list: any) => {
    data.CertificateFile = val
    PostUploadFileEvent('CertificateFile')
  }
  //监听驾驶证
  const DriveFileHandleChange = (val: any, _list: any) => {
    data.DriveFile = val
    PostUploadFileEvent('DriveFile')
  }
  //监听其它文件
  const OtherFileHandleChange = (val: any, _list: any) => {
    data.OtherFile = val
    PostUploadFileEvent('OtherFile')
  }
  const dateTimeChange = (val: any, item: any) => {
    item.InductionBeginDate = val[0]
    item.InductionEndDate = val[1]
  }

  //校验
  const rules = reactive<FormRules>({
    Name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
    Sex: [{ required: true, message: '请填写性别', trigger: 'blur' }],
    Nationality: [{ required: true, message: '请填写民族', trigger: 'blur' }],
    IdCard: [{ required: true, message: '请填写身份证号', trigger: 'blur' }],
    Age: [{ required: true, message: '请填写年龄', trigger: 'blur' }],
    IdCardOffice: [{ required: true, message: '请填写发证机构', trigger: 'blur' }],
    IdCardterm: [{ required: true, message: '请填写有效期限', trigger: 'blur' }],
    HomeAddress: [{ required: true, message: '请填写家庭地址', trigger: 'blur' }]
  })
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
    uploadRef,
    EducationFileHandleChange,
    CertificateFileHandleChange,
    DriveFileHandleChange,
    OtherFileHandleChange,
    handleChange,
    handleTwoChange,
    PostidcardEvent,
    remoteUrlEvent,
    dateTimeChange
  }
}
// 窗口事件
const window = (data: any) => {
  // 步骤
  const stepEvent = (num: number) => {
    data.step = num
  }
  // 页面样式
  const boxStyle = reactive({
    boxWidth: 'w-760',
    boxHeight: ''
  })

  return { stepEvent, boxStyle }
}
// 页面进入
const GetContractManagementInfoEvent = async (data: any) => {
  if (JSON.stringify(data.details) != '{}') {
    if (data.details.info) data.ruleForm = data.details.info
    data.ruleForm.StaffId = data.ruleForm.Id
    if (!data.details.FamilySituations) {
      data.ruleForm.FamilySituations = [
        {
          FamilyRelat: '',
          Name: '',
          Brith: '',
          PhoneNumber: '',
          Profession: ''
        },
        {
          FamilyRelat: '',
          Name: '',
          Brith: '',
          PhoneNumber: '',
          Profession: ''
        }
      ]
    } else {
      data.ruleForm.FamilySituations = data.details.FamilySituations
    }
    if (!data.details.StaffProInfos) {
      data.ruleForm.StaffProInfos = [
        {
          CompanyName: '',
          InductionBeginDate: '',
          InductionEndDate: '',
          QuitReason: '',
          QuitNameorNumber: ''
        }
      ]
    } else {
      data.ruleForm.StaffProInfos = data.details.StaffProInfos
      data.ruleForm.StaffProInfos.forEach((element: any) => {
        element.time = [element.InductionBeginDate, element.InductionEndDate]
      })
    }
  }
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
  // 系统有无（驾照情况）
  store.getDict('sys_have_no').then((res: any) => {
    data.haveNoOptions = res
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    OrgTreeDrawer,
    CodeForm
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    Id: {
      type: Number,
      default: null
    },
    // 详情数据
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      Type: '',
      // 身份证正面
      UserIdFront: {
        PathList: '' //图片路径
      },
      // 身份证背面
      UserIdBack: {
        PathList: '' //图片路径
      },
      Education: {}, //学历证明
      CertificateFile: {}, //资格证书
      DriveFile: {}, //驾驶证
      OtherFile: {}, //其他文件
      // （true不 false是 是否修改）
      isEdit: true,
      //工作经历
      workList: [
        {
          time: '2020.01-2022.02',
          Name: '潍坊曙光大数据有限公司',
          aa: '',
          dd: ''
        },
        {
          time: '2020.01-2022.02',
          Name: '潍坊曙光大数据有限公司',
          aa: '',
          dd: ''
        }
      ],
      // 二维码弹窗
      CodeFormWindow: {
        view: false
      },
      step: 1, //步骤
      ruleForm: {
        StaffId: props.Id,
        HomeAddress: '',
        Birth: '',
        IdCardterm: '',
        IdCard: '',
        Name: '',
        Nationality: '',
        IdCardOffice: '',
        Sex: '',
        // 家庭情况
        FamilySituations: [
          {
            FamilyRelat: '',
            Name: '',
            Brith: '',
            PhoneNumber: '',
            Profession: ''
          },
          {
            FamilyRelat: '',
            Name: '',
            Brith: '',
            PhoneNumber: '',
            Profession: ''
          }
        ],
        // 职业信息
        StaffProInfos: [
          {
            CompanyName: '',
            InductionBeginDate: '',
            InductionEndDate: '',
            QuitReason: '',
            QuitNameorNumber: ''
          }
        ]
      },
      // 详情
      details: props.details,
      // 查看详情Id
      url: props.Id,
      haveNoOptions: [] //系统有无
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 添加工作经历
    const addWork = () => {
      var arr = {
        QuitReason: '',
        CompanyName: '',
        QuitNameorNumber: ''
      }
      data.ruleForm.StaffProInfos.push(arr)
    }
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return {
      data,
      addWork,
      closeWindow,
      ...formEvent(data, closeWindow),
      ...window(data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.userId-bg {
  width: 188px;
  height: 135px;
}
:deep(.el-upload--picture-card) {
  width: 100%;
  height: 100%;
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  display: none;
}
:deep(.el-radio) {
  margin-right: 10px;
}
:deep(.el-radio .el-radio--large) {
  height: 0;
}
:deep(.el-form-item__label) {
  font-weight: bold;
  color: var(--el-text-color-primary);
}
</style>
