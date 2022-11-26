<template>
  <div class="bf-Customer home-content">
    <SreachTop @ReturnSeachData="ReturnSeachData"></SreachTop>
    <el-row :gutter="5">
      <el-col :md="24" :lg="5">
        <div class="border-blue-300 border-solid rounded w-full bg-white flex">
          <div class="w-full h-32 font-semibold text-center pt-6">
            <div class="text-lg">我的项目</div>
            <div class="text-4xl pt-2">{{ Analysis.Info.ProjectCount }}<span class="text-lg">个</span></div>
          </div>
        </div>
        <div class="border-blue-300 border-solid rounded p-2 w-full bg-white mt-2 relative">
          <div id="piemyecharts" />

          <div class="flex justify-start absolute top-2">
            {{ analysis.Data }}
            <el-popover v-model:visible="analysis.Show" placement="bottom" :width="200">
              <template #reference>
                <el-icon-CaretBottom @click="showAnalysis" class="w-4 h-4 mr-2" />
              </template>
              <div v-for="(item, index) in analysis.Info" @click="changeAnalysis(item)" class="pl-2 pt-2 cursor-pointer font-semibold">
                {{ item }}
              </div>
            </el-popover>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="12">
        <div class="border-blue-300 border-solid rounded w-full bg-white p-2 pb-1 relative">
          <div id="piemyechartscd" />
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
        <div class="border-blue-300 border-solid rounded w-full bg-white p-2">
          <div class="border-blue-300 border-solid rounded w-full overflow-hidden">
            <div class="bg-blue-300 text-center font-semibold p-2">
              <div class="flex justify-center items-center">
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
              <el-table-column type="index" label="排名" align="center" :width="52">
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
              <el-table-column :prop="TopTable.Data.Column[0].lable" :label="TopTable.Data.Column[0].name" :width="78" align="center" />
              <el-table-column :prop="TopTable.Data.Column[1].lable" :label="TopTable.Data.Column[1].name" :width="78" align="center" />
              <el-table-column :prop="TopTable.Data.Column[2].lable" :label="TopTable.Data.Column[2].name" :width="TopTable.Data.Name == '集团排行榜' ? 190 : 90" align="center" />
              <el-table-column :prop="TopTable.Data.Column[3].lable" :label="TopTable.Data.Column[3].name" :width="100" align="center" v-if="TopTable.Data.Column[3] && TopTable.Data.Column[3].lable" />
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :md="24" :lg="24">
        <div class="hom_custab mt-2 mb-2 flex justify-between border-gray-400 border-dashed">
          <div class="w-52">
            <el-tabs v-model="data.tableTop" class="demo-tabs" @tab-change="cliketop">
              <el-tab-pane label="项目库" :name="0"></el-tab-pane>
              <el-tab-pane label="项目公海" :name="1"></el-tab-pane>
            </el-tabs>
          </div>

          <div class="flex justify-between pt-2">
            <div class="flex items-center">
              <div class="pr-2">
                <el-date-picker v-model="form.time" type="daterange" format="YYYY/MM/DD" value-format="YYYY/MM/DD" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" />
              </div>
              <div class="pr-2 w-32">
                <el-select v-model="form.Stage" class="inputwidth" placeholder="建设状态">
                  <el-option key="0" label="全部" value="" />
                  <el-option key="1" label="立项" value="立项" />
                  <el-option key="2" label="勘察" value="勘察" />
                  <el-option key="3" label="设计" value="设计" />
                  <el-option key="4" label="审核" value="审核" />
                  <el-option key="5" label="招标" value="招标" />
                  <el-option key="6" label="施工" value="施工" />
                  <el-option key="7" label="验收" value="验收" />
                  <el-option key="8" label="投入使用" value="投入使用" />
                </el-select>
              </div>
              <el-input placeholder="请输入客户名称" v-model="form.CusName" class="mr-2" style="width: 200px; height: 32px" />
              <el-button class="butclass mr-2" @click="getlist"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
              <el-button v-if="data.tableTop == 0" type="primary" class="addbutclass ml-1" @click="openProject({}, 1)"> <svg-icon icon-class="svg-addpro" />新增项目 </el-button>
              <el-button v-if="data.tableTop == 1" type="primary" class="addbutclass ml-1" @click="claimproject()"> <svg-icon icon-class="svg-rlpro" />认领项目 </el-button>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :md="24" :lg="24">
        <div class="relative">
          <div>
            <div v-if="data.tableTop == 0">
              <el-table border :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '2rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" :data="data.tableData" style="width: 100%; border-radius: 6px">
                <el-table-column type="selection" width="50" />
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column width="110" prop="CreateOn" label="录入时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>

                <el-table-column label="项目名称" width="350" show-overflow-tooltip>
                  <template #default="scope">{{ scope.row.ProjectName }}</template>
                </el-table-column>

                <el-table-column label="项目地址" show-overflow-tooltip>
                  <template #default="scope"> {{ scope.row.Addr_Province + scope.row.Addr_City + scope.row.Addr_Area + scope.row.Address }}</template>
                </el-table-column>

                <el-table-column width="110" label="采购时间">
                  <template #default="scope">{{ (scope.row.Time || '').substring(0, 10) }}</template>
                </el-table-column>

                <el-table-column width="100" label="项目阶段">
                  <template #default="scope">{{ scope.row.Build }}</template>
                </el-table-column>
                <el-table-column label="合作情况">
                  <el-table-column width="100" label="成交">
                    <template #default="scope">--</template>
                  </el-table-column>
                  <el-table-column width="100" label="跟踪">
                    <template #default="scope">--</template>
                  </el-table-column>
                  <el-table-column width="100" label="失单">
                    <template #default="scope">--</template>
                  </el-table-column>
                </el-table-column>

                <el-table-column width="130" label="项目金额（万）">
                  <template #default="scope">
                    {{ scope.row.Quota }}
                  </template>
                </el-table-column>
                <!-- <el-table-column width="100" label='合作情况'>
                  <template #default="scope">
                    <span class="mr-4 cursor-pointer" @click="openProject(scope.row,2)">查看</span>
                  </template>
                </el-table-column> -->

                <el-table-column width="90" label="项目详情">
                  <template #default="scope"><span class="cursor-pointer text-blue-500" @click="openProject(scope.row, 2)">详情</span></template>
                </el-table-column>
              </el-table>
            </div>

            <div v-if="data.tableTop == 1">
              <el-table border @selection-change="handleSelectionChange" :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" :data="data.tableData" style="width: 100%; border-radius: 6px">
                <el-table-column type="selection" width="50" />
                <el-table-column type="index" width="60" label="序号"> </el-table-column>
                <el-table-column width="150" prop="CreateOn" label="发布时间">
                  <template #default="scope">{{ (scope.row.posttime || '').substring(0, 11) }}</template>
                </el-table-column>

                <el-table-column label="项目名称" show-overflow-tooltip>
                  <template #default="scope">{{ scope.row.ystitle }}</template>
                </el-table-column>

                <el-table-column label="项目地址" show-overflow-tooltip>
                  <template #default="scope">{{ scope.row.Addr }}</template>
                </el-table-column>

                <el-table-column width="200" label="行业" show-overflow-tooltip>
                  <template #default="scope">{{ scope.row.industry }}</template>
                </el-table-column>

                <el-table-column width="130" label="项目阶段">
                  <template #default="scope">{{ scope.row.stage }}</template>
                </el-table-column>

                <el-table-column width="130" label="项目金额（万）">
                  <template #default="scope">
                    {{ scope.row.price }}
                  </template>
                </el-table-column>
                <el-table-column width="100" label="认领状态">
                  <template #default="scope">
                    <div class="flex items-center justify-center" v-if="scope.row.UserId <= 0">
                      <div class="w-1.5 h-1.5 rounded-full mr-1" style="background: #f27b33"></div>
                      <div>未认领</div>
                    </div>
                    <div class="flex items-center justify-center" v-else>
                      <div class="w-1.5 h-1.5 rounded-full mr-1" style="background: #44d7b6"></div>
                      <div>已认领</div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="120" label="项目领取人">
                  <template #default="scope">{{ scope.row.UserName || '--' }}</template>
                </el-table-column>
                <el-table-column width="100" label="项目详情">
                  <template #default="scope">
                    <span class="cursor-pointer text-blue-500" @click="showview(scope.row.Id)">详情</span>
                  </template>
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

    <AddProject v-if="data.AddProject.view" :DataInfo="data.AddProject.datainfo" :CustomerName="data.AddProject.CusName" :ViewType="data.AddProject.viewtype" :DataId="data.AddProject.dataid" :title="data.AddProject.title" @closeWindow="closeProject" />

    <ProjectView v-if="data.ProjectView.view" :DataId="data.ProjectView.dataid" :title="data.ProjectView.title" @closeWindow="closeView" />
  </div>
</template>
<script lang="ts">
import SreachTop from '/@/views/Sale/Component/SreachTop.vue'
import ProjectView from './ProjectView.vue'
import AddProject from './AddProject.vue'
import { mapData } from '/@/assets/map/mapData.js'
import { GetProjectList, GetHighSeasContentInfoPage, GetZxwProjectIsClaim, GetProjectIndexInfo, GetProjectRankByDept, GetFormalUserRankProject } from '/@/api/Sale/CustomerProjeck'

import axios from 'axios'
import { defineComponent, ref, getCurrentInstance, onMounted, onBeforeUnmount, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useLayoutStore } from '/@/store/modules/layout'
// import Chart from '/@/views/Dashboard/Workplace/_Components/Chart.vue'
// import List from '/@/views/Dashboard/Workplace/_Components/List.vue'
import Clock from '/@/views/Dashboard/Workplace/_Components/Clock.vue'

export default defineComponent({
  name: 'SaleIndex',
  components: {
    SreachTop,
    ProjectView,
    AddProject,
    Clock
  },
  setup() {
    const form = reactive<any>({
      page: 1,
      size: 10,
      totals: 0,
      time: [],
      CusName: '',
      Stage: undefined
    })
    const data = reactive({
      ProjectView: {
        view: false,
        dataid: 0,
        viewtype: 1,
        title: '新增项目'
      },
      AddProject: {
        CusName: '',
        view: false,
        dataid: 0,
        viewtype: 1,
        title: '新增项目',
        datainfo: <any>{}
      },
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
      Info: {},
      StateRank: <any>[],
      DeptRank: <any>[],
      UserRank: <any>[]
    })
    const GetIndexInfo = (val: any) => {
      console.log('🚀 ~ file: Index.vue ~ line 312 ~ GetIndexInfo ~ val', val)
      GetProjectIndexInfo(val).then((res) => {
        console.log('🚀 ~ file: Index.vue ~ line 313 ~ GetProjectIndexInfo ~ res', res)
        if (res.code == 1) {
          Analysis.Info = res.data.analysis
          Analysis.StateRank.length = 0
          res.data.rank.forEach((item: any) => {
            var info: any = {}
            info.value = item.Count
            info.name = item.Name
            Analysis.StateRank.push(info)
          })
          // 饼状图
          let pieMap = <any>document.getElementById('piemyecharts')
          pieMap.removeAttribute('_echarts_instance_')
          piemychart.value = echarts.init(pieMap)
          piemychart.value.setOption(hyoption, true)
        }
      })
    }
    const GetDeptRank = (val: any) => {
      GetProjectRankByDept(val).then((res) => {
        if (res.code == 1) {
          rankdata.namelist.length = 0
          rankdata.countlist.length = 0
          rankdata.moneylist.length = 0
          res.data.forEach((item: any) => {
            rankdata.namelist.push(item.Name)
            rankdata.countlist.push(item.Count)
            rankdata.moneylist.push(item.Amount)
          })
          let domMap = <any>document.getElementById('piemyechartscd')
          domMap.removeAttribute('_echarts_instance_')
          piemychartcd.value = echarts.init(domMap)
          piemychartcd.value.setOption(returnoption(rankdata))
        }
      })
    }
    const UserRank = (val: any) => {
      GetFormalUserRankProject(val).then((res) => {
        if (res.code == 1) {
          Analysis.UserRank = res.data
        }
      })
    }
    const ReturnSeachData = (val: any) => {
      GetIndexInfo(val)
      GetDeptRank(val)
      UserRank(val)
    }

    const multipleSelection = ref<any[]>([])
    const handleSelectionChange = (val: any) => {
      multipleSelection.value = val
    }
    const claimproject = () => {
      if (multipleSelection.value.length == 0) {
        ElMessage.warning('请至少选择一条数据')
        return false
      }

      if (multipleSelection.value.length > 1) {
        ElMessage.warning('只能选择一条数据')
        return false
      }
      GetZxwProjectIsClaim({ Id: multipleSelection.value[0].Id }).then((res) => {
        if (res.data.IsClaim == true) {
          data.AddProject.viewtype = 1
          data.AddProject.datainfo = res.data.ProjectInfo
          data.AddProject.view = true
        } else {
          ElMessage.error(res.data.Message)
        }
      })
    }
    ///关闭公海查看详情
    const showview = (val: any) => {
      data.ProjectView.dataid = val
      data.ProjectView.view = true
      data.ProjectView.title = '查看项目详情'
    }
    ///关闭公海项目预览
    const closeView = () => {
      data.ProjectView.view = false
    }

    const cliketop = (val: any) => {
      data.tableTop = val
      form.time = []
      form.CusName = ''
      form.Stage = undefined
      getlist()
    }
    const closeProject = () => {
      data.AddProject.view = false
      getlist()
    }

    const openProject = (val: any, type: any) => {
      if (type == 1) {
        data.AddProject.datainfo = null
        data.AddProject.viewtype = type
        data.AddProject.view = true
      } else {
        data.AddProject.datainfo = null
        data.AddProject.dataid = val.Id
        data.AddProject.viewtype = type
        data.AddProject.view = true
      }
    }

    const getlist = async () => {
      let formInfo = <any>{
        page: form.page,
        size: form.size,
        StartTime: form.time && form.time.length > 0 ? form.time[0] : undefined,
        StopTime: form.time && form.time.length > 0 ? form.time[1] : undefined
      }
      data.tableTop == 0 ? (formInfo.Stage = form.Stage) : (formInfo.StageName = form.Stage)
      data.tableTop == 0 ? (formInfo.CusName = form.CusName) : (formInfo.CustomerName = form.CusName)
      if (data.tableTop == 0) {
        GetProjectList(formInfo).then((res) => {
          if (res.code == 1) {
            data.tableData = res.data.list
            form.totals = res.data.count
          }
        })
      } else {
        GetHighSeasContentInfoPage(formInfo).then((res) => {
          if (res.code == 1) {
            data.tableData = res.data.list

            console.log('🚀 ~ file: Index.vue ~ line 447 ~ GetProjectList ~ data.tableData', data.tableData)
            form.totals = res.data.count
          }
        })
      }
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
      getlist()
    }
    const TopRankMethed = () => {
      ///切换分布看板
      const TopRank = reactive({
        Info: ['部门分布看板', '事业部分布看板', '集团分布看板'],
        Data: '部门分布看板',
        Show: false
      })

      const showRank = () => {
        TopRank.Show = true
      }

      const changeRank = (val: any) => {
        var find = TopRank.Info.find((f: any) => f == val)
        if (find) {
          TopRank.Data = find
          if (find == '部门分布看板') {
            rankdata.namelist = ['业务一部', '业务二部', '业务三部', '业务四部']
            rankdata.countlist = [12, 43, 25, 57]
            rankdata.moneylist = [45, 68, 32, 87]
            //piemychartcd.value.setOption(returnoption(rankdata))
          }
          if (find == '事业部分布看板') {
            rankdata.namelist = ['潍坊事业部', '润扬事业部', '济南事业部', '银川事业部', '寒亭事业部']
            rankdata.countlist = [45, 79, 123, 48, 83]
            rankdata.moneylist = [68, 15, 25, 38, 26]

            piemychartcd.value.setOption(returnoption(rankdata))
            console.log('rankdata', rankdata)
            showrara(rankdata)
          }
          if (find == '集团分布看板') {
            rankdata.namelist = ['第一大区', '第二大区', '第三大区']
            rankdata.countlist = [123, 26, 48, 54]
            rankdata.moneylist = [251, 62, 26, 94]
            piemychartcd.value.setOption(returnoption(rankdata))
          }
        }
        TopRank.Show = false
      }
      return {
        openProject,
        closeProject,
        TopRank,
        showRank,
        changeRank
      }
    }
    const TopAnalysisMethed = () => {
      ///切换分布看板
      const analysis = reactive({
        Info: ['项目分析', '个人分析'],
        Data: '项目分析',
        Show: false
      })

      const showAnalysis = () => {
        analysis.Show = true
      }

      const changeAnalysis = (val: any) => {
        console.log('🚀 ~ file: Index.vue ~ line 531 ~ changeAnalysis ~ val', val)
        var find = analysis.Info.find((f: any) => f == val)
        if (find) {
          analysis.Data = find
          if (find == '项目分析') {
            // rankdata.namelist = ['业务一部', '业务二部', '业务三部', '业务四部']
            // rankdata.countlist = [12, 43, 25, 57]
            // rankdata.moneylist = [45, 68, 32, 87]
            hyoption.series = [
              {
                type: 'pie',
                radius: '50%',
                data: Analysis.StateRank,
                left: 0,
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
            // piemychart.value.setOption(returnoption(hyoption))
          }
          if (find == '个人分析') {
            const hyoption = {
              // title: {
              //   text: '项目分析',
              //   left: 'left'
              // },
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
                  data: Analysis.StateRank,
                  left: 0,
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
            // rankdata.namelist = ['潍坊事业部', '润扬事业部', '济南事业部', '银川事业部', '寒亭事业部']
            // rankdata.countlist = [45, 79, 123, 48, 83]
            // rankdata.moneylist = [68, 15, 25, 38, 26]
            // piemychart.value.setOption(returnoption(hyoption))
            // showrara(rankdata)
          }
        }
        analysis.Show = false
      }
      return {
        openProject,
        closeProject,
        analysis,
        showAnalysis,
        changeAnalysis
      }
    }

    const showrara = (val: any) => {
      console.log('val', val)
      console.log('rankdata', rankdata)
    }

    var rankdata = reactive({
      data: [
        {
          name: '业务一部',
          count: 10,
          money: 50
        },
        {
          name: '业务二部',
          count: 10,
          money: 50
        },
        {
          name: '业务三部',
          count: 10,
          money: 50
        },
        {
          name: '业务四部',
          count: 10,
          money: 50
        }
      ],
      namelist: ['业务一部', '业务二部', '业务三部', '业务四部'],
      countlist: [12, 43, 25, 57],
      moneylist: [45, 68, 32, 87]
    })

    ///切换排行榜
    const TopTable = reactive({
      Info: [
        {
          Name: '正式员工排行榜',
          Column: [
            { name: '姓名', lable: 'UserName' },
            { name: '部门', lable: 'CompName' },
            { name: '项目报价量', lable: 'ProjectCount' },
            { name: '项目报价金额', lable: 'Amount' }
          ]
        },
        {
          Name: '试用期员工排行榜',
          Column: [
            { name: '姓名', lable: 'name' },
            { name: '部门', lable: 'department' },
            { name: '项目报价量', lable: 'project_num' },
            { name: '项目报价金额', lable: 'project_money' }
          ]
        },

        {
          Name: '部门排行榜',
          Column: [
            { name: '部门', lable: 'department' },
            { name: '负责人', lable: 'people' },
            { name: '项目报价量', lable: 'project_num' },
            { name: '项目报价金额', lable: 'project_money' }
          ]
        },
        {
          Name: '事业部排行榜',
          Column: [
            { name: '事业部', lable: 'department' },
            { name: '负责人', lable: 'people' },
            { name: '项目报价量', lable: 'project_num' },
            { name: '项目报价金额', lable: 'project_money' }
          ]
        },
        {
          Name: '集团排行榜',
          Column: [
            { name: '大区', lable: 'region' },
            { name: '项目报价量', lable: 'project_num' },
            { name: '项目报价金额', lable: 'project_money' }
          ]
        }
      ],
      table_header: {
        color: '#000',
        'font-weight': '400'
      },
      Data: {
        Name: '正式员工排行榜',
        Column: [
          { name: '姓名', lable: 'UserName' },
          { name: '部门', lable: 'CompName' },
          { name: '项目报价量', lable: 'ProjectCount' },
          { name: '项目报价金额', lable: 'Amount' }
        ]
      },
      TableShow: false,
      tableData: [
        {
          name: '司徒坚强',
          region: '东北大区',
          department: '开发部',
          people: '我是领导人',
          project_num: 88,
          project_money: 100
        },
        {
          name: '司徒坚强',
          region: '东北大区',
          department: '开发部',
          people: '我是领导人',
          project_num: 88,
          project_money: 100
        },
        {
          name: '司徒坚强',
          region: '东北大区',
          department: '开发部',
          people: '我是领导人',
          project_num: 88,
          project_money: 100
        },
        {
          name: '司徒坚强',
          region: '东北大区',
          department: '开发部',
          people: '我是领导人',
          project_num: 88,
          project_money: 100
        },
        {
          name: '司徒坚强',
          region: '东北大区',
          department: '开发部',
          people: '我是领导人',
          project_num: 88,
          project_money: 100
        },
        {
          name: '司徒坚强',
          region: '东北大区',
          department: '开发部',
          people: '我是领导人',
          project_num: 88,
          project_money: 100
        },
        {
          name: '司徒坚强',
          region: '东北大区',
          department: '开发部',
          people: '我是领导人',
          project_num: 88,
          project_money: 100
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
      // title: {
      //   text: '项目分析',
      //   left: 'left'
      // },
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
          data: Analysis.StateRank,
          left: 0,
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
    const returnoption = (val: any) => {
      var cdoption = {
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true }
          }
        },
        legend: {
          data: ['金额', '数量']
        },
        xAxis: [
          {
            type: 'category',
            data: val.namelist,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '金额',
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: '{value} '
            }
          },
          {
            type: 'value',
            name: '数量',
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: '{value} '
            }
          }
        ],
        series: [
          {
            name: '金额',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value: number) {
                return value + ''
              }
            },
            data: val.moneylist
          },
          {
            name: '数量',
            type: 'bar',
            tooltip: {
              valueFormatter: function (value: number) {
                return value + ''
              }
            },
            data: val.countlist
          }
        ]
      }
      return cdoption
    }

    ///地图数据
    const mychart: any = ref({})
    let chinamap: any = ref([])
    chinamap.value = mapData
    const mapEpidemic: any = ref([])
    const childrenId: any = ref('100000')

    onBeforeUnmount(() => {})
    onMounted(() => {
      getlist()
      // 柱状图
    })

    return {
      Analysis,
      ReturnSeachData,
      GetIndexInfo,
      GetDeptRank,
      UserRank,
      handleSelectionChange,
      claimproject,
      multipleSelection,
      showview,
      closeView,
      printdata,
      cancelprint,
      printorder,
      ...TopRankMethed(),
      ...TopAnalysisMethed(),
      cliketop,
      getlist,
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
      kaoqinValue,
      echarts
    }
  }
})
</script>
<style type="postcss" scoped>
#piemyecharts {
  background: #ffffff;
  width: 17rem;
  height: 13rem;
}

#piemyechartscd {
  background: #ffffff;
  width: 44rem;
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
:deep(.el-button + .el-button) {
  margin-left: 0;
}
</style>
