import request from "/@/utils/request";
const api = {
    PostWorkAssesSettingsSave: '/hr/api/HRCustomerWorkAsses/PostWorkAssesSettingsSave',
    GetWorkAssesSettingsPage: '/hr/api/HRCustomerWorkAsses/GetWorkAssesSettingsPage',
};
// 新增考核分配配置
export function PostWorkAssesSettingsSave(param: any): Promise<IResponse> {
    return request({
      url: api.PostWorkAssesSettingsSave,
      method: "post",
      data: param,
    });
}
// 考核设置数据
export function GetWorkAssesSettingsPage(param: Isearch): Promise<IResponse> {
    return request({
      url: api.GetWorkAssesSettingsPage,
      method: "get",
      params: param,
    });
  }