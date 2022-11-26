<template>
  <div class="Tec_ContractApproval">
    <!-- 合同审批 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">合同审批</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.SupplierInput" size="default" placeholder="供应商名称" style="width: 200px" class="mr-4" />
        <el-button type="primary" :icon="Search" @click="search">查询</el-button>
        <div class="float-right mt-px">
          <el-button type="info"> <i class="iconfont icon-zhongzhi mr-2"></i> 审批撤回</el-button>
          <el-button type="primary"><i class="iconfont icon-bianji1 mr-2"></i>编辑</el-button>
          <el-button type="danger"> <i class="iconfont icon-dingdan9 mr-2"></i>提报审批</el-button>
          <el-button type="success"> <i class="iconfont icon-yulan mr-2"></i> 预览</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="签约时间" width="166" align="center">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="供应商" min-width="166">
                <template #default="scope">
                  <div class="">
                    <div class="inline-block">
                      {{ scope.row.ClientName }}
                    </div>
                    <div class="inline-block text-xs text-gray-400">
                      <span>内蒙古久泰新材料有限公司 (2 - 2)</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="负责人" width="160" align="center">
                <template #default="scope">刘某某</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" width="160" align="center">
                <template #default="scope">
                  <div class="clearfix">
                    <span>380400000.00</span>
                    <sup class="text-red-500 text-xs ml-1">1.80</sup>
                    <!-- <sup class="text-green-500 text-xs ml-1">1.80</sup> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="紧急程度" width="100" align="center">
                <template #default="scope">
                  <!-- <span>一般</span> -->
                  <!-- <span>紧急</span> -->
                  <span>-</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="供货期" width="120" align="center">
                <template #default="scope">
                  <span>2022-07-09</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="采购状态" align="center" width="80">
                <template #default="scope">
                  <!-- <span class="text-green-400">-</span> -->
                  <span class="text-green-400">已生效</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="生效时间" align="center">
                <template #default="scope">
                  <!-- <span class="text-blue-400">待生效</span> -->
                  <span class="text-gray-400">2021-09-14 14:36</span>
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
      SupplierInput: ''
    })
    const data = reactive({})
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
