<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">试用期管理</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="姓名" value="1" />
            <el-option label="事业部" value="2" />
          </el-select>
          <el-input v-model="form.Name" placeholder="请输入" class="screen-width" v-if="form.type == 1" />
          <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class="screen-width" v-else-if="form.type == 2">
            <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-button @click="search()" class="ml-3" type="primary" plain>
            <el-icon>
              <el-icon-Search />
            </el-icon>
            <span>搜索</span>
          </el-button>
          <!-- <el-button @click="data.ExamineAllocationWindow.show = true" type="primary" plain>
            <el-icon>
              <el-icon-Tickets />
            </el-icon>
            <span>考核分配配置</span>
          </el-button> -->
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full" :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="Name" label="姓名" align="center"><template #default="scope">
                <el-tooltip class="box-item" effect="dark" :content="scope.row.PhoneNumber" placement="top">
                  <div>{{ scope.row.Name }}</div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="Days" label="部门" align="center" width="140">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="" label="上级领导" align="center">
              <template #default="scope">
                <div class="truncate">{{ scope.row.ManageName }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="Week" label="周期" align="center" sortable />
            <el-table-column prop="NoQualified" label="成绩合格" align="center" sortable> </el-table-column>
            <el-table-column prop="Qualified" label="成绩不合格" align="center" sortable width="150px"> </el-table-column>
            <el-table-column prop="" label="试用期报告" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openProbationFormWindow(scope.row.CreateBy)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="" label="转正状态" align="center">
              <template #default="scope">
                <div v-if="scope.row.State == 3">倒计时{{ scope.row.MoreDay }}天</div>
                <template v-else>
                  <div v-for="(item, index) in data.stateList" :key="index">
                    <div class="truncate" v-if="item.DicKey == scope.row.State">{{ item.DicValue }}</div>
                  </div>
                </template>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 试用期报告 -->
    <ProbationForm v-if="data.ProbationFormWindow.show" @closeWindow="closeWindow" :userId="data.ProbationFormWindow.userId"></ProbationForm>
    <!-- 考核分配配置 -->
    <ExamineAllocation v-if="data.ExamineAllocationWindow.show" @closeWindow="closeWindow"></ExamineAllocation>
  </div>
</template>

<script lang="ts">
import DepTabridge from '/@/components/DepTabridge/index.vue'
import zStatistic from '../../Components/statistic/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import ProbationForm from './_Components/ProbationForm.vue'
import ExamineAllocation from '../../../System/ExamineAllocation/_Components/ExamineAllocationForm.vue'
import { GetProbationPage } from '/@/api/hr/Staff'
import { GetTypeDepartList } from '/@/api/system/dept'
import { ElMessage } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetProbationPage(form).then((res) => {
    if (res.code == 1) {
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
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
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
    typeChange
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  const filterHandler = () => {}
  const openImage = () => {
    console.log((imageRef.value.previewTeleported = false))
  }
  // 打开试用期报告
  const openProbationFormWindow = (userId: number) => {
    console.log(userId)
    data.ProbationFormWindow.userId = userId
    data.ProbationFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.ProbationFormWindow.show = false
    data.ExamineAllocationWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    closeWindow,
    openImage,
    openProbationFormWindow,
    filterHandler
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    ProbationForm,
    zStatistic,
    ExamineAllocation,
    DepTabridge
  },
  props: {},
  setup() {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      type: '1',
      Name: ''
    })
    const data = reactive({
      deptList: [], //部门数据
      // 弹窗数据
      ProbationFormWindow: {
        show: false,
        Id: 0
      },
      //考核分配弹窗数据
      ExamineAllocationWindow: {
        show: false,
        Id: 0
      },
      // 列表数据
      tableData: [],
      stateList: []
    })
    onMounted(() => {
      // 获取审批流程状态
      store.getDict('hr_Probation_state').then((res: any) => {
        data.stateList = res
      })
      // 获取部门列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data),
      ...window(form, data, imageRef),
      imageRef
    }
  }
})
</script>

<style lang="postcss" scoped>
.leaveIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
