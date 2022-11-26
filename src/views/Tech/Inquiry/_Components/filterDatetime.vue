<template>
  <div class="flex rounded items-center top-time-content">
    <div v-for="(item, index) in data.list" :key="index" class="time bf-text-color-regular cursor-pointer" :class="[item.type == 'whole' ? 'rounded-l' : '', item.type == 'year' ? 'rounded-r' : '', data.selectIndex == index ? 'selectBg ' : '']" @click="selectEvent(index, item.type)">{{ item.label }}</div>
    <div class="inline-block ml-4 text-gray-400">最近更新时间：{{ data.newgengtime }}</div>
    <!-- <el-date-picker v-model="data.timeData" type="datetimerange" range-separator="To" :shortcuts="shortcuts" start-placeholder="开始时间" end-placeholder="结束时间" @change="changeEvent">
      <template #range-separator>
        <el-icon :size='30' class='ml-1 cursor-pointer' color='#2563EB'>
          <el-icon-calendar />
        </el-icon>
      </template>
    </el-date-picker> -->
    <!-- 时间选择 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, SetupContext } from 'vue'
import { getTime, parseTime } from '/@/utils/tools'
export default defineComponent({
  props: {
    // 默认Date格式 ，可以根据format传递过来改变格式'{y}-{m}-{d} {h}:{i}:{s}'
    format: {
      type: String,
      default: ''
    },
    // 时间数据
    list: {
      type: Array,
      default: [
        // 列表数据
        { label: '全部', type: 'whole' },
        { label: '日', type: 'day' },
        { label: '周', type: 'week' },
        { label: '月', type: 'month' },
        { label: '季', type: 'quarter' },
        { label: '年', type: 'year' }
      ]
    }
  },
  emits: ['transmitTime'],
  setup(props, context: SetupContext) {
    const data = reactive({
      timeData: '', // 时间数据
      selectIndex: 0, // 选中下标
      list: props.list,
      newgengtime: ''
    })
    const shortcuts = [
      {
        text: '最近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '最近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: '最近三个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        }
      }
    ]
    // 自定义时间筛选
    const changeEvent = (val: any) => {
      let time: any = {
        BeginDate: '',
        EndDate: ''
      }
      time.BeginDate = parseTime(val[0], props.format)
      time.EndDate = parseTime(val[1], props.format)
      context.emit('transmitTime', time)
    }
    // 时间选中事件
    const selectEvent = (val: any, type: any) => {
      data.newgengtime = parseTime(new Date(), '{y}-{m}-{d}   {h}:{i}')
      data.selectIndex = val
      let time: any = {
        BeginDate: '',
        EndDate: ''
      }
      if (type == 'whole') {
        time.BeginDate = ''
        time.EndDate = ''
      } else if (type == 'day') {
        time.BeginDate = getTime('day')
        time.EndDate = getTime('day')
      } else if (type == 'week') {
        time.BeginDate = getTime('week').weekStartDate
        time.EndDate = getTime('week').weekEndDate
      } else if (type == 'month') {
        time.BeginDate = getTime('month').monthStartDate
        time.EndDate = getTime('month').monthEndDate
      } else if (type == 'quarter') {
        time.BeginDate = getTime('quarter').quarterStartDate
        time.EndDate = getTime('quarter').quarterEndDate
      } else if (type == 'year') {
        time.BeginDate = getTime('year').currentYearFirstDate
        time.EndDate = getTime('year').currentYearEndDate
      }
      if (props.format && time.BeginDate && time.EndDate) {
        time.BeginDate = parseTime(time.BeginDate, props.format)
        time.EndDate = parseTime(time.EndDate, props.format)
      }
      context.emit('transmitTime', time)
    }
    onMounted(() => {
      data.newgengtime = parseTime(new Date(), '{y}-{m}-{d}   {h}:{i}')
    })
    return { data, selectEvent, shortcuts, changeEvent }
  }
})
</script>

<style lang="postcss">
.time {
  text-align: center;
  padding: 0 12px;
  height: 32px;
  border-right: 1px solid var(--el-border-color);
  background: #fff;
  line-height: 32px;
  font-size: 14px;
}
.selectBg {
  color: #fff;
  background: var(--el-color-primary);
  border-right: 1px solid var(--el-color-primary);
}
.showType-picker.el-range-editor--mini.el-input__inner {
  height: 28px;
  padding: 3px 5px;
  width: 0px;
  margin-left: 5px;
  .el-range__icon,
  .el-range__close-icon {
    line-height: 18px;
  }
  .el-range-separator {
    line-height: 18px;
  }
}
.top-time-content {
  .el-range-editor {
    margin-left: 10px;
    width: 31px !important;
    background: none !important;
    box-shadow: none !important;
  }
  .el-range-editor .el-range-input {
    width: 0;
  }
  .el-range-editor.el-input__inner {
    width: auto;
    box-shadow: none;
  }
  .el-date-editor .el-range__icon {
    font-size: 0;
  }
  .el-date-editor .el-range__close-icon--hidden {
    font-size: 0;
  }
  .el-date-editor .el-range__close-icon {
    font-size: 0;
  }
}
</style>
