<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-2">
      <div class="flex">
        <div class="flex-auto">
          <img class="inline-block h-4 mr-2 align-middle" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span class="text-sm">基本信息</span>
        </div>
        <div>
          <span class="text-sm">合同登记编号：BG2108200002</span>
        </div>
      </div>
      <div class="mt-3">
        <div class="inline-block mr-10 mb-3">
          <p class="text-xs text-gray-400">预付款 (2021-09-06)</p>
          <p class="text-sm">151500</p>
        </div>
        <div class="inline-block mr-10 mb-3">
          <p class="text-xs text-gray-400">发货款 (2021-09-06)</p>
          <p class="text-sm">151500</p>
        </div>
        <div class="inline-block mr-10 mb-3">
          <p class="text-xs text-gray-400">到货款 (2021-09-06)</p>
          <p class="text-sm">151500</p>
        </div>
        <div class="inline-block mr-10 mb-3">
          <p class="text-xs text-gray-400">验收款 (2021-09-06)</p>
          <p class="text-sm">151500</p>
        </div>
        <div class="inline-block mr-10 mb-3">
          <p class="text-xs text-gray-400">质保金 (2021-09-06)</p>
          <p class="text-sm">151500</p>
        </div>
      </div>
      <div class="flex">
        <div class="flex-auto">
          <img class="inline-block h-4 mr-2 align-middle" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span class="text-sm">付款记录</span>
        </div>
      </div>
      <div class="bf-table-content">
        <el-table :data="data.paymentData" stripe @selection-change="handleSelectionChange">
          <el-table-column prop="CreateOn" label="付款时间" width="166" align="center">
            <template #default="scope">{{ scope.row.ConsultTime }}</template>
          </el-table-column>
          <el-table-column prop="CompName" label="类型" align="center">
            <template #default="scope">预付款</template>
          </el-table-column>
          <el-table-column prop="DepartName" label="付款金额" align="center">
            <template #default="scope">175000</template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="经办人" align="center">
            <template #default="scope">刘某某</template>
          </el-table-column>
          <el-table-column prop="PostName" label="凭证" align="center">
            <template #default="scope"> <div class="inline-block text-blue-600 cursor-pointer">查看</div></template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  if (form.date && form.date.length > 1) {
    form.StartDate = form.date[0]
    form.EndDate = form.date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.paymentData = res.data.records
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
  }
}

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const form = reactive({})
    const data = reactive({
      paymentData: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-540',
      boxHeight: ''
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
