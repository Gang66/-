<template>
  <div class="Tec_ContractApproval">
    <!-- 采购预定审批库 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">合同版本</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <div class="pb-4 flex">
        <div class="flex-1">
          <div class="flex justify-between mb-4">
            <div class="flex items-center">
              <div class="w-1.5 h-4 bg-blue-500 mr-2"></div>
              <div>系统模板</div>
            </div>
            <el-button type="primary" @click="openWindowAddTemplate()"> <i class="iconfont icon-jiage mr-2"></i>新增</el-button>
          </div>
          <div>
            <el-table :data="data.tableData" border style="width: 100%" max-height="350">
              <el-table-column prop="label" label="模板名称" align="center"/>
              <el-table-column prop="time" label="添加时间" align="center" width="150"/>
              <el-table-column align="center" label="操作" width="120">
                <template #default="scope">
                  <div class="flex justify-center">
                    <a href="javascript: ;" class="text-blue-500 mr-2" @click="editClientEmplate(scope.row)">编辑</a>
                    <a href="javascript: ;" class="text-red-500" @click="deleteClientEmplate(scope.row)">删除</a>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="100">
                <template #default="scope">
                  <a href="javascript: ;" class="text-blue-500">预览</a>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
        <div class="w-5"></div>
        <div class="flex-1">
          <div class="flex justify-between mb-4">
            <div class="flex items-center">
              <div class="w-1.5 h-4 bg-blue-500 mr-2"></div>
              <div>自定义模板</div>
            </div>
            <el-button type="primary" @click="openWindowAddTemplate()"> <i class="iconfont icon-jiage mr-2"></i>新增</el-button>
          </div>
          <div>
            <el-table :data="data.tableData" border style="width: 100%" max-height="350">
              <el-table-column prop="label" label="模板名称" align="center"/>
              <el-table-column prop="time" label="添加时间" align="center" width="150"/>
              <el-table-column align="center" label="操作" width="120">
                <template #default="scope">
                  <div class="flex justify-center">
                    <a href="javascript: ;" class="text-blue-500 mr-2" @click="editClientEmplate(scope.row)">编辑</a>
                    <a href="javascript: ;" class="text-red-500" @click="deleteClientEmplate(scope.row)">删除</a>
                  </div>
                </template>
              </el-table-column>
              <!-- <el-table-column align="center" width="100">
                <template #default="scope">
                  <a href="javascript: ;" class="text-blue-500">预览</a>
                </template>
              </el-table-column> -->
            </el-table>
          </div>
        </div>
      </div>
      <AddTemplate title="模板编辑" v-if="AddTemplateData.visible" :FormData="AddTemplateData.formData" @closeWindow="closeWindowAddTemplate($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { GetGroupMaterialBillPage } from '/@/api/tech/Material'
import TableSearch from '/@/components/TableSearch/index.vue'

import AddTemplate from './_Components/AddTemplate.vue'
import '/@/assets/css/tech.css'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
    data.tableData = [1,2,3]
//   await GetGroupMaterialBillPage(form).then((res) => {
//     console.log(res.data)
//     if (res.code == 1) {
//       data.tableData = res.data.records
//       // data.tableData = [{Id: 6}]
//       form.totals = res.data.totals
//     }
//   })
}
export default defineComponent({
  components: {
    TableSearch,
    AddTemplate
  },
  setup() {
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      CustomerName: '',
    })
    const data = reactive({
      tableData: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }

    // 采购清单
    const AddTemplateOpen = (data: any) => {
      let AddTemplateData: any = reactive({
        visible: false,
        formData: {
        }
      })

      //打开弹窗
      const openWindowAddTemplate = (val: any) => {
        AddTemplateData.formData = {
        }
        AddTemplateData.visible = true
      }

      //关闭弹窗
      const closeWindowAddTemplate = (type: string) => {
        AddTemplateData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        AddTemplateData,
        openWindowAddTemplate,
        closeWindowAddTemplate
      }
    }

    onMounted(()=>{
      getData()
    })

    return {
      data,
      form,
      Search,
      ...AddTemplateOpen({ data, getData }),
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
