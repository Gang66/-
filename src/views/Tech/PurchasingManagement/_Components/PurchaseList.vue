<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4">
      <!-- #region 基础信息 -->
      <div v-show="data.BasicShow">
        <MaterialOrderTop ref="MaterialOrderTopRef" @GetInfoData="GetIMaterialOrderTopData"/>
      </div>
      <div class="text-sm pt-4">
        <span>销售总价：</span>
        <span class="font-semibold mr-3">{{ data.IMaterialOrderTopData.TotalSaleAmount }}</span>
        <span>采购总价：</span>
        <span class="font-semibold mr-3">{{ data.IMaterialOrderTopData.TotalPurchasePrice }}</span>
        <span>采购比例：</span>
        <span class="font-semibold text-red-500" v-if="data.IMaterialOrderTopData.AllRate < 2">{{ data.IMaterialOrderTopData.AllRate }}</span>
        <span class="font-semibold text-green-500" v-else>{{ data.IMaterialOrderTopData.AllRate }}</span>
        <span class="text-red-500 float-right"> <i class="iconfont icon-yichang mr-1"></i> 单项产品采购比例低于 1.5 的需【运营经理】核准，低于 2.0 的需【物采经理】核准。</span>
      </div>
      <!-- #endregion -->
      <div class="pt-3">
        <el-select v-model="form.ProductName" placeholder="产品名称" style="width: 200px" class="mr-4">
          <el-option v-for="item in data.ProductNames" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="form.Group" placeholder="分组分项" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.GroupInfos" :key="item.GroupSubName" :label="item.GroupSubName" :value="item.Group" />
        </el-select>
        <el-select v-model="form.Model" placeholder="型号" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.Models" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="form.Specification" placeholder="规格" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.Specifications" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="form.Materials" placeholder="材质" style="width: 100px" class="mr-4">
          <el-option v-for="item in data.Materials" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="form.TypeInfo" placeholder="属性" style="width: 200px" class="mr-4">
          <el-option label="独立件" :value="1" />
          <el-option label="组合件" :value="2" />
        </el-select>
        <el-button type="danger" @click="Cline"><i class="iconfont icon-zhongzhi mr-2"></i>重置</el-button>
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
      </div>
      <div class="pt-3">
        <el-button type="warning" @click="BasicClick()"> <i class="iconfont icon-gongzuotai mr-2"></i> 基础信息</el-button>
        <el-button type="primary" @click="Grouping()" v-if="data.OnlyType != 2"> <i class="iconfont icon-chanpin mr-2" ></i> 调整分组</el-button>
        <el-button type="primary" @click="FromsParameter()" v-if="data.FromsParam == 1"> <i class="iconfont icon-dingdan mr-2"></i>技术参数</el-button>
        <el-button type="primary" @click="FromsParameter()" v-else> <i class="iconfont icon-dingdan mr-2"></i> 表单显示</el-button>
        <el-button type="success" v-if="data.OnlyType == 0"> <i class="iconfont icon-filecoverdangandai mr-2"></i> 转入合同</el-button>
      </div>
      <!-- #region 表格列表 -->
      <div class="bf-table-content">
        <el-table :data="data.PurchaseList" stripe @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="GroupSubName" label="分组分项" align="center" width="80">
            <template #default="scope">
              <span class="text-red-500">{{ scope.row.GroupSubName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="TypeInfo" label="属性" align="center" width="80">
            <template #default="scope">
              <span v-if="scope.row.TypeInfo == 1">独立件</span>
              <span v-else-if="scope.row.TypeInfo == 2">组合件</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="技术参数" min-width="300" v-if="data.FromsParam == 1">
            <template #default="scope">
              <div class="inline-block">
                <p class="text-sm mb-2 mt-2">{{ scope.row.SystemName }} {{ scope.row.SystemModel }} {{ scope.row.SystemSpecification }}</p>
                <p class="text-xs">{{ scope.row.Remark }}</p>
              </div>
              <template v-if="data.OnlyType == 0">
                <div class="w-16 h-7 leading-6 bg-green-100 border-green-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-green-500" v-if="scope.row.ConfirmStatus == 1">已确认</div>
                <div class="w-16 h-7 leading-6 bg-blue-100 border-blue-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-blue-500" v-else-if="scope.row.ConfirmStatus == 2">已审核</div>
                <div class="w-16 h-7 leading-6 bg-gray-100 border-gray-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-gray-500" v-else-if="scope.row.ConfirmStatus == 3">未中标</div>
                <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-red-500" v-else-if="scope.row.ConfirmStatus == 4">已驳回</div>
              </template>
              <template v-else-if="scope.row.RoleName == 'admin'">
                <div class="w-16 h-7 leading-6 bg-green-100 border-green-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-green-500" v-if="scope.row.ManagerAuditStatus == 100">已审核</div>
                <div class="w-16 h-7 leading-6 bg-blue-100 border-blue-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-blue-500" v-else-if="scope.row.ManagerAuditStatus == 0">待审核</div>
                <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-red-500" v-else-if="scope.row.ManagerAuditStatus == -1">已驳回</div>
              </template>
              <template v-else-if="scope.row.RoleName == 'purchaseManager'">
                <div class="w-16 h-7 leading-6 bg-green-100 border-green-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-green-500" v-if="scope.row.PurchaseAuditStatus == 100">已确认</div>
                <div class="w-16 h-7 leading-6 bg-blue-100 border-blue-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-blue-500" v-else-if="scope.row.PurchaseAuditStatus == 0">待审核</div>
                <div class="w-16 h-7 leading-6 bg-red-100 border-red-300 border-dashed border-2 text-sm text-center transform rotate-12 absolute right-2 top-5 opacity-95 rounded text-red-500" v-else-if="scope.row.PurchaseAuditStatus == -1">已驳回</div>
              </template>
              
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="名称" width="140" v-if="data.FromsParam == 2">
            <template #default="scope">
              <span>{{ scope.row.SystemName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="型号" align="center" width="120" v-if="data.FromsParam == 2">
            <template #default="scope">
              <span>{{ scope.row.SystemModel }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="规格" align="center" width="80" v-if="data.FromsParam == 2">
            <template #default="scope">
              <span>{{ scope.row.SystemSpecification }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="数量" align="center" width="60">
            <template #default="scope">
              <span>{{ scope.row.Quantity }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="销售价" align="center" min-width="100">
            <template #default="scope">
              <span>￥{{ scope.row.Price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="核采价格" align="center" width="140">
            <template #default="scope">
              <!-- <el-popover placement="bottom-start" trigger="hover">
                <template #reference> -->
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
                <!-- </template> -->
                <!-- <template #content> -->
                <!-- <div>
                  <p class="text-green-500">采购信息：</p>
                  <p><span>浙江环控</span><span class="float-right">￥100</span></p>
                  <p class="text-red-500">核算信息：</p>
                  <p><span>浙江环控</span><span class="float-right">￥100</span></p>
                </div> -->
                <!-- </template> -->
              <!-- </el-popover> -->
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="供应商" align="center" width="100">
            <template #default="scope">
              <span>{{ scope.row.TempSupplierName }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="金额" align="center" width="120">
            <template #default="scope">
              <span>{{ getMoney(scope.row.Quantity, scope.row.TempSupplierPrice)}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="操作" align="center" width="60">
            <template #default="scope">
              <span class="text-blue-500 cursor-pointer" @click="openWindowItemizedPrice(scope.row)" v-if="data.OnlyType == 0">查看</span>
              <span class="text-blue-500 cursor-pointer" @click="openWindowPurchaseScheduledSupp(scope.row)" v-else="data.OnlyType == 1">查看</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- #endregion -->
      <!-- 调整分组 -->
      <ManagementGroup title="管理分组" v-if="adjustGroupingOpenData.visible" :FormData="adjustGroupingOpenData.formData" @closeWindow="closeWindowAdjustGrouping($event)" />
      <!-- 采购比价查看  -->
      <ItemizedPrice v-if="itemizedPriceOpenData.visible" :FormData="itemizedPriceOpenData.formData" @closeWindow="closeWindowItemizedPrice($event)" />
      <!-- 采购预定查看 -->
      <PurchaseScheduledSupp title="成本分析" v-if="purchaseScheduledSuppOpenData.visible" :FormData="purchaseScheduledSuppOpenData.formData" @closeWindow="closeWindowPurchaseScheduledSupp($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { PostGroupMaterialList, GetGroupMaterialSearchInfo, GetUserRoleName } from '/@/api/tech/Material'
import MaterialOrderTop from './MaterialOrderTop.vue'
import ManagementGroup from './ManagementGroup.vue'
import ItemizedPrice from './ItemizedPrice.vue'
import PurchaseScheduledSupp from './PurchaseScheduledSupp.vue'
import { ElMessage } from 'element-plus'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await PostGroupMaterialList(form).then((res) => {
    console.log(res)
    if (res.code == 1) {
      data.PurchaseList = res.data
    }
  })
}
// 获取搜索条件
const GetSearchInfo = async (form: any, data: any) => {
  await GetGroupMaterialSearchInfo({billId: form.BillId}).then((res) => {
    console.log(res)
    if (res.code == 1) {
      data.GroupInfos = res.data.GroupInfos
      data.Materials = res.data.Materials
      data.Models = res.data.Models
      data.ProductNames = res.data.ProductNames
      data.Specifications = res.data.Specifications
    }
  })
}

// 调整分组
  const adjustGroupingOpen = (data: any) => {
    let adjustGroupingOpenData: any = reactive({
      visible: false,
      formData: {
        selectDetail: [],
        Id: 0
      }
    })

    //打开弹窗
    const openWindowAdjustGrouping = (val: any) => {
      adjustGroupingOpenData.formData = {
        selectDetail: val.selectDetail,
        Id: val.Id
      }
      adjustGroupingOpenData.visible = true
    }

    //关闭弹窗
    const closeWindowAdjustGrouping = (type: string) => {
      adjustGroupingOpenData.visible = false
      if (type == 'submit') data.getData(data.data)
    }

    return {
      adjustGroupingOpenData,
      openWindowAdjustGrouping,
      closeWindowAdjustGrouping
    }
  }

// 筛选
const tableRender = (form: any, data: any) => {
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
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  const Cline = () => {
    form.ProductName = ''
    form.Group = null
    form.Model = ''
    form.Specification = ''
    form.Materials = ''
    form.TypeInfo = null
  }
  // 获取金额
  const getMoney = (price:any, quantity: any) => {
    return (Number(price) * Number(quantity)).toFixed(2)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetail = val
  }
  return {
    Cline,
    search,
    getStatus,
    getMoney,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    MaterialOrderTop,
    ManagementGroup,
    ItemizedPrice,
    PurchaseScheduledSupp
  },
  props: {
    FormData: {
      type: Object,
      default: {
        BillId: 0,
        CustomerName: '',
        OnlyType: 0 // 0从采购比价进入，1采购预定进入2 采购审批进入
      }
    }
  },
  setup(props, context: SetupContext) {
    const MaterialOrderTopRef = ref<any>(null)
    const data = reactive({
      FromsParam: 1, // 1 默认是技术参数
      BasicShow: false,
      PurchaseList: [], //表格数据
      GroupInfos: [],
      Materials: [],
      Models: [],
      ProductNames: [],
      Specifications: [],
      IMaterialOrderTopData: {},
      CustomerName: '',
      selectDetail: <any>[],
      OnlyType: 0
    })
    const form = reactive({
      BillId: 0,
      ProductName: '',
      Group: null,
      Model: '',
      Specification: '',
      Materials: '',
      TypeInfo: null
    })
    const getData = () => {
      renderTableList(form, data)
    }
    const ManagementGroup = adjustGroupingOpen({data, getData})
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })
    // 基础信息
    const BasicClick = () => {
      if (data.BasicShow == false) {
        data.BasicShow = true
      } else {
        data.BasicShow = false
      }
    }
    // 判断是否是表单显示还是技术参数  默认是i技术参数
    const FromsParameter = () => {
      if (data.FromsParam == 1) {
        data.FromsParam = 2
      } else {
        data.FromsParam = 1
      }
      console.log(data.FromsParam)
    }

    // 接收销售总价、采购总价、采购比例
    const GetIMaterialOrderTopData = (val: any) => {
      data.IMaterialOrderTopData = val
    }

    const Grouping = () => {
      if (data.selectDetail.length <= 0) {
       ElMessage.error('请选择产品')
       return false
      }
      for(let itm of data.selectDetail) {
        if(itm.ConfirmStatus == 1) {
          ElMessage.error('列表中包含已确认产品！')
          return false
        }
      }
      
      ManagementGroup.openWindowAdjustGrouping({selectDetail: data.selectDetail, Id: form.BillId})
    }

    // 调整分组
    const itemizedPriceOpen = (data: any) => {
      let itemizedPriceOpenData: any = reactive({
        visible: false,
        formData: {
          billId: 0,
          group: 0,
          GroupInfos: [],
          ConfirmStatus: 0,
          CustomerName: ''
        }
      })

      //打开弹窗
      const openWindowItemizedPrice = (val: any) => {
        itemizedPriceOpenData.formData = {
          billId: form.BillId,
          group: val.Group,
          GroupInfos: data.data.GroupInfos,
          CustomerName: data.data.CustomerName,
          ConfirmStatus: val.ConfirmStatus,
          GroupSubName: val.GroupSubName
        }
        itemizedPriceOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowItemizedPrice = (type: string) => {
        itemizedPriceOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        itemizedPriceOpenData,
        openWindowItemizedPrice,
        closeWindowItemizedPrice
      }
    }

    //供应商
    const purchaseScheduledSuppOpen = (data: any) => {
      let purchaseScheduledSuppOpenData: any = reactive({
        visible: false,
        formData: {
          billId: 0,
          group: 0,
          GroupInfos: [],
          ConfirmStatus: 0,
          CustomerName: ''
        }
      })

      //打开弹窗
      const openWindowPurchaseScheduledSupp = (val: any) => {
        purchaseScheduledSuppOpenData.formData = {
          billId: form.BillId,
          group: val.Group,
          GroupInfos: data.data.GroupInfos,
          CustomerName: data.data.CustomerName,
          ConfirmStatus: val.ConfirmStatus,
          GroupSubName: val.GroupSubName
        }
        purchaseScheduledSuppOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowPurchaseScheduledSupp = (type: string) => {
        purchaseScheduledSuppOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        purchaseScheduledSuppOpenData,
        openWindowPurchaseScheduledSupp,
        closeWindowPurchaseScheduledSupp
      }
    }

    onMounted(()=>{
      form.BillId = props.FormData.BillId
      data.CustomerName = props.FormData.CustomerName
      data.OnlyType = props.FormData.OnlyType
      MaterialOrderTopRef.value.getData(form.BillId)
      renderTableList(form, data)
      GetSearchInfo(form, data)
    })

    return {
      boxStyle,
      closeWindow,
      MaterialOrderTopRef,
      GetIMaterialOrderTopData,
      data,
      form,
      BasicClick,
      FromsParameter,
      ...tableRender(form, data),
      ...ManagementGroup,
      Grouping,
      ...itemizedPriceOpen({ data, getData }),
      ...purchaseScheduledSuppOpen({ data, getData })
    }
  }
})
</script>
<style lang="postcss" scoped></style>
