<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addaftersales text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <div class="border-blue-400 border-dashed border-b pb-2">
                <el-form-item label='单位名称' prop="CustomerName">
                  <el-input :readonly='true' v-model='data.form.CustomerName' placeholder='请输入' class="otherinputclass" @click="showBargain"/>
                </el-form-item>
                <el-form-item label='出票单位' prop="CompanyName">
                  <el-input :readonly='true' v-model='data.form.CompanyName' placeholder='请输入' class="otherinputclass" />
                </el-form-item>

                <el-form-item label='税号' prop="Duty">
                  <el-input :readonly='data.disabled' v-model='data.form.Duty' placeholder='请输入' class="otherinputclass" />
                </el-form-item>
                <el-form-item label='银行账号' prop="BankAccount">
                  <el-input :readonly='data.disabled' v-model='data.form.BankAccount' placeholder='请输入' class="otherinputclass" />
                </el-form-item>

                <el-form-item label='开户银行' prop="Bank">
                  <el-input :readonly='data.disabled' v-model='data.form.Bank' placeholder='请输入' class="inputclass" />
                </el-form-item>
                <el-form-item label='电话' prop="Telephone">
                  <el-input :readonly='data.disabled' v-model='data.form.Telephone' placeholder='请输入' class="inputclass" />
                </el-form-item>
                <el-form-item label='公司地址' prop="Address">
                  <el-input :readonly='data.disabled' v-model='data.form.Address' placeholder='请输入' class="otherinputclass" />
                </el-form-item>
              </div>

              <div class="pt-2">
                <el-form-item label='签收人' prop="Signed">
                  <el-input :readonly='data.disabled' v-model='data.form.Signed' placeholder='请输入' class="otherinputclass" />
                </el-form-item>
                <el-form-item label='联系方式' prop="S_Telephone">
                  <el-input :readonly='data.disabled' v-model='data.form.S_Telephone' placeholder='请输入' class="otherinputclass" />
                </el-form-item>
                <el-form-item label='签收地址' prop="S_Address">
                  <el-input :readonly='data.disabled' v-model='data.form.S_Address' placeholder='请输入' style="width:893px" />
                </el-form-item>

              </div>

            </el-card>
            <el-card class='sale_card mt-2'>
              <div class="flex justify-between">
                <div class="flex">
                  <div class="bg-blue-400 w-2 h-2 rounded-lg mt-2 mr-2"></div>
                  <div class="font-semibold">产品清单</div>
                </div>
                <div v-if="ViewType==1">
                  <el-button size="small" type="primary" @click="showentity">
                    <el-icon-plus class='w-4 h-4' />选择产品
                  </el-button>
                  <el-button size="small" class="dangerbut" @click="delentitys">
                    <el-icon-delete class='w-4 h-4' />删除
                  </el-button>
                </div>
              </div>
              <div class="tableclass">
                <el-table border :data='data.entitys' @selection-change="handleentitysChange"
                  :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'36px', textAlign:'center',fontWeight:'500' }"
                  :cell-style="{ textAlign: 'center',color: '#333',height:'36px',padding:'0px' }" style='width: 100%'>
                  <el-table-column type='selection' width='30' />
                  <el-table-column type="index" width="50" label='序号'>
                  </el-table-column>
                  <el-table-column prop='Name' width="100" label='产品名称'>
                    <template #default="scope">
                      <el-input :readonly='true' v-model="scope.row.Name" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Model' width="100" label='型号'>
                    <template #default="scope">
                      <el-input :readonly='true' v-model="scope.row.Model" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Specifications' width="50" label='规格'>
                    <template #default="scope">
                      <el-input :readonly='true' v-model="scope.row.Specifications" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Unit' width="50" label='单位'>
                    <template #default="scope">
                      <el-input :readonly='true' v-model="scope.row.Unit" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Quantity' width="80" label='数量'>
                    <template #default="scope">
                      <el-input :readonly='data.disabled' type="Number" v-model="scope.row.Quantity" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Price' width="80" label='单价'>
                    <template #default="scope">
                      <el-input :readonly='data.disabled' type="Number" v-model="scope.row.Price" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Price' width="80" label='最低价'>
                    <template #default="scope">
                      <el-input :readonly='true' v-model="scope.row.Price" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Amount' width="80" label='金额'>
                    <template #default="scope">
                      <el-input :readonly='true' v-model="scope.row.Amount" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop='Note' label='备注'>
                    <template #default="scope">
                      <el-input :readonly='data.disabled' v-model="scope.row.Note" placeholder=""></el-input>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="flex justify-end">
                <div>
                  开票金额大写：<span class="text-red-500">{{toChies(data.form.Amount)}}</span>
                </div>
                <div class="pl-2">
                  小写：<span class="text-red-500">￥{{data.form.Amount}}</span>
                </div>
              </div>

            </el-card>
          </el-form>
        </div>
        <div v-if="ViewType==1" class="text-center pt-2">
          <el-button class="cancelbut" @click="cancelentity">
            取消
          </el-button>
          <el-button type="primary" @click="submitentity(ruleFormRef)">
            提交
          </el-button>
        </div>
      </div>
      <CusDialog v-if="checkentity.show" :boxStyle='cusboxStyle' title='选择产品' :is-show='true' @closeWindow='cancelentity'>
        <div>
          <el-card class="sale_card " style="padding:0px">
            <div>
              <el-input v-model="checkentity.name" style="width:200px"></el-input>
              <el-button @click="productByNameEvent">搜索</el-button>
            </div>
          </el-card>
          <el-card class='sale_card mt-2' style="padding:0px">
            <div class=" overflow-y-auto max-h-60" style="border-radius:0px">
              <el-table border :data='checkentity.list' @selection-change="SelectionlistChange"
                :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'36px', textAlign:'center',fontWeight:'500' }"
                :cell-style="{ textAlign: 'center',color: '#333',height:'36px',padding:'0px' }" style=' width: 100%'>
                <el-table-column type='selection' width='30' />
                <el-table-column type="index" width="50" label='序号' />
                <el-table-column prop='Name' label='产品名称'>
                </el-table-column>
                <el-table-column prop='Model' label='型号' />
                <el-table-column prop='Specifications' label='规格' />
                <el-table-column prop='Unit' width="50" label='单位' show-overflow-tooltip />
                <el-table-column prop='Quantity' width="80" label='数量' />
                <el-table-column prop='Price' width="80" label='单价' />
                <el-table-column prop='Price' width="80" label='最低价' />
                <el-table-column prop='Amount' width="80" label='金额' />
                <el-table-column prop='Note' label='备注' />
              </el-table>
            </div>
            <div class="text-center pt-2">
              <el-button class="cancelbut" @click="cancelentity">
                取消
              </el-button>
              <el-button type="primary" @click="checkcontractentity">
                选择
              </el-button>
            </div>
          </el-card>
        </div>
      </CusDialog>
      <!-- 选择合同 -->
      <changeContract ref="changeContractRef" @changeOk="changeOk"></changeContract>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { PostAddInvoicingInfo, GetInvoicingInfo } from '/@/api/Sale/AfterSale'
import { isMobileTel } from '/@/utils/validate'
import { remoteUrl, toChies, parseTime, getTime } from '/@/utils/tools'
import { GetContractInfo } from '/@/api/Sale/Contract'
import { GetUserinformation } from '/@/api/layout/index'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import changeContract from '/@/views/Sale/Contract/AfterSalesService/changeContract.vue'
import { reactive, ref, onMounted, watch } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  ContractId: {
    type: Number,
    default: 0 // 若为0则是从售后管理开票申请中添加
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
  CompanyName: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    }
  ],
  CustomerName: [
    {
      required: true,
      message: '请录入',
      trigger: 'change'
    }
  ],
  Duty: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    }
  ],
  Bank: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    }
  ],
  BankAccount: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    }
  ],
  Telephone: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'blur'
    }
  ],
  Address: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    }
  ],
  Signed: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    }
  ],
  S_Telephone: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'blur'
    }
  ],
  S_Address: [
    {
      required: true,
      message: '请录入',
      trigger: 'blur'
    }
  ]
})
const emit = defineEmits(['cancelContract'])

//#region 合同列表
const changeContractRef = ref(null)

const showBargain = () => {
  if (props.ContractId == 0 && props.DataId == 0) {
    changeContractRef.value.showBargain()
  }
}
const changeOk = () => {
  getcontract()
}

//#endregion

const closeWindow = () => {
  emit('cancelContract')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const cusboxStyle = reactive({
  boxWidth: 'w-900',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  disabled: false,
  entitySelection: [],
  entitys: <Array<entity>>[],
  form: {
    Id: 0,
    Amount: 0,
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    Salerman: '',
    CustomerName: '',
    CustomerId: 0,
    ContractId: 0,
    ContractNo: '',
    ContractAmount: '',
    ContractTime: '',
    CompanyName: '',
    CompanyId: 0,
    ContractCode: '',
    Duty: '',
    Bank: '',
    BankAccount: '',
    Telephone: '',
    Address: '',
    Signed: '',
    S_Telephone: '',
    S_Address: ''
  }
})

interface entity {
  Name?: string
  Model?: string
  Specifications?: string
  Pressure?: string
  Material?: string
  Unit?: string
  Quantity?: number
  Note?: string
  Price?: number
  Amount?: number
  Weight?: string
  Driving?: string
  Structural?: string
  Sealing?: string
  Connection?: string
  Routine?: string
  Technical?: string
  SerialNumber?: string
}

const checkentity = reactive({
  name: '',
  show: false,
  conlist: [],
  list: [],
  entitys: [],
  Selectionlist: []
})
///选择产品
const checkcontractentity = () => {
  if (checkentity.Selectionlist.length <= 0) {
    ElMessage.warning('至少选择一条数据')
    return false
  }
  data.entitys.length = 0
  checkentity.Selectionlist.forEach((item: any) => {
    item.ContractEntityId = item.Id
    var entity: entity = {}
    entity = item
    data.entitys.push(entity)
    console.log('-----------------------', item)
  })

  //data.entitys = list
  console.log('************************', data.entitys)
  cancelentity()
}

const productByNameEvent = () => {
  if (checkentity.name != '') {
    checkentity.list = checkentity.conlist.filter((f: any) => f.Name.indexOf(checkentity.name) > -1)
  } else {
    checkentity.list = checkentity.conlist
  }
}
const showentity = () => {
  checkentity.show = true
}

const SelectionlistChange = (val: any) => {
  checkentity.Selectionlist = val
}

const cancelentity = () => {
  checkentity.show = false
}

const handleentitysChange = (val: any) => {
  data.entitySelection = val
}
const addentity = () => {
  var item = <entity>{}
  data.entitys.push(item)
}
///删除分录
const delentitys = () => {
  if (data.entitySelection.length > 0) {
    data.entitySelection.forEach((f: any) => {
      var index = data.entitys.indexOf(f)
      data.entitys.splice(index, 1)
    })
  } else {
    ElMessage.warning('请先选择分录')
  }
}
//提交
const submitentity = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (data.form.Amount == 0) {
        ElMessage.warning('开票金额不能为0')
        return false
      }
      var postdata: any = {}
      postdata.bill = JSON.parse(JSON.stringify(data.form))
      postdata.entitys = data.entitys
      PostAddInvoicingInfo(postdata).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          closeWindow()
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
///获取开票详情
const getInvoicinginfo = () => {
  GetInvoicingInfo({ Id: props.DataId }).then((res) => {
    if (res.code == 1) {
      var info = res.data
      data.form = info.bill
      data.entitys = info.entitys
    }
  })
}

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      data.form.Salerman = res.data.RealName
      data.form.CompName = res.data.CompName
      data.form.DeptName = res.data.DeptName
      data.form.PostName = res.data.PostName
      data.form.CompId = res.data.CompId
      data.form.DeptId = res.data.DeptId
      data.form.PostId = res.data.PostId
    }
  })
}
///获取合同详情
const getcontract = () => {
  // 后者为单独拆出来的开票申请
  const id = props.ContractId ? props.ContractId : changeContractRef.value.bargain.Id
  GetContractInfo({ Id: id }).then((res) => {
    if (res.code == 1) {
      var contract = res.data
      checkentity.list = contract.entities
      checkentity.conlist = contract.entities
      data.form.CompanyName = contract.bill.CompanyName
      data.from.ContractCode = contract.bill.BillNo
      data.form.CompanyId = contract.bill.CompanyId
      data.form.CustomerName = contract.bill.CustomerName
      data.form.CustomerId = contract.bill.CustomerId
      data.form.ContractNo = contract.bill.BillNo
      data.form.ContractId = contract.bill.Id
      data.form.ContractTime = contract.bill.AgreeDate
      data.form.ContractAmount = contract.bill.Amount

      data.form.Duty = contract.bill.J_Duty
      data.form.Bank = contract.bill.J_Bank
      data.form.BankAccount = contract.bill.J_BankAccount
      data.form.Telephone = contract.bill.J_Telephone
      data.form.Address = contract.bill.J_CompanyAddress
      data.form.Signed = contract.bill.J_LegalPerson
      data.form.S_Telephone = contract.bill.J_Telephone
      data.form.S_Address = contract.bill.J_CompanyAddress
    }
  })
}

///计算退款金额
const sumAmount = () => {
  var Amount = 0
  data.entitys.forEach((item) => {
    console.log(item)
    const Quantity = Number(item.Quantity)
    const Price = Number(item.Price)
    console.log(item)
    if (!Number.isNaN(Quantity) && !Number.isNaN(Price)) {
      item.Amount = Quantity * Price
      Amount = Amount + item.Amount
    }
  })
  return Number(Amount.toFixed(2))
}

watch(data.entitys, (val) => {
  if (props.ViewType == 1) {
    data.form.Amount = sumAmount()
  }
})

onMounted(() => {
  console.log(props.ViewType, 666)
  if (props.ViewType == 1) {
    getuserinfo()
    if (props.ContractId != 0) {
      getcontract()
    }
  } else {
    data.disabled = true
    getInvoicinginfo()
  }
})
</script>
<style lang="postcss" scoped>
.addaftersales {
  .tableclass {
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: #fff;
    }
    :deep(.el-table .cell) {
      padding: 0px;
      text-align: center;
    }

    :deep(.el-input__wrapper) {
      box-shadow: none;
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
  .otherinputclass {
    width: 411px;
  }
  .inputclass {
    width: 170px;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  .el-form-item__label {
    color: #303133;
  }
  :deep(.el-form-item__content) {
    .el-input-group__append {
      padding: 0px 5px;
    }
  }
  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 4.45rem;
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
}
.ht-list{
  :deep(.el-table .cell){
    padding: 0;
  }
}
</style>
