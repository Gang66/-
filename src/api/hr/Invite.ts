import request from "/@/utils/request";
const api = {
  PostAddEditHRInviteManagementSave: "/hr/api/HRInviteManagement/PostAddEditHRInviteManagementSave",
  GetHRInviteManagementPage: "/hr/api/HRInviteManagement/GetHRInviteManagementPage",
  GetHRInviteManagementInfo: "/hr/api/HRInviteManagement/GetHRInviteManagementInfo",
  GetInviteUid: "/hr/api/HRInviteManagement/GetInviteUid",
  GetInviteIntoInterview: "/hr/api/HRInviteManagement/GetInviteIntoInterview",
};
// 新增/修改 邀约管理
export function PostAddEditHRInviteManagementSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditHRInviteManagementSave,
    method: "post",
    data: param,
  });
}
// 邀约管理列表数据
export function GetHRInviteManagementPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetHRInviteManagementPage,
    method: "get",
    params: param,
  });
}
// 邀约管理获取Uid
export function GetInviteUid(): Promise<IResponse> {
  return request({
    url: api.GetInviteUid,
    method: "get",
  });
}
// 根据Uid获取邀约管理详情
export function GetHRInviteManagementInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetHRInviteManagementInfo + "/" + param,
    method: "get",
  });
}
// 转入面试
export function GetInviteIntoInterview(param: any): Promise<IResponse> {
  return request({
    url: api.GetInviteIntoInterview + "/" + param,
    method: "get",
  });
}
