import { reactive, ref } from 'vue'
import { GetApplyFlowStepEvent } from '/@/assets/ts/WFBusinessInfo'

// 订单分析 弹框
export function orderAnalysisOpen(data: any) {
  let orderAnalysisOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowOrderAnalysis = (val: any) => {
    orderAnalysisOpenData.formData = {
      Id: val.Id,
      BomId: val.BomId,
      ClientName: val.ClientName
    }
    orderAnalysisOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowOrderAnalysis = (type: string) => {
    orderAnalysisOpenData.visible = false
    if (type == 'close') data.getData(data.data)
  }

  return {
    orderAnalysisOpenData,
    openWindowOrderAnalysis,
    closeWindowOrderAnalysis
  }
}

// 沟通记录 弹框
export function rejectOrderOpen(data: any) {
  let rejectOrderOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowRejectOrder = (val: any) => {
    rejectOrderOpenData.formData = {
      Id: val.Id,
      BomId: val.BomId,
      ClientName: val.ClientName
    }
    rejectOrderOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowRejectOrder = (type: string) => {
    rejectOrderOpenData.visible = false
    if (type == 'close') data.getData(data.data)
  }

  return {
    rejectOrderOpenData,
    openWindowRejectOrder,
    closeWindowRejectOrder
  }
}

// 审批状态 弹框
// 技术记录
export function approvalStatusOpen(data: any) {
  let approvalStatusOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowApprovalStatus = (val: any) => {
    approvalStatusOpenData.formData = {
      EnquiryDataId: val.EnquiryDataId,
      IsConfirmSupplier: val.IsConfirmSupplier
    }
    approvalStatusOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowApprovalStatus = (type: string) => {
    approvalStatusOpenData.visible = false
    data.getData(data.data)
  }

  return {
    approvalStatusOpenData,
    openWindowApprovalStatus,
    closeWindowApprovalStatus
  }
}

//核算记录

export function accountingRecordsOpen(data: any) {
  let accountingRecordsOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowAccountingRecords = (val: any) => {
    accountingRecordsOpenData.formData = {}
    accountingRecordsOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowAccountingRecords = (type: string) => {
    accountingRecordsOpenData.visible = false
    // if(type=='close')
    // data.getData(data.data)
  }

  return {
    accountingRecordsOpenData,
    openWindowAccountingRecords,
    closeWindowAccountingRecords
  }
}

// 重新检测  弹框

export function createSupplierRetestOpen(data: any) {
  let createSupplierRetestOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowCreateSupplierRetest = (val: any) => {
    createSupplierRetestOpenData.formData = {
      ClientName: val.Name
    }
    createSupplierRetestOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowCreateSupplierRetest = (type: string) => {
    createSupplierRetestOpenData.visible = false
    // if(type=='close')
    // data.getData(data.data)
  }

  return {
    createSupplierRetestOpenData,
    openWindowCreateSupplierRetest,
    closeWindowCreateSupplierRetest
  }
}

// 新增供应商

export function createSupplierOpen(form: any, data: any, renderTableList: any) {
  let createSupplierOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowCreateSupplier = (val: any) => {
    createSupplierOpenData.formData = {
      //   Id:val.Id,
      //   ClientName:val.ClientName
    }
    createSupplierOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowCreateSupplier = (type: string) => {
    createSupplierOpenData.visible = false
    if (type == 'submit') renderTableList(form, data)
  }

  return {
    createSupplierOpenData,
    openWindowCreateSupplier,
    closeWindowCreateSupplier
  }
}

// 订单比价  批量比价
export function orderPriceComparisonOpen(data: any) {
  let orderPriceComparisonOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowOrderPriceComparison = (val: any, id: any) => {
    orderPriceComparisonOpenData.formData = {
      GroupId: val,
      Ids: id
    }
    orderPriceComparisonOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowOrderPriceComparison = (type: string) => {
    orderPriceComparisonOpenData.visible = false
    orderPriceComparisonOpenData.formData = {}
    if (type == 'submit') data.getData(data.data)
  }

  return {
    orderPriceComparisonOpenData,
    openWindowOrderPriceComparison,
    closeWindowOrderPriceComparison
  }
}
// 供应商库
export function supplierLibraryOpen(form: any, data: any, getData: any) {
  let supplierLibraryOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  // type0分配厂商1 选择供应商
  const openWindowSupplierLibrary = (val: any, delIds: any, type: number) => {
    supplierLibraryOpenData.formData = {
      Id: val,
      delIds: delIds,
      type: type,     
    }
    supplierLibraryOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowSupplierLibrary = (type: string) => {
    supplierLibraryOpenData.visible = false
    if (type == 'submit') {
      getData(form, data)
    }
  }

  return {
    supplierLibraryOpenData,
    openWindowSupplierLibrary,
    closeWindowSupplierLibrary
  }
}

// 订单跟踪
export function orderTrackingOpen(data: any) {
  let orderTrackingOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowOrderTracking = (val: any) => {
    orderTrackingOpenData.formData = {
      Id: val
      //   ClientName:val.ClientName
    }
    orderTrackingOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowOrderTracking = (type: string) => {
    orderTrackingOpenData.visible = false
  }

  return {
    orderTrackingOpenData,
    openWindowOrderTracking,
    closeWindowOrderTracking
  }
}

// 新增阶段
export function newPhaseOpen(data: any) {
  let newPhaseOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowNewPhase = (val: any) => {
    newPhaseOpenData.formData = {
      //   Id:val.Id,
      //   ClientName:val.ClientName
    }
    newPhaseOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowNewPhase = (type: string) => {
    newPhaseOpenData.visible = false
  }

  return {
    newPhaseOpenData,
    openWindowNewPhase,
    closeWindowNewPhase
  }
}

// 技术加价管理
export function hechnicalMarkupOpen (data: any) {
  let hechnicalMarkupOpenData: any = reactive({
    visible: false,
    formData: {}
  })

  //打开弹窗
  const openWindowHechnicalMarkup = (val: any) => {
    console.log(val, 888)
    hechnicalMarkupOpenData.formData = {
      EnquiryDataId:val.EnquiryDataId,
      ProductList:val.ProductList,
      AllAccountAdvancePrice: data.data.AllAccountAdvancePrice,
      AllTechAdvancePrice: data.data.AllTechAdvancePrice,
      AllProductPrice: data.data.AllProductPrice,
    }
    hechnicalMarkupOpenData.visible = true
  }

  //关闭弹窗
  const closeWindowHechnicalMarkup = (type: string) => {
    hechnicalMarkupOpenData.visible = false
    if(type=='submit')
    data.getData(data.data)
  }

  return {
    hechnicalMarkupOpenData,
    openWindowHechnicalMarkup,
    closeWindowHechnicalMarkup
  }
}

// 预览文件
export function FileOpen (data: any) {
  let FileOpenData: any = reactive({
    visible: false,
    formData: {
      file_url: ''
    }
  })

  //打开弹窗
  const openFileOpen = (val: any) => {
    FileOpenData.formData = {
      file_url: val.url
    }
    FileOpenData.visible = true
  }

  //关闭弹窗
  const closeFileOpen = (type: string) => {
    FileOpenData.visible = false
  }

  return {
    FileOpenData,
    openFileOpen,
    closeFileOpen
  }
}

// 预览文件
export function ReconcileOpen (data: any) {
  let ReconcileData: any = reactive({
    visible: false,
    formData: {
      SupplierId: 0
    }
  })

  //打开弹窗
  const openReconcile = (val: any) => {
    ReconcileData.formData = {
      SupplierId: val.SupplierId
    }
    ReconcileData.visible = true
  }

  //关闭弹窗
  const closeReconcile = (type: string) => {
    ReconcileData.visible = false
  }

  return {
    ReconcileData,
    openReconcile,
    closeReconcile
  }
}
// 付款申请
export function PaymentRequestOpen (data: any) {
  let PaymentRequestData: any = reactive({
    visible: false,
    ViewType: 1,
    formData: {
    }
  })

  //打开弹窗
  const openWindowPaymentRequest = () => {
    PaymentRequestData.formData = {
      // SupplierId: data.data.selectDetails[0].SupplierId,
      SupplierId: 49,
    }
    PaymentRequestData.visible = true
    console.log(11)
  }

  //关闭弹窗
  const closeWindowPaymentRequest = (type: string) => {
    PaymentRequestData.visible = false
    if (type == 'submit') data.getData()
  }

  return {
    PaymentRequestData,
    openWindowPaymentRequest,
    closeWindowPaymentRequest
  }
}

//  采购合同
export function GenerationContractExamineOpen () {
  //#region WFManagementForm
  const WFManagementFormWindow = ref({
    details: {
      viewType: 1
    },
    show: false,
    Id: 0
  })
  const wfcloseWindow = () => {
    WFManagementFormWindow.value.show = false
  }
  ///打开
  const editcost = (row: any, type: any) => {
    GetApplyFlowStepEvent({
      DataId: row.ContractId,
      Code: 'Tech_PurchaseContractBase'
    }).then((res: any) => {
      WFManagementFormWindow.value.details = res.data
      WFManagementFormWindow.value.details.viewType = type
      WFManagementFormWindow.value.show = true
    })
  }
  return{
    WFManagementFormWindow,
    wfcloseWindow,
    editcost,
  }
  //#endregion
}
