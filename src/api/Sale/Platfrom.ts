import request from '/@/utils/request'
const api = {
    PostAddOrEditQualifications: '/sale/api/Platfrom/PostAddOrEditQualifications',
    GetQualificationsById: '/sale/api/Platfrom/GetQualificationsById',
    GetQualificationsList: '/sale/api/Platfrom/GetQualificationsList',
    GetDelQualifications: '/sale/api/Platfrom/GetDelQualifications',
    GetQualificationsByCompanyId: '/sale/api/Platfrom/GetQualificationsByCompanyId',

    PostAddOrEditPlatfrom: '/sale/api/Platfrom/PostAddOrEditPlatfrom',
    GetPlatfromList: '/sale/api/Platfrom/GetPlatfromList',
    GetPlatfromById: '/sale/api/Platfrom/GetPlatfromById',
    PostAddPlatfromApprove: '/sale/api/Platfrom/PostAddPlatfromApprove',
    GetPlatfromApprove: '/sale/api/Platfrom/GetPlatfromApprove',

    PostApprovalPlatform: '/sale/api/Platfrom/PostApprovalPlatform',

}
///添加或修改企业资质
export function PostAddOrEditQualifications(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditQualifications,
        method: 'post',
        data: param,
        
    })
}
//获取企业资质详情
export function GetQualificationsById(param: any):Promise<IResponse> {
    return request({
        url: api.GetQualificationsById,
        method: 'get',
        params: param
    })
}

//根据企业id获取资质列表
export function GetQualificationsByCompanyId(param: any):Promise<IResponse> {
    return request({
        url: api.GetQualificationsByCompanyId,
        method: 'get',
        params: param
    })
}
//获取企业资质列表
export function GetQualificationsList(param: any):Promise<IResponse> {
    return request({
        url: api.GetQualificationsList,
        method: 'get',
        params: param
    })
}
//删除企业资质
export function GetDelQualifications(param: any):Promise<IResponse> {
    return request({
        url: api.GetDelQualifications,
        method: 'get',
        params: param
    })
}

///添加或修改平台
export function PostAddOrEditPlatfrom(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditPlatfrom,
        method: 'post',
        data: param,
        
    })
}

//获取平台列表
export function GetPlatfromList(param: any):Promise<IResponse> {
    return request({
        url: api.GetPlatfromList,
        method: 'get',
        params: param
    })
}

//获取平台详情
export function GetPlatfromById(param: any):Promise<IResponse> {
    return request({
        url: api.GetPlatfromById,
        method: 'get',
        params: param
    })
}

///提交查看密码
export function PostAddPlatfromApprove(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddPlatfromApprove,
        method: 'post',
        data: param,
        
    })
}

//获取查看密码详情
export function GetPlatfromApprove(param: any):Promise<IResponse> {
    return request({
        url: api.GetPlatfromApprove,
        method: 'get',
        params: param
    })
}

// 审批平台
export function PostApprovalPlatform(param: any):Promise<IResponse> {
    return request({
        url: api.PostApprovalPlatform,
        method: 'post',
        data: param
    })
}
