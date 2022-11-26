<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 08:56:05
 * @LastEditTime: 2022-11-10 15:02:18
 * @LastEditors: ZHJ
 * @Description: 工资设定列表
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\SalarySettingIndex.vue
 * 版权声明
-->
<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex bg-close-table-checkbox">
      <el-table :data="data.tableData" class="w-full" @select="selectRow" ref="multipleTableRef">
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="EntryDate" label="入职时间" align="center" min-width="100">
          <template #default="scope">
            <div class="truncate">{{ parseTimeEvent(scope.row.EntryDate) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="UserName" label="姓名" align="center" />
        <el-table-column prop="" label="部门" align="center" min-width="140">
          <template #default="scope">
            <DepTabridge :key="scope.row.UserId" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
          </template>
        </el-table-column>
        <el-table-column prop="" label="岗位类别" align="center" min-width="100">
          <template #default="scope">
            <div v-for="(item,index) in data.PostType" :key="index">
              <div class="truncate" v-if="scope.row.JobType==item.DicKey">{{ item.DicValue }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="实发收入【试用期（含经理试用期）除承包收入的按80%计算】" align="center">
          <el-table-column prop="BaseTotal" label="基本工资" align="center" min-width="80" />
          <el-table-column prop="SecrecyTotal" label="竟保工资" align="center" min-width="80" />
          <el-table-column prop="OverTimeTotal" label="加班工资" align="center" min-width="80" />
          <el-table-column prop="NoteTotal" label="总结工资" align="center" min-width="80" />
          <el-table-column prop="StudyTotal" label="学习工资" align="center" min-width="80" />
          <el-table-column prop="WaiTotal" label="承包量" align="center" min-width="80" />
        </el-table-column>
        <el-table-column prop="" label="社保金额" align="center">
          <el-table-column prop="SheBaoGeTotal" label="个人" align="center" min-width="70" />
          <el-table-column prop="SheBaoGongTotal" label="公司" align="center" min-width="80" />
        </el-table-column>
        <el-table-column prop="MonthTotal" label="年承包月薪" align="center" min-width="100">
          <template #default="scope">
            <div class="truncate">{{ scope.row.MonthTotal }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="岗位状态" align="center" min-width="100">
          <template #default="scope">
            <div v-for="(item,index) in data.examineType" :key="index">
              <div class="truncate" v-if="scope.row.JobState==item.DicKey">{{ item.DicValue }}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openTravelWindow(scope.row, 2)">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <SalarySettingForm v-if="data.SalarySettingFormWindow.show" @closeWindow="closeWindow" :details="data.SalarySettingFormWindow.details"> </SalarySettingForm>
  <BatchSalarySettingForm v-if="data.BatchSalarySettingFormWindow.show" @closeWindow="closeWindow"> </BatchSalarySettingForm>
</template>

<script lang="ts">
import SalarySettingForm from './SalarySettingForm.vue'
import BatchSalarySettingForm from './BatchSalarySettingForm.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import { GetSalarySetting } from '../../../../../api/hr/Salary'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetSalarySetting(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.count
    }
  })
}
// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
  renderTableList(form, data)
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.details = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
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
    parseTimeEvent,
    selectRow,
    BatchSalarySettingForm
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 工资设定 弹窗
  const openTravelWindow = async (value: any, viewType: string) => {
    data.SalarySettingFormWindow.details = value
    data.SalarySettingFormWindow.details.viewType = viewType
    data.SalarySettingFormWindow.show = true
  }
  // 批量工资设定 弹窗
  const openopenTravelWindow = async (Id: number, viewType: string) => {
    data.BatchSalarySettingFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.SalarySettingFormWindow.show = false
    data.BatchSalarySettingFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openTravelWindow,
    openopenTravelWindow,
    closeWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    SalarySettingForm,
    BatchSalarySettingForm,
    DepTabridge
  },
  props: {
    selectIndex: { type: Number, default: 0 }
  },
  setup(props) {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      IsResign: props.selectIndex == 0 ? false : true,
      size: 10,
      total: 1
    })
    const data = reactive({
      details: {},
      // 修改弹窗数据
      SalarySettingFormWindow: {
        show: false,
        Id: 0
      },
      // 批量修改弹窗数据
      BatchSalarySettingFormWindow: {
        show: false,
        Id: 0
      },
      PostType: [], //岗位类别
      examineType: [], //岗位状态
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 获取岗位类别
      store.getDict('post_type').then((res: any) => {
        data.PostType = res
      })
      // 获取岗位类别
      store.getDict('hr_examine_type').then((res: any) => {
        data.examineType = res
      })
    })
    return { form, data, ...tableRender(form, data, multipleTableRef), ...window(form, data, multipleTableRef), multipleTableRef }
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
