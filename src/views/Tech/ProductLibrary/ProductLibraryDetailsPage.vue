<template>
  <div class="tech_ProductLibrary_ProductLibraryDetailsPage">
    <div class="flex rounded-2xl">
      <div class="w-4/6 bg-white mr-5 flex rounded-lg">
        <div class="w-2/5 p-6">
          <el-image class="rounded-lg h-80" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
          <p class="text-sm ml-2 mt-2">安全阀 A42H-16P DN100</p>
          <div class="mt-2">
            <el-tag class="ml-2" size="small" type="info"><span class="text-xs">客户产品名称</span></el-tag>
            <el-tag class="ml-2" size="small" type="info"><span class="text-xs">客户产品名称</span></el-tag>
          </div>
        </div>
        <!-- #region   产品参数 -->
        <div class="w-3/5">
          <div class="w-4/4 product mt-6 mr-5 rounded-lg mb-5">
            <div class="h-10 bg-blue-400 rounded-t-lg text-center text-white leading-10">
              <p>- 产 品 参 数 -</p>
            </div>
            <table class="main-table" cellspacing="0" cellpadding="0">
              <div :class="data.isfo ? '' : 'yinc'">
                <tr v-for="item in 15">
                  <td class="w-32 text-center bg-blue-50">
                    <span class="float-right mr-3 text-sm">密封密封</span>
                  </td>
                  <td class="canshu">
                    <span class="ml-3 text-sm">阀体直接加工阀体直接加工</span>
                  </td>
                </tr>
              </div>
            </table>
            <div class="h-10 bg-yellow-300 rounded-b-lg text-center leading-10">
              <p @click="zhanshi">展示更多/隐藏部分</p>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </div>
      <!-- #region   销量统计 -->
      <div class="w-460 xiaoliang bg-white inline-block rounded-lg">
        <p class="text-sm text-gray-400 p-5 pb-2">销量统计</p>

        <div class="w-11/12 m-auto h-32 flex text-center">
          <div class="w-1/3 h-32 mr-3">
            <p class="text-sm text-gray-400 mt-3">累计成交客户数</p>
            <p class="text-2xl mt-3">5,763</p>
          </div>
          <div class="w-1/3 h-32 mr-3">
            <p class="text-sm text-gray-400 mt-3">累计成交客户数</p>
            <p class="text-2xl mt-3">32</p>
            <p class="text-gray-400 text-sm mt-3">同比 0.30% <i class="text-red-500 iconfont icon-shangsheng"></i></p>
          </div>
          <div class="w-1/3 h-32 mr-3">
            <p class="text-sm text-gray-400 mt-3">近30日成交客户数</p>
            <p class="text-2xl mt-3">163</p>
            <p class="text-gray-400 text-sm mt-3">同比 -2.44% <i class="text-green-500 iconfont icon-xiajiang"></i></p>
          </div>
        </div>
        <!-- 柱状图 -->
        <div class="">
          <ProductLibraryDetailsPageHistogram />
        </div>
      </div>
      <!-- #endregion -->
    </div>

    <!-- #region   合作供应商 -->
    <div class="bg-white mt-5 rounded">
      <p class="p-3 pl-6">合作供应商</p>
      <div class="line bg-gray-200 relative">
        <div class="w-20 line_1 absolute left-6 bg-blue-500 top-0"></div>
      </div>

      <div class="p-3 pl-5 pr-5">
        <div class="bf-table-content">
          <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
            <el-table-column type="index" label="序号" width="54" align="center" />

            <el-table-column prop="Name" label="供应商名称" min-width="166">
              <template #default="scope">
                <div class="inline-block">
                  {{ scope.row.ClientName }}
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="InviteName" label="采购次数" align="center">
              <template #default="scope">
                <span class="text-blue-500 cursor-pointer" @click="data.priceComparison = true">8次</span>
              </template>
            </el-table-column>
            <el-table-column prop="Age" label="单价（元）" align="center">
              <template #default="scope"> 635.00 </template>
            </el-table-column>
            <el-table-column prop="WorkAge" label="销售价（元）" align="center">
              <template #default="scope"> 705.00 </template>
            </el-table-column>
            <el-table-column prop="DepartName" label="供应商属性" align="center">
              <template #default="scope">
                <!-- 报价供应商 -->
                <!-- <div
                  class="w-2 h-2 inline-block bg-yellow-500 rounded-full mr-1"
                ></div>
                <span class="text-yellow-500">报价供应商</span> -->
                <!-- 采购供应商 -->
                <!-- <div
                  class="w-2 h-2 inline-block  bg-cyan-400 rounded-full mr-1"
                ></div>
                <span class="text-cyan-400">采购供应商</span> -->
                <!-- 售后供应商 -->
                <!-- <div
                  class="w-2 h-2 inline-block bg-blue-500 rounded-full mr-1"
                ></div>
                <span class="text-blue-500">售后供应商</span> -->
                <!-- 逾期供应商 -->
                <!-- <div
                  class="w-2 h-2 inline-block bg-yellow-400 rounded-full mr-1"
                ></div>
                <span class="text-yellow-400">逾期供应商</span> -->
                <!-- 账期供应商 -->
                <!-- <div
                  class="w-2 h-2 inline-block  bg-indigo-600 rounded-full mr-1"
                ></div>
                <span class="text-indigo-600">账期供应商</span> -->
                <!-- 常用供应商 -->
                <!-- <div
                  class="w-2 h-2 inline-block bg-green-500 rounded-full mr-1"
                ></div>
                <span class="text-green-500">常用供应商</span> -->
                <!-- 失信供应商 -->
                <!-- <div
                  class="w-2 h-2 inline-block bg-red-500 rounded-full mr-1"
                ></div>
                <span class="text-red-500">失信供应商</span> -->
                <!-- 未使用供应商 -->
                <div class="w-2 h-2 inline-block bg-gray-400 rounded-full mr-1"></div>
                <span class="text-gray-400">未使用供应商</span>
              </template>
            </el-table-column>
            <el-table-column prop="PostName" label="状态" align="center">
              <template #default="scope">
                <!-- <span class=" text-yellow-500">生产中</span> -->
                <span class="text-green-500">生产完成</span>
              </template>
            </el-table-column>
            <el-table-column prop="RecruitChannel" label="联系人" align="center">
              <template #default="scope"><span>舒黄宗</span></template>
            </el-table-column>
            <el-table-column prop="PostName" label="联系电话" align="center">
              <template #default="scope">
                <span>15555555555</span>
              </template>
            </el-table-column>
            <el-table-column prop="CreateOn" label="询价时间" width="166" align="center">
              <template #default="scope">{{ scope.row.ConsultTime }}</template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <!-- #endregion -->

    <!-- #region   价格趋势分析 -->
    <div class="bg-white mt-5 rounded">
      <p class="p-3 pl-6 inline-block">价格趋势分析</p>
      <div class="float-right inline-block mr-3 mt-2">
        <div class="inline-block">
          <el-radio-group v-model="tabPosition" @change="allWait()" size="small">
            <el-radio-button label="all">本周</el-radio-button>
            <el-radio-button label="wait">本月</el-radio-button>
            <el-radio-button label="reviewed">今年</el-radio-button>
          </el-radio-group>
        </div>
        <div class="inline-block ml-2 align-bottom">
          <el-date-picker v-model="value1" type="daterange" range-separator="-" placeholder="请选择日期" start-placeholder="Start date" end-placeholder="End date" style="width: 200px" size="small" />
        </div>
      </div>
      <div class="line bg-gray-200 relative">
        <div class="w-20 line_1 absolute left-6 bg-blue-500 top-0"></div>
      </div>
      <div class="mb-10 mt-4">
        <div id="myechart" />
      </div>
    </div>
    <!-- #endregion -->
    <!-- 采购次数 -->
    <LibraryDetailsPagePurchaseTimes v-model="data.priceComparison" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted, ref } from 'vue'
import { parseTime } from '/@/utils/tools'
import { GetPageList } from '/@/api/tech/EnquiryData'
import ProductLibraryDetailsPageHistogram from './_Components/ProductLibraryDetailsPageHistogram.vue'
import { getCurrentInstance } from 'vue'
import LibraryDetailsPagePurchaseTimes from './_Components/ProductLibraryDetailsPagePurchaseTimes.vue'

const option = {
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  legend: {
    data: ['核算价', '采购价']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '核算价',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210],
      itemStyle: {
        normal: {
          color: '#FF0000',
          lineStyle: {
            color: '#FF0000'
          }
        }
      }
    },
    {
      name: '采购价',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      itemStyle: {
        normal: {
          color: '#00FF00',
          lineStyle: {
            color: '#00FF00'
          }
        }
      }
    }
  ]
}
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
    ProductLibraryDetailsPageHistogram,
    LibraryDetailsPagePurchaseTimes
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts
    const mychart: any = ref({})
    const value1 = ref('')
    const tabPosition = ref('all')
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      name: '',
      // 搜索
      title: ''
    })

    const data = reactive({
      priceComparison: false,
      isfo: false,
      // 左侧表格数据
      tableData: []
    })
    // 本周本月今年
    const allWait = (val: any) => {
      console.log(tabPosition.value)
    }
    //#region 展示 隐藏
    const zhanshi = () => {
      data.isfo = !data.isfo
    }
    //#endregion

    onMounted(() => {
      mychart.value = echarts.init(document.getElementById('myechart'))
      mychart.value.setOption(option)
      // init()
    })
    return {
      data,
      zhanshi,
      ...tableRender(form, data),
      tabPosition,
      allWait,
      value1,
      echarts,
      mychart,
      option,
      onMounted
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_ProductLibrary_ProductLibraryDetailsPage {
  #myecharts {
    background: #ffffff;
    width: 29rem;
    height: 20rem;
  }
  #myechart {
    background: #ffffff;
    width: 100%;
    height: 20rem;
  }
  .product {
  }
  .table-wrapper {
    margin-top: 18px;
  }
  .main-table {
    width: 100%;
    border-top: 1px solid #e6eaee;
    border-left: 1px solid #e6eaee;
  }
  .main-table tr .canshu {
    height: 20px;
    width: 460px;
    box-sizing: border-box;
    padding: 5px 0 5px 5px;
    border-bottom: 1px solid #e6eaee;
    border-right: 1px solid #e6eaee;
  }
  .main-table tr td {
    height: 20px;
    box-sizing: border-box;
    padding: 5px 0 5px 5px;
    border-bottom: 1px solid #e6eaee;
    border-right: 1px solid #e6eaee;
  }

  .main-table tr:hover {
    background-color: #eff3f6;
  }
  .yinc {
    height: 372px;
    overflow: hidden;
  }
  .xiaoliang {
    height: 496px;
  }
  .line {
    height: 1px;
    .line_1 {
      height: 1px;
    }
  }
}
</style>
