import request from "/@/utils/request";
const api = {
  GetHRInterViewManagementPage: "/hr/api/HRInterViewManagement/GetHRInterViewManagementPage",
  GetApplicationRegInfo: "/hr/api/HRInterViewManagement/GetApplicationRegInfo",
  GetMarkCate: "/hr/api/HRInterViewManagement/GetMarkCate",
  PostAddInterViewHrMarkPointSave: "/hr/api/HRInterViewManagement/PostAddInterViewHrMarkPointSave",
  PostEditInterViewShareExpireTimeSave: "/hr/api/HRInterViewManagement/PostEditInterViewShareExpireTimeSave",
  PostGetInterViewUserTree: "/hr/api/SysUser/PostGetInterViewUserTree",
  PostAddInterViewerSave: "/hr/api/HRInterViewManagement/PostAddInterViewerSave",
  PostAddInterViewerMarkSave: "/hr/api/HRInterViewManagement/PostAddInterViewerMarkSave",
  PostAddSecInterViewerMarkSave: "/hr/api/HRInterViewManagement/PostAddSecInterViewerMarkSave",
  GetInterViewerAssessmentInfo: "/hr/api/HRInterViewManagement/GetInterViewerAssessmentInfo",
  PostPersonnalInterState: "/hr/api/HRInterViewManagement/PostPersonnalInterState",
  PostOneKeyEmployment: "/hr/api/HRInterViewManagement/PostOneKeyEmployment",
  PostEditInterViewComeDate: "/hr/api/HRInterViewManagement/PostEditInterViewComeDate",
  GetSelectInterViewInfo: "/hr/api/HRInterViewManagement/GetSelectInterViewInfo",
};
// 面试管理列表数据
export function GetHRInterViewManagementPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetHRInterViewManagementPage,
    method: "get",
    params: param,
  });
}
// 根据面试Id获取HR登记表信息
export function GetApplicationRegInfo(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetApplicationRegInfo + "/" + param,
    method: "get",
  });
}
// 查询面试官打分试题 0:hr 1:初试官 2:复试官
export function GetMarkCate(param: number): Promise<IResponse> { 
  return request({
    url: api.GetMarkCate + "/" + param,
    method: "get",
  });
}
// 提交HR打分
export function PostAddInterViewHrMarkPointSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddInterViewHrMarkPointSave,
    method: "post",
    data: param,
  });
}
// 面试修改有效时间
export function PostEditInterViewShareExpireTimeSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditInterViewShareExpireTimeSave,
    method: "post",
    data: param,
  });
}
// 选择面试官数据
export function PostGetInterViewUserTree(param: any): Promise<IResponse> {
  return request({
    url: api.PostGetInterViewUserTree,
    method: "post",
    data: param,
  });
}
// 提交选择面试官
export function PostAddInterViewerSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddInterViewerSave,
    method: "post",
    data: param,
  });
}
// 提交面试官打分
export function PostAddInterViewerMarkSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddInterViewerMarkSave,
    method: "post",
    data: param,
  });
}
// 提交复试面试官打分
export function PostAddSecInterViewerMarkSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddSecInterViewerMarkSave,
    method: "post",
    data: param,
  });
}
// 人事经理审核面试
export function PostPersonnalInterState(param: any): Promise<IResponse> {
  return request({
    url: api.PostPersonnalInterState,
    method: "post",
    data: param,
  });
}
// 一键录用
export function PostOneKeyEmployment(param: any): Promise<IResponse> {
  return request({
    url: api.PostOneKeyEmployment,
    method: "post",
    data: param,
  });
}
// 面试评估表详情
export function GetInterViewerAssessmentInfo(param: number): Promise<IResponse> {
  return request({
    url: api.GetInterViewerAssessmentInfo + "/" + param,
    method: "get",
  });
}
// post请求，提交确认入职或确认离职（Type 1入职 2放弃 3转入入职）
export function PostEditInterViewComeDate(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditInterViewComeDate,
    method: "post",
    data: param,
  });
}
// 根据面试Id获取入职信息（附带师傅列表 默认师傅Id ）
export function GetSelectInterViewInfo(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetSelectInterViewInfo + "/" + param,
    method: "get",
  });
}