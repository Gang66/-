<template>
  <div class="giftlist">

    <div class="pt-2">
      <div class="border-blue-400 border-dashed border-t p-2 text-right">
        <div class="flex flex-row-reverse">
          <el-button class="ml-3" type="primary" @click="openContract">新增品牌</el-button>
          <el-button type="warning" @click="setContract(false)">还原品牌</el-button>
          <el-button type="danger" @click="setContract(true)">删除品牌</el-button>
        </div>
      </div>
    </div>

    <div class="">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange"
        :header-cell-style='{ background: &apos;#4E8AFC&apos;, color: &apos;#F5F8FF&apos;,height:&apos;50px&apos;, textAlign: &apos;center&apos;,fontWeight:&apos;600&apos; }'
        :cell-style='{ textAlign: &apos;center&apos;,color: &apos;#333&apos;,height:&apos;45px&apos;,padding:&apos;0px&apos; }'>
        <el-table-column type='selection' width='30' />
        <el-table-column type="index" width='60' label='序号'>

        </el-table-column>
        <el-table-column prop='CreateOn' label='添加时间' width="110">
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column label='添加人员'>
          <template #default="scope">{{ scope.row.CreateName }}</template>
        </el-table-column>
        <el-table-column label='品牌名称'>
          <template #default="scope">{{ scope.row.Name }}</template>
        </el-table-column>
        <el-table-column label='邮编' width="100">
          <template #default="scope">{{ scope.row.PostalCode }}</template>
        </el-table-column>
        <el-table-column label='电话'>
          <template #default="scope">{{ scope.row.Telephone }}</template>
        </el-table-column>
        <el-table-column label='邮箱' width="170">
          <template #default="scope">{{ scope.row.Email }}</template>
        </el-table-column>
        <el-table-column label='状态' width="70">
          <template #default="scope">
            <div class="text-red-600" v-if="scope.row.IsDel">
              已删除
            </div>
            <div class="text-green-600" v-else>
              生效
            </div>
          </template>
        </el-table-column>
        <el-table-column label='操作' width="70">
          <template #default="scope">
            <a href="javascript:;" @click="editcost(scope.row, false)" v-if="scope.row.IsDel">查看</a>
            <a href="javascript:;" class="text-blue-500" @click="editcost(scope.row, true)" v-else>编辑</a>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <Add :title="ShowChildDialog.title" v-if="ShowChildDialog.show" :ViewType='ShowChildDialog.viewtype' :DataId='ShowChildDialog.dataId' @cancelContract="cancelContract"></Add>
  </div>
</template>
<script lang="ts" setup>
import Add from './Index.vue'
import { GetCompanyList, GetUpdateCompanyState } from '/@/api/Sale/CustomerOder'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const { proxy } = getCurrentInstance() as any
const echarts = proxy.$echarts
const mychart: any = ref({})

const props = defineProps({})
const ShowChildDialog = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '品牌设置'
})

// 新增
const openContract = () => {
  ShowChildDialog.value.viewtype = 1
  ShowChildDialog.value.show = true
  ShowChildDialog.value.title = '品牌设置'
}
// type:true删除、false还原
const setContract = (type: boolean) => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }

  ElMessageBox.confirm(
    `确定要${type ? '删除' : '还原'}吗？`,
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    GetUpdateCompanyState({DataId: multipleSelection.value[0].Id, State: type}).then(res => {
      if (res.code == 1) {
        ElMessage.success(res.message)
        getlist()
      } else {
        ElMessage.error(res.message)
      }
    })
  })
}

const cancelContract = () => {
  ShowChildDialog.value.show = false
  getlist()
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  count: 0,
  tableData: []
})
const page = reactive({
  page: 1,
  size: 10,
  count: 0
})
const editcost = (row: any, type: boolean) => {
  if (type) {
    ShowChildDialog.value.viewtype = 2
    ShowChildDialog.value.title = '编辑品牌'
  } else {
    ShowChildDialog.value.viewtype = 3
    ShowChildDialog.value.title = '查看品牌'
  }
  ShowChildDialog.value.dataId = row.Id
  ShowChildDialog.value.show = true
}

const getlist = () => {
  GetCompanyList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}

const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}
const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}
onMounted(() => {
  getlist()
  /*  mychart.value = echarts.init(document.getElementById('myecharts'))
  mychart.value.setOption(option) */
})
</script>
<style lang="postcss" scoped>
#myecharts {
  background: #ffffff;
  width: 63rem;
  height: 14rem;
}
.giftlist {
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
</style>
