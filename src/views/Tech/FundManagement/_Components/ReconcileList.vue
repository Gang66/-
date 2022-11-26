<template>
  <OpenWindow :title="`${data.DataInfo?.SupplierName || ''} - 对账管理`" :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="edit-sales-contract-open-window">
    <div class="p-4">
      <el-table :data="data.DataInfo?.items" >
        <el-table-column type="index" label="序号" width="60" align="center" />
        <el-table-column prop="ContractBillNo" label="合同单号" width="170" align="center">
          <template #default="scope">{{ scope.row.ContractBillNo }}</template>
        </el-table-column>
        <el-table-column prop="AgreeDate" label="签约时间" width="170" align="center">
          <template #default="scope">{{ scope.row.AgreeDate }}</template>
        </el-table-column>
        <el-table-column prop="Amount" label="合同金额" align="center" width="120">
          <template #default="scope">
            <div class="inline-block">{{ scope.row.Amount }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="ExpirePayAmount" label="到期应付" align="center" width="120">
          <template #default="scope">
            <div>
              <span>{{ scope.row.ExpirePayAmount }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="PaidAmount" label="已付金额" align="center" width="120">
          <template #default="scope">
            <div>
              <span>{{ scope.row.PaidAmount }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="AfterSaleAmount" label="售后金额" align="center" width="120">
          <template #default="scope">
            <div class="clearfix">
              <span>{{ scope.row.AfterSaleAmount }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="RecruitChannel" label="操作" align="center">
          <template #default="scope">
            <div @click="editcost(scope.row, 5)">
              <div class="text-blue-600 inline-block cursor-pointer">查看</div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="zong h-10 flex text-center leading-10 border-b overflow-x-scroll" style="min-width: 968px">
        <div class="h-10" style="width: 60px"><span class="text-sm">合计</span></div>
        <div class="h-10" style="width: 340px"><span class="text-sm"></span></div>
        <div class="sum1 h-10"><span class="text-sm">{{ data.DataInfo?.TotalAmount }}</span></div>
        <div class="sum1 h-10"><span class="text-sm">{{ data.DataInfo?.TotalExpirePayAmount }}</span></div>
        <div class="sum1 h-10"><span class="text-sm">{{ data.DataInfo?.TotalPaidAmount }}</span></div>
        <div class="sum1 h-10"><span class="text-sm">{{ data.DataInfo?.TotalAfterSaleAmount }}</span></div>
      </div>
      <!-- 签订合同 -->
      <!-- 签订合同 -->
      <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted, computed } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { GetSupplierContractPaymentPage } from '/@/api/tech/Material'
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GenerationContractExamineOpen } from '/@/assets/ts/techOpenWindow'


const renderTableList = async (data: any) => {
  await GetSupplierContractPaymentPage({supplierId: data.SupplierId}).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.DataInfo = res.data
    }
  })
}


export default defineComponent({
  emits: ['closeWindow'],
  components: {
    OpenWindow,
    WFManagementForm
  },
  props: {
    FormData: {
      type: Object,
      default: {
        SupplierId: ''
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      SupplierId: 0,
      DataInfo: {}
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

    onMounted(() => {
      data.SupplierId = props.FormData.SupplierId

      renderTableList(data)
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...GenerationContractExamineOpen()
    }
  }
})
</script>

<style scoped>
.sum1{
  width: 120px;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
</style>