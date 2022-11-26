import { InnovateData } from "/@/type/views/hr/Innovate";
import request from "/@/utils/request";
const api = {
  PostEditWorkCourseMaterialSave: "/hr/api/TrainWork/PostEditWorkCourseMaterialSave",
  GetWorkCourseMaterialPage: "/hr/api/TrainWork/GetWorkCourseMaterialPage",
  GetWorkCourseMaterialEntity: "/hr/api/TrainWork/GetWorkCourseMaterialEntity",
  GetDelWorkCourseMaterialSave: "/hr/api/TrainWork/GetDelWorkCourseMaterialSave",
  GetWorkCourseFinishedPage: "/hr/api/TrainWork/GetWorkCourseFinishedPage",
  GetWorkCourseFinishedEntity: "/hr/api/TrainWork/GetWorkCourseFinishedEntity",
  GetWorkCourseQuestionBankEntity: "/hr/api/TrainWork/GetWorkCourseQuestionBankEntity",
  PostEditWorkCourseFinishedSave: "/hr/api/TrainWork/PostEditWorkCourseFinishedSave",
  GetEditWorkCourseUndercarriageSave: "/hr/api/TrainWork/GetEditWorkCourseUndercarriageSave",
  GetWorkCourseQuestionBankPage: "/hr/api/TrainWork/GetWorkCourseQuestionBankPage",
  PostImportExcelTrainTest: "/hr/api/ShopDemandSurvey/PostImportExcelTrainTest",
  GetAllSysPostList: "/hr/api/SysPost/GetAllSysPostList",
  PostEditWorkCourseQuestionBankSave: "/hr/api/TrainWork/PostEditWorkCourseQuestionBankSave",
  GetCoursewareTestLibraryExport: "/hr/api/TrainWork/GetCoursewareTestLibraryExport",
  GetCourseTestErrorList: "/hr/api/TrainWork/GetCourseTestErrorList",
  GetTestLibraryById: "/hr/api/HRTrainCourseware/GetTestLibraryById",
  PostEditTestLibrary: "/hr/api/HRTrainCourseware/PostEditTestLibrary",
  GetApprovalWorkCourseMaterialSave: "/hr/api/TrainWork/GetApprovalWorkCourseMaterialSave",
  GetSetWorkCourseFinishedDefaultSave: "/hr/api/TrainWork/GetSetWorkCourseFinishedDefaultSave",
  GetApplyWorkCourseMaterialEntity: "/hr/api/TrainWork/GetApplyWorkCourseMaterialEntity",
  GetApplyWorkCourseFinishedInfo: "/hr/api/TrainWork/GetApplyWorkCourseFinishedInfo",
  GetAdoptWorkCourseQuestionBankEntityInfo: "/hr/api/TrainWork/GetAdoptWorkCourseQuestionBankEntityInfo",
};
// 上传素材
export function PostEditWorkCourseMaterialSave(param: InnovateData): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostEditWorkCourseMaterialSave,
    method: "post",
    data: param,
  });
}
// 课件素材列表数据
export function GetWorkCourseMaterialPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetWorkCourseMaterialPage,
    method: "get",
    params: param,
  });
}
  // 根据素材Id获取素材详情
  export function GetWorkCourseMaterialEntity(param: any): Promise<IResponse> {
    return request({
      url: api.GetWorkCourseMaterialEntity + "/" + param,
      method: "get",
    });
  }
    // 根据素材Id获取素材审批详情
    export function GetApplyWorkCourseMaterialEntity(param: any): Promise<IResponse> {
      return request({
        url: api.GetApplyWorkCourseMaterialEntity + "/" + param,
        method: "get",
      });
    }
  // 根据素材Id删除素材详情
  export function GetDelWorkCourseMaterialSave(param: any): Promise<IResponse> {
    return request({
      url: api.GetDelWorkCourseMaterialSave + "/" + param,
      method: "get",
    });
  }
  // 课件成品列表数据
export function GetWorkCourseFinishedPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetWorkCourseFinishedPage,
    method: "get",
    params: param,
  });
}
// 根据素材Id获取成品审批详情
export function GetApplyWorkCourseFinishedInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetApplyWorkCourseFinishedInfo + "/" + param,
    method: "get",
  });
}
// 根据成品Id获取素材详情
export function GetWorkCourseFinishedEntity(param: any): Promise<IResponse> {
  return request({
    url: api.GetWorkCourseFinishedEntity + "/" + param,
    method: "get",
  });
}
// 上传成品
export function PostEditWorkCourseFinishedSave(param: InnovateData): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostEditWorkCourseFinishedSave,
    method: "post",
    data: param,
  });
}
  // 根据成品Id删除素材详情
  export function GetEditWorkCourseUndercarriageSave(param: any): Promise<IResponse> {
    return request({
      url: api.GetEditWorkCourseUndercarriageSave + "/" + param,
      method: "get",
    });
  }
  // 试题库列表数据
export function GetWorkCourseQuestionBankPage(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetWorkCourseQuestionBankPage,
    method: "get",
    params: param,
  });
}
  // 试题库导入试题
  export function PostImportExcelTrainTest(param: any): Promise<IResponse<InnovateData>> {
    return request({
      url: api.PostImportExcelTrainTest,
      method: "post",
      data: param,
    });
  }
  // 面向人员
   export function GetAllSysPostList(): Promise<IResponse> {
    return request({
      url: api.GetAllSysPostList ,
      method: "get",
    });
  }
  // 培训课件导入试题
  export function PostEditWorkCourseQuestionBankSave(param: any): Promise<IResponse<InnovateData>> {
    return request({
      url: api.PostEditWorkCourseQuestionBankSave,
      method: "post",
      data: param,
    });
  }
    // 根据Id导出模板
    export function GetCoursewareTestLibraryExport(param: any): Promise<IResponse> {
      return request({
        url: api.GetCoursewareTestLibraryExport + "/" + param,
        method: "get",
      });
    }
// 试题纠错列表数据
export function GetCourseTestErrorList(param: Isearch): Promise<IResponse> {
  return request({
    url: api.GetCourseTestErrorList,
    method: "get",
    params: param,
  });
}
  // 根据Id查询试题纠错
  export function GetTestLibraryById(param: any): Promise<IResponse> {
    return request({
      url: api.GetTestLibraryById + "/" + param,
      method: "get",
    });
  }
  // 根据Id查询试题审批数据
  export function GetWorkCourseQuestionBankEntity(param: any): Promise<IResponse> {
    return request({
      url: api.GetWorkCourseQuestionBankEntity + "/" + param,
      method: "get",
    });
  }
   // 提交试题纠错
export function PostEditTestLibrary(param: any): Promise<IResponse<InnovateData>> {
  return request({
    url: api.PostEditTestLibrary,
    method: "post",
    data: param,
  });
}
 // 根据成品Id审批素材
 export function GetApprovalWorkCourseMaterialSave(param: any): Promise<IResponse> {
  return request({
    url: api.GetApprovalWorkCourseMaterialSave + "/" + param,
    method: "get",
  });
}
 // 根据Id获取课件通过详情
 export function GetAdoptWorkCourseQuestionBankEntityInfo(param: any): Promise<IResponse> {
  return request({
    url: api.GetAdoptWorkCourseQuestionBankEntityInfo + "/" + param,
    method: "get",
  });
}
  // 根据Id导出模板
  export function GetSetWorkCourseFinishedDefaultSave(courseId: number,fileId:number): Promise<IResponse> {
    return request({
      url: api.GetSetWorkCourseFinishedDefaultSave + "/" + courseId+'/'+fileId,
      method: "get",
    });
  }