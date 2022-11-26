<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <!-- #region  表格-->
    <div class="p-4 pt-0">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content">
          <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="CreateOn" label="签约时间" width="120" align="center">
              <template #default="scope">
                <!-- {{scope.row.ConsultTime}} -->
                2022-07-24
              </template>
            </el-table-column>
            <el-table-column prop="CompName" label="事业部" width="100" align="center">
              <template #default="scope">{{ scope.row.CompName }}</template>
            </el-table-column>
            <el-table-column prop="DepartName" label="供货方" align="center">
              <template #default="scope">
                <!-- {{ scope.row.SalerName }} -->
                北京高中压阀门科技集团有限公司
              </template>
            </el-table-column>
            <el-table-column prop="CreateOn" label="业务员" width="100" align="center">
              <template #default="scope">
                <span>王某某</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="合同状态" align="center" width="80">
              <template #default="scope">
                <span>-</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="合同金额" align="center" width="120">
              <template #default="scope">
                <span>2000000</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="操作" align="center" width="100">
              <template #default="scope">
                <span class="text-blue-500 text-sm cursor-pointer">预览</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- #endregion -->
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { parseTime } from '/@/utils/tools'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  if (form.date && form.date.length > 1) {
    form.StartDate = form.date[0]
    form.EndDate = form.date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }
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
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    TableSearch
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0
    })
    const data = reactive({
      // 表格数据
      tableData: []
    })

    return {
      closeWindow,
      boxStyle,
      ...tableRender(form, data),
      form,
      data
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
