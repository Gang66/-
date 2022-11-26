<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 09:23:13
 * @LastEditTime: 2022-11-08 08:45:18
 * @LastEditors: ZHJ
 * @Description: 工资设定表单
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\SalarySettingForm.vue
 * 版权声明
-->
<template>
  <div class="SalarySettingForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="工资设定">
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="90px" hide-required-asterisk>
          <div class="flex">
            <el-form-item label="姓名" prop="UserName">
              <el-input v-model="data.ruleForm.UserName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="事业部" prop="CompName">
              <el-input v-model="data.ruleForm.CompName" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="岗位" prop="PostName">
              <el-input v-model="data.ruleForm.PostName" placeholder="请输入" />
            </el-form-item>
          </div>
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
          <div class="font-semibold text-sm">备注：</div>
          <p class="text-xs mt-2">
            1、年承包余量和13薪统一在次年1、2、3月份分三次发放；<br />
            2、13薪金额：基础工资+承包量高于5000元的按5000元、低于5000的按照3000元；<br />
            3、年承包月薪：年薪的80%取整数；<br />
            4、年承包余量：年薪剩余的薪资（年薪的20%+取整后剩余的部分）；<br />
            5、13薪月数：入职满多少月可以领取13薪；<br />
            6、竞保工资{{data.ruleForm.SecrecyTotal}}、加班工资{{data.ruleForm.OverTimeTotal}}、总结工资{{data.ruleForm.NoteTotal}}、学习工资{{data.ruleForm.StudyTotal}};
          </p>
          <el-collapse accordion>
            <el-collapse-item name="1">
              <template #title>
                修改记录<el-icon class="header-icon">
                  <info-filled />
                </el-icon>
              </template>
              <div class="flex justify-between w-600">
                <div>庄晓莎(集团总部)</div>
                <div class="bf-text-color-secondary">2022-04-29 09::36:12</div>
              </div>
              <div class="bf-text-color-secondary">由【冯佳利】修改：<span>承包量<span class="bf-font-green-color">800</span>;</span></div>
            </el-collapse-item>
          </el-collapse>
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
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetSalaryBaseSetting, PostSaveSalarySetting } from '/@/api/hr/Salary'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  // 获取岗位类别
  store.getDict('post_type').then((res: any) => {
    data.PostType = res
  })
  // 获取岗位状态
  store.getDict('hr_examine_type').then((res: any) => {
    data.examineType = res
  })
  // 获取薪酬状态
  store.getDict('hr_ChangeSalary_type').then((res: any) => {
    data.ChangeSalaryType = res
  })
  data.ruleForm.JobState += ''
  data.ruleForm.JobType += ''
  data.ruleForm.MonthState += ''
  if (data.ruleForm.Y13MonthNum >= 12) {
    data.ruleForm.Y13MonthMoney = Math.floor(data.ruleForm.Y13Level)
  } else {
    data.ruleForm.Y13MonthMoney = Math.floor((data.ruleForm.Y13Level * data.ruleForm.Y13MonthNum) / 12)
  }
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
        PostSaveSalarySetting(data.ruleForm).then((res) => {
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
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
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
    handleChangeJobType,
    handleCompute
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    details: { type: Object, default: {} }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      PostType: [], //岗位类别
      examineType: [], //岗位
      ChangeSalaryType: [], //薪酬状态
      ruleForm: JSON.parse(JSON.stringify(props.details))
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
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
  .border-bg {
    display: inline-flex;
    flex-grow: 1;
    padding: 1px 11px;
    color: #333;
    background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
    background-image: none;
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    transition: var(--el-transition-box-shadow);
    box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  }
}
</style>
