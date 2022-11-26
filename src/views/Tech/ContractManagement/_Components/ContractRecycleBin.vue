<template>
  <!-- 搜索框 -->
  <div class="ConsultationList-dow-query inline-block pb-1">
    <el-date-picker v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
    <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4 ml-3" />
    <el-button type="primary" class="ml-2" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
    <div class="inline-block absolute top-5 right-4">
      <el-button type="success" @click="recovery()"><i class="iconfont icon-huifu mr-2"></i>恢复</el-button>
    </div>
  </div>
  <!-- #region  表格-->
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="50" align="center" />
        <el-table-column type="index" label="序号" width="54" align="center" />
        <el-table-column prop="CreateOn" label="提交时间" width="166" align="center">
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
        <el-table-column prop="WorkAge" label="供货周期" width="100" align="center">
          <template #default="scope">
            <span>15</span>
          </template>
        </el-table-column>
        <el-table-column prop="WorkAge" label="审批状态" width="140" align="center">
          <template #default="scope">
            <span>合同作废</span>
          </template>
        </el-table-column>

        <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
          <template #default="scope">
            <!-- <div>
              <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
              <div class="text-blue-600 inline-block cursor-pointer">预览</div>
            </div> -->
            <span class="text-gray-400">无</span>
          </template>
        </el-table-column>
        <el-table-column prop="RecruitChannel" label="操作" align="center" width="80">
          <template #default="scope">
            <div>
              <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
              <div class="text-blue-600 inline-block cursor-pointer">预览</div>
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
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

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
      CompId: null,
      NameInput: '',
      TimeValue: ''
    })
    const data = reactive({
      // 表格数据
      tableData: [],
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
    // 恢复
    const recovery = () => {
      ElMessageBox.confirm('确定恢复此合同？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    return {
      form,
      data,
      ...tableRender(form, data),
      recovery
    }
  }
})
</script>

<style lang="postcss" scoped></style>
