/*
 * @Author: ZHJ
 * @Date: 2022-11-03 08:01:27
 * @LastEditTime: 2022-11-03 11:45:15
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\api\hr\Induction.ts
 * 版权声明
 */
import { InnovateData } from '/@/type/views/hr/Innovate'
import request from '/@/utils/request'
const api = {
  PostStaffEnrollmentfile: '/hr/api/HRStaffManagement/PostStaffEnrollmentfile',
  GetHRStaffeManagementPage: '/hr/api/HRStaffManagement/GetHRStaffeManagementPage',
  PostGetStaffManagementInfo: '/hr/api/HRStaffManagement/PostGetStaffManagementInfo',
  GetFileStaffInfo: '/hr/api/HRStaffManagement/GetFileStaffInfo',
  PostGetConfirmStaffFile: '/hr/api/HRStaffManagement/PostGetConfirmStaffFile',
  PostGetSaveUploadPhotos: '/hr/api/HRStaffManagement/PostGetSaveUploadPhotos',
  GetStaffFileArchiving: '/hr/api/HRStaffManagement/GetStaffFileArchiving',
  PostSaveStaffFileArchiving: '/hr/api/HRStaffManagement/PostSaveStaffFileArchiving',
  GetOneKeyStaffQuitSave: '/hr/api/HRStaffQuit/GetOneKeyStaffQuitSave',
  PostInsertStaffFile: '/hr/api/HRStaffManagement/PostInsertStaffFile'
}
// 补充档案信息
export function PostStaffEnrollmentfile(param: InnovateData): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostStaffEnrollmentfile,
    method: 'post',
    data: param
  })
}
// 入职管理列表数据
export function GetHRStaffeManagementPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetHRStaffeManagementPage,
    method: 'get',
    params: param
  })
}
//获取入职Id
export function GetFileStaffInfo(): Promise<IResponse<InnovateData>> {
  return request({
    url: api.GetFileStaffInfo,
    method: 'get'
  })
}
export function PostGetStaffManagementInfo(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostGetStaffManagementInfo,
    method: 'post',
    data: param
  })
}
// 根据入职Id获取档案归档信息
export function GetStaffFileArchiving(param: any): Promise<IResponse> {
  return request({
    url: api.GetStaffFileArchiving + '/' + param,
    method: 'get'
  })
}
// 档案确认
export function PostGetConfirmStaffFile(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostGetConfirmStaffFile,
    method: 'post',
    data: param
  })
}

// 上传手印照片
export function PostGetSaveUploadPhotos(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostGetSaveUploadPhotos,
    method: 'post',
    data: param
  })
}
// 提交档案归档
export function PostSaveStaffFileArchiving(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostSaveStaffFileArchiving,
    method: 'post',
    data: param
  })
}

export function GetOneKeyStaffQuitSave(param: any): Promise<IResponse> {
  return request({
    url: api.GetOneKeyStaffQuitSave + '/' + param,
    method: 'get'
  })
}

// 临时导入信息接口
export function PostInsertStaffFile(data: any): Promise<IResponse> {
  return request({
    url: api.PostInsertStaffFile,
    method: 'POST',
    data
  })
}
