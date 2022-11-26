<template>
  <div class="bf-Customer home-content">
    <SreachTop @ReturnSeachData="ReturnSeachData"></SreachTop>
    <el-row :gutter="5">
      <el-col :md="24" :lg="5">
        <div class="border-blue-300 border-solid rounded w-full bg-white flex">
          <div class="w-6/12 border-blue-300 border-dashed border-r h-32 font-semibold text-center pt-6">
            <div class="text-lg">当前客户数</div>
            <div class="text-4xl pt-2">{{ Analysis.user.CustomerCount }}<span class="text-lg">个</span></div>
          </div>
          <div class="w-6/12 pt-4 px-2">
            <div class="p-2 flex text-xs paiming">
              <span style="margin-left: 60px; margin-top: 7px">{{ Analysis.user.FirstUser }}</span>
            </div>
            <div class="p-2 flex text-xs mingci mt-2">
              <span style="margin-left: 60px; margin-top: 7px" class="text-white">第{{ Analysis.user.SelfRank }}名</span>
            </div>
          </div>
        </div>
        <div class="border-blue-300 border-solid rounded p-2 pb-3 w-full bg-white mt-2">
          <div id="piemyecharts" />
        </div>
      </el-col>
      <el-col :md="24" :lg="7">
        <div class="border-blue-300 border-solid rounded w-full bg-white p-2 relative">
          <div id="myecharts" ref="map" />
          <div class="flex text-sm justify-between w-3/6 text-center absolute top-80">
            <div class="rounded bg-blue-300 w-16" style="padding: 1px">
              <div>{{ Analysis.user.CustomerCount_A }}</div>
              <div class="bg-blue-100 rounded h-1/2">10强</div>
            </div>
            <div class="rounded bg-blue-300 w-16" style="padding: 1px">
              <div>{{ Analysis.user.CustomerCount_B }}</div>
              <div class="bg-blue-100 rounded h-1/2">20强</div>
            </div>
            <div class="rounded bg-blue-300 w-16" style="padding: 1px">
              <div>{{ Analysis.user.CustomerCount_C }}</div>
              <div class="bg-blue-100 rounded h-1/2">30强</div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="7">
        <div class="border-blue-300 border-solid rounded w-full bg-white p-2 pb-3">
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
            <div class="flex text-sm border-Gray-500 text-center border-solid border-b-2" style="padding-top: 1px">
              <div class="w-12"></div>
              <div class="w-16">{{ TopTable.Data.Column[0] }}</div>
              <div class="w-20">{{ TopTable.Data.Column[1] }}</div>
              <div class="w-16">{{ TopTable.Data.Column[2] }}</div>
              <div class="w-20">{{ TopTable.Data.Column[3] }}</div>
              <div class="w-16">{{ TopTable.Data.Column[4] }}</div>
            </div>
            <div class="px-2">
              <div v-for="(item, index) in data.regionranklist" :key="index" class="flex text-sm text-center h-13 border-Gray-200 border-solid border-b-2" style="line-height: 38px">
                <div class="w-12">
                  <span v-if="index + 1 == 1">
                    <svg-icon icon-class="svg-jp1" style="font-size: 1.75rem; margin: 4px auto 0" />
                  </span>
                  <span v-else-if="index + 1 == 2">
                    <svg-icon icon-class="svg-jp2" style="font-size: 1.75rem; margin: 4px auto 0" />
                  </span>
                  <span v-else-if="index + 1 == 3">
                    <svg-icon icon-class="svg-jp3" style="font-size: 1.75rem; margin: 4px auto 0" />
                  </span>
                  <span v-else>{{ index + 1 }}</span>
                </div>
                <div class="w-16">
                  <span v-if="index == 0" class="text-red-500">
                    {{ item.Name }}
                  </span>
                  <span v-else-if="index == 1" class="text-blue-500">
                    {{ item.Name }}
                  </span>
                  <span v-else-if="index == 2" class="text-yellow-500">
                    {{ item.Name }}
                  </span>
                  <span v-else> {{ item.Name }}</span>
                </div>
                <div class="w-20">{{ item.CustomerCount }}</div>
                <div class="w-16">{{ item.CustomerCount_A }}</div>
                <div class="w-20">{{ item.CustomerCount_New }}</div>
                <div class="w-16">{{ item.SuccessRate }}%</div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :md="24" :lg="5">
        <div class="border-blue-300 border-solid rounded w-full h-1/3 bg-white overflow-hidden">
          <div class="bg-blue-300 text-left font-semibold p-2 shadow-md">工作量统计</div>
          <div class="p-2 text-center text-sm leading-5">
            <el-row :gutter="10">
              <el-col :lg="6">
                <div class="rounded bg-blue-300 w-full pt-2" style="padding: 1px">
                  <div class="py-1">新增</div>
                  <div class="bg-blue-100 rounded h-1/2 py-1">{{ Analysis.user.AddCount }}</div>
                </div>
              </el-col>
              <el-col :lg="6">
                <div class="rounded bg-blue-300 w-full" style="padding: 1px">
                  <div class="py-1">已联系</div>
                  <div class="bg-blue-100 rounded h-1/2 py-1">10</div>
                </div>
              </el-col>
              <el-col :lg="6">
                <div class="rounded bg-blue-300 w-full" style="padding: 1px">
                  <div class="py-1">未联系</div>
                  <div class="bg-blue-100 rounded h-1/2 py-1">6</div>
                </div>
              </el-col>
              <el-col :lg="6">
                <div class="rounded bg-blue-300 w-full" style="padding: 1px">
                  <div class="py-1">项目客户</div>
                  <div class="bg-blue-100 rounded h-1/2 py-1">项目客户</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </div>
        <div class="pt-2 h-1/3">
          <div class="border-red-400 border-solid rounded h-full w-full bg-white text-white overflow-hidden">
            <div class="bg-red-400 text-left font-semibold p-2 shadow-md">危机专栏</div>
            <div class="p-2 text-center text-sm leading-5">
              <el-row :gutter="10">
                <el-col :lg="6">
                  <div class="rounded bg-orange-400 w-full pt-2 -mt-1" style="padding: 1px">
                    <div class="py-1 text-xs">仅报价客户</div>
                    <div class="bg-red-400 rounded h-1/2 py-1">2</div>
                  </div>
                </el-col>
                <el-col :lg="6">
                  <div class="rounded bg-orange-400 w-full -mt-1" style="padding: 1px">
                    <div class="py-1 text-xs">多次报价</div>
                    <div class="bg-red-400 rounded h-1/2 py-1">10</div>
                  </div>
                </el-col>
                <el-col :lg="6">
                  <div class="rounded bg-orange-400 w-full -mt-1" style="padding: 1px">
                    <div class="py-1 text-xs">频繁报价</div>
                    <div class="bg-red-400 rounded h-1/2 py-1">6</div>
                  </div>
                </el-col>
                <el-col :lg="6">
                  <div class="rounded bg-orange-400 w-full -mt-1" style="padding: 1px">
                    <div class="py-1 text-xs">危机客户</div>
                    <div class="bg-red-400 rounded h-1/2 py-1">6</div>
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
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :md="24" :lg="24">
        <div class="flex justify-between hom_custab mt-2 pt-2 pb-2 border-gray-400 border-dashed">
          <div class="w-52">
            <el-tabs v-model="data.tableTop" class="demo-tabs" @tab-change="cliketop">
              <el-tab-pane label="客户库" :name="0"></el-tab-pane>
              <el-tab-pane label="客户公海" :name="1"></el-tab-pane>
            </el-tabs>
          </div>

          <div>
            <div v-if="data.tableTop == 0" class="flex justify-between pt-2">
              <div>
                <el-input placeholder="请输入客户名称" v-model="form.CustomerName" class="tabinput mr-2" />
                <el-select v-model="form.QueryType" style="width: 120px" clearable placeholder="查询类型" class="pr-2">
                  <el-option label="核准状态" value="1" />
                  <el-option label="企业等级" value="2" />
                  <el-option label="当前状态" value="3" />
                  <el-option label="事业部" value="4" />
                </el-select>
                <el-select v-model="form.Checked" v-if="form.QueryType == 1" clearable style="width: 120px" placeholder="核准状态" class="pr-2">
                  <el-option label="全部" value="2" />
                  <el-option label="未核准" value="0" />
                  <el-option label="已核准" value="1" />
                </el-select>
                <el-select v-model="form.Ranking" v-if="form.QueryType == 2" clearable style="width: 120px" placeholder="企业等级" class="pr-2">
                  <el-option label="10强" value="10" />
                  <el-option label="20强" value="20" />
                  <el-option label="30强" value="30" />
                  <el-option label="其他" value="0" />
                </el-select>
                <el-select v-model="form.Checked" v-if="form.QueryType == 3" clearable style="width: 120px" placeholder="当前状态" class="pr-2">
                  <el-option label="私有客户" value="1" />
                  <el-option label="共享客户" value="2" />
                  <el-option label="历史客户" value="3" />
                  <el-option label="未完成客户" value="4" />
                </el-select>
                <el-select v-model="form.CompId" v-if="form.QueryType == 4" placeholder="事业部" style="width: 120px" class="mr-2">
                  <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
                </el-select>
                <el-input placeholder="业务员" v-model="form.RealName" class="tabinput mr-2" />

                <el-button class="butclass" @click="getlist"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
              </div>
              <!--               <div class='flex'>
                <el-select placeholder='请选择' v-model="form.CustomerName" class='tabselect'>
                  <el-option value="1">筛选条件</el-option>
                </el-select>
                <div>
                  <svg-icon icon-class='svg-mulu' style='    font-size: 2.5rem; margin-left:1rem;' />
                </div>
              </div> -->
            </div>
            <div v-if="data.tableTop == 1" class="flex justify-between pt-2">
              <div>
                <span>客户名称：</span>
                <el-input placeholder="请输入内容" v-model="Communal.CusName" class="tabinput" />
                <span>公海类型：</span>
                <el-select placeholder="请选择" v-model="Communal.Type" class="tabselect">
                  <el-option label="部门公海" :value="1"></el-option>
                  <el-option label="事业部公海" :value="2"></el-option>
                  <el-option label="集团公海" :value="3"></el-option>
                </el-select>
                <el-button class="butclass mr-2" @click="getcommlist"> <svg-icon icon-class="svg-cus_search" />搜索 </el-button>
              </div>
              <div class="flex">
                <el-button type="primary" class="addbutclass" @click="ClaimCustomer">
                  <svg-icon icon-class="svg-rlcus" />
                  客户认领
                </el-button>
              </div>
            </div>
          </div>
        </div>
      </el-col>

      <el-col :md="24" :lg="24">
        <div class="relative">
          <div>
            <div v-if="data.tableTop == 0">
              <el-table :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '2rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" :data="data.tableData" style="width: 100%; border-radius: 6px">
                <el-table-column type="index" width="55" label="序号" />
                <el-table-column width="110" label="录入日期">
                  <template #default="scope">
                    {{ scope.row.CreateOn.substring(0, 10) }}
                  </template>
                </el-table-column>
                <el-table-column width="400px" label="客户名称" show-overflow-tooltip align="center">
                  <template #default="scope">
                    <div class="items-center" style="display: flex; justify-between: center; position: relative">
                      <!-- <div class="flex">
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.ProcurementCount>=1?'bg-blue-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.ProcurementCount>=2?'bg-blue-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.ProcurementCount>=3?'bg-blue-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.ProcurementCount>=4?'bg-blue-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon v-if="messagelist.find(f=>f.Id==scope.row.Id).ShowProcurement" icon-class='svg-cai' style='font-size: 1rem;' />
                          </div>
                        </div>
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.InformationCount>=1?'bg-yellow-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.InformationCount>=2?'bg-yellow-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.InformationCount>=3?'bg-yellow-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.InformationCount>=4?'bg-yellow-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon v-if="messagelist.find(f=>f.Id==scope.row.Id).ShowInformation" icon-class='svg-qing' style='font-size: 1rem;' />
                          </div>
                        </div>
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.CompetitorCount>=1?'bg-red-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.CompetitorCount>=2?'bg-red-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.CompetitorCount>=3?'bg-red-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.CompetitorCount>=4?'bg-red-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon v-if="messagelist.find(f=>f.Id==scope.row.Id).ShowCompetitor" icon-class='svg-jing' style='font-size: 1rem;' />
                          </div>
                        </div>
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.PaymentCount>=1?'bg-green-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.PaymentCount>=2?'bg-green-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.PaymentCount>=3?'bg-green-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.PaymentCount>=4?'bg-green-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon v-if="messagelist.find(f=>f.Id==scope.row.Id).ShowPayment" icon-class='svg-kuan' style='font-size: 1rem;' />
                          </div>
                        </div>
                      </div> -->

                      <el-dropdown
                        @command="
                          (e) => {
                            openByCompetingModels(scope.row, e)
                          }
                        "
                        placement="top"
                        :hide-on-click="true"
                      >
                        <img v-if="messagelist.find((f) => f.Id == scope.row.Id).ShowProcurement || messagelist.find((f) => f.Id == scope.row.Id).ShowInformation || messagelist.find((f) => f.Id == scope.row.Id).ShowCompetitor || messagelist.find((f) => f.Id == scope.row.Id).ShowPayment" class="w-5 h-5" src="/src/assets/img/sale/customer/naodong.gif" alt="" />
                        <div class="p-0.5 rounded-full bg-blue-500 text-center" style="width: 20px; height: 20px" v-else>
                          <img :src="nao" alt="" class="w-4 h-4" style="margin-left: 0.5px" />
                        </div>
                        <template #dropdown>
                          <el-dropdown-menu>
                            <el-dropdown-item :command="1">采购原则</el-dropdown-item>
                            <el-dropdown-item :command="2">情报跟进</el-dropdown-item>
                            <el-dropdown-item :command="3">竞争对手</el-dropdown-item>
                            <el-dropdown-item :command="4">付款方式</el-dropdown-item>
                          </el-dropdown-menu>
                        </template>
                      </el-dropdown>
                      <div class="truncate mr-2 text-left" style="cursor: pointer; color: #409eff; margin-left: 5px" :style="{ maxWidth: scope.row.CompanyName ? '280px' : '380px' }" @click="toPage('/Sale/Customer/CustomerHomePage/index', scope.row.Id)">{{ scope.row.Name }}</div>
                      <div class="text-xs px-1" style="background: rgb(255, 230, 215); color: #fc6f19; font-weight: 600; border-radius: 2px" v-show="scope.row.CompanyName">
                        {{ scope.row.CompanyName }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="125" label="行业">
                  <template #default="scope">
                    {{ scope.row.Trade_Two }}
                  </template>
                </el-table-column>
                <!-- <el-table-column width="125" label='品牌' show-overflow-tooltip>
                  <template #default='scope'>
                    {{scope.row.CompanyName}}
                  </template>
                </el-table-column> -->
                <el-table-column label="区域">
                  <template #default="scope">
                    {{ scope.row.Addr_Province + scope.row.Addr_City + scope.row.Addr_Area }}
                  </template>
                </el-table-column>
                <el-table-column width="80" label="状态">
                  <template #default="scope">
                    <span>状态</span>
                    <!-- <span v-if="scope.row.Checked == 0">未核准</span>
                    <span v-else>已核准</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="date" width="80" label="渠道">
                  <template #default="scope">
                    {{ scope.row.date || '--' }}
                  </template>
                </el-table-column>

                <el-table-column prop="date" width="150" label="业务数量（单）">
                  <el-table-column prop="date" label="报价/合同/成单率" width="150">
                    <template #default="scope"> 20/20/20 </template>
                  </el-table-column>
                </el-table-column>
                <!-- <el-table-column prop="date" width="150" label="业务金额（万元）">
                  <el-table-column prop="date" label="报价/合同/成单率" width="150">
                    <template #default="scope"> 15/20/10% </template>
                  </el-table-column>
                </el-table-column> -->
              </el-table>
            </div>
            <div v-if="data.tableTop == 1">
              <el-table border @selection-change="handleSelectionChange" :header-cell-style="{ background: '#468bfd', color: '#F5F8FF', height: '4rem', textAlign: 'center', fontWeight: '600', fontSize: '14px', padding: '0px' }" :cell-style="{ textAlign: ' center', color: '#333', height: '3rem', padding: '3px' }" :data="data.listdata" style="width: 100%; border-radius: 6px">
                <el-table-column type="selection" width="50" />
                <el-table-column type="index" width="55" label="序号" />
                <el-table-column width="110" label="录入日期">
                  <template #default="scope">
                    {{ (scope.row.CreateOn || '').substring(0, 10) }}
                  </template>
                </el-table-column>
                <el-table-column width="400px" label="客户名称" align="center">
                  <template #default="scope">
                    <div style="display: flex; justify-content: center; position: relative">
                      <!-- <div class="flex">
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.ProcurementCount>=1?'bg-blue-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.ProcurementCount>=2?'bg-blue-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.ProcurementCount>=3?'bg-blue-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.ProcurementCount>=4?'bg-blue-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon icon-class='svg-cai' style='font-size: 1rem;' />
                          </div>
                        </div>
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.InformationCount>=1?'bg-yellow-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.InformationCount>=2?'bg-yellow-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.InformationCount>=3?'bg-yellow-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.InformationCount>=4?'bg-yellow-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon icon-class='svg-qing' style='font-size: 1rem;' />
                          </div>
                        </div>
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.CompetitorCount>=1?'bg-red-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.CompetitorCount>=2?'bg-red-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.CompetitorCount>=3?'bg-red-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.CompetitorCount>=4?'bg-red-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon icon-class='svg-jing' style='font-size: 1rem;' />
                          </div>
                        </div>
                        <div>
                          <div class="flex">
                            <div class="messagebg" :class="scope.row.PaymentCount>=1?'bg-green-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.PaymentCount>=2?'bg-green-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.PaymentCount>=3?'bg-green-light':'bg-blue-dark'"></div>
                            <div class="messagebg" :class="scope.row.PaymentCount>=4?'bg-green-light':'bg-blue-dark'"></div>
                          </div>
                          <div class="icondiv">
                            <svg-icon icon-class='svg-kuan' style='font-size: 1rem;' />
                          </div>
                        </div>
                      </div>
                      <div style='cursor: pointer;color:#409EFF;margin-left:10px' @click="toPage('/Sale/Customer/CustomerHomePage/index')">{{ scope.row.Name }}</div> -->
                      <div class="truncate mr-2 text-left" style="cursor: pointer; color: #409eff; margin-left: 5px" :style="{ maxWidth: scope.row.CompanyName ? '280px' : '380px' }" @click="toPage('/Sale/Customer/CustomerHomePage/index', scope.row.Id)">{{ scope.row.Name }}</div>
                      <div class="text-xs px-1" style="background: rgb(255, 230, 215); color: #fc6f19; font-weight: 600; border-radius: 2px" v-show="scope.row.CompanyName">
                        {{ scope.row.CompanyName }}
                      </div>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column width="120px" label="事业部">
                  <template #default="scope">
                    {{ scope.row.CompName }}
                  </template>
                </el-table-column>
                <el-table-column width="120px" label="部门">
                  <template #default="scope">
                    {{ scope.row.DeptName }}
                  </template>
                </el-table-column>
                <el-table-column label="姓名">
                  <template #default="scope">
                    {{ scope.row.UserName }}
                  </template>
                </el-table-column>
                <el-table-column label="行业">
                  <template #default="scope">
                    {{ scope.row.Trade_Two }}
                  </template>
                </el-table-column>
                <el-table-column label="区域">
                  <template #default="scope">
                    {{ scope.row.Addr_Province + scope.row.Addr_City + scope.row.Addr_Area }}
                  </template>
                </el-table-column>
              </el-table>
            </div>

            <div class="flex justify-end">
              <div v-if="data.tableTop == 0">
                <el-pagination small v-model:page-size="form.size" :background="true" layout="prev, pager, next, jumper" :total="form.totals" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
              </div>
              <div v-else>
                <el-pagination small v-model:page-size="Communal.size" :background="true" layout="prev, pager, next, jumper" :total="Communal.totals" @size-change="handleSizeChangecomm" @current-change="handleCurrentChangecomm" />
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <ClaimCustomer v-if="ClaimDialog.Show" :dialogVisible="ClaimDialog.Show" :CusId="ClaimDialog.CusId" :CusName="ClaimDialog.CusName" @CloseClaim="CloseClaim"></ClaimCustomer>
    <!-- 采情竞款 -->
    <ByCompetingModels v-if="ByCompetingdata.view" :data="ByCompetingdata.data" :type="ByCompetingdata.type" :title="ByCompetingdata.title" @closeWindow="closeByCompetingModels" :isShowOld="1" />
  </div>
</template>
<script lang="ts">
import router from '/@/router/index'
import ClaimCustomer from '/@/views/Sale/Customer/Component/ClaimCustomer.vue'
import SreachTop from '/@/views/Sale/Component/SreachTop.vue'
import { mapData } from '/@/assets/map/mapData.js'
import { GetCheckedCustomerList, GetCustomerCommunalList, GetClaimCustomer, GetCustomerAnalysis, GetRegionRank } from '/@/api/Sale/Customer'
import axios from 'axios'
import { defineComponent, ref, getCurrentInstance, onMounted, onBeforeUnmount, reactive, nextTick } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useLayoutStore } from '/@/store/modules/layout'
// import Chart from '/@/views/Dashboard/Workplace/_Components/Chart.vue'
// import List from '/@/views/Dashboard/Workplace/_Components/List.vue'
import Clock from '/@/views/Dashboard/Workplace/_Components/Clock.vue'
import ByCompetingModels from '/@/views/Sale/Customer/Credit/ByCompetingModels.vue'
import nao from '/@/assets/img/sale/customer/nao.png'
import { GetTypeDepartList } from '/@/api/system/dept'

export default defineComponent({
  name: 'SaleIndex',
  components: {
    ClaimCustomer,
    ByCompetingModels,
    SreachTop,
    Clock
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
      CompId: null,
      RealName: '',
      AddDate: []
    })
    const Communal = reactive({
      page: 1,
      size: 10,
      totals: 0,
      Type: 1,
      CusName: ''
    })
    const Analysis = reactive({
      user: {},
      Trades: <any>[],
      Regions: []
    })
    const data = reactive({
      regionranklist: [],
      //事业部信息
      CompList: [],
      viewType: 1,
      DataId: 0,
      tableTop: 0,

      listdata: [],
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

    const ReturnSeachData = (val: any) => {
      getAnalysis(val)
      getregion(val)
    }

    //获取分析数据
    const getAnalysis = (val: any) => {
      GetCustomerAnalysis(val).then((res) => {
        if (res.code == 1) {
          Analysis.user = res.data.user
          Analysis.Trades.length = 0
          res.data.Trades.forEach((item: any) => {
            var info: any = {}
            info.value = item.Count
            info.name = item.Name
            Analysis.Trades.push(info)
          })
          Analysis.Regions = res.data.Regions
          // 绘制饼状图
          let domMap = <any>document.getElementById('piemyecharts')
          domMap.removeAttribute('_echarts_instance_')
          piemychart.value = echarts.init(domMap)
          piemychart.value.setOption(option, true)
        }
      })
    }
    //获取区域排行榜
    const getregion = (val: any) => {
      GetRegionRank(val).then((res) => {
        if (res.code == 1) {
          data.regionranklist = res.data
        }
      })
    }
    //获取事业部列表
    const getCompList = (data: any) => {
      // 获取事业部列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.CompList = res.data
          console.log(data.CompList)
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    //#region 采情竞款
    const ByCompetingdata = <any>ref({
      data: {},
      type: 1,
      view: false,
      title: ''
    })
    // 关闭采情竞款
    const closeByCompetingModels = () => {
      ByCompetingdata.value.view = false
      getlist()
    }

    // 打开采情竞款
    const openByCompetingModels = (val: any, type: any) => {
      ByCompetingdata.value.data = val
      ByCompetingdata.value.type = type
      ByCompetingdata.value.view = true
      ByCompetingdata.value.title = val.Name
    }
    //#endregion
    ///需要提醒的客户
    const messagelist = ref(<any>[])
    const getlist = async () => {
      clearInterval(timer.value)
      await GetCheckedCustomerList(form).then((res) => {
        if (res.code == 1) {
          data.tableData = res.data.list
          console.log('----------------------', data)
          form.totals = res.data.count
          messagelist.value = []
          if (data.tableData.length > 0) {
            data.tableData.forEach((item: any) => {
              var list: any = {}
              list.Id = item.Id
              list.ProcurementState = item.ProcurementState
              list.InformationState = item.InformationState
              list.CompetitorState = item.CompetitorState
              list.PaymentState = item.PaymentState
              list.ShowProcurement = true //是否提醒采购原则
              list.ShowInformation = true //是否提醒客户情报
              list.ShowCompetitor = true //是否提醒竞争对手
              list.ShowPayment = true //是否提醒付款方式
              messagelist.value.push(list)
            })
            showmessage()
          }
        }
      })
    }
    const ClaimDialog = ref({
      Show: false,
      CusId: 0,
      CusName: ''
    })

    const ClaimCustomer = () => {
      if (multipleSelection.value.length == 0) {
        ElMessage.warning('请至少选择一条数据')
        return false
      }

      if (multipleSelection.value.length > 1) {
        ElMessage.warning('只能选择一条数据')
        return false
      }
      ClaimDialog.value.CusId = multipleSelection.value[0].Id
      ClaimDialog.value.CusName = multipleSelection.value[0].Name
      ClaimDialog.value.Show = true
    }

    // 跳转客户详情
    const toPage = (url: string, Id: number) => {
      router.push({ path: url, query: { Id: Id } })
    }

    const CloseClaim = () => {
      ClaimDialog.value.Show = false
      getcommlist()
    }

    const getcommlist = () => {
      GetCustomerCommunalList(Communal).then((res) => {
        if (res.code == 1) {
          Communal.totals = res.data.count
          data.listdata = res.data.list
        }
      })
    }
    //提醒
    const timer = ref()
    const showmessage = () => {
      // timer.value = setInterval(() => {
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
            if (item.ShowPayment == true) {
              item.ShowPayment = false
            } else {
              item.ShowPayment = true
            }
          }
        })
      } else {
        clearInterval(timer.value)
      }
      // }, 600)
    }
    const handleSizeChangecomm = (val: number) => {
      Communal.size = val
      getcommlist()
    }
    const handleCurrentChangecomm = (val: number) => {
      Communal.page = val
      getcommlist()
    }

    const handleSizeChange = (val: number) => {
      form.size = val
      getlist()
    }
    const handleCurrentChange = (val: number) => {
      form.page = val
      getlist()
    }
    const TopTable = reactive({
      Info: [
        {
          Name: '区域分布排行榜',
          Column: ['区域', '客户总量', 'A级客户', '新开客户', '成单率']
        },
        {
          Name: '新员工排行榜',
          Column: ['姓名', '客户总量', 'A级客户', '新开客户', '成单率']
        },
        {
          Name: '老员工排行榜',
          Column: ['姓名', '客户总量', 'A级客户', '新开客户', '成单率']
        },
        {
          Name: '部门排行榜',
          Column: ['部门经理', '客户总量', 'A级客户', '新开客户', '成单率']
        },
        {
          Name: '事业部排行榜',
          Column: ['销售经理', '客户总量', 'A级客户', '新开客户', '成单率']
        },
        {
          Name: '集团排行榜',
          Column: ['大区', '客户总量', 'A级客户', '新开客户', '成单率']
        }
      ],
      Data: {
        Name: '区域分布排行榜',
        Column: ['区域', '客户总量', 'A级客户', '新开客户', '成单率']
      },
      TableShow: false,
      tableData: []
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

    const option = {
      title: {
        text: '行业客户分布',
        left: 'left'
      },
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
          data: Analysis.Trades,
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

    const mychart: any = ref({})
    const piemychart: any = ref({})

    let chinamap: any = ref([])
    chinamap.value = mapData
    const mapEpidemic: any = ref([])
    const childrenId: any = ref('100000')
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
      getCompList(data)
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
        澳门: '澳门特别行政区',
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
            var city: any = Analysis.Regions.find((x: any) => x.Name == params.name)
            var count = 0
            if (city) {
              count = city.Count
            }
            console.log(params)
            return ' 客户数量: ' + count
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
    const page = reactive({
      page: 1,
      size: 10,
      type: 0,
      count: 0
    })
    const multipleSelection = ref<any[]>([])
    const handleSelectionChange = (val: any) => {
      multipleSelection.value = val
    }
    const cliketop = (val: any) => {
      data.tableTop = val
      page.type = val
      multipleSelection.value = []
      if (val == 0) {
        getlist()
      } else {
        getcommlist()
      }
    }
    return {
      Analysis,
      getAnalysis,
      getregion,
      ReturnSeachData,
      ClaimDialog,
      CloseClaim,
      ClaimCustomer,
      getcommlist,
      Communal,
      handleSizeChangecomm,
      handleCurrentChangecomm,
      multipleSelection,
      handleSelectionChange,
      page,
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
      toPage,
      ByCompetingdata,
      closeByCompetingModels,
      openByCompetingModels,
      ByCompetingModels,
      nao
    }
  }
})
</script>
<style type="postcss" scoped>
#myecharts {
  background: #ffffff;
  width: 25rem;
  height: 21.75rem;
}
#piemyecharts {
  background: #ffffff;
  width: 17rem;
  height: 13rem;
}
.home-content {
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
      /* margin-right: 1rem; */
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
:deep(.el-table .cell) {
  padding: 0 6px;
}
</style>
