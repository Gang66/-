<template>
  <div class="Tec_ContractApproval">
    <!-- 采购预定审批库 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">单位设置</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.keyword" size="default" placeholder="报价单位名称" style="width: 200px" class="mr-4" />
        <el-button type="primary" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        <div class="float-right mt-px">
          <el-button type="primary" @click="openWindowUnitSetting(0)"> <i class="iconfont icon-jiage mr-2"></i>新增</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData">
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="转入时间" width="166" align="center">
                <template #default="scope">{{ scope.row.CreateOn }}</template>
              </el-table-column>
              <el-table-column prop="Code" label="合同编号" align="center">
                <template #default="scope">
                  {{ scope.row.Code }}
                </template>
              </el-table-column>
              <el-table-column prop="CompanyName" label="报价单位名称" align="center">
                <template #default="scope">
                  {{ scope.row.CompanyName }}
                </template>
              </el-table-column>
              <el-table-column prop="Address" label="地址" align="center">
                <template #default="scope">
                  {{ scope.row.Address }}
                </template>
              </el-table-column>
              <el-table-column prop="Telephone" label="电话" align="center">
                <template #default="scope">
                  {{ scope.row.Telephone }}
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="操作" align="center" width="140">
                <template #default="scope">
                  <div class="flex justify-center">
                    <div class="mr-3">
                      <!-- <i class="iconfont icon-edit inline-block mr-1 text-blue-600"></i> -->
                      <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowUnitSetting(scope.row.Id)">编辑</div>
                    </div>
                    <div>
                      <!-- <i class="iconfont icon-zitiyulan inline-block mr-1 text-red-600"></i> -->
                      <el-popconfirm
                        title="确定要删除吗"
                        confirm-button-text="确定"
                        cancel-button-text="取消"
                        @confirm="DeleteInfo(scope.row.Id)">
                        <template #reference>
                          <div class="text-red-600 inline-block cursor-pointer">删除</div>
                        </template>
                      </el-popconfirm>
                      
                    </div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
      <UnitSetting title="单位设置" v-if="UnitSettingData.visible" :FormData="UnitSettingData.formData" @closeWindow="closeWindowUnitSetting($event)" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { GetPurchaseDemandCompanyPage, PostDeletePurchaseDemandCompanySave } from '/@/api/tech/Material'
import TableSearch from '/@/components/TableSearch/index.vue'

import UnitSetting from './_Components/UnitSetting.vue'
import '/@/assets/css/tech.css'
import { ElMessage } from 'element-plus'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPurchaseDemandCompanyPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange
  }
}
export default defineComponent({
  components: {
    TableSearch,
    UnitSetting
  },
  setup() {
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      keyword: '',
    })
    const data = reactive({
      tableData: []
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    //删除
    const DeleteInfo = (Id: number) => {
      PostDeletePurchaseDemandCompanySave(Id).then((res:any) => {
        res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
        if (res.code == 1) {
          getData()
        }
      })
    }

    // 采购清单
    const UnitSettingOpen = (data: any) => {
      let UnitSettingData: any = reactive({
        visible: false,
        formData: {
          Id: 0
        }
      })

      //打开弹窗
      const openWindowUnitSetting = (Id: any) => {
        UnitSettingData.formData = {
          Id: Id
        }
        UnitSettingData.visible = true
      }

      //关闭弹窗
      const closeWindowUnitSetting = (type: string) => {
        UnitSettingData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        UnitSettingData,
        openWindowUnitSetting,
        closeWindowUnitSetting
      }
    }

    return {
      data,
      form,
      DeleteInfo,
      Search,
      ...UnitSettingOpen({ data, getData }),
      ...tableRender(form, data),
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
