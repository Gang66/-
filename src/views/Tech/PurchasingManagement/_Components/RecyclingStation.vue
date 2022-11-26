<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4">
      <div class="clearfix">
        <div class="float-left">
          <el-input v-model="form.CustomerName" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
          <el-select v-model="form.ContractStatus" placeholder="合同状态" style="width: 120px" class="mr-4">
            <el-option v-for="item in data.ContractOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
          </el-select>
          <el-input v-model="form.salesman" size="default" placeholder="业务员" style="width: 120px" class="mr-4" />
          <el-button type="primary" @click="search()"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
        </div>
        <div class="float-right">
          <el-button type="success"> <i class="iconfont icon-huifu mr-2"></i> 恢复</el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content">
          <el-table :data="data.recycleList" stripe @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="CreateOn" label="转入时间" width="166" align="center">
              <template #default="scope">{{ scope.row.ConsultTime }}</template>
            </el-table-column>
            <el-table-column prop="Name" label="客户名称" min-width="166">
              <template #default="scope">
                <div class="inline-block">
                  {{ scope.row.ClientName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="业务员" min-width="120">
              <template #default="scope">
                <div class="w-5 h-5 inline-block bg-green-500 text-center text-xs text-white mr-2 leading-5 rounded-md">集</div>
                <!-- <div class="w-5 h-5 inline-block bg-orange-500 text-center text-xs text-white mr-2 leading-5 rounded-md">长</div> -->
                <!-- <div class="w-5 h-5 inline-block bg-blue-500 text-center text-xs text-white mr-2 leading-5 rounded-md">潍</div> -->
                <!-- <div class="w-5 h-5 inline-block bg-cyan-400 text-center text-xs text-white mr-2 leading-5 rounded-md">润</div> -->
                <!-- <div class="w-5 h-5 inline-block bg-red-400 text-center text-xs text-white mr-2 leading-5 rounded-md">成</div> -->
                <!-- <div class="w-5 h-5 inline-block bg-indigo-500 text-center text-xs text-white mr-2 leading-5 rounded-md">南</div> -->
                <!-- <div class="w-5 h-5 inline-block bg-yellow-500 text-center text-xs text-white mr-2 leading-5 rounded-md">济</div> -->
                <span>{{ scope.row.SalerName }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="合同金额" width="140" align="center">
              <template #default="scope">380400000.00</template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="交货期" width="80" align="center">
              <template #default="scope">20</template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="合同状态" width="80" align="center">
              <template #default="scope">
                <span class="text-green-500">合同生效</span>
                <!-- <span class="text-orange-500">等待盖章</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="合同版本" align="center" width="80">
              <template #default="scope">
                <span class="text-blue-500 cursor-pointer">合同预览</span>
              </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="物料清单" align="center">
              <template #default="scope">
                <span class="text-blue-500 cursor-pointer" @click="openWindowMaterials()">预览</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
              <template #default="scope">
                <div>
                  <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-500"></i>
                  <div class="text-blue-500 inline-block cursor-pointer">查看</div>
                </div>
                <!-- <span class="text-gray-400">无</span> -->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
      <!-- 预览物料单 -->
      <Materials title="预览物料单" v-if="materialsOpenData.visible" :FormData="materialsOpenData.formData" @closeWindow="closeWindowMaterials($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import Materials from './Materials.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.recycleList = res.data.records
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
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails)
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    TableSearch,
    Materials
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({})
    const form = reactive({
      CustomerName: '',
      ContractStatus: '',
      salesman: '',
      ContractOptions: [],
      recycleList: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })
    // 预览物料单
    const materialsOpen = (data: any) => {
      let materialsOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowMaterials = (val: any) => {
        materialsOpenData.formData = {}
        materialsOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowMaterials = (type: string) => {
        materialsOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        materialsOpenData,
        openWindowMaterials,
        closeWindowMaterials
      }
    }

    return {
      boxStyle,
      closeWindow,
      data,
      form,
      ...tableRender(form, data),
      ...materialsOpen({ data })
    }
  }
})
</script>
<style lang="postcss" scoped></style>
