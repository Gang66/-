<template>
  <div class="Course-MyCourseware-index">
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
            <!-- <el-select clearable v-else-if="data.head === 'distribute'" v-model="formdata.UserId" filterable placeholder="请选择">
              <el-option v-for="(item, index) in data.UserId" :key="index" :label="item.RealName" :value="item.UserId" />
            </el-select> -->
            <el-select clearable v-else-if="data.head === 'type'" v-model="formdata.Type">
              <el-option v-for="(item, index) in data.type" :key="index" :label="item.label" :value="item.value" />
            </el-select>
            <el-button class="InquireBtn" @click="filterPlan">
              <el-icon> <el-icon-Search /> </el-icon>&nbsp;查询
            </el-button>
          </div>
        </div>
        <!-- table表格 -->
        <div class="mt-4">
          <el-table ref="multipleTableRef" :data="tableData">
            <el-table-column type="selection" width="30" />
            <el-table-column type="index" width="55" label="序号" />
            <el-table-column min-width="105" prop="CreateOn" label="创建时间" />
            <el-table-column min-width="95" prop="CreateName" label="创建人" />
            <el-table-column label="部门" min-width="120">
              <template #default="{ row }">
                <DepTabridge :key="row.UserId" :deptDetails="{ DivisionName: row.CompName, DeptName: row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="岗位" min-width="95" />
            <el-table-column prop="CourseName" label="课件名称" min-width="140" />
            <el-table-column prop="DisDateTime" label="分配时间" min-width="105"> </el-table-column>
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

            <el-table-column prop="model" label="操作" min-width="90">
              <template #default="{ row, $index }">
                <!-- {{ row.FilePathList }} -->
                <el-button @click="Openuploadwindow(row.Id, row.FilePathList)" link type="primary">课件上传</el-button>
              </template>
            </el-table-column>
          </el-table>

          <div class="flex justify-end mt-2">
            <el-pagination v-model:currentPage="data.query.page" v-model:page-size="data.query.size" :page-sizes="[10, 15, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" background />
          </div>
        </div>
      </el-card>
      <UploadWindow v-if="uploadData.showWindow" @closeuploadnWindow="closeuploadnWindow" :uploadData="uploadData" @successUpload="successClick" />
    </div>
    <!-- <Distribution v-if="PlanData.showWindow" @successClick="successClick" :PlanData="PlanData" @closePlanWindow="closePlanWindow" /> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, onMounted, ref, watch } from 'vue'
import Statistic from '/@/views/HR/Components/statistic/Index.vue'
import { useCommonStore } from '/@/store/modules/Common'
import DepTabridge from '/@/components/DepTabridge/index.vue'
// import Distribution from './_Components/DistributionForm.vue'
import { GetAllPlan, GetDistributionPlanCourse, GetFinishMakePlanCourse } from '/@/api/hr/Course'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetAllUserList } from '/@/api/layout/index'
import { useLayoutStore } from '/@/store/modules/layout'
import UploadWindow from './_Components/UploadWindow.vue'
import { parseTime } from '/@/utils/tools'

const store = useCommonStore()

// const Plan = (data: any) => {
//   // 是否显示弹窗
//   const PlanData = reactive({
//     showWindow: false,
//     Id: null as any
//   })
//   // 打开弹窗
//   const OpenPlanwindow = (Id: any) => {
//     PlanData.Id = Id
//     PlanData.showWindow = true
//   }
//   const closePlanWindow = () => {
//     PlanData.showWindow = false
//   }
//   return {
//     PlanData,
//     OpenPlanwindow,
//     closePlanWindow
//   }
// }
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
    // uploadData.FilePathList = FilePathList
    FilePathList.forEach((val: any, index: number) => {
      if (val.State) {
        val.uid = val.FileId
        val.name = val.FileName
        val.size = val.Size
        val.url = val.Path
        val.status = 'success'
      }
    })
    uploadData.FilePathList = FilePathList
    // console.log(uploadData.FilePathList)
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
    // Distribution,
    UploadWindow
  },
  setup() {
    // 拿到当前人Id
    const { getUserInfo } = useLayoutStore()

    // 所有变量
    const data = reactive({
      // 弹窗样式
      boxStyle: [],
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
      head: 'name',
      // 上传的文件
      upload: ''
    })
    // 资产采购table表中的筛选
    let formdata = ref({
      //   筛选的课件名称,
      CourseName: '',
      // 筛选的创建人
      CreateBy: '',
      // 筛选的分配人
      UserId: getUserInfo.Id,
      // 筛选的类型
      Type: ''
    })
    let formdatademo = {
      //   筛选的课件名称,
      CourseName: '',
      // 筛选的创建人
      CreateBy: '',
      // 筛选的分配人
      UserId: getUserInfo.Id,
      // 筛选的类型
      Type: ''
    }
    // 获取课程计划类型字典
    let storeData = store.getDict('CoursewareClass')
    storeData.then((res: any) => {
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
      findAllPlan({ UserId: getUserInfo.Id })
    }

    // 获取表单所有内容
    const findAllPlan = async (val: any) => {
      GetAllPlan({ ...data.query, ...val }).then((res: any) => {
        // console.log(res.data)
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
          findAllPlan({ UserId: getUserInfo.Id })
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

    // 分页
    const handleSizeChange = (val: number) => {
      data.query.size = val
      findAllPlan({ UserId: getUserInfo.Id })
    }
    const handleCurrentChange = (val: number) => {
      data.query.page = val
      findAllPlan({ UserId: getUserInfo.Id })
    }
    return {
      changeState,
      ClearForm,
      findAllUserList,
      filterPlan,
      successClick,
      data,
      formdata,
      tableData,
      handleSizeChange,
      handleCurrentChange,
      // ...Plan({ data }),
      ...upload({ data })
    }
  }
})
</script>
<style lang="postcss" scoped>
.Course-MyCourseware-index {
  :deep(.changeType) {
    .el-input__wrapper {
      width: 300px;
    }
    .InquireBtn {
      margin-left: 20px;
      color: #468bfd;
      border: 1px solid #468bfd;
    }
    .firstSelect {
      .el-input__wrapper {
        width: 150px;
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
