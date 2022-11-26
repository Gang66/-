
<template>
  <!-- 请假表单  code==RecordsVacation  请假审批 -->
  <LeaveForm v-if="data.info.Code=='RecordsVacation'" title="请假审批" @closeWindow="closeWindow" :Id="Number(data.info.DataId)" :checkId="data.info.CheckId" :time="data.info.CreateOn" :viewType="data.info.viewType">
    <template #ApprovalProcess>
      <ApprovalProcess :checkId="data.info.CheckId">
      </ApprovalProcess>
    </template>
  </LeaveForm>
  <!--   <Customer v-if="data.info.Code=='Customer_BaseInfo'" title="审批客户" @closeWindow="closeWindow" :customerId="Number(data.info.DataId)" :checkId="data.info.CheckId"
    :time="data.info.CreateOn" :ViewType="data.info.viewType">
    <template #ApprovalProcess>
      <ApprovalProcess :checkId="data.info.CheckId">
      </ApprovalProcess>
    </template>
  </Customer> -->
  <component :is="data.tabComp" @closeWindow="closeWindow" :info="data">
    <template #ApprovalProcess>
      <ApprovalProcess :checkId="data.info.CheckId">
      </ApprovalProcess>
    </template>
  </component>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, markRaw, onBeforeMount } from 'vue'
import MaterialForm from '/@/views/HR/View/CourseDevelop/_Components/MaterialForm.vue'
import TravelForm from '/@/views/HR/View/MyWhereabouts/_Components/TravelForm.vue'
import EndProductForm from '/@/views/HR/View/CourseDevelop/_Components/EndProductForm.vue'
import QuestionBankForm from '/@/views/HR/View/CourseDevelop/_Components/QuestionBankForm.vue'
import RegularFormView from '/@/views/HR/View/HrTrend/_Components/RegularFormView.vue'
import quitFormView from '/@/views/HR/View/HrTrend/_Components/quitFormView.vue'
import TransferPostView from '/@/views/HR/View/HrTrend/_Components/TransferPostView.vue'
import ChangeSalaryFormView from '/@/views/HR/View/HrTrend/_Components/ChangeSalaryFormView.vue'
import LeaveForm from '/@/views/HR/View/MyWhereabouts/_Components/LeaveForm.vue'
import Customer from '/@/views/Sale/Customer/AddCustomer.vue'
import ApprovalProcess from '/@/components/ApprovalProcess/Index.vue'
import transfer from '/@/views/Sale/Customer/Component/transfer.vue'

import CostEntertainment from '/@/views/Sale/Cost/Entertainment/AddEntertainment.vue'
import CostGift from '/@/views/Sale/Cost/Gift/AddGift.vue'
import CostOther from '/@/views/Sale/Cost/Other/AddOther.vue'
import CostSample from '/@/views/Sale/Cost/Sample/AddSample.vue'

import Region from '/@/views/Sale/Customer/Component/Region.vue'
import AddIntermediator from '/@/views/Sale/Intermediator/AddIntermediator.vue'
import AddKublis from '/@/views/Sale/Cost/Kublis/AddKublis.vue'
import AddApprove from '/@/views/Sale/Platform/AddApprove.vue'

import Contract from '/@/views/Sale/Contract/AddContract.vue'

import SchoolCustomer from '/@/views/HR/View/PracticalBase/_Components/AddCustomer.vue'

import BillMaterials from '/@/views/Tech/ContractManagement/_Components/BillMaterials.vue'
import GenerationContract from '/@/views/Tech/PurchasingManagement/_Components/GenerationContract.vue'
type tabType = {
  name: string
  Code: string
  tabComp: any
}
export default defineComponent({
  components: {
    transfer,
    Customer,
    LeaveForm,
    ApprovalProcess
  },
  emits: ['closeWindow'],
  props: {
    viewType: {
      type: Number,
      default: 4
    },
    // 审批列表详情
    details: {
      type: Object,
      default: {
        CheckId: null,
        DataId: null,
        viewType: 4,
        info: {}
      }
    }
  },
  setup(props, context: SetupContext) {
    const componentsData = reactive<tabType[]>([
      // 素材审批表单
      {
        name: 'MaterialForm',
        Code: 'TrainCourseWare',
        tabComp: markRaw(MaterialForm)
      }, // 成品审批表单
      {
        name: 'EndProductForm',
        Code: 'WorkCourseFinished',
        tabComp: markRaw(EndProductForm)
      },
      // 新人训课程
      {
        name: 'QuestionBankForm',
        Code: 'TrainTestImportFile',
        tabComp: markRaw(QuestionBankForm)
      },
      // 人事去向 调薪审批表单
      {
        name: 'ChangeSalaryFormView',
        Code: 'AdjustSalary',
        tabComp: markRaw(ChangeSalaryFormView)
      },
      // 人事去向 调岗审批表单
      {
        name: 'TransferPostView',
        Code: 'PostTransfer',
        tabComp: markRaw(TransferPostView)
      },
      // 人事去向 离职审批表单
      {
        name: 'quitFormView',
        Code: 'StaffQuit',
        tabComp: markRaw(quitFormView)
      },
      // 人事去向 转正审批表单
      {
        name: 'RegularFormView',
        Code: 'HR_Trend_positive',
        tabComp: markRaw(RegularFormView)
      },
      // 出差审批表单
      {
        name: 'TravelForm',
        Code: 'RecordsEvection',
        tabComp: markRaw(TravelForm)
      },
      // 公差审批表单
      {
        name: 'TravelForm',
        Code: 'RecordsBusinessTrip',
        tabComp: markRaw(TravelForm)
      },
      // 客户审批
      {
        name: 'Customer',
        Code: 'Customer_BaseInfo',
        tabComp: markRaw(Customer)
      },
      // 客户划拨审批
      {
        name: 'transfer',
        Code: 'Customer_ChangeRecord',
        tabComp: markRaw(transfer)
      },
      // 招待费审批
      {
        name: 'CostEntertainment',
        Code: 'Basic_Cost_Entertainment',
        tabComp: markRaw(CostEntertainment)
      },
      // 礼品费审批
      {
        name: 'CostGift',
        Code: 'Basic_Cost_Gift',
        tabComp: markRaw(CostGift)
      },
      // 其它费审批
      {
        name: 'CostOther',
        Code: 'Basic_Cost_Other',
        tabComp: markRaw(CostOther)
      },
      // 样品费审批
      {
        name: 'CostSample',
        Code: 'Basic_Cost_Sample',
        tabComp: markRaw(CostSample)
      },
      // 区域申请
      {
        name: 'Region',
        Code: 'Customer_Regional',
        tabComp: markRaw(Region)
      },
      // 居间人申请
      {
        name: 'AddIntermediator',
        Code: 'Basic_Intermediator_Bill',
        tabComp: markRaw(AddIntermediator)
      },
      // 居间费申请
      {
        name: 'AddKublis',
        Code: 'Basic_Cost_Intermediator',
        tabComp: markRaw(AddKublis)
      },
      // 平台审批
      {
        name: 'AddApprove',
        Code: 'Basic_Platform_Approve',
        tabComp: markRaw(AddApprove)
      },
      // 合同审批
      {
        name: 'Contract',
        Code: 'Contract_BaseInfo',
        tabComp: markRaw(Contract)
      },
      // 技术物料审批
      {
        name: 'BillMaterials',
        Code: 'Tech_MaterialBill',
        tabComp: markRaw(BillMaterials)
      },
      // 备货申请
      {
        name: 'Contract',
        Code: 'Contract_StockUp',
        tabComp: markRaw(Contract)
      },
      // 采购合同审批
      {
        name: 'GenerationContract',
        Code: 'Tech_PurchaseContractBase',
        tabComp: markRaw(GenerationContract)
      },
      // 实操客户审批
      {
        name: 'SchoolCustomer',
        Code: 'School_Customer_BaseInfo',
        tabComp: markRaw(SchoolCustomer)
      }
    ])
    const data = reactive({
      info: props.details,
      Id: Number(props.details.DataId),
      viewType: props.details.viewType,
      CheckId: props.details.CheckId,
      FlowId: props.details.FlowId,
      Step: props.details.Step,
      checkId: props.details.CheckId,
      tabComp: ''
    })
    console.log(data)
    // 判断展示页面
    const currentData = () => {
      console.log('details', props.details)
      componentsData.forEach((element: any) => {
        if (props.details.Code == element.Code) {
          data.tabComp = element.tabComp
        }
      })
      console.log('data.tabComp', data.tabComp)
    }
    // 关闭弹窗
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    onBeforeMount(() => {
      currentData()
    })
    return { data, closeWindow, componentsData }
  }
})
</script>

<style lang="scss" scoped>
</style>
