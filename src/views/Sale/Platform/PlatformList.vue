<template>
  <div class="otherlist">
    <div class="pt-2">
      <div class="p-2 text-right flex justify-between">
        <div class="pt-1" style="font-size: 16px; color: #666; font-weight: 550">平台管理</div>
        <div class="flex">
          <el-select v-model="page.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
            <el-option v-for="item in data.Company" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>

          <el-button type="primary" class="butclass ml-2" @click="getlist"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
          <el-button type="primary" class="addbutclass" @click="openContract"> <svg-icon icon-class="svg-addpt" />新增平台 </el-button>
        </div>
      </div>
    </div>
    <div class="">
      <el-table :data="data.tableData" @selection-change="handleSelectionChange" :header-cell-style="{ background: '#4E8AFC', color: '#F5F8FF', height: '50px', textAlign: 'center', fontWeight: '600' }" :cell-style="{ textAlign: 'center', color: '#333', height: '45px', padding: '0px' }">
        <el-table-column type="selection" width="30" />
        <el-table-column type="index" width="60" label="序号"> </el-table-column>
        <el-table-column prop="CreateOn" label="录入时间">
          <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
        </el-table-column>

        <el-table-column label="事业部">
          <template #default="scope">{{ scope.row.CompName }}</template>
        </el-table-column>

        <el-table-column label="业务员">
          <template #default="scope">{{ scope.row.UserName }}</template>
        </el-table-column>
        <el-table-column label="注册单位" show-overflow-tooltip>
          <template #default="scope">{{ retCompanyName(scope.row.CompanyId) }}</template>
        </el-table-column>
        <el-table-column label="客户名称" show-overflow-tooltip>
          <template #default="scope">客户名称</template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="平台名称" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.PlatformName }}</template>
        </el-table-column>
        <el-table-column label="平台登录地址" show-overflow-tooltip>
          <template #default="scope">平台登录地址</template>
        </el-table-column>
        <el-table-column label="平台状态">
          <template #default="scope">平台状态</template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="平台用户名" show-overflow-tooltip>
          <template #default="scope">{{ scope.row.Account }}</template>
        </el-table-column>
        <el-table-column prop="CreateOn" label="平台密码">
          <template #default="scope">
            <span class="text-green-500" v-if="scope.row.State == 100 || scope.row.State == -99"> {{ scope.row.Password }}</span>
            <el-link type="danger" v-if="scope.row.State == -1" @click="OpenApprove(scope.row, 2)">驳回</el-link>
            <el-link type="primary" v-if="scope.row.State == -100" @click="OpenApprove(scope.row, 1)">申请查看</el-link>
            <el-link type="warning" v-if="scope.row.State > 0 && scope.row.State < 100" @click="OpenApprove(scope.row, 3)">审批中</el-link>
          </template>
        </el-table-column>
        <el-table-column label="环境检测">
          <template #default="scope">环境检测</template>
        </el-table-column>

        <el-table-column label="操作" align="center">
          <template #default="scope">
            <span v-if="scope.row.State == -99 || scope.row.State == 100" class="cursor-pointer text-blue-500" @click="editcost(scope.row)">详情</span>
            <span v-else>--</span>
          </template>
        </el-table-column>
        <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
 -->
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <Add :title="ShowChildDialog.title" v-if="ShowChildDialog.show" :ViewType="ShowChildDialog.viewtype" :DataId="ShowChildDialog.dataId" @cancelContract="cancelContract">
      <template #ApprovalProcess>
        <ApprovalProcess :checkId="ShowChildDialog.ApproveId"> </ApprovalProcess>
      </template>
    </Add>
    <Approve :BillId="ShowChildDialog.BillId" :Data="ShowChildDialog.data" :title="ShowChildDialog.apptitle" v-if="ShowChildDialog.appshow" :ViewType="ShowChildDialog.appviewtype" :DataId="ShowChildDialog.appdataId" @closeWindow="cancelapp"> </Approve>

    <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
  </div>
</template>
<script lang="ts" setup>
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import ApprovalProcess from '/@/components/ApprovalProcess/Index.vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import Add from './AddPlatform.vue'
import Approve from './AddApprove.vue'
import { GetPlatfromList } from '/@/api/Sale/Platfrom'
import { reactive, ref, onMounted } from 'vue'

//#region WFManagementForm
const WFManagementFormWindow = ref({
  details: {
    viewType: 1
  },
  show: false,
  Id: 0
})
const wfcloseWindow = () => {
  WFManagementFormWindow.value.show = false
  getlist()
}
///打开
const OpenApprove = (row: any) => {
  GetApplyFlowStepEvent({
    DataId: row.ApproveId,
    Code: 'Basic_Platform_Approve'
  }).then((res: any) => {
    WFManagementFormWindow.value.details = res.data
    if (row.State == 100) {
      WFManagementFormWindow.value.details.viewType = 3
    } else {
      WFManagementFormWindow.value.details.viewType = 2
    }
    WFManagementFormWindow.value.show = true
  })
}
//#endregion

const props = defineProps({})
const ShowChildDialog = ref({
  show: false,
  viewtype: 1, //1是新增2是修改3是查看
  dataId: 0,
  title: '新增平台',

  appshow: false,
  appviewtype: 1, //1是新增2是修改3是查看
  appdataId: 0,
  apptitle: '新增平台',
  data: {},
  BillId: 0,
  ApproveId: 0
})
//获取报价单位
const GetOrderCompanyEvent = () => {
  GetOrderCompany().then((res) => {
    if (res.code == 1) {
      data.Company = res.data
    }
  })
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
const openContract = () => {
  ShowChildDialog.value.viewtype = 1
  ShowChildDialog.value.show = true
}
const cancelContract = () => {
  ShowChildDialog.value.show = false
  getlist()
}
const cancelapp = () => {
  ShowChildDialog.value.appshow = false
  getlist()
}

// const OpenApprove = (row: any, val: any) => {
//   if (val == 1) {
//     ShowChildDialog.value.data = row
//   } else {
//     ShowChildDialog.value.BillId = row.Id
//   }
//   ShowChildDialog.value.appviewtype = val
//   ShowChildDialog.value.appshow = true
// }

const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  count: 0,
  tableData: [],
  Company: []
})
const page = reactive({
  page: 1,
  size: 10,
  count: 0
})
const getlist = () => {
  GetPlatfromList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}

const editcost = (row: any) => {
  if (row.State == 0 || row.State == -2) {
    ShowChildDialog.value.viewtype = 2
    ShowChildDialog.value.title = '编辑其它费'
  } else {
    ShowChildDialog.value.viewtype = 3
    ShowChildDialog.value.title = '平台详情'
  }
  ShowChildDialog.value.dataId = row.Id
  ShowChildDialog.value.ApproveId = row.ApproveId
  ShowChildDialog.value.show = true
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
  GetOrderCompanyEvent()
})
</script>
<style lang="postcss" scoped>
#myecharts {
  background: #ffffff;
  width: 63rem;
  height: 14rem;
}
.otherlist {
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
