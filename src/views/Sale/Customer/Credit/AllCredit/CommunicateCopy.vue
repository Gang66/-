<template>
  <div :boxStyle='boxStyle' :dialog-visible='dialogVisible' :title='data.form.CustomerName+"的沟通"' @closeWindow='closeWindow'>
    <div class="addcontact">

      <div class="salerDialog">
        <el-card>
          <template #header>
            <div class='card-header'>
              <div class='header-left'>基本信息</div>
              <div class='header-right '>
                <div class="flex justify-end">
                  <el-button v-if="conviewType!=5" size="small" @click="showmessage">
                    <el-icon-ChatLineRound class='w-4 h-4 mr-2' />
                    历史记录
                  </el-button>
                </div>

              </div>
            </div>
          </template>
          <el-form ref='formRef' :model='data.form' :rules="rules" :inline='true'>
            <div class="p-2">

              <el-form-item label='联系人' prop="CustomerConId">
                <el-select v-if="conviewType==1" :disabled='conviewType==5||conviewType==3' v-model="data.form.CustomerConId" @change="changeCusCon" placeholder="请选择"
                  class="inputclass">
                  <el-option v-for="item in data.SituationData" :key=" item.Id" :label="item.Name" :value="item.Id"></el-option>
                </el-select>
                <el-input v-else v-model='data.form.ConName' :readonly='true' class="inputclass" />
              </el-form-item>
              <el-form-item label='类别'>
                <el-input v-model='data.form.Type' :readonly='true' class="inputclass" />

              </el-form-item>
              <el-form-item label='职务'>
                <el-input v-model='data.form.Duties' :readonly='true' class="inputclass" />

              </el-form-item>
              <el-form-item label='性别'>
                <el-input v-model='data.form.Sex' :readonly='true' class="inputclass" />
              </el-form-item>
              <el-form-item label='年龄'>
                <el-input v-model='data.form.AgeGroup' :readonly='true' class="inputclass" />
              </el-form-item>
              <el-form-item label='电话'>
                <el-input v-model='data.form.Telephone' :readonly='true' class="inputclass" />
              </el-form-item>

              <!-- <el-form-item label='个人情况'>
                <el-input v-model='form.PersonalInfo' placeholder='请输入' class="inputclass" />
              </el-form-item> -->
            </div>

          </el-form>
        </el-card>

        <div>
          <el-card class="mt-4">
            <template #header>
              <div class='card-header'>
                <div class='header-left'>沟通详情</div>
                <div class='header-right'>
                  <div class="flex justify-between">
                    <div>
                      <div class="flex pt-2 pl-4">
                        <div v-for='(item,i) in Problems' :key='i' @click="checkProblemsEvent(item)" class=" headerbut  cursor-pointer"
                          :style="checkProblems.findIndex((x)=>x.Id==item.Id)>-1?'background: #027AFF;':''">
                          {{i+1}}
                        </div>
                      </div>
                    </div>
                    <div>

                    </div>

                  </div>

                </div>
              </div>
            </template>
            <div>
              <div class="flex justify-between text-sm font-bold">
                <div>
                  请从上面5个沟通主题中至少选择<span style="color:#DB0C0C;">1</span>个沟通主题进行回答
                </div>
              </div>
              <div v-for='(item,i) in checkProblems' :key='i'>
                <div>{{(i+1)+'.'+item.Title}}</div>
                <div>
                  <el-input placeholder='请输入' type="textarea" :readonly="conviewType==3" v-model="item.Remark"></el-input>
                </div>
              </div>
            </div>
          </el-card>

          <el-card v-if="conviewType==3||conviewType==5" class="mt-4">
            <template #header>
              <div class='card-header'>
                <div class='header-left'>沟通记录</div>
                <div class='header-right  pt-2'>
                  <div class="flex justify-end">
                    <div v-if="data.form.Integral">
                      沟通得分：{{data.form.Integral}}分
                    </div>
                    <div v-else>
                      沟通得分：未评分
                    </div>
                  </div>

                </div>
              </div>
            </template>
            <div class="p-2">
              <div class="p-2 overflow-y-auto max-h-80" style="border-radius: 0px;">
                <div v-for="(item,index) in data.history " :key="index" class="border-dashed  border-l-2 border-blue-400 relative p-4">
                  <div class="w-4 h-4 bg-blue-400 rounded-xl absolute -top-2 -left-2"></div>
                  <div>
                    <span class="text-blue-500">{{item.UserName}}</span><span>（{{item.PostName}}）</span><span class="text-gray-400">{{item.CreateOn}}</span>
                  </div>
                  <div>内容:{{item.Note}}
                  </div>
                </div>

              </div>
              <div v-if="conviewType==5" class="py-2">
                评分：
                <el-select :disabled="data.form.Integral" v-model="data.entitie.Integral">
                  <el-option label='1分' :value=1 />
                  <el-option label='2分' :value=2 />
                  <el-option label='3分' :value=3 />
                  <el-option label='4分' :value=4 />
                  <el-option label='5分' :value=5 />
                  <el-option label='6分' :value=6 />
                  <el-option label='7分' :value=7 />
                  <el-option label='8分' :value=8 />
                  <el-option label='9分' :value=9 />
                  <el-option label='10分' :value=10 />
                </el-select>
              </div>
              <div v-if="conviewType==3||conviewType==5">
                <div>
                  <el-input placeholder='请输入内容' type="textarea" v-model="data.entitie.Note"></el-input>
                </div>
                <div v-if="conviewType==3||conviewType==5" class="text-center pt-6">
                  <el-button class="cancelbut" @click="closeWindow">
                    取消
                  </el-button>
                  <el-button type="primary" @click="submitentitie()">
                    提交
                  </el-button>
                </div>
              </div>

            </div>

          </el-card>

        </div>

        <div v-if="conviewType==1" class="text-center pt-6">
          <el-button class="cancelbut" @click="closeWindow">
            取消
          </el-button>
          <el-button type="primary" @click="submitForm(formRef)">
            提交
          </el-button>
        </div>
      </div>
    </div>
    <CusDialog v-if="messageview" :box-style='mesboxStyle' title='消息记录' :is-show='true' @closeWindow='cancelmessage'>
      <el-card class='sale_card mt-6'>
        <el-table border :data='messagelist'
          :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
          :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
          <el-table-column type="index" width="60" label='序号' />
          <el-table-column prop='CreateOn' label='录入时间'>
            <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
          </el-table-column>
          <el-table-column prop='ConName' label='联系人' />
          <el-table-column prop='Integral' label='评分'>
            <template #default="scope">
              <span v-if="scope.row.Integral">{{scope.row.Integral}}</span>
              <span v-else>未评定</span>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template #default="scope">
              <span class="text-blue-400 cursor-pointer" @click="checkSentiment(scope.row.Id)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination small v-model:page-size="change.size" :background="true" layout="prev, pager, next, jumper" :total="change.totals" @size-change="chandleSizeChange"
          @current-change="chandleCurrentChange" />
      </el-card>

    </CusDialog>
  </div>
</template>

<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { CommunicateProblem } from '/@/utils/techprocess'
import { isMobileTel, isEmail, isNumber, isTel } from '/@/utils/validate'
import { GetCusCommunicateInfo, GetCusCommunicateList, GetSituationInfoList, GetUpdateCommunicateState, PostAddCustomerCommunicate, PostAddCusCommunicateEntity } from '/@/api/Sale/Customer'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const boxStyle = ref({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxpt: 'pt-2'
})

///消息记录
const mesboxStyle = ref({
  boxWidth: 'w-900',
  boxHeight: '',
  boxpt: 'pt-2'
})
const SentimentId = ref<Number>(0)
const messageview = ref(false)
const messagelist = ref<any[]>([])
const showmessage = () => {
  getchangelist()
  messageview.value = true
}
const change = reactive({
  size: 10,
  page: 1,
  totals: 0,
  CusId: 0
})
const getchangelist = () => {
  change.CusId = data.form.CustomerId
  GetCusCommunicateList(change).then((res) => {
    if (res.code == 1) {
      messagelist.value = res.data.list
      change.totals = res.data.count
    }
  })
}

const chandleSizeChange = (val: number) => {
  change.size = val
  getchangelist()
}
const chandleCurrentChange = (val: number) => {
  change.page = val
  getchangelist()
}
const cancelmessage = () => {
  messageview.value = false
}

const checkSentiment = (val: Number) => {
  GetCusCommunicateInfo({ DataId: val }).then((res) => {
    if (res.code == 1) {
      data.form = res.data.bill
      data.history = res.data.entities
      checkProblems.value = JSON.parse(res.data.bill.CheckProblems)
      if (conviewType.value != 5) {
        conviewType.value = 3
      }
      getuserinfo()
      updatestate()
    }
  })
  cancelmessage()
}
//更改已读状态
const updatestate = () => {
  GetUpdateCommunicateState({ DataId: data.form.Id, Type: conviewType.value }).then((res) => {
    if (res.code == 1) {
    } else {
    }
  })
}

const SituationInfoList = () => {
  let postdata: any = { page: 1, size: 100 }
  postdata.CustomerId = data.form.CustomerId
  GetSituationInfoList(postdata).then((res) => {
    if (res.code == 1) {
      data.SituationData = res.data.data
    }
  })
}

const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  CustomerId: {
    type: Number,
    default: 0
  },
  SituationId: {
    type: Number,
    default: 0
  },
  CustomerName: {
    type: String,
    default: ''
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  DataId: {
    type: Number,
    default: 0
  },
  title: {
    type: String,
    default: '新增联系人'
  }
})
const count = ref(0)
const conviewType = ref(0)
const rules = reactive<FormRules>({
  CustomerConId: [
    {
      required: true,
      message: '请输入联系人姓名',
      trigger: 'change'
    }
  ]
})

const checkDetail = ref<any[]>([])

const titleName = ref('')
const Sentiment = ref({
  Id: 0,
  Note: '',
  SituationId: 0
})

const data = reactive({
  form: {
    Id: 0,
    ConName: '',
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    CustomerConId: null,
    CustomerId: props.CustomerId ? props.CustomerId : 0,
    CustomerName: props.CustomerName ? props.CustomerName : '',
    Type: '',
    Duties: '',
    Sex: '',
    AgeGroup: '',
    Name: '',
    Telephone: ''
  },
  entitie: {
    BillId: 0,
    UserName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    Note: '',
    Integral: null
  },
  history: [],
  SituationData: []
})

const changeCusCon = () => {
  var con: any = data.SituationData.find((f: any) => f.Id == data.form.CustomerConId)
  if (con) {
    data.form.ConName = con.Name
    data.form.Type = con.Type
    data.form.Duties = con.Duties
    data.form.Sex = con.Sex
    data.form.AgeGroup = con.AgeGroup
    data.form.Telephone = con.Telephone
  }
}

const checkProblems = ref<any[]>([])
const Problems = ref<any[]>([])

const addSentiment = () => {
  conviewType.value = 4
  checkProblems.value = []
  checkDetail.value = []
  Sentiment.value.Note = ''
  Sentiment.value.Id = 0
}

const checkProblemsEvent = (val: any) => {
  if (conviewType.value != 3 && conviewType.value != 5) {
    var pro = checkProblems.value.findIndex((item) => item.Id == val.Id)
    if (pro > -1) {
      checkProblems.value.splice(pro, 1)
    } else {
      checkProblems.value.push(JSON.parse(JSON.stringify(val)))
    }
    console.log('checkProblems.value', checkProblems.value)
  }
}

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      console.log('-----------------------------------', conviewType.value)
      if (conviewType.value == 1) {
        data.form.UserName = res.data.RealName
        data.form.CompName = res.data.CompName
        data.form.DeptName = res.data.DeptName
        data.form.PostName = res.data.PostName
        data.form.CompId = res.data.CompId
        data.form.DeptId = res.data.DeptId
        data.form.PostId = res.data.PostId
      } else {
        data.entitie.UserName = res.data.RealName
        data.entitie.CompName = res.data.CompName
        data.entitie.DeptName = res.data.DeptName
        data.entitie.PostName = res.data.PostName
        data.entitie.CompId = res.data.CompId
        data.entitie.DeptId = res.data.DeptId
        data.entitie.PostId = res.data.PostId
      }
    }
  })
}

const selectInfo = ref(false)
const updateType = () => {
  selectInfo.value = false
}

const GetCustomerProblemsEvent = () => {
  Problems.value = CommunicateProblem
  checkProblems.value.push(JSON.parse(JSON.stringify(Problems.value[0])))
}

const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}

const submitentitie = () => {
  data.entitie.BillId = data.form.Id
  if (!data.entitie.Note) {
    ElMessage.error('请填写内容')
    return false
  }
  var postdata = data.entitie
  PostAddCusCommunicateEntity(postdata).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (checkProblems.value.length <= 0) {
        ElMessage.error('请先选择此次沟通的主题')
        return false
      }
      for (let index = 0; index < checkProblems.value.length; index++) {
        const element = checkProblems.value[index]
        if (!element.Remark) {
          ElMessage.error('请将第' + (index + 1) + '个沟通主题填写完整')
          return false
        }
      }
      var postdata: any = data.form
      postdata.CustomerId = props.CustomerId
      postdata.CustomerName = props.CustomerName
      postdata.CheckProblems = JSON.stringify(checkProblems.value)
      PostAddCustomerCommunicate(postdata).then((res) => {
        if (res.code == 1) {
          ElMessage.success('提交成功')
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

onMounted(() => {
  if (props.ViewType == 1) {
    getuserinfo()
    SituationInfoList()
  }
  if (props.ViewType == 5) {
    checkSentiment(props.DataId)
  }
  conviewType.value = props.ViewType
  GetCustomerProblemsEvent()
})
</script>

<style lang="postcss" scoped>
.addcontact {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  :deep(.el-card__body) {
    padding: 0px;
  }
  :deep(.el-radio__input.is-disabled + span.el-radio__label) {
    font-size: 12px;
    color: var(--el-radio-text-color);
  }
  :deep(.el-radio__input.is-disabled.is-checked .el-radio__inner::after) {
    background-color: var(--el-disabled-bg-color);
  }
  :deep(.el-radio__input.is-disabled.is-checked .el-radio__inner) {
    border-color: var(--el-color-primary);
    background: var(--el-color-primary);
  }

  .cancelbut {
    background: #ffffff;
    border: 1px solid #707070;
    color: #666666;
    &:hover {
      background-color: rgba(255, 255, 255, 0.966);
      border-color: rgba(2, 122, 255, 0.2);
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.966);
      border-color: rgba(2, 122, 255, 0.2);
    }
  }
  .el-radio-group {
    .el-radio {
      margin-right: 10px;
    }
  }
  .headerbut {
    width: 20px;
    height: 20px;
    color: #ffffff;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    margin-right: 5px;
    background: #a8abb2;
  }
  .inputclass {
    width: 190px;
    height: 32px;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  .el-form-item__label {
    color: #303133;
  }

  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 3.5rem;
  }
}
</style>