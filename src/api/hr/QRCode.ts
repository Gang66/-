import request from "/@/utils/request";
const api = {
  GetQRCodeCreateInfo: '/hr/api/QRCode/GetQRCodeCreateInfo',
  GetQRCodeLogEntity: '/hr/api/QRCode/GetQRCodeLogEntity',
};
// 获取登录token
export function GetQRCodeCreateInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetQRCodeCreateInfo+'/'+param.appType+'/'+param.tableName+'/'+param.guid,
    method: "get",
    params: param,
  });
}
// 获取二维码数据
export function GetQRCodeLogEntity(param: any): Promise<IResponse> {
  return request({
    url: api.GetQRCodeLogEntity+'/'+param.tableName+'/'+param.guid,
    method: "get",
  });
}
