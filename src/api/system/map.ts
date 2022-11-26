import request from "/@/utils/request";
const api = {
  GetPositionSettingPage: "/hr/api/HRPositionSetting/GetPositionSettingPage",
  PostAddEditRegionSettingSave: "/hr/api/HRPositionSetting/PostAddEditRegionSettingSave",
  GetPositionSettingInfo: "/hr/api/HRPositionSetting/GetPositionSettingInfo",
};
// 位置设置列表
export function GetPositionSettingPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetPositionSettingPage,
    method: "get",
    params: param,
  });
}
// 添加位置设置
export function PostAddEditRegionSettingSave(param: Object): Promise<IResponse> {
  return request({
    url: api.PostAddEditRegionSettingSave,
    method: "post",
    data: param,
  });
}
// 获取位置详情（根据Id获取）
export function GetPositionSettingInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetPositionSettingInfo + "/" + param,
    method: "get",
  });
}
