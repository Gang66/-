<template>
  <div class="container">
    <SreachTop @ReturnSeachData="ReturnSeachData"></SreachTop>
    <el-row :gutter="5">
      <!-- 合同列表顶部 -->
      <htTop v-show="btmTable.activeName == 0" ref="htRef" />
      <!-- 应收列表顶部 -->
      <ysTop v-if="btmTable.activeName == 1" ref="ysRef" :wjzl-list="wjzl_list" />
      <!-- 逾期列表 -->
      <yqTop v-if="btmTable.activeName == 2" ref="yqRef" :wjzl-list="wjzl_list" />
      <!-- 诉讼列表 -->
      <ssTop v-if="btmTable.activeName == 3" ref="ssRef" :wjzl-list="wjzl_list" />
    </el-row>
    <!-- 分割线 -->
    <div class="w-full my-2 border-b border-dashed border-gray-500" />
    <!-- 底部table -->
    <div class="center-tabs rounded-t-lg overflow-hidden">
      <div class="flex items-center justify-between">
        <div style="width: 430px" class="mb-2">
          <el-tabs v-model="btmTable.activeName" class="demo-tabs" @tab-change="handleClick">
            <el-tab-pane label="合同列表" :name="0" />
            <el-tab-pane label="应收列表" :name="1" />
            <el-tab-pane label="逾期列表" :name="2" />
            <el-tab-pane label="诉讼列表" :name="3" />
          </el-tabs>
        </div>
        <div class="flex items-center">
          <div class="w-42">
            <el-input v-model="btmTable.keyword" placeholder="请输入关键字" class="" />
          </div>
          <el-button class="ml-2" type="primary">搜索</el-button>
        </div>
      </div>

      <div v-if="btmTable.activeName == 0">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.tableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="40" align="center" />
          <el-table-column label="序号" type="index" width="40" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="申请时间" align="center" width="100">
            <template #default="scope"> -- </template>
          </el-table-column>
          <el-table-column property="time" label="生效时间" align="center" width="100">
            <template #default="scope">
              {{ (scope.row.CreateOn || '').substring(0, 11) }}
            </template>
          </el-table-column>
          <el-table-column property="CompanyName" label="签约单位" align="center" width="100" />
          <el-table-column property="DeptName" label="部门" align="center" width="100">
            <template #default="scope">
              <div class="flex items-center">
                <div class="w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-0.5">潍</div>
                <div>{{ scope.row.DeptName }}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column property="SalerName" label="业务员" align="center">
            <template #default="scope">
              {{ scope.row.SalerName || '--' }}
            </template>
          </el-table-column>
          <el-table-column property="CustomerName" label="客户名称" align="center" width="200" show-overflow-tooltip />
          <el-table-column property="Amount" label="合同金额" align="center" />
          <el-table-column property="status" label="合同状态" align="center">
            <template #default="scope">
              <span v-if="scope.row.status == 1" class="text-blue-800">备货通过</span>
              <span v-else-if="scope.row.status == 2" class="text-yellow-800">生产中</span>
              <span v-else-if="scope.row.status == 3" class="text-purple-600">物流中</span>
              <span v-else-if="scope.row.status == 4" class="text-green-400">已签收</span>
              <span v-else-if="scope.row.status == 5" class="text-red-500">中止中</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column property="down_money" label="退货金额" align="center">
            <template #default="scope">
              <span class="text-blue-500">{{ scope.row.down_money || '--' }}</span>
            </template>
          </el-table-column>
          <el-table-column property="Amount" label="退货清单" align="center">
            <template #default="scope"> -- </template>
          </el-table-column>
          <el-table-column property="Amount" label="实际合同金额" align="center" width="110" />

          <el-table-column property="cooperation" label="合作次数" align="center">
            <template #default="scope">
              <span class="text-blue-500">{{ scope.row.cooperation || '--' }}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="签约单位" align="center" width="70">
            <template #default="scope">
              <a href="javascript:void(0);" class="text-blue-500">查看</a>
            </template>
          </el-table-column> -->
          <el-table-column label="操作" align="center" width="70">
            <template #default="scope">
              <a href="javascript:void(0);" class="text-blue-500" @click="ViewContractEvent(scope.row.Id)">详情</a>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="btmTable.activeName == 1">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.yslbTableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="合同日期" align="center" width="100" />
          <el-table-column property="name" label="客户名称" align="center" width="310" />
          <el-table-column property="salesman" label="业务员" align="center" />
          <el-table-column property="department" label="事业部" align="center" />
          <el-table-column property="unit" label="签约单位" align="center" />
          <el-table-column property="money" label="合同金额" align="center" />
          <el-table-column label="应收账款" align="center">
            <!-- status： 1未到期2到期3已结清 -->
            <el-table-column property="yfk" label="预付款" align="center">
              <template #default="scope">
                <span :class="scope.row.status == 1 ? 'text-blue-500' : scope.row.status == 2 ? 'text-red-500' : ''">{{ scope.row.yfk }}</span>
              </template>
            </el-table-column>
            <el-table-column property="fhk" label="发货款" align="center">
              <template #default="scope">
                <span :class="scope.row.status == 1 ? 'text-blue-500' : scope.row.status == 2 ? 'text-red-500' : ''">{{ scope.row.fhk }}</span>
              </template>
            </el-table-column>
            <el-table-column property="dhk" label="到货款" align="center">
              <template #default="scope">
                <span :class="scope.row.status == 1 ? 'text-blue-500' : scope.row.status == 2 ? 'text-red-500' : ''">{{ scope.row.dhk }}</span>
              </template>
            </el-table-column>
            <el-table-column property="ysk" label="验收款" align="center">
              <template #default="scope">
                <span :class="scope.row.status == 1 ? 'text-blue-500' : scope.row.status == 2 ? 'text-red-500' : ''">{{ scope.row.ysk }}</span>
              </template>
            </el-table-column>
            <el-table-column property="zbj" label="质保金" align="center">
              <template #default="scope">
                <span :class="scope.row.status == 1 ? 'text-blue-500' : scope.row.status == 2 ? 'text-red-500' : ''">{{ scope.row.zbj }}</span>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column property="received_money" label="已收金额" align="center" />
          <el-table-column property="no_money" label="未收金额" align="center" />
        </el-table>
      </div>
      <div v-if="btmTable.activeName == 2">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.tableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="合同日期" align="center" width="100" />
          <el-table-column property="name" label="客户名称" align="center" width="360" />
          <el-table-column property="salesman" label="业务员" align="center" />
          <el-table-column property="department" label="事业部" align="center" />
          <el-table-column property="money" label="合同金额" align="center" />
          <el-table-column property="yq_money" label="逾期金额" align="center" />
          <el-table-column property="wyq_money" label="未逾期金额" align="center" />
          <el-table-column property="ys_money" label="已收金额" align="center" />
          <el-table-column property="ws_money" label="未收金额" align="center" />
          <el-table-column property="yq_day" label="逾期天数" align="center">
            <template #default="scope">
              <!-- <span :class='scope.row.yq_day > 180 ? &apos;text-red-500&apos; : scope.row.yq_day >= 90 ? &apos;text-pink-500&apos; : scope.row.yq_day >= 15 ? &apos;text-yellow-800&apos; : &apos;&apos;'>{{ scope.row.yq_day }}</span> -->
              <span :class="scope.row.yq_day > 10 ? 'text-red-500' : ''">{{ scope.row.yq_day }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="btmTable.activeName == 3">
        <el-table ref="multipleTableRef" :data="btmTable.tableData" style="width: 100%" border :header-cell-style="btmTable.tableSty" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column label="序号" type="index" width="55" align="center">
            <template #default="scope">{{ scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column property="time" label="合同日期" align="center" width="100" />
          <el-table-column property="name" label="客户名称" align="center" width="360" />
          <el-table-column property="salesman" label="业务员" align="center" />
          <el-table-column property="department" label="事业部" align="center" />
          <el-table-column property="money" label="合同金额" align="center" />
          <el-table-column property="ss_money" label="诉讼金额" align="center" />
          <el-table-column label="售后情况" align="center">
            <template #default="scope">
              <a href="javascript:void(0);" class="text-blue-500">详情</a>
            </template>
          </el-table-column>
          <el-table-column label="诉讼状态" property="ss_style" align="center">
            <template #default="scope">
              <span v-if="scope.row.ss_style == 4" class="text-red-500">执行</span>
              <span v-else-if="scope.row.ss_style == 3" class="text-pink-500">二审</span>
              <span v-else-if="scope.row.ss_style == 2" class="text-yellow-800">庭审</span>
              <span v-else>起诉</span>
            </template>
          </el-table-column>
          <el-table-column property="flwj" label="法律文件" align="center">
            <template #default="scope">
              <a v-if="scope.row.flwj" href="javascript:void(0);" class="text-blue-500">查看</a>
              <a v-else href="javascript:void(0);" class="text-red-500">上传</a>
            </template>
          </el-table-column>
          <el-table-column property="yq_day" label="逾期天数" align="center">
            <template #default="scope">
              <!-- <span :class='scope.row.yq_day > 180 ? &apos;text-red-500&apos; : scope.row.yq_day >= 90 ? &apos;text-pink-500&apos; : scope.row.yq_day >= 15 ? &apos;text-yellow-800&apos; : &apos;&apos;'>{{ scope.row.yq_day }}</span> -->
              <span :class="scope.row.yq_day > 10 ? 'text-red-500' : ''">{{ scope.row.yq_day }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="flex justify-between items-center mt-2 px-4">
        <div class="text-gray-500 text-sm">
          最近更新时间：{{ btmTable.Timestamp }}
          <span class="ml-5">共{{ page.count || 0 }}条数据</span>
        </div>
        <el-pagination v-model:page-size="btmTable.size" small :background="true" layout="prev, pager, next, jumper" :total="btmTable.totals" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 合同详情 -->
    <Add :title="'合同详情'" v-if="ShowContract.show" :ViewType="ShowContract.viewtype" :DataId="ShowContract.dataId" @cancelContract="cancelContract"></Add>
  </div>
</template>

<script lang="ts" setup>
import SreachTop from '/@/views/Sale/Component/SreachTop.vue'
import { GetContractList } from '/@/api/Sale/Contract'
import { ref, onMounted, reactive, nextTick } from 'vue'
import { ElTable } from 'element-plus'
import Add from '../AddContract.vue'

// 组件
import htTop from './htTop.vue'
import ysTop from './ysTop.vue'
import yqTop from './yqTop.vue'
import ssTop from './ssTop.vue'

// 组件
const htRef = <any>ref(null)
const ysRef = <any>ref(null)
const yqRef = <any>ref(null)
const ssRef = <any>ref(null)

// 危机专栏
let wjzl_list = ref<any>([])

// table部分
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const btmTable = <any>reactive({
  keyword: '',
  // tabs索引
  activeName: 0,
  // table表格
  multipleSelection: '',
  tableSty: {
    background: '#468bfd',
    color: '#F5F8FF',
    height: '60px'
    // padding: '15px 0'
  },
  // 应收列表
  yslbTableSty: {
    height: '30px',
    background: '#468bfd',
    color: '#F5F8FF'
  },
  tableData: [],
  // 时间获取
  Timestamp: ''
})

const page = reactive({
  page: 1,
  size: 10,
  type: 1,
  count: 0
})

// 初始化列表
const getPageInfo = (table = 0) => {
  btmTable.Timestamp = new Date().toLocaleString()
  if (table == 0) {
    page.type = 1
    GetContractList(page).then((res) => {
      if (res.code == 1) {
        btmTable.tableData = res.data.list
        page.count = res.data.count
      }
    })
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

// 勾选
const handleSelectionChange = (val: any) => {
  console.log(val)
  btmTable.multipleSelection = val
}
// 选择tabs
const handleClick = (tab: any) => {
  // const loading = ElLoading.service({
  //     lock: true,
  //     text: 'Loading',
  //     background: 'rgba(0, 0, 0, 0.7)'
  // })
  page.page = 1
  page.size = 10
  if (tab == 0) {
  } else if (tab == 1) {
    nextTick(() => {
      ysRef.value.makeExpire()
    })
    wjzl_list.value = [
      { title: '应收账款', name: '司徒坚强' },
      { title: '到期账款', name: '司徒坚强' }
    ]
  } else if (tab == 2) {
    nextTick(() => {
      yqRef.value.makeOverdue()
    })
    wjzl_list.value = [
      { title: '逾期合同总金额', name: '司徒坚强' },
      { title: '逾期占比', name: '司徒坚强' }
    ]
  } else if (tab == 3) {
    nextTick(() => {
      ssRef.value.makeLawsuit()
    })
    wjzl_list.value = [
      { title: '诉讼合同总数', name: '司徒坚强' },
      { title: '涉案金额', name: '司徒坚强' },
      { title: '诉讼占比', name: '司徒坚强' }
    ]
  }
  getPageInfo(tab)
  // loading.close()
}

// 分页
const handleSizeChange = (val: number) => {
  page.size = val
}
const handleCurrentChange = (val: number) => {
  page.page = val
}

//#region 合同明细
const ShowContract = ref({
  show: false,
  viewtype: 1,
  dataId: 0
})

///查看合同
const ViewContractEvent = (val: any) => {
  ShowContract.value.dataId = val
  ShowContract.value.viewtype = 2
  ShowContract.value.show = true
}
const cancelContract = () => {
  ShowContract.value.show = false
  //   getlist()
}
//#endregion
const ReturnSeachData = (val: any) => {
  htRef.value.getRankData(val)
}

onMounted(() => {
  htRef.value.makeMap()
  htRef.value.makeBar()
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
</style>
