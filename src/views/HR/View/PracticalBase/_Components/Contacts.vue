<template>
  <CusDialog :boxStyle="boxStyle" :dialog-visible="dialogVisible" :title="titleName + title" @closeWindow="closeWindow">
    <div class="addcontact">
      <div class="salerDialog">
        <el-card>
          <template #header>
            <div class="card-header">
              <div class="header-left">基本信息</div>
              <div class="header-right" />
            </div>
          </template>
          <el-form ref="formRef" :model="form" :rules="rules" :inline="true">
            <div v-if="form.Type != '居间人'" class="p-4">
              <el-form-item label="公司名称">
                <el-input v-model="CustomerName" placeholder="请输入" style="width: 330px; height: 32px" :readonly="true" />
              </el-form-item>
              <el-form-item label="类别" prop="Type">
                <el-select v-model="form.Type" style="width: 129px" placeholder="请选择" :disabled="selectInfo">
                  <el-option key="1" label="决策人" value="决策人" />
                  <el-option key="2" label="关键人" value="关键人" />
                  <el-option key="3" label="重点人" value="重点人" />
                  <el-option key="4" label="居间人" value="居间人" />
                </el-select>
              </el-form-item>
              <el-form-item label="姓名" prop="Name">
                <el-input v-model="form.Name" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="性别" prop="Sex">
                <el-select v-model="form.Sex" style="width: 129px" placeholder="请选择" :disabled="selectInfo">
                  <el-option key="1" label="男" value="男" />
                  <el-option key="2" label="女" value="女" />
                </el-select>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.AgeGroup" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="职务" prop="Duties">
                <el-select v-model="form.Duties" placeholder="请选择" class="inputclass" :disabled="selectInfo">
                  <el-option key="1" label="董事长" value="董事长"></el-option>
                  <el-option key="2" label="总经理" value="总经理"></el-option>
                  <el-option key="3" label="副总经理" value="副总经理"></el-option>
                  <el-option key="4" label="技术总监" value="技术总监"></el-option>
                  <el-option key="5" label="采购经理" value="采购经理"></el-option>
                  <el-option key="6" label="采购员" value="采购员"></el-option>
                  <el-option key="7" label="车间主任" value="车间主任"></el-option>
                  <el-option key="9" label="不详" value="不详"></el-option>
                  <el-option key="8" label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="职务背景">
                <el-select v-model="form.DutiesBack" placeholder="请选择" class="inputclass" :disabled="selectInfo">
                  <el-option key="1" label="大股东" value="大股东"></el-option>
                  <el-option key="2" label="小股东" value="小股东"></el-option>
                  <el-option key="3" label="老板亲信" value="老板亲信"></el-option>
                  <el-option key="4" label="技术领导" value="技术领导"></el-option>
                  <el-option key="5" label="职业经理" value="职业经理"></el-option>
                  <el-option key="7" label="不详" value="不详"></el-option>
                  <el-option key="6" label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="form.Mobile" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="公司手机" prop="CompanyMobile">
                <el-input v-model="form.CompanyMobile" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="个人手机" prop="Telephone">
                <el-input v-model="form.Telephone" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="微信">
                <el-input v-model="form.WeiXin" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.Email" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="家庭地位">
                <el-input v-model="form.FamilyStatus" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="婚育">
                <el-input v-model="form.Marriage" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.Note" placeholder="请输入" style="width: 532px; height: 32px" />
              </el-form-item>
              <!-- <el-form-item label='个人情况'>
                <el-input v-model='form.PersonalInfo' placeholder='请输入' class="inputclass" />
              </el-form-item> -->
            </div>
            <div v-if="form.Type == '居间人'" class="p-4">
              <el-form-item label="公司名称">
                <el-input v-model="CustomerName" placeholder="请输入" style="width: 330px; height: 32px" :readonly="true" />
              </el-form-item>
              <el-form-item label="类别" prop="Type">
                <el-select v-model="form.Type" style="width: 129px" placeholder="请选择" :disabled="selectInfo">
                  <el-option key="1" label="决策人" value="决策人" />
                  <el-option key="2" label="关键人" value="关键人" />
                  <el-option key="3" label="重点人" value="重点人" />
                  <el-option key="4" label="居间人" value="居间人" />
                </el-select>
              </el-form-item>
              <el-form-item label="姓名" prop="Name">
                <el-input v-model="form.Name" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="性别" prop="Sex">
                <el-select v-model="form.Sex" style="width: 129px" placeholder="请选择" :disabled="selectInfo">
                  <el-option key="1" label="男" value="男" />
                  <el-option key="2" label="女" value="女" />
                </el-select>
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="form.AgeGroup" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="任职企业">
                <el-input v-model="form.Employer" placeholder="请输入" style="width: 330px; height: 32px" :readonly="selectInfo" />
              </el-form-item>
              <el-form-item label="职务" prop="Duties">
                <el-select v-model="form.Duties" placeholder="请选择" class="inputclass" :disabled="selectInfo">
                  <el-option key="1" label="董事长" value="董事长"></el-option>
                  <el-option key="2" label="总经理" value="总经理"></el-option>
                  <el-option key="3" label="副总经理" value="副总经理"></el-option>
                  <el-option key="4" label="技术总监" value="技术总监"></el-option>
                  <el-option key="5" label="采购经理" value="采购经理"></el-option>
                  <el-option key="6" label="采购员" value="采购员"></el-option>
                  <el-option key="7" label="车间主任" value="车间主任"></el-option>
                  <el-option key="9" label="不详" value="不详"></el-option>
                  <el-option key="8" label="其他" value="其他"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="个人手机" prop="Telephone">
                <el-input v-model="form.Telephone" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="微信">
                <el-input v-model="form.WeiXin" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="form.Email" placeholder="请输入" class="inputclass" />
              </el-form-item>
              <el-form-item label="备注">
                <el-input v-model="form.Note" placeholder="请输入" style="width: 485px; height: 32px" />
              </el-form-item>
            </div>
          </el-form>
        </el-card>

        <div v-if="form.Type != '居间人'">
          <!--           <el-card class="mt-4">
            <template #header>
              <div class='card-header'>
                <div class='header-left'>主观调查</div>
                <div class='header-right'>
                  <div class="flex justify-between">
                    <div>
                      <div class="flex pt-2 pl-4">
                        <div v-for='(item,i) in Problems' :key='i' @click="checkProblemsEvent(item)" class=" headerbut  cursor-pointer"
                          :style="checkProblems.findIndex((x)=>x.id==item.id)>-1?'background: #027AFF;':''">
                          {{i+1}}
                        </div>
                      </div>
                    </div>
                    <div>

                      <el-badge v-if="count>0" :value="count" type="primary" class="mr-8">
                        <el-button @click="showmessage">
                          消息记录
                          <el-icon-ChatLineRound class='w-4 h-4 mr-2' />
                        </el-button>
                      </el-badge>

                      <el-button v-if="count>0" @click="addSentiment()">
                        新增
                        <el-icon-plus class='w-4 h-4 mr-2' />
                      </el-button>
                    </div>

                  </div>

                </div>
              </div>
            </template>
            <div>
              <div class="flex justify-between text-sm font-bold">
                <div>
                  请从上面10道题中任选<span style="color:#DB0C0C;">5</span>道题回答
                </div>
                <div>
                  性格结果：<span>未知</span>
                </div>
              </div>
              <div v-for='(item,i) in checkProblems' :key='i'>
                <div>{{(i+1)+'.'+item.title}}</div>
                <div>
                  <el-radio-group v-model="item.CheckId">
                    <el-radio :disabled='conviewType==3' v-for="(child,c) in item.children" :label="child.id">{{child.title}}</el-radio>
                  </el-radio-group>
                </div>
              </div>
            </div>
          </el-card> -->
          <el-card class="mt-4">
            <template #header>
              <div class="card-header">
                <div class="header-left">方案对策</div>
                <div class="header-right">
                  <div class="flex justify-between">
                    <div class="pt-2 pl-2">以下方案可供参考</div>
                    <div></div>
                  </div>
                </div>
              </div>
            </template>
            <div class="p-4">
              <el-row>
                <el-col :lg="12"> 1、可通过政府部门或朋友、战友、同学影响决策人</el-col>
                <el-col :lg="12">3、可通过品牌或专业性或技术员支持影响决策人</el-col>
                <el-col :lg="12">2、可通过降低成本或付款方式影响决策人</el-col>
                <el-col :lg="12"> 4、可通过多次拜访加深关系或其他方案影响决策人</el-col>
                <el-col :lg="24">
                  <el-input placeholder="请输入" type="textarea" :readonly="conviewType == 3" v-model="form.Remark"></el-input>
                </el-col>
              </el-row>
            </div>
          </el-card>
        </div>
        <div v-if="form.Type == '居间人'">
          <el-card class="sale_card mt-2">
            <template #header>
              <div class="card-header">
                <div class="header-left">居间协议</div>
                <div class="header-right text-right"></div>
              </div>
            </template>
            <div>
              <div :class="selectInfo ? '' : '-mt-8'">
                <uploadfile :isdisabled="selectInfo" :uploadFileList="form.FileList" @uploadFileData="uploadFileData"></uploadfile>
              </div>
            </div>
          </el-card>
          <el-card class="sale_card mt-2">
            <template #header>
              <div class="card-header">
                <div class="header-left">关联项目</div>
                <div class="header-right text-right"></div>
              </div>
            </template>
            <div class="el-card__body">
              <el-table border :data="form.SituationData" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '24px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '24px', padding: '0px' }" style="width: 100%">
                <el-table-column type="index" width="60" label="序号" />
                <el-table-column prop="CreatrOn" label="授权品牌"> </el-table-column>
                <el-table-column prop="Type" label="服务项目" />
                <el-table-column prop="Type" width="100" label="协议金额" />
                <el-table-column prop="Type" width="50" label="关系" />
                <el-table-column prop="Name" width="50" label="成交" />
              </el-table>
            </div>
          </el-card>
        </div>
        <div v-if="conviewType != 3" class="text-center pt-6">
          <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
          <el-button type="primary" @click="submitForm(formRef)"> 提交 </el-button>
        </div>
      </div>
    </div>
    <CusDialog v-if="messageview" :box-style="mesboxStyle" title="消息记录" :is-show="true" @closeWindow="cancelmessage">
      <el-card class="sale_card mt-6">
        <el-table border :data="messagelist" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '24px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '24px', padding: '0px' }" style="width: 100%">
          <el-table-column type="index" width="60" label="序号" />
          <el-table-column prop="CreateOn" label="录入时间">
            <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
          </el-table-column>
          <el-table-column prop="CreaterName" label="业务员" />
          <el-table-column prop="address" label="操作">
            <template #default="scope">
              <span class="text-blue-400 cursor-pointer" @click="checkSentiment(scope.row.Id)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </CusDialog>
  </CusDialog>
</template>

<script lang="ts" setup>
import { isMobileTel, isEmail, isNumber, isTel } from '/@/utils/validate'
import { GetSentimentList, GetSituationInfo, GetCustomerProblems, PostAddOrEditSituationInfo } from '/@/api/hr/School/PracticalBase'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const boxStyle = ref({
  boxWidth: 'w-900',
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
  messageview.value = true
  GetSentimentListEvent()
}

const cancelmessage = () => {
  SentimentId.value = 0
  messageview.value = false
}

const checkSentiment = (val: Number) => {
  SentimentId.value = val
  GetSituationInfoEvent()
  cancelmessage()
}
const GetSentimentListEvent = () => {
  GetSentimentList({ SituationId: form.value.Id }).then((res) => {
    if (res.code == 1) {
      messagelist.value = res.data
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
  title: {
    type: String,
    default: '新增联系人'
  }
})
const count = ref(0)
const conviewType = ref(0)
const rules = reactive<FormRules>({
  Name: [
    {
      required: true,
      message: '请输入联系人姓名',
      trigger: 'blur'
    }
  ],
  Type: [
    {
      required: true,
      message: '请选择联系人类别',
      trigger: 'change'
    }
  ],
  Sex: [
    {
      required: true,
      message: '请输入联系人性别',
      trigger: 'blur'
    }
  ],
  CompanyMobile: [
    {
      required: true,
      message: '请输入公司手机',
      trigger: 'blur'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  Telephone: [
    {
      required: true,
      message: '请输入个人手机',
      trigger: 'blur'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  Duties: [
    {
      required: true,
      message: '请选择职务',
      trigger: 'blur'
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

const form = ref({
  Id: 0,
  CustomerId: 0,
  Name: '',
  Sex: '',
  AgeGroup: '',
  Duties: '',
  DutiesBack: '',
  Mobile: '',
  CompanyMobile: '',
  Telephone: '',
  WeiXin: '',
  Email: '',
  FamilyStatus: '',
  Marriage: '',
  Note: '',
  PersonalInfo: '',
  Remark: '',
  Employer: '',
  FileList: []
})

const uploadFileData = (data: any) => {
  form.value.FileList = data
}
const checkProblems = ref<any[]>([])
const Problems = ref([])

const addSentiment = () => {
  conviewType.value = 4
  checkProblems.value = []
  checkDetail.value = []
  Sentiment.value.Note = ''
  Sentiment.value.Id = 0
}

const checkProblemsEvent = (val: any) => {
  if (conviewType.value != 3) {
    var pro = checkProblems.value.findIndex((item) => item.id == val.id)
    if (pro > -1) {
      checkProblems.value.splice(pro, 1)
    } else {
      checkProblems.value.push(val)
    }
  }
}

const selectInfo = ref(false)
const updateType = () => {
  selectInfo.value = false
}

const GetCustomerProblemsEvent = () => {
  GetCustomerProblems().then((res) => {
    if (res.code == 1) {
      Problems.value = res.data
      if (conviewType.value != 1) {
        GetSituationInfoEvent()
      }
    }
  })
}

const emit = defineEmits(['cancelcontact'])

const closeWindow = () => {
  emit('cancelcontact')
}
const GetSituationInfoEvent = () => {
  GetSituationInfo({
    SitId: props.SituationId,
    SentimentId: SentimentId.value
  }).then((res) => {
    if (res.code == 1) {
      var info = res.data.Info
      if (info.FileList) {
        info.FileList = JSON.parse(info.FileList)
      }
      form.value = info

      if (props.ViewType == 3 || props.ViewType == 4) {
        titleName.value = form.value.Name + '的'
      }
      if (res.data.Sentiment) {
        Sentiment.value = res.data.Sentiment
      }

      count.value = res.data.Count
      if (res.data.Detail) {
        checkProblems.value = []
        res.data.Detail.forEach((item: any) => {
          let check: any = Problems.value.find((f: any) => {
            if (f.id == item.DetailId) {
              return f
            }
          })
          if (check) {
            let c = Object.assign({}, check)
            c.CheckId = item.CheckId
            checkProblems.value.push(c)
          }
        })
      }
    }
  })
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (conviewType.value == 4) {
    submit()
    return
  }
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      submit()
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const submit = () => {
  form.value.CustomerId = props.CustomerId

  if (conviewType.value != 1 && conviewType.value != 2) {
    if (checkProblems.value.length < 5) {
      ElMessage.warning('主观调查至少选择5道题')
      return false
    }

    for (let index = 0; index < checkProblems.value.length; index++) {
      if (!checkProblems.value[index].CheckId) {
        ElMessage.warning('主观调查请回答完整')
        return false
      } else {
        let check = checkProblems.value[index].children.find((item: any) => {
          if (item.id == checkProblems.value[index].CheckId) {
            return item
          }
        })

        if (check) {
          let del: any = {}
          del.title = checkProblems.value[index].title
          del.DetailId = checkProblems.value[index].id
          del.CheckColor = check.ColorType
          del.CheckTitle = check.title
          del.CheckId = check.id
          checkDetail.value.push(del)
        }
      }
    }
    if (!Sentiment.value.Note) {
      ElMessage.warning('请输入方案对策')
      return
    }
  }

  let postdata: any = {}
  postdata.AddOrEdit = conviewType.value
  postdata.Info = JSON.parse(JSON.stringify(form.value))
  if (form.value.FileList.length > 0) {
    postdata.Info.FileList = JSON.stringify(postdata.Info.FileList)
  } else {
    postdata.Info.FileList = ''
  }
  postdata.Detail = checkDetail.value
  postdata.Sentiment = Sentiment.value
  postdata.Sentiment.SituationId = form.value.Id
  PostAddOrEditSituationInfo(postdata).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
  console.log('', checkDetail)
}

onMounted(() => {
  conviewType.value = props.ViewType
  GetCustomerProblemsEvent()
})
</script>

<style lang="postcss" scoped>
.addcontact {
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
    width: 129px;
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
    width: 4.5rem;
  }
}
</style>
