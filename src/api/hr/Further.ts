/*
 * @Author: ZHJ
 * @Date: 2022-08-10 10:37:37
 * @LastEditTime: 2022-08-15 16:27:01
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\api\hr\Further.ts
 * 版权声明
 */
import request from '/@/utils/request'
const api = {
  PostInsertEditAlertReasonTypeSave: '/hr/api/BaseUserAlert/PostInsertEditAlertReasonTypeSave',
  GetAlertReasonTypeList: '/hr/api/BaseUserAlert/GetAlertReasonTypeList',
  GetAlertReasonTypeInfo: '/hr/api/BaseUserAlert/GetAlertReasonTypeInfo',
  PostCheckPlanStudyComplete: '/hr/api/TrainWork/PostCheckPlanStudyComplete',
  GetUnlockAlertPage: '/hr/api/BaseUserAlert/GetUnlockAlertPage',
  PostUnlockUserAlert: '/hr/api/BaseUserAlert/PostUnlockUserAlert',
  GetPlanInfos: '/hr/api/TrainWork/GetPlanInfos'
}
// 新增深造关停
export function PostInsertEditAlertReasonTypeSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostInsertEditAlertReasonTypeSave,
    method: 'post',
    data: param
  })
}
// 深造设置列表数据
export function GetAlertReasonTypeList(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetAlertReasonTypeList,
    method: 'get',
    params: param
  })
}
// 深造内容列表数据
export function GetUnlockAlertPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetUnlockAlertPage,
    method: 'get',
    params: param
  })
}
// 根据Id获取深造设置信息
export function GetAlertReasonTypeInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetAlertReasonTypeInfo + '/' + param,
    method: 'get'
  })
}
// 是否关停结束
export function PostCheckPlanStudyComplete(param: any): Promise<IResponse> {
  return request({
    url: api.PostCheckPlanStudyComplete,
    method: 'post',
    data: param
  })
}
// 深造内容解锁
export function PostUnlockUserAlert(param: any): Promise<IResponse> {
  return request({
    url: api.PostUnlockUserAlert,
    method: 'post',
    data: param
  })
}
// 学习记录详情
export function GetPlanInfos(param: any): Promise<IResponse> {
  return request({
    url: api.GetPlanInfos,
    method: 'get',
    params: param
  })
}
