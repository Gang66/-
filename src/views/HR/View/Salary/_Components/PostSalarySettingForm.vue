<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 09:23:13
 * @LastEditTime: 2022-11-09 08:16:05
 * @LastEditors: ZHJ
 * @Description: 岗位工资设置表单
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\PostSalarySettingForm.vue
 * 版权声明
-->
<template>
  <div class="SalarySettingForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="工资设定">
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" hide-required-asterisk>
          <div class="flex">
            <el-form-item label="角色" prop="RoleId">
              <el-select v-model="data.ruleForm.RoleId" placeholder="请选择" filterable clearable @change="RoleChange">
                <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
              </el-select>
            </el-form-item>
            <el-form-item label="名称" prop="RoleName">
              <el-input v-model="data.ruleForm.RoleName" placeholder="请输入"></el-input>
            </el-form-item>
          </div>
          <div class="flex">
            <el-form-item label="等级" prop="GradeCode">
              <el-input v-model="data.ruleForm.GradeCode" placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="类型" prop="AssesType">
              <el-select v-model="data.ruleForm.AssesType" placeholder="请选择" filterable clearable>
                <el-option v-for="item in data.assesType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
            </el-form-item>
          </div>
          <div class="flex" v-if="data.ruleForm.AssesType==2||data.ruleForm.AssesType==3">
            <el-form-item label="部门" prop="AssesDataId">
              <el-tree-select v-model="data.ruleForm.AssesDataId" :data="data.sourceData" check-strictly class="w-full" node-key="Id" filterable clearable />
            </el-form-item>
          </div>
          <div class="flex" v-else>
            <el-form-item label="人员" prop="AssesDataId">
              <el-select v-model="data.ruleForm.AssesDataId" filterable placeholder="请选择" clearable>
                <el-option v-for="(item, index) in data.PeopleOriented" :key="index" :label="item.RealName" :value="item.UserId" />
              </el-select>
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
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetAllSysPostList, GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetAllUserList } from '/@/api/layout'
import { getPostSelect } from '/@/api/system/post'
import { PostEditWagesDistributionSave } from '/@/api/hr/Salary'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  data.ruleForm.AssesType += ''
  // data.ruleForm.AssesDataId = Number(data.ruleForm.AssesDataId)
  //  获取组织架构树
  store.getDeptTree().then((res: any) => {
    data.sourceData = res
    data.ruleForm = data.details
  })
  // 获取考核类型
  store.getDict('hr_asses_type').then((res: any) => {
    data.assesType = res
  })
  // 获取岗位列表
  getPostSelect(2).then((res) => {
    if (res.code == 1) {
      data.postList = res.data
    }
  })
  // 获取所有公司人员
  const res = await GetAllUserList()
  // console.log(res)
  data.PeopleOriented = res.data
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
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        PostEditWagesDistributionSave(arr).then((res: any) => {
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
  //监听角色
  const RoleChange = (val: any) => {
    data.postList.forEach((item: any) => {
      if (item.Id == val) {
        data.ruleForm.RoleName = item.PostName
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    RoleId: [{ required: true, message: '请选择', trigger: 'change' }],
    AssesType: [{ required: true, message: '请选择', trigger: 'blur' }],
    AssesDataId: [{ required: true, message: '请选择', trigger: 'change' }],
    RoleName: [{ required: true, message: '请填写', trigger: 'blur' }],
    GradeCode: [{ required: true, message: '请填写', trigger: 'blur' }]
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
    remoteUrlEvent,
    RoleChange
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
      details: props.details,
      ruleForm: {
        AssesType: ''
      },
      sourceData: [],
      PeopleOriented: [],
      postList: [],
      assesType: {}
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
  :deep(.el-select) {
    width: 100%;
  }
}
</style>
