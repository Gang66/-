import request from '/@/utils/request'
import { dictionaryData } from '/@/type/views/system/dictionary'
const api = {
    GetCheckedCustomerList: '/sale/api/Customer/GetCheckedCustomerList',
    GetAllCustomerByAddCustomer:'/sale/api/Customer/GetAllCustomerByAddCustomer',
    GetCustomerProblems:'/sale/api/Customer/GetCustomerProblems',
    GetCustomerTrade:'/sale/api/Customer/GetCustomerTrade',
    PostAddCustomer:'/sale/api/Customer/PostAddCustomer',
    PostAddOrEditSituationInfo:'/sale/api/Customer/PostAddOrEditSituationInfo',
    GetSituationInfoList:'/sale/api/Customer/GetSituationInfoList',
    GetCustomer:'/sale/api/Customer/GetCustomer',
    GetCustomersByName:'/sale/api/Customer/GetCustomersByName',
    PostAddCustomerRelation:'/sale/api/Customer/PostAddCustomerRelation',
    GetDeleteRelation:'/sale/api/Customer/GetDeleteRelation',
    GetDeleteSituationInfo:'/sale/api/Customer/GetDeleteSituationInfo',
    GetRelationList:'/sale/api/Customer/GetRelationList',
    GetSituationInfo:'/sale/api/Customer/GetSituationInfo',
    GetSituationCommList:'/sale/api/Customer/GetSituationCommList',
    PostAddSituationComm:'/sale/api/Customer/PostAddSituationComm',
    GetSentimentList:'/sale/api/Customer/GetSentimentList',
    GetOrderCompanyInfo:'/sale/api/Customer/GetOrderCompanyInfo',
    GetRegionTreeByUserId:'/hr/api/HRRegionSetting/GetRegionTreeByUserId',
    GetRegionTree:'/hr/api/HRRegionSetting/GetRegionTree',
    GetAllRegionTree: '/hr/api/HRRegionSetting/GetAllRegionTree',

    PostAddCustomerReports:'/sale/api/Customer/PostAddCustomerReports',
    GetCustomerReportsById:'/sale/api/Customer/GetCustomerReportsById',
    GetCustomerReportsList:'/sale/api/Customer/GetCustomerReportsList',
    PostEditCompetitor:'/sale/api/Customer/PostEditCompetitor',
    GetCustomerRankByUserId:'/sale/api/Customer/GetCustomerRankByUserId',
    GetSaleCompUserList:'/hr/api/SysUser/GetSaleCompUserList',
    PostAddCustomerTogether:'/sale/api/Customer/PostAddCustomerTogether',
    GetCustomerInvoiceById:'/sale/api/Customer/GetCustomerInvoiceById',

    //协作
    GetCustomerTogtherList:'/sale/api/Customer/GetCustomerTogtherList',
    GetAppCustomerTogther:'/sale/api/Customer/GetAppCustomerTogther',
    GetChangeRecordById:'/sale/api/Customer/GetChangeRecordById',
    PostApprovalCustomerChange:'/sale/api/Customer/PostApprovalCustomerChange',

    //客户公海
    GetCustomerCommunalList:'/sale/api/Customer/GetCustomerCommunalList',
    GetClaimCustomer:'/sale/api/Customer/GetClaimCustomer',
    GetClaimCusList:'/sale/api/Customer/GetClaimCusList',
    //客户沟通
    PostAddCustomerCommunicate:'/sale/api/Customer/PostAddCustomerCommunicate',
    PostAddCusCommunicateEntity:'/sale/api/Customer/PostAddCusCommunicateEntity',
    GetCusCommunicateList:'/sale/api/Customer/GetCusCommunicateList',
    GetCusCommunicateInfo:'/sale/api/Customer/GetCusCommunicateInfo',
    GetAppCommunicateList:'/sale/api/Customer/GetAppCommunicateList',
    GetUpdateCommunicateState:'/sale/api/Customer/GetUpdateCommunicateState',

    //采购原则
    PostAddPurchase:'/sale/api/Customer/PostAddPurchase',
    GetPurchaseInfo:'/sale/api/Customer/GetPurchaseInfo',
    GetPurchaseList:'/sale/api/Customer/GetPurchaseList',
    //付款方式
    PostAddPayment:'/sale/api/Customer/PostAddPayment',
    GetPaymentInfo:'/sale/api/Customer/GetPaymentInfo',
    GetPaymentList:'/sale/api/Customer/GetPaymentList',
    //竞争对手
    PostAddCompete:'/sale/api/Customer/PostAddCompete',
    GetCompeteList:'/sale/api/Customer/GetCompeteList',
    GetCompeteInfo:'/sale/api/Customer/GetCompeteInfo',

    //区域申请
    GetUserRegionList:'/hr/api/HRRegionSetting/GetUserRegionList',
    PostAddRegional:'/sale/api/Customer/PostAddRegional',
    GetRegionalInfo:'/sale/api/Customer/GetRegionalInfo',
    PostApprovalRegional:'/sale/api/Customer/PostApprovalRegional',

    PostConfirmBrand:'/sale/api/Customer/PostConfirmBrand',
    GetJudgeCustomerClaim:'/sale/api/Customer/GetJudgeCustomerClaim',

    //数据分析
    GetCustomerAnalysis:'/sale/api/Customer/GetCustomerAnalysis',
    GetRegionRank:'/sale/api/Customer/GetRegionRank',



}

export function GetCustomerAnalysis(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerAnalysis,
        method: 'get',
        params: param
    })
}
export function GetRegionRank(param: any):Promise<IResponse> {
    return request({
        url: api.GetRegionRank,
        method: 'get',
        params: param
    })
}

// 客户列表
export function GetCheckedCustomerList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCheckedCustomerList,
        method: 'get',
        params: param
    })
}
//获取全部区域
export function GetAllRegionTree() {
    return request({
      url: api.GetAllRegionTree,
      method: 'get'
    })
  }
// 客户列表
export function GetAllCustomerByAddCustomer(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetAllCustomerByAddCustomer}/${param}`,
        method: 'get'
    })
}
// 客户主观调查问题
export function GetCustomerProblems():Promise<IResponse> {
    return request({
        url: api.GetCustomerProblems,
        method: 'get'
    })
}
// 行业类型
export function GetCustomerTrade():Promise<IResponse> {
    return request({
        url: api.GetCustomerTrade,
        method: 'get'
    })
}
// 新增或修改客户信息
export function PostAddCustomer(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomer,
      method: "post",
      data: param,
    });
  }
  // 新增或修改联系人信息
export function PostAddOrEditSituationInfo(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddOrEditSituationInfo,
      method: "post",
      data: param,
    });
  }
  // 根据客户id获取联系人
export function GetSituationInfoList(param: any):Promise<IResponse> {
    return request({
        url: api.GetSituationInfoList,
        method: 'get',
        params: param
    })
}
  // 根据客户id获取客户信息
  export function GetCustomer(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomer,
        method: 'get',
        params: param
    })
}
  //根据客户名获取所添加的客户
  export function GetCustomersByName(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomersByName,
        method: 'get',
        params: param
    })
}
// 新增关联企业
export function PostAddCustomerRelation(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerRelation,
      method: "post",
      data: param,
    });
  }
    // 删除关联企业
export function GetDeleteRelation(param: any):Promise<IResponse> {
    return request({
        url: api.GetDeleteRelation,
        method: 'get',
        params: param
    })
}
// 删除联系人
export function GetDeleteSituationInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetDeleteSituationInfo,
        method: 'get',
        params: param
    })
}
//根据客户id获取关联企业
export function GetRelationList(param: any):Promise<IResponse> {
    return request({
        url: api.GetRelationList,
        method: 'get',
        params: param
    })
}
//获取联系人详情
export function GetSituationInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetSituationInfo,
        method: 'get',
        params: param
    })
}
//根据客户id获取客户主观调查
export function GetSituationCommList(param: any):Promise<IResponse> {
    return request({
        url: api.GetSituationCommList,
        method: 'get',
        params: param
    })
}
//添加客户主观调查
export function PostAddSituationComm(param: any):Promise<IResponse> {
    return request({
        url: api.PostAddSituationComm,
        method: 'post',
        data: param
    })
}

//获取联系人主观调查列表
export function GetSentimentList(param: any):Promise<IResponse> {
    return request({
        url: api.GetSentimentList,
        method: 'get',
        params: param
    })
}

//根据名称获取报价单位信息
export function GetOrderCompanyInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetOrderCompanyInfo,
        method: 'get',
        params: param
    })
}

// 获取用户区域
export function GetRegionTreeByUserId(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetRegionTreeByUserId}/${param}`,
        method: 'get'
    })
}
// 获取全部区域
export function GetRegionTree(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetRegionTree}/${param}`,
        method: 'get'
    })
}
// 添加客户报告
export function PostAddCustomerReports(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerReports,
      method: "post",
      data: param,
    });
  }
  //根据客户id或报告id获取客户报告
export function GetCustomerReportsById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerReportsById,
        method: 'get',
        params: param
    })
}
//根据客户id获取报告列表
export function GetCustomerReportsList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerReportsList,
        method: 'get',
        params: param
    })
}
// 添加客户报告
export function PostEditCompetitor(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostEditCompetitor,
      method: "post",
      data: param,
    });
  }
  ///根据用户id获取客户排名
  export function GetCustomerRankByUserId(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerRankByUserId,
        method: 'get',
        params: param
    })
}
// 获取销售部门和人员
export function GetSaleCompUserList():Promise<IResponse> {
    return request({
        url: api.GetSaleCompUserList,
        method: 'get'
    })
}
// 新增或修改客户信息
export function PostAddCustomerTogether(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerTogether,
      method: "post",
      data: param,
    });
  }
///获取客户开票信息
  export function GetCustomerInvoiceById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerInvoiceById,
        method: 'get',
        params: param
    })
}
///客户公海列表
export function GetCustomerCommunalList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerCommunalList,
        method: 'get',
        params: param
    })
}
///认领客户
export function GetClaimCustomer(param: any):Promise<IResponse> {
    return request({
        url: api.GetClaimCustomer,
        method: 'get',
        params: param
    })
}
//根据客户获取已经被认领的品牌
export function GetClaimCusList(param: any):Promise<IResponse> {
    return request({
        url: api.GetClaimCusList,
        method: 'get',
        params: param
    })
}

///获取邀请协作确认列表
export function GetCustomerTogtherList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerTogtherList,
        method: 'get',
        params: param
    })
}
///确认邀请协作
export function GetAppCustomerTogther(param: any):Promise<IResponse> {
    return request({
        url: api.GetAppCustomerTogther,
        method: 'get',
        params: param
    })
}
//根据id获取协作详情
export function GetChangeRecordById(param: any):Promise<IResponse> {
    return request({
        url: api.GetChangeRecordById,
        method: 'get',
        params: param
    })
}
//审批协作
export function PostApprovalCustomerChange(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostApprovalCustomerChange,
      method: "post",
      data: param,
    });
  }
//提交客户沟通
  export function PostAddCustomerCommunicate(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerCommunicate,
      method: "post",
      data: param,
    });
  }
  //提交沟通记录
  export function PostAddCusCommunicateEntity(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCusCommunicateEntity,
      method: "post",
      data: param,
    });
  }
    //根据客户id获取沟通列表
export function GetCusCommunicateList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCusCommunicateList,
        method: 'get',
        params: param
    })}
    //获取沟通记录详情
export function GetCusCommunicateInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetCusCommunicateInfo,
        method: 'get',
        params: param
    })}
        //获取审批沟通列表
export function GetAppCommunicateList(param: any):Promise<IResponse> {
    return request({
        url: api.GetAppCommunicateList,
        method: 'get',
        params: param
    })}
//更改状态
export function GetUpdateCommunicateState(param: any):Promise<IResponse> {
        return request({
            url: api.GetUpdateCommunicateState,
            method: 'get',
            params: param
        })}
  //提交采购原则
  export function PostAddPurchase(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddPurchase,
      method: "post",
      data: param,
    });
  }
    //获取采购原则详情
export function GetPurchaseInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetPurchaseInfo,
        method: 'get',
        params: param
    })}
    //获取采购列表详情
export function GetPurchaseList(param: any):Promise<IResponse> {
    return request({
        url: api.GetPurchaseList,
        method: 'get',
        params: param
    })}

  //提交付款方式
export function PostAddPayment(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddPayment,
      method: "post",
      data: param,
    });
  }
    //获取付款方式详情
export function GetPaymentInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetPaymentInfo,
        method: 'get',
        params: param
    })}
    //获取付款方式列表
export function GetPaymentList(param: any):Promise<IResponse> {
    return request({
        url: api.GetPaymentList,
        method: 'get',
        params: param
    })}
  //提交竞争对手
  export function PostAddCompete(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCompete,
      method: "post",
      data: param,
    });
  }
    //获取竞争对手列表
export function GetCompeteList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCompeteList,
        method: 'get',
        params: param
    })}
    //获取竞争对手详情
export function GetCompeteInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetCompeteInfo,
        method: 'get',
        params: param
    })}
//获取区域
export function GetUserRegionList(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetUserRegionList}/${param}`,
        method: 'get'
    })
}
  //提交区域申请
  export function PostAddRegional(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddRegional,
      method: "post",
      data: param,
    });
  }
  ///审批区域申请
  export function PostApprovalRegional(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostApprovalRegional,
      method: "post",
      data: param,
    });
  }
//获取区域申请详情
export function GetRegionalInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetRegionalInfo,
        method: 'get',
        params: param
    })}

export function PostConfirmBrand(param: any): Promise<IResponse<any>> {
    return request({
        url: api.PostConfirmBrand,
        method: "post",
        data: param,
    });
    }
export function GetJudgeCustomerClaim(param: any):Promise<IResponse> {
    return request({
        url: api.GetJudgeCustomerClaim,
        method: 'get',
        params: param
    })}
