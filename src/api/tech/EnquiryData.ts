//技术处理接口
import request from '/@/utils/request'
const api = {
  //#region 订单管理
  GetEnquiryOrderPage: '/tech/api/EnquiryData/GetEnquiryOrderPage',
  GetEnquiryIdToSaleCustomerOrderInfo: '/tech/api/EnquiryData/GetEnquiryIdToSaleCustomerOrderInfo',
  GetSaleCustomerOrderInfo: '/tech/api/EnquiryData/GetSaleCustomerOrderInfo',
  PostEditCustomerOrderGradeSave: '/tech/api/EnquiryData/PostEditCustomerOrderGradeSave',
  GetSetEnquiryOrderRecoverySave: '/tech/api/EnquiryData/GetSetEnquiryOrderRecoverySave',

  //#endregion

  //#region 技术处理
  GetTechnicistUserList: '/tech/api/EnquiryData/GetTechnicistUserList',
  GetEnquiryOrderTechnicistTreatmPage: '/tech/api/EnquiryData/GetEnquiryOrderTechnicistTreatmPage',
  GetMyOrderTechnicistWarningData: '/tech/api/EnquiryData/GetMyOrderTechnicistWarningData',
  GetOrderTechnicistTreatmStatistics: '/tech/api/EnquiryData/GetOrderTechnicistTreatmStatistics',
  GetOrderTechnicistEntryList: '/tech/api/EnquiryData/GetOrderTechnicistEntryList',
  GetOrderTechnicistTreatmList: '/tech/api/EnquiryData/GetOrderTechnicistTreatmList',
  GetSetEnquiryOrderTreatmSave: '/tech/api/EnquiryData/GetSetEnquiryOrderTreatmSave',
  GetSetEnquiryOrderEntrySave: '/tech/api/EnquiryData/GetSetEnquiryOrderEntrySave',
  PostInsertEditProductPriceSave: '/tech/api/EnquiryData/PostInsertEditProductPriceSave',

  //#endregion

  //#region 核算处理
  GetAccounterUserList: '/tech/api/EnquiryData/GetAccounterUserList',
  GetEnquiryOrderAccounterTreatmPage: '/tech/api/EnquiryData/GetEnquiryOrderAccounterTreatmPage',
  GetMyOrderAccounterWarningData: '/tech/api/EnquiryData/GetMyOrderAccounterWarningData',
  GetOrderAccounterTreatmStatistics: '/tech/api/EnquiryData/GetOrderAccounterTreatmStatistics',
  GetOrderAccounterTreatmList: '/tech/api/EnquiryData/GetOrderAccounterTreatmList',
  GetAccounterToTechnicist: '/tech/api/EnquiryData/GetAccounterToTechnicist',
  PostProductBusinessList: '/tech/api/EnquiryData/PostProductBusinessList',
  PostNewProductBusinessList: '/tech/api/EnquiryData/PostNewProductBusinessList',
  PostAccounterBatchComparePricesListPage: '/tech/api/EnquiryData/PostAccounterBatchComparePricesListPage',
  GetProductBusinessFilter: '/tech/api/EnquiryData/GetProductBusinessFilter',
  //#endregion

  //#region 报价订单
  GetEnquiryDataTrackPage: '/tech/api/EnquiryData/GetEnquiryDataTrackPage', //订单跟踪列表
  GetEditEnquiryOrderTrackStatusSave: '/tech/api/EnquiryData/GetEditEnquiryOrderTrackStatusSave', // 修改跟进状态
  // #endregion

  GetEnquiryPageList: '/tech/api/EnquiryData/GetEnquiryPageList',
  GetEntityById: '/tech/api/EnquiryData/GetEnquiryEntityById',
  GetForProvisional: '/tech/api/EnquiryData/GetEnquiryForProvisional',
  GetApplyForPostpone: '/tech/api/EnquiryData/GetApplyEnquiryForPostpone',
  GetOverTimeList: '/tech/api/EnquiryData/GetEnquiryOverTimeList',
  GetBeOverTimeList: '/tech/api/EnquiryData/GetEnquiryBeOverTimeList',
  GetSetEnquiryOrderAccounterAuditSave: '/tech/api/EnquiryData/GetSetEnquiryOrderAccounterAuditSave',

  //#region 成本管理
  PostOrderConfirmProductList: '/tech/api/EnquiryData/PostOrderConfirmProductList',
  GetEnquiryOrderCostPage: '/tech/api/EnquiryData/GetEnquiryOrderCostPage',
  GetProductBasicsSearchfInfo: '/tech/api/EnquiryData/GetProductBasicsSearchfInfo',
  PostEditProductAdvancePriceSave: '/tech/api/EnquiryData/PostEditProductAdvancePriceSave',
  PostEditConfirmSupplierPriceSave: '/tech/api/EnquiryData/PostEditConfirmSupplierPriceSave',
  PostSetEnquiryOrderAccountTreatmSave: '/tech/api/EnquiryData/PostSetEnquiryOrderAccountTreatmSave',
  GetTechAdvancePriceLogPage: '/tech/api/EnquiryData/GetTechAdvancePriceLogPage',
  GetSetEntityCodeRejectTechDealSave: '/tech/api/EnquiryData/GetSetEntityCodeRejectTechDealSave',
  //#endregion
}

//#region 订单管理
//获取订单管理报价单列表
export function GetEnquiryOrderPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetEnquiryOrderPage,
    method: 'get',
    params: param
  })
}

//根据询价单Id获取销售报价单信息
export function GetEnquiryIdToSaleCustomerOrderInfo(id: number): Promise<IResponse> {
  return request({
    url: api.GetEnquiryIdToSaleCustomerOrderInfo,
    method: 'get',
    params: { id }
  })
}

//获取销售报价单信息
export function GetSaleCustomerOrderInfo(id: number): Promise<IResponse> {
  return request({
    url: api.GetSaleCustomerOrderInfo,
    method: 'get',
    params: { id }
  })
}

// 修改报价单等级
export function PostEditCustomerOrderGradeSave(data: any): Promise<IResponse> {
  return request({
    url: api.PostEditCustomerOrderGradeSave,
    method: 'post',
    data
  })
}

// 恢复作废后的询价单
export function GetSetEnquiryOrderRecoverySave(id: number): Promise<IResponse> {
  return request({
    url: api.GetSetEnquiryOrderRecoverySave,
    method: 'get',
    params: { id }
  })
}

// 订单跟踪管理

export function GetEnquiryDataTrackPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetEnquiryDataTrackPage,
    method: 'get',
    params: param
  })
}
// 修改跟进状态
export function GetEditEnquiryOrderTrackStatusSave(param: any): Promise<IResponse> {
  return request({
    url: api.GetEditEnquiryOrderTrackStatusSave,
    method: 'get',
    params: param
  })
}

//#endregion

//#region 技术处理
// 获取技术专员列表
export function GetTechnicistUserList(id: number): Promise<IResponse> {
  return request({
    url: api.GetTechnicistUserList,
    method: 'get',
    params: { id }
  })
}

//获取询价单技术处理列表
export function GetEnquiryOrderTechnicistTreatmPage(params: any): Promise<IResponse> {
  return request({
    url: api.GetEnquiryOrderTechnicistTreatmPage,
    method: 'get',
    params: params
  })
}

// 获取技术专员自己预警的询价单信息
export function GetMyOrderTechnicistWarningData(userid: number): Promise<IResponse> {
  return request({
    url: api.GetMyOrderTechnicistWarningData,
    method: 'get',
    params: { userid }
  })
}

// 获取技术指定时间内处理订单的统计
export function GetOrderTechnicistTreatmStatistics(params: any): Promise<IResponse> {
  return request({
    url: api.GetOrderTechnicistTreatmStatistics,
    method: 'get',
    params: params
  })
}

// 获取技术订单录入列表
export function GetOrderTechnicistEntryList(params: any): Promise<IResponse> {
  return request({
    url: api.GetOrderTechnicistEntryList,
    method: 'get',
    params: params
  })
}

// 获取技术订单处理列表
export function GetOrderTechnicistTreatmList(params: any): Promise<IResponse> {
  return request({
    url: api.GetOrderTechnicistTreatmList,
    method: 'get',
    params: params
  })
}

// 订单转入技术处理
export function GetSetEnquiryOrderTreatmSave(id: number): Promise<IResponse> {
  return request({
    url: api.GetSetEnquiryOrderTreatmSave,
    method: 'get',
    params: { id }
  })
}

// 订单返回订单录入
export function GetSetEnquiryOrderEntrySave(id: number): Promise<IResponse> {
  return request({
    url: api.GetSetEnquiryOrderEntrySave,
    method: 'get',
    params: { id }
  })
}

// 保存批量价格
export function PostInsertEditProductPriceSave(params: any): Promise<IResponse> {
  return request({
    url: api.PostInsertEditProductPriceSave,
    method: 'post',
    data: params
  })
}

//#endregion

//#region 核算处理
// 获取核算专员列表
export function GetAccounterUserList(id: number): Promise<IResponse> {
  return request({
    url: api.GetAccounterUserList,
    method: 'get',
    params: { id }
  })
}

//获取询价单核算处理列表
export function GetEnquiryOrderAccounterTreatmPage(params: any): Promise<IResponse> {
  return request({
    url: api.GetEnquiryOrderAccounterTreatmPage,
    method: 'get',
    params: params
  })
}
// 获取核算专员自己预警的询价单信息
export function GetMyOrderAccounterWarningData(userid: number): Promise<IResponse> {
  return request({
    url: api.GetMyOrderAccounterWarningData,
    method: 'get',
    params: { userid }
  })
}
// 获取核算指定时间内处理订单的统计
export function GetOrderAccounterTreatmStatistics(params: any): Promise<IResponse> {
  return request({
    url: api.GetOrderAccounterTreatmStatistics,
    method: 'get',
    params: params
  })
}
// 获取核算订单处理列表
export function GetOrderAccounterTreatmList(params: any): Promise<IResponse> {
  return request({
    url: api.GetOrderAccounterTreatmList,
    method: 'get',
    params: params
  })
}
export function PostProductBusinessList(params: any): Promise<IResponse> {
  return request({
    url: api.PostProductBusinessList,
    method: 'post',
    data: params
  })
}
export function PostNewProductBusinessList(params: any): Promise<IResponse> {
  return request({
    url: api.PostNewProductBusinessList,
    method: 'post',
    data: params
  })
}
//#endregion

// 获取即将超时

export function GetBeOverTimeList() {
  return request({
    url: api.GetBeOverTimeList,
    method: 'get',
    params: ''
  })
}
// 获取超时

export function GetOverTimeList() {
  return request({
    url: api.GetOverTimeList,
    method: 'get',
    params: ''
  })
}

// 延期
export function GetApplyForPostpone(id: string) {
  return request({
    url: api.GetApplyForPostpone,
    method: 'get',
    params: { id }
  })
}
// 申请暂停
export function GetApplyForProvisional(id: number) {
  return request({
    url: api.GetForProvisional,
    method: 'get',
    params: { id }
  })
}
// 询价列表数据
export function GetPageList(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetEnquiryPageList,
    method: 'get',
    params: param
  })
}
// 获取单个实体预览
export function GetEntityById(id: string) {
  return request({
    url: api.GetEntityById,
    method: 'get',
    params: { id }
  })
}
// 转入核算
export function GetAccounterToTechnicist(id: number) {
  return request({
    url: api.GetAccounterToTechnicist,
    method: 'get',
    params: { id }
  })
}
//核算处理批量比价
export function PostAccounterBatchComparePricesListPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.PostAccounterBatchComparePricesListPage,
    method: 'post',
    data: param
  })
}

// 核算筛选数据
export function GetProductBusinessFilter(id: number): Promise<IResponse> {
  return request({
    url: api.GetProductBusinessFilter,
    method: 'get',
    params: { id }
  })
}

// 核算筛选数据
export function GetSetEnquiryOrderAccounterAuditSave(id: number): Promise<IResponse> {
  return request({
    url: api.GetSetEnquiryOrderAccounterAuditSave,
    method: 'get',
    params: { id }
  })
}

// 核算筛选数据
export function PostOrderConfirmProductList(param: any): Promise<IResponse> {
  return request({
    url: api.PostOrderConfirmProductList,
    method: 'post',
    data: param
  })
}

// 订单成本列表接口
export function GetEnquiryOrderCostPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetEnquiryOrderCostPage,
    method: 'get',
    params: param
  })
}
// 订单成本列表接口
export function GetProductBasicsSearchfInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetProductBasicsSearchfInfo,
    method: 'get',
    params: param
  })
}
// 订单成本列表接口
export function PostEditProductAdvancePriceSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditProductAdvancePriceSave,
    method: 'post',
    data: param
  })
}
// 产品中确定的供应商价格保存
export function PostEditConfirmSupplierPriceSave(id: any,param: any): Promise<IResponse> {
  return request({
    url: api.PostEditConfirmSupplierPriceSave + '/' + id,
    method: 'post',
    data: param
  })
}
// 驳回核算处理状态
export function PostSetEnquiryOrderAccountTreatmSave(id: any): Promise<IResponse> {
  return request({
    url: api.PostSetEnquiryOrderAccountTreatmSave + '/' + id,
    method: 'post',
    params: ''
  })
}
// 驳回核算处理状态
export function GetTechAdvancePriceLogPage(data: any): Promise<IResponse> {
  return request({
    url: api.GetTechAdvancePriceLogPage,
    method: 'get',
    params: data
  })
}

// 驳回订单，转入技术处理
export function GetSetEntityCodeRejectTechDealSave(data: any): Promise<IResponse> {
  return request({
    url: api.GetSetEntityCodeRejectTechDealSave,
    method: 'get',
    params: data
  })
}
