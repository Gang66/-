<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-0">
      <!-- #region 表格列表 -->
      <div class="bf-table-content">
        <el-table :data="data.suppliersList" stripe>
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="GroupSubName" label="分组分项" align="center">
            <template #default="scope">
              <span class="text-red-500">{{ scope.row.GroupSubName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="属性" align="center">
            <template #default="scope">
              <span v-if="scope.row.TypeInfo == 1">独立件</span>
              <span v-else-if="scope.row.TypeInfo == 2">组合件</span>
            </template>
          </el-table-column>
          <el-table-column prop="SystemName" label="技术参数" min-width="200">
            <template #default="scope">
              <p class="text-sm">{{ scope.row.SystemName }} {{ scope.row.SystemModel }} {{ scope.row.SystemSpecification }}</p>
              <p class="text-xs text-red-500">{{ scope.row.Remark }}</p>
            </template>
          </el-table-column>
          <el-table-column prop="Quantity" label="数量" align="center">
            <template #default="scope">
              <span>{{ scope.row.Quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="销售价" align="center">
            <template #default="scope">
              <span>￥{{ scope.row.Amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="核采价格" align="center" min-width="140">
            <template #default="scope">
              <div v-if="scope.row.PurchaseAuditStatus == 100">
                <div class="w-5 h-5 rounded-full border border-green-500 bg-green-50 inline-block align-middle text-xs text-center leading-5 text-green-500">采</div>
                <div class="inline-block">
                  <span class="text-green-500">￥{{ scope.row.TempSupplierPrice }}</span>
                  <span class="text-xs">/ </span>
                  <span class="text-xs text-green-500">{{ scope.row.TempSupplierRate }}</span>
                </div>
              </div>
              <div v-else>
                <div class="w-5 h-5 rounded-full border border-red-500 bg-red-50 inline-block align-middle text-xs text-center leading-5 text-red-500">核</div>
                <div class="inline-block">
                  <span class="text-red-500">￥{{ scope.row.TempSupplierPrice }}</span>
                  <span class="text-xs">/ </span>
                  <span class="text-xs text-red-500">{{ scope.row.TempSupplierRate }}</span>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="价格" align="center">
            <template #default="scope">
              <span>￥{{ scope.row.Price }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- #endregion -->
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { GetSupplierMaterialList } from '/@/api/tech/Material'

// 获取供应商
const renderTableList = async (data: any) => {
  await GetSupplierMaterialList({supplierId: data.supplierId, billId: data.BillId}).then((res) => {
    if (res.code == 1) {
      data.suppliersList = res.data
    }
  })
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
    const data = reactive({
      suppliersList: [],
      supplierId: 0,
      BillId: 0,
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

    const getData = () => {
      renderTableList(data)
    }
    onMounted(() => {
      data.supplierId = props.FormData.supplierId
      data.BillId = props.FormData.BillId
      getData()
    })

    return {
      boxStyle,
      closeWindow,
      data
    }
  }
})
</script>
<style lang="postcss" scoped></style>
