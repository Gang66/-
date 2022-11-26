import { pa } from 'element-plus/lib/locale'
import request from '/@/utils/request'
const api = {
  // 菜单管理
  GetMenuList: '/hr/api/Menu/GetMenuList',
  AddMenuSave: '/hr/api/Menu/AddMenuSave',
  EditMenuSave: '/hr/api/Menu/EditMenuSave',

  // 个人绑定菜单
  GetUserList: '/hr/api/MenuBind/GetUserList',
  GetMenulistForUserList: '/hr/api/MenuBind/GetMenulistForUserList',
  EditUserBindMenuSave: '/hr/api/MenuBind/EditUserBindMenuSave',

  // 岗位绑定菜单
  GetPostList: '/hr/api/MenuBind/GetPostList',
  GetMenulistForPostList: '/hr/api/MenuBind/GetMenulistForPostList',
  EditPostBindMenuSave: '/hr/api/MenuBind/EditPostBindMenuSave',

  // 岗位个性化菜单
  GetPostMenuCustomList: '/hr/api/Menu/GetPostMenuCustomList',
  // 添加岗位自定义分组
  AddPostMenuGroupCustomSave: '/hr/api/Menu/AddPostMenuGroupCustomSave',
  // 删除岗位自定义分组
  EditDeletePostMenuGroupCustomSave: '/hr/api/Menu/EditDeletePostMenuGroupCustomSave',
  // 保存岗位个性化菜单编辑
  EditPostMenuCustomSave: '/hr/api/Menu/EditPostMenuCustomSave',

  // 岗位个性化菜单
  GetUserMenuCustomList: '/hr/api/Menu/GetUserMenuCustomList',
  // 添加岗位自定义分组
  AddUserMenuGroupCustomSave: '/hr/api/Menu/AddUserMenuGroupCustomSave',
  // 删除岗位自定义分组
  EditDeleteUserMenuGroupCustomSave: '/hr/api/Menu/EditDeleteUserMenuGroupCustomSave',
  // 保存岗位个性化菜单编辑
  EditUserMenuCustomSave: '/hr/api/Menu/EditUserMenuCustomSave',

  ///APP菜单管理
  GetAppMenuList: '/hr/api/AppMenu/GetAppMenuList',
  AddAppMenuSave: '/hr/api/AppMenu/AddAppMenuSave',
  EditAppMenuSave: '/hr/api/AppMenu/EditAppMenuSave',

  // APP个人绑定菜单
  GetAppMenulistForUserList: '/hr/api/AppMenuBind/GetAppMenulistForUserList',
  EditAppUserBindMenuSave: '/hr/api/AppMenuBind/EditAppUserBindMenuSave',

  //APP岗位绑定菜单
  GetAppMenulistForPostList: '/hr/api/AppMenuBind/GetAppMenulistForPostList',
  EditAppPostBindMenuSave: '/hr/api/AppMenuBind/EditAppPostBindMenuSave',

  // app岗位个性化菜单
  GetAppUserMenuCustomList: '/hr/api/AppMenu/GetAppUserMenuCustomList',
  // app岗位个性化菜单
  GetAppPostMenuCustomList: '/hr/api/AppMenu/GetAppPostMenuCustomList',
  // app添加岗位自定义分组
  AddAppPostMenuGroupCustomSave: '/hr/api/AppMenu/AddAppPostMenuGroupCustomSave',
  // app删除岗位自定义分组
  EditDeleteAppPostMenuGroupCustomSave: '/hr/api/AppMenu/EditDeleteAppPostMenuGroupCustomSave',
  // app保存岗位个性化菜单编辑
  EditAppPostMenuCustomSave: '/hr/api/AppMenu/EditAppPostMenuCustomSave',
  // app添加岗位自定义分组
  AddAppUserMenuGroupCustomSave: '/hr/api/AppMenu/AddAppUserMenuGroupCustomSave',
  // app删除岗位自定义分组
  EditDeleteAppUserMenuGroupCustomSave: '/hr/api/AppMenu/EditDeleteAppUserMenuGroupCustomSave',
  // 保存岗位个性化菜单编辑
  EditAppUserMenuCustomSave: '/hr/api/AppMenu/EditAppUserMenuCustomSave'
}
// 所有页面列表
export function GetMenuList(param: any): Promise<IResponse> {
  return request({
    url: api.GetMenuList,
    method: 'get'
  })
}
// 编辑页面
export function EditMenuSave(param: Object): Promise<IResponse> {
  return request({
    url: api.EditMenuSave,
    method: 'post',
    data: param
  })
}
//	添加页面
export function AddMenuSave(param: Object): Promise<IResponse> {
  return request({
    url: api.AddMenuSave,
    method: 'post',
    data: param
  })
}

//	获取用户列表
export function GetUserList(param: Object): Promise<IResponse> {
  return request({
    url: api.GetUserList,
    method: 'get',
    data: param
  })
}
interface GetUserMenuListParam {
  UserId: number
  MenuName: string
  MenuPath: string
}
//	获取用户菜单授权列表
export function GetMenulistForUserList(param: GetUserMenuListParam): Promise<IResponse> {
  return request({
    url: `${api.GetMenulistForUserList}?UserId=${param.UserId}&MenuName=${param.MenuName}&MenuPath=${param.MenuPath}`,
    method: 'get'
  })
}

interface EditUserMenuData {
  MenuId: number
  PermissionId: number
  State: boolean
}
// 编辑用户菜单及指令授权
export function EditUserBindMenuSave(param: EditUserMenuData): Promise<IResponse> {
  return request({
    url: api.EditUserBindMenuSave,
    method: 'post',
    data: param
  })
}

//	获取岗位列表
export function GetPostList(): Promise<IResponse> {
  return request({
    url: api.GetPostList,
    method: 'get'
  })
}

interface GetPostMenuListParam {
  PostId: number
  MenuName: string
  MenuPath: string
}

//	获取岗位菜单授权列表
export function GetMenulistForPostList(param: GetPostMenuListParam): Promise<IResponse> {
  return request({
    url: `${api.GetMenulistForPostList}?PostId=${param.PostId}&MenuName=${param.MenuName}&MenuPath=${param.MenuPath}`,
    method: 'get'
  })
}

interface EditPostMenuData {
  PostId: number
  MenuId: number
  PermissionId: number
  State: boolean
}
// 编辑岗位菜单及指令授权
export function EditPostBindMenuSave(param: EditPostMenuData): Promise<IResponse> {
  return request({
    url: api.EditPostBindMenuSave,
    method: 'post',
    data: param
  })
}

// 岗位个性化菜单
export function GetPostMenuCustomList(param: number): Promise<IResponse> {
  return request({
    url: `${api.GetPostMenuCustomList}/${param}`,
    method: 'get'
  })
}

//	添加岗位自定义分组
export function AddPostMenuGroupCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.AddPostMenuGroupCustomSave,
    method: 'post',
    data: param
  })
}

// 删除岗位自定义分组
export function EditDeletePostMenuGroupCustomSave(param: number): Promise<IResponse> {
  return request({
    url: `${api.EditDeletePostMenuGroupCustomSave}/${param}`,
    method: 'post'
  })
}

// 保存岗位个性化菜单编辑
export function EditPostMenuCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.EditPostMenuCustomSave,
    method: 'post',
    data: param
  })
}

// 个性化菜单
export function GetUserMenuCustomList(param: number): Promise<IResponse> {
  return request({
    url: `${api.GetUserMenuCustomList}/${param}`,
    method: 'get'
  })
}
//	添加个人自定义分组
export function AddUserMenuGroupCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.AddUserMenuGroupCustomSave,
    method: 'post',
    data: param
  })
}
// 删除个人自定义分组
export function EditDeleteUserMenuGroupCustomSave(param: number): Promise<IResponse> {
  return request({
    url: `${api.EditDeleteUserMenuGroupCustomSave}/${param}`,
    method: 'post'
  })
}

// 保存个人个性化菜单编辑
export function EditUserMenuCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.EditUserMenuCustomSave,
    method: 'post',
    data: param
  })
}

// app所有页面列表
export function GetAppMenuList(param: any): Promise<IResponse> {
  return request({
    url: api.GetAppMenuList,
    method: 'get'
  })
}
// app编辑页面
export function EditAppMenuSave(param: Object): Promise<IResponse> {
  return request({
    url: api.EditAppMenuSave,
    method: 'post',
    data: param
  })
}
//	app 添加页面
export function AddAppMenuSave(param: Object): Promise<IResponse> {
  return request({
    url: api.AddAppMenuSave,
    method: 'post',
    data: param
  })
}
//	app获取用户菜单授权列表
export function GetAppMenulistForUserList(param: GetUserMenuListParam): Promise<IResponse> {
  return request({
    url: `${api.GetAppMenulistForUserList}?UserId=${param.UserId}&MenuName=${param.MenuName}&MenuPath=${param.MenuPath}`,
    method: 'get'
  })
}
// app岗位个性化菜单
export function GetAppUserMenuCustomList(param: number): Promise<IResponse> {
  return request({
    url: `${api.GetAppUserMenuCustomList}/${param}`,
    method: 'get'
  })
}
// app编辑用户菜单及指令授权
export function EditAppUserBindMenuSave(param: EditUserMenuData): Promise<IResponse> {
  return request({
    url: api.EditAppUserBindMenuSave,
    method: 'post',
    data: param
  })
}
//	app获取岗位菜单授权列表
export function GetAppMenulistForPostList(param: GetPostMenuListParam): Promise<IResponse> {
  return request({
    url: `${api.GetAppMenulistForPostList}?PostId=${param.PostId}&MenuName=${param.MenuName}&MenuPath=${param.MenuPath}`,
    method: 'get'
  })
}
// app编辑岗位菜单及指令授权
export function EditAppPostBindMenuSave(param: EditPostMenuData): Promise<IResponse> {
  return request({
    url: api.EditAppPostBindMenuSave,
    method: 'post',
    data: param
  })
}
// app岗位个性化菜单
export function GetAppPostMenuCustomList(param: number): Promise<IResponse> {
  return request({
    url: `${api.GetAppPostMenuCustomList}/${param}`,
    method: 'get'
  })
}
//	app添加岗位自定义分组
export function AddAppPostMenuGroupCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.AddAppPostMenuGroupCustomSave,
    method: 'post',
    data: param
  })
}
// app删除岗位自定义分组
export function EditDeleteAppPostMenuGroupCustomSave(param: number): Promise<IResponse> {
  return request({
    url: `${api.EditDeleteAppPostMenuGroupCustomSave}/${param}`,
    method: 'post'
  })
}
// app保存岗位个性化菜单编辑
export function EditAppPostMenuCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.EditAppPostMenuCustomSave,
    method: 'post',
    data: param
  })
}
//	app添加个人自定义分组
export function AddAppUserMenuGroupCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.AddAppUserMenuGroupCustomSave,
    method: 'post',
    data: param
  })
}
// app删除个人自定义分组
export function EditDeleteAppUserMenuGroupCustomSave(param: number): Promise<IResponse> {
  return request({
    url: `${api.EditDeleteAppUserMenuGroupCustomSave}/${param}`,
    method: 'post'
  })
}
// app保存个人个性化菜单编辑
export function EditAppUserMenuCustomSave(param: Object): Promise<IResponse> {
  return request({
    url: api.EditAppUserMenuCustomSave,
    method: 'post',
    data: param
  })
}
