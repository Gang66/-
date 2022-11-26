<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <!-- 表格 -->
    <div class="p-4">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content">
          <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
            <el-table-column prop="CreateOn" label="申请时间" align="center" min-width="160">
              <template #default="scope">2022-08-30 10:20</template>
            </el-table-column>
            <el-table-column prop="DepartName" label="发生日期" align="center" min-width="160">
              <template #default="scope">
                <span>2022-08-30 10:20</span>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="费用类别" align="center">
              <template #default="scope">
                <span>过路费</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="报销金额" align="center">
              <template #default="scope">
                <span class="text-sm">10000</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="收款方式" align="center">
              <template #default="scope">
                <span>银行卡号</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="收款账号" align="center" min-width="160">
              <template #default="scope">
                <span>3215 6589 9220 007</span>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="报销内容" align="center" class-name="90">
              <template #default="scope">
                <span>
                  <el-tooltip class="box-item" effect="dark" placement="bottom">
                    <template #content>
                      <div class="p-1">
                        <p class="text-xs"><i class="iconfont icon-beizhu mr-1"></i>报销内容</p>
                        <p class="text-sm mt-1">货物到付运费</p>
                      </div>
                    </template>
                    <i class="iconfont icon-beizhu text-blue-500"></i>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="费用明细" align="center" class-name="90">
              <template #default="scope">
                <span>
                  <el-tooltip class="box-item" effect="dark" placement="bottom">
                    <template #content>
                      <div class="p-1">
                        <p class="text-xs"><i class="iconfont icon-beizhu mr-1"></i>费用明细</p>
                        <p class="text-sm mt-1">重量20公斤，首重20，续重10</p>
                      </div>
                    </template>
                    <i class="iconfont icon-beizhu text-blue-500"></i>
                  </el-tooltip>
                </span>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="相关附件" align="center" class-name="90">
              <template #default="scope">
                <span class="text-blue-500">相关附件</span>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="状态" align="center">
              <template #default="scope">
                <!-- <span class="text-blue-500">审批中</span> -->
                <!-- <span class="text-green-500">已审批</span> -->
                <span class="text-red-500">已驳回</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'

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
    OpenWindow,
    TableSearch
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      tableData1: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }], //假数据到时候删掉
      // 表格数据
      tableData: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })
    onMounted(() => {
      console.log(props.FormData)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      form,
      ...tableRender(form, data)
    }
  }
})
</script>
<style lang="postcss" scoped></style>
