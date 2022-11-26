<template>
  <div class="RegularFormView bf-hr-dialog bf-remove-input-disabled-bg">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="员工离职详情">
      <template #title>
        <div class="header px-4 pt-4">
          <div class="header_user_bg"></div>
          <div class="header_right_bg"></div>
          <div class="flex justify-between">
            <div class="text-sm">离职申请详情</div>
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
                <div class="dept_bg">{{ data.userInfo.DeptName }}</div>
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
        <!-- <div class="RegularFormView_header_bg">
          <div class="flex justify-between">
            <div class="text-sm text-white">人事去向详情</div>
            <el-icon color="#fff" @click="closeWindow('close')" class="cursor-pointer">
              <el-icon-Close />
            </el-icon>
          </div>
        </div> -->
      </template>
      <div class="bf-window-padding">
        <div class="mb-6 flex items-center">
          <div class="leading-none text-sm">基本信息</div>
          <el-popover v-model:visible="data.visible" placement="bottom" title="离职说明" :width="400">
            <template #reference>
              <el-icon color="#409eff" @click="data.visible = !data.visible" class="cursor-pointer">
                <el-icon-QuestionFilled />
              </el-icon>
            </template>
            <p>离职人员应将经营之公文、公物、公款全部缴清、如有信用公共财务应一并缴回，否则视为未办理完离职手续，如有拒不移交、交代不清、虚报、漏报、使公司蒙受损失等事时，应负责赔偿并被依法追究。</p>
            <p>注：离职申请事业部经理通过后，客户库、报价库、合同库、项目库、平台库、渠道管理、应收管理数据系统自动划拨给被交接人；</p>
            <p>招聘专员离职：部门经理通过后，邀约管理、面试管理、入职管理、员工管理数据系统自动划拨给被交接人；</p>
          </el-popover>
        </div>
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex justify-between">
            <el-form-item label="申请日期" class="">
              <el-date-picker v-model="data.ruleForm.CreateOn" type="date" placeholder="请选择" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="合同到期" class="">
              <el-date-picker v-model="data.ruleForm.ContractDate" type="date" placeholder="请选择" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="离职类别">
              <el-select v-model="data.ruleForm.QuitType" placeholder="请选择离职类别" class="screen-width" disabled>
                <el-option v-for="item in data.quitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex justify-between">
            <el-form-item label="离职原因">
              <el-input v-model="data.ruleForm.QuitReason" placeholder="请输入" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="工作交接">
              <el-select v-model="data.ruleForm.HandWork" placeholder="请选择工作交接" :class="data.isWorkUser ? '' : 'screen-width'" disabled>
                <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="交接人" v-if="data.ruleForm.HandoverId">
              <el-select v-model="data.ruleForm.HandoverId" filterable placeholder="请选择交接人员" class="screen-width" disabled>
                <el-option v-for="item in data.userList" :key="item.UserId" :label="item.RealName" :value="item.UserId" />
              </el-select>
            </el-form-item>
            <el-form-item label="" v-else>
              <div class="screen-width"></div>
            </el-form-item>
          </div>
          <div class="mt-6 mb-6 flex items-center">
            <div class="leading-none text-sm">审批内容</div>
          </div>
          <div class="flex justify-between">
            <el-form-item label="社保减员" prop="Social">
              <el-select v-model="data.ruleForm.Social" placeholder=" " class="screen-width" disabled>
                <el-option v-for="item in data.quitReduceOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="合同附件">
              <!-- $preview(0, data.urlPath) -->
              <el-button type="primary" link @click="openPreview">查看合同附件</el-button>
              <!-- <el-select v-model="data.ruleForm.HandWork" placeholder=" " class="screen-width" disabled>
                <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select> -->
            </el-form-item>
            <el-form-item label="办公用品" v-if="data.ruleForm.HandoverId">
              <el-select v-model="data.ruleForm.OfficeSupplies" filterable placeholder=" " class="screen-width" disabled>
                <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="" v-else>
              <div class="screen-width"></div>
            </el-form-item>
          </div>
          <div class="flex justify-between">
            <el-form-item label="借款情况" prop="loan">
              <el-select v-model="data.ruleForm.loan" placeholder=" " class="screen-width" disabled>
                <el-option v-for="item in data.quitLoanOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="报账情况" prop="Reimbursement">
              <el-select v-model="data.ruleForm.Reimbursement" placeholder=" " class="screen-width" disabled>
                <el-option v-for="item in data.quitQuickOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="样品情况">
              <el-select v-model="data.ruleForm.Sample" placeholder=" " class="screen-width" disabled>
                <el-option v-for="item in data.quitSampleOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </div>
          <el-form-item label="欠款情况" v-if="data.ruleForm.Sample=='2'">
            <el-input v-model="data.ruleForm.Arrears" placeholder="" class="screen-width" disabled />
          </el-form-item>
          <el-form-item label="" v-else>
            <div class="screen-width"></div>
          </el-form-item>
          <el-form-item label="自我评定总结" class="flex-grow -ml-5" label-width="100px">
            <el-input v-model="data.ruleForm.Explain" placeholder="" class="flex-grow" autosize type="textarea" disabled />
          </el-form-item>
          <template v-if="data.viewType != 1 && data.viewType != 2">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 离职审批 -->
            <template v-if="data.viewType == 4">
              <!-- <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" /> -->
              <div class="bf-search-formItem">
                <div class="text-center w-full mt-4">
                  <el-button @click="closeWindow('close')" plain>取 消</el-button>
                  <el-button type="primary" @click="openApprovalForm(1)">审 批</el-button>
                  <!-- <el-button type="danger" @click="ApprovalForm(0)">驳 回</el-button>
                <el-button type="primary" @click="ApprovalForm(1)">审 批</el-button> -->
                </div>
              </div>
            </template>
          </template>
        </el-form>
      </div>
    </OpenWindow>
    <quitFormApproval v-if="data.quitFormApprovalWindow.view" @closeWindow="data.quitFormApprovalWindow.view = false" :details="data.ruleForm" :FlowId="data.FlowId"
      :Step="data.Step" @submitForm="ApprovalForm"></quitFormApproval>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { preview } from 'vue3-preview-image'
import quitFormApproval from './quitFormApproval.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetStaffQuitInfo, GetTrendPositiveInfo } from '/@/api/hr/TrendPositive'
import { GetAllUserList, GetUserinformation } from '/@/api/layout'
import { PostApprovalStaffQuit } from '/@/api/wf/hr/Approval'
import { debug } from 'console'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetStaffQuitInfo(data.Id).then((res: any) => {
      if (res.code == 1) {
        if (res.data.RelieveFile) {
          var arr = JSON.parse(res.data.RelieveFile)
          arr.forEach((val: any) => {
            data.urlPath.push(remoteUrl(val.Path))
          })
        }
        data.ruleForm = res.data
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
  // 离职类型
  store.getDict('hr_quit_type').then((res: any) => {
    data.quitOptions = res
  })
  // 离职原因
  store.getDict('hr_quit_Remarks').then((res: any) => {
    data.quitOptionsRemarks = res
  })
  // 离职交接工作
  store.getDict('hr_enb_status').then((res: any) => {
    data.quitWorkOptions = res
  })
  // 确认社保是否减员
  store.getDict('hr_quit_Downsizing').then((res: any) => {
    data.quitReduceOptions = res
  })
  // 报账情况
  store.getDict('hr_quit_quick').then((res: any) => {
    data.quitQuickOptions = res
  })
  // 借款情况
  store.getDict('hr_quit_loan').then((res: any) => {
    data.quitLoanOptions = res
  })
  // 样品情况
  store.getDict('hr_quit_sample').then((res: any) => {
    data.quitSampleOptions = res
  })
  // 获取所有人员
  GetAllUserList().then((res: any) => {
    data.userList = res.data
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
  // 打开审批界面
  const openApprovalForm = (num: number) => {
    data.quitFormApprovalWindow.view = true
  }
  // 审批
  const ApprovalForm = (val: any) => {
    var arr: any = {
      checkId: data.Approval.checkId,
      state: val.state,
      remark: val.remark,
      dataid: data.Id,
      FlowId: data.FlowId,
      Step: data.Step,
      HandWork: val.HandWork,
      HandoverId: val.HandoverId,
      OfficeSupplies: val.OfficeSupplies,
      Social: val.Social,
      loan: val.loan,
      Reimbursement: val.Reimbursement,
      Sample: val.Sample,
      Arrears: val.Arrears
    }
    if (val.RelieveFile) {
      arr.RelieveFile = JSON.stringify(val.RelieveFile)
    }
    PostApprovalStaffQuit(arr).then((res: any) => {
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
    ]
  })
  //打开图片上传
  const openPreview = (val: any) => {
    if (data.urlPath.length <= 0) {
      ElMessage({
        message: '专员还未上传证明',
        type: 'warning'
      })
    } else {
      preview(0, data.urlPath)
    }
  }
  // 拼接地址
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}年{m}月{d}日')
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
    openApprovalForm,
    parseTimeEvent,
    openPreview
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    quitFormApproval
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
      urlPath: [],
      quitFormApprovalWindow: {
        view: false
      },
      quitSampleOptions: {}, //样品情况
      quitReduceOptions: {}, //确认社保是否减员
      quitQuickOptions: {}, //报账情况
      quitLoanOptions: {}, //借款情况
      gender: [], //性别
      Id: props.info.Id,
      FlowId: props.info.FlowId,
      Step: props.info.Step,
      viewType: props.info.viewType,
      Approval: {
        checkId: props.info.checkId,
        remark: ''
      },
      ruleForm: {},
      userInfo: {},
      activeName: 0, //tab选中下标
      quitOptions: {}, //离职类别
      quitOptionsRemarks: {}, //离职原因
      quitWorkOptions: {} //离职交接工作
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
.RegularFormView {
  :deep(.bf-window-padding) {
    padding: 20px 30px;
  }
  .RegularFormView_header_bg {
    background: url(/src/assets/img/hr/HrTrend/hr-header-bg.png);
    height: 220px;
    background-size: 100% 100%;
    padding: 13px 20px 0 18px;
  }
  :deep(.w-900) {
    border-radius: 6px;
  }
  .RegularFormView_hr {
    border-bottom: 1px solid var(--el-border-color);
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
