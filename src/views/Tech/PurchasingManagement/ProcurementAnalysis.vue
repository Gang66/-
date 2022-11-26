<template>
  <div class="Tech_OrderAllocationManagementTable">
    <el-tabs type="border-card" class="OrderAllocationManagementTable-tabs">
      <el-tab-pane label="成本分析">
        <div class="absolute right-4 -top-9">
          <el-radio-group v-model="form.State" @change="allWait()" size="small">
            <el-radio-button :label="0">统计</el-radio-button>
            <el-radio-button :label="1">成本分析</el-radio-button>
          </el-radio-group>
        </div>
        <!-- #region   成本分析统计-->
        <div class="bg-white pl-1 pr-1 pt-1 relative" v-if="form.State == 0">
          <!-- 搜索框 -->
          <div class="ConsultationList-dow-query clearfix pb-2">
            <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
            <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
          </div>
          <!-- 表格 -->
          <div class="pb-4">
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                <el-table-column prop="CompName" label="部门" align="center">
                  <template #default="scope">{{ scope.row.CompName }}</template>
                </el-table-column>
                <el-table-column prop="RecruitChannel" label="采购产品数（件）" align="center">
                  <template #default="scope">
                    <span>0</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="采购金额（元）" align="center">
                  <template #default="scope">
                    <div>
                      <span>380000</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="DepartName" label="采购合同数（件）" align="center">
                  <template #default="scope">
                    <span>100000000</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="对应销售金额（元）" align="center">
                  <template #default="scope">
                    <span>1000000000</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="利润比" align="center">
                  <template #default="scope">
                    <span>200</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-white pl-1 pr-1 pt-1 relative">
            <!-- 搜索框 -->
            <div class="ConsultationList-dow-query clearfix pb-2">
              <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
              <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
            </div>
            <!-- 表格 -->
            <div class="pb-4">
              <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                <div class="bf-table-content">
                  <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="index" label="序号" width="54" align="center" />
                    <el-table-column prop="Name" label="订单编号" width="140" align="center">
                      <template #default="scope">
                        <span>QP2207230001</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="采购员" width="90" align="center">
                      <template #default="scope">
                        <span>刘某某</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="供应商" align="center">
                      <template #default="scope">
                        <span>山东鼎创建筑工程有限公司</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="DepartName" label="销售客户" align="center">
                      <template #default="scope">
                        <span>山东普利园林工程有限公司平阴分公司</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="销售金额" width="140" align="center">
                      <template #default="scope">
                        <span>1000000000</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="采购金额" width="120" align="center">
                      <template #default="scope">
                        <span>200000000</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="提成费" width="120" align="center">
                      <template #default="scope">
                        <span>2000000</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="物流费" align="center" width="120">
                      <template #default="scope">
                        <span>2000000000</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </table-search>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </el-tab-pane>
      <el-tab-pane label="比价分析表">
        <div class="absolute right-4 -top-9">
          <el-radio-group v-model="form.State2" @change="allWait2()" size="small">
            <el-radio-button :label="0">统计</el-radio-button>
            <el-radio-button :label="1">比价分析</el-radio-button>
          </el-radio-group>
        </div>
        <!-- #region   比价分析表-->
        <div class="bg-white pl-1 pr-1 pt-1 relative" v-if="form.State2 == 0">
          <!-- 搜索框 -->
          <div class="ConsultationList-dow-query clearfix pb-2">
            <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
            <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
          </div>
          <!-- 表格 -->
          <div class="pb-4">
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                <el-table-column prop="CompName" label="部门" align="center">
                  <template #default="scope">{{ scope.row.CompName }}</template>
                </el-table-column>
                <el-table-column prop="RecruitChannel" label="产品种类/数量" align="center">
                  <template #default="scope">
                    <span>2000</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="报价总数" align="center">
                  <template #default="scope">
                    <span>300</span>
                  </template>
                </el-table-column>
                <el-table-column prop="DepartName" label="单次报价供应商数量" align="center">
                  <template #default="scope">
                    <span>10000</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="多次报价供应商数量" align="center">
                  <template #default="scope">
                    <span>10000</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="单产品均比价数" align="center">
                  <template #default="scope">
                    <span>2000</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="单产品均比价供应商" align="center">
                  <template #default="scope">
                    <span>单产品均比价供应商</span>
                  </template>
                </el-table-column>
                <el-table-column prop="RecruitChannel" label="操作" align="center">
                  <template #default="scope">
                    <span>新增供应商</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-white pl-1 pr-1 pt-1 relative">
            <!-- 搜索框 -->
            <div class="ConsultationList-dow-query clearfix pb-2">
              <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
              <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
            </div>
            <!-- 表格 -->
            <div class="pb-4">
              <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                <div class="bf-table-content">
                  <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="index" label="序号" width="54" align="center" />
                    <el-table-column prop="Name" label="订单编号" width="140" align="center">
                      <template #default="scope">
                        <span>QP2207230001</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="产品名称" align="center">
                      <template #default="scope">
                        <span>产品名称</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="供应商" min-width="160" align="center">
                      <template #default="scope">
                        <div>
                          <span>供甲天下（济南）文化传媒有限公司应商</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="DepartName" label="申请人" width="100" align="center">
                      <template #default="scope">
                        <span>桂某某</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="归属合同" align="center">
                      <template #default="scope">
                        <span>归属合同</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="采购金额/数量" align="center">
                      <template #default="scope">
                        <span>采购金额/数量</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="报价次数" align="center">
                      <template #default="scope">
                        <span>报价次数</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="最低报价" align="center">
                      <template #default="scope">
                        <span>最低报价</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="降价次数/金额" align="center">
                      <template #default="scope">
                        <span>降价次数/金额</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="利润比" align="center">
                      <template #default="scope">
                        <span>利润比</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </table-search>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </el-tab-pane>
      <el-tab-pane label="物流分析表">
        <div class="absolute right-4 -top-9">
          <el-radio-group v-model="form.State3" @change="allWait3()" size="small">
            <el-radio-button :label="0">统计</el-radio-button>
            <el-radio-button :label="1">物流分析</el-radio-button>
          </el-radio-group>
        </div>
        <!-- #region   比价分析表-->
        <div class="bg-white pl-1 pr-1 pt-1 relative" v-if="form.State3 == 0">
          <!-- 搜索框 -->
          <div class="ConsultationList-dow-query clearfix pb-2">
            <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
            <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
          </div>
          <!-- 表格 -->
          <div class="pb-4">
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                <el-table-column prop="CompName" label="部门" align="center">
                  <template #default="scope">{{ scope.row.CompName }}</template>
                </el-table-column>
                <el-table-column prop="RecruitChannel" label="应发物流/单" align="center">
                  <template #default="scope">
                    <span>应发物流/单</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="在途物流/单" align="center">
                  <template #default="scope">
                    <span>在途物流/单</span>
                  </template>
                </el-table-column>
                <el-table-column prop="DepartName" label="应到物流/单" align="center">
                  <template #default="scope">
                    <span>应到物流/单</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="实到物流/单" align="center">
                  <template #default="scope">
                    <span>实到物流/单</span>
                  </template>
                </el-table-column>
                <el-table-column prop="WorkAge" label="准时到达率" align="center">
                  <template #default="scope">
                    <span>准时到达率</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div v-else>
          <div class="bg-white pl-1 pr-1 pt-1 relative">
            <!-- 搜索框 -->
            <div class="ConsultationList-dow-query clearfix pb-2">
              <el-date-picker class="align-bottom" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 324px" />
              <el-button type="primary" class="ml-4" @click="search"> <i class="iconfont icon-huntfor mr-2"></i> 查询</el-button>
            </div>
            <!-- 表格 -->
            <div class="pb-4">
              <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
                <div class="bf-table-content">
                  <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="50" align="center" />
                    <el-table-column type="index" label="序号" width="54" align="center" />
                    <el-table-column prop="Name" label="订单编号" width="140" align="center">
                      <template #default="scope">
                        <span>QP2207230001</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="客户名称" align="center">
                      <template #default="scope">
                        <span>甲天下（济南）文化传媒有限公司</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="供应商" align="center">
                      <template #default="scope">
                        <div>
                          <span>甲天下（济南）文化传媒有限公司</span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="DepartName" label="发货类型" width="100" align="center">
                      <template #default="scope">
                        <span>物流中转</span>
                        <!-- <span>专车送货</span> -->
                        <!-- <span>包车送货</span> -->
                        <!-- <span>客户自提</span> -->
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="应到数量" width="140" align="center">
                      <template #default="scope">
                        <span>1000000</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="在途数量" width="140" align="center">
                      <template #default="scope">
                        <span>2000</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="WorkAge" label="实到数量" width="140" align="center">
                      <template #default="scope">
                        <span>1000000</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="RecruitChannel" label="准时率" align="center" width="80">
                      <template #default="scope">
                        <span>准时率</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </table-search>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import '/@/assets/css/tech.css'
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
    // form.page = 1
    renderTableList(form, data)
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
  }
}

export default defineComponent({
  components: { TableSearch },
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
      TimeValue: '',
      State: 0, //统计
      State2: 0, //统计
      State3: 0 //统计
    })
    const data = reactive({
      tableData: []
    })
    // 统计  成本分析切换
    const allWait = () => {
      renderTableList(form, data)
    }
    // 统计  成本分析切换
    const allWait2 = () => {
      renderTableList(form, data)
    }
    // 统计  成本分析切换
    const allWait3 = () => {
      renderTableList(form, data)
    }

    onMounted(() => {})
    return {
      data,
      form,
      allWait,
      allWait2,
      allWait3,
      shortcuts,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tech_OrderAllocationManagementTable {
  :deep(.OrderAllocationManagementTable-tabs) {
    .el-tabs__content {
      overflow: initial;
    }
  }
}
</style>
