<template>
  <div class="DailyPlanDetailsForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="'学习详情-' + dialogData.Name">
      <el-table :data="dialogData.PlanUserList" style="width: 100%">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="UserName" label="姓名" />
        <el-table-column prop="CompName" label="事业部" width="100" />
        <el-table-column prop="DeptName" label="部门" width="100" />
        <el-table-column prop="address" label="状态" align="center">
          <template #default="scope">
            <span v-html="getLearningState(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="大考分数" align="center">
          <template #default="scope">
            <span v-html="getTestScores(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="大考次数" align="center">
          <template #default="scope">
            <span v-html="getPlanTestExamUserTotal(scope.row)"></span>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作" align="center">
          <template #default="scope">
            <el-button text type="primary" @click="openDetailsWindowEvent(scope.row)">明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </OpenWindow>
    <DailyPlanUserForm v-if="data.DailyPlanUserFormWindow.show" @closeWindow="data.DailyPlanUserFormWindow.show = false" :dialogData="data.DailyPlanUserFormWindow.Details"> </DailyPlanUserForm>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import DailyPlanUserForm from './DailyPlanUserForm.vue'
import { GetAllSysPostList, GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
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

  //校验
  const rules = reactive<FormRules>({})
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
    OpenWindow,
    DailyPlanUserForm
  },
  emits: ['closeWindow'],
  props: {
    // 学习计划详情
    dialogData: {
      type: Object,
      default() {
        return {
          PlanUserList: [],
          CourseWareList: [],
          PlanCoursewareList: [],
          TestExamList: [],
          TestExamUserList: [],
          PlanTestExamEntity: {},
          PlanTestExamUserList: [],
          PlanCoursewareUserList: []
        }
      }
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {},
      dialogData: props.dialogData,
      //   用户学习详情
      DailyPlanUserFormWindow: {
        show: false,
        Id: null,
        Details: {}
      }
    })
    //   打开个人学习详情
    const openDetailsWindowEvent = (row: any) => {
      data.DailyPlanUserFormWindow.show = true
      var obj = {
        PlanUserEntity: '',
        CourseWareList: '',
        PlanCoursewareList: '',
        TestExamList: '',
        TestExamUserList: '',
        PlanCoursewareUserList: ''
      }
      obj.PlanUserEntity = JSON.parse(JSON.stringify(row))
      obj.CourseWareList = data.dialogData.CourseWareList
      obj.PlanCoursewareList = data.dialogData.PlanCoursewareList
      obj.TestExamList = data.dialogData.TestExamList
      obj.TestExamUserList = data.dialogData.TestExamUserList
      obj.PlanCoursewareUserList = data.dialogData.PlanCoursewareUserList.filter((x: any) => {
        return x.UserId == row.UserId
      })
      data.DailyPlanUserFormWindow.Details = obj
    }
    //获取分数
    const getTestScores = (row: any) => {
      var arr = data.dialogData.PlanTestExamUserList.filter((x: any) => {
        return x.UserId == row.UserId
      })
      var scores = 0
      if (arr && arr.length > 0) {
        arr.forEach((item: any) => {
          if (item.Score && item.Score > scores) scores = item.Score
        })
        return scores
      } else {
        return '未考试'
      }
    }
    //获取学习状态
    const getLearningState = (row: any) => {
      var str = ''
      if (row.Status == 100) {
        str = '<font color="#008000">已通过</font>'
      } else {
        var arr = data.dialogData.PlanCoursewareUserList.filter((x: any) => {
          return x.UserId == row.UserId
        })
        if (arr && arr.length > 0) {
          str = '学习中'
        } else {
          str = '<font color="red">未学习</font>'
        }
      }
      return str
    }
    //大考次数
    const getPlanTestExamUserTotal = (row: any) => {
      var arr = data.dialogData.PlanTestExamUserList.filter((x: any) => {
        return x.UserId == row.UserId
      })
      if (arr && arr.length > 0) return arr.length
      else return 0
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
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
      ...formEvent(data, closeWindow),
      getTestScores,
      getLearningState,
      getPlanTestExamUserTotal,
      openDetailsWindowEvent
    }
  }
})
</script>

<style lang="postcss" scoped>
.DailyPlanDetailsForm {
  :deep(.el-table th.el-table__cell) {
    background-color: #e6f2ff;
    color: var(--el-text-color-primary) !important;
  }
}
</style>
