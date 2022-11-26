import request from "/@/utils/request";
interface postData {
  ParentId: number; //父类Id
  Cls: number; //等级
  Name: string; //部门名称
  Role: string; //部门角色
  SortNo: number; //排序
  Status: string; //部门状态
}
const api = {
  addDept: "/hr/api/SysDepartment/PostAddSysDepartmentSave",
  getDeptTree: "/hr/api/SysDepartment/GetDeptTree",
  getDeptChildrenList: "/hr/api/SysDepartment/GetSysDepartmentChildrenList",
  deleteDept: "/hr/api/SysDepartment/GetDeleteSysDepartmentSave",
  getDeptDetails: "/hr/api/SysDepartment/GetSysDepartmentInfo",
  PostEditSysDepartmentSave: "/hr/api/SysDepartment/PostEditSysDepartmentSave",
  GetTypeDepartList: "/hr/api/SysDepartment/GetTypeDepartList",
  GetDepartByCheckAttendancesinfo: "/hr/api/CheckAttendance/GetDepartByCheckAttendancesinfo",
};
// 新增部门
export function addDept(param: postData): Promise<IResponse<postData>> {
  return request({
    url: api.addDept,
    method: "post",
    data: param,
  });
}
// 修改部门
export function PostEditSysDepartmentSave(param: postData): Promise<IResponse<postData>> {
  return request({
    url: api.PostEditSysDepartmentSave,
    method: "post",
    data: param,
  });
}
// 获取组织架构
export function getDeptTree(): Promise<IResponse> {
  return request({
    url: api.getDeptTree,
    method: "get",
  });
}
// 组织架构列表 根据父类 ParentId查询下级列表数据
export function getDeptChildrenList(param: any, level: any): Promise<IResponse> {
  return request({
    url: api.getDeptChildrenList + "/" + param + "/" + level,
    method: "get",
  });
}
// 删除部门
export function deleteDept(param: any): Promise<IResponse> {
  return request({
    url: api.deleteDept + "/" + param,
    method: "get",
  });
}
// 获取部门详情
export function getDeptDetails(param: any): Promise<IResponse> {
  return request({
    url: api.getDeptDetails + "/" + param,
    method: "get",
  });
}
// 获取部门 1事业部 2部门 3大区
export function GetTypeDepartList(param: any): Promise<IResponse> {
  return request({
    url: api.GetTypeDepartList + "/" + param,
    method: "get",
  });
}
// 点击查看当前部门考勤详情
export function GetDepartByCheckAttendancesinfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetDepartByCheckAttendancesinfo + "/" + param,
    method: "get",
  });
}
