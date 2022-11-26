//技术处理接口
import request from '/@/utils/request'
const api = {
  //#region 物料管理
  GetMaterialBillListPage: '/tech/api/Material/GetMaterialBillListPage',
  PostSetMaterialBillPurchStatusSave: '/tech/api/Material/PostSetMaterialBillPurchStatusSave',
  PostMaterialList: '/tech/api/Material/PostMaterialList',
  GetMaterialSearchInfo: '/tech/api/Material/GetMaterialSearchInfo',
  PostSetSplitMaterialNumSave: '/tech/api/Material/PostSetSplitMaterialNumSave',
  GetMaterialStatistics: '/tech/api/Material/GetMaterialStatistics',
  PostSetMaterialGroupSave: '/tech/api/Material/PostSetMaterialGroupSave',
  GetAllSuccessContractListPage: '/tech/api/Material/GetAllSuccessContractListPage',
  PostInsertEditMaterialSave: '/tech/api/Material/PostInsertEditMaterialSave',
  GetMaterialBillContractInfo: '/tech/api/Material/GetMaterialBillContractInfo',
  PostDeleteAllGroup: '/tech/api/Material/PostDeleteAllGroup',
  PostDeleteGroup: '/tech/api/Material/PostDeleteGroup',
  //采购比价
  GetGroupMaterialBillPage: '/tech/api/Material/GetGroupMaterialBillPage',
  PostGroupMaterialList: '/tech/api/Material/PostGroupMaterialList',
  GetGroupMaterialSearchInfo: '/tech/api/Material/GetGroupMaterialSearchInfo',
  GetMaterialComparePricesListPage: '/tech/api/Material/GetMaterialComparePricesListPage',
  PostInsertEditMaterialSupplierPriceSave: '/tech/api/Material/PostInsertEditMaterialSupplierPriceSave',

  PostMaterialConfirmPricesListPage: '/tech/api/Material/PostMaterialConfirmPricesListPage',
  PostConfirmMaterialSupplierSave: '/tech/api/Material/PostConfirmMaterialSupplierSave',
  PostSetRejectMaterialSupplierSave: '/tech/api/Material/PostSetRejectMaterialSupplierSave',
  GetMaterialBillVerifyPage: '/tech/api/Material/GetMaterialBillVerifyPage',
  GetUserRoleName: '/tech/api/Material/GetUserRoleName',
  
  GetPurchaseDemandCompanyPage: '/tech/api/Material/GetPurchaseDemandCompanyPage',
  GetPurchaseDemandCompanyInfo: '/tech/api/Material/GetPurchaseDemandCompanyInfo',
  PostInsertEditPurchaseDemandCompanySave: '/tech/api/Material/PostInsertEditPurchaseDemandCompanySave',
  PostDeletePurchaseDemandCompanySave: '/tech/api/Material/PostDeletePurchaseDemandCompanySave',
  GetMaterialBillConfirmMainPage: '/tech/api/Material/GetMaterialBillConfirmMainPage',

  // 合同
  PostMatirialContractMainList: '/tech/api/Material/PostMatirialContractMainList',
  PostMaterialBillAllInfo: '/tech/api/Material/PostMaterialBillAllInfo',
  GetBillSupplierSearchList: '/tech/api/Material/GetBillSupplierSearchList',
  PostInsertEditContractSave: '/tech/api/Material/PostInsertEditContractSave',
  GetContractMainList: '/tech/api/Material/GetContractMainList',
  GetContractInfo: '/tech/api/Material/GetContractInfo',
  PostSubmitContractApprovalSave: '/tech/api/Material/PostSubmitContractApprovalSave',
  PostApprovalContractSave: '/tech/api/Material/PostApprovalContractSave',
  PostCancelContractSave: '/tech/api/Material/PostCancelContractSave',
  PostRecoveryContractSave: '/tech/api/Material/PostRecoveryContractSave',
  GetMaterialBillSupplierList: '/tech/api/Material/GetMaterialBillSupplierList',
  GetSupplierMaterialList: '/tech/api/Material/GetSupplierMaterialList',
  PostApprovalMaterialBillSave: '/tech/api/Material/PostApprovalMaterialBillSave',
  PostGetAllMaterialList: '/tech/api/Material/PostGetAllMaterialList',

  // 资金管理
  GetPurchaseSupplierPaymentPage: '/tech/api/Material/GetPurchaseSupplierPaymentPage',
  GetPurchasePaymentTotalInfo: '/tech/api/Material/GetPurchasePaymentTotalInfo',
  GetNeedPayContractList: '/tech/api/Material/GetNeedPayContractList',
  GetSupplierContractPaymentPage: '/tech/api/Material/GetSupplierContractPaymentPage',
  GetPurchasePaymentRecordPage: '/tech/api/Material/GetPurchasePaymentRecordPage',
}

//#region 物料管理
//获取物料清单主表列表界面（物料采购管理界面）
export function GetMaterialBillListPage(data: any) {
  return request({
    url: api.GetMaterialBillListPage,
    method: 'get',
    params: data
  })
}
//修改物料管理中的采购状态
export function PostSetMaterialBillPurchStatusSave(id: number, status: number) {
  return request({
    url: api.PostSetMaterialBillPurchStatusSave + '/' + id + '/' + status,
    method: 'post'
  })
}
// 获取合同的物料采购单
export function PostMaterialList(data: any) {
  return request({
    url: api.PostMaterialList,
    method: 'post',
    data: data
  })
}
// 获取物料清单查询条件
export function GetMaterialSearchInfo(params: any) {
  return request({
    url: api.GetMaterialSearchInfo,
    method: 'get',
    params: params
  })
}
// 拆分物料清单
export function PostSetSplitMaterialNumSave(id: any, numA: number, numB: number) {
  return request({
    url: `${api.PostSetSplitMaterialNumSave}/${id}/${numA}/${numB}`,
    method: 'post'
  })
}
// 获取物料清单统计数据
export function GetMaterialStatistics(params: any) {
  return request({
    url: api.GetMaterialStatistics,
    method: 'get',
    params: params
  })
}
// 物料分组
export function PostSetMaterialGroupSave(group: number, billId: number, params: any) {
  return request({
    url: `${api.PostSetMaterialGroupSave}/${group}/${billId}`,
    method: 'post',
    data: params
  })
}
// 物料管理列表
export function GetAllSuccessContractListPage(params: any) {
  return request({
    url: api.GetAllSuccessContractListPage,
    method: 'get',
    params: params
  })
}
// 物料管理列表
export function PostInsertEditMaterialSave(params: any) {
  return request({
    url: api.PostInsertEditMaterialSave,
    method: 'post',
    data: params
  })
}
// 获取物料清单对应的合同信息
export function GetMaterialBillContractInfo(params: any) {
  return request({
    url: api.GetMaterialBillContractInfo,
    method: 'get',
    params: params
  })
}
// 删除全部分组接口
export function PostDeleteAllGroup(id: any) {
  return request({
    url: `${api.PostDeleteAllGroup}/${id}`,
    method: 'post',
  })
}
// 删除分组接口
export function PostDeleteGroup(id: any, val: any) {
  return request({
    url: `${api.PostDeleteGroup}/${id}`,
    method: 'post',
    data: val
  })
}
// 采购比价管理列表
export function GetGroupMaterialBillPage(params: any) {
  return request({
    url: api.GetGroupMaterialBillPage,
    method: 'get',
    params: params
  })
}
// 获取采购单分项清单明细列表
export function PostGroupMaterialList(params: any) {
  return request({
    url: api.PostGroupMaterialList,
    method: 'post',
    data: params
  })
}
// 获取采购单分项清单搜索条件
export function GetGroupMaterialSearchInfo(params: any) {
  return request({
    url: api.GetGroupMaterialSearchInfo,
    method: 'get',
    params: params
  })
}
// 物料比价列表
export function GetMaterialComparePricesListPage(params: any) {
  return request({
    url: api.GetMaterialComparePricesListPage,
    method: 'get',
    params: params
  })
}
// 提交比价信息
export function PostInsertEditMaterialSupplierPriceSave(params: any) {
  return request({
    url: api.PostInsertEditMaterialSupplierPriceSave,
    method: 'post',
    data: params
  })
}

// 采购进行确认供应商列表
export function PostMaterialConfirmPricesListPage(params: any) {
  return request({
    url: api.PostMaterialConfirmPricesListPage,
    method: 'post',
    data: params
  })
}

// 采购确认供应商操作
export function PostConfirmMaterialSupplierSave(billId: any,groupIndex: any,params: any) {
  return request({
    url: `${api.PostConfirmMaterialSupplierSave}/${billId}/${groupIndex}`,
    method: 'post',
    data: params
  })
}

// 采购经理驳回比价信息
export function PostSetRejectMaterialSupplierSave(billId: any,groupIndex: any) {
  return request({
    url: `${api.PostSetRejectMaterialSupplierSave}/${billId}/${groupIndex}`,
    method: 'post'
  })
}

// 采购核准审批列表
export function GetMaterialBillVerifyPage(params: any) {
  return request({
    url: api.GetMaterialBillVerifyPage,
    method: 'get',
    params: params
  })
}
// 获取用户角色
export function GetUserRoleName() {
  return request({
    url: api.GetUserRoleName,
    method: 'get'
  })
}

// 获取采购需求方列表
export function GetPurchaseDemandCompanyPage(params: any) {
  return request({
    url: api.GetPurchaseDemandCompanyPage,
    method: 'get',
    params: params
  })
}

// 获取需求方详细信息
export function GetPurchaseDemandCompanyInfo(id: any) {
  return request({
    url: `${api.GetPurchaseDemandCompanyInfo}/${id}`,
    method: 'get',
  })
}

// 新增或编辑采购需求方
export function PostInsertEditPurchaseDemandCompanySave(params: any) {
  return request({
    url: api.PostInsertEditPurchaseDemandCompanySave,
    method: 'post',
    data: params
  })
}

// 删除采购需求方
export function PostDeletePurchaseDemandCompanySave(id: any) {
  return request({
    url: `${api.PostDeletePurchaseDemandCompanySave}/${id}`,
    method: 'post'
  })
}
// 采购汇总列表
export function GetMaterialBillConfirmMainPage(params: any) {
  return request({
    url: api.GetMaterialBillConfirmMainPage,
    method: 'get',
    params: params
  })
}

// 获取采购汇总物料明细列表
export function PostMatirialContractMainList(params: any) {
  return request({
    url: api.PostMatirialContractMainList,
    method: 'post',
    data: params
  })
}

// 获取物料单中的供应商
export function GetBillSupplierSearchList(billId: any) {
  return request({
    url: api.GetBillSupplierSearchList,
    method: 'get',
    params: {billId:billId }
  })
}

// 获取要保存的合同信息
export function PostMaterialBillAllInfo(params: any) {
  return request({
    url: api.PostMaterialBillAllInfo,
    method: 'post',
    data: params
  })
}

// 保存合同信息
export function PostInsertEditContractSave(params: any) {
  return request({
    url: api.PostInsertEditContractSave,
    method: 'post',
    data: params
  })
}

// 获取采购单的合同列表
export function GetContractMainList(params: any) {
  return request({
    url: api.GetContractMainList,
    method: 'get',
    params:params
  })
}

// 获取合同详情信息
export function GetContractInfo(params: any) {
  return request({
    url: api.GetContractInfo,
    method: 'get',
    params:params
  })
}

// 提交合同审批
export function PostSubmitContractApprovalSave(id: any) {
  return request({
    url: `${api.PostSubmitContractApprovalSave}/${id}`,
    method: 'post'
  })
}

// 审批合同
export function PostApprovalContractSave(params: any) {
  return request({
    url: api.PostApprovalContractSave,
    method: 'post',
    data: params
  })
}

// 合同作废
export function PostCancelContractSave(id: any) {
  return request({
    url: `${api.PostCancelContractSave}/${id}`,
    method: 'post'
  })
}

// 恢复作废合同
export function PostRecoveryContractSave(id: any) {
  return request({
    url: `${api.PostRecoveryContractSave}/${id}`,
    method: 'post'
  })
}

// 获取采购单中的供应商列表信息
export function GetMaterialBillSupplierList(billId: any) {
  return request({
    url: api.GetMaterialBillSupplierList,
    method: 'get',
    params: {billId: billId}
  })
}

// 获取采购单中的供应商的物料信息
export function GetSupplierMaterialList(params: any) {
  return request({
    url: api.GetSupplierMaterialList,
    method: 'get',
    params: params
  })
}

// 获取采购单中的供应商的物料信息
export function PostApprovalMaterialBillSave(params: any) {
  return request({
    url: api.PostApprovalMaterialBillSave,
    method: 'post',
    data: params
  })
}

// 展示有父级子集的物料明细列表
export function PostGetAllMaterialList(params: any) {
  return request({
    url: api.PostGetAllMaterialList,
    method: 'post',
    data: params
  })
}
//#endregion

//#region 资金管理
// 应付账款列表
export function GetPurchaseSupplierPaymentPage(params: any) {
  return request({
    url: api.GetPurchaseSupplierPaymentPage,
    method: 'get',
    params: params
  })
}

// 款项管理列表中全页统计数据
export function GetPurchasePaymentTotalInfo(params: any) {
  return request({
    url: api.GetPurchasePaymentTotalInfo,
    method: 'get',
    params: params
  })
}

// 获取需要付款的合同列表
export function GetNeedPayContractList(params: any) {
  return request({
    url: api.GetNeedPayContractList,
    method: 'get',
    params: params
  })
}

// 获取供应商的对账管理信息
export function GetSupplierContractPaymentPage(params: any) {
  return request({
    url: api.GetSupplierContractPaymentPage,
    method: 'get',
    params: params
  })
}

// 付款记录
export function GetPurchasePaymentRecordPage(params: any) {
  return request({
    url: api.GetPurchasePaymentRecordPage,
    method: 'get',
    params: params
  })
}
//#endregion