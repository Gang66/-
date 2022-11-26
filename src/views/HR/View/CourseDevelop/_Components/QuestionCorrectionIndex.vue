<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex">
      <el-table :data="data.tableData" class="w-full">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="Name" label="课程名称" align="center">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="scope.row.CourseName" placement="top">
              <div class="truncate">{{ scope.row.CourseName }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="题型" align="center">
          <template #default="scope">
            <div v-for="(item, index) in data.CoursewareClass">
              <template v-if="item.DicKey == scope.row.QuestionType"> {{ item.DicValue }}</template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="试题" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Title }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="RealName" label="纠错类型" align="center">
          <template #default="scope">
            <div v-for="(item, index) in data.QuestionCorrection">
              <template v-if="item.DicKey == scope.row.Category"> {{ item.DicValue }}</template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Content" label="纠错" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Content }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="RealName" label="纠错人" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.RealName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="danger" type="danger" @click="openQuestionCorrectionFormWindow(scope.row.Id)">待解决</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <QuestionCorrectionForm v-if="data.QuestionCorrectionFormWindow.show" @closeWindow="closeWindow" :Id="data.QuestionCorrectionFormWindow.Id" :isdisabled="false"> </QuestionCorrectionForm>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import QuestionCorrectionForm from './QuestionCorrectionForm.vue'
// import TravelForm from './TravelForm.vue'
import { GetCourseTestErrorList, GetDelWorkCourseMaterialSave } from '/@/api/hr/CourseDevelop'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetCourseTestErrorList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent
  }
}
const window = (form: any, data: any): any => {
  // 上传素材 弹窗
  const openQuestionCorrectionFormWindow = (Id: number, Type: string) => {
    data.QuestionCorrectionFormWindow.Id = Id
    data.QuestionCorrectionFormWindow.Type = Type
    data.QuestionCorrectionFormWindow.isUpdate = true
    data.QuestionCorrectionFormWindow.show = true
  }
  // 删除事件
  const deleteEvent = (val: number) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetDelWorkCourseMaterialSave(val).then((res) => {
        if (res.code == 1) {
          form.page = 1
          tableRender(form, data)
          ElMessage({ type: 'success', message: '删除成功' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
      })
    })
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.QuestionCorrectionFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openQuestionCorrectionFormWindow,
    closeWindow,
    deleteEvent
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    QuestionCorrectionForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      // 弹窗数据
      QuestionCorrectionFormWindow: {
        show: false,
        Id: 0
      },
      CoursewareLevel: [], //课件等级
      CoursewareClass: [], //课件分类
      QuestionCorrection: [], //纠错类型
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 获取课件分类
      store.getDict('hr_question_type').then((res: any) => {
        data.CoursewareClass = res
      })
      // 获取纠错类型
      store.getDict('hr_QuestionCorrection_state').then((res: any) => {
        data.QuestionCorrection = res
      })
    })
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="postcss" scoped>
.travelIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
