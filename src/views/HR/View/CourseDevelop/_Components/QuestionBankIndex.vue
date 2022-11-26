<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <div class="bf-table-content QuestionBankIndex">
      <el-table :data="data.tableData" class="w-full">
        <!-- <el-table-column type="index" label="序号" width="55" align="center" /> -->
        <el-table-column prop="CreateOn" label="上传日期" align="center" width="104">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.CreateOn) }}
          </template>
        </el-table-column>
        <el-table-column prop="Name" label="课程名称" align="center" width="160">
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
        <el-table-column prop="RealName" label="开发者" align="center" />
        <el-table-column prop="RealName" label="题库" align="center" width="60">
          <template #default="scope">
            <span class="cursor-pointer" @click="handleOpenDialogViewTest(scope.row.TestList)">{{ testTotalFilters(scope.row.TestList) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="RealName" label="单选" align="center">
          <el-table-column prop="RealName" label="简单" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 1, 1)">{{ testScreenTotalFilters(scope.row.TestList, 1, 1) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="RealName" label="适当" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 1, 2)">{{ testScreenTotalFilters(scope.row.TestList, 1, 2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="RealName" label="较难" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 1, 3)">{{ testScreenTotalFilters(scope.row.TestList, 1, 3) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="RealName" label="多选" align="center">
          <el-table-column prop="RealName" label="简单" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 2, 1)">{{ testScreenTotalFilters(scope.row.TestList, 2, 1) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="RealName" label="适当" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 2, 2)">{{ testScreenTotalFilters(scope.row.TestList, 2, 2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="RealName" label="较难" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 2, 3)">{{ testScreenTotalFilters(scope.row.TestList, 2, 3) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="RealName" label="判断" align="center">
          <el-table-column prop="RealName" label="简单" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 3, 1)">{{ testScreenTotalFilters(scope.row.TestList, 3, 1) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="RealName" label="适当" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 3, 2)">{{ testScreenTotalFilters(scope.row.TestList, 3, 2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="RealName" label="较难" align="center" width="52">
            <template #default="scope">
              <span class="cursor-pointer" @click="testScreenOpen(scope.row.TestList, 3, 3)">{{ testScreenTotalFilters(scope.row.TestList, 3, 3) }}</span>
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column prop="" label="审批" align="center" width="60">
          <!-- @click="openTravelWindow( scope.row.Id,3)" -->
          <template #default="scope">
            <template v-for="(item, index) in data.ApprovalList">
              <div class="bf-button-bl" v-if="item.DicKey == scope.row.State">
                <el-button text :key="index" :type="item.Remark">{{ item.DicValue }}</el-button>
              </div>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作" align="center" width="90">
          <template #default="scope">
            <div class="bf-button-bl">
              <el-button text key="primary" type="primary" @click="openTravelWindow(scope.row.Id, 1)">导入</el-button>
              <el-button text key="success" type="success" @click="exportOpenTravelWindow(scope.row.Id)">导出</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </table-search>
  <WFManagementForm v-if="data.WFManagementFormWindow.show" @closeWindow="closeWindow" :details="data.WFManagementFormWindow.details"> </WFManagementForm>
  <!-- 试题预览 -->
  <QuestionView v-if="data.QuestionViewWindow.show" @closeWindow="closeWindow" :Id="data.QuestionViewWindow.Id" :testList="data.testList"></QuestionView>
</template>

<script lang="ts">
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import QuestionView from './QuestionView.vue'
// import TravelForm from './TravelForm.vue'
import { GetCoursewareTestLibraryExport, GetDelWorkCourseMaterialSave, GetWorkCourseQuestionBankPage } from '/@/api/hr/CourseDevelop'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWorkCourseQuestionBankPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
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
    parseTimeEvent
  }
}
const windowData = (form: any, data: any): any => {
  // 导入试题 弹窗
  const openTravelWindow = async (Id: number, Type: string) => {
    await GetApplyFlowStepEvent({
      DataId: Id,
      Code: 'TrainTestImportFile'
    }).then((res: any) => {
      console.log(res)
      data.WFManagementFormWindow.details = res.data
      data.WFManagementFormWindow.details.viewType = Type
      // data.EndProductFormWindow.isdisabled = isdisabled
      // data.EndProductFormWindow.show = true
    })

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
          tableRender(form, data)
          ElMessage({ type: 'success', message: '删除成功' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
      })
    })
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.WFManagementFormWindow.show = false
    data.QuestionViewWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  //题库数量
  const testTotalFilters = (arr: any) => {
    return (arr || []).length
  }
  //题库筛选统计 [列表,题型,难度]
  const testScreenTotalFilters = (arr: any, questionType: any, difficult: any) => {
    return (arr || []).filter((x: any) => {
      return x.QuestionType == questionType && x.Difficult == difficult
    }).length
  }
  //打开筛选后的试题 [试题列表,题型,难度]
  const testScreenOpen = (arr: any, questionType: any, difficult: any) => {
    var _list = (arr || []).filter((x: any) => {
      return x.QuestionType == questionType && x.Difficult == difficult
    })
    handleOpenDialogViewTest(_list)
  }
  const exportOpenTravelWindow = (Id: number) => {
    ElMessageBox.confirm('确定导出试题吗？', '导出试题', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        window.open(remoteUrl('api/TrainWork/GetCoursewareTestLibraryExport/' + Id))
      })
      .catch(() => {})
  }
  //打开查看试题窗口
  const handleOpenDialogViewTest = (arr: any) => {
    if (arr && arr.length > 0) {
      data.testList = arr
      data.QuestionViewWindow.show = true
    } else ElMessage('暂无试题！')
  }
  return {
    openTravelWindow,
    closeWindow,
    deleteEvent,
    testTotalFilters,
    testScreenTotalFilters,
    handleOpenDialogViewTest,
    testScreenOpen,
    exportOpenTravelWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    QuestionView,
    WFManagementForm
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
      ApprovalList: [], //审批状态
      // 上传素材弹窗数据
      WFManagementFormWindow: {
        show: false,
        Id: 0
      },
      // 预览试题弹窗数据
      QuestionViewWindow: {
        show: false,
        Id: 0
      },
      CoursewareLevel: [], //课件等级
      CoursewareClass: [], //课件分类
      // 列表数据
      tableData: [],
      Suggestion: {},
      testList: [] //试题列表
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
    return { form, data, ...tableRender(form, data), ...windowData(form, data) }
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
