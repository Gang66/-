<template>
  <div class="assetManagement-AssetProcurement-Components-purchaseForm">
    <div class="flex justify-between">
      <div>资产采购</div>
      <div class="flex changeType">
        <!-- 下拉框选择方式 -->
        <el-select v-model="formdata.head" class="firstSelect">
          <el-option v-for="item in variable.FilterChannels" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <!-- 根据选择的不同展示不同的input框 -->
        <el-input v-if="formdata.head === 'name'" placeholder="请输入搜索内容" v-model="formdata.contant"></el-input>
        <el-date-picker v-else-if="formdata.head === 'times'" v-model="formdata.dates" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" value-format="YYYY-MM-DD" />
        <el-select v-else-if="formdata.head === 'channel'" v-model="formdata.channel">
          <el-option v-for="item in variable.options1" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button class="InquireBtn"
          ><el-icon> <el-icon-Search /> </el-icon>&nbsp;查询</el-button
        >
        <el-button type="primary" @click="addAssets"
          ><el-icon><el-icon-Monitor /></el-icon>&nbsp;资产申请</el-button
        >
      </div>
    </div>
    <!-- table表格 -->
    <div class="mt-4">
      <el-table ref="multipleTableRef" :data="tableData">
        <el-table-column type="selection" min-width="55" />
        <el-table-column type="index" width="55" label="序号" />
        <el-table-column min-width="120" prop="date" label="申请时间" />
        <el-table-column min-width="100" prop="name" label="申请人" />
        <el-table-column label="物品列表" min-width="80">
          <template #default="{ row }">
            <el-button type="primary" link @click="detailsBtn(row)">详情</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="channel" label="采购渠道" min-width="100" />
        <el-table-column prop="illustrate" label="申请说明" min-width="270" />
        <el-table-column prop="state" label="状态" min-width="100" />
        <el-table-column prop="illustrate" label="操作">
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
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import addPurchaseVue from './addPurchaseForm.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const addPurch = (datas: any) => {
  // 给弹窗传递的数据
  const addData = reactive({
    onlyadd: 1,
    showAddDialog: false,
    data: {},
    title: '新增资产采购'
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
export default defineComponent({
  components: {
    addPurchaseVue
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
          value: 'channel',
          label: '采购渠道'
        }
      ],
      // 分页
      query: {
        currentPage: 1,
        pageSize: 10
      }
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
      channel: ''
    })

    // table表单内容
    interface User {
      date: string
      name: string
      channel: string
      illustrate: string
      state: string
    }
    const tableData: User[] = reactive([
      {
        date: '2016-05-03',
        name: 'Tom',
        channel: '淘宝',
        illustrate: '因部门迎来多名员工需要采购一批电脑',
        state: '审批中'
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        channel: '淘宝',
        illustrate: '因部门迎来多名员工需要采购一批电脑',
        state: '审批中'
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        channel: '淘宝',
        illustrate: '因部门迎来多名员工需要采购一批电脑',
        state: '审批中'
      },
      {
        date: '2016-05-01',
        name: 'Tom',
        channel: '京东',
        illustrate: '因部门迎来多名员工需要采购一批电脑',
        state: '已驳回'
      },
      {
        date: '2016-05-08',
        name: 'Tom',
        channel: '京东',
        illustrate: '因部门迎来多名员工需要采购一批电脑',
        state: '已驳回'
      },
      {
        date: '2016-05-06',
        name: 'Tom',
        channel: '京东',
        illustrate: '因部门迎来多名员工需要采购一批电脑',
        state: '已通过'
      },
      {
        date: '2016-05-07',
        name: 'Tom',
        channel: '京东',
        illustrate: '因部门迎来多名员工需要采购一批电脑',
        state: '已通过'
      }
    ])

    // 分页
    const handleSizeChange = (val: number) => {}
    const handleCurrentChange = (val: number) => {}
    return {
      ...addPurch({ tableData }),
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
.assetManagement-AssetProcurement-Components-purchaseForm {
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
