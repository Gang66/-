import request from '/@/utils/request'
const api = {
  GetOrderCompany: '/sale/api/CustomerOrder/GetOrderCompany',
  GetCompanyByCustomer: '/sale/api/CustomerOrder/GetCompanyByCustomer',
  PostAddCustomerOrder: '/sale/api/CustomerOrder/PostAddCustomerOrder',
  GetCustomerOrderList: '/sale/api/CustomerOrder/GetCustomerOrderList',
  GetCustomerOrderInfo: '/sale/api/CustomerOrder/GetCustomerOrderInfo',
  PostAddOrderTrack: '/sale/api/CustomerOrder/PostAddOrderTrack',
  GetTrackList: '/sale/api/CustomerOrder/GetTrackList',
  GetUpdateLostOrder: '/sale/api/CustomerOrder/GetUpdateLostOrder',
  ShiftToTechApi: '/tech/api/EnquiryData/GetShiftToTech',
  GetSaleCustomerOrderToEnquirySave: '/tech/api/EnquiryData/GetSaleCustomerOrderToEnquirySave',
  PostOrderEntityList: '/sale/api/CustomerOrder/PostOrderEntityList',
  GetMergeOrderList: '/sale/api/CustomerOrder/GetMergeOrderList',
  GetCustomerOrderRankByUserId: '/sale/api/CustomerOrder/GetCustomerOrderRankByUserId',
  GetCompanyList: '/sale/api/CustomerOrder/GetCompanyList',
  GetUpdateCompanyState: '/sale/api/CustomerOrder/GetUpdateCompanyState',
  PostAddCompany: '/sale/api/CustomerOrder/PostAddCompany',
  GetCompanyInfo: '/sale/api/CustomerOrder/GetCompanyInfo',
  GetOrderRaisePriceList: '/sale/api/CustomerOrder/GetOrderRaisePriceList',

  //分析
  GetOrderIndexInfo: '/sale/api/CustomerOrder/GetOrderIndexInfo',
  GetOrderAnalysisByTrade: '/sale/api/CustomerOrder/GetOrderAnalysisByTrade',
  GetFormalUserRankOrder: '/sale/api/CustomerOrder/GetFormalUserRankOrder'
}

//获取加价列表
export function GetOrderRaisePriceList(param: any): Promise<IResponse> {
  return request({
    url: api.GetOrderRaisePriceList,
    method: 'get',
    params: param
  })
}
//返回报价库主页分析数据
export function GetOrderIndexInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetOrderIndexInfo,
    method: 'get',
    params: param
  })
}

//获取报价库按照行业分布的看板数据
export function GetOrderAnalysisByTrade(param: any): Promise<IResponse> {
  return request({
    url: api.GetOrderAnalysisByTrade,
    method: 'get',
    params: param
  })
}

//获取正式员工排行榜
export function GetFormalUserRankOrder(param: any): Promise<IResponse> {
  return request({
    url: api.GetFormalUserRankOrder,
    method: 'get',
    params: param
  })
}

//销售转入技术
export function GetSaleCustomerOrderToEnquirySave(id: number): Promise<IResponse> {
  return request({
    url: api.GetSaleCustomerOrderToEnquirySave,
    method: 'get',
    params: { id }
  })
}
// 获取报价单位
export function GetOrderCompany(): Promise<IResponse> {
  return request({
    url: api.GetOrderCompany,
    method: 'get'
  })
}
//根据客户id获取认领的品牌
export function GetCompanyByCustomer(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompanyByCustomer,
    method: 'get',
    params: param
  })
}
//添加报价单
export function PostAddCustomerOrder(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddCustomerOrder,
    method: 'post',
    data: param
  })
}
// 获取报价单列表
export function GetCustomerOrderList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerOrderList,
    method: 'get',
    params: param
  })
}

// 获取报价单详情
export function GetCustomerOrderInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerOrderInfo,
    method: 'get',
    params: param
  })
}
//添加跟单信息
export function PostAddOrderTrack(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddOrderTrack,
    method: 'post',
    data: param
  })
}
// 获取跟单列表
export function GetTrackList(param: any): Promise<IResponse> {
  return request({
    url: api.GetTrackList,
    method: 'get',
    params: param
  })
}
// 标记失单
export function GetUpdateLostOrder(param: any): Promise<IResponse> {
  return request({
    url: api.GetUpdateLostOrder,
    method: 'get',
    params: param
  })
}
////根据报价单id获取报价单分录
export function PostOrderEntityList(param: any): Promise<IResponse> {
  return request({
    url: api.PostOrderEntityList,
    method: 'post',
    data: param
  })
}
// 获取报价单合并列表
export function GetMergeOrderList(param: any): Promise<IResponse> {
  return request({
    url: api.GetMergeOrderList,
    method: 'get',
    params: param
  })
}
///根据当前用户获取报价单排名
export function GetCustomerOrderRankByUserId(): Promise<IResponse> {
  return request({
    url: api.GetCustomerOrderRankByUserId,
    method: 'get'
  })
}
///获取品牌列表
export function GetCompanyList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompanyList,
    method: 'get',
    params: param
  })
}
///更新品牌状态
export function GetUpdateCompanyState(param: any): Promise<IResponse> {
  return request({
    url: api.GetUpdateCompanyState,
    method: 'get',
    params: param
  })
}
///新增品牌
export function PostAddCompany(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddCompany,
    method: 'post',
    data: param
  })
}
///品牌详情
export function GetCompanyInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompanyInfo,
    method: 'get',
    params: param
  })
}
