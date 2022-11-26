<template>
  <div>
    <div :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addcredit text-base'>
        <div class='salerDialog'>
          <el-card class='sale_card'>
            <template #header>
              <div class='card-header'>
                <div class='header-left'>采购原则</div>
                <div class='header-right'>
                  <div class="flex justify-end">
                    <div class="flex">
                      <div v-if="ViewType!=1&&data.form.CreateOn!=null" class="pr-2">
                        添加时间：{{ (data.form.CreateOn||'').substring(0,11)}}
                      </div>
                      <el-button v-if="ViewType!=2" size="small" @click="showmessage">
                        <el-icon-ChatLineRound class='w-4 h-4 mr-2' />
                        历史记录
                      </el-button>
                      <!-- <el-badge v-if="count>0" :value="count" type="primary" class="mr-8">
                          <el-button @click="showmessage">
                            消息记录
                            <el-icon-ChatLineRound class='w-4 h-4 mr-2' />
                          </el-button>
                        </el-badge> -->
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <div>1、客户对以往供应商有哪些要求？客户以往采购的付款方式和竞争对手有哪些？客户对产品质量等级和技术有哪些要求？</div>
              <el-input v-model="data.form.PurchaseNote" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" placeholder="请输入内容" :readonly='data.disabled'></el-input>
              <div class="pt-2">2、通过品牌或专业性或同类使用案例影响采购；通过客情或多次拜访影响采购；通过付款方式或价格影响
                采购；通过供应周期和售后服务影响采购。(四选二，并阐述)</div>
              <el-input v-model="data.form.PurchaseMethod" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" placeholder="请根据上面提示四选二，并阐述" :readonly='data.disabled'></el-input>
            </div>
          </el-card>
        </div>
      </div>
      <div v-if="data.disabled==false" class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="submitForm()">
          提交
        </el-button>
      </div>
    </div>
    <PurchaseList v-if='messagelog.View' :CustomerId='messagelog.CusId' @closeWindow='closeshow' />

  </div>
</template>
<script lang="ts" setup>
import PurchaseList from '../Purchase/PurchaseList.vue'
import { PostAddPurchase, GetPurchaseInfo } from '/@/api/Sale/Customer'
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
  GetPurchaseInfo({ CusId: props.CustomerId, DataId: props.DataId }).then((res) => {
    if (res.code == 1) {
      data.form = res.data
      if (props.ViewType == 2) {
        data.disabled = true
      } else {
        getuserinfo()
        data.disabled = false
      }
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
  if (data.form.PurchaseNote == '' || data.form.PurchaseMethod == '') {
    ElMessage.warning('采购原则请填写完整')
    return false
  }
  var postdata = data.form
  PostAddPurchase(postdata).then((res) => {
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
