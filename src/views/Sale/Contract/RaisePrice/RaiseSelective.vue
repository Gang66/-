<template>
  <div>
    <CusDialog v-if="dataInfo.show" :box-style="dataInfo.boxStyle" title="选择产品" :is-show="true" @closeWindow="closeWindow">
      <el-card>
        <div>
          <el-table border :data='dataInfo.list'
            :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }"
            :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%' @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column label="序号" width="40" align="center">
              <template #default="scope">{{ scope.$index + 1 }}</template>
            </el-table-column>
            <el-table-column prop="Name" label="产品名称" width="100" align="center" />
            <el-table-column label="型号规格" width="120" align="center">
              <template #default="scope">{{ (scope.row.Specifications||'')+" "+ (scope.row.Model||'')}}</template>
            </el-table-column>
            <el-table-column prop="OptionName" label="类型" align="center" />
            <el-table-column prop="Unit" label="单位" width="40" align="center" />
            <el-table-column prop="Price" label="本次单价" width="100" align="center">

            </el-table-column>
            <el-table-column prop="SaleMinPrice" label="最低价" width="100" align="center" />
            <el-table-column prop="Amount" label="金额" width="100" align="center" />
            <el-table-column prop="Note" label="备注" align="center" />
          </el-table>
          <!--           <div class="flex justify-end">
            <el-pagination small v-model:page-size="dataInfo.page.size" :background="true" layout="prev, pager, next, jumper" :total="dataInfo.page.count"
              @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
          </div> -->
        </div>
      </el-card>
      <div class="text-center pt-6 pb-2">
        <el-button class="cancelbut" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="checkcontractentity">
          保存
        </el-button>
      </div>
    </CusDialog>
  </div>
</template>

<script lang="ts" setup>
import { PostAddMarkUp } from '/@/api/Sale/MarkUp'
import { ElMessage } from 'element-plus'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref } from 'vue'

const emit = defineEmits(['changeOkProduct'])
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  List: {
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

const dataInfo = reactive({
  show: false,
  boxStyle: {
    boxWidth: 'w-900',
    boxHeight: '',
    boxPaddingTop: 'pt-12'
  },
  list: <any>[],
  multipleSelection: [],
  page: {
    page: 1,
    size: 10,
    type: 1,
    count: 0
  }
})
// 多选
const handleSelectionChange = (val: any) => {
  dataInfo.multipleSelection = val
}

const closeWindow = () => {
  dataInfo.show = false
}
const openWindow = () => {
  dataInfo.show = true
  bargainByNameEvent()
}
// 确定事件
const checkcontractentity = () => {
  if (dataInfo.multipleSelection.length <= 0) {
    ElMessage({
      message: '选择产品不得为空',
      type: 'warning'
    })
    return false
  }
  var returndata: any = {}

  returndata = dataInfo.multipleSelection

  emit('changeOkProduct', returndata)
  closeWindow()
  console.log('选择的产品-----------', dataInfo.multipleSelection)
}

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
  // GetContractList(bargain.page).then((res) => {
  //   if (res.code == 1) {
  //     bargain.page.count = res.data.count
  //     bargain.list = res.data.list
  //   }
  // })
  dataInfo.list = props.List
}

defineExpose({
  openWindow
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