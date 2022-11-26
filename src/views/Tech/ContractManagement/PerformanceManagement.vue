<template>
  <div class="Tec_ContractApproval">
    <!-- 业绩管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">业绩管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query inline-block pb-1">
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
          <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-input v-model="form.SalesmanInput" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
        <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
        <el-button type="primary" class="ml-4" :icon="Search" @click="search">查询</el-button>
        <el-button> <i class="iconfont icon-daochu mr-2"></i> 导出数据</el-button>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column fixed type="selection" width="50" align="center" />
              <el-table-column fixed type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="生效时间" align="center" min-width="166">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="物流单号" align="center" min-width="166">
                <template #default="scope">QP2109140013</template>
              </el-table-column>
              <el-table-column prop="PostName" label="事业部" width="120" align="center">
                <template #default="scope">潍坊事业部</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="100" align="center">
                <template #default="scope">{{ scope.row.SalerName }}</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="签约单位" width="100" align="center">
                <template #default="scope">
                  <span>北方高中压</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="240" align="center">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="联系人" align="center">
                <template #default="scope">
                  <span>刘某某</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="联系电话" align="center" width="120">
                <template #default="scope">
                  <span>18888888888</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" align="center" width="120">
                <template #default="scope">3804000</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="已回款额" align="center" width="120">
                <template #default="scope">38000</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="应收金额" align="center" width="120">
                <template #default="scope">10138000</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="付款方式" align="center" width="120">
                <template #default="scope">到货款100%</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="供货期" align="center" width="160">
                <template #default="scope">2022-07-26</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同存档" align="center">
                <template #default="scope">
                  <!-- <span>查看</span> -->
                  <span>未存档</span>
                </template>
              </el-table-column>
              <el-table-column fixed="right" prop="RecruitChannel" label="操作" align="center" width="80">
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import '/@/assets/css/tech.css'

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
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
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
      data,
      form,
      Search,
      ...tableRender(form, data),
      shortcuts
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
