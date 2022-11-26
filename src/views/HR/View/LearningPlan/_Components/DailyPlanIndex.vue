<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex">
      <el-table :data="data.tableData" class="w-full">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="Name" label="培训类型" align="center" width="100">
          <template #default="scope">
            <div v-for="(item, index) in data.LearningPlanType" :key="index">
              <template v-if="item.DicKey == scope.row.CategoryId">
                {{ item.DicValue }}
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="培训摘要" align="center" width="260">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="学习时间" align="center" width="200">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.BeginDate) + '~' + parseTimeEvent(scope.row.EndDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="学习状态" align="center">
          <template #default="scope">
            <span v-if="scope.row.Status == 10">
              <div class="bf-font-green-color">已启用</div>
            </span>
            <span v-else-if="scope.row.Status == 20">
              <div class="bf-font-blue-color">学习中</div>
            </span>
            <span v-else-if="scope.row.Status == 30">已结束</span>
            <span v-else>
              <div class="bf-error-color">未启用</div>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="学习人员" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              {{ arrTotalFilters(scope.row.PlanUserList) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="计划内容" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openDailyPlanFormWindow(scope.row.Id, true)">明细</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="审核状态" align="center">
          <template #default="scope">
            <div class="truncate">已审核</div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="学习详情" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openDailyPlanDetailsFormWindow(scope.row, true)">明细</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="操作" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text type="danger" @click="deleteEvent(scope.row.Id)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <!-- 计划内容 -->
  <DailyPlanForm v-if="data.DailyPlanFormWindow.show" @closeWindow="closeWindow" :Id="data.DailyPlanFormWindow.Id"> </DailyPlanForm>
  <!-- 学习详情 -->
  <DailyPlanDetailsForm v-if="data.DailyPlanDetailsFormWindow.show" @closeWindow="closeWindow" :dialogData="data.DailyPlanDetailsFormWindow.details"></DailyPlanDetailsForm>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import DailyPlanForm from './DailyPlanForm.vue'
import DailyPlanDetailsForm from './DailyPlanDetailsForm.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetEditWorkCourseUndercarriageSave } from '/@/api/hr/CourseDevelop'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetDelWorkStudyPlan, GetWorkStudyPlanPage } from '/@/api/hr/LearningPlan'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWorkStudyPlanPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.count
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
  // 计划内容弹窗
  const openDailyPlanFormWindow = (Id: number) => {
    data.DailyPlanFormWindow.Id = Id
    data.DailyPlanFormWindow.show = true
  }
  // 学习详情弹窗
  const openDailyPlanDetailsFormWindow = (val: number) => {
    data.DailyPlanDetailsFormWindow.details = Object.assign({}, val)
    console.log(data.DailyPlanDetailsFormWindow.details)
    data.DailyPlanDetailsFormWindow.show = true
  }
  // 删除事件
  const deleteEvent = (val: number) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetDelWorkStudyPlan(val).then((res) => {
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
  //数量
  const arrTotalFilters = (arr: any) => {
    return (arr || []).length
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.DailyPlanFormWindow.show = false
    data.DailyPlanDetailsFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openDailyPlanFormWindow,
    closeWindow,
    deleteEvent,
    openDailyPlanDetailsFormWindow,
    arrTotalFilters
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    DailyPlanForm,
    DailyPlanDetailsForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      // 计划内容弹窗数据
      DailyPlanFormWindow: {
        show: false,
        Id: 0
      },
      // 学习详情弹窗数据
      DailyPlanDetailsFormWindow: {
        show: false,
        Id: 0
      },
      LearningPlanType: [], //培训类型
      // 列表数据
      tableData: []
    })
    onMounted(() => {
      // 获取培训类型
      store.getDict('hr_LearningPlan_type').then((res: any) => {
        data.LearningPlanType = res
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
