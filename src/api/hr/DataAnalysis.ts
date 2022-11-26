import request from "/@/utils/request";
const api = {
  GetPlanCourseTypeList: "/hr/api/TrainWork/GetPlanCourseTypeList",
  GetHRAyNewsTrainUserList:"/hr/api/TrainWork/GetHRAyNewsTrainUserList",
  GetHRAyNewsTrainCoursewareList:"/hr/api/TrainWork/GetHRAyNewsTrainCoursewareList",
  GetHRAyNewsTrainScoreList:"/hr/api/TrainWork/GetHRAyNewsTrainScoreList",
  GetHRAyNewsTrainTimeList:"/hr/api/TrainWork/GetHRAyNewsTrainTimeList",
  GetForceReasonList:"/hr/api/TrainWork/GetForceReasonList",
  GetAyAlterPlanCount:"/hr/api/TrainWork/GetAyAlterPlanCount",
  GetForceCourseList:"/hr/api/TrainWork/GetForceCourseList",
  GetAyFocePlanScoreList:"/hr/api/TrainWork/GetAyFocePlanScoreList",
  GetForceUserList:"/hr/api/TrainWork/GetForceUserList",
  GetPlanUserStudyList:"/hr/api/TrainWork/GetPlanUserStudyList",
  GetAyMakeTrainCourseWareList:"/hr/api/TrainWork/GetAyMakeTrainCourseWareList",
};
// 课件类型排名
export function GetPlanCourseTypeList(params: any): Promise<IResponse> {
  return request({
      url: api.GetPlanCourseTypeList,
       method: "GET",
    params: params,
  });
}
// 新人训学习人员数量
export function GetHRAyNewsTrainUserList(params: any): Promise<IResponse> {
  return request({
      url: api.GetHRAyNewsTrainUserList,
       method: "GET",
    params: params,
  });
}
// 新人训课件学习次数
export function GetHRAyNewsTrainCoursewareList(params: any): Promise<IResponse> {
  return request({
      url: api.GetHRAyNewsTrainCoursewareList,
       method: "GET",
    params: params,
  });
}
// 新人训学习成绩排名
export function GetHRAyNewsTrainScoreList(params: any): Promise<IResponse> {
  return request({
      url: api.GetHRAyNewsTrainScoreList,
       method: "GET",
    params: params,
  });
}
// 新人训学习时间排名
export function GetHRAyNewsTrainTimeList(params: any): Promise<IResponse> {
  return request({
      url: api.GetHRAyNewsTrainTimeList,
       method: "GET",
    params: params,
  });
}
// 深造理由排名
export function GetForceReasonList(params: any): Promise<IResponse> {
  return request({
      url: api.GetForceReasonList,
       method: "GET",
    params: params,
  });
}
//关停次数排名
export function GetAyAlterPlanCount(params: any): Promise<IResponse> {
  return request({
      url: api.GetAyAlterPlanCount,
       method: "GET",
    params: params,
  });
}
//深造课件次数排行
export function GetForceCourseList(params: any): Promise<IResponse> {
  return request({
      url: api.GetForceCourseList,
       method: "GET",
    params: params,
  });
}
//深造课件均分排名
export function GetAyFocePlanScoreList(params: any): Promise<IResponse> {
  return request({
      url: api.GetAyFocePlanScoreList,
       method: "GET",
    params: params,
  });
}
//深造学习人数
export function GetForceUserList(params: any): Promise<IResponse> {
  return request({
      url: api.GetForceUserList,
       method: "GET",
    params: params,
  });
}
//新人训深造人员学习列表
export function GetPlanUserStudyList(params: any): Promise<IResponse> {
  return request({
      url: api.GetPlanUserStudyList,
       method: "GET",
    params: params,
  });
}
//是否制作课件统计分析
export function GetAyMakeTrainCourseWareList(params: any): Promise<IResponse> {
  return request({
      url: api.GetAyMakeTrainCourseWareList,
       method: "GET",
    params: params,
  });
}

