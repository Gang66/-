<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="title">
    <!-- <template #topBtn>
      <el-button type="primary" size="small" @click="revokeEvent">撤销</el-button>
    </template> -->
    <div class="bf-window-padding">
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
        <el-row :gutter="0" justify="end" align="middle">
          <el-col :xs="10" :sm="10" :md="10" :lg="10" :xl="10">
            <!-- <img src="/src/assets/img/hr/myWhereabouts/form-tongzhi.png"> -->
            <div class="echart" id="echart-line" :style="{float:'left',width: '100%', height: '130px'}"></div>
          </el-col>
          <el-col :xs="14" :sm="14" :md="14" :lg="14" :xl="14">
            <div class="text-sm">本月出勤率一览：</div>
            <div class="flex mt-8 text-sm">
              <div>出勤率 {{data.LeaveJson.VacationRate.toFixed(2)}}%</div>
              <div class="ml-6">迟到 <span class="bf-error-color font-semibold">{{data.LeaveJson.BeLate}}</span></div>
              <div class="ml-6">早退 <span class="bf-error-color font-semibold">{{data.LeaveJson.LeaveEarly}}</span></div>
              <div class="ml-6">旷工 <span class="bf-error-color font-semibold">{{data.LeaveJson.Absenteeism}}</span></div>
              <div class="ml-6">请假 <span class="bf-error-color font-semibold">{{data.LeaveJson.VacationCount}}</span></div>
            </div>
          </el-col>
        </el-row>
        <div class="mt-2"></div>
        <el-row :gutter="0" align="middle">
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="申请人员" prop="InviteName">
              {{data.LeaveJson.CreateName}}
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="所属部门" prop="InviteName">
              {{data.LeaveJson.DeptName}}
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="职务" prop="InviteName">
              {{data.LeaveJson.PostName}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="0" align="middle">
          <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16">
            <el-form-item label="开始时间" prop="startTimes">
              <el-date-picker v-model="data.ruleForm.startTimes" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="YYYY-MM-DD HH:mm:ss" @change="timeChange" :disabled-date="disabledDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8">
            <el-form-item label="总共" prop="Days">
              <el-input readonly v-model="data.ruleForm.Days" :disabled="true"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="travelForm_section">
          <div class="ts_header flex justify-between">
            <div class="">
              <div class="tsh_title">请假须知：</div>
              <div class="">
                <p>1、公司明确请假务必提前，事由内容不充分一律不批假，病假除外；</p>
                <p>2、出勤率低于98%，扣除全勤奖。</p>
              </div>
            </div>
            <img src="/src/assets/img/hr/myWhereabouts/form-tongzhi.png" class="tsh_bg" />
          </div>
        </div>
        <div class="flex justify-between mt-3">
          <el-form-item label="请假类型" prop="TypeId">
            <el-radio-group v-model="data.ruleForm.TypeId" :disabled="data.isEdit">
              <el-radio v-for="item in data.LeaveData" :key="item.DicKey" :label="item.DicKey">{{ item.DicValue }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-button type="success" @click="$preview(0,retviewurl(data.ImgUrl))" v-if="data.ImgUrl.length>0">
            查看证明
          </el-button>
          <el-button type="primary" @click="openUpload" v-else>
            证明材料
          </el-button>
        </div>
        <el-form-item label="请假原因" prop="Remark">
          <el-input v-model="data.ruleForm.Remark" placeholder="请输入请假原因" type="textarea" :rows="3" :disabled="data.isEdit" />
        </el-form-item>
        <!-- 审批记录 -->
        <slot name="ApprovalProcess"></slot>
        <!-- 提交请假 -->
        <div class="bf-search-formItem mt-4" v-if="!data.isEdit">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </div>
        <!-- 请假审批 -->
        <template v-if="data.viewType==4">
          <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
          <div class="bf-search-formItem ">
            <div class="text-center w-full mt-4">
              <el-button type="danger" @click="ApprovalForm(0)">驳 回</el-button>
              <el-button type="primary" @click="ApprovalForm(1)">审 批</el-button>
            </div>
          </div>
        </template>
      </el-form>
    </div>
  </OpenWindow>
  <!-- 上传图片 -->
  <Upload :uploadFileData="data.ImgUrl" @uploadFileData="uploadFileDataEvent" v-if="data.UploadWindow.view" :isView="data.isEdit" @closeWindow="data.UploadWindow.view=false" title="上传证明材料">
  </Upload>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import Upload from '/@/components/Upload/Index.vue'
import { GetAttendanceVacationInfo, PostAddVacationSave, PostVacationGetDays } from '/@/api/hr/MyWhereabouts'
import { PostApprovalRecordsVacation } from '/@/api/wf/hr/Approval'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  // 获取请假表详情
  var arr: any = { Id: 0, date: parseTime(new Date()) }
  if (data.Id) arr.Id = data.Id
  if (data.time) arr.date = data.time
  GetAttendanceVacationInfo(arr.Id, arr.date)
    .then((res: any) => {
      if (res.code == 1) {
        data.LeaveJson = res.data
        data.ruleForm = res.data
        if (res.data.TypeId) data.ruleForm.TypeId = res.data.TypeId + ''
        if (res.data.ImgUrl) data.ImgUrl = JSON.parse(res.data.ImgUrl)
        if (res.data.BeginTimeSj) {
          data.ruleForm.startTimes = [res.data.BeginTimeSj, res.data.EndTimeSj]
        }
        data.option.series[0].data.push({
          name: '早退',
          value: data.LeaveJson.LeaveEarly
        })
        data.option.series[0].data.push({
          name: '旷工',
          value: data.LeaveJson.Absenteeism
        })
        data.option.series[0].data.push({
          name: '迟到',
          value: data.LeaveJson.BeLate
        })
        data.option.series[0].data.push({
          name: '请假',
          value: data.LeaveJson.VacationCount
        })
        data.getchart.setOption(data.option)
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      ElMessage.error(e.message)
    })
  // 获取请假类别数据
  store.getDict('hr_Leave_state').then((res: any) => {
    data.LeaveData = res
  })
}

// 计算请假时间
const PostVacationGetDaysEvent = (beginTime: string, endTime: string, data: any) => {
  var arr = {
    beginTime: beginTime,
    endTime: endTime,
    UserId: 0
  }
  PostVacationGetDays(arr)
    .then((res) => {
      if (res.code == 1) {
        data.ruleForm.Days = res.data.SumTime
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      ElMessage.error(e.message)
    })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 审批
  const ApprovalForm = (num: number) => {
    var arr = {
      checkId: data.Approval.checkId,
      state: num,
      remark: data.Approval.remark,
      dataid: data.Id
    }
    PostApprovalRecordsVacation(arr).then((res: any) => {
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
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.ImgUrl = JSON.stringify(data.ImgUrl)
        PostAddVacationSave(arr).then((res) => {
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
    startTimes: [{ required: true, message: '请选择请假时间', trigger: 'change' }],
    TypeId: [{ required: true, message: '请选择请假类型', trigger: 'change' }],
    Days: [
      {
        required: true,
        message: '计算请假时长失败，请重新选择请假时间',
        trigger: 'blur'
      }
    ],
    Remark: [
      {
        required: true,
        message: '请填写请假原因',
        trigger: 'blur'
      },
      { min: 10, message: '请假原因最少请填10个字', trigger: 'blur' }
    ]
  })
  const retviewurl = (list: any) => {
    var retlist: any = []
    if (list.length > 0) {
      list.forEach((f: any) => {
        var item = remoteUrl(f.Path)
        retlist.push(item)
      })
    }
    console.log(retlist)
    return retlist
  }
  //   监听请假时间
  const timeChange = (val: any) => {
    if (val[0] && val[1]) {
      if (new Date(val[1]) <= new Date(val[0])) {
        ElMessage.error('结束时间不能小于开始时间')
        return
      }
      data.ruleForm.BeginTime = val[0]
      data.ruleForm.EndTime = val[1]
      PostVacationGetDaysEvent(val[0], val[1], data)
    }
  }
  // 打开上传照片
  const openUpload = () => {
    data.UploadWindow.view = true
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ImgUrl = val
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听上传返回的数据
  const uploadFileData = (val: any) => {
    data.ImgUrl = val
  }
  // 有效期限只能选择当前时间之后
  const disabledDate = (time: Date) => {
    // 8.64e7就是一天的时间戳 24*60*60*1000
    // 根据选择的开始日期，日期范围限定在30天之内
    if (data.ruleForm.TypeId == '2') {
      return (
        time.getTime() < new Date().getTime() - 8.64e7
        // time.getTime() >= new Date().getTime() ||
        // time.getTime() > data.startDate.getTime() + 10 * 8.64e7
      )
    } else {
      return (
        time.getTime() < new Date().getTime()
        // time.getTime() < new Date().getTime() - 8.64e7
        // time.getTime() >= new Date().getTime() ||
        // time.getTime() > data.startDate.getTime() + 10 * 8.64e7
      )
    }

    // 默认只能选择今天以及今天之前的日期
    // return time.getTime() >= new Date().getTime()
  }
  // 撤销
  const revokeEvent = () => {
    ElMessageBox.confirm('是否撤销本条审批?', 'Warning', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        ElMessage({
          type: 'success',
          message: '撤销成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '撤销失败'
        })
      })
  }
  return {
    rules,
    disabledDate,
    submitForm,
    resetForm,
    ruleFormRef,
    uploadFileData,
    timeChange,
    uploadFileDataEvent,
    openUpload,
    ApprovalForm,
    retviewurl,
    revokeEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    Upload
  },
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    },
    //当前请假时间
    time: {
      type: String,
      default: ''
    },
    // 显示类型 1 添加 2修改 3查看 4审批
    viewType: {
      type: Number,
      default: 1
    },
    // 审批checkId
    checkId: {
      type: Number,
      default: null
    },
    // 是否修改
    isEdit: {
      type: Boolean,
      default: false
    },
    // 标题
    title: {
      type: String,
      default: ''
    }
  },
  setup(props, context: SetupContext) {
    const value1 = ref([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)])
    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts
    let data = reactive({
      // defaultTime: [new Date(2000, 1, 1, 12, 0, 0)],
      ImgUrl: [], //上传展示数据
      ruleForm: {
        startTimes: []
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      },
      LeaveData: [],
      LeaveJson: {
        BeLate: 0, //迟到次数
        Absenteeism: 0, //矿工次数
        LeaveEarly: 0, //早退次数
        VacationCount: 0, //请假次数
        VacationRate: 0 //考勤率
      },
      option: {},
      getchart: '',
      Id: props.Id,
      time: props.time,
      viewType: props.viewType,
      isEdit: props.isEdit,
      Approval: {
        checkId: props.checkId,
        remark: ''
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-740',
      boxHeight: ''
    })
    onMounted(async () => {
      if (data.viewType == 3 || data.viewType == 4) {
        data.isEdit = true
      }
      data.option = {
        title: {
          text: '',
          subtext: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          left: 'center',
          top: 'bottom',
          data: ['2', '0', '4', '1']
        },
        toolbox: {
          show: false,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '出勤',
            type: 'pie',
            radius: [10, 60],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 5
            },
            data: []
          }
        ]
      }
      data.getchart = echarts.init(document.getElementById('echart-line') as HTMLElement)
      // 根据Id获取详情
      await GetContractManagementInfoEvent(data)
    })

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow), value1 }
  }
})
</script>

<style lang="postcss" scoped>
.travelForm_section {
  position: relative;
  padding: 10px 14px;
  background: #f8f8ff;
  .ts_header {
    .tsh_title {
      font-size: 12px;
      font-weight: bold;
      color: #e02020;
    }
    p {
      margin: 4px 0;
      font-size: 12px;
      font-weight: bold;
      color: #333333;
    }
    .tsh_bg {
      width: 68px;
      height: 68px;
    }
  }
}
</style>

