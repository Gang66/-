<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addcompetitor text-base'>
        <div class='salerDialog'>
          <el-form ref='ruleFormRef' :model='data.form' :rules="rules" :inline='true'>
            <el-card class='sale_card mt-2 tablecard'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>基本信息</div>
                  <div class='header-right  justify-end'>
                    <div class="flex justify-end">
                      <div v-if="ViewType!=1" class="pr-2">
                        添加时间：{{ (data.form.CreateOn||'').substring(0,11)}}
                      </div>
                    </div>

                  </div>
                </div>
              </template>
              <div>
                <el-form-item label='公司名称' prop="Company">
                  <el-input v-model='data.form.Company' :readonly='data.disabled' placeholder='请输入' style='width:660px;height:32px;' />
                </el-form-item>
                <el-form-item label='对手属性' prop="Attribute">
                  <el-select v-model='data.form.Attribute' class="inputwidth" placeholder='请选择' :disabled='data.disabled'>
                    <el-option key='1' label='厂家' value='厂家' />
                    <el-option key='2' label='经销商' value='经销商' />
                    <el-option key='3' label='代理商' value='代理商' />
                    <el-option key='4' label='名义厂家' value='名义厂家' />
                  </el-select>
                </el-form-item>
                <el-form-item label='客户关系' prop="Relationship">
                  <el-select v-model='data.form.Relationship' class="inputwidth" placeholder='请选择' :disabled='data.disabled'>
                    <el-option key='1' label='利益关系' value='利益关系' />
                    <el-option key='2' label='亲情关系' value='亲情关系' />
                    <el-option key='3' label='政客关系' value='政客关系' />
                    <el-option key='4' label='其他关系' value='其他关系' />
                  </el-select>
                </el-form-item>
                <el-form-item label='签约方式' prop="Signing">
                  <el-select v-model='data.form.Signing' class="inputwidth" placeholder='请选择' :disabled='data.disabled'>
                    <el-option key='1' label='生产厂家' value='生产厂家' />
                    <el-option key='2' label='经销商' value='经销商' />
                    <el-option key='3' label='其他' value='其他' />
                  </el-select>
                </el-form-item>
                <el-form-item label='合作状态' prop="Cooperation">
                  <el-select v-model='data.form.Cooperation' class="inputwidth" placeholder='请选择' :disabled='data.disabled'>
                    <el-option key='1' label='顺利' value='顺利' />
                    <el-option key='2' label='部分瑕疵' value='部分瑕疵' />
                    <el-option key='3' label='不顺利' value='不顺利' />
                    <el-option key='4' label='无合作' value='无合作' />
                  </el-select>
                </el-form-item>
                <el-form-item label='公司地址' prop="Address">
                  <el-input v-model='data.form.Address' placeholder='请输入' style='width:660px' />
                </el-form-item>
              </div>
            </el-card>
          </el-form>
          <el-card class='sale_card'>
            <template #header>
              <div class='card-header'>
                <div class='header-left'>基本情况</div>
                <div class='header-right'>
                  <div class="flex justify-end">
                    <div>

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
              <div>1、竞争对手品牌及定位、规模及资金量等</div>
              <el-input :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" v-model="data.form.Remark" :readonly='data.infodisabled' placeholder="请输入"></el-input>
              <div class="pt-2">2、竞争对手与客户关系程度及以往合作情况</div>
              <el-input :autosize="{ minRows: 1, maxRows: 4 }" type="textarea" v-model="data.form.Note" :readonly='data.infodisabled' placeholder="请输入"></el-input>
            </div>
          </el-card>
        </div>
      </div>
      <div v-if="data.disabled==false||data.infodisabled==false" class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef,1)">
          提交
        </el-button>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetUserinformation } from '/@/api/layout/index'
import { PostEditCompetitor, PostAddCompete, GetCompeteInfo } from '/@/api/Sale/Customer'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是查看 3是分析
  },
  CustomerId: {
    type: Number,
    default: 0
  },
  DataId: {
    type: Number,
    default: 0
  },
  Data: {
    type: Object,
    default: {}
  },
  CustomerName: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Company: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Attribute: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Relationship: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Signing: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Cooperation: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Address: [
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
const boxStyle = reactive({
  boxWidth: 'w-800',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  infodisabled: false,
  disabled: false,
  form: <any>{
    CustomerName: props.CustomerName,
    CustomerId: props.CustomerId,
    Company: '',
    Attribute: '',
    Relationship: '',
    Signing: '',
    Cooperation: '',
    Address: '',
    Remark: '',
    Note: ''
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
const submitForm = (formEl: FormInstance | undefined, type: number) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (props.ViewType == 1) {
        PostAddCompete(data.form).then((res) => {
          if (res.code == 1) {
            ElMessage.success(res.message)
            closeWindow()
            return true
          } else {
            ElMessage.error(res.message)
          }
        })
      } else if (props.ViewType == 3) {
        PostEditCompetitor(data.form).then((res) => {
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
      }
    } else {
    }
  })
}
const getreportinfo = () => {
  GetCompeteInfo({ CusId: props.CustomerId, DataId: props.DataId }).then((res) => {
    if (res.code == 1) {
      data.form = res.data

      if (props.ViewType == 2) {
        data.disabled = true
        data.infodisabled = true
      } else if (props.ViewType == 4) {
        data.disabled = true
        data.infodisabled = false
      }
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
.addcompetitor {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  .inputwidth {
    width: 294px;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 4.5rem;
  }
  .salerDialog {
    :deep(.el-card__body) {
      padding: 0px;
      padding-top: 1rem;
    }
  }
}
</style>
