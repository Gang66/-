import request from '/@/utils/request'
const api = {
  PostAddTrendPositive: '/hr/api/TrendPositive/PostAddTrendPositive',
  GetTrendPositivePage: '/hr/api/TrendPositive/GetTrendPositivePage',
  GetTrendPositiveInfo: '/hr/api/TrendPositive/GetTrendPositiveInfo',
  PostAddEditStaffQuitSave: '/hr/api/HRStaffQuit/PostAddEditStaffQuitSave',
  GetQuitUserInfo: '/hr/api/HRStaffQuit/GetQuitUserInfo',
  GetStaffQuitInfo: '/hr/api/HRStaffQuit/GetStaffQuitInfo',
  PostAddEditPostTransferSave:
    '/hr/api/HRPostTransfer/PostAddEditPostTransferSave',
  GetPostTransferInfo: '/hr/api/HRPostTransfer/GetPostTransferInfo',
  PostAddEditAdjustSalarySave:
    '/hr/api/HRAdjustSalary/PostAddEditAdjustSalarySave',
  GetAdjustSalaryInfo: '/hr/api/HRAdjustSalary/GetAdjustSalaryInfo'
}
// 新增/修改 人事去向 转正申请
export function PostAddTrendPositive(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddTrendPositive,
    method: 'post',
    data: param
  })
}
//查询人事去向列表
export function GetTrendPositivePage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetTrendPositivePage,
    method: 'get',
    params: param
  })
}
// 根据Id  查询转正申请
export function GetTrendPositiveInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetTrendPositiveInfo + '/' + Id,
    method: 'get'
  })
}
// 新增/修改 人事去向 离职申请
export function PostAddEditStaffQuitSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditStaffQuitSave,
    method: 'post',
    data: param
  })
}
//查询人事去向用户详情
export function GetQuitUserInfo(): Promise<IResponse> {
  return request({
    url: api.GetQuitUserInfo,
    method: 'get'
  })
}
// 根据Id  查询离职申请
export function GetStaffQuitInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetStaffQuitInfo + '/' + Id,
    method: 'get'
  })
}
// 新增/修改 人事去向 调岗申请
export function PostAddEditPostTransferSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditPostTransferSave,
    method: 'post',
    data: param
  })
}
// 根据Id  查询调岗申请
export function GetPostTransferInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetPostTransferInfo + '/' + Id,
    method: 'get'
  })
}
// 新增/修改 人事去向 调薪申请
export function PostAddEditAdjustSalarySave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditAdjustSalarySave,
    method: 'post',
    data: param
  })
}
// 根据Id  查询调薪申请
export function GetAdjustSalaryInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetAdjustSalaryInfo + '/' + Id,
    method: 'get'
  })
}
