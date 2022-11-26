<!--
 * @Author: ZHJ
 * @Date: 2022-08-08 09:15:15
 * @LastEditTime: 2022-08-23 09:26:25
 * @LastEditors: ZHJ
 * @Description: 深造设置
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Further\Index.vue
 * 版权声明
-->
<template>
  <div class="bg-close-table-checkbox">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">深造设置</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="申请类型" value="1" />
            <el-option label="申请时间" value="5" />
          </el-select>
          <el-select v-model="form.ApplicationType" placeholder="请选择申请类型" filterable class=" screen-width" v-if="form.type==1">
            <el-option v-for="item in data.trendType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
          </el-select>
          <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type==5" start-placeholder="开始时间"
            end-placeholder="结束时间" @change="timeChange" />
          <el-button type="primary" @click="search()" class="ml-2">搜索</el-button>
          <el-button type="primary" class="ml-2" @click="openAddFurtherFormWindow({})">新增关停类型</el-button>
          <el-button :type="data.single?'info':'primary'" class="ml-2" @click="openSetOtherFormWindow()" :disabled="data.single">其他设置</el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full" ref="multipleTableRef" @selection-change="handleSelectionChange" @select="selectRow">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="ReasonName" label="关停类型" align="center" />
            <el-table-column prop="Point" label="解锁积分" align="center" />
            <el-table-column prop="LearnCount" label="学习次数" align="center" />
            <el-table-column prop="Suggestion" label="操作" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openAddFurtherFormWindow(scope.row,3)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <AddFurtherForm v-if="data.AddFurtherFormWindow.show" @closeWindow="closeWindow" :Id="data.AddFurtherFormWindow.Id" :viewType="data.AddFurtherFormWindow.viewType">
    </AddFurtherForm>
    <SetOtherForm v-if="data.SetOtherFormWindow.show" @closeWindow="closeWindow" :viewType="data.SetOtherFormWindow.viewType"></SetOtherForm>
  </div>
</template>

<script lang="ts">
import AddFurtherForm from './_Components/AddFurtherForm.vue'
import SetOtherForm from './_Components/SetOtherForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import tabs from '/@/components/Tabs/Index.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetAlertReasonTypeList } from '/@/api/hr/Further'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetAlertReasonTypeList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 监听时间筛选
  const timeChange = (val: any) => {
    if (val) {
      form.BeginDate = parseTime(val[0], '{y}-{m}-{d}')
      form.EndDate = parseTime(val[1], '{y}-{m}-{d}')
    } else {
      form.BeginDate = ''
      form.EndDate = ''
    }
  }
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
    form.time = ''
    form.HRName = ''
    form.BeginDate = ''
    form.EndDate = ''
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.info = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  //   监听多选
  const handleSelectionChange = (val: any) => {
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
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
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    timeChange,
    typeChange,
    handleSelectionChange,
    selectRow
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 弹窗
  const openquitFormWindow = async (val: any, type: number) => {
    data.WFManagementFormWindow.show = true
  }
  // 新增弹窗
  const openAddFurtherFormWindow = (row: any) => {
    if (row) {
      data.AddFurtherFormWindow.Id = row.Id
    } else {
      data.AddFurtherFormWindow.Id = null
    }
    data.AddFurtherFormWindow.show = true
  }
  // 其他设置弹窗
  const openSetOtherFormWindow = () => {
    data.SetOtherFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.AddFurtherFormWindow.show = false
    data.SetOtherFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openquitFormWindow,
    closeWindow,
    openAddFurtherFormWindow,
    openSetOtherFormWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    zStatistic,
    tabs,
    AddFurtherForm,
    SetOtherForm
  },
  props: {},
  setup() {
    const multipleTableRef: any = ref(null)
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      type: '1'
    })
    const data = reactive({
      single: true, //是否选中数据
      info: {}, //列表选中数据
      ApprovalList: [], //审批状态
      trendType: [], //申请类型数据
      // 新增弹窗数据
      AddFurtherFormWindow: {
        show: false,
        Id: 0
      },
      // 其他设置弹窗数据
      SetOtherFormWindow: {
        show: false,
        Id: 0
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 根据Id获取详情
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
      // 申请类型
      store.getDict('hr_trend_type').then((res: any) => {
        data.trendType = res
      })
      // 审批状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalList = res
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data, multipleTableRef),
      ...window(form, data, multipleTableRef),
      imageRef,
      multipleTableRef
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
