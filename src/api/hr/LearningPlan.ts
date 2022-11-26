import request from "/@/utils/request";
const api = {
    PostEditWorkStudyPlanSave: "/hr/api/TrainWork/PostEditWorkStudyPlanSave",
    GetWorkStudyPlanPage: "/hr/api/TrainWork/GetWorkStudyPlanPage",
    GetWorkStudyPlanEntity: "/hr/api/TrainWork/GetWorkStudyPlanEntity",
    GetDelWorkStudyPlan: "/hr/api/TrainWork/GetDelWorkStudyPlan",
    PostNewAddNewestPlanStore: "/hr/api/TrainWork/PostNewAddNewestPlanStore",
    PostNewEditNewestPlanStore: "/hr/api/TrainWork/PostNewEditNewestPlanStore",
    GetNewGetNewestPlanStoreById: "/hr/api/TrainWork/GetNewGetNewestPlanStoreById",
    GetNewGetNewestPlanStore: "/hr/api/TrainWork/GetNewGetNewestPlanStore",
    GetDeleteNewestPlanStoreById: "/hr/api/TrainWork/GetDeleteNewestPlanStoreById",
};
// 新增/修改 日常计划
export function PostEditWorkStudyPlanSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostEditWorkStudyPlanSave,
    method: "post",
    data: param,
  });
}
// 日常计划列表数据
export function GetWorkStudyPlanPage(param: Isearch): Promise<IResponse> {
    return request({
      url: api.GetWorkStudyPlanPage,
      method: "get",
      params: param,
    });
  }
// 日常计划详情
export function GetWorkStudyPlanEntity(param: any): Promise<IResponse> {
    return request({
      url: api.GetWorkStudyPlanEntity + "/" + param,
      method: "get",
    });
  }
// 删除日常计划
export function GetDelWorkStudyPlan(param: any): Promise<IResponse> {
    return request({
      url: api.GetDelWorkStudyPlan + "/" + param,
      method: "get",
    });
  }
// 新增 新人计划
export function PostNewAddNewestPlanStore(param: any): Promise<IResponse> {
  return request({
    url: api.PostNewAddNewestPlanStore,
    method: "post",
    data: param,
  });
}
// 修改 新人计划
export function PostNewEditNewestPlanStore(param: any): Promise<IResponse> {
  return request({
    url: api.PostNewEditNewestPlanStore,
    method: "post",
    data: param,
  });
}
// 根据Id查询新人计划详情
export function GetNewGetNewestPlanStoreById(param: any): Promise<IResponse> {
  return request({
    url: api.GetNewGetNewestPlanStoreById + "/" + param,
    method: "get",
  });
}
// 日常计划列表数据
export function GetNewGetNewestPlanStore(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetNewGetNewestPlanStore,
    method: "get",
    params: param,
  });
}
// 根据Id下架新人计划详情
export function GetDeleteNewestPlanStoreById(param: any): Promise<IResponse> {
  return request({
    url: api.GetDeleteNewestPlanStoreById + "/" + param,
    method: "get",
  });
}