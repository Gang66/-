<template>
  <OpenWindow :title="`${data.DataInfo?.SupplierName || ''} - 付款记录`" :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="edit-sales-contract-open-window">
    <div class="p-4">
      <div>
        <el-input class="w-full" placeholder="请选择采购合同">
          <template #prepend>
            <span style="width: 68px;text-align: center;">采购合同</span>
          </template>
        </el-input>

        <div class="mt-3 mb-3">
          <img class="h-4 inline-block mr-4" src="../../../../assets/img/tech/ProcessingDetails/left.png" alt="" />
          <span>采购列表</span>
        </div>
        <el-table :data="data.tableData" show-summary border :summary-method="getSummaries">
          <el-table-column type="index" label="序号" width="70" align="center" />
          <el-table-column prop="AfterSaleAmount" label="签约时间" width="250" align="center">
            <template #default="scope">
              111
            </template>
          </el-table-column>
          <el-table-column prop="AfterSaleAmount" label="合同金额" width="180" align="center">
            <template #default="scope">
              111
            </template>
          </el-table-column>
          <el-table-column prop="AfterSaleAmount" label="到期应付" width="180" align="center">
            <template #default="scope">
              111
            </template>
          </el-table-column>
          <el-table-column prop="AfterSaleAmount" label="已付金额" width="180" align="center">
            <template #default="scope">
              111
            </template>
          </el-table-column>
          <el-table-column prop="AfterSaleAmount" label="付款金额" width="180" align="center">
            <template #default="scope">
              111
            </template>
          </el-table-column>
          <el-table-column prop="RecruitChannel" label="操作" align="center">
            <template #default="scope">
              <div>
                <i class="iconfont icon-zitiyulan inline-block mr-1 text-blue-600"></i>
                <div class="text-blue-600 inline-block cursor-pointer">查看</div>
              </div>
            </template>
          </el-table-column>
        </el-table>

        <h1 class="text-2xl text-center underline pb-4">付 款 申 请 单</h1>
        <div class="table">
          <div class="table-tr">
            <div class="table-td table-title">日期</div>
            <div class="table-td table-body">
              <span>2021 年 09 月 07 日</span>
            </div>
            <div class="table-td table-title">编号</div>
            <div class="table-td table-body">
              <span>CGP2109070005</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">申请部门</div>
            <div class="table-td table-body">
              <span>采购部</span>
            </div>
            <div class="table-td table-title">用途</div>
            <div class="table-td table-body">
              <span>原料款</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">发票种类</div>
            <div class="table-td table-body">
              <span>个人卡</span>
            </div>
            <div class="table-td table-title">付款类别</div>
            <div class="table-td table-body">
              <span>财务</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">物品名称</div>
            <div class="table-td" style="width: 86%">
              <span v-for="itm in 10" class="mr-2 text-blue-400	">【CH210908002】</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">收款人</div>
            <div class="table-td table-body">
              <span>向家林</span>
            </div>
            <div class="table-td table-title">收款单位</div>
            <div class="table-td table-body">
              <span>浙江凯宏阀门有限公司</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">开户银行</div>
            <div class="table-td table-body">
              <span>农行卡号(沙城支行)</span>
            </div>
            <div class="table-td table-title">银行账号</div>
            <div class="table-td table-body">
              <span>6228480338297305678</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">金额</div>
            <div class="table-td text-center" style="width: 10%">
              <span>(大写)</span>
            </div>
            <div class="table-td" style="width: 26%">
              <span>壹仟零肆拾元整c</span>
            </div>
            <div class="table-td table-title">(小写)</div>
            <div class="table-td table-body">
              <span>1040</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">申请人</div>
            <div class="table-td table-body">
              <span>于安娜 2021 年 09 月 15 日 13:41c</span>
            </div>
            <div class="table-td table-title">运营经理</div>
            <div class="table-td table-body">
              <span>徐玉智 2021 年 09 月 15 日 13:46</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="table-td table-title">总经理</div>
            <div class="table-td table-body">
              <span>洪树心 2021 年 09 月 15 日 13:47</span>
            </div>
            <div class="table-td table-title">财务</div>
            <div class="table-td table-body">
              <span>桂秀珍 2022 年 01 月 08 日 11:12</span>
            </div>
          </div>
          <div class="table-tr">
            <div class="w-full table-td">
              <div class="flex py-1">
                <div class="flex-1">用途说明:</div>
                <div class="flex-1">费用阶段: 发货款</div>
              </div>
              <div class=" py-1">潍坊裕凯化工有限公司 ￥108530元 潍坊华电阀门制造有限公司;阜南齐耀新能源有限公司 ￥2986元 坊电门制造有限公司;内蒙古易高煤化科技有限公司 ￥98500元 潍坊华电阀门制造有限公司</div>
            </div>
          </div>
        </div>

        <div class="flex w-full justify-between pb-6 pt-12">
          <div class="flex w-1/5 items-end">
            <div>运营经理：</div>
            <div class=" border-b border-solid border-current flex-1"></div>
          </div>
          <div class="flex w-1/5 items-end justify-center">
            <div>总经理：</div>
            <div class=" border-b border-solid border-current flex-1"></div>
          </div>
          <div class="flex w-1/5 items-end justify-right">
            <div>财务经理：</div>
            <div class=" border-b border-solid border-current flex-1"></div>
          </div>
        </div>
      </div>
      
      <!-- <div>
        <template v-if="data.ViewType != 1">
          审批记录
          <slot name="ApprovalProcess"></slot>
          审批
          <template v-if="data.ViewType==4">
            <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
            <div class="bf-search-formItem ">
              <div class="text-center w-full mt-4">
                <el-button type="danger" @click="ApprovalForm(0)">驳 回</el-button>
                <el-button type="primary" @click="ApprovalForm(1)">审 批</el-button>
              </div>
            </div>
          </template>
        </template>
      </div> -->

      <div v-if="data.ViewType!=4" class="text-center pt-6">
        <el-button class="cancelbut" @click="closeWindow">
          取消
        </el-button>
        <el-button type="primary" @click="submitForm()" v-if="!data.disabled">
          提交
        </el-button>
      </div>
      
      <!-- 签订合同 -->
      <!-- 签订合同 -->
      <WFManagementForm v-if="WFManagementFormWindow.show" @closeWindow="wfcloseWindow" :details="WFManagementFormWindow.details"> </WFManagementForm>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted, computed } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { GetSupplierContractPaymentPage } from '/@/api/tech/Material'
import WFManagementForm from '/@/views/WF/WFManagement/_Components/WFManagementForm.vue'
import { GenerationContractExamineOpen } from '/@/assets/ts/techOpenWindow'


const renderTableList = async (data: any) => {
  await GetSupplierContractPaymentPage({supplierId: data.SupplierId}).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
      data.DataInfo = res.data
    }
  })
}


export default defineComponent({
  emits: ['closeWindow'],
  components: {
    OpenWindow,
    WFManagementForm
  },
  props: {
    info: {
      type: Object,
      default: {
        checkId: null,
        Id: null,
        // 显示类型 1 添加 2修改 3查看 4审批
        viewType: 1
      }
    },
    ViewType: {
      type: Number,
      default: 1 //1是添加  2是修改 3是查看
    },
    DataId: {
      type: Number,
      default: 0
    },
    dialogVisible: {
      type: Boolean,
      default: false
    },
    FormData: {
      type: Object,
      default: {
        SupplierId: ''
      }
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      SupplierId: 0,
      DataInfo: {},
      disabled: false,
      ViewType: 1,
      tableData: []
    })
    
    
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })

    ///计算合计
    const getSummaries = (param: any) => {
      const { columns, data } = param
      const sums: string[] = []
      columns.forEach((column: any, index: any) => {
        if (index === 0) {
          sums[index] = ' 合计'
          return
        }
        if (column.property == 'Amount') {
          const values = data.map((item: any) => Number(item[column.property]))

          if (!values.every((value: any) => Number.isNaN(value))) {
            sums[index] = `${values.reduce((prev: any, curr: any) => {
              const value = Number(curr)
              if (!Number.isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)}`
          } else {
            sums[index] = ''
          }
        } else {
          sums[index] = ''
        }
      })
      sums[7] = Number(sums[7]).toFixed(2)
      // if (!Number.isNaN(sums[7])) {
      //   formdata.form.Amount = Number(sums[7])
      // }

      console.log('sums[index]', sums)
      return sums
    }

    const submitForm = () => {

    }

    onMounted(() => {
      // data.SupplierId = props.FormData.SupplierId
      if (props.info.viewType != 1) {
        data.ViewType = props.info.viewType
      } else {
        data.ViewType = props.ViewType
      }

      if (data.ViewType > 1) {
        if (data.ViewType == 2) {
          data.disabled = false
        } else if (data.ViewType == 3 || data.ViewType == 4) {
          data.disabled = true
        }
        // GetContractInfoEvent()
      } else {
        // getuserinfo()
      }

      // renderTableList(data)
    })

    return {
      boxStyle,
      data,
      closeWindow,
      submitForm,
      getSummaries,
      ...GenerationContractExamineOpen()
    }
  }
})
</script>

<style scoped>
.sum1{
  width: 120px;
}
::-webkit-scrollbar {
  /*隐藏滚轮*/
  display: none;
}
.table{
  border-top: 1px solid #6B7280;
  border-left: 1px solid #6B7280;
  width: 100%;
}
.table-tr{
  border-bottom: 1px solid #6B7280;
  display: flex;
  justify-content: center;
}
.table-td{
  border-right: 1px solid #6B7280;
  padding: 0.25rem .75rem;
}
.table-title{
  text-align: center;
  width: 14%;
}
.table-body{
  width: 36%;
}
</style>