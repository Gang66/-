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
      <!-- 顶部选项卡切换 -->
      <div class="w-full flex justify-between mt-2">
        <div v-for="(item, index) in data.ChangePeople" :key="index" class="h-24 w-1/4 ml-2 bg-white p-4 cursor-pointer" :class="[{ 'bg-blue-500': data.CurrentColor === index }, { 'ml-0': index === 0 }]" @click="ChangeTab(index, item.id)">
          <div class="flex">
            <!-- 左侧图表 -->
            <div class="w-14 h-14 rounded bg-blue-200 text-center leading-12 text-4xl pt-2 text-blue-400" :class="{ Current: data.CurrentColor === index }">
              <el-icon><el-icon-Avatar /></el-icon>
            </div>
            <!-- 右侧文字 -->
            <div class="flex flex-col justify-between ml-4" :class="{ 'text-white': data.CurrentColor === index }">
              <!-- 上方文字 -->
              <span>{{ item.tit }}</span>
              <!-- 下方数字 -->
              <span class="text-gray-400" :class="{ 'text-white': data.CurrentColor === index }">{{ item.number }}</span>
            </div>
          </div>
        </div>
      </div>
      <!--中间两行8个图-->
      <div class="mt-2">
        <!-- 第一行的四个 -->
        <div class="flex Sixpicture">
          <!-- 课件类型数量排名 -->
          <div class="h-72 w-1/4 bg-white p-2">
            <div class="text-sm font-bold">课件类型数量排名</div>
            <div v-for="(item, index) in CoursewareType" :key="index" class="flex justify-between mt-6 text-xs pl-2">
              <template v-if="index < 5">
                <div v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></div>
                <div v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></div>
                <div v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></div>
                <div v-else>&nbsp;&nbsp;{{ index + 1 }}</div>
                <div class="ml-2 mr-2">{{ item.CourseName }}</div>
                <div class="flex-1">
                  <el-progress :percentage="item.percentage"> {{ item.CourseCount }}</el-progress>
                </div>
              </template>
            </div>
          </div>
          <!-- 左侧课件类型 -->
          <div class="h-72 w-1/4 bg-white p-2 ml-2 StudyTypeStyle">
            <div class="flex justify-around">
              <span @click="triggerTit(0)" class="cursor-pointer" :class="{ 'text-blue-400': currentTitIndex === 0 }">已制作课件</span>
              <span @click="triggerTit(1)" class="cursor-pointer" :class="{ 'text-blue-400': currentTitIndex === 1 }">未制作课件</span>
            </div>
            <div class="flex justify-between items-start">
              <a href="javascript:;" @click="trigger(-1)" :class="{ disabled: currentIndex === 0 }" class="mt-1">
                <el-icon><el-icon-CaretLeft /></el-icon>
              </a>
              <div class="flex truncate w-52 h-12" ref="totalWidth">
                <div v-for="(item, index) in postList" :key="item.Id" class="text-center text-sm cursor-pointer moveStyle leading-7" :style="{ transform: `translateX(${-currentIndex * x}px)` }" :class="{ 'text-blue-400': index === currentWork }" @click="triggerWork(index, item.DicKey)">
                  {{ item.DicValue }}
                </div>
              </div>
              <a href="javascript:;" @click="trigger(1)" :class="{ disabled: currentIndex === Math.floor(countPost / 3) }" class="mt-1">
                <el-icon>
                  <el-icon-CaretRight />
                </el-icon>
              </a>
            </div>
            <router-link to="/CourseMarket"> <div id="myChart" class="h-52 w-full bg-white p-2 ml-2" @click=""></div></router-link>
          </div>
          <!-- 新人训课件学习数(次) -->
          <div class="h-72 w-1/4 bg-white p-2 ml-2">
            <div class="text-sm font-bold">新人训课件学习数(次)</div>
            <div v-for="(item, index) in frequency" :key="index" class="flex items-center m-4 text-xs">
              <div>&nbsp;{{ index + 1 }}</div>
              <div class="flex flex-col flex-1 ml-4">
                <div>
                  <span class="text-xs">{{ item.CoursewareName }}</span>
                </div>
                <div>
                  <el-progress :percentage="item.percentage"> {{ item.Count }}</el-progress>
                </div>
              </div>
            </div>
          </div>

          <!-- 新人学习时间/新人学习成绩 -->
          <div class="h-72 w-1/4 bg-white p-2 ml-2">
            <el-tabs v-model="data.Study" class="demo-tabs" @tab-click="StudyClick">
              <el-tab-pane label="新人训学习时间" name="first">
                <el-row v-for="(item, index) in ShowStudy" :key="index" class="flex justify-between m-4 text-xs" v-if="changeTit == 'first'">
                  <el-col :span="3" v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></el-col>
                  <el-col :span="3" v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></el-col>
                  <el-col :span="3" v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></el-col>
                  <el-col :span="3" v-else>&nbsp;&nbsp;{{ index + 1 }}</el-col>
                  <el-col :span="6">
                    <span class="text-xs">{{ item.Name }}</span>
                  </el-col>
                  <el-col :span="9">
                    <DepTabridge :key="index + '12'" :deptDetails="{ DivisionName: item.CompName, DeptName: item.DeptName }"></DepTabridge>
                  </el-col>
                  <el-col :span="6" class="text-center">{{ item.Time }} </el-col>
                </el-row>
              </el-tab-pane>
              <el-tab-pane label="新人训学习成绩" name="second">
                <el-row v-for="(item, index) in ShowStudy" :key="index" class="flex justify-between m-4 text-xs" v-if="changeTit == 'second'">
                  <el-col :span="3" v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></el-col>
                  <el-col :span="3" v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></el-col>
                  <el-col :span="3" v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></el-col>
                  <el-col :span="3" v-else>&nbsp;&nbsp;{{ index + 1 }}</el-col>
                  <el-col :span="6">
                    <span class="text-xs">{{ item.Name }}</span>
                  </el-col>
                  <el-col :span="9">
                    <DepTabridge :key="index + '11'" :deptDetails="{ DivisionName: item.CompName, DeptName: item.DeptName }"></DepTabridge>
                  </el-col>
                  <el-col :span="6" class="text-center">{{ item.Score }}</el-col>
                </el-row>
              </el-tab-pane>
            </el-tabs>
            <!-- {{ ShowStudy }} -->
          </div>
        </div>
        <!-- 第二行的四个 -->
        <div class="flex mt-2 Sixpicture">
          <!-- 左侧深造理由排名 -->
          <div class="h-72 w-1/4 bg-white p-2">
            <div class="text-sm font-bold mb-8">深造理由排名</div>
            <el-row v-for="(item, index) in reason" :key="index" class="flex justify-between m-4 text-xs">
              <el-col :span="3" v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else>&nbsp;&nbsp;{{ index + 1 }}</el-col>
              <el-col :span="18">
                <span class="text-xs">{{ item.Reason }}</span>
              </el-col>
              <el-col :span="3" class="text-center">{{ item.ReasonCount }}</el-col>
            </el-row>
          </div>
          <!-- 关停次数排名 -->
          <div class="h-72 w-1/4 bg-white p-2 ml-2">
            <div class="text-sm font-bold mb-8">关停次数排名</div>
            <el-row v-for="(item, index) in furtherStudy" :key="index" class="flex justify-between m-4 text-xs">
              <el-col :span="3" v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else>&nbsp;&nbsp;{{ index + 1 }}</el-col>
              <el-col :span="9">
                <span class="text-xs">{{ item.UserName }}</span>
              </el-col>
              <el-col :span="10">
                <DepTabridge :deptDetails="{ DivisionName: item.CompName, DeptName: item.DeptName }"></DepTabridge>
              </el-col>
              <el-col :span="2" class="text-center">{{ item.LearnCount }}</el-col>
            </el-row>
          </div>
          <!-- 深造课件次数 -->
          <div class="h-72 w-1/4 bg-white p-2 ml-2">
            <div class="text-sm font-bold mb-8">深造课件次数</div>
            <el-row v-for="(item, index) in count" :key="index" class="flex justify-between m-4 text-xs">
              <el-col :span="3" v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else>&nbsp;&nbsp;{{ index + 1 }}</el-col>
              <el-col :span="18">
                <span class="text-xs">{{ item.Reason }}</span>
              </el-col>

              <el-col :span="3" class="text-center">{{ item.ReasonCount }}</el-col>
            </el-row>
          </div>
          <!-- 深造课件均分 -->
          <div class="h-72 w-1/4 bg-white p-2 ml-2">
            <div class="text-sm font-bold mb-8">深造课件均分</div>
            <el-row v-for="(item, index) in Score" :key="index" class="flex justify-between m-4 text-xs">
              <el-col :span="3" v-if="index === 0"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/goldMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 1"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/silverMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else-if="index === 2"><img class="w-4" src="../../../../../assets/img/hr/assetManagement/bronzeMedal.png" alt="" /></el-col>
              <el-col :span="3" v-else>&nbsp;&nbsp;{{ index + 1 }}</el-col>
              <el-col :span="18">
                <span class="text-xs">{{ item.CourseName }}</span>
              </el-col>

              <el-col :span="3" class="text-center">{{ item.CourseScore }}</el-col>
            </el-row>
          </div>
        </div>
      </div>
      <!-- 下列table表格 -->
      <div class="mt-4">
        <el-card> <purchaseForm :tableData="tableData" /></el-card>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, nextTick } from 'vue'
import purchaseForm from './_Components/purchaseForm.vue'
import DepTabridge from '/@/components/DepTabridge/index.vue'
import { useCommonStore } from '/@/store/modules/Common'
import { GetPlanCourseTypeList, GetHRAyNewsTrainUserList, GetHRAyNewsTrainCoursewareList, GetHRAyNewsTrainScoreList, GetHRAyNewsTrainTimeList, GetForceReasonList, GetAyAlterPlanCount, GetForceCourseList, GetAyFocePlanScoreList, GetForceUserList, GetPlanUserStudyList, GetAyMakeTrainCourseWareList } from '/@/api/hr/DataAnalysis'

import * as echarts from 'echarts'
const store = useCommonStore()
let myChart: any = null
let myChart1: any = null

export default defineComponent({
  name: 'AssetProcurement',
  components: {
    purchaseForm,
    DepTabridge
  },
  setup() {
    //#region 定义的所有变量
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

      // 顶部切换人员的数据
      ChangePeople: [
        {
          id: '1',
          tit: '在职新人训',
          number: null as any
        },
        {
          id: '2',
          tit: '离职新人训',
          number: null as any
        },
        {
          id: '3',
          tit: '历史新人训',
          number: null as any
        },
        {
          id: '4',
          tit: '深造中人员',
          number: 26
        },
        {
          id: '5',
          tit: '历史深造人员',
          number: 16
        }
      ],
      // 顶部点击高亮显示
      CurrentColor: 0,
      // 新人训时间与成绩切换
      Study: 'first',
      // 柱状图中tab切换高亮
      currentIndex: 0,
      total: null as any
    })
    //#endregion

    // 传入、子组件table数据
    let tableData = reactive({
      // table表格的内容数据
      // table大标题
      bigTitle: '在职新人训',
      // table表格的动态标题
      tableDataTit: {
        timeStart: '新人训开始时间',
        timeEnd: '新人训结束时间',
        details: '新人训详情'
      },
      type: null as any
    })

    // 新人训标题
    const rookieTraining = {
      timeStart: '新人训开始时间',
      timeEnd: '新人训结束时间',
      details: '新人训详情'
    }
    // 深造标题
    const furtherEducation = {
      timeStart: '深造开始时间',
      timeEnd: '深造结束时间',
      details: '深造详情'
    }

    // 顶部新人训学习人员数量
    const findHRAyNewsTrainUserList = async (val: any) => {
      const res = await GetHRAyNewsTrainUserList(val)
      // console.log(res.data)
      data.ChangePeople.forEach((item: any, index: number) => {
        switch ('1') {
          case item.id:
            item.number = res.data.nowuser
            break
        }
        switch ('2') {
          case item.id:
            item.number = res.data.resignuser
            break
        }
        switch ('3') {
          case item.id:
            item.number = res.data.historyuser
            break
        }
      })
    }
    findHRAyNewsTrainUserList(null)
    // 顶部深造人员数量
    const findForceUserList = async (val: any) => {
      const res = await GetForceUserList(val)
      // console.log(res.data)
      data.ChangePeople.forEach((item: any, index: number) => {
        switch ('4') {
          case item.id:
            item.number = res.data.NowForceCount
            break
        }
        switch ('5') {
          case item.id:
            item.number = res.data.OldForceCount
            break
        }
      })
    }
    findForceUserList(null)

    //#region  顶部筛选代码
    // 切换时间时的高亮以及数据更新
    const changetime = (val: any) => {
      data.currentday = val
      if (val === 0) {
        // datademo = datademo1
      } else if (val === 1) {
        // datademo = datademo2
      } else if (val === 2) {
        // datademo = datademo3
      } else if (val === 3) {
      } else if (val === 4) {
        // datademo = datademo3
      }
      PurchaseCost()
    }

    // 顶部tab切换
    const ChangeTab = async (index: number, Id: any) => {
      data.CurrentColor = index
      tableData.type = Id
      if (index === 0) {
        tableData.bigTitle = '在职新人训'
        tableData.tableDataTit = rookieTraining
        // GetPlanUserStudyList(Id, null)
      } else if (index === 1) {
        tableData.bigTitle = '离职新人训'
        tableData.tableDataTit = rookieTraining
      } else if (index === 2) {
        tableData.bigTitle = '历史新人训'
        tableData.tableDataTit = rookieTraining
      } else if (index === 3) {
        tableData.bigTitle = '深造中人员'
        tableData.tableDataTit = furtherEducation
      } else if (index === 4) {
        tableData.bigTitle = '历史深造人员'
        tableData.tableDataTit = furtherEducation
      }
    }
    //#endregion

    //#region 上左一 课件类型排名
    let CoursewareType = ref()
    const findtPlanCourseTypeList = async (val: any) => {
      await GetPlanCourseTypeList(val).then((res: any) => {
        // console.log(res.data)
        const arr: any = []
        res.data.forEach((item: any, index: number, self: any) => {
          if (index < 5) {
            arr.push(item)
            item.percentage = (item.CourseCount / self[0].CourseCount) * 100
          }
        })
        // console.log(arr)

        CoursewareType.value = arr
      })
    }
    findtPlanCourseTypeList(null)
    //#endregion

    //#region 上左二侧ECharts 课件类型
    let datademo = ref({
      number: [],
      Xtitle: []
    })
    // 筛选参数
    let filterList = ref({
      Type: '2',
      PostIds: null as any
    })
    let filterListDemo = {
      Type: null as any,
      PostIds: ''
    }
    const PurchaseCost = () => {
      if (myChart != null && myChart != '' && myChart != undefined) {
        myChart.dispose() //解决echarts dom已经加载的报错
      }
      myChart = echarts.init(document.getElementById('myChart')!)
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          axisTick: false,
          axisLabel: {
            show: true,
            interval: 0,
            formatter: (params: any) => {
              let newParamsName = ''
              let paramsNameNumber = params.length
              let provideNumber = 4 //显示每行几个字
              let rowNumber = Math.floor(paramsNameNumber / provideNumber)
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

          data: datademo.value.Xtitle
        },
        yAxis: [
          {
            type: 'value',
            splitLine: {
              show: false,
              lineStyle: {
                type: 'dashed'
              }
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              show: false
            },
            axisTick: {
              show: false
            }
          }
        ],
        grid: {
          x: 5,
          y: 35,
          x2: 5,
          y2: 20,
          borderWidth: 1
        },
        series: [
          {
            name: '数量',
            data: datademo.value.number,
            type: 'bar',
            showBackground: true,
            barWidth: 20,
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
    // 制作未制作课件
    const findAyMakeTrainCourseWareList = async (form: any) => {
      const res = await GetAyMakeTrainCourseWareList(form)
      let arr: any = []
      res.data.forEach((item: any, index: number) => {
        if (index < 4) {
          arr.push(item.Count)
        }
      })
      datademo.value.number = arr
      PurchaseCost()
    }
    findAyMakeTrainCourseWareList(filterList.value)
    // 控制制作课件的高亮
    const currentTitIndex = ref(0)
    const triggerTit = async (val: any) => {
      currentTitIndex.value = val

      if (val === 0) {
        // 已制作课件的数据 =
        currentWork.value = 0
        currentIndex.value = 0
        filterList.value = JSON.parse(JSON.stringify(filterListDemo))
        filterList.value.Type = '2'
        console.log(filterList.value)
        findAyMakeTrainCourseWareList(filterList.value)
      } else if (val === 1) {
        // 未制作课件的数据= datademo
        currentWork.value = 0
        currentIndex.value = 0
        filterList.value = JSON.parse(JSON.stringify(filterListDemo))
        // filterList.value = filterListDemo
        filterList.value.Type = '1'
        findAyMakeTrainCourseWareList(filterList.value)
      }
      PurchaseCost()
    }
    //  获取岗位数据
    const postList = ref()
    const countPost = ref()
    store.getDict('CoursewareCodeType').then((res: any) => {
      // console.log(res)
      const arr = { DicValue: '全部', DicKey: null }
      postList.value = res
      postList.value.unshift(arr)
      countPost.value = res.length
    })
    // 控制左右两个箭头
    const currentIndex = ref(0)
    const trigger = (val: any) => {
      currentIndex.value += val
      if (currentIndex.value > Math.floor(countPost.value / 3)) {
        currentIndex.value = Math.floor(countPost.value / 3)
      } else if (currentIndex.value < 0) {
        currentIndex.value = 0
      }
    }

    // 获取字典内容
    store.getDict('CoursewareClass').then((res: any) => {
      // console.log(res)
      const arr: any = []
      res.forEach((item: any, index: number) => {
        if (index < 4) {
          // console.log(item.DicValue)
          arr.push(item.DicValue)
        }
      })
      datademo.value.Xtitle = arr

      PurchaseCost()
    })

    // 控制岗位数据的切换高亮
    const currentWork = ref(0)
    const triggerWork = (val: any, id: any) => {
      filterList.value.PostIds = id
      currentWork.value = val
      findAyMakeTrainCourseWareList(filterList.value)

      // 用id调接口换数据
    }
    // 获取需要平移的div的宽度
    const totalWidth = ref()
    const x = ref()
    onMounted(() => {
      nextTick(() => {
        x.value = totalWidth.value.clientWidth
        console.log(totalWidth.value.clientWidth)
      })
    })
    //#endregion

    //#region  上左三 新人课件学习次数
    let frequency = ref([])
    const findHRAyNewsTrainCoursewareList = async () => {
      const res = await GetHRAyNewsTrainCoursewareList(null)
      const arr: any = []
      res.data.forEach((item: any, index: number, self: any) => {
        if (index < 5) {
          item.percentage = (item.Count / self[0].Count) * 100
          arr.push(item)
        }
      })
      // console.log(arr)
      frequency.value = arr
    }
    findHRAyNewsTrainCoursewareList()
    //#endregion

    //#region 上左四 新人训学习时间/成绩

    //学习时间排名
    let ShowStudy = ref(null)
    const changeTit = ref()
    const findHRAyNewsTrainTimeList = async () => {
      const res = await GetHRAyNewsTrainTimeList(null)
      const arr: any = []
      res.data.forEach((item: any, index: number) => {
        if (index < 5) {
          arr.push(item)
        }
      })
      ShowStudy.value = arr
      changeTit.value = 'first'
    }
    findHRAyNewsTrainTimeList()

    // tab切换
    const StudyClick = async (tab: any, event: any) => {
      if (tab.props.name == 'first') {
        findHRAyNewsTrainTimeList()
        // ShowStudy.value = StudyTime
      }
      if (tab.props.name == 'second') {
        const res = await GetHRAyNewsTrainScoreList(null)
        const arr: any = []
        res.data.forEach((item: any, index: number) => {
          if (index < 5) {
            arr.push(item)
          }
        })
        // console.log(arr)

        ShowStudy.value = arr
        // ShowStudy.value = StudyScore
        changeTit.value = tab.props.name
      }
    }
    //#endregion

    //#region  深造理由排名
    const reason = ref()
    const findForceReasonList = async () => {
      const res = await GetForceReasonList(null)
      const arr: any = []
      res.data.forEach((item: any, index: number) => {
        if (index < 5) {
          arr.push(item)
        }
      })
      reason.value = arr
    }
    findForceReasonList()

    //#endregion

    //#region 下左二 关停次数排名
    const furtherStudy = ref()
    const findAyAlterPlanCount = async () => {
      const res = await GetAyAlterPlanCount(null)
      const arr: any = []
      res.data.forEach((item: any, index: number) => {
        if (index < 5) {
          arr.push(item)
        }
      })
      // console.log(arr)
      furtherStudy.value = arr
    }
    findAyAlterPlanCount()
    //#endregion

    //#region  下左三 深造课件次数
    let count = ref()
    const findForceCourseList = async () => {
      const res = await GetForceCourseList(null)
      const arr: any = []
      res.data.forEach((item: any, index: number) => {
        if (index < 5) {
          arr.push(item)
        }
      })
      // console.log(arr)
      count.value = arr
    }
    findForceCourseList()
    //#endregion

    //#region 下左四 深造课件均分
    const Score = ref()
    const findAyFocePlanScoreList = async () => {
      const res = await GetAyFocePlanScoreList(null)
      const arr: any = []
      res.data.forEach((item: any, index: number) => {
        if (index < 5) {
          arr.push(item)
        }
      })
      // console.log(arr)
      Score.value = arr
    }
    findAyFocePlanScoreList()
    //#endregion

    return {
      filterList,
      reason,
      changeTit,
      findtPlanCourseTypeList,
      tableData,
      countPost,
      postList,
      x,
      totalWidth,
      Score,
      count,
      furtherStudy,
      currentWork,
      triggerWork,
      triggerTit,
      currentTitIndex,
      trigger,
      currentIndex,
      ShowStudy,
      StudyClick,
      frequency,
      ChangeTab,
      CoursewareType,
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
  .StudyTypeStyle {
    .moveStyle {
      transition: transform 2s;
      flex: 0 0 33.3%;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    .Current {
      background-color: white;
    }
    .disabled {
      cursor: not-allowed;
    }
  }
}
</style>
