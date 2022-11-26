<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">考勤设置</div>
            <el-row :gutter="10" justify="end">
              <el-col :md="24" :lg="8">
                <el-button type="primary" @click="attendanceDicSetWindowEvent">考勤设置</el-button>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-button type="primary" @click="addWindow">新增列表</el-button>
              </el-col>
              <el-col :md="24" :lg="8">
                <el-button type="primary" @click="openSpecialWindow(false, data.specialWindow.Id)" :disabled="data.single">特殊条件</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="45" align="center" />
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="checkattendance.Name" label="考勤组" width="110" />
            <el-table-column prop="TypeId" label="时差分类" align="center">
              <el-table-column label="夏令时" align="center" width="280">
                <template #default="scope">上午：{{ scope.row.checkattendance.SummerTime[0] + "~" + scope.row.checkattendance.SummerTime[1] }}
                  下午：{{ scope.row.checkattendance.SummerTime[2] + "~" + scope.row.checkattendance.SummerTime[3] }} </template>
              </el-table-column>
              <el-table-column label="冬令时" align="center" width="280">
                <template #default="scope">上午：{{ scope.row.checkattendance.WinterTime[0] + "~" + scope.row.checkattendance.WinterTime[1] }}
                  下午：{{ scope.row.checkattendance.WinterTime[2] + "~" + scope.row.checkattendance.WinterTime[3] }}</template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="CreateName" label="特殊条件" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openSpecialWindow(true, scope.row.checkattendance.Id)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="ContractInfo.LaborLegalPerson" label="绑定数量" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="opencomSetDisDialog(scope.row.checkattendance)">{{ scope.row.DepartCount }}</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="Suggestion" label="状态" width="55">
              <template #default="scope">
                {{ getStatus(scope.row.checkattendance.Status) }}
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="120">
              <template #default="scope">
                <div class="bf-button-bl">
                  <el-button text key="primary" type="primary" @click="openWindow(true, scope.row.checkattendance.Id)">编辑</el-button>
                  <el-button text key="primary" type="primary" @click="openMessage(scope.row.checkattendance.Id)" class="bf-error-color">删除</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 新增考勤 -->
    <AttendanceSettingsForm title="新增考勤" v-if="data.attendanceSetWindow.view" @closeWindow="closeWindow" :Id="data.attendanceSetWindow.Id"></AttendanceSettingsForm>
    <!-- 考勤设置 -->
    <AttendanceDistribution title="考勤设置" v-if="data.attendanceDicSetWindow.view" @closeWindow="closeWindow" :Id="data.attendanceDicSetWindow.Id"></AttendanceDistribution>
    <!-- 考勤绑定列表 -->
    <AttendanceDistributionList title="绑定数量" v-if="data.attendanceDicSetListWindow.view" @closeWindow="closeWindow" :Id="data.attendanceDicSetListWindow.Id">
    </AttendanceDistributionList>
    <!-- 特殊条件 -->
    <Special title="考勤设置" v-if="data.specialWindow.view" @closeWindow="closeSpecialWindow" :isEdit="data.specialWindow.isEdit" :Id="data.specialWindow.Id"></Special>
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import {
  GetCheckAttendancePage,
  GetDeleteCheckAttendanceSave
} from '/@/api/system/attendanceSettings'
import AttendanceSettingsForm from './_Components/AttendanceSettingsForm.vue'
import AttendanceDistribution from '/@/views/System/AttendanceSettings/_Components/AttendanceDistribution.vue'
import AttendanceDistributionList from '/@/views/System/AttendanceSettings/_Components/AttendanceDistributionList.vue'
import Special from './_Components/Special.vue'

import { useCommonStore } from '/@/store/modules/Common'
import { ElMessage, ElMessageBox } from 'element-plus'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetCheckAttendancePage(form).then((res) => {
    if (res.code == 1) {
      var arr = res.data.records
      arr.forEach((val: any) => {
        val.checkattendance.SummerTime = JSON.parse(
          val.checkattendance.SummerTime
        )
        val.checkattendance.WinterTime = JSON.parse(
          val.checkattendance.WinterTime
        )
      })
      data.tableData = arr
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const handleSelectionChange = (val: any) => {
    console.log(val)
    if (val && val.length > 0) {
      data.specialWindow.Id = val[0].checkattendance.Id
      console.log(data.specialWindow.Id)
    }
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
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
    indexMethod,
    handleSelectionChange
  }
}
const window = (form: any, data: any): any => {
  // 考勤设置添加 修改弹窗
  const openWindow = (isEdit: boolean, Id: number) => {
    data.attendanceSetWindow.Id = Id
    data.attendanceSetWindow.view = true
  }
  const attendanceDicSetWindowEvent = () => {
    data.attendanceDicSetWindow.view = true
  }
  // 删除事件
  const openMessage = (val: number) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      GetDeleteCheckAttendanceSave(val).then((res) => {
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
  const opencomSetDisDialog = (val: any) => {
    data.attendanceDicSetListWindow.view = true
    data.attendanceDicSetListWindow.Id = val.Id
  }
  // 特殊条款弹窗
  const openSpecialWindow = (type: boolean, val: any) => {
    console.log(val)
    if (type == true) {
      data.specialWindow.Id = val
      data.specialWindow.isEdit = true
    } else {
      data.specialWindow.isEdit = false
    }
    data.specialWindow.view = true
  }
  // 新增弹窗
  const addWindow = () => {
    data.attendanceSetWindow.Id = null
    data.attendanceSetWindow.view = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.attendanceSetWindow.view = false
    data.attendanceDicSetWindow.view = false
    data.attendanceDicSetListWindow.view = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  // 关闭弹窗
  const closeSpecialWindow = (type: string) => {
    data.specialWindow.view = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openWindow,
    closeWindow,
    opencomSetDisDialog,
    closeSpecialWindow,
    openMessage,
    addWindow,
    openSpecialWindow,
    attendanceDicSetWindowEvent
  }
}
export default defineComponent({
  components: {
    TableSearch,
    AttendanceSettingsForm,
    AttendanceDistribution,
    AttendanceDistributionList,
    Special
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      // 新增考勤弹窗数据
      attendanceSetWindow: {
        view: false
      },
      // 特殊条件弹窗数据
      specialWindow: {
        view: false
      },
      // 考勤设置弹窗数据
      attendanceDicSetWindow: {
        view: false
      },
      // 绑定数量弹窗数据
      attendanceDicSetListWindow: {
        view: false
      },
      // 列表数据
      tableData: [],
      Suggestion: {},
      job: {},
      single: true //是否禁用
    })
    onMounted(() => {
      store.getDict('hr_enb_status').then((res: any) => {
        data.Suggestion = res
      })
    })
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="scss" scoped></style>
