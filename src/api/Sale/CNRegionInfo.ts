import request from '/@/utils/request'
const api = {
    getRegionTree: '/sale/api/CNRegionInfo/GetRegionTree',
    GetUsetTree:'/sale/api/CNRegionInfo/GetUsetTree'
}
// 获取地区树
export function getTree():Promise<IResponse> {
    return request({
        url: api.getRegionTree,
        method: 'get'
    })
}

export function GetUsetTree():Promise<IResponse> {
    return request({
        url: api.GetUsetTree,
        method: 'get'
    })
}

