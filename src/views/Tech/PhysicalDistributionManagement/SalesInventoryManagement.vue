<template>
  <div class="Tec_ContractApproval">
    <!-- 仓库管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">仓库管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-3 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix">
        <el-input v-model="form.NameInput" size="default" placeholder="仓库名称/编号" style="width: 200px" class="mr-4" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right">
          <el-button type="primary" @click="openWindowWarehouseInformation()"> <i class="iconfont icon-chuangjian mr-2"></i> 增加</el-button>
          <el-button type="warning" @click="openWindowWarehouseInformation(data.selectDetails[0])" :disabled="data.single"> <i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="仓库编号" align="center">
                <template #default="scope">ZGBF-0001</template>
              </el-table-column>
              <el-table-column prop="Name" label="仓库名称" align="center">
                <template #default="scope">
                  <span>总部1号仓库</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="是否禁用" align="center" width="100">
                <template #default="scope">
                  <el-switch v-model="data.disableValue" inline-prompt active-text="开" inactive-text="关" />
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="是否默认" align="center" width="100">
                <template #default="scope">
                  <el-switch v-model="data.defaultValue" inline-prompt active-text="开" inactive-text="关" />
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="地址" align="center">
                <template #default="scope">
                  <span>山东潍坊寒亭区</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="面积" align="center">
                <template #default="scope">
                  <span>600m²</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="联系人" align="center">
                <template #default="scope">
                  <span>洪江海</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="联系电话" align="center">
                <template #default="scope">
                  <span>15859565156</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="备注" align="center">
                <template #default="scope">
                  <span>-</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 仓库信息 -->
    <WarehouseInformation title="仓库信息" v-if="warehouseInformationOpenData.visible" :FormData="warehouseInformationOpenData.formData" @closeWindow="closeWindowWarehouseInformation($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'
import WarehouseInformation from './_Components/WarehouseInformation.vue'

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
    TableSearch,
    WarehouseInformation
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      NameInput: ''
    })
    const data = reactive({
      tableData: [],
      disableValue: false,
      defaultValue: false,
      single: true
    })
    // 增加  编辑 仓库信息
    const warehouseInformationOpen = (data: any) => {
      let warehouseInformationOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowWarehouseInformation = (row: any) => {
        warehouseInformationOpenData.formData = {
          selectDetails: row
        }
        warehouseInformationOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowWarehouseInformation = (type: string) => {
        warehouseInformationOpenData.visible = false
      }

      return {
        warehouseInformationOpenData,
        openWindowWarehouseInformation,
        closeWindowWarehouseInformation
      }
    }
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    return {
      data,
      form,
      ...tableRender(form, data),
      ...warehouseInformationOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
