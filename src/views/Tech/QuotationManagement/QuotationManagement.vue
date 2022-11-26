<template>
  <div class="tech_technicalanalys">
    <div class="h-12">
      <filterDatetime @transmitTime="transmitTimeEvent" :list="data.timeList" :key="data.selectIndex"></filterDatetime>
      <TechnicalTop></TechnicalTop>
      <!-- 报价管理 -->
      <div class="clearfix pt-3 pr-4 pb-3 pl-0 bg-gray-200">
        <div class="float-left pt-1">
          <span class="ml-8">报价管理</span>
        </div>
        <div class="float-right">
          <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
            <el-radio-button label="all">全部</el-radio-button>
            <el-radio-button label="wait">待审核</el-radio-button>
            <el-radio-button label="reviewed">已审核</el-radio-button>
          </el-radio-group>
        </div>
      </div>
      <div class="bf-table-content bg-white">
        <!-- 搜索框 -->
        <div class="clearfix pt-4 pl-4 pr-4 mb-4">
          <div class="float-left">
            <div class="mr-1 w-40 inline-block">
              <el-input v-model="form.title" size="default " placeholder="请输入客户名称" />
            </div>
            <el-select v-model="value" class="m-2" placeholder="报价程度">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-select v-model="value" class="m-2" placeholder="事业部">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <div class="mr-1 w-32 inline-block">
              <el-input v-model="form.title" size="default " placeholder="请输入客户名称" />
            </div>
            <div class="mr-1 ml-1 inline-block">
              <el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="defaultTime" :shortcuts="shortcuts" @change="changeTime" />
            </div>
            <div class="ml-2 inline-block">
              <el-button type="primary" :icon="Search" @click="searchEvent">查询</el-button>
              <el-button :icon="RefreshLeft">重置</el-button>
            </div>
          </div>
        </div>
        <!-- 表格 -->
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="CreateOn" label="询价时间" width="166">
              <template #default="scope">{{ scope.row.ConsultTime }}</template>
            </el-table-column>
            <el-table-column prop="CreateOn" label="事业部" width="120">
              <template #default="scope">润扬事业部</template>
            </el-table-column>
            <el-table-column prop="DepartName" label="业务员" width="100">
              <template #default="scope">刘某某</template>
            </el-table-column>
            <el-table-column prop="Name" label="客户名称" min-width="160">
              <template #default="scope">
                <!-- 必 -->
                <div class="customerName inline-block bg-red-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '必'">
                  <span class="text-xs text-white">{{ scope.row.GradeName }}</span>
                </div>
                <!-- 重 -->
                <div class="customerName inline-block bg-blue-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '重'">
                  <span class="text-xs text-white">{{ scope.row.GradeName }}</span>
                </div>
                <!-- 普 -->
                <div class="customerName inline-block bg-green-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '普'">
                  <span class="text-xs text-white">{{ scope.row.GradeName }}</span>
                </div>
                <div class="inline-block">
                  {{ scope.row.ClientName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="InviteName" label="等级" width="100">
              <template #default="scope">
                <!-- A -->
                <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                <!-- B -->
                <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                <!-- C -->
                <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="核算员" width="100">
              <template #default="scope">刘某某</template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="询价状态" width="100">
              <template #default="scope"><span class="text-green-400">厂家确认</span></template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="加价管理" width="100">
              <template #default="scope"><span class="text-yellow-500">销售加价</span></template>
            </el-table-column>
            <el-table-column prop="PostName" label="订单分析" width="120" align="center">
              <template #default="scope">
                <span class="text-red-500">查看</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="100">
              <template #default="scope">
                <div class="text-blue-600">查看</div>
              </template>
            </el-table-column>
          </el-table>
        </table-search>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import filterDatetime from '../Inquiry/_Components/filterDatetime.vue'
import TechnicalTop from '../Inquiry/_Components/TotalWages.vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetPageList } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'

export default defineComponent({
  components: {
    filterDatetime,
    TechnicalTop,
    TableSearch
  },
  setup() {
    const shortcuts = [
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
    const value1 = ref('')
    const defaultTime = ref([new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 2, 1, 23, 59, 59)])
    const value = ref('')

    const options = [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      },
      {
        value: 'Option3',
        label: 'Option3'
      },
      {
        value: 'Option4',
        label: 'Option4'
      },
      {
        value: 'Option5',
        label: 'Option5'
      }
    ]
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })
    const tabPosition = ref('all')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      console.log(tabPosition.value)
      data.show_1 = tabPosition.value
    }
    const data = reactive({
      show_1: 'all',
      selectIndex: 0,
      //   时间筛选数据
      timeList: [
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '年', type: 'year' }
      ]
    })
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
    const changeTime = (val: any) => {
      console.log(val[0])
    }
    return {
      data,
      changeTime,
      tabPosition,
      allWait,
      Search,
      RefreshLeft,
      form,
      ...tableRender(form, data),
      options,
      value,
      defaultTime,
      value1,
      shortcuts
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_technicalanalys {
  .bf-table-content {
    margin-top: 0;
  }
}
</style>
