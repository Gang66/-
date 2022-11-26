<template>
  <div class="RegularFormView bf-hr-dialog bf-remove-input-disabled-bg">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="员工离职详情">
      <template #title>
        <div class="header px-4 pt-4">
          <div class="header_user_bg"></div>
          <div class="header_right_bg"></div>
          <div class="flex justify-between">
            <div class="text-sm">调岗申请详情</div>
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
                自<span class="text-orange-color">{{ parseTimeEvent(data.userInfo.InductionTime) }}</span
                >加入这个大家庭，现在是第{{ data.userInfo.StaffDay }}天，在新人训获得{{ data.userInfo.NewTrainScore }}分。
              </div>
            </div>
          </div>
        </div>
      </template>
      <div class="bf-window-padding">
        <div class="mb-6">
          <div class="leading-none text-sm">基本信息</div>
        </div>
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex justify-between">
            <el-form-item label="申请日期" class="">
              <el-date-picker v-model="data.ruleForm.CreateOn" type="date" placeholder="请选择" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="合同到期">
              <el-date-picker v-model="data.ruleForm.ContractDate" type="date" placeholder="请选择" class="screen-width" disabled />
            </el-form-item>
            <el-form-item label="生效日期">
              <el-date-picker v-model="data.ruleForm.StartDate" type="date" placeholder="请选择" class="screen-width" disabled />
            </el-form-item>
          </div>
          <div class="flex justify-between items-start">
            <div>
              <el-form-item label="调后部门" prop="NewDeptId">
                <el-tree-select v-model="data.ruleForm.NewDeptId" node-key="Id" class="screen-width" :default-expanded-keys="[26]" disabled :data="data.deptTree" check-strictly :render-after-expand="false" placeholder="请选择调后部门" />
              </el-form-item>
            </div>
            <el-form-item label="调后职位" prop="NewPostId">
              <el-select v-model="data.ruleForm.NewPostId" placeholder="请选择调后职位" class="screen-width" disabled>
                <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
              </el-select>
            </el-form-item>
            <el-form-item label="调岗性质" prop="PostNature">
              <el-select v-model="data.ruleForm.PostNature" placeholder="请选择调岗性质" class="screen-width" disabled>
                <el-option v-for="item in data.quitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex justify-between items-start">
            <el-form-item label="新岗位试用期" prop="TryTime" label-width="100px" class="-ml-5">
              <el-select v-model="data.ruleForm.TryTime" placeholder="请选择" class="screen-width" disabled>
                <el-option v-for="item in data.trialTime" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="功能调整" prop="AdjustPost">
              <el-select v-model="data.ruleForm.AdjustPost" placeholder="请选择功能调整" class="screen-width" disabled>
                <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <div v-if="data.ruleForm.BeforeMoney">
              <el-form-item label="调前薪资" prop="BeforeMoney">
                <el-input v-model="data.ruleForm.BeforeMoney" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
            </div>
            <div v-else>
              <el-form-item label="" prop="BeforeMoney">
                <div class="screen-width"></div>
              </el-form-item>
            </div>
          </div>
          <div class="flex items-start" v-if="data.ruleForm.AfterMoney">
            <div v-if="data.ruleForm.AfterMoney">
              <el-form-item label="调后薪资" prop="AfterMoney">
                <el-input v-model="data.ruleForm.AfterMoney" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
            </div>
          </div>
          <el-form-item label="调岗原因说明" class="flex-grow -ml-5" label-width="100px">
            <el-input v-model="data.ruleForm.Explain" placeholder="请输入" class="flex-grow" autosize type="textarea" disabled />
          </el-form-item>
          <template v-if="data.viewType != 1 && data.viewType != 2">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 转正审批 -->
            <template v-if="data.viewType == 4">
              <el-form-item label="" class="flex-grow" :prop="data.state == 0 ? 'remark' : ''" label-width="0">
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
import { GetAllUserList } from '/@/api/layout'
import { GetPostTransferInfo } from '/@/api/hr/TrendPositive'
import { GetUserinformation } from '/@/api/layout/index'
import { getDeptTree } from '/@/api/system/dept'
import { getPostBinding } from '/@/api/system/post'
import { PostApprovalPostTransfer, PostApprovalRecordsVacation } from '/@/api/wf/hr/Approval'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetPostTransferInfo(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = res.data
        GetUserinformation(res.data.CreateBy).then((res: any) => {
            if (res.code == 1) {
              data.userInfo = res.data
            } else {
              ElMessage.error(res.message)
            }
          })
        //获取岗位
        getPostBinding(data.ruleForm.NewDeptId, 1).then((res: any) => {
          data.postList = res.data
        })
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 获取部门树数据
  getDeptTree().then((res: any) => {
    data.deptTree = res.data
  })
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
  // 功能调整
  store.getDict('hr_TransferPost_adjust').then((res: any) => {
    data.quitOptions = res
  })
  // 获取试用期数据
  store.getDict('hr_trial_time').then((res: any) => {
    data.trialTime = res
  })
  // 调岗性质
  store.getDict('hr_TransferPost_nature').then((res: any) => {
    data.quitWorkOptions = res
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
          dataid: data.Id,
          FlowId: data.FlowId,
          Step: data.Step
        }
        PostApprovalPostTransfer(arr).then((res: any) => {
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
    remark: [
      {
        required: true,
        message: '请填写审批意见',
        trigger: 'blur'
      }
    ]
  })
  // 路由
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
      trialTime: [], //试用期数据
      state: 0, //审批状态
      deptTree: [], //获取组织架构树
      gender: [], //性别
      Id: props.info.Id,
      FlowId: props.info.FlowId,
      Step: props.info.Step,
      ruleForm: {},
      userInfo: {},
      viewType: props.info.viewType,
      Approval: {
        checkId: props.info.checkId,
        remark: ''
      },
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
      console.log(props.info)
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
    margin: 10px 0;
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
  .deptTree {
    :deep(.el-input) {
      width: 160px;
    }
  }
}
</style>
