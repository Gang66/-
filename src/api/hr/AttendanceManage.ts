import request from "/@/utils/request";
const api = {
  GetCheckAttendancePage: "/hr/api/CheckAttendance/GetCheckAttendancePage",
  GetAllLocateList: "/hr/api/AttendanceRecordsOnlIne/GetAllLocateList",
  PostGetUserWorkTimeLogList: "/hr/api/BaiduFace/PostGetUserWorkTimeLogList",
  GetAttendanceUserDayPage: "/hr/api/AttendanceUserWorkTime/GetAttendanceUserDayPage",
  GetManageUserDayList: "/hr/api/AttendanceUserWorkTime/GetManageUserDayList",
  PostGetFaceAttendanceStatisticsData: "/hr/api/FaceCheckWork/PostGetFaceAttendanceStatisticsData",
  GetFaceCheckStatisticsListPage: "/hr/api/FaceCheckWork/GetFaceCheckStatisticsListPage",
  FaceCheckWorkAppointSave: "/hr/api/FaceCheckWork/FaceCheckWorkAppointSave",
  FaceCheckWorkRandomSave: "/hr/api/FaceCheckWork/FaceCheckWorkRandomSave",
  GetFaceCheckCheckedListPage: "/hr/api/FaceCheckWork/GetFaceCheckCheckedListPage",
};
// 考勤设置列表数据
export function GetCheckAttendancePage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetCheckAttendancePage,
    method: "get",
    params: param,
  });
}
// 根据UserId date 获取考勤统计
export function PostGetFaceAttendanceStatisticsData(param: any): Promise<IResponse> {
  return request({
    url: api.PostGetFaceAttendanceStatisticsData,
    method: "post",
    data: param,
  });
}
// 根据UserId获取考勤打卡记录
export function PostGetUserWorkTimeLogList(param: any): Promise<IResponse> {
  return request({
    url: api.PostGetUserWorkTimeLogList,
    method: "post",
    data: param,
  });
}
// 根据UserId获取轨迹回放
export function GetAllLocateList(param: any): Promise<IResponse> {
  return request({
    url: api.GetAllLocateList,
    method: "get",
    params: param,
  });
}
// 我的考勤列表数据
export function GetAttendanceUserDayPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetAttendanceUserDayPage,
    method: "get",
    params: param,
  });
}
// 考勤管理列表数据
export function GetManageUserDayList(param: any): Promise<IResponse> {
  return request({
    url: api.GetManageUserDayList,
    method: "get",
    params: param,
  });
}
// 抽检统计列表数据
export function GetFaceCheckStatisticsListPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetFaceCheckStatisticsListPage,
    method: "get",
    params: param,
  });
}
// 根据UserId  提交手动抽检
export function FaceCheckWorkAppointSave(userId: number): Promise<IResponse> {
  return request({
    url: api.FaceCheckWorkAppointSave+'/'+userId,
    method: "post",
  });
}
// 随机抽检
export function FaceCheckWorkRandomSave(param: any): Promise<IResponse> {
  return request({
    url: api.FaceCheckWorkRandomSave,
    method: "post",
    data: param,
  });
}
// 抽检记录列表数据
export function GetFaceCheckCheckedListPage(param: any): Promise<IResponse> {
  return request({
    url: api.GetFaceCheckCheckedListPage,
    method: "get",
    params: param,
  });
}
