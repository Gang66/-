import request from "/@/utils/request";
const api = {
  PostAddPlan: "/hr/api/TrainWork/PostInsertEditTrainMakeCoursewarePlanSave",
  GetPlanDetails: "/hr/api/TrainWork/GetTrainMakeCoursewarePlanInfo",
  GetAllPlan: "/hr/api/TrainWork/GetTrainMakeCoursewarePlanList",
  delAllPlan: "/hr/api/TrainWork/GetDeleteTrainMakeCoursewarePlan",
  GetTrainDisCoursewarePlanList: "/hr/api/TrainWork/GetTrainDisCoursewarePlanList",
  GetDistributionPlanCourse: "/hr/api/TrainWork/GetDistributionPlanCourse",
  GetFinishMakePlanCourse: "/hr/api/TrainWork/GetFinishMakePlanCourse",
  PostHRPlanCourseUpload: "/hr/api/TrainWork/PostHRPlanCourseUpload",
};
// 新增课件计划
export function PostAddPlan(data: any): Promise<IResponse> {
  return request({
     url: api.PostAddPlan,
     method: "POST",
    data:data,
  });
}
// 获取课件内容详情
export function GetPlanDetails(id:any,params: any): Promise<IResponse> {
  return request({
     url: api.GetPlanDetails +'/' +id,
     method: "GET",
    params,
  });
}
// 获取所有课件内容
export function GetAllPlan(params: any): Promise<IResponse> {
  return request({
     url: api.GetAllPlan,
     method: "GET",
    params:params,
  });
}
// 删除课件内容
export function DelPlan(id:any): Promise<IResponse> {
  return request({
     url: api.delAllPlan + '/' + id,
     method: "GET",
  });
}
// 获取分配人员课件计划
export function GetTrainDisCoursewarePlanList(params:any): Promise<IResponse> {
  return request({
     url: api.GetTrainDisCoursewarePlanList,
    method: "GET",
     params:params,
  });
}
// 点击提交分配
export function GetDistributionPlanCourse(params:any): Promise<IResponse> {
  return request({
     url: api.GetDistributionPlanCourse,
    method: "GET",
     params:params,
  });
}
// 点击切换状态
export function GetFinishMakePlanCourse(params:any): Promise<IResponse> {
  return request({
     url: api.GetFinishMakePlanCourse ,
    method: "GET",
    params:params,
  });
}
// 上传课件计划文件
export function PostHRPlanCourseUpload(data:any): Promise<IResponse> {
  return request({
     url: api.PostHRPlanCourseUpload ,
    method: "POST",
    data:data,
  });
}