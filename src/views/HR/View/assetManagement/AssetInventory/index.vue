<template>
  <div class="assetManagement-AssetInventory-index">
    <div>
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
                <el-date-picker class="mr-2" v-model="data.query.period" type="daterange" range-separator="-" start-placeholder="开始时间" end-placeholder="结束时间" format="YYYY/MM/DD" value-format="YYYY-MM-DD" />
                <el-cascader v-model="data.query.department" :options="data.DepartmentDrop" />
              </div>
            </div>
          </div>
        </el-card>
      </div>
      <!-- ECharts图表 -->
      <div class="flex justify-between mt-2">
        <!-- 左侧部门采购费用 -->

        <div id="myChart" class="h-96 w-3/5 bg-white p-2"></div>

        <!-- 右侧采购费用对比 -->
        <div class="h-96 w-2/5 bg-white p-2 ml-2">
          <div class="text-sm font-bold">库存量排行</div>
          <div v-for="(item, index) in rightdemo" :key="index" class="flex items-center m-4 text-xs">
            <div v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></div>
            <div v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></div>
            <div v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></div>
            <div v-else>&nbsp;{{ index + 1 }}</div>
            <div class="flex flex-col flex-1 ml-4">
              <div>
                <span class="text-xs">{{ item.name }}</span>
              </div>
              <div>
                <el-progress :percentage="item.percentage"> {{ item.quantityL }}</el-progress>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 下列table表格 -->
      <div class="mt-4">
        <el-card> <purchaseForm /></el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import purchaseForm from './_Components/purchaseForm.vue'
import * as echarts from 'echarts'
let myChart: any = null
export default defineComponent({
  name: 'AssetProcurement',
  components: {
    purchaseForm
  },
  setup() {
    // 定义的所有变量
    const data = reactive({
      // 当月所有的天数
      MonthDay: [],
      // 顶部筛选的高亮
      currentday: 0,
      // 筛选的部门数据
      DepartmentDrop: [
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
      // 顶部的时间
      TopTimes: ['最近7天', '日', '周', '月', '季', '年'],
      // 筛选的数据
      query: {
        // 筛选时间的开始和结束
        period: [],
        // 筛选的部门
        department: ''
      },
      // 库存量排行的排名
      ranking: [4, 5, 6, 7]
    })

    /**
     * 顶部筛选代码
     */

    // 切换时间时的高亮以及数据更新
    const changetime = (val: any) => {
      data.currentday = val
      if (val === 0) {
        datademo = datademo1
        rightdemo.value = rightdemo1
      } else if (val === 1) {
        datademo = datademo2
        rightdemo.value = rightdemo2
      } else if (val === 2) {
        datademo = datademo3
      } else if (val === 3) {
      } else if (val === 4) {
        datademo = datademo3
      }
      PurchaseCost()
    }
    /**
     * 顶部筛选代码结束
     */

    /**
     * 左侧ECharts
     */
    let datademo = reactive({
      money: [430, 330, 480, 220, 430, 330, 480, 220],
      Xtitle: ['人体工学椅', '笔记本电脑', '服务器', '联想电脑主机', 'iFoved显示器', '风扇', '空调', '热水器']
    })
    const datademo1 = {
      money: [430, 330, 480, 220, 430, 330, 480, 220],
      Xtitle: ['人体工学椅', '笔记本电脑', '服务器', '联想电脑主机', 'iFoved显示器', '风扇', '空调', '热水器']
    }
    const datademo2 = {
      money: [430, 330, 480, 220, 430, 330, 480, 220],
      Xtitle: ['人体工学椅', '笔记本电脑', '服务器', '联想电脑主机', 'iFoved显示器', '风扇', '空调', '热水器']
    }
    const datademo3 = {
      money: [430, 330, 480, 220, 430, 330, 480, 220],
      Xtitle: ['人体工学椅', '笔记本电脑', '服务器', '联想电脑主机', 'iFoved显示器', '风扇', '空调', '热水器']
    }
    const PurchaseCost = () => {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose() //解决echarts dom已经加载的报错
      }
      myChart = echarts.init(document.getElementById('myChart')!)
      myChart.setOption({
        title: [
          {
            text: '库存数量',
            textStyle: {
              fontSize: 14
            }
          }
        ],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          axisLabel: {
            show: true,
            interval: 0,
            formatter: (params: any) => {
              let newParamsName = ''
              let paramsNameNumber = params.length
              let provideNumber = 2 //显示每行几个字
              let rowNumber = Math.ceil(paramsNameNumber / provideNumber)
              if (paramsNameNumber > provideNumber) {
                for (let p = 0; p < rowNumber; p++) {
                  let tempStr = ''
                  let start = p * provideNumber
                  let end = start + provideNumber
                  if (p == rowNumber - 1) {
                    tempStr = params.substring(start, paramsNameNumber)
                  } else {
                    tempStr = params.substring(start, end) + '\n'
                  }
                  newParamsName += tempStr
                }
              } else {
                newParamsName = params
              }
              return newParamsName
            }
          },

          data: datademo.Xtitle
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed'
              }
            }
          }
        ],
        series: [
          {
            name: '费用',
            data: datademo.money,
            type: 'bar',
            showBackground: true,
            barWidth: 30,
            backgroundStyle: {
              color: 'rgba(0,0,0,0)'
            },
            itemStyle: {
              color: '#0091ff'
            }
          }
        ]
      })
      window.onresize = function () {
        myChart.resize()
      }
    }
    /**
     * 左侧ECharts结束
     */

    /**
     * 右侧的模拟数据
     */

    let rightdemo = ref([
      {
        name: '人体工学椅',
        quantityL: 4200,
        percentage: 80
      },
      {
        name: '笔记本电脑',
        quantityL: 3200,
        percentage: 60
      },
      {
        name: '服务器',
        quantityL: 2200,
        percentage: 40
      },
      {
        name: '联想电脑主机',
        quantityL: 4200,
        percentage: 80
      },
      {
        name: 'iFoved显示器',
        quantityL: 5200,
        percentage: 90
      },
      {
        name: '风扇',
        quantityL: 1200,
        percentage: 10
      },
      {
        name: '空调',
        quantityL: 1400,
        percentage: 13
      }
    ])
    let rightdemo1 = [
      {
        name: '人体工学椅',
        quantityL: 4200,
        percentage: 80
      },
      {
        name: '笔记本电脑',
        quantityL: 3200,
        percentage: 60
      },
      {
        name: '服务器',
        quantityL: 2200,
        percentage: 40
      },
      {
        name: '联想电脑主机',
        quantityL: 4200,
        percentage: 80
      },
      {
        name: 'iFoved显示器',
        quantityL: 5200,
        percentage: 90
      },
      {
        name: '风扇',
        quantityL: 1200,
        percentage: 10
      },
      {
        name: '空调',
        quantityL: 3400,
        percentage: 33
      }
    ]
    let rightdemo2 = [
      {
        name: '笔记本电脑',
        quantityL: 400,
        percentage: 7
      },
      {
        name: '人体工学椅',
        quantityL: 3200,
        percentage: 60
      },
      {
        name: '服务器',
        quantityL: 2200,
        percentage: 40
      },
      {
        name: 'iFoved显示器',
        quantityL: 4200,
        percentage: 80
      },
      {
        name: '联想电脑主机',
        quantityL: 5200,
        percentage: 90
      },
      {
        name: '风扇',
        quantityL: 1200,
        percentage: 10
      },
      {
        name: '空调',
        quantityL: 2400,
        percentage: 23
      }
    ]
    /**
     * 右侧的数据结束
     */
    onMounted(() => {
      PurchaseCost()
    })
    return {
      rightdemo,
      data,
      changetime,
      datademo
    }
  }
})
</script>
<style lang="postcss" scoped>
.assetManagement-AssetInventory-index {
  :deep(.el-date-editor) {
    width: 220px;
  }
  :deep(.progress) {
    .el-progress {
      width: 300px;
    }
  }
}
</style>
