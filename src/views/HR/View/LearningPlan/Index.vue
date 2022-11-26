<template>
  <div class="bf-content CourseDevelop">
    <zStatistic v-if="isHeader"></zStatistic>
    <div class="bf-center-content">
      <el-form :model="form" label-width="70px" class="bf-search-formItem">
        <tabs :tabList="data.tabList" @handleClick="selectEvent">
          <template #button>
            <div class="flex justify-end items-center">
              <el-input v-model="form.Name" placeholder="培训摘要" class="ml-2 screen-width" />
              <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
              <template v-if="data.selectIndex==0">
                <el-button type="warning" class="ml-2" @click="openDailyPlanWindow">新建培训计划</el-button>
              </template>
              <template v-if="data.selectIndex==1">
                <el-button type="warning" class="ml-2" @click="openRookieProgramWindow">新建新人训计划</el-button>
              </template>
            </div>
          </template>
        </tabs>
      </el-form>
      <DailyPlanIndex ref="DailyPlanIndexRef" v-if="data.selectIndex==0"></DailyPlanIndex>
      <RookieProgramIndex ref="RookieProgramIndexRef" v-if="data.selectIndex==1"></RookieProgramIndex>
    </div>
  </div>
</template>

<script lang="ts">
import DailyPlanIndex from './_Components/DailyPlanIndex.vue'
import RookieProgramIndex from './_Components/RookieProgramIndex.vue'
import tabs from '/@/components/Tabs/Index.vue'
import zStatistic from '../../Components/statistic/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
const store = useCommonStore() //记得加这一句
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    filterDatetime,
    tabs,
    DailyPlanIndex,
    RookieProgramIndex
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const MaterialIndexRef = ref()
    const DailyPlanIndexRef = ref()
    const RookieProgramIndexRef = ref()
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      total: 1,
      type: '2',
      Name: '',
      Level: '',
      Class: '',
      RealName: '',
      time: []
    })
    const data = reactive({
      selectIndex: 0, //tab下标
      leaveType: 0,
      tabList: [
        //tab列表数据
        {
          name: '日常计划'
        },
        {
          name: '新人计划'
        }
      ],
      time: '',
      // 列表数据
      tableData: [],
      CoursewareLevel: [], //课件等级
      CoursewareClass: [] //课件分类
    })
    // 标题监听
    const selectEvent = (index: number) => {
      data.selectIndex = index
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
    }
    // 打开新建培训计划
    const openDailyPlanWindow = () => {
      DailyPlanIndexRef.value.data.DailyPlanFormWindow.show = true
      DailyPlanIndexRef.value.data.DailyPlanFormWindow.Id = null
    }
    // 打开新建新人训计划
    const openRookieProgramWindow = () => {
      RookieProgramIndexRef.value.data.RookieProgramFormWindow.show = true
      RookieProgramIndexRef.value.data.RookieProgramFormWindow.Id = null
    }
    // 筛选
    const searchEvent = () => {
      if (data.selectIndex == 0) {
        DailyPlanIndexRef.value.form.Name = form.Name
        DailyPlanIndexRef.value.search()
      } else {
        RookieProgramIndexRef.value.form.Name = form.Name
        RookieProgramIndexRef.value.search()
      }
    }
    onMounted(() => {
      // 获取课件等级
      store.getDict('CoursewareLevel').then((res: any) => {
        data.CoursewareLevel = res
      })
      // 获取课件分类
      store.getDict('CoursewareClass').then((res: any) => {
        data.CoursewareClass = res
      })
    })
    return {
      form,
      data,
      selectEvent,
      MaterialIndexRef,
      DailyPlanIndexRef,
      RookieProgramIndexRef,
      searchEvent,
      openDailyPlanWindow,
      openRookieProgramWindow
    }
  }
})
</script>
<style lang="postcss" scoped>
.CourseDevelop {
  .screen-width {
    width: 140px;
  }
}
</style>
