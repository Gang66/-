import request from '/@/utils/request'
const api = {
    PostAddMarkUp: '/sale/api/MarkUp/PostAddMarkUp',
    GetMarkUpHistoryListById: '/sale/api/MarkUp/GetMarkUpHistoryListById',
    GetMarkUpById: '/sale/api/MarkUp/GetMarkUpById',
    PostOrderMarkUpInfo: '/sale/api/MarkUp/PostOrderMarkUpInfo',
}
//添加加价
export function PostAddMarkUp(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddMarkUp,
        method: 'post',
        data: param,
        
    })
}
///获取加价历史记录
export function GetMarkUpHistoryListById(param: any):Promise<IResponse> {
    return request({
        url: api.GetMarkUpHistoryListById,
        method: 'get',
        params: param
    })
}
///获取加价详情
export function GetMarkUpById(param: any):Promise<IResponse> {
    return request({
        url: api.GetMarkUpById,
        method: 'get',
        params: param
    })
}
//根据报价单id和加价id获取报价单详情和加价详情
export function PostOrderMarkUpInfo(param:any):Promise<IResponse> {
    return request({
        url: api.PostOrderMarkUpInfo,
        method: 'post',
        data: param,
        
    })
}

