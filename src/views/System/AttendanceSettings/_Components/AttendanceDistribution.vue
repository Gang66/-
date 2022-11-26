<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.Form" :rules="rules" label-width="70px" class="bf-window-padding attendanceSetWindow" hide-required-asterisk>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <el-form-item label="事业部门" prop="DepartIds">
            <el-tree-select ref="treeRef" :check-strictly="true" style="width: 100%" :disabled="data.isEdit" placeholder="请选择事业部门" v-model="data.Form.DepartIds" :data="data.sourceData" show-checkbox collapse-tags collapse-tags-tooltip node-key="Id" multiple />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="考勤组" prop="CheckAttendanceGroup">
            <el-select v-model="data.Form.CheckAttendanceGroup" placeholder="请选择考勤组" @change="attNameEvent" filterable style="width: 100%" :disabled="data.isEdit">
              <el-option v-for="item in data.attGroup" :key="item.Id" :label="item.Name" :value="item.Id" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="24">
          <el-form-item label="启用时间" prop="BeginDate">
            <el-date-picker v-model="data.Form.BeginDate" type="date" value-format="YYYY-MM-DD" placeholder="请选择启用时间" style="width: 100%" :disabled="data.isEdit" />
          </el-form-item>
        </el-col>
      </el-row>
      <div v-if="data.Form.CheckAttendanceGroup">
        <el-row :gutter="10">
          <el-col :md="24" :lg="24"
            ><div class="leading-6 text-sm bf-text-color-regular">夏令时：开始时间 {{ data.ruleForm.SummerBeginDate }}，结束时间 {{ data.ruleForm.SummerEndDate }}，上午 {{ data.ruleForm.SummerBeginTime[0] + '-' + data.ruleForm.SummerBeginTime[1] }}，下午 {{ data.ruleForm.SummerEndTime[0] + '-' + data.ruleForm.SummerEndTime[1] }}</div></el-col
          >
        </el-row>
        <el-row :gutter="10">
          <el-col :md="24" :lg="24"
            ><div class="leading-6 text-sm bf-text-color-regular">冬令时：开始时间 {{ data.ruleForm.WinterBeginDate }}，结束时间 {{ data.ruleForm.WinterEndDate }}，上午 {{ data.ruleForm.WinterBeginTime[0] + '-' + data.ruleForm.WinterBeginTime[1] }}，下午 {{ data.ruleForm.WinterEndTime[0] + '-' + data.ruleForm.WinterEndTime[1] }}</div></el-col
          >
        </el-row>
      </div>
      <!-- <el-row :gutter="10">
        <el-col :md="24" :lg="24"
          ><div class="leading-6 text-sm bf-text-color-regular">
            上班时间：<span v-for="(item, index) in data.week" :key="index">{{ item }} <span v-if="index != data.week.length - 1"> 、</span></span>
          </div></el-col
        >
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="24"
          ><div class="leading-6 text-sm bf-text-color-regular">
            更多设置：<span v-if="data.more.IsOnWorkLate"
              >上班后<span>{{ data.more.OnWorkLate }}</span
              >分钟打卡算迟到，</span
            >
            <span v-if="data.more.IsOnWorkAbsenteeism"></span> 上班后{{ data.more.OnWorkAbsenteeism }}分钟打卡算旷工，<span v-if="data.more.IsGoWork">下班前{{ data.more.GoWork }}分钟打卡算早退</span>
          </div></el-col
        >
      </el-row> -->
      <div class="bf-search-formItem mt-4" v-if="data.isEdit == false">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <!-- <el-button @click="getCheckedNodesEvent">查看</el-button> -->
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, Ref, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { PostAddEditCheckAttendanceSave, GetCheckAttendanceInfo, GetCheckAttendancesSelect, PostAddAttendanceByDepartment } from '/@/api/system/attendanceSettings'
import { GetDepartByCheckAttendancesinfo } from '/@/api/system/dept'
const store = useCommonStore() //记得加这一句

// 根据Id获取详情
const GetCheckAttendanceInfoEvent = async (data: any, Id: any) => {
  console.log(Id)
  if (data.isOrg) {
    await GetDepartByCheckAttendancesinfo(Id).then((res) => {
      if (res.code == 1) {
        arr = res.data.checkAttendance
        arr.WeekDay = JSON.parse(arr.WeekDay)
        var SummerTime = JSON.parse(arr.SummerTime)
        var WinterBeginTime = JSON.parse(arr.WinterTime)
        arr.SummerBeginTime = [SummerTime[0], SummerTime[1]]
        arr.SummerEndTime = [SummerTime[2], SummerTime[3]]
        arr.WinterBeginTime = [WinterBeginTime[0], WinterBeginTime[1]]
        arr.WinterEndTime = [WinterBeginTime[2], WinterBeginTime[3]]
        data.ruleForm = arr
        data.Form.BeginDate = res.data.BeginDate
        data.more = JSON.parse(arr.Setting)
        res.data.DepartIds.forEach((val: any) => {
          data.Form.DepartIds.push(val.Id + '')
        })
      } else {
        ElMessage.error(res.message)
      }
    })
  } else {
    if (Id) {
      var arr: any = {}
      await GetCheckAttendanceInfo(Id).then((res) => {
        if (res.code == 1) {
          data.Form.DepartIds = []
          arr = res.data.checkAttendance
          arr.WeekDay = JSON.parse(arr.WeekDay)
          var SummerTime = JSON.parse(arr.SummerTime)
          var WinterBeginTime = JSON.parse(arr.WinterTime)
          arr.SummerBeginTime = [SummerTime[0], SummerTime[1]]
          arr.SummerEndTime = [SummerTime[2], SummerTime[3]]
          arr.WinterBeginTime = [WinterBeginTime[0], WinterBeginTime[1]]
          arr.WinterEndTime = [WinterBeginTime[2], WinterBeginTime[3]]
          data.ruleForm = arr
          data.Form.BeginDate = res.data.BeginDate
          data.more = JSON.parse(arr.Setting)
          res.data.DepartIds.forEach((val: any) => {
            data.Form.DepartIds.push(val.Id + '')
          })
          console.log(data.Form.DepartIds)
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  }
  //  获取组织架构树
  await store.getDeptTree().then((res: any) => {
    data.sourceData = res
  })
  // 获取启用状态
  store.getDict('hr_enb_status').then((res: any) => {
    data.ruleForm.job = res
  })
  // 获取星期
  store.getDict('sys_week_status').then((res: any) => {
    var arr: any = []
    let weekData: any = Object.values(res)
    data.ruleForm.WeekDay.forEach((v: any) => {
      for (var i = 0; i < weekData.length; i++) {
        if (weekData[i].DicKey == v) {
          arr.push(weekData[i].DicValue)
        }
      }
    })
    data.week = arr
  })
  // 获取考勤下拉列表
  GetCheckAttendancesSelect().then((res: any) => {
    data.attGroup = res.data
  })
  return
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostAddAttendanceByDepartment(data.Form).then((res) => {
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
    SummerBeginDate: [{ required: true, message: '请填写夏令时开始日期', trigger: 'blur' }],
    SummerEndDate: [{ required: true, message: '请填写夏令时结束日期', trigger: 'blur' }],
    WinterBeginDate: [{ required: true, message: '请填写冬令时开始日期', trigger: 'blur' }],
    WinterEndDate: [{ required: true, message: '请填写冬令时结束日期', trigger: 'blur' }],
    WeekDay: [{ required: true, message: '请选择上班星期', trigger: 'changge' }],
    SummerBeginTime: [{ required: true, message: '请选择夏令时上午时间', trigger: 'changge' }],
    SummerEndTime: [{ required: true, message: '请选择冬令时下午时间', trigger: 'changge' }],
    WinterBeginTime: [{ required: true, message: '请选择冬令时上午时间', trigger: 'changge' }],
    WinterEndTime: [{ required: true, message: '请选择夏令时下午时间', trigger: 'changge' }],
    Cls: [{ required: true, message: '请选择部门等级', trigger: 'changge' }],
    Role: [{ required: true, message: '请选择部门岗位', trigger: 'changge' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  //   监听考勤组
  const attNameEvent = (val: any) => {
    console.log(val)
    GetCheckAttendanceInfoEvent(data, val)
  }
  return { rules, submitForm, resetForm, ruleFormRef, attNameEvent }
}

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 是否是分配 true是 false不是(作废)
    distribution: {
      type: Boolean,
      default: false
    },
    // 是否可以编辑
    isEdit: {
      type: Boolean,
      default: false
    },
    // 是否适从组件架构点击来的
    isOrg: {
      type: Boolean,
      default: false
    },
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    const treeRef: Ref = ref()
    let data = reactive({
      ruleForm: {
        SummerTime: '',
        WinterTime: '',
        SummerBeginTime: [],
        SummerEndTime: [],
        WinterBeginTime: [],
        WinterEndTime: [],
        SummerBeginDate: '05-01',
        SummerEndDate: '09-30',
        WinterBeginDate: '10-01',
        WinterEndDate: '04-30',
        WeekDay: ['1', '2', '3', '4', '5', '6'],
        job: {}
      },
      Form: {
        // 启用时间
        BeginDate: '',
        // 部门Id
        DepartIds: [],
        // 考勤组Id
        CheckAttendanceGroup: props.Id
      },
      isOrg: props.isOrg, //是否适从组织架构进来的
      isEdit: props.isEdit,
      Id: props.Id,
      week: [], //星期数据
      sourceData: [], //组织架构树数据
      attGroup: [], //考勤组数据
      more: {
        //更多配置
        IsOnWorkLate: false, //上班后打卡迟到
        OnWorkLate: '', //上班后打卡迟到时间
        IsOnWorkAbsenteeism: false, //上班后打卡旷工
        OnWorkAbsenteeism: '', //上班后打卡旷工时间
        IsGoWork: false, //下班后打卡早退
        GoWork: '' //下班后打卡早退时间
      }
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: ''
    })
    const getCheckedNodesEvent = (val: any) => {
      console.log(treeRef.value.getCheckedKeys())
    }
    onMounted(() => {
      GetCheckAttendanceInfoEvent(data, data.Form.CheckAttendanceGroup)
    })

    return { getCheckedNodesEvent, boxStyle, data, closeWindow, ...formEvent(data, closeWindow), treeRef }
  }
})
</script>

<style lang="postcss" scoped>
.attendanceSetWindow {
  :deep .el-checkbox {
    margin-right: 17px;
  }
}
</style>
