<template>
  <div class="Tec_ContractApproval">
    <!-- 出库管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">出库管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix">
        <el-input v-model="form.NameInput" size="default" placeholder="订单号" style="width: 200px" class="mr-4" />
        <el-date-picker class="align-bottom mr-4" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right">
          <el-button type="primary" @click="openWindowGradeDelivery(data.selectDetails)"> <i class="iconfont icon-chuangjian mr-2"></i> 登记出库</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="订单号" align="center" width="120">
                <template #default="scope">CG210713022</template>
              </el-table-column>
              <el-table-column prop="Name" label="出库员" width="100" align="center">
                <template #default="scope">
                  <span>张海涛</span>
                </template>
              </el-table-column>

              <el-table-column prop="WorkAge" label="出库日期" align="center">
                <template #default="scope">
                  <span>2022-08-23</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="选入仓库" align="center">
                <template #default="scope">
                  <span>总部1号仓库</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="出库总量" align="center" width="100">
                <template #default="scope">
                  <span>580</span>
                </template>
              </el-table-column>

              <el-table-column prop="WorkAge" label="出库总额(元)" align="center" width="120">
                <template #default="scope">
                  <span>6380</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="出库类型">
                <template #default="scope">
                  <span>销售出库</span>
                  <!-- <span>采购退货</span> -->
                  <!-- <span>生产出库</span> -->
                  <!-- <span>其它出库</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="供应商" width="180">
                <template #default="scope">
                  <span>上海富工阀门</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="状态">
                <template #default="scope">
                  <span class="text-orange-400">等待审核</span>
                  <!-- <span class="text-red-500">审核失败</span> -->
                  <!-- <span class="text-green-500">审核成功</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="审核时间 " width="160">
                <template #default="scope">
                  <span>2022-08-19 10:10</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="入库明细" align="center" width="100">
                <template #default="scope">
                  <!-- <div @click="openWindowGradeDelivery()">
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                  </div> -->
                  <div @click="openWindowGradeDelivery(scope.row)">
                    <i class="iconfont icon-bianji1 inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">编辑</div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 登记出库 -->
    <GradeDelivery title="登记出库" v-if="gradeDeliveryOpenData.visible" :FormData="gradeDeliveryOpenData.formData" @closeWindow="closeWindowGradeDelivery($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'
import GradeDelivery from './_Components/GradeDelivery.vue'

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
export default defineComponent({
  components: {
    TableSearch,
    GradeDelivery
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      NameInput: '',
      TimeValue: ''
    })
    const data = reactive({
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
    // 出库信息
    const GradeDeliveryOpen = (data: any) => {
      let gradeDeliveryOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowGradeDelivery = (row: any) => {
        gradeDeliveryOpenData.formData = {
          selectDetails: row
        }
        gradeDeliveryOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowGradeDelivery = (type: string) => {
        gradeDeliveryOpenData.visible = false
      }

      return {
        gradeDeliveryOpenData,
        openWindowGradeDelivery,
        closeWindowGradeDelivery
      }
    }
    return {
      data,
      form,
      ...tableRender(form, data),
      ...GradeDeliveryOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
