<template>
  <div class="Tec_ContractApproval">
    <!-- 库位管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">库位管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix">
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right">
          <el-button type="primary" @click="openWindowWarehouseLocationManagement()"> <i class="iconfont icon-chuangjian mr-2"></i> 增加</el-button>
          <el-button type="warning" @click="openWindowWarehouseLocationManagement(data.selectDetails[0])" :disabled="data.single"> <i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
          <el-button type="danger" @click="deleteWarehouseInformation(data.selectDetails[0])" :disabled="data.single"> <i class="iconfont icon-shanchu mr-2"></i> 删除</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="库位编号" align="center">
                <template #default="scope">H-01-01</template>
              </el-table-column>
              <el-table-column prop="Name" label="库位名称" align="center">
                <template #default="scope">
                  <span>止回阀待检库位</span>
                </template>
              </el-table-column>

              <el-table-column prop="WorkAge" label="库位类型" align="center">
                <template #default="scope">
                  <span>正式库区</span>
                  <!-- <span>待入库区</span> -->
                  <!-- <span>待检库区</span> -->
                  <!-- <span>待出库区</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="仓库" align="center">
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
              <el-table-column prop="WorkAge" label="创建时间" align="center">
                <template #default="scope">
                  <span>2022-08-19 10:52</span>
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
    <!-- 库位管理 -->
    <WarehouseLocationManagement title="库位管理" v-if="warehouseLocationManagementOpenData.visible" :FormData="warehouseLocationManagementOpenData.formData" @closeWindow="closeWindowWarehouseLocationManagement($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import '/@/assets/css/tech.css'
import WarehouseLocationManagement from './_Components/WarehouseLocationManagement.vue'

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
    WarehouseLocationManagement
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
      single: true,
      selectDetails: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    // 增加  编辑
    const WarehouseLocationManagementOpen = (data: any) => {
      let warehouseLocationManagementOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowWarehouseLocationManagement = (row: any) => {
        warehouseLocationManagementOpenData.formData = {
          selectDetails: row
        }
        warehouseLocationManagementOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowWarehouseLocationManagement = (type: string) => {
        warehouseLocationManagementOpenData.visible = false
      }

      return {
        warehouseLocationManagementOpenData,
        openWindowWarehouseLocationManagement,
        closeWindowWarehouseLocationManagement
      }
    }
    const deleteWarehouseInformation = (val: any) => {
      console.log('走删除接口', data.selectDetails)
      ElMessageBox.confirm('该操作将删除该仓库数据，确定要删除吗？', '确认提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage.success('确认删除')
        })
        .catch(() => {
          ElMessage.info('取消删除')
        })
    }
    return {
      data,
      form,
      ...tableRender(form, data),
      ...WarehouseLocationManagementOpen({ data }),
      deleteWarehouseInformation
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
