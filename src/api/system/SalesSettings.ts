import request from '/@/utils/request'
const api = {
  GetManagerWorkAssesSettingsPage: '/hr/api/HRCustomerWorkAsses/GetManagerWorkAssesSettingsPage',
  GetWorkAssesSettingsPage: '/hr/api/HRCustomerWorkAsses/GetWorkAssesSettingsPage',
  GetWorkSetupKachPage: '/hr/api/HRCustomerWorkSetup/GetWorkSetupKachPage',
  GetWorkSetupKachEntity: '/hr/api/HRCustomerWorkSetup/GetWorkSetupKachEntity',
  PostEditWorkSetupKachSave: '/hr/api/HRCustomerWorkSetup/PostEditWorkSetupKachSave',
  GetDelWorkSetupKach: '/hr/api/HRCustomerWorkSetup/GetDelWorkSetupKach',
  PostWorkAssesSettingsSave: '/hr/api/HRCustomerWorkAsses/PostWorkAssesSettingsSave',
  GetDelWorkAssesSettingsSave: '/hr/api/HRCustomerWorkAsses/GetDelWorkAssesSettingsSave',
  WorkAssesSettingsCCSave: '/hr/api/HRCustomerWorkAsses/WorkAssesSettingsCCSave'
}
// 获取下属员工或部门工作量设置列表
export function GetManagerWorkAssesSettingsPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetManagerWorkAssesSettingsPage,
    method: 'get',
    params: param
  })
}
// 获取客户工作量设置列表
export function GetWorkAssesSettingsPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetWorkAssesSettingsPage,
    method: 'get',
    params: param
  })
}
// 获取业绩设置列表
export function GetWorkSetupKachPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetWorkSetupKachPage,
    method: 'get',
    params: param
  })
}
// 获取业绩设置详情
export function GetWorkSetupKachEntity(Id: number): Promise<IResponse> {
  return request({
    url: api.GetWorkSetupKachEntity + '/' + Id,
    method: 'get'
  })
}
//业绩量设置编辑/新增提交
export function PostEditWorkSetupKachSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditWorkSetupKachSave,
    method: 'post',
    data: param
  })
}
// 删除业绩设置
export function GetDelWorkSetupKach(Id: number): Promise<IResponse> {
  return request({
    url: api.GetDelWorkSetupKach + '/' + Id,
    method: 'get'
  })
}
//工作量考核设置编辑/新增提交
export function PostWorkAssesSettingsSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostWorkAssesSettingsSave,
    method: 'post',
    data: param
  })
}
// 删除客户工作量设置
export function GetDelWorkAssesSettingsSave(Id: number): Promise<IResponse> {
  return request({
    url: api.GetDelWorkAssesSettingsSave + '/' + Id,
    method: 'get'
  })
}
// 提交客户工作量抄送设置保存
export function WorkAssesSettingsCCSave(param: any): Promise<IResponse> {
  return request({
    url: api.WorkAssesSettingsCCSave,
    method: 'post',
    data: param
  })
}
