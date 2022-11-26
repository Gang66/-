<template>
  <el-row :gutter="10">
    <el-col :md="24" :lg="5">
      <template v-if="data.treeList.length > 0">
        <!-- 组织架构树 -->
        <Tree :treeList="data.treeList" @transmitLevel="levelChange"></Tree>
      </template>
    </el-col>
    <!-- 表格 -->
    <el-col :md="24" :lg="19">
      <table-search :current-page="1" :page-size="10" :total="10" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <el-table :data="data.tableData" class="w-full" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="45" />
          <el-table-column type="index" label="序号" width="55" align="center" />
          <el-table-column prop="Name" label="部门名称">
            <template #default="scope">
              {{ scope.row.DepartList.Name }}
            </template>
          </el-table-column>
          <el-table-column prop="PostListName" label="岗位列表" v-if="data.level == 3">
            <template #default="scope">
              {{ scope.row.PostListName }}
            </template>
          </el-table-column>
          <el-table-column prop="PostListName" label="岗位" v-if="data.level != 3">
            <template #default="scope">
              {{ scope.row.PostListName }}
            </template>
          </el-table-column>
          <el-table-column prop="PostCount" label="岗位数量" v-if="data.level == 1 || data.level == 2" align="center">
            <template #default="scope">
              <el-button text key="primary" type="primary" @click="openPostDialog(scope.row)"> {{ scope.row.PostCount }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="DepartTwoCount" label="二级数量" v-if="data.level == 1" align="center" />
          <el-table-column prop="DepartThreeCount" label="三级数量" v-if="data.level == 1 || data.level == 2" align="center" />
          <template v-if="data.level == 2">
            <el-table-column label="合同信息" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="viewLabor(scope.row.DepartList)">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column label="考勤设置" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="viewAttendanceConfig(scope.row.DepartList)">预览</el-button>
              </template>
            </el-table-column>
          </template>
          <el-table-column prop="CreateName" label="区域绑定数量" align="center">
            <template #default="scope">
              <el-button text key="primary" type="primary" @click="openRegionBindingForm(scope.row.DepartList)">{{ scope.row.AreaCount }}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <template #default="scope">
              <div class="bf-button-bl">
                <el-button text key="primary" type="primary" @click="openWindow(scope.row.DepartList.Id)">编辑</el-button>
                <el-button text key="primary" type="primary" class="bf-error-color" @click="deletePostEvent(scope.row.DepartList.Id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </table-search>
    </el-col>
  </el-row>
  <!-- 部门表单 -->
  <deptForm title="新增部门" v-if="data.deptFormDialog.view" @closeWindow="closeDeptWindow" :Id="data.deptFormDialog.Id"></deptForm>
  <!-- 岗位绑定 -->
  <PostBinding title="岗位绑定" v-if="data.PostBindingDialog.view" @closeWindow="closeWindow" :Id="data.PostBindingDialog.Id" :Name="data.PostBindingDialog.Name"
    :level="data.PostBindingDialog.level"></PostBinding>
  <!-- 考勤设置 -->
  <AttendanceDistribution title="考勤设置" :isOrg="true" v-if="data.attendanceSetWindow.view" :isEdit="data.attendanceSetWindow.isEdit" @closeWindow="closeWindow"
    :Id="data.attendanceSetWindow.Id"></AttendanceDistribution>
  <!-- 考勤组展示 -->
  <AttendanceDistributionList title="考勤配置" v-if="data.attendanceSetListWindow.view" @closeWindow="closeWindow" :Id="data.attendanceSetListWindow.Id"></AttendanceDistributionList>
  <!-- 合同设置 -->
  <ContractSettingForm title="合同设置" :isOrg="true" v-if="data.ContractSettingWindow.view" :setUp="true" :isView="true" @closeWindow="closeWindow"
    :Id="data.ContractSettingWindow.Id"></ContractSettingForm>
  <!-- 位置设置 -->
  <MapContainer v-if="data.MapContainerWindow.view" @closeWindow="closeWindow" :Id="data.MapContainerWindow.Id"></MapContainer>
  <!-- 区域绑定 -->
  <RegionBindingForm title="区域绑定" v-if="data.RegionBindingFormWindow.view" @closeWindow="closeWindow" :isView="true" :Id="data.RegionBindingFormWindow.Id"></RegionBindingForm>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  SetupContext
} from 'vue'
import Tree from '/@/components/Tree/index.vue'
import deptForm from '../Department/_Components/form.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { deleteDept, getDeptChildrenList } from '/@/api/system/dept'
import { ElMessage, ElMessageBox } from 'element-plus'
import PostBinding from '/@/views/System/Post/_Components/PostBinding.vue'
import AttendanceDistribution from '/@/views/System/AttendanceSettings/_Components/AttendanceDistribution.vue'
import AttendanceDistributionList from '/@/views/System/AttendanceSettings/_Components/AttendanceDistributionList.vue'
import ContractSettingForm from '/@/views/System/ContractSetting/_Components/ContractSettingForm.vue'
import MapContainer from '/@/views/System/Map/MapContainer.vue'
import RegionBindingForm from '/@/views/System/RegionBinding/_Components/RegionBindingForm.vue'

const store = useCommonStore() //获取缓存数据
// 根据父类Id获取组织架构列表
const getDeptChildrenListEvent = (form: any, data: any) => {
  getDeptChildrenList(form.ParentId, 1).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data
    }
  })
}
// 筛选
const tableRender = (form: any, data: any, context: any) => {
  let _this = getCurrentInstance()
  getDeptChildrenListEvent(form, data)
  const handleSizeChange = (v: number) =>
    (form.size = v) && getDeptChildrenListEvent(form, data)
  const handleCurrentChange = (v: number) =>
    (form.page = v) && getDeptChildrenListEvent(form, data)
  const handleSelectionChange = (val: any) => {
    if (val && val.length > 0) {
      data.PostBindingDialog.level = val[0].DepartList.Cls
      data.PostBindingDialog.Id = val[0].DepartList.Id
      data.PostBindingDialog.Name = val[0].DepartList.Name
      data.RegionBindingFormWindow.Id = val[0].DepartList.Id
    }
    if (val.length !== 1) {
      context.emit('single', true)
    } else {
      context.emit('single', false)
    }
  }
  // 打开岗位绑定
  const openPostDialog = async (val: any) => {
    await handleSelectionChange([val])

    data.PostBindingDialog.view = true
  }
  return {
    handleSelectionChange,
    handleSizeChange,
    handleCurrentChange,
    openPostDialog
  }
}
// 弹窗
const window = (form: any, data: any): any => {
  // 字典类型添加 修改弹窗
  const openWindow = (Id: number) => {
    data.deptFormDialog.Id = Id
    data.deptFormDialog.view = true
  }
  const deletePostEvent = (Id: number) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      deleteDept(Id).then((res) => {
        if (res.code == 1) {
          form.page = 1
          tableRender(form, data, {})
          ElMessage({ type: 'success', message: '删除成功' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
      })
    })
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.PostBindingDialog.view = false
    data.attendanceSetWindow.view = false
    data.attendanceSetListWindow.view = false
    data.ContractSettingWindow.view = false
    data.MapContainerWindow.view = false
    data.RegionBindingFormWindow.view = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, {})
    }
  }
  // 考勤设置预览
  const viewAttendanceConfig = (val: any) => {
    data.attendanceSetWindow.Id = val.Id
    data.attendanceSetWindow.isEdit = true
    data.attendanceSetWindow.view = true
  }
  // 区域绑定
  const openRegionBindingForm = (val: any) => {
    data.RegionBindingFormWindow.view = true
    data.RegionBindingFormWindow.Id = val.Id
  }
  // 合同信息预览
  const viewLabor = (val: any) => {
    data.ContractSettingWindow.Id = val.Id
    data.ContractSettingWindow.view = true
  }
  // 关闭弹窗
  const closeDeptWindow = (type: string) => {
    data.deptFormDialog.view = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, {})
    }
  }
  return {
    openWindow,
    closeWindow,
    closeDeptWindow,
    deletePostEvent,
    viewAttendanceConfig,
    openRegionBindingForm,
    viewLabor
  }
}
export default defineComponent({
  emits: ['levelEvent', 'single'],
  components: {
    Tree,
    TableSearch,
    PostBinding,
    deptForm,
    AttendanceDistribution,
    AttendanceDistributionList,
    ContractSettingForm,
    MapContainer,
    RegionBindingForm
  },
  props: {},
  setup(props, context: SetupContext) {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      ParentId: '0'
    })
    const data = reactive({
      // 列表数据
      tableData: [],
      single: true, //单选
      level: 1,
      treeList: [],
      // 部门表单传参
      deptFormDialog: {
        view: false
      },
      // 岗位绑定弹窗
      PostBindingDialog: {
        view: false,
        Id: undefined
      },
      // 新增考勤弹窗数据
      attendanceSetWindow: {
        view: false,
        Id: undefined
      },
      // 考勤分类弹窗数据
      attendanceSetListWindow: {
        view: false,
        Id: undefined
      },
      // 合同设置弹窗数据
      ContractSettingWindow: {
        view: false,
        Id: undefined
      },
      // 位置信息
      MapContainerWindow: {
        view: false,
        Id: undefined
      },
      // 区域绑定
      RegionBindingFormWindow: {
        view: false,
        Id: undefined
      }
    })
    onMounted(() => {
      getDeptChildrenListEvent(form, data)
      //  获取组织架构树
      store.getDeptTree().then((res: any) => {
        data.treeList = res
      })
    })
    // 组织架构监听
    const levelChange = (val: any) => {
      form.ParentId = val.Id
      data.level = val.Tree.split(',').length
      context.emit('levelEvent', val.Cls)
      getDeptChildrenListEvent(form, data)
    }
    return {
      data,
      form,
      levelChange,
      ...tableRender(form, data, context),
      ...window(form, data)
    }
  }
})
</script>

<style lang="scss" scoped></style>
