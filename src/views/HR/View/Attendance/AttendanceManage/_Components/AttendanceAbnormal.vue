<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="dialogTitle">
    <div class="bf-window-padding bf-table-content">
      <el-table :data="data.tableData" class="w-full" @selection-change="handleSelectionChange">
        <el-table-column type="index" label="序号" width="54" align="center" />
        <el-table-column prop="" label="日期" width="110">
          <template #default="scope">
            {{ parseTimeEvent(scope.row.date) }}
          </template>
        </el-table-column>
        <el-table-column prop="DateNumber" label="类型">
          <template #default="scope">
            {{getWorkTypeName(scope.row.WorkType)}}
          </template>
        </el-table-column>
        <el-table-column prop="RealName" label="姓名" />
        <el-table-column prop="DateNumber" label="部门">
          <template #default="scope">
            <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
          </template>
        </el-table-column>
        <el-table-column prop="AdminName" label="领导" />
        <el-table-column prop="DateNumber" label="异常时长(分)" width="110" align="center">
          <template #default="scope">
            <div class="bf-font-blue-color">
              {{getNumToFixed(scope.row.Absenteeism)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="DateNumber" label="出差时长(分)" width="110" align="center">
          <template #default="scope">
            <div class="bf-font-blue-color">
              {{getNumToFixed(scope.row.RecordsEvection)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="DateNumber" label="请假时长(分)" width="110" align="center">
          <template #default="scope">
            <div class="bf-font-blue-color">
              {{getNumToFixed(scope.row.Leave)}}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { parseTime } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import {
  computed,
  defineComponent,
  onMounted,
  reactive,
  ref,
  SetupContext,
  toRefs
} from 'vue'
import { ElMessage } from 'element-plus'
import { PostGetFaceAttendanceStatisticsData } from '/@/api/hr/AttendanceManage'
import { useLayoutStore } from '/@/store/modules/layout'
const lStore = useLayoutStore() //记得加这一句
//页面初始化
const GetContractManagementInfoEvent = async (data: any) => {}
export default defineComponent({
  components: {
    OpenWindow,
    DepTabridge
  },
  emits: ['closeWindow'],
  props: {
    // 传递过来的异常标题
    dialogTitle: {
      type: String,
      default: ''
    },
    // 传递过来的异常数据
    dialogData: {
      type: Array,
      default: []
    }
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      ruleForm: {},
      tableData: props.dialogData //列表数据
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-900',
      boxHeight: ''
    })
    //不保留小数
    const getNumToFixed = (val: any) => {
      return val.toFixed(0)
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
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
    }
    onMounted(() => {
      // 根据userId获取详情
      //   GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      getWorkTypeName,
      getNumToFixed,
      parseTimeEvent
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
