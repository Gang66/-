//技术处理接口
import request from '/@/utils/request'
const api = {
  //#region 单据录入
  GetProductEntryExcelList: '/tech/api/ProductBasics/GetProductEntryExcelList',
  PostEditProductEntryExcelSave: '/tech/api/ProductBasics/PostEditProductEntryExcelSave',

  //#endregion

  //#region 技术处理
  GetProductTechnicalProcessingList: '/tech/api/ProductBasics/GetProductTechnicalProcessingList',
  GetProductPropertysAndItemValueList: '/tech/api/ProductBasics/PostGetProductPropertysAndItemValueList',
  // 保存技术处理
  PostEditTechProductBasicsSave: '/tech/api/ProductBasics/PostEditTechProductBasicsSave',
  // 获取配件分类tree数据
  GetBasicProductChildrenListApi: '/tech/api/BasicProductType/GetBasicProductChildrenList',
  //获取技术处理产品数据（产品Id）
  GetProductBasicsServiceEntityByIdApi: '/tech/api/ProductBasics/GetProductBasicsServiceEntityById',
  //获取产品配件信息列表
  PostGetProductAccessoriesInfoList: '/tech/api/ProductBasics/PostGetProductAccessoriesInfoList'
  //#endregion
}

//#region 单据录入
//获取产品单据录入表格数据(询价单Id)
export function GetProductEntryExcelList(id: number) {
  return request({
    url: api.GetProductEntryExcelList,
    method: 'get',
    params: { id }
  })
}

//保存产品单据录入表格数据
export function PostEditProductEntryExcelSave(data: any) {
  return request({
    url: api.PostEditProductEntryExcelSave,
    method: 'post',
    data
  })
}
//#endregion

//#region 技术处理
// 获取技术处理产品列表(询价单Id)
export function GetProductTechnicalProcessingList(id: Number) {
  return request({
    url: api.GetProductTechnicalProcessingList,
    method: 'get',
    params: { id }
  })
}
//获取产品映射属性信息
export function GetProductPropertysAndItemValueList(ids: Array<number>, productId: string) {
  return request({
    url: api.GetProductPropertysAndItemValueList,
    method: 'post',
    data: { productId, ids }
  })
}
// 保存技术处理
export function PostEditTechProductBasicsSave(data: any): Promise<IResponse> {
  return request({
    url: api.PostEditTechProductBasicsSave,
    method: 'post',
    data
  })
}
// 获取配件分类tree数据
export function GetBasicProductChildrenList() {
  return request({
    url: api.GetBasicProductChildrenListApi,
    method: 'get',
    params: {}
  })
}
//跟id获取基本数据  和选择项
export function GetProductBasicsServiceEntityById(id: string) {
  return request({
    url: api.GetProductBasicsServiceEntityByIdApi,
    method: 'get',
    params: { id }
  })
}
//获取产品配件信息列表
export function PostGetProductAccessoriesInfoList(data: any) {
  return request({
    url: api.PostGetProductAccessoriesInfoList,
    method: 'post',
    data
  })
}
//#endregion
