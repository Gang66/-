<template>
  <div class="otherlist">

    <div class="py-2">
      <div class="py-2 text-right flex justify-between">
        <div class="w-52">
          <el-tabs v-model="page.Type" class="demo-tabs" @tab-change="cliketop">
            <el-tab-pane label="待审批" :name=0></el-tab-pane>
            <el-tab-pane label="已审批" :name=1></el-tab-pane>
          </el-tabs>
        </div>
        <div class="flex">
          <el-select v-model="page.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
            <el-option v-for="item in data.Company " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>

          <el-button type="primary" class="butclass ml-2" @click="getlist">
            <svg-icon icon-class='svg-cus_search' />搜索
          </el-button>

        </div>

      </div>

      <!--  <el-select v-model="page.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
        <el-option v-for="item in data.Company " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
      </el-select>
      <el-button type="primary" @click="openContract">新增企业资质</el-button> -->
    </div>
    <div class="">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange"
        :header-cell-style='{ background: &apos;#4E8AFC&apos;, color: &apos;#F5F8FF&apos;,height:&apos;50px&apos;, textAlign: &apos;center&apos;,fontWeight:&apos;600&apos; }'
        :cell-style='{ textAlign: &apos;center&apos;,color: &apos;#333&apos;,height:&apos;45px&apos;,padding:&apos;0px&apos; }'>
        <el-table-column type='selection' width='30' />
        <el-table-column type="index" width='60' label='序号'>

        </el-table-column>
        <el-table-column prop='CreateOn' label='添加时间'>
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column label='添加人'>
          <template #default="scope">{{ scope.row.UserName }}</template>
        </el-table-column>
        <el-table-column label='客户名称'>
          <template #default="scope">{{ scope.row.CustomerName }}</template>
        </el-table-column>
        <el-table-column label='联系人'>
          <template #default="scope">{{ scope.row.ConName }}</template>
        </el-table-column>

        <el-table-column label='状态'>
          <template #default="scope">
            <span v-if="scope.row.IsMangerRead" style="color:#FC701B">
              未读
            </span>
            <span style="color:#44D7B6" v-else>
              已读
            </span>
          </template>
        </el-table-column>

        <el-table-column label='操作'>
          <template #default="scope">
            <el-link type="primary" @click="editinfo(scope.row)">去审批</el-link>
          </template>
        </el-table-column>
        <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
 -->
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <Communicate v-if='data.AddCommunicate.view' :ViewType="data.AddCommunicate.viewtype" :DataId='data.AddCommunicate.dataid' @closeWindow='closeCommunicate' />
  </div>
</template>
<script lang="ts" setup>
import { GetAppCommunicateList } from '/@/api/Sale/Customer'
import { ElMessage, ElMessageBox } from 'element-plus'
import Communicate from '/@/views/Sale/Customer/Component/Communicate.vue'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

const props = defineProps({})
const ShowChildDialog = ref({
  show: false,
  viewtype: 1, //1是新增2是修改3是查看
  dataId: 0,
  title: '新增企业资质'
})

const openContract = () => {
  ShowChildDialog.value.viewtype = 1
  ShowChildDialog.value.show = true
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
  tableData: [],
  Company: [],
  AddCommunicate: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  }
})

const page = reactive({
  Type: 0,
  page: 1,
  size: 10,
  count: 0,
  CompanyId: null
})
const cliketop = () => {
  getlist()
}

///获取公司名称
const retCompanyName = (val: any) => {
  var res: any = data.Company.find((f: any) => {
    if (f.Id == val) {
      return f
    }
  })
  if (res) {
    return res.Name
  } else {
    return ''
  }
}
const closeCommunicate = () => {
  data.AddCommunicate.view = false
  getlist()
}
const getlist = () => {
  GetAppCommunicateList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}

const editinfo = (row: any) => {
  data.AddCommunicate.dataid = row.Id
  data.AddCommunicate.viewtype = 5
  data.AddCommunicate.view = true
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
})
</script>
<style lang="postcss" scoped>
.otherlist {
  :deep(.el-tabs__item.is-active) {
    color: #468bfd;
  }
  :deep(.el-tabs__item) {
    font-size: 16px;
    color: #666;
    font-weight: 550;
  }
  :deep(.el-tabs__header) {
    margin: 0px 0 5px;
  }
  .butclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #468bfd;
    background: #ffffff;
    &:focus {
      background-color: #e3ebf3;
    }
    &:hover {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
    &:active {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
  }
  .addbutclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #fff;
    background: #468bfd;
    &:focus {
      background-color: #3971ce;
    }
    &:hover {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
    &:active {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
  }
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
</style>
