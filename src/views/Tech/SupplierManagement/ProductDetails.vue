<template>
  <div class="float-left tech_ProductDetails">
    <div class="w-1070 h-28 bg-white rounded-lg relative">
      <div class="">
        <div class="h-24 rounded-t-xl">
          <div class="h-24 float-left pt-4 pl-6">
            <el-popover :width="300" popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;" placement="bottom-start">
              <template #reference>
                <div class="relative">
                  <div class="w-14 h-14 rounded-full bg-blue-400 inline-block">
                    <div class="w-8 text-xs text-white font-medium text-center m-auto pt-3">
                      <p>永嘉冶泰</p>
                    </div>
                  </div>
                  <!-- <div
                    class="w-14 h-14 rounded-full bg-blue-400 inline-block"
                  >
                  <div class=" w-8 text-xs text-white font-medium	 text-center m-auto pt-1">
                        <p>永嘉冶泰阀门</p>
                      </div>
                  </div> -->
                </div>
              </template>

              <template #default>
                <div class="demo-rich-conent flex" style="gap: 16px; flex-direction: column">
                  <div class="w-12 h-12 bg-blue-400 m-auto rounded-full">
                    <div class="w-8 text-xs text-white font-medium text-center m-auto pt-2">
                      <p>永嘉冶泰</p>
                    </div>
                  </div>
                  <!-- <div class="w-12 h-12 bg-blue-400 m-auto rounded-full">
                      <div class=" w-8 text-xs text-white font-medium	 text-center m-auto pt-0">
                        <p>永嘉冶泰阀门</p>
                      </div>
                  </div> -->
                  <div class="text-center">
                    <p>舒黄宗</p>
                    <p class="text-xs text-gray-400">老板 / 18888888888</p>
                  </div>
                  <div class="flex h-12 text-center leading-6 text-gray-400 text-xs">
                    <div class="w-4/12 h-12">
                      <p>报价次数</p>
                      <p class="text-sm font-semibold text-yellow-500">32</p>
                    </div>
                    <div class="w-4/12 h-12 border-r border-l">
                      <p>成交笔数</p>
                      <p class="text-sm font-semibold text-green-500">32</p>
                    </div>
                    <div class="w-4/12 h-12">
                      <p>意向客户</p>
                      <p class="text-sm font-semibold text-blue-500">32</p>
                    </div>
                  </div>
                  <div class="inline-block">
                    <div class="float-left">
                      <el-button class="w-28" type="primary"> <i class="iconfont icon-yulan mr-2"></i> 详情</el-button>
                    </div>
                    <div class="float-right" @click="edit">
                      <el-button class="w-28" type="primary" plain><i class="iconfont icon-bianji1 mr-2"></i> 编辑</el-button>
                    </div>
                  </div>
                  <div class="text-xs text-gray-400 text-center"><span>-</span><span>本厂产品信息由</span><span class="text-black">谭琦</span><span>更新</span><span>-</span></div>
                </div>
              </template>
            </el-popover>
          </div>
          <div class="inline-block leading-8 ml-4 pt-4">
            <div><span class="text-xl">永嘉冶泰阀门制造有限公司</span></div>
            <div>
              <span class="text-sm text-gray-400">主营产品：闸阀、截止阀</span>
              <svg-icon class="inline-block ml-4 mr-1" icon-class="svg-SupplierHomepage" />
              <span class="text-xs text-gray-400">信用等级：</span>
              <span class="text-xs text-red-400">优秀</span>
              <span class="text-xs text-green-400">良好</span>
              <span class="text-xs text-blue-400">差</span>
            </div>
          </div>
          <div class="w-520 h-14 float-right mr-8">
            <el-button class="absolute top-10 right-6"><i class="iconfont icon-zhuye mr-2"></i>进入主页</el-button>
          </div>
        </div>
      </div>
      <div class="h-10 bg-gray-200 rounded-b-xl">
        <div class="p-2">
          <div class="inline-block">
            <div class="inline-block"><i class="iconfont icon-dingwei text-gray-400"></i><span class="text-xs text-gray-400">浙江省温州市永嘉县江北街道浦二村后垟</span></div>
          </div>
          <div class="inline-block float-right mr-4">
            <div class="w-2 h-2 bg-orange-500 rounded-full inline-block mr-2"></div>
            <span class="text-sm text-gray-400">报价供应商</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-1070 bg-white rounded-lg mt-10">
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
          <p class="text-gray-400">共<span class="text-blue-500">7条</span>报价</p>
          <div class="absolute right-8 top-0">
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
            <div class="mt-8 text-sm">
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
          <el-table-column prop="date" label="属性信息 " width="576">
            <span>【使用温度：≤350℃】【材质：316不锈钢】</span>
          </el-table-column>
          <el-table-column prop="name" label="核算价（元）" width="180">
            <span class="text-red-500">1680</span>
          </el-table-column>
          <el-table-column prop="address" label="报价数" width="180">
            <span class="text-blue-500" @click="data.priceComparison = true">3条</span>
          </el-table-column>
          <el-table-column prop="address" label="相关信息" width="100">
            <template #default="scope">
              <el-tag size="small" type="info" effect="plain"><span class="text-blue-500"> + 分析</span></el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="w-1070 h-96 bg-white mt-4 rounded-lg">
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
            <el-date-picker v-model="value1" type="daterange" range-separator="-" placeholder="请选择日期" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 200px" size="small" />
          </div>
        </div>
      </div>
      <!-- 折线图 -->
      <div id="myecharts" />
    </div>
  </div>
  <!-- 主营产品 -->
  <!-- 高薪降价产品 -->
  <ProductDetailsRight />
  <!-- 编辑 -->
  <CreateSupplierEdit title="新增供应商" v-if="data.CreateSupplierEdit.view" @closeWindow="closeWindow" />
  <!-- 标准比价 -->
  <StandardPriceComparison v-model="data.priceComparison" />
</template>

<script lang="ts">
import { defineComponent, reactive, ref, markRaw } from 'vue'
import { Calendar } from '@element-plus/icons-vue'
import { onMounted, getCurrentInstance } from 'vue'
import ProductDetailsRight from './_Components/ProductDetailsRight.vue'
import CreateSupplierEdit from './_Components/CreateSupplierEdit.vue'
import StandardPriceComparison from './_Components/StandardPriceComparison.vue'

const option = {
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['Email', 'Union Ads', 'Video Ads', 'Direct', 'Search Engine']
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
      name: 'Email',
      type: 'line',
      stack: 'Total',
      data: [120, 132, 101, 134, 90, 230, 210]
    },
    {
      name: 'Union Ads',
      type: 'line',
      stack: 'Total',
      data: [220, 182, 191, 234, 290, 330, 310]
    },
    {
      name: 'Video Ads',
      type: 'line',
      stack: 'Total',
      data: [150, 232, 201, 154, 190, 330, 410]
    },
    {
      name: 'Direct',
      type: 'line',
      stack: 'Total',
      data: [320, 332, 301, 334, 390, 330, 320]
    },
    {
      name: 'Search Engine',
      type: 'line',
      stack: 'Total',
      data: [820, 932, 901, 934, 1290, 1330, 1320]
    }
  ]
}

export default defineComponent({
  components: {
    ProductDetailsRight,
    CreateSupplierEdit,
    StandardPriceComparison
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts
    const mychart: any = ref({})
    onMounted(() => {
      mychart.value = echarts.init(document.getElementById('myecharts'))
      mychart.value.setOption(option)
    })
    const value1 = ref('')
    const tabPosition = ref('all')
    // 全部待审核已审核切换
    const allWait = (val: any) => {
      console.log(tabPosition.value)
    }
    const data = reactive({
      priceComparison: false,
      CreateSupplierEdit: {
        view: false
      },
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
    //  编辑
    const edit = (ed: any) => {
      data.CreateSupplierEdit.view = true
    }
    // 关闭弹窗
    const closeWindow = (type: string) => {
      data.CreateSupplierEdit.view = false
    }
    const mouseenter = () => {
      data.isfo = !data.isfo
      data.showDetail = 0
    }
    const mouseleave = () => {
      data.isfo = !data.isfo
      data.showDetail = -1
    }

    return {
      data,
      tabPosition,
      allWait,
      Calendar,
      value1,
      echarts,
      mychart,
      option,
      mouseenter,
      mouseleave,
      edit,
      closeWindow
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_ProductDetails {
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
