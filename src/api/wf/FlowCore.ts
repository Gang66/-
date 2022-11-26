import request from '/@/utils/request'
import { IFlowCore, IFlowNode, IFlowSearch, IFlowTable } from '/@/type/views/wf/IFlow'

const api = {
    GetFlowList: '/wf/api/WorkFlow/GetFlowList',
    GetFlowNodesByFlowId: '/wf/api/WorkFlow/GetFlowNodesByFlowId',
    GetEditInfoById: '/wf/api/WorkFlow/GetEditInfoById',
    PostEditFlowSave: '/wf/api/WorkFlow/PostEditFlowSave',
    PostAddFlowSave: '/wf/api/WorkFlow/PostAddFlowSave',
    GetFlowRemove: '/wf/api/WorkFlow/GetFlowRemove',
    GetFlowTableList: '/wf/api/WorkFlow/GetFlowTableList',
    PostEditFlowTableSave: '/wf/api/WorkFlow/PostEditFlowTableSave',
    PostAddFlowTableSave: '/wf/api/WorkFlow/PostAddFlowTableSave',
    GetFlowTableById: '/wf/api/WorkFlow/GetFlowTableById',
    GetRemoveFlowTable: '/wf/api/WorkFlow/GetRemoveFlowTable'
}

export function GetFlowList(param: IFlowSearch): Promise<IResponse<IFlowCore[]>> {
    return request({
        url: api.GetFlowList,
        method: 'get',
        params: param
    })
}

export function GetFlowNodesByFlowId(param: number): Promise<IResponse<IFlowNode[]>> {
    return request({
        url: `${api.GetFlowNodesByFlowId}/${param}`,
        method: 'get'
    })
}

export function GetFlowRemove(param: number): Promise<IResponse<boolean>> {
    return request({
        url: `${api.GetFlowRemove}/${param}`,
        method: 'get'
    })
}

export function GetEditInfoById(param: number): Promise<IResponse<IFlowCore>> {
    return request({
        url: `${api.GetEditInfoById}/${param}`,
        method: 'get'
    })
}

export function PostEditFlowSave(param: IFlowCore): Promise<IResponse<boolean>> {
    return request({
        url: api.PostEditFlowSave,
        method: 'post',
        data: param
    })
}

export function PostAddFlowSave(param: IFlowCore): Promise<IResponse<boolean>> {
    return request({
        url: api.PostAddFlowSave,
        method: 'post',
        data: param
    })
}

export function GetFlowTableList(param: IFlowSearch): Promise<IResponse<IFlowTable[]>> {
    return request({
        url: api.GetFlowTableList,
        method: 'get',
        params: param
    })
}

export function PostEditFlowTableSave(param: IFlowTable): Promise<IResponse<boolean>> {
    return request({
        url: api.PostEditFlowTableSave,
        method: 'post',
        data: param
    })
}

export function PostAddFlowTableSave(param: IFlowTable): Promise<IResponse<boolean>> {
    return request({
        url: api.PostAddFlowTableSave,
        method: 'post',
        data: param
    })
}

export function GetFlowTableById(param: number): Promise<IResponse<IFlowTable>> {
    return request({
        url: `${api.GetFlowTableById}/${param}`,
        method: 'get'
    })
}

export function GetRemoveFlowTable(param: number): Promise<IResponse<boolean>> {
    return request({
        url: `${api.GetRemoveFlowTable}/${param}`,
        method: 'get'
    })
}