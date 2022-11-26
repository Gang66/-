<template>
  <div class="otherlist">
    <!-- 柱状图 -->
    <EchartsMsg :MsgType="2" v-if="EchartsShow"></EchartsMsg>

    <div class="pt-2  ">
      <div class="py-2 text-right flex justify-between">
        <div class="pt-1" style=" font-size: 16px;color: #666;font-weight: 550;">
          其他费
        </div>
        <div class="flex">
          <el-input style="width:200px;height: 32px;" v-model="page.CusName" placeholder='请输入' class="pr-2"></el-input>

          <el-button type="primary" class="butclass" @click="getlist">
            <svg-icon icon-class='svg-cus_search' />搜索
          </el-button>
          <el-button type="primary" class="addbutclass" @click="openContract">
            <svg-icon icon-class='svg-addother' />新增其他费
          </el-button>
        </div>

      </div>
    </div>
    <div class="">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange"
        :header-cell-style="{ 'background':'#468bfd', 'color': '#F5F8FF' ,'height':'3rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }"
        :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" style='width: 100%;border-radius:6px'>
        <el-table-column type='selection' width='30' />
        <el-table-column type="index" width='60' label='序号'>

        </el-table-column>
        <el-table-column prop='CreateOn' label='申请时间'>
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column label='事业部'>
          <template #default="scope">{{ scope.row.CompName }}</template>
        </el-table-column>
        <el-table-column label='部门'>
          <template #default="scope">{{ scope.row.DeptName }}</template>
        </el-table-column>
        <el-table-column label='申请人'>
          <template #default="scope">{{ scope.row.UserName }}</template>
        </el-table-column>

        <el-table-column label='申请费用'>
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>

        <el-table-column label='状态'>
          <template #default="scope">
            <div class="text-red-600" v-if="scope.row.State<0">
              驳回
            </div>
            <div class="text-yellow-600" v-else-if="scope.row.State==0">
              待提交
            </div>
            <div class="text-blue-500" v-else-if="scope.row.State>=1&&scope.row.State<100">
              审核中
            </div>
            <div class="text-green-500" v-else-if="scope.row.State==100">
              已通过
            </div>
          </template>
        </el-table-column>
        <el-table-column label='操作'>
          <template #default="scope">
            <span class="mr-4 cursor-pointer text-blue-500" @click="editcost(scope.row)">详情</span>
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
    <Add :title="ShowChildDialog.title" v-if="ShowChildDialog.show" :ViewType='ShowChildDialog.viewtype' :DataId='ShowChildDialog.dataId' @closeWindow="cancelContract"></Add>

    <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
  </div>
</template>
<script lang="ts" setup>
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import Add from './AddOther.vue'
import EchartsMsg from '/@/views/Sale/Cost/Entertainment/EchartsMsg.vue'
import { GetCostOtherList } from '/@/api/Sale/Cost'
import { reactive, ref, onMounted } from 'vue'

const EchartsShow = ref(true)

const props = defineProps({})
const ShowChildDialog = ref({
  show: false,
  viewtype: 1, //1是新增2是修改3是查看
  dataId: 0,
  title: '新增其他费'
})

const openContract = () => {
  ShowChildDialog.value.viewtype = 1
  ShowChildDialog.value.show = true
}
const cancelContract = () => {
  EchartsShow.value = false
  ShowChildDialog.value.show = false
  getlist()
  setTimeout(() => {
    EchartsShow.value = true
  });
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
const getlist = () => {
  GetCostOtherList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}

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
const editcost = (row: any) => {
  GetApplyFlowStepEvent({
    DataId: row.Id,
    Code: 'Basic_Cost_Other'
  }).then((res: any) => {
    WFManagementFormWindow.value.details = res.data
    if (row.State == 0 || row.State == -1) {
      WFManagementFormWindow.value.details.viewType = 2
    } else {
      WFManagementFormWindow.value.details.viewType = 3
    }
    WFManagementFormWindow.value.show = true
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
  // getlist()
  cancelContract()
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
