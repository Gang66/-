<template>
  <div>
    <CusDialog v-if="dialogVisible" :box-style="modelInfo.boxStyle" title="加价管理" :is-show="true" @closeWindow="closeWindow">
      <div class="raiseprice grid grid-rows-2 grid-cols-12 gap-4">
        <!-- 固定成本管理 -->
        <div class="col-span-3 rounded-xl border border-gray-300 overflow-hidden shadow bg-white">
          <div class="bg-blue-300 text-white text-sm rounded-br-xl w-36 h-7 font-bold text-center px-2 leading-7">固定成本管理</div>
          <div class="px-4 pb-3 text-sm">
            <div class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/3 text-right">税收:</div>
              <div class="w-1/3 text-center">{{formdata.info.Taxrate}}%</div>
              <div class="w-1/3">¥{{(formdata.info.Taxation).toFixed(1)}}</div>
            </div>
            <div class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/3 text-right">质保金:</div>
              <div class="w-1/3 text-center px-2">
                <el-select v-model="formdata.info.BondRate" @change="CompanyPrice" placeholder=" " size="small" style="text-align: center">
                  <el-option v-for="item in modelInfo.zbjoptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="w-1/3">¥{{(formdata.info.Bond||0).toFixed(1)}}</div>
            </div>
            <div class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/3 text-right">风险金:</div>
              <div class="w-1/3 text-center px-2">
                <el-select v-model="formdata.info.RiskFundRate" @change="CompanyPrice" placeholder=" " size="small" style="text-align: center">
                  <el-option v-for="item in modelInfo.fxoptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
              <div class="w-1/3">¥{{(formdata.info.RiskFund||0).toFixed(1)}}</div>
            </div>
            <div class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/3 text-right">运费:</div>
              <div class="w-1/3 text-center">{{formdata.info.FreightRate}}%</div>
              <div class="w-1/3">¥{{(formdata.info.Freight||0).toFixed(1)}}</div>
            </div>
            <div class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/3 text-right">团队提成:</div>
              <div class="w-1/3 text-center">{{formdata.info.PercentageRate}}%</div>
              <div class="w-1/3">¥{{(formdata.info.Percentage||0).toFixed(1)}}</div>
            </div>
          </div>
        </div>
        <!-- 金额统计 -->
        <div class="row-span-2 col-span-9 flex flex-col">
          <div class="border border-gray-300 rounded-xl overflow-hidden shadow flex items-center h-12 text-sm mb-2 bg-white">
            <div class="bg-blue-300 text-white w-24 text-center h-full flex flex-col items-center justify-center rounded-xl">金额统计</div>
            <div class="grid grid-cols-4 flex-1 text-center px-6">
              <div>
                <div>销售价：</div>
                <div>
                  ￥<span class="font-bold text-xl">{{(modelInfo.SalePrice||0).toFixed(modelInfo.Num)}}</span>
                </div>
              </div>

              <div>
                <div>最低价：</div>
                <div>
                  ￥<span class="font-bold text-xl">{{(modelInfo.SaleMinPrice||0).toFixed(modelInfo.Num)}}</span>
                </div>
              </div>

              <div>
                <div>加价费：</div>
                <div>
                  ￥<span class="font-bold text-xl">{{(formdata.info.MarkupFee||0).toFixed(modelInfo.Num)}}</span>
                </div>
              </div>

              <div>
                <div>居间费：</div>
                <div>
                  ￥<span class="font-bold text-xl">{{(formdata.info.Intermediator||0).toFixed(modelInfo.Num)}}</span>
                </div>
              </div>

            </div>
          </div>
          <div class="border border-gray-300 rounded-xl overflow-hidden shadow items-center text-sm bg-white px-4 py-2 flex-1">
            <div class="flex items-center w-full">
              <div class="bg-blue-500 w-20 text-center text-white h-8 leading-8 rounded-tl-md">产品明细</div>
              <div class="flex-1 bg-gradient-to-r from-blue-50 flex h-8 items-center justify-between">
                <div class="mx-3 text-red-600">*报价低于最低价标红且无法保存！</div>
                <div class="flex items-center">
                  <div class="mr-1">固定销售额：</div>
                  <div class="w-20">
                    <el-input v-model="formdata.info.FixedSalesPrice" @blur="CompanyFixedSalesPrice" size="small"></el-input>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="mr-1 bg-blue-500 text-white px-1 rounded-sm">小数位数</div>
                  <div class="w-24">
                    <el-select v-model="formdata.info.ComputeMode" @change="changeCompute" placeholder=" " size="small" style="text-align: center">
                      <el-option v-for="item in modelInfo.algorithm" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
                <div class="bg-blue-500 text-white px-1 rounded-sm" @click="changeProduct" style="cursor:pointer;">选择产品</div>
                <div class="bg-blue-500 text-white px-1 rounded-sm" @click="addLog" style="cursor:pointer;">加价记录</div>
              </div>
            </div>
            <el-table class="tableclass" :data="formdata.tableData" :cell-style="tableRowClassName" style="width: 100%; color: #000" border :header-cell-style="modelInfo.tableSty" max-height="450">
              <el-table-column label="序号" width="40" align="center">
                <template #default="scope">{{ scope.$index + 1 }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="产品名称" width="100" align="center" />
              <el-table-column label="型号规格" width="120" align="center">
                <template #default="scope">{{ (scope.row.Specifications||'')+" "+ (scope.row.Model||'')}}</template>
              </el-table-column>
              <el-table-column prop="Routine" label="类型" width="100" align="center" />
              <el-table-column prop="Unit" label="单位" width="40" align="center" />
              <el-table-column prop="Quantity" label="数量" width="40" align="center" />
              <el-table-column prop="Price" label="本次单价" width="100" align="center">
                <template #default="scope">
                  <el-input type="Number" @blur="CompanyRate" v-model="scope.row.Price" placeholder=""></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="SaleMinPrice" label="最低价" width="100" align="center" />
              <el-table-column prop="Amount" label="金额" width="100" align="center" />
              <el-table-column prop="Note" label="备注" align="center" />
            </el-table>
          </div>
        </div>
        <!-- 销售加价管理 -->
        <div class="col-span-3 rounded-xl border border-gray-300 overflow-hidden shadow bg-white">
          <div class="text-sm rounded-br-xl w-36 h-7 font-bold text-center leading-7" style="background: #c4edf2">销售加价管理</div>
          <div class="px-2 pb-3 text-sm">
            <div v-if="RoutineCount>0" class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/2 text-right">常规类（{{RoutineCount}}）:</div>
              <div class="w-1/3 text-center px-2">
                <el-input v-model="formdata.info.RoutineRate" @blur="CompanyPrice" placeholder=" " size="small" style="text-align: center"><template #append>%</template></el-input>
              </div>
              <div class="w-1/3">¥{{(formdata.info.RoutineFee||0).toFixed(1)}}</div>
            </div>
            <div v-if="UnRoutineCount>0" class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/2 text-right">非常规类（{{UnRoutineCount}}）:</div>
              <div class="w-1/3 text-center px-2">
                <el-input v-model="formdata.info.UnRoutineRate" @blur="CompanyPrice" placeholder=" " size="small" style="text-align: center"><template #append>%</template>
                </el-input>

              </div>
              <div class="w-1/3">¥{{(formdata.info.UnRoutineFee||0).toFixed(1)}}</div>
            </div>

            <div class="flex items-center justify-between h-10 border-b border-gray-300">
              <div class="w-1/2 text-right">居间费:</div>
              <div class="w-1/3 text-center px-2">
                <el-input v-model="formdata.info.IntermediatorRate" @blur="CompanyPrice" placeholder=" " size="small" style="text-align: center"><template #append>%</template>
                </el-input>
              </div>
              <div class="w-1/3">¥{{(formdata.info.Intermediator||0).toFixed(1)}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="text-center pt-6 pb-2">
        <el-button class="cancelbut" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="submit()">
          保存
        </el-button>
      </div>
    </CusDialog>

    <RaisePriceLog v-if="Raiselog.show" :DataId="Raiselog.dataId" :dialogVisible="Raiselog.show" @closeWindow="closelog" @getMarkUpinfo="getMarkUpinfo"></RaisePriceLog>
    <RaiseSelective ref="RaiseSelectiveRef" :dialogVisible="true" :List='formdata.OrderList' @changeOkProduct="changeOkProduct"></RaiseSelective>
  </div>
</template>

<script lang='ts' setup>
import { PostAddMarkUp, GetMarkUpById } from '/@/api/Sale/MarkUp'
import { PostOrderEntityList } from '/@/api/Sale/CustomerOder'
import { reactive, ref, onMounted, computed, watch, nextTick } from 'vue'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import RaisePriceLog from './RaisePriceLog.vue'
import RaiseSelective from './RaiseSelective.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { accMul, accAdd, accSub, accDiv, BlRoutineType } from '/@/utils/operation'
import { ElMessage } from 'element-plus'

const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是部门经理加价添加  2合同加价添加是修改 3是查看
  },
  IdList: {
    type: Array,
    default: []
  },
  DataId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})

const RaiseSelectiveRef: any = ref(null)
const Raiselog = ref({
  show: false,
  dataId: <any>0
})
const closelog = () => {
  Raiselog.value.show = false
}

const formdata = reactive({
  info: {
    OrderId: 0,
    ComputeMode: 1,
    FixedSalesPrice: <any>null,
    Taxrate: 0, //税率
    Taxation: <any>undefined, //税费
    BondRate: 0, //质保金比例
    Bond: <any>0, //质保金金额
    RiskFundRate: 0, //风险金比例
    RiskFund: <any>0, //风险金金额
    FreightRate: 0, //运费比例
    Freight: 0, //运费金额
    PercentageRate: 0, //提成比例
    Percentage: 0, //提成金额
    IntermediatorRate: 0, //居间费比例
    Intermediator: <any>0, //居间费金额
    RoutineRate: 0, //常规加价比例
    RoutineFee: <any>0, //常规加价金额
    UnRoutineRate: 0, //非常规加价比例
    UnRoutineFee: <any>0, //非常规加价金额
    MarkupFee: <any>0
  },
  OrderInfo: { Freight: 0 },
  tableData: <any>[],
  OrderList: <any>[],
  OrderIds: []
})

const modelInfo = reactive({
  Num: 0,
  CostPrice: 0, //成本总价
  SalePrice: 0, //销售总价
  SaleMinPrice: 0, //最低销售价
  show: false,
  boxStyle: {
    boxWidth: 'w-1200',
    boxHeight: '',
    boxPaddingTop: 'pt-12'
  },
  fxoptions: [
    { value: 0, label: '0%' },
    { value: 5, label: '5%' },
    { value: 10, label: '10%' },
    { value: 15, label: '15%' }
  ],
  zbjoptions: [
    { value: 10, label: '10%' },
    { value: 5, label: '5%' },
    { value: 0, label: '无质保金' }
  ],
  algorithm: [
    { value: 1, label: '取整' },
    { value: 2, label: '四舍五入' },
    { value: 3, label: '保留一位小数' },
    { value: 4, label: '保留两位小数' }
  ],
  tableSty: {
    background: '#E7F4FE',
    color: '#000',
    fontWeight: '400'
  }
})

//根据用户的选择设置数据精度
const changeCompute = () => {
  if (formdata.info.ComputeMode == 1 || formdata.info.ComputeMode == 2) {
    modelInfo.Num = 0
  } else if (formdata.info.ComputeMode == 3) {
    modelInfo.Num = 1
  } else {
    modelInfo.Num = 2
  }
}
//根据用户选择取数
const ReturnValue = (val: any) => {
  switch (formdata.info.ComputeMode) {
    case 1: //取整
      return Math.floor(Number(val || 0))
      break
    case 2: //四舍五入
      return Math.round(Number(val || 0))
      break
    case 3: //保留一位小数
      return (val || 0).toFixed(1)
      break
    case 4: //保留两位小数
      return (val || 0).toFixed(2)
      break
    default:
      break
  }
}

//常规类产品数量
const RoutineCount = computed(() => {
  var list = formdata.tableData.filter((f: any) => f.RoutineType == 0)
  return list.length
})

//非常规类产品
const UnRoutineCount = computed(() => {
  var list = formdata.tableData.filter((f: any) => f.RoutineType == 1)
  return list.length
})
//计算质保金
formdata.info.Bond = computed(() => {
  return accMul(formdata.info.BondRate / 100, modelInfo.CostPrice)
})
//计算风险金
formdata.info.RiskFund = computed(() => {
  return accMul(formdata.info.RiskFundRate / 100, modelInfo.SalePrice)
})
//计算税金
formdata.info.Taxation = computed(() => {
  return (modelInfo.SalePrice / (1 + formdata.info.Taxrate / 100)) * (formdata.info.Taxrate / 100)
})
//计算居间费
formdata.info.Intermediator = computed(() => {
  return modelInfo.CostPrice * (formdata.info.IntermediatorRate / 100)
})
//计算加价费
formdata.info.MarkupFee = computed(() => {
  return formdata.info.RoutineFee + formdata.info.UnRoutineFee
})
//计算常规加价费
formdata.info.RoutineFee = computed(() => {
  var routine = 0
  formdata.tableData.forEach((item: any) => {
    if (item.RoutineType == 0) {
      routine = accAdd(routine, accMul(accMul(item.CostPrice, formdata.info.RoutineRate / 100), item.Quantity))
    }
  })
  console.log('routine', routine)
  return routine
})
//计算常规加价费
formdata.info.UnRoutineFee = computed(() => {
  var routine = 0
  formdata.tableData.forEach((item: any) => {
    if (item.RoutineType == 1) {
      routine = accAdd(routine, accMul(accMul(item.CostPrice, formdata.info.UnRoutineRate / 100), item.Quantity))
    }
  })
  return routine
})

// 查看加价记录
const addLog = () => {
  Raiselog.value.show = true
  Raiselog.value.dataId = props.IdList[0]
}
// 选择产品
const changeProduct = () => {
  RaiseSelectiveRef.value.openWindow()
}

const changeOkProduct = (val: any) => {
  formdata.tableData = val
  console.log(val)
}

const tableRowClassName = ({ row, rowIndex }: { row: any; rowIndex: any }) => {
  if (Number(row.SaleMinPrice || 0) > Number(row.Price || 0)) {
    return { height: '2rem', padding: '3px', background: '#F38383' }
  }
  return { height: '2rem', padding: '3px' }
}

const openWindow = () => {
  modelInfo.show = true
}

const submit = () => {
  var list: any = []
  var bl = true
  formdata.tableData.forEach((item: any) => {
    if (Number(item.SaleMinPrice || 0) > Number(item.Price || 0)) {
      bl = false
    } else {
      var litem: any = {}
      litem.OrderEntityId = item.Id
      litem.Price = item.Price
      litem.SaleMinPrice = item.SaleMinPrice
      list.push(litem)
    }
  })
  if (!bl) {
    ElMessage.warning('产品销售价不能低于最低销售价')
    return false
  }

  let data: any = {}
  data = JSON.parse(JSON.stringify(formdata.info))
  data.SalePrice = modelInfo.SalePrice
  data.SaleMinPrice = modelInfo.SaleMinPrice
  data.MarkUpType = props.ViewType

  data.OrderIds = props.IdList.join(',')
  PostAddMarkUp({ bill: data, entity: list }).then((res) => {
    if (res.code == 1) {
      ElMessage.success('提交成功')
      if (props.ViewType == 2) {
        emit('GetOrderMarkUpInfoEven', res.data)
      }
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
}
//获取加价详情
const getMarkUpinfo = async (type: any, val: any = null) => {
  var ids = props.IdList

  if (val != null) {
    ids = val.OrderIds.split(',')
  }
  await getOrderEntityList(ids)

  var dataid = formdata.info.OrderId
  if (val != null) {
    dataid = val.Id
  }

  GetMarkUpById({ Type: type, DataId: dataid }).then((res) => {
    if (res.code == 1) {
      if (res.data) {
        var bill = res.data.bill
        formdata.info.ComputeMode = bill.ComputeMode
        formdata.info.FixedSalesPrice = bill.FixedSalesPrice
        formdata.info.Taxrate = bill.Taxrate
        formdata.info.BondRate = bill.BondRate
        formdata.info.RiskFundRate = bill.RiskFundRate
        formdata.info.FreightRate = bill.FreightRate
        formdata.info.PercentageRate = bill.PercentageRate
        formdata.info.IntermediatorRate = bill.IntermediatorRate
        formdata.info.RoutineRate = bill.RoutineRate
        formdata.info.UnRoutineRate = bill.UnRoutineRate
        changeCompute()
        var list = res.data.entity
        formdata.tableData.length = 0

        formdata.OrderList.forEach((item: any) => {
          var f = list.find((f: any) => f.OrderEntityId == item.Id)
          console.log('------------------f', f)
          if (f) {
            item.Price = f.Price
            item.SaleMinPrice = f.SaleMinPrice
            formdata.tableData.push(item)
          }
        })
      }
    }
  })
}

//获取报价单详情
const getOrderEntityList = async (val: any) => {
  var res = await PostOrderEntityList(val)
  if (res.code == 1) {
    formdata.tableData.length = 0
    formdata.OrderList.length = 0
    formdata.info.Taxrate = res.data.bill.Taxation
    formdata.info.OrderId = res.data.bill.Id
    res.data.entities.forEach((item: any) => {
      item.RoutineType = BlRoutineType(item.Routine)

      formdata.OrderList.push(item)
      formdata.tableData.push(item)
    })
  }
}

///计算销售价
const ComputeSalePrice = (costPrice: any, blRoutine: any) => {
  let perc = accAdd(1, formdata.info.BondRate / 100)
  perc = accAdd(perc, formdata.info.RiskFundRate / 100)
  perc = accAdd(perc, formdata.info.FreightRate / 100)
  perc = accAdd(perc, formdata.info.PercentageRate / 100)
  if (blRoutine) {
    perc = accAdd(perc, formdata.info.RoutineRate / 100)
  } else {
    perc = accAdd(perc, formdata.info.UnRoutineRate / 100)
  }

  let price = Number(accMul(accMul(costPrice, perc), accAdd(1, formdata.info.Taxrate / 100)).toFixed(1))
  return price
}
///计算最低成本价
const ComputeCostMinPrice = (costPrice: any) => {
  let perc = accAdd(1, formdata.info.BondRate / 100)
  perc = accAdd(perc, formdata.info.RiskFundRate / 100)
  perc = accAdd(perc, formdata.info.FreightRate / 100)
  perc = accAdd(perc, formdata.info.PercentageRate / 100)

  let price = Number(accMul(accMul(costPrice, perc), accAdd(1, formdata.info.Taxrate / 100)).toFixed(1))
  return price
}
//计算产品销售单价
const CompanyPrice = () => {
  formdata.tableData.forEach((item: any) => {
    item.Price = Number(ReturnValue(ComputeSalePrice(item.CostPrice, item.RoutineType == 0)))
  })
}
//固定销售额计算
const CompanyFixedSalesPrice = () => {
  if (!formdata.info.FixedSalesPrice) {
    return false
  }
  var rate = accDiv(accSub(formdata.info.FixedSalesPrice, modelInfo.SalePrice), modelInfo.SalePrice)

  formdata.tableData.forEach((item: any) => {
    item.Price = Number(ReturnValue(accMul(item.Price, accAdd(1, rate))))
  })
  CompanyRate()
}
const changeComputeMode = () => {
  CompanyRate()
}
//计算比例并反写
const CompanyRate = () => {
  let RoutineCost = 0
  let UnRoutineCost = 0

  let RoutinePrice = 0
  let UnRoutinePrice = 0

  formdata.tableData.forEach((item: any) => {
    if (item.RoutineType == 0) {
      RoutineCost = accAdd(RoutineCost, accMul(item.CostPrice, item.Quantity))
      RoutinePrice = accAdd(RoutinePrice, accMul(item.Quantity, accSub(item.Price, item.SaleMinPrice)))
    } else {
      UnRoutineCost = accAdd(UnRoutineCost, accMul(item.CostPrice, item.Quantity))
      UnRoutinePrice = accAdd(UnRoutinePrice, accMul(item.Quantity, accSub(item.Price, item.SaleMinPrice)))
    }
  })

  formdata.info.RoutineRate = Number((accDiv(RoutinePrice, RoutineCost) * 100).toFixed(2))
  formdata.info.UnRoutineRate = Number((accDiv(UnRoutinePrice, UnRoutineCost) * 100).toFixed(2))
}

const emit = defineEmits(['closeWindow', 'GetOrderMarkUpInfoEven'])

const closeWindow = () => {
  emit('closeWindow')
}

defineExpose({
  openWindow
})
watch(formdata, (val) => {
  console.log('*************************************', val)
  if (formdata.tableData != null && formdata.tableData.length > 0) {
    let CostPrice = 0
    let SalePrice = 0
    formdata.tableData.forEach((item: any) => {
      item.Amount = accMul(item.Price, item.Quantity)
      CostPrice = accAdd(CostPrice, accMul(item.CostPrice, item.Quantity))
      SalePrice = accAdd(SalePrice, item.Amount)
    })

    ///根据成本价设置运费比例
    if (formdata.OrderInfo.Freight == 2) {
      formdata.info.FreightRate = 0
    } else if (CostPrice < 5000) {
      formdata.info.FreightRate = 10
    } else if (CostPrice < 10000) {
      formdata.info.FreightRate = 6
    } else if (CostPrice < 50000) {
      formdata.info.FreightRate = 5
    } else if (CostPrice < 500000) {
      formdata.info.FreightRate = 4
    } else {
      formdata.info.FreightRate = 3
    }

    if (CostPrice > 0) {
      //计算运费  运费=（成本价*运费比例）
      formdata.info.Freight = accMul(CostPrice, formdata.info.FreightRate / 100)
    } else {
      formdata.info.Freight = 0
    }

    //计算最低销售价
    let SaleMinPrice = 0
    formdata.tableData.forEach((item: any) => {
      item.SaleMinPrice = Number(ReturnValue(ComputeCostMinPrice(item.CostPrice)))
      SaleMinPrice = accAdd(SaleMinPrice, accMul(item.SaleMinPrice, item.Quantity))
    })

    //第一次加载计算产品价格
    if (modelInfo.CostPrice == 0) {
      formdata.info.PercentageRate = 3
      CompanyPrice()
    } else {
      //根据销售价和最低销售价设置提成比例
      if (SalePrice >= SaleMinPrice) {
        formdata.info.PercentageRate = 3
      } else {
        //低于最低销售价百分之90只有百分之15的提成
        if (SalePrice < SaleMinPrice * 0.9) {
          formdata.info.PercentageRate = 1.5
        } else {
          formdata.info.PercentageRate = 2
        }
      }
    }

    if (CostPrice > 0) {
      //计算提成  提成=（成本价*提成比例）
      formdata.info.Percentage = accMul(CostPrice, formdata.info.PercentageRate / 100)
    } else {
      formdata.info.Percentage = 0
    }

    modelInfo.CostPrice = Number(ReturnValue(CostPrice))
    modelInfo.SalePrice = Number(ReturnValue(SalePrice))
    modelInfo.SaleMinPrice = Number(ReturnValue(SaleMinPrice))
  }
})

onMounted(() => {
  if (props.ViewType == 1 || props.ViewType == 2) {
    getMarkUpinfo(1)
  }
})
</script>
<style lang="postcss" scoped>
.raiseprice {
  :deep(.el-input--small .el-input__wrapper) {
    padding: 1px;
  }
  :deep(.el-input-group__append) {
    padding: 0 3px;
  }
  .tableclass {
    :deep(.el-input__wrapper) {
      .el-input__inner {
        text-align: center;
      }
      padding: 1px 1px;
      box-shadow: 0 0 0 1px #ffffff inset;
    }
  }
}
:deep(.el-select .el-input__inner) {
  text-align: right;
}
:deep(.el-input--small .el-input__inner) {
  text-align: center;
}
:deep(.el-input__suffix-inner > :first-child) {
  margin: 0;
}
:deep(.el-table .cell) {
  padding: 0;
}
.el-table .warning-row {
  --el-table-tr-bg-color: var(--el-color-warning-light-9);
}
</style>