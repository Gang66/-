<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addSample text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='formdata.form' :rules="rules" :inline='true'>
            <el-card class='sale_card'>
              <el-form-item label='申请人' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.UserName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='事业部' prop="CompName">
                <el-input :readonly='true' v-model='formdata.form.CompName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='职务' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.PostName' placeholder='请输入' class="inputwidth" />
              </el-form-item>
              <el-form-item label='申请时间' prop="CustomerName">
                <el-input :readonly='true' v-model='formdata.form.CreateOn' placeholder='请输入' class="inputwidth" />
              </el-form-item>
            </el-card>
            <el-card class='sale_card'>
              <el-form-item label='需求方' prop="NeedName">
                <el-input :readonly='formdata.disabled' @click="showcus" v-model='formdata.form.NeedName' placeholder='请输入需求方' style="width:178px" />
              </el-form-item>
              <el-form-item label='合作状态' prop="Cooperation">
                <el-select :disabled='formdata.disabled' v-model="formdata.form.Cooperation" placeholder="请选择标牌证件" class="otherinputwidth">
                  <el-option v-for="item in Cooperation  " :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='紧急程度' prop="Urgency">
                <el-select :disabled='formdata.disabled' v-model="formdata.form.Urgency" placeholder="请选择标牌证件" class="otherinputwidth">
                  <el-option v-for="item in Urgency  " :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='供货周期' prop="Duration">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.Duration' placeholder='请输入' class="otherinputwidth">
                  <template #append>天</template>
                </el-input>

              </el-form-item>
              <el-form-item label='供货方' prop="SupplierName">
                <el-input :readonly='formdata.disabled' v-model='formdata.form.SupplierName' placeholder='请输入供货方' style="width:178px" />
              </el-form-item>
              <el-form-item label='标牌证件' prop="Signage">
                <el-select :disabled='formdata.disabled' v-model="formdata.form.Signage" placeholder="请选择标牌证件" class="otherinputwidth">
                  <el-option v-for="item in Signage  " :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='收货方式' prop="Receiving">
                <el-select :disabled='formdata.disabled' v-model="formdata.form.Receiving" placeholder="请选择标牌证件" class="otherinputwidth">
                  <el-option v-for="item in Receiving  " :key="item.id" :label="item.name" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label='使用日期' prop="UsingTime">
                <el-date-picker :readonly='formdata.disabled' v-model="formdata.form.UsingTime" type="date" placeholder="请选择" style="width:178px" />

              </el-form-item>
              <el-form-item label='申请理由' prop="Reason">
                <el-input :readonly='formdata.disabled' :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" v-model='formdata.form.Reason' placeholder='请输入申请理由'
                  style="width:926px" />
              </el-form-item>
              <el-form-item label='备注' prop="Note">
                <el-input :readonly='formdata.disabled' :autosize="{ minRows: 2, maxRows: 10 }" type="textarea" v-model='formdata.form.Note' placeholder='请输入备注'
                  style="width:926px" />
              </el-form-item>
            </el-card>
            <el-card class='sale_card mt-2'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>产品明细</div>
                  <div class='header-right text-right'>
                    <div v-if="formdata.disabled==false" class="flex justify-end">
                      <el-button @click="addentity" size="small">
                        <el-icon-plus class='w-4 h-4 mr-2' />
                        新增
                      </el-button>
                    </div>
                  </div>
                </div>
              </template>
              <div class="tableclass pt-2">
                <el-table :cell-style='{ textAlign:"center",color: "#333",height:"20px",padding:"0px" }' show-summary :summary-method="getSummaries"
                  :header-cell-style="{'text-align':'center','background':'#E7F4FE','color':'#303133'}" :data="formdata.form.tableData" border style="width: 100%">
                  <el-table-column type="index" label="序号" width="50" />
                  <el-table-column prop="Project" label="产品名称">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Name'" :rules="rules.Name">
                        <el-input :readonly='formdata.disabled' type="textarea" style="width:100%" :rows="1" :autosize="{ minRows: 1, maxRows:99}" v-model="scope.row.Name"
                          placeholder="请输入产品名称">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Model" width="150" label="型号">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Model'" :rules="rules.Model">
                        <el-input :readonly='formdata.disabled' type="textarea" style="width:100%" :rows="1" :autosize="{ minRows: 1, maxRows:99}" v-model="scope.row.Model"
                          placeholder="请输入型号">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Specs" width="100" label="规格">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Specs'" :rules="rules.Specs">
                        <el-input :readonly='formdata.disabled' type="textarea" style="width:100%" :rows="1" :autosize="{ minRows: 1, maxRows:99}" v-model="scope.row.Specs"
                          placeholder="请输入规格">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Unit" width="50" label="单位">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Unit'" :rules="rules.Unit">
                        <el-input :readonly='formdata.disabled' v-model="scope.row.Unit" placeholder="单位"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Num" width="50" label="数量">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Num'" :rules="rules.Num">
                        <el-input :readonly='formdata.disabled' type="Number" v-model="scope.row.Num" placeholder="" @change="getRowPrice(scope.row, scope.$index)"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Price" width="50" label="单价">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Price'" :rules="rules.Price">
                        <el-input :readonly='formdata.disabled' type="Number" v-model="scope.row.Price" placeholder="" @change="getRowPrice(scope.row, scope.$index)"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Amount" width="80" label="金额">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Amount'" :rules="rules.Amount">
                        <el-input :readonly='true' v-model="scope.row.Amount" placeholder=""></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>

                  <el-table-column label="操作" v-if="formdata.disabled==false" width="40">
                    <template #default="scope">
                      <div>
                        <el-button text class="textbut" size="small" style="padding: 5px;width: 45px;color: red;" @click="delentity(scope.$index)">删除</el-button>
                      </div>

                    </template>
                  </el-table-column>
                </el-table>
                <div class="font-bold">
                  合计金额大写：{{toChies(formdata.form.Amount)}}
                </div>
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
            <template v-if="formdata.ViewType != 1">
              <!-- 审批记录 -->
              <slot name="ApprovalProcess"></slot>
              <!-- 审批 -->
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
      </div>

    </CusDialog>

    <CheckCus v-if="cuslist.show" @closeWindow="closecus" @GetCustomer="getcusinfo"></CheckCus>
  </div>
</template>
<script lang="ts" setup>
import CheckCus from '/@/views/Sale/Customer/Component/CheckCus.vue'
import { Signage, Receiving, Cooperation, Urgency } from '/@/utils/techprocess'
import { GetUserinformation } from '/@/api/layout/index'
import { PostAddOrEditCostSample, GetCostSampleById, PostApprovalCostSample } from '/@/api/Sale/Cost'
import { remoteUrl, toChies, parseTime, getTime } from '/@/utils/tools'
import CusDialog from '../../Component/CusDialog.vue'
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
    default: '样品费'
  }
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Name: [
    {
      required: true,
      message: '请输入产品名称',
      trigger: 'change'
    }
  ],
  Model: [
    {
      required: true,
      message: '请输入型号',
      trigger: 'change'
    }
  ],
  Specs: [
    {
      required: true,
      message: '请输入规格',
      trigger: 'change'
    }
  ],
  Unit: [
    {
      required: true,
      message: '请输入单位',
      trigger: 'change'
    }
  ],
  Num: [
    {
      required: true,
      message: '请输入数量',
      trigger: 'change'
    }
  ],
  NeedName: [
    {
      required: true,
      message: '请输入需求方',
      trigger: 'change'
    }
  ],
  Cooperation: [
    {
      required: true,
      message: '请选择合作状态',
      trigger: 'change'
    }
  ],
  Urgency: [
    {
      required: true,
      message: '请选择紧急程度',
      trigger: 'change'
    }
  ],
  Duration: [
    {
      required: true,
      message: '请选择供货周期',
      trigger: 'change'
    }
  ],
  SupplierName: [
    {
      required: true,
      message: '请输入供货方',
      trigger: 'change'
    }
  ],
  Signage: [
    {
      required: true,
      message: '请选择标牌证件',
      trigger: 'change'
    }
  ],
  Receiving: [
    {
      required: true,
      message: '请选择收货方式',
      trigger: 'change'
    }
  ],
  UsingTime: [
    {
      required: true,
      message: '请选择使用日期',
      trigger: 'change'
    }
  ],
  Reason: [
    {
      required: true,
      message: '请输入申请理由',
      trigger: 'change'
    }
  ]
})
const cuslist = reactive({
  show: false
})

const showcus = () => {
  cuslist.show = true
}

const closecus = () => {
  cuslist.show = false
}

const getcusinfo = (val: any) => {
  formdata.form.NeedName = val.Name
}

const ApprovalForm = (num: number) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: formdata.Approval.remark,
    dataid: formdata.form.Id
  }
  PostApprovalCostSample(arr).then((res: any) => {
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

const getCostSampleInfo = () => {
  var Id = props.info.Id ? props.info.Id : props.DataId
  GetCostSampleById({ Id: Id }).then((res) => {
    if (res.code == 1) {
      formdata.form = res.data.bill
      formdata.form.tableData = res.data.entity
    }
  })
}
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

// 计算每一行的总金额
const getRowPrice = (row: any, index: any) => {
  let Price = Number(row.Price)
  let Num = Number(row.Num)
  let endPrice = <any>(Price * Num).toFixed(2)
  if (endPrice >= 0) {
    formdata.form.tableData[index]['Amount'] = endPrice
  } else {
    formdata.form.tableData[index]['Amount'] = 0
  }
}

///计算合计
const getSummaries = (param: any) => {
  const { columns, data } = param
  const sums: string[] = []
  columns.forEach((column: any, index: any) => {
    if (index === 0) {
      sums[index] = ' 合计'
      return
    }
    if (column.property == 'Amount') {
      const values = data.map((item: any) => Number(item[column.property]))

      if (!values.every((value: any) => Number.isNaN(value))) {
        sums[index] = `${values.reduce((prev: any, curr: any) => {
          const value = Number(curr)

          console.log('prev', prev)
          console.log('curr', value)
          if (!Number.isNaN(value)) {
            return prev + curr
          } else {
            return prev
          }
        }, 0)}`
      } else {
        sums[index] = ''
      }
    } else {
      sums[index] = ''
    }
  })
  sums[7] = Number(sums[7]).toFixed(2)
  if (!Number.isNaN(sums[7])) {
    formdata.form.Amount = Number(sums[7])
  }

  console.log('sums[index]', sums)
  return sums
}

//详情实体
interface Entity {
  Name: string
  Model: string
  Specs: string
  Unit: string
  Num: number
  Price: number
  Amount: number
}
const formdata = <any>reactive({
  ViewType: 1,
  Approval: {
    remark: ''
  },
  form: {
    Id: 0,
    NeedName: '', //需求方
    Cooperation: null, //合作状态
    Urgency: null, //紧急程度
    Duration: null, //供货周期
    SupplierName: '', //供货方
    Signage: null, //标牌证件
    Receiving: null, //收货方式
    UsingTime: '', //使用日期
    Reason: '',
    Note: '',
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CreateOn: parseTime(getTime('day'), ''),
    Amount: 0,
    tableData: <Entity[]>[]
  },
  uploadShow: false,

  disabled: false
})
//删除条目
const delentity = (index: any) => {
  console.log(index)
  formdata.form.tableData.splice(index, 1)
}
//添加条目
const addentity = (type: any) => {
  var entity = <Entity>{}
  entity.Amount = 0
  entity.Num = 1
  formdata.form.tableData.push(entity)
  // 解决textear高度无法设置为1问题
  if (type) {
    formdata.form.tableData[0].Name = ' '
    setTimeout(() => {
      formdata.form.tableData[0].Name = ''
    });
  }
}
///提交
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      var postdata: any = {}
      postdata.bill = JSON.parse(JSON.stringify(formdata.form))
      postdata.entity = postdata.bill.tableData
      postdata.bill.State = type

      postdata.AddOrEdit = 1
      if (formdata.ViewType != 1) {
        postdata.AddOrEdit = 2
      }

      PostAddOrEditCostSample(postdata).then((res) => {
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
      ElMessage.warning('产品明细中产品名称，型号，规格，单位及数量为必填项。请检查是否填写完整')
    }
  })
}
onMounted(() => {
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
    addentity(1)
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
      -webkit-text-fill-color: #606266;
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
      }
    }
  }
  :deep(.el-card__body) {
    padding: 0rem;
  }
  .inputwidth {
    width: 178px;
  }
  .otherinputwidth {
    width: 178px;
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
}

:deep(input::-webkit-inner-spin-button) {
  -webkit-appearance: none !important;
}
 
:deep(input::-webkit-outer-spin-button) {
  -webkit-appearance: none !important;
}
 
:deep(input[type="number"]) {
  -moz-appearance: textfield;
}
</style>
