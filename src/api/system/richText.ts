import request from "/@/utils/request";
const api = {
    PostAddEditRichTextSave: "/hr/api/HRRichText/PostAddEditRichTextSave",
    GetHRRichTextPage: "/hr/api/HRRichText/GetHRRichTextPage",
    GetRichTextInfo: "/hr/api/HRRichText/GetRichTextInfo",
    GetDeleteHRRichText: "/hr/api/HRRichText/GetDeleteHRRichText",
    GetRichTextSelect: "/hr/api/HRRichText/GetRichTextSelect",
};
// 添加富文本设置
export function PostAddEditRichTextSave(param: Object): Promise<IResponse> {
  return request({
    url: api.PostAddEditRichTextSave,
    method: "post",
    data: param,
  });
}
// 获取富文本设置列表数据
export function GetHRRichTextPage(param: Isearch): Promise<IResponse> {
    return request({
      url: api.GetHRRichTextPage,
      method: "get",
      params: param,
    });
  }
  // 富文本（根据Id查看详情）
export function GetRichTextInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetRichTextInfo + "/" + param,
    method: "get",
  });
}
  // 富文本（根据Id删除）
export function GetDeleteHRRichText(param: any): Promise<IResponse> {
  return request({
    url: api.GetDeleteHRRichText + "/" + param,
    method: "get",
  });
}
  // 富文本（根据code绑定合同）
export function GetRichTextSelect(param: any): Promise<IResponse> {
  return request({
    url: api.GetRichTextSelect + "/" + param,
    method: "get",
  });
}

