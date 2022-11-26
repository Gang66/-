<template>
  <div class="tech_SupplierManagement_PriceLibraryProduct">
    <div class="w-1070 bg-white rounded-lg float-left pb-8">
      <div class="pt-1 pr-4 pb-2 pl-0 bg-gray-50 border-b border-gray-200 rounded-tr-lg rounded-tl-lg">
        <p class="text-sm ml-4 pt-2">产品参数配置</p>
      </div>
      <div class="pl-4 pt-3 pr-4 flex">
        <div class="">
          <img style="width: 260px; height: 250px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" alt="" />
        </div>
        <div class="text-sm leading-7 ml-4 relative w-760 h-20">
          <p>
            先导活塞式减压阀<span class="text-sm ml-4">Y43H-16C</span>
            <span>DN80</span>
            <span class="ml-3 text-xs text-gray-400">非常规使用</span>
          </p>
          <p class="text-gray-400">
            核算价：
            <span class="text-xs text-red-500"> ￥1950元</span>
          </p>
          <p class="text-gray-400">
            采购价：
            <span class="text-xs text-green-500"> ￥1950元</span>
          </p>

          <div class="absolute right-0 top-0">
            <div class="w-5 h-5 border border-yellow-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-yellow-500">
              <span>替</span>
            </div>
            <div class="inline-block text-sm ml-3 mr-3">
              <span>有</span>
            </div>
            <div class="w-5 h-5 border border-blue-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-blue-500">
              <span>技</span>
            </div>
            <div class="inline-block text-sm ml-3 mr-3">
              <span>一般</span>
            </div>
            <p class="text-gray-400 ml-10">共<span class="text-blue-500 cursor-pointer" @click="data.priceComparison = true">7条</span>成交价</p>
            <div class="mt-2 text-sm">
              <span class="text-blue-500">[加入分析]</span>
              <span class="text-gray-400 ml-2">[已分析]</span>
            </div>
          </div>
          <div class="w-760 absolute z-50 bg-gray-50 mt-4 rounded-lg" :class="data.isfo ? '' : 'yinc'">
            <div class="w-10 h-10 absolute -right-4 top-4" @mouseenter="mouseenter" @mouseleave="mouseleave">
              <img class="arrow w-2 h-2" :class="{ open: data.showDetail === 0 }" src="../../../assets/img/tech/down_1.png" alt="" />
            </div>
            <div class="inline-block float-left pt-3 pl-4">
              <span>参数：</span>
            </div>
            <div class="w-700 inline-block text-left">
              <div class="">
                <div class="ml-6 inline-block mt-3" v-for="item in 14">
                  <div class="inline-block w-36 h-12 border-r">
                    <div class="text-gray-400">材质</div>
                    <div class="text-xs mt-1">铸钢</div>
                  </div>
                  <!-- <div class="inline-block w-36 h-12 border-r ml-4">
                <div>型号</div>
                <div>Y43H-16C</div>
              </div>
              <div class="inline-block w-36 h-12 border-r ml-4">
                <div>规格</div>
                <div>DN80</div>
              </div>
              <div class="inline-block w-36 h-12 ml-4">
                <div>压力</div>
                <div>1.6MPa</div>
              </div>
              <div class="inline-block w-36 h-12 border-r">
                <div>连接形式</div>
                <div>法兰</div>
              </div>
              <div class="inline-block w-36 h-12 border-r ml-4">
                <div>适用介质</div>
                <div>蒸汽</div>
              </div>
              <div class="inline-block w-36 h-12 border-r ml-4">
                <div>结构形式</div>
                <div>活塞式</div>
              </div>
              <div class="inline-block w-36 h-12 ml-4">
                <div>压力环境</div>
                <div>常压式</div>
              </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="mt-3 pl-4">
        <el-table
          :data="data.tableData"
          stripe
          style="width: 100%"
          :header-cell-style="{
            background: '#eef1f6',
            color: '#606266'
          }"
        >
          <el-table-column prop="date" label="属性信息 " width="554">
            <span>【使用温度：≤350℃】【材质：316不锈钢】</span>
          </el-table-column>
          <el-table-column prop="name" label="核算价（元）" width="140" align=" center">
            <span class="text-red-500">1680</span>
          </el-table-column>
          <el-table-column label="采购价（元）" width="140" align=" center">
            <span class="text-green-500">1680</span>
          </el-table-column>
          <el-table-column prop="address" label="报价数" width="100" align=" center">
            <span class="text-blue-500 cursor-pointer" @click="data.priceComparison = true">3条</span>
          </el-table-column>
          <el-table-column prop="address" label="相关信息" width="100">
            <template #default="scope">
              <el-tag size="small" type="info" effect="plain"><span class="text-blue-500"> + 分析</span></el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="w-80 bg-white float-right rounded-lg">
      <div class="h-10 bg-blue-500 rounded-tr-lg rounded-tl-lg p-2 text-white text-sm">
        <span>热榜供应商 Top10</span>
      </div>
      <div class="pb-5 pl-4">
        <div class="w-72 h-24 float-left border-b mt-3" v-for="item in 10">
          <div class="inline-block float-left text-sm leading-7 ml-4">
            <p>
              <el-link type="primary">浙江金豪阀门有限公司 </el-link>
            </p>
            <p class="">
              <i class="iconfont icon-dianhua"></i>
              <span class="text-xs">13506660646</span>
              <el-tag size="small" class="ml-3">舒黄宗</el-tag>
            </p>
            <p class="text-gray-400 text-xs">
              <i class="iconfont icon-dingwei"></i>
              <span>浙江省温州市永嘉县瓯北镇</span>
            </p>
          </div>
          <div class="float-right text-gray-400 text-sm">
            <span>温州</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1070 h-96 bg-white mt-4 rounded-lg float-left">
      <div class="h-14 pt-3 pl-6 pr-6">
        <div class="inline-block"><span class="text-sm">价格走势图</span><span class="text-xs ml-4">默认展示当前产品的价格走势图，可通过“+分析”针对此属性查看分析数据</span></div>
        <div class="float-right">
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
      </div>
      <!-- 折线图 -->
      <div id="myecharts" ref="chart" />
    </div>
    <!-- 标准比价 -->
    <StandardPriceComparison v-model="data.priceComparison" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, onMounted, getCurrentInstance, onBeforeUnmount } from 'vue'
import * as echarts from 'echarts'
import StandardPriceComparison from './_Components/StandardPriceComparison.vue'

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

export default defineComponent({
  components: {
    StandardPriceComparison
  },
  setup() {
    const value1 = ref('')
    const tabPosition = ref('all')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      console.log(tabPosition.value)
    }
    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts
    const mychart: any = ref({})
    onMounted(() => {
      mychart.value = echarts.init(document.getElementById('myecharts'))
      mychart.value.setOption(option)
    })

    const data = reactive({
      priceComparison: false,
      isfo: false,
      showDetail: -1,
      //   表格数据
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]
    })
    const mouseenter = () => {
      data.isfo = !data.isfo
      data.showDetail = 0
    }
    const mouseleave = () => {
      data.isfo = !data.isfo
      data.showDetail = -1
    }
    onBeforeUnmount(() => {
      if (mychart.value) {
        mychart.value.clear() //清空图表
        mychart.value.dispose() //释放图表组件
        mychart.value = null
      }
    })

    return {
      data,
      echarts,
      mychart,
      option,
      onMounted,
      allWait,
      tabPosition,
      value1,
      mouseenter,
      mouseleave
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_SupplierManagement_PriceLibraryProduct {
  #myecharts {
    background: #ffffff;
    width: 63rem;
    height: 20rem;
  }
  .arrow {
    width: 18px;
    height: 18px;
    display: inline-block;
    transition: transform 0.3s;
    -webkit-transition: transform 0.3s;
    &.open {
      transform: rotate(180deg);
    }
  }
  .yinc {
    height: 148px;
    overflow: hidden;
  }
}
</style>
