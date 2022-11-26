<template>
  <div class="giftlist">
    <!-- 柱状图 -->
    <EchartsMsg :MsgType="3" v-show="EchartsShow"></EchartsMsg>
    <div class="pt-2  ">
      <div class=" py-2 text-right flex justify-between">
        <div class="pt-1" style=" font-size: 16px;color: #666;font-weight: 550;">
          居间费
        </div>
        <div class="flex">
          <el-input style="width:200px;height: 32px;" v-model="page.CusName" placeholder='请输入客户姓名' class="pr-2"></el-input>
          <el-input style="width:200px;height: 32px;" v-model="page.UserName" placeholder='请输入居间人姓名' class="pr-2"></el-input>
          <el-button type="primary" class="butclass" @click="getlist">
            <svg-icon icon-class='svg-cus_search' />搜索
          </el-button>
          <el-button type="primary" class="addbutclass" @click="openContract">
            <svg-icon icon-class='svg-addother' />居间费申请
          </el-button>
        </div>
      </div>
    </div>
    <div class="">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange"
        :header-cell-style="{ 'background':'#468bfd', 'color': '#F5F8FF' ,'height':'3rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }"
        :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" style='width: 100%;border-radius:6px'>
        <el-table-column type="index" width='60' label='序号'></el-table-column>
        <el-table-column prop='CreateOn' label='合同日期' width="110">
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column label='客户名称' width="200">
          <template #default="scope">{{ scope.row.CustomerName }}</template>
        </el-table-column>
        <el-table-column label='姓名' width="120">
          <template #default="scope">{{ scope.row.UserName }}</template>
        </el-table-column>
        <el-table-column label='事业部' width="100">
          <template #default="scope">{{ scope.row.CompName }}</template>
        </el-table-column>
        <el-table-column label='合同金额'>
          <template #default="scope">{{ scope.row.ContractAmount }}</template>
        </el-table-column>
        <el-table-column label='回款金额'>
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>
        <el-table-column label='居间费'>
          <template #default="scope">{{ scope.row.IntermediatorAmount }}</template>
        </el-table-column>
        <el-table-column label='居间人' width="120">
          <template #default="scope">{{ scope.row.IntermediatorName }}</template>
        </el-table-column>
        <!-- <el-table-column label='居间协议'>
          <template #default="scope">
            <a href="javascript:void(0);" class="text-blue-500">查看</a>
          </template>
        </el-table-column> -->
        <el-table-column label='举证' width="70">
          <template #default="scope">
            <a href="javascript:void(0);" class="text-blue-500" v-if="scope.row.ImgUrl" @click="$preview(0,retviewurl(scope.row.ImgUrl))">查看</a>
            <a href="javascript:void(0);" class="text-red-500" @click="ShowUpload" v-else>上传</a>
          </template>
        </el-table-column>
        <!-- <el-table-column label='发放状态'>
          <template #default="scope">
            <span class="text-yellow-800" v-if="scope.row.State == 1">申请中</span>
            <span class="text-blue-500" v-else-if="scope.row.State == 0">发放中</span>
            <span class="text-green-500" v-else>已发放</span>
          </template>
        </el-table-column> -->
        <el-table-column label='申请状态' width="80">
          <template #default="scope">
            <div class="text-green-500" v-if="scope.row.State == 100">已通过</div>
            <div class="text-red-500" v-else-if="scope.row.State < 0">驳回</div>
            <div class="text-blue-500" v-else>审核中</div>
          </template>
        </el-table-column>
        <el-table-column label='操作' align="cente" width="70">
          <template #default="scope">
            <span class="cursor-pointer text-blue-500" @click="editcost(scope.row, 3)" v-if="scope.row.State >= 0 && scope.row.State < 100">详情</span>
            <span class="cursor-pointer text-blue-500" @click="editcost(scope.row, 2)" v-else>编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <Add :title="ShowChildDialog.title" v-if="ShowChildDialog.show" :ViewType='ShowChildDialog.viewtype' :DataId='ShowChildDialog.dataId' @closeWindow="cancelContract"></Add>
    <!-- 查看图片 -->
    <el-dialog v-model="imgInfo.uploadShow" v-if="imgInfo.uploadShow" width="600px" :append-to-body='true'>
      <uploadimg :uploadFileData='imgInfo.ImgUrl' @uploadFileDataEvent='uploadFileData' @closeWindow='closeData'></uploadimg>
    </el-dialog>

    <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
  </div>
</template>
<script lang="ts" setup>
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import Add from './AddKublis.vue'
import EchartsMsg from '/@/views/Sale/Cost/Entertainment/EchartsMsg.vue'
import { GetCostIntermediatorList } from '/@/api/Sale/Cost'
import { reactive, ref, onMounted } from 'vue'
import uploadimg from '/@/components/Upload/uploadimg.vue'
import { remoteUrl } from '/@/utils/tools'

const EchartsShow = ref(true)

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
const editcost = (row: any) => {
  GetApplyFlowStepEvent({
    DataId: row.Id,
    Code: 'Basic_Cost_Intermediator'
  }).then((res: any) => {
    WFManagementFormWindow.value.details = res.data
    if (row.State >= 0 && row.State < 100) {
      WFManagementFormWindow.value.details.viewType = 3
    } else {
      WFManagementFormWindow.value.details.viewType = 2
    }
    WFManagementFormWindow.value.show = true
  })
}
//#endregion

//#region 添加居间费申费请
const ShowChildDialog = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '居间费申请'
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
//#endregion

//#region 列表
const data = reactive({
  count: 0,
  tableData: []
})
const page = reactive({
  page: 1,
  size: 10,
  count: 0,
  CusName: '',
  UserName: '',
})

const getlist = () => {
  GetCostIntermediatorList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}
// 分页
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
//#endregion

//#region 上传查看
const imgInfo = reactive({
  uploadShow: false,
  ImgUrl: []
})
const retviewurl = (data: any) => {
  let list = JSON.parse(data)
  var retlist: any = []
  if (list.length > 0) {
    list.forEach((f: any) => {
      var item = remoteUrl(f.Path)
      retlist.push(item)
    })
  }
  console.log('retlist', retlist)
  return retlist
}
const ShowUpload = () => {
  imgInfo.uploadShow = true
}
const closeData = (val: any) => {
  imgInfo.uploadShow = false
}

const uploadFileData = (val: any) => {
  imgInfo.ImgUrl = val
  imgInfo.uploadShow = false
}

//#endregion

// 初始化
onMounted(() => {
  // getlist()
  cancelContract()
})
</script>


<style lang="postcss" scoped>
#myecharts {
  background: #ffffff;
  /* width: 63rem; */
  height: 14rem;
}
.giftlist {
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
:deep(.el-input.is-disabled .el-input__inner){
  -webkit-text-fill-color: var(--el-input-text-color,var(--el-text-color-regular))
}
</style>
