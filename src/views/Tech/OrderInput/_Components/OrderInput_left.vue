<template>
  <div class="tech_order_input_left">
    <div class="clearfix pt-4 pb-4 pl-5 pr-5">
      <div class="float-left">
        <el-button> <i class="iconfont icon-daoru mr-1"></i> 导入数据</el-button>
        <el-button><i class="iconfont icon-daochu mr-1"></i> 导出数据</el-button>
      </div>
      <div class="float-right">
        <el-button type="primary" @click="orderDataSave"><i class="iconfont icon-baocun mr-1"></i> 保存</el-button>
        <el-button type="warning" @click="orderToTreatmSave"> <i class="iconfont icon-beizhu mr-1"></i>技术处理</el-button>
        <el-button type="danger" @click="getValveInfo"> <i class="iconfont icon-shujuku mr-1"></i>解析型号</el-button>
        <!-- <el-button type="info"> <i class="iconfont icon-dingdan mr-1"></i>表单设计</el-button> -->
        <el-button type="success"> <i class="iconfont icon-goutong mr-1"></i>沟通记录</el-button>
      </div>
    </div>
    <div class="hot-table-box pt-0 p-5 color">
      <hot-table :settings="hotSettings" ref="hotTableComponent" />
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent, onMounted } from 'vue'
import { useRouter, Router } from 'vue-router'
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import 'handsontable/languages/zh-CN' //中文包
import 'handsontable/dist/handsontable.full.css'
import { useTechStore } from '/@/store/modules/techStore'
import { postGBValveModelBatchAnalysis } from '/@/api/tech/ProductFormula'
import { GetProductEntryExcelList, PostEditProductEntryExcelSave } from '/@/api/tech/ProductBasics'
import { GetSetEnquiryOrderTreatmSave } from '/@/api/tech/EnquiryData'
import { ElMessage, ElMessageBox } from 'element-plus'
registerAllModules()

const defaultList = [
  {
    Id: '',
    EnquiryDataId: '',
    DriveWay: '',
    ConnectioneWay: '',
    StructureShape: '',
    SealingSurface: '',

    ClientName: '',
    ClientModel: '',
    SystemName: '',
    SystemModel: '',
    SystemSpecification: '',
    Materials: '',
    Pressure: '',
    UnitInfo: '',
    Quantity: '',
    Remark: ''
  }
]

//订单转入技术处理
const orderToTreatm = (id: number, router: Router) => {
  ElMessageBox.confirm('确定要转入技术处理吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(async () => {
      await GetSetEnquiryOrderTreatmSave(id)
        .then(res => {
          if (res.code == 1) {
            ElMessage.success(res.message)

            // 跳转到技术处理

            router.push({
              name: 'TechCustomerDemandIndex'
            })
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch(e => {
          console.log(`GetSetEnquiryOrderTreatmSave${e}`)
        })
    })
    .catch(() => {
      ElMessage.info('已取消')
    })
}

// 加载数据
const loadData = async (data: any) => {
  //先清空数据
  data.hotTableComponent.value.hotInstance.updateData([])
  let _defaultList = JSON.parse(JSON.stringify(defaultList))

  if (data.data.CurrEnquiryId > 0) {
    await GetProductEntryExcelList(data.data.CurrEnquiryId)
      .then(res => {
        if (res.code == 1) {
          var _list = res.data || _defaultList
          if (_list.length == 0) {
            // 确保数据列的完整性
            _list.push(_defaultList[0])
          }

          // 设置表格
          data.hotTableComponent.value.hotInstance.updateSettings({
            cell: []
          })
          // 更新表格数据（两次赋值要有时间间隔，否则数据会有缓存显示之前的数据）
          data.hotTableComponent.value.hotInstance.updateData(_list)
        } else {
          ElMessage.error(res.message)
        }
      })
      .catch(e => {
        console.log(`GetProductEntryExcelList${e}`)
      })
  }
}

//获取表格里面的有效数据
const getHotTableData = (hotTable: any) => {
  let list = hotTable.hotInstance.getSourceData()
  let tableDataList = []

  for (let index = 0; index < list.length; index++) {
    if (!hotTable.hotInstance.isEmptyRow(index)) {
      // 存在数据的行
      const _row = list[index]

      tableDataList.push(_row)
    }
  }

  return tableDataList
}

//解析型号赋值表单
const setHotTableData = (data: any) => {
  let listData: any = []
  if (data && data.list) {
    //先清空下拉选项设置
    if (data.hotSettings && data.hotSettings.cell) data.hotSettings.cell = []

    //组装标题
    data.list.forEach((item: any, index: number) => {
      //组装表头下拉框
      data.hotSettings.columns.forEach((jtem: any, jndex: number) => {
        if (jtem.data == 'SystemName') {
          //系统名称
          if (item.Name.length > 1) {
            data.hotSettings.cell.push({ row: index, col: jndex, source: item.Name })
          } else {
            // 取消下拉按钮
            data.hotSettings.cell.push({ row: index, col: jndex, source: item.Name, className: 'cell-not-drop-down' })
          }
        } else if (jtem.data == 'SystemModel') {
          // 系统型号 解析失败颜色变红
          if (!item.IsAnalysis) data.hotSettings.cell.push({ row: index, col: jndex, className: 'text-red-600' })
        }
      })

      let entity = data.tableDataList[index]

      if (item.IsAnalysis) {
        // 解析成功
        if (item.Name.length == 1) {
          entity.SystemName = item.Name[0]
        } else {
          //没有系统解析的名称，则清空
          if (item.Name.indexOf(entity.SystemName) == -1) {
            entity.SystemName = ''
          }
        }

        entity.SystemModel = item.Model //型号
        entity.Materials = item.Material //材质
        entity.Pressure = item.Pressure //压力
        entity.DriveWay = item.Driving //驱动方式
        entity.ConnectioneWay = item.Connection //连接方式
        entity.StructureShape = item.Structural //结构形式
        entity.SealingSurface = item.Sealing //密封面
        if (item.Specifications.length > 0) entity.SystemSpecification = item.Specifications[0] //规格（按照解析的规格）
      } else {
        // 解析失败
        if (item.Specifications.length > 0) {
          //存在规格时将规格从型号里面拆开
          entity.SystemModel = item.Model //型号
          entity.SystemSpecification = item.Specifications[0] //规格（按照解析的规格）
        }
      }

      listData.push(entity)
    })
  }

  // 设置表格
  data.hotTable.hotInstance.updateSettings({
    cell: data.hotSettings.cell
  })

  setTimeout(() => {
    // 更新表格数据（两次赋值要有时间间隔，否则数据会有缓存显示之前的数据）
    data.hotTable.hotInstance.updateData(listData)
  }, 200)
}

export default defineComponent({
  components: {
    HotTable
  },
  setup() {
    const router = useRouter()
    const storeTech = useTechStore()
    const data = reactive({
      CurrEnquiryId: 0
    })

    //#region 表格设置
    let _defaultList = JSON.parse(JSON.stringify(defaultList))
    const hotTableComponent = ref([])
    const hotSettings = reactive({
      data: _defaultList,
      colHeaders: ['产品Id', '询价单Id', '驱动方式', '连接方式', '结构形式', '密封面', '客用名称', '客用型号', '系统名称', '系统型号', '规格', '材质', '压力', '单位', '数量', '备注'],
      columns: [
        { data: 'Id' },
        { data: 'EnquiryDataId' },
        { data: 'DriveWay' },
        { data: 'ConnectioneWay' },
        { data: 'StructureShape' },
        { data: 'SealingSurface' },

        { data: 'ClientName' },
        { data: 'ClientModel' },
        {
          data: 'SystemName',
          type: 'dropdown',
          source: []
        },
        { data: 'SystemModel' },
        { data: 'SystemSpecification' },
        { data: 'Materials' },
        { data: 'Pressure' },
        { data: 'UnitInfo' },
        { data: 'Quantity' },
        { data: 'Remark' }
      ],
      cell: [],
      manualRowMove: true, //手动拖动行
      manualColumnMove: true, //手动拖动列
      rowHeaders: true, //是否显⽰⾏表头
      minRows: 200, //最小行数
      hiddenColumns: {
        // 隐藏指定列
        columns: [0, 1, 2, 3, 4, 5],
        // 隐藏列禁止复制黏贴
        copyPasteEnabled: false,
        indicators: true
      },
      copyPaste: true, //允许复制黏贴
      // height: 500, //行高
      colWidths: 98, //设置列宽
      contextMenu: true, //显⽰右键菜单
      manualRowResize: true, //手动调节行高
      manualColumnResize: true, //手动条件列宽
      licenseKey: 'non-commercial-and-evaluation', //设置许可
      language: 'zh-CN' //设置语⾔
    })
    //#endregion

    //获取阀门解析数据
    const getValveInfo = async () => {
      let hotTable: any = hotTableComponent.value
      let tableDataList = getHotTableData(hotTable)
      let list: any = []
      let modelList = []
      if (tableDataList.length < 0) {
        return false
      }
      console.log(tableDataList)
      for (let i = 0; i < tableDataList.length; i++) {
        let _systemModel = tableDataList[i].SystemModel
        if (_systemModel == undefined || _systemModel == null) {
          ElMessage.error('存在系统型号未填写')
          return false
        } else {
          modelList.push(_systemModel)
        }
      }

      // 批量解析型号
      await postGBValveModelBatchAnalysis(modelList)
        .then(res => {
          if (res.code == 1) {
            let _list = res.data || []
            _list.forEach((row: any) => {
              var item: any = { Name: [] }
              item.IsAnalysis = row.IsAnalysis
              item.Model = row.Model
              item.oldModel = row.OldModel

              item.Specifications = row.OtherList || []

              if (row.IsAnalysis) {
                // 解析成功
                row.ProductModelAnalysisList.forEach((f: any, index: number) => {
                  item.Name.push(f.Name)
                  //存在多个名称时，其他参数只取第一个信息
                  if (index == 0) {
                    item.Driving = f.ProductModelAnalysisList.find((c: any) => c.Digit == 2).Mean //驱动方式
                    item.Connection = f.ProductModelAnalysisList.find((c: any) => c.Digit == 3).Mean //连接形式
                    item.Structural = f.ProductModelAnalysisList.find((c: any) => c.Digit == 4).Mean //结构形式
                    item.Sealing = f.ProductModelAnalysisList.find((c: any) => c.Digit == 5).Mean //密封面
                    item.Pressure = f.ProductModelAnalysisList.find((c: any) => c.Digit == 6).Mean //压力
                    item.Material = f.ProductModelAnalysisList.find((c: any) => c.Digit == 7).Mean //材质
                  }
                })
              }
              list.push(item)
            })

            setHotTableData({ list, tableDataList, hotTable, hotSettings })
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch(e => {
          console.log(`postGBValveModelBatchAnalysis${e}`)
        })
    }

    // 保存
    const orderDataSave = async () => {
      let hotTable: any = hotTableComponent.value
      var _list = getHotTableData(hotTable)

      for (let i = 0; i < _list.length; i++) {
        let item = _list[i]
        if (item.EnquiryDataId == undefined || item.EnquiryDataId == null || item.EnquiryDataId == '') {
          item.EnquiryDataId = data.CurrEnquiryId //询价单Id
        }

        if (item.SystemModel == undefined || item.SystemModel == null || item.SystemModel == '') {
          ElMessage.error('存在系统型号未填写')
          return false
        }

        if (item.Quantity == undefined || item.Quantity == null || item.Quantity == 0) {
          ElMessage.error('存在数量未填写')
          return false
        }
      }

      await PostEditProductEntryExcelSave(_list)
        .then(res => {
          if (res.code == 1) {
            ElMessage.success(res.message)
            // 触发转入技术处理
            orderToTreatm(data.CurrEnquiryId, router)
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch(e => {
          console.log(`PostEditProductEntryExcelSave${e}`)
        })
    }

    // 转入技术处理
    const orderToTreatmSave = () => {
      orderToTreatm(data.CurrEnquiryId, router)
    }

    //订阅状态
    storeTech.$subscribe((mutation, state) => {
      if (state.TechCurrEnquiryId != data.CurrEnquiryId) {
        data.CurrEnquiryId = state.TechCurrEnquiryId

        // 加载数据
        loadData({ data, hotTableComponent })
      }
    })

    onMounted(() => {
      data.CurrEnquiryId = storeTech.getTechCurrEnquiryId
      if (data.CurrEnquiryId > 0) {
        // 加载数据
        loadData({ data, hotTableComponent })
      }
    })

    return {
      hotTableComponent,
      hotSettings,
      getValveInfo,
      orderDataSave,
      orderToTreatmSave
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_order_input_left {
  :deep(.hot-table-box) {
    .cell-not-drop-down {
      .htAutocompleteArrow {
        display: none;
      }
    }
  }
}
</style>
