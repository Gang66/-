<template>
  <div class="AssetManagement-AssetProcurement-Components-purchaseForm">
    <div class="flex justify-between">
      <div>资产记录</div>

      <div class="flex changeType">
        <!-- 下拉框选择方式 -->
        <el-select v-model="formdata.head" class="firstSelect">
          <el-option v-for="item in variable.FilterChannels" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 根据选择的不同展示不同的input框 -->
        <el-input v-if="formdata.head === 'name'" placeholder="请输入搜索内容" v-model="formdata.contant"></el-input>
        <el-date-picker v-else-if="formdata.head === 'times'" v-model="formdata.dates" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD" />
        <el-select v-else-if="formdata.head === 'category'" v-model="formdata.category">
          <el-option v-for="item in variable.options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button class="InquireBtn"
          ><el-icon> <el-icon-Search /> </el-icon>&nbsp;查询</el-button
        >
        <el-button class="InquireBtn"
          ><el-icon><el-icon-Briefcase /></el-icon>&nbsp;设备维修</el-button
        >
        <el-button class="InquireBtn"
          ><el-icon><el-icon-Briefcase /></el-icon>&nbsp;编码生成</el-button
        >

        <el-button type="primary" @click="addAssets"
          ><el-icon><el-icon-Monitor /></el-icon>&nbsp;资产申请</el-button
        >
      </div>
    </div>
    <!-- table表格 -->
    <div class="mt-4">
      <el-table ref="multipleTableRef" :data="tableData">
        <el-table-column type="selection" width="30" />
        <el-table-column type="index" width="55" label="序号" />
        <el-table-column min-width="120" prop="date" label="创建时间" />
        <el-table-column min-width="100" prop="name" label="创建人" />
        <el-table-column label="资产内容" min-width="100">
          <template #default="{ row }">
            <el-button type="primary" link @click="detailsBtn(row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="资产类别" min-width="100" />
        <el-table-column prop="model" label="规格型号" min-width="100" />
        <el-table-column prop="department" label="使用部门" min-width="150">
          <template #default="{ row }">
            <DepTabridge :key="row.UserId" :deptDetails="{ DivisionName: row.BusinessDivision, DeptName: row.department }"></DepTabridge>
          </template>
        </el-table-column>
        <el-table-column prop="people" label="使用人" min-width="70" />
        <el-table-column prop="source" label="来源" min-width="60" />
        <el-table-column prop="state" label="状态" min-width="60" />
        <el-table-column label="维修记录" min-width="90">
          <template #default="{ row }">
            <el-button link type="primary" @click="OpenWindow(row)">维修记录</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="state" label="照片" min-width="60">
          <template #default="{ row }">
            <el-button link type="primary" @click="ShowPicture(row)">查看</el-button>
          </template>
        </el-table-column>

        <el-table-column prop="model" label="操作" min-width="100">
          <template #default="{ row, $index }">
            <div class="flex">
              <el-button link type="primary" @click="edits(row)">编辑</el-button>
              <el-button link type="primary" @click="delAssets(row, $index)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end mt-2">
        <el-pagination v-model:currentPage="variable.query.currentPage" v-model:page-size="variable.query.pageSize" :page-sizes="[10, 15, 20, 30]" layout="total, sizes, prev, pager, next, jumper" :total="100" @size-change="handleSizeChange" @current-change="handleCurrentChange" background />
      </div>
    </div>

    <!-- 资产新增页面 -->
    <addPurchaseVue v-if="addData.showAddDialog" :addData="addData" @closeAddDialog="closeAddDialog" />
    <!-- 查看维修的弹窗 -->
    <repairForm @closeWindow="closeWindow($event)" v-if="variable.ShowRepair" />
    <!-- 查看图片 -->
    <el-dialog v-model="variable.PictureDialog" title="图片" width="50%">
      <div>图片展示</div>
      <img src="" alt="" />
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import addPurchaseVue from './addPurchaseForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import repairForm from './repairFrom.vue'
// 资产申请 编辑 查看弹窗
const addPurch = (datas: any) => {
  // 给弹窗传递的数据
  const addData = reactive({
    onlyadd: 1,
    showAddDialog: false,
    data: {},
    title: '新增资产'
  })
  // 打开新增
  const addAssets = () => {
    addData.showAddDialog = true
    addData.onlyadd = 1
  }
  const closeAddDialog = () => {
    addData.showAddDialog = false
  }
  // 点击查看详情
  const detailsBtn = (val: any) => {
    addData.data = val
    addData.onlyadd = 2
    addData.showAddDialog = true
  }
  // 点击编辑
  const edits = (val: any) => {
    addData.data = val
    addData.onlyadd = 3
    addData.showAddDialog = true
  }
  // 删除资产
  const delAssets = (row: any, index: any) => {
    ElMessageBox.confirm('确认要删除该信息吗', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        datas.tableData.splice(index, 1)
        ElMessage({
          type: 'success',
          message: '删除成功'
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消操作'
        })
      })
  }
  return { delAssets, edits, addData, detailsBtn, closeAddDialog, addAssets }
}
// 维修记录弹窗
const Repair = (data: any) => {
  // 打开维修记录的弹窗
  const OpenWindow = (val: any) => {
    data.ShowRepair = true
  }
  // 关闭维修记录的弹窗
  const closeWindow = (val: any) => {
    if (val === 'close') {
      data.ShowRepair = false
    }
  }
  return { OpenWindow, closeWindow }
}
export default defineComponent({
  components: {
    addPurchaseVue,
    DepTabridge,
    repairForm
  },
  setup() {
    // 所有变量
    const variable = reactive({
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
          value: 'category',
          label: '采购渠道'
        }
      ],
      // 分页
      query: {
        currentPage: 1,
        pageSize: 10
      },
      // 点击查看照片显示dialog
      PictureDialog: false,
      // 是否显示维修列表弹窗
      ShowRepair: false
    })
    // 资产采购table表中的筛选
    const formdata = reactive({
      // 筛选方式默认名字
      head: 'name',
      // 筛选的内容
      contant: '',
      // 时间筛选的内容
      dates: [],
      // 筛选渠道的内容
      category: ''
    })

    // table表单内容

    let tableData = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        category: '电子设备',
        model: '#30',
        state: '在用',
        people: '王丽',
        source: '其他',
        department: '人力资源部',
        BusinessDivision: '集团总部'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        category: '家具用具',
        model: '',
        state: '在用',
        people: '王丽',
        source: '其他',
        department: '人力资源部',
        BusinessDivision: '集团总部'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        category: '电子设备',
        model: '',
        state: '在用',
        people: '王丽',
        source: '其他',
        department: '人力资源部',
        BusinessDivision: '集团总部'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        category: '家具用具',
        model: '',
        state: '在用',
        people: '王丽',
        source: '其他',
        department: '人力资源部',
        BusinessDivision: '集团总部'
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        category: '家具用具',
        model: '',
        state: '在用',
        people: '王丽',
        source: '其他',
        department: '人力资源部',
        BusinessDivision: '集团总部'
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        category: '家具用具',
        model: '',
        state: '在用',
        people: '王丽',
        source: '其他',
        department: '人力资源部',
        BusinessDivision: '集团总部'
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        category: '家具用具',
        model: '',
        state: '在用',
        people: '',
        source: '购入',
        department: '人力资源部',
        BusinessDivision: '集团总部'
      }
    ])
    // 显示查看图片dialog
    const ShowPicture = (val: any) => {
      variable.PictureDialog = true
    }

    // 分页
    const handleSizeChange = (val: number) => {}
    const handleCurrentChange = (val: number) => {}
    return {
      ...addPurch({ tableData }),
      ...Repair(variable),
      ShowPicture,
      formdata,
      tableData,
      variable,
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
