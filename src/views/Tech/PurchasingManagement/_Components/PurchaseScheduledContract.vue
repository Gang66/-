<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-0">
      <!-- #region 表格列表 -->
      <div class="bf-table-content">
        <el-table :data="data.ContractList" stripe>
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="AgreeDate" label="签约时间" align="center" width="170">
            <template #default="scope">{{ scope.row.AgreeDate }}</template>
          </el-table-column>
          <el-table-column prop="Y_CompanyName" label="供应商" align="center" min-width="240">
            <template #default="scope">
              <p>{{scope.row.Y_CompanyName}}</p>
              <p class="text-gray-400 text-xs">{{scope.row.DepartGroupName}}</p>
            </template>
          </el-table-column>
          <el-table-column prop="SalerName" label="负责人" align="center" width="80">
            <template #default="scope">
              <span>{{ scope.row.SalerName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Amount" label="销售金额" align="center" width="90">
            <template #default="scope">
              <span>{{ scope.row.SalePrices }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="采购金额" align="center" width="90">
            <template #default="scope">
              <div>
                <template v-if="scope.row.DiscountAmount>0">
                  <span>{{ scope.row.DiscountAmount }}</span>
                  <span class="text-xs text-green-500" v-if="getRate(scope.row.SalePrices, scope.row.DiscountAmount, scope.row.ContractRealRate)>0">{{ getRate(scope.row.SalePrices, scope.row.DiscountAmount, scope.row.ContractRealRate) }}</span>
                  <span class="text-xs text-red-500" v-else>{{ getRate(scope.row.SalePrices, scope.row.DiscountAmount, scope.row.ContractRealRate) }}</span>
                </template>
                <template v-else>
                  <span>{{ scope.row.Amount }}</span>
                  <span class="text-xs text-green-500" v-if="getRate(scope.row.SalePrices, scope.row.Amount, scope.row.ContractRealRate)>0">{{ getRate(scope.row.SalePrices, scope.row.Amount, scope.row.ContractRealRate) }}</span>
                  <span class="text-xs text-red-500" v-else>{{ getRate(scope.row.SalePrices, scope.row.Amount, scope.row.ContractRealRate) }}</span>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="供货期" align="center">
            <template #default="scope">
              <div>{{ scope.row.DeliveryTime }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="BillState" label="采购状态" align="center" width="80">
            <template #default="scope">
              <span v-if="scope.row.BillState == -100">作废</span>
              <span v-else-if="scope.row.BillState == 100">已生效</span>
              <span v-else-if="scope.row.BillState == -1">驳回</span>
              <span v-else>待生效</span>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="生效时间" align="center" width="144">
            <template #default="scope">
              <span>{{ scope.row.AuditDate }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="WorkAge" label="操作" align="center" width="140">
            <template #default="scope">
              <div v-if="scope.row.BillState == -1">
                <span class="text-red-500">审批驳回</span>
              </div>
              
              <div v-if="scope.row.BillState == 1 || scope.row.BillState == 2" @click="editcost(scope.row, 3)"><span class="text-yellow-500">审核中</span></div>
              <div v-else-if="scope.row.BillState == 100" @click="editcost(scope.row, 3)"><span class="text-green-500  cursor-pointer">审批通过</span></div>
              <div v-else>
                <span class="text-blue-500 cursor-pointer" v-if="scope.row.BillState == 0 || scope.row.BillState == -1" @click="editcost(scope.row, 2)">编辑</span>
                <span class="text-green-500 ml-2 cursor-pointer" v-if="scope.row.BillState == 0 || scope.row.BillState == -1" @click="SubmitApproval(scope.row.Id)">提报</span>
                <span class="text-green-500 ml-2 cursor-pointer" v-else @click="editcost(scope.row, 3)">查看</span>
                <!-- <span class="text-green-500 ml-2 cursor-pointer" @click="SubmitApproval(scope.row.Id)">提报</span> -->
                <!-- <span class="text-yellow-800 ml-2" @click="DeleteApproval(scope.row.Id)">删除</span> -->
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import Operation from './Operation.vue'
import { ElMessage } from 'element-plus'
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import { GetContractMainList, PostSubmitContractApprovalSave } from '/@/api/tech/Material'

// 获取采购合同列表
const GetContractList = async (data: any) => {
  let _data = {
    BillId: data.BillId,
    AuditStatus: 0,
    CusName: ''
  }
  await GetContractMainList(_data).then((res) => {
    if (res.code == 1) {
      data.ContractList = res.data
    }
  })
}
// 采购合同
const SetContract = (data: any) => {
  // 提报
  const SubmitApproval = (Id: any) => {
    PostSubmitContractApprovalSave(Id).then(res => {
      res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
      GetContractList(data)
    })
  }
  const getRate = (t:any,v:any, n:any) => {
    let _Rate = 0
    if(Number(v)>0){
      _Rate = Number(t)/Number(v) * Number(n)
    }
    return _Rate
  }

  return {
    SubmitApproval,
    getRate
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    Operation,
    WFManagementForm
  },
  props: {
    FormData: {
      type: Object,
      default: {
        BillId: 0
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      BillId: 0,
      ContractList: []
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
    //获取采购合同数据
    const getContractData = () => {
      GetContractList(data)
    }
    //#region WFManagementForm
    const WFManagementFormWindow = ref({
      details: {
        viewType: 1
      },
      show: false,
      Id: 0
    })
    const wfcloseWindow = () => {
      WFManagementFormWindow.value.show = false
      getContractData()
    }
    ///打开
    const editcost = (row: any, type: any) => {
      GetApplyFlowStepEvent({
        DataId: row.Id,
        Code: 'Tech_PurchaseContractBase'
      }).then((res: any) => {
        WFManagementFormWindow.value.details = res.data
        WFManagementFormWindow.value.details.viewType = type
        WFManagementFormWindow.value.show = true
      })
    }
    //#endregion
    
    onMounted(()=>{
      data.BillId = props.FormData.BillId
      GetContractList(data)
    })

    return {
      data,
      boxStyle,
      closeWindow,
      ...SetContract(data),
      WFManagementFormWindow,
      wfcloseWindow,
      editcost,
    }
  }
})
</script>
<style lang="postcss" scoped></style>
