<template>
  <div>
    <el-tabs type="border-card" class="demo-tabs">
      <el-tab-pane label="询价单质量确认">
        <div class="">
          <el-input v-model="form.customerName" style="width: 230px" placeholder="请输入客户名称" />
          <el-button type="primary" class="ml-4" :icon="Search">查询</el-button>
        </div>
        <!-- 表格 -->
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="tableData" stripe class="w-full" @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="Name" label="客户名称" width="380">
                <template #default="scope">
                  <div class="customerName">
                    <span class="text-xs text-white">重</span>
                    <span class="sanjioaxing"></span>
                  </div>
                  <div style="display: inline-block">{{ scope.row.name }}寿光市联盟石油化工有限公司</div>
                </template>
              </el-table-column>
              <el-table-column prop="InviteName" label="等级">
                <template #default="scope">
                  <el-tag class="" size="small" type="danger">{{ scope.row.grade }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="120">
                <template #default="scope">刘某某</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="订单程度" width="120">
                <template #default="scope">一般订单</template>
              </el-table-column>

              <el-table-column prop="PostName" label="技术程度" width="120">
                <template #default="scope">解析失败</template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="询价时间" width="166">
                <template #default="scope">{{ scope.row.date }}</template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="询价状态" width="90">
                <template #default="scope">关闭跟进</template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="审批状态" width="90">
                <template #default="scope">待审核</template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center">
                <template #default="scope"><div class="text-blue-600">查看</div></template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </el-tab-pane>
      <el-tab-pane label="预警延时">预警延时</el-tab-pane>
      <el-tab-pane label="询价单删除">询价单删除</el-tab-pane>
      <el-tab-pane label="询价单拒接">询价单拒接</el-tab-pane>
      <el-tab-pane label="询价单等级确认">询价单等级确认</el-tab-pane>
      <el-tab-pane label="询价单数量确认">询价单数量确认</el-tab-pane>
    </el-tabs>
    <div class="absolute right-4 top-0.5">
      <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button label="wait">待审核</el-radio-button>
        <el-radio-button label="reviewed">已审核</el-radio-button>
      </el-radio-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetPageList } from '/@/api/tech/EnquiryData'
import { Search } from '@element-plus/icons-vue'
import '/@/assets/css/tech.css'

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
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      customerName: ''
    })

    const data = reactive({
      input1: '',
      // 预览
      single: true,
      // 实现单个单体预览、延期id
      entityById: 0,
      // 左侧表格数据
      tableData: [],
      // 右侧表格数据
      tableData_ri: [],
      tableData_ri_soon: [],
      // 分配订单
      assignorder: {
        assignorder: false
      },

      selectIndex: 0,
      //   时间筛选数据
      timeList: [
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '年', type: 'year' }
      ],
      show: 'overtime',
      show_1: 'all'
    })
    // 监听时间筛选
    const transmitTimeEvent = (time: any) => {
      // if (data.selectIndex == 0) {
      //   CheckIndexRef.value.form.BeginDate = time.BeginDate
      //   CheckIndexRef.value.form.EndDate = time.EndDate
      //   CheckIndexRef.value.search()
      // } else {
      //   RecordIndexRef.value.form.BeginDate = time.BeginDate
      //   RecordIndexRef.value.form.EndDate = time.EndDate
      //   RecordIndexRef.value.search()
      // }
    }
    // 查询
    const searchEvent = () => {
      console.log('查询')
    }
    const currentPage4 = ref(4)
    const pageSize4 = ref(10)
    const tabPosition = ref('all')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      console.log(tabPosition.value)
      data.show_1 = tabPosition.value
    }
    interface User {
      date: string
      name: string
      address: string
      grade: 'A'
    }
    // 表格数据
    const tableData: User[] = [
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: '1',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: '寿光市联盟石油化工有限公司',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: '寿光市联盟石油化工有限公司',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: '寿光市联盟石油化工有限公司',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        grade: 'A'
      },
      {
        date: '2016-05-03 11:24',
        name: 'Tom',
        address: 'No. 189, Grove St, Los Angeles',
        grade: 'A'
      }
    ]
    return {
      data,
      Calendar,
      tableData,
      currentPage4,
      pageSize4,
      form,
      ...tableRender(form, data),
      tabPosition,
      allWait,
      Search,
      transmitTimeEvent,
      searchEvent
    }
  }
})
</script>

<style lang="postcss" scoped></style>
