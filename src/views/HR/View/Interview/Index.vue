<!--
 * @Author: ZHJ
 * @Date: 2022-05-12 13:51:13
 * @LastEditTime: 2022-08-29 17:12:24
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Interview\Index.vue
 * 版权声明
-->
<template>
  <div class="bf-content bg-close-table-checkbox">
    <zStatistic></zStatistic>
    <div class="bf-center-content ">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false"
        @current-change="handleCurrentChange">
        <!-- <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">面试管理</div>
            <el-row :gutter="10" justify="end">
              <el-col :md="24" :lg="24">
                <el-button type="info" :disabled="data.single" v-if="data.single">转入入职</el-button>
                <el-button type="primary" @click="openTransferInFormWindow()" v-else :disabled="data.single">转入入职</el-button>
              </el-col>
            </el-row>
          </div>
        </el-form> -->
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">面试管理</div>
            <div class="flex justify-end items-center">
              <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
                <el-option label="姓名" value="1" />
                <el-option label="事业部" value="2" />
                <el-option label="岗位" value="3" />
                <el-option label="HR" value="4" />
                <el-option label="转入时间" value="5" />
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
              <el-button type="info" :disabled="data.single" v-if="data.single">转入入职</el-button>
              <el-button type="primary" @click="openTransferInFormWindow()" v-else :disabled="data.single">转入入职</el-button>
            </div>
          </div>
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full" ref="multipleTableRef" @select="selectRow" @selection-change="handleSelectionChange">
            <el-table-column type="selection" min-width="50" align="center" />
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="CreateOn" label="转入时间" min-width="120" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.CreateOn) }}
              </template>
            </el-table-column>
            <el-table-column prop="InviteName" label="姓名" min-width="70" align="center" />
            <el-table-column prop="DeptName" label="部门" min-width="120" align="center">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{
                    DivisionName: scope.row.ParentName,
                    DeptName: scope.row.DeptName,
                  }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="岗位" align="center" />
            <el-table-column prop="" label="面试信息" align="center" min-width="85">
              <template #default="scope">
                <div class="bf-button-bl">
                  <el-button link type="primary" @click="openRegisterForm(scope.row.Id)" v-if="scope.row.CharacterScore > 0">登记表</el-button>
                  <el-button link type="danger" @click="openWindow(scope.row)" v-else-if="scope.row.IsInvalid==false">重发信息</el-button>
                  <el-button link type="primary" @click="openWindow(scope.row)" v-else>面试短信</el-button>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="面试官" align="center">
              <el-table-column prop="" label="HR" align="center">
                <template #default="scope">
                  <el-button link v-if="scope.row.HrMarkPoint&&scope.row.HrMarkPoint>0">
                    {{ scope.row.HrName }}</el-button>
                  <el-button link type="warning" @click="openHrScoreWindow(scope.row, 0,'add')" v-else> {{ scope.row.HrName }}</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="" label="初试" align="center">
                <template #default="scope">
                  <el-button link v-if="scope.row.InviewrName&&scope.row.InMarkPoint&&scope.row.InMarkPoint>0" @click="openHrScoreWindow(scope.row, 1,'add')">
                    {{scope.row.InviewrName}}</el-button>
                  <el-button link type="warning" v-else-if="scope.row.InviewrName&&!scope.row.InMarkPoint&&scope.row.InMarkPoint<=0" @click="openHrScoreWindow(scope.row, 1,'add')">
                    {{scope.row.InviewrName}}</el-button>
                  <el-button link type="info" v-else @click="openSelectInterviewerFormWindow(scope.row,1)">选择</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="" label="复试" align="center">
                <template #default="scope">
                  <el-button link v-if="scope.row.SecviewName&&scope.row.SecMarkPoint&&scope.row.SecMarkPoint>0" @click="openHrScoreWindow(scope.row, 2,'add')">
                    {{scope.row.SecviewName}}</el-button>
                  <el-button link v-else-if="scope.row.SecviewName&&!scope.row.SecMarkPoint&&scope.row.SecMarkPoint<=0" @click="openHrScoreWindow(scope.row, 2,'add')"
                    type="warning">
                    {{scope.row.SecviewName}}</el-button>
                  <div v-else-if="scope.row.StepState!=3">-</div>
                  <el-button link type="info" v-else @click="openSelectInterviewerFormWindow(scope.row,2)">选择</el-button>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="面试报告" align="center">
              <el-table-column prop="" label="初试" align="center" min-width="80">
                <template #default="scope">
                  <el-button link v-if="scope.row.HrMarkPoint>0&&(scope.row.InMarkPoint&&scope.row.InMarkPoint>0)" @click="openHrScoreWindow(scope.row, 1,'view')"
                    :type="calculationScore(scope.row,1)>=60?'primary':'danger'">
                    {{calculationScore(scope.row,1)}}分
                  </el-button>
                  <div v-else>-</div>
                </template>
              </el-table-column>
              <el-table-column prop="" label="复试" align="center" min-width="80">
                <template #default="scope">
                  <el-button link :type="calculationScore(scope.row,2)>=60?'primary':'danger'" v-if="scope.row.SecMarkPoint&&scope.row.SecMarkPoint>0"
                    @click="openHrScoreWindow(scope.row, 2,'view')">
                    {{calculationScore(scope.row,2)}}分</el-button>
                  <div v-else>-</div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column prop="Status" label="面试结果" align="center" min-width="80">
              <template #default="scope">
                <div v-for="(item,index) in data.InterviewResult" :key="index" class="bf-button-bl">
                  <el-button v-if="item.DicKey==scope.row.State" :type="item.Remark" link @click="approveEvent(scope.row)">{{item.DicValue}}</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 面试信息表单 -->
    <MsgForm v-if="data.FormWindow.show" @closeWindow="closeWindow" :Id="data.FormWindow.Id" :Uid="data.FormWindow.Uid" :ShareExpireTime="data.FormWindow.ShareExpireTime">
    </MsgForm>
    <!-- 面试登记表表单 -->
    <registerForm v-if="data.openRegisterFormWindow.show" @closeWindow="closeWindow" :Id="data.openRegisterFormWindow.Id"></registerForm>
    <!-- 面试官于HR打分表单 -->
    <ScoreForm v-if="data.openScoreFormWindow.show" @closeWindow="closeWindow" :Id="data.openScoreFormWindow.Id" :Type="data.openScoreFormWindow.Type">
    </ScoreForm>
    <!-- 面试官于HR查看打分表单 -->
    <ViewScoreForm v-if="data.openViewScoreFormWindow.show" @closeWindow="closeWindow" :Id="data.openViewScoreFormWindow.Id" :Type="data.openViewScoreFormWindow.Type">
    </ViewScoreForm>
    <!-- 选择面试官 -->
    <SelectInterviewerForm v-if="data.openSelectInterviewerFormWindow.show" @closeWindow="closeWindow" :DeptId="data.openSelectInterviewerFormWindow.DeptId"
      :PostId="data.openSelectInterviewerFormWindow.PostId" :Id="data.openSelectInterviewerFormWindow.Id" :Type="data.openSelectInterviewerFormWindow.Type"></SelectInterviewerForm>
    <!-- 转入入职 -->
    <TransferInForm @closeWindow="closeWindow" v-if="data.openTransferInFormWindow.show" :Id="data.openTransferInFormWindow.Id"></TransferInForm>
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { GetHRInterViewManagementPage, PostPersonnalInterState } from '/@/api/hr/Interview'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import zStatistic from '../../Components/statistic/Index.vue'
import MsgForm from './_Components/MsgForm.vue'
import registerForm from './_Components/registerForm.vue'
import ScoreForm from './_Components/ScoreForm.vue'
import ViewScoreForm from './_Components/ViewScoreForm.vue'
import SelectInterviewerForm from './_Components/SelectInterviewerForm.vue'
import TransferInForm from './_Components/TransferInForm.vue'
import { parseTime } from '/@/utils/tools'
import { Action, ElMessage, ElMessageBox } from 'element-plus'
const store = useCommonStore() //记得加这一句
const userStore = useLayoutStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetHRInterViewManagementPage(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        element.Suggestion = eval('(' + element.Suggestion + ')')
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 计算面试综合分数
  const calculationScore = (val: any, type: number) => {
    let num = 0
    if (type == 1) {
      num = val.CharacterScore + val.CompanyScore + val.HrMarkPoint + val.InMarkPoint + val.MentalityScore
    } else {
      num = val.CharacterScore + val.CompanyScore + val.HrMarkPoint + val.SecMarkPoint + val.MentalityScore
    }
    return num
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
    form.PostId = ''
    form.time = ''
    form.HRName = ''
    form.BeginDate = ''
    form.EndDate = ''
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.info = row
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
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent,
    calculationScore,
    timeChange,
    typeChange,
    selectRow
  }
}
const window = (form: any, data: any, multipleTableRef: any): any => {
  // 面试管理面试信息弹窗
  const openWindow = (val: any) => {
    data.FormWindow.Id = val.Id
    data.FormWindow.Uid = val.Uid
    data.FormWindow.ShareExpireTime = val.ShareExpireTime
    data.FormWindow.show = true
  }
  // 面试登记表弹窗
  const openRegisterForm = (Id: number) => {
    data.openRegisterFormWindow.Id = Id
    data.openRegisterFormWindow.show = true
  }
  // 打开转入入职
  const openTransferInFormWindow = (val: any) => {
    if (data.info.State == 10 || data.info.State == 5) {
    } else {
      if (data.info.StepState == 3) {
        ElMessage({
          message: '主管级以上岗位需复试',
          type: 'warning'
        })
      } else {
        ElMessage({
          message: '当前状态无权限转入入职',
          type: 'warning'
        })
      }
      return
    }
    if (userStore.getUserInfo.PostIds != 169 && data.info.HrId != userStore.getUserInfo.Id) {
      ElMessage({
        message: '当前登录用户无权限转入入职',
        type: 'warning'
      })
      return
    }

    data.openTransferInFormWindow.show = true
    data.openTransferInFormWindow.Id = data.info.Id
  }
  // 打分 val(选中内容) type(0:hr 1:初试官 2:复试官) viewType(add 添加 view 查看)
  const openHrScoreWindow = (val: any, type: number, viewType: any) => {
    if (val.CharacterScore <= 0) {
      ElMessage({
        message: '未进行性格测试',
        type: 'warning'
      })
      return
    }
    if (type == 1 && val.InMarkPoint && val.InMarkPoint > 0 && viewType == 'add') {
      ElMessage({
        message: '初试面试官已评分结束',
        type: 'warning'
      })
      return
    }
    if (type == 2 && val.InMarkPoint && val.SecMarkPoint > 0 && viewType == 'add') {
      ElMessage({
        message: '复试面试官已评分结束',
        type: 'warning'
      })
      return
    }
    // 添加
    if (viewType == 'add') {
      if (type == 0 && val.HrId != userStore.getUserInfo.Id) {
        ElMessage({
          message: '当前登录用户无权限给HR评分',
          type: 'warning'
        })
        return
      }
      if (type == 1 && val.InviewerId != userStore.getUserInfo.Id) {
        ElMessage({
          message: '当前登录用户无权限给初试评分',
          type: 'warning'
        })
        return
      }
      if (type == 2 && val.SecviewerId != userStore.getUserInfo.Id) {
        ElMessage({
          message: '当前登录用户无权限给复试评分',
          type: 'warning'
        })
        return
      }
      data.openScoreFormWindow.Type = type
      data.openScoreFormWindow.Id = val.Id
      data.openScoreFormWindow.show = true
    } else {
      // 详情
      data.openViewScoreFormWindow.Type = type
      data.openViewScoreFormWindow.Id = val.Id
      data.openViewScoreFormWindow.show = true
    }
  }
  // 选择面试官
  const openSelectInterviewerFormWindow = (val: any, Type: any) => {
    if (val.HrId != userStore.getUserInfo.Id) {
      ElMessage({
        message: '当前登录用户无权限给选择面试官',
        type: 'warning'
      })
      return
    }
    data.openSelectInterviewerFormWindow.Type = Type
    data.openSelectInterviewerFormWindow.Id = val.Id
    data.openSelectInterviewerFormWindow.DeptId = val.DeptId
    data.openSelectInterviewerFormWindow.PostId = val.PostId
    data.openSelectInterviewerFormWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.FormWindow.show = false
    data.openRegisterFormWindow.show = false
    data.openScoreFormWindow.show = false
    data.openViewScoreFormWindow.show = false
    data.openSelectInterviewerFormWindow.show = false
    data.openTransferInFormWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data, multipleTableRef)
    }
  }
  // 审批面试
  const approveEvent = (val: any) => {
    if (val.State == 5) {
      openWindow(val)
    }
    if (val.State != 6) return
    ElMessageBox.confirm(val.InviteName + '最终面试结果已合格，是否通过面试?', {
      title: '面试审核',
      distinguishCancelAndClose: true,
      closeOnClickModal: false,
      confirmButtonText: '通过',
      cancelButtonText: '驳回',
      type: 'warning'
    })
      .then(() => {
        var arr = {
          Id: val.Id,
          Type: '1'
        }
        PostPersonnalInterState(arr).then((res: any) => {
          if (res.code == 1) {
            ElMessage({
              type: 'success',
              message: '通过成功'
            })
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      })
      .catch((action: Action) => {
        if (action === 'close') {
          return
        }
        var arr = {
          Id: val.Id,
          Type: '2'
        }
        PostPersonnalInterState(arr).then((res: any) => {
          if (res.code == 1) {
            ElMessage({
              type: 'success',
              message: '驳回成功'
            })
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      })
  }
  return {
    openWindow,
    closeWindow,
    openHrScoreWindow,
    openRegisterForm,
    openSelectInterviewerFormWindow,
    approveEvent,
    openTransferInFormWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    MsgForm,
    registerForm,
    DepTabridge,
    ScoreForm,
    ViewScoreForm,
    SelectInterviewerForm,
    TransferInForm
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
      deptList: [], //部门数据
      postList: [], //岗位数据
      // 列表选中数据
      info: {},
      single: true,
      // 面试结果
      InterviewResult: [],
      // 面试信息弹窗数据
      FormWindow: {
        show: false
      },
      // 面试登记表弹窗数据
      openRegisterFormWindow: {
        show: false,
        Id: ''
      },
      // HR于面试官打分表弹窗数据
      openScoreFormWindow: {
        show: false,
        Id: ''
      },
      // HR于面试官打分表弹窗数据
      openViewScoreFormWindow: {
        show: false,
        Id: ''
      },
      // 选择面试官
      openSelectInterviewerFormWindow: {
        show: false,
        Id: 0
      },
      // 转入入职
      openTransferInFormWindow: {
        show: false,
        Id: 0
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
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
      // 获取面试结果
      store.getDict('hr_interview_result').then((res: any) => {
        data.InterviewResult = res
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
