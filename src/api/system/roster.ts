import request from "/@/utils/request";
const api = {
  GetEmployeeRosterPage: "/hr/api/SysEmployeeRoster/GetEmployeeRosterPage",
  PostAddEditEmployeeRosterSave: "/hr/api/SysEmployeeRoster/PostAddEditEmployeeRosterSave",
  GettEmployeeRosterInfo: "/hr/api/SysEmployeeRoster/GetEmployeeRosterInfo",
};
// 岗位类型列表数据
export function GetEmployeeRosterPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetEmployeeRosterPage,
    method: "get",
    params: param,
  });
}
// 花名册管理
export function PostAddEditEmployeeRosterSave(param: Object): Promise<IResponse> {
  return request({
    url: api.PostAddEditEmployeeRosterSave,
    method: "post",
    data: param,
  });
}
// 获取岗位类型和岗位（1 类型 2岗位）
export function GettEmployeeRosterInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GettEmployeeRosterInfo + "/" + param,
    method: "get",
  });
}
