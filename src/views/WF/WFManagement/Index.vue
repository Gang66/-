<template>
  <div class="bf-content CourseDevelop">
    <div class="bf-center-content">
      <el-form :model="form" label-width="70px" class="bf-search-formItem">
        <tabs :tabList="data.tabList" @handleClick="selectEvent">
          <template #button>
            <div class="flex justify-end items-center">
              <el-input v-model="form.RealName" placeholder="申请人" class="ml-2 screen-width" />
              <!-- <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
                <el-option label="开发者" value="1" />
                <el-option label="等级" value="2" />
                <el-option label="类型" value="3" />
                <el-option label="创建时间" value="4" />
              </el-select>
              <el-input v-model="form.RealName" placeholder="请输入" class="ml-2 screen-width" v-if="form.type==1" />
              <el-select v-model="form.Level" class="ml-2 screen-width" placeholder="搜索等级" v-else-if="form.type==2">
                <el-option :label="item.DicValue" :value="item.DicKey" v-for="item in data.CoursewareLevel" />
              </el-select>
              <el-select v-model="form.Class" class="ml-2 screen-width" placeholder="搜索类型" v-else-if="form.type==3">
                <el-option :label="item.DicValue" :value="item.DicKey" v-for="item in data.CoursewareClass" />
              </el-select>
              <el-date-picker v-model="form.time" class="ml-2 screen-width" type="daterange" range-separator="于" v-else-if="form.type==4" start-placeholder="开始时间"
                end-placeholder="结束时间" :size="size" /> -->
              <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
              <div v-for="(item, index) in data.ArrayList" class="cursor-pointer ml-2" :key="index" :class="data.selectApprovalIndex == index ? 'bf-font-blue-color' : ''" @click="selectApprovalEvent(index)">
                {{ item.label }}
              </div>
            </div>
          </template>
        </tabs>
      </el-form>
      <WFManagementIndex v-if="data.tabList.length > 0" ref="WFManagementIndexRef"></WFManagementIndex>
    </div>
  </div>
</template>

<script lang="ts">
import { nextTick } from 'vue'
import WFManagementIndex from './_Components/WFManagementIndex.vue'
import tabs from '/@/components/Tabs/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetStepListTypeHead } from '/@/api/wf/WFManagement'
const store = useCommonStore() //记得加这一句
export default defineComponent({
  components: {
    TableSearch,
    filterDatetime,
    tabs,
    WFManagementIndex
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const WFManagementIndexRef = ref()
    const MaterialIndexRef = ref()
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
      selectApprovalIndex: 0, //审批下标
      leaveType: 0,
      ArrayList: [
        {
          label: '待审批'
        },
        {
          label: '已审批'
        }
      ],
      //tab列表数据
      tabList: [],
      time: '',
      // 列表数据
      tableData: []
    })
    //   监听筛选
    const changeEvent = (val: any) => {}
    // 标题监听
    const selectEvent = (index: number) => {
      data.selectIndex = index
      WFManagementIndexRef.value.form.Type = data.tabList[index]['Code']
      WFManagementIndexRef.value.search()
    }
    // 审批标题监听
    const selectApprovalEvent = (index: number) => {
      data.selectApprovalIndex = index
      if (index == 0) {
        WFManagementIndexRef.value.form.State = 1
        WFManagementIndexRef.value.data.WFManagementFormWindow.viewType = 4
      } else {
        WFManagementIndexRef.value.form.State = 2
        WFManagementIndexRef.value.data.WFManagementFormWindow.viewType = 3
      }
      WFManagementIndexRef.value.search()
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
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
      console.log(' MaterialIndexRef.value', WFManagementIndexRef.value)
      WFManagementIndexRef.value.form.Name = form.RealName
      WFManagementIndexRef.value.search()
    }
    onMounted(() => {
      GetStepListTypeHead().then((res: any) => {
        if (res.code == 1) {
          data.tabList = res.data
          nextTick(() => {
            WFManagementIndexRef.value.form.Type = data.tabList[0]['Code']
            WFManagementIndexRef.value.search()
          })
        } else {
        }
      })
      //   store.getDict('CoursewareClass').then((res: any) => {
      //     data.CoursewareClass = res
      //   })
    })
    return {
      form,
      data,
      changeEvent,
      selectEvent,
      MaterialIndexRef,
      WFManagementIndexRef,
      searchEvent,
      typeChange,
      selectApprovalEvent
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
