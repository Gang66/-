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

  // ??????
  GetCustomerTogtherList: '/sale/api/Customer/GetCustomerTogtherList',
  GetChangeRecordById: '/sale/api/Customer/GetChangeRecordById',
  GetAppCustomerTogther: '/sale/api/Customer/GetAppCustomerTogther',
  PostApprovalCustomerChange: '/sale/api/Customer/PostApprovalCustomerChange',

  GetSaleCompUserList: '/hr/api/SysUser/GetSaleCompUserList',
  //????????????
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

  //????????????
  GetPurchaseList: '/sale/api/Customer/GetPurchaseList',
  GetPurchaseInfo: '/sale/api/Customer/GetPurchaseInfo',
  PostAddPurchase: '/sale/api/Customer/PostAddPurchase',

  //  ????????????
  GetPaymentInfo: '/sale/api/Customer/GetPaymentInfo',
  GetPaymentList: '/sale/api/Customer/GetPaymentList',
  PostAddPayment: '/sale/api/Customer/PostAddPayment',

  GetTrackList: '/sale/api/CustomerOrder/GetTrackList',
  PostAddOrderTrack: '/sale/api/CustomerOrder/PostAddOrderTrack',
  GetCompanyByCustomer: '/sale/api/CustomerOrder/GetCompanyByCustomer',
  PostAddCustomerOrder: '/sale/api/CustomerOrder/PostAddCustomerOrder',
  GetCustomerOrderInfo: '/sale/api/CustomerOrder/GetCustomerOrderInfo',
  //????????????
  PostAddCompete: '/sale/api/Customer/PostAddCompete',
  GetCompeteList: '/sale/api/Customer/GetCompeteList',
  GetCompeteInfo: '/sale/api/Customer/GetCompeteInfo',
  //????????????
  PostAddCustomerCommunicate: '/sale/api/Customer/PostAddCustomerCommunicate',
  PostAddCusCommunicateEntity: '/sale/api/Customer/PostAddCusCommunicateEntity',
  GetCusCommunicateList: '/sale/api/Customer/GetCusCommunicateList',
  GetCusCommunicateInfo: '/sale/api/Customer/GetCusCommunicateInfo',
  GetAppCommunicateList: '/sale/api/Customer/GetAppCommunicateList',
  GetUpdateCommunicateState: '/sale/api/Customer/GetUpdateCommunicateState'
}

// ???????????????????????????
export function PostAddCustomerTogether(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerTogether,
    method: 'post',
    data: param
  })
}
//??????id??????????????????
export function GetChangeRecordById(param: any): Promise<IResponse> {
  return request({
    url: api.GetChangeRecordById,
    method: 'get',
    params: param
  })
}
///??????????????????????????????
export function GetCustomerTogtherList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerTogtherList,
    method: 'get',
    params: param
  })
}
///??????????????????
export function GetAppCustomerTogther(param: any): Promise<IResponse> {
  return request({
    url: api.GetAppCustomerTogther,
    method: 'get',
    params: param
  })
}

// ????????????id??????????????????
export function GetCustomer(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomer,
    method: 'get',
    params: param
  })
}
//?????????????????????????????????
export function GetSentimentList(param: any): Promise<IResponse> {
  return request({
    url: api.GetSentimentList,
    method: 'get',
    params: param
  })
}
//?????????????????????
export function GetSituationInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetSituationInfo,
    method: 'get',
    params: param
  })
}
// ????????????????????????
export function GetCustomerProblems(): Promise<IResponse> {
  return request({
    url: api.GetCustomerProblems,
    method: 'get'
  })
}
// ??????????????????????????????
export function PostAddOrEditSituationInfo(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddOrEditSituationInfo,
    method: 'post',
    data: param
  })
}
// ????????????id???????????????
export function GetSituationInfoList(param: any): Promise<IResponse> {
  return request({
    url: api.GetSituationInfoList,
    method: 'get',
    params: param
  })
}
//????????????
export function PostApprovalCustomerChange(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostApprovalCustomerChange,
    method: 'post',
    data: param
  })
}

// ???????????????????????????
export function GetSaleCompUserList(): Promise<IResponse> {
  return request({
    url: api.GetSaleCompUserList,
    method: 'get'
  })
}
// ??????????????????
export function GetOrderCompany(): Promise<IResponse> {
  return request({
    url: api.GetOrderCompany,
    method: 'get'
  })
}
// ??????????????????
export function GetRegionTreeByUserId(param: any): Promise<IResponse> {
  return request({
    url: `${api.GetRegionTreeByUserId}/${param}`,
    method: 'get'
  })
}
//???????????????????????????????????????
export function GetCustomersByName(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomersByName,
    method: 'get',
    params: param
  })
}
///??????????????????
export function PostApprovalRegional(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostApprovalRegional,
    method: 'post',
    data: param
  })
}
//????????????????????????
export function GetRegionalInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetRegionalInfo,
    method: 'get',
    params: param
  })
}
//????????????
export function GetUserRegionList(param: any): Promise<IResponse> {
  return request({
    url: `${api.GetUserRegionList}/${param}`,
    method: 'get'
  })
}
//??????????????????
export function PostAddRegional(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddRegional,
    method: 'post',
    data: param
  })
}
// ?????????????????????
export function GetCustomerOrderList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerOrderList,
    method: 'get',
    params: param
  })
}
// ????????????
export function GetUpdateLostOrder(param: any): Promise<IResponse> {
  return request({
    url: api.GetUpdateLostOrder,
    method: 'get',
    params: param
  })
}
///???????????????????????????????????????
export function GetCustomerOrderRankByUserId(): Promise<IResponse> {
  return request({
    url: api.GetCustomerOrderRankByUserId,
    method: 'get'
  })
}
// ????????????
export function GetCheckedCustomerList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCheckedCustomerList,
    method: 'get',
    params: param
  })
}
///????????????id??????????????????
export function GetCustomerRankByUserId(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerRankByUserId,
    method: 'get',
    params: param
  })
}
///??????????????????
export function GetContractList(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractList,
    method: 'get',
    params: param
  })
}
////??????????????????
export function GetApprovalContractById(param: any): Promise<IResponse> {
  return request({
    url: api.GetApprovalContractById,
    method: 'get',
    params: param
  })
}
///????????????
export function GetCancelContractById(param: any): Promise<IResponse> {
  return request({
    url: api.GetCancelContractById,
    method: 'get',
    params: param
  })
}
///????????????
export function GetContractRankByUserId(): Promise<IResponse> {
  return request({
    url: api.GetContractRankByUserId,
    method: 'get'
  })
}
///??????????????????
export function GetRecoveryContract(param: any): Promise<IResponse> {
  return request({
    url: api.GetRecoveryContract,
    method: 'get',
    params: param
  })
}
//????????????????????????
export function GetPurchaseList(param: any): Promise<IResponse> {
  return request({
    url: api.GetPurchaseList,
    method: 'get',
    params: param
  })
}
//????????????????????????
export function GetPurchaseInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetPurchaseInfo,
    method: 'get',
    params: param
  })
}
//??????????????????
export function PostAddPurchase(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddPurchase,
    method: 'post',
    data: param
  })
}
//????????????????????????
export function GetPaymentInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetPaymentInfo,
    method: 'get',
    params: param
  })
}

// ??????????????????
export function GetTrackList(param: any): Promise<IResponse> {
  return request({
    url: api.GetTrackList,
    method: 'get',
    params: param
  })
}
//??????????????????
export function PostAddOrderTrack(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddOrderTrack,
    method: 'post',
    data: param
  })
}
//????????????id?????????????????????
export function GetCompanyByCustomer(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompanyByCustomer,
    method: 'get',
    params: param
  })
}
//???????????????
export function PostAddCustomerOrder(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddCustomerOrder,
    method: 'post',
    data: param
  })
}
// ?????????????????????
export function GetCustomerOrderInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerOrderInfo,
    method: 'get',
    params: param
  })
}
//????????????id????????????????????????
export function GetSituationCommList(param: any): Promise<IResponse> {
  return request({
    url: api.GetSituationCommList,
    method: 'get',
    params: param
  })
}
// ????????????
export function GetAllCustomerByAddCustomer(param: any): Promise<IResponse> {
  return request({
    url: `${api.GetAllCustomerByAddCustomer}/${param}`,
    method: 'get'
  })
}
///????????????????????????
export function GetCustomerInvoiceById(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerInvoiceById,
    method: 'get',
    params: param
  })
}
//????????????????????????
export function PostAddSituationComm(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddSituationComm,
    method: 'post',
    data: param
  })
}
//????????????id??????????????????
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
// ??????????????????
export function GetDeleteRelation(param: any): Promise<IResponse> {
  return request({
    url: api.GetDeleteRelation,
    method: 'get',
    params: param
  })
}
// ???????????????
export function GetDeleteSituationInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetDeleteSituationInfo,
    method: 'get',
    params: param
  })
}
// ??????????????????
export function PostAddCustomerRelation(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerRelation,
    method: 'post',
    data: param
  })
}
// ???????????????????????????
export function PostAddCustomer(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomer,
    method: 'post',
    data: param
  })
}
// ????????????
export function GetCustomerTrade(): Promise<IResponse> {
  return request({
    url: api.GetCustomerTrade,
    method: 'get'
  })
}
// ???????????????????????????
export function GetMergeOrderList(param: any): Promise<IResponse> {
  return request({
    url: api.GetMergeOrderList,
    method: 'get',
    params: param
  })
}
//?????????????????????
export function PostAddContract(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddContract,
    method: 'post',
    data: param
  })
}
///??????????????????
export function GetContractInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractInfo,
    method: 'get',
    params: param
  })
}
///????????????????????????
export function GetContractBillInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractBillInfo,
    method: 'get',
    params: param
  })
}
//??????????????????
export function GetAllRegionTree() {
  return request({
    url: api.GetAllRegionTree,
    method: 'get'
  })
}
//????????????
export function PostApprovalContract(param: any): Promise<IResponse> {
  return request({
    url: api.PostApprovalContract,
    method: 'post',
    data: param
  })
}
//????????????id??????????????????
export function GetCustomerReportsList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerReportsList,
    method: 'get',
    params: param
  })
}
// ??????????????????
export function PostAddCustomerReports(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerReports,
    method: 'post',
    data: param
  })
}
//????????????id?????????id??????????????????
export function GetCustomerReportsById(param: any): Promise<IResponse> {
  return request({
    url: api.GetCustomerReportsById,
    method: 'get',
    params: param
  })
}
// ??????????????????
export function PostEditCompetitor(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostEditCompetitor,
    method: 'post',
    data: param
  })
}
//????????????????????????
export function GetPaymentList(param: any): Promise<IResponse> {
  return request({
    url: api.GetPaymentList,
    method: 'get',
    params: param
  })
}
//??????????????????
export function PostAddPayment(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddPayment,
    method: 'post',
    data: param
  })
}
//??????????????????
export function PostAddCompete(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCompete,
    method: 'post',
    data: param
  })
}
//????????????????????????
export function GetCompeteList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompeteList,
    method: 'get',
    params: param
  })
}
//????????????????????????
export function GetCompeteInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompeteInfo,
    method: 'get',
    params: param
  })
}
//??????????????????
export function PostAddCustomerCommunicate(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCustomerCommunicate,
    method: 'post',
    data: param
  })
}
//??????????????????
export function PostAddCusCommunicateEntity(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostAddCusCommunicateEntity,
    method: 'post',
    data: param
  })
}
//????????????id??????????????????
export function GetCusCommunicateList(param: any): Promise<IResponse> {
  return request({
    url: api.GetCusCommunicateList,
    method: 'get',
    params: param
  })
}
//????????????????????????
export function GetCusCommunicateInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCusCommunicateInfo,
    method: 'get',
    params: param
  })
}
//????????????????????????
export function GetAppCommunicateList(param: any): Promise<IResponse> {
  return request({
    url: api.GetAppCommunicateList,
    method: 'get',
    params: param
  })
}
//????????????
export function GetUpdateCommunicateState(param: any): Promise<IResponse> {
  return request({
    url: api.GetUpdateCommunicateState,
    method: 'get',
    params: param
  })
}
