<template>
  <el-drawer size="64%" v-model="visibleInventory" @close="closeInventory" :with-header="true" custom-class="bf-drawer">
    <template v-slot:header>
      <div class="bg-slate-100 p-3">
        <p class="iconfont icon-shujuku inline-block"></p>
        <span class="ml-2">产品清单</span>
      </div>
    </template>
    <!-- #region  表格-->
    <div class="clearfix">
      <div class="float-right mt-3 mr-5">
        <span class="text-gray-400 text-sm mr-3">* 低于最低价时，表格背景色为</span>
        <div class="w-5 h-3 bg-red-400 inline-block"></div>
      </div>
    </div>
    <div class="ml-4 mr-4">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :row-class-name="tableRowClassName" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content">
          <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="Name" label="产品名称" min-width="150" align="center">
              <template #default="scope">
                <div class="inline-block text-xs">球阀</div>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="型号规格" align="center" width="160">
              <template #default="scope">
                <span class="text-xs">Q41F-150LB DN15</span>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="类型" align="center" width="120">
              <template #default="scope">
                <span class="text-xs">非常规非常用</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="单位" align="center" width="60">
              <template #default="scope">
                <span class="text-xs">个</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="数量" align="center">
              <template #default="scope">
                <span class="text-xs">200</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="本次单价" align="center">
              <template #default="scope">
                <span class="text-xs">245.00</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="最低价" align="center">
              <template #default="scope">
                <span class="text-xs">242.00</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="金额" align="center">
              <template #default="scope">
                <span class="text-xs">45600.00</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="备注" align="center" width="240">
              <template #default="scope">
                <span class="text-xs">CF8，HG/T20592-2009，RF</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- <div class="float-left ml-4">
      <el-button type="primary" class="w-52"> <i class="iconfont icon-baocun mr-3"></i> 确定选择</el-button>
      <el-button class="w-52"> <i class="iconfont icon-zhongzhi mr-3"></i> 重置</el-button>
    </div> -->
    <!-- #endregion -->
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, SetupContext, watch } from 'vue'
import { GetPageList } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { parseTime } from '/@/utils/tools'
import type { ElMessage, TabsPaneContext } from 'element-plus'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPageList(form)
    .then((res) => {
      console.log(res.data)
      if (res.code == 1) {
        data.tableData = res.data
        //   data.tableData = res.data.records
        //   data.PathList
        //   form.totals = res.data.totals
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetPageList${e}`)
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
    TableSearch
  },

  emits: ['closeInventory'],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    interface User {
      date: string
      name: string
      address: string
    }
    const visibleInventory = ref(false)
    const data = reactive({
      tableData: []
    })
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })
    const tableRowClassName = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }
    // 关闭抽屉
    const closeInventory = () => {
      context.emit('closeInventory')
    }

    // 探听开关
    watch(props, (newData, oldData) => {
      visibleInventory.value = newData.visible
    })
    return {
      data,
      form,
      visibleInventory,
      closeInventory,
      ...tableRender(form, data),
      tableRowClassName
    }
  }
})
</script>

<style lang="postcss" scoped>
:deep(.el-table .warning-row) {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
:deep(.el-table .success-row) {
  --el-table-tr-bg-color: var(--el-color-success-light-9);
}
</style>
