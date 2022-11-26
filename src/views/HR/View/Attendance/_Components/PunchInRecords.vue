<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="打卡记录">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="70px" class="bf-window-padding ArchiveForm" hide-required-asterisk>
      <div class="">
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24" :lg="24" v-for="(item, index) in data.AttendanceUserWorkTimeList" :key="index">
            <div class="flex items-center">
              <el-avatar :size="60" fit="cover" :src="item.ImageSrc ? remoteUrlEvent(item.ImageSrc) : data.circleUrl" />
              <div class="ml-4 w-10/12">
                <div class="text-sm leading-6">
                  <span>{{ item.Title }}</span>
                  <span :class="item.Abnormal == 0 ? 'bf-font-blue-color' : 'bf-error-color'" v-for="(val, i) in data.attendanceState" :key="index"
                    ><template v-if="item.Abnormal == val.DicKey">{{ val.DicValue }}</template></span
                  >
                </div>
                <div class="text-sm leading-6">
                  <span>打卡时间</span> <span class="ml-2">{{ item.CreateOn ? item.CreateOn : '-' }}</span>
                </div>
                <div class="text-sm leading-0">
                  <span>打卡地点</span> <span class="ml-2">{{ item.AddrStr ? item.AddrStr : '-' }}</span>
                </div>
              </div>
            </div>
            <el-divider />
          </el-col>
        </el-row>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import { remoteUrl } from '/@/utils/tools'
import { parseTime } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext, toRefs } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetStaffFileArchiving, PostSaveStaffFileArchiving } from '/@/api/hr/Induction'
import { PostGetUserWorkTimeLogList } from '/@/api/hr/AttendanceManage'
import { useLayoutStore } from '/@/store/modules/layout'
const store = useCommonStore() //记得加这一句
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
  const rules = reactive<FormRules>({})
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
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    parseTimeEvent,
    remoteUrlEvent
  }
}
// 弹窗事件
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.UserId) {
    var arr = {
      userId: data.UserId ? data.UserId : lStore.getUserInfo.Id,
      startDate: data.WorkDayTime ? data.WorkDayTime : parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}')
    }
    PostGetUserWorkTimeLogList(arr).then((res: any) => {
      if (res.code == 1) {
        res.data.AttendanceUserWorkTimeList.forEach((v: any) => {
          res.data.FaceMatchList.forEach((val: any, index: number) => {
            if (v.InputId == val.Id) {
              v.AddrStr = val.AddrStr
              v.ImageSrc = val.ImageSrc
              v.CreateOn = val.CreateOn
              v.RegisterImageSrc = val.RegisterImageSrc
            }
          })
        })
        data.AttendanceUserWorkTimeList = res.data.AttendanceUserWorkTimeList
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 获取打卡状态
  store.getDict('hr_attendance_state').then((res: any) => {
    data.attendanceState = res
  })
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    UserId: {
      type: Number,
      default: null
    },
    // 打卡时间
    WorkDayTime: {
      type: String,
      default: ''
    }
  },
  setup(props, context: SetupContext) {
    const checkedCities = ref()
    let data: any = reactive({
      circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      AttendanceUserWorkTimeList: [], //考勤列表记录
      ruleForm: {},
      attendanceState: {}, //打卡状态
      // 查看详情Id
      UserId: props.UserId,
      WorkDayTime: props.WorkDayTime
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-650',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
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
.images {
  width: 96px;
  height: 97px;
}
.ArchiveForm {
  :deep(.el-checkbox) {
    margin-right: 29px;
  }
}
#container {
  padding: 0px;
  margin: 0px;
  width: 100%;
  height: 500px;
  cursor: pointer;
}
.input-card .btn {
  margin-right: 1.2rem;
  width: 9rem;
}

.input-card .btn:last-child {
  margin-right: 0;
}
:deep(.el-divider--horizontal) {
  display: block;
  height: 1px;
  width: 100%;
  margin: 16px 0;
  border-top: 1px solid #eeeeee;
}
:deep(.el-avatar--circle) {
  img {
    width: inherit;
  }
}
</style>
