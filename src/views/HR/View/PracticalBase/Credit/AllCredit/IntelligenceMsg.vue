<template>
  <CusDialog :boxStyle="boxStyle" :dialog-visible="dialogVisible" :title="data.form.CustomerName" @closeWindow="closeWindow">
    <div class="addcontact">
      <div class="salerDialog">
        <el-card>
          <el-form ref="formRef" :model="data.form" :rules="rules" :inline="true">
            <div class="p-2">
              <el-form-item label="联系人" prop="CustomerConId">
                <el-input v-model="data.form.ConName" :readonly="true" class="inputclass" />
              </el-form-item>
              <el-form-item label="类别">
                <el-input v-model="data.form.Type" :readonly="true" class="inputclass" />
              </el-form-item>
              <el-form-item label="职务">
                <el-input v-model="data.form.Duties" :readonly="true" class="inputclass" />
              </el-form-item>
              <el-form-item label="性别">
                <el-input v-model="data.form.Sex" :readonly="true" class="inputclass" />
              </el-form-item>
              <el-form-item label="年龄">
                <el-input v-model="data.form.AgeGroup" :readonly="true" class="inputclass" />
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="data.form.Telephone" :readonly="true" class="inputclass" />
              </el-form-item>
            </div>
          </el-form>
        </el-card>

        <div>
          <el-card class="mt-4">
            <template #header>
              <div class="card-header">
                <div class="header-left">沟通详情</div>
                <div class="header-right">
                  <div class="flex justify-between">
                    <div>
                      <div class="flex pt-2 pl-4">
                        <div v-for="(item, i) in Problems" :key="i" class="headerbut cursor-pointer" :style="checkProblems.findIndex((x) => x.Id == item.Id) > -1 ? 'background: #027AFF;' : ''">
                          {{ i + 1 }}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <div class="flex justify-between text-sm font-bold">
                <div>请从上面5个沟通主题中至少选择<span style="color: #db0c0c">1</span>个沟通主题进行回答</div>
              </div>
              <div v-for="(item, i) in checkProblems" :key="i">
                <div>{{ i + 1 + '.' + item.Title }}</div>
                <div>
                  <el-input placeholder="请输入" type="textarea" :readonly="true" v-model="item.Remark"></el-input>
                </div>
              </div>
            </div>
          </el-card>

          <el-card v-if="conviewType == 3 || conviewType == 5" class="mt-4">
            <template #header>
              <div class="card-header">
                <div class="header-left">沟通记录</div>
                <div class="header-right pt-2">
                  <div class="flex justify-end">
                    <div v-if="data.form.Integral">沟通得分：{{ data.form.Integral }}分</div>
                    <div v-else>沟通得分：未评分</div>
                  </div>
                </div>
              </div>
            </template>
            <div class="p-2">
              <div class="p-2 overflow-y-auto max-h-80" style="border-radius: 0px">
                <div v-for="(item, index) in data.history" :key="index" class="border-dashed border-l-2 border-blue-400 relative p-4">
                  <div class="w-4 h-4 bg-blue-400 rounded-xl absolute -top-2 -left-2"></div>
                  <div>
                    <span class="text-blue-500">{{ item.UserName }}</span
                    ><span>（{{ item.PostName }}）</span><span class="text-gray-400">{{ item.CreateOn }}</span>
                  </div>
                  <div>内容:{{ item.Note }}</div>
                </div>
              </div>
              <div v-if="conviewType == 5" class="py-2">
                评分：
                <el-select :disabled="true" v-model="data.entitie.Integral">
                  <el-option label="1分" :value="1" />
                  <el-option label="2分" :value="2" />
                  <el-option label="3分" :value="3" />
                  <el-option label="4分" :value="4" />
                  <el-option label="5分" :value="5" />
                  <el-option label="6分" :value="6" />
                  <el-option label="7分" :value="7" />
                  <el-option label="8分" :value="8" />
                  <el-option label="9分" :value="9" />
                  <el-option label="10分" :value="10" />
                </el-select>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
  </CusDialog>
</template>

<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { CommunicateProblem } from '/@/utils/techprocess'
import { isMobileTel, isEmail, isNumber, isTel } from '/@/utils/validate'
import { GetCusCommunicateInfo, GetCusCommunicateList, GetUpdateCommunicateState, PostAddCustomerCommunicate, PostAddCusCommunicateEntity } from '/@/api/hr/School/PracticalBase'

import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

const formRef = ref<FormInstance>()

const boxStyle = ref({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxpt: 'pt-2'
})

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
}
//更改已读状态
const updatestate = () => {
  GetUpdateCommunicateState({ DataId: data.form.Id, Type: conviewType.value }).then((res) => {
    if (res.code == 1) {
    } else {
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
  history: []
})

const checkProblems = ref<any[]>([])
const Problems = ref<any[]>([])

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

const GetCustomerProblemsEvent = () => {
  Problems.value = CommunicateProblem
  checkProblems.value.push(JSON.parse(JSON.stringify(Problems.value[0])))
}

const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}

onMounted(() => {
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
