
<template>
  <hot-table :settings="hotSettings" :colHeaders="data.colHeaders" minRows="30" :rowHeights="data.rowheight" :columns="data.columns" :width="data.width" ref="hotTableComponent">
  </hot-table>
</template>
<script lang="ts" setup>
import { reactive, ref, watch } from 'vue'
import { HotTable } from '@handsontable/vue3'
import { registerAllModules } from 'handsontable/registry'
import Handsontable from 'handsontable/base'
import 'handsontable/languages/zh-CN' //中⽂包

registerAllModules()

const props = defineProps({
  data: {
    type: Object,
    default: {} //1是添加  2是修改 3是查看
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
const example = document.querySelector('#example')
//const hot = new Handsontable(example, {})
const hotTableComponent = ref()

const refresh = () => {
  // console.log('hotTableComponent', hotTableComponent.value.hotInstance)

  /*   hotTableComponent.value.hotInstance.updateSettings({
    rowHeights: props.data.rowheight,
    width: props.data.width,
    colHeaders: props.data.colHeaders,
    columns: props.data.columns
  }) */

  console.log('colHeaders', props.data.colHeaders)
  hotTableComponent.value.hotInstance.updateData(props.data.data)
  console.log('props.data.data', props.data.data)
  console.log('hotTableComponent', hotTableComponent.value.hotInstance)
}

const hotSettings = reactive({
  // data: Handsontable.helper.createEmptySpreadsheetData(30, 0),
  /* data: Handsontable.helper.createEmptySpreadsheetData(30, 0),
  colHeaders: [
    '产品名称',
    '型号',
    '规格',
    '压力',
    '材质',
    '单位',
    '数量',
    '单价',
    '金额'
  ],
  columns: [
    {
      data: 'asd'
    },
    {},
    {},
    {},
    {},
    {},

    { type: 'numeric' },
    {
      type: 'dropdown',
      source: [
        'yellow',
        'red',
        'orange',
        'green',
        'blue',
        'gray',
        'black',
        'white'
      ]
    },
    {
      type: 'dropdown',
      source: [
        'yellow',
        'red',
        'orange',
        'green',
        'blue',
        'gray',
        'black',
        'white'
      ]
    }
  ], ///下拉框选择 */
  cells(row: any, col: any, prop: any) {
    if (props.data.cellsetting) {
      if (prop == 'Name') {
        var cell = props.data.cellsetting.find((f: any) => f.index == row)
        if (cell) {
          var cellmeta: any = {}
          cellmeta.type = 'dropdown'
          cellmeta.source = cell.source
          return cellmeta
        }
      }
      if (prop == 'Model') {
        var cell = props.data.cellsetting.find((f: any) => f.index == row)

        if (cell) {
          console.log('cell.className', cell.className)
          var cellmeta: any = {}
          cellmeta.className = cell.className
          return cellmeta
        }
      }
    }
  },
  copyPaste: true,
  dragToScroll: true,
  manualRowMove: true, //手动拖动行
  manualColumnMove: true, //手动拖动列
  mergeCells: [], //合并的数据
  rowHeaders: true, //是否显⽰⾏表头
  contextMenu: true, //显⽰右键菜单
  margeCells: false, //显⽰合并
  height: 500, //行高
  rowHeights: props.data.rowheight, //设置⾏⾼
  colWidths: 120, //设置列宽
  manualRowResize: true, //手动调节行高
  manualColumnResize: true, //手动条件列宽
  licenseKey: 'non-commercial-and-evaluation', //设置许可
  language: 'zh-CN' //设置语⾔
})

const asdasd = () => {
  console.log('//////////////////////////', hotSettings.colWidths)
  console.log('hotTableComponent', hotTableComponent.value.hotInstance.getColWidth(1))
}

const GetHotData = () => {
  let hotTable: any = hotTableComponent.value

  var data = hotTable.hotInstance.getSourceData()

  let Amount = 0
  var list = []
  for (let index = 0; index < data.length; index++) {
    if (!hotTable.hotInstance.isEmptyRow(index)) {
      const element = data[index]
      if (isNaN(Number(element.Amount))) {
        element.Amount = null
      }
      if (isNaN(Number(element.Quantity))) {
        element.Quantity = null
      }
      if (isNaN(Number(element.Price))) {
        element.Price = null
      }

      if (!isNaN(element.Quantity) && !isNaN(element.Price)) {
        element.Amount = Number(element.Quantity) * Number(element.Price)
        Amount = Amount + Number(element.Amount)
      }

      list.push(element)
    }
  }

  return { list: list, Amount: Amount }
}
defineExpose({ refresh, GetHotData })
</script>
<style src="handsontable/dist/handsontable.full.css">
</style>
<style lang='postcss' >
td.custom-cell {
  color: #db0c0c;
}
.handsontable thead th.ht__active_highlight,
.ht__highlight {
  background-color: rgba(2, 122, 255, 0.5) !important;
  color: #fff;
}

.handsontable thead th {
  background: #027aff;
  color: #fff;
}
</style>