<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4">
      <!-- #region 基础信息 -->
      <MaterialOrderTop ref="MaterialOrderTopRef"/>
      <!-- #endregion -->
      <div>
        <div class="mt-3 mb-3">
          <img class="h-4 inline-block mr-4" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span>采购列表</span>
        </div>
        <div class="bf-table-content">
          <el-table :data="data.tableData" stripe @filter-change="filterData">
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="WorkAge" label="供应商" align="center" min-width="240" :filters="data.SupplierList" column-key="SupplierName">
              <template #default="scope">
                <p>{{scope.row.SupplierName}}</p>
                <p class="text-gray-400 text-xs">{{scope.row.DepartGroupName}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="物资名称" align="center" min-width="120">
              <template #default="scope">{{ scope.row.SystemName }}</template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="型号规格" align="center" width="120">
              <template #default="scope">
                {{ scope.row.SystemModel }} {{ scope.row.SystemSpecification }} {{ scope.row.RoutineType }}
                <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute left-0 top-0 right-0 bottom-0 m-auto opacity-60 rounded text-red-600" v-if="scope.row.PurchaseAuditStatus == -1">已驳回</div>
                <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute left-0 top-0 right-0 bottom-0 m-auto opacity-60 rounded text-red-600" v-else-if="scope.row.PurchaseAuditStatus == 100">已核准</div>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="售价" align="center" width="80">
              <template #default="scope">
                <span>{{ scope.row.Amount }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="单价" align="center" width="100">
              <template #default="scope">
                <div>
                  <span>{{ scope.row.Price }}</span>
                  <span class="text-xs text-red-500" v-if="scope.row.TempSupplierRate<2">{{ scope.row.TempSupplierRate }}</span>
                  <span class="text-xs text-green-500" v-else>{{ scope.row.TempSupplierRate }}</span>
                </div>
                <!-- <div>
                  <span>3850</span>
                  <span class="text-xs text-green-500">1.41</span>
                </div> -->
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="数量" align="center" width="80">
              <template #default="scope">
                <span>{{ scope.row.Quantity }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="价格" align="center" width="80">
              <template #default="scope">
                <span>{{ scope.row.SupplierMaterialPriceList }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="签订合同" align="center" width="100" :filters="data.contractSignData" column-key="IsSignContract">
              <template #default="scope">
                <span class="text-green-400" v-if="scope.row.IsSignContract">已签订</span>
                <span class="text-gray-400" v-else>未签订</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="备注" align="center" min-width="140">
              <template #default="scope">
                <span>{{ scope.row.Remark }}</span>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="mt-3 mb-3">
          <img class="h-4 inline-block mr-4" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span>采购合同</span>
        </div>
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
      </div>
      <!-- 签订合同 -->
      <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import MaterialOrderTop from './MaterialOrderTop.vue'
import { PostMatirialContractMainList, GetBillSupplierSearchList, GetContractMainList, PostSubmitContractApprovalSave } from '/@/api/tech/Material'
import { ElMessage } from 'element-plus'
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import { number } from 'echarts'

// 列表数据请求
const renderTableList = async (data: any) => {
  let _data = {
    BillId: data.BillId,
    SupplierIds: data.SupplierIds,
    IsSignContract: data.IsSignContract
  }
  await PostMatirialContractMainList(_data).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data
    }
  })
}

// 获取供应商
const GetSupplierList = async (data: any) => {
  await GetBillSupplierSearchList(data.BillId).then((res) => {
    if (res.code == 1) {
      let _SupplierList = <any>[]
      res.data.forEach((item: any) => {
        _SupplierList.push({
          text: item.SupplierName,
          value: item.SupplierId
        })
      })
      data.SupplierList = _SupplierList
    }
  })
}

// 获取采购合同列表
const GetContractList = async (data:any) => {
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
    MaterialOrderTop,
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
    const MaterialOrderTopRef = ref<any>(null)
    const data = reactive({
      BillId: 0,
      tableData: [],
      SupplierList: [],
      SupplierIds: [],
      contractSignData: [{ value: 0, text: '未签订' }, { value: 1, text: '已签订' }],
      ContractList: [],
      IsSignContract: null
    })
    const filterData = (val: any) => {
      data.SupplierIds = val.SupplierName
      if(val.IsSignContract && val.IsSignContract.length == 1){
        data.IsSignContract = val.IsSignContract[0]
      } else {
        data.IsSignContract = null
      }
      renderTableList(data)
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })

    //获取数据
    const getData = () => {
      renderTableList(data)
    }
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
      MaterialOrderTopRef.value.getData(data.BillId)
      GetSupplierList(data)
      renderTableList(data)
      GetContractList(data)
    })

    return {
      boxStyle,
      MaterialOrderTopRef,
      closeWindow,
      filterData,
      getData,
      getContractData,
      data,
      ...SetContract(data),
      WFManagementFormWindow,
      wfcloseWindow,
      editcost,
    }
  }
})
</script>
<style lang="postcss" scoped></style>
