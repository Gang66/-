<template>
  <!-- 选择客户 -->
  <CusDialog v-if=" relation.show" :boxStyle='cusboxStyle' title='查看相关企业' :is-show='true' @closeWindow='cancelrelation'>
    <div>
      <!-- <el-card class="sale_card " style="padding:0px">
        <div>
          <el-input v-model="relation.relationpageInfo.Name" style="width:200px"></el-input>
          <el-button @click="CustomersByNameEvent">搜索</el-button>
        </div>
      </el-card> -->

      <el-card class='sale_card'>
        <div>
          <el-table border :data='relation.list'
            :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
            :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
            <el-table-column type="index" width="50" label='序号' />
            <el-table-column prop='CreateOn' width="110" label='关联时间'>
              <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
            </el-table-column>
            <el-table-column prop='Name' label='关联企业' width="300"/>
            <el-table-column prop='Ranking' label='等级' />
            <el-table-column prop='Trade_One' label='行业' />
            <el-table-column label='区域' width="160">
              <template #default="scope">
                {{ scope.row.Addr_Province }} {{ scope.row.Addr_City }} {{ scope.row.Addr_Area }}
              </template>
            </el-table-column>
            <el-table-column prop='--' label='成交数' />
          </el-table>
        </div>
      </el-card>
    </div>
  </CusDialog>
</template>
<script lang='ts' setup>
import { reactive } from 'vue'
import { GetCustomerByInterId } from '/@/api/Sale/Intermediator'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
//#region 选择客户
const relation = reactive({
  show: false,
  list: [],
  index: 0,
  relationpageInfo: {
    Name: '',
    count: 0,
    page: 1,
    size: 10
  }
})
const cusboxStyle = reactive({
  boxWidth: 'w-1000',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const showrelation = (Id: number) => {
  relation.show = true
  GetCustomerByInterId({DataId: Id}).then((res) => {
    if (res.code == 1) {
      relation.list = res.data
    }
  })
}
const cancelrelation = () => {
  relation.show = false
}

defineExpose({
  showrelation
})
//#endregion
</script>
