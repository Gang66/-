<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="pt-6">
      <div class="listtop flex px-2 py-4 pl-8 justify-between overflow-hidden">
        <div class="flex pl-8">
          <div class="flex" v-for="(itm, idx) in SopStatistics.List" :key="idx">
            <div class="bg-blue-bg border-white border-solid border-2 h-16 w-40 rounded-md mt-4 p-2">
              <el-row class="h-full">
                <div class="quonum h-5 pl-4 pr-8 z-10">
                  <div class="w-full text-center">
                    <div class="text-xs leading-5">{{ itm.name }}</div>
                  </div>
                </div>
                <el-col :span="24">
                  <div class="border-white border-dashed border h-full rounded-md flex-col flex text-center justify-center items-center px-2">
                    <div class="text-lg relative">
                      <div class="flex items-center absolute -top-2.5 -right-9 text-xs text-red-600 scale-75" v-if="itm.isup"><svg-icon class="text-xl" icon-class="svg-rise" /> +{{ itm.ratio }}%</div>
                      <div class="flex items-center absolute -top-2.5 -right-9 text-xs text-green-600 scale-75" v-else><svg-icon class="text-xl" icon-class="svg-fall" /> -{{ itm.ratio }}%</div>
                      {{ itm.money }}
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>
            <div class="w-8 h-16 mt-4 py-2" v-if="idx + 1 != SopStatistics.List.length">
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7abae1 0%, #2d80b4 49%, #82afcb 100%)"></div>
              </div>
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7abae1 0%, #2d80b4 49%, #82afcb 100%)"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 底部table -->
    <div class="center-tabs rounded-t-lg overflow-hidden mt-2">
      <div class="flex justify-between">
        <div style="width: 430px" class="mb-2">
          <el-tabs v-model="btmTable.activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="部门经理" :name="0" />
            <el-tab-pane label="异常费" :name="1" />
            <el-tab-pane label="加价" :name="2" />
            <el-tab-pane label="奖金" :name="3" />
            <el-tab-pane label="提成" :name="4" />
          </el-tabs>
        </div>
        <div class="flex items-center" v-if="btmTable.activeName == 0">
          <div class="flex">
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('前')" :class="btmTable.timetype == '前' ? 'bg-blue-but text-white' : 'bg-white'">前</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('日')" :class="btmTable.timetype == '日' ? 'bg-blue-but text-white' : 'bg-white'">日</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('周')" :class="btmTable.timetype == '周' ? 'bg-blue-but text-white' : 'bg-white'">周</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('月')" :class="btmTable.timetype == '月' ? 'bg-blue-but text-white' : 'bg-white'">月</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('季')" :class="btmTable.timetype == '季' ? 'bg-blue-but text-white' : 'bg-white'">季</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('年')" :class="btmTable.timetype == '年' ? 'bg-blue-but text-white' : 'bg-white'">年</div>

            <el-popover placement="bottom" :width="300" trigger="click">
              <template #reference>
                <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer pt-1" @click="clicktime('自')" :class="btmTable.timetype == '自' ? 'bg-blue-but text-white' : 'bg-white'">
                  <el-icon-Calendar class="w-4 h-4 mr-2"></el-icon-Calendar>
                </div>
              </template>
              <el-date-picker v-model="btmTable.SeachDate" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small" style="width: 250px" />
            </el-popover>
          </div>
          <div class="w-42">
            <el-input v-model="btmTable.keyword" placeholder="请输入关键字" class="" />
          </div>
          <el-button class="ml-2" type="primary">搜索</el-button>
        </div>
        <div class="flex items-center" v-else-if="btmTable.activeName == 1">
          <div class="w-42">
            <el-input v-model="btmTable.keyword" placeholder="请输入关键字" class="" />
          </div>
          <el-button class="ml-2" type="primary">搜索</el-button>
          <el-button class="ml-2" type="primary" @click="openContract()">异常申请</el-button>
        </div>
        <div class="flex items-center" v-else-if="btmTable.activeName == 2">
          <div class="w-42">
            <el-input v-model="btmTable.keyword" placeholder="请输入关键字" class="" />
          </div>
          <el-button class="ml-2" type="primary">搜索</el-button>
        </div>
        <div class="flex items-center" v-else-if="btmTable.activeName == 3">
          <div class="w-42">
            <el-input v-model="btmTable.keyword" placeholder="请输入关键字" class="" />
          </div>
          <el-button class="ml-2" type="primary">搜索</el-button>
        </div>
        <div class="flex items-center" v-else>
          <div class="w-42">
            <el-input v-model="btmTable.keyword" placeholder="请输入关键字" class="" />
          </div>
          <el-button class="ml-2" type="primary">搜索</el-button>
        </div>
      </div>

      <!-- 部门经理 -->
      <div v-if="btmTable.activeName == 0">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.tableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="日期" align="center" width="100" />
          <el-table-column property="name" label="事业部" align="center" />
          <el-table-column property="salesman" label="团建费" align="center" />
          <el-table-column property="department" label="居间费" align="center" />
          <el-table-column property="unit" label="异常费" align="center" />
          <el-table-column property="money" label="奖金费" align="center" />
          <el-table-column property="real_money" label="提成费" align="center" />
          <el-table-column property="status" label="加价费" align="center" />
          <el-table-column property="down_money" label="绩效费" align="center" />
          <el-table-column property="cooperation" label="合计总额" align="center" />
        </el-table>
      </div>
      <!-- 异常费 -->
      <div v-if="btmTable.activeName == 1">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.tableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="日期" align="center" width="100" />
          <el-table-column property="salesman" label="姓名" align="center" />
          <el-table-column property="salesman" label="岗位" align="center" />
          <el-table-column property="department" label="事业部" align="center" />
          <el-table-column property="name" label="异常事由" align="center" width="400" />
          <el-table-column property="money" label="异常金额" align="center" />
          <el-table-column property="money" label="异常处理" align="center">
            <template #default="scope">
              <span>申请中</span>
              <!-- <span class="text-yellow-900">审批中</span>
              <span class="text-blue-500">执行中</span>
              <span class="text-green-500">成功</span>
              <span class="text-red-500">失败</span> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 加价 -->
      <div v-if="btmTable.activeName == 2">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.yslbTableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="合同日期" align="center" width="100" />
          <el-table-column property="department" label="姓名" align="center" />
          <el-table-column property="department" label="事业部" align="center" />
          <el-table-column property="department" label="业绩金额" align="center">
            <template #default="scope">
              <span v-if="scope.row.moment >= 4">{{ 300000 }}</span>
              <span v-else-if="scope.row.moment >= 3">{{ 150000 }}</span>
              <span v-else-if="scope.row.moment >= 2">{{ 100000 }}</span>
              <span v-else-if="scope.row.moment >= 0.5">{{ 50000 }}</span>
              <span v-else>0</span>
            </template>
          </el-table-column>
          <el-table-column property="name" label="客户名称" align="center" width="400" />
          <el-table-column property="yq_money" label="合同金额" align="center" />
          <el-table-column property="wyq_money" label="加价金额" align="center" />
          <el-table-column property="wyq_money" label="加价分配" align="center">
            <el-table-column property="ys_money" label="集团" align="center" />
            <el-table-column property="ws_money" label="团建" align="center" />
            <el-table-column property="ws_money" label="事业部" align="center" />
            <el-table-column property="ws_money" label="部门" align="center" />
            <el-table-column property="ws_money" label="业务员" align="center" />
          </el-table-column>
        </el-table>
      </div>
      <!-- 奖金 -->
      <div v-if="btmTable.activeName == 3">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.tableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="合同日期" align="center" width="100" />
          <el-table-column property="salesman" label="姓名" align="center" />
          <el-table-column property="salesman" label="岗位" align="center" />
          <el-table-column property="department" label="季业绩金额" align="center" />
          <el-table-column property="name" label="客户名称" align="center" width="400" />
          <el-table-column property="ss_money" label="合同金额" align="center" />
          <el-table-column property="ss_money" label="成交金额" align="center" />
          <el-table-column property="ss_money" label="奖金比例" align="center" />
          <el-table-column property="ss_money" label="奖金金额" align="center" />
          <el-table-column property="ss_money" label="减提金额" align="center" />
        </el-table>
      </div>
      <!-- 提成 -->
      <div v-if="btmTable.activeName == 4">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.tableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="合同日期" align="center" width="100" />
          <el-table-column property="salesman" label="姓名" align="center" />
          <el-table-column property="salesman" label="事业部" align="center" />
          <el-table-column property="department" label="客户名称" align="center" width="400" />
          <el-table-column property="ss_money" label="合同金额" align="center" />
          <el-table-column property="ss_money" label="成交金额" align="center" />
          <el-table-column property="ss_money" label="提成比例" align="center" />
          <el-table-column property="ss_money" label="提成金额" align="center" />
          <el-table-column property="ss_money" label="减提金额" align="center" />
        </el-table>
      </div>
      <div class="flex justify-between items-center mt-2 px-4">
        <div class="text-gray-500 text-sm">
          最近更新时间：2022/03/01 13：35
          <span class="ml-5">共50条数据</span>
        </div>
        <el-pagination v-model:page-size="btmTable.size" small :background="true" layout="prev, pager, next, jumper" :total="btmTable.totals" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 新增异常申请 -->
    <Add :title="ShowChildDialog.title" v-if="ShowChildDialog.show" :ViewType="ShowChildDialog.viewtype" :DataId="ShowChildDialog.dataId" @closeWindow="cancelContract"></Add>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { ElTable } from 'element-plus'
import Add from '../Cost/ExceptionRequest/ExceptionRequest.vue'

//#region  顶部统计
const SopStatistics = reactive({
  List: [
    {
      name: '居间费',
      money: 138000,
      isup: 1,
      ratio: 5.8
    },
    {
      name: '团建费',
      money: 138000,
      isup: 1,
      ratio: 5.8
    },
    {
      name: '承包值-总额',
      money: 138000,
      isup: 0,
      ratio: 5.8
    },
    {
      name: '承包值-提成',
      money: 138000,
      isup: 0,
      ratio: 5.8
    },
    {
      name: '承包值-加价',
      money: 138000,
      isup: 1,
      ratio: 5.8
    },
    {
      name: '承包值-奖金',
      money: 138000,
      isup: 1,
      ratio: 5.8
    },
    {
      name: '承包值-异常',
      money: 138000,
      isup: 1,
      ratio: 5.8
    }
  ]
})
//#endregion

// table部分
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const btmTable = <any>reactive({
  keyword: '',
  // 按日期排序
  time_select_value: undefined,
  time_select_list: [
    { value: 1, name: '按日期升序' },
    { value: 2, name: '按日期降序' },
    { value: 3, name: '按金额升序' },
    { value: 4, name: '按金额降序' }
  ],
  // tabs索引
  activeName: 0,
  // table表格
  multipleSelection: '',
  // 单层
  tableSty: {
    background: '#468bfd',
    color: '#F5F8FF',
    height: '60px'
    // padding: '15px 0'
  },
  // 双层
  yslbTableSty: {
    height: '30px',
    background: '#468bfd',
    color: '#F5F8FF'
  },
  tableData: [
    {
      time: '2022-06-22',
      name: '山东华隆设备制造有限公司',
      salesman: '司徒四字',
      department: '业务一部',
      unit: '北方高中压',
      money: '138000',
      real_money: '137000',
      status: 1,
      down_money: '1000',
      cooperation: '3'
    },
    {
      time: '2022-06-22',
      name: '山东华隆设备制造有限公司',
      salesman: '司徒四字',
      department: '业务一部',
      unit: '北方高中压',
      money: '138000',
      real_money: '137000',
      status: 2,
      down_money: '1000',
      cooperation: '3'
    },
    {
      time: '2022-06-22',
      name: '山东华隆设备制造有限公司',
      salesman: '司徒四字',
      department: '业务一部',
      unit: '北方高中压',
      money: '138000',
      real_money: '137000',
      status: 3,
      down_money: '1000',
      cooperation: '3'
    },
    {
      time: '2022-06-22',
      name: '山东华隆设备制造有限公司',
      salesman: '司徒四字',
      department: '业务一部',
      unit: '北方高中压',
      money: '138000',
      real_money: '137000',
      status: 4,
      down_money: '1000',
      cooperation: '3'
    },
    {
      time: '2022-06-22',
      name: '山东华隆设备制造有限公司',
      salesman: '司徒四字',
      department: '业务一部',
      unit: '北方高中压',
      money: '138000',
      real_money: '137000',
      status: 5,
      down_money: '1000',
      cooperation: '3'
    }
  ],
  // 分页
  page: 1,
  size: 10,
  totals: 0,
  timetype: ''
})

// 初始化列表
const getPageInfo = (table = 0) => {
  // GetContractList(page).then((res) => {
  //     if (res.code == 1) {
  //     data.tableData = res.data.list
  //     page.count = res.data.count
  //     console.log('---------------------------------------', data.tableData)
  //     }
  // })
  console.log(table)
  if (table == 0) {
    btmTable.tableData = [
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '业务一部',
        unit: '北方高中压',
        money: '138000',
        real_money: '137000',
        status: 1,
        down_money: '1000',
        cooperation: '3'
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '业务一部',
        unit: '北方高中压',
        money: '138000',
        real_money: '137000',
        status: 2,
        down_money: '1000',
        cooperation: '3'
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '业务一部',
        unit: '北方高中压',
        money: '138000',
        real_money: '137000',
        status: 3,
        down_money: '1000',
        cooperation: '3'
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '业务一部',
        unit: '北方高中压',
        money: '138000',
        real_money: '137000',
        status: 4,
        down_money: '1000',
        cooperation: '3'
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '业务一部',
        unit: '北方高中压',
        money: '138000',
        real_money: '137000',
        status: 5,
        down_money: '1000',
        cooperation: '3'
      }
    ]
  } else if (table == 1) {
    btmTable.tableData = [
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        yfk: 1000,
        fhk: 1000,
        dhk: 13825,
        ysk: 137000,
        zbj: '-',
        status: 1,
        received_money: '137000',
        no_money: '137000'
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        yfk: 1000,
        fhk: 1000,
        dhk: 13825,
        ysk: 137000,
        zbj: '-',
        status: 2,
        received_money: '137000',
        no_money: '137000'
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        yfk: 1000,
        fhk: 1000,
        dhk: 13825,
        ysk: 137000,
        zbj: '-',
        status: 3,
        received_money: '137000',
        no_money: '137000'
      }
    ]
  } else if (table == 2) {
    btmTable.tableData = [
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        yq_money: 1000,
        wyq_money: 1000,
        ys_money: 1000,
        ws_money: 1000,
        yq_day: 25
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        yq_money: 1000,
        wyq_money: 1000,
        ys_money: 1000,
        ws_money: 1000,
        yq_day: 100
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        yq_money: 1000,
        wyq_money: 1000,
        ys_money: 1000,
        ws_money: 1000,
        yq_day: 186
      }
    ]
  } else {
    btmTable.tableData = [
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        ss_money: 1000,
        ss_status: 1,
        flwj: 1,
        yq_day: 186
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        ss_money: 1000,
        ss_status: 2,
        flwj: 0,
        yq_day: 50
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        ss_money: 1000,
        ss_status: 3,
        flwj: 1,
        yq_day: 100
      },
      {
        time: '2022-06-22',
        name: '山东华隆设备制造有限公司',
        salesman: '司徒四字',
        department: '潍坊事业部',
        unit: '北方高中压',
        money: '138000',
        ss_money: 1000,
        ss_status: 4,
        flwj: 1,
        yq_day: 25
      }
    ]
  }
}
// 日期
const clicktime = (val: any) => {
  btmTable.timetype = val
}

// 勾选
const handleSelectionChange = (val: any) => {
  console.log(val)
  btmTable.multipleSelection = val
}
// 选择tabs
const handleClick = (tab: any) => {
  btmTable.page = 1
  btmTable.size = 10
  btmTable.totals = 0
  getPageInfo(tab)
}

// 分页
const handleSizeChange = (val: number) => {
  btmTable.size = val
}
const handleCurrentChange = (val: number) => {
  btmTable.page = val
}

//#region 异常申请
const ShowChildDialog = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '异常处理申请'
})
// 新增
const openContract = () => {
  ShowChildDialog.value.viewtype = 1
  ShowChildDialog.value.show = true
}
// 关闭
const cancelContract = () => {
  ShowChildDialog.value.show = false
}

onMounted(() => {
  // 初始化列表
  getPageInfo()
})
</script>

<style lang="postcss" scoped>
:deep(.el-dropdown-menu__item):hover {
  color: var(--el-text-color-regular);
  background: none;
}
.center-tabs {
  :deep(.el-table thead .el-table__cell) {
    padding: 0;
  }
  :deep(.el-tabs__item.is-active) {
    color: #468bfd;
  }
  :deep(.el-tabs__item) {
    font-size: 16px;
    color: #666;
    font-weight: 550;
  }
  :deep(.el-tabs__header) {
    margin: 0px 0 5px;
  }
  :deep(.el-table tr th) {
    border-right: 1px solid #e5e7eb;
  }
  :deep(.el-table > tr > :nth-last-child(1)) {
    border-right: 0;
  }
  :deep(.el-table tr td) {
    border-right: 1px solid #e5e7eb;
  }
  :deep(.el-table > tr > :nth-last-child(1)) {
    border-right: 0;
  }
  :deep(.el-table .cell) {
    padding: 0 5px;
  }
}
.table-btm {
  background: #7a9def;
}

.listtop {
  background: url(../../../assets/img/sale/result/topbj.png);
  background-size: 100% 100%;
  /* height: 100px; */
  .rank {
    background: url(../../../assets/img/sale/result/cus_rank.png);
    background-size: 100% 100%;
    height: 90px;
    width: 90px;
  }
  .quonum {
    background: url(../../../assets/img/sale/result/bigtoptitle.png);
    background-size: 100% 100%;
    /* height: 20px; */
    position: absolute;
    top: -15px;
    left: -8px;
  }
  .jenum {
    background: url(../../../assets/img/sale/result/smalltoptitle.png);
    background-size: 100% 100%;
    height: 17px;
    width: 53px;
    position: relative;
    top: -59px;
    left: -6px;
  }
}
</style>
