import request from '/@/utils/request'
const api = {
  GetQiXinBasicInfo: '/sale/api/QiXin/GetQiXinBasicInfo',
  GetQiXinLawsuitListByName: '/sale/api/QiXin/GetQiXinLawsuitListByName',
  GetQiXinExecutedpersonListByName: '/sale/api/QiXin/GetQiXinExecutedpersonListByName',
  GetQiXinExecutionListByName: '/sale/api/QiXin/GetQiXinExecutionListByName',
  PostQiXinComCredit: '/sale/api/QiXin/PostQiXinComCredit',
  PostEditQiXinComCreditSave: '/sale/api/QiXin/PostEditQiXinComCreditSave'
}

// 获取启信宝工商照面
export function GetQiXinBasicInfoAsync(param: any): Promise<IResponse> {
  return request({
    url: `${api.GetQiXinBasicInfo}/${param}`,
    method: 'get'
  })
}

// 获取启信宝被执行企业列表
export function GetQiXinExecutedpersonListByName(param: any): Promise<IResponse> {
  return request({
    url: api.GetQiXinExecutedpersonListByName,
    method: 'get',
    params: param
  })
}
// 获取启信宝裁判文书列表
export function GetQiXinLawsuitListByName(param: any): Promise<IResponse> {
  return request({
    url: api.GetQiXinLawsuitListByName,
    method: 'get',
    params: param
  })
}
// 获取启信宝失信被执行企业列表
export function GetQiXinExecutionListByName(param: any): Promise<IResponse> {
  return request({
    url: api.GetQiXinExecutionListByName,
    method: 'get',
    params: param
  })
}
// 获取客户诉讼信息
export function PostQiXinComCredit(data: any): Promise<IResponse> {
  return request({
    url: api.PostQiXinComCredit,
    method: 'post',
    data
  })
}
// 编辑沟通启信宝诉讼信息
export function PostEditQiXinComCreditSave(data: any): Promise<IResponse> {
  return request({
    url: api.PostEditQiXinComCreditSave,
    method: 'post',
    data
  })
}
