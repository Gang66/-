import request from "/@/utils/request";
const api = {
  GetUserTree: '/hr/api/SysUser/GetUserTree',
  GetDeptOrCompUserList: '/hr/api/SysUser/GetDeptOrCompUserList',
  GetMasterUserList: '/hr/api/HRInterViewManagement/GetMasterUserList',
  PostUpdateUserInfo: '/hr/api/SysUser/PostUpdateUserInfo',
  GetSaleUserDeptList: "/hr/api/SysUser/GetSaleUserDeptList",
  GetSaleUsetTree: "/hr/api/SysUser/GetSaleUsetTree",
};
// 获取人员组织架构
export function GetSaleUsetTree(): Promise<IResponse> {
  return request({
    url: api.GetSaleUsetTree,
    method: "get",
  });
}
//获取人员组织架构详情
export function GetSaleUserDeptList(): Promise<IResponse> {
  return request({
    url: api.GetSaleUserDeptList,
    method: "get",
  });
}
// 获取人员组织架构
export function GetUserTree(): Promise<IResponse> {
  return request({
    url: api.GetUserTree,
    method: "get",
  });
}
// 根据部门Id获取人员
export function GetDeptOrCompUserList(deptId:number): Promise<IResponse> {
  return request({
    url: api.GetDeptOrCompUserList+'/'+deptId+'/'+1,
    method: "get",
  });
}
// 根据部门Id获取人员 部门领导
export function GetMasterUserList(deptId: number): Promise<IResponse> {
  return request({
    url: api.GetMasterUserList + '/' + deptId,
    method: 'get'
  })
}
// 修改密码
export function PostUpdateUserInfo(param: Object): Promise<IResponse> {
  return request({
    url: api.PostUpdateUserInfo,
    method: 'post',
    data: param
  })
}
