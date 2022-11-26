<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content travelIndex bg-close-table-checkbox">
      <el-table :data="data.tableData" class="w-full" @select="selectRow" ref="multipleTableRef">
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" label="序号" width="70" align="center" />
        <el-table-column prop="CreateOn" label="上传日期" align="center">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.CreateOn) }}
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="课程名称" align="center">
          <template #default="scope">
            <el-tooltip class="box-item" effect="dark" :content="scope.row.Name" placement="top">
              <div class="truncate">{{ scope.row.Name }}</div>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="课程类型" align="center">
          <template #default="scope">
            <div v-for="(item, index) in data.CoursewareClass">
              <template v-if="item.DicKey == scope.row.Class"> {{ item.DicValue }}</template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="课程等级" align="center">
          <template #default="scope">
            <div v-for="(item, index) in data.CoursewareLevel">
              <template v-if="item.DicKey == scope.row.Level"> {{ item.DicValue }}</template>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="RealName" label="开发者" align="center" />
        <el-table-column prop="MinMinutes" label="学习时长" align="center">
          <template #default="scope">
            <div class="truncate">{{ scope.row.MinMinutes }}分钟</div>
          </template>
        </el-table-column>
        <el-table-column prop="CustomerName" label="审批状态" align="center">
          <template #default="scope">
            <template v-for="(item, index) in data.ApprovalList">
              <div class="bf-button-bl" v-if="item.DicKey == scope.row.State">
                <el-button text :key="index" :type="item.Remark">{{ item.DicValue }}</el-button>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openTravelWindow(scope.row.Id, 3)">预览</el-button>
              <!-- <el-button text key="danger" type="danger" @click="deleteEvent( scope.row.Id)">删除</el-button> -->
              <!-- <el-button text key="primary" type="primary" @click="adoptEvent( scope.row.Id)">通过</el-button> -->
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details"> </WFManagementForm>
</template>

<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
// import TravelForm from './TravelForm.vue'
import { GetApprovalWorkCourseMaterialSave, GetDelWorkCourseMaterialSave, GetWorkCourseMaterialPage } from '/@/api/hr/CourseDevelop'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWorkCourseMaterialPage(form).then((res) => {
    if (res.code == 1) {
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
  // 上传素材 弹窗
  const openTravelWindow = async (Id: number, viewType: string) => {
    if (JSON.stringify(data.details) != '{}') {
      await GetApplyFlowStepEvent({ DataId: data.details.Id, Code: 'TrainCourseWare' }).then((res: any) => {
        data.WFManagementFormWindow.details = res.data
        data.WFManagementFormWindow.details.viewType = 2
      })
    } else {
      await GetApplyFlowStepEvent({ DataId: Id, Code: 'TrainCourseWare' }).then((res: any) => {
        data.WFManagementFormWindow.details = res.data
        data.WFManagementFormWindow.details.viewType = viewType
      })
    }
    data.WFManagementFormWindow.show = true
  }
  // 删除事件
  const deleteEvent = (val: number) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetDelWorkCourseMaterialSave(val).then((res) => {
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
    data.WFManagementFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openTravelWindow,
    closeWindow,
    deleteEvent,
    adoptEvent
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    WFManagementForm
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
      details: {},
      ApprovalList: [], //审批状态
      // 上传素材弹窗数据
      WFManagementFormWindow: {
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
