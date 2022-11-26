<template>
  <div class="container">
    <!-- 顶部 -->
    <div class="pt-6">
      <div class="listtop flex px-2 py-4 pl-8 justify-between overflow-hidden">
        <div class="flex pl-8">
          <div class="flex" v-for="(itm, idx) in SopStatistics.List" :key="idx">
            <div class="bg-blue-bg border-white border-solid border-2 h-16 rounded-md mt-4 p-2">
              <el-row class="h-full">
                <div class="quonum h-5 pl-4 pr-8 z-10">
                  <div class="w-full text-center">
                    <div class="text-xs leading-5">{{ itm.name }}</div>
                  </div>
                </div>
                <el-col :span="24">
                  <div class="border-white border-dashed border h-full rounded-md flex text-center justify-center items-center">
                    <div class="px-2" v-for="(t, i) in itm.data" :key="i">
                      <div class="text-lg">
                        {{ t.value }}
                      </div>
                      <div class="text-xs scale-90">
                        {{ t.name }}
                      </div>
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
          <div class="flex justify-end absolute right-2 top-7">
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('前')" :class="timetype == '前' ? 'bg-blue-but text-white' : 'bg-white'">前</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('日')" :class="timetype == '日' ? 'bg-blue-but text-white' : 'bg-white'">日</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('周')" :class="timetype == '周' ? 'bg-blue-but text-white' : 'bg-white'">周</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('月')" :class="timetype == '月' ? 'bg-blue-but text-white' : 'bg-white'">月</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('季')" :class="timetype == '季' ? 'bg-blue-but text-white' : 'bg-white'">季</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('年')" :class="timetype == '年' ? 'bg-blue-but text-white' : 'bg-white'">年</div>

            <el-popover placement="bottom" :width="300" trigger="click">
              <template #reference>
                <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer pt-1" @click="clicktime('自')" :class="timetype == '自' ? 'bg-blue-but text-white' : 'bg-white'">
                  <el-icon-Calendar class="w-4 h-4 mr-2"></el-icon-Calendar>
                </div>
              </template>
              <el-date-picker v-model="SeachDate" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small" style="width: 250px" />
            </el-popover>
          </div>
        </div>
      </div>
    </div>
    <!-- 中间搜索部分 -->
    <div class="flex items-center justify-between mt-4 mb-2">
      <div style="font-size: 16px; color: rgb(102, 102, 102); font-weight: 550;">素养量</div>
      <div class="flex items-center">
        <div class="w-42">
          <el-input v-model="btmTable.keyword" placeholder="请输入关键字" class="" />
        </div>
        <el-button class="ml-2" type="primary">搜索</el-button>
      </div>
    </div>
    <!-- 底部table -->
    <div class="center-tabs rounded-t-lg overflow-hidden">
      <div>
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.yslbTableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="日期" align="center" width="100" />
          <el-table-column property="department" label="业务员" align="center" />
          <el-table-column property="department" label="部门" align="center">
            <template #default="scope">
              <div class="flex items-center justify-center">
                <div class="w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-0.5">潍</div>
                <div>{{ scope.row.department }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="总结量" align="center">
            <el-table-column property="cooperation" label="好" align="center" width="60" />
            <el-table-column property="cooperation" label="中" align="center" width="60" />
            <el-table-column property="cooperation" label="差" align="center" width="60" />
          </el-table-column>
          <el-table-column property="salesman" label="学习量" align="center" />
          <el-table-column label="素养量" align="center">
            <el-table-column property="cooperation" label="赞美" align="center" width="60" />
            <el-table-column property="cooperation" label="警告" align="center" width="60" />
          </el-table-column>
          <el-table-column label="关停量" align="center">
            <el-table-column property="cooperation" label="绩效" align="center" width="60" />
            <el-table-column property="cooperation" label="总结" align="center" width="60" />
            <el-table-column property="cooperation" label="其他" align="center" width="60" />
          </el-table-column>
          <el-table-column label="承诺量" align="center">
            <el-table-column property="cooperation" label="完成" align="center" width="60" />
            <el-table-column property="cooperation" label="失败" align="center" width="60" />
          </el-table-column>
          <el-table-column label="关停量" align="center">
            <el-table-column property="cooperation" label="旷工(min)" align="center" width="80" />
            <el-table-column property="cooperation" label="早迟(min)" align="center" width="80" />
            <el-table-column property="cooperation" label="出勤" align="center" width="80" />
            <el-table-column property="cooperation" label="出勤率" align="center" width="80" />
          </el-table-column>
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
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from 'vue'
import { ElTable } from 'element-plus'

//#region  顶部统计
const SopStatistics = reactive({
  List: [
    {
      name: '总结量',
      data: [
        {
          value: '30',
          name: '好'
        },
        {
          value: '30',
          name: '中'
        },
        {
          value: '30',
          name: '差'
        },
        {
          value: '98.9%',
          name: '收入比'
        }
      ]
    },
    {
      name: '学习量',
      data: [
        {
          value: '9863',
          name: '学习'
        },
        {
          value: '10.3%',
          name: '收入比'
        }
      ]
    },
    {
      name: '素养量',
      data: [
        {
          value: '356',
          name: '赞美'
        },
        {
          value: '125',
          name: '警告'
        }
      ]
    },
    {
      name: '关停量',
      data: [
        {
          value: '356',
          name: '绩效关停'
        },
        {
          value: '125',
          name: '其他关停'
        }
      ]
    },
    {
      name: '承诺量',
      data: [
        {
          value: '12',
          name: '承诺'
        },
        {
          value: '10',
          name: '完成'
        },
        {
          value: '10',
          name: '失败'
        }
      ]
    },
    {
      name: '出勤量',
      data: [
        {
          value: '125',
          name: '旷工(min)'
        },
        {
          value: '356',
          name: '早迟(min)'
        },
        {
          value: '26',
          name: '出勤(天)'
        },
        {
          value: '99.8%',
          name: '出勤率'
        }
      ]
    }
  ]
})
const timetype = ref('')
const SeachDate = <any>ref([])

const clicktime = (val: any) => {
  timetype.value = val
}
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
  totals: 0
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
}

// 勾选
const handleSelectionChange = (val: any) => {
  console.log(val)
  btmTable.multipleSelection = val
}

// 分页
const handleSizeChange = (val: number) => {
  btmTable.size = val
}
const handleCurrentChange = (val: number) => {
  btmTable.page = val
}

onMounted(() => {
  // 初始化列表
  // getPageInfo()
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
