<template>
  <div class="Tec_ContractApproval">
    <!-- 售后服务 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">售后服务</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query inline-block pb-1">
        <el-input v-model="form.CustomerName" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 240px" />
        <el-select v-model="form.CategoryId" placeholder="问题范畴" style="width: 120px" class="ml-4">
          <el-option v-for="item in data.CategoryList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-button type="primary" class="ml-2" :icon="Search" @click="search">查询</el-button>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="Name" label="申请时间" min-width="166">
                <template #default="scope">
                  <span>2022-05-14 14:35</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="业务员" min-width="80">
                <template #default="scope">
                  <span>刘某某</span>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额">
                <template #default="scope">
                  <span>520000.00</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="售后等级" align="center">
                <template #default="scope">
                  <el-tag type="danger" size="small">A</el-tag>
                  <!-- <el-tag  size="small">B</el-tag>
                  <el-tag type="success"  size="small">C</el-tag> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="质量问题" width="160" align="center">
                <template #default="scope">
                  <span>质量问题</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="处理状态" width="80" align="center">
                <template #default="scope">
                  <!-- <span class="text-green-500">已完成</span> -->
                  <span class="text-red-500">已处理</span>
                  <!-- <span>处理中</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="沟通记录" align="center">
                <template #default="scope">
                  <div class="cursor-pointer"><i class="iconfont icon-zitiyulan text-blue-500 mr-1"></i> <span class="text-blue-500">查看</span></div>
                  <!-- <span class="text-gray-400 text-sm">无</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="处理详情" align="center">
                <template #default="scope">
                  <div class="cursor-pointer" @click="openWindowProcessingDetails()">
                    <i class="iconfont icon-zitiyulan text-blue-500 mr-1"></i>
                    <span class="text-blue-500">预览</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 处理详情预览 -->
    <ProcessingDetails title="售后详情" v-if="processingDetailsOpenData.visible" :FormData="processingDetailsOpenData.formData" @closeWindow="closeWindowProcessingDetails($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import ProcessingDetails from './_Components/ProcessingDetails.vue'
import '/@/assets/css/tech.css'

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
    ProcessingDetails
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
      TimeValue: '',
      CustomerName: '',
      CategoryId: ''
    })
    const data = reactive({
      CategoryList: [
        { Name: '质量问题', Id: '1' },
        { Name: '非质量问题', Id: '2' },
        { Name: '其它问题', Id: '3' }
      ]
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    //拒绝原因
    const processingDetailsOpen = (data: any) => {
      let processingDetailsOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowProcessingDetails = (row: any) => {
        processingDetailsOpenData.formData = {}
        processingDetailsOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowProcessingDetails = (type: string) => {
        processingDetailsOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        processingDetailsOpenData,
        openWindowProcessingDetails,
        closeWindowProcessingDetails
      }
    }
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      ...processingDetailsOpen({ data, getData }),
      shortcuts
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
