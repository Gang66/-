<template>
  <div class="PositionManagement-quits-index">
    <!-- 数据筛选 -->
    <div>
      <el-card>
        <div class="flex justify-between items-center">
          <div class="font-black">数据筛选</div>
          <div class="flex items-center">
            <div class="flex mr-4">
              <span v-for="(item, index) in data.TopTimes" :key="index" @click="changetime(index)" class="mr-4 text-gray-400 cursor-pointer" :class="{ 'text-blue-500': data.currentday === index }">{{ item }}</span>
            </div>
            <div class="flex items-center">
              <el-date-picker class="mr-2" v-model="data.query.period" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" />
              <!-- <el-select placeholder="请选择" v-model="query.department">
                <el-option v-for="item in data.department" :key="item.value" :label="item.label" :value="item.value" />
              </el-select> -->
              <el-cascader v-model="data.query.department" :options="data.department" />
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- ECharts图表 -->
    <div class="flex flex-col justify-between mt-2 w-full">
      <!-- 上方三个 -->
      <div class="w-full h-52 flex">
        <!-- 数据统计 -->
        <div class="p-2 w-1/2 h-full bg-white mr-2">
          <div class="font-bold">数据统计</div>
          <div class="flex">
            <div class="flex flex-col w-1/3 h-36 items-center justify-between mt-4" v-for="(item, index) in data.Statistics">
              <div class="flex items-center">
                <span :class="[{ 'text-blue-400': index === 0 }, { 'text-red-400': index === 1 }, { 'text-orange-400': index === 2 }]">
                  <el-icon v-if="index === 0"><el-icon-Monitor /></el-icon>
                  <el-icon v-else-if="index === 1"><el-icon-Failed /></el-icon>
                  <el-icon v-else-if="index === 2"><el-icon-List /></el-icon>
                </span>
                <span class="">{{ item.name }}</span>
              </div>
              <div class="text-3xl font-medium">{{ item.count }}</div>
              <div class="text-sm">
                <span>同比</span>&nbsp;<span class="text-blue-500">{{ item.add }}%</span>
              </div>
              <div v-if="index === 0" class="w-10 h-5 bg-red-400"></div>
              <div v-else-if="index === 1" class="w-10 h-5 bg-blue-400"></div>
              <div v-else-if="index === 2" class="w-10 h-5 bg-yellow-400"></div>
            </div>
          </div>
        </div>
        <!-- 部门流失原因 -->
        <div class="p-2 w-1/2 h-full bg-white mr-2">
          <lossReasons />
        </div>
        <!-- 工龄流失分析 -->
        <div class="p-2 w-1/3 h-full bg-white">
          <lossAge />
        </div>
      </div>
      <!-- 下方三个 -->
      <div class="w-full h-52 flex mt-2">
        <!-- 流失月份分析 -->
        <div class="p-2 w-1/2 h-full bg-white mr-2">
          <lossMonthAnalysis />
        </div>
        <!-- 离职率类别分析 -->
        <div class="p-2 w-1/4 h-full bg-white mr-2">
          <lossMonth />
        </div>
        <!-- 部门流失分析 -->
        <div class="p-2 w-1/3 h-full bg-white">
          <lossAnalysis />
        </div>
      </div>
    </div>
    <!-- 下列table表格 -->
    <div class="mt-2">
      <el-card> <purchaseForm /></el-card>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import purchaseForm from './_Components/purchaseForm.vue'
import * as echarts from 'echarts'
import lossReasons from './ECharts/lossReasons.vue'
import lossAge from './ECharts/lossAgeReasons.vue'
import lossMonth from './ECharts/lossMonthReasons.vue'
import lossAnalysis from './ECharts/LossAnalysis.vue'
import lossMonthAnalysis from './ECharts/lossMonthAnalysis.vue'
// 每三个数字加一个逗号
const threeNumber = (val: any) => {
  return val.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
}
export default defineComponent({
  name: '',
  components: { purchaseForm, lossReasons, lossAge, lossMonth, lossAnalysis, lossMonthAnalysis },
  setup() {
    // 定义的所有变量
    const data = reactive({
      // 顶部筛选的高亮
      currentday: 0,
      // 筛选的部门数据
      department: [
        {
          value: 'guide',
          label: '集团',
          children: [
            {
              value: 'disciplines',
              label: '第一大区',
              children: [
                {
                  value: 'consistency',
                  label: '南京事业部',
                  children: [
                    {
                      value: 'ceshi',
                      label: '某XX'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX1'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX2'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX3'
                    },
                    {
                      value: 'ceshi',
                      label: '某XX4'
                    }
                  ]
                },
                {
                  value: 'feedback',
                  label: '测试1'
                },
                {
                  value: 'efficiency',
                  label: '测试2'
                },
                {
                  value: 'controllability',
                  label: '测试3'
                }
              ]
            },
            {
              value: 'navigation',
              label: '第二大区',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation'
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation'
                }
              ]
            },
            {
              value: 'navigation',
              label: '第三大区',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation'
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation'
                }
              ]
            }
          ]
        }
      ],
      query: {
        // 筛选时间的开始和结束
        period: [],
        // 筛选的部门
        department: ''
      },
      // 顶部的时间渲染
      TopTimes: ['最近7天', '日', '周', '月', '季', '年'],
      // 资产数量
      numberAssets: '68000',
      // 中间ECharts的标题切换
      CenterTitle: ['资产类别占比', '资产数量占比'],
      // 数据统计的数据
      Statistics: [
        { name: '累计入职', count: '86000', add: '2.5%' },
        { name: '累计离职', count: '23000', add: '2.5%' },
        { name: '当前在职', count: '681000', add: '2.5%' }
      ]
    })

    data.numberAssets = threeNumber(data.numberAssets)
    data.Statistics.forEach((val: any, index) => {
      val.count = threeNumber(val.count)
    })

    // 切换时间时的高亮以及数据更新
    const changetime = (val: any) => {
      data.currentday = val
      if (val === 0) {
      } else if (val === 1) {
      } else if (val === 2) {
      }
    }

    return {
      data,
      changetime
    }
  }
})
</script>
<style lang="postcss" scoped>
.PositionManagement-quits-index {
  :deep(.el-date-editor) {
    width: 13.75rem;
  }
}
</style>
