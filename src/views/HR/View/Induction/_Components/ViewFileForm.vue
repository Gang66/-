<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="data.details.info.Name + '-入职资料'" class="ViewFileForm">
    <!--  -->
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-position="left" label-width="80px" class="bf-window-padding bf-search-formItem" hide-required-asterisk>
      <div>
        <div class="flex justify-between">
          <div class="absolute cursor-pointer" style="right: 30px" @click="data.CodeFormWindow.view = true">
            <img src="/src/assets/img/hr/Induction/FileFormCode.png" alt="" class="w-16 h-16" />
            <div class="absolute top-8 -left-7">
              <p class="text-sm bf-font-blue-color">手机扫码</p>
              <p class="text-sm bf-font-blue-color">查看资料</p>
            </div>
          </div>
        </div>
        <div class="px-14">
          <div class="flex justify-evenly">
            <div>
              <el-image style="width: 188px; height: 135px" :src="remoteUrlEvent(data.details.info.IdCardFrontFilePath)" v-if="data.details.info.IdCardFrontFilePath"
                :preview-src-list="[remoteUrlEvent(data.details.info.IdCardFrontFilePath)]" fit="contain" />
              <img src="/src/assets/img/hr/Induction/FileFormUserId.png" alt="" class="userId-bg" v-else />
            </div>
            <div>
              <el-image style="width: 188px; height: 135px" :src="remoteUrlEvent(data.details.info.IdCardBackFilePath)" v-if="data.details.info.IdCardBackFilePath"
                :preview-src-list="[remoteUrlEvent(data.details.info.IdCardBackFilePath)]" fit="contain" />
              <img src="/src/assets/img/hr/Induction/FileFormUserIdTwo.png" alt="" class="userId-bg" v-else />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex items-center text-sm font-semibold mb-1 mt-1">
          <!-- <img src="/src/assets/img/hr/Induction/induction_jiao.png" alt="" style="width:16px;height:16px;"> -->
          <div class="ml-1">家庭情况</div>
        </div>
        <div class="flex">
          <div class="border w-3/12">
            <el-form-item label="姓名">
              <div class="bf-text-color-regular truncate">
                {{ data.details.info.Name }}
              </div>
            </el-form-item>
          </div>
          <div class="border w-2/5">
            <el-form-item label="出生日期">
              <div class="bf-text-color-regular truncate">
                {{ data.details.info.Birth }}
              </div>
            </el-form-item>
          </div>
          <div class="border w-1/5">
            <el-form-item label="性别">
              <div class="bf-text-color-regular truncate">
                {{ data.details.info.Sex }}
              </div>
            </el-form-item>
          </div>
          <div class="border w-1/5 border-right">
            <el-form-item label="年龄">
              <div class="bf-text-color-regular truncate">
                {{ data.details.info.Age }}
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="flex">
          <div class="border w-3/12">
            <el-form-item label="民族">
              <div class="bf-text-color-regular truncate">
                {{ data.details.info.Nationality }}
              </div>
            </el-form-item>
          </div>
          <div class="border w-2/5">
            <el-form-item label="有效期限">
              <div class="bf-text-color-regular truncate">
                {{ data.details.info.IdCardterm }}
              </div>
            </el-form-item>
          </div>
          <div class="border border-right w-2/5">
            <el-form-item label="身份证">
              <div class="bf-text-color-regular truncate">
                {{ data.details.info.IdCard }}
              </div>
            </el-form-item>
          </div>
        </div>
        <div class="border border-right w-full">
          <el-form-item label="发证机构">
            <div class="bf-text-color-regular truncate">
              {{ data.details.info.IdCardOffice }}
            </div>
          </el-form-item>
        </div>
        <div class="border border-right border-bottom w-full">
          <el-form-item label="家庭住址">
            <div class="bf-text-color-regular">
              {{ data.details.info.HomeAddress }}
            </div>
          </el-form-item>
        </div>
      </div>
      <div>
        <div class="text-sm font-semibold mb-1 mt-1">基础信息</div>
        <div>
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="手机号码">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.PhoneNumber }}
                </div>
              </el-form-item>
            </div>
            <div class="border w-1/3">
              <el-form-item label="微信号码">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.VXNumber }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-1/3">
              <el-form-item label="失信记录">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.haveNoOptions">
                    <span v-if="data.details.info.DishonestyRecord == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.DishonestyRecord=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="劳务纠纷">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.haveNoOptions">
                    <span v-if="data.details.info.LaborDispute == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.LaborDispute=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="border w-1/3">
              <el-form-item label="Q Q号码">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.QQNumber }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-1/3">
              <el-form-item label="犯罪记录">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.haveNoOptions">
                    <span v-if="data.details.info.CriminalRecord == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.CriminalRecord=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="法律纠纷">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.haveNoOptions">
                    <span v-if="data.details.info.LegalDisputes == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.LegalDisputes=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-2/3">
              <el-form-item label="电子邮箱">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.Email }}
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="开户行">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.OpeningBank }}
                </div>
              </el-form-item>
            </div>
            <div class="border w-2/3">
              <el-form-item label="银行卡号">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.BankCard }}
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="政治面貌">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.politics">
                    <span v-if="data.details.info.PoliticalOutlook == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.PoliticalOutlook=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="border w-1/3">
              <el-form-item label="社保情况">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.basicSocialInsuranceOptions">
                    <span v-if="data.details.info.SocialSecurity == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.SocialSecurity=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-1/3">
              <el-form-item label="驾照情况">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.haveNoOptions">
                    <span v-if="data.details.info.DrivingLicense == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.DrivingLicense=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="最高学历">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.education">
                    <span v-if="data.details.info.Education == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.Education=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="border w-1/3">
              <el-form-item label="居住范围">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.distanceRange">
                    <span v-if="data.details.info.LiveArea == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.LiveArea=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-1/3">
              <el-form-item label="毕业方式">
                <div class="bf-text-color-regular truncate">
                  <div v-for="item in data.graduationMode">
                    <span v-if="data.details.info.Graduation == item.DicKey">
                      <span v-show="false">
                        {{data.info.info.Graduation=item.DicValue}}
                      </span>
                      {{ item.DicValue }}</span>
                  </div>
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="籍　　贯">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.NativePlace }}
                </div>
              </el-form-item>
            </div>
            <div class="border w-1/3">
              <el-form-item label="毕业时间">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.GraduationDate }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-1/3">
              <el-form-item label="所学专业">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.Professional }}
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border border-bottom border-right w-full">
              <el-form-item label="毕业院校">
                <div class="bf-text-color-regular truncate">
                  {{ data.details.info.Colleges }}
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-sm font-semibold mb-1 mt-1">家庭情况</div>
        <div v-for="(item, index) in data.details.FamilySituations">
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="关系">
                <div class="bf-text-color-regular">
                  {{ item.FamilyRelat }}
                </div>
              </el-form-item>
            </div>
            <div class="border w-1/3">
              <el-form-item label="姓名">
                <div class="bf-text-color-regular">
                  {{ item.Name }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-1/3">
              <el-form-item label="生日">
                <div class="bf-text-color-regular">
                  {{ item.Brith }}
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/3" :class="index < 1 ? '' : 'border-bottom'">
              <el-form-item label="电话">
                <div class="bf-text-color-regular">
                  {{ item.PhoneNumber }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-2/3" :class="index < 1 ? '' : 'border-bottom'">
              <el-form-item label="职业">
                <div class="bf-text-color-regular">
                  {{ item.Profession }}
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-sm font-semibold mb-1 mt-1">紧急联系人</div>
        <div>
          <div class="flex">
            <div class="border border-bottom w-1/3">
              <el-form-item label="关系">
                <div class="bf-text-color-regular">
                  {{ data.details.info.EmergencyRelation }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-bottom w-1/3">
              <el-form-item label="姓名">
                <div class="bf-text-color-regular">
                  {{ data.details.info.EmergencyName }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-bottom border-right w-1/3">
              <el-form-item label="电话">
                <div class="bf-text-color-regular">
                  {{ data.details.info.EmergencyNumber }}
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-sm font-semibold mb-1 mt-1">职业信息</div>
        <div v-for="(item, index) in data.details.StaffProInfos" :key="index">
          <div class="flex">
            <div class="border w-1/3">
              <el-form-item label="起止时间">
                <div class="bf-text-color-regular">{{ item.InductionBeginDate }}-{{ item.InductionEndDate }}</div>
              </el-form-item>
            </div>
            <div class="border border-right w-2/3">
              <el-form-item label="公司名称">
                <div class="bf-text-color-regular">
                  {{ item.CompanyName }}
                </div>
              </el-form-item>
            </div>
          </div>
          <div class="flex">
            <div class="border w-1/2" :class="index + 1 != data.details.StaffProInfos.length ? '' : 'border-bottom'">
              <el-form-item label=" 证明人/电话" label-width="100px">
                <div class="bf-text-color-regular">
                  {{ item.QuitNameorNumber }}
                </div>
              </el-form-item>
            </div>
            <div class="border border-right w-1/2" :class="index + 1 != data.details.StaffProInfos.length ? '' : 'border-bottom'">
              <el-form-item label="离职原因">
                <div class="bf-text-color-regular trucate">
                  {{ item.QuitReason }}
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="text-sm font-semibold mb-1 mt-1">证明文件</div>
        <div>
          <el-row :gutter="10">
            <el-col :xs="12" :md="12" :lg="6">
              <div class="flex justify-between px-2 py-2 text-sm bf-text-color-regular cursor-pointer prove_bg">
                <div>学位证.png</div>
                <div class="bf-font-blue-color" @click="seeEvent(0)">查看</div>
                <el-image-viewer v-if="data.imgViewerVisible" :url-list="data.srcList" @close="data.imgViewerVisible = false" :initial-index="data.srcListIndex" fit="cover">
                </el-image-viewer>
              </div>
            </el-col>
            <el-col :xs="12" :md="12" :lg="6" v-if="data.details.info.DriveFile">
              <div class="flex justify-between px-2 py-2 text-sm bf-text-color-regular cursor-pointer prove_bg">
                <div>驾驶证.png</div>
                <div class="bf-font-blue-color" @click="seeEvent(1)">查看</div>
              </div>
            </el-col>
            <el-col :xs="12" :md="12" :lg="6" v-if="data.details.info.CertificateFile">
              <div class="flex justify-between px-2 py-2 text-sm bf-text-color-regular cursor-pointer prove_bg">
                <div>资格证书.png</div>
                <div class="bf-font-blue-color" @click="seeEvent(2)">查看</div>
              </div>
            </el-col>
            <el-col :xs="12" :md="12" :lg="6" v-if="data.details.info.OtherFile">
              <div class="flex justify-between px-2 py-2 text-sm bf-text-color-regular cursor-pointer prove_bg">
                <div>其它证.png</div>
                <div class="bf-font-blue-color" @click="seeEvent(3)">查看</div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div>
        <div class="text-sm font-semibold mb-1 mt-1">电子签名/人脸识别</div>
        <div>
          <div class="flex items-center">
            <el-image style="width: 152px; height: 32px; padding: 0 12px" @click="seeEvent(4)" class="prove_bg" :src="remoteUrlEvent(data.details.info.ElectronicSign)"
              fit="contain" v-if="data.details.info.ElectronicSign" />
            <div class="flex justify-between px-2 py-2 text-sm bf-text-color-regular cursor-pointer prove_bg" style="width: 152px; height: 32px; padding: 0 12px" v-else>
              <div class="text-center w-full text-xl">签字</div>
            </div>
            <div class="flex justify-between text-sm bf-text-color-regular cursor-pointer prove_bg ml-2" style="height: 32px; padding: 0 12px">
              <el-image :src="remoteUrlEvent(data.details.info.FaceRecognition)" fit="contain" v-if="data.details.info.FaceRecognition" @click="seeEvent(5)" />
              <el-icon class="text-center" style="width: 100%" :size="32" v-else>
                <el-icon-Avatar />
              </el-icon>
            </div>
            <div class="flex justify-between px-2 py-2 text-sm bf-text-color-regular cursor-pointer prove_bg ml-2" style="height: 32px; lineheight: 32px; padding: 0 12px">
              <div>档案信息</div>
              <div class="bf-font-blue-color ml-6" @click="data.UserProfileWindow.view = true">查看</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div>
          <el-row :gutter="10">
            <el-col :xs="12" :md="12" :lg="24">
              <div class="text-sm">以上信息由我提供，如有虚假公司有权开除。</div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div v-if="type == 1" class="text-center mt-4">
        <el-button type="primary" @click="submitForm(data.Id, 1)">通过</el-button>
        <el-button type="danger" @click="submitForm(data.Id, 2)">驳回</el-button>
      </div>
    </el-form>
  </OpenWindow>
  <!--员工档案 -->
  <UserProfile v-if="data.UserProfileWindow.view" @closeWindow="data.UserProfileWindow.view = false" :details="data.info" :DeptId="data.info.info.DeptId"></UserProfile>

  <CodeForm v-if="data.CodeFormWindow.view" @closeWindow="data.CodeFormWindow.view = false" :url="data.url" :title="data.step == 1 ? '扫码完善资料' : '扫码签字'"></CodeForm>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import OrgTreeDrawer from '../../../Components/OrgTree/drawer.vue'
import CodeForm from './CodeForm.vue'
import UserProfile from './UserProfile.vue'
import { remoteUrl } from '/@/utils/tools'
import { PostGetConfirmStaffFile } from '/@/api/hr/Induction'
const uploadRef = ref()
const imageRef = ref()
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = (Id: number, num: number) => {
    var arr = {
      Id: Id,
      State: JSON.stringify(num)
    }
    PostGetConfirmStaffFile(arr).then((res) => {
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
  // 查看数据
  const seeEvent = (num: number) => {
    data.srcList = []
    data.srcListIndex = num
    data.srcList.push(remoteUrlEvent(data.details.info.EducationFile), remoteUrlEvent(data.details.info.CertificateFile), remoteUrlEvent(data.details.info.DriveFile), remoteUrlEvent(data.details.info.OtherFile))
    if (num == 4) {
      data.srcList = []
      data.srcListIndex = 0
      data.srcList.push(remoteUrlEvent(data.details.info.ElectronicSign), remoteUrlEvent(data.details.info.FaceRecognition))
    } else if (num == 5) {
      data.srcList = []
      data.srcListIndex = 1
      data.srcList.push(remoteUrlEvent(data.details.info.ElectronicSign), remoteUrlEvent(data.details.info.FaceRecognition))
    }
    data.imgViewerVisible = true
  }
  // 上传身份证
  const submmitUserId = () => {
    console.log('建立了')
    uploadRef.value.handleStart
  }
  //   监听上传选中
  const handleChange = (val: any, _list: any) => {
    console.log(val)
  }
  //校验
  const rules = reactive<FormRules>({
    DepartIds: [{ required: true, message: '请选择事业部门', trigger: 'change' }],
    Sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    RecruitChannel: [{ required: true, message: '请选择招聘渠道', trigger: 'change' }],
    ShareExpireTime: [{ required: true, message: '请选择有效时间', trigger: 'change' }],
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
  // 根据上传文件拼接路径
  const remoteUrlEvent = (url: string) => {
    return remoteUrl(url)
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
    uploadRef,
    imageRef,
    seeEvent,
    handleChange,
    submmitUserId,
    remoteUrlEvent
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
    boxHeight: '',
    boxPaddingTop: 'pt-4',
    boxPaddingBottom: 'pb-0'
  })
  // 添加工作经历
  const addWork = () => {
    var arr = {
      time: '2020.01-2022.02',
      Name: '潍坊曙光大数据有限公司',
      aa: '',
      dd: ''
    }
    data.workList.push(arr)
  }
  return { stepEvent, boxStyle, addWork }
}
// 页面进入
const GetContractManagementInfoEvent = async (data: any) => {
  var arr = [remoteUrl(data.details.info.FilesSign), remoteUrl(data.details.info.LabourSign), remoteUrl(data.details.info.ContractSign), remoteUrl(data.details.info.CompanySystemSign)]
  data.details.info.urlList = arr
  data.info.info.urlList = arr
  if (data.Id) {
    // await GetHRInviteManagementInfo(data.Id).then((res) => {
    //   if (res.code == 1) {
    //     data.ruleForm = res.data
    //     data.url = `${import.meta.env.VITE_HR_H5}` + res.data.Id
    //     data.PathList = JSON.parse(res.data.ResumePath)
    //     console.log(data.url)
    //   } else {
    //     ElMessage.error(res.message)
    //   }
    // })
  }
  // 政治面貌
  store.getDict('hr_archive_zzmm').then((res: any) => {
    data.politics = res
  })
  // 最高学历
  store.getDict('bffm_hr_education').then((res: any) => {
    data.education = res
  })
  // 婚育情况
  store.getDict('hr_user_marriage').then((res: any) => {
    data.basicMarriage = res
  })
  // 社会保险
  store.getDict('social_security').then((res: any) => {
    data.basicSocialInsuranceOptions = res
  })
  // 距离范围
  store.getDict('register_distance_range').then((res: any) => {
    data.distanceRange = res
  })
  // 毕业方式
  store.getDict('graduation_mode').then((res: any) => {
    data.graduationMode = res
  })
  // 业务等级
  store.getDict('hr_business_grade').then((res: any) => {
    data.businessLevel = res
  })
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
    CodeForm,
    UserProfile
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    Id: {
      type: Number,
      default: null
    },
    // 1是档案确认 2是档案驳回
    type: {
      type: Number,
      default: 0
    },
    // 详情数据
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      info: {},
      url: `${import.meta.env.VITE_HR_H5}#/?uid=` + props.details.Uid,
      Id: props.Id,
      srcList: [], //图片数据
      srcListIndex: 0, //图片下标
      imgViewerVisible: false, //显示图片
      gender: [], //获取性别数据
      haveNoOptions: [], //系统设置有无
      politics: [], // 政治面貌
      education: [], //最高学历
      basicMarriage: [], // 婚育情况
      basicSocialInsuranceOptions: [], //社保情况
      distanceRange: [], //距离范围
      graduationMode: [], //毕业方式
      businessLevel: [], //业务等级
      // 员工档案
      UserProfileWindow: {
        view: false
      },
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
      // 详情数据
      details: props.details,
      // 二维码弹窗
      CodeFormWindow: {
        view: false
      },
      step: 1, //步骤
      ruleForm: {}
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    onMounted(() => {
      data.info = JSON.parse(JSON.stringify(props.details))
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return {
      data,
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

.ViewFileForm {
  :deep(.image-widht) {
    margin: auto;
  }
  :deep(.image-widht img) {
    max-height: 200px;
  }
  :deep(.bf-window-padding) {
    padding: 12px 30px;
  }
  :deep(.el-form-item__label) {
    /* font-weight: 600; */
    padding: 0 12px;
    background: #f4f6f8;
    color: var(--el-color-black);
  }
  .prove_bg {
    background: #f4f6f8;
    padding: 8px 12px;
  }
  :deep(.border) {
    border-width: 1px;
    border-bottom: 0px;
    border-right: 0px;
  }
  .border-right {
    border-right: 1px solid var(--el-border-color);
  }
  .w-99 {
    width: 99.9%;
  }
  .border-bottom {
    border-bottom: 1px solid var(--el-border-color);
  }
  :deep(.el-form-item__content) {
    padding: 0 10px;
  }
}
</style>
