import request from '/@/utils/request'
const api = {
  GetCheckedCustomerList: '/sale/api/Customer/GetCheckedCustomerList',
  GetOrderCompany: '/sale/api/CustomerOrder/GetOrderCompany',
  GetRegionTreeByUserId: '/hr/api/HRRegionSetting/GetRegionTreeByUserId',
  GetCustomerRankByUserId: '/sale/api/Customer/GetCustomerRankByUserId',
  GetSentimentList: '/sale/api/Customer/GetSentimentList',
  GetSituationInfo: '/sale/api/Customer/GetSituationInfo',
  GetCustomerProblems: '/sale/api/Customer/GetCustomerProblems',
  PostAddOrEditSituationInfo: '/sale/api/Customer/PostAddOrEditSituationInfo',
  GetCustomersByName: '/sale/api/Customer/GetCustomersByName',
  GetSituationInfoList: '/sale/api/Customer/GetSituationInfoList',
  GetSituationCommList: '/sale/api/Customer/GetSituationCommList',
  PostAddSituationComm: '/sale/api/Customer/PostAddSituationComm',
  GetRelationList: '/sale/api/Customer/GetRelationList',
  GetDeleteRelation: '/sale/api/Customer/GetDeleteRelation',
  GetDeleteSituationInfo: '/sale/api/Customer/GetDeleteSituationInfo',
  PostAddCustomerRelation: '/sale/api/Customer/PostAddCustomerRelation',
  PostAddCustomer: '/sale/api/Customer/PostAddCustomer',
  GetAllCustomerByAddCustomer: '/sale/api/Customer/GetAllCustomerByAddCustomer',
  GetCustomerTrade: '/sale/api/Customer/GetCustomerTrade',
  GetContractBillInfo: '/sale/api/Contract/GetContractBillInfo',
  GetAllRegionTree: '/hr/api/HRRegionSetting/GetAllRegionTree',
  PostApprovalContract: '/sale/api/Contract/PostApprovalContract',

  PostAddCustomerReports: '/sale/api/Customer/PostAddCustomerReports',
  GetCustomerReportsList: '/sale/api/Customer/GetCustomerReportsList',
  GetCustomerReportsById: '/sale/api/Customer/GetCustomerReportsById',
  PostEditCompetitor: '/sale/api/Customer/PostEditCompetitor',

  PostAddCustomerTogether: '/sale/api/Customer/PostAddCustomerTogether',
  GetCustomer: '/sale/api/Customer/GetCustomer',
  GetCustomerInvoiceById: '/sale/api/Customer/GetCustomerInvoiceById',
  PostAddContract: '/sale/api/Contract/PostAddContract',
  GetContractInfo: '/sale/api/Contract/GetContractInfo',

  // 协作
  GetCustomerTogtherList: '/sale/api/Customer/GetCustomerTogtherList',
  GetChangeRecordById: '/sale/api/Customer/GetChangeRecordById',
  GetAppCustomerTogther: '/sale/api/Customer/GetAppCustomerTogther',
  PostApprovalCustomerChange: '/sale/api/Customer/PostApprovalCustomerChange',

  GetSaleCompUserList: '/hr/api/SysUser/GetSaleCompUserList',
  //区域申请
  GetUserRegionList: '/hr/api/HRRegionSetting/GetUserRegionList',
  PostAddRegional: '/sale/api/Customer/PostAddRegional',
  GetRegionalInfo: '/sale/api/Customer/GetRegionalInfo',
  PostApprovalRegional: '/sale/api/Customer/PostApprovalRegional',

  GetJudgeCustomerClaim: '/sale/api/Customer/GetJudgeCustomerClaim',
  PostConfirmBrand: '/sale/api/Customer/PostConfirmBrand',
  GetMergeOrderList: '/sale/api/CustomerOrder/GetMergeOrderList',

  GetCustomerOrderList: '/sale/api/CustomerOrder/GetCustomerOrderList',
  GetUpdateLostOrder: '/sale/api/CustomerOrder/GetUpdateLostOrder',
  GetCustomerOrderRankByUserId: '/sale/api/CustomerOrder/GetCustomerOrderRankByUserId',

  GetContractList: '/sale/api/Contract/GetContractList',
  GetCancelContractById: '/sale/api/Contract/GetCancelContractById',
  GetApprovalContractById: '/sale/api/Contract/GetApprovalContractById',
  GetContractRankByUserId: '/sale/api/Contract/GetContractRankByUserId',
  GetRecoveryContract: '/sale/api/Contract/GetRecoveryContract',

  //采购原则
  GetPurchaseList: '/sale/api/Customer/GetPurchaseList',
  GetPurchaseInfo: '/sale/api/Customer/GetPurchaseInfo',
  PostAddPurchase: '/sale/api/Customer/PostAddPurchase',

  //  付款方式
  GetPaymentInfo: '/sale/api/Customer/GetPaymentInfo',
  GetPaymentList: '/sale/api/Customer/GetPaymentList',
  PostAddPayment: '/sale/api/Customer/PostAddPayment',

  GetTrackList: '/sale/api/CustomerOrder/GetTrackList',
  PostAddOrderTrack: '/sale/api/CustomerOrder/PostAddOrderTrack',
  GetCompanyByCustomer: '/sale/api/CustomerOrder/GetCompanyByCustomer',
  PostAddCustomerOrder: '/sale/api/CustomerOrder/PostAddCustomerOrder',
  GetCustomerOrderInfo: '/sale/api/CustomerOrder/GetCustomerOrderInfo',
  //竞争对手
  PostAddCompete: '/sale/api/Customer/PostAddCompete',
  GetCompeteList: '/sale/api/Customer/GetCompeteList',
  GetCompeteInfo: '/sale/api/Customer/GetCompeteInfo',
  //客户沟通
  PostAddCustomerCommunicate: '/sale/api/Customer/PostAddCustomerCommunicate',
  PostAddCusCommunicateEntity: '/sale/api/Customer/PostAddCusCommunicateEntity',
  GetCusCommunicateList: '/sale/api/Customer/GetCusCommunicateList',
  GetCusCommunicateInfo: '/sale/api/Customer/GetCusCommunicateInfo',
  GetAppCommunicateList: '/sale/api/Customer/GetAppCommunicateList',
  GetUpdateCommunicateState: '/sale/api/Customer/GetUpdateCommunicateState'
}

// 新增或修改客户信息
export function PostAddCustomerTogether(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerTogether,
    method: 'post',
    data: param
  })
}
//根据id获取协作详情
export function GetChangeRecordById(param: any): Promise<IResponse> {
  return request({
    url: api.GetChangeRecordById,
    method: 'get',
    params: param
  })
}
///获取邀请协作确认列表
export function GetCustomerTogtherList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerTogtherList,
    method: 'get',
    params: param
  })
}
///确认邀请协作
export function GetAppCustomerTogther(param: any): Promise<IResponse> {
  return request({
    url: api.GetAppCustomerTogther,
    method: 'get',
    params: param
  })
}

// 根据客户id获取客户信息
export function GetCustomer(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomer,
    method: 'get',
    params: param
  })
}
//获取联系人主观调查列表
export function GetSentimentList(param: any): Promise<IResponse> {
  return request({
    url: api.GetSentimentList,
    method: 'get',
    params: param
  })
}
//获取联系人详情
export function GetSituationInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetSituationInfo,
    method: 'get',
    params: param
  })
}
// 客户主观调查问题
export function GetCustomerProblems(): Promise<IResponse> {
  return request({
    url: api.GetCustomerProblems,
    method: 'get'
  })
}
// 新增或修改联系人信息
export function PostAddOrEditSituationInfo(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddOrEditSituationInfo,
    method: 'post',
    data: param
  })
}
// 根据客户id获取联系人
export function GetSituationInfoList(param: any): Promise<IResponse> {
  return request({
    url: api.GetSituationInfoList,
    method: 'get',
    params: param
  })
}
//审批协作
export function PostApprovalCustomerChange(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostApprovalCustomerChange,
    method: 'post',
    data: param
  })
}

// 获取销售部门和人员
export function GetSaleCompUserList(): Promise<IResponse> {
  return request({
    url: api.GetSaleCompUserList,
    method: 'get'
  })
}
// 获取报价单位
export function GetOrderCompany(): Promise<IResponse> {
  return request({
    url: api.GetOrderCompany,
    method: 'get'
  })
}
// 获取用户区域
export function GetRegionTreeByUserId(param: any): Promise<IResponse> {
  return request({
    url: `${api.GetRegionTreeByUserId}/${param}`,
    method: 'get'
  })
}
//根据客户名获取所添加的客户
export function GetCustomersByName(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomersByName,
    method: 'get',
    params: param
  })
}
///审批区域申请
export function PostApprovalRegional(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostApprovalRegional,
    method: 'post',
    data: param
  })
}
//获取区域申请详情
export function GetRegionalInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetRegionalInfo,
    method: 'get',
    params: param
  })
}
//获取区域
export function GetUserRegionList(param: any): Promise<IResponse> {
  return request({
    url: `${api.GetUserRegionList}/${param}`,
    method: 'get'
  })
}
//提交区域申请
export function PostAddRegional(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddRegional,
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
// 标记失单
export function GetUpdateLostOrder(param: any): Promise<IResponse> {
  return request({
    url: api.GetUpdateLostOrder,
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
// 客户列表
export function GetCheckedCustomerList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCheckedCustomerList,
    method: 'get',
    params: param
  })
}
///根据用户id获取客户排名
export function GetCustomerRankByUserId(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerRankByUserId,
    method: 'get',
    params: param
  })
}
///获取合同列表
export function GetContractList(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractList,
    method: 'get',
    params: param
  })
}
////合同提交审批
export function GetApprovalContractById(param: any): Promise<IResponse> {
  return request({
    url: api.GetApprovalContractById,
    method: 'get',
    params: param
  })
}
///作废合同
export function GetCancelContractById(param: any): Promise<IResponse> {
  return request({
    url: api.GetCancelContractById,
    method: 'get',
    params: param
  })
}
///作废合同
export function GetContractRankByUserId(): Promise<IResponse> {
  return request({
    url: api.GetContractRankByUserId,
    method: 'get'
  })
}
///恢复作废合同
export function GetRecoveryContract(param: any): Promise<IResponse> {
  return request({
    url: api.GetRecoveryContract,
    method: 'get',
    params: param
  })
}
//获取采购列表详情
export function GetPurchaseList(param: any): Promise<IResponse> {
  return request({
    url: api.GetPurchaseList,
    method: 'get',
    params: param
  })
}
//获取采购原则详情
export function GetPurchaseInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetPurchaseInfo,
    method: 'get',
    params: param
  })
}
//提交采购原则
export function PostAddPurchase(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddPurchase,
    method: 'post',
    data: param
  })
}
//获取付款方式详情
export function GetPaymentInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetPaymentInfo,
    method: 'get',
    params: param
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
//添加跟单信息
export function PostAddOrderTrack(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddOrderTrack,
    method: 'post',
    data: param
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
// 获取报价单详情
export function GetCustomerOrderInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerOrderInfo,
    method: 'get',
    params: param
  })
}
//根据客户id获取客户主观调查
export function GetSituationCommList(param: any): Promise<IResponse> {
  return request({
    url: api.GetSituationCommList,
    method: 'get',
    params: param
  })
}
// 客户列表
export function GetAllCustomerByAddCustomer(param: any): Promise<IResponse> {
  return request({
    url: `${api.GetAllCustomerByAddCustomer}/${param}`,
    method: 'get'
  })
}
///获取客户开票信息
export function GetCustomerInvoiceById(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerInvoiceById,
    method: 'get',
    params: param
  })
}
//添加客户主观调查
export function PostAddSituationComm(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddSituationComm,
    method: 'post',
    data: param
  })
}
//根据客户id获取关联企业
export function GetRelationList(param: any): Promise<IResponse> {
  return request({
    url: api.GetRelationList,
    method: 'get',
    params: param
  })
}
export function GetJudgeCustomerClaim(param: any): Promise<IResponse> {
  return request({
    url: api.GetJudgeCustomerClaim,
    method: 'get',
    params: param
  })
}
export function PostConfirmBrand(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostConfirmBrand,
    method: 'post',
    data: param
  })
}
// 删除关联企业
export function GetDeleteRelation(param: any): Promise<IResponse> {
  return request({
    url: api.GetDeleteRelation,
    method: 'get',
    params: param
  })
}
// 删除联系人
export function GetDeleteSituationInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetDeleteSituationInfo,
    method: 'get',
    params: param
  })
}
// 新增关联企业
export function PostAddCustomerRelation(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerRelation,
    method: 'post',
    data: param
  })
}
// 新增或修改客户信息
export function PostAddCustomer(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomer,
    method: 'post',
    data: param
  })
}
// 行业类型
export function GetCustomerTrade(): Promise<IResponse> {
  return request({
    url: api.GetCustomerTrade,
    method: 'get'
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
//添加或修改合同
export function PostAddContract(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddContract,
    method: 'post',
    data: param
  })
}
///获取合同详情
export function GetContractInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractInfo,
    method: 'get',
    params: param
  })
}
///获取合同主表详情
export function GetContractBillInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractBillInfo,
    method: 'get',
    params: param
  })
}
//获取全部区域
export function GetAllRegionTree() {
  return request({
    url: api.GetAllRegionTree,
    method: 'get'
  })
}
//合同审批
export function PostApprovalContract(param: any): Promise<IResponse> {
  return request({
    url: api.PostApprovalContract,
    method: 'post',
    data: param
  })
}
//根据客户id获取报告列表
export function GetCustomerReportsList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerReportsList,
    method: 'get',
    params: param
  })
}
// 添加客户报告
export function PostAddCustomerReports(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerReports,
    method: 'post',
    data: param
  })
}
//根据客户id或报告id获取客户报告
export function GetCustomerReportsById(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerReportsById,
    method: 'get',
    params: param
  })
}
// 添加客户报告
export function PostEditCompetitor(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostEditCompetitor,
    method: 'post',
    data: param
  })
}
//获取付款方式列表
export function GetPaymentList(param: any): Promise<IResponse> {
  return request({
    url: api.GetPaymentList,
    method: 'get',
    params: param
  })
}
//提交付款方式
export function PostAddPayment(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddPayment,
    method: 'post',
    data: param
  })
}
//提交竞争对手
export function PostAddCompete(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCompete,
    method: 'post',
    data: param
  })
}
//获取竞争对手列表
export function GetCompeteList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompeteList,
    method: 'get',
    params: param
  })
}
//获取竞争对手详情
export function GetCompeteInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompeteInfo,
    method: 'get',
    params: param
  })
}
//提交客户沟通
export function PostAddCustomerCommunicate(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerCommunicate,
    method: 'post',
    data: param
  })
}
//提交沟通记录
export function PostAddCusCommunicateEntity(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCusCommunicateEntity,
    method: 'post',
    data: param
  })
}
//根据客户id获取沟通列表
export function GetCusCommunicateList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCusCommunicateList,
    method: 'get',
    params: param
  })
}
//获取沟通记录详情
export function GetCusCommunicateInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCusCommunicateInfo,
    method: 'get',
    params: param
  })
}
//获取审批沟通列表
export function GetAppCommunicateList(param: any): Promise<IResponse> {
  return request({
    url: api.GetAppCommunicateList,
    method: 'get',
    params: param
  })
}
//更改状态
export function GetUpdateCommunicateState(param: any): Promise<IResponse> {
  return request({
    url: api.GetUpdateCommunicateState,
    method: 'get',
    params: param
  })
}
