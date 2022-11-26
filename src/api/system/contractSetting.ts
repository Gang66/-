/*
 * @Author: ZHJ
 * @Date: 2022-05-05 17:30:56
 * @LastEditTime: 2022-11-07 15:26:44
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\api\system\contractSetting.ts
 * 版权声明
 */
import request from '/@/utils/request'
const api = {
  GetContractManagementPage: '/hr/api/ContractManagement/GetContractManagementPage',
  PostAddEditContractManagementSave: '/hr/api/ContractManagement/PostAddEditContractManagementSave',
  PostDeleteEditContractManagement: '/hr/api/ContractManagement/PostDeleteEditContractManagement',
  GetContractManagementInfo: '/hr/api/ContractManagement/GetContractManagementInfo',
  GetContractManagementList: '/hr/api/ContractManagement/GetContractManagementList',
  PostAddContractByDepartment: '/hr/api/ContractManagement/PostAddContractByDepartment',
  GetDepartByContractinfo: '/hr/api/ContractManagement/GetDepartByContractinfo',
  GetStaffDeptIdByContractinfo: '/hr/api/ContractManagement/GetStaffDeptIdByContractinfo'
}
// 合同设置列表
export function GetContractManagementPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetContractManagementPage,
    method: 'get',
    params: param
  })
}
// 合同设置select列表
export function GetContractManagementList(): Promise<IResponse> {
  return request({
    url: api.GetContractManagementList,
    method: 'get'
  })
}
// 添加合同设置
export function PostAddEditContractManagementSave(param: Object): Promise<IResponse> {
  return request({
    url: api.PostAddEditContractManagementSave,
    method: 'post',
    data: param
  })
}
// 分配合同设置
export function PostAddContractByDepartment(param: Object): Promise<IResponse> {
  return request({
    url: api.PostAddContractByDepartment,
    method: 'post',
    data: param
  })
}
// 删除合同设置
export function PostDeleteEditContractManagement(param: any): Promise<IResponse<any>> {
  return request({
    url: api.PostDeleteEditContractManagement + '/' + param,
    method: 'post'
  })
}
// 获取合同设置详情
export function GetContractManagementInfo(param: any): Promise<IResponse<any>> {
  return request({
    url: api.GetContractManagementInfo + '/' + param,
    method: 'get'
  })
}
// 根据当前部门查看合同详情
export function GetDepartByContractinfo(param: any): Promise<IResponse<any>> {
  return request({
    url: api.GetDepartByContractinfo + '/' + param,
    method: 'get'
  })
}
// 根据部门Id获取（劳动合同，劳务合同、入职档案表、制度表）
export function GetStaffDeptIdByContractinfo(param: any): Promise<IResponse<any>> {
  return request({
    url: api.GetStaffDeptIdByContractinfo,
    method: 'get',
    params: param
  })
}
