<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 pt-0">
      <!-- #region 表格列表 -->
      <el-button type="primary" class="mb-2 float-right" @click="AddContract"> <i class="iconfont icon-filecoverdangandai mr-2" ></i> 生成合同</el-button>
      <div class="bf-table-content">
        <el-table :data="data.tableData" stripe @filter-change="filterData" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
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
                <span class="text-xs text-red-500" v-if="getReal(scope.row.Amount,scope.row.Price,scope.row.ContractRealRate)<2">{{ getReal(scope.row.Amount,scope.row.Price,scope.row.ContractRealRate) }}</span>
                <span class="text-xs text-green-500" v-else>{{ getReal(scope.row.Amount,scope.row.Price,scope.row.ContractRealRate) }}</span>
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
              <span>{{ scope.row.Quantity * scope.row.Price }}</span>
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
      <!-- #endregion -->
      <!-- 签订合同 -->
      <GenerationContract
      title="采购合同"
      v-if="GenerationContractOpenData.visible"
      :FormData="GenerationContractOpenData.formData"
      :ViewType="GenerationContractOpenData.ViewType"
      :DataId="GenerationContractOpenData.DataId"
      @closeWindow="closeWindowGenerationContract($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import Operation from './Operation.vue'
import { PostMatirialContractMainList, GetBillSupplierSearchList } from '/@/api/tech/Material'
import {ElMessage} from 'element-plus'
import GenerationContract from './GenerationContract.vue'

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
//  采购合同
const GenerationContractOpen = (data: any) => {
  let GenerationContractOpenData: any = reactive({
    visible: false,
    ViewType: 1,
    DataId: 0,
    formData: {
      BillId: 0,
      MaterialIds: []
    }
  })

  //打开弹窗
  const openWindowGenerationContract = () => {

    GenerationContractOpenData.formData = {
      BillId: data.data.BillId,
      MaterialIds: data.data.MaterialIds
    }
    console.log(GenerationContractOpenData.formData,888)
    GenerationContractOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowGenerationContract = (type: string) => {
    GenerationContractOpenData.visible = false
    data.getData()
  }

  return {
    GenerationContractOpenData,
    openWindowGenerationContract,
    closeWindowGenerationContract
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    Operation,
    GenerationContract
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
      tableData: [],
      SupplierList: [],
      SupplierIds: [],
      contractSignData: [{ value: 0, text: '未签订' }, { value: 1, text: '已签订' }],
      ContractMainList: <any>[],
      MaterialIds: <any>[],
      IsSignContract: null
    })
    //获取数据
    const getData = () => {
      renderTableList(data)
    }
    const GenerationContract = GenerationContractOpen({data, getData})
    const filterData = (val: any) => {
      data.SupplierIds = val.SupplierName
      if(val.IsSignContract.length == 1){
        data.IsSignContract = val.IsSignContract[0]
      } else {
        data.IsSignContract = null
      }
      renderTableList(data)
    }
    const handleSelectionChange = (val: any) => {
      data.ContractMainList = val
      let _MaterialIds = <any>[]
      if(val.length>0){
        val.forEach((item:any) => {
          _MaterialIds.push(item.Id)
        })
      }
      data.MaterialIds = _MaterialIds
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
    
    // 生成合同
    const AddContract = () => {
      try {
        if(data.ContractMainList.length <= 0){
          throw Error('请选择一家供应商进行操作')
        }
        let _SupplierId = data.ContractMainList[0].SupplierId
        data.ContractMainList.forEach((item:any) => {
          if (item.IsSignContract == 1) {
            throw Error('存在已签订合同的物料')
          }
          if(item.SupplierId != _SupplierId){
            throw Error('存在多个供应商')
          }
        })
        GenerationContract.GenerationContractOpenData.ViewType = 1
        GenerationContract.GenerationContractOpenData.DataId = 0
        GenerationContract.openWindowGenerationContract()
      } catch (error:any) {
        ElMessage.error(error.message)
      }
      
    }

    const getReal = (val:any, real:any, con:any) => {
      let _Real = <any>0
      if (real > 0) {
        _Real = Number(val)/Number(real) * con
      }
      return _Real
    }
    
    onMounted(()=>{
      data.BillId = props.FormData.BillId
      GetSupplierList(data)
      renderTableList(data)
      // GenerationContract.openWindowGenerationContract()
    })

    return {
      boxStyle,
      closeWindow,
      filterData,
      getData,
      handleSelectionChange,
      AddContract,
      getReal,
      data,
      ...GenerationContract,
    }
  }
})
</script>
<style lang="postcss" scoped></style>
