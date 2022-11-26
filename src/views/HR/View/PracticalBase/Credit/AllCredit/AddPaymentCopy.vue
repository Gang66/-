<template>
  <div>
    <div :box-style="boxStyle" :title="title" :is-show="true" @closeWindow="closeWindow">
      <div class="addcredit text-base">
        <div class="salerDialog">
          <el-card class="sale_card">
            <template #header>
              <div class="card-header">
                <div class="header-left">付款方式</div>
                <div class="header-right">
                  <div class="flex justify-end">
                    <div class="flex">
                      <div v-if="ViewType != 1 && data.form.CreateOn != null" class="pr-2">添加时间：{{ (data.form.CreateOn || '').substring(0, 11) }}</div>
                      <el-button v-if="ViewType != 2" size="small" @click="showmessage">
                        <el-icon-ChatLineRound class="w-4 h-4 mr-2" />
                        历史记录
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div class="flex justify-between">
              <div class="flex">
                <div style="line-height: 31px" class="pr-2">预付</div>
                <el-input :readonly="data.disabled" v-model="data.form.Advance" type="Number" placeholder="请输入" style="width: 130px">
                  <template #append>{{ data.form.IS_Rate }}%</template>
                </el-input>
              </div>
              <div class="flex">
                <div style="line-height: 31px" class="pr-2">发货</div>
                <el-input :readonly="data.disabled" v-model="data.form.Deliver" type="Number" placeholder="请输入" style="width: 130px">
                  <template #append>{{ data.form.IS_Rate }}%</template>
                </el-input>
              </div>
              <div class="flex">
                <div style="line-height: 31px" class="pr-2">到付</div>
                <el-input :readonly="data.disabled" v-model="data.form.Arrival" type="Number" placeholder="请输入" style="width: 130px">
                  <template #append>{{ data.form.IS_Rate }}%</template>
                </el-input>
              </div>
              <div class="flex">
                <div style="line-height: 31px" class="pr-2">质保</div>
                <el-input :readonly="data.disabled" v-model="data.form.Warranty" type="Number" placeholder="请输入" style="width: 130px">
                  <template #append>{{ data.form.IS_Rate }}%</template>
                </el-input>
              </div>

              <!-- <el-select v-model="data.form.Payment" placeholder="请选择付款方式" style="width:100%" :disabled='data.disabled'>
                <el-option v-for="item in PayMethodDetail  " :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select> -->
            </div>
            <div>
              <div>备注说明：</div>
              <el-input v-model="data.form.Note" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" placeholder="请输入" :readonly="data.disabled"></el-input>
            </div>
          </el-card>
        </div>
      </div>
      <div v-if="data.disabled == false" class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
        <el-button type="primary" @click="submitForm()"> 提交 </el-button>
      </div>
    </div>
    <PaymentList v-if="messagelog.View" :CustomerId="messagelog.CusId" @closeWindow="closeshow" />
  </div>
</template>
<script lang="ts" setup>
import PaymentList from '../Payment/PaymentList.vue'
import { PostAddPayment, GetPaymentInfo } from '/@/api/hr/School/PracticalBase'
import { GetUserinformation } from '/@/api/layout/index'
import {
  PayMethodDetail //付款方式
} from '/@/utils/techprocess'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  CustomerId: {
    type: Number,
    default: 0
  },
  DataId: {
    type: Number,
    default: 0
  },
  CustomerName: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '新增报价单'
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
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const mesboxStyle = reactive({
  boxWidth: 'w-900',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const messagelog = reactive({
  View: false,
  CusId: props.CustomerId
})
const showmessage = () => {
  messagelog.View = true
}
const closeshow = () => {
  messagelog.View = false
}

const getreportinfo = () => {
  GetPaymentInfo({ CusId: props.CustomerId, DataId: props.DataId }).then((res) => {
    if (res.code == 1) {
      data.form = res.data
      data.disabled = true
      if (props.ViewType == 2) {
        data.disabled = true
      } else {
        getuserinfo()
        data.disabled = false
      }
    } else {
    }
  })
}

const data = reactive({
  form: {
    CreateOn: null,
    Advance: 0,
    Deliver: 0,
    Arrival: 0,
    Warranty: 0,
    Count: 0,
    CreateName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CustomerId: props.CustomerId,
    CustomerName: props.CustomerName,
    PurchaseNote: '',
    PurchaseMethod: '',
    Payment: null
  },
  list: <any>[],
  disabled: false,
  AddCompetitor: {
    infodata: {},
    customerid: 0,
    cusname: '',
    view: false,
    viewtype: 1,
    title: ''
  }
})

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
    }
  })
}
const addCompetitor = (val: any) => {
  console.log(val)
  data.list.push(val)
  closeCompetitor()
}
const openCompetitor = (val: any, vdata: any) => {
  console.log('---***-*-*-*-*-*-*-', vdata)
  data.AddCompetitor.infodata = vdata
  data.AddCompetitor.viewtype = val
  data.AddCompetitor.view = true
  data.AddCompetitor.customerid = props.CustomerId
  data.AddCompetitor.cusname = props.CustomerName
  data.AddCompetitor.title = '新增竞争对手'
}
const closeCompetitor = () => {
  data.AddCompetitor.view = false
}
const submitForm = () => {
  var postdata = data.form
  PostAddPayment(postdata).then((res) => {
    if (res.code == 1) {
      if (res.data) {
        ElMessage.success(res.message)
        closeWindow()
      } else {
        ElMessage.error(res.message)
      }
    } else {
      ElMessage.error(res.message)
    }
  })
}
onMounted(() => {
  if (props.ViewType == 1) {
    getuserinfo()
  } else {
    getreportinfo()
  }
})
</script>
<style lang="postcss" scoped>
.addcredit {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  .tablecard {
    :deep(.el-card__body) {
      padding: 0px;
    }
  }
}
</style>
