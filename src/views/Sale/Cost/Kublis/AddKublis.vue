<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addSample text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='formdata.form' :rules="rules" :inline='true'>
            <el-card class='sale_card mb-2'>
              <el-form-item label='申请人'>
                <el-input :readonly='true' v-model='formdata.form.UserName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='事业部'>
                <el-input :readonly='true' v-model='formdata.form.CompName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='职务'>
                <el-input :readonly='true' v-model='formdata.form.PostName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='申请时间'>
                <el-input :readonly='true' v-model='formdata.form.CreateOn' placeholder='请输入' class="inputwidth" />
              </el-form-item>
            </el-card>
            <el-card class='sale_card'>
              <el-form-item label='关联企业' prop="CustomerName">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.CustomerName' placeholder='请输入' class="doblewidth" @click="showrelation"/>
              </el-form-item>
              <el-form-item label='居间人' prop="IntermediatorId">
                <el-select :disabled='formdata.disabled' v-model="formdata.form.IntermediatorId" placeholder="请选择" class="inputwidth" @change="changeIntermediator">
                  <el-option :label="itm.Name" :value="itm.Id" :key="itm.Id" v-for="itm in formdata.NamesList"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='合同时间' prop="ContractTime">
                <el-input :readonly='true' v-model='formdata.form.ContractTime' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='合同编号' prop="ContractNo">
                <el-input :readonly='true' v-model='formdata.form.ContractNo' placeholder='请输入' class="inputwidth" @click="showBargain"></el-input>
              </el-form-item>
              <el-form-item label='合同金额' prop="ContractAmount">
                <el-input :readonly='true' v-model='formdata.form.ContractAmount' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='居间费'>
                <el-input :readonly='true' v-model='formdata.form.IntermediatorAmount' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='申请费用' prop="Amount">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Amount' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='申请事由' prop="Note">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Note' placeholder='请输入' class="doblewidth"></el-input>
              </el-form-item>
              <el-form-item label='收款人' prop="Payee">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Payee' placeholder='请输入' class="inputwidth"></el-input>
              </el-form-item>
              <el-form-item label='付款方式' prop="Payment">
                <el-select :disabled='formdata.disabled' v-model="formdata.form.Payment" placeholder="请选择" class="inputwidth">
                  <el-option :label="itm.DicValue" :value="itm.DicKey" :key="itm.DicKey" v-for="itm in dic.JsfPayType"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='收款账户' prop="CollectionAccount" v-if="formdata.form.Payment != 4">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.CollectionAccount' placeholder='请输入' class="doblewidth"></el-input>
              </el-form-item>
              <el-form-item label='银行' prop="Bank" v-if="formdata.form.Payment == 1">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Bank' placeholder='请输入' class="doblewidth"></el-input>
              </el-form-item>
              <div class="flex justify-end p-2 text-sm">
                <span v-if="formdata.disabled==false" class="mr-2 cursor-pointer text-blue-400" @click="ShowUpload">上传举证</span>
                <span class="cursor-pointer text-blue-400" @click="$preview(0,retviewurl(formdata.form.ImgUrl))" v-if="formdata.form.ImgUrl.length > 0">查看举证</span>
              </div>
            </el-card>
          </el-form>
          <div v-if="formdata.disabled==false" class="text-center pt-6">
            <el-button class="cancelbut" @click="closeWindow">
              取消
            </el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef,1)">
              提交
            </el-button>
          </div>
        </div>
        <div>
          <template v-if="formdata.ViewType != 1">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 调薪审批 -->
            <template v-if="formdata.ViewType==4">
              <el-input v-model="formdata.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
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
      <!-- 选择客户 -->
      <CusDialog v-if=" relation.show" :boxStyle='cusboxStyle' title='选择客户' :is-show='true' @closeWindow='cancelrelation'>
        <div>
          <el-card class="sale_card " style="padding:0px">
            <div>
              <el-input v-model="relation.relationpageInfo.Name" style="width:200px"></el-input>
              <el-button @click="CustomersByNameEvent">搜索</el-button>
            </div>
          </el-card>

          <el-card class='sale_card mt-6'>
            <div>
              <el-table border :data='relation.list'
                :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
                :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
                <!-- <el-table-column type="index" width="40" label='序号' />
                <el-table-column prop='CreateOn' width="110" label='生效时间'>
                  <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
                </el-table-column>
                <el-table-column prop='CompName' label='居间人' />
                <el-table-column prop='CompName' label='客户名称' />
                <el-table-column prop='CompName' label='业务员' />
                <el-table-column prop='CompName' label='合同金额' />
                <el-table-column prop='CompName' label='回款金额' />
                <el-table-column prop='CompName' label='居间费' />
                <el-table-column prop='address' width="50" label='操作'>
                  <template #default="scope">
                    <span class="text-blue-400 cursor-pointer" @click="checkcustomer(scope.row)">选择</span>
                  </template>
                </el-table-column> -->
                <el-table-column type="index" width="50" label='序号' />
                <el-table-column prop='CreateOn' width="130" label='录入时间'>
                  <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
                </el-table-column>
                <el-table-column prop='Name' label='客户名称' />
                <el-table-column prop='address' width="100" label='操作'>
                  <template #default="scope">
                    <span class="text-blue-400 cursor-pointer" @click="checkcustomer(scope.row)">点击选择</span>
                  </template>
                </el-table-column>
              </el-table>
              <div class="flex justify-end">
                <el-pagination small v-model:page-size="relation.relationpageInfo.size" :background="true" layout="prev, pager, next, jumper" :total="relation.relationpageInfo.count"
                  @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
              </div>
            </div>
          </el-card>
        </div>
      </CusDialog>
    </CusDialog>
    <el-dialog v-model=" formdata.uploadShow" v-if=" formdata.uploadShow" width="600px" :append-to-body='true'>
      <uploadimg :uploadFileData='formdata.form.ImgUrl' @uploadFileDataEvent='uploadFileData' @closeWindow='closeData'></uploadimg>
    </el-dialog>
    <!-- 选择合同 -->
    <changeContract ref="changeContractRef" @changeOk="changeOk"></changeContract>
  </div>
</template>
<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { GetCostIntermediatorInfo, PostAddIntermediatorCost, PostApprovalCostIntermediator } from '/@/api/Sale/Cost'
import { GetIntermediatorByCusId } from '/@/api/Sale/Intermediator'
import uploadimg from '/@/components/Upload/uploadimg.vue'
import changeContract from '/@/views/Sale/Contract/AfterSalesService/changeContract.vue'
import { GetCustomersByName } from '/@/api/Sale/Customer'
import { remoteUrl, parseTime, getTime } from '/@/utils/tools'
import CusDialog from '../../Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { isNumber } from '/@/utils/validate'

//#region 数据字典
const store = useCommonStore() //记得加这一句
const dic = reactive({
  JsfPayType: []
})
//获取字典数据
const getDictionaryData = () => {
  //支付方式
  store.getDict('jsf_pay_type').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.JsfPayType = res
  })
}
//#endregion

//#region 合同列表
const changeContractRef = ref(null)

const showBargain = () => {
  if (!formdata.disabled) {
    changeContractRef.value.showBargain()
  }
}
// 选择合同事件
const changeOk = (id:any, data:any) => {
  formdata.form.ContractTime = data.CreateOn
  formdata.form.ContractId = data.Id
  formdata.form.ContractNo = data.BillNo
  formdata.form.ContractAmount = data.Amount
  formdata.form.IntermediatorAmount = data.IntroductionFee
}

//#endregion

//#region 选择客户
const relation = reactive({
  show: false,
  list: [],
  relationpageInfo: {
    Name: '',
    count: 0,
    page: 1,
    size: 10
  }
})
const cusboxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
// 显示客户列表
const showrelation = () => {
  if (formdata.disabled == false) {
    relation.show = true
    CustomersByNameEvent()
  }
}
// 选择居间人
const changeIntermediator = (val: any) => {
  let info:any = formdata.NamesList.find((itm:any) => itm.Id == val)
  formdata.form.IntermediatorName = info.Name
}
const cancelrelation = () => {
  relation.show = false
}
const relationhandleSizeChange = (val: number) => {
  relation.relationpageInfo.size = val
  CustomersByNameEvent()
}
const relationhandleCurrentChange = (val: number) => {
  relation.relationpageInfo.page = val
  CustomersByNameEvent()
}
const CustomersByNameEvent = () => {
  GetCustomersByName(relation.relationpageInfo).then((res) => {
    if (res.code == 1) {
      relation.relationpageInfo.count = res.data.count
      relation.list = res.data.list

      formdata.form.IntermediatorId = undefined
      formdata.form.IntermediatorName = ''
    }
  })
}

const checkcustomer = (val: any) => {
  formdata.form.CustomerName = val.Name
  formdata.form.CustomerId = val.Id
  getNamesList(val.Id)
  cancelrelation()
}

// 根据企业获取居间人列表
const getNamesList = (id: number) => {
  GetIntermediatorByCusId({CusId: id}).then(res => {
    if (res.code == 1) {
      formdata.NamesList = res.data || []
    }
  })
}
//#endregion

//#region 上传查看
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
  formdata.uploadShow = true
}
const closeData = (val: any) => {
  formdata.uploadShow = false
}

const uploadFileData = (val: any) => {
  formdata.form.ImgUrl = val
  formdata.uploadShow = false
}

//#endregion

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
    default: '居间费'
  }
})

// 表单字段
const formdata:any = reactive({
  ViewType: 1,
  Approval: {
    remark: ''
  },
  NamesList: [],
  form: {
    Id: 0,
    CustomerId: '', //客户id
    CustomerName: '', //关联客户名称
    IntermediatorId: undefined, //居间人Id
    IntermediatorName: '', //居间人姓名
    ContractTime: '', //合同时间
    ContractId: 0, // 合同id
    ContractNo: '', //合同编号
    ContractAmount: undefined, //合同金额
    IntermediatorAmount: undefined, //居间费
    Amount: undefined, //申请费用
    Note: '', //申请事由
    Payee: '', //收款人
    Payment: '', // 付款方式
    CollectionAccount: '', // 收款账户
    Bank: '', // 银行
    ImgUrl: [], // 举证
    State: 0,
    // 提交人信息
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CreateOn: parseTime(getTime('day'), '')
  },
  uploadShow: false,
  disabled: false
})
// 提交验证
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  CustomerName: [
    {
      required: true,
      message: '请输入姓名',
      trigger: 'change'
    }
  ],
  IntermediatorId: [
    {
      required: true,
      message: '请输入居间人',
      trigger: 'change'
    }
  ],
  ContractTime: [
    {
      required: true,
      message: '请输入合同时间',
      trigger: 'change'
    }
  ],
  ContractNo: [
    {
      required: true,
      message: '请输入合同编号',
      trigger: 'change'
    }
  ],
  ContractAmount: [
    {
      required: true,
      message: '请输入合同金额',
      trigger: 'change'
    }
  ],
  Amount: [
    {
      required: true,
      message: '请输入申请费用',
      trigger: 'change'
    },
    {
      validator: isNumber,
      message: '请输入数字',
      trigger: 'change'
    }
  ],
  Note: [
    {
      required: true,
      message: '请输入申请事由',
      trigger: 'change'
    }
  ],
  Payee: [
    {
      required: true,
      message: '请输入收款人',
      trigger: 'change'
    }
  ],
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  CollectionAccount: [
    {
      required: true,
      message: '请输入收款账户',
      trigger: 'change'
    }
  ],
  Bank: [
    {
      required: true,
      message: '请输入银行',
      trigger: 'change'
    }
  ]
})
// 获取账号信息
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
// 获取详情信息
const getCostSampleInfo = () => {
  var Id = props.info.Id ? props.info.Id : props.DataId
  GetCostIntermediatorInfo({ DataId: Id }).then((res) => {
    if (res.code == 1) {
      formdata.form = res.data
      formdata.form.ImgUrl = JSON.parse(res.data.ImgUrl)
      getNamesList(res.data.CustomerId)
    }
  })
}
// 最外层弹窗
const emit = defineEmits(['closeWindow'])
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const closeWindow = () => {
  emit('closeWindow')
}
///提交
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid, fields) => {
    console.log(valid, fields)
    if (valid) {
      if (formdata.form.ImgUrl.length <= 0) {
        ElMessage.warning('请先上传凭证')
        return false
      }
      let data:any = {}
      for (let itm in formdata.form) {
        if (itm == 'ImgUrl') {
          data.ImgUrl = JSON.stringify(formdata.form[itm])
        } else {
          data[itm] = formdata.form[itm]
        }
      }

      PostAddIntermediatorCost(data).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          alert(111)
          closeWindow()
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      ElMessage.warning('请检查表单内容是否填写完整')
    }
  })
}

const ApprovalForm = (num: number) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: formdata.Approval.remark,
    dataid: formdata.form.Id
  }
  PostApprovalCostIntermediator(arr).then((res: any) => {
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

onMounted(() => {
  // 字典
  getDictionaryData()
  if (props.info.viewType != 1) {
    formdata.ViewType = props.info.viewType
  } else {
    formdata.ViewType = props.ViewType
  }
  if (formdata.ViewType == 3 || formdata.ViewType == 4) {
    formdata.disabled = true
  }
  if (formdata.ViewType == 1) {
    getuserinfo()
  } else {
    getCostSampleInfo()
  }
})
</script>
<style lang="postcss" scoped>
.addSample {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
    }
  }
  :deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
    .el-input__prefix {
      display: none;
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
        .el-select {
          :deep(.el-input__wrapper) {
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
    width: 178px;
  }
  .doblewidth {
    width: 428px;
  }
  .otherinputwidth {
    width: 100px;
    :deep(.el-input-group__append) {
      padding: 0 5px;
    }
  }

  :deep(.el-form-item__label) {
    padding: 0 5px 0 5px;
    width: 4.45rem;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  :deep(.el-select){
    border: none;
  }
}
:deep(.el-table .cell){
  padding: 0;
}
:deep(.el-input.is-disabled .el-input__inner){
  -webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular))
}
</style>
