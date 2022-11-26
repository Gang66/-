<template>
  <div class="Tec_ContractApproval">
    <!-- 合约管理 -->
    <div class="bg-white relative">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix pb-1">
        <el-input v-model="form.NameInput" size="default" placeholder="客户名称" style="width: 200px" class="mr-4" />
        <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 300px" />
        <el-button type="primary" class="ml-4" :icon="Search" @click="search">查询</el-button>
        <el-button> <i class="iconfont icon-daochu mr-2"></i> 导出数据</el-button>
        <div class="float-right mt-px">
          <el-button type="primary" class="ml-4">预览合同</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="生效时间" align="center" min-width="166">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="DepartName" label="业务员" width="80" align="center">
                <template #default="scope">{{ scope.row.SalerName }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" min-width="240">
                <template #default="scope">
                  <div class="inline-block">
                    {{ scope.row.ClientName }}
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" align="center" width="100">
                <template #default="scope">3804000</template>
              </el-table-column>
              <el-table-column prop="" label="付款方式" align="center">
                <el-table-column prop="" label="预付款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span class="">8500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Absenteeism" label="发货款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>153500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="到货款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>33333.33</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="验收款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>1555555</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="质保金" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <!-- <span>11744</span> -->
                      <span>-</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="WorkAge" label="已回款额" align="center" width="100">
                <template #default="scope">
                  <span class="text-sm">38000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="回款比率" align="center" width="80">
                <template #default="scope">
                  <span class="text-sm">30%</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="逾期金额" align="center" min-width="100">
                <template #default="scope">
                  <span class="text-sm">-100000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="坏账金额" align="center" min-width="100">
                <template #default="scope">
                  <span class="text-sm">100000</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                <template #default="scope">
                  <!-- <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div>
                  </div> -->
                  <span class="text-gray-400">无</span>
                </template>
              </el-table-column>
            </el-table>
            <el-table :data="data.tableData2" stripe @selection-change="handleSelectionChange" :show-header="false">
              <el-table-column prop="WorkAge" label="合同金额" align="center" width="590">
                <template #default="scope">本表合计</template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="合同金额" align="center" width="100">
                <template #default="scope">3804000</template>
              </el-table-column>
              <el-table-column prop="" label="付款方式" align="center">
                <el-table-column prop="" label="预付款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span class="">8500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Absenteeism" label="发货款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>153500</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="到货款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>33333.33</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="验收款" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <span>1555555</span>
                      <!-- <span>-</span> -->
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="Leave" label="质保金" align="center" width="90">
                  <template #default="scope">
                    <div class="text-sm">
                      <!-- <span>11744</span> -->
                      <span>-</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table-column>
              <el-table-column prop="WorkAge" label="已回款额" align="center" width="100">
                <template #default="scope">
                  <span class="text-sm">38000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="回款比率" align="center" width="80">
                <template #default="scope">
                  <span class="text-sm">30%</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="逾期金额" align="center" min-width="100">
                <template #default="scope">
                  <span class="text-sm">-100000</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="坏账金额" align="center" min-width="100">
                <template #default="scope">
                  <span class="text-sm">100000</span>
                </template>
              </el-table-column>
              <el-table-column prop="RecruitChannel" label="沟通记录" align="center" width="80">
                <template #default="scope">
                  <!-- <div>
                    <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                    <div class="text-blue-600 inline-block cursor-pointer" @click="openWindowRejectOrder(scope.row)">查看</div>
                  </div> -->
                  <span class="text-gray-400">无</span>
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
      NameInput: '',
      TimeValue: ''
    })
    const data = reactive({
      tableData1: [{ value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }, { value: 1 }],
      tableData2: [{ value: 1 }, { value: 1 }],
      // 表格数据
      tableData: [],
      shortcuts: [
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
.zong {
  width: 1410px;
  .sum1 {
    width: 100px;
  }
  .sum2 {
    width: 90px;
  }
  .sum3 {
    width: 80px;
  }
}
</style>
