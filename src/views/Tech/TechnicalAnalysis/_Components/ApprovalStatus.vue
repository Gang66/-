<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="m-5">
      <div class="h-24 bg-pink-50 rounded-t-xl tech_AccountingProcessing_ApprovalStatus">
        <div class="float-left text-white w-72 relative ml-8">
          <span class="absolute right-0 top-14">山东长林新材料有限公司</span>
          <i class="iconfont icon-up absolute -right-5 top-14 arrow" :class="{ open: data.showDetail === 0 }" @click="clickMouseenter"></i>
        </div>
        <div class="float-right h-24 p-3 pt-4">
          <!-- <div class=""> -->
          <div class="w-20 h-16 bg-white rounded-md inline-block mr-3 float-left text-center">
            <p class="text-xs text-red-500 pt-3">优先订单</p>
            <p class="text-xs pt-1">加价处理</p>
          </div>
          <div class="w-80 h-16 bg-yellow-50 rounded-md inline-block mr-3 float-left">
            <div class="flex">
              <div class="w-1/2 h-16 mr-2 pl-3 pt-2">
                <i class="iconfont icon-shijian text-gray-400 mr-1"></i>
                <span class="text-sm font-semibold">2021-09-13</span>
                <p class="text-xs text-gray-400 mt-2">业务时间</p>
              </div>
              <div class="w-1/3 h-16 mr-2 pt-2">
                <div class="text-center">
                  <i class="iconfont icon-fenxi text-blue-300 mr-2"></i>
                  <span class="text-blue-400 cursor-pointer" @click="openWindowHistoricalContract()">10</span><span class="text-gray-400 ml-1 mr-1">/</span><span class="text-blue-400 cursor-pointer" @click="openWindowHistoricalQuotation()">9</span>
                  <p class="text-xs text-gray-400 mt-2">成交量/报价数</p>
                </div>
              </div>
              <div class="w-1/3 h-16 mr-2 pt-2 pl-2">
                <div class="text-center">
                  <i class="iconfont icon-dunpai text-red-300 mr-2"></i>
                  <span class="text-red-500 cursor-pointer">好</span>
                  <p class="text-xs text-gray-400 mt-2">信用等级</p>
                </div>
              </div>
            </div>
          </div>
          <div class="w-16 h-16 bg-green-100 rounded-md inline-block mr-4">
            <div class="text-center text-blue-500 cursor-pointer">
              <i class="iconfont icon-xiaoxi" style="font-size: 30px"></i>
              <p class="text-xs">沟通记录</p>
            </div>
          </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- #region  上半部分 -->
      <div class="bg-yellow-50 pb-4 rounded-b-xl border-dashed border border-yellow-300 border-t-0 relative">
        <div class="w-24 h-24 bg-blue-50 rounded-lg inline-block absolute -top-10 left-4 z-50">
          <img class="rounded-lg" src="../../../../assets/img/tech/header.jpg" alt="" />
        </div>
        <div class="inline-block ml-36 mt-2">
          <div class="inline-block text-sm mr-4">
            <p>黄金涛</p>
            <p class="text-gray-400">联系人</p>
          </div>
          <div class="inline-block text-sm mr-4">
            <p>18653533626</p>
            <p class="text-gray-400">手机</p>
          </div>
          <div class="inline-block text-sm mt-2">
            <p>0531-8688528</p>
            <p class="text-gray-400">电话</p>
          </div>
        </div>
        <div class="float-right text-sm mt-3 mr-2">
          <span class="">产品成本：</span>
          <span class="text-orange-400 mr-4">￥550580</span>
          <span>核算成本：</span>
          <span class="text-orange-400 mr-4">￥812146.50</span>
          <span>技术成本：</span>
          <span class="text-orange-400 mr-4">￥812146.50</span>
        </div>
        <div :class="data.isfo ? '' : 'yinc'">
          <div class="w-2/3 mt-2 inline-block">
            <p class="text-sm ml-4"><i class="iconfont icon-lianxiren mr-1"></i>业务信息</p>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">报价单位：</span><span>北京高中压</span></p>
              <p class="mt-1"><span class="text-gray-400">询价阶段：</span><span>采购阶段</span></p>
              <p class="mt-1"><span class="text-gray-400">业务员：</span><span>张苹</span></p>
              <p class="mt-1"><span class="text-gray-400">事业部：</span><span>集团总部</span></p>
            </div>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">报价等级：</span><span>A</span></p>
              <p class="mt-1"><span class="text-gray-400">询价性质：</span><span>选择比价</span></p>
              <p class="mt-1"><span class="text-gray-400">运费：</span><span>含运费（到厂）</span></p>
              <p class="mt-1"><span class="text-gray-400">电话：</span><span>13306446073</span></p>
            </div>
            <div class="inline-block text-sm ml-4">
              <p class="mt-1"><span class="text-gray-400">税收情况：</span><span>含增值税</span></p>
              <p class="mt-1"><span class="text-gray-400">询价数量：</span><span>新项目</span></p>
              <p class="mt-1"><span class="text-gray-400">手机：</span><span>13306446073</span></p>
              <p class="mt-1"><span class="text-gray-400">信用分数：</span><span>90</span></p>
            </div>
          </div>
          <div class="w-1/3 float-right mt-2">
            <div class="text-sm">
              <div class="inline-block">
                <i class="iconfont icon-shujuku"></i>
                <span>附件预览</span>
              </div>
              <div class="inline-block float-right mr-6"><span class="text-orange-400">2</span>个</div>
            </div>
            <div>
              <div v-for="item in 2" :key="item" class="text-sm">
                <span>长林造纸自控阀明细</span>
                <span>（终）</span>
                <span>09.09.xlsx</span>
                <span class="text-blue-500 ml-2">预览</span>
                <span class="text-blue-500 ml-2">下载</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->
      <!-- #region 下半部分 -->
      <div>
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData1" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="DepartName" min-width="500">
                <template #header>
                  <span>产品参数</span>
                  <el-tooltip class="box-item" effect="light" placement="top">
                    <template #content>
                      <el-checkbox-group v-model="data.QuantityState" placeholder="请选择" @change="handleRadioChange">
                        <el-checkbox v-for="item in data.quantityOptions" :key="item.value" :label="item.label">{{ item.label }} </el-checkbox>
                      </el-checkbox-group>
                    </template>
                    <span class="text-orange-500 ml-2 cursor-pointer">扩展字段</span>
                  </el-tooltip>
                </template>
                <template #default="scope">
                  <p class="text-sm">先导活塞式减压阀 Y43H-16C DN80 非常规常用</p>
                  <p class="text-xs text-blue-500">【标注重量,双作用,304内件,输入信号,喷涂NI60,高平台,型式】【一级】【可替代性：无】【技术难度：一般】 【123】【123】【123】【水平方式】【123】【12】【不锈钢】</p>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="数量">
                <template #default="scope">
                  <span>20组</span>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="附件">
                <template #default="scope">
                  <span class="text-blue-500">3个配件</span>
                </template>
              </el-table-column>
              <el-table-column type="expand">
                <template #default="props">
                  <div m="4" class="neizhi_table bg-blue-100">
                    <!-- <div class="w-full">
                      <span>【配件1】</span>
                    </div>
                    <div class="w-full">
                      <p class="text-sm">测试产品一阀体，SOSS-1000，ab，常规常用</p>
                      <p class="text-xs text-blue-500">【标注重量,双作用,304内件,输入信号,喷涂NI60,高平台,型式】【一级】【可替代性：无】【技术难度：一般】</p>
                    </div>
                    <div class="w-full">
                      <span>20组</span>
                    </div> -->
                    <el-table :data="props.row.children" :show-header="false" :highlight-current-row="false">
                      <el-table-column label="Name" prop="name">
                        <template #default="scope">
                          <div class="w-full">
                            <span>【配件1】</span>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="Name" prop="name" min-width="440">
                        <template #default="scope">
                          <div class="w-full">
                            <p class="text-sm">测试产品一阀体，SOSS-1000，ab，常规常用</p>
                            <p class="text-xs text-blue-500">【标注重量,双作用,304内件,输入信号,喷涂NI60,高平台,型式】【一级】【可替代性：无】【技术难度：一般】</p>
                          </div>
                        </template>
                      </el-table-column>
                      <el-table-column label="Name" prop="name">
                        <template #default="scope">
                          <div class="w-full">
                            <span>20组</span>
                          </div>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
      <!-- #endregion -->
      <!-- 历史合同 -->
      <HistoricalContract title="历史合同" v-if="historicalContractOpenData.visible" :FormData="historicalContractOpenData.formData" @closeWindow="closeWindowHistoricalContract($event)" />
      <!-- 历史合同 -->
      <HistoricalQuotation title="历史报价单" v-if="historicalQuotationOpenData.visible" :FormData="historicalQuotationOpenData.formData" @closeWindow="closeWindowHistoricalQuotation($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
import TableSearch from '/@/components/TableSearch/index.vue'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import { parseTime } from '/@/utils/tools'
import HistoricalContract from './HistoricalContract.vue'
import HistoricalQuotation from './HistoricalQuotation.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  if (form.date && form.date.length > 1) {
    form.StartDate = form.date[0]
    form.EndDate = form.date[1]
  } else {
    form.StartDate = ''
    form.EndDate = ''
  }
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}

// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.Suggestion.length > 0) {
      data.Suggestion.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue
        }
      })
    }
    return title
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails)
    console.log(data.selectDetails[0].Id)
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    parseTimeEvent
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    TableSearch,
    HistoricalContract,
    HistoricalQuotation
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      QuantityState: [],
      // 扩展字段
      quantityOptions: [
        { value: 'A', label: '特殊属性' },
        { value: 'B', label: '质量等级' },
        { value: 'C', label: '动态属性' },
        { value: 'D', label: '备注' }
      ],
      isfo: false,
      showDetail: -1,
      // 左侧表格数据
      tableData: [],
      tableData1: [
        {
          id: 1,
          date: '2016-05-02',
          name: 'wangxiaohu'
        },
        {
          id: 2,
          date: '2016-05-04',
          name: 'wangxiaohu'
        },
        {
          id: 3,
          date: '2016-05-01',
          name: 'wangxiaohu',
          children: [
            {
              id: 31,
              date: '2016-05-01',
              name: 'wangxiaohu'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: 'wangxiaohu'
            }
          ]
        },
        {
          id: 4,
          date: '2016-05-03',
          name: 'wangxiaohu'
        }
      ]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })
    const clickMouseenter = () => {
      data.isfo = !data.isfo

      console.log(data.isfo)
      if (!data.isfo) {
        data.showDetail = -1
      } else {
        data.showDetail = 0
      }
    }
    //  关闭抽屉 对比
    // 历史合同
    const historicalContractOpen = (data: any) => {
      let historicalContractOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHistoricalContract = (val: any) => {
        historicalContractOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        historicalContractOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHistoricalContract = (type: string) => {
        historicalContractOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        historicalContractOpenData,
        openWindowHistoricalContract,
        closeWindowHistoricalContract
      }
    }
    // 历史报价单
    const historicalQuotationOpen = (data: any) => {
      let historicalQuotationOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHistoricalQuotation = (val: any) => {
        historicalQuotationOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        historicalQuotationOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHistoricalQuotation = (type: string) => {
        historicalQuotationOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }
      const handleRadioChange = (val: any) => {
        console.log(val)
      }

      return {
        historicalQuotationOpenData,
        openWindowHistoricalQuotation,
        closeWindowHistoricalQuotation,
        handleRadioChange
      }
    }

    onMounted(() => {})

    return {
      closeWindow,
      data,
      boxStyle,
      clickMouseenter,
      ...historicalContractOpen({ data }),
      ...historicalQuotationOpen({ data }),
      form,
      ...tableRender(form, data)
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_AccountingProcessing_ApprovalStatus {
  background-image: url('/@/assets/img/tech/hesuan.png');
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
.arrow {
  width: 18px;
  height: 18px;
  display: inline-block;
  transition: transform 0.3s;
  -webkit-transition: transform 0.3s;
  &.open {
    transform: rotate(180deg);
  }
}
.yinc {
  height: 0;
  overflow: hidden;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
/* :deep(.el-checkbox__label) {
  padding-left: 0;
  color: #ffffff;
}
::v-depp(.el-checkbox__input.is-checked + .el-checkbox__label) {
  color: #ffffff;
} */
.neizhi_table {
  :deep(.el-table__row) {
    --tw-bg-opacity: 1;
    background-color: rgba(239, 246, 255, var(--tw-bg-opacity));
  }
  :deep(.el-table .el-table__cell) {
    /* padding: 0 0; */
  }
}
</style>
