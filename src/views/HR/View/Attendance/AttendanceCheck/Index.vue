<template>
  <div class="bf-content AttendanceCheck">
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <tabs :tabList="data.tabList" @handleClick="selectEvent">
        <template #button>
          <div class="flex items-center justify-end AttendanceCheck-screen">
            <filterDatetime @transmitTime="transmitTimeEvent" :list="data.timeList" :format="'{y}-{m}-{d} {h}:{i}:{s}'" :key="data.selectIndex"></filterDatetime>
            <el-select v-model="form.CompId" placeholder="请选择事业部" style="width: 130px" class="ml-2" @change="deptChange">
              <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
            </el-select>
            <el-input v-model="form.UserName" placeholder="姓名" style="width: 100px" class="ml-2" />
            <el-button type="primary" class="ml-2" @click="search">搜索</el-button>
            <el-button type="warning" @click="openCheckWindow" class="ml-2" v-if="data.selectIndex == 0">随机抽检</el-button>
          </div>
        </template>
      </tabs>
      <CheckIndex ref="CheckIndexRef" v-if="data.selectIndex == 0"></CheckIndex>
      <RecordIndex ref="RecordIndexRef" v-else></RecordIndex>
    </div>
  </div>
</template>

<script lang="ts">
import tabs from '/@/components/Tabs/Index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import zStatistic from '../../../Components/statistic/Index.vue'
import CheckIndex from './_Components/CheckIndex.vue'
import RecordIndex from './_Components/RecordIndex.vue'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { parseTime } from '/@/utils/tools'
import { ElMessage } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
export default defineComponent({
  components: {
    zStatistic,
    tabs,
    CheckIndex,
    RecordIndex,
    filterDatetime
  },
  props: {},
  setup() {
    const CheckIndexRef = ref()
    const RecordIndexRef = ref()
    // 筛选数据
    const form: any = reactive({
      page: 1,
      size: 10,
      total: 1,
      UserName: '',
      CompId: ''
    })
    const data = reactive({
      deptList: [], //部门数据
      selectIndex: 0,
      tabList: [
        //tab列表数据
        {
          name: '手动抽检'
        },
        {
          name: '抽检记录'
        }
      ],
      //   时间筛选数据
      timeList: [
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '季', type: 'quarter' },
        { label: '年', type: 'year' }
      ],
      // 打卡记录弹窗数据
      punchInRecordWindow: {
        show: false,
        UserId: 0,
        WorkDayTime: ''
      },
      // 考勤报告弹窗数据
      AttendancereportWindow: {
        show: false,
        UserId: 0,
        WorkDayTime: ''
      }
    })
    // 标题监听
    const selectEvent = (index: number) => {
      data.selectIndex = index
    }
    // 监听时间筛选
    const transmitTimeEvent = (time: any) => {
      if (data.selectIndex == 0) {
        CheckIndexRef.value.form.BeginDate = time.BeginDate
        CheckIndexRef.value.form.EndDate = time.EndDate
        CheckIndexRef.value.search()
      } else {
        RecordIndexRef.value.form.BeginDate = time.BeginDate
        RecordIndexRef.value.form.EndDate = time.EndDate
        RecordIndexRef.value.search()
      }
    }
    // 监听事业部选择
    const deptChange = (val: any) => {
      if (data.selectIndex == 0) {
        CheckIndexRef.value.form.CompId = val
      } else {
        RecordIndexRef.value.form.CompId = val
      }
    }
    // 筛选
    const search = () => {
      if (data.selectIndex == 0) {
        CheckIndexRef.value.form.UserName = form.UserName
        CheckIndexRef.value.search()
      } else {
        RecordIndexRef.value.form.UserName = form.UserName
        RecordIndexRef.value.search()
      }
    }
    // 打开随机抽检
    const openCheckWindow = () => {
      CheckIndexRef.value.data.CheckFormWindow.show = true
    }
    // 打开打卡记录
    const openRecordWindow = () => {
      RecordIndexRef.value.data.RecordFormWindow.show = true
    }
    onMounted(() => {
      // 获取部门列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    return {
      form,
      data,
      selectEvent,
      transmitTimeEvent,
      CheckIndexRef,
      RecordIndexRef,
      openCheckWindow,
      openRecordWindow,
      search,
      deptChange
    }
  }
})
</script>
<style lang="postcss" scoped>
.AttendanceCheck-screen {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
