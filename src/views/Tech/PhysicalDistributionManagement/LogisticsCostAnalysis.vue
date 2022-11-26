<template>
  <div class="Tec_ContractApproval">
    <el-row :gutter="20" class="mb-4">
      <!-- 订单总数 -->
      <el-col :md="24" :lg="6">
        <div class="bg-white grid-content ep-bg-purple rounded-xl">
          <div class="clearfix pt-3 pl-4 pr-4">
            <div class="float-left">
              <p class="text-sm text-gray-400">订单总数（笔）</p>
              <p class="text-3xl font-semibold mt-2">2000</p>
            </div>
            <div class="float-right">
              <i class="iconfont icon-dingdan1 text-blue-500" style="font-size: 50px"></i>
            </div>
          </div>
          <div class="pl-4 pb-2">
            <div class="inline-block">
              <span class="text-xs text-gray-400">周同比</span>
              <i class="iconfont icon-xiangshang text-red-500 ml-1 mr-1" style="font-size: 8px"></i>
              <!-- <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i> -->
              <span class="text-xs text-gray-400">12%</span>
            </div>
            <div class="inline-block ml-14">
              <span class="text-xs text-gray-400">月环比</span>
              <!-- <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i> -->
              <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i>
              <span class="text-xs text-gray-400">12%</span>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 销售额总数（元） -->
      <el-col :md="24" :lg="6">
        <div class="bg-white grid-content ep-bg-purple rounded-xl">
          <div class="clearfix pt-3 pl-4 pr-4">
            <div class="float-left">
              <p class="text-sm text-gray-400">销售额总数（元）</p>
              <p class="text-3xl font-semibold mt-2">2000</p>
            </div>
            <div class="float-right">
              <i class="iconfont icon-chengben text-red-400" style="font-size: 50px"></i>
            </div>
          </div>
          <div class="pl-4 pb-2">
            <div class="inline-block">
              <span class="text-xs text-gray-400">周同比</span>
              <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i>
              <!-- <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i> -->
              <span class="text-xs text-gray-400">12%</span>
            </div>
            <div class="inline-block ml-14">
              <span class="text-xs text-gray-400">月环比</span>
              <!-- <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i> -->
              <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i>
              <span class="text-xs text-gray-400">12%</span>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 费用额总数（元） -->
      <el-col :md="24" :lg="6">
        <div class="bg-white grid-content ep-bg-purple rounded-xl">
          <div class="clearfix pt-3 pl-4 pr-4">
            <div class="float-left">
              <p class="text-sm text-gray-400">费用额总数（元）</p>
              <p class="text-3xl font-semibold mt-2">2000</p>
            </div>
            <div class="float-right">
              <i class="iconfont icon-caigou text-orange-400" style="font-size: 50px"></i>
            </div>
          </div>
          <div class="pl-4 pb-2">
            <div class="inline-block">
              <span class="text-xs text-gray-400">周同比</span>
              <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i>
              <!-- <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i> -->
              <span class="text-xs text-gray-400">12%</span>
            </div>
            <div class="inline-block ml-14">
              <span class="text-xs text-gray-400">月环比</span>
              <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i>
              <!-- <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i> -->
              <span class="text-xs text-gray-400">12%</span>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 物流成本率 -->
      <el-col :md="24" :lg="6">
        <div class="bg-white grid-content ep-bg-purple rounded-xl">
          <div class="clearfix pt-3 pl-4 pr-4">
            <div class="float-left">
              <p class="text-sm text-gray-400">物流成本率</p>
              <p class="text-3xl font-semibold mt-2">70%</p>
            </div>
            <div class="float-right">
              <i class="iconfont icon-fenxi text-green-500" style="font-size: 50px"></i>
            </div>
          </div>
          <div class="pl-4 pb-2">
            <div class="inline-block">
              <span class="text-xs text-gray-400">周同比</span>
              <!-- <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i> -->
              <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i>
              <span class="text-xs text-gray-400">12%</span>
            </div>
            <div class="inline-block ml-14">
              <span class="text-xs text-gray-400">月环比</span>
              <i class="iconfont icon-xiangshang text-red-500 text-xs ml-1 mr-1" style="font-size: 8px"></i>
              <!-- <i class="iconfont icon-xiangxia text-green-500 ml-1 mr-1" style="font-size: 8px"></i> -->
              <span class="text-xs text-gray-400">12%</span>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <!-- 物流费用管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">物流费用管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-1 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1 pt-3">
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
        <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right mt-px">
          <el-button type="primary" class="ml-4" @click="openWindowExpenseReimbursement()"> <i class="iconfont icon-chuangjian mr-2"></i> 新增报销单</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="申请时间" align="center" width="140">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="销售总额" width="140" align="center">
                <template #default="scope">
                  <span>1710000</span>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="费用总额" width="140" align="center">
                <template #default="scope">
                  <span>1710000</span>
                </template>
              </el-table-column>
              <el-table-column prop="" label="费用明细" align="center">
                <el-table-column prop="" label="运费" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <span class="">8500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Absenteeism" label="过路费" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>153500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="油费" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>33333.33</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="停车费" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>1555555</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="保管费" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <!-- <span>11744</span> -->
                      <span>-</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="其它费" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <!-- <span>11744</span> -->
                      <span>-</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="WorkAge" label="关联报销单" align="center">
                <template #default="scope">
                  <span class="text-sm">QW110001208257</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="费用明细" align="center" width="100">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowExpenseDetails(scope.row)">查看</div>
                  </div>
                  <!-- <span class="text-gray-400">无</span> -->
                </template>
              </el-table-column>
            </el-table>
            <el-table :data="data.tableData2" stripe @selection-change="handleSelectionChange" :show-header="false">
              <el-table-column prop="WorkAge" align="center" width="244">
                <template #default="scope">本表合计</template>
              </el-table-column>
              <el-table-column prop="WorkAge" align="center" width="140">
                <template #default="scope">3804000</template>
              </el-table-column>
              <el-table-column prop="" align="center">
                <el-table-column prop="" align="center" width="140">
                  <template #default="scope">
                    <div class="text-sm">
                      <span class="">8500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Absenteeism" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>153500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>33333.33</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>1555555</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" align="center" width="100">
                  <template #default="scope">
                    <div class="text-sm">
                      <!-- <span>11744</span> -->
                      <span>-</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="WorkAge" align="center" width="100">
                <template #default="scope">
                  <span class="text-sm">38000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" align="center" width="100">
                <template #default="scope">
                  <span class="text-sm">-100000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" align="center" min-width="100">
                <template #default="scope">
                  <span class="text-sm">-</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" align="center" width="80">
                <template #default="scope">
                  <span class="text-gray-400">-</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 费用报销 -->
    <ExpenseReimbursement title="费用报销" v-if="expenseReimbursementOpenData.visible" :FormData="expenseReimbursementOpenData.formData" @closeWindow="closeWindowExpenseReimbursement($event)" />
    <!-- 费用明细 -->
    <ExpenseDetails title="费用明细" v-if="expenseDetailsOpenData.visible" :FormData="expenseDetailsOpenData.formData" @closeWindow="closeWindowExpenseDetails($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'
import ExpenseReimbursement from './_Components/ExpenseReimbursement.vue'
import ExpenseDetails from './_Components/ExpenseDetails.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
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
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails)
    // console.log(data.selectDetails[0].Id)
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
    // GetOverTimeLists,
    // GetBeOverTimeLists
  }
}
export default defineComponent({
  components: {
    TableSearch,
    ExpenseReimbursement,
    ExpenseDetails
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: '',
      NameInput: '',
      TimeValue: ''
    })
    const data = reactive({
      tableData1: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }], //假数据到时候删掉
      tableData2: [{ val: 1 }, { val: 2 }],
      // 表格数据
      tableData: [],
      shortcuts: [
        {
          text: '最近一周',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            return [start, end]
          }
        },
        {
          text: '最近一个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            return [start, end]
          }
        },
        {
          text: '最近三个月',
          value: () => {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            return [start, end]
          }
        }
      ]
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    //费用报销单
    const expenseReimbursementOpen = (data: any) => {
      let expenseReimbursementOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowExpenseReimbursement = (row: any) => {
        expenseReimbursementOpenData.formData = {
          selectDetails: row
        }
        expenseReimbursementOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowExpenseReimbursement = (type: string) => {
        expenseReimbursementOpenData.visible = false
      }

      return {
        expenseReimbursementOpenData,
        openWindowExpenseReimbursement,
        closeWindowExpenseReimbursement
      }
    }
    //费用明细
    const expenseDetailsOpen = (data: any) => {
      let expenseDetailsOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowExpenseDetails = (row: any) => {
        expenseDetailsOpenData.formData = {
          selectDetails: row
        }
        expenseDetailsOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowExpenseDetails = (type: string) => {
        expenseDetailsOpenData.visible = false
      }

      return {
        expenseDetailsOpenData,
        openWindowExpenseDetails,
        closeWindowExpenseDetails
      }
    }
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      ...expenseReimbursementOpen({ data }),
      ...expenseDetailsOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.zong {
  width: 1410px;
  .sum1 {
    width: 100px;
  }
  .sum2 {
    width: 90px;
  }
  .sum3 {
    width: 80px;
  }
}
</style>
