<template>
  <div class="formalList">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="阶段详情">
      <div class="bf-window-padding">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <el-table :data="data.tableData" style="width: 100%">
            <el-table-column type="index" width="55" label="序号" align="center" />
            <el-table-column prop="date" label="阶段" align="center">
              <template #default="scope"> 第{{ convertToChinaNumEvent(scope.row.WeekNumber) }}周 </template>
            </el-table-column>
            <el-table-column prop="TotalScore" label="分数" align="center" />
            <el-table-column prop="" label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openformalFormWindow(scope.row.Id)">预览</el-button>
              </template>
            </el-table-column>
          </el-table>
        </table-search>
      </div>
    </OpenWindow>
    <!-- 正式期报告 -->
    <formalForm v-if="data.formalFormWindow.show" @closeWindow="data.formalFormWindow.show = false" :Id="data.formalFormWindow.Id"></formalForm>
  </div>
</template>

<script lang="ts">
import formalForm from './formalForm.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { GetAdjustSalaryReportList } from '/@/api/hr/Staff'
import Template from '/@/views/Template.vue'
import { convertToChinaNum } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetAdjustSalaryReportList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 处理数字转汉子
const convertToChinaNumEvent = (num: number) => {
  return convertToChinaNum(num)
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  //   查看报告
  const openformalFormWindow = (Id: any) => {
    data.formalFormWindow.Id = Id
    data.formalFormWindow.show = true
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    openformalFormWindow,
    convertToChinaNumEvent
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    TableSearch,
    formalForm,
    Template
  },
  emits: ['closeWindow'],
  props: {
    userId: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      UserId: props.userId
    })
    let data = reactive({
      ruleForm: {},
      tableData: [],
      formalFormWindow: {
        show: false,
        Id: 0
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: '',
      boxPaddingTop: 'pt-40'
    })
    onMounted(() => {})
    return {
      boxStyle,
      data,
      form,
      ...tableRender(form, data),
      closeWindow
    }
  }
})
</script>

<style lang="postcss" scoped>
.formalList {
  :deep(.el-pagination) {
    margin-top: 16px;
  }
  :deep(.bf-window-padding) {
    padding: 20px;
  }
}
</style>
