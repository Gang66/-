<template>
  <div class="RegularForm">
    <div>
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="72px" hide-required-asterisk>
        <section class="bf-search-formItem mt-4">
          <div class="leading-none text-sm mb-5">基本信息</div>
          <div class="flex justify-between px-8 mb-5">
            <div>
              <el-form-item label="申请人员" prop="Name">
                <el-input v-model="data.ruleForm.UserName" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
              <el-form-item label="入职时间" prop="Name" class="mt-3">
                <el-date-picker v-model="data.ruleForm.InductionTime" type="date" placeholder="请选择" class="screen-width" disabled />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="性别" prop="Name">
                <div v-for="item in data.gender">
                  <el-input v-if="data.ruleForm.Sex == item.DicKey" v-model="item.DicValue" placeholder="请输入" class="screen-width" disabled />
                </div>
              </el-form-item>
              <el-form-item label="所属部门" prop="Name" class="mt-3">
                <el-input v-model="data.ruleForm.DeptName" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="电话" prop="Name">
                <el-input v-model="data.ruleForm.Phone" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
              <el-form-item label="职务" prop="Name" class="mt-3">
                <el-input v-model="data.ruleForm.PostName" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
            </div>
          </div>
        </section>
        <section class="bf-search-formItem mt-4">
          <div class="leading-none text-sm mb-5">申请信息</div>
          <div class="flex justify-between px-8">
            <div>
              <el-form-item label="转正时间" prop="RTime">
                <el-date-picker v-model="data.ruleForm.RTime" type="date" placeholder="请选择" class="screen-width" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="缴纳社保时间" prop="SocialTime" label-width="100px" class="-ml-3">
                <el-date-picker v-model="data.ruleForm.SocialTime" type="date" placeholder="请选择" class="screen-width" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="试用期薪资" prop="TryPay" label-width="90px">
                <el-input v-model.number="data.ruleForm.TryPay" placeholder="请输入" class="screen-width" />
              </el-form-item>
            </div>
          </div>
          <div class="flex px-8">
            <el-form-item label="转正薪酬" prop="FormalPay" class="mt-3">
              <el-input v-model.number="data.ruleForm.FormalPay" placeholder="请输入" class="screen-width" />
            </el-form-item>
            <el-form-item label="备注" prop="Remarks" class="mt-3 flex-grow" label-width="125px">
              <el-input v-model="data.ruleForm.Remarks" placeholder="请输入" class="flex-grow" autosize type="textarea" />
            </el-form-item>
          </div>
          <div class="pr-8 mb-5">
            <el-form-item label="自我评定总结" prop="MyRemarks" class="mt-3 flex-grow" label-width="104px">
              <el-input v-model="data.ruleForm.MyRemarks" placeholder="请输入" class="flex-grow" autosize type="textarea" />
            </el-form-item>
          </div>
        </section>
        <section class="px-2" v-if="data.probationList.length > 0">
          <div class="leading-none text-sm mb-5">工作数据</div>
          <el-table :data="data.probationList" style="width: 100%">
            <el-table-column prop="date" label="周期" width="120">
              <template #default="scope"> 第{{ scope.row.WeekNumber }}周 </template>
            </el-table-column>
            <el-table-column prop="name">
              <template #header>
                <div>考勤得分（{{ data.probationList[0].AttendanceSorce }}分）</div>
              </template>
              <template #default="scope">
                <el-tooltip class="box-item" effect="dark" placement="top">
                  <template #content> 应出勤{{ scope.row.ShouldAttenDay }}天 实出勤{{ scope.row.OnDuty }}天 出勤率{{ scope.row.AttenRate }}% 出差{{ scope.row.BusinessTravel }}天
                    迟到{{ scope.row.LateMinute + '/' + scope.row.LateNumber }}(分/次)&nbsp 请假{{ scope.row.LeaveMinute + '/' + scope.row.LeaveNumber }}(分/次)&nbsp
                    旷工{{ scope.row.AbsenteeismMinute + '/' + scope.row.AbsenteeismNumber }}(分/次) </template>
                  <div class="bf-text-color-primary truncate">应出勤{{ scope.row.ShouldAttenDay }}天 实出勤{{ scope.row.OnDuty }}天 出勤率{{ scope.row.AttenRate }}%
                    出差{{ scope.row.BusinessTravel }}天 迟到{{ scope.row.LateMinute }}分 请假{{ scope.row.LeaveMinute }}分 旷工{{ scope.row.AbsenteeismMinute }}分</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="" width="260">
              <template #header>
                <div>工作量得分（{{ data.probationList[0].WorkScore }}分）</div>
              </template>
              <template #default="scope">
                <el-tooltip class="box-item" effect="dark" placement="top">
                  <template #content> 合同量{{ scope.row.CheckContractAmount }}个 报价量{{ scope.row.OfferAmount }}万 金额量{{ scope.row.MoneyAmount }}万 渠道量{{ scope.row.ChannelNumber }}个
                    成交率{{ Math.floor(scope.row.CheckContractNumber / scope.row.OfferNumber) }}% </template>
                  <div class="bf-text-color-primary truncate">合同量{{ scope.row.CheckContractAmount }}个 报价量{{ scope.row.OfferNumber }}万 金额量{{ scope.row.MoneyAmount }}万
                    渠道量{{ scope.row.ChannelNumber }}个 成交率{{ Math.floor(scope.row.CheckContractNumber / scope.row.OfferNumber) }}%</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="" width="180">
              <template #header>
                <div>成果转化（{{ data.probationList[0].AchievementScore }}分）</div>
              </template>
              <template #default="scope">
                <el-tooltip class="box-item" effect="dark" placement="top">
                  <template #content> 业绩量{{ scope.row.CustomerNumber }}个 </template>
                  <div class="bf-text-color-primary truncate flex items-center justify-between">
                    <div>业绩量{{ scope.row.CustomerNumber }}个</div>
                    <el-button class="" type="primary" link @click="data.ContractDetailsWindow.show = true">合同明细</el-button>
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
          <!-- <el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane :label="item.title" :name="item.value" v-for="(item,index) in data.tabList" :key="index" class="px-6">
              
            </el-tab-pane>
          </el-tabs> -->
        </section>
        <div class="bf-search-formItem mt-4">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <ContractDetails v-if="data.ContractDetailsWindow.show" @closeWindow="data.ContractDetailsWindow.show = false"></ContractDetails>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, SetupContext } from 'vue'
import ContractDetails from './ContractDetails.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetWorkCourseFinishedEntity } from '/@/api/hr/CourseDevelop'
import { PostAddTrendPositive } from '/@/api/hr/TrendPositive'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetHRTrialDetailInfo } from '/@/api/hr/Staff'
const store = useCommonStore() //记得加这一句
const userStore = useLayoutStore() //记得加这一句
// 计算列表数据 type 0是工作数据 1是不达标数据
const calculationNum = (res: any, data: any, type: any) => {
  var val: any = {
    arr: [],
    AttendanceSorce: 0, //考勤得分
    WorkScore: 0, //工作量得分
    AchievementScore: 0 //绩效得分
  }
  res.data.forEach((element: any) => {
    if (element.DateType == 1) {
      // 不达标数据
      if (type == 1) {
        element.infolist.forEach((v: any) => {
          if (v.TotalScore < 60) {
            val.AttendanceSorce += v.AttendanceSorce
            val.WorkScore += v.WorkScore
            val.AchievementScore += v.AchievementScore
            val.arr.push(v)
          }
        })
      } else {
        element.infolist.forEach((v: any) => {
          val.AttendanceSorce += v.AttendanceSorce
          val.WorkScore += v.WorkScore
          val.AchievementScore += v.AchievementScore
          val.arr.push(v)
        })
      }
    }
  })
  // 总分相加/数组长度=平均分
  val.arr.forEach((element: any) => {
    element.AttendanceSorce = Math.floor(val.AttendanceSorce / val.arr.length)
    element.WorkScore = Math.floor(val.WorkScore / val.arr.length)
    element.AchievementScore = Math.floor(val.AchievementScore / val.arr.length)
  })
  data.probationList = val.arr
}
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkCourseFinishedEntity(data.Id).then((res: any) => {
      if (res.code == 1) {
        res.data.CodeType = JSON.parse(res.data.CodeType)
        res.data.FileList.forEach((element: any) => {
          element.name = element.FileName
          element.size = element.FileSize
          element.url = element.SavePath
          element.status = 'success'
        })
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  GetHRTrialDetailInfo(userStore.getUserInfo.Id).then((res: any) => {
    if (res.code == 1) {
      data.TrialInfo = res
      calculationNum(res, data, 0)
    }
  })
  data.ruleForm.UserId = userStore.getUserInfo.Id
  data.ruleForm.Sex = userStore.getUserInfo.Sex
  data.ruleForm.UserName = userStore.getUserInfo.RealName
  data.ruleForm.Phone = userStore.getUserInfo.UserName
  data.ruleForm.InductionTime = userStore.getUserInfo.CreateOn
  data.ruleForm.DeptName = userStore.getUserInfo.department
  data.ruleForm.DeptId = userStore.getUserInfo.DeptId
  data.ruleForm.PostIds = userStore.getUserInfo.PostIds
  data.ruleForm.PostName = userStore.getUserInfo.postname
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
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
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        PostAddTrendPositive(arr).then((res) => {
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
    TryPay: [
      {
        required: true,
        message: '请填写试用期工资',
        trigger: 'blur'
      }
    ],
    FormalPay: [
      {
        required: true,
        message: '请填写转正工资',
        trigger: 'blur'
      }
    ],
    MyRemarks: [
      {
        required: true,
        message: '请填写自我评定与总结',
        trigger: 'blur'
      }
    ],
    RTime: [
      {
        required: true,
        message: '请选择转正时间',
        trigger: 'change'
      }
    ],
    SocialTime: [
      {
        required: true,
        message: '请选择社保时间',
        trigger: 'change'
      }
    ]
  })
  // 根据传递参数 转url
  const retviewurl = (list: any) => {
    var retlist: any = []
    if (list.length > 0) {
      list.forEach((f: any) => {
        var item = remoteUrl(f.Path)
        retlist.push(item)
      })
    }
    return retlist
  }
  // 监听tab筛选
  const handleClick = (val: any) => {
    console.log(val.index)
    if (val.index == 0) {
      calculationNum(data.TrialInfo, data, 0)
    } else {
      calculationNum(data.TrialInfo, data, 1)
    }
  }
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ruleForm.CoverImg = val[0].Path
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
    uploadFileDataEvent,
    retviewurl,
    handleClick
  }
}
export default defineComponent({
  components: {
    ContractDetails
  },
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    },
    // 申请类型
    ApplicationType: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      gender: [], //性别
      probationList: [], //试用期列表数据
      TrialInfo: [], //报告总数据
      visible: false,
      activeName: 0, //tab选中下标
      tabList: [
        { title: '试用期工作数据', value: 0 },
        { title: '试用期不达标数据', value: 1 }
      ],
      ruleForm: {
        value: null, //测试
        ApplicationType: props.ApplicationType //申请类型
      },
      Id: props.Id,
      //  合同弹窗
      ContractDetailsWindow: {
        view: false
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-900',
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
.RegularForm {
  .quitForm-header-bg {
    display: flex;
    align-items: center;
    margin-top: 6px;
    min-height: 86px;
    background: linear-gradient(180deg, #f3f7ff 0%, #e3edff 100%);
    border-radius: 4px;
    border: 1px solid #bfcbff;
    :deep(.el-form-item) {
      margin-right: 20px !important;
    }
  }
  :deep(.el-radio) {
    margin-right: 20px;
  }
  :deep(.el-checkbox) {
    margin-right: 20px;
  }
  .remarks {
    text-indent: 2em;
  }
  .title-bg {
    min-height: 42px;
    background: #f4f4f4;
    border: 1px solid #eeeeee;
  }
  .content-style {
    min-height: 48px;
    background: #ffffff;
    border: 1px solid #eeeeee;
  }
  .el-label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 0 0 auto;
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  :deep (.el-tabs__nav-wrap::after) {
    background: none !important;
  }
  .demo-tabs {
    :deep (.el-table th.el-table__cell) {
      background-color: #f3f3f3;
      color: var(--el-text-color-primary);
      border-radius: 4px;
    }
  }
  /* .screen-width {
    width: 160px !important;
  } */
  :deep(.screen-width) {
    width: 160px !important;
  }
  :deep(.el-table th.el-table__cell) {
    background-color: #f5f6f7;
    font-weight: 500;
    color: var(--el-text-color-primary) !important;
  }
}
</style>
