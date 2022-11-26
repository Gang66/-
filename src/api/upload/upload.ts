import request from "/@/utils/request";
const api = {
  PostUploadFile: "/hr/api/UploadFile/PostUploadFile",
  Postidcard: "/hr/api/OcrModel/Postidcard",
};
// 上传
export function PostUploadFile(param: any): Promise<IResponse> {
  return request({
    url: api.PostUploadFile + "/" + param.type,
    method: "post",
    data: param.data,
  });
}
// 身份证识别
export function Postidcard(param: any): Promise<IResponse> {
  return request({
    url: api.Postidcard,
    method: "post",
    data: param,
  });
}

