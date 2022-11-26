<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 09:23:13
 * @LastEditTime: 2022-11-09 17:09:53
 * @LastEditors: ZHJ
 * @Description: 工资考核项表单
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\SalaryItemsForm.vue
 * 版权声明
-->
<template>
  <div class="SalarySettingForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="工资项配置">
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="90px" hide-required-asterisk>
          <div class="flex">
            <el-form-item label="考核项目" prop="Name">
              <el-input v-model="data.ruleForm.Name" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="金额" prop="TotalAmount">
              <el-input-number v-model="data.ruleForm.TotalAmount" placeholder="请输入" min="0"></el-input-number>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="考核周期" prop="CycleType">
              <el-select v-model="data.ruleForm.CycleType" placeholder="请选择" filterable clearable>
                <el-option v-for="item in data.cycleType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
            <el-form-item label="金额上限" prop="MaxAmount">
              <el-input-number v-model="data.ruleForm.MaxAmount" placeholder="请输入" min="0"></el-input-number>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="启用时间" prop="StartTime">
              <el-date-picker v-model="data.ruleForm.StartTime" type="date" placeholder="请选择" />
            </el-form-item>
          </div>
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
import { computed, defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { PostEditWagesItemLibrarySave } from '../../../../../api/hr/Salary'
import { GetAllSysPostList, GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  // 获取岗位类别
  store.getDict('hr_cycle_type').then((res: any) => {
    data.cycleType = res
  })
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
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (data.ruleForm.MaxAmount > 0 && data.ruleForm.MaxAmount < data.ruleForm.TotalAmount) {
          ElMessage.error('金额不能高于上限')
          return false
        }
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        PostEditWagesItemLibrarySave(arr).then((res: any) => {
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
    CycleType: [{ required: true, message: '请选择', trigger: 'change' }],
    StartTime: [{ required: true, message: '请选择', trigger: 'change' }],
    Name: [{ required: true, message: '请填写', trigger: 'blur' }],
    TotalAmount: [{ required: true, message: '请填写', trigger: 'blur' }],
    MaxAmount: [{ required: true, message: '请填写', trigger: 'blur' }]
  })
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
    remoteUrlEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      cycleType: [],
      ruleForm: {},
      roleType: {
        TwoList: []
      },
      currRoleId: 0
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
    const currRoleTypeList = computed(() => {
      var pid = (data.currRoleId || 0).toString()
      var arr = (data.roleType.TwoList || []).filter((x: any) => {
        return x.ParentId == pid
      })
    })
    onMounted(() => {
      if (props.details.CycleType) props.details.CycleType += ''
      data.ruleForm = Object.assign(data.ruleForm, props.details)
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      currRoleTypeList,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.SalarySettingForm {
  :deep(.el-form-item) {
    width: 50%;
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
}
</style>
