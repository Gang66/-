<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">
              <div>合同设置</div>
            </div>
            <el-row :gutter="10" justify="end">
              <!-- <el-col :md="24" :lg="12">
                <el-button type="primary" @click="setContractSetFormWindow">合同设置</el-button>
              </el-col> -->
              <el-col :md="24" :lg="24">
                <el-button type="primary" @click="addWindow">新增合同</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="ContractInfo.ContractUnitName" label="合同单位" width="200" align="center" />
            <el-table-column prop="ContractInfo.LegalRep" label="法人代表" width="100" align="center" />
            <el-table-column prop="ContractInfo.RegAdd" label="注册地址" width="200" align="center" />
            <el-table-column prop="ContractInfo.LaborUnitName" label="劳务单位名称" width="240" align="center" />
            <el-table-column prop="ContractInfo.LaborLegalPerson" label="劳务法人" align="center" />
            <el-table-column prop="ContractInfo.LaborLegalPerson" label="绑定数量" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="opencomSetDisDialog(scope.row.ContractInfo)">{{ scope.row.DepartCount }}</el-button>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" align="center">
              <template #default="scope">
                <div class="bf-button-bl">
                  <el-button text key="primary" type="primary" @click="openWindow(true, scope.row.ContractInfo.Id)">编辑</el-button>
                  <el-button text key="primary" type="primary" @click="openMessage(scope.row.ContractInfo.Id)" class="bf-error-color">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <ContractSettingForm title="合同设置" v-if="data.contractSetFormWindow.show" :setUp="data.contractSetFormWindow.setUp" :isEdit="data.contractSetFormWindow.isEdit"
      :Id="data.contractSetFormWindow.Id" @closeWindow="closeWindow"></ContractSettingForm>
    <ContractSettingDicForm title="绑定数量" v-if="data.ContractSettingDicFormWindow.show" :Id="data.ContractSettingDicFormWindow.Id" @closeWindow="closeWindow">
    </ContractSettingDicForm>
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import {
  GetContractManagementPage,
  PostDeleteEditContractManagement
} from '/@/api/system/contractSetting'
import ContractSettingForm from './_Components/ContractSettingForm.vue'
import ContractSettingDicForm from './_Components/ContractSettingDistributionForm.vue'

import { useCommonStore } from '/@/store/modules/Common'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetContractManagementPage(form).then((res) => {
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
    data.contractSetFormWindow.Id = null
    data.contractSetFormWindow.isEdit = false
    data.contractSetFormWindow.setUp = false
    data.contractSetFormWindow.show = true
  }
  // 合同添加 修改弹窗
  const openWindow = (isEdit: boolean, Id: number) => {
    data.contractSetFormWindow.Id = Id
    data.contractSetFormWindow.setUp = false
    data.contractSetFormWindow.show = true
  }
  // 合同设置
  const setContractSetFormWindow = (isEdit = true) => {
    data.contractSetFormWindow.isEdit = true
    data.contractSetFormWindow.Id = null
    data.contractSetFormWindow.setUp = true
    data.contractSetFormWindow.show = true
  }
  // 绑定数量
  const opencomSetDisDialog = (val: any) => {
    data.ContractSettingDicFormWindow.Id = val.Id
    data.ContractSettingDicFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.contractSetFormWindow.show = false
    data.ContractSettingDicFormWindow.show = false
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
    openMessage,
    opencomSetDisDialog,
    setContractSetFormWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    ContractSettingForm,
    ContractSettingDicForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      // 新增合同弹窗数据
      contractSetFormWindow: {
        show: false,
        setUp: false //是否是合同设置 true 是 false否
      },
      // 合同绑定数量弹窗数据
      ContractSettingDicFormWindow: {
        show: false
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
