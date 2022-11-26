<template>
  <div class="Course-Courseware-index">
    <Statistic />

    <div>
      <el-card>
        <!-- 上方筛选 -->
        <div class="flex justify-between">
          <div>课件计划</div>
          <div class="flex changeType">
            <!-- 下拉框选择方式 -->
            <el-select v-model="data.head" class="firstSelect" @change="ClearForm">
              <el-option v-for="item in data.FilterChannels" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <!-- 根据选择的不同展示不同的input框 -->
            <el-input v-if="data.head === 'name'" placeholder="请输入搜索内容" v-model="formdata.CourseName"></el-input>
            <!--  -->

            <el-select clearable v-else-if="data.head === 'create'" v-model="formdata.CreateBy" filterable placeholder="请选择">
              <el-option v-for="(item, index) in data.CreateBy" :key="index" :label="item.RealName" :value="item.UserId" />
            </el-select>
            <el-select clearable v-else-if="data.head === 'distribute'" v-model="formdata.UserId" filterable placeholder="请选择">
              <el-option v-for="(item, index) in data.UserId" :key="index" :label="item.RealName" :value="item.UserId" />
            </el-select>
            <el-select clearable v-else-if="data.head === 'type'" v-model="formdata.Type">
              <el-option v-for="(item, index) in data.type" :key="index" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="InquireBtn" @click="filterPlan">
              <el-icon> <el-icon-Search /> </el-icon>&nbsp;查询
            </el-button>

            <el-button type="primary" @click="OpenAddCourse(0)"
              ><el-icon><el-icon-Monitor /></el-icon>&nbsp;创建计划</el-button
            >
          </div>
        </div>
        <!-- table表格 -->
        <div class="mt-4">
          <el-table ref="multipleTableRef" :data="tableData">
            <el-table-column type="selection" width="30" />
            <el-table-column type="index" width="55" label="序号" />
            <el-table-column min-width="110" prop="CreateOn" label="创建时间" />
            <el-table-column min-width="95" prop="CreateName" label="创建人" />
            <el-table-column label="部门" min-width="120">
              <template #default="{ row }">
                <DepTabridge :key="row.UserId" :deptDetails="{ DivisionName: row.CompName, DeptName: row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="岗位" min-width="95" />
            <el-table-column prop="CourseName" label="课件名称" min-width="140" />
            <el-table-column prop="DisDateTime" label="分配时间" min-width="110"> </el-table-column>
            <el-table-column prop="UserName" label="分配人" min-width="95" />
            <el-table-column prop="PostNameList" label="面向岗位" min-width="110">
              <template #default="{ row }">
                <el-tooltip placement="top">
                  <template #content>
                    <div class="w-32">
                      <span v-for="item in row.PostNameList" :key="item">{{ item }}&nbsp;&nbsp;</span>
                    </div>
                  </template>
                  <div>
                    {{ row.PostNameList[0] }} <span class="text-xs text-blue-400"> +{{ row.PostNameList.length }}</span>
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="Type" label="类型" min-width="100" />
            <el-table-column prop="Type" label="状态" min-width="100">
              <template #default="{ row }">
                <el-button v-if="row.State === '2'" link type="primary" disabled>已完成</el-button>

                <el-button v-else-if="row.State === '1'" link type="primary" @click="changeState(row.Id)">未完成</el-button>
              </template>
            </el-table-column>
            <el-table-column prop="model" label="操作" min-width="220">
              <template #default="{ row, $index }">
                <div class="flex">
                  <el-button link type="primary" @click="OpenPlanwindow(row.Id)">分配</el-button>
                  <el-button link type="primary" @click="OpenAddCourse(row.Id)">编辑</el-button>
                  <el-button link type="primary" @click="delPlan(row.Id)">删除</el-button>
                  <el-button link type="primary" @click="Openuploadwindow(row.Id, row.FilePathList)"> 课件下载 </el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex justify-end mt-2">
            <el-pagination v-model:currentPage="data.query.page" v-model:page-size="data.query.size" :page-sizes="[10, 15, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" background />
          </div>
        </div>
      </el-card>
    </div>
    <CreateCourse v-if="AddData.showWindow" @closeAddWindow="closeAddWindow" :AddData="AddData" :TypeData="data.type" @successClick="successClick" />
    <Distribution v-if="PlanData.showWindow" @closePlanWindow="closePlanWindow" :PlanData="PlanData" @successClick="successClick" />
    <UploadWindow v-if="uploadData.showWindow" @closeuploadnWindow="closeuploadnWindow" :uploadData="uploadData" @successUpload="successClick" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref, watch } from 'vue'
import Statistic from '/@/views/HR/Components/statistic/Index.vue'
import { useCommonStore } from '/@/store/modules/Common'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import CreateCourse from './_Components/CreateCourseForm.vue'
import Distribution from './_Components/DistributionForm.vue'
import { GetAllPlan, DelPlan, GetFinishMakePlanCourse } from '/@/api/hr/Course'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetAllUserList } from '/@/api/layout/index'
import { parseTime } from '/@/utils/tools'
import UploadWindow from './_Components/UploadWindow.vue'
const store = useCommonStore()
// 创建课程计划弹窗
const AddCoursePlan = (data: any) => {
  // 是否显示弹窗
  const AddData = reactive({
    showWindow: false,
    Id: null as any
  })
  // 打开弹窗
  const OpenAddCourse = (Id: any) => {
    AddData.Id = Id
    AddData.showWindow = true
  }
  const closeAddWindow = () => {
    AddData.showWindow = false
  }
  return {
    AddData,
    OpenAddCourse,
    closeAddWindow
  }
}
// 计划分配
const Plan = (data: any) => {
  // 是否显示弹窗
  const PlanData = reactive({
    showWindow: false,
    Id: null as any
  })
  // 打开弹窗
  const OpenPlanwindow = (Id: any) => {
    PlanData.Id = Id
    PlanData.showWindow = true
  }
  const closePlanWindow = () => {
    PlanData.showWindow = false
  }
  return {
    PlanData,
    OpenPlanwindow,
    closePlanWindow
  }
}
// 上传文件弹窗
const upload = (data: any) => {
  // 是否显示弹窗
  const uploadData = reactive({
    showWindow: false,
    Id: null as any,
    FilePathList: []
  })
  // 打开弹窗
  const Openuploadwindow = (Id: any, FilePathList: any) => {
    uploadData.showWindow = true
    uploadData.Id = Id
    // uploadData.FilePathList =
    if (FilePathList) {
      FilePathList.forEach((val: any, index: number) => {
        if (val.State) {
          val.uid = val.FileId
          val.name = val.FileName
          val.size = val.Size
          val.url = val.Path
          val.status = 'success'
        }
      })
    }

    uploadData.FilePathList = FilePathList
  }
  const closeuploadnWindow = () => {
    uploadData.showWindow = false
  }
  return {
    uploadData,
    Openuploadwindow,
    closeuploadnWindow
  }
}
export default defineComponent({
  components: {
    Statistic,
    DepTabridge,
    CreateCourse,
    Distribution,
    UploadWindow
  },
  setup() {
    // 所有变量
    const data = reactive({
      // 顶部筛选的类型内容
      type: [],
      // 筛选的渠道
      FilterChannels: [
        {
          value: 'name',
          label: '课件名称'
        },
        {
          value: 'create',
          label: '创建人'
        },
        {
          value: 'distribute',
          label: '分配人'
        },
        {
          value: 'type',
          label: '类型'
        }
      ],
      // 分页
      query: {
        page: 1,
        size: 10
      },
      // 表格总数
      total: null as any,
      // 分配人
      UserId: null as any,
      // 创建人
      CreateBy: null as any,
      // Select筛选下拉框的绑定
      head: 'name'
    })
    // 资产采购table表中的筛选
    let formdata = ref({
      //   筛选的课件名称,
      CourseName: '',
      // 筛选的创建人
      CreateBy: '',
      // 筛选的分配人
      UserId: '',
      // 筛选的类型
      Type: ''
    })
    var formdatademo = {
      //   筛选的课件名称,
      CourseName: '',
      // 筛选的创建人
      CreateBy: '',
      // 筛选的分配人
      UserId: '',
      // 筛选的类型
      Type: ''
    }
    // 获取课程计划类型字典
    let storeData = store.getDict('CoursewareClass')
    storeData.then((res: any) => {
      console.log(res)

      data.type = res.map((item: any) => {
        return {
          value: item.DicKey,
          label: item.DicValue
        }
      })
    })

    // 获取所有公司人员
    const findAllUserList = async () => {
      const res = await GetAllUserList()
      data.UserId = res.data
      data.CreateBy = res.data
    }
    findAllUserList()
    // table表单内容
    let tableData = ref([])

    // 子页面提交后重新刷新表单内容
    const successClick = () => {
      findAllPlan(null)
    }

    // 获取表单所有内容
    const findAllPlan = async (val: any) => {
      GetAllPlan({ ...data.query, ...val }).then((res: any) => {
        console.log(res.data.records)
        res.data.records.forEach((item: any) => {
          item.CreateOn = parseTime(item.CreateOn, '{y}-{m}-{d}')
          if (item.DisDateTime) {
            item.DisDateTime = parseTime(item.DisDateTime, '{y}-{m}-{d}')
          }

          data.type.forEach((val: any) => {
            if (item.Type == val.value) {
              item.Type = val.label
            }
          })
        })
        tableData.value = res.data.records
        data.total = res.data.totals
      })
    }
    // 字典内容也是异步 需要字典有内容的时候调用获取列表内容
    watch(
      () => data.type,
      (val: any) => {
        if (val.length > 0) {
          findAllPlan(null)
        }
      },
      { deep: true }
    )
    // 监听筛选
    const ClearForm = (val: any) => {
      // console.log(val)
      formdata.value = JSON.parse(JSON.stringify(formdatademo))
      // console.log(formdata.value)
    }
    // 筛选
    const filterPlan = () => {
      findAllPlan(formdata.value)
    }

    // 点击切换完成状态
    const changeState = (Id: any) => {
      ElMessageBox.confirm('确定已经完成？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '点错了，还没呢',
        type: 'warning'
      })
        .then(async () => {
          await GetFinishMakePlanCourse({ Id: Id })
          findAllPlan(null)
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消操作'
          })
        })
    }

    // 删除
    const delPlan = async (id: any) => {
      ElMessageBox.confirm('确定要删除该计划吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除成功'
          })
          DelPlan(id)
          findAllPlan(null)
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
    }

    // 分页
    const handleSizeChange = (val: number) => {
      data.query.size = val
      findAllPlan(null)
    }
    const handleCurrentChange = (val: number) => {
      data.query.page = val
      findAllPlan(null)
    }
    const ChangePage = (a: any, b: any) => {
      console.log(a + b)
    }
    return {
      changeState,
      ChangePage,
      ClearForm,
      findAllUserList,
      filterPlan,
      delPlan,
      successClick,
      data,
      formdata,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      ...AddCoursePlan({ data }),
      ...Plan({ data }),
      ...upload({ data })
    }
  }
})
</script>
<style lang="postcss" scoped>
.Course-Courseware-index {
  :deep(.changeType) {
    .el-input__wrapper {
      width: 18.75rem;
    }
    .InquireBtn {
      margin-left: 1.25rem;
      color: #468bfd;
      border: 0.0625rem solid #468bfd;
    }
    .firstSelect {
      .el-input__wrapper {
        width: 9.375rem;
      }
    }
  }
  :deep(.el-table__header) {
    th {
      background-color: #fafafa;
    }
  }
}
</style>
