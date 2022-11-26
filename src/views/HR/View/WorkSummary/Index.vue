<template>
  <div>
    <zStatistic v-if="isHeader"></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">工作总结</div>
        <div>
          <!-- <el-button type="primary">搜索</el-button> -->
          <el-button type="primary" @click="openmiddlewareFormWindow({}, 1)">写总结</el-button>
          <!-- <el-button type="primary" @click="data.WorkSummaryFormWindow.show=true">写总结</el-button> -->
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="WorkTime" label="日期" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.WorkTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="WorkTypeName" label="总结类型" align="center" />
            <el-table-column prop="WorkPeriodValue" label="总结状态" align="center" />
            <el-table-column prop="" label="工作自评" align="center">
              <el-table-column prop="" label="饱和度" align="center" width="70">
                <template #default="scope">
                  <div v-for="(item, index) in data.selfData" :key="index">
                    <div v-if="item.DicKey == scope.row.Saturability" :style="{ color: stateChange(scope.row.Saturability).color }">{{ item.DicValue }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="效率" align="center" width="70">
                <template #default="scope">
                  <div v-for="(item, index) in data.selfData" :key="index">
                    <div v-if="item.DicKey == scope.row.WorkRation" :style="{ color: stateChange(scope.row.WorkRation).color }">{{ item.DicValue }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="质量" align="center" width="70">
                <template #default="scope">
                  <div v-for="(item, index) in data.selfData" :key="index">
                    <div v-if="item.DicKey == scope.row.WorkQuality" :style="{ color: stateChange(scope.row.WorkQuality).color }">{{ item.DicValue }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="审批状态" align="center">
              <template #default="scope">
                <div class="truncate">{{ scope.row.ManagId ? '已审批' : '未审批' }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="领导评语" width="200" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openmiddlewareFormWindow(scope.row, 3)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <middlewareForm v-if="data.middlewareFormWindow.show" :isHeader="isHeader" @closeWindow="closeWindow" :details="data.middlewareFormWindow.details"></middlewareForm>
  </div>
</template>

<script lang="ts">
import middlewareForm from './_Components/middlewareForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetUserWorkSummaryPage } from '/@/api/hr/WorkSummary'
import { useLayoutStore } from '/@/store/modules/layout'
import { ElMessage } from 'element-plus'
const store = useCommonStore() //记得加这一句
const userStore = useLayoutStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetUserWorkSummaryPage(form).then((res) => {
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
    return parseTime(val, '{y}-{m}-{d}')
  }
  /**
   * @description: 状态转换
   * @param {*} val 状态 3好 2中 1差
   * @return {*}
   * @use:
   */
  const stateChange = (val: any) => {
    var arr = { title: '', color: '' }
    if (val == 3) {
      arr.title = '好'
      arr.color = '#409eff'
    } else if (val == 2) {
      arr.title = '中'
      arr.color = '#ff9148'
    } else if (val == 1) {
      arr.title = '差'
      arr.color = '#ff4a48'
    }
    return arr
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
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    stateChange
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.middlewareFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  // 打开弹窗
  const openmiddlewareFormWindow = (val: any, viewType: any) => {
    if (data.isHeader == false && userStore.getUserInfo.TrainStudyStatus != 0) {
      ElMessage.warning('已过新人训，请前往正式期去写工作总结')
      return
    }

    if (val) {
      data.middlewareFormWindow.details = val
      data.middlewareFormWindow.details.viewType = viewType
    } else {
      data.middlewareFormWindow.details.viewType = viewType
    }
    data.middlewareFormWindow.show = true
  }
  return {
    closeWindow,
    openmiddlewareFormWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    zStatistic,
    middlewareForm
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup(props) {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      BeginDate: ''
    })
    const data = reactive({
      isHeader: props.isHeader,
      middlewareFormWindow: {
        show: false
      },
      urlPath: [], //证明url
      // 列表数据
      tableData: [],
      selfData: {}
    })
    onMounted(() => {
      // 获取工作自评
      store.getDict('hr_workSummary_Self').then((res: any) => {
        data.selfData = res
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data),
      ...window(form, data, imageRef),
      imageRef
    }
  }
})
</script>

<style lang="postcss" scoped>
.leaveIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
