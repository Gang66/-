<template>
  <div class="AssetManagement-AssetProcurement-Components-purchaseForm">
    <div class="flex justify-between">
      <div>{{ tableData.bigTitle }}</div>

      <div class="flex changeType">
        <!-- 下拉框选择方式 -->
        <el-select v-model="data.head" class="firstSelect" @change="replaceForm">
          <el-option v-for="item in data.FilterChannels" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 根据选择的不同展示不同的input框 -->
        <el-input v-if="data.head === 'name'" placeholder="请输入搜索内容" v-model="formdata.UserName"></el-input>
        <el-date-picker v-else-if="data.head === 'times'" v-model="formdata.dates" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY-MM-DD" value-format="YYYY-MM-DD" />
        <!-- <el-input  placeholder="请输入搜索部门" v-model="formdata.CompId"></el-input> -->
        <el-select clearable v-else-if="data.head === 'department'" v-model="formdata.CompId">
          <el-option v-for="item in data.Comp" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-button class="InquireBtn" @click="fiterList">
          <el-icon> <el-icon-Search /> </el-icon>&nbsp;查询
        </el-button>
      </div>
    </div>
    <!-- table表格 -->
    <div class="mt-4">
      <el-table ref="multipleTableRef" :data="tableDatas">
        <el-table-column type="selection" width="30" />
        <el-table-column label="序号" type="index" width="60" />
        <el-table-column prop="TrainDate" min-width="120" :label="tableData.tableDataTit.timeStart" />

        <el-table-column prop="UserName" width="80" label="姓名" />
        <el-table-column prop="sex" label="性别" width="80">
          <template #default="{ row }">
            {{ row.Sex === '1' ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="Age" label="年龄" width="80" />
        <el-table-column prop="WorkAge" label="工龄" width="80" />
        <el-table-column prop="department" label="部门" min-width="100">
          <template #default="{ row }">
            <DepTabridge :key="row.UserId" :deptDetails="{ DivisionName: row.CompName, DeptName: row.DeptName }"></DepTabridge>
          </template>
        </el-table-column>
        <el-table-column prop="PostName" label="岗位 " min-width="100" />
        <el-table-column prop="state" label="状态" min-width="80">
          <template #default="{ row }">
            <div class="flex items-center">
              <span class="text-3xl" :class="{ 'text-blue-400': row.State === '100' }">· </span>
              <span v-if="row.State === '0'">学习中</span>
              <span v-else-if="row.State === '100'">已完成</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="model" :label="tableData.tableDataTit.details" width="100">
          <template #default="{ row, $index }">
            <el-button link type="primary" @click="edits(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-2">
        <el-pagination v-model:currentPage="formdata.page" v-model:page-size="formdata.size" :page-sizes="[10, 15, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="data.total" @size-change="handleSizeChange" @current-change="handleCurrentChange" background />
      </div>
    </div>
    <!-- 资产新增页面 -->
    <addPurchaseVue v-if="addData.showAddDialog" :addData="addData" @closeAddDialog="closeAddDialog" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import addPurchaseVue from './addPurchaseForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetPlanUserStudyList } from '/@/api/hr/DataAnalysis'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore()

// 资产申请 编辑 查看弹窗
const addPurch = (datas: any) => {
  // 给弹窗传递的数据
  const addData = reactive({
    onlyadd: 1,
    showAddDialog: false,
    data: {}
    // Type: datas.prop.tableData.types
  })

  const closeAddDialog = () => {
    addData.showAddDialog = false
  }

  // 点击编辑
  const edits = (val: any) => {
    console.log(val)
    addData.data = val
    addData.showAddDialog = true
  }

  return { edits, addData, closeAddDialog }
}

export default defineComponent({
  components: {
    addPurchaseVue,
    DepTabridge
  },
  props: {
    tableData: {
      type: Object,
      default: {
        tableContant: Array,
        tableDataTit: {
          type: Object,
          default: {
            timeStart: null as any,
            timeEnd: null as any,
            details: null as any
          },
          bigTitle: String,
          types: String
        }
      }
    }
  },
  emits: ['changePageClick'],
  setup(prop, context) {
    // 所有变量
    const data = reactive({
      // 筛选的方式
      options1: [
        {
          value: 'taobao',
          label: '淘宝'
        },
        {
          value: 'jingdong',
          label: '京东'
        }
      ],
      // 筛选的渠道
      FilterChannels: [
        {
          value: 'name',
          label: '姓名'
        },
        {
          value: 'times',
          label: '时间范围'
        },
        {
          value: 'department',
          label: '部门'
        }
      ],

      // 点击查看照片显示dialog
      PictureDialog: false,
      // 是否显示维修列表弹窗
      ShowRepair: false,
      // 页面总数
      total: null as any,
      // 部门数据
      Comp: null as any,
      // 筛选方式默认名字
      head: 'name'
    })
    // 学习分析table表中的筛选
    let formdata = ref({
      // 筛选的名字
      UserName: '',
      // 时间筛选的时间
      dates: [],
      // 筛选的部门
      CompId: null as any,
      // 分页
      page: 1,
      size: 10
    })
    const formdatademo = {
      // 筛选的名字
      UserName: '',
      // 时间筛选的时间
      dates: [],
      // 筛选的部门
      CompId: null as any,
      // 分页
      page: 1,
      size: 10
    }
    // 获取部门数据
    store.getDept(1).then((res: any) => {
      console.log(res)
      data.Comp = res
    })

    // table表格数据
    let tableDatas = ref()

    // 封装公用接口，调取table中的数据
    const findGetPlanUserStudyList = async (form: any) => {
      if (prop.tableData.type) {
        const res = await GetPlanUserStudyList({ Type: prop.tableData.type, ...form })
        tableDatas.value = res.data.records
        data.total = res.data.totals
      } else {
        const res = await GetPlanUserStudyList({ Type: '1', ...form })
        tableDatas.value = res.data.records
        data.total = res.data.totals
      }
    }
    findGetPlanUserStudyList(null)

    // 筛选
    const fiterList = () => {
      findGetPlanUserStudyList({ ...formdata.value, BeginDate: formdata.value.dates[0], EndDate: formdata.value.dates[1] })
    }

    // 监听select下拉，把表单清空
    const replaceForm = (val: any) => {
      console.log(123)
      formdata.value = JSON.parse(JSON.stringify(formdatademo))
    }

    // 分页
    const handleSizeChange = (val: number) => {
      formdata.value.size = val
      findGetPlanUserStudyList(formdata.value)
    }
    const handleCurrentChange = (val: number) => {
      formdata.value.page = val
      findGetPlanUserStudyList(formdata.value)
    }
    watch(
      () => prop.tableData.type,
      (val) => {
        findGetPlanUserStudyList(formdata.value)
      },
      { deep: true }
    )
    return {
      replaceForm,
      fiterList,
      ...addPurch({ tableDatas, prop }),
      formdata,
      tableDatas,
      data,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style lang="postcss" scoped>
.AssetManagement-AssetProcurement-Components-purchaseForm {
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
