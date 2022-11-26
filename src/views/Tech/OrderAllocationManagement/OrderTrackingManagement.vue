<template>
  <div class="Tech_OrderTrackingManagement">
    <!-- top -->
    <OrderTrackingManagementTop />
    <!-- 订单跟踪管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 mt-4 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1 mb-1">
        <span class="ml-4 text-sm">订单跟踪管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query pb-1 clearfix">
        <el-date-picker v-model="form.date" type="daterange" unlink-panels range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" size="default" style="width: 260px" class="mr-4 align-bottom" />
        <el-input v-model="form.CustomerName" size="default" placeholder="请输入客户名称" style="width: 200px" class="mr-3" />
        <el-select v-model="form.GradeCode" placeholder="报价等级" style="width: 100px" class="mr-3">
          <el-option v-for="item in data.techOrderGradesOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
        </el-select>
        <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-3">
          <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-select v-model="form.IsCloseTrack" placeholder="跟进状态" style="width: 100px" class="mr-3">
          <el-option v-for="item in data.StatusList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-input v-model="form.SalerName" size="default" placeholder="业务员" style="width: 100px" class="mr-3" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i>查询</el-button>
        <el-button @click="search"> <i class="iconfont icon-daochu mr-2"></i>导出</el-button>

        <div class="float-right mt-px">
          <el-button type="success" :disabled="data.single" @click="initiateFollow(data.selectDetails.Id)"><i class="iconfont icon-qidong mr-2"></i> 启动跟进</el-button>
          <el-button type="danger" :disabled="data.single" @click="closeFollow(data.selectDetails.Id)"><i class="iconfont icon-guanbi mr-2"></i> 关闭跟进</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange" ref="multipleTableRef" @select="selectRow">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="成单时间" width="166">
                <template #default="scope">{{ scope.row.CompleteOrderTime }}</template>
              </el-table-column>
              <el-table-column prop="CompName" label="所属事业部" width="120" align="center">
                <template #default="scope">{{ scope.row.CompName || '-' }}</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="100" align="center">
                <template #default="scope">{{ scope.row.SalerName }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166" show-overflow-tooltip>
                <template #default="scope">
                  <!-- 必 -->
                  <div class="customerName inline-block bg-red-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '必跟'">
                    <span class="text-xs text-white">必</span>
                  </div>
                  <!-- 重 -->
                  <div class="customerName inline-block bg-blue-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '重要'">
                    <span class="text-xs text-white">重</span>
                  </div>
                  <!-- 普 -->
                  <div class="customerName inline-block bg-green-500 relative text-center mr-3 w-5 h-6" v-if="scope.row.GradeName === '普通'">
                    <span class="text-xs text-white">普</span>
                  </div>
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="InviteName" label="询价等级" width="100" align="center">
                <template #default="scope">
                  <!-- A -->
                  <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                  <!-- B -->
                  <el-tag class="" v-else-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                  <!-- C -->
                  <el-tag class="" v-else-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
                </template>
              </el-table-column>

              <el-table-column prop="WorkAge" label="订单金额" width="100" align="center">
                <template #default="scope">{{ scope.row.OrderAmount }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="预警" width="100" align="center">
                <template #default="scope">
                  <span class="text-red-400" v-if="scope.row.WarningTitle == '预警'"> <img src="../../../assets/img/tech/inquiry/warninggif.gif" class="inline-block h-5 align-top" alt="" /> {{ scope.row.WarningTitle }}</span>
                  <span class="" v-else>{{ scope.row.WarningTitle }}</span>
                </template>
              </el-table-column>

              <el-table-column prop="PostName" label="订单状态" width="100" align="center">
                <template #default="scope">
                  <span v-if="scope.row.OrderStatus == 0">失单</span>
                  <span v-else-if="scope.row.OrderStatus == 1">成单</span>
                  <span v-else-if="scope.row.OrderStatus == 2">跟进过程</span>
                  <span v-else>关闭跟进</span>
                </template>
              </el-table-column>
              <el-table-column prop="PostName" label="订单分析" width="100">
                <template #default="scope"
                  ><i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                  <div class="inline-block text-blue-600 cursor-pointer" @click="openWindowOrderAnalysis(scope.row)">查看</div></template
                >
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                <template #default="scope"
                  ><i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                  <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div></template
                >
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>

    <!-- 订单分析 -->
    <OrderAnalysisCost :title="orderAnalysisOpenData.formData.ClientName + '的订单分析'" v-if="orderAnalysisOpenData.visible" :FormData="orderAnalysisOpenData.formData" @closeWindow="closeWindowOrderAnalysis($event)" />

    <!-- 沟通记录 -->
    <RejectOrder :title="rejectOrderOpenData.formData.ClientName" v-if="rejectOrderOpenData.visible" :FormData="rejectOrderOpenData.formData" @closeWindow="closeWindowRejectOrder($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import OrderTrackingManagementTop from './_Components/OrderTrackingManagementTop.vue'
import { Search } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryDataTrackPage, GetEditEnquiryOrderTrackStatusSave } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import OrderAnalysisCost from './_Components/OrderAnalysisCost.vue'
import RejectOrder from './_Components/RejectOrder_s.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { orderAnalysisOpen, rejectOrderOpen } from '/@/assets/ts/techOpenWindow'
import { GetTypeDepartList } from '/@/api/system/dept'
import '/@/assets/css/tech.css'
import { ElMessage, ElMessageBox } from 'element-plus'

const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  // 报价等级
  store.getDict('tech_order_grade').then((res: any) => {
    data.techOrderGradesOptions = res
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
  await GetEnquiryDataTrackPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}

// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
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
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent,
    selectRow
  }
}
export default defineComponent({
  components: {
    OrderTrackingManagementTop,
    TableSearch,
    OrderAnalysisCost,
    RejectOrder
  },
  setup() {
    const multipleTableRef: any = ref(null)
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
      totals: 0,
      date: [],
      CustomerName: '',
      IsCloseTrack: '',
      GradeCode: '',
      SalerName: ''
    })
    const data = reactive({
      single: true,
      input2: '',
      // 报价状态
      techOrderGradesOptions: [],
      StatusList: [
        { Id: 0, Name: '跟进中' },
        { Id: 1, Name: '结束跟进' }
      ],
      status: 0
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
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
    // 获取报价状态
    const getOrderStatus = (val: number) => {
      let _obj = data.techOrderGradesOptions.find((x: any) => x.DicKey == val.toFixed(0))
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    // 启动跟进
    const initiateFollow = (id: any) => {
      ElMessageBox.confirm('确定重新启动跟进？', '启动跟进', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          data.status = 0
          getModifyStatus(data)
          getData()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '操作失败'
          })
        })
    }
    // 关闭跟进
    const closeFollow = (id: any) => {
      ElMessageBox.confirm('确定关闭跟进？', '关闭跟进', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '操作成功'
          })
          data.status = 1
          getModifyStatus(data)
          getData()
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '操作失败'
          })
        })
    }
    // 修改跟进状态 接口
    const getModifyStatus = (data: any) => {
      const datas = {
        id: data.selectDetails.Id,
        status: data.status
      }
      console.log(datas)
      GetEditEnquiryOrderTrackStatusSave(datas).then((res) => {
        if (res.code == 1) {
          data.CompList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
      getCompList(data)
    })
    return {
      form,
      data,
      ...tableRender(form, data, multipleTableRef),
      shortcuts,
      Search,
      ...orderAnalysisOpen({ data, getData }),
      ...rejectOrderOpen({ data, getData }),
      getOrderStatus,
      multipleTableRef,
      initiateFollow,
      closeFollow
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tech_OrderTrackingManagement {
}
</style>
