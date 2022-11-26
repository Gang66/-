<template>
  <div class="mb-6">
    <el-row :gutter="20">
      <!-- 报价等级 -->
      <el-col :span="12">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">报价等级</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="flex bg-white rounded-b-md">
          <div class="w-1/3 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm">今日优先订单数</p>
              <p class="text-sm"><span class="text-2xl font-semibold">16</span>个</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/3 bg-white">
            <div class="p-4 pl-8">
              <p class="text-sm">今日重点订单数</p>
              <p class="text-sm"><span class="text-2xl font-semibold">10</span>个</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/3 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm">今日普通订单数</p>
              <p class="text-sm"><span class="text-2xl font-semibold">1</span>个</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 预警订单 -->
      <el-col :span="12">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">预警订单</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="flex bg-white rounded-b-md">
          <div class="w-1/4 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm">今日预警</p>
              <p class="text-sm"><span class="text-2xl font-semibold">16</span>个</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/4 bg-white">
            <div class="p-4 pl-8">
              <p class="text-sm">今日超时</p>
              <p class="text-sm"><span class="text-2xl font-semibold">16</span>个</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/4 bg-white">
            <div class="p-4 pl-8">
              <p class="text-sm">今日延时</p>
              <p class="text-sm"><span class="text-2xl font-semibold">16</span>个</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
          <div class="w-px h-16 bg-gray-200 mt-4"></div>
          <div class="w-1/4 bg-white rounded-b-md">
            <div class="p-4 pl-8">
              <p class="text-sm">今日暂停</p>
              <p class="text-sm"><span class="text-2xl font-semibold">16</span>个</p>
              <p class="text-xs text-green-500"><span class="text-gray-400">较昨日</span> 15.9% <i class="iconfont icon-upall"></i></p>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 分配订单 -->
      <el-col :span="12">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">分配订单</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="bg-white rounded-b-md">
          <div class="flex">
            <div class="w-1/3 pt-6 pb-6 rounded-b-md">
              <div class="w-10 h-10 ml-6 bg-red-400 ring-4 ring-red-300 rounded-full text-white text-center pt-2 float-left inline-block">
                <span class="">A级</span>
              </div>
              <div class="float-left inline-block ml-2 text-sm">
                <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
              </div>
            </div>
            <div class="w-1/3 pt-6 pb-6 rounded-b-md">
              <div class="w-10 h-10 ml-6 bg-blue-400 ring-4 ring-blue-300 rounded-full text-white text-center pt-2 float-left inline-block">
                <span class="">B级</span>
              </div>
              <div class="float-left inline-block ml-2 text-sm">
                <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
              </div>
            </div>
            <div class="w-1/3 pt-6 pb-6 rounded-b-md">
              <div class="w-10 h-10 ml-6 bg-green-400 ring-4 ring-green-300 rounded-full text-white text-center pt-2 float-left inline-block">
                <span class="">C级</span>
              </div>
              <div class="float-left inline-block ml-2 text-sm">
                <p class="text-gray-400 text-sm">数量 <span class="text-black font-medium">118</span> 个</p>
                <p class="text-gray-400 text-sm">金额 <span class="text-black font-medium">10.18</span> 万元</p>
              </div>
            </div>
          </div>
          <div class="flex p-4 pt-0">
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">≥ 20万报价</p>
              <p class="text-xl font-semibold text-blue-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">≥ 1万报价</p>
              <p class="text-xl font-semibold text-blue-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">&lt; 1万报价</p>
              <p class="text-xl font-semibold text-blue-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 mr-1 pt-2 pb-1">
              <p class="text-gray-400 text-xs">已处理</p>
              <p class="text-xl font-semibold text-green-500">9</p>
            </div>
            <div class="w-1/5 text-center bg-sky-50 pt-2 pb-1">
              <p class="text-gray-400 text-xs">未处理</p>
              <p class="text-xl font-semibold text-red-500">9</p>
            </div>
          </div>
        </div>
      </el-col>
      <!-- 市场份额 -->
      <el-col :span="12">
        <div class="clearfix pt-2 pr-4 pb-2 pl-0 bg-white border-b mt-3 rounded-t-md">
          <div class="float-left pt-1">
            <span class="ml-4 text-base">市场份额</span>
            <span class="text-xs ml-3 text-gray-400">最近更新时间：2022-06-18 10:16</span>
          </div>
        </div>
        <div class="bg-white rounded-b-md">
          <div class="flex pt-6 pb-2">
            <div>
              <div class="w-20 h-8 ml-6 bg-orange-400 ring-4 ring-orange-300 rounded-full text-white text-center pt-1 float-left inline-block">
                <span class="text-sm">常规类</span>
              </div>
              <div class="float-left inline-block ml-6 text-sm">
                <p class="font-semibold text-sm">232 <span class="text-xs">个</span></p>
                <p class="text-gray-400 text-xs">常用 <span class="font-semibold text-gray-500">226 </span> 非常用 <span class="text-gray-500 font-semibold">226 </span></p>
              </div>
            </div>
            <div class="ml-20">
              <div class="w-20 h-8 ml-6 bg-blue-400 ring-4 ring-blue-300 rounded-full text-white text-center pt-1 float-left inline-block">
                <span class="text-sm">可代替性</span>
              </div>
              <div class="float-left inline-block ml-6 text-sm">
                <p class="font-semibold text-sm">232 <span class="text-xs">个</span></p>
                <p class="text-gray-400 text-xs">有 <span class="font-semibold text-gray-500">226 </span> 无 <span class="text-gray-500 font-semibold">226 </span></p>
              </div>
            </div>
          </div>
          <div class="flex pt-6 pb-8">
            <div>
              <div class="w-20 h-8 ml-6 bg-green-400 ring-4 ring-green-300 rounded-full text-white text-center pt-1 float-left inline-block">
                <span class="text-sm">非常规类</span>
              </div>
              <div class="float-left inline-block ml-6 text-sm">
                <p class="font-semibold text-sm">232 个</p>
                <p class="text-gray-400 text-xs">常用 <span class="font-semibold text-gray-500">226 </span> 非常用 <span class="text-gray-500 font-semibold">226 </span></p>
              </div>
            </div>
            <div class="ml-20">
              <div class="w-20 h-8 ml-6 bg-slate-500 ring-4 ring-slate-300 rounded-full text-white text-center pt-1 float-left inline-block">
                <span class="text-sm">技术难度</span>
              </div>
              <div class="float-left inline-block ml-6 text-sm">
                <p class="font-semibold text-sm">232 <span class="text-xs">个</span></p>
                <p class="text-gray-400 text-xs">一般 <span class="font-semibold text-gray-500">226 </span> 较难 <span class="text-gray-500 font-semibold">226 </span></p>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {}
})
</script>

<style lang="postcss" scoped></style>
