<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <!-- #region -->
    <div class="p-4">
      <div class="flex">
        <el-button type="primary" plain class="w-1/2" size="large" @click="inventory()"> <i class="iconfont icon-jiage mr-2"></i> 产品清单</el-button>
        <el-button type="success" plain class="w-1/2" size="large" @click="markup()"> <i class="iconfont icon-rili mr-2"></i> 历史报价</el-button>
      </div>
      <!-- #region 技术费用管理 技术加价管理-->
      <div class="flex mt-4">
        <div class="w-1/2 border rounded-md">
          <div class="h-10 bg-blue-500 rounded-t-md text-white p-2 pl-2 pr-2">
            <div class="float-left"><span class="text-sm">技术费用管理</span></div>
            <div class="float-right text-sm">
              <span>产品成本：</span>
              <span class="font-semibold">{{ data.AllProductPrice }}</span>
            </div>
          </div>
          <div class="h-12 border-b text-xs p-3" v-for="(item, index) in data.technologyList">
            <div class="float-left mr-2 ml-3">
              <el-tag>
                <span class="text-xs">{{ item.name }}</span>
              </el-tag>
            </div>
            <div class="float-left ml-10">
              <el-input style="width: 60px" type="number" size="small" v-model="formInfo[item.value]" placeholder="" />
              <span class="ml-2">%</span>
            </div>
            <div class="float-left ml-10 mt-1">
              <span>￥{{ getMoney(item.value) }}</span>
            </div>
          </div>
        </div>
        <div class="w-1/2 ml-3 rounded-md border">
          <div class="h-10 bg-green-500 rounded-t-md text-white p-2 pl-2 pr-2">
            <div class=""><span class="text-sm">技术加价管理</span></div>
          </div>
          <div class="w-80 h-14 border m-auto mt-3 rounded-md flex text-xs relative">
            <div class="w-20 h-5 bg-green-500 text-center absolute left-0 top-0 rounded-tl-md rounded-br-md"><span class="text-white leading-5">常规类</span></div>
            <div class="w-1/3 h-14 pt-8 pl-6">正常(1)</div>
            <div class="w-1/3 h-14 pt-6">0%</div>
            <div class="w-1/3 h-14 pt-6">￥0.0</div>
          </div>
          <div class="w-80 h-14 border m-auto mt-3 rounded-md flex text-xs relative">
            <div class="w-20 h-5 bg-green-500 text-center absolute left-0 top-0 rounded-tl-md rounded-br-md"><span class="text-white leading-5">非常规类</span></div>
            <div class="w-1/3 h-14 pt-8 pl-6">正常(1)</div>
            <div class="w-1/3 h-14 pt-6">0%</div>
            <div class="w-1/3 h-14 pt-6">￥0.0</div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
      <!--  -->
      <div class="w-700 h-40 border mt-4 rounded-md p-6 pt-3">
        <div>
          <div class="flex">
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-red-400 ring-4 ring-red-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-chengben text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> {{ data.AllAccountAdvancePrice }}</p>
                <p class="text-xs text-gray-400">核算成本(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-blue-400 ring-4 ring-blue-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-caigou text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> {{ data.AllTechAdvancePrice }}</p>
                <p class="text-xs text-gray-400">技术成本(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1">
              <div class="inline-block w-12 h-12 bg-yellow-400 ring-4 ring-yellow-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-dingdan4 text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> {{ data.AllProductPrice }}</p>
                <p class="text-xs text-gray-400">最低价(元)</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex mt-2">
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-green-400 ring-4 ring-green-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-qiandai text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 0.00</p>
                <p class="text-xs text-gray-400">销售价(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-pink-400 ring-4 ring-pink-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-jiage text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 0.00</p>
                <p class="text-xs text-gray-400">加价费(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1">
              <div class="inline-block w-12 h-12 bg-indigo-400 ring-4 ring-indigo-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-tuihui text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 0.00</p>
                <p class="text-xs text-gray-400">居间费(元)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="float-right pt-6 pb-4">
        <el-button @click="closeWindow">取消</el-button>
        <el-button type="primary" @click="submit">确定</el-button>
      </div>
      <!-- 产品清单 -->
      <Inventory ref="InventoryRef" :visible="data.inventory" @closeInventory="closeInventory" @submitInventory="submitInventory" />
      <!-- 历史报价 -->
      <HistoricalQuotationMarkupRecord :visible="data.drawer" :FormData="{EnquiryDataId: formInfo.EnquiryDataId}" @closeDrawer="closeDrawer" @SendCost="GetCost"/>
    </div>
    <!-- #endregion -->
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { PostEditProductAdvancePriceSave } from '/@/api/tech/EnquiryData'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import HistoricalQuotationMarkupRecord from './HistoricalQuotationMarkupRecord.vue'
import Inventory from './inventory.vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow,
    HistoricalQuotationMarkupRecord,
    Inventory
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        EnquiryDataId: 0,
        ProductList: []
      }
    }
  },
  setup(props, context: SetupContext) {
    const InventoryRef = ref<any>(null)
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-740',
      boxHeight: ''
    })
    const data = <any>reactive({
      technologyList: [
        { name: '包装费', value: 'PackRate' },
        { name: '加急费', value: 'UrgentRate' },
        { name: '安装费', value: 'InstallRate' }
      ],
      input: '',
      drawer: false,
      inventory: false,
      ProductList: [],
      DetailData: [],

      AllProductPrice: 0, //成本
      // AllMinimum: 0, //最低价
      BusinessCost: 145,
      AllAccountAdvancePrice: 0, // 核算成本
      AllTechAdvancePrice: 0 // 技术成本
    })

    const formInfo = <any>reactive({
      EnquiryDataId: 0, // 询价单id
      PackRate: 0, // 包装费比率
      UrgentRate: 0, // 加急比率
      InstallRate: 0,  // 安装比率
      ProductIds: [], // 产品ids
    })

    // 初始化数据,计算成本
    const SetProductList = (val: any) => {
      if(val.length > 0){
        let _ProductIds = <any>[]
        // let _AllCost = <number>0 // 产品成本
        // let _AllMinimum = <number>0 // 最低价
        // let _AllAccountAdvancePrice = <number>0 // 核算成本
        // let _TechAdvancePrice = <number>0 // 技术成本
        val.forEach((item:any) => {
          if(item.SupplierChange){
            _ProductIds.push(item.Id)
            // _AllCost = _AllCost + (Number(item.SupplierList.SupplierPrice || 0) * Number(item.Quantity))
            // _AllMinimum = _AllMinimum + (Number(item.SupplierList.SupplierPrice || 0) * Number(item.Quantity))
            // _AllAccountAdvancePrice = _AllAccountAdvancePrice + (Number(item.AccountAdvancePrice || 0) * Number(item.Quantity))
            // _TechAdvancePrice = _TechAdvancePrice + (Number(item.TechAdvancePrice || 0) * Number(item.Quantity))
          }
        })

        formInfo.ProductIds = _ProductIds
        // data.AllProductPrice = _AllCost.toFixed(2)
        // data.AllMinimum = _AllMinimum.toFixed(2)
        // data.AllAccountAdvancePrice = _AllAccountAdvancePrice.toFixed(2)
        // data.AllTechAdvancePrice = _TechAdvancePrice.toFixed(2)
      }
    }

    const getMoney = (val: any) => {
      return (data.AllProductPrice * formInfo[val] /100).toFixed(2)
    }

    const submit = () => {
      PostEditProductAdvancePriceSave(formInfo).then(res=>{
        if(res.code == 1){
          ElMessage.success(res.message)
          context.emit('closeWindow', 'submit')
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    // 历史报价加价
    const markup = () => {
      data.drawer = true
    }
    // 产品清单
    const inventory = () => {
      data.inventory = true
    }
    // 关闭抽屉 加价记录
    const closeDrawer = () => {
      data.drawer = false
    }
    // 获取最新成本值
    const GetCost = (value:any) => {
      // data.AllProductPrice = Number(value.AllCost).toFixed(2)
      // data.AllMinimum = Number(value.AllMinimum).toFixed(2)
      // data.AllAccountAdvancePrice = Number(value.AllAccountAdvancePrice).toFixed(2)
      // data.AllTechAdvancePrice = Number(value.AllTechAdvancePrice).toFixed(2)
      data.DetailData = value.DetailData
      formInfo.PackRate = Number(value.PackRate)
      formInfo.UrgentRate = Number(value.UrgentRate)
      formInfo.InstallRate = Number(value.InstallRate)

      // 清空所有产品选中状态
      let _ProductList = <any>data.ProductList
      _ProductList.forEach((item:any) => {
        item.SupplierChange = false
      })
      
      data.DetailData.forEach((item:any) => {
        let _idx = _ProductList.findIndex((row:any)=>{
          return row.Id == item.ProductId
        })
        _ProductList[_idx].SupplierChange = true
      })
      
      data.ProductList = _ProductList
      InventoryRef.value.SetProductList(_ProductList)
    }
    
    // 关闭抽屉 产品清单
    const closeInventory = () => {
      data.inventory = false
    }

    const submitInventory = (data:any) => {
      SetProductList(data)
    }

    onMounted(()=>{
      formInfo.EnquiryDataId = props.FormData.EnquiryDataId
      data.ProductList = props.FormData.ProductList
      data.AllProductPrice = props.FormData.AllProductPrice
      data.AllAccountAdvancePrice = props.FormData.AllAccountAdvancePrice
      data.AllTechAdvancePrice = props.FormData.AllTechAdvancePrice
      

      // 给产品清单列表赋值
      InventoryRef.value.SetProductList(data.ProductList)
      // 获取成本金额信息
      SetProductList(props.FormData.ProductList)
    })
    return {
      closeWindow,
      closeDrawer,
      closeInventory,
      submitInventory,
      boxStyle,
      formInfo,
      GetCost,
      data,
      markup,
      InventoryRef,
      inventory,
      getMoney,
      submit
    }
  }
})
</script>

<style lang="postcss" scoped></style>
