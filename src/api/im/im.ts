import request from '/@/utils/request'
const api = {
  GetImServerInfo: '/wf/api/Im/GetImServerInfo',
  PostImSendMessageSave: '/wf/api/Im/PostImSendMessageSave',
  PostImSendMessageAllSave: '/wf/api/Im/PostImSendMessageAllSave'
}

// 获取IM服务地址信息
export function GetImServerInfo() {
  return request({
    url: api.GetImServerInfo,
    method: 'get'
  })
}

// 发送消息给指定人员
export function PostImSendMessageSave(data: any): Promise<IResponse> {
  return request({
    url: api.PostImSendMessageSave,
    method: 'post',
    data
  })
}

// 向所有在线的人员发送消息
export function PostImSendMessageAllSave(data: any): Promise<IResponse> {
  return request({
    url: api.PostImSendMessageAllSave,
    method: 'post',
    data
  })
}
