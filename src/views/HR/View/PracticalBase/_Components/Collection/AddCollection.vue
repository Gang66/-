<template>
  <div>
    <CusDialog :box-style="boxStyle" :title="title" :is-show="true" @closeWindow="closeWindow">
      <div class="addcollection text-base">
        <div class="salerDialog">
          <el-form ref="ruleFormRef" :model="data" :rules="rules" :inline="true">
            <el-card class="sale_card">
              <template #header>
                <div class="card-header">
                  <div class="header-left">合同信息</div>
                </div>
              </template>
              <el-form-item label="客户名称" prop="CustomerName">
                <el-input :readonly="true" v-model="data.form.CustomerName" placeholder="请输入" style="width: 426px" @click="showBargain" />
              </el-form-item>
              <el-form-item label="合同编号" prop="ContractNo">
                <el-input :readonly="true" v-model="data.form.ContractNo" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="合同时间" prop="ContractTime">
                <el-input :readonly="true" v-model="data.form.ContractTime" placeholder="请输入" class="inputclass" />
              </el-form-item>

              <el-form-item label="总欠款" prop="TotalArrears">
                <el-input :readonly="data.disabled" v-model="data.form.TotalArrears" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="合同金额" prop="ContractAmount">
                <el-input :readonly="true" v-model="data.form.ContractAmount" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="已付金额" prop="ContractPaid">
                <el-input :readonly="true" v-model="data.form.ContractPaid" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="未付金额" prop="ContractPaidUnPaid">
                <el-input :readonly="true" v-model="data.form.ContractPaidUnPaid" placeholder="请输入" class="inputclass" />
              </el-form-item>
            </el-card>

            <el-card class="sale_card mt-2">
              <template #header>
                <div class="card-header">
                  <div class="header-left">收款详情</div>
                </div>
              </template>
              <el-form-item label="款项类别" prop="form.PaymentType" :rules="rules.PaymentType">
                <el-select :disabled="data.disabled" v-model="data.form.PaymentType" placeholder="请选择款项类别" class="inputclass">
                  <el-option v-for="item in dic.PaymentList" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收款日期" prop="form.CollectionDate" :rules="rules.CollectionDate">
                <el-date-picker @change="timechange" :readonly="data.disabled" v-model="data.form.CollectionDate" type="date" placeholder="请选择" style="width: 170px" />
              </el-form-item>
              <el-form-item label="收款金额" prop="form.Amount" :rules="rules.Amount">
                <el-input :readonly="data.disabled" type="Number" v-model="data.form.Amount" placeholder="请输入" class="inputclass"></el-input>
              </el-form-item>
              <el-form-item label="备注信息" prop="Note">
                <el-input :readonly="data.disabled" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" v-model="data.form.Note" placeholder="请输入" style="width: 925px" />
              </el-form-item>

              <div class="flex justify-between">
                <div class="flex">
                  <div class="bg-blue-400 w-2 h-2 rounded-lg mt-2 mr-2"></div>
                  <div class="font-semibold">收款明细</div>
                </div>
                <div v-if="ViewType == 1">
                  <el-button size="small" type="primary" @click="addentity"> <el-icon-plus class="w-4 h-4" />新增收款 </el-button>
                  <el-button size="small" class="dangerbut" @click="delentitys"> <el-icon-delete class="w-4 h-4" />删除 </el-button>
                </div>
              </div>
              <div class="tableclass">
                <el-table border :data="data.entitys" @selection-change="handleentitysChange" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                  <el-table-column type="selection" width="30" />
                  <el-table-column type="index" width="50" label="序号"> </el-table-column>
                  <el-table-column prop="Name" label="收款类型">
                    <template #default="scope">
                      <el-form-item :prop="'entitys[' + scope.$index + '].ContractPaymentId'" :rules="rules.ContractPaymentId">
                        <el-select :disabled="data.disabled" @change="Stagechange(scope.$index)" v-model="scope.row.ContractPaymentId" placeholder="请选择收款类型">
                          <el-option v-for="item in data.entitytype" :key="item.key" :label="item.value" :value="item.id"></el-option>
                        </el-select>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Name" label="计划时间">
                    <template #default="scope">
                      <el-form-item :prop="'entitys[' + scope.$index + '].PlanTime'" :rules="rules.PlanTime">
                        <el-date-picker :disabled="true" v-model="scope.row.PlanTime" type="date" placeholder="请选择" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Name" label="计划金额">
                    <template #default="scope">
                      <el-form-item :prop="'entitys[' + scope.$index + '].PlanAmount'" :rules="rules.PlanAmount">
                        <el-input :readonly="true" type="Number" v-model="scope.row.PlanAmount" placeholder=""></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Model" label="收款时间">
                    <template #default="scope">
                      <el-form-item :prop="'entitys[' + scope.$index + '].CollectionTime'" :rules="rules.CollectionTime">
                        <el-date-picker :disabled="true" v-model="scope.row.CollectionTime" type="date" placeholder="请选择" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Amount" label="收款金额">
                    <template #default="scope">
                      <el-form-item :prop="'entitys[' + scope.$index + '].Amount'" :rules="rules.Amount">
                        <el-input :readonly="data.disabled" type="Number" v-model="scope.row.Amount" placeholder=""></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                </el-table>
              </div>

              <div class="flex pt-8">
                <div class="bg-blue-400 w-2 h-2 rounded-lg mt-2 mr-2"></div>
                <div class="font-semibold">附件列表</div>
              </div>
              <div class="pt-2" :class="data.disabled ? '' : '-mt-12'">
                <uploadfile :isdisabled="data.disabled" :uploadFileList="data.FileList" @uploadFileData="uploadFileData"></uploadfile>
              </div>
            </el-card>
          </el-form>
        </div>
        <div v-if="ViewType == 1" class="text-center pt-2">
          <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
          <el-button type="primary" @click="submitentity(ruleFormRef)"> 提交 </el-button>
        </div>
      </div>
      <!-- 合同列表 -->
      <changeContract ref="changeContractRef" @changeOk="changeOk"></changeContract>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { parseTime, getTime } from '/@/utils/tools'
import { isMobileTel } from '/@/utils/validate'
import { GetUserinformation } from '/@/api/layout/index'
import { PostAddCollection, GetCollectionInfo, GetContractCollection } from '/@/api/hr/School/Receivable'
import { GetContractInfo } from '/@/api/hr/School/PracticalBase'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import changeContract from '/@/views/Sale/Contract/AfterSalesService/changeContract.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

//#region 合同列表
const changeContractRef = ref(null)

const showBargain = () => {
  if (props.ContractId == 0 && props.DataId == 0) {
    changeContractRef.value.showBargain()
  }
}
const changeOk = () => {
  getContractInfo()
}

//#endregion

const dic = reactive({
  PaymentList: [],
  PaymentStage: []
})
//获取字典数据
const getDictionaryData = () => {
  //付款方式
  store.getDict('sale_Collection_Type').then((res: any) => {
    dic.PaymentList = res
  })
  //付款阶段
  store.getDict('sale_Contract_PaymentStage').then((res: any) => {
    dic.PaymentStage = res
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
  ContractId: {
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
  Type: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  Amount: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  CollectionTime: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  CollectionDate: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],

  PaymentType: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],

  Reason: [
    {
      required: true,
      message: '请选择售后原因',
      trigger: 'change'
    }
  ],
  Remark: [
    {
      required: true,
      message: '请输入问题描述',
      trigger: 'change'
    }
  ],
  ContractPaymentId: [
    {
      required: true,
      message: '请输入问题描述',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
  emit('cancelContract')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

interface entity {
  Type?: number
  Amount?: number
  CollectionTime?: Date
  ContractPaymentId?: number
  PlanTime?: Date
  PlanAmount?: number
}

const data = reactive({
  entitytype: <Array<any>>[],
  entitySelection: [],
  entitys: <Array<entity>>[],
  disabled: false,
  FileList: [],
  form: {
    CollectionDate: parseTime(getTime('day'), ''),
    Id: 0,
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    UserName: '',
    CustomerName: '',
    CustomerId: 0,
    ContractId: 0,
    ContractNo: '',
    ContractAmount: 0,
    ContractArrears: 0,
    ContractPaid: 0,
    ContractUnPaid: 0,
    TotalArrears: 0,
    ContractTime: '',
    Amount: null,
    PaymentType: '',
    Note: ''
  }
})
const uploadFileData = (val: any) => {
  data.FileList = val
}
const timechange = () => {
  if (data.entitys.length > 0) {
    data.entitys.forEach((item) => {
      item.CollectionTime = new Date(data.form.CollectionDate || '')
    })
  }
}

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
///付款类型变化
const Stagechange = (index: any) => {
  var info = data.entitytype.find((f: any) => {
    if (f.id == data.entitys[index].ContractPaymentId) {
      return f
    }
  })
  if (info) {
    data.entitys[index].PlanTime = info.PaymentDate
    data.entitys[index].Type = info.key
    data.entitys[index].PlanAmount = info.Amount
  }
}
///获取合同详情
const getContractInfo = () => {
  const id = props.ContractId ? props.ContractId : changeContractRef.value.bargain.Id
  GetContractInfo({ Id: id }).then((res) => {
    if (res.code == 1) {
      if (props.ViewType == 1) {
        var info = res.data.bill
        data.form.CustomerName = info.CustomerName
        data.form.CustomerId = info.CustomerId
        data.form.ContractNo = info.BillNo
        data.form.ContractId = info.Id
        data.form.ContractAmount = info.Amount
        data.form.ContractArrears = info.ContractArrears
        data.form.ContractTime = info.CreateOn
      }

      //获取付款计划
      var paymentlist = res.data.paymentlist
      if (paymentlist.length > 0) {
        paymentlist.forEach((item: any) => {
          console.log(dic.PaymentStage)
          var pay: any = dic.PaymentStage.find((f: any) => {
            if (item.Stage == Number(f.DicKey)) {
              return item
            }
          })

          if (pay) {
            var ret: any = {}
            ret.id = item.Id
            ret.key = Number(pay.DicKey)
            ret.value = pay.DicValue
            ret.PaymentDate = item.PaymentDate
            ret.Amount = item.Amount
            data.entitytype.push(ret)
          }
        })
      }
      console.log(' data.entitytype', data.entitytype)
    }
  })
}

const getConColl = () => {
  GetContractCollection({ Id: props.ContractId }).then((res) => {
    if (res.code == 1) {
      data.form.TotalArrears = res.data.TotalArrears
      data.form.ContractPaid = res.data.ContractPaid
      data.form.ContractUnPaid = res.data.ContractUnPaid
    }
  })
}

const handleentitysChange = (val: any) => {
  data.entitySelection = val
}
const addentity = () => {
  var item = <entity>{}
  data.entitys.push(item)
  if (data.entitys.length > 0) {
    data.entitys.forEach((item) => {
      item.CollectionTime = new Date(data.form.CollectionDate || '')
    })
  }
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

const submitentity = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var postdata: any = {}
      postdata.bill = JSON.parse(JSON.stringify(data.form))
      postdata.bill.FileList = JSON.stringify(postdata.FileList)
      postdata.entities = data.entitys
      PostAddCollection(postdata).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          closeWindow()
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      console.log('data.entitys', data.entitys)
      console.log('error submit!')
      return false
    }
  })
}
const getDateInfo = () => {
  GetCollectionInfo({ DataId: props.DataId }).then((res) => {
    if (res.code == 1) {
      res.data.bill.FileList = JSON.parse(res.data.bill.FileList)
      data.form = res.data.bill
      data.entitys = res.data.entities
    }
  })
}

onMounted(() => {
  if (props.ViewType == 1) {
    getuserinfo()
  } else {
    data.disabled = true
    getDateInfo()
  }

  getDictionaryData()
  if (props.ContractId != 0) {
    getContractInfo()
    getConColl()
  }
})
</script>
<style lang="postcss" scoped>
.addcollection {
  .tableclass {
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: #fff;
    }
    :deep(.el-table .cell) {
      padding: 0px;
      text-align: center;
    }

    :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 1px #ffffff inset;
    }
    :deep(.el-form-item.is-error .el-input__wrapper) {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
    .el-form-item {
      margin-bottom: 0px;
      width: 100%;
      .el-form-item__content {
        .el-textarea {
          :deep(.el-textarea__inner) {
            box-shadow: none;
          }
        }
      }
    }
  }
  .inputclass {
    width: 178px;
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
:deep(.salerDialog .el-card .el-card__body) {
  padding: 1em 0;
}
</style>
