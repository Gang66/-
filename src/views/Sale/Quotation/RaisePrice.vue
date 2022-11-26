<template>
  <div class="quotationlist">
    <div class="pt-6">

      <div class="listtop flex p-2 pl-8 justify-between">
        <div class="flex">
          <div class="rank pt-6 ">
            <div class="text-3xl text-white text-center">
              {{data.Rank.CustomerOrderRank}}
            </div>
          </div>

          <div class="flex pl-20">
            <div class='bg-blue-bg border-white border-solid border-2 h-16 w-60 rounded-md mt-4 p-2 '>
              <el-row>
                <el-col :span="3" class="z-10">
                  <div class="quonum">
                    <div class="w-10 text-center">
                      <div class="text-xl"> {{data.Rank.CustomerOrderCount}}</div>
                      <div class="text-xs">加价量</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="21">
                  <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                    <div>
                      <div class="text-xl">{{data.Rank.CustomerOrderCount_A}}</div>
                      <div class="text-xs">A级</div>
                    </div>
                    <div>
                      <div class="text-xl">{{data.Rank.CustomerOrderCount_B}}</div>
                      <div class="text-xs">B级</div>
                    </div>
                    <div>
                      <div class="text-xl">{{data.Rank.CustomerOrderCount_C}}</div>
                      <div class="text-xs">C级</div>
                    </div>
                    <div>
                      <div class="text-xl">{{data.Rank.AddCount}}</div>
                      <div class="text-xs">新增</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
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

            <div class='bg-blue-bg border-white border-solid border-2 h-16 w-36 rounded-md mt-4 p-2 '>
              <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                <div>
                  <div class="text-xl">{{data.Rank.CustomerOrderAmount}}</div>
                  <div class="text-xs">加价量</div>
                </div>
                <div>
                  <div class="text-xl">{{data.Rank.AddCount}}</div>
                  <div class="text-xs">新增</div>
                </div>
              </div>
              <div class="jenum">
                <div class="w-10 text-center">
                  <div class="text-xs">金额量</div>
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

            <div class='bg-blue-bg border-white border-solid border-2 h-16 w-36 rounded-md mt-4 p-2 '>

              <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                <div>
                  <div class="text-xl">{{data.Rank.PerfectCount}}</div>
                  <div class="text-xs">完善</div>
                </div>
                <div class="text-red-600">
                  <div class="text-xl">{{data.Rank.UnPerfectCount}}</div>
                  <div class="text-xs">未处理</div>
                </div>
              </div>
              <div class="jenum">
                <div class="w-10 text-center">
                  <div class="text-xs">跟单量</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex ">
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

      </div>
    </div>
    <div class="py-1">
      <div class='hom_custab mt-2  pt-2 flex justify-between  border-gray-400 border-dashed'>
        <div style=" font-size: 16px;color: #666;font-weight: 550;">
          加价量
        </div>
        <div class='flex'>
          <el-input placeholder='请输入客户名' v-model="form.CustomerName" class='tabinput' />
          <!--  <span>并列</span>
          <el-select placeholder='请选择' v-model="form.CustomerName" class='tabselect'>
            <el-option value="1">筛选条件</el-option>
          </el-select> -->
          <el-button type="primary" @click="search" class="butclass">
            <svg-icon icon-class='svg-cus_search' />搜索
          </el-button>

          <!-- <el-button type="primary" class="addbutclass" @click="AddTrack">

            <svg-icon icon-class='svg-gdlr' />跟单录入
          </el-button> -->
          <el-button type="primary" class="addbutclass" @click="AddTrack">

            <svg-icon icon-class='svg-gdlr' />加价录入
          </el-button>
          <!--           <el-button type="primary" @click="AddQuotationEvent">
            <el-icon-List class='w-4 h-4 mr-2' />样品申请
          </el-button> -->

          <el-button type="primary" class="addbutclass" @click="AddQuotationEvent">

            <svg-icon icon-class='svg-addbjd' />新增报价单
          </el-button>
        </div>

      </div>
    </div>

    <div class="">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange" border :header-cell-style="{ 'background':'#468bfd', 'color': '#F5F8FF' ,'height':'3rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }" :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" style='width: 100%;border-radius:6px'>
        <el-table-column type='selection' width='50' />
        <el-table-column type="index" width='60' label='序号'>

        </el-table-column>
        <el-table-column prop='CreateOn' label='录入时间' width="140">
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>

        <el-table-column label='客户名称' show-overflow-tooltip>
          <template #default="scope">
            <el-link @click="showorder(scope.row.Id)">{{ scope.row.CustomerName }}</el-link>
          </template>
        </el-table-column>
        <el-table-column label='业务员' width="100">
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column>

        <el-table-column label='报价金额' width="100">
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>

        <el-table-column label='报价次数' width="100">
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>

        <el-table-column label='报价等级' width="100">
          <template #default="scope">{{ scope.row.Grade }}</template>
        </el-table-column>

        <el-table-column label='报价状态' width="110">
          <template #default="scope">
            {{RetStateName(scope.row.OrderState)}}
          </template>
        </el-table-column>
        <el-table-column label='报价单' width="110">
          <template #default="scope">
            <span class="mr-4 cursor-pointer" @click="printorder(scope.row.Id)">查看</span>
          </template>
        </el-table-column>

        <el-table-column label='成单率' width="110">
          <template #default="scope">
            <span>
              80%
            </span>
          </template>
        </el-table-column>

        <el-table-column label='跟单信息' width="110">
          <template #default="scope">
            <span>
              -
            </span>
          </template>
        </el-table-column>

        <!--         <el-table-column label='事业部'>
          <template #default="scope">{{ scope.row.ComName }}</template>
        </el-table-column>
        <el-table-column label='业务员'>
          <template #default="scope">{{ scope.row.SalerName }}</template>
        </el-table-column> -->

        <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
 -->
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <Add :title="'新增报价单'" v-if="ShowQuotation.show" :ViewType='ShowQuotation.viewtype' :DataId='ShowQuotation.dataId' @cancelQuotation="cancelQuotation"></Add>
    <printindex v-if="printdata.view" :DataId='printdata.dataid' @closeWindow='cancelprint'></printindex>
    <!-- 加价管理 -->
    <CompanyModel v-if="CompanyModelRef.show" :dialogVisible='CompanyModelRef.show' :IdList='CompanyModelRef.IdList' @closeWindow="colsecompany"></CompanyModel>
  </div>
</template>
<script lang="ts" setup>
import Add from './AddQuotation.vue'
import printindex from '../Print/printindex.vue'
import { GetCustomerOrderList, GetUpdateLostOrder, GetCustomerOrderRankByUserId, GetOrderRaisePriceList } from '/@/api/Sale/CustomerOder'
import AddCustomer from './AddCustomer.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import CompanyModel from '/@/views/Sale/Contract/RaisePrice/CompanyModel.vue'

import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

const dic = reactive({
  State: []
})
//获取字典数据
const getDictionaryData = () => {
  //报价单状态
  store.getDict('tech_order_status').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.State = res
  })
}
const RetStateName = (val: any) => {
  var st: any = dic.State.find((f: any) => f.DicKey == val)
  if (st) {
    return st.DicValue
  } else {
    return '未知状态'
  }
}

const CompanyModelRef = ref({
  show: false,
  IdList: <any>[]
})
const colsecompany = () => {
  CompanyModelRef.value.show = false
}
const page = reactive({
  page: 1,
  size: 10,
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

const AddQuotationEvent = () => {
  ShowQuotation.value.show = true
  ShowQuotation.value.viewtype = 1
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
  CompanyModelRef.value.IdList = []
  CompanyModelRef.value.IdList.push(multipleSelection.value[0].Id)
  CompanyModelRef.value.show = true
}
const showorder = (val: any) => {
  ShowQuotation.value.show = true
  ShowQuotation.value.viewtype = 2
  ShowQuotation.value.dataId = val
}
const AddLostOrder = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  ElMessageBox.confirm('确定要标记此报价单为失单吗？', '', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      GetUpdateLostOrder({ OrderId: multipleSelection.value[0].Id }).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          getlist()
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    .catch(() => {})
}
const getlist = () => {
  GetOrderRaisePriceList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
      console.log('---------------------------------------', data.tableData)
    }
  })
}
const form = reactive({
  page: 1,
  size: 10,
  totals: 0,
  QueryType: null,
  CustomerName: '',
  Ranking: null,
  Checked: null,
  SeachDate: [],
  timetype: ''
})
const data = reactive({
  Rank: {
    CustomerOrderAmount: 0,
    CustomerOrderRank: 0,
    CustomerOrderCount: 0,
    CustomerOrderCount_A: 0,
    CustomerOrderCount_B: 0,
    CustomerOrderCount_C: 0,
    AddCount: 0,
    PerfectCount: 0,
    UnPerfectCount: 0
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

const clicktime = (val: any) => {
  form.timetype = val
}
const cancelQuotation = () => {
  ShowQuotation.value.show = false
  getlist()
}

const ShowQuotation = ref({
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
  ShowQuotation.value.show = true
  ShowQuotation.value.viewtype = 2
  ShowQuotation.value.dataId = multipleSelection.value[0].Id
}

const cliketop = (val: any) => {
  data.tableTop = val
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
const getuserrank = () => {
  GetCustomerOrderRankByUserId().then((res) => {
    if (res.code == 1) {
      data.Rank = res.data
    }
  })
}
onMounted(() => {
  getDictionaryData()
  getlist()
  getuserrank()
})
</script>
<style lang="postcss" scoped>
.quotationlist {
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
      background: url(../../../assets/img/sale/result/quo_rank.png);
      background-size: 100% 100%;
      height: 90px;
      width: 90px;
    }
    .quonum {
      background: url(../../../assets/img/sale/result/bigtoptitle.png);
      background-size: 100% 100%;
      height: 46px;
      width: 53px;
      position: absolute;
      top: -15px;
      left: -17px;
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
