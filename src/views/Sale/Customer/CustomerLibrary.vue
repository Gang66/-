<template>
  <div class='bf-Customer home-content'>
    <el-row :gutter='10'>
      <el-col :md='24' :lg='4'>
        <div class='p-2 '>
          <div class='home-cusnum h-60 w-60'>
            <div class='text-center  text-gray-100 text-xl font-bold'>
              <div class='pt-14 '>当前客户总数</div>
              <div class='text-3xl pt-2'>88888个</div>
              <div class='pt-5'>NO.1第一大区</div>
              <div class='pt-1'>88888个</div>
            </div>
          </div>
          <div class='w-60 h-60  text-gray-100 font-bold text-center ml-2 pr-3 pb-3 relative'>
            <div class='w-1/2  h-1/2 float-left p-1'>
              <div class='h-full home-cusbj'>
                <div class='pt-2'>有报价客户</div>
                <div class='text-xl'>88888个</div>
              </div>
            </div>
            <div class='w-1/2  h-1/2 float-left p-1'>
              <div class='h-full home-cusht'>
                <div class='pt-2'>有合同客户</div>
                <div class='text-xl'>88888个</div>
              </div>
            </div>
            <div class='w-1/2  h-1/2 float-left p-1'>
              <div class='h-full home-cuswbj'>
                <div class='pt-12'>无报价客户</div>
                <div class='text-2xl'>88888个</div>
              </div>
            </div>
            <div class='w-1/2  h-1/2 float-left p-1'>
              <div class='h-full home-cuswht'>
                <div class='pt-12'>无合同客户</div>
                <div class='text-xl'>88888个</div>
              </div>
            </div>
            <div class='w-1/2  h-1/2 p-1 float-left' style='position: absolute; top:3.6rem;left:3.3rem'>
              <div class='h-full home-cuslz'>
                <div class='pt-8'>离职员客户</div>
                <div class='text-xl'>88888个</div>
              </div>
            </div>

          </div>
        </div>
      </el-col>
      <el-col :md='24' :lg='16'>
        <div class='p-2 relative'>
          <div class='home-custop flex '>
            <div class='w-60 h-16 pb-10 text-gray-100 text-2xl font-bold text-center p-2 rounded-t-lg ' style='background: linear-gradient(180deg, #33B3FF 0%, #92D1FF 100%);'>
              客户分布看板
            </div>
            <div class='px-5 py-2 text-gray-100 text-xl font-bold text-center bg-blue-500 rounded-xl ml-3 mb-4'>
              集团
            </div>
            <div class='pt-5'>
              <img src='../../../assets/img/sale/customer/lianjie.png' alt=''>
            </div>
            <div class='px-5 py-2 text-gray-100 text-xl font-bold text-center bg-blue-500 rounded-xl mb-4'>
              第一大区
            </div>
            <div class='pt-5'>
              <img src='../../../assets/img/sale/customer/lianjie.png' alt=''>
            </div>
            <div class='px-5 py-2 text-gray-100 text-xl font-bold text-center bg-blue-500 rounded-xl mb-4'>
              潍坊事业部
            </div>
            <div class='pt-5'>
              <img src='../../../assets/img/sale/customer/lianjie.png' alt=''>
            </div>
            <div class='px-5 py-2 text-gray-100 text-xl font-bold text-center bg-blue-500 rounded-xl mb-4'>
              销售一部
            </div>
            <div class='pt-5'>
              <img src='../../../assets/img/sale/customer/lianjie.png' alt=''>
            </div>
            <div class='px-5 py-2 text-gray-100 text-xl font-bold text-center bg-blue-300 rounded-xl mb-4'>
              员工
            </div>
          </div>
          <div class='home-map bg-gradient-to-r from-sky-300 to-sky-200 p-5 flex rounded-2xl'>
            <div class='home-cusmap'>
              <div id='myecharts' ref='map' />
              <el-button @click="mapback">返回</el-button>
            </div>
            <div>
              <div class='flex font-semibold w-60 text-center' style='border-bottom:1px solid #303133'>
                <div class='w-1/2'>行业分类</div>
                <div class='w-1/2'>行业客户占比</div>
              </div>
              <div v-for='i in 10' :key='i' class='flex font-semibold w-60 text-center h-13 pt-2' style='border-bottom: 1px solid #AFC8EC;'>
                <div class='w-1/2'>{{ CumSelectType.Name }}</div>
                <div class='w-1/2'>{{ CumSelectType.Num }}</div>
              </div>
            </div>
          </div>
        </div>

      </el-col>
      <el-col :md='24' :lg='4'>
        <div class='p-2 pt-5 w-60 '>
          <div class='hom_cussjkb p-5'>
            <div class='text-gray-100 flex justify-between '>
              <div>
                数据看板
              </div>
              <div>
                <img src='../../../assets/img/sale/customer/cuskbbut.png' alt=''>
              </div>

            </div>
            <div class='py-6'>
              <div class=' bg-opacity-50 bg-zinc-200   p-2  rounded-2xl font-semibold' style='border: 1px solid rgba(255, 255, 255, 0.5019607843137255);'>
                业务量排名
                <div class='flex px-2 py-2 text-gray-100 text-center'>
                  <el-row :gutter='10'>
                    <el-col :lg='12'>
                      <div class='bg-sky-500 py-6'>
                        <div class='flex pl-5'>
                          <svg-icon icon-class='svg-good' />
                          <div class='pl-2'>1</div>
                        </div>
                        <div>第一大区</div>
                      </div>
                    </el-col>
                    <el-col :lg='12'>
                      <div class='bg-sky-500 py-6'>
                        <div class='flex pl-5'>
                          <svg-icon icon-class='svg-bad' />
                          <div class='pl-2'>1</div>
                        </div>
                        <div>第三大区</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class=' bg-opacity-50 bg-zinc-200  mt-8 p-2  rounded-2xl font-semibold' style='border: 1px solid rgba(255, 255, 255, 0.5019607843137255);'>
                部门排名
                <div class='flex px-2 py-2 text-gray-100 text-center'>
                  <el-row :gutter='10'>
                    <el-col :lg='12'>
                      <div class='bg-sky-500 py-6'>
                        <div class='flex pl-5'>
                          <svg-icon icon-class='svg-good' />
                          <div class='pl-2'>1</div>
                        </div>
                        <div>第一大区</div>
                      </div>
                    </el-col>
                    <el-col :lg='12'>
                      <div class='bg-sky-500 py-6'>
                        <div class='flex pl-5'>
                          <svg-icon icon-class='svg-bad' />
                          <div class='pl-2'>1</div>
                        </div>
                        <div>第三大区</div>
                      </div>
                    </el-col>
                  </el-row>
                </div>
              </div>

            </div>
          </div>
        </div>

      </el-col>
      <el-col :md='24' :lg='24'>
        <div class='relative'>
          <div class='hom_custab px-14 pt-5 flex justify-between ' style='width: 64rem; flex; height:5rem;    position: absolute;top: -66px;left: 218px;'>
            <div>
              <el-input placeholder='请输入内容' class='tabinput' />
              <span>并列</span>
              <el-select placeholder='请选择' class='tabselect'>
                <el-option>筛选条件</el-option>
              </el-select>
              <el-button class='tabbutselect'>搜索</el-button>
              <el-button class='tabbutclear'>搜索</el-button>
            </div>
            <div class='flex'>
              <el-select placeholder='请选择' class='tabselect'>
                <el-option>筛选条件</el-option>
              </el-select>
              <div>
                <svg-icon icon-class='svg-mulu' style='    font-size: 2.5rem; margin-left:1rem;' />
              </div>
            </div>

          </div>
          <div>
            <el-table
              :header-cell-style="{ 'background':'#7A9DEF', 'color': '#F5F8FF' ,'height':'2rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }"
              :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" :data='tableData' style='width: 100%'>
              <el-table-column prop='date' label='序号' />
              <el-table-column prop='date' label='录入日期' />
              <el-table-column prop='date' label='客户名称' />
              <el-table-column prop='date' label='客户划分'>
                <el-table-column prop='date' label='等级' />
                <el-table-column prop='date' label='分类' />
                <el-table-column prop='date' label='区域' />
              </el-table-column>
              <el-table-column prop='date' label='业务数量（单）'>
                <el-table-column prop='date' label='报价/合同/成单率' width='200' />
              </el-table-column>
              <el-table-column prop='date' label='业务金额（万元）'>
                <el-table-column prop='date' label='报价/合同/成单率' width='200' />
              </el-table-column>
              <el-table-column prop='date' label='状态' />
              <el-table-column prop='date' label='管理信息'>
                <el-table-column prop='date' label='渠道' />
                <el-table-column prop='date' label='情报' />
              </el-table-column>

            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>

</template>
<script lang="ts">
import { mapData } from '/@/assets/map/mapData.js'
import axios from 'axios'
import { defineComponent, ref, getCurrentInstance, onMounted } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
// import Chart from '/@/views/Dashboard/Workplace/_Components/Chart.vue'
// import List from '/@/views/Dashboard/Workplace/_Components/List.vue'
import Clock from '/@/views/Dashboard/Workplace/_Components/Clock.vue'

export default defineComponent({
  name: 'SaleIndex',
  components: {
    Clock
  },
  setup() {
    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts

    const activeName = ref('first')
    const CumSelectType = ref({ Name: '矿山设备', Num: '9999/88%' })
    const { getUserInfo, getUser } = useLayoutStore()
    const kaoqinValue = ref('今日')
    const onGetUser = async () => {
      await getUser()
    }

    const mychart: any = ref({})

    let chinamap: any = ref([])
    chinamap.value = mapData
    const mapEpidemic: any = ref([])
    const childrenId: any = ref('100000')
    const mapback = () => {
      chinamap.value = mapData
      echarts.registerMap('china', chinamap.value)
      mychart.value.setOption(mapRender(chinamap.value.features))
    }
    onMounted(() => {
      mychart.value = echarts.init(document.getElementById('myecharts'))

      mychart.value.on('click', function (res: any) {
        console.log('-----------', res)
        // 这个是出自 地图子级的id
        console.log(chinamap.value)
        let abcode = chinamap.value.features.find(
          (item: any) => item.properties.name == res.name
        )
        console.log('abcode', abcode)
        // 拿到子级区的id 在下面的axios 进行请求
        let dataCity = abcode.properties.adcode
        childrenId.value = dataCity

        // 获取疫情地图 区级的数据
        let EpidemicData = mapEpidemic.value.find((value: any) => {
          return value.value == res.value
        })

        // 请求地图的数据 以及疫情的数据
        axios
          .get(
            `https://geo.datav.aliyun.com/areas_v3/bound/${childrenId.value}_full.json`
          )
          .then((res: any) => {
            // registerMap 注册一个地图   chinamap 地图的数据包 根据不同的数据渲染不同的地图
            chinamap.value = res.data
            console.log('chinamap.value', chinamap.value)
            echarts.registerMap('china', res.data)
            // 这个调用是进行地图的渲染 然后把 子级的地图数据传进去 因为如果名字 和 疫情的名字对不上就去不会改变
            mychart.value.setOption(mapRender(res.data.features))
          })
      })
      console.log('--------------', chinamap.value)
      echarts.registerMap('china', chinamap.value)
      mychart.value.setOption(mapRender(chinamap.value.features))
    })

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
            name = i.name + '市'
          } else if (area[i.name]) {
            name = area[i.name]
          } else {
            name = i.name + '省'
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
            console.log(params)
            return ' 客户数量: '
          },
          transitionDuration: 0.2
        },

        /*                 geo: {
                map: "china",
                roam: true,
                    regions: [
                        {
                        name: "南海诸岛",
                        value: 0,
                        itemStyle: {
                            normal: {
                            opacity: 0,
                            label: {
                                show: false
                            }
                            }
                        }
                        }
                    ]
                }, */
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

    return {
      activeName,
      CumSelectType,
      user: getUserInfo,
      onGetUser,
      mapback,
      kaoqinValue,
      echarts
    }
  }
})
</script>
<style type="postcss" scoped>
#myecharts {
  background: #ffffff;
  width: 42rem;
  height: 23rem;
}
.home-content {
  .home-custop {
    position: fixed;
    top: 53px;
    left: 602px;
    z-index: 99999;
  }
  .home-map {
    width: 60rem;
    height: 26.5rem;
    .home-cusmap {
      width: 50rem;
      height: 30rem;
    }
  }

  .home-cusnum {
    background: url(../../../assets/img/sale/customer/cusnum.png) repeat-x left
      top;
    background-size: 100% 100%;
  }
  .home-cusbj {
    background: url(../../../assets/img/sale/customer/cusbj.png) repeat-x left
      top;
    background-size: 100% 100%;
  }
  .home-cusht {
    background: url(../../../assets/img/sale/customer/cusht.png) repeat-x left
      top;
    background-size: 100% 100%;
  }
  .home-cuswbj {
    background: url(../../../assets/img/sale/customer/cuswbj.png) repeat-x left
      top;
    background-size: 100% 100%;
  }
  .home-cuswht {
    background: url(../../../assets/img/sale/customer/cuswht.png) repeat-x left
      top;
    background-size: 100% 100%;
  }
  .home-cuslz {
    background: url(../../../assets/img/sale/customer/cuslz.png) repeat-x left
      top;
    background-size: 100% 100%;
  }
  .hom_cussjkb {
    background: url(../../../assets/img/sale/customer/cussjkb.png) repeat-x left
      top;
    background-size: 100% 100%;
  }
  .hom_custab {
    color: #ffffff;
    background: url(../../../assets/img/sale/customer/custable-header.png)
      repeat-x left top;
    background-size: 100% 100%;
    .tabinput {
      width: 10rem;
      margin-right: 1rem;
    }
    .tabselect {
      margin-left: 1rem;

      width: 10rem;
    }
    .tabbutselect {
      color: #ffffff;
      margin-left: 1rem;
      margin-top: -3px;
      width: 6rem;
      background: linear-gradient(180deg, #33b3ff 0%, #92d1ff 100%);
      border: 0rem;
    }
    .tabbutclear {
      color: #ffffff;
      margin-left: 1rem;
      margin-top: -3px;
      width: 6rem;
      background: linear-gradient(180deg, #db0c0c 0%, #eb7373 100%);
      border: 0rem;
    }
  }
}
</style>