<template>
  <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
    @current-change="handleCurrentChange">
    <el-table :data="data.tableData" class="w-full" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="50" />
      <el-table-column type="index" label="序号" width="55" align="center" />
      <el-table-column prop="User.CreateOn" label="入职时间" align="center"><template #default="scope">
          {{parseTimeEvent(scope.row.User.CreateOn)}}
        </template></el-table-column>
      <el-table-column prop="User.RealName" label="姓名" align="center" />
      <!-- <el-table-column prop="" label="性别" min-width="50" align="center">
        <template #default="scope">
          <div v-for="item in data.gender">
            <span v-if="scope.row.staffinfo.Sex == item.DicKey">{{ item.DicValue }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="User" label="身份证号" min-width="130" align="center">
        <template #default="scope">{{scope.row.staffinfo.IdCard}}</template>
      </el-table-column> -->
      <el-table-column prop="DepartName" label="部门" align="center" />
      <el-table-column prop="PostName" label="岗位" align="center">
        <template #default="scope">
          <div class="truncate">{{ scope.row.PostName }}</div>
        </template>
      </el-table-column>
      <!-- <el-table-column prop="User" label="手机号" align="center" min-width="90">
        <template #default="scope">{{scope.row.staffinfo.PhoneNumber }}</template>
      </el-table-column>
      <el-table-column prop="User" label="家庭地址" min-width="160" align="center">
        <template #default="scope">{{scope.row.staffinfo.HomeAddress }}</template>
      </el-table-column> -->
    </el-table>
  </table-search>
  <!-- 花名册管理 -->
  <RosterForm title="花名册管理" v-if="data.RosterFormWindow.view" @closeWindow="closeWindow" :isView="true" :UserId="data.RosterFormWindow.UserId"
    :EmployeeId="data.RosterFormWindow.EmployeeId" :Id="data.RosterFormWindow.Id"></RosterForm>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import RosterForm from '/@/views/System/Roster/_Components/RosterForm.vue'
import { defineComponent, getCurrentInstance, reactive, SetupContext } from 'vue'
import { GetEmployeeRosterPage } from '/@/api/system/roster'
import Tree from '/@/components/Tree/index.vue'
import { parseTime } from '/@/utils/tools'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEmployeeRosterPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any, context: any) => {
  let _this = getCurrentInstance()
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.job.length > 0) {
      data.job.forEach((element: any) => {
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
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const handleSelectionChange = (val: any) => {
    if (val && val.length > 0) {
      console.log(val)
      data.RosterFormWindow.Id = val[0].Roster?.Id
      data.RosterFormWindow.EmployeeId = val[0].User?.Id
      data.RosterFormWindow.UserId = val[0].User?.Id
    }
    if (val.length !== 1) {
      context.emit('single', true)
    } else {
      context.emit('single', false)
    }
  }
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return { search, getStatus, handleSelectionChange, handleSizeChange, handleCurrentChange, indexMethod, parseTimeEvent }
}
export default defineComponent({
  components: {
    Tree,
    TableSearch,
    RosterForm
  },
  emits: ['single'],
  props: {},
  setup(props, context: SetupContext) {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      gender: [], //性别
      // 列表数据
      tableData: [
        {
          CreateOn: '2021-05-04'
        }
      ],
      single: true, //单选
      // 花名册编辑
      RosterFormWindow: {
        view: false,
        Id: undefined
      },
      level: 1
    })
    // 关闭弹窗
    const closeWindow = (type: string) => {
      data.RosterFormWindow.view = false
      if (type == 'submit') {
        form.page = 1
        tableRender(form, data, {})
      }
    }
    // 组织架构监听
    const levelChange = (level: number) => {
      data.level = level
    }
    return { data, form, levelChange, ...tableRender(form, data, context), closeWindow }
  }
})
</script>

<style lang="scss" scoped></style>
