<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" class="formalForm">
    <template #title>
      <div class="flex justify-between items-center py-2 px-3 border-bottom">
        <div class="text-sm">员工正式期报告</div>
        <div class="flex items-center">
          <el-icon class="ml-3 cursor-pointer" @click="closeWindow('close')">
            <el-icon-Close />
          </el-icon>
        </div>
      </div>
    </template>
    <div class="px-7 py-4">
      <div class="flex justify-between">
        <div class="h-full relative" style="width: 67%">
          <div class="flex justify-between h-full pr-16">
            <div class="flex items-end content_text-lg">
              <div class="text-lg font-semibold">{{ data.ruleForm.Name }}</div>
              <div class="text-xs ml-3">
                <!-- <span class="bf-warning-color">{{data.ruleForm.WeekNumber}}周</span> -->
                <span class="ml-1">{{ parseTimeEvent(data.ruleForm.BeginDate) }}~{{ parseTimeEvent(data.ruleForm.EndDate).substring(5) }}</span>
              </div>
            </div>
            <div>
              <span class="text-3xl font-semibold bf-font-blue-color">{{ data.ruleForm.TotalScore }}</span> <span class="text-xs">分</span>
            </div>
            <img src="/src/assets/img/hr/hege.png" class="content_chapter" v-if="data.ruleForm.TotalScore >= 60" />
            <img src="/src/assets/img/hr/buhege.png" class="content_chapter" />
          </div>
          <div class="content-header-bg mt-2 px-3 py-4">
            <div class="flex">
              <div class="w-2/6 text-xs">姓名：{{ data.ruleForm.Name }}</div>
              <div class="w-2/6 text-xs" v-if="data.ruleForm.Sex">
                <template v-for="(item, index) in data.gender">
                  <span v-if="item.DicKey == data.ruleForm.Sex">性别：{{ item.DicValue }}</span>
                </template>
              </div>
              <div class="w-2/6 text-xs">性别：未知</div>
              <div class="w-2/6 text-xs">年龄：{{ data.ruleForm.Age }}</div>
            </div>
            <div class="flex mt-2">
              <div class="w-2/6 text-xs">电话：{{ data.ruleForm.Phone }}</div>
              <div class="w-2/6 text-xs">事业部：{{ data.ruleForm.CompName }}</div>
              <div class="w-2/6 text-xs">岗位：{{ data.ruleForm.PostName }}</div>
            </div>
          </div>
        </div>
        <div style="width: 30%"><img src="/src/assets/img/hr/Staff/gongzuobaogao.png" class="content_image" /></div>
      </div>
      <div class="text-sm mt-2">我在{{ parseTimeEvent(data.ruleForm.ComeDate) }}加入这个大家庭，现在已是第2周，成为坚持下来的第68位成员。</div>
      <div class="mt-7">
        <div class="flex justify-between">
          <div class="w-1/2">
            <div class="flex items-center">
              <div class="trial_report_content_hr" />
              <div class="trial_report_content_title">考勤情况</div>
              <div class="trial_report_content_num">{{ data.ruleForm.AttendanceSorce }}分</div>
            </div>
            <div class="border mr-3 mt-2">
              <div class="flex border-bottom py-3 mx-2">
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.ShouldAttenDay }}</div>
                  <div class="trial_main_section_label">应出勤</div>
                </div>
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.OnDuty }}</div>
                  <div class="trial_main_section_label">在岗(天)</div>
                </div>
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.BusinessTravel }}</div>
                  <div class="trial_main_section_label">出差(天）</div>
                </div>
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.AttenRate }}</div>
                  <div class="trial_main_section_label">出勤率(%)</div>
                </div>
              </div>
              <div class="flex py-2 mx-2" style="padding: 11px">
                <div class="trial_main_section" style="width: 33.3333%">
                  <div class="trial_main_section_value">{{ data.ruleForm.LateMinute }}/{{ data.ruleForm.LateNumber }}</div>
                  <div class="trial_main_section_label">迟到(分/次)</div>
                </div>
                <div class="trial_main_section" style="width: 33.3333%">
                  <div class="trial_main_section_value">{{ data.ruleForm.LeaveMinute }}/{{ data.ruleForm.LeaveNumber }}</div>
                  <div class="trial_main_section_label">请假(分/次)</div>
                </div>
                <div class="trial_main_section" style="width: 33.3333%">
                  <div class="trial_main_section_value">{{ data.ruleForm.AbsenteeismMinute }}/{{ data.ruleForm.AbsenteeismNumber }}</div>
                  <div class="trial_main_section_label">旷工(分/次)</div>
                </div>
              </div>
            </div>
          </div>
          <div class="w-1/2">
            <div class="flex items-center">
              <div class="trial_report_content_hr" />
              <div class="trial_report_content_title">工作得分</div>
              <div class="trial_report_content_num">{{ data.ruleForm.WorkScore }}分</div>
            </div>
            <div class="border h-16 mt-2">
              <div class="flex py-3 mx-2">
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.CustomerNumber }}/{{ data.ruleForm.SetCustomeNumber }}</div>
                  <div class="trial_main_section_label">客户量(个)</div>
                </div>
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.OfferNumber }}/{{ data.ruleForm.SetOfferNumber }}</div>
                  <div class="trial_main_section_label">报价量(万)</div>
                </div>
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.MoneyAmount }}/{{ data.ruleForm.SetMoneyAmount }}</div>
                  <div class="trial_main_section_label">金额量(万)</div>
                </div>
                <div class="trial_main_section">
                  <div class="trial_main_section_value">{{ data.ruleForm.ChannelNumber }}/{{ data.ruleForm.SetChannelNumber }}</div>
                  <div class="trial_main_section_label">渠道量(个)</div>
                </div>
              </div>
            </div>
            <div class="flex items-center mt-2">
              <div class="trial_report_content_hr" />
              <div class="trial_report_content_title">代金券使用情况</div>
            </div>
            <div class="border h-8 mt-2">
              <div class="flex py-2 mx-2">
                <div class="trial_main_section flex" style="width: 100%">
                  <div class="trial_main_section_label">考勤已用<span class="bf-font-blue-color">1</span>剩余<span class="bf-warning-color">2</span>个</div>
                  <div class="trial_main_section_label ml-4">考勤已用<span class="bf-font-blue-color">1</span>剩余<span class="bf-warning-color">2</span>个</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-5">
        <div class="flex items-center">
          <div class="trial_report_content_hr" />
          <div class="trial_report_content_title">业绩情况</div>
          <div class="trial_report_content_num">{{ data.ruleForm.AchievementScore }}分</div>
        </div>
        <div class="mt-3 mb-1 text-sm">业绩量(万)：{{ data.ruleForm.SetAchievementNumber }} / {{ data.ruleForm.SetAchievementNumber }}</div>
        <el-table :data="data.tableData" style="width: 100%" stripe>
          <el-table-column prop="address" label="成交时间"></el-table-column>
          <el-table-column prop="address" label="单位" align="center"></el-table-column>
          <el-table-column prop="address" label="金额（万）" align="right"></el-table-column>
        </el-table>
      </div>
      <div class="mt-5">
        <div class="flex items-center">
          <div class="trial_report_content_hr" />
          <div class="trial_report_content_title">关停情况</div>
          <div class="trial_report_content_num">95分</div>
        </div>
        <div class="mt-3 mb-1 text-sm">关停次数：2</div>
        <el-table :data="data.tableData" style="width: 100%" stripe>
          <el-table-column prop="address" label="关停时间"></el-table-column>
          <el-table-column prop="address" label="关停原因" align="center"></el-table-column>
          <el-table-column prop="address" label="解锁时间" align="right"></el-table-column>
        </el-table>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetAttendanceVacationInfo, PostAddVacationSave } from '/@/api/hr/MyWhereabouts'
import { parseTime } from '/@/utils/tools'
import { GetAdjustSalaryReportInfo } from '/@/api/hr/Staff'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetAdjustSalaryReportInfo(data.Id)
      .then((res: any) => {
        if (res.code == 1) {
          data.ruleForm = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
      .catch((e) => {
        ElMessage.error(e.message)
      })
  }
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  //时间转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}年{m}月{d}日')
  }
  return {
    ruleFormRef,
    parseTimeEvent
  }
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
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {},
      gender: [], //性别数据
      tableData: [],
      Id: props.Id
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: '',
      boxPaddingTop: 'pt-10'
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return { boxStyle, data, closeWindow, ...formEvent(data, closeWindow) }
  }
})
</script>

<style lang="postcss" scoped>
.formalForm {
  :deep(.w-700) {
    border-radius: 9px;
  }
  .border-bottom {
    border-bottom: 1px solid var(--el-border-color);
  }
  .content_image {
    width: 188px;
    height: 120px;
  }
  .content_chapter {
    position: absolute;
    width: 56px;
    height: 56px;
    top: -10px;
    right: 0px;
  }
  .content_text-lg {
    :deep(.text-lg) {
      line-height: normal;
    }
    :deep(.text-3xl) {
      line-height: normal;
    }
  }
  .content-header-bg {
    background: #fcfbfc;
  }
  .trial_report_content_hr {
    width: 4px;
    height: 16px;
    background: #5684ef;
  }
  .trial_report_content_num {
    font-size: 14px;
    color: #468bfd;
    margin-left: 8px;
  }
  .trial_report_content_title {
    margin-left: 4px;
    font-size: 14px;
    color: #333333;
  }
  .trial_main_section {
    width: 25%;
    .trial_main_section_value {
      font-weight: bold;
      text-align: center;
      font-size: 16px;
    }
    .trial_main_section_label {
      font-size: 12px;
      color: var(--el-text-color-regular);
      text-align: center;
    }
  }
  :deep(.el-table th.el-table__cell) {
    background: #f5f6f7;
    color: var(--el-text-color-primary) !important;
  }
  .select_time {
    color: #0054ca;
  }
}
</style>

