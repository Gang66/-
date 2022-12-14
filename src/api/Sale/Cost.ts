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
//????????????????????????
export function PostAddOrEditCostOther(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditCostOther,
        method: 'post',
        data: param,
        
    })
}
//???????????????
export function PostApprovalCostOther(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostOther,
        method: 'post',
        data: param,
        
    })
}
//?????????????????????
export function GetCostOtherById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherById,
        method: 'get',
        params: param
    })
}
//?????????????????????
export function GetCostOtherList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherList,
        method: 'get',
        params: param
    })
}

//????????????????????????
export function PostAddOrEditEntertainment(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditEntertainment,
        method: 'post',
        data: param,
        
    })
}
//???????????????
export function PostApprovalCostEntertainment(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostEntertainment,
        method: 'post',
        data: param,
        
    })
}
//?????????????????????
export function GetCostEntertainmentById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentById,
        method: 'get',
        params: param
    })
}
//?????????????????????
export function GetCostEntertainmentList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentList,
        method: 'get',
        params: param
    })
}


//????????????????????????
export function PostAddOrEditGift(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditGift,
        method: 'post',
        data: param,
        
    })
}
//???????????????
export function PostApprovalCostGift(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostGift,
        method: 'post',
        data: param,
        
    })
}
//?????????????????????
export function GetCostGiftById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftById,
        method: 'get',
        params: param
    })
}
//?????????????????????
export function GetCostGiftList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftList,
        method: 'get',
        params: param
    })
}

//?????????????????????
export function PostAddOrEditCostSample(param:any):Promise<IResponse> {
    return request({
        url: api.PostAddOrEditCostSample,
        method: 'post',
        data: param,
        
    })
}
//???????????????
export function PostApprovalCostSample(param:any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostSample,
        method: 'post',
        data: param,
        
    })
}
//?????????????????????
export function GetCostSampleById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostSampleById,
        method: 'get',
        params: param
    })
}
//?????????????????????
export function GetCostSampleList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostSampleList,
        method: 'get',
        params: param
    })
}

// ???????????????
export function PostAddIntermediatorCost(param: any):Promise<IResponse> {
    return request({
        url: api.PostAddIntermediatorCost,
        method: 'post',
        data: param
    })
}
// ???????????????
export function GetCostIntermediatorList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorList,
        method: 'get',
        params: param
    })
}
// ???????????????
export function GetCostIntermediatorInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorInfo,
        method: 'get',
        params: param
    })
}
// ???????????????
export function PostApprovalCostIntermediator(param: any):Promise<IResponse> {
    return request({
        url: api.PostApprovalCostIntermediator,
        method: 'post',
        data: param
    })
}
// ???????????????????????????
export function GetCostEntertainmentConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentConfirmList,
        method: 'get',
        params: param
    })
}
// ???????????????????????????
export function GetCostGiftConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftConfirmList,
        method: 'get',
        params: param
    })
}
// ???????????????????????????
export function GetCostOtherConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherConfirmList,
        method: 'get',
        params: param
    })
}
// ???????????????????????????
export function GetCostIntermediatorConfirmList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorConfirmList,
        method: 'get',
        params: param
    })
}
// ?????????????????????
export function PostConfirmCostEntertainment(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostEntertainment,
        method: 'post',
        data: param
    })
}
// ?????????????????????
export function PostConfirmCostGift(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostGift,
        method: 'post',
        data: param
    })
}
// ?????????????????????
export function PostConfirmCostOther(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostOther,
        method: 'post',
        data: param
    })
}
// ?????????????????????
export function PostConfirmCostIntermediator(param: any):Promise<IResponse> {
    return request({
        url: api.PostConfirmCostIntermediator,
        method: 'post',
        data: param
    })
}
// ?????????????????????
export function GetCostEntertainmentAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostEntertainmentAnalysis,
        method: 'get',
        params: param
    })
}
// ?????????????????????
export function GetCostGiftAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostGiftAnalysis,
        method: 'get',
        params: param
    })
}
// ?????????????????????
export function GetCostOtherAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostOtherAnalysis,
        method: 'get',
        params: param
    })
}
// ?????????????????????
export function GetCostSampleAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostSampleAnalysis,
        method: 'get',
        params: param
    })
}

// ?????????????????????
export function GetCostIntermediatorAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCostIntermediatorAnalysis,
        method: 'get',
        params: param
    })
}


