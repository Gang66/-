<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="82px" class="bf-window-padding attendanceSetWindow" hide-required-asterisk>
      <el-row :gutter="10">
        <el-col :md="24" :lg="24">
          <el-form-item label="考勤组" prop="Name">
            <el-input v-model="data.ruleForm.Name" placeholder="请填写考勤组" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="bf-search-formItem">
        <el-col :md="24" :lg="12">
          <el-form-item label="【夏】开始" prop="SummerBeginDate">
            <el-input v-model="data.ruleForm.SummerBeginDate" placeholder="请填写夏令时开始时间" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="【夏】结束" prop="SummerEndDate">
            <el-input v-model="data.ruleForm.SummerEndDate" placeholder="请填写夏令时结束时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt-2">
        <el-col :md="24" :lg="12">
          <el-form-item label="【夏】上午" prop="SummerBeginTime">
            <el-time-picker v-model="data.ruleForm.SummerBeginTime" value-format="HH:mm" format="HH:mm" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="【夏】下午" prop="SummerEndTime">
            <el-time-picker v-model="data.ruleForm.SummerEndTime" value-format="HH:mm" format="HH:mm" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="bf-search-formItem">
        <el-col :md="24" :lg="12">
          <el-form-item label="【冬】开始" prop="WinterBeginDate">
            <el-input v-model="data.ruleForm.WinterBeginDate" placeholder="请填写冬令时开始时间" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="【冬】结束" prop="WinterEndDate">
            <el-input v-model="data.ruleForm.WinterEndDate" placeholder="请填写冬令时结束时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt-2">
        <el-col :md="24" :lg="12">
          <el-form-item label="【冬】上午" prop="WinterBeginTime">
            <el-time-picker v-model="data.ruleForm.WinterBeginTime" value-format="HH:mm" format="HH:mm" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="【冬】下午" prop="WinterEndTime">
            <el-time-picker v-model="data.ruleForm.WinterEndTime" value-format="HH:mm" format="HH:mm" is-range range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
          </el-form-item>
        </el-col>
      </el-row>
      <!-- <el-row :gutter="10">
        <el-col :md="24" :lg="24">
          <el-form-item label="上班时间" prop="WeekDay">
            <el-checkbox-group v-model="data.ruleForm.WeekDay">
              <el-checkbox :label="item.DicKey" v-for="(item, index) in data.week" :key="index" :name="item.DicValue">{{ item.DicValue }}</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="bf-search-formItem">
        <el-col :md="24" :lg="12">
          <el-form-item label="更多设置">
            <el-checkbox @change="lateTimeClick" v-model="data.more.IsOnWorkLate" style="margin-right: 20px">
              上班后
              <el-input :disabled="!data.more.IsOnWorkLate" v-model="data.more.OnWorkLate" style="width: 80px; margin: 0 10px" placeholder="时间" type="number"></el-input>
              分钟打卡算迟到
            </el-checkbox>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="" label-width="40px">
            <el-checkbox @change="lateTimeClick" v-model="data.more.IsOnWorkAbsenteeism" style="margin-right: 20px">
              上班后
              <el-input :disabled="!data.more.IsOnWorkAbsenteeism" v-model="data.more.OnWorkAbsenteeism" style="width: 80px; margin: 0 10px" placeholder="时间" type="number"></el-input>
              分钟打卡算旷工
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" class="mt-2 bf-search-formItem">
        <el-col :md="24" :lg="24">
          <el-form-item label="">
            <el-checkbox @change="lateTimeClick" v-model="data.more.IsGoWork" style="margin-right: 20px">
              下班前
              <el-input :disabled="!data.more.IsGoWork" v-model="data.more.GoWork" style="width: 80px; margin: 0 10px" placeholder="时间" type="number"></el-input>
              分钟打卡算早退
            </el-checkbox>
          </el-form-item>
        </el-col>
      </el-row> -->
      <el-row :gutter="10" class="mt-2">
        <el-col :md="24" :lg="24">
          <el-form-item label="是否启用" prop="Status">
            <el-radio-group v-model="data.ruleForm.Status" placeholder="请选择部门状态">
              <el-radio :label="item.DicKey" v-for="(item, index) in data.ruleForm.job" :key="index" :value="item.DicValue">{{ item.DicValue }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <div class="bf-search-formItem">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { PostAddEditCheckAttendanceSave, GetCheckAttendanceInfo } from '/@/api/system/attendanceSettings'
const store = useCommonStore() //记得加这一句
const value1 = ref([new Date(2016, 9, 10, 8, 40), new Date(2016, 9, 10, 9, 40)])
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        data.ruleForm.SummerTime = JSON.stringify(data.ruleForm.SummerBeginTime.concat(data.ruleForm.SummerEndTime))
        data.ruleForm.WinterTime = JSON.stringify(data.ruleForm.WinterBeginTime.concat(data.ruleForm.WinterEndTime))
        data.ruleForm.Setting = JSON.stringify(data.more)
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        delete arr.SummerBeginTime
        delete arr.SummerEndTime
        delete arr.WinterBeginTime
        delete arr.WinterEndTime
        delete arr.job
        arr.WeekDay = JSON.stringify(arr.WeekDay)
        PostAddEditCheckAttendanceSave(arr).then((res) => {
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
    Name: [{ required: true, message: '请填写考勤组', trigger: 'blur' }],
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
  return { rules, submitForm, resetForm, ruleFormRef }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 是否是分配 true是 false不是
    distribution: {
      type: Boolean,
      default: false
    },
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        Name: '',
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
        Status: '1',
        job: {}
      },
      Id: props.Id,
      week: {}, //星期数据
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
      boxWidth: 'w-1/3',
      boxHeight: ''
    })
    // 更多设置按钮点击事件
    const lateTimeClick = (val: any) => {
      console.log(val)
      console.log(data.more)
      // if (this.lateTime == false) {
      // 	this.card.lateTime = null;
      // }
    }
    const GetCheckAttendanceInfoEvent = async () => {
      // 根据Id获取详情
      if (props.Id) {
        var arr: any = {}
        await GetCheckAttendanceInfo(props.Id).then((res) => {
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
            data.more = JSON.parse(arr.Setting)
          } else {
            ElMessage.error(res.message)
          }
        })
      }
      // 获取启用状态
      store.getDict('hr_enb_status').then((res: any) => {
        data.ruleForm.job = res
      })
      // 获取星期
      store.getDict('sys_week_status').then((res: any) => {
        data.week = res
      })
    }
    onMounted(() => {
      GetCheckAttendanceInfoEvent()
    })

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow), value1, lateTimeClick }
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
