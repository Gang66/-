<template>
  <div>
    <CusDialog v-if="contract_emplate.mergeshow" :boxStyle='cusboxStyle' :title="contract_emplate.type ? '客户模板' : '系统模板'" :is-show='true' @closeWindow='cancleContractEmplate'>
      <el-card>
        <div class="flex justify-end mb-2" v-if="contract_emplate.type">
          <el-button size="small" type="primary" @click="addClientEmplate">新增
          </el-button>
        </div>
        <el-table :data="contract_emplate.type ? contract[1].options : contract[0].options" border style="width: 100%" max-height="350">
          <el-table-column prop="label" label="模板名称" align="center"/>
          <el-table-column prop="time" label="添加时间" align="center" width="150"/>
          <el-table-column align="center" label="操作" width="120" v-if="contract_emplate.type == 1">
            <template #default="scope">
              <div class="flex justify-center">
                <a href="javascript: ;" class="text-blue-500 mr-2" @click="editClientEmplate(scope.row)">编辑</a>
                <a href="javascript: ;" class="text-red-500" @click="deleteClientEmplate(scope.row)">删除</a>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="center" width="100" v-else>
            <template #default="scope">
              <a href="javascript: ;" class="text-blue-500">预览</a>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </CusDialog>
    <!-- 新增客户模板 -->
    <CusDialog v-if="contract_emplate.client_show" :boxStyle='cusboxStyle' title="客户模板编辑" :is-show='true' @closeWindow='cancleClient'>
      <el-card>
        <div class="flex items-center mb-2">
          <div class="font-bold text-base">模板名称：</div>
          <div>
            <el-input v-model="contract_emplate.client_title" placeholder="请输入客户模板名称" />
          </div>
        </div>
        <div class="font-bold text-base mb-1">模板内容：</div>
        <Editor v-model="contract_emplate.client_content" api-key='qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc' :init="{language: 'zh_CN',height: 450}"></Editor>
      </el-card>
      <div class="text-center pt-6">
        <el-button class="cancelbut" @click="cancleClient">
          取消
        </el-button>
        <el-button type="primary" @click="submitClient()">
          提交
        </el-button>
      </div>
    </CusDialog>
  </div>
</template>

<script lang='ts' setup>
import CusDialog from '../../Component/CusDialog.vue'
import Editor from '@tinymce/tinymce-vue'
import { ElMessage } from 'element-plus'
import { contract } from '/@/utils/contract'
import { reactive } from 'vue'

//#region 合同模板管理
const cusboxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const contract_emplate = reactive({
  mergeshow: false,
  type: 0,
  client_show: false,  // 是否显示编辑合同模板模态框
  // 新增模板信息
  client_id: 0,
  client_title: '',
  client_content: ''
})

// 打开模板管理0系统模板1客户模板
const openContractEmplate = (val:any) => {
  contract_emplate.type = val
  contract_emplate.mergeshow = true
}
const cancleContractEmplate = () => {
  contract_emplate.mergeshow = false
}

// 新增合同模板
const addClientEmplate = () => {
  contract_emplate.client_show = true
}
// 编辑
const editClientEmplate = (data) => {
  contract_emplate.client_id = data.id
  contract_emplate.client_title = data.lable
  contract_emplate.client_content = data.content
  contract_emplate.client_show = true
}
// 删除
const deleteClientEmplate = (data) => {
  console.log(data)
}
// 关闭
const cancleClient = () => {
  contract_emplate.client_show = false
  // 清空
  contract_emplate.client_id = 0
  contract_emplate.client_title = ''
  contract_emplate.client_content = ''
}
// 提交
const submitClient = () => {
  if (!contract_emplate.client_title) {
    ElMessage.warning('模板名称不得为空')
    return false
  }
  if (!contract_emplate.client_content) {
    ElMessage.warning('模板模板内容不得为空')
    return false
  }
  console.log(contract_emplate.client_title, contract_emplate.client_content)
  cancleClient()
}
defineExpose({
  openContractEmplate,

})
//#endregion
</script>
