<template>
  <div class="PositionManagement-OnJob-index">
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
              <el-cascader v-model="data.query.department" :options="data.department" />
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <!-- ECharts图表 -->
    <div class="flex justify-between mt-2 w-9/10">
      <!-- 各部指标分析 -->
      <div class="h-80 w-1/2 flex flex-col justify-between bg-white p-2 pl-5">
        <div class="font-bold">各部指标分析</div>
        <div class="flex w-full justify-between items-start mt-4">
          <div>
            <span class="text-orange-400">
              <el-icon><el-icon-StarFilled /></el-icon>
            </span>
            <span>总均分</span>
            <div class="m-2">
              <span class="text-5xl font-black">90</span>
              <span class="text-gray-400">分</span>
            </div>
          </div>
          <div id="myChart" class="h-80 w-4/5"></div>
        </div>
      </div>
      <!-- 达标未达标排行 -->
      <div class="h-80 w-1/2 bg-white ml-2 p-2 rounded-sm">
        <div class="flex justify-around mt-4">
          <span class="cursor-pointer" @click="ChangeProportion(index)" v-for="(item, index) in data.CenterTitle" :key="index" :class="{ 'text-blue-400': CenterCurrent === index }">{{ item }}</span>
        </div>
        <!-- 下列表格 -->
        <div class="mt-2">
          <el-row class="text-center bg-gray-100 h-10 leading-10">
            <el-col v-for="(item, index) in tableTitle" :key="index" :span="item.span">{{ item.name }} </el-col>
          </el-row>
          <div v-for="(item, index) in 5" :key="index" class="flex justify-between mt-5 text-xs pl-2 text-center">
            <template v-if="index < 5">
              <el-col :span="3" class="flex justify-center">
                <div v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" /></div>
                <div v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" /></div>
                <div v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" /></div>
                <div v-else>&nbsp;&nbsp;{{ index + 1 }}</div>
              </el-col>
              <el-col :span="3"><div class="ml-2 mr-2">1234</div></el-col>
              <el-col :span="3"> 80 </el-col>
              <el-col :span="12"
                ><div class="flex-1">
                  <el-progress :percentage="80"></el-progress></div
              ></el-col>
              <el-col :span="3">A级</el-col>
            </template>
          </div>
        </div>
      </div>
      <div class="h-80 w-1/3 bg-white pt-2 pl-2 ml-2">
        <div class="font-bold">绩效等级结构分析</div>
        <div id="myChart2" class="h-72 w-full pt-2 pl-2 ml-2"></div>
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
let myChart: any = null
let myChart2: any = null
export default defineComponent({
  name: '',
  components: { purchaseForm },
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
      CenterTitle: ['达标排行榜', '未达标排行榜']
    })
    // 每三个数字加一个逗号
    data.numberAssets = data.numberAssets.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')

    //#region 顶部筛选代码
    // 切换时间时的高亮以及数据更新
    const changetime = (val: any) => {
      data.currentday = val
      if (val === 0) {
      } else if (val === 1) {
      } else if (val === 2) {
      }
      state()
      Source()
    }
    //#endregion

    //#region 左侧ECharts
    let leftData = {
      PeopleNumber: 200,
      Count: [
        { value: 400, name: '未达标' },
        { value: 300, name: '已达标' }
      ]
    }
    let leftData1 = {
      Compliance: 80,
      Count: [
        { value: 80, name: '未达标' },
        { value: 20, name: '已达标' }
      ]
    }
    const state = () => {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose() //解决echarts dom已经加载的报错
      }
      myChart = echarts.init(document.getElementById('myChart')!)
      myChart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#0091ff', '#00b7ff'],
        legend: {
          left: 'center',
          top: 'bottom',
          data: []
        },

        series: [
          {
            name: '数量',
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['25%', '50%'],

            label: {
              show: true,
              position: 'center',
              color: '#9A9EBA',
              formatter: leftData.PeopleNumber + '人员数量'
            },

            data: leftData.Count
          },
          {
            name: '百分比',
            type: 'pie',
            radius: ['35%', '50%'],
            center: ['75%', '50%'],
            label: {
              show: true,
              position: 'center',
              color: '#9A9EBA',
              formatter: leftData1.Compliance + '%达标率'
            },
            data: leftData1.Count
          }
        ]
      })

      window.onresize = function () {
        myChart.resize()
      }
    }
    //#endregion

    //#region 中间达标排行榜
    let ChangeCenterTitle = ref('达标排行榜')
    const tableTitle = reactive([
      { name: '排名', span: 3 },
      { name: '人员', span: 3 },
      { name: '分数', span: 3 },
      { name: '达标比例', span: 12 },
      { name: '等级', span: 3 }
    ])
    // 点击切换占比以及鼠标移入的标题
    const CenterCurrent = ref(0)
    const ChangeProportion = (val: any) => {
      CenterCurrent.value = val
      if (val === 0) {
        ChangeCenterTitle.value = '达标排行榜'
        tableTitle[3].name = '达标比例'
      } else if (val === 1) {
        ChangeCenterTitle.value = '未达标排行榜'
        tableTitle[3].name = '未达标比例'
      }
    }
    //#endregion

    //#region 右侧ECharts
    let dataright = reactive([
      {
        value: 200,
        name: 'A'
      },
      {
        value: 300,
        name: 'B'
      },
      {
        value: 210,
        name: 'C'
      },
      {
        value: 110,
        name: 'D'
      }
    ])

    const Source = () => {
      if (myChart2 != null && myChart2 != '' && myChart2 != undefined) {
        myChart2.dispose() //解决echarts dom已经加载的报错
      }
      myChart2 = echarts.init(document.getElementById('myChart2')!)
      myChart2.setOption({
        title: {
          text: '全部数据',
          left: 'center',
          top: '55%',
          textStyle: {
            textAlign: 'center',
            //   fill: 'red',
            color: '#bfbfbf',
            fontSize: 12
            // fontWeight: 400
          }
        },
        graphic: {
          type: 'text',
          left: 'center',
          top: '45%',
          style: {
            text: '460',
            textAlign: 'center',
            fill: '#333',
            fontSize: 35
          }
        },
        tooltip: {
          trigger: 'item'
        },
        color: ['#0091ff', '#00b7ff'],
        series: [
          {
            name: '等级结构',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inner',
              formatter: '{d}%'
            },
            labelLine: {
              show: false
            },
            data: dataright
          }
        ]
      })
      window.onresize = function () {
        myChart.resize()
      }
    }
    //#endregion

    onMounted(() => {
      state()
      Source()
    })
    return {
      tableTitle,
      CenterCurrent,
      ChangeProportion,
      data,
      changetime,
      dataright
    }
  }
})
</script>
<style lang="postcss" scoped>
.PositionManagement-OnJob-index {
  :deep(.el-date-editor) {
    width: 220px;
  }
}
</style>
