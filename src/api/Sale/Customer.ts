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

    //??????
    GetCustomerTogtherList:'/sale/api/Customer/GetCustomerTogtherList',
    GetAppCustomerTogther:'/sale/api/Customer/GetAppCustomerTogther',
    GetChangeRecordById:'/sale/api/Customer/GetChangeRecordById',
    PostApprovalCustomerChange:'/sale/api/Customer/PostApprovalCustomerChange',

    //????????????
    GetCustomerCommunalList:'/sale/api/Customer/GetCustomerCommunalList',
    GetClaimCustomer:'/sale/api/Customer/GetClaimCustomer',
    GetClaimCusList:'/sale/api/Customer/GetClaimCusList',
    //????????????
    PostAddCustomerCommunicate:'/sale/api/Customer/PostAddCustomerCommunicate',
    PostAddCusCommunicateEntity:'/sale/api/Customer/PostAddCusCommunicateEntity',
    GetCusCommunicateList:'/sale/api/Customer/GetCusCommunicateList',
    GetCusCommunicateInfo:'/sale/api/Customer/GetCusCommunicateInfo',
    GetAppCommunicateList:'/sale/api/Customer/GetAppCommunicateList',
    GetUpdateCommunicateState:'/sale/api/Customer/GetUpdateCommunicateState',

    //????????????
    PostAddPurchase:'/sale/api/Customer/PostAddPurchase',
    GetPurchaseInfo:'/sale/api/Customer/GetPurchaseInfo',
    GetPurchaseList:'/sale/api/Customer/GetPurchaseList',
    //????????????
    PostAddPayment:'/sale/api/Customer/PostAddPayment',
    GetPaymentInfo:'/sale/api/Customer/GetPaymentInfo',
    GetPaymentList:'/sale/api/Customer/GetPaymentList',
    //????????????
    PostAddCompete:'/sale/api/Customer/PostAddCompete',
    GetCompeteList:'/sale/api/Customer/GetCompeteList',
    GetCompeteInfo:'/sale/api/Customer/GetCompeteInfo',

    //????????????
    GetUserRegionList:'/hr/api/HRRegionSetting/GetUserRegionList',
    PostAddRegional:'/sale/api/Customer/PostAddRegional',
    GetRegionalInfo:'/sale/api/Customer/GetRegionalInfo',
    PostApprovalRegional:'/sale/api/Customer/PostApprovalRegional',

    PostConfirmBrand:'/sale/api/Customer/PostConfirmBrand',
    GetJudgeCustomerClaim:'/sale/api/Customer/GetJudgeCustomerClaim',

    //????????????
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

// ????????????
export function GetCheckedCustomerList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCheckedCustomerList,
        method: 'get',
        params: param
    })
}
//??????????????????
export function GetAllRegionTree() {
    return request({
      url: api.GetAllRegionTree,
      method: 'get'
    })
  }
// ????????????
export function GetAllCustomerByAddCustomer(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetAllCustomerByAddCustomer}/${param}`,
        method: 'get'
    })
}
// ????????????????????????
export function GetCustomerProblems():Promise<IResponse> {
    return request({
        url: api.GetCustomerProblems,
        method: 'get'
    })
}
// ????????????
export function GetCustomerTrade():Promise<IResponse> {
    return request({
        url: api.GetCustomerTrade,
        method: 'get'
    })
}
// ???????????????????????????
export function PostAddCustomer(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomer,
      method: "post",
      data: param,
    });
  }
  // ??????????????????????????????
export function PostAddOrEditSituationInfo(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddOrEditSituationInfo,
      method: "post",
      data: param,
    });
  }
  // ????????????id???????????????
export function GetSituationInfoList(param: any):Promise<IResponse> {
    return request({
        url: api.GetSituationInfoList,
        method: 'get',
        params: param
    })
}
  // ????????????id??????????????????
  export function GetCustomer(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomer,
        method: 'get',
        params: param
    })
}
  //???????????????????????????????????????
  export function GetCustomersByName(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomersByName,
        method: 'get',
        params: param
    })
}
// ??????????????????
export function PostAddCustomerRelation(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerRelation,
      method: "post",
      data: param,
    });
  }
    // ??????????????????
export function GetDeleteRelation(param: any):Promise<IResponse> {
    return request({
        url: api.GetDeleteRelation,
        method: 'get',
        params: param
    })
}
// ???????????????
export function GetDeleteSituationInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetDeleteSituationInfo,
        method: 'get',
        params: param
    })
}
//????????????id??????????????????
export function GetRelationList(param: any):Promise<IResponse> {
    return request({
        url: api.GetRelationList,
        method: 'get',
        params: param
    })
}
//?????????????????????
export function GetSituationInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetSituationInfo,
        method: 'get',
        params: param
    })
}
//????????????id????????????????????????
export function GetSituationCommList(param: any):Promise<IResponse> {
    return request({
        url: api.GetSituationCommList,
        method: 'get',
        params: param
    })
}
//????????????????????????
export function PostAddSituationComm(param: any):Promise<IResponse> {
    return request({
        url: api.PostAddSituationComm,
        method: 'post',
        data: param
    })
}

//?????????????????????????????????
export function GetSentimentList(param: any):Promise<IResponse> {
    return request({
        url: api.GetSentimentList,
        method: 'get',
        params: param
    })
}

//????????????????????????????????????
export function GetOrderCompanyInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetOrderCompanyInfo,
        method: 'get',
        params: param
    })
}

// ??????????????????
export function GetRegionTreeByUserId(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetRegionTreeByUserId}/${param}`,
        method: 'get'
    })
}
// ??????????????????
export function GetRegionTree(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetRegionTree}/${param}`,
        method: 'get'
    })
}
// ??????????????????
export function PostAddCustomerReports(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerReports,
      method: "post",
      data: param,
    });
  }
  //????????????id?????????id??????????????????
export function GetCustomerReportsById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerReportsById,
        method: 'get',
        params: param
    })
}
//????????????id??????????????????
export function GetCustomerReportsList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerReportsList,
        method: 'get',
        params: param
    })
}
// ??????????????????
export function PostEditCompetitor(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostEditCompetitor,
      method: "post",
      data: param,
    });
  }
  ///????????????id??????????????????
  export function GetCustomerRankByUserId(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerRankByUserId,
        method: 'get',
        params: param
    })
}
// ???????????????????????????
export function GetSaleCompUserList():Promise<IResponse> {
    return request({
        url: api.GetSaleCompUserList,
        method: 'get'
    })
}
// ???????????????????????????
export function PostAddCustomerTogether(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerTogether,
      method: "post",
      data: param,
    });
  }
///????????????????????????
  export function GetCustomerInvoiceById(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerInvoiceById,
        method: 'get',
        params: param
    })
}
///??????????????????
export function GetCustomerCommunalList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerCommunalList,
        method: 'get',
        params: param
    })
}
///????????????
export function GetClaimCustomer(param: any):Promise<IResponse> {
    return request({
        url: api.GetClaimCustomer,
        method: 'get',
        params: param
    })
}
//??????????????????????????????????????????
export function GetClaimCusList(param: any):Promise<IResponse> {
    return request({
        url: api.GetClaimCusList,
        method: 'get',
        params: param
    })
}

///??????????????????????????????
export function GetCustomerTogtherList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCustomerTogtherList,
        method: 'get',
        params: param
    })
}
///??????????????????
export function GetAppCustomerTogther(param: any):Promise<IResponse> {
    return request({
        url: api.GetAppCustomerTogther,
        method: 'get',
        params: param
    })
}
//??????id??????????????????
export function GetChangeRecordById(param: any):Promise<IResponse> {
    return request({
        url: api.GetChangeRecordById,
        method: 'get',
        params: param
    })
}
//????????????
export function PostApprovalCustomerChange(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostApprovalCustomerChange,
      method: "post",
      data: param,
    });
  }
//??????????????????
  export function PostAddCustomerCommunicate(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCustomerCommunicate,
      method: "post",
      data: param,
    });
  }
  //??????????????????
  export function PostAddCusCommunicateEntity(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCusCommunicateEntity,
      method: "post",
      data: param,
    });
  }
    //????????????id??????????????????
export function GetCusCommunicateList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCusCommunicateList,
        method: 'get',
        params: param
    })}
    //????????????????????????
export function GetCusCommunicateInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetCusCommunicateInfo,
        method: 'get',
        params: param
    })}
        //????????????????????????
export function GetAppCommunicateList(param: any):Promise<IResponse> {
    return request({
        url: api.GetAppCommunicateList,
        method: 'get',
        params: param
    })}
//????????????
export function GetUpdateCommunicateState(param: any):Promise<IResponse> {
        return request({
            url: api.GetUpdateCommunicateState,
            method: 'get',
            params: param
        })}
  //??????????????????
  export function PostAddPurchase(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddPurchase,
      method: "post",
      data: param,
    });
  }
    //????????????????????????
export function GetPurchaseInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetPurchaseInfo,
        method: 'get',
        params: param
    })}
    //????????????????????????
export function GetPurchaseList(param: any):Promise<IResponse> {
    return request({
        url: api.GetPurchaseList,
        method: 'get',
        params: param
    })}

  //??????????????????
export function PostAddPayment(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddPayment,
      method: "post",
      data: param,
    });
  }
    //????????????????????????
export function GetPaymentInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetPaymentInfo,
        method: 'get',
        params: param
    })}
    //????????????????????????
export function GetPaymentList(param: any):Promise<IResponse> {
    return request({
        url: api.GetPaymentList,
        method: 'get',
        params: param
    })}
  //??????????????????
  export function PostAddCompete(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddCompete,
      method: "post",
      data: param,
    });
  }
    //????????????????????????
export function GetCompeteList(param: any):Promise<IResponse> {
    return request({
        url: api.GetCompeteList,
        method: 'get',
        params: param
    })}
    //????????????????????????
export function GetCompeteInfo(param: any):Promise<IResponse> {
    return request({
        url: api.GetCompeteInfo,
        method: 'get',
        params: param
    })}
//????????????
export function GetUserRegionList(param: any):Promise<IResponse> {
    return request({
        url: `${api.GetUserRegionList}/${param}`,
        method: 'get'
    })
}
  //??????????????????
  export function PostAddRegional(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostAddRegional,
      method: "post",
      data: param,
    });
  }
  ///??????????????????
  export function PostApprovalRegional(param: any): Promise<IResponse<any>> {
    return request({
      url: api.PostApprovalRegional,
      method: "post",
      data: param,
    });
  }
//????????????????????????
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
