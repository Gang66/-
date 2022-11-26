<template>
  <div class="PositionManagement-OnJob-Components-purchaseForm">
    <div class="flex justify-between">
      <div class="font-bold">在职贡献管理</div>

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
        <el-button class="InquireBtn" @click="search()"> <i class="iconfont icon-huntfor mr-2"></i> 查询 </el-button>
      </div>
    </div>
    <!-- table表格 -->
    <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
      <div class="bf-table-content">
        <el-table ref="multipleTableRef" :data="data.contributionList">
          <el-table-column type="selection" width="30" />
          <el-table-column type="index" width="55" label="序号" />
          <el-table-column min-width="100" prop="date" label="入职时间" align="center">
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
          <el-table-column label="岗位" prop="post" min-width="80" align="center">
            <template #default="scope">
              <span>技术员</span>
            </template>
          </el-table-column>

          <el-table-column prop="DepartName" label="部门" align="center">
            <template #default="scope">
              <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.ParentName, DeptName: scope.row.DeptName }"></DepTabridge>
            </template>
          </el-table-column>
          <el-table-column prop="Age" label="年龄" min-width="80" align="center" />
          <el-table-column label="经历岗位" min-width="80" align="center">
            <template #default="{ row }">
              <el-button link type="primary">4</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="people" label="数据看板" min-width="80" align="center">
            <template #default="{ row }">
              <el-button link type="primary" @click="addAssets(row)">指标内容</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="source" label="领导评语" min-width="160" show-overflow-tooltip>
            <template #default="scope">
              <span>测试车i 少时诵诗书所所所所所所所所所所所所所所所所 少时诵诗书所所所所所所所所所所所所所所所所</span>
            </template>
          </el-table-column>
          <el-table-column prop="model" label="操作">
            <template #default="{ row, $index }">
              <div class="flex">
                <el-button link type="primary">评语</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </table-search>

    <!-- 资产新增页面 -->
    <addPurchaseVue v-if="addData.showAddDialog" :addData="addData" @closeWindow="closeAddDialog" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import addPurchaseVue from './addPurchaseForm.vue'
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
      data.contributionList = res.data.records
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
    filterData
  }
}

//销售专员指标弹窗
const addPurch = (data: any) => {
  // 给弹窗传递的数据
  const addData = reactive({
    showAddDialog: false,
    data: {}
  })
  // 打开新增
  const addAssets = (row: any) => {
    addData.showAddDialog = true
  }
  const closeAddDialog = () => {
    addData.showAddDialog = false
  }

  return { addData, closeAddDialog, addAssets }
}

export default defineComponent({
  components: {
    addPurchaseVue,
    DepTabridge,
    TableSearch
  },
  setup() {
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
          label: '岗位'
        }
      ],
      // 点击查看照片显示dialog
      PictureDialog: false,
      // 是否显示维修列表弹窗
      ShowRepair: false,
      SexData: [], //性别
      contributionList: []
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
    onMounted(() => {
      // 性别
      store.getDict('sys_user_gender').then((res: any) => {
        console.log(res)
        res.forEach((element: any) => {
          element.text = element.DicValue
          element.value = element.DicKey
        })
        data.SexData = res
      })
    })
    return {
      ...addPurch(data),
      data,
      form,
      ...tableRender(form, data)
    }
  }
})
</script>
<style lang="postcss" scoped>
.PositionManagement-OnJob-Components-purchaseForm {
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
