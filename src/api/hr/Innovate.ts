/*
 * @Author: ZHJ
 * @Date: 2022-04-27 09:26:40
 * @LastEditTime: 2022-11-16 14:34:11
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\api\hr\Innovate.ts
 * 版权声明
 */
import { InnovateData } from '/@/type/views/hr/Innovate'
import request from '/@/utils/request'
const api = {
  addInnovate: '/hr/api/Innovate/PotsAddInnovateSave',
  getInnovateList: '/hr/api/Innovate/GetInnovatePage',
  getInnovateDetails: '/hr/api/Innovate/GetInnovateList',
  PostDealInnovateSave: '/hr/api/Innovate/PostDealInnovateSave',
  GetMyInnovatePage: '/hr/api/Innovate/GetMyInnovatePage'
}
// 新增创新举措
export function addInnovate(param: InnovateData): Promise<IResponse<InnovateData>> {
  return request({
    url: api.addInnovate,
    method: 'post',
    data: param
  })
}
// 创新举措列表数据
export function getInnovateList(param: Isearch): Promise<IResponse> {
  return request({
    url: api.getInnovateList,
    method: 'get',
    params: param
  })
}
// 我的创新举措列表数据
export function GetMyInnovatePage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetMyInnovatePage,
    method: 'get',
    params: param
  })
}
// 创新举措详情
export function getInnovateDetails(param: any): Promise<IResponse> {
  return request({
    url: api.getInnovateDetails + '/' + param,
    method: 'get'
  })
}
// 创新举措分配
export function PostDealInnovateSave(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostDealInnovateSave,
    method: 'post',
    data: param
  })
}
