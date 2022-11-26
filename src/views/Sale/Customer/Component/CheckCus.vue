<template>
  <div>
    <CusDialog :boxStyle='boxStyle' title='选择客户' :is-show='true' @closeWindow='closeWindow'>
      <div>
        <el-card class="sale_card " style="padding:0px">
          <div>
            <el-input v-model="relationpageInfo.Name" style="width:200px"></el-input>
            <el-button @click="CustomersByNameEvent">搜索</el-button>
          </div>
        </el-card>

        <el-card class='sale_card mt-6'>
          <div>
            <el-table border :data='relationdata'
              :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
              :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
              <el-table-column type="index" width="50" label='序号' />
              <el-table-column prop='CreateOn' label='录入时间'>
                <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
              </el-table-column>
              <el-table-column prop='Name' label='客户名称' />
              <el-table-column prop='address' label='操作'>
                <template #default="scope">
                  <span class="text-blue-400 cursor-pointer" @click="checkcustomer(scope.row)">点击选择</span>
                </template>
              </el-table-column>
            </el-table>
            <div class="flex justify-end">
              <el-pagination small v-model:page-size="relationpageInfo.size" :background="true" layout="prev, pager, next, jumper" :total="relationpageInfo.count"
                @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
            </div>
          </div>
        </el-card>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetCustomersByName } from '/@/api/Sale/Customer'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
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

const checkcustomer = (val: any) => {
  emit('GetCustomer', val)
  closeWindow()
}
const relationhandleSizeChange = (val: number) => {
  relationpageInfo.size = val
  CustomersByNameEvent()
}
const relationhandleCurrentChange = (val: number) => {
  relationpageInfo.page = val
  CustomersByNameEvent()
}
const relationpageInfo = reactive({
  Name: '',
  count: 0,
  page: 1,
  size: 10
})
const relationdata = ref([])

const CustomersByNameEvent = () => {
  GetCustomersByName(relationpageInfo).then((res) => {
    if (res.code == 1) {
      relationpageInfo.count = res.data.count
      relationdata.value = res.data.list
    }
  })
}
const emit = defineEmits(['closeWindow', 'GetCustomer'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
onMounted(() => {
  CustomersByNameEvent()
})
const data = reactive({
  form: {}
})
</script>
<style lang="postcss" scoped>
</style>
