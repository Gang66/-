<template>
  <div class="tech_historical_quotation_markup_record_drawer">
    <el-drawer size="26%" v-model="visibleDrawer" @close="closeDrawer" :with-header="true" custom-class="bf-drawer">
      <template v-slot:header>
        <div class="bg-slate-100 p-3">
          <p class="iconfont icon-jiage inline-block"></p>
          <span class="ml-2">加价记录</span>
        </div>
      </template>
      <!-- #region  表格-->
      <div class="ml-4 mr-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="Name" label="加价时间" min-width="120" align="center">
                <template #default="scope">
                  <div class="inline-block">2022-06-12 09:30</div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="最低价" align="center">
                <template #default="scope">54600004</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="销售额" align="center">
                <template #default="scope">
                  <span>54640000</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
      <!-- #endregion -->
    </el-drawer>
  </div>
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
  emits: ['closeDrawer'],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const visibleDrawer = ref(false)
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

    // 关闭抽屉
    const closeDrawer = () => {
      context.emit('closeDrawer')
    }

    // 探听开关
    watch(props, (newData, oldData) => {
      visibleDrawer.value = newData.visible
    })

    return {
      data,
      form,
      visibleDrawer,
      closeDrawer,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_historical_quotation_markup_record_drawer {
}
</style>
