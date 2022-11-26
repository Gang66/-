<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addother text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='formdata' :rules="rules" :inline='true'>
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
            <el-card class='sale_card mt-2'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>报销明细</div>
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
                  :header-cell-style="{'text-align':'center','background':'#E7F4FE','color':'#303133'}" :data="formdata.tableData" border style="width: 100%">
                  <el-table-column type="index" label="序号" width="50" />
                  <el-table-column prop="Project" width="150" label="报销项目">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Project'" :rules="rules.Project">
                        <el-input :readonly='formdata.disabled' v-model="scope.row.Project" placeholder="请输入报销项目"></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Remark" label="用途说明">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Remark'" :rules="rules.Remark">
                        <el-input :readonly='formdata.disabled' :rows="1" type="textarea" style="width:100%" autosize v-model="scope.row.Remark"
                          placeholder="请输入用途说明">
                        </el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Money" width="100" sortable label="金额">
                    <template #default="scope">
                      <el-form-item :prop="'tableData['+scope.$index+'].Money'" :rules="rules.Money">
                        <el-input :readonly='formdata.disabled' type="Number" v-model="scope.row.Money" placeholder=""></el-input>
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ImgUrl" width="88" label="举证">
                    <template #default="scope">
                      <div class="flex text-center p-2">
                        <span v-if="formdata.disabled==false" @click="ShowUpload(scope.row,scope.$index)" class="mr-2 cursor-pointer text-blue-400">上传</span>
                        <span class="cursor-pointer text-blue-400" @click="$preview(0,retviewurl(scope.row.ImgUrl))">查看</span>
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作" v-if="formdata.disabled==false" width="80">
                    <template #default="scope">
                      <div style="margin: auto 20%;">
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
      <el-dialog v-model=" formdata.uploadShow" v-if=" formdata.uploadShow" width="600px" :append-to-body='true'>
        <uploadimg :uploadFileData='formdata.ImgUrlData' @uploadFileDataEvent='uploadFileData'></uploadimg>
      </el-dialog>

    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { preview } from 'vue3-preview-image'
import { GetUserinformation } from '/@/api/layout/index'
import { PostAddOrEditCostOther, GetCostOtherById, PostApprovalCostOther } from '/@/api/Sale/Cost'
import uploadimg from '/@/components/Upload/uploadimg.vue'
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
    default: '其它费'
  }
})

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Project: [
    {
      required: true,
      message: '请输入报销项目',
      trigger: 'change'
    }
  ],
  Remark: [
    {
      required: true,
      message: '请输入用途说明',
      trigger: 'change'
    }
  ],
  Money: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ]
})
const ApprovalForm = (num: number) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: formdata.Approval.remark,
    dataid: formdata.form.Id
  }
  PostApprovalCostOther(arr).then((res: any) => {
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
const ShowUpload = (row: any, val: any) => {
  formdata.ImgUrlData = row.ImgUrl
  formdata.rowIndex = val
  formdata.uploadShow = true
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

const getCostOtherInfo = () => {
  var Id = props.info.Id ? props.info.Id : props.DataId
  GetCostOtherById({ Id: Id }).then((res) => {
    if (res.code == 1) {
      formdata.form = res.data.bill
      var entity = res.data.Entity
      entity.forEach((item: any) => {
        item.ImgUrl = JSON.parse(item.ImgUrl)
      })
      formdata.tableData = entity
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
const uploadFileData = (data: any) => {
  if (formdata.rowIndex > -1) {
    formdata.tableData[formdata.rowIndex].ImgUrl = data
  }
  formdata.uploadShow = false
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
    if (column.property == 'Money') {
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
  sums[3] = Number(sums[3]).toFixed(2)
  if (!Number.isNaN(sums[3])) {
    formdata.form.Amount = Number(sums[3])
  }

  console.log('sums[index]', sums)
  return sums
}

//详情实体
interface Entity {
  Project: string
  Remark: string
  Money: number
  ImgUrl: Array<any>
}
const formdata = <any>reactive({
  ViewType: 0,
  Approval: {
    remark: ''
  },
  form: {
    Id: 0,
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CreateOn: parseTime(getTime('day'), ''),
    Amount: 0
  },
  ImgUrlData: [],
  rowIndex: -1,
  uploadShow: false,
  tableData: <Entity[]>[],
  disabled: false
})
//删除条目
const delentity = (index: any) => {
  console.log(index)
  formdata.tableData.splice(index, 1)
}
//添加条目
const addentity = (type:any) => {
  var entity = <Entity>{}
  entity.Money = 0
  formdata.tableData.push(entity)
  if (type) {
    formdata.tableData[0].Remark = ' '
    setTimeout(() => {
      formdata.tableData[0].Remark = '' 
    })
  }
  
}
///提交
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (formdata.tableData.length <= 0) {
        ElMessage.warning('请先新增报销项目')
        return false
      }
      var postdata: any = {}
      postdata.bill = formdata.form
      var entity = JSON.parse(JSON.stringify(formdata.tableData))
      entity.forEach((item: any) => {
        item.ImgUrl = JSON.stringify(item.ImgUrl)
      })
      postdata.Entity = entity

      postdata.bill.State = type

      postdata.AddOrEdit = 1
      if (formdata.ViewType != 1) {
        postdata.AddOrEdit = 2
      }
      PostAddOrEditCostOther(postdata).then((res) => {
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
      ElMessage.warning('报销项目，用途说明及金额为必填项目')
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
    getCostOtherInfo()
  }
})
</script>
<style lang="postcss" scoped>
.addother {
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
    width: 170px;
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
/* :deep(.el-textarea__inner::placeholder){
  line-height: 2rem;
}  */
</style>
