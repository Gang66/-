<template>
  <div class="bf-content CourseDevelop">
    <zStatistic v-if="isHeader"></zStatistic>
    <div class="bf-center-content">
      <el-form :model="form" label-width="70px" class="bf-search-formItem">
        <tabs :tabList="data.tabList" @handleClick="selectEvent">
          <template #button>
            <div class="flex justify-end items-center" v-if="data.selectIndex == 3">
              <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class="screen-width" clearable>
                <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
              </el-select>
              <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
              <template v-if="data.selectIndex == 3">
                <el-button type="primary" class="ml-2" @click="openPostSalarySettingFormWindow(1)">新增配置</el-button>
                <el-button type="success" class="ml-2" @click="openPostSalarySettingFormWindow(2)">修改配置</el-button>
                <el-button type="danger" class="ml-2" @click="deletePostSalarySettingFormWindow()">删除配置</el-button>
              </template>
            </div>
            <div class="flex justify-end items-center" v-else-if="data.selectIndex == 2">
              <el-button type="primary" class="ml-2" @click="openSalaryItemsFormWindow">新增考核项</el-button>
            </div>
            <div class="flex justify-end items-center" v-else>
              <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
                <el-option label="部门" value="1" />
                <el-option label="人员" value="2" />
                <el-option label="岗位类型" value="3" />
                <el-option label="岗位状态" value="4" />
              </el-select>
              <div class="screen-width" v-if="form.type == '1'">
                <el-tree-select v-model="form.DeptId" :data="data.deptData" clearable check-strictly node-key="Id" :default-expanded-keys="[26]" />
              </div>
              <el-select v-model="form.UserId" filterable placeholder="请选择" class="screen-width" v-else-if="form.type =='2'" clearable>
                <el-option v-for="(item, index) in data.PeopleOriented" :key="index" :label="item.RealName" :value="item.UserId" />
              </el-select>
              <!-- <el-input v-model="form.RealName" placeholder="请输入" class="screen-width"  /> -->
              <el-select v-model="form.JobType" placeholder="请选择" @change="handleChangeJobType" v-else-if="form.type == '3'" clearable class="screen-width">
                <el-option v-for="item in data.PostType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
              <el-select v-model="form.JobState" placeholder="请选择" v-else-if="form.type == '4'" clearable class="screen-width">
                <el-option v-for="item in data.examineType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
              </el-select>
              <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
              <template v-if="data.selectIndex == 0||data.selectIndex == 1">
                <el-button type="primary" class="ml-2" @click="openBatchSalarySettingFormWindow">批量修改</el-button>
                <!-- <el-button type="primary" class="ml-2" @click="openMaterialWindow">工资修改</el-button> -->
              </template>
            </div>
          </template>
        </tabs>
      </el-form>
      <SalarySettingIndex ref="SalarySettingIndexRef" v-if="data.selectIndex == 0" :selectIndex="data.selectIndex"></SalarySettingIndex>
      <SalarySettingIndex ref="SalarySettingIndexRef" v-if="data.selectIndex == 1" :selectIndex="data.selectIndex"></SalarySettingIndex>
      <SalaryItemsIndex ref="SalaryItemsIndexRef" v-if="data.selectIndex == 2"></SalaryItemsIndex>
      <PostSalarySettingIndex ref="SalaryPostSalarySettingIndexRef" v-if="data.selectIndex == 3"></PostSalarySettingIndex>
    </div>
  </div>
</template>

<script lang="ts">
import SalarySettingIndex from './_Components/SalarySettingIndex.vue'
import SalaryItemsIndex from './_Components/SalaryItemsIndex.vue'
import PostSalarySettingIndex from './_Components/PostSalarySettingIndex.vue'
import tabs from '/@/components/Tabs/Index.vue'
import zStatistic from '../../Components/statistic/Index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
import filterDatetime from '/@/views/HR/Components/filterDatetime/Index.vue'
import { GetAllUserList } from '/@/api/layout'
import { GetTypeDepartList } from '/@/api/system/dept'
import { ElMessage } from 'element-plus'
const store = useCommonStore() //记得加这一句
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    filterDatetime,
    tabs,
    SalarySettingIndex,
    SalaryItemsIndex,
    PostSalarySettingIndex
  },
  props: {
    isHeader: {
      type: Boolean,
      default: true
    }
  },
  setup() {
    const SalarySettingIndexRef = ref()
    const SalaryItemsIndexRef = ref()
    const SalaryPostSalarySettingIndexRef = ref()
    const QuestionCorrectionIndexRef = ref()
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      total: 1,
      JobType: null,
      JobState: null,
      UserId: null,
      DeptId: null,
      CompId: null,
      type: '1'
    })
    const data = reactive({
      deptList: [], //部门数据
      deptData: [] as any, //获取部门信息
      PeopleOriented: [],
      PostType: [],
      examineType: [],
      selectIndex: 0, //tab下标
      leaveType: 0,
      tabList: [
        //tab列表数据
        {
          name: '在职工资设定'
        },
        {
          name: '离职工资设定'
        },
        {
          name: '工资项配置'
        },
        {
          name: '岗位工资设置'
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
    // 打开工资设定
    const openMaterialWindow = () => {
      SalarySettingIndexRef.value.openTravelWindow(0, 1)
    }
    // 打开批量工资设定
    const openBatchSalarySettingFormWindow = () => {
      SalarySettingIndexRef.value.openopenTravelWindow(0, 1)
    }
    // 打开工资考核项
    const openSalaryItemsFormWindow = () => {
      SalaryItemsIndexRef.value.openSalaryItemsFormWindow(0, 1)
    }
    // 打开岗位工资设置
    const openPostSalarySettingFormWindow = (type: number) => {
      SalaryPostSalarySettingIndexRef.value.openPostSalarySettingFormWindow({}, type)
    }
    ///删除岗位工资设定
    const deletePostSalarySettingFormWindow = () => {
      SalaryPostSalarySettingIndexRef.value.deleteEvent()
    }
    // 下架课程
    const undercarriageEvent = () => {
      SalaryItemsIndexRef.value.deleteEvent()
    }
    // 监听筛选类型
    const typeChange = (val: string) => {
      if (val == '1') {
      }
      switch (val) {
        case '1':
          form.UserId = null
          form.JobType = null
          form.JobState = null
          break
        case '2':
          form.DeptId = null
          form.JobType = null
          form.JobState = null
          break
        case '3':
          form.UserId = null
          form.DeptId = null
          form.JobState = null
          break
        case '4':
          form.UserId = null
          form.DeptId = null
          form.JobType = null
          break
      }
    }
    // 筛选
    const searchEvent = () => {
      if (data.selectIndex == 0) {
        SalarySettingIndexRef.value.form.UserId = form.UserId
        SalarySettingIndexRef.value.form.DeptId = form.DeptId
        SalarySettingIndexRef.value.form.JobType = form.JobType
        SalarySettingIndexRef.value.form.JobState = form.JobState
        SalarySettingIndexRef.value.search()
      }
      if (data.selectIndex == 1) {
        SalarySettingIndexRef.value.form.UserId = form.UserId
        SalarySettingIndexRef.value.form.DeptId = form.DeptId
        SalarySettingIndexRef.value.form.JobType = form.JobType
        SalarySettingIndexRef.value.form.JobState = form.JobState
        SalarySettingIndexRef.value.search()
      }
      if (data.selectIndex == 2) {
        SalaryPostSalarySettingIndexRef.value.search()
      }
      if (data.selectIndex == 3) {
        SalaryPostSalarySettingIndexRef.value.form.CompId = form.CompId
        SalaryPostSalarySettingIndexRef.value.search()
      }
    }
    // 获取所有公司人员
    const findAllUserList = async () => {
      const res = await GetAllUserList()
      // console.log(res)
      data.PeopleOriented = res.data
    }
    onMounted(() => {
      findAllUserList()
      // 获取部门列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
      // 获取岗位类别
      store.getDict('post_type').then((res: any) => {
        data.PostType = res
      })
      // 获取岗位类别
      store.getDict('hr_examine_type').then((res: any) => {
        data.examineType = res
      })
      // 获取课件等级
      //  获取组织架构树
      store.getDeptTree().then((res: any) => {
        data.deptData = res
      })
    })
    return {
      form,
      data,
      changeEvent,
      selectEvent,
      openBatchSalarySettingFormWindow,
      openMaterialWindow,
      openSalaryItemsFormWindow,
      openPostSalarySettingFormWindow,
      deletePostSalarySettingFormWindow,
      SalarySettingIndexRef,
      SalaryItemsIndexRef,
      SalaryPostSalarySettingIndexRef,
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
    width: 140px !important;
  }
}
</style>
