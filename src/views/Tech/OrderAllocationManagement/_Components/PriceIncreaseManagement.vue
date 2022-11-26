<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <!-- #region -->
    <div class="p-4">
      <div class="flex">
        <el-button type="primary" plain class="w-1/2" size="large" @click="inventory()"> <i class="iconfont icon-jiage mr-2"></i> 产品清单</el-button>
        <el-button type="success" plain class="w-1/2" size="large" @click="markup()"> <i class="iconfont icon-rili mr-2"></i> 历史记录</el-button>
      </div>
      <!-- #region 技术费用管理 技术加价管理-->
      <div class="flex mt-4">
        <div class="w-1/2 border rounded-md">
          <div class="h-10 bg-blue-500 rounded-t-md text-white p-2 pl-2 pr-2">
            <div class="float-left"><span class="text-sm">固定成本管理</span></div>
          </div>
          <div class="h-12 border-b text-xs p-3">
            <div class="float-left mr-2 ml-3">
              <el-tag>
                <span class="text-xs">税收</span>
              </el-tag>
            </div>
            <div class="w-20 float-left ml-12 text-center"><span class="ml-2">13%</span></div>
            <div class="float-right mt-1 mr-3">
              <span>￥52.2</span>
            </div>
          </div>
          <div class="h-12 border-b text-xs p-3">
            <div class="float-left mr-2 ml-3">
              <el-tag>
                <span class="text-xs">质保金</span>
              </el-tag>
            </div>
            <!-- <div class="w-20 inline-block -mt-2 ml-4">
              <el-select style="width: 120px" v-model="data.value" class="m-2" placeholder="Select" size="small">
                <el-option v-for="item in data.options" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </div> -->
            <div class="w-20 float-left ml-12 text-center"><span class="-ml-3">13%</span></div>
            <div class="float-right mt-1 mr-3">
              <span>￥52.2</span>
            </div>
          </div>
          <div class="h-12 border-b text-xs p-3">
            <div class="float-left mr-2 ml-3">
              <el-tag>
                <span class="text-xs">风险金</span>
              </el-tag>
            </div>
            <div class="w-20 float-left ml-12 text-center"><span class="-ml-3">13%</span></div>
            <div class="float-right mt-1 mr-3">
              <span>￥52.2</span>
            </div>
          </div>
          <div class="h-12 border-b text-xs p-3">
            <div class="float-left mr-2 ml-3">
              <el-tag>
                <span class="text-xs">运费</span>
              </el-tag>
            </div>
            <div class="float-left w-20 text-center ml-14">10%</div>
            <div class="float-right mt-1 mr-3">
              <span>￥52.2</span>
            </div>
          </div>
          <div class="h-12 border-b text-xs p-3">
            <div class="float-left mr-2 ml-3">
              <el-tag>
                <span class="text-xs">团队提成</span>
              </el-tag>
            </div>
            <div class="float-left w-20 text-center ml-7">3%</div>
            <div class="float-right mt-1 mr-3">
              <span>￥52.2</span>
            </div>
          </div>
        </div>
        <div class="w-1/2 ml-3 rounded-md border">
          <div class="h-10 bg-green-500 rounded-t-md text-white p-2 pl-2 pr-2">
            <div class=""><span class="text-sm">销售加价管理</span></div>
          </div>
          <div class="w-80 h-14 border m-auto mt-3 rounded-md flex text-xs relative">
            <div class="w-20 h-5 bg-green-500 text-center absolute left-0 top-0 rounded-tl-md rounded-br-md"><span class="text-white leading-5">常规类</span></div>
            <div class="w-1/3 h-14 pt-8 pl-6">正常(1)</div>
            <div class="w-1/3 h-14 pt-6 mr-3 text-center">
              <!-- <el-input v-model="data.input1" placeholder="数字" /> -->
              <span>20%</span>
            </div>
            <div class="w-1/3 h-14 pt-6">￥0.0</div>
          </div>
          <div class="w-80 h-14 border m-auto mt-3 rounded-md flex text-xs relative">
            <div class="w-20 h-5 bg-green-500 text-center absolute left-0 top-0 rounded-tl-md rounded-br-md"><span class="text-white leading-5">非常规类</span></div>
            <div class="w-1/3 h-14 pt-8 pl-6">正常(1)</div>
            <div class="w-1/3 h-14 pt-6 mr-3 text-center">
              <span>20%</span>
            </div>
            <div class="w-1/3 h-14 pt-6">￥0.0</div>
          </div>
          <div class="w-80 h-14 border m-auto mt-3 rounded-md flex text-xs relative">
            <div class="w-20 h-5 bg-green-500 text-center absolute left-0 top-0 rounded-tl-md rounded-br-md"><span class="text-white leading-5">特殊类</span></div>
            <div class="w-1/3 h-14 pt-8 pl-6">居间费（1）</div>
            <div class="w-1/3 h-14 pt-6 mr-3 text-center">
              <span>40%</span>
            </div>
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
                <p class="text-xs text-gray-400">销售成本(元)</p>
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
import Inventory from './inventory.vue'

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
      value: '',
      drawer: false,
      inventory: false,
      options: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options1: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ]
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
