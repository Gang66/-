<template>
  <div>
    <CusDialog :box-style='mesboxStyle' title='采购原则历史记录' :is-show='true' @closeWindow='closeWindow'>
      <el-card class='sale_card mt-6'>
        <el-table border :data='data.list'
          :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
          :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
          <el-table-column type="index" width="60" label='序号' />
          <el-table-column prop='CreateOn' label='录入时间'>
            <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
          </el-table-column>
          <el-table-column prop='CreateName' label='业务员' />
          <el-table-column prop='address' label='操作'>
            <template #default="scope">
              <span class="text-blue-400 cursor-pointer" @click="checkmessage(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end">
          <div>
            <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.totals" @size-change="chandleSizeChange"
              @current-change="chandleCurrentChange" />
          </div>
        </div>
      </el-card>

    </CusDialog>
    <AddPurchase v-if='data.show.view' :title='data.show.title' :ViewType="data.show.viewtype" :DataId='data.show.DataId' @closeWindow='closeshow' />

  </div>
</template>
<script lang="ts" setup>
import { GetPurchaseList } from '/@/api/Sale/Customer'
import { GetUserinformation } from '/@/api/layout/index'
import AddPurchase from './AddPurchase.vue'
import {
  PayMethodDetail //付款方式
} from '/@/utils/techprocess'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'

const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  CustomerId: {
    type: Number,
    default: 0
  },
  CustomerName: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const mesboxStyle = reactive({
  boxWidth: 'w-900',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const messagelog = reactive({
  View: false,
  tableData: [],
  count: 0
})

const data = reactive({
  show: {
    view: false,
    viewtype: 1,
    DataId: 0,
    title: ''
  },
  list: <any>[],
  disabled: false
})

const page = reactive({
  CusId: props.CustomerId,
  size: 10,
  page: 1,
  totals: 0
})
const checkmessage = (val: any) => {
  data.show.viewtype = 2
  data.show.DataId = val.Id
  data.show.title = val.CustomerName + '-采购原则'
  console.log('data.show.DataId', val)
  data.show.view = true
}
const closeshow = () => {
  data.show.view = false
}

const chandleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const chandleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}

const getlist = () => {
  GetPurchaseList(page).then((res) => {
    if (res.code == 1) {
      data.list = res.data.list
      page.totals = res.data.count
    }
  })
}

onMounted(() => {
  getlist()
})
</script>
<style lang="postcss" scoped>
.addcredit {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
    }
  }
  .tablecard {
    :deep(.el-card__body) {
      padding: 0px;
    }
  }
}
</style>
