<template>
  <div class="Tec_ContractApproval">
    <!-- #region  四个计数-->
    <div class="inquiry_components_totalwages">
      <div class="mb-3 mt-3">
        <el-row :gutter="20">
          <!-- 客户总数 -->
          <el-col :md="24" :lg="6">
            <div class="inquiry_big_bg bg-blue-400 grid-content ep-bg-purple rounded-xl">
              <div class="float-left text-white ml-8 mt-8">
                <p class="text-2xl font-semibold">300000</p>
                <p>客户总数（个）</p>
              </div>
              <i class="iconfont icon-qunzu float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
            </div>
          </el-col>
          <!-- 最新增加客户数 -->
          <el-col :md="24" :lg="6">
            <div class="inquiry_big_bg bg-orange-400 rounded-xl">
              <div class="float-left text-white ml-8 mt-8">
                <p class="text-2xl font-semibold">100</p>
                <p>最新增加客户数（个）</p>
              </div>
              <i class="iconfont icon-kehu float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
            </div>
          </el-col>
          <!-- 成交总额 -->
          <el-col :md="24" :lg="6">
            <div class="inquiry_big_bg bg-green-400 grid-content ep-bg-purple rounded-xl">
              <div class="float-left text-white ml-8 mt-8">
                <p class="text-2xl font-semibold">320000</p>
                <p>成交总额（元）</p>
              </div>
              <i class="iconfont icon-qiandai float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
            </div>
          </el-col>
          <!-- 合同总欠款 -->
          <el-col :md="24" :lg="6">
            <div class="inquiry_big_bg bg-red-400 rounded-xl">
              <div class="float-left text-white ml-8 mt-8">
                <p class="text-2xl font-semibold">1000000000.00</p>
                <p>合同总欠款（元）</p>
              </div>
              <i class="iconfont icon-jiage float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- #endregion -->
    <!-- 客户管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">客户管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-4 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-date-picker class="align-bottom mr-4" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 240px" />
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" />
        <el-select v-model="form.QueryTypeId" placeholder="查询类型" style="width: 120px" class="ml-4">
          <el-option v-for="item in data.QueryTypeList" :key="item.Id" :label="item.Name" :value="item.Id" />
        </el-select>
        <el-input v-model="form.SalesmanInput" size="default" placeholder="业务员" style="width: 100px" class="ml-4 mr-4" />
        <el-button type="primary" :icon="Search" @click="search">查询</el-button>
        <div class="float-right mt-px">
          <el-button type="primary"> <i class="iconfont icon-chuangjian mr-2"></i>新增客户</el-button>
          <el-button type="danger"><i class="iconfont icon-mxjl mr-2"></i>协作支援</el-button>
          <el-button type="warning"><i class="iconfont icon-dingdan8 mr-2"></i>取消协作</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="创建时间" width="166" align="center">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="166">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="100" align="center">
                <template #default="scope">
                  <span>{{ scope.row.SalerName }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="等级" align="center">
                <template #default="scope">
                  <span>50强</span>
                  <!-- <span>-</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="行业" align="center">
                <template #default="scope">
                  <!-- <span>组织管理</span> -->
                  <span>-</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="区域" min-width="166px" align="center">
                <template #default="scope">
                  <span>北京北京市东城区</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="联系人信息" min-width="200" align="center">
                <template #default="scope">
                  <!-- <span>无</span> -->
                  <div>
                    <div class="text-orange-400 inline-block">
                      决
                      <div class="w-5 h-5 bg-orange-400 inline-block rounded-full"><span class="text-white text-xs">2</span></div>
                    </div>
                    <div class="text-blue-400 inline-block">
                      决
                      <div class="w-5 h-5 bg-blue-400 inline-block rounded-full"><span class="text-white text-xs">0</span></div>
                    </div>
                    <div class="text-green-400 inline-block">
                      决
                      <div class="w-5 h-5 bg-green-400 inline-block rounded-full"><span class="text-white text-xs">12</span></div>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="诉讼情况" align="center">
                <template #default="scope">
                  <!-- <span>无</span> -->
                  <span class="text-blue-500">25个项目</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="操作" align="center">
                <template #default="scope">
                  <span class="text-red-500">未校准</span>
                  <!-- <span class="text-green-500">已校准</span> -->
                  <!-- <span class="text-blue-500">审批中</span> -->
                  <!-- <span class="text-blue-500">已校准</span> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import '/@/assets/css/tech.css'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEnquiryOrderPage(form).then((res) => {
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
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
    // console.log(data.selectDetails[0].Id)
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
    handleSelectionChange,
    parseTimeEvent
    // GetOverTimeLists,
    // GetBeOverTimeLists
  }
}
export default defineComponent({
  components: {
    TableSearch
  },
  setup() {
    const shortcuts = [
      {
        text: '最近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '最近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: '最近三个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        }
      }
    ]
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: '',
      QueryTypeId: null,
      TimeValue: '',
      NameInput: '',
      SalesmanInput: ''
    })
    const data = reactive({
      QueryTypeList: [
        { Name: '标准状态', Id: '1' },
        { Name: '企业等级', Id: '2' },
        { Name: '当前状态', Id: '3' }
      ]
    })
    //获取数据
    const getData = () => {
      renderTableList(form, data)
    }
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      shortcuts
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tec_ContractApproval {
  .inquiry_components_totalwages {
  }
}
</style>
