<template>
  <div class="Tec_ContractApproval">
    <!-- 报价成本管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">报价成本管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-input v-model="form.SalesmanInput" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
        <el-select v-model="form.GradeCode" placeholder="报价等级" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.techOrderGradesOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
        <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
          <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
        <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <el-button class=""> <i class="iconfont icon-daochu mr-2"></i><span>导出数据</span></el-button>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="询价单号" width="166" align="center">
                <template #default="scope">No.216179-1</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166">
                <template #default="scope">
                  <!-- 必 -->
                  <!-- <div class="customerName inline-block bg-red-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeCode === 'A'">
                    <span class="text-xs text-white">必</span>
                  </div> -->
                  <!-- 重 -->
                  <!-- <div class="customerName inline-block bg-blue-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeCode === 'B'">
                    <span class="text-xs text-white">重</span>
                  </div> -->
                  <!-- 普 -->
                  <div class="customerName inline-block bg-green-500 relative text-center mr-3 w-5 h-6">
                    <!-- v-if="scope.row.GradeCode === 'C'" -->
                    <span class="text-xs text-white relative -top-0.5">普</span>
                  </div>
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="100">
                <template #default="scope">
                  <div class="w-5 h-5 inline-block bg-green-500 text-center text-xs text-white mr-2 leading-5 rounded-md">集</div>
                  <!-- <div class="w-5 h-5 inline-block bg-blue-500 text-center text-xs text-white mr-2 leading-5 rounded-md">潍</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-cyan-400 text-center text-xs text-white mr-2 leading-5 rounded-md">润</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-red-400 text-center text-xs text-white mr-2 leading-5 rounded-md">成</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-indigo-500 text-center text-xs text-white mr-2 leading-5 rounded-md">南</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-yellow-500 text-center text-xs text-white mr-2 leading-5 rounded-md">济</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-orange-400 text-center text-xs text-white mr-2 leading-5 rounded-md">长</div> -->
                  <!-- 还有其他事业部   默认用灰色-->
                  <span>{{ scope.row.SalerName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="InviteName" label="等级" width="60">
                <template #default="scope">
                  <!-- A -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                  <!-- B -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                  <!-- C -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column prop="InviteName" label="状态" min-width="90" align="center">
                <template #default="scope">
                  <!-- <div>
                    <div class="w-2 h-2 bg-red-500 rounded-full inline-block mr-2"></div>
                    <span class="text-sm">生产中</span>
                  </div> -->
                  <div>
                    <div class="w-2 h-2 bg-green-500 rounded-full inline-block mr-2"></div>
                    <span class="text-sm">生产完成</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="报价供应商" align="center">
                <template #default="scope">
                  <div>
                    <span>50</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="总报价" width="160" align="center">
                <template #default="scope">
                  <div>
                    <span>380400000</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="销售成本" width="160" align="center">
                <template #default="scope">
                  <span>380400000</span>
                </template>
              </el-table-column>
              <el-table-column prop="CreateOn" label="报价时间" width="166" align="center">
                <template #default="scope">2022-08-10 10:11</template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="订单分析" align="center" width="80">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import CostAnalysis from './_Components/CostAnalysis.vue'
import '/@/assets/css/tech.css'
import { GetTypeDepartList } from '/@/api/system/dept'
import { ElMessage } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'

const store = useCommonStore() //记得加这一句

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

//获取事业部列表
const getCompList = (data: any) => {
  // 获取事业部列表
  GetTypeDepartList(1).then((res) => {
    if (res.code == 1) {
      data.CompList = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}

//获取字典数据
const getDictionaryData = (data: any) => {
  // 报价等级
  store.getDict('tech_order_grade').then((res: any) => {
    data.techOrderGradesOptions = res
  })
}
export default defineComponent({
  components: {
    TableSearch,
    CostAnalysis
  },
  setup() {
    const shortcuts = [
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
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      TimeValue: '',
      NameInput: '',
      SalesmanInput: '',
      GradeCode: '',
      CompId: null
    })
    const data = reactive({
      // 报价状态
      techOrderGradesOptions: [],
      //事业部信息
      CompList: [],
      tableData: [],
      tableData1: [{ val: 1 }, { val: 1 }, { val: 1 }, { val: 1 }] //假数据到时候删掉
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }

    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
      getCompList(data)
    })
    return {
      data,
      form,
      ...tableRender(form, data),
      shortcuts
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
