import { dictionaryData } from '/@/type/views/system/dictionary'
import request from '/@/utils/request'
const api = {
    // 字典管理
    addDictionaryIndex: '/hr/api/System/PostAddDictionaryMainSave',
    editDictionaryIndex: '/hr/api/System/PostEditDictionaryMainSave',
    deleteIndexList: '/hr/api/System/GerDeleteDictionaryMain',
    getIndexDetails: '/hr/api/System/GetDictionaryMainById',
    DictionaryIndexList: '/hr/api/System/GetDictionaryList',
    getIndexListName: '/hr/api/System/GetDictionaryInfoNameSelectOpinon',
    // 字典类型
    addDictionaryType: '/hr/api/System/PostAddDictionaryinfoSave',
    editDictionaryType: '/hr/api/System/PostEditDictionaryinfoSave',
    DictionaryTypeList: '/hr/api/System/GetDictionaryinfoList',
    deleteTypeList: '/hr/api/System/GetDeleteDictionaryinfo',
    getTypeDetails: '/hr/api/System/GetDictionaryInfoById',
    getDict: '/hr/api/System/GetDictionaryKeyValues'
}
// 新增字典管理
export function addDictionaryIndex(param: dictionaryData): Promise<IResponse<dictionaryData>> {
    return request({
        url: api.addDictionaryIndex,
        method: 'post',
        data: param
    })
}
// 修改字典管理
export function editDictionaryIndex(param: dictionaryData): Promise<IResponse<dictionaryData>> {
    return request({
        url: api.editDictionaryIndex,
        method: 'post',
        data: param
    })
}
// 删除字典管理
export function deleteIndexList(param: any): Promise<IResponse<any>> {
    return request({
        url: `${api.deleteIndexList}/${param}`,
        method: 'post'
    })
}
// 获取字典管理form表单详情
export function getIndexDetails(param: any): Promise<IResponse> {
    return request({
        url: `${api.getIndexDetails}/${param}`,
        method: 'get'
    })
}
// 字典管理列表数据
export function getDictionaryIndexList(param: Isearch): Promise<IResponse> {
    return request({
        url: api.DictionaryIndexList,
        method: 'get',
        params: param
    })
}
// 字典管理 名称筛选
export function getIndexListName(): Promise<IResponse> {
    return request({
        url: api.getIndexListName,
        method: 'get'
    })
}
// 添加字典类型
export function addDictionaryType(param: dictionaryData): Promise<IResponse<dictionaryData>> {
    return request({
        url: api.addDictionaryType,
        method: 'post',
        data: param
    })
}
// 修改字典类型
export function editDictionaryType(param: dictionaryData): Promise<IResponse<dictionaryData>> {
    return request({
        url: api.editDictionaryType,
        method: 'post',
        data: param
    })
}
// 删除字典管理
export function deleteTypeList(param: any): Promise<IResponse<any>> {
    return request({
        url: `${api.deleteTypeList}/${param}`,
        method: 'get'
    })
}
// 获取字典管理form表单详情
export function getTypeDetails(param: any): Promise<IResponse> {
    return request({
        url: `${api.getTypeDetails}/${param}`,
        method: 'get'
    })
}
// 获取字典类型列表数据
export function DictionaryTypeList(param: Isearch): Promise<IResponse> {
    return request({
        url: api.DictionaryTypeList,
        method: 'get',
        params: param
    })
}
// 根据类型获取字典数据
export function getDict(param: string) {
    return request({
        url: `${api.getDict}/${param}`,
        method: 'get'
    })
}
