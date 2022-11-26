<template>
  <div class="Tec_ContractApproval">
    <!-- 物料采购管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">物料采购管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.CustomerName" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-input v-model="form.Salerman" size="default" placeholder="业务员" style="width: 100px" class="ml-4 mr-4" />
        <el-select v-model="form.BillState" placeholder="合同状态" style="width: 120px" class="mr-4">
          <el-option label="合同已生效" :value="100" />
          <el-option label="合同待生效" :value="0" />
        </el-select>
        <el-button type="primary" class="ml-2" :icon="Search" @click="getData">查询</el-button>
        <div class="float-right mt-px">
          <el-button type="info" @click="openWindowRecyclingStation()"><i class="iconfont icon-huishou mr-2"></i>采购回收站</el-button>
          <el-button type="danger" @click="resumeClick(0)"><i class="iconfont icon-qidong mr-2"></i>恢复采购</el-button>
          <el-button type="danger" @click="resumeClick(1)"><i class="iconfont icon-zanting mr-2"></i>暂缓采购</el-button>
          <el-button type="warning" @click="resumeClick(2)"><i class="iconfont icon-dingdan8 mr-2"></i>驳回采购</el-button>
          <el-button type="primary"> <i class="iconfont icon-shujuku mr-2"></i>历史物料库</el-button>
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
              <el-table-column prop="CustomerName" label="客户名称" min-width="166">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.CustomerName }}
                    <div class="w-14 h-5 leading-4 bg-red-100 border-red-300 border-dashed border-2 text-xs text-center transform rotate-12 absolute right-2 top-2 opacity-95 rounded text-red-500" v-if="scope.row.PurchaseStatus == 1">暂缓</div>
                    <div class="w-14 h-5 leading-4 bg-yellow-100 border-yellow-300 border-dashed border-2 text-xs text-center transform rotate-12 absolute right-2 top-2 opacity-95 rounded text-yellow-500" v-else-if="scope.row.PurchaseStatus == 2">驳回</div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员">
                <template #default="scope">
                  <div class="w-5 h-5 inline-block bg-green-500 text-center text-xs text-white mr-2 leading-5 rounded-md">{{ scope.row.DeptName && scope.row.DeptName[0] }}</div>
                  <!-- <div class="w-5 h-5 inline-block bg-blue-500 text-center text-xs text-white mr-2 leading-5 rounded-md">潍</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-cyan-400 text-center text-xs text-white mr-2 leading-5 rounded-md">润</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-red-400 text-center text-xs text-white mr-2 leading-5 rounded-md">成</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-indigo-500 text-center text-xs text-white mr-2 leading-5 rounded-md">南</div> -->
                  <!-- <div class="w-5 h-5 inline-block bg-yellow-500 text-center text-xs text-white mr-2 leading-5 rounded-md">济</div> -->
                  <span>{{ scope.row.Salerman }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" width="160" align="center">
                <template #default="scope">{{ scope.row.RealAmount }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="交货期" width="160" align="center">
                <template #default="scope">{{ scope.row.DeliveryTime }}</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同状态" width="80" align="center">
                <template #default="scope">
                  <span class=" text-green-500" v-if="scope.row.BillState == 100">合同生效</span>
                  <span class="text-orange-400" v-else>等待盖章</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="物料清单" align="center" width="80">
                <template #default="scope">
                  <span class="text-blue-600 cursor-pointer" @click="openWindowBillMaterials(scope.row)"><i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>查看</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="分项清单" align="center" width="80">
                <template #default="scope">
                  <span class="text-blue-600 cursor-pointer" @click="openWindowItemizedList(scope.row.SalerName)"><i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>查看</span>
                  <!-- <span class="text-gray-400">未分项</span> -->
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
    <!-- 分项清单 -->
    <ItemizedList :title="itemizedListOpenData.formData.ClientName + '-分项清单'" v-if="itemizedListOpenData.visible" :FormData="itemizedListOpenData.formData" @closeWindow="closeWindowItemizedList($event)" />
    <!-- 物料清单 -->
    <BillMaterials :title="billMaterialsOpenData.formData.ClientName + '-物料确认'" v-if="billMaterialsOpenData.visible" :FormData="billMaterialsOpenData.formData" @closeWindow="closeWindowBillMaterials($event)" />
    <!-- 采购回收站 -->

    <RecyclingStation title="物料回收站" v-if="recyclingStationOpenData.visible" :FormData="recyclingStationOpenData.formData" @closeWindow="closeWindowRecyclingStation($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { GetMaterialBillListPage, PostSetMaterialBillPurchStatusSave } from '/@/api/tech/Material'
import TableSearch from '/@/components/TableSearch/index.vue'
import ItemizedList from './_Components/ItemizedList.vue'
import BillMaterials from './_Components/BillMaterials.vue'
import RecyclingStation from './_Components/RecyclingStation.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import '/@/assets/css/tech.css'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetMaterialBillListPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
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
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
  }
  return {
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    handleSelectionChange
  }
}
export default defineComponent({
  components: {
    TableSearch,
    ItemizedList,
    BillMaterials,
    RecyclingStation
  },
  setup() {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      // 搜索
      CustomerName: '',
      Salesman: '',
      BillState: null,
    })
    const data = reactive({
      tableData: [],
      selectDetails: <any>[],
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }

    // 分项清单
    const itemizedListOpen = (data: any) => {
      let itemizedListOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowItemizedList = (val: any) => {
        itemizedListOpenData.formData = {
          ClientName: val
        }
        console.log(val)
        itemizedListOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowItemizedList = (type: string) => {
        itemizedListOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        itemizedListOpenData,
        openWindowItemizedList,
        closeWindowItemizedList
      }
    }

    // 物料清单
    const billMaterialsOpen = (data: any) => {
      let billMaterialsOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowBillMaterials = (val: any) => {
        billMaterialsOpenData.formData = {
          BillId: val.Id,
          ClientName: val.CustomerName
        }
        billMaterialsOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowBillMaterials = (type: string) => {
        billMaterialsOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        billMaterialsOpenData,
        openWindowBillMaterials,
        closeWindowBillMaterials
      }
    }

    // 采购回收站
    const recyclingStationOpen = (data: any) => {
      let recyclingStationOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowRecyclingStation = (val: any) => {
        recyclingStationOpenData.formData = {}
        recyclingStationOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowRecyclingStation = (type: string) => {
        recyclingStationOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        recyclingStationOpenData,
        openWindowRecyclingStation,
        closeWindowRecyclingStation
      }
    }
    // 采购 0,恢复1，暂缓，2驳回
    const resumeClick = (status: number) => {
      let _text = status == 0 ? '恢复' : status == 1 ? '暂缓' : '驳回'

      if(data.selectDetails.length<=0){
        ElMessage.error('请选择一条记录')
        return false
      }
      if(data.selectDetails.length > 1){
        ElMessage.error('最多选择一条记录')
        return false
      }
      let _Id = data.selectDetails[0].Id
      ElMessageBox.confirm(`确认${_text}此物料单采购？`, `${_text}采购`, {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        PostSetMaterialBillPurchStatusSave(_Id,status).then((res:any) => {
          res.code == 1 ? ElMessage.success(res.message) : ElMessage.error(res.message)
          if (res.code == 1) {
            getData()
          }
        })
      })
    }

    return {
      data,
      form,
      getData,
      Search,
      ...tableRender(form, data),
      ...itemizedListOpen({ data }),
      ...billMaterialsOpen({ data }),
      ...recyclingStationOpen({ data }),
      resumeClick
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
}
</style>
