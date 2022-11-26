<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-3">
      <el-input v-model="form.SalerName" size="default" placeholder="请输入客户名称" style="width: 260px" class="mr-4" />
      <el-button type="primary"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>

      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content">
          <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="CreateOn" label="客户名称">
              <template #default="scope">{{ scope.row.ClientName }}</template>
            </el-table-column>
            <el-table-column prop="DepartName" label="报价金额" width="100" align="center">
              <template #default="scope">2000000</template>
            </el-table-column>
            <el-table-column prop="Name" label="单号" align="center" width="140">
              <template #default="scope">
                <div class="inline-block">QP2109140021</div>
              </template>
            </el-table-column>

            <el-table-column prop="InviteName" label="等级" width="80" align="center">
              <template #default="scope">
                <!-- A -->
                <el-tag class="" v-if="scope.row.GradeCode === 'A'" size="small" type="danger">{{ scope.row.GradeCode }}</el-tag>
                <!-- B -->
                <el-tag class="" v-else-if="scope.row.GradeCode === 'B'" size="small">{{ scope.row.GradeCode }}</el-tag>
                <!-- C -->
                <el-tag class="" v-else-if="scope.row.GradeCode === 'C'" size="small" type="success">{{ scope.row.GradeCode }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="创建时间" width="140" align="center">
              <template #default="scope">2022-09-15</template>
            </el-table-column>
            <el-table-column prop="PostName" label="操作" width="160" align="center">
              <template #default="scope">
                <div class="inline-block" @click="openWindowImportSalesMarkup()">
                  <i class="iconfont icon-daoru inline-block mr-1 text-blue-500"></i>
                  <div class="inline-block text-blue-500 cursor-pointer">导入</div>
                </div>
                <div class="inline-block ml-2" @click="openWindowConsolidatedQuotation()">
                  <i class="iconfont icon-chanpin inline-block mr-1 text-blue-500"></i>
                  <div class="inline-block text-blue-500 cursor-pointer">合并</div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
      <!-- 导入蛋钮 销售加价 -->
      <ImportSalesMarkup title="加价管理" v-if="importSalesMarkupData.visible" :FormData="importSalesMarkupData.formData" @closeWindow="closeWindowImportSalesMarkup($event)" />
      <!-- 合并  合并报价单 -->
      <ConsolidatedQuotation title="合并报价单" v-if="consolidatedQuotationData.visible" :FormData="consolidatedQuotationData.formData" @closeWindow="closeWindowConsolidatedQuotation($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import ImportSalesMarkup from './ImportSalesMarkup.vue'
import ConsolidatedQuotation from './ConsolidatedQuotation.vue'

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
    OpenWindow,
    TableSearch,
    ImportSalesMarkup,
    ConsolidatedQuotation
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({})
    const form = reactive({
      page: 1,
      size: 10,
      SalerName: ''
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })

    // 导入按钮  销售加价
    const importSalesMarkupOpen = (data: any) => {
      let importSalesMarkupData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowImportSalesMarkup = (val: any) => {
        importSalesMarkupData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        importSalesMarkupData.visible = true
      }

      //关闭弹窗
      const closeWindowImportSalesMarkup = (type: string) => {
        importSalesMarkupData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        importSalesMarkupData,
        openWindowImportSalesMarkup,
        closeWindowImportSalesMarkup
      }
    }
    // 合并报价单
    const consolidatedQuotationOpen = (data: any) => {
      let consolidatedQuotationData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowConsolidatedQuotation = (val: any) => {
        consolidatedQuotationData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        consolidatedQuotationData.visible = true
      }

      //关闭弹窗
      const closeWindowConsolidatedQuotation = (type: string) => {
        consolidatedQuotationData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        consolidatedQuotationData,
        openWindowConsolidatedQuotation,
        closeWindowConsolidatedQuotation
      }
    }

    return {
      boxStyle,
      closeWindow,
      data,
      form,
      ...tableRender(form, data),
      ...importSalesMarkupOpen({ data }),
      ...consolidatedQuotationOpen({ data })
    }
  }
})
</script>
<style lang="postcss" scoped></style>
