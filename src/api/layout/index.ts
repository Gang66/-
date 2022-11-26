import request from '/@/utils/request'
import { IMenubarList } from '/@/type/store/layout'

const api = {
    // login: '/api/User/login',
    login: '/hr/api/System/PostLogOn',
    PostGetQRCodeLoginInfo: '/hr/api/System/PostGetQRCodeLoginInfo',
    // getUser: '/api/User/getUser',
    getUser: '/hr/api/System/GetUserInfo',
    GetUserinformation: '/hr/api/SysUser/GetUserinformation',
    // getRouterList: '/api/User/getRoute',
    getRouterList: "/hr/api/Menu/GetCustomMenubarList",
    publickey: '/api/User/Publickey',
    getNewToken: '/hr/api/System/PostRefreshToAccessToken',
    GetAllUserList:'/hr/api/SysUser/GetAllUserList',
    GetUserAllList:'/hr/api/CommonData/GetUserAllList',
}

export interface loginParam {
    username: string,
    password: string,
    Loginkey:string,
}

export interface ILoginData {
    AccessToken: string,
    RefreshToken: string
}

export function login(param: loginParam):Promise<IResponse<ILoginData>> {
    return request({
        url: api.login,
        method: 'post',
        data: param
    })
}
// 监听扫码登录接口
export function PostGetQRCodeLoginInfo(param: any): Promise<IResponse> {
    return request({
      url: api.PostGetQRCodeLoginInfo,
      method: "post",
      data: param
    });
  }
// 获取新的Token
export function getNewToken(param: ILoginData): Promise<IResponse<ILoginData>> {
    return request({
        url: api.getNewToken,
        method: 'post',
        data: param
        // params:{ oldAccessToken }
    })
}

export function publickey():Promise<IResponse<string>> {
    return request({
        url: api.publickey,
        method: 'get'
    })
}

interface IGetuserRes {
    Id:number
    RealName: string
    UserName: string
    role: Array<string>
}

export function getUser(): Promise<IResponse<IGetuserRes>> {
    return request({
        url: api.getUser,
        method: 'get'
    })
}

export function getRouterList(): Promise<IResponse<Array<IMenubarList>>> {
    return request({
        url: api.getRouterList,
        method: 'get'
    })
}

export function GetUserinformation(param: any): Promise<IResponse> {
    return request({
      url: api.GetUserinformation+'/'+param,
      method: "get",
    });
  }
  
export function GetAllUserList(): Promise<IResponse> {
    return request({
      url: api.GetAllUserList,
      method: "get",
    });
  }
export function GetUserAllList(): Promise<IResponse> {
    return request({
      url: api.GetUserAllList,
      method: "get",
    });
  }
