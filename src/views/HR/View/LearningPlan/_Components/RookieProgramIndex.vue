<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex">
      <el-table :data="data.tableData" class="w-full">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="CreateOn" label="创建时间" align="center">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.CreateOn) }}
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="计划名称" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="关卡" align="center">
          <template #default="scope"> 共{{ convertToChinaNumEvent(scope.row.Stage) }}关 </template>
        </el-table-column>
        <el-table-column prop="Name" label="面向人员" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.PostNames }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center" width="140">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openRookieProgramFormWindow(scope.row.Id)">编辑</el-button>
              <el-button text key="danger" type="danger" @click="deleteEvent(scope.row.Id)">作废</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <RookieProgramForm v-if="data.RookieProgramFormWindow.show" @closeWindow="closeWindow" :Id="data.RookieProgramFormWindow.Id" :isdisabled="data.RookieProgramFormWindow.isdisabled"> </RookieProgramForm>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import RookieProgramForm from './RookieProgramForm.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetDeleteNewestPlanStoreById, GetNewGetNewestPlanStore } from '/@/api/hr/LearningPlan'
import { convertToChinaNum } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetNewGetNewestPlanStore(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        element.Suggestion = eval('(' + element.Suggestion + ')')
      })
      console.log(res)
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.Suggestion.length > 0) {
      data.Suggestion.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue
        }
      })
    }
    return title
  }
  // 数字转大写
  const convertToChinaNumEvent = (val: any) => {
    return convertToChinaNum(val)
  }
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
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    convertToChinaNumEvent
  }
}
const window = (form: any, data: any): any => {
  // 创建新人训 弹窗
  const openRookieProgramFormWindow = (Id: number) => {
    data.RookieProgramFormWindow.Id = Id
    data.RookieProgramFormWindow.show = true
  }
  // 删除事件
  const deleteEvent = (val: number) => {
    ElMessageBox.confirm('是否下架此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetDeleteNewestPlanStoreById(val).then((res) => {
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
    data.RookieProgramFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openRookieProgramFormWindow,
    closeWindow,
    deleteEvent
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    RookieProgramForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      // 创建新人训弹窗数据
      RookieProgramFormWindow: {
        show: false,
        Id: 0
      },
      CoursewareLevel: [], //课件等级
      CoursewareClass: [], //课件分类
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 获取课件等级
      store.getDict('CoursewareLevel').then((res: any) => {
        data.CoursewareLevel = res
      })
      // 获取课件分类
      store.getDict('CoursewareClass').then((res: any) => {
        data.CoursewareClass = res
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
