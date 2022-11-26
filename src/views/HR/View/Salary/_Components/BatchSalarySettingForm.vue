<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 09:23:13
 * @LastEditTime: 2022-11-07 17:41:01
 * @LastEditors: ZHJ
 * @Description: 工资设定表单
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\BatchSalarySettingForm.vue
 * 版权声明
-->
<template>
  <div class="SalarySettingForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="工资设定">
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="90px" hide-required-asterisk>
          <div class="flex">
            <el-form-item label="岗位类别" prop="JobType">
              <el-select v-model="data.ruleForm.JobType" placeholder="请选择" @change="handleChangeJobType">
                <el-option v-for="item in data.PostType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="岗位状态" prop="JobState">
              <el-select v-model="data.ruleForm.JobState" placeholder="请选择">
                <el-option v-for="item in data.examineType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="薪酬状态" prop="MonthState">
              <el-select v-model="data.ruleForm.MonthState" placeholder="请选择" @change="handleCompute(data.ruleForm)">
                <el-option v-for="item in data.ChangeSalaryType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="基础工资" prop="BaseTotal">
              <el-input-number v-model="data.ruleForm.BaseTotal" placeholder="请输入"></el-input-number>
            </el-form-item>
            <el-form-item label="承包量" prop="WaiTotal">
              <el-input-number v-model="data.ruleForm.WaiTotal" placeholder="请输入"></el-input-number>
            </el-form-item>
            <el-form-item label="13薪月数" prop="Y13MonthNum">
              <el-input-number v-model="data.ruleForm.Y13MonthNum" @blur="handleCompute(data.ruleForm)" placeholder="请输入"></el-input-number>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="13薪月薪" prop="Y13MonthMoney" v-if="data.ruleForm.IsY13 == 1">
              <div class="border-bg">
                {{data.ruleForm.Y13MonthMoney}}/{{ Math.floor(data.ruleForm.Y13Level) }}
              </div>
              <!-- <el-input-number v-model="data.ruleForm.Y13MonthMoney" placeholder="请输入"></el-input-number> -->
            </el-form-item>
            <el-form-item label="年承包月薪" prop="MonthTotal">
              <el-input-number v-model="data.ruleForm.MonthTotal" placeholder="请输入" @blur="handleCompute(data.ruleForm)"></el-input-number>
            </el-form-item>
            <el-form-item label="年承包余量" prop="ContractYearSurplusTotal">
              <el-input-number v-model="data.ruleForm.ContractYearSurplusTotal" placeholder="请输入" @blur="handleCompute(data.ruleForm)"></el-input-number>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="社保金个人" prop="SheBaoGeTotal">
              <el-input-number v-model="data.ruleForm.SheBaoGeTotal" placeholder="请输入" @blur="handleCompute(data.ruleForm)"></el-input-number>
            </el-form-item>
            <el-form-item label="社保金公司" prop="SheBaoGongTotal">
              <el-input-number v-model="data.ruleForm.SheBaoGongTotal" placeholder="请输入" @blur="handleCompute(data.ruleForm)"></el-input-number>
            </el-form-item>
          </div>
          <div class="font-semibold text-sm ">批量修改项：</div>
          <div class="my-2">
            <template :span="6" v-for="(item,index) in data.pitchOnArr" :key="index">
              <el-checkbox v-model="item.isSelect" :label="item.label"></el-checkbox>
            </template>
          </div>
          <div>
            <el-button type="primary" @click="SelectUserWindowEvent() ">选择人员</el-button>
            <div class="bf-table-content ">
              <el-table :data="data.userList" class="w-full" :key="1" max-height="250">
                <el-table-column type="index" label="序号" width="70" align="center" />
                <el-table-column prop="label" label="姓名">
                  <template #default="{ row }">
                    {{row.UserName}}
                  </template>
                </el-table-column>
                <el-table-column prop="department" label="部门">
                  <template #default="{ row }">
                    <DepTabridge :key="row.UserId" :deptDetails="{ DivisionName: row.CompName, DeptName: row.DeptName }"></DepTabridge>
                  </template>
                </el-table-column>
                <el-table-column prop="EntryDate" label="入职时间">
                  <template #default="{ row }">
                    {{parseTimeEvent(row.EntryDate)}}
                  </template>
                </el-table-column>
                <el-table-column prop="LaborContractComName" label="合同单位" width="250" />
                <el-table-column align="center" label="操作" width="80">
                  <template #default="scope">
                    <el-button text type="danger" @click="handleDeleteUser(scope.row.UserId)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="font-semibold text-sm mt-2">备注：</div>
          <p class="text-xs mt-2">
            1、使用批量设置，当遇到从未设置的员工时，将集成当前设置的所有项，设置过的员工将按照选中项进行修改；
          </p>
          <p class="text-xs mt-1">
            2、竞保工资、加班工资、总结工资、学习工资;
          </p>
          <!-- 提交 -->
          <div class="bf-search-formItem mt-4" v-if="!data.isEdit">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </OpenWindow>
    <SelectUser v-if="data.SelectUserWindow.view" @closeWindow="data.SelectUserWindow.view = false" @selectDetails="selectDetailsEvent"></SelectUser>
  </div>
</template>

<script lang="ts">
import DepTabridge from '/@/components/DepTabridge/index.vue'
import SelectUser from '/@/views/HR/Components/SelectUser/Index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { EditBatchSettingSalarySave, GetSalaryBaseSetting, PostWagesUserStaffList } from '/@/api/hr/Salary'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  // 获取岗位类别
  store.getDict('post_type').then((res: any) => {
    data.PostType = res
  })
  // 获取岗位类别
  store.getDict('hr_examine_type').then((res: any) => {
    data.examineType = res
  })
  // 获取薪酬状态
  store.getDict('hr_ChangeSalary_type').then((res: any) => {
    data.ChangeSalaryType = res
  })
  GetSalaryBaseSetting().then((res: any) => {
    if (res.code == 1) {
      data.baseSetting = res.data
    }
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var _userIds: any = []
        data.userList.forEach((item: { UserId: any }) => {
          if (item.UserId) {
            _userIds.push(item.UserId)
          }
        })
        if (_userIds.length <= 0) {
          ElMessage.error('请选择需要修改的人员')
          return false
        }

        var _pitchOnArr: any = []
        var _pitchOnStr = ''
        data.pitchOnArr
          .filter((x: any) => {
            return x.isSelect
          })
          .forEach((item: any) => {
            if (item.value) {
              _pitchOnArr.push(item.value)
              _pitchOnStr += item.label + '、'
            }
          })

        if ((_pitchOnArr || []).length <= 0) {
          ElMessage.error('请选择需要修改的项')
          return false
        }

        var arr: any = {
          SalarySetting: data.ruleForm,
          PitchOnList: _pitchOnArr,
          UserIds: _userIds
        }
        EditBatchSettingSalarySave(arr).then((res) => {
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
    })
  }
  //校验
  const rules = reactive<FormRules>({
    JobType: [{ required: true, message: '请选择', trigger: 'change' }],
    JobState: [{ required: true, message: '请选择', trigger: 'change' }],
    MonthState: [{ required: true, message: '请选择', trigger: 'change' }],
    BaseTotal: [{ required: true, message: '请填写', trigger: 'blur' }],
    WaiTotal: [{ required: true, message: '请填写', trigger: 'blur' }],
    Y13MonthNum: [{ required: true, message: '请填写', trigger: 'blur' }],
    MonthTotal: [{ required: true, message: '请填写', trigger: 'blur' }],
    ContractYearSurplusTotal: [{ required: true, message: '请填写', trigger: 'blur' }],
    SheBaoGeTotal: [{ required: true, message: '请填写', trigger: 'blur' }],
    SheBaoGongTotal: [{ required: true, message: '请填写', trigger: 'blur' }]
  })
  //岗位类别监听
  const handleChangeJobType = (jobType: any) => {
    data.ruleForm.SecrecyTotal = data.baseSetting.Secrecy * 1
    data.ruleForm.OverTimeTotal = data.baseSetting.OverTime * 1
    data.ruleForm.NoteTotal = data.baseSetting.Note * 1
    data.ruleForm.StudyTotal = data.baseSetting.Study * 1
    data.ruleForm.Y13MonthNum = data.baseSetting.Y13MonthNum * 1
    data.ruleForm.WaiTotal = 0
    switch (jobType) {
      case 5:
        data.ruleForm.BaseTotal = data.baseSetting.Base_h * 1
        data.ruleForm.StudyTotal = data.baseSetting.Study_h * 1
        break
      case 1:
        data.ruleForm.BaseTotal = data.baseSetting.Base_s * 1
        break
      case 2:
        data.ruleForm.BaseTotal = data.baseSetting.Base_s * 1
        if (data.ruleForm.MonthState == '2') {
          data.ruleForm.WaiTotal = Math.floor(data.ruleForm.MonthTotal - data.ruleForm.BaseTotal - data.ruleForm.SecrecyTotal - data.ruleForm.OverTimeTotal - data.ruleForm.NoteTotal - data.ruleForm.StudyTotal)
        } else {
          data.ruleForm.WaiTotal = Math.floor(data.baseSetting.SaleDeptManager - data.ruleForm.BaseTotal - data.ruleForm.SecrecyTotal - data.ruleForm.OverTimeTotal - data.ruleForm.NoteTotal - data.ruleForm.StudyTotal)
        }
        break
      case 3:
        data.ruleForm.BaseTotal = data.baseSetting.Base_s * 1
        if (data.ruleForm.MonthState == '2') {
          data.ruleForm.WaiTotal = Math.floor(data.ruleForm.MonthTotal - data.ruleForm.BaseTotal - data.ruleForm.SecrecyTotal - data.ruleForm.OverTimeTotal - data.ruleForm.NoteTotal - data.ruleForm.StudyTotal)
        } else {
          data.ruleForm.WaiTotal = Math.floor(data.baseSetting.SaleManager - data.ruleForm.BaseTotal - data.ruleForm.SecrecyTotal - data.ruleForm.OverTimeTotal - data.ruleForm.NoteTotal - data.ruleForm.StudyTotal)
        }
        break
      case 4:
        data.ruleForm.BaseTotal = data.baseSetting.Base_s * 1
        break
      case 6:
        data.ruleForm.BaseTotal = data.baseSetting.Base_x * 1
        data.ruleForm.OverTimeTotal = 0
        break
      case 7:
        data.ruleForm.BaseTotal = data.baseSetting.Base_w * 1
        data.ruleForm.StudyTotal = data.baseSetting.Study_h * 1
        data.ruleForm.SecrecyTotal = 0
        data.ruleForm.OverTimeTotal = 0
        data.ruleForm.NoteTotal = 0
        break
    }
    handleCompute(data.ruleForm)
  }
  //计算
  const handleCompute = (row: any) => {
    var base = row.BaseTotal * 1
    var secrecy = row.SecrecyTotal * 1
    var overtime = row.OverTimeTotal * 1
    var note = row.NoteTotal * 1
    var study = row.StudyTotal * 1
    var wai = row.WaiTotal * 1
    var monthTotal = row.MonthTotal * 1
    var jobState = row.JobState
    var monthState = row.MonthState

    //年承包月薪 大于0表示年薪
    if (monthTotal > 0) {
      row.MonthState = '2'
      monthState = '2'
    } else {
      row.MonthState = '1'
      monthState = '1'
    }

    if (monthState == '2') {
      wai = monthTotal - base - secrecy - overtime - note - study
      row.WaiTotal = wai
    } else {
      row.MonthTotal = 0
    }
    if (row.IsY13 == 1) {
      /*
        if(base + secrecy + overtime + note + study + wai > 5000) {
          row.Y13Level = 5000 / 3;
        } else {
          row.Y13Level = 3000 / 3;
        }*/
      if (base + wai > 5000) {
        row.Y13Level = 5000
      } else {
        row.Y13Level = 3000
      }
    }
  }
  //删除人员
  const handleDeleteUser = (userId: Number) => {
    data.userList = data.userList.filter((x: any) => {
      return x.UserId != userId
    })
  }
  //打开选择人员弹窗
  const SelectUserWindowEvent = () => {
    data.SelectUserWindow.view = true
  }
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 监听选中人员
  const selectDetailsEvent = (val: any) => {
    var arr: any = []
    var userIds: any = []
    val.forEach((element: any) => {
      userIds.push(element.Id)
      arr.push({
        UserId: element.Id,
        UserName: element.label,
        CompId: element.CompId,
        DeptId: element.DeptId,
        CompName: element.CompName,
        DeptName: element.DeptName
      })
      element.UserId = element.Id
      element.UserName = element.label
    })
    data.PlanUserList = Object.values(val)
    //附加档案信息
    PostWagesUserStaffList(userIds).then((response) => {
      if (response.code == 1) {
        var _list = response.data.records || []
        arr.forEach((item: any) => {
          var _obj = _list.find((x: any) => {
            return x.UserId == item.UserId
          })
          if (_obj) {
            item.EntryDate = _obj.EntryDate
            item.LaborContractComName = _obj.LaborContractComName
          }
        })
        data.userList = Object.values(arr)
      }
    })
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    remoteUrlEvent,
    selectDetailsEvent,
    handleChangeJobType,
    handleCompute,
    handleDeleteUser,
    SelectUserWindowEvent,
    parseTimeEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    SelectUser,
    DepTabridge
  },
  emits: ['closeWindow'],
  props: {},
  setup(props, context: SetupContext) {
    let data = reactive({
      userList: [],
      ruleForm: { JobType: null, JobState: null, MonthState: null, BaseTotal: null, WaiTotal: null, Y13MonthNum: null, MonthTotal: null, ContractYearSurplusTotal: null, SheBaoGeTotal: null, SheBaoGongTotal: null, Y13Level: 0 },
      PlanUserList: [], //人员数据
      //   选择人员弹窗
      SelectUserWindow: {
        view: false
      },
      pitchOnArr: [
        { label: '岗位类别', value: 'JobType', isSelect: true },
        { label: '岗位状态', value: 'JobState', isSelect: true },
        { label: '薪酬状态', value: 'MonthState', isSelect: true },
        { label: '基础工资', value: 'BaseTotal', isSelect: true },
        { label: '承包量', value: 'WaiTotal', isSelect: true },
        { label: '13薪月数', value: 'Y13MonthNum', isSelect: true },
        { label: '年承包月薪', value: 'MonthTotal', isSelect: true },
        { label: '年承包余量', value: 'ContractYearSurplusTotal', isSelect: true },
        { label: '社保金个人', value: 'SheBaoGeTotal', isSelect: true },
        { label: '社保金公司', value: 'SheBaoGongTotal', isSelect: true }
      ]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    const options = [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      },
      {
        value: 'Option3',
        label: 'Option3'
      },
      {
        value: 'Option4',
        label: 'Option4'
      },
      {
        value: 'Option5',
        label: 'Option5'
      }
    ]
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-800',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      options,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.SalarySettingForm {
  :deep(.el-form-item) {
    width: 33.4%;
  }
  :deep(.el-collapse) {
    border-top: 0px solid var(--el-collapse-border-color);
    border-bottom: 0px solid var(--el-collapse-border-color);
    .el-collapse-item__header {
      border-bottom: 0px solid var(--el-collapse-border-color);
    }
  }
  :deep(.el-input-number) {
    width: 100% !important;
  }
  :deep(.el-input-number .el-input__wrapper) {
    padding: 1px 11px;
  }
  :deep(.el-input-number__decrease) {
    display: none;
  }
  :deep(.el-input-number__increase) {
    display: none;
  }
  :deep(.el-input-number .el-input__inner) {
    text-align: left !important;
  }
  :deep(.bf-table-content) {
    margin-top: 0;
  }
}
</style>
