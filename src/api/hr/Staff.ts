/*
 * @Author: ZHJ
 * @Date: 2022-07-20 10:04:53
 * @LastEditTime: 2022-08-13 11:09:00
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\api\hr\Staff.ts
 * 版权声明
 */
import request from '/@/utils/request'
const api = {
  GetProbationPage: '/hr/api/HRProbation/GetProbationPage',
  GetHRTrialDetailInfo: '/hr/api/HRProbation/GetHRTrialDetailInfo',
  GetAdjustSalariesList: '/hr/api/TrendPositive/GetAdjustSalariesList',
  GetAdjustSalaryReportList: '/hr/api/TrendPositive/GetAdjustSalaryReportList',
  GetAdjustSalaryReportInfo: '/hr/api/TrendPositive/GetAdjustSalaryReportInfo',
  GetPostTransferList: '/hr/api/HRPostTransfer/GetPostTransferList',
  GetHRStaffQuitPage: '/hr/api/HRStaffQuit/GetHRStaffQuitPage',
  GetSocialSecurityPage: '/hr/api/HRSocialSecurity/GetSocialSecurityPage',
  PostAddEditSocialSecuritySave: '/hr/api/HRSocialSecurity/PostAddEditSocialSecuritySave',
  GetSocialSecurityInfo: '/hr/api/HRSocialSecurity/GetSocialSecurityInfo',
  GetBeforePostTransfer: '/hr/api/HRPostTransfer/GetBeforePostTransfer'
}
// 试用期分页数据
export function GetProbationPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetProbationPage,
    method: 'get',
    params: param
  })
}
// 试用期报告
export function GetHRTrialDetailInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetHRTrialDetailInfo + '/' + Id,
    method: 'get'
  })
}
// 正式期分页数据
export function GetAdjustSalariesList(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetAdjustSalariesList,
    method: 'get',
    params: param
  })
}
// 正式期报告列表
export function GetAdjustSalaryReportList(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetAdjustSalaryReportList,
    method: 'get',
    params: param
  })
}
// 正式期报告
export function GetAdjustSalaryReportInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetAdjustSalaryReportInfo + '/' + Id,
    method: 'get'
  })
}
// 岗位管理列表数据
export function GetPostTransferList(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetPostTransferList,
    method: 'get',
    params: param
  })
}
// 离职管理列表数据
export function GetHRStaffQuitPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetHRStaffQuitPage,
    method: 'get',
    params: param
  })
}
// 社保管理列表数据
export function GetSocialSecurityPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetSocialSecurityPage,
    method: 'get',
    params: param
  })
}
// 提交社保金额
export function PostAddEditSocialSecuritySave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditSocialSecuritySave,
    method: 'post',
    data: param
  })
}
// 社保详情
export function GetSocialSecurityInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetSocialSecurityInfo + '/' + Id,
    method: 'get'
  })
}
// 岗位管理记录详情
export function GetBeforePostTransfer(Id: number): Promise<IResponse> {
  return request({
    url: api.GetBeforePostTransfer + '/' + Id,
    method: 'get'
  })
}
