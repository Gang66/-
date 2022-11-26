<template>
  <div class="RegularFormView bf-hr-dialog bf-remove-input-disabled-bg">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
      <template #title>
        <div class="header px-4 pt-4">
          <div class="header_user_bg"></div>
          <div class="header_right_bg"></div>
          <div class="flex justify-between">
            <div class="text-sm">转正申请详情</div>
            <el-icon @click="closeWindow('close')" class="cursor-pointer">
              <el-icon-Close />
            </el-icon>
          </div>
          <div class="flex mt-6">
            <el-avatar :size="62" src="/src/assets/img/hr/Interview/touxiang.png" />
            <div class="ml-3">
              <div class="flex items-center">
                <div class="mr-2">{{ data.userInfo.RealName }}</div>
                <img src="/src/assets/img/hr/Interview/nv.png" v-if="data.userInfo.Sex == 2" class="mr-4" style="width: 16px; height: 16px" />
                <img src="/src/assets/img/hr/Interview/nan.png" v-else-if="data.userInfo.Sex == 1" class="mr-4" style="width: 16px; height: 16px" />
                <img src="/src/assets/img/hr/Interview/shouji.png" alt="" style="width: 14px; height: 14px" />
                <div class="ml-0.5 mr-4" style="fontsize: 13px">{{ data.userInfo.Phone }}</div>
              </div>
              <div class="flex items-center mt-2.5">
                <div class="dept_bg">{{ data.userInfo.CompName }}-{{ data.userInfo.DeptName }}</div>
                <div class="dept_bgTwo">{{ data.userInfo.PostName }}</div>
              </div>
              <div class="text-sm mt-2">
                <!-- {{scope.row.WeekNumber}} -->
                自<span
                  class="text-orange-color">{{ parseTimeEvent(data.userInfo.InductionTime) }}</span>加入这个大家庭，现在是第{{ data.userInfo.StaffDay }}天，在新人训获得{{ data.userInfo.NewTrainScore }}分。
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="bf-window-padding">
        <div class="mb-3">
          <div class="text-sm">申请信息</div>
        </div>
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex justify-between">
            <el-form-item label="转正时间">
              <el-date-picker v-model="data.ruleForm.RTime" type="date" placeholder="请选择" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="缴纳社保时间" label-width="100px">
              <el-date-picker v-model="data.ruleForm.SocialTime" type="date" placeholder="请选择" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="试用期薪资" label-width="100px">
              <el-input v-model="data.ruleForm.TryPay" placeholder="请输入" class="screen-width" disabled />
            </el-form-item>
          </div>
          <div class="flex justify-between items-start">
            <el-form-item label="转正薪资">
              <el-input v-model="data.ruleForm.FormalPay" placeholder="请输入" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="备注" class="flex-grow" label-width="140px">
              <el-input v-model="data.ruleForm.Remarks" placeholder=" " class="flex-grow" autosize type="textarea" disabled />
            </el-form-item>
          </div>
          <el-form-item label="评定总结" class="flex-grow -ml-5" label-width="100px">
            <el-input v-model="data.ruleForm.MyRemarks" placeholder=" " class="flex-grow" autosize type="textarea" disabled />
          </el-form-item>
          <section class="px-2" v-if="data.probationList.length > 0">
            <el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
              <el-tab-pane :label="item.title" :name="item.value" v-for="(item, index) in data.tabList" :key="index" class="px-6">
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
                        <template #content> 合同量{{ scope.row.CheckContractAmount }}个 报价量{{ scope.row.OfferAmount }}万 金额量{{ scope.row.MoneyAmount }}万
                          渠道量{{ scope.row.ChannelNumber }}个 成交率{{ Math.floor(scope.row.CheckContractNumber / scope.row.OfferNumber) }}% </template>
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
                        <div class="bf-text-color-primary truncate">
                          业绩量{{ scope.row.CustomerNumber }}个
                          <el-button type="primary" link @click="data.ContractDetailsWindow.show = true">合同明细</el-button>
                        </div>
                      </el-tooltip>
                    </template>
                  </el-table-column>
                </el-table>
              </el-tab-pane>
            </el-tabs>
          </section>
          <template v-if="data.viewType != 1 && data.viewType != 2">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 转正审批 -->
            <template v-if="data.viewType == 4">
              <el-form-item label="" :prop="data.state == 0 ? 'remark' : ''" label-width="0">
                <el-input v-model="data.ruleForm.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
              </el-form-item>
              <div class="bf-search-formItem">
                <div class="text-center w-full mt-4">
                  <el-button type="danger" @click="ApprovalForm(ruleFormRef, 0)">驳 回</el-button>
                  <el-button type="primary" @click="ApprovalForm(ruleFormRef, 1)">审 批</el-button>
                </div>
              </div>
            </template>
          </template>
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
import { PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetTrendPositiveInfo } from '/@/api/hr/TrendPositive'
import { PostApprovalTrendPositive } from '/@/api/wf/hr/Approval'
import { GetHRTrialDetailInfo } from '/@/api/hr/Staff'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetUserinformation } from '/@/api/layout'
const userStore = useLayoutStore() //记得加这一句
const store = useCommonStore() //记得加这一句
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
    GetTrendPositiveInfo(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
        GetHRTrialDetailInfo(res.data.CreateBy).then((res: any) => {
          if (res.code == 1) {
            data.TrialInfo = res
            calculationNum(res, data, 0)
          }
        })
        GetUserinformation(res.data.CreateBy).then((res: any) => {
            if (res.code == 1) {
              data.userInfo = res.data
            } else {
              ElMessage.error(res.message)
            }
          })
      } else {
        ElMessage.error(res.message)
      }
    })
  }
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
        arr.CodeType = JSON.stringify(arr.CodeType)
        PostEditWorkCourseFinishedSave(arr).then((res) => {
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
  // 审批
  const ApprovalForm = async (formEl: FormInstance | undefined, num: number) => {
    data.state = num
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = {
          checkId: data.Approval.checkId,
          state: num,
          remark: data.ruleForm.remark,
          dataid: data.Id
        }
        PostApprovalTrendPositive(arr).then((res: any) => {
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
    Name: [
      {
        required: true,
        message: '请填写课件名称',
        trigger: 'blur'
      }
    ],
    TrainingNeeds: [
      {
        required: true,
        message: '请选择培训需求',
        trigger: 'change'
      }
    ],
    remark: [
      {
        required: true,
        message: '请填写审批意见',
        trigger: 'blur'
      }
    ]
  })
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
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}年{m}月{d}日')
  }
  // 路由
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
    ApprovalForm,
    handleClick,
    parseTimeEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 传递参数
    info: {
      type: Object,
      default: {
        checkId: null,
        Id: null,
        // 显示类型 1 添加 2修改 3查看 4审批
        viewType: 3,
        Step: null,
        FlowId: null
      }
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      state: 0, //审批状态
      gender: [], //性别
      probationList: [], //试用期列表数据
      TrialInfo: [], //报告总数据
      Id: props.info.Id,
      viewType: props.info.viewType,
      ruleForm: {},
      userInfo:{},
      activeName: 0, //tab选中下标
      Approval: {
        checkId: props.info.checkId,
        remark: ''
      },
      tabList: [
        { title: '试用期工作数据', value: 0 },
        { title: '试用期不达标数据', value: 1 }
      ],
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, '
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, '
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, '
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, '
        }
      ]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-830',
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
.RegularFormView {
  :deep(.w-900) {
    border-radius: 6px;
  }
  :deep (.screen-width) {
    width: 160px !important;
  }
  .demo-tabs {
    :deep (.el-table th.el-table__cell) {
      background-color: #f3f3f3;
      color: var(--el-text-color-primary);
      border-radius: 4px;
    }
  }
}
</style>
