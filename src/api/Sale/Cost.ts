import request from '/@/utils/request'
const api = {
    PostAddOrEditCostOther: '/sale/api/Cost/PostAddOrEditCostOther',
    PostApprovalCostOther: '/sale/api/Cost/PostApprovalCostOther',
    GetCostOtherById: '/sale/api/Cost/GetCostOtherById',
    GetCostOtherList: '/sale/api/Cost/GetCostOtherList',

    PostAddOrEditEntertainment: '/sale/api/Cost/PostAddOrEditEntertainment',
    PostApprovalCostEntertainment: '/sale/api/Cost/PostApprovalCostEntertainment',
    GetCostEntertainmentById: '/sale/api/Cost/GetCostEntertainmentById',
    GetCostEntertainmentList: '/sale/api/Cost/GetCostEntertainmentList',

    PostAddOrEditGift: '/sale/api/Cost/PostAddOrEditGift',
    PostApprovalCostGift: '/sale/api/Cost/PostApprovalCostGift',
    GetCostGiftById: '/sale/api/Cost/GetCostGiftById',
    GetCostGiftList: '/sale/api/Cost/GetCostGiftList',

    PostAddOrEditCostSample: '/sale/api/Cost/PostAddOrEditCostSample',
    PostApprovalCostSample: '/sale/api/Cost/PostApprovalCostSample',
    GetCostSampleById: '/sale/api/Cost/GetCostSampleById',
    GetCostSampleList: '/sale/api/Cost/GetCostSampleList',

    PostAddIntermediatorCost: '/sale/api/Cost/PostAddIntermediatorCost',
    GetCostIntermediatorList: '/sale/api/Cost/GetCostIntermediatorList',
    GetCostIntermediatorInfo: '/sale/api/Cost/GetCostIntermediatorInfo',
    PostApprovalCostIntermediator: '/sale/api/Cost/PostApprovalCostIntermediator',

    GetCostEntertainmentConfirmList: '/sale/api/Cost/GetCostEntertainmentConfirmList',
    GetCostGiftConfirmList: '/sale/api/Cost/GetCostGiftConfirmList',
    GetCostOtherConfirmList: '/sale/api/Cost/GetCostOtherConfirmList',
    GetCostIntermediatorConfirmList: '/sale/api/Cost/GetCostIntermediatorConfirmList',

    PostConfirmCostEntertainment: '/sale/api/Cost/PostConfirmCostEntertainment',
    PostConfirmCostGift: '/sale/api/Cost/PostConfirmCostGift',
    PostConfirmCostOther: '/sale/api/Cost/PostConfirmCostOther',
    PostConfirmCostIntermediator: '/sale/api/Cost/PostConfirmCostIntermediator',

    GetCostEntertainmentAnalysis: '/sale/api/Cost/GetCostEntertainmentAnalysis',
    GetCostGiftAnalysis: '/sale/api/Cost/GetCostGiftAnalysis',
    GetCostOtherAnalysis: '/sale/api/Cost/GetCostOtherAnalysis',
    GetCostSampleAnalysis: '/sale/api/Cost/GetCostSampleAnalysis',
    GetCostIntermediatorAnalysis: '/sale/api/Cost/GetCostIntermediatorAnalysis'
}
//添加或修改其他费
export function PostAddOrEditCostOther(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditCostOther,
        method: 'post',
        data: param,
        
    })
}
//审批其它费
export function PostApprovalCostOther(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostOther,
        method: 'post',
        data: param,
        
    })
}
//获取其它费详情
export function GetCostOtherById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherById,
        method: 'get',
        params: param
    })
}
//获取其它费列表
export function GetCostOtherList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherList,
        method: 'get',
        params: param
    })
}

//添加或修改招待费
export function PostAddOrEditEntertainment(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditEntertainment,
        method: 'post',
        data: param,
        
    })
}
//审批招待费
export function PostApprovalCostEntertainment(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostEntertainment,
        method: 'post',
        data: param,
        
    })
}
//获取招待费详情
export function GetCostEntertainmentById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentById,
        method: 'get',
        params: param
    })
}
//获取招待费列表
export function GetCostEntertainmentList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentList,
        method: 'get',
        params: param
    })
}


//添加或修改礼品费
export function PostAddOrEditGift(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditGift,
        method: 'post',
        data: param,
        
    })
}
//审批礼品费
export function PostApprovalCostGift(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostGift,
        method: 'post',
        data: param,
        
    })
}
//获取礼品费详情
export function GetCostGiftById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftById,
        method: 'get',
        params: param
    })
}
//获取礼品费列表
export function GetCostGiftList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftList,
        method: 'get',
        params: param
    })
}

//添加或修改样品
export function PostAddOrEditCostSample(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditCostSample,
        method: 'post',
        data: param,
        
    })
}
//审批样品费
export function PostApprovalCostSample(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostSample,
        method: 'post',
        data: param,
        
    })
}
//获取样品费详情
export function GetCostSampleById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostSampleById,
        method: 'get',
        params: param
    })
}
//获取样品费列表
export function GetCostSampleList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostSampleList,
        method: 'get',
        params: param
    })
}

// 新增居间费
export function PostAddIntermediatorCost(param: any):Promise<IResponse> {
    return request({
        url: api.PostAddIntermediatorCost,
        method: 'post',
        data: param
    })
}
// 居间费列表
export function GetCostIntermediatorList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorList,
        method: 'get',
        params: param
    })
}
// 居间费详情
export function GetCostIntermediatorInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorInfo,
        method: 'get',
        params: param
    })
}
// 居间费审批
export function PostApprovalCostIntermediator(param: any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostIntermediator,
        method: 'post',
        data: param
    })
}
// 获取招待费确认列表
export function GetCostEntertainmentConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentConfirmList,
        method: 'get',
        params: param
    })
}
// 获取礼品费确认列表
export function GetCostGiftConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftConfirmList,
        method: 'get',
        params: param
    })
}
// 获取其他费确认列表
export function GetCostOtherConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherConfirmList,
        method: 'get',
        params: param
    })
}
// 获取居间费确认列表
export function GetCostIntermediatorConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorConfirmList,
        method: 'get',
        params: param
    })
}
// 获取确认招待费
export function PostConfirmCostEntertainment(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostEntertainment,
        method: 'post',
        data: param
    })
}
// 获取确认礼品费
export function PostConfirmCostGift(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostGift,
        method: 'post',
        data: param
    })
}
// 获取确认其他费
export function PostConfirmCostOther(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostOther,
        method: 'post',
        data: param
    })
}
// 获取确认居间费
export function PostConfirmCostIntermediator(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostIntermediator,
        method: 'post',
        data: param
    })
}
// 获取招待费分析
export function GetCostEntertainmentAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentAnalysis,
        method: 'get',
        params: param
    })
}
// 获取礼品费分析
export function GetCostGiftAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftAnalysis,
        method: 'get',
        params: param
    })
}
// 获取其他费分析
export function GetCostOtherAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherAnalysis,
        method: 'get',
        params: param
    })
}
// 获取样品费分析
export function GetCostSampleAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostSampleAnalysis,
        method: 'get',
        params: param
    })
}

// 获取样品费分析
export function GetCostIntermediatorAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorAnalysis,
        method: 'get',
        params: param
    })
}


