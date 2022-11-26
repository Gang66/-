<template>
  <div class="bf-Customer home-content">
    <SreachTop @ReturnSeachData="ReturnSeachData"></SreachTop>
    <el-row :gutter="5">
      <el-col :md="24" :lg="5">
        <div class="border-blue-300 border-solid rounded w-full bg-white flex">
          <div class="w-full h-32 font-semibold text-center pt-6">
            <div class="text-lg">报价单总量</div>
            <div class="text-4xl pt-2">{{ Analysis.info.OrderCount }}<span class="text-lg">个</span></div>
          </div>
        </div>
        <div class="border-blue-300 border-solid rounded p-2 pb-4 w-full bg-white mt-2">
          <div id="myecharts" ref="map" />
        </div>
      </el-col>
      <el-col :md="24" :lg="7">
        <div class="border-blue-300 border-solid rounded w-full bg-white p-2 relative pb-3">
          <div id="piemyecharts" v-show="TopRank.Data != '成单率分布看板'" />
          <div id="piemyechartscd" v-show="TopRank.Data == '成单率分布看板'" />
          <div class="flex justify-start absolute top-2">
            {{ TopRank.Data }}
            <el-popover v-model:visible="TopRank.Show" placement="bottom" :width="200">
              <template #reference>
                <el-icon-CaretBottom @click="showRank" class="w-4 h-4 mr-2" />
              </template>
              <div v-for="(item, index) in TopRank.Info" @click="changeRank(item)" class="pl-2 pt-2 cursor-pointer font-semibold">
                {{ item }}
              </div>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="7">
        <div class="border-blue-300 border-solid rounded w-full bg-white p-2 pb-4">
          <div class="border-blue-300 border-solid rounded w-full overflow-hidden">
            <div class="bg-blue-300 text-center font-semibold p-2">
              <div class="flex justify-center">
                {{ TopTable.Data.Name }}
                <el-popover v-model:visible="TopTable.TableShow" placement="bottom" :width="200">
                  <template #reference>
                    <el-icon-CaretBottom @click="showtable" class="w-4 h-4 mr-2" />
                  </template>
                  <div v-for="(item, index) in TopTable.Info" @click="changetable(item.Name)" class="pl-2 pt-2 cursor-pointer font-semibold">
                    {{ item.Name }}
                  </div>
                </el-popover>
              </div>
            </div>
            <el-table :data="Analysis.UserRank" style="width: 100%; height: 304px" class="table-sty" :fit="false" :header-cell-style="TopTable.table_header">
              <el-table-column type="index" label="排名" align="center" :width="46">
                <template #default="scope">
                  <span v-if="scope.$index == 0">
                    <svg-icon icon-class="svg-jp1" style="font-size: 1.75rem; margin: 0 auto 0" />
                  </span>
                  <span v-else-if="scope.$index == 1">
                    <svg-icon icon-class="svg-jp2" style="font-size: 1.75rem; margin: 0 auto 0" />
                  </span>
                  <span v-else-if="scope.$index == 2">
                    <svg-icon icon-class="svg-jp3" style="font-size: 1.75rem; margin: 0 auto 0" />
                  </span>
                  <span v-else style="line-height: 1.75rem">{{ scope.$index + 1 }}</span>
                </template>
              </el-table-column>
              <el-table-column :prop="TopTable.Data.Column[0].lable" :label="TopTable.Data.Column[0].name" :width="TopTable.Data.Column.length <= 4 ? 138 : 70" align="center" />
              <el-table-column :prop="TopTable.Data.Column[1].lable" :label="TopTable.Data.Column[1].name" :width="TopTable.Data.Column.length == 3 ? 138 : 70" align="center" />
              <el-table-column :prop="TopTable.Data.Column[2].lable" :label="TopTable.Data.Column[2].name" :width="70" align="center" />
              <el-table-column :prop="TopTable.Data.Column[3].lable" :label="TopTable.Data.Column[3].name" :width="68" align="center" v-if="TopTable.Data.Column[3] && TopTable.Data.Column[3].lable" />
              <el-table-column :prop="TopTable.Data.Column[4].lable" :label="TopTable.Data.Column[4].name" :width="68" align="center" v-if="TopTable.Data.Column[4] && TopTable.Data.Column[4].lable" />
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="5">
        <div style="height: 23rem">
          <div class="border-blue-300 border-solid rounded w-full h-1/3 overflow-hidden bg-white">
            <div class="bg-blue-300 text-left font-semibold p-2 shadow-md">工作量统计</div>

            <div class="p-2 text-center text-sm leading-5">
              <el-row :gutter="10">
                <el-col :lg="6">
                  <div class="rounded bg-blue-300 w-full pt-2" style="padding: 1px">
                    <div class="py-1">新增</div>
                    <div class="bg-blue-100 rounded h-1/2 py-1">{{ Analysis.info.NewCount }}</div>
                  </div>
                </el-col>
                <el-col :lg="6">
                  <div class="rounded bg-blue-300 w-full" style="padding: 1px">
                    <div class="py-1">已联系</div>
                    <div class="bg-blue-100 rounded h-1/2 py-1">{{ Analysis.info.ContactCount }}</div>
                  </div>
                </el-col>
                <el-col :lg="6">
                  <div class="rounded bg-blue-300 w-full" style="padding: 1px">
                    <div class="py-1">未联系</div>
                    <div class="bg-blue-100 rounded h-1/2 py-1">{{ Analysis.info.UnContactCount }}</div>
                  </div>
                </el-col>
                <el-col :lg="6">
                  <div class="rounded bg-blue-300 w-full" style="padding: 1px">
                    <div class="py-1">成单</div>
                    <div class="bg-blue-100 rounded h-1/2 py-1">{{ Analysis.info.SuccessCount }}</div>
                  </div>
                </el-col>
              </el-row>
            </div>
          </div>
          <div class="pt-2 h-1/3">
            <div class="border-red-400 border-solid rounded w-full bg-white text-white overflow-hidden">
              <div class="bg-red-400 text-left font-semibold p-2 shadow-md">危机专栏</div>
              <div class="p-2 text-center text-sm leading-5">
                <el-row :gutter="10">
                  <el-col :lg="8">
                    <div class="rounded bg-orange-400 w-full pt-2 -mt-1" style="padding: 1px">
                      <div class="py-1">报价量</div>
                      <div class="bg-red-400 rounded h-1/2 py-1">司徒坚强</div>
                    </div>
                  </el-col>
                  <el-col :lg="8">
                    <div class="rounded bg-orange-400 w-full -mt-1" style="padding: 1px">
                      <div class="py-1">成单率</div>
                      <div class="bg-red-400 rounded h-1/2 py-1">司徒坚强</div>
                    </div>
                  </el-col>
                  <el-col :lg="8">
                    <div class="rounded bg-orange-400 w-full -mt-1" style="padding: 1px">
                      <div class="py-1">入职时间</div>
                      <div class="bg-red-400 rounded h-1/2 py-1">司徒坚强</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
          <div class="pt-2 h-1/3">
            <div class="border-blue-600 border-solid rounded h-full w-full bg-white text-white overflow-hidden">
              <div class="bg-blue-600 text-left font-semibold p-2 shadow-md">分析意见</div>
              <div class="h-16 text-left text-sm text-black leading-5">
                <div class="pl-2 h-1/2 border-blue-600 border-dashed border-b">问题</div>
                <div class="pl-2 h-1/2">分析思路</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :md="24" :lg="24">
        <div class="hom_custab mt-2 pt-2 flex justify-between border-gray-400 border-dashed">
          <div class="w-32">
            <el-tabs v-model="data.tableTop" class="demo-tabs" @tab-change="cliketop">
              <el-tab-pane label="报价列表" :name="0"></el-tab-pane>
              <!-- <el-tab-pane label="金额量列表" :name=1></el-tab-pane>
              <el-tab-pane label="跟单列表" :name=2></el-tab-pane> -->
            </el-tabs>
          </div>

          <div>
            <div class="flex pt-2">
              <el-input placeholder="请输入内容" v-model="form.CustomerName" class="tabinput" />
              <!-- <span>并列</span>
              <el-select placeholder='请选择' v-model="form.CustomerName" class='tabselect'>
                <el-option value="1">筛选条件</el-option>
              </el-select> -->
              <el-button class="butclass mr-2" @click="getlist"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
            </div>
          </div>
        </div>

        <!--           <div class='flex'>
            <el-select placeholder='请选择' v-model="form.CustomerName" class='tabselect'>
              <el-option value="1">筛选条件</el-option>
            </el-select>
            <div>
              <svg-icon icon-class='svg-mulu' style='    font-size: 2.5rem; margin-left:1rem;' />
            </div>
          </div> -->
      </el-col>

      <el-col :md="24" :lg="24">
        <div class="relative">
          <div>
            <div v-if="data.tableTop == 0">
              <el-table border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" :data="data.tableData" style="width: 100%; border-radius: 6px">
                <el-table-column type="selection" width="50" />
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="CreateOn" label="录入时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>

                <el-table-column label="客户名称" width="200" show-overflow-tooltip>
                  <template #default="scope">{{ scope.row.CustomerName }}</template>
                </el-table-column>

                <el-table-column label="业务员">
                  <template #default="scope">{{ scope.row.SalerName }}</template>
                </el-table-column>

                <el-table-column label="部门">
                  <template #default="scope">{{ scope.row.DeptName }}</template>
                </el-table-column>

                <el-table-column label="报价单位" show-overflow-tooltip>
                  <template #default="scope">{{ scope.row.CompanyName }}</template>
                </el-table-column>

                <!-- <el-table-column label='成单率'>
                  <template #default="scope">--</template>
                </el-table-column> -->

                <el-table-column label="报价金额">
                  <template #default="scope">{{ scope.row.Amount }}</template>
                </el-table-column>

                <el-table-column label="报价次数">
                  <template #default="scope">--</template>
                </el-table-column>

                <el-table-column label="报价等级">
                  <template #default="scope">{{ scope.row.Grade }}</template>
                </el-table-column>

                <el-table-column label="报价状态">
                  <template #default="scope">
                    {{ getstate(scope.row.OrderState) }}
                  </template>
                </el-table-column>
                <el-table-column label="报价单" width="60">
                  <template #default="scope">
                    <span class="cursor-pointer text-blue-500" @click="printorder(scope.row.Id)">查看</span>
                  </template>
                </el-table-column>

                <el-table-column label="成单率">
                  <template #default="scope">--</template>
                </el-table-column>

                <el-table-column label="样品">
                  <template #default="scope">--</template>
                </el-table-column>

                <el-table-column label="跟单信息">
                  <template #default="scope">--</template>
                </el-table-column>

                <!-- <el-table-column label="操作" width="80">
                  <template #default="scope">
                    <a href="javascript:void(0);" class="text-blue-500" @click="ToMessage(scope.row)">详情</a>
                  </template>
                </el-table-column> -->
              </el-table>
            </div>

            <div v-if="data.tableTop == 1">
              <el-table border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" :data="data.tableData" style="width: 100%; border-radius: 6px">
                <el-table-column type="selection" width="50" />
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="CreateOn" label="录入时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>

                <el-table-column label="客户名称" width="200">
                  <template #default="scope">{{ scope.row.CustomerName }}</template>
                </el-table-column>

                <el-table-column label="业务员">
                  <template #default="scope">{{ scope.row.SalerName }}</template>
                </el-table-column>

                <el-table-column label="部门">
                  <template #default="scope">{{ scope.row.DeptName }}</template>
                </el-table-column>

                <el-table-column label="询价单位">
                  <template #default="scope">{{ scope.row.CompanyName }}</template>
                </el-table-column>

                <el-table-column label="报价金额">
                  <template #default="scope">
                    {{ scope.row.Amount }}
                  </template>
                </el-table-column>
                <el-table-column label="等级">
                  <template #default="scope">{{ scope.row.Grade }}</template>
                </el-table-column>
                <el-table-column label="报价次数">
                  <template #default="scope">{{ scope.row.Grade }}</template>
                </el-table-column>
                <el-table-column label="报价单">
                  <template #default="scope">
                    <span class="cursor-pointer text-blue-500 text-center" @click="printorder(scope.row.Id)">详情</span>
                  </template>
                </el-table-column>

                <el-table-column label="成单率">
                  <template #default="scope"></template>
                </el-table-column>
              </el-table>
            </div>

            <div v-if="data.tableTop == 2">
              <el-table border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" :data="data.tableData" style="width: 100%; border-radius: 6px">
                <el-table-column type="selection" width="50" />
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column prop="CreateOn" label="录入时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>

                <el-table-column label="客户名称" width="200">
                  <template #default="scope">{{ scope.row.CustomerName }}</template>
                </el-table-column>

                <el-table-column label="业务员">
                  <template #default="scope">{{ scope.row.SalerName }}</template>
                </el-table-column>

                <el-table-column label="部门">
                  <template #default="scope">{{ scope.row.DeptName }}</template>
                </el-table-column>

                <el-table-column label="询价单位">
                  <template #default="scope">{{ scope.row.CompanyName }}</template>
                </el-table-column>

                <el-table-column label="报价金额">
                  <template #default="scope">
                    {{ scope.row.Amount }}
                  </template>
                </el-table-column>
                <el-table-column label="等级">
                  <template #default="scope">{{ scope.row.Grade }}</template>
                </el-table-column>
                <el-table-column label="报价次数">
                  <template #default="scope">{{ scope.row.Grade }}</template>
                </el-table-column>
                <el-table-column label="报价状态">
                  <template #default="scope">{{ scope.row.Grade || '--' }}</template>
                </el-table-column>
                <el-table-column label="报价单">
                  <template #default="scope">
                    <span class="cursor-pointer text-blue-500 text-center" @click="printorder(scope.row.Id)">详情</span>
                  </template>
                </el-table-column>

                <el-table-column label="成单率">
                  <template #default="scope"></template>
                </el-table-column>
                <el-table-column label="跟单信息">
                  <template #default="scope"></template>
                </el-table-column>
              </el-table>
            </div>

            <div class="flex justify-end">
              <div>
                <el-pagination small v-model:page-size="form.size" :background="true" layout="prev, pager, next, jumper" :total="form.totals" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <printindex v-if="printdata.view" :DataId="printdata.dataid" @closeWindow="cancelprint"></printindex>
    <Add :title="'报价单详情'" v-if="ShowQuotation.show" :ViewType="ShowQuotation.viewtype" :DataId="ShowQuotation.dataId" @cancelQuotation="cancelQuotation"></Add>
  </div>
</template>
<script lang="ts">
import Add from './AddQuotation.vue'
import SreachTop from '/@/views/Sale/Component/SreachTop.vue'
import printindex from '../Print/printindex.vue'
import { mapData } from '/@/assets/map/mapData.js'
import { GetCustomerOrderList, GetOrderIndexInfo, GetOrderAnalysisByTrade, GetFormalUserRankOrder } from '/@/api/Sale/CustomerOder'
import axios from 'axios'
import { defineComponent, ref, getCurrentInstance, onMounted, onBeforeUnmount, reactive } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
// import Chart from '/@/views/Dashboard/Workplace/_Components/Chart.vue'
// import List from '/@/views/Dashboard/Workplace/_Components/List.vue'
import Clock from '/@/views/Dashboard/Workplace/_Components/Clock.vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

const dic = reactive({
  orderstatus: [] //标牌证件
})
//获取字典数据
const getDictionaryData = () => {
  //报价单状态
  store.getDict('tech_order_status').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.orderstatus = res
  })
}

export default defineComponent({
  name: 'SaleIndex',
  components: {
    SreachTop,
    printindex,
    Clock,
    Add
  },
  setup() {
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      QueryType: null,
      CustomerName: '',
      Ranking: null,
      Checked: null,
      AddDate: []
    })
    const data = reactive({
      viewType: 1,
      DataId: 0,
      tableTop: 0,
      AddCustomerData: {
        view: false,
        currentCustomerId: 0,
        isEdit: false,
        otherRegion: {},
        InfoDisabled: false,
        screenCustomer: null,
        isReadOnly: false
      },
      tableData: []
    })
    const Analysis = reactive({
      info: {},
      rank: <any>[],
      Trade: <any>[],
      UserRank: <any>[]
    })
    const ReturnSeachData = (val: any) => {
      getAnalysis(val)
      getTradeRank(val)
      getFormUserRank(val)
    }

    //报价库主页返回数据
    const getAnalysis = (val: any) => {
      GetOrderIndexInfo(val).then((res) => {
        if (res.code == 1) {
          Analysis.info = res.data.analysis
          Analysis.rank = res.data.rank
        }
      })
    }
    const getFormUserRank = (val: any) => {
      GetFormalUserRankOrder(val).then((res) => {
        if (res.code == 1) {
          Analysis.UserRank = res.data
        }
      })
    }
    const getTradeRank = (val: any) => {
      GetOrderAnalysisByTrade(val).then((res) => {
        if (res.code == 1) {
          Analysis.Trade.length = 0
          res.data.forEach((item: any) => {
            var info: any = {}
            info.value = item.Count
            info.name = item.Name
            Analysis.Trade.push(info)
          })
          // 绘制饼状图
          let domMap = <any>document.getElementById('piemyecharts')
          domMap.removeAttribute('_echarts_instance_')
          piemychart.value = echarts.init(domMap)
          piemychart.value.setOption(hyoption, true)
        }
      })
    }

    //#region 查看报价单详情
    const ShowQuotation = ref({
      show: false,
      viewtype: 1,
      dataId: 0
    })
    // 详情
    const ToMessage = (val: any) => {
      ShowQuotation.value.show = true
      ShowQuotation.value.viewtype = 2
      ShowQuotation.value.dataId = val.Id
    }
    // 关闭
    const cancelQuotation = () => {
      ShowQuotation.value.show = false
      getlist()
    }
    //#endregion

    const cliketop = (val: any) => {
      data.tableTop = val
    }
    ///需要提醒的客户
    const messagelist = ref(<any>[])
    const getlist = async () => {
      GetCustomerOrderList(form).then((res) => {
        if (res.code == 1) {
          data.tableData = res.data.list
          console.log('🚀 ~ file: Index.vue ~ line 505 ~ GetCustomerOrderList ~ data.tableData', data.tableData)
          form.totals = res.data.count
        }
      })
    }
    //提醒
    const timer = ref()
    const showmessage = () => {
      timer.value = setInterval(() => {
        console.log('------------------***-------------------')
        if (messagelist.value.length > 0) {
          messagelist.value.forEach((item: any) => {
            //判断采购原则是否需要提醒
            if (item.ProcurementState == true) {
              if (item.ShowProcurement == true) {
                item.ShowProcurement = false
              } else {
                item.ShowProcurement = true
              }
            }
            //判断客户情报是否需要提醒
            if (item.InformationState == true) {
              if (item.ShowInformation == true) {
                item.ShowInformation = false
              } else {
                item.ShowInformation = true
              }
            }
            //判断竞争对手是否需要提醒
            if (item.CompetitorState == true) {
              if (item.ShowCompetitor == true) {
                item.ShowCompetitor = false
              } else {
                item.ShowCompetitor = true
              }
            }
            //判断付款方式是否需要提醒
            if (item.PaymentState == true) {
              if (item.ShowInformation == true) {
                item.ShowPayment = false
              } else {
                item.ShowPayment = true
              }
            }
          })
        } else {
          clearInterval(timer.value)
        }
      }, 600)
    }
    const printdata = ref({
      view: false,
      dataid: 0
    })
    const cancelprint = () => {
      printdata.value.view = false
    }
    const printorder = (val: number) => {
      printdata.value.dataid = val
      console.log('-------', val)
      printdata.value.view = true
    }

    const handleSizeChange = (val: number) => {
      form.size = val
      getlist()
    }
    const handleCurrentChange = (val: number) => {
      form.page = val
      console.log(form.page)
      getlist()
    }
    const TopRankMethed = () => {
      ///切换分布看板
      const TopRank = reactive({
        Info: ['行业分布看板', '报价分布看板', '成单率分布看板'],
        Data: '行业分布看板',
        Show: false
      })

      const showRank = () => {
        TopRank.Show = true
      }
      const changeRank = (val: any) => {
        var find = TopRank.Info.find((f: any) => f == val)
        if (find) {
          TopRank.Data = find
          if (find == '行业分布看板') {
            piemychart.value.setOption(hyoption)
          }
          if (find == '报价分布看板') {
            piemychart.value.setOption(bjoption)
          }
          if (find == '成单率分布看板') {
            piemychartcd.value.setOption(cdoption)
          }
        }
        TopRank.Show = false
      }
      return {
        TopRank,
        showRank,
        changeRank
      }
    }

    ///切换排行榜
    const TopTable = reactive({
      table_header: {
        color: '#000',
        'font-weight': '400'
      },
      Info: [
        {
          Name: '正式员工排行榜',
          Column: [
            { name: '姓名', lable: 'UserName' },
            { name: '报价量', lable: 'OrderCount' },
            { name: '金额量', lable: 'Amount' },
            { name: '报价金额', lable: 'OrderAmount' },
            { name: '成单率', lable: 'SuccessRate' }
          ]
        },
        {
          Name: '试用期员工排行榜',
          Column: [
            { name: '姓名', lable: 'name' },
            { name: '报价量', lable: 'count' },
            { name: '金额量', lable: 'money_count' },
            { name: '报价金额', lable: 'money' },
            { name: '成单率', lable: 'radio' }
          ]
        },
        {
          Name: '老员工排行榜',
          Column: [
            { name: '姓名', lable: 'name' },
            { name: '客户总量', lable: 'count' },
            { name: 'A级客户', lable: 'clientA' },
            { name: '新开客户', lable: 'client_new' },
            { name: '成单率', lable: 'radio' }
          ]
        },
        {
          Name: '部门人员排行榜',
          Column: [
            { name: '部门', lable: 'department' },
            { name: '事业部', lable: 'syb' },
            { name: '人员数量', lable: 'count' }
          ]
        },
        {
          Name: '报价红榜',
          Column: [
            { name: '姓名', lable: 'name' },
            { name: '部门', lable: 'department' },
            { name: '报价量', lable: 'count' },
            { name: '成单率', lable: 'radio' }
          ]
        },
        {
          Name: '报价黑榜',
          Column: [
            { name: '姓名', lable: 'name' },
            { name: '部门', lable: 'department' },
            { name: '报价量', lable: 'count' },
            { name: '成单率', lable: 'radio' }
          ]
        }
      ],
      Data: {
        Name: '正式员工排行榜',
        Column: [
          { name: '姓名', lable: 'UserName' },
          { name: '报价量', lable: 'OrderCount' },
          { name: '金额量', lable: 'Amount' },
          { name: '报价金额', lable: 'OrderAmount' },
          { name: '成单率', lable: 'SuccessRate' }
        ]
      },
      TableShow: false,
      tableData: [
        {
          name: '张三',
          count: '80',
          money_count: '100',
          money: '200',
          radio: '30%',
          department: '开发部',
          syb: '事业部',
          client_new: '20',
          clientA: '80'
        },
        {
          name: '张三',
          count: '80',
          money_count: '100',
          money: '200',
          radio: '30%',
          department: '开发部',
          syb: '事业部',
          client_new: '20',
          clientA: '80'
        },
        {
          name: '张三',
          count: '80',
          money_count: '100',
          money: '200',
          radio: '30%',
          department: '开发部',
          syb: '事业部',
          client_new: '20',
          clientA: '80'
        },
        {
          name: '张三',
          count: '80',
          money_count: '100',
          money: '200',
          radio: '30%',
          department: '开发部',
          syb: '事业部',
          client_new: '20',
          clientA: '80'
        },
        {
          name: '张三',
          count: '80',
          money_count: '100',
          money: '200',
          radio: '30%',
          department: '开发部',
          syb: '事业部',
          client_new: '20',
          clientA: '80'
        },
        {
          name: '张三',
          count: '80',
          money_count: '100',
          money: '200',
          radio: '30%',
          department: '开发部',
          syb: '事业部',
          client_new: '20',
          clientA: '80'
        },
        {
          name: '张三',
          count: '80',
          money_count: '100',
          money: '200',
          radio: '30%',
          department: '开发部',
          syb: '事业部',
          client_new: '20',
          clientA: '80'
        }
      ]
    })
    const showtable = () => {
      TopTable.TableShow = true
    }
    const changetable = (val: any) => {
      var find = TopTable.Info.find((f: any) => f.Name == val)
      if (find) {
        TopTable.Data = find
      }
      TopTable.TableShow = false
      console.log(TopTable.Data)
    }

    const { proxy } = getCurrentInstance() as any
    const echarts = proxy.$echarts

    const activeName = ref('first')
    const CumSelectType = ref({ Name: '矿山设备', Num: '9999/88%' })
    const { getUserInfo, getUser } = useLayoutStore()
    const kaoqinValue = ref('今日')
    const onGetUser = async () => {
      await getUser()
    }
    ///饼状图数据
    const piemychart: any = ref({})
    const piemychartcd: any = ref({})
    const hyoption = {
      /*       title: {
        text: '行业客户分布',
        left: 'left'
      }, */
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: Analysis.Trade,
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const bjoption = {
      /*       title: {
        text: '行业客户分布',
        left: 'left'
      }, */
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'right'
      },
      series: [
        {
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'A级' },
            { value: 735, name: 'B级' },
            { value: 580, name: 'C级' },
            { value: 580, name: '其他' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
    const cdoption = {
      polar: {
        radius: [10, '80%']
      },
      angleAxis: {
        max: 100,
        startAngle: 90
      },
      radiusAxis: {
        type: 'category',
        data: ['A级', 'B级', 'C级', '其他']
      },

      tooltip: {},
      series: {
        type: 'bar',
        itemStyle: {
          // 普通样式。
          normal: {
            // 点的颜色。
            color: 'red'
          }
        },
        data: [
          {
            value: 20,
            // 设置单个柱子的样式
            itemStyle: {
              color: '#70C725',
              shadowColor: '#70C725',
              borderType: 'dashed'
            }
          },
          {
            value: 43,
            // 设置单个柱子的样式
            itemStyle: {
              color: '#AFB1FF',
              shadowColor: '#AFB1FF',
              borderType: 'dashed'
            }
          },
          {
            value: 60,
            // 设置单个柱子的样式
            itemStyle: {
              color: '#91cc75',
              shadowColor: '#91cc75',
              borderType: 'dashed'
            }
          },
          {
            value: 15,
            // 设置单个柱子的样式
            itemStyle: {
              color: '#FFA319',
              shadowColor: '#FFA319',
              borderType: 'dashed'
            }
          }
        ],
        coordinateSystem: 'polar',
        label: {
          show: true,
          position: 'middle',
          formatter: '{b}: {c}'
        }
      }
    }

    ///地图数据
    const mychart: any = ref({})
    let chinamap: any = ref([])
    chinamap.value = mapData
    const mapEpidemic: any = ref([])
    const childrenId: any = ref('100000')

    ///地图返回
    const mapback = () => {
      chinamap.value = mapData
      echarts.registerMap('china', chinamap.value)
      mychart.value.setOption(mapRender(chinamap.value.features))
    }
    onBeforeUnmount(() => {
      clearInterval(timer.value)
    })
    onMounted(() => {
      showmessage()
      getlist()

      piemychartcd.value = echarts.init(document.getElementById('piemyechartscd'))

      mychart.value = echarts.init(document.getElementById('myecharts'))

      mychart.value.on('click', function (res: any) {
        console.log('-----------', res)
        // 这个是出自 地图子级的id
        console.log(chinamap.value)
        let abcode = chinamap.value.features.find((item: any) => item.properties.name == res.name)
        console.log('abcode', abcode)
        // 拿到子级区的id 在下面的axios 进行请求
        let dataCity = abcode.properties.adcode
        childrenId.value = dataCity

        // 获取疫情地图 区级的数据
        let EpidemicData = mapEpidemic.value.find((value: any) => {
          return value.value == res.value
        })

        // 请求地图的数据 以及疫情的数据
        axios.get(`https://geo.datav.aliyun.com/areas_v3/bound/${childrenId.value}_full.json`).then((res: any) => {
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
            var city: any = Analysis.rank.find((x: any) => x.Name == params.name)
            var count = 0
            if (city) {
              count = city.Count
            }
            console.log(params)
            return ' 报价量: ' + count
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
    const getstate = (val: any) => {
      var item: any = dic.orderstatus.find((f: any) => f.DicKey == val)
      if (item) {
        return item.DicValue
      }
      return '--'
    }
    onMounted(() => {
      getDictionaryData()
    })

    return {
      getAnalysis,
      Analysis,
      ReturnSeachData,
      printdata,
      cancelprint,
      printorder,
      ...TopRankMethed(),
      cliketop,
      getlist,
      messagelist,
      handleCurrentChange,
      handleSizeChange,
      form,
      data,
      showtable,
      changetable,
      TopTable,
      activeName,
      CumSelectType,
      user: getUserInfo,
      onGetUser,
      mapback,
      kaoqinValue,
      echarts,
      // 报价单详情
      ShowQuotation,
      ToMessage,
      cancelQuotation,
      getstate
    }
  }
})
</script>
<style type="postcss" scoped>
#myecharts {
  background: #ffffff;
  width: 17rem;
  height: 13rem;
}
#piemyecharts {
  background: #ffffff;
  width: 25rem;
  height: 21.75rem;
}
#piemyechartscd {
  background: #ffffff;
  width: 25rem;
  height: 21.75rem;
}
.home-content {
  :deep(.el-tabs__item.is-active) {
    color: #468bfd;
  }
  :deep(.el-tabs__item) {
    font-size: 16px;
    color: #666;
    font-weight: 550;
  }
  :deep(.el-tabs__header) {
    margin: 0px 0 5px;
  }
  .butclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #468bfd;
    background: #ffffff;
    &:focus {
      background-color: #e3ebf3;
    }
    &:hover {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
    &:active {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
  }
  .addbutclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #fff;
    background: #468bfd;
    &:focus {
      background-color: #3971ce;
    }
    &:hover {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
    &:active {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
  }
  .messagebg {
    width: 5px;
    height: 20px;
  }
  .icondiv {
    width: 20px;
    height: 20px;
    margin-top: -20px;
    padding: 2px;
  }

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
  .paiming {
    height: 46px;
    background: url(../../../assets/img/sale/customer/paiming.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .mingci {
    height: 46px;
    background: url(../../../assets/img/sale/customer/benren.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .home-cusnum {
    background: url(../../../assets/img/sale/customer/cusnum.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .home-cusbj {
    background: url(../../../assets/img/sale/customer/cusbj.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .home-cusht {
    background: url(../../../assets/img/sale/customer/cusht.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .home-cuswbj {
    background: url(../../../assets/img/sale/customer/cuswbj.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .home-cuswht {
    background: url(../../../assets/img/sale/customer/cuswht.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .home-cuslz {
    background: url(../../../assets/img/sale/customer/cuslz.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .hom_cussjkb {
    background: url(../../../assets/img/sale/customer/cussjkb.png) repeat-x left top;
    background-size: 100% 100%;
  }
  .hom_custab {
    .tabinput {
      width: 10rem;
      margin-right: 1rem;
    }
    .tabselect {
      margin-left: 1rem;
      margin-right: 1rem;
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

.table-sty :deep(.el-table__cell) {
  padding: 5.5px 0;
}
.table-sty :deep(thead .el-table__cell) {
  padding: 0px 0;
}
.table-sty :deep(.cell) {
  padding: 0 4px;
}
:deep(.el-table .cell) {
  padding: 0;
}
</style>
