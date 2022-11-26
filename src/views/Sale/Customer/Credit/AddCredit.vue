<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addcredit text-base'>
        <div class='salerDialog'>
          <el-card class='sale_card'>
            <template #header>
              <div class='card-header'>
                <div class='header-left'>采购原则</div>
                <div class='header-right'>
                  <div class="flex justify-end">
                    <div>
                      <el-button size="small" @click="showmessage">
                        <el-icon-ChatLineRound class='w-4 h-4 mr-2' />
                        消息记录
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
              <el-input v-model="data.form.PurchaseNote" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" placeholder="请输入" :readonly='data.disabled'></el-input>
              <div class="pt-2">2、通过品牌或专业性或同类使用案例影响采购；通过客情或多次拜访影响采购；通过付款方式或价格影响
                采购；通过供应周期和售后服务影响采购。(四选二，并阐述)</div>
              <el-input v-model="data.form.PurchaseMethod" :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" placeholder="请输入" :readonly='data.disabled'></el-input>
            </div>
          </el-card>

          <el-card class='sale_card mt-2'>
            <template #header>
              <div class='card-header'>
                <div class='header-left'>付款方式</div>
                <div class='header-right'>
                </div>
              </div>
            </template>
            <div class="flex justify-between">
              <div class="flex">
                <div style="line-height: 31px;" class="pr-2">预付 </div>
                <el-input :readonly='data.disabled' v-model="data.form.Advance" type="Number" placeholder="请输入" style="width:130px">
                  <template #append>{{data.form.IS_Rate}}%</template>
                </el-input>
              </div>
              <div class="flex">
                <div style="line-height: 31px;" class="pr-2">发货 </div>
                <el-input :readonly='data.disabled' v-model="data.form.Deliver" type="Number" placeholder="请输入" style="width:130px">
                  <template #append>{{data.form.IS_Rate}}%</template>
                </el-input>
              </div>
              <div class="flex">
                <div style="line-height: 31px;" class="pr-2">到付 </div>
                <el-input :readonly='data.disabled' v-model="data.form.Arrival" type="Number" placeholder="请输入" style="width:130px">
                  <template #append>{{data.form.IS_Rate}}%</template>
                </el-input>
              </div>
              <div class="flex">
                <div style="line-height: 31px;" class="pr-2">质保 </div>
                <el-input :readonly='data.disabled' v-model="data.form.Warranty" type="Number" placeholder="请输入" style="width:130px">
                  <template #append>{{data.form.IS_Rate}}%</template>
                </el-input>
              </div>

              <!-- <el-select v-model="data.form.Payment" placeholder="请选择付款方式" style="width:100%" :disabled='data.disabled'>
                <el-option v-for="item in PayMethodDetail  " :key="item.id" :label="item.name" :value="item.id"></el-option>
              </el-select> -->
            </div>
          </el-card>

          <el-card class='sale_card mt-2 tablecard'>
            <template #header>
              <div class='card-header'>
                <div class='header-left'>竞争对手</div>
                <div class='header-right'>
                  <div class='header-right'>
                    <div class="flex justify-end">
                      <el-button v-if="data.disabled==false" size="small" @click="openCompetitor(1,null)">
                        <el-icon-Plus class='w-4 h-4' />
                        新增
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <el-table border :data='data.list'
                :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
                :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
                <el-table-column type="index" width="50" label='序号' />
                <el-table-column prop='Company' label='公司名称' show-overflow-tooltip />
                <el-table-column prop='Attribute' width="100" label='属性' show-overflow-tooltip />
                <el-table-column prop='Relationship' width="100" label='客户关系' show-overflow-tooltip>
                  <template #default="scope">
                  </template>
                </el-table-column>
                <el-table-column prop='Address' label='公司驻地' show-overflow-tooltip />
                <el-table-column prop='Cooperation' width="80" label='合作状态' show-overflow-tooltip />
                <el-table-column width="80" v-if="data.disabled==false" label='操作'>
                  <template #default="scope">
                    <span v-if="scope.row.IsSuccess==false" class="cursor-pointer" style="color:#DB0C0C;" @click="openCompetitor(3,scope.row)">去分析</span>
                    <span v-else class="cursor-pointer" @click="openCompetitor(2,scope.row)">查看</span>
                  </template>
                </el-table-column>
              </el-table>
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
    </CusDialog>
    <CusDialog v-if="messagelog.View" :box-style='mesboxStyle' title='消息记录' :is-show='true' @closeWindow='closemessage'>
      <el-card class='sale_card mt-6'>
        <el-table border :data='messagelog.tableData'
          :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
          :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
          <el-table-column type="index" width="60" label='序号' />
          <el-table-column prop='CreateOn' label='录入时间'>
            <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
          </el-table-column>
          <el-table-column prop='CreateName' label='业务员' />
          <el-table-column prop='address' label='操作'>
            <template #default="scope">
              <span class="text-blue-400 cursor-pointer" @click="checkmessage(scope.row.Id)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>

    </CusDialog>

    <AddCompetitor v-if='data.AddCompetitor.view' :Data="data.AddCompetitor.infodata" :ViewType="data.AddCompetitor.viewtype" :CustomerId='data.AddCompetitor.customerid'
      :CustomerName='data.AddCompetitor.cusname' :title='data.AddCompetitor.title' @addCompetitor='addCompetitor' @closeWindow='closeCompetitor' />
  </div>
</template>
<script lang="ts" setup>
import { PostAddCustomerReports, GetCustomerReportsList, GetCustomerReportsById } from '/@/api/Sale/Customer'
import { GetUserinformation } from '/@/api/layout/index'
import AddCompetitor from './AddCompetitor.vue'
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
  tableData: [],
  count: 0
})
const showmessage = () => {
  GetCustomerReportsList({ CusId: props.CustomerId }).then((res) => {
    if (res.code == 1) {
      messagelog.tableData = res.data.list
      messagelog.count = res.data.count
    }
  })
  messagelog.View = true
}
const checkmessage = (val: any) => {
  GetCustomerReportsById({ ReportsId: val }).then((res) => {
    if (res.code == 1) {
      data.form = res.data.reports
      data.list = res.data.list
      data.disabled = true
      closemessage()
    }
  })
}
const getreportinfo = () => {
  GetCustomerReportsById({ CusId: props.CustomerId }).then((res) => {
    if (res.code == 1) {
      data.form = res.data.reports
      data.list = res.data.list
      data.disabled = true
      closemessage()
    }
  })
}
const closemessage = () => {
  messagelog.View = false
}

const data = reactive({
  form: {
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

  if (data.list.length == 0) {
    ElMessage.warning('请添加竞争对手')
    return false
  }

  var postdata: any = {}
  postdata.reports = data.form
  postdata.list = data.list
  PostAddCustomerReports(postdata).then((res) => {
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
  }
  if (props.ViewType == 2) {
    getreportinfo()
    data.disabled = true
  }
})
</script>
<style lang="postcss" scoped>
.addcredit {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
    }
  }
  .tablecard {
    :deep(.el-card__body) {
      padding: 0px;
    }
  }
}
</style>
