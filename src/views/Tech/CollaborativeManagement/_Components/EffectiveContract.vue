<template>
  <!-- 搜索框 -->
  <div class="ConsultationList-dow-query clearfix pb-1">
    <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
    <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4 ml-3" />
    <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
      <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
    </el-select>
    <el-input v-model="form.SalesmanInput" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
    <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
    <div class="float-right mt-px">
      <el-button type="primary"> <i class="iconfont icon-jpg mr-2"></i> 电子版</el-button>
      <el-button type="warning"><i class="iconfont icon-dingdan8 mr-2"></i>转为异常</el-button>
    </div>
  </div>
  <!-- #region  表格-->
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="54" align="center" />
        <el-table-column prop="CreateOn" label="生效时间" width="166" align="center">
          <template #default="scope">{{ scope.row.ConsultTime }}</template>
        </el-table-column>
        <el-table-column prop="PostName" label="事业部" width="120">
          <template #default="scope">潍坊事业部</template>
        </el-table-column>
        <el-table-column prop="DepartName" label="业务员" width="100" align="center">
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column>
        <el-table-column prop="Name" label="客户名称" min-width="166">
          <template #default="scope">
            <div class="inline-block">
              {{ scope.row.ClientName }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="合同金额" width="160" align="center">
          <template #default="scope">380400000.00</template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="交货期" width="120" align="center">
          <template #default="scope">
            <span>2022-07-06</span>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="物流状态" width="120" align="center">
          <template #default="scope">
            <span>采购处理</span>
            <!-- <span>已收到</span>
            <span>生产过程</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="发票状态" width="120" align="center">
          <template #default="scope">
            <!-- <span class="text-gray-400">待收款</span> -->
            <!-- <span class="text-blue-500">已收款</span> -->
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="货款状态" width="120" align="center">
          <template #default="scope">
            <!-- <span class="text-gray-400">待收款</span> -->
            <span class="text-blue-500">已收款</span>
          </template>
        </el-table-column>

        <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
          <template #default="scope">
            <div>
              <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
              <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div>
            </div>
            <!-- <span class="text-gray-400">无</span> -->
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <!-- #endregion -->
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
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
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: '',
      CompId: null,
      NameInput: '',
      TimeValue: '',
      SalesmanInput: ''
    })
    const data = reactive({
      // 表格数据
      tableData: [],
      //事业部信息
      CompList: [],
      input2: '',
      shortcuts: [
        {
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          }
        },
        {
          text: '最近一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          }
        },
        {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          }
        }
      ]
    })

    //获取事业部列表
    const getCompList = (data: any) => {
      // 获取事业部列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.CompList = res.data
          console.log(data.CompList)
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    onMounted(() => {
      getCompList(data)
    })
    return {
      form,
      data,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped></style>
