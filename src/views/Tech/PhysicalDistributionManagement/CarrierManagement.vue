<template>
  <div class="Tec_ContractApproval">
    <!-- 承运商管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">承运商管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix">
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right">
          <el-button type="primary"> <i class="iconfont icon-chuangjian mr-2"></i> 增加</el-button>
          <el-button type="warning"> <i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
          <el-button type="danger"> <i class="iconfont icon-shanchu mr-2"></i> 删除</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="承运商编号" align="center" width="100">
                <template #default="scope">400002</template>
              </el-table-column>
              <el-table-column prop="Name" label="承运商名称">
                <template #default="scope">
                  <span>淄博亿通达物流有限公司</span>
                </template>
              </el-table-column>

              <el-table-column prop="WorkAge" label="运输方式" align="center" width="100">
                <template #default="scope">
                  <span>汽车运输</span>
                  <!-- <span>铁路运输</span> -->
                  <!-- <span>水路运输</span> -->
                  <!-- <span>航空运输</span> -->
                  <!-- <span>邮递运输</span> -->
                  <!-- <span>其他运输</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="承运区域" align="center" width="100">
                <template #default="scope">
                  <span>全国</span>
                  <!-- <span>华东地区</span> -->
                  <!-- <span>华南地区</span> -->
                  <!-- <span>西北地区</span> -->
                  <!-- <span>西南地区</span> -->
                  <!-- <span>华中地区</span> -->
                  <!-- <span>华北地区</span> -->
                  <!-- <span>东北地区</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="联系人" align="center" width="100">
                <template #default="scope">
                  <span>王经理</span>
                </template>
              </el-table-column>

              <el-table-column prop="WorkAge" label="电话/传真" align="center" width="140">
                <template #default="scope">
                  <span>15064686521</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="单位地址">
                <template #default="scope">
                  <span>潍坊市潍城区长松路288号院内</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="备注" align="center">
                <template #default="scope">
                  <span>战略型合作伙伴</span>
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
      NameInput: ''
    })
    const data = reactive({
      tableData: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    return {
      data,
      form,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
