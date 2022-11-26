<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addtogether text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <div v-if="data.ViewType!=1">
                <el-form-item label='申请人' prop="Company">
                  <el-input v-model='data.form.CreateName' :readonly='data.disabled' placeholder='请输入' style='width:135px;' />
                </el-form-item>
                <el-form-item label='申请时间' prop="Company">
                  <el-input v-model='data.form.CreateOn' :readonly='data.disabled' placeholder='请输入' style='width:135px;' />
                </el-form-item>
                <el-form-item label='事业部' prop="Company">
                  <el-input v-model='data.form.CompName' :readonly='data.disabled' placeholder='请输入' style='width:135px;' />
                </el-form-item>
                <el-form-item label='所在部门' prop="Company">
                  <el-input v-model='data.form.DeptName' :readonly='data.disabled' placeholder='请输入' style='width:135px;' />
                </el-form-item>
              </div>

              <el-form-item label='客户名称' prop="Company">
                <el-input v-model='data.form.CustomerName' :readonly='data.disabled' placeholder='请输入' style='width:333px;' />
              </el-form-item>
              <el-form-item label='公司地址' prop="Company">
                <el-cascader :disabled='data.disabled' :placeholder="Region == null ? '加载中' : '请选择地址'" :options="Region" :props="regionProps" filterable
                  v-model="data.form.CityAddress" style="width:333px;"></el-cascader>
              </el-form-item>
              <el-form-item label='原因' prop="Company">
                <el-select v-model='data.form.Reason' style='width: 333px;' placeholder='请选择' :disabled='data.disabled'>
                  <el-option key='1' label='有能力做此公司业务' :value='1' />
                  <el-option key='2' label='有关系做此公司业务' :value='2' />
                  <el-option key='3' label='有关联企业与此公司有业务' :value='3' />
                </el-select>
              </el-form-item>

              <el-form-item label='紧急程度' prop="Company">
                <el-select v-model='data.form.Degree' style='width: 333px;' placeholder='请选择' :disabled='data.disabled'>
                  <el-option key='1' label='紧急' :value='1' />
                  <el-option key='2' label='一般' :value='2' />
                </el-select>
              </el-form-item>
            </el-card>
          </el-form>
        </div>
      </div>
      <div v-if="data.disabled==false" class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow">
          取消
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
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { GetRegionTreeByUserId, PostApprovalRegional, GetRegionalInfo, PostAddRegional } from '/@/api/Sale/Customer'
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
  CusName: {
    type: String,
    default: ''
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
    default: '区域申请'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Degree: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Reason: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  CityAddress: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  CustomerName: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const Region = ref<any>([])
const GetRegion = (val: any) => {
  GetRegionTreeByUserId(val).then((res) => {
    if (res.code == 1) {
      Region.value = res.data
    }
  })
}

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      data.form.CreateName = res.data.RealName
      data.form.CompName = res.data.CompName
      data.form.DeptName = res.data.DeptName
      data.form.PostName = res.data.PostName
      data.form.CompId = res.data.CompId
      data.form.DeptId = res.data.DeptId
      data.form.PostId = res.data.PostId
      GetRegion(res.data.UserId)
    }
  })
}

const ApprovalForm = (num: number) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: data.Approval.remark,
    dataid: data.form.Id
  }
  PostApprovalRegional(arr).then((res: any) => {
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
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-500',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  Approval: {
    remark: ''
  },
  ViewType: 0,
  Company: [],
  disabled: false,
  form: {
    Id: 0,
    CreateOn: null,
    CreateBy: 0,
    CreateName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CustomerName: '',
    CityAddress: [],
    Reason: null,
    Degree: null
  }
})
const regionProps = {
  children: 'children',
  label: 'title',
  value: 'name',
  expandTrigger: 'hover'
}
const getdatainfo = () => {
  var Id = props.info.Id ? props.info.Id : props.DataId
  GetRegionalInfo({ DataId: Id }).then((res) => {
    if (res.code == 1) {
      var getdata = res.data
      getdata.CityAddress = JSON.parse(getdata.CityAddress)
      getdata.CreateOn = (getdata.CreateOn || '').substring(0, 11)
      data.form = getdata
      GetRegion(data.form.CreateBy)
    }
  })
}

const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var postdata: any = {}
      postdata = JSON.parse(JSON.stringify(data.form))
      postdata.CityAddress = JSON.stringify(postdata.CityAddress)
      PostAddRegional(postdata).then((res) => {
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

onMounted(() => {
  console.log('props.info.viewType', props.info.viewType)
  if (props.info.viewType != 1) {
    data.ViewType = props.info.viewType
  } else {
    data.ViewType = props.ViewType
  }
  if (data.ViewType == 3 || data.ViewType == 4) {
    data.disabled = true
  }
  if (data.ViewType == 1) {
    data.form.CustomerName = props.CusName
    getuserinfo()
  } else {
    getdatainfo()
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
    width: 4rem;
  }
}
</style>
