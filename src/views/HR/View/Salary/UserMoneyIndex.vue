<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 15:53:30
 * @LastEditTime: 2022-11-06 15:58:47
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\UserMoneyIndex.vue
 * 版权声明
-->
<template>
  <div class="bf-content bg-close-table-checkbox">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label" style="height:32px;lineHeight:32px;">我的收入</div>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData">
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="BeLate" label="入职时间" align="center" min-width="80" />
            <el-table-column prop="UserName" label="姓名" align="center" min-width="70" />
            <el-table-column prop="DeptName" label="部门" align="center" min-width="120">
              <template #default="scope">
                <DepTabridge :key="scope.row.UserId" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="" label="岗位类别" align="center" min-width="80">
              <template #default="scope">
                <div class="truncate">{{ scope.row.WorkTime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="ClockAbsenteeism" label="实发收入【试用期（含经理试用期）除承包收入的按80%计算】" align="center">
              <el-table-column prop="BaseTotal" label="基本工资" align="center" min-width="80" />
              <el-table-column prop="SecrecyTotal" label="工龄费" align="center" min-width="80" />
              <el-table-column prop="OverTimeTotal" label="竞保费" align="center" min-width="80" />
              <el-table-column prop="NoteTotal" label="加班费" align="center" min-width="80" />
              <el-table-column prop="StudyTotal" label="总结费" align="center" min-width="80" />
              <el-table-column prop="WaiTotal" label="学习费" align="center" min-width="80" />
              <el-table-column prop="WaiTotal" label="承包收入" align="center" min-width="80" />
            </el-table-column>
            <el-table-column prop="" label="考勤率" align="center" min-width="80">
              <template #default="scope">
                <div class="truncate">{{ scope.row.WorkTime }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="扣费项目" align="center">
              <el-table-column prop="SheBaoGeTotal" label="社保费" align="center" min-width="70" />
              <el-table-column prop="SheBaoGongTotal" label="缺勤费" align="center" min-width="80" />
            </el-table-column>
            <el-table-column prop="MonthTotal" label="实收金额" align="center" min-width="100">
              <template #default="scope">
                <div class="truncate">{{ scope.row.MonthTotal }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="Lackint" label="操作" align="center" min-width="100">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openUserMoneyFormWindow(scope.row.Id, 3)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <UserMoneyForm v-if="data.UserMoneyFormWindow.show" @closeWindow="closeWindow"></UserMoneyForm>
  </div>
</template>

<script lang="ts">
import { preview } from 'vue3-preview-image'
import TableSearch from '/@/components/TableSearch/index.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { GetHRInviteManagementPage } from '/@/api/hr/Invite'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import Upload from '/@/components/Upload/Index.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import UserMoneyForm from './_Components/UserMoneyForm.vue'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetHRInviteManagementPage(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        element.Suggestion = eval('(' + element.Suggestion + ')')
        element.ResumePath = eval('(' + element.ResumePath + ')')
        element.ResumePath.forEach((val: any) => {
          val.Path = remoteUrl(val.Path)
        })
      })
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
  }
  // 时间格式转换
  const parseTimeEvent = (val: any, num: number) => {
    if (num == 1) {
      return parseTime(val, '{y}-{m}-{d}')
    } else {
      return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
    }
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  const filterData = (val: any) => {
    search()
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    typeChange,
    timeChange,
    filterData
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 添加 修改弹窗
  const openUserMoneyFormWindow = (isEdit: boolean, Uid: number, type: number) => {
    data.UserMoneyFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.UserMoneyFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openUserMoneyFormWindow,
    closeWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    Upload,
    DepTabridge,
    UserMoneyForm
  },
  props: {},
  setup() {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      type: '1'
    })
    const data = reactive({
      // 邀约弹窗数据
      UserMoneyFormWindow: {
        show: false
      }
    })
    onMounted(() => {})
    return {
      form,
      data,
      ...tableRender(form, data, multipleTableRef),
      ...window(form, data, multipleTableRef),
      multipleTableRef
    }
  }
})
</script>
