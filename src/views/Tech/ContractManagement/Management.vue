<template>
  <div class="Tec_ContractApproval">
    <!-- 物料管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 mb-0 rounded-t-md">
      <div class="float-left pt-1 pb-1">
        <span class="ml-4 text-sm">物料管理</span>
      </div>
      <div class="float-right">
        <el-radio-group v-model="form.BillState" @change="getData()" size="small">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">未生效</el-radio-button>
          <el-radio-button :label="2">已生效</el-radio-button>
        </el-radio-group>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.CusName" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-select v-model="form.CompId" placeholder="事业部" style="width: 120px" class="mr-4">
          <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-input v-model="form.UserName" size="default" placeholder="业务员" style="width: 100px" class="mr-4" />
        <el-button type="primary" :icon="Search" @click="search">查询</el-button>
        <el-button> <i class="iconfont icon-daochu mr-2"></i> 导出数据</el-button>
        <div class="float-right mt-px">
          <el-button type="primary"> <i class="iconfont icon-chuangjian mr-2"></i> 新增物料单</el-button>
          <el-button type="danger"><i class="iconfont icon-zanting mr-2"></i>暂停采购</el-button>
          <el-button type="info" @click="contract()"><i class="iconfont icon-shanchu mr-2"></i>作废采购</el-button>
          <el-button type="success"><i class="iconfont icon-huishou mr-2"></i>物料回收站</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="转入时间" width="166" align="center">
                <template #default="scope">{{ scope.row.CreateOn }}</template>
              </el-table-column>
              <el-table-column prop="CustomerName" label="客户名称" min-width="240">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.CustomerName }}
                    <div class="w-14 h-5 leading-4 bg-red-100 border-red-300 border-dashed border-2 text-xs text-center transform rotate-12 absolute right-2 top-2 opacity-95 rounded text-red-500" v-if="scope.row.MaterialBillPurchaseStatus == 1">暂停</div>
                    <div class="w-14 h-5 leading-4 bg-red-100 border-red-300 border-dashed border-2 text-xs text-center transform rotate-12 absolute right-2 top-2 opacity-95 rounded text-red-500" v-else-if="scope.row.MaterialBillPurchaseStatus == 2">驳回</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Salerman" label="业务员" width="140">
                <template #default="scope">
                  <div class="w-5 h-5 inline-block bg-green-500 text-center text-xs text-white mr-2 leading-5 rounded-md" v-if="scope.row.DeptName">{{ scope.row.DeptName[0] }}</div>
                  <!-- <div class="w-5 h-5 inline-block bg-blue-500 text-center text-xs text-white mr-2 leading-5 rounded-md">潍</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-cyan-400 text-center text-xs text-white mr-2 leading-5 rounded-md">润</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-red-400 text-center text-xs text-white mr-2 leading-5 rounded-md">成</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-indigo-500 text-center text-xs text-white mr-2 leading-5 rounded-md">南</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-yellow-500 text-center text-xs text-white mr-2 leading-5 rounded-md">济</div> -->
                  <span>{{ scope.row.Salerman }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="RealAmount" label="合同金额" width="160" align="center">
                <template #default="scope">{{ scope.row.RealAmount }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="交货期" align="center">
                <template #default="scope">{{ scope.row.DeliveryTime }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同状态" align="center">
                <template #default="scope">
                  <span class=" text-green-500" v-if="scope.row.BillState == 100">合同生效</span>
                  <span class="text-orange-400" v-else>等待盖章</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="物料清单" align="center">
                <template #default="scope">
                  <div>
                    <span class=" text-green-500 cursor-pointer" v-if="scope.row.MaterialBillAuditStatus == 100" @click="openWindowBillMaterials(scope.row, 3)">通过</span>
                    <span class="text-red-500 cursor-pointer" v-else-if="scope.row.MaterialBillAuditStatus == -1" @click="openWindowBillMaterials(scope.row, 2)">驳回</span>
                    <span class="text-red-500 cursor-pointer" v-else-if="scope.row.BillId > 0" @click="openWindowBillMaterials(scope.row, 3)">审核中</span>
                    <span class=" text-blue-400 cursor-pointer" v-else @click="openWindowBillMaterials(scope.row, 1)">操作</span>
                    <!-- <span class=" text-blue-400 cursor-pointer" v-if="scope.row.BillId <= 0">操作</span>
                    <span class=" text-green-500 cursor-pointer" v-else-if="scope.row.MaterialBillAuditStatus == 100">通过</span>
                    <span class="text-red-500 cursor-pointer" v-else-if="scope.row.MaterialBillAuditStatus == -1">驳回</span>
                    <span class="text-yellow-400 cursor-pointer" v-else>审核中</span> -->
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                <template #default="scope">
                  <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer">查看</div>
                  </div>
                  <!-- <span class="text-gray-400">无</span> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 操作 确认物料单 -->
    <BillMaterials title="确认物料清单" v-if="billMaterialsOpenData.visible" :FormData="billMaterialsOpenData.formData" :viewType="billMaterialsOpenData.viewType" @closeWindow="closeWindowBillMaterials($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { GetAllSuccessContractListPage } from '/@/api/tech/Material'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetTypeDepartList } from '/@/api/system/dept'
import '/@/assets/css/tech.css'
import BillMaterials from './_Components/BillMaterials.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetAllSuccessContractListPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.list
      form.totals = res.data.count
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.Suggestion.length > 0) {
      data.Suggestion.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue
        }
      })
    }
    return title
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const search = () => {
    form.page = 1
    renderTableList(form, data)
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  }
}
export default defineComponent({
  components: {
    TableSearch,
    BillMaterials
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      // 搜索
      CusName: '',
      CompId: null,
      UserName: '',
      BillState: 0,
    })
    const data = reactive({
      //事业部信息
      CompList: [],
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    //获取事业部列表
    const getCompList = (data: any) => {
      // 获取事业部列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.CompList = res.data
          console.log(data.CompList)
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    // 作废采购
    const contract = () => {
      ElMessageBox.confirm('确认作废此物料单采购？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    // 确认物料单
    const billMaterialsOpen = (data: any) => {
      let billMaterialsOpenData: any = reactive({
        visible: false,
        viewType: 1,
        formData: {
          Id: 0,
        }
      })

      //打开弹窗
      const openWindowBillMaterials = (val: any, type: any) => {
        billMaterialsOpenData.formData = {
          Id: val.BillId && type != 1 ? val.BillId : val.Id
        }
        billMaterialsOpenData.visible = true
        billMaterialsOpenData.viewType = type
      }

      //关闭弹窗
      const closeWindowBillMaterials = (type: string) => {
        billMaterialsOpenData.visible = false
        getData()
      }

      return {
        billMaterialsOpenData,
        openWindowBillMaterials,
        closeWindowBillMaterials
      }
    }

    onMounted(() => {
      getCompList(data)
    })
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      getData,
      contract,
      ...billMaterialsOpen({ data })
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
