import request from '/@/utils/request'
const api = {
    GetReceivableList: '/sale/api/Receivable/GetReceivableList',
    PostAddCollection: '/sale/api/Receivable/PostAddCollection',
    GetCollectionList: '/sale/api/Receivable/GetCollectionList',
    GetCollectionInfo: '/sale/api/Receivable/GetCollectionInfo',
    GetContractCollection: '/sale/api/Receivable/GetContractCollection',
    GetReceivableRankByUserId: '/sale/api/Receivable/GetReceivableRankByUserId',
}
///获取应收列表
export function GetReceivableList(param: any):Promise<IResponse> {
    return request({
        url: api.GetReceivableList,
        method: 'get',
        params: param
    })
}
///获取收款列表
export function GetCollectionList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCollectionList,
        method: 'get',
        params: param
    })
}
///获取收款信息
export function GetCollectionInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetCollectionInfo,
        method: 'get',
        params: param
    })
}
/// 根据合同id获取客户及合同的付款详情
export function GetContractCollection(param: any):Promise<IResponse> {
    return request({
        url: api.GetContractCollection,
        method: 'get',
        params: param
    })
}
///新增收款
export function PostAddCollection(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddCollection,
        method: 'post',
        data: param,
        
    })
}

///获取用户应收排名
export function GetReceivableRankByUserId():Promise<IResponse> {
    return request({
        url: api.GetReceivableRankByUserId,
        method: 'get'
        
    })
}