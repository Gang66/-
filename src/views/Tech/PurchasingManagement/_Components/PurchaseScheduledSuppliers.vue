<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-0">
      <!-- #region 表格列表 -->
      <div class="bf-table-content">
        <el-table :data="data.SupplierList" stripe>
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="GroupSubName" label="分组编号" align="center">
            <template #default="scope">
              <span class="text-red-500">{{ scope.row.GroupSubName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="SupplierName" label="供应商" min-width="240">
            <template #default="scope">
              <span>{{ scope.row.SupplierName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="TotalPrice" label="总价" align="center">
            <template #default="scope">
              <span>{{ scope.row.TotalPrice }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="ProfitRatio" label="利润比" align="center">
            <template #default="scope">
              <span class="text-green-500" v-if="scope.row.ProfitRatio > 2">{{ scope.row.ProfitRatio }}</span>
              <span class="text-red-500" v-else>{{ scope.row.ProfitRatio }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="SupplyTime" label="供应商周期" align="center" min-width="80">
            <template #default="scope">
              <span>{{ scope.row.SupplyTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="操作" align="center" width="60">
            <template #default="scope">
              <span class="text-blue-500 cursor-pointer" @click="openWindowOperation(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- #endregion -->
      <!-- 查看 -->
      <Operation :title="`${operationOpenData.formData.Name}`" v-if="operationOpenData.visible" :FormData="operationOpenData.formData" @closeWindow="closeWindowOperation($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import { GetMaterialBillSupplierList } from '/@/api/tech/Material'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import Operation from './Operation.vue'

// 获取供应商
const renderTableList = async (data: any) => {
  await GetMaterialBillSupplierList(data.BillId).then((res) => {
    if (res.code == 1) {
      data.SupplierList = res.data
    }
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    Operation
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      BillId: 0,
      SupplierList: []
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
    // 查看
    const operationOpen = (data: any) => {
      let operationOpenData: any = reactive({
        visible: false,
        formData: {
          Name: '',
          BillId: 0,
          supplierId: 0,
        }
      })

      //打开弹窗
      const openWindowOperation = (val: any) => {
        operationOpenData.formData = {
          Name: val.SupplierName,
          BillId: data.data.BillId,
          supplierId: val.SupplierId,
        }
        operationOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowOperation = (type: string) => {
        operationOpenData.visible = false
      }

      return {
        operationOpenData,
        openWindowOperation,
        closeWindowOperation
      }
    }

    // 获取列表
    const getData = () => {
      renderTableList(data)
    }

    onMounted(()=>{
      data.BillId = props.FormData.BillId
      getData()
    })
    return {
      boxStyle,
      closeWindow,
      data,
      getData,
      ...operationOpen({ data })
    }
  }
})
</script>
<style lang="postcss" scoped></style>
