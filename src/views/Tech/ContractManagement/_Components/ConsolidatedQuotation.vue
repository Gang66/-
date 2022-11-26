<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-3">
      <div class="text-sm"><i class="iconfont icon-biaoqian mr-2 text-blue-500 align-text-bottom"></i><span>主体报价单</span></div>
      <div class="bf-table-content mb-3">
        <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="CreateOn" label="客户名称">
            <template #default="scope">{{ scope.row.ClientName }}</template>
          </el-table-column>
          <el-table-column prop="DepartName" label="报价金额" width="140" align="center">
            <template #default="scope">2000000</template>
          </el-table-column>
          <el-table-column prop="Name" label="单号" align="center" width="180">
            <template #default="scope">
              <div class="inline-block">QP2109140021</div>
            </template>
          </el-table-column>

          <el-table-column prop="InviteName" label="等级" width="80" align="center">
            <template #default="scope">
              <!-- A -->
              <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
              <!-- B -->
              <el-tag class="" v-else-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
              <!-- C -->
              <el-tag class="" v-else-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="创建时间" width="140" align="center">
            <template #default="scope">2022-09-15</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="text-sm"><i class="iconfont icon-biaoqian mr-2 text-blue-500 align-text-bottom"></i><span>合并报价单</span></div>
      <div class="bf-table-content mb-3">
        <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="CreateOn" label="客户名称">
            <template #default="scope">{{ scope.row.ClientName }}</template>
          </el-table-column>
          <el-table-column prop="DepartName" label="报价金额" width="140" align="center">
            <template #default="scope">2000000</template>
          </el-table-column>
          <el-table-column prop="Name" label="单号" align="center" width="180">
            <template #default="scope">
              <div class="inline-block">QP2109140021</div>
            </template>
          </el-table-column>

          <el-table-column prop="InviteName" label="等级" width="80" align="center">
            <template #default="scope">
              <!-- A -->
              <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
              <!-- B -->
              <el-tag class="" v-else-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
              <!-- C -->
              <el-tag class="" v-else-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="创建时间" width="140" align="center">
            <template #default="scope">2022-09-15</template>
          </el-table-column>
        </el-table>
      </div>
      <div class="bf-search-formItem mb-2 mr-2 float-right">
        <div class="text-center w-full">
          <el-button @click="closeWindow('close')">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'

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
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({})
    const form = reactive({
      page: 1,
      size: 10
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })

    return {
      boxStyle,
      closeWindow,
      data,
      form,
      ...tableRender(form, data)
    }
  }
})
</script>
<style lang="postcss" scoped></style>
