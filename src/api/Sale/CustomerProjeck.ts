import request from '/@/utils/request'
const api = {
    PostAddProject: '/sale/api/CustomerProject/PostAddProject',
    GetProjectList: '/sale/api/CustomerProject/GetProjectList',
    GetProjectById: '/sale/api/CustomerProject/GetProjectById',
    GetProjectFollowList: '/sale/api/CustomerProject/GetProjectFollowList',
    GetHighSeasContentInfoPage: '/sale/api/CustomerProject/GetHighSeasContentInfoPage',
    GetZxwContentInfo: '/sale/api/CustomerProject/GetZxwContentInfo',
    GetZxwProjectIsClaim: '/sale/api/CustomerProject/GetZxwProjectIsClaim',

    GetProjectIndexInfo: '/sale/api/CustomerProject/GetProjectIndexInfo',
    GetProjectRankByDept: '/sale/api/CustomerProject/GetProjectRankByDept',
    GetFormalUserRankProject: '/sale/api/CustomerProject/GetFormalUserRankProject',
}


// 获取项目库主页分析
export function GetProjectIndexInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetProjectIndexInfo,
        method: 'get',
        params: param
    })
}
// 项目库部门分布看板
export function GetProjectRankByDept(param: any):Promise<IResponse> {
    return request({
        url: api.GetProjectRankByDept,
        method: 'get',
        params: param
    })
}
// 项目库正式员工排行榜
export function GetFormalUserRankProject(param: any):Promise<IResponse> {
    return request({
        url: api.GetFormalUserRankProject,
        method: 'get',
        params: param
    })
}

///添加项目
export function PostAddProject(param: any):Promise<IResponse> {
    return request({
        url: api.PostAddProject,
        method: 'post',
        data: param
    })
}
// 获取项目列表
export function GetProjectList(param: any):Promise<IResponse> {
    return request({
        url: api.GetProjectList,
        method: 'get',
        params: param
    })
}
// 获取项目详情
export function GetProjectById(param: any):Promise<IResponse> {
    return request({
        url: api.GetProjectById,
        method: 'get',
        params: param
    })
}
// 根据项目id获取跟踪详情
export function GetProjectFollowList(param: any):Promise<IResponse> {
    return request({
        url: api.GetProjectFollowList,
        method: 'get',
        params: param
    })
}
// 公海项目列表
export function GetHighSeasContentInfoPage(param: any):Promise<IResponse> {
    return request({
        url: api.GetHighSeasContentInfoPage,
        method: 'get',
        params: param
    })
}
// 获取公海项目详情
export function GetZxwContentInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetZxwContentInfo,
        method: 'get',
        params: param
    })
}
// 判断项目是否可以领取
export function GetZxwProjectIsClaim(param: any):Promise<IResponse> {
    return request({
        url: api.GetZxwProjectIsClaim,
        method: 'get',
        params: param
    })
}
