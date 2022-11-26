import { InnovateData } from "/@/type/views/hr/Innovate";
import request from "/@/utils/request";
const api = {
    PostApprovalRecordsVacation: "/hr/api/AttendanceRecordsVacation/PostApprovalRecordsVacation",
    PostApprovalTrendPositive: "/hr/api/TrendPositive/PostApprovalTrendPositive",
    PostApprovalStaffQuit: "/hr/api/HRStaffQuit/PostApprovalStaffQuit",
    PostApprovalAdjustSalary: "/hr/api/HRAdjustSalary/PostApprovalAdjustSalary",
    PostApprovalPostTransfer: "/hr/api/HRPostTransfer/PostApprovalPostTransfer",
    GetApplyWorkCourseMaterialEntity: "/hr/api/TrainWork/GetApplyWorkCourseMaterialEntity",
    PostApprovalWorkCourseMaterialSave: "/hr/api/TrainWork/PostApprovalWorkCourseMaterialSave",
    PostApprovalWorkCourseFinished: "/hr/api/TrainWork/PostApprovalWorkCourseFinished",
    PostApprovalTestImportFile: "/hr/api/TrainWork/PostApprovalTestImportFile",
};
// 审批请假
export function PostApprovalRecordsVacation(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalRecordsVacation,
    method: "post",
    data: param,
  });
}
// 审批转正
export function PostApprovalTrendPositive(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalTrendPositive,
    method: "post",
    data: param,
  });
}
// 审批离职
export function PostApprovalStaffQuit(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalStaffQuit,
    method: "post",
    data: param,
  });
}
// 审批调薪
export function PostApprovalAdjustSalary(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalAdjustSalary,
    method: "post",
    data: param,
  });
}
// 审批调岗
export function PostApprovalPostTransfer(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalPostTransfer,
    method: "post",
    data: param,
  });
}
// 审批素材库
export function PostApprovalWorkCourseMaterialSave(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalWorkCourseMaterialSave,
    method: "post",
    data: param,
  });
}
// 审批成品库
export function PostApprovalWorkCourseFinished(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalWorkCourseFinished,
    method: "post",
    data: param,
  });
}
// 审批试题库
export function PostApprovalTestImportFile(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostApprovalTestImportFile,
    method: "post",
    data: param,
  });
}
