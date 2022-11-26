/*
 * @Author: ZHJ
 * @Date: 2022-08-01 14:00:58
 * @LastEditTime: 2022-08-05 08:56:04
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\api\hr\WorkSummary.ts
 * 版权声明
 */
import request from "/@/utils/request";
const api = {
    GetWorkType: '/hr/api/WorkSummary/GetWorkType',
    PostInsertEditWorkSummarySave: '/hr/api/WorkSummary/PostInsertEditWorkSummarySave',
    GetUserWorkSummaryPage: '/hr/api/WorkSummary/GetUserWorkSummaryPage',
    GetWorkSummaryInfo: '/hr/api/WorkSummary/GetWorkSummaryInfo',
    PostAddWorkNotesSave: '/hr/api/WorkSummary/PostAddWorkNotesSave',
    GetWorkContent: '/hr/api/WorkSummary/GetWorkContent',
    GetManageDeptId: '/hr/api/WorkSummary/GetManageDeptId',
    GetWorkSummaryPage: '/hr/api/WorkSummary/GetWorkSummaryPage',
};
//查询工作总结填写类型
export function GetWorkType(): Promise<IResponse> {
    return request({
      url: api.GetWorkType,
      method: "get",
    });
  }
//查询工作总结时间数据
export function GetWorkContent(param: any): Promise<IResponse> {
    return request({
      url: api.GetWorkContent,
      method: "get",
      params: param,
    });
  }
// 新增新人训总结
export function PostInsertEditWorkSummarySave(param: any): Promise<IResponse> {
  return request({
    url: api.PostInsertEditWorkSummarySave,
    method: "post",
    data: param,
  });
}
// 新增新人训今日数据
export function PostAddWorkNotesSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddWorkNotesSave,
    method: "post",
    data: param,
  });
}
//查询工作总结列表
export function GetUserWorkSummaryPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetUserWorkSummaryPage,
    method: "get",
    params: param,
  });
}
//查询工作总结详情
export function GetWorkSummaryInfo(Id:number): Promise<IResponse> {
  return request({
    url: api.GetWorkSummaryInfo+'/'+Id,
    method: "get",
  });
}
// 获取当前审批人审批部门人员
export function GetManageDeptId(): Promise<IResponse> {
  return request({
    url: api.GetManageDeptId,
    method: "get",
  });
}
//查询审批工作总结列表
export function GetWorkSummaryPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetWorkSummaryPage,
    method: "get",
    params: param,
  });
}