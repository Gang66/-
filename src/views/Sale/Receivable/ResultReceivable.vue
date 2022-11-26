<template>
  <div class="receivablelist">
    <div class="pt-6">

      <div class="listtop flex p-2 pl-8 justify-between">
        <div class="flex">
          <div class="rank pt-6 ">
            <div class="text-3xl text-white text-center">
              {{data.Rank.Rank}}
            </div>
          </div>

        </div>

        <div class="flex ">
          <div class='bg-blue-bg border-white border-solid border-2 h-16 w-36 rounded-md mt-4 p-2 '>
            <div class="border-white border-dashed border h-full rounded-md flex text-center justify-center px-2">
              <div>
                <div class="text-xl">{{data.Rank.UnReceivedAmount}}</div>
                <div class="text-xs">应收总额</div>
              </div>
            </div>
            <div class="jenum">
              <div class="w-10 text-center">
                <div class="text-xs">应收量</div>
              </div>
            </div>
          </div>

          <div class="w-8 h-16 mt-4 py-2">
            <div class="h-1/2 flex">
              <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
              </div>
            </div>
            <div class="h-1/2 flex">
              <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
              </div>
            </div>
          </div>

          <div class='bg-blue-bg border-white border-solid border-2 h-16 w-44 rounded-md mt-4 p-2 '>
            <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
              <div>
                <div class="text-xl">{{data.Rank.OverdueAmount}}</div>
                <div class="text-xs">逾期金额</div>
              </div>
              <div>
                <div class="text-xl">{{data.Rank.OverdueRate}}%</div>
                <div class="text-xs">坏账率</div>
              </div>
            </div>
            <div class="jenum">
              <div class="w-10 text-center">
                <div class="text-xs">逾期</div>
              </div>
            </div>
          </div>

          <div class="w-8 h-16 mt-4 py-2">
            <div class="h-1/2 flex">
              <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
              </div>
            </div>
            <div class="h-1/2 flex">
              <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
              </div>
            </div>
          </div>

          <div class='bg-blue-bg border-white border-solid border-2 h-16 w-44 rounded-md mt-4 p-2 '>
            <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
              <div>
                <div class="text-xl">{{data.Rank.LegalAmount}}</div>
                <div class="text-xs">法务金额</div>
              </div>
              <div>
                <div class="text-xl">{{data.Rank.LegalRate}}%</div>
                <div class="text-xs">诉讼率</div>
              </div>
            </div>
            <div class="jenum">
              <div class="w-10 text-center">
                <div class="text-xs">诉讼率</div>
              </div>
            </div>
          </div>

          <div class="w-8 h-16 mt-4 py-2">
            <div class="h-1/2 flex">
              <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
              </div>
            </div>
            <div class="h-1/2 flex">
              <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
              </div>
            </div>
          </div>

          <div class='bg-blue-bg border-white border-solid border-2 h-16 w-44 rounded-md mt-4 p-2 '>

            <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
              <div>
                <div class="text-xl">{{data.Rank.BadAmount}}</div>
                <div class="text-xs">坏账金额</div>
              </div>
              <div>
                <div class="text-xl">{{data.Rank.BadRate}}%</div>
                <div class="text-xs">坏账率</div>
              </div>
            </div>
            <div class="jenum">
              <div class="w-10 text-center">
                <div class="text-xs">坏账率</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div class="flex justify-end">
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('前')" :class="form.timetype=='前'?'bg-blue-but text-white':'bg-white'">前</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('日')" :class="form.timetype=='日'?'bg-blue-but text-white':'bg-white'">日</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('周')" :class="form.timetype=='周'?'bg-blue-but text-white':'bg-white'">周</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('月')" :class="form.timetype=='月'?'bg-blue-but text-white':'bg-white'">月</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('季')" :class="form.timetype=='季'?'bg-blue-but text-white':'bg-white'">季</div>
            <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('年')" :class="form.timetype=='年'?'bg-blue-but text-white':'bg-white'">年</div>

            <el-popover placement="bottom" :width="300" trigger="click">
              <template #reference>
                <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer pt-1" @click="clicktime('自')" :class="form.timetype=='自'?'bg-blue-but text-white':'bg-white'">
                  <el-icon-Calendar class='w-4 h-4 mr-2'></el-icon-Calendar>
                </div>

              </template>
              <el-date-picker v-model="form.SeachDate" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small" style="width:250px" />
            </el-popover>
          </div>
          <div class="text-xs leading-9 text-center">
            <div class="flex ">
              <div class="hjmoney flex">
                <div class="w-1/2 text-white">合同金额合计</div>
                <div class="w-1/2">{{data.Rank.Amount}}</div>
              </div>
              <div class="hjmoney flex">
                <div class="w-1/2 text-white">回款金额合计</div>
                <div class="w-1/2">{{data.Rank.ReceivedAmount}}</div>
              </div>
              <div class="yqmoney flex">
                <div class="w-1/2 text-white">法务金额合计</div>
                <div class="w-1/2">{{data.Rank.LegalAmount}}</div>
              </div>
            </div>
            <div class="flex">
              <div class="hjmoney flex">
                <div class="w-1/2 text-white">未收金额合计</div>
                <div class="w-1/2">{{data.Rank.UnReceivedAmount}}</div>
              </div>
              <div class="yqmoney flex">
                <div class="w-1/2 text-white">逾期金额合计</div>
                <div class="w-1/2">{{data.Rank.OverdueAmount}}</div>
              </div>
              <div class="yqmoney flex">
                <div class="w-1/2 text-white">坏账金额合计</div>
                <div class="w-1/2">{{data.Rank.BadAmount}}</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
    <div class="py-1">
      <div class='hom_custab mt-2  pt-2 flex justify-between  border-gray-400 border-dashed '>
        <div style=" font-size: 16px;color: #666;font-weight: 550;">
          应收量
        </div>
        <div>
          <el-input placeholder='请输入内容' v-model="form.CustomerName" class='tabinput' />

          <el-button class='butclass'>
            <svg-icon icon-class='svg-cus_search' />搜索
          </el-button>
        </div>

      </div>
    </div>

    <div class="">

      <div>
        <el-table :data='data.tableData' @selection-change="handleSelectionChange" border
          :header-cell-style="{ 'background':'#468bfd', 'color': '#F5F8FF' ,'height':'1.5rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }"
          :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" style='width: 100%;border-radius:6px'>
          <el-table-column type='selection' width='50' />
          <el-table-column type="index" width='60' label='序号'>

          </el-table-column>
          <el-table-column prop='CreateOn' width='110' label='生效时间'>
            <template #default="scope">{{ (scope.row.ContractTime||'').substring(0,11) }}</template>
          </el-table-column>

          <el-table-column label='客户名称' width="200" show-overflow-tooltip>
            <template #default="scope">{{ scope.row.CustomerName }}</template>
          </el-table-column>

          <el-table-column label='合同金额'>
            <template #default="scope">
              {{ scope.row.ContractAmount }}
            </template>
          </el-table-column>

          <el-table-column label='应收金额'>
            <el-table-column label='预付款'>
              <template #default="scope">
                <span :class="scope.row.IsOverdueAdvance==true?'text-red-400':''">
                  {{ scope.row.Advance }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label='发货款'>
              <template #default="scope">
                <span :class="scope.row.IsOverdueDeliver==true?'text-red-400':''">
                  {{ scope.row.Deliver }}
                </span></template>
            </el-table-column>
            <el-table-column label='到货款'>
              <template #default="scope">
                <span :class="scope.row.IsOverdueArrival==true?'text-red-400':''">
                  {{ scope.row.Arrival }}
                </span></template>
            </el-table-column>
            <el-table-column label='验收款'>
              <template #default="scope">
                <span :class="scope.row.IsOverdueAcceptance==true?'text-red-400':''">
                  {{ scope.row.Acceptance }}
                </span></template>
            </el-table-column>
            <el-table-column label='质保金'>
              <template #default="scope">
                <span :class="scope.row.IsOverdueWarranty==true?'text-red-400':''">
                  {{ scope.row.Warranty }}
                </span></template>
            </el-table-column>
          </el-table-column>
          <el-table-column label='回款金额'>
            <template #default="scope">{{ scope.row.Collection }}</template>
          </el-table-column>
          <el-table-column label='回款率'>
            <template #default="scope">{{ scope.row.CollectionRate }}</template>
          </el-table-column>
          <el-table-column label='未收金额'>
            <template #default="scope">{{ scope.row.Uncollected }}</template>
          </el-table-column>
          <el-table-column label='逾期金额'>
            <template #default="scope">{{ scope.row.Overdue }}</template>
          </el-table-column>
          <el-table-column label='法务金额'>
            <template #default="scope">{{ scope.row.Legal }}</template>
          </el-table-column>
          <el-table-column label='坏账金额'>
            <template #default="scope">{{ scope.row.BadDebt }}</template>
          </el-table-column>

        </el-table>
      </div>

      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>

  </div>
</template>
<script lang="ts" setup>
import { GetReceivableList, GetReceivableRankByUserId } from '/@/api/Sale/Receivable'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
const page = reactive({
  page: 1,
  size: 10,
  type: 0,
  count: 0
})
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}

const printdata = ref({
  view: false,
  dataid: 0
})

const printorder = (val: number) => {
  printdata.value.dataid = val
  console.log('-------', val)
  printdata.value.view = true
}
const cancelprint = () => {
  printdata.value.view = false
}
const search = () => {
  getlist()
}

///新增合同
const AddContractEvent = () => {
  ShowContract.value.show = true
  ShowContract.value.viewtype = 1
}
///查看合同
const ViewContractEvent = (val: any) => {
  ShowContract.value.show = true
  ShowContract.value.dataId = val
  ShowContract.value.viewtype = 3
}

const AddTrack = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowContract.value.show = true
  ShowContract.value.viewtype = 5
  ShowContract.value.dataId = multipleSelection.value[0].Id
}

const getlist = () => {
  GetReceivableList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
      console.log('---------------------------------------', data.tableData)
    }
  })
}
const form = reactive({
  QueryType: null,
  CustomerName: '',
  Ranking: null,
  Checked: null,
  SeachDate: [],
  timetype: ''
})
const data = reactive({
  Rank: {
    Amount: 0,
    OverdueAmount: 0,
    OverdueRate: 0,
    LegalAmount: 0,
    LegalRate: 0,
    BadAmount: 0,
    BadRate: 0,
    ReceivedAmount: 0,
    Rank: 0,
    UnReceivedAmount: 0
  },
  viewType: 1,
  DataId: 0,
  tableTop: 0,
  AddCustomerData: {
    view: false,
    currentCustomerId: 0,
    isEdit: false,
    otherRegion: {},
    InfoDisabled: false,
    screenCustomer: null,
    isReadOnly: false
  },
  tableData: []
})

const getrank = () => {
  GetReceivableRankByUserId().then((res) => {
    if (res.code == 1) {
      data.Rank = res.data
    }
  })
}
const clicktime = (val: any) => {
  form.timetype = val
}
const cancelContract = () => {
  ShowContract.value.show = false
  getlist()
}

const ShowContract = ref({
  show: false,
  viewtype: 1,
  dataId: 0
})

const viewQuotationEvent = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ShowContract.value.show = true
  ShowContract.value.viewtype = 2
  ShowContract.value.dataId = multipleSelection.value[0].Id
}

const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}
const closePostWindow = () => {
  getlist()
  data.AddCustomerData.view = false
}

const handleClick = (val: any) => {
  data.DataId = val.Id
  data.viewType = 2
  data.AddCustomerData.view = true
}
//新增客户
const addCustomerview = () => {
  data.viewType = 1
  data.DataId = 0
  data.AddCustomerData.view = true
}
onMounted(() => {
  getlist()
  getrank()
})
</script>
<style lang="postcss" scoped>
.receivablelist {
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
  .hom_custab {
    .tabinput {
      width: 10rem;
      margin-right: 1rem;
    }
    .tabselect {
      margin-left: 1rem;

      width: 10rem;
    }
    .tabbutselect {
      color: #ffffff;
      margin-left: 1rem;
      margin-top: -3px;
      width: 6rem;
      background: linear-gradient(180deg, #33b3ff 0%, #92d1ff 100%);
      border: 0rem;
    }
    .tabbutclear {
      color: #ffffff;
      margin-left: 1rem;
      margin-top: -3px;
      width: 6rem;
      background: linear-gradient(180deg, #db0c0c 0%, #eb7373 100%);
      border: 0rem;
    }
  }
  .listtop {
    background: url(../../../assets/img/sale/result/topbj.png);
    background-size: 100% 100%;
    height: 100px;
    .rank {
      background: url(../../../assets/img/sale/receivable/ys_rank.png);
      background-size: 100% 100%;
      height: 90px;
      width: 90px;
      z-index: 1;
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

    .hjmoney {
      background: url(../../../assets/img/sale/contract/hj_jine.png);
      background-size: 105% 150%;
      height: 30px;
      width: 155px;
    }
    .yqmoney {
      background: url(../../../assets/img/sale/receivable/yq_jine.png);
      background-size: 105% 150%;
      height: 30px;
      width: 155px;
    }
  }
  .custtj {
    background: url(../../../assets/img/sale/customer/customer_tj.png) repeat-x left top;
    background-size: 100% 100%;
    .tjtitle {
      position: relative;
      top: -13px;
      background: url(../../../assets/img/sale/customer/tj_title.png);
      background-size: 100% 100%;
    }
  }
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
</style>
