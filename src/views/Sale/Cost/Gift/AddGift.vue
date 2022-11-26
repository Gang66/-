<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addgift text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <el-form-item label='申请人' prop="UserName">
                <el-input :readonly='true' v-model='data.form.UserName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='事业部' prop="CompName">
                <el-input :readonly='true' v-model='data.form.CompName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='申请时间' prop="CreateOn">
                <el-input :readonly='true' v-model='data.form.CreateOn' placeholder='请输入' class="inputwidth" />
              </el-form-item>
            </el-card>
            <el-card class='sale_card mt-2'>
              <el-form-item label='受赠单位' prop="CustomerName">
                <el-input :readonly='data.disabled' v-model='data.form.CustomerName' placeholder='请输入' style="width:410px" />
              </el-form-item>
              <el-form-item label='申请费用' prop="Amount">
                <el-input :readonly='data.disabled' type="number" v-model='data.form.Amount' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='礼品数量' prop="GiftNum">
                <el-input :readonly='data.disabled' type="number" v-model='data.form.GiftNum' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='礼品单位' prop="Unit">
                <el-input :readonly='data.disabled' v-model='data.form.Unit' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='需求时间' prop="UsingTime">
                <el-date-picker :readonly='data.disabled' v-model="data.form.UsingTime" type="date" placeholder="请选择" style="width: 170px;" />
              </el-form-item>
              <el-form-item label='礼品用途' prop="Note">
                <el-input :readonly='data.disabled' :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" v-model='data.form.Note' placeholder='请输入' style="width:653px" />
              </el-form-item>
              <div class="flex justify-end p-2">
                <span v-if="data.disabled==false" class="mr-2 cursor-pointer text-blue-400" @click="ShowUpload">上传举证</span>
                <span class="cursor-pointer text-blue-400" @click="$preview(0,retviewurl(data.form.ImgUrl))">查看举证</span>
              </div>

            </el-card>
          </el-form>
          <div v-if="data.disabled==false" class="text-center pt-6">
            <el-button class="cancelbut" @click="submitForm(ruleFormRef,0)">
              保存
            </el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef,1)">
              提交
            </el-button>
          </div>
          <div>
            <template v-if="data.ViewType != 1">
              <!-- 审批记录 -->
              <slot name="ApprovalProcess"></slot>
              <!-- 审批 -->
              <template v-if="data.ViewType==4">
                <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
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
    <el-dialog v-model=" data.uploadShow" v-if=" data.uploadShow" width="600px" :append-to-body='true'>
      <uploadimg :uploadFileData='data.form.ImgUrl' @uploadFileDataEvent='uploadFileData'></uploadimg>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { GetCostGiftById, PostAddOrEditGift, PostApprovalCostGift } from '/@/api/Sale/Cost'
import { GetUserinformation } from '/@/api/layout/index'
import uploadimg from '/@/components/Upload/uploadimg.vue'
import CusDialog from '../../Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { remoteUrl, toChies, parseTime, getTime } from '/@/utils/tools'
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
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '礼品费'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  CustomerName: [
    {
      required: true,
      message: '请录入受赠单位',
      trigger: 'change'
    }
  ],
  GiftNum: [
    {
      required: true,
      message: '请输入礼品数量',
      trigger: 'change'
    }
  ],
  Unit: [
    {
      required: true,
      message: '请输入礼品单位',
      trigger: 'change'
    }
  ],
  UsingTime: [
    {
      required: true,
      message: '请选择需求时间',
      trigger: 'change'
    }
  ],
  Note: [
    {
      required: true,
      message: '请输入礼品用途',
      trigger: 'change'
    }
  ],
  Amount: [
    {
      required: true,
      message: '请输入申请费用',
      trigger: 'change'
    }
  ]
})
onMounted(() => {
  if (props.info.viewType != 1) {
    data.ViewType = props.info.viewType
  } else {
    data.ViewType = props.ViewType
  }
  if (data.ViewType == 3 || data.ViewType == 4) {
    data.disabled = true
  }

  if (data.ViewType == 1) {
    getuserinfo()
  } else {
    getCostGiftInfo()
  }
})

const ApprovalForm = (num: number) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: data.Approval.remark,
    dataid: data.form.Id
  }
  PostApprovalCostGift(arr).then((res: any) => {
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
const data = reactive({
  ViewType: 1,
  Approval: {
    remark: ''
  },
  form: {
    Id: 0,
    CustomerName: '',
    GiftNum: null,
    Amount: null,
    Unit: '',
    Note: '',
    UsingTime: '',
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    ImgUrl: [],
    CreateOn: parseTime(getTime('day'), '')
  },
  disabled: false,
  uploadShow: false
})

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      data.form.UserName = res.data.RealName
      data.form.CompName = res.data.CompName
      data.form.DeptName = res.data.DeptName
      data.form.PostName = res.data.PostName
      data.form.CompId = res.data.CompId
      data.form.DeptId = res.data.DeptId
      data.form.PostId = res.data.PostId
    }
  })
}

const retviewurl = (list: any) => {
  var retlist: any = []
  if (list.length > 0) {
    list.forEach((f: any) => {
      var item = remoteUrl(f.Path)
      retlist.push(item)
    })
  }
  console.log('retlist', retlist)
  return retlist
}
const ShowUpload = () => {
  data.uploadShow = true
}

const uploadFileData = (val: any) => {
  data.form.ImgUrl = val
  data.uploadShow = false
}

///提交
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var postdata: any = {}
      postdata = JSON.parse(JSON.stringify(data.form))
      if (postdata.ImgUrl.length > 0) {
        postdata.ImgUrl = JSON.stringify(postdata.ImgUrl)
      } else {
        ElMessage.warning('请先上传凭证')
        return false
      }

      postdata.State = type

      postdata.AddOrEdit = 1
      if (data.ViewType != 1) {
        postdata.AddOrEdit = 2
      }
      PostAddOrEditGift(postdata).then((res) => {
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
      //ElMessage.warning('报销项目，用途说明及金额为必填项目')
    }
  })
}
const getCostGiftInfo = () => {
  var Id = props.info.Id ? props.info.Id : props.DataId
  GetCostGiftById({ Id: Id }).then((res) => {
    if (res.code == 1) {
      var getdata = res.data
      getdata.ImgUrl = JSON.parse(getdata.ImgUrl)
      data.form = getdata
    }
  })
}

const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-800',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
</script>
<style lang="postcss" scoped>
.addgift {
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
