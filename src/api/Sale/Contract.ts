import request from '/@/utils/request'
const api = {
  PostAddContract: '/sale/api/Contract/PostAddContract',
  GetContractList: '/sale/api/Contract/GetContractList',
  GetContractInfo: '/sale/api/Contract/GetContractInfo',
  GetCancelContractById: '/sale/api/Contract/GetCancelContractById',
  GetApprovalContractById: '/sale/api/Contract/GetApprovalContractById',
  GetContractBillInfo: '/sale/api/Contract/GetContractBillInfo',
  GetContractRankByUserId: '/sale/api/Contract/GetContractRankByUserId',
  GetRecoveryContract: '/sale/api/Contract/GetRecoveryContract',

  PostApprovalContract: '/sale/api/Contract/PostApprovalContract',

  //分析
  GetContractAnalysisByAmount: '/sale/api/Contract/GetContractAnalysisByAmount',
  GetFormalUserRankContract: '/sale/api/Contract/GetFormalUserRankContract',
  GetContractIndexInfo: '/sale/api/Contract/GetContractIndexInfo',
  //备货
  GetStockInfo: '/sale/api/Contract/GetStockInfo',
  PostApprovalStockUp: '/sale/api/Contract/PostApprovalStockUp',
  PostAddStockUp: '/sale/api/Contract/PostAddStockUp',
  GetUpdateContractState: '/sale/api/Contract/GetUpdateContractState'
}
//审批备货申请
export function PostApprovalStockUp(param: any): Promise<IResponse> {
  return request({
    url: api.PostApprovalStockUp,
    method: 'post',
    data: param
  })
}
//提交备货申请
export function PostAddStockUp(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddStockUp,
    method: 'post',
    data: param
  })
}
//根据合同id获取备货申请
export function GetStockInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetStockInfo,
    method: 'get',
    params: param
  })
}
//变更合同状态
export function GetUpdateContractState(param: any): Promise<IResponse> {
  return request({
    url: api.GetUpdateContractState,
    method: 'get',
    params: param
  })
}
///根据条件获取合同分布看板
export function GetContractAnalysisByAmount(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractAnalysisByAmount,
    method: 'get',
    params: param
  })
}
///合同库获取正式员工排行榜
export function GetFormalUserRankContract(param: any): Promise<IResponse> {
  return request({
    url: api.GetFormalUserRankContract,
    method: 'get',
    params: param
  })
}
///按照搜索条件获取合同库分析
export function GetContractIndexInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractIndexInfo,
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
//合同审批
export function PostApprovalContract(param: any): Promise<IResponse> {
  return request({
    url: api.PostApprovalContract,
    method: 'post',
    data: param
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

///作废合同
export function GetCancelContractById(param: any): Promise<IResponse> {
  return request({
    url: api.GetCancelContractById,
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
