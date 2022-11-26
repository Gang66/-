<template>
  <div class="otherlist">
    <div class="flex bg-white flex-wrap">
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
            <div class="pt-12">退货金额</div>
            <div class="text-xl">88</div>
          </div>
        </div>
        <div class="w-1/2 h-1/2 bg-white float-left p-1 border-blue-400 border-dashed border-t border-l">
          <div class="h-full">
            <div class="pt-12">未退货金额</div>
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
              <div class="">退货总量</div>
              <div class="text-xl">106</div>
            </div>
            <div class="flex-1 flex flex-col justify-center">
              <div class="">退货总金额</div>
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
      <div style="font-size: 16px; color: rgb(102, 102, 102); font-weight: 550;">
        收款列表
      </div>
      <div class="flex items-center">
        <div class="w-42">
          <el-input v-model="page.CusName" placeholder="请输入客户名称" class="" />
        </div>
        <el-button class="ml-2 addbutclass" @click="getlist" type="primary">搜索</el-button>
        <el-button class="addbutclass" :icon="Plus" @click="AddCollectionEvent">新增收款</el-button>
      </div>
    </div>
    <!-- 列表部分 -->
    <div class="">
      <el-table :data="data.tableData" :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '3rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="30" />
        <el-table-column type="index" width="60" label="序号"> </el-table-column>
        <el-table-column prop='CreateOn' label='提交时间' width="120">
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column prop='CreateOn' label='合同编号' width="140">
          <template #default="scope">{{ scope.row.ContractNo}}</template>
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
        <el-table-column prop="CreateOn" label="业务员">
          <template #default="scope">{{ scope.row.UserName }}</template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="付款方式">
          <template #default="scope">{{ dic.PaymentList.find((f) => f.DicKey == scope.row.PaymentType).DicValue || '' }}</template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="收款金额">
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="状态">
          <template #default="scope">
            <span class="text-red-400" v-if="scope.row.State == -2">已驳回</span>
            <span class="text-green-400" v-else-if="scope.row.State == 100">已通过</span>
            <span v-else>审批中</span>
          </template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="操作">
          <template #default="scope">
            <el-link type="primary" @click="ViewCollectionEvent(scope.row.Id)"> 查看</el-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination v-model:page-size="page.size" small :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>

    <AddCollection :title="'新增收款'" v-if="ShowCollection.show" :ViewType="ShowCollection.viewtype" :ContractId="0" :DataId="ShowCollection.dataId" @cancelContract="cancelCollection"> </AddCollection>
  </div>
</template>
<script lang="ts" setup>
import { GetCollectionList } from '/@/api/Sale/Receivable'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
// 组件
import AddCollection from '../Contract/Collection/AddCollection.vue'

// 图片
import rili from '/@/assets/img/sale/contractlibrary/rili.png'

import { useCommonStore } from '/@/store/modules/Common'

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

//#region 申请收款
const ShowCollection = reactive({
  show: false,
  contractid: 0,
  viewtype: 1,
  dataId: 0
})

const AddCollectionEvent = () => {
  ShowCollection.dataId = 0
  ShowCollection.viewtype = 1
  ShowCollection.show = true
}

const ViewCollectionEvent = (val: any) => {
  ShowCollection.dataId = val
  ShowCollection.viewtype = 2
  ShowCollection.show = true
}

const cancelCollection = () => {
  ShowCollection.show = false
}
//#endregion

// #region table列表
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
  GetCollectionList(page).then((res) => {
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
const store = useCommonStore() //记得加这一句
const dic = reactive({
  Stage: [],
  Reason: [],
  PaymentList: []
})
//获取字典数据
const getDictionaryData = () => {
  //售后等级
  store.getDict('sale_AfterSales_State').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Stage = res
  })
  //付款方式
  store.getDict('sale_Collection_Type').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.PaymentList = res
  })
  //售后原因阶段
  store.getDict('sale_AfterSale_Reason').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Reason = res
    console.log(' dic.Reason', dic.Reason)
  })
}
//#endregion

onMounted(() => {
  getDictionaryData()
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
