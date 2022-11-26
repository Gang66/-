<template>
  <div class="bf-content CourseDevelop">
    <zStatistic v-if="isHeader"></zStatistic>
    <div class="bf-center-content">
      <el-form :model="form" label-width="70px" class="bf-search-formItem">
        <tabs :tabList="data.tabList" @handleClick="selectEvent">
          <template #button>
            <div class="flex justify-end items-center">
              <el-input v-model="form.Name" placeholder="课程名称" class="ml-2 screen-width" />
              <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
                <el-option label="开发者" value="1" />
                <el-option label="等级" value="2" />
                <el-option label="类型" value="3" />
                <el-option label="创建时间" value="4" />
              </el-select>
              <el-input v-model="form.RealName" placeholder="请输入" class="screen-width" v-if="form.type == 1" />
              <el-select v-model="form.Level" class="screen-width" placeholder="搜索等级" v-else-if="form.type == 2">
                <el-option :label="item.DicValue" :value="item.DicKey" v-for="item in data.CoursewareLevel" />
              </el-select>
              <el-select v-model="form.Class" class="screen-width" placeholder="搜索类型" v-else-if="form.type == 3">
                <el-option :label="item.DicValue" :value="item.DicKey" v-for="item in data.CoursewareClass" />
              </el-select>
              <el-date-picker v-model="form.time" class="screen-width" type="daterange" range-separator="于" v-else-if="form.type == 4" start-placeholder="开始时间" end-placeholder="结束时间" />
              <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
              <template v-if="data.selectIndex == 0">
                <el-button type="primary" class="ml-2" @click="openMaterialWindow">上传素材</el-button>
              </template>
              <template v-if="data.selectIndex == 1">
                <el-button type="danger" class="ml-2" @click="undercarriageEvent">下架课程</el-button> 
              </template>
            </div>
          </template>
        </tabs>
      </el-form>
      <MaterialIndex ref="MaterialIndexRef" v-if="data.selectIndex == 0"></MaterialIndex>
      <EndProductIndex ref="EndProductIndexRef" v-if="data.selectIndex == 1"></EndProductIndex>
      <QuestionBankIndex ref="QuestionBankIndexRef" v-if="data.selectIndex == 2"></QuestionBankIndex>
      <QuestionCorrectionIndex ref="QuestionCorrectionIndexRef" v-if="data.selectIndex == 3"></QuestionCorrectionIndex>
    </div>
  </div>
</template>

<script lang="ts">
import MaterialIndex from './_Components/MaterialIndex.vue'
import EndProductIndex from './_Components/EndProductIndex.vue'
import QuestionBankIndex from './_Components/QuestionBankIndex.vue'
import QuestionCorrectionIndex from './_Components/QuestionCorrectionIndex.vue'
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
    MaterialIndex,
    EndProductIndex,
    QuestionBankIndex,
    QuestionCorrectionIndex
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const MaterialIndexRef = ref()
    const EndProductIndexRef = ref()
    const QuestionBankIndexRef = ref()
    const QuestionCorrectionIndexRef = ref()
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
          name: '课件素材'
        },
        {
          name: '成品课件'
        },
        {
          name: '试题库'
        },
        {
          name: '试题纠错'
        }
      ],
      time: '',
      // 列表数据
      tableData: [],
      CoursewareLevel: [], //课件等级
      CoursewareClass: [] //课件分类
    })
    //   监听筛选
    const changeEvent = (val: any) => {}
    // 标题监听
    const selectEvent = (index: number) => {
      data.selectIndex = index
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
    }
    // 打开上传素材
    const openMaterialWindow = () => {
      MaterialIndexRef.value.openTravelWindow(0, 1)
    }
    // 下架课程
    const undercarriageEvent = () => {
      EndProductIndexRef.value.deleteEvent()
    }
    // 监听筛选类型
    const typeChange = (val: string) => {
      if (val == '1') {
      }
      switch (val) {
        case '1':
          form.Level = ''
          form.Class = ''
          form.time = []
          break
        case '2':
          form.Class = ''
          form.RealName = ''
          form.time = []
          break
        case '3':
          form.Level = ''
          form.RealName = ''
          form.time = []
          break
        case '4':
          form.Level = ''
          form.Class = ''
          form.RealName = ''
          break
      }
    }
    // 筛选
    const searchEvent = () => {
      if (data.selectIndex == 0) {
        MaterialIndexRef.value.form.Name = form.Name
        MaterialIndexRef.value.form.Level = form.Level
        MaterialIndexRef.value.form.Class = form.Class
        MaterialIndexRef.value.form.RealName = form.RealName
        if (form.time.length > 0) {
          MaterialIndexRef.value.form.StartTime = parseTime(form.time[0], '{y}-{m}-{d}')
          MaterialIndexRef.value.form.EndTime = parseTime(form.time[1], '{y}-{m}-{d}')
        }
        MaterialIndexRef.value.search()
      }
      if (data.selectIndex == 1) {
        EndProductIndexRef.value.form.Name = form.Name
        EndProductIndexRef.value.form.Level = form.Level
        EndProductIndexRef.value.form.Class = form.Class
        EndProductIndexRef.value.form.RealName = form.RealName
        if (form.time.length > 0) {
          EndProductIndexRef.value.form.StartTime = parseTime(form.time[0], '{y}-{m}-{d}')
          EndProductIndexRef.value.form.EndTime = parseTime(form.time[1], '{y}-{m}-{d}')
        }
        EndProductIndexRef.value.search()
      }
      if (data.selectIndex == 2) {
        QuestionBankIndexRef.value.form.Name = form.Name
        QuestionBankIndexRef.value.form.Level = form.Level
        QuestionBankIndexRef.value.form.Class = form.Class
        QuestionBankIndexRef.value.form.RealName = form.RealName
        if (form.time.length > 0) {
          QuestionBankIndexRef.value.form.StartTime = parseTime(form.time[0], '{y}-{m}-{d}')
          QuestionBankIndexRef.value.form.EndTime = parseTime(form.time[1], '{y}-{m}-{d}')
        }
        QuestionBankIndexRef.value.search()
      }
      if (data.selectIndex == 3) {
        QuestionCorrectionIndexRef.value.form.Name = form.Name
        QuestionCorrectionIndexRef.value.form.Level = form.Level
        QuestionCorrectionIndexRef.value.form.Class = form.Class
        QuestionCorrectionIndexRef.value.form.RealName = form.RealName
        if (form.time.length > 0) {
          QuestionCorrectionIndexRef.value.form.StartTime = parseTime(form.time[0], '{y}-{m}-{d}')
          QuestionCorrectionIndexRef.value.form.EndTime = parseTime(form.time[1], '{y}-{m}-{d}')
        }
        QuestionCorrectionIndexRef.value.search()
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
      changeEvent,
      selectEvent,
      openMaterialWindow,
      MaterialIndexRef,
      EndProductIndexRef,
      QuestionBankIndexRef,
      QuestionCorrectionIndexRef,
      searchEvent,
      typeChange,
      undercarriageEvent
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
