<template>
  <div>
    <div class="p-4 pb-1">
      <div class="w-80 inline-block mr-4">
        <el-input v-model="data.customerName" size="large" placeholder="输入名称/型号/规格/材质" />
      </div>
      <el-button type="primary" :icon="Search" size="large" class="mr-4">查询</el-button>
      <div class="float-right">
        <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
          <el-radio-button label="all">全部</el-radio-button>
          <el-radio-button label="wait">常规常用</el-radio-button>
          <el-radio-button label="reviewed">常规非常用</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content">
          <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
            <!-- <el-table-column
                      type="index"
                      label="序号"
                      width="54"
                      align="center"
                    /> -->
            <el-table-column prop="CreateOn" label="产品名称">
              <template #default="scope"> 智能定位器 </template>
            </el-table-column>
            <el-table-column prop="Name" label="常规性" align="center">
              <template #default="scope">
                <span>常规非常用</span>
              </template>
            </el-table-column>
            <el-table-column prop="InviteName" label="型号" align="center">
              <template #default="scope">
                <span>ZJHP-150LBC</span>
              </template>
            </el-table-column>
            <el-table-column prop="Age" label="规格" align="center" width="140">
              <template #default="scope">
                <span>DN100</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="特殊性" align="center">
              <template #default="scope">
                <span> 包含执行器连接件</span>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="录入人" align="center" width="100">
              <template #default="scope">
                <span>系统管理员</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="录入方式" align="center" width="100">
              <template #default="scope">批量导入</template>
            </el-table-column>
            <el-table-column prop="DepartName" label="时间" align="center">
              <template #default="scope">
                <span>2022-07-07 08:42</span>
              </template>
            </el-table-column>

            <el-table-column prop="RecruitChannel" label="操作" align="center" width="80">
              <template #default="scope"
                ><div class="text-blue-600 cursor-pointer"><i class="iconfont icon-bianji1 mr-1"></i> 编辑</div></template
              >
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetPageList } from '/@/api/tech/EnquiryData'
import { parseTime } from '/@/utils/tools'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPageList(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data
      //   data.tableData = res.data.records
      //   data.PathList
      //   form.totals = res.data.totals
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails)
    // console.log(data.selectDetails[0].Id)
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
    parseTimeEvent
    // GetOverTimeLists,
    // GetBeOverTimeLists
  }
}

export default defineComponent({
  components: {
    TableSearch
  },
  setup() {
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })
    const tabPosition = ref('all')
    const data = reactive({
      tableData1: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
      // 表格数据
      tableData: [],
      customerName: ''
    })
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      console.log(tabPosition.value)
    }
    return {
      data,
      Search,
      tabPosition,
      allWait,
      form,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped></style>
