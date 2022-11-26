<template>
  <div class="Tec_ContractApproval">
    <!-- 物流中转 -->
    <div class="bg-white pl-4 pr-4 pt-1 relative">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-2">
        <el-input v-model="form.NameInput" size="default" placeholder="供应商" style="width: 200px" class="mr-4" />
        <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
        <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <el-button class=""> <i class="iconfont icon-daochu mr-2"></i><span>导出数据</span></el-button>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="申请时间" width="166" align="center">
                <template #default="scope">2022-08-10 10:11</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="申请金额" align="center">
                <template #default="scope">
                  <span>9000000</span>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="类别" align="center">
                <template #default="scope">
                  <span>物流中转站</span>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="联系人" align="center">
                <template #default="scope">
                  <span>洪三虎</span>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="审批状态" align="center">
                <template #default="scope">
                  <span class="text-blue-500">总经理审批</span>
                  <!-- <span class="text-red-500">审批驳回</span> -->
                  <!-- <span class="text-green-500">审批通过</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="操作" align="center">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                  </div>
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

    onMounted(() => {})
    return {
      data,
      form,
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
