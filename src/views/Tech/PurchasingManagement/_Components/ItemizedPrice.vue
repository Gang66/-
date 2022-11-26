<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="edit-sales-contract-open-window">
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
    <div class="clearfix p-4 pb-0">
      <div class="float-left">
        <!-- 分组红色是显示 -->
        <el-button type="primary" :disabled="data.singles" size="large" @click="openWindowSupplierLibrary(data.billId, data.selectDetails, 1)"> <i class="iconfont icon-jiage mr-2"></i> 选择供应商</el-button>
      </div>
      <div class="float-right mt-2"><span class="text-sm text-gray-400">温馨提醒：支持多家供应商价格对比，参与比价的供应商不得少于三家，货比三家：比质、比价、比服务，同时比较供货及时性！</span></div>
    </div>
    <div class="pt-0 p-4" style="max-height: 600px">
      <!-- bf-table-content -->
      <div class="pt-4 pb-16">
        <!-- @selection-change="handleSelectionChange" -->
        <el-table :data="data.MaterialList" stripe border>
          <el-table-column type="index" label="序号" width="54" align="center" fixed />
          <el-table-column prop="TypeInfo" label="属性" align="center" width="80" fixed>
            <template #default="scope">
              <span v-if="scope.row.MaterialInfo.TypeInfo == 1">独立件</span>
              <span v-else-if="scope.row.MaterialInfo.TypeInfo == 2">组合件</span>
              <span v-else>-</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" min-width="400" fixed>
            <template #header>
              <span class="text-xs">产品参数 </span>
              <div class="absolute h-10 z-50 right-5 top-6 text-xs"><span class="mr-3">隐藏参数</span><span class="text-blue-500 cursor-pointer" @click="copyText()">复制</span></div>
            </template>

            <template #default="scope">
              <div>
                <span class="font-semibold text-xs">{{ scope.row.MaterialInfo.SystemName }} {{ scope.row.MaterialInfo.SystemModel }} {{ scope.row.MaterialInfo.SystemSpecification }} {{ scope.row.MaterialInfo.RoutineType }}</span>
                <el-tag class="float-right" effect="plain" size="small">{{ scope.row.MaterialInfo.TypeInfo == 1 ? '阀体' : scope.row.MaterialInfo.TypeInfo == 2 ? '配件' : '产品' }}</el-tag>
                <p class="text-xs text-blue-500"><span class="text-red-500">
                  【{{ scope.row.MaterialInfo.QualityLevel == 1 ? '一级' : scope.row.MaterialInfo.QualityLevel == 2 ? '二级' : scope.row.MaterialInfo.QualityLevel == 3 ? '三级' : '--'}}】</span>
                  【规格：{{ scope.row.MaterialInfo.SystemSpecification  }}】
                  【压力：{{  scope.row.MaterialInfo.Pressure }}】
                  【材质：{{ scope.row.MaterialInfo.Materials }}】</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="数量" align="center" width="60">
            <template #default="scope">
              <div>
                <span>{{ scope.row.MaterialInfo.Quantity }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="售价" align="center" width="60">
            <template #default="scope">
              <span>{{ scope.row.MaterialInfo.Amount }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" label="历史" align="center" width="60">
            <template #default="scope">
              <div @click="data.priceComparison = true">
                <span class="text-blue-500 cursor-pointer">7</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="CreateOn" align="center" width="130" v-for="(item, index) in getSupplierList" :key="index">
            <template #header>
              <!-- grayscale -->
              <img v-if="item.DiscountAmount > 0" src="../../../../assets/img/tech/inquiry/discount.png" class="w-10 h-10 absolute right-0 top-0 cursor-pointer" alt="" @click="openWindowDiscountPrice(item,index)" />
              <img v-else src="../../../../assets/img/tech/inquiry/discount.png" class="w-10 h-10 absolute right-0 top-0 cursor-pointer grayscale" alt="" @click="openWindowDiscountPrice(item,index)" />
              <!-- <div class="w-8 h-4 text-xs bg-blue-400 text-center absolute left-0 top-0 cursor-pointer text-white font-light" @click="openWindowSupplyCycle(item, index)">
                周期
              </div> -->
              <el-tooltip class="box-item" effect="dark" placement="bottom-end">
                <div class="text-blue-500"><span class="text-xs">{{ (item.Supplierinfo.Abbreviation) || '' }}</span><i class="iconfont icon-name"></i></div>
                <template #content>
                  <div class="p-2">
                    <span><i class="iconfont icon-xueyuan"></i> {{ (item.Supplierinfo.Abbreviation) || '' }}</span>
                    <span class="text-xs text-yellow-500 float-right ml-16 pt-1 cursor-pointer">移除</span>
                    <p class="text-xs mt-2">联系人：{{ (item.User.Name) || '' }} ( {{ (item.User.MobilePhone) || '' }} )</p>
                    <p class="text-xs mt-2">主营：{{ (item.Supplierinfo.MainProduct) || '-' }}</p>
                  </div>
                </template>
              </el-tooltip>
              <div>
                <div
                class="w-4 h-4 border rounded-full inline-block text-xs mr-1 cursor-pointer"
                :class="{ active: item.CheckedIndex == idx }"
                @click="huanName(index,idx)"
                v-for="(row, idx) in item.Price"
                :key="idx"
                :style="{ border: item.ChangeCurrIndex == idx ? '1px solid rgb(80, 148, 83)' : row.Price > 0 ? '1px solid #d04d24' : '1px solid #909399',
                color: item.ChangeCurrIndex == idx ? 'rgb(80, 148, 83)' : row.Price > 0 ? ' #d04d24' : '#909399' }"
                >
                  {{ idx + 1 }}
                  <div class="w-4 h-1 bg-slate-200" :class="{ current: item.CheckedIndex == idx }"></div>
                </div>
              </div>
            </template>
            <template #default="scope">
              <div class="text-center">
                <div v-for="(row,idx) in item.Price" :key="idx" v-show="idx == item.CheckedIndex">
                  <el-input v-model="scope.row.Supplier[index].Price[idx].Price" style="width: 50px" size="small" placeholder="输入内容" />
                  <span class="text-red-500 text-xs">/{{ scope.row.Supplier[index].Price[idx].Ratio }}</span>
                </div>
                <p class="text-xs text-blue-500 cursor-pointer mt-2" @click="openWindowSupplierSpecialAttributes()">备注</p>
                <el-popover placement="top-start" trigger="click">
                  <template #reference>
                    <i class="iconfont icon-shijian absolute left-2 bottom-1 cursor-pointer text-gray-300"></i>
                  </template>
                  <p class="text-xs flex" v-for="(row,idx) in item.Price" :key="idx"><span>1、￥{{ scope.row.Supplier[index].Price[idx].Price }} </span><span class="ml-1 text-red-500">{{ scope.row.Supplier[index].Price[idx].Ratio }}</span></p>
                </el-popover>
              </div>
            </template>
          </el-table-column>
          <!--  #region 分组数量 绿色显示 -->
          <!-- <el-table-column prop="CreateOn" label="供应周期" align="center" width="120" fixed="right">
            <template #default="scope">
              <span class="text-blue-500 cursor-pointer" @click="openWindowSupplyCycle(scope.row, scope.$index)">选择</span>
            </template>
          </el-table-column> -->
          <!-- #endregion -->
        </el-table>
      </div>
    </div>
    <div class="w-full h-12 bg-white absolute bottom-0 pt-2 pl-4 pr-4 shadow-2xl z-30">
      <!-- #region 分组数量 红色显示 -->
      <div class="float-right">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="warning" @click="Submit('')" v-if="data.ConfirmStatus != 2">暂存</el-button>
        <el-button type="primary" @click="Submit('confirm')" v-if="data.ConfirmStatus != 2">确认提交</el-button>
      </div>
      <!-- #endregion -->

      <!-- #region 分组数量 绿色显示 -->
      <!-- <div class="float-right">
        <el-button>取消</el-button>
        <el-button type="danger">撤销确认</el-button>
      </div> -->
      <!-- #endregion -->
      <!-- 选择供应商周期 -->
      <SupplyCycle title="请预估供应商周期" @SendSupplyTime="SendSupplyTime" v-if="supplyCycleOpenData.visible" :FormData="supplyCycleOpenData.formData" @closeWindow="closeWindowSupplyCycle($event)" />
      <!-- 折扣价 -->
      <DiscountPrice title="采购分项设值" v-if="discountPriceOpenData.visible" :FormData="discountPriceOpenData.formData" @closeWindow="closeWindowdiscountPrice($event)" @SendDiscount="GetDiscount"/>
      <!-- 标准比价 -->
      <StandardPriceComparison v-model="data.priceComparison" />
      <!-- 供应商特殊属性 -->
      <SupplierSpecialAttributes title="供应商特殊属性" v-if="supplierSpecialAttributesOpenData.visible" :FormData="supplierSpecialAttributesOpenData.formData" @closeWindow="closeWindowSupplierSpecialAttributes($event)" />
    </div>
    <!-- 选择供应商 -->
    <SupplierLibrary
    title="供应商库"
    v-if="supplierLibraryOpenData.visible"
    :FormData="supplierLibraryOpenData.formData"
    @supplierLibrarySubmit="supplierLibrarySubmit"
    @closeWindow="closeWindowSupplierLibrary($event)"
    :SupplierList="getSupplierList"
    />
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted, computed } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { toChies } from '/@/utils/tools'
import TableSearch from '/@/components/TableSearch/index.vue'
import SupplyCycle from './SupplyCycle.vue'
import DiscountPrice from './DiscountPrice.vue'
import StandardPriceComparison from '../../SupplierManagement/_Components/StandardPriceComparison.vue'
import SupplierSpecialAttributes from '../../AccountingProcessing/_Components/SupplierSpecialAttributes.vue'
import SupplierLibrary from '../../AccountingProcessing/_Components/SupplierLibrary.vue'
import { supplierLibraryOpen } from '/@/assets/ts/techOpenWindow'
import { GetMaterialComparePricesListPage, PostInsertEditMaterialSupplierPriceSave } from '/@/api/tech/Material'
import { copyDomText } from '/@/utils/tools'
import { ElMessage } from 'element-plus'

// 列表数据请求
const renderTableList = async (data: any) => {
  let _form = {
    billId: data.billId,
    group: data.group
  }
  await GetMaterialComparePricesListPage(_form).then((res) => {
    if (res.code == 1) {
      let _MaterialList = <any>[]
      res.data.forEach((item:any, index:any) => {
        data.selectDetails.push(item.MaterialInfo.Id)
        _MaterialList.push({
          MaterialBillRate: item.MaterialBillRate,
          MaterialInfo: item.MaterialInfo,
          Supplier: [],
        })
        if (item.Supplier.length >= 0) {
          item.Supplier.forEach((row: any) => {
            let _DetailJson = JSON.parse(row.Price.DetailJson || '')
            console.log(_DetailJson)
            let tempRow = <any>{ 
              User: row.User,
              Supplierinfo: row.SupplierInfo,
              Price: [],
              CheckedIndex: _DetailJson.CurrIndex,
              AllSellingPrice: 0,
              AllPurchasePrice: [],
              DiscountAmount: row.Price.DiscountAmount,
              SupplyTime: row.Price.SupplyTime,
              ChangeCurrIndex: _DetailJson.CurrIndex
            }
            for (let i = 0; i<5; i++){
              tempRow.Price.push({
                Price: _DetailJson.PriceList[i],
                Ratio: _DetailJson.PriceList[i] > 0 ? (Number(item.MaterialInfo.Amount) / Number(row.Price) * Number(item.MaterialBillRate)).toFixed(2) : 0
              })
            }
            _MaterialList[index].Supplier.push(tempRow)
          })
        }
      })
      data.MaterialList = _MaterialList
    }
  })
}

export default defineComponent({
  components: {
    OpenWindow,
    InfoFilled,
    TableSearch,
    SupplyCycle,
    DiscountPrice,
    StandardPriceComparison,
    SupplierSpecialAttributes,
    SupplierLibrary
  },
  props: {
    FormData: {
      type: Object,
      default: {
        billId: 0,
        group: 0,
        GroupInfos: [],
        CustomerName: '',
        ConfirmStatus: '', // 审核状态
        GroupSubName: ''
      }
    }
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    const data = reactive({
      Supplier: [{ val: 1 }], //供应商
      PriceInput: '',
      supplierPriceInput: '',
      number: 0,
      currentNumber: 1,
      priceComparison: false,

      billId: 0,
      group: 0,
      GroupInfos: <any>[],
      CustomerName: '',
      ConfirmStatus: '',
      GroupSubName: '',
      MaterialList: <any>[],
      selectDetails: [] // 所有产品id
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

    //复制文本
    const copyText = () => {
      let text = <any>''
      data.MaterialList.forEach((item: any, i: any) => {
        text = text + `${item.MaterialInfo.SystemName} ${item.MaterialInfo.SystemModel} ${item.MaterialInfo.SystemSpecification}  ${item.MaterialInfo.RoutineType}\n 【${ item.MaterialInfo.QualityLevel == 1 ? '一级' : item.MaterialInfo.QualityLevel == 2 ? '二级' : item.MaterialInfo.QualityLevel == 3 ? '三级' : '--'}】【规格：${item.MaterialInfo.SystemSpecification}】【压力：${item.MaterialInfo.Pressure}】【材质：${item.MaterialInfo.Materials}】${i == data.MaterialList.length ? '' : '\n'}`
      })
      copyDomText(text)
    }

    //选择分组项
    const handleCommand = (command: number) => {
      let _index = data.GroupInfos.findIndex((item:any) => { return item.Group == command })
      data.GroupSubName = data.GroupInfos[_index].GroupSubName
      data.group = command
      renderTableList(data)
    }
    // 名称切换
    const huanName = (index: any, idx: any) => {
      data.MaterialList.forEach((item: any) => {
        item['Supplier'][index].CheckedIndex = idx
      })
    }

    // 提交
    const Submit = (_Action: any) => {
      try {
        let _SubmitData = <any>{
          BillId: data.billId,
          Group: data.group,
          Action: _Action,
          MaterialSupplierPriceList: []
        }
        data.MaterialList.forEach((item:any) => {
          if (item.Supplier.length < 3) {
            throw new Error("参加比价供应商不得小于三家");
          }

          let _data = <any>{
            MaterialId: item.MaterialInfo.Id,
            SupplierPrices: []
          }
          item.Supplier.forEach((row: any) => {
            // if (row.DiscountAmount <= 0) {
            //   throw new Error("请输入折扣");
            // }
            if (row.Price[row.CheckedIndex].Price <= 0) {
              throw new Error("请填写完整供应商价格");
            }
            let _SupplierPrices = <any>{
              SupplierId: row.Supplierinfo.Id,
              SupplyTime: Number(row.SupplyTime),
              DiscountAmount: Number(row.DiscountAmount),
              PriceInfo: {
                PriceList: [],
                CurrIndex: row.CheckedIndex
              }
            }
            row.Price.forEach((t:any) => {
              _SupplierPrices.PriceInfo.PriceList.push(Number(t.Price))
            })
            _data.SupplierPrices.push(_SupplierPrices)
          })
          _SubmitData.MaterialSupplierPriceList.push(_data)
        });

        PostInsertEditMaterialSupplierPriceSave(_SubmitData).then(res => {
          res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
          if(res.code == 1) {
            closeWindow('submit')
          }
        })
        // throw new Error("EndIterative");
      } catch (error:any) {
        ElMessage.error(error.message)
      }
    }

    //#region 供应商操作
    // 添加供应商 val：选择供应商列表
    const supplierLibrarySubmit = (val: any) => {
      data.MaterialList.forEach((item:any) => {
        if(!item.Supplier)
        item.Supplier=[]
        val.forEach((row: any, i: number) => {
          let tempRow = <any>{ 
            User: { Name: row.MainContact, MobilePhone: row.MobilePhone },
            Supplierinfo: { Id: row.Id, Abbreviation: row.Abbreviation },
            Price: [],
            CheckedIndex: 0,
            AllSellingPrice: 0,
            AllPurchasePrice: [],
            DiscountAmount: 0,
            SupplyTime: 0,
          }
          for (let i = 0; i<5 ;i++) {
            tempRow.Price.push({ Price: 0, Ratio: 0 })
          }
          // 供应商去重
          if(item.Supplier.findIndex((x:any) => x.Supplierinfo.Id == row.Id) == -1){
            // 最多5个供应商
            if(item.Supplier.length < 5){
              item.Supplier.push(tempRow)
            }
          }
        })
      })
    }

    // 删除供应商
    const deleteLibrarySubmit = (val: any, idx: number) => {
      data.MaterialList.forEach((item:any,index:any) => {
        data.MaterialList[index].Supplier.splice(idx, 1)
      })
      ElMessage.success('删除成功')
    }
    //#endregion
    //获取供应商
    const getSupplierList = computed(()=>{
      let _supplierList=<any>[]
      let _AllSellingPrice = <any>0 // 合计售价
      let _AllPurchasePrice = <any>[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]] // 合计采购价
      data.MaterialList.forEach((item: any, index:any)=> {
        item.Supplier.forEach((e: any, i:any) => {
          e.Price.forEach((row: any, idx: any) => {
            // 合计采购价
            _AllPurchasePrice[i][idx] = Number(_AllPurchasePrice[i][idx]) + (Number(row.Price) * Number(item.MaterialInfo.Quantity))
            // 价格旁边的比率
            if (row.Price > 0) {
              row.Ratio = (Number(item.MaterialInfo.Amount) / Number(row.Price) * Number(item.MaterialBillRate)).toFixed(2)
            } else {
              row.Ratio = 0
            }
          })
        })
        // 合计售价
        _AllSellingPrice = Number(_AllSellingPrice) + (Number(item.MaterialInfo.Amount) * Number(item.MaterialInfo.Quantity))
      })

      data.MaterialList.forEach((item:any, index:any) => {
        item.Supplier.forEach((e:any,idx:any) => {
          e.AllSellingPrice = _AllSellingPrice
          e.AllPurchasePrice = _AllPurchasePrice[idx]
          if(index==0){
            _supplierList.push(e)
          }
        })
      })
      console.log(data.MaterialList)
      return _supplierList
    })

    // 预估供应商周期
    const supplyCycleOpen = (data: any) => {
      let supplyCycleOpenData: any = reactive({
        visible: false,
        formData: {
          SupplyTime: 0,
          RowIndex: 0
        }
      })

      //打开弹窗
      const openWindowSupplyCycle = (val: any, index: any) => {
        supplyCycleOpenData.formData = {
          RowIndex: index,
          SupplyTime: val.SupplyTime
        }
        supplyCycleOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowSupplyCycle = () => {
        supplyCycleOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      const SendSupplyTime = (val: any, index: any) => {
        data.data.MaterialList.forEach((item:any) => {
          item.Supplier[index].SupplyTime = val
        })
      }

      return {
        supplyCycleOpenData,
        SendSupplyTime,
        openWindowSupplyCycle,
        closeWindowSupplyCycle
      }
    }
    // 折扣价
    const discountPriceOpen = (data: any) => {
      let discountPriceOpenData: any = reactive({
        visible: false,
        formData: {
          AllSellingPrice: 0,
          AllPurchasePrice: 0,
          DiscountAmount: 0,
          RowIndex: 0,
          CheckedIndex: 0,
          SupplyTime: 0
        }
      })

      //打开弹窗
      const openWindowDiscountPrice = (val: any,index: any) => {
        discountPriceOpenData.formData = {
          SupplyTime: val.SupplyTime,
          AllSellingPrice: val.AllSellingPrice,
          AllPurchasePrice: val.AllPurchasePrice[val.CheckedIndex],
          DiscountAmount: val.DiscountAmount || 0,
          RowIndex: index,
          CheckedIndex: val.CheckedIndex,
        }
        discountPriceOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowdiscountPrice = (type: string) => {
        discountPriceOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      const GetDiscount = (_data:any) => {
        let {RowIndex, DiscountAmount, SupplyTime } = _data
        data.data.MaterialList.forEach((item:any) => {
          item.Supplier[RowIndex]['DiscountAmount'] = DiscountAmount
          item.Supplier[RowIndex]['SupplyTime'] = SupplyTime
        })
      }

      return {
        discountPriceOpenData,
        openWindowDiscountPrice,
        closeWindowdiscountPrice,
        GetDiscount
      }
    }
    // 供应商特殊属性
    const supplierSpecialAttributesOpen = (data: any) => {
      let supplierSpecialAttributesOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowSupplierSpecialAttributes = (val: any) => {
        supplierSpecialAttributesOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        supplierSpecialAttributesOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowSupplierSpecialAttributes = (type: string) => {
        supplierSpecialAttributesOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        supplierSpecialAttributesOpenData,
        openWindowSupplierSpecialAttributes,
        closeWindowSupplierSpecialAttributes
      }
    }
    onMounted(() => {
      data.billId = props.FormData.billId
      data.group = props.FormData.group
      data.GroupInfos = props.FormData.GroupInfos
      data.GroupSubName = props.FormData.GroupSubName
      data.CustomerName = props.FormData.CustomerName
      data.ConfirmStatus = props.FormData.ConfirmStatus

      renderTableList(data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      copyDomText,
      toChies,
      handleCommand,
      huanName,
      copyText,
      Submit,
      getSupplierList,
      supplierLibrarySubmit,
      deleteLibrarySubmit,
      ...supplyCycleOpen({ data }),
      ...discountPriceOpen({ data }),
      ...supplierSpecialAttributesOpen({ data }),
      ...supplierLibraryOpen({ data })
    }
  }
})
</script>
<style lang="postcss" scoped>
.EditSalesContract_header {
  background-color: var(--7ba5bd90-themeStyle_sidebarBg) !important;
  color: #ffffff;
  :deep(.el-dropdown) {
    padding-top: 2px !important;
  }
  :deep(.el-popover.el-popper) {
    width: auto !important;
  }
}
.active {
  background: #9fd14e;
}
.current {
  background: red;
}
:deep(.max-w-screen-xl) {
  max-width: 1600px !important;
}
</style>
