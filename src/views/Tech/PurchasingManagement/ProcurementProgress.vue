<template>
  <div class="Tec_ContractApproval">
    <!-- 采购进度 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">采购进度</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query inline-block pb-1">
        <el-input v-model="form.NameInput" size="default" placeholder="供应商名称" style="width: 200px" class="mr-4" />
        <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 240px" />
        <el-button type="primary" class="ml-2" :icon="Search" @click="search">查询</el-button>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="WorkAge" label="生效时间" align="center">
                <template #default="scope">
                  <span>2022-07-06</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="供应商" min-width="160" align="center">
                <template #default="scope">
                  <span>湖北祥云化工设备制造有限公司</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购进度" width="100" align="center">
                <template #default="scope">
                  <!-- <span class="text-red-500">运输中</span> -->
                  <span class="text-green-500">已核准</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="是否直发" width="100" align="center">
                <template #default="scope">
                  <span class="text-blue-500">是</span>
                  <!-- <span class="text-orange-400">否</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="物流信息" width="100" align="center">
                <template #default="scope">
                  <span class="text-blue-500">发货</span>
                  <!-- <span class="text-red-500">配置</span> -->
                  <!-- <span>-</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="到货时间" align="center">
                <template #default="scope">
                  <!-- <div class="w-5 h-5 rounded-md text-white text-xs text-center inline-block bg-red-400 leading-5 mr-2">预</div> -->
                  <div class="w-5 h-5 rounded-md text-white text-xs text-center inline-block bg-green-400 leading-5 mr-2">实</div>
                  <span>2022-07-06</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="状态" align="center">
                <template #default="scope">
                  <span>正常</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="操作" align="center" width="80">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
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
      TimeValue: '',
      NameInput: ''
    })
    const data = reactive({
      tableData: [],
      tableData1: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] //假数据到时候删掉
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
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
