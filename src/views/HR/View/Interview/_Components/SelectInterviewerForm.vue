<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="选择面试官" class="SelectInterviewerForm">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10" align="middle">
        <el-col :md="24" :lg="6">
          <img src="/src/assets/img/hr/Interview/select-Interviewer.png" alt="" class="images" />
        </el-col>
        <el-col :md="24" :lg="18">
          <el-row :gutter="0">
            <el-col :md="24" :lg="13">
              <el-form-item label="面试时间" prop="InterViewDate">
                <el-date-picker v-model="data.ruleForm.InterViewDate" type="date" value-format="YYYY-MM-DD" placeholder="选择面试时间" :disabled-date="disabledDate" />
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="11">
              <el-form-item label="" prop="InterViewTime" label-width="0">
                <el-cascader v-model="data.ruleForm.InterViewTime" :options="timeStageOptions" :props="{ expandTrigger: 'hover' }"> </el-cascader>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="24">
              <el-form-item label="面试官" prop="InterViewerName">
                <div class="bf-remove-input-disabled-bg w-full" @click="openPostEvent">
                  <el-input v-model="data.ruleForm.InterViewerName" placeholder="请选择面试官" disabled> </el-input>
                </div>
              </el-form-item>
            </el-col>
            <el-col :md="24" :lg="24" prop="InterViewWay">
              <el-form-item label="面试方式">
                <el-radio-group v-model="data.ruleForm.InterViewWay">
                  <el-radio :label="item.DicKey + ''" v-for="(item, index) in data.InterviewMode" :key="index">{{ item.DicValue }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <div class="bf-search-formItem" v-if="data.isHeavy == false || !data.isEdit">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
  <!-- 选择部门人员 -->
  <OrgTreeDrawer @transferData="transferData" ref="OrgTreeDrawerRef" :list="data.list" v-if="data.OrgTreeDrawer.view" @closeWindow="data.OrgTreeDrawer.view = false" />
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import OrgTreeDrawer from '../../../Components/OrgTree/drawer.vue'
import { PostAddInterViewerSave, PostGetInterViewUserTree } from '/@/api/hr/Interview'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.InterViewTime = JSON.stringify(arr.InterViewTime)
        PostAddInterViewerSave(arr).then((res) => {
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
    InterViewDate: [{ required: true, message: '请选择面试日期', trigger: 'change' }],
    InterViewTime: [{ required: true, message: '请选择面试时间段', trigger: 'change' }],
    InterViewWay: [{ required: true, message: '请选择面试方式', trigger: 'change' }],
    InterViewerName: [{ required: true, message: '请选择面试官', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听人员返回数据
  const transferData = (val: any) => {
    data.ruleForm.InterViewerName = val.Details.label
    data.ruleForm.InterViewerId = val.Details.Id
    data.ruleForm.DeptIds = JSON.stringify(val.DeptIds)
  }
  return { rules, submitForm, resetForm, ruleFormRef, transferData }
}
// 弹窗事件
const window = (data: any) => {
  // 打开岗位弹窗
  const openPostEvent = () => {
    data.OrgTreeDrawer.view = true
  }
  return { openPostEvent }
}
const GetContractManagementInfoEvent = async (data: any) => {
  PostGetInterViewUserTree({ DeptId: data.DeptId, PostId: data.PostId }).then((res) => {
    data.list = res.data
  })
  // 获取面试方式
  store.getDict('hr_interview_mode').then((res: any) => {
    data.InterviewMode = res
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    OrgTreeDrawer
  },
  emits: ['closeWindow'],
  props: {
    // 面试Id
    Id: {
      type: Number,
      default: null
    },
    //事业部Id
    DeptId: {
      type: Number,
      default: null
    },
    // 岗位Id
    PostId: {
      type: Number,
      default: null
    },
    //面试官类型(1是初试 2是复试)
    Type: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    //面试时间
    const timeStageOptions = [
      {
        value: '上午',
        label: '上午',
        children: [
          { value: '8:00~9:00', label: '8:00~9:00' },
          { value: '9:00~10:00', label: '9:00~10:00' },
          { value: '10:00~11:00', label: '10:00~11:00' },
          { value: '11:00~12:00', label: '11:00~12:00' }
        ]
      },
      {
        value: '下午',
        label: '下午',
        children: [
          { value: '13:00~14:00', label: '13:00~14:00' },
          { value: '14:00~15:00', label: '14:00~15:00' },
          { value: '15:00~16:00', label: '15:00~16:00' },
          { value: '16:00~17:00', label: '16:00~17:00' }
        ]
      }
    ]
    let data: any = reactive({
      InterviewMode: [], //面试方式
      list: [], //选择面试官数据
      DeptId: props.DeptId, //部门Id
      PostId: props.PostId, //岗位Id
      ruleForm: {
        interState: props.Type, //面试官类型(1是初试 2是复试)
        DeptIds: [], //部门Id
        InterViewId: props.Id, //面试Id
        InterViewDate: null, //面试日期
        InterViewTime: '', //面试时间段
        InterViewerId: '', //面试官Id
        InterViewerName: '', //面试官姓名
        InterViewWay: '' //面试方式
      },
      // 打开岗位弹窗
      OrgTreeDrawer: {
        view: false
      },
      userInfo: {}, //用户信息
      // 查看详情Id
      Id: props.Id
    })
    // 有效期限只能选择当前时间之后
    const disabledDate = (time: Date) => {
      return time.getTime() < Date.now() - 8.64e7
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-540',
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
      timeStageOptions,
      disabledDate,
      ...window(data),
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.images {
  width: 96px;
  height: 97px;
}
.SelectInterviewerForm {
  :deep(.el-input.is-disabled) {
    cursor: pointer;
  }
  :deep(.el-input.is-disabled .el-input__inner) {
    color: var(--el-input-text-color, var(--el-text-color-regular));
    cursor: pointer;
  }
}
</style>
