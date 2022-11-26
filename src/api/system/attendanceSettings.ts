import request from "/@/utils/request";
const api = {
  GetCheckAttendancePage: "/hr/api/CheckAttendance/GetCheckAttendancePage",
  PostAddEditCheckAttendanceSave: "/hr/api/CheckAttendance/PostAddEditCheckAttendanceSave",
  GetDeleteCheckAttendanceSave: "/hr/api/CheckAttendance/GetDeleteCheckAttendanceSave",
  GetCheckAttendanceInfo: "/hr/api/CheckAttendance/GetCheckAttendanceInfo",
  GetCheckAttendancesSelect: "/hr/api/CheckAttendance/GetCheckAttendancesSelect",
  PostAddAttendanceByDepartment: "/hr/api/CheckAttendance/PostAddAttendanceByDepartment",
  GetCheckAttendancesDepartmentList: "/hr/api/CheckAttendance/GetCheckAttendancesDepartmentList",
  PostAddEditCheckAttendanceRecordSave: "/hr/api/CheckAttendanceRecord/PostAddEditCheckAttendanceRecordSave",
  GetCheckAttendanceRecordInfo: "/hr/api/CheckAttendanceRecord/GetCheckAttendanceRecordInfo",
};
// 获取考勤设置列表数据
export function GetCheckAttendancePage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetCheckAttendancePage,
    method: "get",
    params: param,
  });
}
// 新增考勤设置
export function PostAddEditCheckAttendanceSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditCheckAttendanceSave,
    method: "post",
    data: param,
  });
}
// 查看考勤设置详情
export function GetCheckAttendanceInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCheckAttendanceInfo + "/" + param,
    method: "get",
  });
}
// 删除考勤设置列表
export function GetDeleteCheckAttendanceSave(param: any): Promise<IResponse> {
  return request({
    url: api.GetDeleteCheckAttendanceSave + "/" + param,
    method: "get",
  });
}
// 获取考勤设置下拉选
export function GetCheckAttendancesSelect(): Promise<IResponse> {
  return request({
    url: api.GetCheckAttendancesSelect,
    method: "get",
  });
}
// 获取绑定部门的考勤列表数据
export function GetCheckAttendancesDepartmentList(): Promise<IResponse> {
  return request({
    url: api.GetCheckAttendancesDepartmentList,
    method: "get",
  });
}
// 考勤分配提交
export function PostAddAttendanceByDepartment(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddAttendanceByDepartment,
    method: "post",
    data: param,
  });
}
// 添加特殊条款
export function PostAddEditCheckAttendanceRecordSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditCheckAttendanceRecordSave,
    method: "post",
    data: param,
  });
}
// 根据Id获取特殊条款
export function GetCheckAttendanceRecordInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetCheckAttendanceRecordInfo + "/" + param,
    method: "get",
  });
}
