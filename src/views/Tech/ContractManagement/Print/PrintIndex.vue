<template>
  <div>
    <billMaterialsPrint v-if="data.viewtype == 2" :printdata="printdata" @closeWindow="cancelprintview" />
    <!-- <sdlh v-if="data.viewtype == 3" :printdata="printdata" @closeWindow="cancelprintview"></sdlh>
    <bjhzy v-if="data.viewtype == 4" :printdata="printdata" @closeWindow="cancelprintview"></bjhzy>
    <bffm v-if="data.viewtype == 5" :printdata="printdata" @closeWindow="cancelprintview"></bffm>
    <hmzk v-if="data.viewtype == 6" :printdata="printdata" @closeWindow="cancelprintview"></hmzk>
    <bfgzy v-if="data.viewtype == 7" :printdata="printdata" @closeWindow="cancelprintview"></bfgzy>
    <wfhd v-if="data.viewtype == 10" :printdata="printdata" @closeWindow="cancelprintview"></wfhd>
    <hg v-if="data.viewtype == 11" :printdata="printdata" @closeWindow="cancelprintview"></hg> -->
  </div>
</template>
<script lang="ts" setup>
import billMaterialsPrint from './BillMaterialsPrint.vue'
import { GetCustomerOrderInfo } from '/@/api/Sale/CustomerOder'
import { reactive, ref, watch, onMounted } from 'vue'
const props = defineProps({
  DataId: {
    type: Number,
    default: 0
  },
  printData: {
    type: Object,
    default: {}
  }
})
const emit = defineEmits(['closeWindow'])
const closeWindow = () => {
  emit('closeWindow')
}

const data = reactive({
  fromdata: {
    CompanyId: 0,
    FieldData: [],
    FieldDataValue: []
  },
  list: [],
  viewtype: 0
})

const printdata = reactive({
  data: {},
  list: [],
  columns: []
})
const cancelprintview = () => {
  console.log('asdsadasdsadsadsadsadsadsa')
  data.viewtype = 0
  closeWindow()
}

const getorderinfo = () => {
  if (props.DataId != 0) {
    GetCustomerOrderInfo({ BillId: props.DataId }).then((res) => {
      if (res.code == 1) {
        res.data.bill.FieldData = JSON.parse(res.data.bill.FieldData)
        res.data.bill.FieldDataValue = JSON.parse(res.data.bill.FieldDataValue)

        res.data.bill.FileList = JSON.parse(res.data.bill.FileList)
        res.data.bill.ContactsContact = JSON.parse(res.data.bill.ContactsContact)
        res.data.bill.SalesmanContact = JSON.parse(res.data.bill.SalesmanContact)
        res.data.bill.BrokerContact = JSON.parse(res.data.bill.BrokerContact)

        data.fromdata = res.data.bill
        data.list = res.data.entities
        getprinttable()
      }
    })
  } else {
    data.fromdata = props.printData.bill
    if (data.fromdata.CompanyId == null) {
      data.fromdata.CompanyId = 2
    }
    data.list = props.printData.entities
    getprinttable()
  }
}
//设置打印的表单字段
const getprinttable = () => {
  let Heades = <any>[]
  data.fromdata.FieldDataValue.forEach((item: any) => {
    var index = data.fromdata.FieldData.findIndex((f: any) => f.id == item)
    if (index >= 0) {
      let field: any = data.fromdata.FieldData[index]

      field.rename = field.rename == '' ? field.colname : field.rename
      Heades.push(field)
    }
  })
  printdata.data = data.fromdata
  printdata.list = data.list
  printdata.columns = Heades
  data.viewtype = data.fromdata.CompanyId
}
onMounted(() => {
  getorderinfo()
})
</script>
<style lang="postcss" scoped></style>
