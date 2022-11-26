<template>
  <div class="DailyPlanUserForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="'学习详情-' + data.dialogData.PlanUserEntity.UserName">
      <el-table :data="data.dialogData.CourseWareList" style="width: 100%" border>
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="Name" label="课程名称" align="center" width="180">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="学习" align="center">
          <el-table-column prop="address" label="状态" align="center">
            <template #default="scope">
              <span v-html="getCourseWareState(scope.row, 1)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="时长" align="center">
            <template #default="scope">
              <span>{{ getCourseWareUseTime(scope.row, 1) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="address" label="刷题状态" align="center">
          <el-table-column prop="address" label="状态" align="center">
            <template #default="scope">
              <span v-html="getCourseWareState(scope.row, 3)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="时长" align="center">
            <template #default="scope">
              <span>{{ getCourseWareUseTime(scope.row, 3) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="address" label="考试状态" align="center">
          <el-table-column prop="address" label="状态" align="center">
            <template #default="scope">
              <span v-html="getCourseWareState(scope.row, 4)"></span>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="时长" align="center">
            <template #default="scope">
              <span>{{ getCourseWareUseTime(scope.row, 4) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
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
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 学习计划详情
    dialogData: {
      type: Object,
      default() {
        return {
          PlanUserEntity: {},
          CourseWareList: [],
          PlanCoursewareList: [],
          TestExamList: [],
          TestExamUserList: [],
          PlanCoursewareUserList: []
        }
      }
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {},
      dialogData: props.dialogData
    })
    //获取状态
    const getCourseWareState = (row: any, category: any) => {
      var obj = data.dialogData.PlanCoursewareUserList.find((x: any) => {
        return x.CoursewareId == row.Id && x.Category == category
      })
      var str = '-'
      if (obj) {
        if (obj.Status == 100) str = '<font color="#008000">通过</font>'
        else str = '<font color="#008000">' + (obj.Status || 0) + '次</font>'
      }
      return str
    }
    //获取时长
    const getCourseWareUseTime = (row: any, category: any) => {
      var obj = data.dialogData.PlanCoursewareUserList.find((x: any) => {
        return x.CoursewareId == row.Id && x.Category == category
      })
      var str = '-'
      if (obj) {
        str = (Number(obj.UseTime || 0) / 60).toFixed(0)
      }
      return str
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-850',
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
      getCourseWareState,
      getCourseWareUseTime
    }
  }
})
</script>

<style lang="postcss" scoped>
.DailyPlanUserForm {
  :deep(.el-table th.el-table__cell) {
    background-color: #e6f2ff;
    color: var(--el-text-color-primary) !important;
    border-bottom: 0.5px solid #fff;
    border-right: 0.5px solid #fff;
    padding: 2px 0;
  }
}
</style>
