<template>
  <div>
    <CusDialog v-if="dialogVisible" :box-style="dataInfo.boxStyle" title="加价记录" :is-show="true" @closeWindow="closeWindow">
      <el-card>
        <div>
          <el-table border :data='dataInfo.list'
            :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
            :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
            <el-table-column type="index" width="50" label='序号' />
            <el-table-column prop='CreateOn' width="110" label='加价时间'>
              <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
            </el-table-column>
            <el-table-column prop='SaleMinPrice' label='最低价' width="130" />
            <el-table-column prop='SalePrice' label='销售额' />
            <el-table-column width="100" label='操作'>
              <template #default="scope">
                <span class="text-blue-400 cursor-pointer" @click="SelectionBargainChange(scope.row)">选择</span>
              </template>
            </el-table-column>
          </el-table>
          <div class="flex justify-end">
            <el-pagination small v-model:page-size="dataInfo.page.size" :background="true" layout="prev, pager, next, jumper" :total="dataInfo.page.count"
              @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
          </div>
        </div>
      </el-card>
    </CusDialog>
  </div>
</template>

<script lang="ts" setup>
import { GetMarkUpHistoryListById } from '/@/api/Sale/MarkUp'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import RaiseLose from './RaiseLose.vue'
import { reactive, ref, onMounted } from 'vue'
const props = defineProps({
  DataId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['closeWindow', 'getMarkUpinfo'])

const closeWindow = () => {
  emit('closeWindow')
}

const dataInfo = reactive({
  show: false,
  boxStyle: {
    boxWidth: 'w-900',
    boxHeight: '',
    boxPaddingTop: 'pt-12'
  },
  list: [],
  page: {
    page: 1,
    size: 10,
    type: 1,
    count: 0
  }
})
// 选择
const SelectionBargainChange = (val: any) => {
  emit('getMarkUpinfo', 0, val)
  closeWindow()
}

const openWindow = () => {
  dataInfo.show = true
  bargainByNameEvent()
}
// 分页
const relationhandleSizeChange = (val: number) => {
  dataInfo.page.size = val
  bargainByNameEvent()
}
const relationhandleCurrentChange = (val: number) => {
  dataInfo.page.page = val
  bargainByNameEvent()
}
// 获取列表
const bargainByNameEvent = () => {
  var data: any = dataInfo.page
  data.OrderId = props.DataId
  GetMarkUpHistoryListById(data).then((res) => {
    if (res.code == 1) {
      dataInfo.list = res.data.list
      dataInfo.page.count = res.data.count
    }
  })
}

defineExpose({
  openWindow
})
onMounted(() => {
  bargainByNameEvent()
})
</script>

<style lang="postcss" scoped>
:deep(.el-dialog__header) {
  margin: 0;
  padding: 0;
}
:deep(.el-dialog) {
  border-radius: 10px;
  overflow: hidden;
}
:deep(.el-dialog__body) {
  background: linear-gradient(180deg, #e6f6ff 0%, #fefeff 100%);
  padding: 0;
}
.form-bottom {
  background-image: var(--7ba5bd90-salerDialogStyle_diaogBottom);
}
:deep(.salerDialog .el-card .el-card__body) {
  padding: 0 0.5em;
}
</style>