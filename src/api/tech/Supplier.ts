import request from '/@/utils/request'
const api = {
  //  公司地址
  GetAllRegionTreeApi: '/hr/api/HRRegionSetting/GetAllRegionTree',
  //新增编辑供应商
  PostAddEditSupplierSaveApi: '/tech/api/Supplier/PostAddEditSupplierSave',
  //   判断公司名称是否重复
  GetHasRepeatSupplierApi: '/tech/api/Supplier/GetHasRepeatSupplier',
  //   供应商分页列表
  GetSupplierPageApi: '/tech/api/Supplier/GetSupplierPage',
  //   供应商详情
  GetSupplierInfoApi: '/tech/api/Supplier/GetSupplierInfo',
  // 分配供应商
  PostInsertEditProductPriceSave: '/tech/api/EnquiryData/PostInsertEditProductPriceSave'
}

// 新增编辑供应商
export function PostAddEditSupplierSave(data: any) {
  return request({
    url: api.PostAddEditSupplierSaveApi,
    method: 'post',
    data
  })
}
// 公司地址
export function GetAllRegionTree() {
  return request({
    url: api.GetAllRegionTreeApi,
    method: 'get'
  })
}
// 判断公司名称是否重复
export function GetHasRepeatSupplier(param: any): Promise<IResponse> {
  return request({
    url: api.GetHasRepeatSupplierApi,
    method: 'get',
    params: param
  })
}
// 供应商分页列表
export function GetSupplierPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetSupplierPageApi,
    method: 'get',
    params: param
  })
}
// 供应商详情
export function GetSupplierInfo(id: number): Promise<IResponse> {
  return request({
    url: api.GetSupplierInfoApi,
    method: 'get',
    params: { id }
  })
}
// 分配供应商
export function PostInsertEditProductPriceSave(data: any) {
  return request({
    url: api.PostInsertEditProductPriceSave,
    method: 'post',
    data
  })
}
