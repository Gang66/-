<template>
  <div>
    <div class="absolute -top-8 right-0 z-30">
      <el-button type="primary" @click="openWindowViewAppraisal(1, data.AssesSettingsApplyList, data.performanceList)" :disabled="data.single"> <i class="iconfont icon-order mr-2"></i> 申请调整</el-button>
    </div>
    <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
      <div class="bf-table-content">
        <el-table :data="data.performanceList" class="w-full" ref="multipleTableRef" @select="selectRow" @selection-change="handleSelectionChange" @filter-change="filterData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="StartDate" label="启动日期" align="center" min-width="140" />
          <el-table-column prop="Name" label="类型" align="center">
            <template #default="scope">{{ getClass(scope.row.AssesType) }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="名称" align="center">
            <template #default="scope">{{ scope.row.RealName || '-' }}</template>
          </el-table-column>
          <el-table-column prop="RealName" label="创建人" align="center">
            <template #default="scope">系统管理员</template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="创建时间" align="center" min-width="160" />
          <el-table-column prop="Name" label="备注" align="center" min-width="140" show-overflow-tooltip>
            <template #default="scope">{{ scope.row.Remarks }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="申请次数" align="center">
            <template #default="scope">
              <span>{{ scope.row.AssesSettingsApplyList.length }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="申请状态" align="center">
            <template #default="scope">
              <span v-if="scope.row.AssesSettingsApplyList.Status == -1">未通过</span>
              <span v-else-if="scope.row.AssesSettingsApplyList.Status == 1">审批中</span>
              <span v-else-if="scope.row.AssesSettingsApplyList.Status == 100">已通过</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="操作" align="center">
            <template #default="scope">
              <div class="text-blue-500 cursor-pointer" @click="openWindowViewAppraisal(0, scope.row.AssesSettingsItemList, scope.row)">
                <span>详情</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </table-search>

    <!-- 查看工作量考核 -->
    <ViewAppraisal :title="'查看工作量考核'" v-if="viewAppraisalOpenData.visible" :FormData="viewAppraisalOpenData.formData" @closeWindow="closeWindowViewAppraisal($event)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import ViewAppraisal from './ViewAppraisal.vue'
import { GetManagerWorkAssesSettingsPage } from '/@/api/system/SalesSettings'
import { parseTime } from '/@/utils/tools'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  //获取考核类型
  store.getDict('hr_asses_type').then((res: any) => {
    data.classification = res
  })
}

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetManagerWorkAssesSettingsPage(form).then((res) => {
    if (res.code == 1) {
      console.log(res)
      data.performanceList = res.data.records
      form.totals = res.data.totals
      data.AssesSettingsApplyList = res.data.AssesSettingsApplyList
    }
  })
}

// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
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
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
    form.time = ''
    form.HRName = ''
    form.BeginDate = ''
    form.EndDate = ''
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  const filterData = (val: any) => {
    if (val.Sex && val.Sex.length > 0) {
      form.Sex = JSON.stringify(val.Sex)
    } else {
      form.Sex = []
    }
    if (val.StaffState && val.StaffState.length > 0) {
      form.StaffState = JSON.stringify(val.StaffState)
    } else {
      form.StaffState = []
    }
    search()
  }
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
  // table选择监听
  const handleSelectionChange = (val: any) => {
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
    typeChange,
    filterData,
    selectRow,
    parseTimeEvent
  }
}

export default defineComponent({
  components: {
    TableSearch,
    ViewAppraisal
  },
  setup() {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0
    })
    const data = reactive({
      performanceList: [],
      classification: [],
      single: true //不能点
    })
    //查看工作量考核
    const viewAppraisalOpen = (data: any) => {
      let viewAppraisalOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowViewAppraisal = (val: any, List: any, performList: any) => {
        viewAppraisalOpenData.formData = {
          type: val,
          AssesSettingsItemList: List,
          performanceList: performList
        }
        viewAppraisalOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowViewAppraisal = (type: string) => {
        viewAppraisalOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        viewAppraisalOpenData,
        openWindowViewAppraisal,
        closeWindowViewAppraisal
      }
    }
    // 获取考核分类
    const getClass = (val: number) => {
      let _obj = data.classification.find((x: any) => x.DicKey == val)
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    onMounted(() => {
      getDictionaryData(data)
    })

    return {
      data,
      form,
      ...tableRender(form, data, multipleTableRef),
      multipleTableRef,
      ...viewAppraisalOpen({ data }),
      getClass
    }
  }
})
</script>

<style lang="postcss" scoped></style>
