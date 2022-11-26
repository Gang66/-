<template>
  <div class="quotationlist">
    <div class="py-1">
      <div class="hom_custab pt-2 pb-2 flex justify-between border-gray-400 border-dashed">
        <div style="font-size: 16px; color: #666; font-weight: 550">报价量</div>
        <div class="flex">
          <el-input placeholder="请输入客户名" v-model="form.CustomerName" class="tabinput" />
          <el-button type="primary" @click="search" class="butclass"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
          <el-button type="primary" class="butclass" @click="AddLostOrder"> <el-icon-List class="w-4 h-4 mr-2" />标记失单 </el-button>
          <el-button type="primary" class="addbutclass" @click="AddTrack"> <svg-icon icon-class="svg-gdlr" />跟单录入 </el-button>
          <el-button type="primary" class="addbutclass" @click="AddQuotationEvent"> <svg-icon icon-class="svg-addbjd" />新增报价单 </el-button>
        </div>
      </div>
    </div>

    <div class="">
      <el-table :data="data.tableData" @selection-change="handleSelectionChange" border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '3rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" width="60" label="序号"> </el-table-column>
        <el-table-column prop="CreateOn" label="录入时间" width="140">
          <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
        </el-table-column>

        <el-table-column label="客户名称">
          <template #default="scope">
            <el-link @click="showorder(scope.row.Id)">{{ scope.row.CustomerName }}</el-link>
          </template>
        </el-table-column>

        <el-table-column label="报价金额" width="100">
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>

        <el-table-column label="报价次数" width="100">
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>

        <el-table-column label="报价等级" width="100">
          <template #default="scope">{{ scope.row.Grade }}</template>
        </el-table-column>

        <el-table-column label="报价状态" width="110">
          <!-- <template #default="scope">
            <span v-if="scope.row.OrderState == -100">失单</span>
            <span v-else>技术处理</span>
          </template> -->
          <template #default="scope">
            {{ getstate(scope.row.OrderState) || '-' }}
          </template>
        </el-table-column>
        <el-table-column label="报价单" width="110">
          <template #default="scope">
            <span class="cursor-pointer" @click="printorder(scope.row.Id)">查看</span>
          </template>
        </el-table-column>

        <el-table-column label="成单率" width="110">
          <template #default="scope">
            <span> 80% </span>
          </template>
        </el-table-column>

        <el-table-column label="样品" width="110">
          <template #default="scope">
            <span> - </span>
          </template>
        </el-table-column>

        <el-table-column label="跟单信息" width="110">
          <template #default="scope">
            <span> - </span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="110">
          <template #default="scope">
            <span class="cursor-pointer" style="color: #468bfd" @click="ToMessage(scope.row)"> 详情 </span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <Add :title="'新增报价单'" v-if="ShowQuotation.show" :ViewType="ShowQuotation.viewtype" :DataId="ShowQuotation.dataId" @cancelQuotation="cancelQuotation"></Add>
    <printindex v-if="printdata.view" :DataId="printdata.dataid" @closeWindow="cancelprint"></printindex>
  </div>
</template>
<script lang="ts" setup>
import Add from './AddQuotation.vue'
import printindex from '/@/views/Sale/Print/printindex.vue'
import { GetCustomerOrderList, GetUpdateLostOrder, GetCustomerOrderRankByUserId } from '/@/api/hr/School/PracticalBase'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

const dic = reactive({
  orderstatus: [] //标牌证件
})
//获取字典数据
const getDictionaryData = () => {
  //报价单状态
  store.getDict('tech_order_status').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.orderstatus = res
    console.log(dic.orderstatus)
  })
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
  ShowQuotation.value.show = true
  ShowQuotation.value.viewtype = 5
  ShowQuotation.value.dataId = multipleSelection.value[0].Id
}

// 详情
const ToMessage = (val: any) => {
  ShowQuotation.value.show = true
  ShowQuotation.value.viewtype = 2
  ShowQuotation.value.dataId = val.Id
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
  GetCustomerOrderList(page).then((res) => {
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
const getstate = (val: any) => {
  var item: any = dic.orderstatus.find((f: any) => f.DicKey == val)
  if (item) {
    return item.DicValue
  }
  return ''
}

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
  // #region  测试数组去重
  var arr = [1, 1, 2, 5, 2, 3, 4, 5, 3, 21, 53, 2, 666, 6, 666, 666]
  var set = [...new Set(arr)]
  var set1 = Array.from(set)
  console.log(set)
  // #endregion
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
