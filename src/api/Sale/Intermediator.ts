import request from '/@/utils/request'

const api = {
  PostAddIntermediator: '/sale/api/Intermediator/PostAddIntermediator',
  GetIntermediatorList: '/sale/api/Intermediator/GetIntermediatorList',
  PostUpdateIntermediatorImgUrl: '/sale/api/Intermediator/PostUpdateIntermediatorImgUrl',
  GetIntermediatorInfo: '/sale/api/Intermediator/GetIntermediatorInfo',
  GetCustomerByInterId: '/sale/api/Intermediator/GetCustomerByInterId',
  GetIntermediatorByCusId: '/sale/api/Intermediator/GetIntermediatorByCusId',
  PostApprovalIntermediator: '/sale/api/Intermediator/PostApprovalIntermediator',
}

// 添加、修改居间人
export function PostAddIntermediator(param:any):Promise<IResponse> {
  return request({
    url: api.PostAddIntermediator,
    method: 'post',
    data: param,
  })
}
// 审批居间人
export function PostApprovalIntermediator(param:any):Promise<IResponse> {
  return request({
    url: api.PostApprovalIntermediator,
    method: 'post',
    data: param,
  })
}
// 获取居间人列表
export function GetIntermediatorList(param: any):Promise<IResponse> {
  return request({
      url: api.GetIntermediatorList,
      method: 'get',
      params: param
  })
}
// 获取居间人详情
export function GetIntermediatorInfo(param: any):Promise<IResponse> {
  return request({
      url: api.GetIntermediatorInfo,
      method: 'get',
      params: param
  })
}
// 获取居间人列表
export function GetIntermediatorByCusId(param: any):Promise<IResponse> {
  return request({
      url: api.GetIntermediatorByCusId,
      method: 'get',
      params: param
  })
}
// 获取客户列表
export function GetCustomerByInterId(param: any):Promise<IResponse> {
  return request({
      url: api.GetCustomerByInterId,
      method: 'get',
      params: param
  })
}
// 上传图片
export function PostUpdateIntermediatorImgUrl(param: any):Promise<IResponse> {
  return request({
      url: api.PostUpdateIntermediatorImgUrl,
      method: 'post',
      data: param
  })
}