import request from "/@/utils/request";
const api = {
  addPostType: "/hr/api/SysPost/PostAddSysPostSave",
  editPostType: "/hr/api/SysPost/PostEditSysPostTypeSave",
  getPostTypeList: "/hr/api/SysPost/GetSysPostList",
  deletePost: "/hr/api/SysPost/GetDeleteSysPost",
  getPostDetails: "/hr/api/SysPost/GetSysPostinfo",
  getPostBinding: "/hr/api/SysPost/GetPostByDepart",
  setPostBinding: "/hr/api/SysPost/PostAddPostByDepartSave",
  getPostSelect: "/hr/api/SysPost/GetSysPostSelect",
  addPostNatureStandard: "/hr/api/SysPost/PostAddSysPostNatureStandard",
  getPostNatureStandardDetails: "/hr/api/SysPost/GetNatureStandardInfo",
  editPostNatureStandard: "/hr/api/SysPost/PostEditSysPostNatureStandard",
  GetRecruitPostTree: "/hr/api/SysPost/GetRecruitPostTree",
};
// 新增岗位类型和岗位（IsType==1类型 2岗位）
export function addPostType(param: any): Promise<IResponse> {
  return request({
    url: api.addPostType,
    method: "post",
    data: param,
  });
}
// 修改岗位类型和岗位（IsType==1类型 2岗位）
export function editPostType(param: any): Promise<IResponse> {
  return request({
    url: api.editPostType,
    method: "post",
    data: param,
  });
}
// 删除岗位和类型（根据Id删除）
export function deletePost(param: any): Promise<IResponse> {
  return request({
    url: api.deletePost + "/" + param,
    method: "get",
  });
}
// 获取岗位和类型详情（根据Id获取）
export function getPostDetails(param: any): Promise<IResponse> {
  return request({
    url: api.getPostDetails + "/" + param,
    method: "get",
  });
}

// 岗位类型列表数据
export function getPostTypeList(param: any): Promise<IResponse> {
  return request({
    url: api.getPostTypeList,
    method: "get",
    params: param,
  });
}
// 获取岗位绑定数据
export function getPostBinding(param: any, level: any): Promise<IResponse> {
  return request({
    url: api.getPostBinding + "/" + param + "/" + level,
    method: "get",
  });
}
// 绑定岗位数据
export function setPostBinding(param: Object): Promise<IResponse> {
  return request({
    url: api.setPostBinding,
    method: "post",
    data: param,
  });
}
// 获取岗位类型和岗位（1 类型 2岗位）
export function getPostSelect(param: any): Promise<IResponse> {
  return request({
    url: api.getPostSelect + "/" + param,
    method: "get",
  });
}
// 添加性格配比
export function addPostNatureStandard(param: Object): Promise<IResponse> {
  return request({
    url: api.addPostNatureStandard,
    method: "post",
    data: param,
  });
}
// 修改性格配比
export function editPostNatureStandard(param: Object): Promise<IResponse> {
  return request({
    url: api.editPostNatureStandard,
    method: "post",
    data: param,
  });
}
// 获取性格配比详情(根据Id获取)
export function getPostNatureStandardDetails(param: number): Promise<IResponse> {
  return request({
    url: api.getPostNatureStandardDetails + "/" + param,
    method: "get",
  });
}
// 岗位树数据
export function GetRecruitPostTree(): Promise<IResponse> {
  return request({
    url: api.GetRecruitPostTree,
    method: "get",
  });
}
