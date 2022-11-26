<template>
  <div class="tech_historical_quotation_markup_record_drawer">
    <el-drawer size="34%" v-model="visibleDrawer" @close="closeDrawer" :with-header="true" custom-class="bf-drawer">
      <template v-slot:header>
        <div class="bg-slate-100 p-3">
          <p class="iconfont icon-jiage inline-block"></p>
          <span class="ml-2">加价记录</span>
        </div>
      </template>
      <!-- #region  表格-->
      <div class="ml-4 mr-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" :isAdvancedSearch="false">
          <div class="bf-table-content">
            <el-table :data="data.tableData">
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="Name" label="加价时间" min-width="200" align="center">
                <template #default="scope">
                  <div class="inline-block">{{ scope.row.CreateOn }}</div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="最低价" align="center">
                <template #default="scope">{{ scope.row.AllMinimum }}</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="技术价" align="center">
                <template #default="scope">
                  <span>{{ scope.row.AllTechAdvancePrice }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="PostName" label="一键操作" align="center">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer" @click="useList(scope.$index)">一键使用</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
      <!-- #endregion -->
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch, nextTick } from 'vue'
import { GetTechAdvancePriceLogPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage } from 'element-plus'

// 列表数据请求
const renderTableList = async (form: any, data: any, SendMessage: any) => {
  await GetTechAdvancePriceLogPage(form)
    .then((res) => {
      if (res.code == 1) {
        let _tableData = res.data.records
        _tableData.forEach((item:any) => {
          let _DetailData = JSON.parse(item.DetailJson)
          let _AllCost = 0 // 成本价
          let _AllMinimum = 0 //最低价
          let _AllAccountAdvancePrice = 0 // 核算成本
          let _AllTechAdvancePrice = 0 // 技术成本
          console.log(_DetailData, 1414)
          if(_DetailData.length > 0) {
            _DetailData.forEach((row:any)=>{
              _AllCost += Number(row.CostPrice) * Number(row.ProductQuantity)
              _AllMinimum += Number(row.CostPrice) * Number(row.ProductQuantity)
              _AllAccountAdvancePrice += Number(row.OldPrice) * Number(row.ProductQuantity)
              _AllTechAdvancePrice += Number(row.NewPrice) * Number(row.ProductQuantity)
            })
          }
          item.DetailData = _DetailData
          item.AllCost = _AllCost
          item.AllMinimum = _AllMinimum
          item.AllAccountAdvancePrice = _AllAccountAdvancePrice
          item.AllTechAdvancePrice = _AllTechAdvancePrice
        })
        
        data.tableData = _tableData
        console.log(data.tableData, 222)
        form.totals = res.data.totals

        if (data.isFirst) {
          SendMessage(0, 0)
        }
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch((e) => {
      console.log(`GetPageList${e}`)
    })
}

export default defineComponent({
  components: {
    TableSearch
  },
  emits: ['closeDrawer', 'SendCost'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    FormData: {
      type: Object,
      default: {
        EnquiryDataId: 0
      }
    }
  },
  setup(props, context) {
    const visibleDrawer = ref(false)
    const data = reactive({
      tableData: <any>[],
      isFirst: true,
    })
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      id: 0,
      totals: 0
    })

    // 关闭抽屉
    const closeDrawer = () => {
      context.emit('closeDrawer')
    }

    // 探听开关
    watch(props, (newData, oldData) => {
      visibleDrawer.value = newData.visible
    })

    // index:索引 type：0第一次进入，1一键获取
    const SendMessage = (index: number, type: number) => {
      // 向父组件传非同比例及成本金额
      let _value = <any>{
        AllCost: 0,
        AllMinimum: 0,
        AllAccountAdvancePrice: 0,
        AllTechAdvancePrice: 0,
        InstallRate: 0,
        PackRate: 0,
        UrgentRate: 0,
        DetailData: []
      }
      
      if (data.tableData.length > 0){
        _value.AllCost = data.tableData[index].AllCost
        _value.AllMinimum = data.tableData[index].AllMinimum
        _value.AllAccountAdvancePrice = data.tableData[index].AllAccountAdvancePrice
        _value.AllTechAdvancePrice = data.tableData[index].AllTechAdvancePrice
        _value.InstallRate = data.tableData[index].InstallRate
        _value.PackRate = data.tableData[index].PackRate
        _value.UrgentRate = data.tableData[index].UrgentRate
        _value.DetailData = data.tableData[index].DetailData
        context.emit('SendCost', _value)
      }
      data.isFirst = false

      if (type == 1){
        closeDrawer()
      }
    }

    // 一键使用
    const useList = (index:any) => {
      SendMessage(index, 1)
    }

    onMounted(()=>{
      nextTick(()=>{
        form.id = props.FormData.EnquiryDataId
        renderTableList(form, data, SendMessage)
      })
    })

    return {
      data,
      form,
      visibleDrawer,
      SendMessage,
      useList,
      closeDrawer
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_historical_quotation_markup_record_drawer {
}
</style>
