<template>
  <div class="quotationlist">
    <div class="pt-6">

      <div class="listtop flex p-2 pl-8 justify-between">
        <div class="flex">
          <div class="rank pt-6">
            <div class="text-3xl text-white text-center">
              {{data.Rank.CustomerRank}}
            </div>
          </div>

          <div class="flex pl-20">
            <div class='bg-blue-bg border-white border-solid border-2 h-16 w-60 rounded-md mt-4 p-2 '>
              <el-row>
                <el-col :span="3" class="z-10">
                  <div class="quonum">
                    <div class="w-10 text-center">
                      <div class="text-xl "> {{data.Rank.CustomerCount}}</div>
                      <div class="text-xs">客户量</div>
                    </div>
                  </div>
                </el-col>
                <el-col :span="21">
                  <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                    <div>
                      <div class="text-xl"> {{data.Rank.CustomerCount_A}}</div>
                      <div class="text-xs">A级</div>
                    </div>
                    <div>
                      <div class="text-xl"> {{data.Rank.CustomerCount_B}}</div>
                      <div class="text-xs">B级</div>
                    </div>
                    <div>
                      <div class="text-xl"> {{data.Rank.CustomerCount_C}}</div>
                      <div class="text-xs">C级</div>
                    </div>
                    <div>
                      <div class="text-xl"> {{data.Rank.AddCount}}</div>
                      <div class="text-xs">新增</div>
                    </div>
                  </div>
                </el-col>
              </el-row>
            </div>

            <div class="w-8 h-16 mt-4 py-2">
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
                </div>
              </div>
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
                </div>
              </div>
            </div>

            <div class='bg-blue-bg border-white border-solid border-2 h-16 w-20 rounded-md mt-4 p-2 '>
              <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                <div>
                  <div class="text-xl"> {{data.Rank.ChannelsCount}}</div>
                  <div class="text-xs">渠道</div>
                </div>

              </div>
            </div>

            <div class="w-8 h-16 mt-4 py-2">
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
                </div>
              </div>
              <div class="h-1/2 flex">
                <div class="w-full h-2 my-auto" style="background: linear-gradient(180deg, #7ABAE1 0%, #2D80B4 49%, #82AFCB 100%);">
                </div>
              </div>
            </div>

            <div class='bg-blue-bg border-white border-solid border-2 h-16 w-36 rounded-md mt-4 p-2 '>

              <div class="border-white border-dashed border h-full rounded-md flex text-center justify-between px-2">
                <div class="text-red-600">
                  <div class="text-xl"> {{data.Rank.NnUpdatedCount}}</div>
                  <div class="text-xs">待沟通</div>
                </div>
                <div class="text-red-600">
                  <div class="text-xl"> {{data.Rank.NnUpdatedCount}}</div>
                  <div class="text-xs">待更新</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex ">
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('前')" :class="form.timetype=='前'?'bg-blue-but text-white':'bg-white'">前</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('日')" :class="form.timetype=='日'?'bg-blue-but text-white':'bg-white'">日</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('周')" :class="form.timetype=='周'?'bg-blue-but text-white':'bg-white'">周</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('月')" :class="form.timetype=='月'?'bg-blue-but text-white':'bg-white'">月</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('季')" :class="form.timetype=='季'?'bg-blue-but text-white':'bg-white'">季</div>
          <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer" @click="clicktime('年')" :class="form.timetype=='年'?'bg-blue-but text-white':'bg-white'">年</div>

          <el-popover placement="bottom" :width="300" trigger="click">
            <template #reference>
              <div class="h-6 w-6 text-center px-1 rounded ml-1 cursor-pointer pt-1" @click="clicktime('自')" :class="form.timetype=='自'?'bg-blue-but text-white':'bg-white'">
                <el-icon-Calendar class='w-4 h-4 mr-2'></el-icon-Calendar>
              </div>

            </template>
            <el-date-picker v-model="form.SeachDate" type="daterange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" size="small" style="width:250px" />
          </el-popover>
        </div>

      </div>
    </div>
    <div class="pt-2">
      <div class="border-gray-500 border-dashed p-2 pb-0 flex">
        <div class="w-52">
          <el-tabs v-model="data.tableTop" class="demo-tabs" @tab-change="cliketop">
            <el-tab-pane label="我的客户" :name=0></el-tab-pane>
            <el-tab-pane label="协作申请" :name=1></el-tab-pane>
          </el-tabs>
        </div>
        <div class="flex justify-end w-full pl-4 pt-1">
          <div class="pr-4">
            <div v-if="data.tableTop==0" class="flex">
              <el-input style="width:200px;height: 32px;" v-model="form.CustomerName" placeholder='请输入客户名' class="pr-2"></el-input>
              <el-select v-model="form.QueryType" style="width:120px" clearable placeholder="查询类型" class="pr-2">
                <el-option label="核准状态" value=1 />
                <el-option label="企业等级" value=2 />
                <el-option label="当前状态" value=3 />
              </el-select>
              <el-select v-model="form.Checked" v-if="form.QueryType==1" clearable style="width:120px" placeholder="核准状态" class="pr-2">
                <el-option label="全部" value=2 />
                <el-option label="未核准" value=0 />
                <el-option label="已核准" value=1 />
              </el-select>
              <el-select v-model="form.Ranking" v-if="form.QueryType==2" clearable style="width:120px" placeholder="企业等级" class="pr-2">
                <el-option label="10强" value=10 />
                <el-option label="20强" value=20 />
                <el-option label="30强" value=30 />
                <el-option label="其他" value=0 />
              </el-select>
              <el-select v-model="form.Checked" v-if="form.QueryType==3" clearable style="width:120px" placeholder="当前状态" class="pr-2">
                <el-option label="私有客户" value=1 />
                <el-option label="共享客户" value=2 />
                <el-option label="历史客户" value=3 />
                <el-option label="未完成客户" value=4 />
              </el-select>
              <el-button type="primary" class="butclass pr-2" @click="search">
                <svg-icon icon-class='svg-cus_search' />搜索
              </el-button>
            </div>
            <div v-if="data.tableTop==1" class="flex">
              <el-input style="width:200px;height: 32px;" v-model="change.CusName" placeholder='请输入客户名' class="pr-2"></el-input>

              <el-button type="primary" class="butclass" @click="getchangelist">
                <svg-icon icon-class='svg-cus_search' />搜索
              </el-button>
            </div>
          </div>

          <div v-if="data.tableTop==0">
            <el-button type="primary" class="butclass" @click="openTogether">
              <svg-icon icon-class='svg-xiezuo' />邀请协作
            </el-button>
            <el-button type="primary" class="addbutclass" @click='addCustomerview'>
              <svg-icon icon-class='svg-add' style=" font-size: 18px;    margin-right: 3px;" />新增客户
            </el-button>

            <!--  <el-button type="primary" class="butclass" @click="openRegion">
              <svg-icon icon-class='svg-quyu' />区域申请
            </el-button> -->
          </div>

        </div>

      </div>

    </div>

    <div class="">

      <!--  <div class="w-full h-12 rounded-t-lg flex justify-between px-4" style="background:#4372E3">
        <div class="text-white" style="display: flex;">
          <div @click="cliketop(0)" :class="data.tableTop==0?'bg-white text-blue-500':''" class="h-12 p-2">
            我的客户
          </div>
          <div @click="cliketop(1)" :class="data.tableTop==1?'bg-white text-blue-500':''" class="h-12 p-2">
            协作申请
          </div>
        </div>
        <div>
        </div>
      </div> -->
      <div v-if="data.tableTop==0">

        <el-table :data='data.tableData' @selection-change="handleSelectionChange"
          :header-cell-style="{ 'background':'#468bfd', 'color': '#F5F8FF' ,'height':'2rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }"
          :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" style='width: 100%;border-radius:6px'>
          <el-table-column type='selection' width='50' />
          <el-table-column type="index" width="55" label='序号' />
          <el-table-column prop='CreateOn' width="110" label='创建时间'>
            <template #default='scope'>
              {{(scope.row.CreateOn).substring(0,10)}}
            </template>
          </el-table-column>

          <el-table-column label='客户名称' show-overflow-tooltip width="400">
            <template #default='scope'>
              <div class="items-center" style='display:flex;justify-between: center;position: relative;'>
                <!-- <div class="flex cursor-pointer">
                  <div @click="openCredit(scope.row,1)">
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
                  <div @click="openCommunicate(scope.row)">
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
                  <div @click="openCredit(scope.row,3)">
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
                  <div @click="openCredit(scope.row,4)">
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

                <el-dropdown @command="(e)=>{openByCompetingModels(scope.row, e)}" placement="top" :hide-on-click="true">
                  <img
                  v-if="messagelist.find(f=>f.Id==scope.row.Id).ShowProcurement || messagelist.find(f=>f.Id==scope.row.Id).ShowInformation || messagelist.find(f=>f.Id==scope.row.Id).ShowCompetitor || messagelist.find(f=>f.Id==scope.row.Id).ShowPayment"
                  class="w-5 h-5" src="/src/assets/img/sale/customer/naodong.gif" alt="">
                  <div class="p-0.5 rounded-full bg-blue-500 text-center" style="width: 20px;height: 20px" v-else>
                    <img :src="nao" alt="" class="w-4 h-4">
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
                <div
                class="truncate mr-2 text-left"
                style='cursor: pointer;color:#409EFF;margin-left:5px;'
                :style="{'maxWidth': scope.row.CompanyName ? '280px' : '380px'}"
                @click="toPage('/Sale/Customer/CustomerHomePage/index')"
                >{{ scope.row.Name }}</div>
                <div class="text-xs px-1" style="background: rgb(255,230,215);color: #FC6F19;font-weight:600;border-radius: 2px" v-show="scope.row.CompanyName">{{scope.row.CompanyName}}</div>
              </div>
            </template>
          </el-table-column>
          <el-table-column label='行业' prop='Trade_Two' show-overflow-tooltip />
          <!-- <el-table-column width="120" label='品牌' show-overflow-tooltip>
            <template #default='scope'>
              {{scope.row.CompanyName}}
            </template>
          </el-table-column> -->
          <el-table-column label='区域' width="160px" show-overflow-tooltip>
            <template #default='scope'>
              {{scope.row.Addr_Province+scope.row.Addr_City+scope.row.Addr_Area}}
            </template>
          </el-table-column>
          <el-table-column label='状态' width="110px">
            <template #default='scope'>
              <span v-if="scope.row.CustomerState==1">私有客户</span>
              <span v-else-if="scope.row.CustomerState==2">历史客户</span>
              <span v-else-if="scope.row.CustomerState==3">共享客户</span>
              <span v-else-if="scope.row.CustomerState==4">未完成客户</span>
              <span v-else>--</span>
            </template>
          </el-table-column>
          <el-table-column label='渠道' width="60px">
            <template #default='scope'>
              {{scope.row.ChannelCount}}
            </template>
          </el-table-column>

          <el-table-column prop='CreateOn' label='业务数量（单）'>
            <el-table-column width="140px" label='报价/合同/成单率'>
              <template #default='scope'>
                {{ scope.row.QuotationCount+"/"+scope.row.ContractCount+"/"+ scope.row.UnitRate }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column label='业务金额（万元）'>
            <el-table-column width="140px" label='报价/合同/成交率'>
              <template #default='scope'>
                {{ scope.row.QuotationAmount+"/"+scope.row.ContractAmount+"/"+ scope.row.DealRate }}
              </template>
            </el-table-column>

          </el-table-column>
          <!-- <el-table-column label="信息情报" width="90px">
            <template #default='scope'>
              <el-link @click="openCommunicate(scope.row)">去完善</el-link>

            </template>
          </el-table-column> -->

          <!--         <el-table-column label='业务员' prop='CustomerUserRealName' /> -->

          <el-table-column fixed='right' label='操作' width="80px">
            <template #default='scope'>
              <div style='display:flex;' class="justify-center">
                <div>
                  <span v-if="scope.row.Checked!=1" class="cursor-pointer" style="color:#FC701B" @click='handleClick(scope.row,2)'>
                    未核准
                  </span>
                  <span v-else class="cursor-pointer" style="color:#44D7B6" @click='handleClick(scope.row,3)'>
                    已核准
                  </span>
                  <!--  <el-button v-if="scope.row.State!=100" size='small' style='color:red;padding:0px' @click='handleClick(scope.row,2)'>未核准</el-button>
                  <el-button v-else size='small' style='color:green;padding:0px' @click='handleClick(scope.row,3)'>已核准</el-button> -->
                </div>

              </div>
            </template>
          </el-table-column>
        </el-table>

        <div class="flex justify-end">
          <div>
            <el-pagination small v-model:page-size="form.size" :background="true" layout="prev, pager, next, jumper" :total="form.totals" @size-change="handleSizeChange"
              @current-change="handleCurrentChange" />
          </div>
        </div>
      </div>

      <div v-if="data.tableTop==1">
        <el-table :data='data.Changelist' border
          :header-cell-style="{ 'background':'#468bfd', 'color': '#F5F8FF' ,'height':'4rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }"
          :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" style='width: 100%;border-radius:6px'>
          <el-table-column type='selection' width='50' />
          <el-table-column type="index" width="55" label='序号' />
          <el-table-column prop='CreateOn' width="150" label='邀请时间'>
            <template #default='scope'>
              {{(scope.row.CreateOn).substring(0,10)}}
            </template>
          </el-table-column>

          <el-table-column label='客户名称' show-overflow-tooltip>
            <template #default='scope'>
              {{scope.row.CustomerName}}
            </template>
          </el-table-column>
          <el-table-column label='事业部' width="150">
            <template #default='scope'>
              {{scope.row.CompName}}
            </template>
          </el-table-column>
          <el-table-column label='邀请人' width="150">
            <template #default='scope'>
              {{scope.row.BeforeUserName}}
            </template>
          </el-table-column>
          <el-table-column label='事由' show-overflow-tooltip>
            <template #default='scope'>
              {{scope.row.Remark}}
            </template>
          </el-table-column>

          <el-table-column label="状态" width="110">
            <template #default='scope'>
              <el-link type="danger" v-if="scope.row.State==-2">
                已拒绝
              </el-link>
              <el-link type="success" v-else-if="scope.row.State==100">
                已同意
              </el-link>
              <el-link type="primary" v-else>
                待确认
              </el-link>
            </template>
          </el-table-column>

          <!--         <el-table-column label='业务员' prop='CustomerUserRealName' /> -->

          <el-table-column fixed='right' label='操作' width="110" style='text-align:left'>
            <template #default='scope'>
              <el-link @click="showchange(scope.row,2)" v-if="scope.row.State==-2||scope.row.State==100">
                详情
              </el-link>
              <el-link type="primary" @click="showchange(scope.row,4)" v-else>
                去确认
              </el-link>
            </template>
          </el-table-column>
        </el-table>

        <div class="flex justify-end">
          <div>
            <el-pagination small v-model:page-size="change.size" :background="true" layout="prev, pager, next, jumper" :total="change.totals" @size-change="chandleSizeChange"
              @current-change="chandleCurrentChange" />
          </div>
        </div>
      </div>
    </div>

    <AddCustomer v-if='data.AddCustomerData.view' :ViewType="data.viewType" :customerId='data.DataId' title='客户信息录入' @closeWindow='closePostWindow' />
    <!-- <AddPurchase v-if='data.purchaseView.view' :CustomerName='data.purchaseView.CusName' :ViewType="data.purchaseView.viewtype" :CustomerId='data.purchaseView.dataid'
      :title='data.purchaseView.title' @closeWindow='closepurchase' /> -->
    <!-- <AddPayment v-if='data.paymentView.view' :CustomerName='data.paymentView.CusName' :ViewType="data.paymentView.viewtype" :CustomerId='data.paymentView.dataid'
      :title='data.paymentView.title' @closeWindow='closepayment' /> -->
    <!-- <CompeteList v-if='data.competeView.view' :CustomerName='data.competeView.CusName' :ViewType="data.competeView.viewtype" :CustomerId='data.competeView.dataid'
      :title='data.competeView.title' @closeWindow='closecompete' /> -->

    <Together v-if='data.AddTogether.view' :ViewType="data.AddTogether.viewtype" :DataId="data.AddTogether.dataid" :CustomerName='data.AddTogether.CusName'
      :CustomerId='data.AddTogether.CusId' @closeWindow='closeTogether' />
    <!-- <Communicate v-if='data.AddCommunicate.view' :ViewType="data.AddCommunicate.viewtype" :CustomerId='data.AddCommunicate.dataid' :CustomerName='data.AddCommunicate.CusName'
      @closeWindow='closeCommunicate' /> -->
    <Region v-if='data.AddRegion.view' :ViewType="data.AddRegion.viewtype" :CustomerId='data.AddRegion.dataid' @closeWindow='closeRegion' />
    
    <ByCompetingModels v-if='data.ByCompetingModels.view' :data='data.ByCompetingModels.data' :type='data.ByCompetingModels.type' :title='data.ByCompetingModels.title' @closeWindow='closeByCompetingModels' />
  </div>
</template>
<script lang="ts" setup>
import router from '/@/router/index'
// import CompeteList from '/@/views/Sale/Customer/Credit/Compete/CompeteList.vue'
// import AddPayment from '/@/views/Sale/Customer/Credit/Payment/AddPayment.vue'
// import AddPurchase from '/@/views/Sale/Customer/Credit/Purchase/AddPurchase.vue'
import ByCompetingModels from '/@/views/Sale/Customer/Credit/ByCompetingModels.vue'
import Together from './Component/Together.vue'
// import Communicate from './Component/Communicate.vue'
import Region from './Component/Region.vue'
import { GetCheckedCustomerList, GetCustomerRankByUserId, GetCustomerTogtherList } from '/@/api/Sale/Customer'
import nao from '/@/assets/img/sale/customer/nao.png'
import AddCustomer from './AddCustomer.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
const page = reactive({
  page: 1,
  size: 10,
  count: 0
})
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}

const printdata = ref({
  view: false,
  dataid: 0
})

const printorder = (val: number) => {
  printdata.value.dataid = val
  console.log('-------', val)
  printdata.value.view = true
}
const search = () => {
  getlist(form, data)
}

const getuserrank = () => {
  GetCustomerRankByUserId({}).then((res) => {
    if (res.code == 1) {
      data.Rank = res.data
    }
  })
}
//获取邀请协作列表
const getchangelist = () => {
  GetCustomerTogtherList(change).then((res) => {
    if (res.code == 1) {
      data.Changelist = res.data.list
      change.totals = res.data.count
    }
  })
}
const showchange = (item: any, val: any) => {
  data.AddTogether.viewtype = val
  data.AddTogether.dataid = item.Id
  data.AddTogether.view = true
}

///需要提醒的客户
const messagelist = ref(<any>[])
const getlist = async (form: any, data: any) => {
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
//提醒
const timer = ref()
const showmessage = () => {
  // timer.value = setInterval(() => {
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
const form = reactive({
  page: 1,
  size: 10,
  totals: 0,
  QueryType: null,
  CustomerName: '',
  Ranking: null,
  Checked: null,
  SeachDate: [],
  timetype: ''
})
const change = reactive({
  page: 1,
  size: 10,
  totals: 0,
  CusName: ''
})
const data = reactive({
  viewType: 1,
  DataId: 0,
  tableTop: 0,
  Rank: {
    CustomerRank: 0,
    CustomerCount: 0,
    CustomerCount_A: 0,
    CustomerCount_B: 0,
    CustomerCount_C: 0,
    AddCount: 0,
    ChannelsCount: 0,
    NnUpdatedCount: 0
  },
  AddCustomerData: {
    view: false,
    currentCustomerId: 0,
    isEdit: false,
    otherRegion: {},
    InfoDisabled: false,
    screenCustomer: null,
    isReadOnly: false
  },
  // AddCommunicate: {
  //   CusName: '',
  //   view: false,
  //   dataid: 0,
  //   viewtype: 1,
  //   title: ''
  // },
  // purchaseView: {
  //   CusName: '',
  //   view: false,
  //   dataid: 0,
  //   viewtype: 1,
  //   title: ''
  // },
  // 采情竞款
  ByCompetingModels: {
    data: {},
    type: 1,
    view: false,
    title: ''
  },
  // paymentView: {
  //   CusName: '',
  //   view: false,
  //   dataid: 0,
  //   viewtype: 1,
  //   title: ''
  // },
  // competeView: {
  //   CusName: '',
  //   view: false,
  //   dataid: 0,
  //   viewtype: 1,
  //   title: ''
  // },
  AddCredit: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  },
  AddTogether: {
    CusId: 0,
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  },
  AddRegion: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  },
  Changelist: [],
  tableData: []
})

const openRegion = () => {
  data.AddRegion.view = true
}

const closeRegion = () => {
  data.AddRegion.view = false
}

// 跳转客户详情
  const toPage = (url:string) => {
    router.push({ path: url })
  }

const openTogether = () => {
  if (multipleSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (multipleSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  data.AddTogether.viewtype = 1
  data.AddTogether.CusName = multipleSelection.value[0].Name
  data.AddTogether.CusId = multipleSelection.value[0].Id
  data.AddTogether.view = true
}

const closeTogether = () => {
  data.AddTogether.view = false
  getchangelist()
}

// const openCommunicate = (val: any) => {
//   data.AddCommunicate.CusName = val.Name
//   data.AddCommunicate.dataid = val.Id
//   data.AddCommunicate.view = true
// }

// const closeCommunicate = () => {
//   data.AddCommunicate.view = false
//   getlist(form, data)
// }

// const closepurchase = () => {
//   data.purchaseView.view = false
//   getlist(form, data)
// }

// const closepayment = () => {
//   data.paymentView.view = false
//   getlist(form, data)
// }
// const closecompete = () => {
//   data.competeView.view = false
//   getlist(form, data)
// }

// 关闭采情竞款
const closeByCompetingModels = () => {
  data.ByCompetingModels.view = false
  getlist(form, data)
}

// 打开采情竞款
const openByCompetingModels = (val:any, type: any) => {
  data.ByCompetingModels.data = val
  data.ByCompetingModels.type = type
  data.ByCompetingModels.view = true
  data.ByCompetingModels.title = val.Name
}

// const openCredit = (val: any, type: any) => {
//   if (type != 2) {
//     if (type == 1) {
//       if (val.ProcurementState == true) {
//         data.purchaseView.viewtype == 1
//       } else {
//         data.purchaseView.viewtype == 2
//       }
//       data.purchaseView.dataid = val.Id
//       data.purchaseView.view = true
//       data.purchaseView.CusName = val.Name
//       data.purchaseView.title = val.Name + '-采购原则'
//     } else if (type == 4) {
//       if (val.PaymentState == true) {
//         data.paymentView.viewtype == 1
//       } else {
//         data.paymentView.viewtype == 2
//       }
//       data.paymentView.dataid = val.Id
//       data.paymentView.view = true
//       data.paymentView.CusName = val.Name
//       data.paymentView.title = val.Name + '-付款方式'
//     } else if (type == 3) {
//       if (val.CompetitorState == true) {
//         data.competeView.viewtype == 1
//       } else {
//         data.competeView.viewtype == 2
//       }
//       data.competeView.dataid = val.Id
//       data.competeView.view = true
//       data.competeView.CusName = val.Name
//       data.competeView.title = val.Name + '-竞争对手'
//     }

//     /*if (val.ProcurementState == true || val.PaymentState == true || val.CompetitorState == true) {
//       data.AddCredit.viewtype = 1
//     } else {
//       data.AddCredit.viewtype = 3
//     }
//     data.AddCredit.dataid = val.Id
//     data.AddCredit.view = true
//     data.AddCredit.CusName = val.Name
//     data.AddCredit.title = val.Name + '-信用报告' */
//   } else {
//     data.AddCommunicate.CusName = val.Name
//     data.AddCommunicate.dataid = val.Id
//     data.AddCommunicate.view = true

//     /*data.DataId = val.Id
//     data.viewType = 2
//     data.AddCustomerData.view = true */
//   }
// }

const clicktime = (val: any) => {
  form.timetype = val
}

const cliketop = () => {
  console.log('data.tableTop', data.tableTop)
  if (data.tableTop == 0) {
    getlist(form, data)
  } else {
    getchangelist()
  }
}

const chandleSizeChange = (val: number) => {
  change.size = val
  getchangelist()
}
const chandleCurrentChange = (val: number) => {
  change.page = val
  getchangelist()
}

const handleSizeChange = (val: number) => {
  form.size = val
  getlist(form, data)
}
const handleCurrentChange = (val: number) => {
  form.page = val
  getlist(form, data)
}
const closePostWindow = () => {
  getlist(form, data)
  data.AddCustomerData.view = false
}

const handleClick = (val: any, type: any) => {
  data.DataId = val.Id
  data.viewType = type
  data.AddCustomerData.view = true
}
//新增客户
const addCustomerview = () => {
  data.viewType = 1
  data.DataId = 0
  data.AddCustomerData.view = true
}

onMounted(() => {
  showmessage()
  getuserrank()
  getlist(form, data)
})
</script>
<style lang="postcss" scoped>
.quotationlist {
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
  .listtop {
    background: url(../../../assets/img/sale/result/topbj.png);
    background-size: 100% 100%;
    height: 100px;
    .rank {
      background: url(../../../assets/img/sale/result/cus_rank.png);
      background-size: 100% 100%;
      height: 90px;
      width: 90px;
    }
    .quonum {
      background: url(../../../assets/img/sale/result/bigtoptitle.png);
      background-size: 100% 100%;
      height: 46px;
      width: 53px;
      position: absolute;
      top: -15px;
      left: -17px;
    }
    .jenum {
      background: url(../../../assets/img/sale/result/smalltoptitle.png);
      background-size: 100% 100%;
      height: 17px;
      width: 53px;
      position: relative;
      top: -59px;
      left: -6px;
    }
  }
  .custtj {
    background: url(../../../assets/img/sale/customer/customer_tj.png) repeat-x left top;
    background-size: 100% 100%;
    .tjtitle {
      position: relative;
      top: -13px;
      background: url(../../../assets/img/sale/customer/tj_title.png);
      background-size: 100% 100%;
    }
  }
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
:deep(.el-table .cell){
  padding: 0 6px;
}
</style>
