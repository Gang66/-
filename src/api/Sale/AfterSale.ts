import request from '/@/utils/request'
const api = {
    PostAddAfterSalesInfo: '/sale/api/AfterSales/PostAddAfterSalesInfo',
    GetAfterSalesById: '/sale/api/AfterSales/GetAfterSalesById',
    GetAfterSalesList: '/sale/api/AfterSales/GetAfterSalesList',


    PostAddReturnProductseInfo: '/sale/api/AfterSales/PostAddReturnProductseInfo',
    GetReturnProductseInfo: '/sale/api/AfterSales/GetReturnProductseInfo',
    GetReturnProductseList: '/sale/api/AfterSales/GetReturnProductseList',


    PostAddInvoicingInfo: '/sale/api/AfterSales/PostAddInvoicingInfo',
    GetInvoicingInfo: '/sale/api/AfterSales/GetInvoicingInfo',
    GetInvoicingList: '/sale/api/AfterSales/GetInvoicingList',

}
//添加或修改售后
export function PostAddAfterSalesInfo(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddAfterSalesInfo,
        method: 'post',
        data: param,
        
    })
}
///获取售后详情
export function GetAfterSalesById(param: any):Promise<IResponse> {
    return request({
        url: api.GetAfterSalesById,
        method: 'get',
        params: param
    })
}
///获取售后列表
export function GetAfterSalesList(param: any):Promise<IResponse> {
    return request({
        url: api.GetAfterSalesList,
        method: 'get',
        params: param
    })
}

///添加退货
export function PostAddReturnProductseInfo(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddReturnProductseInfo,
        method: 'post',
        data: param,
        
    })
}
///获取退货列表
export function GetReturnProductseList(param: any):Promise<IResponse> {
    return request({
        url: api.GetReturnProductseList,
        method: 'get',
        params: param
    })
}

///获取退货详情
export function GetReturnProductseInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetReturnProductseInfo,
        method: 'get',
        params: param
    })
}


///添加开票
export function PostAddInvoicingInfo(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddInvoicingInfo,
        method: 'post',
        data: param,
        
    })
}
///获取开票详情
export function GetInvoicingInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetInvoicingInfo,
        method: 'get',
        params: param
    })
}

///获取开票列表
export function GetInvoicingList(param: any):Promise<IResponse> {
    return request({
        url: api.GetInvoicingList,
        method: 'get',
        params: param
    })
}

