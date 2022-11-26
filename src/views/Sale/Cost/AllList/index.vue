<template>
  <div class="giftlist">
    <div class="flex bg-white">
      <div class='w-60 h-60 p-2 bg-white  text-blue-800 font-bold text-center relative border-blue-400 border-solid border-4 rounded-lg mr-2 flex-shrink'>
        <div class='w-1/2  h-1/2 bg-white float-left p-1 border-blue-400 border-dashed border-b border-r'>
          <div class='h-full'>
            <div class='pt-2'>已通过</div>
            <div class='text-xl'>{{ headerInfo.Agree || 0 }}</div>
          </div>
        </div>
        <div class='w-1/2  h-1/2 bg-white float-left p-1'>
          <div class='h-full '>
            <div class='pt-2'>驳回</div>
            <div class='text-xl'>{{ headerInfo.Refuse || 0 }}</div>
          </div>
        </div>
        <div class='w-1/2  h-1/2 bg-white float-left p-1'>
          <div class='h-full '>
            <div class='pt-12'>发放金额</div>
            <div class='text-xl'>{{ headerInfo.GrantAmount || 0 }}</div>
          </div>
        </div>
        <div class='w-1/2  h-1/2 bg-white float-left p-1 border-blue-400 border-dashed border-t border-l'>
          <div class='h-full '>
            <div class='pt-12'>未发放金额</div>
            <div class='text-xl'>{{ headerInfo.UnGrantAmount || 0 }}</div>
          </div>
        </div>
        <div class='w-2/5  h-2/5 p-1 float-left bg-white rounded-full border-blue-400 border-solid border' style='position: absolute; top:4.6rem;left:4.3rem'>
          <div class='h-full text-red-600'>
            <div class='pt-6'>未审批</div>
            <div class='text-xl'>{{ headerInfo.Wait || 0 }}</div>
          </div>
        </div>
      </div>
      <div class="flex h-60 p-2 border-blue-400 border-solid border-4 rounded-lg flex-1">
        <div class="text-blue-800 font-bold flex flex-col">
          <div class='w-40 flex-1 text-center  p-1 border-blue-400 border-dashed border-r'>
            <div class='h-full flex  flex-col justify-center'>
              <div class='pt-4' v-if="page.tableTop == 0">招待费</div>
              <div class='pt-4' v-else-if="page.tableTop == 1">礼品费</div>
              <div class='pt-4' v-else-if="page.tableTop == 2">其他费</div>
              <div class='pt-4' v-else-if="page.tableTop == 3">居间费</div>
              <div class='pt-2'>数量/金额</div>
              <div class='text-xl'>{{ headerInfo.Agree || 0 }}/{{ headerInfo.Amount || 0 }}</div>
            </div>
          </div>
        </div>
        <div class="flex-1">
          <div id='myecharts' class="w-full" v-if="page.tableTop == 0"/>
          <div id='myecharts' class="w-full" v-else-if="page.tableTop == 1"/>
          <div id='myecharts' class="w-full" v-else-if="page.tableTop == 2"/>
          <div id='myecharts' class="w-full" v-else="page.tableTop == 3"/>
        </div>
      </div>
    </div>
    <div class="pt-2 ">
      <div class=" pb-2 text-right flex justify-between items-center">
        <div class=" hom_custab">
          <el-tabs v-model="page.tableTop" class="demo-tabs" @tab-change="cliketop">
            <el-tab-pane label="招待费" :name=0></el-tab-pane>
            <el-tab-pane label="礼品费" :name=1></el-tab-pane>
            <el-tab-pane label="其他费" :name=2></el-tab-pane>
            <el-tab-pane label="居间费" :name=3></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="pb-2 text-right flex justify-between items-center">
        <div class="flex">
          <div class="pr-2">
            <el-date-picker v-model="page.time" type="daterange" format="YYYY/MM/DD" value-format="YYYY/MM/DD" range-separator="至" start-placeholder="开始时间"
              end-placeholder="结束时间" />
          </div>
          <div class="pr-2 w-32">
            <el-select v-model="page.Proposer" placeholder="申请人" @change="changeUser(1)">
              <el-option v-for="item in data.ProposerList" :key="item.Id" :label="item.RealName" :value="item.Id" />
            </el-select>
          </div>
          <div class="pr-2 w-32">
            <el-select v-model="page.Dimission" placeholder="离职人员" @change="changeUser(0)">
              <el-option v-for="item in data.DimissionList" :key="item.Id" :label="item.RealName" :value="item.Id" />
            </el-select>
          </div>
          <div class="pr-2 w-48">
            <el-select v-model="page.SearchType" placeholder="状态">
              <el-option v-for="item in data.SearchTypeList" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <el-button type="primary" class="butclass" @click="getlist">
            <svg-icon icon-class='svg-cus_search' />查询
          </el-button>
        </div>
        <div>
          <el-button type="primary" class="addbutclass" v-if="page.tableTop == 0" @click="openAddEntertainment">
            <svg-icon icon-class='svg-addent' />新增招待费
          </el-button>
          <el-button type="primary" class="addbutclass" v-else-if="page.tableTop == 1" @click="openAddGift">
            <svg-icon icon-class='svg-addgift' />新增礼品费
          </el-button>
          <el-button type="primary" class="addbutclass" v-else-if="page.tableTop == 2" @click="openAddOther">
            <svg-icon icon-class='svg-addother' />新增其他费
          </el-button>
          <el-button type="primary" class="addbutclass" v-else @click="openContract">
            <svg-icon icon-class='svg-addother' />居间费申请
          </el-button>
        </div>
      </div>
    </div>
    <div class="">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange"
        :header-cell-style="{ 'background':'#468bfd', 'color': '#F5F8FF' ,'height':'3rem', 'textAlign': 'center' ,'fontWeight':'600','fontSize':'14px','padding':'0px' }"
        :cell-style="{ 'textAlign': ' center','color': '#333', 'height':'3rem','padding':'3px' }" style='width: 100%;border-radius:6px' v-loading="data.loading"
        element-loading-text="Loading...">
        <el-table-column type="index" width='60' label='序号'></el-table-column>
        <el-table-column prop='CreateOn' label='申请时间' width="110">
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>

        <template v-if="page.tableTop == 0">
          <el-table-column label='事业部' width="100">
            <template #default="scope">{{ scope.row.CompName }}</template>
          </el-table-column>
          <el-table-column label='申请人'>
            <template #default="scope">{{ scope.row.UserName }}</template>
          </el-table-column>
          <el-table-column label='客户名称'>
            <template #default="scope">{{ scope.row.CustomerName }}</template>
          </el-table-column>
          <el-table-column label='招待人数' width="100">
            <template #default="scope">{{ scope.row.Visitor }}</template>
          </el-table-column>
          <el-table-column label='申请费用'>
            <template #default="scope">{{ scope.row.Amount }}</template>
          </el-table-column>
          <el-table-column label='申请理由'>
            <template #default="scope">{{ scope.row.Note }}</template>
          </el-table-column>
          <el-table-column label='状态'>
            <template #default="scope">
              <div class="text-red-600" v-if="scope.row.State<0">
                驳回
              </div>
              <div class="text-yellow-600" v-else-if="scope.row.State==0">
                待提交
              </div>
              <div class="text-blue-500" v-else-if="scope.row.State>=1&&scope.row.State<100">
                审核中
              </div>
              <div class="text-green-500" v-else-if="scope.row.State==100">
                已通过
              </div>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template #default="scope">
              <span class="cursor-pointer text-blue-500" @click="editWFManagementForm(scope.row)">详情</span>
            </template>
          </el-table-column>
        </template>

        <template v-else-if="page.tableTop == 1">
          <el-table-column label='事业部' width="100">
            <template #default="scope">{{ scope.row.CompName }}</template>
          </el-table-column>
          <el-table-column label='申请人'>
            <template #default="scope">{{ scope.row.UserName }}</template>
          </el-table-column>
          <el-table-column label='客户名称'>
            <template #default="scope">{{ scope.row.CustomerName }}</template>
          </el-table-column>
          <el-table-column label='礼品数量' width="100">
            <template #default="scope">{{ scope.row.GiftNum }}</template>
          </el-table-column>
          <el-table-column label='申请费用'>
            <template #default="scope">{{ scope.row.Amount }}</template>
          </el-table-column>
          <el-table-column label='申请理由' show-overflow-tooltip>
            <template #default="scope">{{ scope.row.Note }}</template>
          </el-table-column>
          <el-table-column label='状态'>
            <template #default="scope">
              <div class="text-red-600" v-if="scope.row.State<0">
                驳回
              </div>
              <div class="text-yellow-600" v-else-if="scope.row.State==0">
                待提交
              </div>
              <div class="text-blue-500" v-else-if="scope.row.State>=1&&scope.row.State<100">
                审核中
              </div>
              <div class="text-green-500" v-else-if="scope.row.State==100">
                已通过
              </div>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template #default="scope">
              <span class="cursor-pointer text-blue-500" @click="editPresent(scope.row)">详情</span>
            </template>
          </el-table-column>
        </template>

        <template v-else-if="page.tableTop == 2">
          <el-table-column label='事业部'>
            <template #default="scope">{{ scope.row.CompName }}</template>
          </el-table-column>
          <el-table-column label='部门'>
            <template #default="scope">{{ scope.row.DeptName }}</template>
          </el-table-column>
          <el-table-column label='申请人'>
            <template #default="scope">{{ scope.row.UserName }}</template>
          </el-table-column>

          <el-table-column label='申请费用'>
            <template #default="scope">{{ scope.row.Amount }}</template>
          </el-table-column>

          <el-table-column label='状态'>
            <template #default="scope">
              <div class="text-red-600" v-if="scope.row.State<0">
                驳回
              </div>
              <div class="text-yellow-600" v-else-if="scope.row.State==0">
                待提交
              </div>
              <div class="text-blue-500" v-else-if="scope.row.State>=1&&scope.row.State<100">
                审核中
              </div>
              <div class="text-green-500" v-else-if="scope.row.State==100">
                已通过
              </div>
            </template>
          </el-table-column>
          <el-table-column label='操作'>
            <template #default="scope">
              <span class="cursor-pointer text-blue-500" @click="editOther(scope.row)">详情</span>
            </template>
          </el-table-column>
        </template>

        <template v-else>
          <el-table-column label='事业部' width="100">
            <template #default="scope">{{ scope.row.CompName }}</template>
          </el-table-column>
          <el-table-column label='客户名称' width="300">
            <template #default="scope">{{ scope.row.CustomerName }}</template>
          </el-table-column>
          <el-table-column label='姓名' width="120">
            <template #default="scope">{{ scope.row.UserName }}</template>
          </el-table-column>
          <el-table-column label='合同金额'>
            <template #default="scope">{{ scope.row.ContractAmount }}</template>
          </el-table-column>
          <el-table-column label='回款金额'>
            <template #default="scope">{{ scope.row.Amount }}</template>
          </el-table-column>
          <el-table-column label='居间费'>
            <template #default="scope">{{ scope.row.IntermediatorAmount }}</template>
          </el-table-column>
          <el-table-column label='居间人' width="120">
            <template #default="scope">{{ scope.row.IntermediatorName }}</template>
          </el-table-column>
          <el-table-column label='举证' width="70">
            <template #default="scope">
              <a href="javascript:void(0);" class="text-blue-500" v-if="scope.row.ImgUrl" @click="$preview(0,retviewurl(scope.row.ImgUrl))">查看</a>
              <a href="javascript:void(0);" class="text-red-500" @click="ShowUpload" v-else>上传</a>
            </template>
          </el-table-column>
          <el-table-column label='申请状态' width="80">
            <template #default="scope">
              <div class="text-green-500" v-if="scope.row.State == 100">已通过</div>
              <div class="text-red-500" v-else-if="scope.row.State < 0">驳回</div>
              <div class="text-blue-500" v-else>审核中</div>
            </template>
          </el-table-column>
          <el-table-column label='操作' align="cente" width="70">
            <template #default="scope">
              <span class="cursor-pointer text-blue-500" @click="editIntermediator(scope.row, 3)">详情</span>
            </template>
          </el-table-column>
        </template>
        <el-table-column label='状态' width="170">
          <template #default="scope">
            <a href="javascript:;" @click="openHint(scope.row)">
              <span class="text-green-500" v-if="scope.row.IsSettle">款已结清</span>
              <span class="text-red-500" v-else>款未结清</span>
              <span>，</span>
              <span class="text-green-500" v-if="scope.row.IsBill">单据已收</span>
              <span class="text-red-500" v-else>单据未收</span>
            </a>
          </template>
        </el-table-column>
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <!-- 查看图片 -->
    <el-dialog v-model="imgInfo.uploadShow" v-if="imgInfo.uploadShow" width="600px" :append-to-body='true'>
      <uploadimg :uploadFileData='imgInfo.ImgUrl' @uploadFileDataEvent='uploadFileData' @closeWindow='closeData'></uploadimg>
    </el-dialog>
    <!-- 提示 -->
    <Hint v-if="HintInfo.HintShow" @setInfo="getlist" :HintInfo="HintInfo.HintInfo" :HintType="HintInfo.HintType" @closeWindow="closeHint"></Hint>
    <!-- 招待费\礼品费\其他费详情 -->
    <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
    <!-- 居间费详情 -->
    <AddIntermediator :title="IntermediatorLog.title" v-if="IntermediatorLog.show" :ViewType='IntermediatorLog.viewtype' :DataId='IntermediatorLog.dataId'
      @closeWindow="cancelIntermediator"></AddIntermediator>
    <!-- 添加招待费 -->
    <AddEntertainment :title="AddEntertainmentInfo.title" v-if="AddEntertainmentInfo.show" :ViewType='AddEntertainmentInfo.viewtype' :DataId='AddEntertainmentInfo.dataId'
      @closeWindow="cancelAddEntertainment"></AddEntertainment>
    <!-- 添加礼品费 -->
    <AddGift :title="AddGiftInfo.title" v-if="AddGiftInfo.show" :ViewType='AddGiftInfo.viewtype' :DataId='AddGiftInfo.dataId' @closeWindow="cancelAddGift"></AddGift>
    <!-- 添加其他费 -->
    <AddOther :title="AddOtherInfo.title" v-if="AddOtherInfo.show" :ViewType='AddOtherInfo.viewtype' :DataId='AddOtherInfo.dataId' @closeWindow="cancelAddOther"></AddOther>
  </div>
</template>
<script lang="ts" setup>
import { GetCostIntermediatorList, GetCostEntertainmentConfirmList, GetCostGiftConfirmList, GetCostOtherConfirmList, GetCostIntermediatorConfirmList, GetCostEntertainmentAnalysis, GetCostGiftAnalysis, GetCostOtherAnalysis, GetCostIntermediatorAnalysis } from '/@/api/Sale/Cost'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'
import { GetUserAllList } from '/@/api/layout/index'
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import AddIntermediator from '/@/views/Sale/Cost/Kublis/AddKublis.vue'
import AddEntertainment from '/@/views/Sale/Cost/Entertainment/AddEntertainment.vue'
import AddGift from '/@/views/Sale/Cost/Gift/AddGift.vue'
import AddOther from '/@/views/Sale/Cost/Other/AddOther.vue'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import uploadimg from '/@/components/Upload/uploadimg.vue'
import Hint from './Hint.vue'
import { remoteUrl } from '/@/utils/tools'

//#region 提示框
const HintInfo = reactive({
  HintInfo: false,
  HintShow: false,
  HintType: 0
})
const openHint = (val: any) => {
  HintInfo.HintInfo = val
  HintInfo.HintType = page.tableTop
  HintInfo.HintShow = true
}

const closeHint = () => {
  HintInfo.HintShow = false
}
//#endregion

//#region 招待费
// 新增招待费
const AddEntertainmentInfo = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '新增招待费'
})

const openAddEntertainment = () => {
  AddEntertainmentInfo.value.viewtype = 1
  AddEntertainmentInfo.value.show = true
}
const cancelAddEntertainment = () => {
  AddEntertainmentInfo.value.show = false
  getlist()
}
// 编辑招待费
const WFManagementFormWindow = ref({
  details: {
    viewType: 1
  },
  show: false,
  Id: 0
})
const wfcloseWindow = () => {
  WFManagementFormWindow.value.show = false
  getlist()
}
///打开招待费
const editWFManagementForm = (row: any) => {
  GetApplyFlowStepEvent({
    DataId: row.Id,
    Code: 'Basic_Cost_Entertainment'
  }).then((res: any) => {
    WFManagementFormWindow.value.details = res.data
    if (row.State == 0 || row.State == -1) {
      WFManagementFormWindow.value.details.viewType = 2
    } else {
      WFManagementFormWindow.value.details.viewType = 3
    }
    WFManagementFormWindow.value.show = true
  })
}

const getEntertainment = (findInfo: any) => {
  GetCostEntertainmentConfirmList(findInfo).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
    data.loading = false
  })
}
//#endregion

//#region 礼品费
// 新增礼品费
const AddGiftInfo = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '新增礼品费'
})

const openAddGift = () => {
  AddGiftInfo.value.viewtype = 1
  AddGiftInfo.value.show = true
}
const cancelAddGift = () => {
  AddGiftInfo.value.show = false
  getlist()
}

// 编辑查看礼品费
const editPresent = (row: any) => {
  GetApplyFlowStepEvent({
    DataId: row.Id,
    Code: 'Basic_Cost_Gift'
  }).then((res: any) => {
    WFManagementFormWindow.value.details = res.data
    if (row.State == 0 || row.State == -1) {
      WFManagementFormWindow.value.details.viewType = 2
    } else {
      WFManagementFormWindow.value.details.viewType = 3
    }
    WFManagementFormWindow.value.show = true
  })
}
// 列表
const getPresent = (findInfo: any) => {
  GetCostGiftConfirmList(findInfo).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
    data.loading = false
  })
}
//#endregion

//#region 其他费
// 新增
const AddOtherInfo = ref({
  show: false,
  viewtype: 1, //1是新增2是修改3是查看
  dataId: 0,
  title: '新增其他费'
})

const openAddOther = () => {
  AddOtherInfo.value.viewtype = 1
  AddOtherInfo.value.show = true
}
const cancelAddOther = () => {
  AddOtherInfo.value.show = false
  getlist()
}
///编辑、查看
const editOther = (row: any) => {
  GetApplyFlowStepEvent({
    DataId: row.Id,
    Code: 'Basic_Cost_Other'
  }).then((res: any) => {
    WFManagementFormWindow.value.details = res.data
    if (row.State == 0 || row.State == -1) {
      WFManagementFormWindow.value.details.viewType = 2
    } else {
      WFManagementFormWindow.value.details.viewType = 3
    }
    WFManagementFormWindow.value.show = true
  })
}
// 列表
const getOther = (findInfo: any) => {
  GetCostOtherConfirmList(findInfo).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
    data.loading = false
  })
}
//#endregion

//#region 居间费
const IntermediatorLog = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '居间费申请'
})

const openContract = () => {
  IntermediatorLog.value.viewtype = 1
  IntermediatorLog.value.show = true
}
const cancelIntermediator = () => {
  IntermediatorLog.value.show = false
  getlist()
}

// 编辑查看
const editIntermediator = (row: any, type: number) => {
  IntermediatorLog.value.dataId = row.Id
  IntermediatorLog.value.viewtype = type
  IntermediatorLog.value.show = true
}

// 列表
const getIntermediator = (findInfo: any) => {
  GetCostIntermediatorConfirmList(findInfo).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
    data.loading = false
  })
}
//#endregion

//#region 绘制单条柱状图
const { proxy } = getCurrentInstance() as any
const echarts = proxy.$echarts
const mychart: any = ref({})

const option: any = {
  title: {
    text: '费用分布统计',
    subtext: '金额（万）'
  },
  legend: {
    // data: ['居间费'],
    // right: '10%'
  },
  tooltip: {},
  dataset: {
    source: [
      // ['product', '居间费'],
      // ['1', 43.3],
      // ['2', 83.1],
      // ['3', 86.4],
      // ['4', 43.4],
      // ['5', 67.4],
      // ['6', 23.4],
      // ['7', 11.4],
      // ['8', 67.4],
      // ['9', 14.4],
      // ['10', 34.4],
      // ['11', 72.4],
      // ['12', 55]
    ]
  },
  xAxis: { type: 'category', name: '月份' },
  yAxis: {},
  grid: [{ bottom: '10%' }],
  series: [{ type: 'bar' }]
}

const setOption = () => {
  if (page.tableTop == 0) {
    GetCostEntertainmentAnalysis({ Type: 1 }).then((res) => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm: any) => {
          return [itm.Month, itm.Amount]
        })
        option.legend = { data: ['招待费'], right: '10%' }
        option.dataset = { source: [['product', '招待费'], ...dataset] }
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait
        }
      }
    })
  } else if (page.tableTop == 1) {
    GetCostGiftAnalysis({ Type: 1 }).then((res: any) => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm: any) => {
          return [itm.Month, itm.Amount]
        })
        option.legend = { data: ['礼品费'], right: '10%' }
        option.dataset = { source: [['product', '礼品费'], ...dataset] }
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait
        }
      }
    })
  } else if (page.tableTop == 2) {
    GetCostOtherAnalysis({ Type: 1 }).then((res) => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm: any) => {
          return [itm.Month, itm.Amount]
        })
        option.legend = { data: ['其他费'], right: '10%' }
        option.dataset = { source: [['product', '其他费'], ...dataset] }
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait
        }
      }
    })
  } else if (page.tableTop == 3) {
    GetCostIntermediatorAnalysis({ Type: 1 }).then((res) => {
      if (res.code == 1) {
        let dataset = res.data.monthCosts.map((itm: any) => {
          return [itm.Month, itm.Amount]
        })
        option.legend = { data: ['居间费'], right: '10%' }
        option.dataset = { source: [['product', '居间费'], ...dataset] }
        // 绘制柱状图
        let domMap = <any>document.getElementById('myecharts')
        domMap.removeAttribute('_echarts_instance_')
        mychart.value = echarts.init(domMap)
        mychart.value.setOption(option, true)
        headerInfo.value = {
          Agree: res.data.Agree,
          Amount: res.data.Amount,
          GrantAmount: res.data.GrantAmount,
          Refuse: res.data.Refuse,
          UnGrantAmount: res.data.UnGrantAmount,
          Wait: res.data.Wait
        }
      }
    })
  }
}
//#endregion
const props = defineProps({})

//#region 当前页数据
// 顶部数据
const headerInfo = ref({
  Agree: 0,
  Amount: 0,
  GrantAmount: 0,
  Refuse: 0,
  UnGrantAmount: 0,
  Wait: 0
})
// 列表
const data = reactive({
  loading: true,
  count: 0,
  tableData: [],
  // 申请人
  ProposerList: <any>[],
  // 离职人
  DimissionList: <any>[],
  // 状态
  SearchTypeList: [
    { label: '全部', value: 0 },
    { label: '款已结清，单据已收', value: 1 },
    { label: '款已结清，单据未收', value: 2 },
    { label: '款未结清，单据已收', value: 3 },
    { label: '款未结清，单据未收', value: 4 }
  ]
})
const page = reactive({
  page: 1,
  size: 10,
  count: 0,
  tableTop: 0,
  SearchType: undefined,
  Dimission: undefined,
  Proposer: undefined,
  time: []
})
// tab切换
const cliketop = (val: any) => {
  page.page = 1
  page.SearchType = undefined
  page.Dimission = undefined
  page.Proposer = undefined
  page.time = []
  getlist()
  setOption()
}

// 选择人员
const changeUser = (type: number) => {
  if (type) {
    page.Dimission = undefined
  } else {
    page.Proposer = undefined
  }
}

const getlist = () => {
  data.loading = true
  let findInfo = {
    page: page.page,
    size: page.size,
    SearchType: page.SearchType,
    UserId: page.Dimission ? page.Dimission : page.Proposer,
    StartTime: page.time && page.time.length > 0 ? page.time[0] : undefined,
    StopTime: page.time && page.time.length > 0 ? page.time[1] : undefined
  }
  if (page.tableTop == 0) {
    getEntertainment(findInfo)
  } else if (page.tableTop == 1) {
    getPresent(findInfo)
  } else if (page.tableTop == 2) {
    getOther(findInfo)
  } else {
    getIntermediator(findInfo)
  }
}

// 获取在职/离职人员列表
const getPeopleList = () => {
  GetUserAllList().then((res) => {
    if (res.code) {
      for (let i in res.data) {
        if (res.data[i].Resign == 2) {
          data.DimissionList.push(res.data[i])
        } else if (res.data[i].Resign == 1 || res.data[i].Resign == null) {
          data.ProposerList.push(res.data[i])
        }
      }
    }
  })
}

// 分页
const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}
const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}
//#endregion

//#region 上传查看
const imgInfo = reactive({
  uploadShow: false,
  ImgUrl: []
})
const retviewurl = (data: any) => {
  let list = JSON.parse(data)
  var retlist: any = []
  if (list.length > 0) {
    list.forEach((f: any) => {
      var item = remoteUrl(f.Path)
      retlist.push(item)
    })
  }
  console.log('retlist', retlist)
  return retlist
}
const ShowUpload = () => {
  imgInfo.uploadShow = true
}
const closeData = (val: any) => {
  imgInfo.uploadShow = false
}

const uploadFileData = (val: any) => {
  imgInfo.ImgUrl = val
  imgInfo.uploadShow = false
}

//#endregion

// 初始化
onMounted(() => {
  getPeopleList()
  getlist()
  setOption()
})
</script>


<style lang="postcss" scoped>
#myecharts {
  background: #ffffff;
  /* width: 63rem; */
  height: 14rem;
}
.giftlist {
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
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
:deep(.el-input.is-disabled .el-input__inner) {
  -webkit-text-fill-color: var(--el-input-text-color, var(--el-text-color-regular));
}
.hom_custab {
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
}
</style>
