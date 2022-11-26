<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addPlatform text-base'>
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
                  <div class='header-left'>基本信息</div>
                  <div class='header-right text-right'></div>
                </div>
              </template>
              <div class="pt-2">
                <el-form-item label='平台名称' prop="PlatformName">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.PlatformName' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='平台网址' prop="Website">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.Website' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='平台电话' prop="Telephone">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.Telephone' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='平台账号' prop="Account">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.Account' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='平台密码' prop="Password">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.Password' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='使用厂家' prop="Urgency">
                  <el-select :disabled='formdata.disabled' @change="getzizhi" v-model="formdata.form.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
                    <el-option v-for="item in formdata.Company " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label='联系人员' prop="Contact">
                  <el-select :disabled='formdata.disabled' filterable @change="userchangr" v-model="formdata.form.Contact" placeholder="请选择联系人员" class="otherinputwidth">
                    <el-option v-for="item in formdata.alluser " :key="item.Id" :label="item.RealName" :value="item.UserId"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label='留用手机' prop="MobilePhone">
                  <el-input :readonly='true' v-model='formdata.form.MobilePhone' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='留用邮箱' prop="MailBox">
                  <el-input :readonly='true' v-model='formdata.form.MailBox' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='留用固话' prop="FixedLine">
                  <el-input :readonly='formdata.disabled' v-model='formdata.form.FixedLine' placeholder='请输入' class="otherinputwidth" />
                </el-form-item>
                <el-form-item label='申请公章' prop="Urgency">
                  <el-switch :disabled='formdata.disabled' v-model="formdata.form.IsSeal" />
                </el-form-item>
              </div>

            </el-card>

            <el-card class='sale_card mt-2'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>委托书</div>
                  <div class='header-right text-right'></div>
                </div>
              </template>
              <div>
                <div :class="formdata.disabled?'':'-mt-8'">
                  <uploadfile :isdisabled='formdata.disabled' :uploadFileList='formdata.FileList' @uploadFileData='uploadFileData'></uploadfile>
                </div>

              </div>
            </el-card>
            <el-card class='sale_card mt-2' v-if="formdata.disabled==false">
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>借鉴资料</div>
                  <div class='header-right text-right'></div>
                </div>
              </template>
              <div class="p-4">
                <ul class="ulstyle flex">
                  <li class="libox " v-for="(item,index) in formdata.zizhiList" :key="'img'+index">
                    <div style=" overflow: hidden;">
                      <img v-if="item.type!='other'" class="imgbox" :src="remoteUrl(item.url)" />

                      <svg-icon v-else icon-class="svg-word" style="font-size: 124px;" />

                      {{item.name}}
                    </div>

                    <div class="but">
                      <div class="but-box">

                        <span @click="viewfile(item)" style="margin: 0 10px;" title="查看图片">
                          <el-icon-Download class='w-8 h-8' />

                        </span>

                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </el-card>

          </el-form>
          <div v-if="formdata.disabled==false" class="text-center pt-6">
            <el-button class="cancelbut" @click="submitForm(ruleFormRef,0)">
              保存
            </el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef,1)">
              提交
            </el-button>
          </div>
           <div>
            <template v-if="props.ViewType != 1">
              <!-- 审批记录 -->
              <slot name="ApprovalProcess"></slot>
            </template>
          </div>
        </div>
      </div>

    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import { isMobileTel, isEmail, isNumber, isTel } from '/@/utils/validate'
import { GetUserinformation, GetAllUserList } from '/@/api/layout/index'
import { GetQualificationsByCompanyId, PostAddOrEditPlatfrom, GetPlatfromById } from '/@/api/Sale/Platfrom'
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
  PlatformName: [
    {
      required: true,
      message: '请输入平台名称',
      trigger: 'change'
    }
  ],
  Website: [
    {
      required: true,
      message: '请输入平台网址',
      trigger: 'change'
    }
  ],
  Telephone: [
    {
      required: true,
      message: '请输入平台电话',
      trigger: 'change'
    }
  ],
  Account: [
    {
      required: true,
      message: '请输入平台账号',
      trigger: 'change'
    }
  ],
  Password: [
    {
      required: true,
      message: '请输入平台密码',
      trigger: 'change'
    }
  ],
  CompanyId: [
    {
      required: true,
      message: '请选择使用厂家',
      trigger: 'change'
    }
  ],
  Contact: [
    {
      required: true,
      message: '请选择联系人员',
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

const getalluser = () => {
  GetAllUserList().then((res) => {
    if (res.code == 1) {
      formdata.alluser = res.data
    }
  })
}

const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}

const viewfile = (val: any) => {
  var a = document.createElement('a') //生成一个a元素
  var event = new MouseEvent('click') //创建一个单击事件
  a.download = val.name || 'pic' //设置图片名称
  a.target = '_blank'
  // 设置图片地址
  a.href = remoteUrl(remoteUrl(val.url))
  a.dispatchEvent(event) //触发a的单击事件
}
const userchangr = () => {
  var user: any = formdata.alluser.find((f: any) => f.UserId == formdata.form.Contact)
  if (user) {
    formdata.form.MobilePhone = user.PhoneNumber
    formdata.form.MailBox = user.Email
  }
}
const getzizhi = () => {
  GetQualificationsByCompanyId({ Id: formdata.form.CompanyId }).then((res) => {
    if (res.code == 1) {
      var data = res.data
      var retlist: any = []
      if (data.length > 0) {
        data.forEach((f: any) => {
          var list = JSON.parse(f.FileList)
          list.forEach((l: any) => {
            var item: any = {}
            item.url = l.url
            item.name = f.FileName
            item.type = 'other'
            var name = l.name.toLowerCase()
            if (name.includes('.img') || name.includes('.jpg') || name.includes('.jpeg') || name.includes('.png')) {
              item.type = 'img'
            }
            retlist.push(item)
          })
        })
      }
      formdata.zizhiList = retlist
      console.log('formdata.zizhiList', formdata.zizhiList)
    }
  })
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
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CreateOn: parseTime(getTime('day'), ''),
    PlatformName: '', //平台名称
    Website: '', //平台网址
    Telephone: '', //平台电话
    Account: '', //平台账号
    Password: '', //平台密码
    CompanyId: null, //使用厂家
    Contact: null, //联系人员
    MobilePhone: '', //留用手机
    MailBox: '', //留用邮箱
    FixedLine: '', //留用固话
    IsSeal: false //申请公章
  },
  alluser: [],
  zizhiList: [],
  Company: [], //平台列表
  FileList: [],
  rowIndex: -1,
  uploadShow: false,
  disabled: false
})

///提交
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var postdata: any = {}
      postdata = JSON.parse(JSON.stringify(formdata.form))
      postdata.FileList = JSON.stringify(formdata.FileList)
      postdata.State = type

      postdata.AddOrEdit = 1
      if (props.ViewType != 1) {
        postdata.AddOrEdit = 2
      }
      PostAddOrEditPlatfrom(postdata).then((res) => {
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

const GetPlatfromByIdEvent = () => {
  GetPlatfromById({ Id: props.DataId }).then((res) => {
    if (res.code == 1) {
      formdata.form = res.data
      formdata.FileList = JSON.parse(res.data.FileList)
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
onMounted(() => {
  GetOrderCompanyEvent()
  getalluser()
  if (props.ViewType == 1) {
    getuserinfo()
  } else {
    GetPlatfromByIdEvent()
  }
  if (props.ViewType == 3) {
    formdata.disabled = true
  }
})
</script>
<style lang="postcss" scoped>
.addPlatform {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  .tableclass {
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: #fff;
    }
    :deep(.el-table .cell) {
      padding: 0px;
      text-align: center;
    }
    .el-form-item {
      margin-bottom: 0px;
      width: 100%;
      .el-form-item__content {
        .el-input {
          :deep(.el-input__wrapper) {
            box-shadow: none;
          }
        }
        .el-textarea {
          :deep(.el-textarea__inner) {
            box-shadow: none;
          }
        }
      }
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
  :deep(.el-form-item__label) {
    padding: 0 5px 0 5px;
    width: 4.45rem;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  .ulstyle {
    li:hover {
      .but {
        visibility: visible;
      }
    }
  }
  .libox {
    width: 130px;
    height: 145px;
    overflow: hidden;
    padding: 5px;
    position: relative;
    .imgbox {
      width: 120px;
      height: 120px;
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      -o-object-fit: cover;
      object-fit: cover;
    }

    .but {
      height: 120px;
      visibility: hidden;
      position: absolute;
      top: 5px;
      right: 5px;
      bottom: 5px;
      left: 5px;
      border-radius: 6px;
      background-color: rgba(0, 0, 0, 0.5);
      display: flex;

      .but-box {
        width: 100%;
        align-self: center;
        text-align: center;
        font-size: 24px;
        color: #fff;
        cursor: pointer;

        span {
          display: inline-block;
        }
        .btn-del {
          position: absolute;
          top: -1px;
          right: 1px;
        }
      }
    }
  }
}
</style>
