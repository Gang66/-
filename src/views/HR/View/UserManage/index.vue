<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">创新举措</div>
            <el-row :gutter="10" justify="end">
              <el-col :md="24" :lg="7">
                <el-form-item label="建议类型">
                  <el-select v-model="form.TypeId" placeholder="字典状态" clearable>
                    <el-option v-for="item in data.Suggestion" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey">{{ item.DicValue }}</el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="7">
                <el-form-item label="当前状态">
                  <el-input v-model="form.Type" placeholder="当前状态" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="6">
                <el-form-item label="创建时间">
                  <el-date-picker v-model="form.CreateOn" type="date" placeholder="创建时间" />
                </el-form-item>
              </el-col>
              <el-col :md="24" :lg="4">
                <el-button type="primary" @click="search()">搜索</el-button>
                <el-button type="primary" @click="openWindow(false)">新增</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="CreateOn" label="创建时间" />
            <el-table-column prop="TypeId" label="建议类型">
              <template #default="scope">
                {{ getStatus(scope.row.TypeId) }}
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="建议人" />
            <el-table-column prop="Suggestion" label="建议内容" width="200">
              <template #default="scope">
                <div class="truncate">{{ scope.row.Suggestion[scope.row.TypeId][0].Remark }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="State" label="处理状态" />
            <el-table-column prop="CreateName" label="处理人" />
            <el-table-column prop="Suggestion" label="处理内容" width="200">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openWindow(true, scope.row.Id)">{{ scope.row.Suggestion[scope.row.TypeId][0].Remark }}</el-button>
                <!-- <div class="truncate">{{ scope.row.Suggestion[scope.row.TypeId][0].Remark }}</div> -->
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openWindow(true, scope.row.Id)">详情</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 创新举措表单 -->
    <!--<InnovateForm title="创新举措" v-if="data.indexWindow.show" :isEdit="data.indexWindow.isEdit" @closeWindow="closeWindow" :Id="data.indexWindow.Id"></InnovateForm> -->
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
//import InnovateForm from './_Components/Form.vue'
import { getInnovateList } from '/@/api/hr/Innovate'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await getInnovateList(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        element.Suggestion = eval('(' + element.Suggestion + ')')
      })
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
  // 字典类型添加 修改弹窗
  const openWindow = (isEdit: boolean, Id: number) => {
    data.indexWindow.Id = Id
    data.indexWindow.isEdit = isEdit
    data.indexWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.indexWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openWindow,
    closeWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    InnovateForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      // 弹窗数据
      indexWindow: {
        show: false
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 根据Id获取详情
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
    })
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="scss" scoped></style>
