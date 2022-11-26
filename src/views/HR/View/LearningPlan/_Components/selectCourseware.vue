<template>
  <div class="selectCourseware">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="选择课件">
      <template #topBtn>
        <el-button type="primary" size="small" @click="submitForm()">提交</el-button>
      </template>
      <div class="bf-window-padding">
        <div class="flex  items-center">
          <el-input v-model="form.Name" placeholder="课程名称" class=" screen-width" />
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
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
            end-placeholder="结束时间" :size="size" />
          <el-button type="primary" class="ml-2" @click="searchEvent(2)">搜索</el-button>
        </div>
        <div class="border mt-2">
          <el-table :data="data.tableData" style="width: 100%" @selection-change="handleSelectionChange" max-height="700">
            <el-table-column type="selection" width="55" align="center" />
            <el-table-column prop="CreateOn" label="创建时间" width="120" align="center">
              <template #default="scope">
                {{parseTimeEvent(scope.row.CreateOn)}}
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="课程名称" width="180" align="center" />
            <el-table-column prop="FileType" label="格式" align="center" />
            <el-table-column prop="name" label="类型" align="center">
              <template #default="scope">
                <div v-for="(item,index) in data.CoursewareClass">
                  <template v-if="item.DicKey==scope.row.Class"> {{item.DicValue}}</template>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Level" label="等级" align="center">
              <template #default="scope">
                <div v-for="(item,index) in data.CoursewareLevel">
                  <template v-if="item.DicKey==scope.row.Level"> {{item.DicValue}}</template>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="学习时长" align="center">
              <template #default="scope">
                <div class="truncate">{{scope.row.MinMinutes}}分钟</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="课件量" align="center">
              <template #default="scope">
                <div class="truncate">{{totalFileListNum(scope.row.FileList)}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="试题量" align="center">
              <template #default="scope">
                <div class="truncate">{{totalTestListNum(scope.row.TestList)}}</div>
              </template>
            </el-table-column>
            <!-- <el-table-column prop="name" label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="submitForm(scope.row)">选择</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetUserTree } from '/@/api/system/user'
import { GetWorkCourseFinishedEntity, GetWorkCourseFinishedPage, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { AnyRecord } from 'dns'
const store = useCommonStore() //记得加这一句
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled'
}
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWorkCourseFinishedPage(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        element.Suggestion = eval('(' + element.Suggestion + ')')
      })
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
const GetContractManagementInfoEvent = async (form: any, data: any) => {
  renderTableList(form, data)
  GetUserTree().then((res: any) => {
    data.treeList = res.data
  })
  // 获取课件分类
  store.getDict('CoursewareClass').then((res: any) => {
    data.CoursewareClass = res
  })
  // 获取课件等级
  store.getDict('CoursewareLevel').then((res: any) => {
    data.CoursewareLevel = res
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any, context: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = (val: any) => {
    context.emit('CoursewareDetails', data.selectList)
    closeWindow()
  }
  //获取课件数
  const totalFileListNum = (arr: any) => {
    return (arr || []).filter((x: any) => {
      return x.State == 100 && x.IsDel == 0
    }).length
  }
  //获取试题数
  const totalTestListNum = (arr: any) => {
    var num = 0
    if ((arr || []).length > 0) {
      num = arr[0].Id
    }
    return num
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  //校验
  const rules = reactive<FormRules>({})
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    parseTimeEvent,
    totalFileListNum,
    totalTestListNum
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow', 'CoursewareDetails'],
  props: {
    // 课件Id
    IsNewest: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10000,
      total: 1,
      type: '2',
      Name: '',
      Level: '',
      Class: '',
      RealName: '',
      IsNewest: props.IsNewest,
      time: []
    })
    let data = reactive({
      treeList: [],
      selectList: [], //选中课件数据
      CoursewareClass: [], //课件分类
      CoursewareLevel: [] //等级数据
    })
    const handleSelectionChange = (val: any) => {
      data.selectList = val
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
    const searchEvent = () => {}
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(form, data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow, context),
      defaultProps,
      typeChange,
      searchEvent,
      form,
      handleSelectionChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.selectCourseware {
  .screen-width {
    width: 140px;
  }
}
</style>
