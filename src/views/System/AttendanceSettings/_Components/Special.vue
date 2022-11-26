<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" label-position="left" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10">
        <el-col :md="24" :lg="24">
          <el-form-item label="类型" prop="conditionType">
            <el-radio-group v-model="data.ruleForm.conditionType">
              <el-radio label="1">考勤调整</el-radio>
              <el-radio label="2">假期调整</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>
      <template v-if="data.ruleForm.conditionType == 1">
        <el-row :gutter="10">
          <el-col :md="24" :lg="24">
            <el-form-item label="考勤日期" prop="beginDate">
              <el-date-picker v-model="data.ruleForm.beginDate" :disabled="data.isEdit" value-format="YYYY-MM-DD" style="width: 100%" class="special_width w-full" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="24" :lg="24">
            <el-form-item label="考勤时间" prop="attendanceTime">
              <el-time-picker is-range v-model="data.ruleForm.attendanceTime" value-format="HH:mm" style="width: 100%" :disabled="data.isEdit" class="special_width" format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :md="24" :lg="24">
            <el-form-item label="条件备注" prop="Remark"><el-input v-model="data.ruleForm.Remark" :disabled="data.isEdit"></el-input></el-form-item>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-row :gutter="10" align="middle" class="bf-search-formItem attendanceSetWindow">
          <div>
            <el-form-item label="" prop="IsWork" label-width="0" class="special_radio_right">
              <el-radio-group v-model="data.ruleForm.IsWork" :disabled="data.isEdit">
                <el-radio label="1">上班</el-radio>
                <el-radio label="2">放假</el-radio>
              </el-radio-group>
            </el-form-item>
          </div>
          <el-col :md="24" :lg="15">
            <el-form-item label="假期时间" prop="IsWorkTime">
              <el-date-picker v-model="data.ruleForm.IsWorkTime" @change="vacationTimeEvent" value-format="YYYY-MM-DD" :disabled="data.isEdit" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <div class="bf-text-color-regular text-sm" v-if="data.days > 0">时长{{ data.days }}天</div>
        </el-row>
        <el-row :gutter="10" class="mt-4">
          <el-col :md="24" :lg="24">
            <el-form-item label="条件备注" prop="remark"><el-input v-model="data.ruleForm.Remark" :disabled="data.isEdit"></el-input></el-form-item>
          </el-col>
        </el-row>
      </template>
      <div class="bf-search-formItem" v-if="data.isEdit == false">
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
import { GetCheckAttendanceRecordInfo, PostAddEditCheckAttendanceRecordSave } from '/@/api/system/attendanceSettings'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        if (arr.IsWorkTime && arr.IsWorkTime.length > 0) {
          arr.IsWorkTime = JSON.stringify(arr.IsWorkTime)
        }
        if (arr.beginDate && arr.beginDate.length > 0) {
          arr.beginDate = JSON.stringify(arr.beginDate)
        }
        if (arr.attendanceTime && arr.attendanceTime.length > 0) {
          arr.attendanceTime = JSON.stringify(arr.attendanceTime)
        }
        PostAddEditCheckAttendanceRecordSave(arr).then((res) => {
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
    beginDate: [{ required: true, message: '请选择考勤日期', trigger: 'changge' }],
    conditionType: [{ required: true, message: '请选择类型', trigger: 'changge' }],
    attendanceTime: [{ required: true, message: '请选择考勤时间', trigger: 'changge' }]
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
    Id: {
      type: Number,
      default: null
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        conditionType: '1',
        attendanceTime: null,
        CheckAttendanceId: props.Id,
        Remark: '',
        beginDate: '',
        IsWork: '',
        IsWorkTime: '',
        job: {},
        Id: 0 //主键Id
      },
      isEdit: props.isEdit, //是否可以修改
      days: 0, //相差天数
      isView: false
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-520',
      boxHeight: ''
    })
    // 更多设置按钮点击事件
    const lateTimeClick = () => {
      // if (this.lateTime == false) {
      // 	this.card.lateTime = null;
      // }
    }
    // 监听假期时间
    const vacationTimeEvent = (val: any) => {
      var startDate = new Date(val[0])
      var endDate = new Date(val[1])
      var date3 = endDate.getTime() - new Date(startDate).getTime()
      //计算出相差天数
      data.days = Math.floor(date3 / (24 * 3600 * 1000))
      console.log(data.days)
    }
    onMounted(() => {
      // 根据Id获取详情
      if (props.Id) {
        GetCheckAttendanceRecordInfo(props.Id).then((res) => {
          if (res.code == 1) {
            if (res.data) {
              if (data.isEdit) {
                if (res.data.IsWorkTime) {
                  res.data.IsWorkTime = JSON.parse(res.data.IsWorkTime)
                  vacationTimeEvent(res.data.IsWorkTime)
                }
                if (res.data.beginDate) {
                  res.data.beginDate = JSON.parse(res.data.beginDate)
                }
                if (res.data.attendanceTime) {
                  res.data.attendanceTime = JSON.parse(res.data.attendanceTime)
                }
                data.ruleForm = res.data
              }
              data.ruleForm.Id = res.data.Id
            }
          } else {
            ElMessage.error(res.message)
          }
        })
      }
      // 获取启用状态
      store.getDict('hr_enb_status').then((res: any) => {
        data.ruleForm.job = res
      })
    })

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow), lateTimeClick, vacationTimeEvent }
  }
})
</script>

<style lang="postcss" scoped>
.attendanceSetWindow {
  :deep .el-radio {
    margin-right: 10px;
  }
}
</style>
