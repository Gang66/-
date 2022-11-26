<template>
  <div>
    <!-- 选择合同 -->
    <CusDialog v-if="bargain.show" :boxStyle='bargain.boxStyle' title='选择合同' :is-show='true' @closeWindow='cancelBargain'>
      <div class="ht-list">
        <div class="sale_card flex flex-row-reverse w-full" style="padding:0px">
          <div>
            <el-input v-model="bargain.page.CusName" style="width:200px" class="mr-2" placeholder="请输入客户名称"></el-input>
            <el-button @click="bargainByNameEvent" color="#027aff">搜索</el-button>
          </div>
        </div>

        <el-card class='sale_card mt-2'>
          <div>
            <el-table border :data='bargain.list'
              :header-cell-style="{'font-size': '14px',padding:'3px 0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
              :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'3px 0' }" style='width: 100%'>
              <el-table-column type="index" width="60" label='序号' />
              <el-table-column prop='CreateOn' width="110" label='生效时间'>
                <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
              </el-table-column>
              <el-table-column prop='BillNo' label='合同单号' width="140"/>
              <el-table-column prop='CustomerName' label='客户名称' width="250"/>
              <el-table-column prop='CompanyName' label='签约单位' />
              <el-table-column prop='Amount' label='合同金额'/>
              <el-table-column prop='address' width="90" label='操作'>
                <template #default="scope">
                  <span class="text-blue-400 cursor-pointer" @click="SelectionBargainChange(scope.row)">点击选择</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="flex justify-end">
              <el-pagination small v-model:page-size="bargain.page.size" :background="true" layout="prev, pager, next, jumper" :total="bargain.page.count"
                @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
            </div>
          </div>
        </el-card>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { GetContractList } from '/@/api/Sale/Contract'
import { reactive, ref, onMounted, watch } from 'vue'

const emit = defineEmits(['changeOk'])

// #region 选择合同
const bargain = reactive({
  Id: 0,
  show: false,
  list: [],
  entitys: [],
  boxStyle: {
    boxWidth: 'w-1070',
    boxHeight: '',
    boxPaddingTop: 'pt-12'
  },
  page: {
    page: 1,
    size: 10,
    type: 1,
    count: 0,
    CusName: ''
  }
})

const relationhandleSizeChange = (val: number) => {
  bargain.page.size = val
  bargainByNameEvent()
}
const relationhandleCurrentChange = (val: number) => {
  bargain.page.page = val
  bargainByNameEvent()
}

// 搜索
const bargainByNameEvent = () => {
  GetContractList(bargain.page).then((res) => {
    if (res.code == 1) {
      bargain.page.count = res.data.count
      bargain.list = res.data.list
    }
  })
}

const showBargain = () => {
  bargain.show = true
  bargainByNameEvent()
}

const SelectionBargainChange = (val: any) => {
  bargain.Id = val.Id
  emit('changeOk', val.Id, val)
  
  // getcontract()
  cancelBargain()
}
// 关闭模态框
const cancelBargain = () => {
  bargain.show = false
}
//#endregion

defineExpose({
  bargain,
  showBargain
})
</script>