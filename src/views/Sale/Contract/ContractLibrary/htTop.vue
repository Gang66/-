<template>
  <div class='w-full h-full flex'>
    <el-col :md='24' :lg='5'>
      <div class='h-350 flex flex-col justify-between'>
        <htzl :data=' Analysis.info' :type='0' />
        <div class='bg-white rounded border-blue-300 flex-1 px-4 py-2 flex flex-col'>
          <div class='flex items-center'>
            <div>区域分布看板</div>
            <!-- <img :src='down' alt='' class='ml-1'> -->
          </div>
          <div class='w-full flex-1'>
            <div id='myecharts' ref='map' class='w-full h-full' />
          </div>
        </div>
      </div>
    </el-col>
    <el-col :md='24' :lg='7'>
      <div class='bg-white rounded border-blue-300 h-350 px-4 py-2 flex flex-col'>
        <el-dropdown @command='board.handleCommand'>
          <div class='flex items-center text-base text-black'>
            <div>{{ board.board_list[board.board_key].name }}</div>
            <img :src='down' alt='' class='ml-1'>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item v-for='itm in board.board_list' :key='itm.value' :command='itm.value'>{{ itm.name }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
        <div class='w-full flex-1'>
          <div id='basicBar' ref='bar' class='w-full h-full' />
        </div>
      </div>
    </el-col>
    <el-col :md='24' :lg='7'>
      <div class='bg-white rounded border-blue-300 h-350 p-1 ranking'>
        <div class='rounded border-blue-300 h-full w-full overflow-hidden'>
          <div class='flex items-center justify-center bg-qing h-12 font-semibold relative'
            :style='{background: rankInfo.rank_key == 2 ? &apos;linear-gradient(180deg, #7487AF 0%, #BECFE4 100%)&apos; : rankInfo.rank_key == 3 ? &apos;linear-gradient(180deg, #FFAFCA 0%, #FFC8DA 100%)&apos; : &apos;&apos;}'>
            <el-dropdown @command='rankInfo.handleCommand'>
              <div class='flex items-center text-base text-black'>
                <div>{{ rankInfo.rank_list[rankInfo.rank_key].name }}</div>
                <img :src='down' alt='' class='ml-1'>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for='itm in rankInfo.rank_list' :key='itm.value' :command='itm.value'>{{ itm.name }}</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>

            <div class='absolute w-5 h-5 bg-blue-50 rounded-sm right-4'>
              <img v-if='rankInfo.rank_key == 3' :src='findPink' alt='' class='w-full h-full p-0.5'>
              <img v-else :src='find' alt='' class='w-full h-full p-0.5'>
            </div>
          </div>
          <el-table :data='Analysis.UserRank' style='width: 100%;height: 290px' :fit='false' :header-cell-style='rankInfo.table_header'>
            <el-table-column type='index' label=' ' align='center' :width='30'>
              <template #default='scope'>
                <span v-if='scope.$index==0'>
                  <svg-icon icon-class='svg-jp1' style='font-size: 1.75rem; margin: 0 auto 0;' />
                </span>
                <span v-else-if='scope.$index==1'>
                  <svg-icon icon-class='svg-jp2' style='font-size: 1.75rem; margin: 0 auto 0;' />
                </span>
                <span v-else-if='scope.$index==2'>
                  <svg-icon icon-class='svg-jp3' style='font-size: 1.75rem; margin: 0 auto 0;' />
                </span>
                <span v-else style='line-height: 1.75rem' class='font-bold'>{{ scope.$index + 1 }}</span>
              </template>
            </el-table-column>
            <el-table-column prop='UserName' :label='rankInfo.rank_key == 0 ? &apos;部门&apos; : &apos;姓名&apos;' align='center' :width='98.5'>
              <template #default='scope'>
                <span class='flex items-center justify-center'
                  :class='scope.$index == 0 ? &apos;text-red-600&apos; : scope.$index == 1 ? &apos;text-blue-600&apos; : scope.$index == 2 ? &apos;text-yellow-600&apos; : &apos;&apos;'>
                  <div class='w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-1'>潍</div>
                  {{ scope.row.UserName }}
                </span>
              </template>
            </el-table-column>
            <template v-if='rankInfo.rank_key == 0'>
              <el-table-column prop='ywy_num' label='业务员数量' align='center' :width='93' />
              <el-table-column prop='ywy_num' label='合作单位数量' align='center' :width='93' />
              <el-table-column prop='ywy_num' label='合同总额' align='center' :width='94' />
            </template>
            <template v-else-if='rankInfo.rank_key == 1'>
              <el-table-column prop='ywy_num' label='合同总额' align='center' :width='93' />
              <el-table-column prop='ywy_num' label='合同次数' align='center' :width='93' />
              <el-table-column prop='ywy_num' label='成单率' align='center' :width='94' />
            </template>
            <template v-else-if='rankInfo.rank_key == 2 || rankInfo.rank_key == 3'>
              <el-table-column prop='ywy_num' label='合同量' align='center' :width='93' />
              <el-table-column prop='ywy_num' label='业绩金额' align='center' :width='93' />
              <el-table-column prop='ywy_num' label='成单率' align='center' :width='94' />
            </template>
            <template v-else>
              <el-table-column prop='ContractCount' label='负责人' align='center' :width='70' />
              <el-table-column prop='ContractCount' label='合同量' align='center' :width='70' />
              <el-table-column prop='Amount' label='业绩金额' align='center' :width='70' />
              <el-table-column prop='ratio' label='成单率' align='center' :width='70'>
                <template #default='scope'>
                  <span>
                    {{ scope.row.SuccessRate }}%
                  </span>
                </template>
              </el-table-column>
            </template>
          </el-table>
        </div>
      </div>
    </el-col>
    <el-col :md='24' :lg='5'>
      <div class='flex justify-between flex-col h-350'>
        <div class='bg-white border-blue-200 mb-1 rounded'>
          <div class='py-1 px-3 bg-qing shadow-md rounded-t'>工作量统计</div>
          <div class='grid grid-cols-4 gap-2 p-2 text-center'>
            <div class='rounded-xs bg-qing w-full h-full rounded text-sm px-0.5 pb-0.5 pt-1'>
              <div>新增</div>
              <div class='w-full bg-blue-50 rounded-md mt-1'>{{Analysis.info.NewCount}}</div>
            </div>
            <div class='rounded-xs bg-qing w-full h-full rounded text-sm px-0.5 pb-0.5 pt-1'>
              <div>已联系</div>
              <div class='w-full bg-blue-50 rounded-md mt-1'>{{Analysis.info.IsContactCount}}</div>
            </div>
            <div class='rounded-xs bg-qing w-full h-full rounded text-sm px-0.5 pb-0.5 pt-1'>
              <div>未联系</div>
              <div class='w-full bg-blue-50 rounded-md mt-1'>{{Analysis.info.UnContactCount}}</div>
            </div>
            <div class='rounded-xs bg-qing w-full h-full rounded text-sm px-0.5 pb-0.5 pt-1'>
              <div>成单</div>
              <div class='w-full bg-blue-50 rounded-md mt-1'>{{Analysis.info.SuccessCount}}</div>
            </div>
          </div>
        </div>
        <div class='bg-white  border-red-400 mb-1 text-white rounded'>
          <div class='py-1 px-3 bg-red-400 shadow-md rounded-t'>危机专栏</div>
          <div class='grid grid-cols-3 gap-2 p-2 text-center'>
            <div class='rounded-xs bg-yellow-500 w-full h-full rounded text-sm pt-1 flex flex-col justify-between'>
              <div>业绩量</div>
              <div class='w-full py-1 bg-red-400 rounded-md mt-1 flex items-center text-xs justify-center'>
                <div class='w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-0.5'>潍</div>
                <div>司徒坚强</div>
              </div>
            </div>
            <div class='rounded-xs bg-yellow-500 w-full h-full rounded text-sm pt-1 flex flex-col justify-between'>
              <div>成单率</div>
              <div class='w-full py-1 bg-red-400 rounded-md mt-1 flex items-center text-xs justify-center'>
                <div class='w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-0.5'>潍</div>
                <div>司徒坚强</div>
              </div>
            </div>
            <div class='rounded-xs bg-yellow-500 w-full h-full rounded text-sm pt-1 flex flex-col justify-between'>
              <div>部门人员</div>
              <div class='w-full py-1 bg-red-400 rounded-md mt-1 flex items-center text-xs justify-center'>
                <div class='w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-0.5'>潍</div>
                <div>司徒坚强</div>
              </div>
            </div>
          </div>
        </div>
        <div class='bg-white rounded border-blue-500 h-full overflow-hidden'>
          <div class='py-1 px-3 bg-blue-500 shadow-md text-white flex justify-between items-center'>
            <div class='flex items-center'>
              <div>分析意见</div>
              <el-tooltip placement='left-start'>
                <template #content>
                  <div class='max-w-xs'>
                    意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明意见说明
                  </div>
                </template>
                <svg-icon class='ml-1' icon-class='svg-yw' />
              </el-tooltip>
            </div>
            <div class='flex items-center text-xs'>
              <svg-icon icon-class='svg-bj' />
              <div class='ml-1'>编辑</div>
              <svg-icon class='ml-3' icon-class='svg-wc' />
              <div class='ml-1'>完成</div>
            </div>
          </div>
          <div class='flex text-sm py-1 px-2 border-b border-dashed border-blue-500 text-over h-12'>
            问题：
          </div>
          <div class='flex text-sm py-1 px-2 text-over'>
            分析思路：
          </div>
        </div>
      </div>
    </el-col>
  </div>

</template>

<script lang='ts' setup>
import { GetContractAnalysisByAmount, GetFormalUserRankContract, GetContractIndexInfo } from '/@/api/Sale/Contract'

import { ref, getCurrentInstance, onMounted, reactive } from 'vue'
import { mapData } from '/@/assets/map/mapData.js'

import htzl from './components/htzl.vue'

import down from '/@/assets/img/sale/contractlibrary/down.png'
import find from '/@/assets/img/sale/contractlibrary/find.png'
import findPink from '/@/assets/img/sale/contractlibrary/find-pink.png'

const Analysis = reactive({
  info: {},
  rank: <any>[],
  AmountRank: <any>[],
  UserRank: <any>[]
})

const getRankData = (val: any) => {
  getcontractAmount(val)
  getAnalysisinfo(val)
  getUserRank(val)
}
const getAnalysisinfo = (val: any) => {
  GetContractIndexInfo(val).then((res) => {
    if (res.code == 1) {
      Analysis.info = res.data.analysis
      Analysis.rank = res.data.rank
    }
  })
}

const getUserRank = (val: any) => {
  GetFormalUserRankContract(val).then((res) => {
    if (res.code == 1) {
      Analysis.UserRank = res.data
    }
  })
}

const getcontractAmount = (val: any) => {
  GetContractAnalysisByAmount(val).then((res) => {
    if (res.code == 1) {
      Analysis.AmountRank = res.data
      makeBar()
    }
  })
}

// 绘制地图
const { proxy } = getCurrentInstance() as any
const echarts = proxy.$echarts
// 地图数据
const mychart: any = ref({})
let chinamap: any = ref([])
chinamap.value = mapData
const mapRender = (data: any = [], chinamap: any = []) => {
  let mapLocal: any = []
  chinamap.forEach((value: any, index: number) => {
    console.log(value.properties.name)
    mapLocal.push(value.properties.name)
  })

  let city = ['北京', '重庆', '上海', '天津']
  let area: any = {
    内蒙古: '内蒙古自治区',
    新疆: '新疆维吾尔自治区',
    广西: '广西壮族自治区',
    宁夏: '宁夏回族自治区',
    西藏: '西藏自治区',
    澳门: '俺们特别行政区',
    香港: '香港特别行政区'
  }

  let result = data.map((i: any, index: number) => {
    let name = ''
    // 有 conNum 说明有子级
    if (i.conNum) {
      return {
        name: mapLocal[index],
        value: Number(i.conNum)
      }
    } else {
      if (city.find((x: any) => x === i.name)) {
        name = `${i.name}市`
      } else if (area[i.name]) {
        name = area[i.name]
      } else {
        name = `${i.name}省`
      }
      return {
        name,
        value: Number(i.value)
      }
    }
  })

  let option = {
    title: {
      text: '',
      left: 'right'
    },

    tooltip: {
      trigger: 'item',
      showDelay: 0,
      formatter: function (params: any) {
        var city: any = Analysis.rank.find((x: any) => x.Name == params.name)
        var count = 0
        if (city) {
          count = city.Count
        }
        console.log(params)
        return ' 合同量: ' + count
      },
      transitionDuration: 0.2
    },
    series: [
      {
        name: '中国地图',
        type: 'map',
        roam: true,
        map: 'china',
        zoom: 1.2,
        // 设置地图的文字
        label: {
          show: true,
          fontSize: 8,
          color: '#333333'
        },
        emphasis: {
          label: {
            show: true
          }
        },
        data: result
      }
    ]
  }
  return option
}

// 绘制地图
const makeMap = () => {
  console.log('99999999999999')
  mychart.value = echarts.init(document.getElementById('myecharts'))
  echarts.registerMap('china', chinamap.value)
  mychart.value.setOption(mapRender(chinamap.value.features))
}

// 柱状图
const bar: any = ref({})
const barOption = () => {
  let option = {
    color: '#027AFF',
    tooltip: {},
    xAxis: {
      type: 'category',
      data: ['≤1', '1>X≥5', '5<X≤10', '>10']
    },
    yAxis: {
      name: '合同量',
      type: 'value'
    },
    series: [
      {
        data: Analysis.AmountRank,
        type: 'bar',
        barWidth: 30
      }
    ]
  }
  return option
}
// 绘制柱状图
const makeBar = () => {
  // 绘制柱状图
  let domMap = <any>document.getElementById('basicBar')
  domMap.removeAttribute('_echarts_instance_')
  mychart.value = echarts.init(domMap)
  mychart.value.setOption(barOption(), true)
}

// 饼状图
const pie: any = ref({})
const pieOption = () => {
  let option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: 'bottom'
    },
    series: [
      {
        name: '',
        type: 'pie',
        radius: '50%',
        label: {
          formatter: '{b}\n{c}'
        },
        data: [
          { value: 265, name: '环保工程' },
          { value: 265, name: '市政工程' },
          { value: 250, name: '机械制造' },
          { value: 325, name: '化工行业' }
        ]
      }
    ]
  }
  return option
}
// 绘制饼状图
const makePie = () => {
  let domMap = <any>document.getElementById('basicBar')
  domMap.removeAttribute('_echarts_instance_')
  mychart.value = echarts.init(domMap)
  mychart.value.setOption(pieOption(), true)
}

// 员工排行榜模块
const rankInfo = reactive({
  rank_key: 5,
  rank_list: [
    { value: 0, name: '部门分析排行榜' },
    { value: 1, name: '客户分析排行榜' },
    { value: 2, name: '合同黑榜' },
    { value: 3, name: '合同红榜' },
    { value: 4, name: '试用期员工排行榜' },
    { value: 5, name: '正式员工排行榜' }
  ],
  // 切换
  handleCommand: (e: any) => {
    rankInfo.rank_key = e
  },
  list: [
    {
      name: '司徒坚强',
      people: '张默默',
      ywy_num: 11,
      num: '689',
      money: '126',
      ratio: '12.8%'
    },
    {
      name: '司徒坚强',
      people: '张默默',
      num: '689',
      ywy_num: 11,
      money: '126',
      ratio: '12.8%'
    },
    {
      name: '司徒坚强',
      people: '张默默',
      num: '689',
      ywy_num: 11,
      money: '126',
      ratio: '12.8%'
    },
    {
      name: '司徒坚强',
      people: '张默默',
      num: '689',
      ywy_num: 11,
      money: '126',
      ratio: '12.8%'
    },
    {
      name: '司徒坚强',
      people: '张默默',
      num: '689',
      ywy_num: 11,
      money: '126',
      ratio: '12.8%'
    },
    {
      name: '司徒坚强',
      people: '张默默',
      num: '689',
      ywy_num: 11,
      money: '126',
      ratio: '12.8%'
    },
    {
      name: '司徒坚强',
      people: '张默默',
      num: '689',
      ywy_num: 11,
      money: '126',
      ratio: '12.8%'
    }
  ],
  table_header: {
    color: '#000',
    'border-bottom': '1px solid #707070'
  }
})

// 分布看板模块
const board = reactive({
  board_key: 0,
  board_list: [
    { value: 0, name: '合同分布看板' },
    { value: 1, name: '成单率分布看板' },
    { value: 2, name: '签单人员分布看板' },
    { value: 3, name: '行业分布看板' }
  ],
  // 切换
  handleCommand: (e: any) => {
    board.board_key = e
    if (e == 0) {
      makeBar()
    } else {
      makePie()
    }
  }
})

// 向父组件暴露方法
defineExpose({
  getRankData,
  makeMap,
  makeBar
})
</script>

<style scoped>
.ranking {
  :deep(.el-table .cell) {
    padding: 0;
  }
  :deep(.el-table .el-table__cell) {
    padding: 2px 0;
  }
}
.text-over {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.bg-qing {
  background: #76d2ff;
}
</style>
