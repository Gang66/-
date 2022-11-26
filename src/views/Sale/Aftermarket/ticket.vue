<template>
  <div class="otherlist">
    <div class="flex bg-white flex-wrap ">
      <div class="w-60 h-60 p-2 bg-white text-blue-800 font-bold text-center relative border-blue-400 border-solid border-4 rounded-lg mr-2">
        <div class="w-1/2 h-1/2 bg-white float-left p-1 border-blue-400 border-dashed border-b border-r">
          <div class="h-full">
            <div class="pt-2">已通过</div>
            <div class="text-xl">88</div>
          </div>
        </div>
        <div class="w-1/2 h-1/2 bg-white float-left p-1">
          <div class="h-full">
            <div class="pt-2">驳回</div>
            <div class="text-xl">88</div>
          </div>
        </div>
        <div class="w-1/2 h-1/2 bg-white float-left p-1">
          <div class="h-full">
            <div class="pt-12">开票金额</div>
            <div class="text-xl">88</div>
          </div>
        </div>
        <div class="w-1/2 h-1/2 bg-white float-left p-1 border-blue-400 border-dashed border-t border-l">
          <div class="h-full">
            <div class="pt-12">未开票金额</div>
            <div class="text-xl">88</div>
          </div>
        </div>
        <div class="w-2/5 h-2/5 p-1 float-left bg-white rounded-full border-blue-400 border-solid border" style="position: absolute; top: 4.6rem; left: 4.3rem">
          <div class="h-full text-red-600">
            <div class="pt-6">未审批</div>
            <div class="text-xl">88</div>
          </div>
        </div>
      </div>
      <div class="flex h-60 p-2 border-blue-400 border-solid border-4 rounded-lg">
        <div class="text-blue-800 font-bold">
          <div class="w-40 h-full text-center p-1 border-blue-400 border-dashed border-r flex flex-col items-center">
            <div class="flex-1 flex flex-col justify-center border-b border-blue-400 border-dashed px-5">
              <div class="">开票总量</div>
              <div class="text-xl">106</div>
            </div>
            <div class="flex-1 flex flex-col justify-center">
              <div class="">开票总金额</div>
              <div class="text-xl">1356</div>
            </div>
          </div>
        </div>
        <div id="myecharts" />
      </div>
    </div>
    <!-- 分割线 -->
    <div class="w-full my-2 border-b border-dashed border-gray-500" />

    <!-- 中间搜索部分 -->
    <div class="flex items-center justify-between mb-2">
      <div class="flex items-center" style="font-size: 16px; color: rgb(102, 102, 102); font-weight: 550;">
        开票申请
      </div>
      <div class="flex items-center">
        <div class="w-42">
          <el-input v-model="page.CusName" placeholder="请输入客户名称" class="" />
        </div>
        <el-button class="ml-2 addbutclass" type="primary" @click="getlist">搜索</el-button>
        <el-button class="addbutclass" :icon="Plus" @click="AddInvoicing">开票申请</el-button>
      </div>
    </div>
    <!-- 列表部分 -->
    <div class="">
      <el-table :data="data.tableData" :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '3rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30" />
        <el-table-column type="index" width='60' label='序号'></el-table-column>
        <el-table-column prop='CreateOn' label='提交时间' width="120">
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='合同编号' width="140">
          <template #default="scope">{{ scope.row.ContractCode}}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='客户名称' width="350">
          <template #default="scope">{{ scope.row.CustomerName}}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='签约单位'>
          <template #default="scope">{{ scope.row.CompName}}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='合同金额'>
          <template #default="scope">{{ scope.row.ContractAmount}}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='业务员'>
          <template #default="scope">{{ scope.row.Salerman}}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='出票单位'>
          <template #default="scope">{{ scope.row.CompanyName}}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='开票金额'>
          <template #default="scope">{{ scope.row.Amount}}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='状态'>
          <template #default="scope">
            <span class="text-red-400" v-if="scope.row.State==-2">已驳回</span>
            <span class="text-green-400" v-else-if="scope.row.State==100">已通过</span>
            <span v-else>审批中</span>
          </template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='操作'>
          <template #default="scope">
            <el-link type="primary" @click="ViewInvoicing(scope.row.Id)"> 查看</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination v-model:page-size="page.size" small :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>

    <Invoicing
      v-if="ShowInvoicing.show"
      :title="'开票申请'"
      :ViewType="ShowInvoicing.viewtype"
      :contract-id="0"
      :DataId="ShowInvoicing.dataId"
      @cancel-contract="cancelInvoicing"
    />
  </div>
</template>
<script lang="ts" setup>
import { GetInvoicingList } from '/@/api/Sale/AfterSale'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 组件
import Invoicing from '../Contract/AfterSalesService/Invoicing.vue'

// 图片
import rili from '/@/assets/img/sale/contractlibrary/rili.png'

//#region 绘制柱状图
const { proxy } = getCurrentInstance() as any
const echarts = proxy.$echarts
const mychart: any = ref({})

const option = {
  title: {
    subtext: '金额（万）'
  },
  legend: {
    data: [],
    right: '10%'
  },

  tooltip: {},
  dataset: {
    source: [
      ['product', '礼品费'],
      ['1', 43.3],
      ['2', 83.1],
      ['3', 86.4],
      ['4', 43.4],
      ['5', 67.4],
      ['6', 23.4],
      ['7', 11.4],
      ['8', 67.4],
      ['9', 14.4],
      ['10', 34.4],
      ['11', 72.4],
      ['12', 55]
    ]
  },
  xAxis: { type: 'category', name: '月份' },
  yAxis: {},
  grid: [{ bottom: '10%' }],
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: 'bar' }]
}
//#endregion

// 中间搜索部分
const centerFind = reactive({
  keyword: '',
  // 并列
  bl_select_value: undefined,
  bl_select_list: [
    { value: 1, name: '测试1' },
    { value: 2, name: '测试2' },
    { value: 3, name: '测试3' }
  ],
  // 按日期排序
  time_select_value: undefined,
  time_select_list: [
    { value: 1, name: '按日期升序' },
    { value: 2, name: '按日期降序' },
    { value: 3, name: '按金额升序' },
    { value: 4, name: '按金额降序' }
  ],
  // 年月日索引、列表
  year_key: -1,
  year_list: [
    { value: 0, name: '前' },
    { value: 1, name: '日' },
    { value: 2, name: '周' },
    { value: 3, name: '月' },
    { value: 4, name: '年' }
  ],
  setKey: (data: any) => {
    if (centerFind.year_key == data) {
      centerFind.year_key = -1
    } else {
      centerFind.year_key = data
    }
  }
})
const cleanMsg = () => {
  centerFind.keyword = ''
  centerFind.time_select_value = undefined
}

// #region 申请开票
const ShowInvoicing = reactive({
  show: false,
  viewtype: 1,
  dataId: 0
})

// 新增
const AddInvoicing = () => {
  ShowInvoicing.dataId = 0
  ShowInvoicing.viewtype = 1
  ShowInvoicing.show = true
}
// 查看
const ViewInvoicing = (val: any) => {
  ShowInvoicing.dataId = val
  ShowInvoicing.viewtype = 2
  ShowInvoicing.show = true
}

const cancelInvoicing = () => {
  ShowInvoicing.show = false
}
// #endregion

//#region 
// table列表
const data = reactive({
  count: 0,
  tableData: []
})
// 分页信息
const page = reactive({
  page: 1,
  size: 10,
  count: 0,
  CusName: ''
})
const getlist = () => {
  GetInvoicingList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}

// table选择功能
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}
// 分页
const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}
//#endregion

onMounted(() => {
  getlist()
  // 绘制柱状图
  let domMap = <any>document.getElementById('myecharts')
  domMap.removeAttribute('_echarts_instance_')
  mychart.value = echarts.init(domMap)
  mychart.value.setOption(option, true)
})
</script>

<style lang="postcss" scoped>
#myecharts {
  background: #ffffff;
  width: 63rem;
  height: 14rem;
}
.otherlist {
  .butclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #468bfd;
    background: #ffffff;
    &:focus {
      background-color: #e3ebf3;
    }
    &:hover {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
    &:active {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
  }
  .addbutclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #fff;
    background: #468bfd;
    &:focus {
      background-color: #3971ce;
    }
    &:hover {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
    &:active {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
  }
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
.pointer {
  cursor: pointer;
}
.change-key {
  background: rgb(70, 139, 253);
  color: #ffffff;
}
</style>
