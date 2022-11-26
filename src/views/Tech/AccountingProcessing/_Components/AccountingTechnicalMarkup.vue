<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <!-- #region -->
    <div class="p-4">
      <div class="flex">
        <el-button type="primary" plain class="w-1/2" size="large" @click="inventory()"> <i class="iconfont icon-jiage mr-2"></i> 产品清单</el-button>
        <el-button type="success" plain class="w-1/2" size="large" @click="markup()"> <i class="iconfont icon-rili mr-2"></i> 历史报价</el-button>
      </div>
      <!-- #region 技术费用管理 技术加价管理-->
      <div class="flex mt-4">
        <div class="w-1/2 border rounded-md">
          <div class="h-10 bg-blue-500 rounded-t-md text-white p-2 pl-2 pr-2">
            <div class="float-left"><span class="text-sm">技术费用管理</span></div>
            <div class="float-right text-sm">
              <span>产品成本：</span>
              <span class="font-semibold">1740.0</span>
            </div>
          </div>
          <div class="h-12 border-b text-xs p-3" v-for="(item, index) in data.technologyList">
            <div class="float-left mr-2 ml-3">
              <el-tag>
                <span class="text-xs">{{ item.name }}</span>
              </el-tag>
            </div>
            <div class="float-left ml-10">
              <!-- <el-input style="width: 60px" type="number" size="small" v-model="data.input[index]" placeholder="" /><span class="ml-2">%</span> -->
              20%
            </div>
            <div class="float-left ml-10 mt-1">
              <span>￥52.2</span>
            </div>
          </div>
        </div>
        <div class="w-1/2 ml-3 rounded-md border">
          <div class="h-10 bg-green-500 rounded-t-md text-white p-2 pl-2 pr-2">
            <div class=""><span class="text-sm">技术加价管理</span></div>
          </div>
          <div class="w-80 h-14 border m-auto mt-3 rounded-md flex text-xs relative">
            <div class="w-20 h-5 bg-green-500 text-center absolute left-0 top-0 rounded-tl-md rounded-br-md"><span class="text-white leading-5">常规类</span></div>
            <div class="w-1/3 h-14 pt-8 pl-6">正常(1)</div>
            <div class="w-1/3 h-14 pt-6">0%</div>
            <div class="w-1/3 h-14 pt-6">￥0.0</div>
          </div>
          <div class="w-80 h-14 border m-auto mt-3 rounded-md flex text-xs relative">
            <div class="w-20 h-5 bg-green-500 text-center absolute left-0 top-0 rounded-tl-md rounded-br-md"><span class="text-white leading-5">非常规类</span></div>
            <div class="w-1/3 h-14 pt-8 pl-6">正常(1)</div>
            <div class="w-1/3 h-14 pt-6">0%</div>
            <div class="w-1/3 h-14 pt-6">￥0.0</div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
      <!--  -->
      <div class="w-700 h-40 border mt-4 rounded-md p-6 pt-3">
        <div>
          <div class="flex">
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-red-400 ring-4 ring-red-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-chengben text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 2627.0</p>
                <p class="text-xs text-gray-400">核算成本(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-blue-400 ring-4 ring-blue-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-caigou text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 2627.0</p>
                <p class="text-xs text-gray-400">技术成本(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1">
              <div class="inline-block w-12 h-12 bg-yellow-400 ring-4 ring-yellow-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-dingdan4 text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 2627.0</p>
                <p class="text-xs text-gray-400">最低价(元)</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="flex mt-2">
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-green-400 ring-4 ring-green-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-qiandai text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 2627.0</p>
                <p class="text-xs text-gray-400">销售价(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1 border-r">
              <div class="inline-block w-12 h-12 bg-pink-400 ring-4 ring-pink-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-jiage text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 2627.0</p>
                <p class="text-xs text-gray-400">加价费(元)</p>
              </div>
            </div>
            <div class="w-1/3 h-16 ml-2 p-2 pt-1">
              <div class="inline-block w-12 h-12 bg-indigo-400 ring-4 ring-indigo-200 ring-opacity-50 rounded-full text-center leading-10 pt-1 ml-3"><i class="iconfont icon-tuihui text-white" style="font-size: 30px"></i></div>
              <div class="inline-block text-center ml-4">
                <p class="text-lg font-semibold"><span class="text-xs">￥</span> 2627.0</p>
                <p class="text-xs text-gray-400">居间费(元)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="float-right pt-6 pb-4">
        <el-button>取消</el-button>
        <el-button type="primary">确定</el-button>
      </div>
      <!-- 产品清单 -->
      <Inventory :visible="data.inventory" @closeInventory="closeInventory" />
      <!-- 历史报价 -->
      <HistoricalQuotationMarkupRecord :visible="data.drawer" @closeDrawer="closeDrawer" />
    </div>
    <!-- #endregion -->
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import HistoricalQuotationMarkupRecord from './HistoricalQuotationMarkupRecord.vue'
import Inventory from '../../OrderAllocationManagement/_Components/inventory.vue'

export default defineComponent({
  components: {
    OpenWindow,
    HistoricalQuotationMarkupRecord,
    Inventory
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-740',
      boxHeight: ''
    })
    const data = reactive({
      technologyList: [{ name: '包装费' }, { name: '加急费' }, { name: '安装费' }],
      input: '',
      drawer: false,
      inventory: false
    })
    // 历史报价加价
    const markup = () => {
      data.drawer = true
    }
    // 产品清单
    const inventory = () => {
      data.inventory = true
    }
    // 关闭抽屉 加价记录
    const closeDrawer = () => {
      data.drawer = false
    }
    // 关闭抽屉 产品清单
    const closeInventory = () => {
      data.inventory = false
    }
    return {
      closeWindow,
      closeDrawer,
      closeInventory,
      boxStyle,
      data,
      markup,
      inventory
    }
  }
})
</script>

<style lang="postcss" scoped></style>
