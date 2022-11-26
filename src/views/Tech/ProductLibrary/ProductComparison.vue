<template>
  <div class="Tech_ProductLibrary_ProductComparison">
    <div class="bg-white rounded-lg relative">
      <div class="">
        <div class="h-44 BackgroundImage rounded-t-xl">
          <div class="text-center text-5xl font-bold pt-10 text-white">
            <p>供货商报价对比统计表</p>
            <p class="text-xl mt-4">Statistical table of supplier quotation comparison</p>
          </div>
        </div>
        <div class="inline-block p-5 pb-3">
          <el-input v-model="data.kehuInput" placeholder="输入客户名称或产品类别/材质找产品" class="input-with-select mr-5" style="width: 400px" size="large"> </el-input>
          <el-date-picker v-model="data.value2" type="daterange" unlink-panels range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" :shortcuts="shortcuts" size="large" style="width: 250px" />
          <el-button type="primary" class="ml-5" :icon="Search">查询</el-button>
        </div>
        <div class="w-24 h-8 inline-block text-blue-500" @click="data.drawer = true">
          <i class="iconfont icon-shaixuan mr-1"></i>
          <span class="cursor-pointer">高级筛选</span>
        </div>
        <div class="h-11 pt-2 px-4">
          <div class="inline-block text-gray-400 text-xs">已选条件：</div>
          <el-tag v-for="item in data.tags" :key="item.name" class="mx-1" :type="item.type" effect="plain" closable>
            {{ item.name }}
          </el-tag>
          <div class="inline-block text-blue-600 text-xs ml-2 cursor-pointer">清除筛选</div>
        </div>
        <div class="h-11">
          <div class="w-800 inline-block">
            <el-menu :default-active="data.activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
              <el-menu-item index="1">综合排序</el-menu-item>
              <el-menu-item index="2">报价次数</el-menu-item>
              <el-menu-item index="3">成交数量</el-menu-item>
              <el-sub-menu index="4">
                <template #title>综合等级</template>
                <el-menu-item index="4-1">A级：极好</el-menu-item>
                <el-menu-item index="4-2">B级：满意</el-menu-item>
                <el-menu-item index="4-3">C级：一般</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="5">
                <template #title>主营类别</template>
                <el-menu-item index="5-1">A级：极好</el-menu-item>
                <el-menu-item index="5-2">B级：满意</el-menu-item>
                <el-menu-item index="5-3">C级：一般</el-menu-item>
              </el-sub-menu>
              <el-sub-menu index="6">
                <template #title>信用等级</template>
                <el-menu-item index="6-1">A级：优秀</el-menu-item>
                <el-menu-item index="6-2">B级：良好</el-menu-item>
                <el-menu-item index="6-3">C级：极差</el-menu-item>
              </el-sub-menu>
              <!-- <el-menu-item index="5">Info</el-menu-item> -->
              <!-- <el-menu-item index="6">Orders</el-menu-item> -->
            </el-menu>
          </div>
          <div class="float-right inline-block mr-4 text-gray-400 text-sm mt-3">
            <span>共3552个相关产品</span>
          </div>
        </div>
      </div>

      <!-- 高级筛选 -->
      <AdvancedFiltering v-model="data.drawer" />
    </div>
    <!-- #region   表格-->

    <div class="bg-white rounded-lg p-6 pt-3 mt-5">
      <div class="bf-table-content">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <el-table
            :data="tableData"
            :border="true"
            style="width: 100%"
            :header-cell-style="{
              background: '#eef1f6',
              color: '#606266'
            }"
          >
            <el-table-column type="expand">
              <template #default="props">
                <div m="4" class="neizhi_table bg-blue-100">
                  <el-table :data="props.row.family" :show-header="false" :highlight-current-row="false">
                    <el-table-column type="index" label="序号" width="54" align="center" />
                    <el-table-column label="Name" prop="name" min-width="440">
                      <template #default="scope">
                        <div class="w-full">
                          <span>【使用温度：≤80℃】【介质：蒸汽】</span>
                        </div>
                        <el-tooltip class="box-item" effect="dark" content="报价时间 2022-07-19" placement="top"> </el-tooltip>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="A报价" align="center" width="100">
                      <template #default="scope">
                        <div class="text-sm">
                          <p>￥1620.00</p>
                          <p class="text-gray-400">露光阀门</p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Absenteeism" label="B报价" align="center" width="100">
                      <template #default="scope">
                        <div class="text-sm">
                          <p>￥1620.00</p>
                          <p class="text-gray-400">露光阀门</p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Leave" label="C报价" align="center" width="100">
                      <template #default="scope">
                        <div class="text-sm">
                          <p>￥1620.00</p>
                          <p class="text-gray-400">露光阀门</p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Leave" label="D报价" align="center" width="100">
                      <template #default="scope">
                        <div class="text-sm">
                          <p>￥1620.00</p>
                          <p class="text-gray-400">露光阀门</p>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="Leave" label="E报价" align="center" width="100">
                      <template #default="scope">
                        <div class="text-sm">
                          -
                          <!-- <p>￥1620.00</p>
                    <p class="text-gray-400">露光阀门</p> -->
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column label="采购供应商" prop="name" width="120" align="center">
                      <template #default="scope">
                        <span>龙丰阀门</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="采购价格" prop="name" align="center">
                      <template #default="scope">
                        <span>￥1525.00</span>
                      </template>
                    </el-table-column>
                    <el-table-column label="采购次数" prop="name" align="center">
                      <template #default="scope">
                        <span class="text-blue-500 cursor-pointer" @click="data.ProductComparison = true">2次</span>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="产品信息" prop="date" min-width="440">
              <template #default="scope">
                <div class="w-full inline-block">
                  <div>
                    <span class="mr-2">先导活塞式减压阀 </span>
                    <span class="mr-2"> Y43H-16C</span>
                    <span class="mr-2"> DN80</span>
                    <span> 非常规常用</span>
                    <span class="p-1 bg-red-200 text-red-400 rounded text-xs ml-2">体</span>
                    <span class="p-1 bg-blue-200 text-blue-400 rounded text-xs ml-2">配</span>
                  </div>
                  <div>
                    <span class="text-xs text-blue-400">【二级】【压力：1.6MPa】【材质：铸钢】【使用温度：≤80℃】【连接形式：法兰】【介质：蒸汽】</span>
                  </div>
                </div>
              </template>
            </el-table-column>

            <el-table-column prop="" label="报价明细" align="center">
              <el-table-column prop="" label="A报价" align="center" width="100">
                <template #default="scope">
                  <div class="text-sm">
                    <p>￥1620.00</p>
                    <p class="text-gray-400">露光阀门</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Absenteeism" label="B报价" align="center" width="100">
                <template #default="scope">
                  <div class="text-sm">
                    <p>￥1620.00</p>
                    <p class="text-gray-400">露光阀门</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Leave" label="C报价" align="center" width="100">
                <template #default="scope">
                  <div class="text-sm">
                    <p>￥1620.00</p>
                    <p class="text-gray-400">露光阀门</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Leave" label="D报价" align="center" width="100">
                <template #default="scope">
                  <div class="text-sm">
                    <p>￥1620.00</p>
                    <p class="text-gray-400">露光阀门</p>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Leave" label="E报价" align="center" width="100">
                <template #default="scope">
                  <div class="text-sm">
                    -
                    <!-- <p>￥1620.00</p>
                    <p class="text-gray-400">露光阀门</p> -->
                  </div>
                </template>
              </el-table-column>
            </el-table-column>
            <el-table-column label="采购供应商" prop="name" width="120" align="center">
              <template #default="scope">
                <span>龙丰阀门</span>
              </template>
            </el-table-column>
            <el-table-column label="采购价格" prop="name" align="center">
              <template #default="scope">
                <span>￥1525.00</span>
              </template>
            </el-table-column>
            <el-table-column label="采购次数" prop="name" align="center">
              <template #default="scope">
                <span class="text-blue-500 cursor-pointer" @click="data.ProductComparison = true">2次</span>
              </template>
            </el-table-column>
          </el-table>
        </table-search>
      </div>
    </div>

    <!-- #endregion -->
    <!--  -->
    <ProductComparisonTimes v-model="data.ProductComparison" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { Search } from '@element-plus/icons-vue'
import AdvancedFiltering from '../SupplierManagement/_Components/AdvancedFiltering.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { parseTime } from '/@/utils/tools'
import { GetPageList } from '/@/api/tech/EnquiryData'
import ProductComparisonTimes from './_Components/ProductComparisonTimes.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetPageList(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data
      //   data.tableData = res.data.records
      //   data.PathList
      //   form.totals = res.data.totals
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
    AdvancedFiltering,
    TableSearch,
    ProductComparisonTimes
  },

  setup() {
    const tableData = [
      {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
          {
            name: 'Jerry',
            state: 'California'
          },
          {
            name: 'Spike',
            state: 'California'
          },
          {
            name: 'Tyke',
            state: 'California'
          }
        ]
      },
      {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'San Francisco',
        address: '3650 21st St, San Francisco',
        zip: 'CA 94114',
        family: [
          {
            name: 'Jerry',
            state: 'California'
          },
          {
            name: 'Spike',
            state: 'California'
          },
          {
            name: 'Tyke',
            state: 'California'
          }
        ]
      },
      {
        date: '2016-05-04',
        name: 'Tom',
        state: 'California',
        family: [
          {
            name: 'Jerry',
            state: 'California'
          },
          {
            name: 'Spike',
            state: 'California'
          },
          {
            name: 'Tyke',
            state: 'California'
          }
        ]
      },
      {
        name: 'Tom',
        state: 'California',
        family: [
          {
            name: 'Jerry',
            state: 'California'
          },
          {
            name: 'Spike',
            state: 'California'
          },
          {
            name: 'Tyke',
            state: 'California'
          }
        ]
      },
      {
        name: 'Tom',
        state: 'California',
        family: [
          {
            name: 'Jerry',
            state: 'California'
          },
          {
            name: 'Spike',
            state: 'California'
          },
          {
            name: 'Tyke',
            state: 'California'
          }
        ]
      },
      {
        name: 'Tom',
        state: 'California',
        family: [
          {
            name: 'Jerry',
            state: 'California'
          },
          {
            name: 'Spike',
            state: 'California'
          },
          {
            name: 'Tyke',
            state: 'California'
          }
        ]
      },
      {
        name: 'Tom',
        state: 'California',
        family: [
          {
            name: 'Jerry',
            state: 'California'
          },
          {
            name: 'Spike',
            state: 'California'
          },
          {
            name: 'Tyke',
            state: 'California'
          }
        ]
      }
    ]
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })
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
    const data = reactive({
      ProductComparison: false,
      // 右侧弹出层
      drawer: false,
      value2: '',
      kehuInput: '',
      // 综合排序
      activeIndex: '1',
      // 已选条件数据
      tags: [
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: '产品类别：闸阀', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' },
        { name: 'Tag 3', type: 'info' }
      ]
    })

    //
    const handleSelect = () => {}

    return {
      data,
      handleSelect,
      Search,
      shortcuts,
      form,
      ...tableRender(form, data),
      tableData
    }
  }
})
</script>

<style lang="postcss" scoped>
.Tech_ProductLibrary_ProductComparison {
  .BackgroundImage {
    background-image: url('/@/assets/img/tech/gonghuo.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .neizhi_table {
    :deep(.el-table__row) {
      --tw-bg-opacity: 1;
      background-color: rgba(239, 246, 255, var(--tw-bg-opacity));
    }
    :deep(.el-table .el-table__cell) {
      /* padding: 0 0; */
    }
  }
}
</style>
