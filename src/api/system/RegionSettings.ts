import request from "/@/utils/request";
const api = {
  GetRegionTree: "/hr/api/HRRegionSetting/GetRegionTree",
  PostHRRegionInfoByDepartBind: "/hr/api/HRRegionSetting/PostHRRegionInfoByDepartBind",
  GetHRRegionInfoByDepartInfo: "/hr/api/HRRegionSetting/GetHRRegionInfoByDepartInfo",
};
// 获取区域树
export function GetRegionTree(param: any): Promise<IResponse> {
  return request({
    url: api.GetRegionTree + "/" + param,
    method: "get",
  });
}
// 绑定区域
export function PostHRRegionInfoByDepartBind(param: any): Promise<IResponse> {
  return request({
    url: api.PostHRRegionInfoByDepartBind,
    method: "post",
    data: param,
  });
}
// 获取绑定区域详情（根据部门Id获取）
export function GetHRRegionInfoByDepartInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetHRRegionInfoByDepartInfo + "/" + param,
    method: "get",
  });
}
