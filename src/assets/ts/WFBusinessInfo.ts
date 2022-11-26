import { GetApplyFlowStep } from "/@/api/wf/WFManagement";
// 根据 DataId 和Code获取页面表审批流数据
export function GetApplyFlowStepEvent(val: any){
    return new Promise((resolve, reject)=>{
    GetApplyFlowStep(val).then((res) => {
            if(res.code==1){
                resolve(res);
            }else{
                res.data={
                    CheckId: 0,
                    Code: val.Code,
                    DataId: val.DataId,
                    FlowId: 0,
                    Step: 0,
                }
                resolve(res)
            }
        })
    })
}