<!--
 * @Author: ZHJ
 * @Date: 2022-08-08 09:15:15
 * @LastEditTime: 2022-11-19 14:44:44
 * @LastEditors: ZHJ
 * @Description: 深造内容解锁
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Further\UnlockIndex.vue
 * 版权声明
-->
<template>
  <div class="bg-close-table-checkbox">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">深造内容</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="姓名" value="1" />
            <el-option label="关停时间" value="5" />
            <el-option label="关停状态" value="2" />
          </el-select>
          <el-input v-model="form.Name" placeholder="请输入" class="screen-width" v-if="form.type == 1" />
          <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type == 5" start-placeholder="开始时间" end-placeholder="结束时间" @change="timeChange" />
          <el-select v-model="form.State" v-else-if="form.type == 2" class="screen-width">
            <el-option label="未解锁" value="1" />
            <el-option label="已解锁" value="0" />
          </el-select>
          <el-button type="primary" @click="search()" class="ml-2">搜索</el-button>
          <el-button :type="data.single ? 'info' : 'primary'" class="ml-2" @click="UnlockEvent()" :disabled="data.single">解锁</el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full" ref="multipleTableRef" @selection-change="handleSelectionChange" @select="selectRow">
            <el-table-column type="selection" width="55" />
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="DepartName" label="部门" min-width="120" align="center">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="姓名" align="center" />
            <el-table-column prop="AlertCount" label="关停项" align="center" />
            <el-table-column prop="LearnCount" label="关停原因" align="center">
              <template #default="scope">
                <el-popover title="关停原因" :width="200" trigger="hover" content="">
                  <div v-for="(item, index) in scope.row.UserAlertList">{{ item.AlertText }}</div>
                  <template #reference>
                    <div v-if="scope.row.UserAlertList.length > 0">{{ scope.row.UserAlertList[0].AlertText }}</div>
                    <div v-else>-</div>
                  </template>
                </el-popover>
              </template>
            </el-table-column>
            <el-table-column prop="LearnCount" label="关停时间" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.AlertDate) }}
              </template>
            </el-table-column>
            <el-table-column prop="LearnCount" label="开始时间" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.BeginDate) }}
              </template>
            </el-table-column>
            <el-table-column prop="LearnCount" label="结束时间" align="center">
              <template #default="scope">
                {{ scope.row.EndDate ? parseTimeEvent(scope.row.EndDate) : '' }}
              </template>
            </el-table-column>
            <el-table-column prop="Point" label="所需积分" align="center" />
            <el-table-column prop="LearnCount" label="学习记录" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openUnlockFormWindow(scope.row)">学习详情</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="LearnCount" label="状态" align="center">
              <template #default="scope">
                <el-button :type="stateEvent(scope.row) == 0 ? 'danger' : 'primary'" link @click="openUnlockFormWindow(scope.row)">{{ stateEvent(scope.row) == 0 ? '关停' : '已解锁' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <UnlockForm v-if="data.UnlockFormWindow.show" @closeWindow="closeWindow" :info="data.UnlockFormWindow.info"></UnlockForm>
  </div>
</template>

<script lang="ts">
import DepTabridge from '/@/components/DepTabridge/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import tabs from '/@/components/Tabs/Index.vue'
import UnlockForm from './_Components/UnlockForm.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetUnlockAlertPage, PostUnlockUserAlert } from '/@/api/hr/Further'
import Template from '/@/views/Template.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetUnlockAlertPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 监听时间筛选
  const timeChange = (val: any) => {
    if (val) {
      form.BeginDate = parseTime(val[0], '{y}-{m}-{d}')
      form.EndDate = parseTime(val[1], '{y}-{m}-{d}')
    } else {
      form.BeginDate = ''
      form.EndDate = ''
    }
  }
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
    form.time = ''
    form.HRName = ''
    form.BeginDate = ''
    form.EndDate = ''
    form.State = ''
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.info = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  //   监听多选
  const handleSelectionChange = (val: any) => {
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  // 状态转换
  const stateEvent = (val: any) => {
    var arr = val.UserAlertList.findIndex((x: any) => {
      if (x.Effect == true) {
        return true
      }
    })
    return arr
  }
  //   解锁
  const UnlockEvent = (val: any) => {
    ElMessageBox.confirm('是否解锁当前' + data.info.Name + '所有关停项？', {
      confirmButtonText: '解锁',
      cancelButtonText: '取消'
    })
      .then(() => {
        PostUnlockUserAlert(data.info.UserAlertList).then((res: any) => {
          if (res.code == 1) {
            search()
            ElMessage({
              type: 'success',
              message: '解锁成功'
            })
          }
        })
      })
      .catch(() => {})
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
    timeChange,
    typeChange,
    handleSelectionChange,
    selectRow,
    UnlockEvent,
    stateEvent
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 新增弹窗
  const openUnlockFormWindow = (row: any) => {
    if (row) {
      data.UnlockFormWindow.info = row
    } else {
      data.UnlockFormWindow.info = null
    }
    data.UnlockFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.UnlockFormWindow.show = false
    data.SetOtherFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    closeWindow,
    openUnlockFormWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    zStatistic,
    tabs,
    DepTabridge,
    Template,
    UnlockForm
  },
  props: {},
  setup() {
    const multipleTableRef: any = ref(null)
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      State: '1'
    })
    const data = reactive({
      single: true, //是否选中数据
      info: {}, //列表选中数据
      ApprovalList: [], //审批状态
      trendType: [], //申请类型数据
      // 新增弹窗数据
      UnlockFormWindow: {
        show: false,
        Id: 0
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
      // 申请类型
      store.getDict('hr_trend_type').then((res: any) => {
        data.trendType = res
      })
      // 审批状态
      store.getDict('Approval_state').then((res: any) => {
        data.ApprovalList = res
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data, multipleTableRef),
      ...window(form, data, multipleTableRef),
      imageRef,
      multipleTableRef
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
