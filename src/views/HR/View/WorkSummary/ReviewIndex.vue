<!--
 * @Author: ZHJ
 * @Date: 2022-08-02 15:52:37
 * @LastEditTime: 2022-08-31 11:36:09
 * @LastEditors: ZHJ
 * @Description: 察言观行
 * @FilePath: \beifangrenzixitong\src\views\HR\View\WorkSummary\ReviewIndex.vue
 * 版权声明
-->
<template>
  <div>
    <zStatistic v-if="isHeader"></zStatistic>
    <div class="bf-center-content">
      <tabs :tabList="data.tabList" @handleClick="selectEvent">
        <template #button>
          <div class="flex items-center justify-end AttendanceCheck-screen">
            <el-input v-model="form.Name" placeholder="姓名" style="width: 100px" class="ml-2" />
            <el-button type="primary" class="ml-2" @click="search">搜索</el-button>
            <el-button type="primary" @click="openmiddlewareFormWindow({}, 1)">写总结</el-button>
          </div>
        </template>
      </tabs>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="WorkTime" label="日期" align="center" min-width="100">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.WorkTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="" label="部门" min-width="120">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="姓名" align="center" />
            <el-table-column prop="WorkTypeName" label="总结类型" align="center" />
            <el-table-column prop="WorkPeriodValue" label="总结状态" align="center" />
            <el-table-column prop="" label="工作自评" align="center">
              <el-table-column prop="" label="饱和度" align="center" min-width="70">
                <template #default="scope">
                  <div v-for="(item, index) in data.selfData" :key="index">
                    <div v-if="item.DicKey == scope.row.Saturability">{{ item.DicValue }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="效率" align="center" min-width="70">
                <template #default="scope">
                  <div v-for="(item, index) in data.selfData" :key="index">
                    <div v-if="item.DicKey == scope.row.WorkRation">{{ item.DicValue }}</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="质量" align="center" min-width="70">
                <template #default="scope">
                  <div v-for="(item, index) in data.selfData" :key="index">
                    <div v-if="item.DicKey == scope.row.WorkQuality">{{ item.DicValue }}</div>
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="审批状态" align="center">
              <template #default="scope">
                <div class="truncate">{{ scope.row.ManagId ? '已审阅' : '未审阅' }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="操作" minb-width="100" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openmiddlewareFormWindow(scope.row, 4)" v-if="data.selectIndex == 0">审阅</el-button>
                <el-button type="primary" link @click="openmiddlewareFormWindow(scope.row, 3)" v-if="data.selectIndex == 1">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <middlewareForm v-if="data.middlewareFormWindow.show" @closeWindow="closeWindow" :details="data.middlewareFormWindow.details"></middlewareForm>
  </div>
</template>

<script lang="ts">
import DepTabridge from '/@/components/DepTabridge/index.vue'
import tabs from '/@/components/Tabs/Index.vue'
import middlewareForm from './_Components/middlewareForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetManageDeptId, GetWorkSummaryPage } from '/@/api/hr/WorkSummary'
import { ElMessage } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetManageDeptId().then((val: any) => {
    if (val.code == 1 && val.data) {
      form.DeptId = val.data[0].Id
      GetWorkSummaryPage(form).then((res: any) => {
        if (res.code == 1) {
          data.tableData = res.data.records
          form.totals = res.data.totals
        }
      })
    } else {
      ElMessage.error('获取列表数据失败')
    }
  })
}
/**
 * @description: 筛选
 * @param {*} form
 * @param {*} data
 * @return {*}
 * @use:
 */
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
  /**
   * @description: 时间格式转换
   * @param {*} val
   * @return {*}
   * @use:
   */
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  /**
   * @description: 监听tab下标
   * @param {*} index 下标
   * @return {*}
   * @use:
   */
  const selectEvent = (index: number) => {
    data.selectIndex = index
    form.Status = index + 1
    search()
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
    selectEvent
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  /**
   * @description: 关闭弹窗
   * @param {*} type
   * @return {*}
   * @use:
   */
  const closeWindow = (type: string) => {
    data.middlewareFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  /**
   * @description: 打开弹窗
   * @param {*} val
   * @param {*} viewType
   * @return {*}
   * @use:
   */
  const openmiddlewareFormWindow = (val: any, viewType: any) => {
    if (val) {
      data.middlewareFormWindow.details = val
    }
    data.middlewareFormWindow.details.viewType = viewType
    data.middlewareFormWindow.details.isApproval = true
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
    middlewareForm,
    tabs,
    DepTabridge
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      Status: 1
    })

    const data = reactive({
      selectIndex: 0,
      tabList: [{ name: '未审' }, { name: '已审' }, { name: '未写' }], //tabs数据
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
