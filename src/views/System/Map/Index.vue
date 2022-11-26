<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">
              <div>位置设置</div>
            </div>
            <el-row :gutter="10" justify="end">
              <el-col :md="24" :lg="24">
                <el-button type="primary" @click="addWindow">新增位置</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="RegionSetting.Address" label="考勤地址" width="500" />
            <el-table-column prop="RegionSetting.longitude" label="经度" align="center" />
            <el-table-column prop="RegionSetting.latitude" label="纬度" align="center" />
            <el-table-column prop="RegionSetting.Address" label="绑定部门">
              <template #default="scope"> {{ scope.row.DepartList ? scope.row.DepartList.Name : "" }} </template>
            </el-table-column>
            <el-table-column prop="RegionSetting.Range" label="围栏范围" width="100" align="center" />
            <el-table-column label="操作" width="100" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openWindow(true, scope.row.RegionSetting.Id)">编辑</el-button>
                <!-- <el-button text key="primary" type="primary" @click="openMessage(scope.row.Id)" class="bf-error-color">删除</el-button> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 位置设置 -->
    <MapContainer title="位置设置" v-if="data.MapContainerWindow.view" @closeWindow="closeWindow" :Id="data.MapContainerWindow.Id"></MapContainer>
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { PostDeleteEditContractManagement } from '/@/api/system/contractSetting'
import { GetPositionSettingPage } from '/@/api/system/map'
import { useCommonStore } from '/@/store/modules/Common'
import { ElMessage, ElMessageBox } from 'element-plus'
import MapContainer from '/@/views/System/Map/MapContainer.vue'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPositionSettingPage(form).then((res) => {
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
  const handleSizeChange = (v: number) =>
    (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) =>
    (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod
  }
}
const window = (form: any, data: any): any => {
  // 新增弹窗
  const addWindow = () => {
    data.MapContainerWindow.Id = null
    data.MapContainerWindow.view = true
  }
  // 字典类型添加 修改弹窗
  const openWindow = (isEdit: boolean, Id: number) => {
    data.MapContainerWindow.Id = Id
    data.MapContainerWindow.view = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.MapContainerWindow.view = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  // 删除事件
  const openMessage = (val: number) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      PostDeleteEditContractManagement(val).then((res) => {
        if (res.code == 1) {
          form.page = 1
          tableRender(form, data)
          ElMessage({ type: 'success', message: '删除成功' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
      })
    })
  }
  return {
    addWindow,
    openWindow,
    closeWindow,
    openMessage
  }
}
export default defineComponent({
  components: {
    TableSearch,
    MapContainer
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      // 位置信息
      MapContainerWindow: {
        view: false,
        Id: undefined
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 根据Id获取详情
      store.getDict('hr_enb_status').then((res: any) => {
        data.Suggestion = res
      })
    })
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="scss" scoped></style>
