<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">正式期管理</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="姓名" value="1" />
            <el-option label="事业部" value="2" />
            <el-option label="转入时间" value="5" />
          </el-select>
          <el-input v-model="form.UserName" placeholder="请输入" class="screen-width" v-if="form.type == 1" />
          <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class="screen-width" v-else-if="form.type == 2">
            <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type == 5" start-placeholder="开始时间"
            end-placeholder="结束时间" @change="timeChange" />
          <el-button @click="search()" class="ml-3" type="primary" plain>
            <el-icon>
              <el-icon-Search />
            </el-icon>
            <span>搜索</span>
          </el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full" :default-sort="{ prop: 'date', order: 'descending' }">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="RTime" label="转入时间" width="110" align="center"><template #default="scope">{{ parseTimeEvent(scope.row.RTime) }}</template></el-table-column>
            <el-table-column prop="UserName" label="姓名" align="center"><template #default="scope">
                <el-tooltip class="box-item" effect="dark" :content="scope.row.PhoneNumber" placement="top">
                  <div>{{ scope.row.UserName }}</div>
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
            <el-table-column prop="WorkAge" label="工龄" align="center" sortable />
            <el-table-column prop="Week" label="周期" align="center" sortable />
            <el-table-column prop="NoQualified" label="成绩合格" align="center" sortable width="120px"> </el-table-column>
            <el-table-column prop="Qualified" label="成绩不合格" align="center" sortable width="150px"> </el-table-column>
            <el-table-column prop="" label="失信" align="center" width="100" sortable> </el-table-column>
            <el-table-column prop="" label="报告" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openFormListWindow(scope.row.CreateBy)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 正式期报告列表 -->
    <formalList v-if="data.formalListWindow.show" @closeWindow="closeWindow" :userId="data.formalListWindow.userId"></formalList>
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
import formalList from './_Components/formalList.vue'
import { GetAdjustSalariesList } from '/@/api/hr/Staff'
import Template from '/@/views/Template.vue'
import { GetTypeDepartList } from '/@/api/system/dept'
import { ElMessage } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetAdjustSalariesList(form).then((res) => {
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
  // 打开正式期列表
  const openFormListWindow = (userId: number) => {
    console.log(userId)
    data.formalListWindow.userId = userId
    data.formalListWindow.show = true
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
    form.BeginDate = ''
    form.EndDate = ''
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    val = new Date(val)
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
    typeChange,
    openFormListWindow,
    timeChange
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  const openImage = () => {
    console.log((imageRef.value.previewTeleported = false))
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.formalListWindow.show = false
    data.OneClickQuitFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    closeWindow,
    openImage
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    formalList,
    zStatistic,
    DepTabridge,
    Template
  },
  props: {},
  setup() {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      BeginDate: '',
      type: '1'
    })
    const data = reactive({
      deptList: [], //部门数据
      // 弹窗数据
      formalListWindow: {
        show: false,
        Id: 0
      },
      // 一键离职弹窗数据
      OneClickQuitFormWindow: {
        show: false,
        Id: 0
      },
      // 列表数据
      tableData: []
    })
    onMounted(() => {
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
