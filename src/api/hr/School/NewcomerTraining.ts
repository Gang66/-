import request from "/@/utils/request";
const api = {
  GetCurrentNewestPlanStore: "/hr/api/TrainWork/GetCurrentNewestPlanStore",
  GetNewTrainUser: "/hr/api/TrainWork/GetNewTrainUser",
  GetAddUserNewestPlan: "/hr/api/TrainWork/GetAddUserNewestPlan",
};
// 商学院获取新人营地列表数据 false 为当前学习 true 学习记录
export function GetCurrentNewestPlanStore(data: any): Promise<IResponse> {
  return request({
    url: api.GetCurrentNewestPlanStore + '/' + data,
    method: "get",
  });
}
//新人营地导师和hr
export function GetNewTrainUser(): Promise<IResponse> {
  return request({
    url: api.GetNewTrainUser,
    method: "get",
  });
}
//创建新人训计划
export function GetAddUserNewestPlan(): Promise<IResponse> {
  return request({
    url: api.GetAddUserNewestPlan,
    method: "get",
  });
}