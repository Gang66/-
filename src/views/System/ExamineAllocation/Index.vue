<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">考核设置</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="姓名" value="1" />
            <el-option label="事业部" value="2" />
            <el-option label="岗位" value="3" />
            <el-option label="HR" value="4" />
            <el-option label="预约时间" value="5" />
          </el-select>
          <el-input v-model="form.RealName" placeholder="请输入" class="screen-width" v-if="form.type == 1" />
          <el-select v-model="data.DepartId" placeholder="请选择事业部" filterable class="screen-width" v-else-if="form.type == 2">
            <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-select v-model="data.DepartId" placeholder="请选择岗位" filterable class="screen-width" v-else-if="form.type == 3">
            <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
          </el-select>
          <el-input v-model="form.RealName" placeholder="请输入" class="screen-width" v-if="form.type == 4" />
          <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type == 5" start-placeholder="开始时间"
            end-placeholder="结束时间" :size="size" />
          <el-button @click="search()" class="ml-3" type="primary" plain>
            <el-icon>
              <el-icon-Search />
            </el-icon>
            <span>搜索</span>
          </el-button>
          <el-button @click="data.ExamineAllocationWindow.show = true" type="primary" plain>
            <el-icon>
              <el-icon-Tickets />
            </el-icon>
            <span>考核分配配置</span>
          </el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="CreateOn" label="创建时间" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.CreateOn) }}
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="岗位类型" align="center"><template #default="scope">
                <div v-for="(item, index) in data.postTypeList">
                  <template v-if="item.DicKey == scope.row.PostIds">{{ item.DicValue }}</template>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Days" label="类型" align="center">
              <template #default="scope">
                <div v-for="(item, index) in data.examineTypeList">
                  <template v-if="item.DicKey == scope.row.TermType">{{ item.DicValue }}</template>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Remarks" label="备注" align="center" width="100" />
            <!-- <el-table-column prop="" label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openExamineAllocationWindow(scope.row)">编辑</el-button>
                <el-button type="danger" link>删除</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 考核分配配置 -->
    <ExamineAllocationForm v-if="data.ExamineAllocationWindow.show" @closeWindow="closeWindow"></ExamineAllocationForm>
  </div>
</template>

<script lang="ts">
import ExamineAllocationForm from './_Components/ExamineAllocationForm.vue'
import zStatistic from '/@/views/HR/Components/statistic/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetWorkAssesSettingsPage } from '/@/api/hr/ExamineAllocation'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWorkAssesSettingsPage(form).then((res) => {
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
  // 监听tab切换
  const typeChange = (val: any) => {}
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
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    typeChange
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  // 打开考核设置弹窗
  const openExamineAllocationWindow = (val: any) => {
    data.ExamineAllocationWindow.show = true
  }
  const openImage = () => {
    console.log((imageRef.value.previewTeleported = false))
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.ExamineAllocationWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    closeWindow,
    openImage,
    openExamineAllocationWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    zStatistic,
    ExamineAllocationForm
  },
  props: {},
  setup() {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      BeginDate: '',
      type: '1'
    })
    const data = reactive({
      postTypeList: [], //岗位类型
      examineTypeList: [], //考核类型
      // 列表数据
      tableData: [],
      //考核分配弹窗数据
      ExamineAllocationWindow: {
        show: false,
        Id: 0
      }
    })
    onMounted(() => {
      // 获取岗位类型
      store.getDict('hr_examine_postType').then((res: any) => {
        data.postTypeList = res
      })
      // 获取岗位类型
      store.getDict('hr_examine_type').then((res: any) => {
        data.examineTypeList = res
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
