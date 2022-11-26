<template>
  <el-drawer size="64%" v-model="visibleInventory" @close="closeInventory" :with-header="true" custom-class="bf-drawer">
    <template v-slot:header>
      <div class="bg-slate-100 p-3">
        <p class="iconfont icon-shujuku inline-block"></p>
        <span class="ml-2">产品清单</span>
      </div>
    </template>
    <!-- #region  表格-->
    <div class="ml-4 mr-4">
      <div class="bf-table-content mb-4">
        <el-table :data="data.tableData" stripe @select="handleSelectionChange" @select-all="handleSelectionChange" ref="multipleTableRef">
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column type="selection" width="30" align="center"/>
          <el-table-column prop="Name" label="产品名称" min-width="150">
            <template #default="scope">
              <div class="inline-block text-xs">{{ scope.row.SystemName }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="型号规格" align="center" width="160">
            <template #default="scope">
              <span class="text-xs">{{ scope.row.SystemModel }} {{ scope.row.SystemSpecification }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="DepartName" label="类型" align="center" width="120">
            <template #default="scope">
              <span class="text-xs">--</span>
            </template>
          </el-table-column>
          <el-table-column prop="PostName" label="单位" align="center" width="60">
            <template #default="scope">
              <span class="text-xs">{{ scope.row.UnitInfo }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="PostName" label="数量" align="center">
            <template #default="scope">
              <span class="text-xs">{{ scope.row.Quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="PostName" label="本次单价" align="center">
            <template #default="scope">
              <span class="text-xs">{{ scope.row.SupplierList.SupplierPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="PostName" label="最低价" align="center">
            <template #default="scope">
              <span class="text-xs">{{ scope.row.SupplierList.SupplierPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="PostName" label="金额" align="center">
            <template #default="scope">
              <span class="text-xs">{{ (Number(scope.row.SupplierList.SupplierPrice || 0) * Number(scope.row.Quantity || 0)).toFixed(2) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="PostName" label="备注" align="center" width="240">
            <template #default="scope">
              <span class="text-xs">{{ scope.row.Remark }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="clearfix">
      <div class="float-left ml-4">
        <el-button type="primary" class="w-52" @click="toSubmit()"> <i class="iconfont icon-baocun mr-3"></i> 确定选择</el-button>
        <el-button class="w-52" @click="toggleSelection()"> <i class="iconfont icon-zhongzhi mr-3"></i> 重置</el-button>
      </div>
      <div class="float-right mt-3 mr-5">
        <span class="text-gray-400 text-sm mr-3">* 低于最低价时，表格背景色为</span>
        <div class="w-5 h-3 bg-red-400 inline-block"></div>
      </div>
    </div>
    <!-- #endregion -->
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, SetupContext, watch, nextTick } from 'vue'
import { ElTable } from 'element-plus'
import { GetPageList } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { parseTime } from '/@/utils/tools'
import type { ElMessage, TabsPaneContext } from 'element-plus'

// 筛选
const tableRender = (data: any) => {
  // table选择监听
  const handleSelectionChange = (val: any, row: any) => {
    // 单选
    if (row != undefined){
      let _idx = <any>data.tableData.findIndex((item:any) => item.Id == row.Id)
      if (row.SupplierChange) {
        data.tableData[_idx].SupplierChange = false
      } else {
        data.tableData[_idx].SupplierChange = true
      }
    } else { // 多选
      if (val.length == 0) {
        data.tableData.forEach((item:any) => {
          item.SupplierChange = false
        })
      } else {
        data.tableData.forEach((item:any) => {
          item.SupplierChange = true
        })
      }
    }
    console.log(val,row)
  }
  
  return {
    handleSelectionChange
  }
}

export default defineComponent({
  components: {
    TableSearch
  },

  emits: ['closeInventory', 'submitInventory'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    ProductList: {
      type: Array,
      default: (()=>[])
    }
  },
  setup(props, context) {
    interface User {
      date: string
      name: string
      address: string
    }
    const visibleInventory = ref(false)
    const data = <any>reactive({
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
    const multipleTableRef = ref<any>()
    const tableRowClassName = ({ row, rowIndex }: { row: User; rowIndex: number }) => {
      if (rowIndex === 1) {
        return 'warning-row'
      } else if (rowIndex === 3) {
        return 'success-row'
      }
      return ''
    }

    // 回显选中产品
    const toggleSelection = (rows?: []) => {
      console.log(rows)
      if (rows) {
        rows.forEach((row:any) => {
          console.log(row, 9999999999)
          if(row.SupplierChange)
          multipleTableRef.value.toggleRowSelection(row, true)
        })
      } else { // 重置
        multipleTableRef.value.clearSelection()
        data.tableData.forEach((element:any) => {
          element.SupplierChange = false
        })
      }
    }

    // 提交
    const toSubmit = () => {
      context.emit('submitInventory', data.tableData)
      closeInventory()
    }

    // 关闭抽屉
    const closeInventory = () => {
      context.emit('closeInventory')
    }

    // 修改列表
    const SetProductList = (val:any ) => {
      nextTick(()=>{
        data.tableData = val
      })
    }

    // 探听开关
    watch(props, (newData, oldData) => {
      visibleInventory.value = newData.visible
      nextTick(()=>{
        toggleSelection(data.tableData)
      })
    })

    onMounted(()=>{
      // nextTick(()=>{
      //   data.tableData = props.ProductList
      // })
    })
    return {
      data,
      form,
      visibleInventory,
      multipleTableRef,
      toggleSelection,
      closeInventory,
      toSubmit,
      ...tableRender(data),
      SetProductList,
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
