<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="考勤报告">
    <div class="bf-window-padding Attendancereport">
      <header class="attendanceReport_header">
        <div class="header_top flex justify-between items-start">
          <div class="ht_left flex items-center font-semibold">
            <div class="mr-1">累计统计量</div>
            <el-icon>
              <el-icon-FolderChecked />
            </el-icon>
          </div>
          <div class="ht_right">
            <!-- 筛选时间 -->
            <filterDatetime @transmitTime="transmitTimeEvent" :format="'{y}-{m}-{d} {h}:{i}:{s}'" :list="data.timeList"></filterDatetime>
          </div>
        </div>
        <div class="header_bottom flex justify-between">
          <div class="hb_section cursor-pointer" v-for="(item, index) in data.faceAttendanceStatisticsCompList" :key="index" :class="[index == 1 ? 'hb_section_green' : index == 2 ? 'hb_section_purple' : index == 3 ? 'hb_section_yellow' : '', item.OrganizedDeptInfo.Id == data.currDaQuId ? 'hb_sectionSelect' : '']" @click="currDaQuIdClick(item.OrganizedDeptInfo.Id)">
            <div class="hbs_title">{{ item.OrganizedDeptInfo.Name }}</div>
            <div class="flex justify-between">
              <div class="hbs_block">
                <div class="hbsb_value">{{ item.ActualTotal }}</div>
                <div class="hbsb_label">实出勤</div>
              </div>
              <div class="hbs_block">
                <div class="hbsb_value">{{ item.ShouldTotal }}</div>
                <div class="hbsb_label">应出勤</div>
              </div>
              <div class="hbs_block" @click="handleOpenDialogViewUserList(item.ResignUserList, '离职人员')">
                <div class="hbsb_value">{{ item.ResignTotal }}</div>
                <div class="hbsb_label">离职人</div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main class="attendanceReport_main" v-for="(item, index) in data.currList" :key="index">
        <div class="main_collapse flex justify-between items-center">
          <div class="flex items-center">
            <div class="flex mc_left">
              <div class="mcl_name">{{ item.Name }}</div>
              <div class="mcl_value">
                出勤量：{{ getScale(item.ActualTotal, item.ShouldTotal) }}% <span class="cursor-pointer" @click="handleOpenDialogViewUserList(item.ResignUserList)">离职：{{ item.ResignTotal }}</span>
              </div>
            </div>
            <div class="flex mc_right items-center" v-for="(t, i) in item.WorkTypeStatisticsList" :key="i">
              <div :class="t.WorkType == 1 ? 'mcr_bg' : 'mc_right_green'" class="mcr_bg">{{ getWorkTypeName(t.WorkType) }}</div>
              <div class="mcr_label">
                异常
                <span class="mcr_value" @click="handleOpenDialogViewAbnormal(t, 'AbsenteeismTotal')">{{ t.AbsenteeismTotal }}</span>
              </div>
              <div class="mcr_label">
                出差
                <span class="mcr_value" @click="handleOpenDialogViewAbnormal(t, 'RecordsEvectionTotal')">{{ t.RecordsEvectionTotal }}</span>
              </div>
              <div class="mcr_label">
                请假
                <span class="mcr_value" @click="handleOpenDialogViewAbnormal(t, 'LeaveTotal')">{{ t.LeaveTotal }}</span>
              </div>
            </div>
          </div>
          <div class="cursor" v-if="item.isOpen == false" @click="item.isOpen = true">展开</div>
          <div class="cursor" v-else @click="item.isOpen = false">收起</div>
        </div>
        <div class="main_collapse_item" v-if="item.isOpen">
          <div class="mci_section mb-3" v-for="(row, j) in item.ChildrenList" :key="j" :style="{ marginRight: (j + 1) % 3 == 0 ? '0' : '' }">
            <div class="mcis_top">
              <div class="mcis_bg">{{ row.Name }}</div>
            </div>
            <div class="mcis_bottom">
              <div class="flex" v-for="(t, i) in row.WorkTypeStatisticsList" :key="i">
                <div class="mcisb_num">{{ getWorkTypeName(t.WorkType) }} {{ t.ActualTotal + '/' + t.ShouldTotal }}</div>
                <div class="mcisb_num" @click="handleOpenDialogViewAbnormal(t, 'AbsenteeismTotal')">异常 {{ t.AbsenteeismTotal }}</div>
                <div class="mcisb_num" @click="handleOpenDialogViewAbnormal(t, 'RecordsEvectionTotal')">出差 {{ t.RecordsEvectionTotal }}</div>
                <div class="mcisb_num" @click="handleOpenDialogViewAbnormal(t, 'LeaveTotal')">请假 {{ t.LeaveTotal }}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </OpenWindow>
  <!-- 异常弹窗 -->
  <AttendanceAbnormal v-if="data.AttendanceAbnormalWindow.show" :dialogTitle="data.AttendanceAbnormalWindow.currAbnormalTitle + '人员'" :dialogData="data.AttendanceAbnormalWindow.currAbnormalUserList" @closeWindow="data.AttendanceAbnormalWindow.show = false"></AttendanceAbnormal>
</template>

<script lang="ts">
import { remoteUrl } from '/@/utils/tools'
import { parseTime } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import AttendanceAbnormal from './AttendanceAbnormal.vue'
import { computed, defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { PostSaveStaffFileArchiving } from '/@/api/hr/Induction'
import { PostGetFaceAttendanceStatisticsData } from '/@/api/hr/AttendanceManage'
import { useLayoutStore } from '/@/store/modules/layout'
const lStore = useLayoutStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostSaveStaffFileArchiving(data.ruleForm).then((res) => {
          if (res.code == 1) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    InterViewDate: [{ required: true, message: '请选择面试日期', trigger: 'change' }],
    InterViewTime: [{ required: true, message: '请选择面试时间段', trigger: 'change' }],
    InterViewWay: [{ required: true, message: '请选择面试方式', trigger: 'change' }],
    InterViewerName: [{ required: true, message: '请选择面试官', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // 根据上传文件拼接路径
  const remoteUrlEvent = (url: string) => {
    return remoteUrl(url)
  }
  //获取比例
  const getScale = (actualTotal: any, shouldTotal: any) => {
    var _actualTotal = Number(actualTotal || 0)
    var _shouldTotal = Number(shouldTotal || 0)
    if (_shouldTotal == 0) return 0
    else return ((_actualTotal / _shouldTotal) * 100).toFixed(0)
  }
  //考勤类型
  const getWorkTypeName = (workType: any) => {
    var str = '-'
    switch (workType) {
      case 1:
        str = '上午'
        break
      case 2:
        str = '下午'
        break
      case 100:
        str = '全天'
        break
    }
    return str
  }
  //打开查看离职人员列表窗口
  const handleOpenDialogViewUserList = (row: any, title: string) => {
    var _list: any = []

    ;(row || []).forEach((item: any) => {
      _list.push({
        UserName: item.RealName,
        CompId: item.CompId,
        DeptId: item.DeptId
      })
    })
    data.formArr = _list
    data.viewUserTitle = title

    if (data.formArr.length > 0) data.isVisibleUserListView = true
    else ElMessage.error('暂无数据！')
  }
  //打开考勤异常明细弹窗
  const handleOpenDialogViewAbnormal = (row: any, fieldName: string) => {
    if (Number(row[fieldName] || 0) > 0) {
      var _currAbnormalUserList: any = []
      var _itemFieldName = (fieldName || '').replace('Total', '')
      ;(row.UserList || []).forEach((item: any) => {
        if (Number(item[_itemFieldName] || 0) > 0) _currAbnormalUserList.push(item)
      })

      var _currAbnormalTitle = ''
      if (_currAbnormalUserList.length > 0) {
        var _abnormalObj = _currAbnormalUserList[0] || {}
        _currAbnormalTitle += parseTime(_abnormalObj.date, '{y}-{m}-{d}')
        // _currAbnormalTitle+='('+(this.typeOption.find((x:any)=> {return x.value==_abnormalObj.type})||{}).label+')'
        _currAbnormalTitle += getWorkTypeName(_abnormalObj.WorkType)

        switch (_itemFieldName) {
          case 'Absenteeism':
            _currAbnormalTitle += '考勤异常'
            break
          case 'RecordsEvection':
            _currAbnormalTitle += '出差(含公差)'
            break
          case 'Leave':
            _currAbnormalTitle += '请假'
            break
        }
      }
      data.AttendanceAbnormalWindow.currAbnormalTitle = _currAbnormalTitle
      data.AttendanceAbnormalWindow.currAbnormalUserList = _currAbnormalUserList
      console.log(_currAbnormalUserList)

      data.AttendanceAbnormalWindow.show = true
    } else {
      ElMessage.error('暂无数据！')
    }
  }
  // 点击获取大区Id
  const currDaQuIdClick = (Id: number) => {
    data.currDaQuId = Id
  }
  // 监听时间筛选
  const transmitTimeEvent = (time: any) => {
    data.BeginDate = time.BeginDate
    data.EndDate = time.EndDate
    GetContractManagementInfoEvent(data)
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    parseTimeEvent,
    remoteUrlEvent,
    transmitTimeEvent,
    getScale,
    getWorkTypeName,
    currDaQuIdClick,
    handleOpenDialogViewUserList,
    handleOpenDialogViewAbnormal
  }
}
// 弹窗事件
const GetContractManagementInfoEvent = async (data: any) => {
  var arr = {
    userId: lStore.getUserInfo.Id,
    // userId: 1,
    BeginDate: data.BeginDate,
    EndDate: data.EndDate
  }
  PostGetFaceAttendanceStatisticsData(arr).then((res: any) => {
    if (res.code == 1) {
      data.faceAttendanceStatisticsCompList = res.data.FaceAttendanceStatisticsCompList
      data.currDaQuId = data.faceAttendanceStatisticsCompList[0].OrganizedDeptInfo.Id
      data.faceAttendanceStatisticsDeptList = res.data.FaceAttendanceStatisticsDeptList
    } else {
      ElMessage.error(res.message)
    }
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    filterDatetime,
    AttendanceAbnormal
  },
  emits: ['closeWindow'],
  props: {},
  setup(props, context: SetupContext) {
    const checkedCities = ref()
    let data: any = reactive({
      timeList: [
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '季', type: 'quarter' },
        { label: '年', type: 'year' }
      ], //时间筛选列表
      ruleForm: {},
      faceAttendanceStatisticsCompList: [], //大区数据
      faceAttendanceStatisticsDeptList: [], //事业部数据
      currList: [], //根据大区Id计算事业部数据
      currDaQuId: 0, //大区Id 根据Id查询子类数据
      AttendanceAbnormalWindow: {
        //异常弹窗
        show: false,
        Id: 0,
        currAbnormalTitle: '', //异常数据弹窗标题
        currAbnormalUserList: [] //异常数据弹窗列表
      },
      formArr: [], //离职人员弹窗数据
      viewUserTitle: [], //离职人员弹窗标题
      BeginDate: parseTime(new Date()), //开始日期
      EndDate: parseTime(new Date()) //结束日期
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-800',
      boxHeight: ''
    })
    data.currList = computed(() => {
      var _currDaQuId = data.currDaQuId
      var _list = data.faceAttendanceStatisticsDeptList.filter((x: any) => {
        return _currDaQuId == x.ParentId
      })
      if (data.faceAttendanceStatisticsCompList.length <= 0) _list = data.faceAttendanceStatisticsDeptList
      _list.forEach((item: any, index: number) => {
        if (index == 0) item.isOpen = true
        else item.isOpen = false
      })
      return _list
    })
    onMounted(() => {
      // 根据userId获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      checkedCities,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.Attendancereport {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
  .attendanceReport_header {
    margin-bottom: 20px;
    .header_top {
      .ht_left {
        color: #516bdb;
        .ht_icon {
          margin-left: 2px;
          font-size: 16px;
        }
      }
      .ht_right {
      }
    }
    .header_bottom {
      margin-top: 25px;
      .hb_section_green {
        background: linear-gradient(180deg, #f3fffa 0%, #c0efcc 100%) !important;
        border: 1px solid #a6d8b0 !important;
      }
      .hb_section_purple {
        background: linear-gradient(180deg, #fbf3ff 0%, #e9e3ff 100%) !important;
        border: 1px solid #d3a7e0 !important;
      }
      .hb_section_yellow {
        background: linear-gradient(180deg, #fffaf3 0%, #ffede3 100%) !important;
        border: 1px solid #ffdebf !important;
      }
      .hb_sectionSelect {
        border-width: 4px !important;
        padding: 6px 11px !important;
      }
      .hb_section {
        text-align: center;
        padding: 10px 15px;
        width: 178px;
        height: 109px;
        background: linear-gradient(180deg, #f3f7ff 0%, #e3edff 100%);
        border-radius: 4px;
        border: 1px solid #bfcbff;
        .hbs_title {
          font-size: 14px;
          font-weight: bold;
          color: #434343;
          margin-bottom: 15px;
        }
        .hbs_block {
          width: 33.3%;
          .hbsb_value {
            font-size: 24px;
            font-weight: bold;
            color: #434343;
            line-height: 1.4;
          }
          .hbsb_label {
            font-size: 12px;
            font-weight: bold;
            color: #434343;
          }
        }
      }
    }
  }
  .attendanceReport_main {
    .main_collapse {
      margin-top: 10px;
      height: 36px;
      background: #d7e0ff;
      padding: 0 15px;
      .mc_left {
        .mcl_name {
          font-size: 14px;
          font-weight: bold;
          color: #333333;
        }
        .mcl_value {
          margin-left: 20px;
          font-size: 12px;
          font-weight: 400;
          color: #333333;
        }
      }
      .mc_right_green {
        background: #80ca66 !important;
      }
      .mc_right {
        .mcr_bg {
          margin-left: 10px;
          color: #fff;
          text-align: center;
          line-height: 24px;
          width: 48px;
          height: 24px;
          background: #ff974d;
          border-radius: 12px;
        }
        .mcr_label {
          margin-left: 10px;
          font-size: 12px;
          font-weight: bold;
          color: #333333;
        }
        .mcr_value {
          font-size: 12px;
          color: #e02020;
          cursor: pointer;
        }
      }
      .cursor {
        cursor: pointer;
      }
    }
    .main_collapse_item {
      overflow: hidden;
      padding: 14px 21px;
      border: 1px solid #eeeeee;
      border-top: none;
      .mci_section {
        margin-right: 20px;
        float: left;
        position: relative;
        width: 228px;
        height: 89px;
        background: #eeeeee;
        border-radius: 4px;
        .mcis_top {
          height: 32px;
          .mcis_bg {
            left: -4px;
            top: 2px;
            position: absolute;
            padding-left: 10px;
            width: 117px;
            height: 29px;
            line-height: 34px;
            background: url(../../../assets/images/attendance/attendanceReport_bg.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .mcis_bottom {
          margin-top: 10px;
          padding: 0 10px;
          .mcisb_num {
            width: 25%;
            text-align: center;
            font-size: 12px;
            font-weight: 400;
            color: #333333;
          }
        }
      }
    }
  }
}
</style>
