<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 08:56:05
 * @LastEditTime: 2022-11-09 14:20:34
 * @LastEditors: ZHJ
 * @Description: 工资项配置
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\SalaryItemsIndex.vue
 * 版权声明
-->
<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <div class="bf-table-content SalaryItemsIndex bg-close-table-checkbox">
      <div class="wages-role-type">
        <ul class="clearfix" v-if="data.roleType&&data.roleType.length>0">
          <li v-for="(item,index) in data.roleType" :key="index"><a href="javascript:;" :class="{'curr':(item.Id||0).toString()==data.currRoleId}"
              @click="roleTypeClick(item.Id)">{{item.PostName}}</a></li>
        </ul>
      </div>
      <el-table :data="data.tableData" class="w-full" ref="multipleTableRef" @select="selectRow">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="CreateOn" label="创建时间" align="center">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.CreateOn) }}
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="考核项目" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.Name }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Code" label="编号" align="center" />
        <el-table-column prop="TotalAmount" label="金额(元)" align="center" />
        <el-table-column prop="" label="考核规则" align="center">
          <template #default="{ row }">
            <div v-for="(item,index) in data.cycleType" :key="index">
              <div v-if="item.DicKey==row.CycleType">{{item.DicValue}}</div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="月度上限(元)" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.MaxAmount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="启用时间" align="center">
          <template #default="scope">
            <div class="truncate"> {{ parseTimeEvent(scope.row.StartTime) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="明细构成" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openSalaryItemsAssessFormWindow(scope.row, 3)">预览</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openSalaryItemsFormWindow(scope.row, 3)">预览</el-button>
              <el-button text key="danger" type="danger" @click="deleteEvent(scope.row.Id, 3)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <SalaryItemsForm v-if="data.SalaryItemsFormWindow.show" @closeWindow="closeWindow" :details="data.SalaryItemsFormWindow.details"> </SalaryItemsForm>
  <SalaryItemsAssessForm v-if="data.SalaryItemsAssessFormWindow.show" @closeWindow="closeWindow" :details="data.SalaryItemsAssessFormWindow.details"> </SalaryItemsAssessForm>
</template>

<script lang="ts">
import SalaryItemsForm from './SalaryItemsForm.vue'
import SalaryItemsAssessForm from './SalaryItemsAssessForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
// import TravelForm from './TravelForm.vue'
import { GetApprovalWorkCourseMaterialSave, GetDelWorkCourseMaterialSave, GetWorkCourseMaterialPage } from '/@/api/hr/CourseDevelop'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import { GetWagesItemLibraryPage, GetDelWagesItemLibrary } from '../../../../../api/hr/Salary'
import { getPostSelect } from '../../../../../api/system/post'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWagesItemLibraryPage(form).then((res: any) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.count
      data.details = []
      data.SalaryItemsFormWindow.details = {
        RoleId: form.RoleId,
        ParentId: 0
      }
    }
  })
}
// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
  if (form.RoleId) {
    renderTableList(form, data)
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  const roleTypeClick = (id: number) => {
    data.currRoleId = id
    form.RoleId = id
    search()
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.details = [row]
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    selectRow,
    search,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    roleTypeClick
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 工资设定 弹窗
  const openSalaryItemsFormWindow = async (val: any, viewType: string) => {
    data.SalaryItemsFormWindow.details = val
    data.SalaryItemsFormWindow.show = true
  }
  // 工资设定 弹窗
  const openSalaryItemsAssessFormWindow = async (val: any, viewType: string) => {
    data.SalaryItemsAssessFormWindow.details = val
    data.SalaryItemsAssessFormWindow.show = true
  }
  // 删除事件
  const deleteEvent = (val: any) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetDelWagesItemLibrary(val).then((res: any) => {
        if (res.code == 1) {
          form.page = 1
          tableRender(form, data, multipleTableRef)
          ElMessage({ type: 'success', message: '删除成功' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
      })
    })
  }
  // 通过事件
  const adoptEvent = (val: any) => {
    ElMessageBox.confirm('是否通过此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetApprovalWorkCourseMaterialSave(val).then((res) => {
        if (res.code == 1) {
          form.page = 1
          tableRender(form, data, multipleTableRef)
          ElMessage({ type: 'success', message: '审批成功' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
      })
    })
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.SalaryItemsFormWindow.show = false
    data.SalaryItemsAssessFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openSalaryItemsFormWindow,
    openSalaryItemsAssessFormWindow,
    closeWindow,
    deleteEvent,
    adoptEvent
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    SalaryItemsForm,
    SalaryItemsAssessForm
  },
  props: {},
  setup() {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form: any = reactive({
      page: 1,
      size: 10,
      total: 1,
      RoleId: null
    })
    const data = reactive({
      details: {},
      cycleType: [],
      roleType: [],
      currRoleId: null,
      // 上传素材弹窗数据
      SalaryItemsFormWindow: {
        show: false,
        Id: 0,
        details: {}
      },
      // 上传素材弹窗数据
      SalaryItemsAssessFormWindow: {
        show: false,
        Id: 0,
        details: {}
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 获取岗位类别
      store.getDict('hr_cycle_type').then((res: any) => {
        data.cycleType = res
      })
      getPostSelect(1).then((item: any) => {
        data.currRoleId = item.data[0].Id
        form.RoleId = item.data[0].Id
        data.roleType = item.data
        renderTableList(form, data)
      })
    })
    return { form, data, ...tableRender(form, data, multipleTableRef), ...window(form, data, multipleTableRef), multipleTableRef }
  }
})
</script>

<style lang="postcss" scoped>
.SalaryItemsIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
  .wages-role-type {
    margin-bottom: 10px;
    clear: both;
    background-color: #fef5e9;
    ul {
      li {
        float: left;
        padding: 0 5px;
        a {
          display: block;
          padding: 5px 8px;
          font-size: 14px;
          color: #333;
          border-bottom: 3px solid #fef5e9;
          &.curr,
          &:hover {
            color: #5586fe;
            border-bottom-color: #5586fe;
          }
        }
      }
    }
  }
}
</style>
