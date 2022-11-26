//技术处理接口
import request from '/@/utils/request'
const api = {
  //#region 参与的人员
  GetTechImGroupEnquiryToUserList: '/tech/api/TechIm/GetTechImGroupEnquiryToUserList',

  //#endregion

  //#region 发送聊天信息
  PostAddTechImNewsSave: '/tech/api/TechIm/PostAddTechImNewsSave',
  PostSetTechImNewsReadTagSave: '/tech/api/TechIm/PostSetTechImNewsReadTagSave',

  //#endregion

  //#region 获取聊天记录
  GetTechImNewsPage: '/tech/api/TechIm/GetTechImNewsPage',

  //#endregion

  //#region  技术核算人员分配
  GetSetTechImEnquiryTechnicistUserSave: '/tech/api/TechIm/GetSetTechImEnquiryTechnicistUserSave',
  GetSetTechImEnquiryAccounterUserSave: '/tech/api/TechIm/GetSetTechImEnquiryAccounterUserSave',
  //#endregion
}

//#region 参与的人员
//根据询价单Id获取群成员
export function GetTechImGroupEnquiryToUserList(orderId: Number): Promise<IResponse> {
  return request({
    url: api.GetTechImGroupEnquiryToUserList,
    method: 'get',
    params: { orderId }
  })
}

//#endregion

//#region 发送聊天信息
// 发送聊天消息
export function PostAddTechImNewsSave(data: any): Promise<IResponse> {
  return request({
    url: api.PostAddTechImNewsSave,
    method: 'post',
    data
  })
}

// 消息标记未已读
export function PostSetTechImNewsReadTagSave(data: string[]): Promise<IResponse> {
  return request({
    url: api.PostSetTechImNewsReadTagSave,
    method: 'post',
    data
  })
}

//#endregion

//#region 获取聊天记录
// 分配订单数据
export function GetTechImNewsPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetTechImNewsPage,
    method: 'get',
    params: param
  })
}

//#endregion

//#region  技术核算人员分配
// 询价单设置报价专员
export function GetSetTechImEnquiryTechnicistUserSave(param: any): Promise<IResponse> {
  return request({
    url: api.GetSetTechImEnquiryTechnicistUserSave,
    method: 'get',
    params: param
  })
}
// 询价单设置核算专员
export function GetSetTechImEnquiryAccounterUserSave(param: any): Promise<IResponse> {
  return request({
    url: api.GetSetTechImEnquiryAccounterUserSave,
    method: 'get',
    params: param
  })
}

//#endregion
