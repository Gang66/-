import request from '/@/utils/request'
const api = {
  GetStudyTrainInfo: '/hr/api/TrainWork/GetStudyTrainInfo',
  GetPlanInfoForUser: '/hr/api/TrainWork/GetPlanInfoForUser',
  PostSaveStudyTime: '/hr/api/TrainWork/PostSaveStudyTime',
  PostSubmitPageSummary: '/hr/api/TrainWork/PostSubmitPageSummary',
  PostGetPageSummary: '/hr/api/TrainWork/PostGetPageSummary',
  PostCompletePlanCourseRate: '/hr/api/TrainWork/PostCompletePlanCourseRate',
  PostCompletePlanCourseStudy: '/hr/api/TrainWork/PostCompletePlanCourseStudy',
  PostAddCoursewareInfoWithUser: '/hr/api/TrainWork/PostAddCoursewareInfoWithUser',
  PostGetCourseTest: '/hr/api/TrainWork/PostGetCourseTest',
  PostCompletePlanCourseTest: '/hr/api/TrainWork/PostCompletePlanCourseTest',
  PostSaveTestFormPaper: '/hr/api/TrainWork/PostSaveTestFormPaper',
  GetExamTimeSpan: '/hr/api/TrainWork/GetExamTimeSpan',
  PostGetNextTestFromPaper: '/hr/api/TrainWork/PostGetNextTestFromPaper',
  PostGetCourseExamResult: '/hr/api/TrainWork/PostGetCourseExamResult',
  PostCheatExam: '/hr/api/TrainWork/PostCheatExam',
  GetTrainCourseWare: '/hr/api/TrainWork/GetTrainCourseWare',
  GetTrainCourseWareFileInfo: '/hr/api/TrainWork/GetTrainCourseWareFileInfo',
  GetCompleteNewestStore: '/hr/api/TrainWork/GetCompleteNewestStore',
  GetAddUserNewestPlan: '/hr/api/TrainWork/GetAddUserNewestPlan',
  GetWorkCourseHistoryPage: '/hr/api/TrainWork/GetWorkCourseHistoryPage',
  GetTrainForceRank: '/hr/api/TrainWork/GetTrainForceRank',
  GetFinishStudyHistry: '/hr/api/TrainWork/GetFinishStudyHistry',
  GetAlertReasonInfoByUser: '/hr/api/TrainWork/GetAlertReasonInfoByUser',
  PostSystemExam: '/hr/api/TrainWork/PostSystemExam',
}
// 培训江湖当前学习页面列表数据
export function GetStudyTrainInfo(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetStudyTrainInfo,
    method: 'get',
    params: param
  })
}
// 根据计划Id获取计划课件信息
export function GetPlanInfoForUser(param: any, courseId: Number): Promise<IResponse> {
  return request({
    url: api.GetPlanInfoForUser + '/' + param + '/' + courseId,
    method: 'get'
  })
}
// 根据 一分钟提交一次学习时间
export function PostSaveStudyTime(param: any): Promise<IResponse> {
  return request({
    url: api.PostSaveStudyTime,
    method: 'post',
    data: param
  })
}
// 根据学习记录笔记
export function PostSubmitPageSummary(param: any): Promise<IResponse> {
  return request({
    url: api.PostSubmitPageSummary,
    method: 'post',
    data: param
  })
}
// 获取添加学习笔记
export function PostGetPageSummary(param: any): Promise<IResponse> {
  return request({
    url: api.PostGetPageSummary,
    method: 'post',
    data: param
  })
}
// 提交课程评价
export function PostCompletePlanCourseRate(param: any): Promise<IResponse> {
  return request({
    url: api.PostCompletePlanCourseRate,
    method: 'post',
    data: param
  })
}
// 查询课程评价
export function PostCompletePlanCourseStudy(param: any): Promise<IResponse> {
  return request({
    url: api.PostCompletePlanCourseStudy,
    method: 'post',
    data: param
  })
}
// 提交学习人员
export function PostAddCoursewareInfoWithUser(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddCoursewareInfoWithUser,
    method: 'post',
    data: param
  })
}
// 查询考试题
export function PostGetCourseTest(param: any): Promise<IResponse> {
  return request({
    url: api.PostGetCourseTest,
    method: 'post',
    data: param
  })
}
// 提交刷题
export function PostCompletePlanCourseTest(param: any): Promise<IResponse> {
  return request({
    url: api.PostCompletePlanCourseTest,
    method: 'post',
    data: param
  })
}
// 提交试卷
export function PostSaveTestFormPaper(param: any): Promise<IResponse> {
  return request({
    url: api.PostSaveTestFormPaper,
    method: 'post',
    data: param
  })
}
// 获取考试剩余时长
export function GetExamTimeSpan(param: any): Promise<IResponse> {
  return request({
    url: api.GetExamTimeSpan + '/' + param,
    method: 'get',
    data: param
  })
}
// 查询考试试卷
export function PostGetNextTestFromPaper(param: any): Promise<IResponse> {
  return request({
    url: api.PostGetNextTestFromPaper,
    method: 'post',
    data: param
  })
}
//  强制交卷
export function PostGetCourseExamResult(param: any): Promise<IResponse> {
  return request({
    url: api.PostGetCourseExamResult,
    method: 'post',
    data: param
  })
}
//时间到强制交卷
export function PostSystemExam(param: any): Promise<IResponse> {
  return request({
    url: api.PostSystemExam,
    method: 'post',
    data: param
  })
}
// 查询考试结果
export function PostCheatExam(param: any): Promise<IResponse> {
  return request({
    url: api.PostCheatExam,
    method: 'post',
    data: param
  })
}
// 课程集市列表接口
export function GetTrainCourseWare(param: any): Promise<IResponse> {
  return request({
    url: api.GetTrainCourseWare,
    method: 'get',
    params: param
  })
}
//课程集市历史列表接口
export function GetWorkCourseHistoryPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetWorkCourseHistoryPage,
    method: 'get',
    params: param
  })
}
// 根据课件Id获取课件信息
export function GetTrainCourseWareFileInfo(courseId: any): Promise<IResponse> {
  return request({
    url: api.GetTrainCourseWareFileInfo + '/' + courseId,
    method: 'get'
  })
}
// 新增下一关计划
export function GetCompleteNewestStore(param: any): Promise<IResponse> {
  return request({
    url: api.GetCompleteNewestStore + '/' + param,
    method: 'get'
  })
}
// 新增下一关计划 之后插入试题
export function GetAddUserNewestPlan(): Promise<IResponse> {
  return request({
    url: api.GetAddUserNewestPlan,
    method: 'get'
  })
}
// 深造营地 课程学习榜
export function GetTrainForceRank(): Promise<IResponse> {
  return request({
    url: api.GetTrainForceRank,
    method: 'get'
  })
}
// 深造营地 课程学习记录
export function GetFinishStudyHistry(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetFinishStudyHistry,
    method: 'get',
    params: param
  })
}
// 获取关停数据
export function GetAlertReasonInfoByUser(): Promise<IResponse> {
  return request({
    url: api.GetAlertReasonInfoByUser,
    method: 'get'
  })
}

