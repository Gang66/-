<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <div v-if="data.setUp">
        <el-row :gutter="10" justify="end">
          <el-col :md="24" :lg="12">
            <el-form-item label="事业部门">
              <el-tree-select ref="treeRef" style="width: 100%" multiple show-checkbox check-strictly expand-on-click-node v-model="data.ruleForm.DepartIds" :data="data.sourceData"
                collapse-tags collapse-tags-tooltip node-key="Id" :disabled="data.isView" />
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item label="启用时间" prop="BeginDate">
              <el-date-picker v-model="data.ruleForm.BeginDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择启用时间" style="width: 100%" :disabled="data.isView" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="end">
          <el-col :md="24" :lg="12">
            <el-form-item label="合同单位" prop="ContractUnitName">
              <el-select v-model="data.ruleForm.ContractUnitName" placeholder="请选择合同单位" @change="ContractUnitNameEvent" :disabled="data.isView">
                <el-option v-for="item in data.contractList" :key="item.Id" :label="item.ContractUnitName" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item label="法人代表" prop="LegalRep">
              <el-input v-model="data.ruleForm.LegalRep" placeholder="请填写法人代表" :disabled="data.isEdit || data.isView" />
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <el-row :gutter="10" justify="end" v-else>
        <el-col :md="24" :lg="12">
          <el-form-item label="合同单位" prop="ContractUnitName">
            <el-input v-model="data.ruleForm.ContractUnitName" placeholder="请填写合同单位" :disabled="data.isEdit || data.isView" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="法人代表" prop="LegalRep">
            <el-input v-model="data.ruleForm.LegalRep" placeholder="请填写法人代表" :disabled="data.isEdit || data.isView" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" justify="end">
        <el-col :md="24" :lg="24">
          <el-form-item label="注册地址" prop="RegAdd">
            <el-input v-model="data.ruleForm.RegAdd" placeholder="请填写注册地址" :disabled="data.isEdit || data.isView" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" justify="end">
        <el-col :md="24" :lg="12">
          <el-form-item label="劳务单位" prop="LaborUnitName">
            <el-input v-model="data.ruleForm.LaborUnitName" placeholder="请填写劳务单位" :disabled="data.isEdit || data.isView" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="劳务法人" prop="LaborLegalPerson">
            <el-input v-model="data.ruleForm.LaborLegalPerson" placeholder="请填写劳务法人" :disabled="data.isEdit || data.isView" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" justify="end">
        <el-col :md="24" :lg="24">
          <el-form-item label="特殊条款" prop="SpecialProvisions">
            <el-input v-model="data.ruleForm.SpecialProvisions" :autosize="{ minRows: 2, maxRows: 4 }" type="textarea" placeholder="请填写特殊条款"
              :disabled="data.isEdit || data.isView" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" v-if="!data.setUp">
        <el-col :md="24" :lg="24">
          <el-form-item label="是否启用" prop="SpecialStatus">
            <el-radio-group v-model="data.ruleForm.SpecialStatus" placeholder="请选择是否启用" :disabled="data.isEdit">
              <el-radio :label="item.DicKey" v-for="(item, index) in data.ruleForm.job" :key="index" :value="item.DicValue">{{ item.DicValue }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="data.setUp">
        <el-row :gutter="10" justify="end">
          <el-col :md="24" :lg="12">
            <el-form-item label="员工档案">
              <el-select v-model="data.ruleForm.EmployeeFiles" placeholder="请选择" :disabled="data.isView">
                <el-option v-for="item in data.LaborContract" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item label="劳动合同" prop="BeginDate">
              <el-select v-model="data.ruleForm.LaborContract" placeholder="请选择" :disabled="data.isView">
                <el-option v-for="item in data.LaborContract" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10" justify="end">
          <el-col :md="24" :lg="12">
            <el-form-item label="劳务协议">
              <el-select v-model="data.ruleForm.ServiceAgreement" placeholder="请选择" :disabled="data.isView">
                <el-option v-for="item in data.LaborContract" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :md="24" :lg="12">
            <el-form-item label="条款确认">
              <el-select v-model="data.ruleForm.CompanySystem" placeholder="请选择" :disabled="data.isView">
                <el-option v-for="item in data.LaborContract" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </div>
      <div class="bf-search-formItem" v-if="data.isView == false">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import {
  GetContractManagementInfo,
  GetContractManagementList,
  GetDepartByContractinfo,
  PostAddContractByDepartment,
  PostAddEditContractManagementSave
} from '/@/api/system/contractSetting'
import { GetRichTextSelect } from '/@/api/system/richText'
const store = useCommonStore() //记得加这一句
// 根据code 获取劳动合同数据
const GetRichTextSelectEvent = async (code: string) => {
  var arr = {}
  await GetRichTextSelect(code).then((res: any) => {
    arr = res
    // if (code == 'YUANGONGDANGANBIAO') {
    // } else if (code == 'CESHI') {
    // } else if (code == 'LAOWUXIEYI') {
    // } else if (code == 'TIAOKUANQUERENBIAO') {
    // } else {
    // }
  })
  return arr
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        // true为合同设置
        if (data.setUp) {
          var arr = {
            DepartIds: data.ruleForm.DepartIds,
            BeginDate: data.ruleForm.BeginDate,
            ContractManagementGroup: data.ruleForm.Id,
            LaborContract: data.ruleForm.LaborContract
              ? data.ruleForm.LaborContract
              : 0,
            EmployeeFiles: data.ruleForm.EmployeeFiles
              ? data.ruleForm.EmployeeFiles
              : 0,
            ServiceAgreement: data.ruleForm.ServiceAgreement
              ? data.ruleForm.ServiceAgreement
              : 0,
            CompanySystem: data.ruleForm.CompanySystem
              ? data.ruleForm.CompanySystem
              : 0
          }
          PostAddContractByDepartment(arr).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: 'success'
              })
              closeWindow('submit')
            } else {
              ElMessage.error(res.message)
            }
          })
        } else {
          delete data.ruleForm.CompanySystem
          delete data.ruleForm.job
          delete data.ruleForm.EmployeeFiles
          delete data.ruleForm.LaborContract
          delete data.ruleForm.ServiceAgreement
          PostAddEditContractManagementSave(data.ruleForm).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: 'success'
              })
              closeWindow('submit')
            } else {
              ElMessage.error(res.message)
            }
          })
        }
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    DepartIds: [
      { required: true, message: '请选择事业部门', trigger: 'change' }
    ],
    BeginDate: [
      { required: true, message: '请选择启用时间', trigger: 'change' }
    ],
    ContractUnitName: [
      { required: true, message: '请填写合同单位', trigger: 'blur' }
    ],
    LegalRep: [{ required: true, message: '请填写法人代表', trigger: 'blur' }],
    RegAdd: [{ required: true, message: '请填写注册地址', trigger: 'blur' }],
    LaborUnitName: [
      { required: true, message: '请填写劳务单位名称', trigger: 'blur' }
    ],
    LaborLegalPerson: [
      { required: true, message: '请填写劳务法人', trigger: 'blur' }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听合同单位
  const ContractUnitNameEvent = (val: any) => {
    data.Id = val
    GetContractManagementInfoEvent(data)
  }
  return { rules, submitForm, resetForm, ruleFormRef, ContractUnitNameEvent }
}
const GetContractManagementInfoEvent = async (data: any) => {
  GetRichTextSelectEvent('0').then((res: any) => {
    data.LaborContract = res.data
  })
  if (data.Id) {
    if (data.isOrg) {
      await GetDepartByContractinfo(data.Id).then((res) => {
        if (res.code == 1) {
          if (data.setUp) {
            res.data.DepartIds.forEach((val: any) => {
              data.ruleForm.DepartIds.push(val.Id)
            })
            data.ruleForm.BeginDate = res.data.BeginDate
          }
          data.ruleForm.Id = res.data.ContractInfo.Id
          data.ruleForm.ContractUnitName =
            res.data.ContractInfo.ContractUnitName //合同单位
          data.ruleForm.LegalRep = res.data.ContractInfo.LegalRep //法人代表
          data.ruleForm.RegAdd = res.data.ContractInfo.RegAdd //注册地址
          data.ruleForm.SpecialProvisions =
            res.data.ContractInfo.SpecialProvisions //特殊条款
          data.ruleForm.LaborUnitName = res.data.ContractInfo.LaborUnitName //劳务单位
          data.ruleForm.LaborLegalPerson =
            res.data.ContractInfo.LaborLegalPerson //劳务法人
          data.ruleForm.IsDel = res.data.ContractInfo.IsDel //是否删除
          data.ruleForm.CreateBy = res.data.ContractInfo.CreateBy //创建人
          data.ruleForm.CreateName = res.data.ContractInfo.CreateName //创建人名字
          data.ruleForm.CreateOn = res.data.ContractInfo.CreateOn //创建时间
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      await GetContractManagementInfo(data.Id).then((res) => {
        if (res.code == 1) {
          console.log(res)
          if (data.setUp) {
            res.data.DepartIds.forEach((val: any) => {
              data.ruleForm.DepartIds.push(val.Id)
            })
            data.ruleForm.BeginDate = res.data.BeginDate
          }
          if (res.data.LaborContract)
            data.ruleForm.LaborContract = res.data.LaborContract.Id //劳动合同
          if (res.data.EmployeeFiles)
            data.ruleForm.EmployeeFiles = res.data.EmployeeFiles.Id //员工档案
          if (res.data.ServiceAgreement)
            data.ruleForm.ServiceAgreement = res.data.ServiceAgreement.Id //劳务协议
          if (res.data.CompanySystem)
            data.ruleForm.CompanySystem = res.data.CompanySystem.Id //制度条款确认表
          data.ruleForm.Id = res.data.ContractInfo.Id
          data.ruleForm.ContractUnitName =
            res.data.ContractInfo.ContractUnitName //合同单位
          data.ruleForm.LegalRep = res.data.ContractInfo.LegalRep //法人代表
          data.ruleForm.RegAdd = res.data.ContractInfo.RegAdd //注册地址
          data.ruleForm.SpecialProvisions =
            res.data.ContractInfo.SpecialProvisions //特殊条款
          data.ruleForm.LaborUnitName = res.data.ContractInfo.LaborUnitName //劳务单位
          data.ruleForm.LaborLegalPerson =
            res.data.ContractInfo.LaborLegalPerson //劳务法人
          data.ruleForm.IsDel = res.data.ContractInfo.IsDel //是否删除
          data.ruleForm.CreateBy = res.data.ContractInfo.CreateBy //创建人
          data.ruleForm.CreateName = res.data.ContractInfo.CreateName //创建人名字
          data.ruleForm.CreateOn = res.data.ContractInfo.CreateOn //创建时间
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  }
  // 获取启用状态
  store.getDict('hr_enb_status').then((res: any) => {
    data.ruleForm.job = res
  })
  // 获取合同列设置表信息
  GetContractManagementList().then((res) => {
    data.contractList = res.data
  })
  //  获取组织架构树
  store.getDeptTree().then((res: any) => {
    data.sourceData = res
  })
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    //是否可以修改 true不可以 false可以
    isEdit: {
      type: Boolean,
      default: false
    },
    //是否是查看 true是 false否
    isView: {
      type: Boolean,
      default: false
    },
    // 是否适从组件架构点击来的
    isOrg: {
      type: Boolean,
      default: false
    },
    // 是否是合同设置 true为是 false不是
    setUp: {
      type: Boolean,
      default: false
    },

    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    const value = ref()
    let data = reactive({
      ruleForm: {
        LaborContract: '', //劳动合同
        EmployeeFiles: '', //员工档案
        ServiceAgreement: '', //劳务协议
        CompanySystem: '', //制度条款确认表
        BeginDate: '', //启用时间
        DepartIds: ref(), //事业部Id
        ContractUnitName: '', //合同单位
        LegalRep: '', //法人代表
        RegAdd: '', //注册地址
        SpecialProvisions: '', //特殊条款
        LaborUnitName: '', //劳务单位
        LaborLegalPerson: '', //劳务法人
        SpecialStatus: '1', //是否启用
        job: {}
      },
      sourceData: [], //组织架构树数据
      // 是否编辑
      isEdit: props.isEdit,
      // 是否查看
      isView: props.isView,
      // 是否是合同设置
      setUp: props.setUp,
      // 查看详情Id
      Id: props.Id,
      // 合同设置select详情
      contractList: [],
      LaborContract: [], //劳动合同
      // 是否从组织架构来
      isOrg: props.isOrg
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: ''
    })
    // 获取数据
    const getData = async () => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    }
    onMounted(() => {
      getData()
    })

    return {
      boxStyle,
      data,
      value,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.buttonHeight {
  height: 28px;
}
</style>
