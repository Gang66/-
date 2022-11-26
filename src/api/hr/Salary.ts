/*
 * @Author: ZHJ
 * @Date: 2022-07-20 10:04:53
 * @LastEditTime: 2022-11-10 13:24:01
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\api\hr\Salary.ts
 * 版权声明
 */
import request from '/@/utils/request'
const api = {
  GetSalarySetting: '/hr/api/WagesItemLibrary/GetSalarySetting',
  PostSaveSalarySetting: '/hr/api/WagesItemLibrary/PostSaveSalarySetting',
  GetSalaryBaseSetting: '/hr/api/WagesItemLibrary/GetSalaryBaseSetting',
  PostWagesUserStaffList: '/hr/api/WagesItemLibrary/PostWagesUserStaffList',
  EditBatchSettingSalarySave: '/hr/api/WagesItemLibrary/EditBatchSettingSalarySave',
  PostEditWagesDistributionSave: '/hr/api/WagesItemLibrary/PostEditWagesDistributionSave',
  GetWagesDistributionEntity: '/hr/api/WagesItemLibrary/GetWagesDistributionEntity',
  GetDelWagesDistribution: '/hr/api/WagesItemLibrary/GetDelWagesDistribution',
  GetWagesItemLibraryPage: '/hr/api/WagesItemLibrary/GetWagesItemLibraryPage',
  PostEditWagesItemLibrarySave: '/hr/api/WagesItemLibrary/PostEditWagesItemLibrarySave',
  GetDelWagesItemLibrary: '/hr/api/WagesItemLibrary/GetDelWagesItemLibrary',
  GetWagesItemLibraryEntity: '/hr/api/WagesItemLibrary/GetWagesItemLibraryEntity',
  GetWagesItemMethodList: '/hr/api/WagesItem/GetWagesItemMethodList',
  PostEditWagesItemLibraryItemSave: '/hr/api/WagesItemLibrary/PostEditWagesItemLibraryItemSave',
  PostEditWagesDistributionItemSave: '/hr/api/WagesItemLibrary/PostEditWagesDistributionItemSave',
  GetResetSystemPayBar: '/hr/api/WagesItemLibrary/GetResetSystemPayBar',
  GetWagesDistributionPage: '/hr/api/WagesItemLibrary/GetWagesDistributionPage'
}
// 工资设定分页数据
export function GetSalarySetting(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetSalarySetting,
    method: 'get',
    params: param
  })
}
//删除岗位工资设定
export function GetDelWagesDistribution(param: any): Promise<IResponse> {
  return request({
    url: api.GetDelWagesDistribution + '/' + param,
    method: 'get'
  })
}
//查询工资配置详情
export function GetWagesDistributionEntity(param: any): Promise<IResponse> {
  return request({
    url: api.GetWagesDistributionEntity + '/' + param,
    method: 'get'
  })
}
//查询工资项明细构成
export function GetWagesItemLibraryEntity(param: any): Promise<IResponse> {
  return request({
    url: api.GetWagesItemLibraryEntity + '/' + param,
    method: 'get'
  })
}
// 岗位工资设定分页数据
export function GetWagesDistributionPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetWagesDistributionPage,
    method: 'get',
    params: param
  })
}
// 工资项分页数据
export function GetWagesItemLibraryPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetWagesItemLibraryPage,
    method: 'get',
    params: param
  })
}
// 编辑工资项
export function PostEditWagesItemLibrarySave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditWagesItemLibrarySave,
    method: 'post',
    data: param
  })
}
// 编辑岗位工资
export function PostEditWagesDistributionItemSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditWagesDistributionItemSave,
    method: 'post',
    data: param
  })
}
//删除工资项配置详情
export function GetDelWagesItemLibrary(param: any): Promise<IResponse> {
  return request({
    url: api.GetDelWagesItemLibrary + '/' + param,
    method: 'get'
  })
}
// 明细构成数据源
export function GetWagesItemMethodList(): Promise<IResponse> {
  return request({
    url: api.GetWagesItemMethodList,
    method: 'get'
  })
}
// 工资配置项
export function GetSalaryBaseSetting(): Promise<IResponse> {
  return request({
    url: api.GetSalaryBaseSetting,
    method: 'get'
  })
}
// 编辑岗位工资配置
export function PostWagesUserStaffList(param: any): Promise<IResponse> {
  return request({
    url: api.PostWagesUserStaffList,
    method: 'post',
    data: param
  })
}
// 编辑工资项目二级工资构成
export function PostEditWagesItemLibraryItemSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditWagesItemLibraryItemSave,
    method: 'post',
    data: param
  })
}
// 工资配置项
export function PostEditWagesDistributionSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditWagesDistributionSave,
    method: 'post',
    data: param
  })
}
//修改工资设定
export function PostSaveSalarySetting(param: any): Promise<IResponse> {
  return request({
    url: api.PostSaveSalarySetting,
    method: 'post',
    data: param
  })
}
//批量修改工资设定
export function EditBatchSettingSalarySave(param: any): Promise<IResponse> {
  return request({
    url: api.EditBatchSettingSalarySave,
    method: 'post',
    data: param
  })
}
// 收入列表分页数据
export function GetResetSystemPayBar(param: any): Promise<IResponse> {
  return request({
    url: api.GetResetSystemPayBar,
    method: 'get',
    params: param
  })
}
