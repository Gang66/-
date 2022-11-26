<!--
 * @Author: ZHJ
 * @Date: 2022-05-19 11:44:59
 * @LastEditTime: 2022-11-26 09:30:22
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Induction\Index.vue
 * 版权声明
-->
<template>
  <div class="bf-content bg-close-table-checkbox">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">入职管理</div>
            <div class="flex justify-end items-center">
              <el-select v-model="form.typeOne" class="ml-2 screen-width" placeholder="类型" @change="typeChangeOne">
                <el-option label="姓名" value="1" />
                <el-option label="事业部" value="2" />
              </el-select>
              <el-input v-model="form.Name" placeholder="请输入" class="screen-width" v-if="form.typeOne == 1" />
              <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class="screen-width" v-else-if="form.typeOne == 2">
                <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
              <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
                <el-option label="岗位" value="3" />
                <el-option label="入职时间" value="5" />
              </el-select>
              <el-select v-model="form.PostId" placeholder="请选择岗位" filterable class="screen-width" v-if="form.type == 3">
                <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
              </el-select>
              <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type == 5" start-placeholder="开始时间" end-placeholder="结束时间" @change="timeChange" />
              <el-button type="primary" class="ml-2" @click="search()">搜索</el-button>
              <el-button type="warning" @click="openUserProfileWindow" :disabled="data.single">档案打印</el-button>
              <el-button type="success" @click="uploadExE">下载解除劳动合同书</el-button>
              <el-button type="success" @click="OpenOneKeyStaffQuit" :disabled="data.single">一键离职</el-button>
            </div>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full" ref="multipleTableRef" @select="selectRow" @selection-change="handleSelectionChange" @filter-change="filterData">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="CreateOn" label="入职时间" align="center" min-width="140">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.ComeDate) }}
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="姓名" min-width="80" align="center">
              <template #default="scope">
                <el-tooltip class="box-item" effect="dark" :content="scope.row.PhoneNumber" placement="top">
                  {{ scope.row.Name }}
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="InviteName" label="性别" min-width="80" align="center" column-key="Sex" :filters="data.SexData">
              <template #default="scope">
                <div v-for="item in data.SexData">
                  <span v-if="scope.row.Sex == item.DicKey">{{ item.DicValue }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Age" label="年龄" min-width="80" align="center" />
            <el-table-column prop="WorkAge" label="工龄" min-width="90" align="center" />
            <el-table-column prop="DepartName" label="部门" min-width="120" align="center">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.ParentName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="岗位" align="center" min-width="140" />
            <el-table-column prop="" label="员工档案" align="center" min-width="140" column-key="StaffState" :filters="data.InductionStaffState">
              <template #default="scope">
                <div v-for="(item, index) in data.InductionStaffState" :key="index" class="bf-button-bl">
                  <el-button text @click="scope.row.StaffState == 1 || scope.row.StaffState == 4 || scope.row.StaffState == 6 ? openCodeFormWindow(scope.row) : scope.row.StaffState == 3 || scope.row.StaffState == 5 ? openViewFileFormWindow(scope.row) : scope.row.StaffState == 2 ? openViewFileFormWindow(scope.row, 1) : ''" :type="item.Remark == 'text' ? '' : item.Remark" v-if="scope.row.StaffState == item.DicKey">{{ item.DicValue }} </el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Status" label="档案状态" align="center" min-width="100">
              <template #default="scope">
                <el-button text v-if="scope.row.FileStatus == 5" @click="openUploadWindow(scope.row.Id, scope.row.UploadPhotos, true)">已归档</el-button>
                <el-button text type="primary" @click="openArchiveFormWindow(scope.row.Id)" v-else-if="scope.row.FileStatus == 4">等待原件</el-button>
                <el-button text type="warning" @click="openUploadWindow(scope.row.Id, scope.row.UploadPhotos, false)" v-else-if="scope.row.FileStatus == 3">上传档案</el-button>
                <el-button text type="warning" @click="openUploadWindow(scope.row.Id, scope.row.UploadPhotos, false)" v-else-if="scope.row.FileStatus == 6">逾期未传</el-button>
                <el-button text type="warning" @click="openUploadWindow(scope.row.Id, scope.row.UploadPhotos, false)" v-else-if="scope.row.FileStatus == 2">
                  {{ scope.row.FileStatusString }}
                </el-button>
                <el-button text type="warning" v-else-if="scope.row.FileStatus == 1">-</el-button>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作" align="center">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openWindow(scope.row.Id)">完善档案</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 完善档案表单 -->
    <FileForm v-if="data.FileFormWindow.show" @closeWindow="closeWindow" :details="data.details" :Id="data.FileFormWindow.Id"></FileForm>
    <!-- 完善档案表单 -->
    <ViewFileForm v-if="data.ViewFileFormWindow.show" @closeWindow="closeWindow" :details="data.details" :Id="data.ViewFileFormWindow.Id" :type="data.ViewFileFormWindow.type">
    </ViewFileForm>
    <!-- 上传图片 -->
    <Upload :uploadFileData="data.PathList" @uploadFileData="uploadFileDataEvent" v-if="data.UploadWindow.view" :isView="data.UploadWindow.isShow" @closeWindow="closeWindow" title="上传档案">
      <template #title>
        <p class="bf-text-color-regular text-sm mb-4">注意：需要本人抬头正面和盖手印动作,劳动合同最后一页盖章处。重点提供三个要素,即盖章本人,盖章处,劳动合同最后一页。</p>
      </template>
    </Upload>
    <!-- 发送短信二维码弹窗 -->
    <CodeForm v-if="data.CodeFormWindow.view" :url="data.CodeFormWindow.url" @closeWindow="data.CodeFormWindow.view = false" title="扫码完善资料"></CodeForm>
    <!-- 等待原件（档案归档） -->
    <ArchiveForm v-if="data.ArchiveFormWindow.view" @closeWindow="closeWindow" :Id="data.ArchiveFormWindow.Id"></ArchiveForm>
    <!--员工档案 -->
    <UserProfile v-if="data.UserProfileWindow.view" @closeWindow="closeWindow" :details="data.details" :DeptId="data.UserProfileWindow.DeptId"></UserProfile>
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import FileForm from './_Components/FileForm.vue'
import ViewFileForm from './_Components/ViewFileForm.vue'
import ArchiveForm from './_Components/ArchiveForm.vue'
import UserProfile from './_Components/UserProfile.vue'
import Upload from '/@/components/Upload/Index.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import CodeForm from './_Components/CodeForm.vue'
import { GetHRStaffeManagementPage, PostGetStaffManagementInfo, PostGetSaveUploadPhotos, GetOneKeyStaffQuitSave } from '/@/api/hr/Induction'
import { ElMessage, ElMessageBox } from 'element-plus'
import { element } from 'screenfull'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetHRStaffeManagementPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      data.PathList
      form.totals = res.data.totals
    }
  })
}
// 根据入职Id获取详情
const GetStaffManagementInfoEvent = async (Id: any, data: any, type: number) => {
  var arr = {
    Id: Id,
    DealWith: '2'
  }
  if (type && type == 1) {
    arr.DealWith = '1'
  }
  await PostGetStaffManagementInfo(arr).then((res) => {
    if (res.code == 1) {
      data.details = res.data
    } else {
      ElMessage.error(res.message)
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
    form.time = ''
    form.HRName = ''
    form.BeginDate = ''
    form.EndDate = ''
  }
  // 监听筛选
  const typeChangeOne = (val: any) => {
    form.Name = ''
    form.CompId = ''
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    debugger
    var arr = {
      Id: data.UploadWindow.Id,
      Files: val
    }
    PostGetSaveUploadPhotos(arr).then((res) => {
      data.UploadWindow.view = false
      form.page = 1
      tableRender(form, data, multipleTableRef)
    })
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
  // 性别小筛选事件
  const filterSex = (value: string, row: any) => {
    return row.Sex == value
  }
  // 员工档案小筛选事件
  const filterStaffState = (value: string, row: any) => {
    return row.StaffState == value
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
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
  //下载劳动合同证明书
  const uploadExE = () => {
    ElMessageBox.confirm('确定下载解除终止劳动合同证明书？', '下载', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        window.open(remoteUrl('/HR/2022/20220813/4b64bd194405e3e73bb8e96b1c73454.docx'))
      })
      .catch(() => {})
  }
  //一键离职
  const OpenOneKeyStaffQuit = (val: any) => {
    ElMessageBox.confirm('是否对' + data.selectDetails.Name + '一键离职', {
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    }).then(() => {
      console.log('Name' + data.selectDetails.Name)
      console.log('userid' + data.selectDetails.UserId)
      GetOneKeyStaffQuitSave(data.selectDetails.UserId).then((res: any) => {
        if (res.code == 1) {
          search()
          ElMessage({
            type: 'success',
            message: '离职成功'
          })
        } else {
          ElMessage.error(res.message)
        }
      })
    })
  }
  return {
    search,
    uploadExE,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent,
    uploadFileDataEvent,
    filterSex,
    filterStaffState,
    typeChange,
    typeChangeOne,
    timeChange,
    filterData,
    selectRow,
    OpenOneKeyStaffQuit
  }
}
const windowEvent = (form: any, data: any, multipleTableRef: any): any => {
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.FileFormWindow.show = false
    data.ViewFileFormWindow.show = false
    data.ArchiveFormWindow.view = false
    data.UploadWindow.view = false
    data.UserProfileWindow.view = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  // 完善档案添加 修改弹窗
  const openWindow = async (Id: number) => {
    await GetStaffManagementInfoEvent(Id, data, 0)
    data.FileFormWindow.Id = Id
    data.FileFormWindow.show = true
  }
  // 档案预览
  const openViewFileFormWindow = async (val: any, type: number) => {
    await GetStaffManagementInfoEvent(val.Id, data, 0)
    data.ViewFileFormWindow.Id = val.Id
    data.details.Uid = val.Uid
    data.ViewFileFormWindow.show = true
    data.ViewFileFormWindow.type = type
  }
  // 上传照片
  const openUploadWindow = (val: any, PathList: any, isShow: boolean) => {
    data.PathList = JSON.parse(PathList)
    data.UploadWindow.isShow = isShow
    data.UploadWindow.Id = val
    data.UploadWindow.view = true
  }
  // 发送短信弹窗
  const openCodeFormWindow = (val: any) => {
    data.CodeFormWindow.url = `${import.meta.env.VITE_HR_H5}#/?uid=` + val.Uid
    data.CodeFormWindow.view = true
    data.CodeFormWindow.Id = val
  }
  //等待原件（档案归档）
  const openArchiveFormWindow = (val: any) => {
    data.ArchiveFormWindow.Id = val
    data.ArchiveFormWindow.view = true
  }
  //员工档案
  const openUserProfileWindow = async () => {
    await GetStaffManagementInfoEvent(data.selectDetails.Id, data, 1)
    data.UserProfileWindow.DeptId = data.selectDetails.DeptId
    data.UserProfileWindow.view = true
  }

  return {
    openWindow,
    closeWindow,
    openViewFileFormWindow,
    openUploadWindow,
    openCodeFormWindow,
    openArchiveFormWindow,
    openUserProfileWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    FileForm,
    Upload,
    DepTabridge,
    ViewFileForm,
    CodeForm,
    ArchiveForm,
    UserProfile
  },
  props: {},
  setup() {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      typeOne: '1',
      type: '3'
    })
    const data = reactive({
      deptList: [], //部门数据
      postList: [], //岗位数据
      CoursewareLevel: [], //课件等级
      CoursewareClass: [], //课件分类
      // 完善档案弹窗数据
      FileFormWindow: {
        show: false
      },
      // 员工档案
      InductionStaffState: [],
      // 档案预览
      ViewFileFormWindow: {
        show: false
      },
      selectDetails: [], //列表当前选中详情
      PathList: [], //上传展示数据
      // 列表数据
      tableData: [],
      single: true, //是否禁用按钮
      // 二维码弹窗
      CodeFormWindow: {
        view: false
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false
      },
      // 打开等待原件（档案归档）
      ArchiveFormWindow: {
        view: false
      },
      // 员工档案
      UserProfileWindow: {
        view: false
      },
      details: {}, //详情数据
      SexData: [] //性别
    })
    onMounted(() => {
      // 性别
      store.getDict('sys_user_gender').then((res: any) => {
        console.log(res)
        res.forEach((element: any) => {
          element.text = element.DicValue
          element.value = element.DicKey
        })
        data.SexData = res
      })
      // 获取部门
      store.getDept(1).then((res: any) => {
        data.deptList = res
      })
      // 获取岗位
      store.getPost(2).then((res: any) => {
        console.log(res)
        data.postList = res
      })
      // 获取员工档案字典
      store.getDict('hr_Induction_StaffState').then((res: any) => {
        res.forEach((element: any) => {
          element.text = element.DicValue
          element.value = element.DicKey
        })
        data.InductionStaffState = res
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data, multipleTableRef),
      ...windowEvent(form, data, multipleTableRef),
      multipleTableRef
    }
  }
})
</script>
