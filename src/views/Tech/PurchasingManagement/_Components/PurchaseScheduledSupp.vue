<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <template #title>
      <div>
        <div class="header px-4 pt-2 pb-2 sale_bg EditSalesContract_header">
          <div class="flex justify-between">
            <div class="text-sm">
              {{ data.CustomerName }} - 物料采购分项比价 (<el-dropdown @command="handleCommand">
                <span class="text-white">
                  {{ data.GroupSubName }}
                  <i class="iconfont icon-down"></i>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item :command="item.Group" v-for="item in data.GroupInfos">{{ item.GroupSubName }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template> </el-dropdown
              >)
            </div>
            <el-icon @click="closeWindow('close')" class="cursor-pointer">
              <el-icon-Close />
            </el-icon>
          </div>
        </div>
      </div>
    </template>
    <div class="clearfix p-4 pb-20 tech_purchasingManagement_purchaseScheduledSupp">
      <!-- #region 基础信息 -->
      <div v-show="data.BasicShow" class="mb-4">
        <MaterialOrderTop ref="MaterialOrderTopRef" @GetInfoData="GetIMaterialOrderTopData"/>
      </div>

      <!-- #endregion -->
      <div class="clearfix mb-4">
        <div class="float-left text-sm">
          <el-button type="warning" @click="BasicClick()">基础信息</el-button>
          <!-- <span class="ml-4 text-blue-500 cursor-pointer" @click="approvalStatusFilterings()"> <i class="iconfont icon-shaixuan mr-1"></i> 高级筛选</span> -->
        </div>
        <div class="float-right text-sm leading-7">
          <span>销售总价：</span>
          <span class="font-semibold">{{ data.IMaterialOrderTopData.TotalSaleAmount }}</span>
          <span class="ml-2">采购总价：</span>
          <span class="font-semibold">{{ data.IMaterialOrderTopData.TotalPurchasePrice }}</span>
          <span class="ml-2">采购比例：</span>
          <span class="text-red-500" v-if="data.IMaterialOrderTopData.AllRate<2">{{ data.IMaterialOrderTopData.AllRate }}</span>
          <span class="text-green-500" v-else>{{ data.IMaterialOrderTopData.AllRate }}</span>
          <el-button type="primary" class="ml-4" @click="openWindowItemizedPrice()" v-if="!data.Disabled"> <i class="iconfont icon-chuangjian mr-2 font-semibold"></i> 新增供应商</el-button>
        </div>
      </div>
      <!-- #region 表格列表 -->
      <div class="">
        <el-table :data="data.PurchaseList" stripe border class="table-box">
          <el-table-column prop="CreateOn" label="技术参数" fixed min-width="300">
            <template #default="scope">
              <!-- 独立件 -->
              <img src="../../../../assets/img/tech/inquiry/Independent.png" class="absolute top-0 z-30 left-0 w-10 h-10" alt="" v-if="scope.row.MaterialInfo.TypeInfo == 1"/>
              <!-- 组合件 -->
              <img src="../../../../assets/img/tech/inquiry/Assembly.png" class="absolute top-0 z-30 left-0 w-10 h-10" alt=""  v-else-if="scope.row.MaterialInfo.TypeInfo == 2"/>
              <div class="inline-block ml-4">
                <p class="text-sm mb-2 mt-2"><span class="font-semibold">{{ scope.row.MaterialInfo.SystemName }}</span> {{ scope.row.MaterialInfo.SystemModel }} {{ scope.row.MaterialInfo.SystemSpecification }} {{ scope.row.MaterialInfo.RoutineType }}</p>
                <p class="text-xs">{{ scope.row.MaterialInfo.Remark }}</p>
              </div>
              <div v-if="scope.row.MaterialInfo != null">
                <template v-if="scope.row.MaterialInfo.RoleName == 'admin'">
                  <div class="w-16 h-7 leading-6 bg-green-100 border-green-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-70 rounded text-green-600" v-if="scope.row.MaterialInfo.ManagerAuditStatus == 100">已审核</div>
                  <div class="w-16 h-7 leading-6 bg-orange-100 border-orange-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-70 rounded text-orange-600" v-else-if="scope.row.MaterialInfo.ManagerAuditStatus == 0">待审核</div>
                  <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-70 rounded text-red-600" v-else-if="scope.row.MaterialInfo.ManagerAuditStatus == -1">已驳回</div>
                </template>
                <template v-if="scope.row.MaterialInfo.RoleName == 'purchaseManager'">
                  <div class="w-16 h-7 leading-6 bg-green-100 border-green-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-70 rounded text-green-600" v-if="scope.row.MaterialInfo.PurchaseAuditStatus == 100">已确认</div>
                  <div class="w-16 h-7 leading-6 bg-orange-100 border-orange-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-70 rounded text-orange-600" v-else-if="scope.row.MaterialInfo.PurchaseAuditStatus == 0">待审核</div>
                  <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-70 rounded text-red-600" v-else-if="scope.row.MaterialInfo.PurchaseAuditStatus == -1">已驳回</div>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="数量" width="60" align="center" fixed>
            <template #default="scope">
              <span>{{ scope.row.MaterialInfo.Quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" align="center" width="140" v-for="(item, index) in getSupplierList">
            <template #header>
              <img src="../../../../assets/img/tech/inquiry/discount.png" class="w-8 h-8 absolute right-0 top-0 cursor-pointer" alt="" @click="openWindowDiscountPrice(item.Price)" v-if="item.Price.DiscountAmount > 0"/>
              <img src="../../../../assets/img/tech/inquiry/discount.png" class="w-8 h-8 absolute right-0 top-0 cursor-pointer grayscale " alt="" @click="openWindowDiscountPrice(item.Price)" v-else/>
              <div class="flex justify-center items-center title">
                <el-radio-group v-model="data.rowIndex" :disabled="data.Disabled">
                  <el-radio :label="index" @click="SetColIndex(index)"><span>{{ item.SupplierInfo.Abbreviation }}</span></el-radio>
                </el-radio-group>
              </div>
            </template>
            <template #default="scope">
              <div class="w-32 h-12 border rounded-md leading-4 cursor-pointer" @click="supplierClick(scope.$index,index)" :class="{ active: scope.row.MaterialInfo.ColIndex == index }" v-if="item.Price != null">
                <p>
                  <span class="text-base font-semibold text-green-500" :class="{ active: scope.row.MaterialInfo.ColIndex == index }">￥{{ item.Price.PurchasePrice }}</span>
                  <span class="text-red-500 text-xs" :class="{ active: scope.row.MaterialInfo.ColIndex == index }">/ {{ item.Price.Ratio }}</span>
                </p>
                <p class="text-gray-400" :class="{ active: scope.row.MaterialInfo.ColIndex == index }">{{ item.Price.DepartGroupName }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" fixed="right" label="销售价" align="center" width="100">
            <template #default="scope">
              <span class="text-blue-500 cursor-pointer">{{ scope.row.MaterialInfo.Amount }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- #endregion -->
    </div>
    <div class="w-full h-12 bg-white absolute bottom-0 pt-2 pl-4 pr-4 shadow-2xl z-30" v-if="!data.Disabled">
      <div class="float-right">
        <el-button type="danger" @click="Reject">驳回</el-button>
        <el-button type="primary" @click="Submit">通过</el-button>
      </div>
    </div>
    <!-- 新增供应商 -->
    <ItemizedPrice v-if="itemizedPriceOpenData.visible" :FormData="itemizedPriceOpenData.formData" @closeWindow="closeWindowItemizedPrice($event)" />
    <!--  高级筛选   右侧弹出层 -->
    <ApprovalStatusFiltering :visible="data.approvalStatusFiltering" @closeApprovalStatusFiltering="closeApprovalStatusFiltering" />
    <!-- 折扣价 -->
    <DiscountPrice title="采购分项设值" v-if="discountPriceOpenData.visible" :FormData="discountPriceOpenData.formData" @closeWindow="closeWindowdiscountPrice($event)" />
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted, computed } from 'vue'
import { GetGroupMaterialSearchInfo,PostMaterialConfirmPricesListPage, PostConfirmMaterialSupplierSave, PostSetRejectMaterialSupplierSave } from '/@/api/tech/Material'
import { ElMessage, ElMessageBox } from 'element-plus'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import MaterialOrderTop from './MaterialOrderTop.vue'
import ItemizedPrice from './ItemizedPrice.vue'
import ApprovalStatusFiltering from '../../AccountingProcessing/_Components/ApprovalStatusFiltering.vue'
import DiscountPrice from './DiscountPrice.vue'
import { markRaw } from 'vue'
import { WarningFilled } from '@element-plus/icons-vue'
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await PostMaterialConfirmPricesListPage(form).then((res) => {
    if (res.code == 1) {
      let _PurchaseList = <any>res.data || []
      if (_PurchaseList.length > 0) {
        _PurchaseList.forEach((item:any) => {
          if(item.MaterialInfo.RoleName == 'admin' && item.MaterialInfo.ManagerAuditStatus == 100) {
            data.Disabled = true
          }else if (item.MaterialInfo.RoleName == 'purchaseManager' && item.MaterialInfo.PurchaseAuditStatus == 100) {
            data.Disabled = true
          }

          if (item.Supplier.length > 0) {
            item.Supplier.forEach((row:any) => {
              let _DetailJson = JSON.parse(row.Price.DetailJson || '')
              if (_DetailJson != '') {
                let _PurchasePrice =  _DetailJson.PriceList[_DetailJson.CurrIndex]
                // 采购价格
                row.Price.PurchasePrice = _PurchasePrice
                // 采购比率
                row.Price.Ratio = Number(item.MaterialInfo.Amount) / Number(_PurchasePrice) * Number(item.MaterialBillRate)
              }
            })
          }
          // 是否选中
          let _ColIndex = item.Supplier.findIndex((t:any) => {return t.SupplierInfo.Id == item.MaterialInfo.SupplierId})
          item.MaterialInfo.ColIndex = _ColIndex
        })
      }
      data.PurchaseList = _PurchaseList
    }
  })
}

// // 获取搜索条件
// const GetSearchInfo = async (form: any, data: any) => {
//   await GetGroupMaterialSearchInfo({billId: form.BillId}).then((res) => {
//     if (res.code == 1) {
//       data.GroupInfos = res.data.GroupInfos
//     }
//   })
// }

export default defineComponent({
  components: {
    OpenWindow,
    MaterialOrderTop,
    ItemizedPrice,
    ApprovalStatusFiltering,
    DiscountPrice
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const MaterialOrderTopRef = ref<any>(null)
    const data = reactive({
      PurchaseList: <any>[], //表格数据
      number: -1,
      BasicShow: false,
      approvalStatusFiltering: false,
      showPrice: 0,

      IMaterialOrderTopData: {},
      CustomerName: '',
      GroupInfos: <any>[], // 分组列表
      GroupSubName: '',
      group: 0,
      rowIndex: -1,
      Disabled: false
    })
    const form = reactive({
      BillId: 0,
      ProductName: '',
      Group: 0,
      Model: '',
      Specification: ''
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1500',
      boxHeight: ''
    })
    // 挑选供应商
    const supplierClick = (index: number, idx: number) => {
      if(data.Disabled){
        return false
      }
      let IsAmount = <number>-1
      if (data.PurchaseList[index].MaterialInfo.ColIndex>0){
        IsAmount = data.PurchaseList[index]['Supplier'][data.PurchaseList[index].MaterialInfo.ColIndex]['Price']['DiscountAmount']
      }
      
      if (idx != data.rowIndex && IsAmount > 0 && data.rowIndex > 0) {
        ElMessageBox.confirm(
        '更换供应商后则不会享受折扣优惠',
        '提示',
        {
          type: 'warning',
          icon: markRaw(WarningFilled),
          distinguishCancelAndClose: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }
      )
        .then(() => {
          data.PurchaseList[index].MaterialInfo.ColIndex = idx
        })
      } else {
        data.PurchaseList[index].MaterialInfo.ColIndex = idx
      }
    }

    // 通过
    const Submit = () => {
      try {
        let _data = <any>[]
        data.PurchaseList.forEach((item:any) => {
          let _ColIndex = <any>item.MaterialInfo.ColIndex //选中供应商索引
          if (_ColIndex < 0) {
            throw new Error("请选择完整供应商");
          }
          let _info = <any>{
            MaterialId: item.MaterialInfo.Id,
            SupplierId: item.Supplier[_ColIndex].SupplierInfo.Id,
            SupplierPrice: item.Supplier[_ColIndex].Price.PurchasePrice,
            DepartGroupId: item.Supplier[_ColIndex].Price.DepartGroupId
          }
          _data.push(_info)
        })
        PostConfirmMaterialSupplierSave(form.BillId, form.Group,_data).then(res=>{
          res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
          if(res.code == 1) {
            closeWindow('submit')
          }
        })
      } catch (error:any) {
        ElMessage.error(error.message)
      }
    }

    // 驳回
    const Reject = () => {
      PostSetRejectMaterialSupplierSave(form.BillId, form.Group).then(res => {
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
          if(res.code == 1) {
            closeWindow('submit')
          }
      })
    }

    const SetColIndex = (index: any) => {
      if(data.Disabled){
        return false
      }
      data.rowIndex = index
      data.PurchaseList.forEach((item: any)=> {
        item.MaterialInfo.ColIndex = index
      })
    }

    //获取供应商
    const getSupplierList = computed(()=>{
      let _supplierList=<any>[]
      let _AllSellingPrice = <any>0 // 合计售价
      let _AllPurchasePrice = <any>[] // 合计采购价
      let _IsRow = true // 是否选择整列
      if (data.PurchaseList.length > 0) {
        data.PurchaseList.forEach((item: any, index:any)=> {
          if(item.MaterialInfo.ColIndex != data.PurchaseList[0].MaterialInfo.ColIndex){
            _IsRow = false
          }
          
          item.Supplier.forEach((e: any, i:any) => {
            // 计算合计采购
            _AllPurchasePrice.push(0)
            _AllPurchasePrice[i] = Number(_AllPurchasePrice[i]) + (Number(e.Price.PurchasePrice) * Number(item.MaterialInfo.Quantity))
            // 计算单个比率
            if (e.Price.PurchasePrice > 0) {
              e.Price.Ratio = (Number(item.MaterialInfo.Amount) / Number(e.Price.PurchasePrice) * Number(item.MaterialBillRate)).toFixed(2)
            } else {
              e.Price.Ratio = 0
            }
          })
          // 合计售价
          _AllSellingPrice = Number(_AllSellingPrice) + (Number(item.MaterialInfo.Amount) * Number(item.MaterialInfo.Quantity))
        })

        // 选择整列小圆点
        if(_IsRow && data.PurchaseList.length > 0){
          data.rowIndex = data.PurchaseList[0].MaterialInfo.ColIndex
        }else{
          data.rowIndex = -1
        }

        data.PurchaseList.forEach((item:any, index:any) => {
          item.Supplier.forEach((e:any,idx:any) => {
            e.Price.AllSellingPrice = _AllSellingPrice
            e.Price.AllPurchasePrice = _AllPurchasePrice[idx]
            if(index==0){
              _supplierList.push(e)
            }
          })
        })
      }
      return _supplierList
    })

    // 基础信息
    const BasicClick = () => {
      if (data.BasicShow == false) {
        data.BasicShow = true
      } else {
        data.BasicShow = false
      }
    }
    // 接收销售总价、采购总价、采购比例
    const GetIMaterialOrderTopData = (val: any) => {
      data.IMaterialOrderTopData = val
    }
    // 选择分组项
    const handleCommand = (command: number) => {
      console.log(command)
      let _index = data.GroupInfos.findIndex((item:any) => { return item.Group == command })
      data.GroupSubName = data.GroupInfos[_index].GroupSubName
      form.Group = command
      renderTableList(form, data)
    }
    // 新增供应商
    const itemizedPriceOpen = (data: any) => {
      let itemizedPriceOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowItemizedPrice = (val: any) => {
        itemizedPriceOpenData.formData = {}
        itemizedPriceOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowItemizedPrice = (type: string) => {
        itemizedPriceOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        itemizedPriceOpenData,
        openWindowItemizedPrice,
        closeWindowItemizedPrice
      }
    }
    // 高级筛选
    const approvalStatusFilterings = () => {
      data.approvalStatusFiltering = true
    }
    // 关闭抽屉 高级筛选
    const closeApprovalStatusFiltering = () => {
      data.approvalStatusFiltering = false
    }
    // 折扣价
    const discountPriceOpen = (data: any) => {
      let discountPriceOpenData: any = reactive({
        visible: false,
        formData: {
          AllSellingPrice: 0,
          AllPurchasePrice: 0,
          DiscountAmount: 0,
          showPrice: 0
        }
      })

      //打开弹窗
      const openWindowDiscountPrice = (val: any) => {
        discountPriceOpenData.formData = {
          AllSellingPrice: val.AllSellingPrice,
          AllPurchasePrice: val.AllPurchasePrice,
          DiscountAmount: val.DiscountAmount || 0,
          showPrice: 0
        }
        discountPriceOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowdiscountPrice = (type: string) => {
        discountPriceOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        discountPriceOpenData,
        openWindowDiscountPrice,
        closeWindowdiscountPrice
      }
    }

    onMounted(()=>{
      form.BillId = props.FormData.billId
      data.CustomerName = props.FormData.CustomerName
      form.Group = props.FormData.group
      data.GroupSubName = props.FormData.GroupSubName
      data.GroupInfos = props.FormData.GroupInfos
      renderTableList(form,data)
      MaterialOrderTopRef.value.getData(form.BillId)
      // GetSearchInfo(form,data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      supplierClick,
      MaterialOrderTopRef,
      GetIMaterialOrderTopData,
      BasicClick,
      handleCommand,
      ...itemizedPriceOpen({ data }),
      getSupplierList,
      Submit,
      Reject,
      SetColIndex,
      approvalStatusFilterings,
      closeApprovalStatusFiltering,
      ...discountPriceOpen({ data })
    }
  }
})
</script>
<style lang="postcss" scoped>
.EditSalesContract_header {
  background-color: var(--7ba5bd90-themeStyle_sidebarBg) !important;
  color: #ffffff;
}
:deep(.max-w-screen-xl) {
  max-width: 1600px !important;
}
.active {
  background: #409eff;
  color: #ffffff !important;
}
.tech_purchasingManagement_purchaseScheduledSupp {
  :deep(.el-table .cell) {
    padding: 0 6px !important;
  }
}
:deep(.title .el-radio){
  margin-right: 0;
  font-weight: bold;
  color: #909399;
}
</style>
