<template>
  <div class="giftlist">
    <div class="pt-2">
      <div class="py-2 text-right flex justify-between">
        <div class="pt-1" style="font-size: 16px; color: #666; font-weight: 550">居间人</div>
        <div class="flex">
          <el-input style="width: 200px; height: 32px" v-model="page.CusName" placeholder="请输入关联企业" class="pr-2"></el-input>
          <el-input style="width: 200px; height: 32px" v-model="page.Name" placeholder="请输人员姓名" class="pr-2"></el-input>
          <el-button type="primary" class="butclass" @click="getlist"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
          <el-button type="primary" class="addbutclass" @click="openContract"> <svg-icon icon-class="svg-addother" />居间人申请 </el-button>
          <el-button type="primary" class="addbutclass" @click="downAgreement" :icon="Download">下载协议 </el-button>
        </div>
      </div>
    </div>

    <div class="">
      <el-table :data="data.tableData" :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '3rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" style="width: 100%; border-radius: 6px">
        <el-table-column type="index" width="60" label="序号"> </el-table-column>
        <el-table-column prop="CreateOn" label="添加时间" width="120">
          <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
        </el-table-column>
        <el-table-column label="姓名">
          <template #default="scope">{{ scope.row.Name }}</template>
        </el-table-column>
        <el-table-column label="归属事业部" width="120">
          <template #default="scope">{{ scope.row.CompName }}</template>
        </el-table-column>
        <el-table-column label="业务员">
          <template #default="scope">{{ scope.row.UserName }}</template>
        </el-table-column>
        <el-table-column label="关联企业">
          <template #default="scope">
            <a href="javascript: ;" class="text-blue-500" @click="openEnterprise(scope.row)">{{ scope.row.CustomerNum }}</a>
          </template>
        </el-table-column>
        <el-table-column label="居间协议">
          <template #default="scope">
            <a href="javascript: ;" class="text-blue-500" v-if="scope.row.ImgUrl" @click="$preview(0, retviewurl(scope.row.ImgUrl))">预览</a>
            <a href="javascript: ;" class="text-red-500" v-else @click="ShowUpload(scope.row)">上传</a>
          </template>
        </el-table-column>
        <el-table-column label="居间进度">
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>
        <el-table-column label="申请状态">
          <template #default="scope">
            <div class="text-green-500" v-if="scope.row.State == 100">已通过</div>
            <div class="text-red-500" v-else-if="scope.row.State < 0">驳回</div>
            <div class="text-blue-500" v-else>审核中</div>
          </template>
        </el-table-column>
        <el-table-column label="居间费用">
          <template #default="scope">{{ scope.row.Amount }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template #default="scope">
            <span class="cursor-pointer text-blue-500" @click="editcost(scope.row, 3)" v-if="scope.row.State >= 0 && scope.row.State < 100">详情</span>
            <span class="cursor-pointer text-blue-500" @click="editcost(scope.row, 2)" v-else>编辑</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 上传图片 -->
    <el-dialog v-model="ImgInfo.uploadShow" v-if="ImgInfo.uploadShow" width="600px" :append-to-body="true">
      <uploadimg :uploadFileData="ImgInfo.ImgUrl" @uploadFileDataEvent="uploadFileData" @closeWindow="closeData"></uploadimg>
    </el-dialog>
    <!-- 新增居间人 -->
    <Add :title="ShowChildDialog.title" v-if="ShowChildDialog.show" :ViewType="ShowChildDialog.viewtype" :DataId="ShowChildDialog.dataId" @closeWindow="cancelContract"></Add>
    <!-- 客户列表 -->
    <EnterpriseModel ref="EnterpriseModelRef"></EnterpriseModel>
    <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
  </div>
</template>
<script lang="ts" setup>
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import Add from './AddIntermediator.vue'
import EnterpriseModel from './EnterpriseModel.vue'
import { GetIntermediatorList, PostUpdateIntermediatorImgUrl } from '/@/api/Sale/Intermediator'
import uploadimg from '/@/components/Upload/uploadimg.vue'
import { remoteUrl } from '/@/utils/tools'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Download
} from '@element-plus/icons-vue'

const EnterpriseModelRef = ref(null)

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
    Code: 'Basic_Intermediator_Bill'
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

//#region 居间人申请
const ShowChildDialog = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '居间人申请'
})
// 新增
const openContract = () => {
  ShowChildDialog.value.viewtype = 1
  ShowChildDialog.value.show = true
}
// 关闭
const cancelContract = () => {
  ShowChildDialog.value.show = false
  getlist()
}
//#endregion

//#region 列表相关
const data = reactive({
  count: 0,
  tableData: []
})

const page = reactive({
  page: 1,
  size: 10,
  count: 0,
  CusName: '',
  Name: ''
})

const getlist = () => {
  GetIntermediatorList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}
// 分页
const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}

// 下载协议
const downAgreement = () => {
  window.open('www.baidu.com')
}
//#endregion

// 关联企业列表
const openEnterprise = (val: any) => {
  EnterpriseModelRef.value.showrelation(val.Id)
}

//#region 上传、查看图片
const ImgInfo = reactive({
  uploadShow: false,
  Id: 0,
  ImgUrl: []
})
const retviewurl = (val: any) => {
  let list = JSON.parse(val)
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
const ShowUpload = (val: any) => {
  ImgInfo.Id = val.Id
  ImgInfo.uploadShow = true
}
const closeData = (val: any) => {
  ImgInfo.uploadShow = false
}

const uploadFileData = (val: any) => {
  ImgInfo.ImgUrl = val
  PostUpdateIntermediatorImgUrl({ Id: ImgInfo.Id, ImgUrl: JSON.stringify(ImgInfo.ImgUrl) }).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)
      getlist()
    } else {
      ElMessage.error(res.message)
    }
    ImgInfo.uploadShow = false
  })
}

//#endregion

onMounted(() => {
  getlist()
})
</script>

<style lang="postcss" scoped>
#myecharts {
  background: #ffffff;
  width: 63rem;
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
</style>
