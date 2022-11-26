<template>
  <div class="AssetManagement-AssetProcurement-Components-purchaseForm">
    <div class="flex justify-between">
      <div>离职管理</div>

      <div class="flex changeType">
        <!-- 下拉框选择方式 -->
        <el-select v-model="form.head" class="firstSelect">
          <el-option v-for="item in data.FilterChannels" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 根据选择的不同展示不同的input框 -->
        <el-input v-if="form.head === 'name'" placeholder="请输入搜索内容" v-model="form.Name"></el-input>
        <el-date-picker v-else-if="form.head === 'times'" v-model="form.dates" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD" />
        <el-select v-else-if="form.head === 'category'" v-model="form.category">
          <el-option v-for="item in data.options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button class="InquireBtn" @click="search()"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <el-button type="primary"><i class="iconfont icon-dayin mr-2"></i>档案打印</el-button>
      </div>
    </div>
    <!-- 离职管理列表 -->
    <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange" @select="selectRow">
      <div class="bf-table-content">
        <el-table ref="multipleTableRef" :data="data.resignationList">
          <el-table-column type="selection" width="30" />
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column min-width="120" prop="date" label="离职时间" align="center">
            <template #default="scope">
              {{ parseTimeEvent(scope.row.ComeDate) }}
            </template>
          </el-table-column>
          <el-table-column min-width="80" prop="name" label="姓名" align="center">
            <template #default="scope">
              <el-tooltip class="box-item" effect="dark" :content="scope.row.PhoneNumber" placement="top">
                {{ scope.row.Name }}
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="工龄" min-width="80" align="center">
            <template #default="scope">
              <span>1年</span>
            </template>
          </el-table-column>
          <el-table-column prop="DepartName" label="部门" min-width="140" align="center">
            <template #default="scope">
              <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.ParentName, DeptName: scope.row.DeptName }"></DepTabridge>
            </template>
          </el-table-column>
          <el-table-column label="岗位" prop="post" min-width="80" align="center">
            <template #default="scope">
              <span>技术员</span>
            </template>
          </el-table-column>
          <el-table-column prop="model" label="员工档案" min-width="100" align="center">
            <template #default="scope">
              <el-button link type="primary">查看</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="people" label="离职类型" min-width="100" align="center">
            <span>一键离职</span>
          </el-table-column>
          <el-table-column prop="source" label="离职阶段" min-width="100" align="center">
            <span>新人期</span>
          </el-table-column>
          <el-table-column label="离职资料" min-width="90" align="center">
            <template #default="{ row }">
              <!-- v-if判断 -->
              <span>未提交</span>
              <!-- <el-button link type="primary">预览</el-button> -->
            </template>
          </el-table-column>
          <el-table-column min-width="140" align="center">
            <template #header>
              <div>审批状态 <i class="iconfont icon-shaixuan align-middle"></i></div>
            </template>
            <template #default="{ row }">
              <!-- <div>
                <div class="w-2 h-2 inline-block rounded-full bg-orange-400"></div>
                <span class="ml-2">未审批</span>
              </div> -->
              <!-- <div >
                <div class="w-2 h-2 inline-block rounded-full bg-green-400"></div>
                <span class="ml-2">审批中</span>
              </div> -->
              <div>
                <div class="w-2 h-2 inline-block rounded-full bg-green-400"></div>
                <span class="ml-2">已审批</span>
              </div>
            </template>
          </el-table-column>

          <el-table-column prop="model" label="操作" min-width="100" align="center">
            <template #default="{ row, $index }">
              <el-button link type="primary">审批记录</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </table-search>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetHRStaffeManagementPage } from '/@/api/hr/Induction'
import TableSearch from '/@/components/TableSearch/index.vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetHRStaffeManagementPage(form).then((res) => {
    if (res.code == 1) {
      console.log(res)
      data.resignationList = res.data.records
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
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  const filterData = (val: any) => {
    if (val.Sex && val.Sex.length > 0) {
      form.Sex = JSON.stringify(val.Sex)
    } else {
      form.Sex = []
    }
    if (val.StaffState && val.StaffState.length > 0) {
      form.StaffState = JSON.stringify(val.StaffState)
    } else {
      form.StaffState = []
    }
    search()
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
  // table选择监听
  const handleSelectionChange = (val: any) => {
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent,
    typeChange,
    timeChange,
    filterData,
    selectRow
  }
}
export default defineComponent({
  components: {
    DepTabridge,
    TableSearch
  },
  setup() {
    const multipleTableRef: any = ref(null)
    // 所有变量
    const data = reactive({
      // 筛选的方式
      options1: [
        {
          value: 'taobao',
          label: '淘宝'
        },
        {
          value: 'jingdong',
          label: '京东'
        }
      ],
      // 筛选的渠道
      FilterChannels: [
        {
          value: 'name',
          label: '姓名'
        },
        {
          value: 'times',
          label: '时间范围'
        },
        {
          value: 'category',
          label: '采购渠道'
        }
      ],
      resignationList: []
    })
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      // 筛选方式默认名字
      head: 'name',
      // 筛选的内容
      Name: '',
      // 时间筛选的内容
      dates: [],
      // 筛选渠道的内容
      category: ''
    })
    onMounted(() => {})
    return {
      form,
      data,
      ...tableRender(form, data, multipleTableRef),
      multipleTableRef
    }
  }
})
</script>
<style lang="postcss" scoped>
.AssetManagement-AssetProcurement-Components-purchaseForm {
  :deep(.changeType) {
    .el-input__wrapper {
      width: 300px;
    }
    .InquireBtn {
      margin-left: 20px;
      color: #468bfd;
      border: 1px solid #468bfd;
    }
    .firstSelect {
      .el-input__wrapper {
        width: 150px;
      }
    }
  }
  :deep(.el-table__header) {
    th {
      background-color: #fafafa;
    }
  }
}
</style>
