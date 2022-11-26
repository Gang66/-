<template>
  <div class="bf-content bg-close-table-checkbox">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">邀约管理</div>
            <div class="flex justify-end items-center">
              <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
                <el-option label="姓名" value="1" />
                <el-option label="事业部" value="2" />
                <el-option label="岗位" value="3" />
                <el-option label="HR" value="4" />
                <el-option label="预约时间" value="5" />
              </el-select>
              <el-input v-model="form.Name" placeholder="请输入" class=" screen-width" v-if="form.type==1" />
              <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class=" screen-width" v-else-if="form.type==2">
                <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
              <el-select v-model="form.PostId" placeholder="请选择岗位" filterable class=" screen-width" v-else-if="form.type==3">
                <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
              </el-select>
              <el-input v-model="form.HRName" placeholder="请输入" class=" screen-width" v-if="form.type==4" />
              <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type==5" start-placeholder="开始时间"
                end-placeholder="结束时间" @change="timeChange" />
              <el-button type="primary" @click="search()" class="ml-2">搜索</el-button>
              <el-button type="info" :disabled="data.single" v-if="data.single">转入面试</el-button>
              <el-button type="success" @click="GetInviteIntoInterviewEvent" v-else :disabled="data.single">转入面试</el-button>
              <el-button type="primary" @click="openWindow(false)">添加邀约</el-button>
            </div>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full" ref="multipleTableRef" @select="selectRow" @selection-change="handleSelectionChange" @filter-change="filterData">
            <el-table-column type="selection" width="30" align="center" />
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="CreateOn" label="创建时间" min-width="110" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.CreateOn,1) }}
              </template>
            </el-table-column>
            <el-table-column prop="InviteName" label="姓名" align="center"><template #default="scope">
                <el-tooltip class="box-item" effect="dark" :content="scope.row.PhoneNumber" placement="top">
                  <div>{{ scope.row.InviteName }}</div>
                </el-tooltip>
              </template></el-table-column>
            <el-table-column prop="DepartName" label="部门" min-width="120" align="center">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.ParentName, DeptName: scope.row.DepartName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="岗位" align="center" min-width="100" />
            <!-- :filter-method="filterChannel" -->
            <el-table-column prop="RecruitChannel" label="招聘渠道" align="center" min-width="100" column-key="RecruitChannel" :filters="data.channel">
              <template #default="scope">
                <div v-for="(item, index) in data.channel" :key="index">
                  <div v-if="item.DicKey == scope.row.RecruitChannel">
                    {{ item.DicKey == scope.row.RecruitChannel ? item.DicValue : "-" }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="简历" align="center" min-width="70">
              <template #default="scope">
                <el-button link type="primary" v-if="scope.row.ResumePath.length>0" @click="openUploadWindow(scope.row.ResumePath)">查看</el-button>
                <div v-else>-</div>
              </template>
            </el-table-column>
            <el-table-column prop="HrName" label="HR" align="center" min-width="100" />
            <el-table-column prop="AppointmentState" label="预约时间" align="center" min-width="146">
              <template #default="scope">
                <div v-if="scope.row.AppointmentState == 0" class="bf-text-color-regular">{{ scope.row.Appointment }}</div>
                <div v-else>-</div>
              </template>
            </el-table-column>
            <!-- :filter-method="filterAppointmentState" -->
            <el-table-column prop="AppointmentState" label="预约状态" min-width="100" align="center" :filters="[{text:'发送信息',value:-1},{text:'预约成功',value:0},{text:'重发信息',value:1}]"
              column-key="AppointmentState">
              <template #default="scope">
                <div v-if="scope.row.AppointmentState == -1" class="bf-font-blue-color cursor-pointer" @click="openWindow(true, scope.row.Uid)">发送信息</div>
                <div v-if="scope.row.AppointmentState == 0" class="bf-text-color-regular">预约成功</div>
                <div v-if="scope.row.AppointmentState == 1" class="bf-error-color cursor-pointer" @click="openWindow(true, scope.row.Uid, 1)">重发信息</div>
              </template>
            </el-table-column>
            <!-- :filter-method="filterStatus" -->
            <el-table-column prop="Status" label="面试状态" min-width="100" align="center" column-key="Status" :filters="[{text:'未赴约',value:-1},{text:'赴约',value:0}]">
              <template #default="scope">
                <div v-if="scope.row.Status == -1" class="bf-error-color">未赴约</div>
                <div v-if="scope.row.Status == 0" class="bf-font-blue-color">赴约</div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 邀约管理表单 -->
    <InviteForm v-if="data.InviteFormWindow.show" @closeWindow="closeWindow" :isHeavy="data.InviteFormWindow.isHeavy" :isEdit="data.InviteFormWindow.isEdit"
      :Uid="data.InviteFormWindow.Uid"></InviteForm>
    <!-- 上传图片 -->
    <!-- <Upload :uploadFileData="data.PathList" v-if="data.UploadWindow.view" :isView="true" @closeWindow="data.UploadWindow.view = false"></Upload> -->
  </div>
</template>

<script lang="ts">
import { preview } from 'vue3-preview-image'
import TableSearch from '/@/components/TableSearch/index.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { GetHRInviteManagementPage, GetInviteIntoInterview } from '/@/api/hr/Invite'
import { useCommonStore } from '/@/store/modules/Common'
import zStatistic from '../../Components/statistic/Index.vue'
import InviteForm from './_Components/InviteForm.vue'
import Upload from '/@/components/Upload/Index.vue'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { ElMessage } from 'element-plus'
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
    if (val.RecruitChannel && val.RecruitChannel.length > 0) {
      form.RecruitChannel = JSON.stringify(val.RecruitChannel)
      console.log(form.RecruitChannel)
    } else {
      form.RecruitChannel = []
    }
    if (val.AppointmentState && val.AppointmentState.length > 0) {
      form.AppointmentState = JSON.stringify(val.AppointmentState)
    } else {
      form.AppointmentState = []
    }
    if (val.Status && val.Status.length > 0) {
      form.Status = JSON.stringify(val.Status)
    } else {
      form.Status = []
    }
    search()
  }
  // 招聘渠道小筛选事件
  const filterChannel = (value: string, row: any) => {
    console.log(value)
    return row.RecruitChannel == value
  }
  // 预约状态小筛选事件
  const filterAppointmentState = (value: string, row: any) => {
    return row.AppointmentState == value
  }
  // 面试状态小筛选事件
  const filterStatus = (value: string, row: any) => {
    return row.Status == value
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
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
    parseTimeEvent,
    typeChange,
    timeChange,
    filterChannel,
    filterAppointmentState,
    filterStatus,
    filterData,
    selectRow
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 邀约添加 修改弹窗
  const openWindow = (isEdit: boolean, Uid: number, type: number) => {
    data.InviteFormWindow.Uid = Uid
    data.InviteFormWindow.isEdit = isEdit
    if (type == 1) {
      data.InviteFormWindow.isHeavy = false
    } else {
      data.InviteFormWindow.isHeavy = true
    }
    data.InviteFormWindow.show = true
  }
  // 转入面试
  const GetInviteIntoInterviewEvent = () => {
    if (data.selectDetails.AppointmentState != 0) {
      ElMessage('邀约人员未完善信息或邀约时间已失效')
      return
    }
    GetInviteIntoInterview(data.selectDetails.Id).then((res) => {
      if (res.code == 1) {
        closeWindow('submit')
        ElMessage({
          message: '转入面试成功',
          type: 'success'
        })
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 查看简历
  const openUploadWindow = (val: any) => {
    data.urlPath = []
    val.forEach((v: any) => {
      data.urlPath.push(v.Path)
    })
    preview(0, data.urlPath)
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.InviteFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  return {
    openWindow,
    closeWindow,
    openUploadWindow,
    GetInviteIntoInterviewEvent
  }
}
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    InviteForm,
    Upload,
    DepTabridge
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
      InviteFormWindow: {
        show: false
      },
      deptList: [], //部门数据
      postList: [], //岗位数据
      selectDetails: [], //列表当前选中详情
      PathList: [], //上传展示数据
      // 列表数据
      tableData: [],
      single: true, //是否禁用按钮
      channel: [], //招聘渠道数据
      // 打开上传弹窗
      UploadWindow: {
        view: false
      },
      Suggestion: {},
      urlPath: [] //简历列表
    })
    onMounted(() => {
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
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
      // 获取招聘渠道数据
      store.getDict('hr_channel_status').then((res: any) => {
        res.forEach((element: any) => {
          element.text = element.DicValue
          element.value = element.DicKey
        })
        data.channel = res
      })
    })
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
