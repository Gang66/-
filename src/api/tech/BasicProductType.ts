import request from '/@/utils/request'
const api = {
  //产品类型
  GetChildrenListApi: '/tech/api/BasicProductType/GetBasicProductChildrenList', //获取tree
  GetListByPageApi: '/tech/api/BasicProductType/GetBasicProductListByPage', //获取分页
  GetParentListApi: '/tech/api/BasicProductType/GetBasicProductParentList', //获取父级
  GetEntityByIdApi: '/tech/api/BasicProductType/GetBasicProductEntityById', //获取单个实体
  PostEditEntitySaveApi: '/tech/api/BasicProductType/PostEditBasicProductEntitySave', //保存数据
  PostDeleteEntityByIdApi: '/tech/api/BasicProductType/PostDeleteBasicProductEntityById', //保存数据
  GetSonListApi: '/tech/api/BasicProductType/GetBasicProductSonList',
  //配件配对
  PostImportExcelDataApi: '/tech/api/BasicroductTypeMountings/PostImportExcelData', //上传文件
  GetPageListApi: '/tech/api/BasicProductTypeMountings/GetProductTypeMountingsPageList', //获取分页数据
  PostEditEntitySaveMountingsApi: '/tech/api/BasicProductTypeMountings/PostEditProductTypeMountingsEntitySave', //新增或者编辑
  GetEntityMountingsByIdApi: '/tech/api/BasicProductTypeMountings/GetProductTypeMountingsEntityById', //根据ID获取数据
  PostDeleteEntityMountingsByIdApi: '/tech/api/BasicProductTypeMountings/PostDeleteProductTypeMountingsEntityById'
}
export function PostDeleteEntityMountingsById(data: any) {
  return request({
    url: api.PostDeleteEntityMountingsByIdApi,
    method: 'post',
    data: data
  })
}
export function GetEntityMountingsById(id: number) {
  return request({
    url: api.GetEntityMountingsByIdApi,
    method: 'get',
    params: { id }
  })
}
export function PostEditEntitySaveMountings(entity: any) {
  return request({
    url: api.PostEditEntitySaveMountingsApi,
    method: 'post',
    params: entity
  })
}
export function GetPageList(dto: any) {
  return request({
    url: api.GetPageListApi,
    method: 'get',
    params: dto
  })
}
export function GetSonList(parentId: number) {
  return request({
    url: api.GetSonListApi,
    method: 'get',
    params: { parentId }
  })
}
export function PostImportExcelData(data: any) {
  return request({
    url: api.PostImportExcelDataApi + '/' + data.fileType,
    method: 'post',
    data: data.data
  })
}
export function PostDeleteEntityById(Id: number) {
  return request({
    url: api.PostDeleteEntityByIdApi,
    method: 'post',
    params: { Id }
  })
}
export function PostEditEntitySave(entity: any) {
  return request({
    url: api.PostEditEntitySaveApi,
    method: 'post',
    params: entity
  })
}
export function GetEntityById(Id: number) {
  return request({
    url: api.GetEntityByIdApi,
    method: 'get',
    params: { Id }
  })
}
export function GetBasicProductChildrenList() {
  return request({
    url: api.GetChildrenListApi,
    method: 'get',
    params: {}
  })
}

export function GetListByPage(dto: any) {
  return request({
    url: api.GetListByPageApi,
    method: 'get',
    params: dto
  })
}
export function GetParentList() {
  return request({
    url: api.GetParentListApi,
    method: 'get',
    params: {}
  })
}
