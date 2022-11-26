import { IProductFormulaAttributeSearchDto } from '/@/type/views/tech/IProductFormula'
import request from '/@/utils/request'
const api = {
  postGBValveModelBatchAnalysis: '/tech/api/ProductFormula/PostGBValveModelBatchAnalysis',
  getGBValveModelAnalysis: '/tech/api/ProductFormula/GetGBValveModelAnalysis',
  getGBProductTypeDirectoryList: '/tech/api/ProductFormula/GetGBProductTypeDirectoryList',
  getProductFormulaPage: '/tech/api/ProductFormula/GetProductFormulaPage',
  getProductFormulaData: '/tech/api/ProductFormula/GetProductFormulaData',
  postEditProductFormulaSave: '/tech/api/ProductFormula/PostEditProductFormulaSave',
  getGBProductFormulaDirectoryList: '/tech/api/ProductFormula/GetGBProductFormulaDirectoryList',
  getEditGBProductFormulaDirectorySave: '/tech/api/ProductFormula/GetEditGBProductFormulaDirectorySave',
  GetProductAttributesTree: '/tech/api/ProductFormula/GetProductAttributesTree',
  PostEditProductAttributesSave: '/tech/api/ProductFormula/PostEditProductAttributesSave'
}

// 获取国标阀门型号批量解析
export function postGBValveModelBatchAnalysis(data: string[]): Promise<IResponse> {
  return request({
    url: api.postGBValveModelBatchAnalysis,
    method: 'post',
    data
  })
}

// 获取国标阀门型号解析
export function getGBValveModelAnalysis(modelStr: string): Promise<IResponse> {
  return request({
    url: api.getGBValveModelAnalysis,
    method: 'get',
    params: { modelStr }
  })
}

// 获取国标阀门类型数据列表
export function getGBProductTypeDirectoryList(): Promise<IResponse> {
  return request({
    url: api.getGBProductTypeDirectoryList,
    method: 'get'
  })
}

// 获取阀门型号解析配置数据
export function getProductFormulaData(param: any): Promise<IResponse> {
  return request({
    url: api.getProductFormulaData,
    method: 'get',
    params: param
  })
}

// 获取阀门公共属性分页列表
export function getProductFormulaPage(param: IProductFormulaAttributeSearchDto): Promise<IResponse> {
  return request({
    url: api.getProductFormulaPage,
    method: 'get',
    params: param
  })
}

// 提交阀门型号解析配置数据
export function postEditProductFormulaSave(data: any): Promise<IResponse> {
  return request({
    url: api.postEditProductFormulaSave,
    method: 'post',
    data
  })
}

// 获取国标解析设置数据列表
export function getGBProductFormulaDirectoryList(): Promise<IResponse> {
  return request({
    url: api.getGBProductFormulaDirectoryList,
    method: 'get'
  })
}

// 编辑国标解析设置保存
export function getEditGBProductFormulaDirectorySave(param: any): Promise<IResponse> {
  return request({
    url: api.getEditGBProductFormulaDirectorySave,
    method: 'get',
    params: param
  })
}

// 获取产品和配件的属性树
export function GetProductAttributesTree(typeInfo: number): Promise<IResponse> {
  return request({
    url: api.GetProductAttributesTree,
    method: 'get',
    params: { typeInfo }
  })
}

// 提交编辑属性和分组信息
export function PostEditProductAttributesSave(data: any): Promise<IResponse> {
  return request({
    url: api.PostEditProductAttributesSave,
    method: 'post',
    data
  })
}
