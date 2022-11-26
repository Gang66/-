<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 08:56:05
 * @LastEditTime: 2022-11-09 08:18:34
 * @LastEditors: ZHJ
 * @Description: 工资项配置
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\PostSalarySettingIndex.vue
 * 版权声明
-->
<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex bg-close-table-checkbox">
      <el-table :data="data.tableData" class="w-full" @select="selectRow" ref="multipleTableRef">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="CreateOn" label="创建时间" align="center">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.CreateOn) }}
          </template>
        </el-table-column>
        <el-table-column prop="RoleName" label="岗位名称" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.RoleName }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="等级" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.GradeCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="部门人员" align="center">
          <template #default="scope">
            <div v-for="(item, index) in data.CoursewareLevel">
              <template v-if="item.DicKey == scope.row.Level"> {{ item.DicValue }}</template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="固定工资(元)" align="center">
          <template #default="scope">
            <div class="truncate">{{amountFilters(scope.row.FixedAmount) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="考核工资(元)" align="center">
          <template #default="scope">
            <div class="truncate">{{ amountFilters(scope.row.AssessmentAmount) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="业绩工资(元)" align="center">
          <template #default="scope">
            <div class="truncate">{{amountFilters(scope.row.AchievementAmount) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="总工资" align="center">
          <template #default="scope">
            <div class="truncate">{{amountFilters(scope.row.TotalAmount) }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openPostSalaryEditFormWindowWindow(scope.row, 3)">修改</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <PostSalarySettingForm v-if="data.PostSalarySettingFormWindow.show" @closeWindow="closeWindow" :details="data.PostSalarySettingFormWindow.details"> </PostSalarySettingForm>
  <PostSalaryEditForm v-if="data.PostSalaryEditFormWindowWindow.show" @closeWindow="closeWindow" :Id="data.PostSalaryEditFormWindowWindow.Id">
  </PostSalaryEditForm>
</template>

<script lang="ts">
import PostSalarySettingForm from './PostSalarySettingForm.vue'
import PostSalaryEditForm from './PostSalaryEditForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
// import TravelForm from './TravelForm.vue'
import { GetWagesDistributionPage, GetDelWagesDistribution } from '../../../../../api/hr/Salary'
import { GetApprovalWorkCourseMaterialSave, GetDelWorkCourseMaterialSave, GetWorkCourseMaterialPage } from '/@/api/hr/CourseDevelop'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWagesDistributionPage(form).then((res: any) => {
    if (res.code == 1) {
      data.details = []
      data.isShow = false
      data.tableData = res.data.records
      form.totals = res.data.count
    }
  })
}
// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
  renderTableList(form, data)
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.details = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
    if (selection.length > 0) {
      data.isShow = true
    } else {
      data.isShow = false
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
    search,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    selectRow
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 工资设定 弹窗
  const openPostSalarySettingFormWindow = async (item: any, viewType: any) => {
    if (viewType == 2) {
      if (data.isShow) {
        data.PostSalarySettingFormWindow.details = data.details
        data.PostSalarySettingFormWindow.show = true
      } else {
        ElMessage({ type: 'info', message: '请选择一条数据' })
        return
      }
    } else {
      data.PostSalarySettingFormWindow.show = true
    }
  }
  const openPostSalaryEditFormWindowWindow = (item: any) => {
    data.PostSalaryEditFormWindowWindow.Id = item.Id
    data.PostSalaryEditFormWindowWindow.show = true
  }
  // 删除事件
  const deleteEvent = (val: number) => {
    if (data.isShow == false) {
      ElMessage({ type: 'info', message: '请选择一条数据' })
      return
    }
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetDelWagesDistribution(data.details.Id).then((res: any) => {
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
      GetApprovalWorkCourseMaterialSave(data.details.Id).then((res) => {
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
  const amountFilters = (num: any) => {
    if (num) {
      //只保留整数
      return parseInt(num)
    } else return '-'
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.PostSalarySettingFormWindow.show = false
    data.PostSalaryEditFormWindowWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openPostSalarySettingFormWindow,
    openPostSalaryEditFormWindowWindow,
    closeWindow,
    deleteEvent,
    adoptEvent,
    amountFilters
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    PostSalarySettingForm,
    PostSalaryEditForm
  },
  props: {},
  setup() {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      wagesTypeList: [],
      details: {},
      isShow: false,
      ApprovalList: [], //审批状态
      // 上传素材弹窗数据
      PostSalarySettingFormWindow: {
        show: false,
        Id: 0
      },
      // 修改工资项配置
      PostSalaryEditFormWindowWindow: {
        show: false,
        Id: 0
      },
      CoursewareLevel: [], //课件等级
      CoursewareClass: [], //课件分类
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 获取课件等级
      store.getDict('CoursewareLevel').then((res: any) => {
        data.CoursewareLevel = res
      })
      // 审批状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalList = res
      })
      // 获取课件分类
      store.getDict('CoursewareClass').then((res: any) => {
        data.CoursewareClass = res
      })
    })
    return { form, data, ...tableRender(form, data, multipleTableRef), ...window(form, data, multipleTableRef), multipleTableRef }
  }
})
</script>

<style lang="postcss" scoped>
.travelIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
