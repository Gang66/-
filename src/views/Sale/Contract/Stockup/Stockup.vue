<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='stockup text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <el-form-item label='合同状态:'>
                <span>{{retstate(state)}}</span>
              </el-form-item>
              <el-form-item label='申请理由:'>
                <el-checkbox-group v-model="data.Type" :disabled="data.disabled">
                  <el-checkbox :label="0">货期紧张</el-checkbox>
                  <el-checkbox :label="1">信用较好</el-checkbox>
                  <el-checkbox :label="2">客户流程较慢</el-checkbox>
                  <el-checkbox :label="3">生产周期长</el-checkbox>
                  <el-checkbox :label="4">其他</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item label='详细描述:'>
                <el-input :readonly='data.disabled' :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" v-model='data.form.Note' placeholder='请输入' style="width:530px" />
              </el-form-item>
            </el-card>
            <el-card v-if="ViewType==4||data.form.AppNote" class='sale_card mt-2'>
              <div class="flex  justify-between">
                <div>1、信用确认是否可以先行备货？</div>
                <div>
                  <el-radio-group :disabled='ViewType!=4' v-model="data.form.Credit">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="flex  justify-between">
                <div>2、产品明细中针对非常规类产品，是否可以先行备货？</div>
                <div>
                  <el-radio-group :disabled='ViewType!=4' v-model="data.form.Routine">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <div class="flex  justify-between">
                <div>3、先行备货风险是否可控？</div>
                <div>
                  <el-radio-group :disabled='ViewType!=4' v-model="data.form.Risk">
                    <el-radio :label="true">是</el-radio>
                    <el-radio :label="false">否</el-radio>
                  </el-radio-group>
                </div>
              </div>
              <el-input :readonly='ViewType!=4' :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" v-model='data.form.AppNote' placeholder='请输入' style="width:600px" />

            </el-card>
            <div v-if="data.disabled==false" class="text-center pt-6">
              <el-button class="cancelbut" @click="closeWindow()">
                取消
              </el-button>
              <el-button type="primary" @click="submitForm()">
                提交
              </el-button>
            </div>
            <div v-if="ViewType==4" class="text-center pt-6">
              <el-button type="primary" @click="ApprovalStockUp()">
                提交
              </el-button>
            </div>
          </el-form>
        </div>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { GetStockInfo, PostAddStockUp, PostApprovalStockUp } from '/@/api/Sale/Contract'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

const dic = reactive({
  State: []
})
//获取字典数据
const getDictionaryData = () => {
  //运费
  store.getDict('sale_ContractState').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.State = res
  })
}
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  DataId: {
    type: Number,
    default: 0
  },
  checkId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '备货申请'
  },
  state: {
    type: Number,
    default: 0
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}
const submitForm = () => {
  if (data.Type.length <= 0) {
    ElMessage.warning('请选择类型')
    return false
  }
  if (data.form.Note == '') {
    ElMessage.warning('请输入理由')
    return false
  }
  var postdata: any = data.form
  postdata.Type = JSON.stringify(data.Type)
  PostAddStockUp(postdata).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
}
const retstate = (val: any) => {
  var st: any = dic.State.find((f: any) => f.DicKey == val)
  if (st) {
    return st.DicValue
  } else {
    return '未知状态'
  }
}
const boxStyle = reactive({
  boxWidth: 'w-700',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  disabled: false,
  Type: [],
  form: {
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    ContractId: props.DataId,
    Type: 0,
    Note: '',
    AppNote: '',
    Credit: <any>null,
    Routine: <any>null,
    Risk: <any>null
  }
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
const ApprovalStockUp = () => {
  if (data.form.AppNote == '') {
    if (data.form.Credit != true || data.form.Routine != true || data.form.Risk != true) {
      ElMessage.warning('请填写审批意见')
      return false
    }
  }
  var arr = {
    checkId: props.checkId,
    state: 1,
    remark: data.form.AppNote,
    dataid: props.DataId
  }
  if (data.form.Credit != true || data.form.Routine != true || data.form.Risk != true) {
    arr.state = 0
  }
  PostApprovalStockUp({ stock: data.form, param: arr }).then((res) => {
    if (res.code == 1) {
      ElMessage.success('审批成功')
      closeWindow()
    }
  })
}
const getstockinfo = () => {
  GetStockInfo({ Id: props.DataId }).then((res) => {
    if (res.code == 1) {
      data.Type = JSON.parse(res.data.Type)
      data.form = res.data
    }
  })
}
onMounted(() => {
  console.log('props.ViewType', props.ViewType)
  getDictionaryData()
  if (props.ViewType != 1) {
    data.disabled = true
    getstockinfo()
  } else {
    getuserinfo()
  }
})
</script>
<style lang="postcss" scoped>
.stockup {
  :deep(.el-form-item) {
    margin-right: 0px;
  }
  :deep(.el-checkbox) {
    margin-right: 23px;
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
}
</style>
