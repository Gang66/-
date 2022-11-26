<template>
  <div>
    <!-- #region  top头部-->
    <div class="pt-6">
      <div class="listtop flex p-2 pl-8 justify-between">
        <div class="flex">
          <div class="rank pt-6">
            <div class="text-3xl text-white text-center">
              {{ data.Rank.CustomerOrderRank }}
            </div>
          </div>

          <div class="flex pl-20">
            <div class="bg-blue-bg border-white border-solid border-2 h-16 w-60 rounded-md mt-4 p-2">
              <el-row>
                <el-col :span="3" class="z-10">
                  <div class="quonum">
                    <div class="w-10 text-center">
                      <div class="text-xl">{{ data.Rank.CustomerOrderCount }}</div>
                      <div class="text-xs">加价量</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="21">
                  <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                    <div>
                      <div class="text-xl">{{ data.Rank.CustomerOrderCount_A }}</div>
                      <div class="text-xs">A级</div>
                    </div>
                    <div>
                      <div class="text-xl">{{ data.Rank.CustomerOrderCount_B }}</div>
                      <div class="text-xs">B级</div>
                    </div>
                    <div>
                      <div class="text-xl">{{ data.Rank.CustomerOrderCount_C }}</div>
                      <div class="text-xs">C级</div>
                    </div>
                    <div>
                      <div class="text-xl">{{ data.Rank.AddCount }}</div>
                      <div class="text-xs">新增</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="w-8 h-16 mt-4 py-2">
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7abae1 0%, #2d80b4 49%, #82afcb 100%)"></div>
              </div>
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7abae1 0%, #2d80b4 49%, #82afcb 100%)"></div>
              </div>
            </div>

            <div class="bg-blue-bg border-white border-solid border-2 h-16 w-36 rounded-md mt-4 p-2">
              <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                <div>
                  <div class="text-xl">{{ data.Rank.CustomerOrderAmount }}</div>
                  <div class="text-xs">加价量</div>
                </div>
                <div>
                  <div class="text-xl">{{ data.Rank.AddCount }}</div>
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
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7abae1 0%, #2d80b4 49%, #82afcb 100%)"></div>
              </div>
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7abae1 0%, #2d80b4 49%, #82afcb 100%)"></div>
              </div>
            </div>

            <div class="bg-blue-bg border-white border-solid border-2 h-16 w-36 rounded-md mt-4 p-2">
              <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                <div>
                  <div class="text-xl">{{ data.Rank.PerfectCount }}</div>
                  <div class="text-xs">完善</div>
                </div>
                <div class="text-red-600">
                  <div class="text-xl">{{ data.Rank.UnPerfectCount }}</div>
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
        <div class="flex">
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('前')" :class="form.timetype == '前' ? 'bg-blue-but text-white' : 'bg-white'">前</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('日')" :class="form.timetype == '日' ? 'bg-blue-but text-white' : 'bg-white'">日</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('周')" :class="form.timetype == '周' ? 'bg-blue-but text-white' : 'bg-white'">周</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('月')" :class="form.timetype == '月' ? 'bg-blue-but text-white' : 'bg-white'">月</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('季')" :class="form.timetype == '季' ? 'bg-blue-but text-white' : 'bg-white'">季</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('年')" :class="form.timetype == '年' ? 'bg-blue-but text-white' : 'bg-white'">年</div>

          <el-popover placement="bottom" :width="300" trigger="click">
            <template #reference>
              <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer pt-1" @click="clicktime('自')" :class="form.timetype == '自' ? 'bg-blue-but text-white' : 'bg-white'">
                <el-icon-Calendar class="w-4 h-4 mr-2"></el-icon-Calendar>
              </div>
            </template>
            <el-date-picker v-model="form.SeachDate" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small" style="width: 250px" />
          </el-popover>
        </div>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region 筛选部分 -->
    <div class="py-1">
      <div class="hom_custab mt-2 pt-2 flex justify-between border-gray-400 border-dashed">
        <div style="font-size: 16px; color: #666; font-weight: 550">加价费用</div>
        <div class="flex">
          <el-input placeholder="请输入客户名" v-model="form.cusname" class="tabinput mr-3" />
          <el-button type="primary" @click="search" class="butclass"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
        </div>
      </div>
    </div>
    <!-- #endregion -->
    <!-- #region 列表 -->
    <table-search :current-page="form.page" :page-size="form.size" :total="form.count" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
      <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange" border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '2rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px">
        <el-table-column type="selection" width="50" />
        <el-table-column type="index" width="60" label="序号"> </el-table-column>
        <el-table-column prop="CreateOn" label="合同日期" width="140">
          <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
        </el-table-column>
        <el-table-column label="姓名" width="80">
          <template #default="scope">
            <span>刘某某</span>
          </template>
        </el-table-column>
        <el-table-column label="事业部" width="120">
          <template #default="scope">
            <span>潍坊事业部</span>
          </template>
        </el-table-column>
        <el-table-column label="业绩金额">
          <template #default="scope">
            <span>5000000</span>
          </template>
        </el-table-column>

        <el-table-column label="客户名称">
          <template #default="scope">
            <el-link @click="showorder(scope.row.Id)">{{ scope.row.CustomerName }}</el-link>
          </template>
        </el-table-column>

        <el-table-column label="合同金额" width="100">
          <template #default="scope">100</template>
        </el-table-column>
        <el-table-column label="加价金额" width="100">
          <template #default="scope">100</template>
        </el-table-column>

        <el-table-column label="加价分配">
          <el-table-column width="100" label="集团">
            <template #default="scope">--</template>
          </el-table-column>
          <el-table-column width="100" label="团建">
            <template #default="scope">--</template>
          </el-table-column>
          <el-table-column width="100" label="事业部">
            <template #default="scope">--</template>
          </el-table-column>
          <el-table-column width="100" label="部门">
            <template #default="scope">--</template>
          </el-table-column>
          <el-table-column width="100" label="业务员">
            <template #default="scope">--</template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="状态" width="110">
          <template #default="scope">
            <span class="text-blue-500 cursor-pointer">待确认</span>
          </template>
        </el-table-column>
      </el-table>
    </table-search>
    <!-- #endregion -->
    <Add :title="'新增报价单'" v-if="ShowQuotation.show" :ViewType="ShowQuotation.viewtype" :DataId="ShowQuotation.dataId" @cancelQuotation="cancelQuotation"></Add>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetCustomerOrderList, GetCustomerOrderRankByUserId } from '/@/api/Sale/CustomerOder'
import { parseTime } from '/@/utils/tools'
import { useCommonStore } from '/@/store/modules/Common'
import Add from '../Quotation/AddQuotation.vue'

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
  })
}

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  if (form.date && form.date.length > 1) {
    form.StartDate = form.date[0]
    form.EndDate = form.date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }
  await GetCustomerOrderList(form).then((res) => {
    console.log('🚀 ~ file: MarkupFee.vue ~ line 210 ~ awaitGetCustomerOrderList ~ res', res)
    if (res.code == 1) {
      data.tableData = res.data.list
      form.count = res.data.count
    }
  })
}

// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.Suggestion.length > 0) {
      data.Suggestion.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue
        }
      })
    }
    return title
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails[0].Id)
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent
  }
}

export default defineComponent({
  components: {
    TableSearch,
    Add
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      count: 0,
      cusname: null,
      timetype: ''
    })
    const data = reactive({
      // 表格数据
      tableData: [],
      single: true,
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
      }
    })
    const ShowQuotation = ref({
      show: false,
      viewtype: 1,
      dataId: 0
    })
    const getuserrank = () => {
      GetCustomerOrderRankByUserId().then((res) => {
        if (res.code == 1) {
          data.Rank = res.data
        }
      })
    }
    const getstate = (val: any) => {
      var item: any = dic.orderstatus.find((f: any) => f.DicKey == val)
      if (item) {
        return item.DicValue
      }
      return ''
    }
    // 日期
    const clicktime = (val: any) => {
      form.timetype = val
      renderTableList(form, data)
    }
    // 点击客户名称
    const showorder = (val: any) => {
      ShowQuotation.value.show = true
      ShowQuotation.value.viewtype = 2
      ShowQuotation.value.dataId = val
    }
    // 关闭客户弹窗
    const cancelQuotation = () => {
      ShowQuotation.value.show = false
      renderTableList(form, data)
    }
    onMounted(() => {
      getuserrank()
      getDictionaryData()
    })
    return {
      form,
      data,
      dic,
      getstate,
      clicktime,
      ShowQuotation,
      showorder,
      cancelQuotation,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
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
</style>
