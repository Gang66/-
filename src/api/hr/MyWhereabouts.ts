/*
 * @Author: ZHJ
 * @Date: 2022-06-10 08:33:45
 * @LastEditTime: 2022-08-26 10:50:09
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\api\hr\MyWhereabouts.ts
 * 版权声明
 */
import request from '/@/utils/request'
const api = {
  PostAddVacationSave: '/hr/api/AttendanceRecordsVacation/PostAddVacationSave',
  PostVacationGetDays: '/hr/api/AttendanceRecordsVacation/PostVacationGetDays',
  GetAttendanceVacationInfo: '/hr/api/AttendanceRecordsVacation/GetAttendanceVacationInfo',
  GetAttendanceVacationPage: '/hr/api/AttendanceRecordsVacation/GetAttendanceVacationPage',
  PostAddEditAttendanceRecordsEvectionSave: '/hr/api/AttendanceRecordsEvection/PostAddEditAttendanceRecordsEvectionSave',
  PostAddEditAttendanceRecordsBusinessTripSave: '/hr/api/AttendanceRecordsBusinessTrip/PostAddEditAttendanceRecordsBusinessTripSave',
  GetAttendanceRecordsBusinessTripEvectionPage: '/hr/api/AttendanceRecordsEvection/GetAttendanceRecordsBusinessTripEvectionPage',
  GetAttendanceRecordsEvectionInfo: '/hr/api/AttendanceRecordsEvection/GetAttendanceRecordsEvectionInfo',
  GetAttendanceRecordsBusinessTripInfo: '/hr/api/AttendanceRecordsBusinessTrip/GetAttendanceRecordsBusinessTripInfo',
  PostApprovalRecordsEvection: '/hr/api/AttendanceRecordsEvection/PostApprovalRecordsEvection'
}
interface VacationGetDays {
  beginTime: string
  endTime: string
  type?: number
  UserId: number
}
// 新增/修改 请假
export function PostAddVacationSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddVacationSave,
    method: 'post',
    data: param
  })
}
// 计算请假时间
export function PostVacationGetDays(param: VacationGetDays): Promise<IResponse> {
  return request({
    url: api.PostVacationGetDays,
    method: 'post',
    data: param
  })
}
// 根据请假Id 创建时间 查询本月出勤率一览
export function GetAttendanceVacationInfo(Id: number, date: string): Promise<IResponse> {
  return request({
    url: api.GetAttendanceVacationInfo + '/' + Id + '/' + date,
    method: 'get'
  })
}

// 我的请假列表数据
export function GetAttendanceVacationPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetAttendanceVacationPage,
    method: 'get',
    params: param
  })
}
// 新增/修改 出差
export function PostAddEditAttendanceRecordsEvectionSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditAttendanceRecordsEvectionSave,
    method: 'post',
    data: param
  })
}
// 新增/修改 公差
export function PostAddEditAttendanceRecordsBusinessTripSave(param: any): Promise<IResponse> {
  return request({
    url: api.PostAddEditAttendanceRecordsBusinessTripSave,
    method: 'post',
    data: param
  })
}
//出差审批
export function PostApprovalRecordsEvection(param: any): Promise<IResponse> {
  return request({
    url: api.PostApprovalRecordsEvection,
    method: 'post',
    data: param
  })
}
// 我的出差列表数据
export function GetAttendanceRecordsBusinessTripEvectionPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetAttendanceRecordsBusinessTripEvectionPage,
    method: 'get',
    params: param
  })
}
// 根据请假Id  查询出差申请
export function GetAttendanceRecordsEvectionInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetAttendanceRecordsEvectionInfo + '/' + Id,
    method: 'get'
  })
}
// 根据请假Id  查询公差申请
export function GetAttendanceRecordsBusinessTripInfo(Id: number): Promise<IResponse> {
  return request({
    url: api.GetAttendanceRecordsBusinessTripInfo + '/' + Id,
    method: 'get'
  })
}
