import request from "/@/utils/request";
const api = {
    GetApprovalStepPage: "/hr/api/StepFlow/GetApprovalStepPage",
    GetStepListTypeHead: "/hr/api/StepFlow/GetStepListTypeHead",
    GetStepList: "/hr/api/StepFlow/GetStepList",
    GetApplyFlowStep: "/hr/api/StepFlow/GetApplyFlowStep",
};
//查询当前人审批管理权限列表
export function GetApprovalStepPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetApprovalStepPage,
    method: "get",
    params: param,
  });
}
//查询当前人审批管理权限头部标题
export function GetStepListTypeHead(): Promise<IResponse> {
  return request({
    url: api.GetStepListTypeHead,
    method: "get",
  });
}
//查询审批流程
export function GetStepList(param: any): Promise<IResponse> {
  return request({
    url: api.GetStepList+'/'+param,
    method: "get",
  });
}
//根据Code DataId  获取业务表的审批记录
export function GetApplyFlowStep(param: any): Promise<IResponse> {
  return request({
    url: api.GetApplyFlowStep,
    method: "get",
    params: param,
  });
}

