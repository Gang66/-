export interface IFlowSearch {
    name: string
    category: string
}

export interface IFlowCore {
    Id: number
    FlowNo: string
    Name: string
    IsConfirm: string
    Category: string
    IsDel: number
    CreateBy: number
    UpdateBy: number
    UpdateOn: Date | undefined
    CreateOn: Date
    FlowNodes: Array<IFlowNode>
}

export interface IFlowNode {
    Id: number
    NodeName: string
    FlowId: number
    FlowNo: string
    Step: number | undefined
    UserType: number | undefined
    Category: string
    Checker: string
    IsAny: string
    WherePara: string
    Editpara: string
    IsNotice: string
    CreateBy: number
    UpdateBy: number | undefined
    UpdateOn: Date | undefined
    CreateOn: Date
    RoleName: string
    CheckerList: number[]
}

export interface IFlowStep {
    Id: number
    FlowId: number
    CategoryId: number
    NodeId: number
    RoleId: number | undefined
    DataId: string
    Category: string
    Step: number | undefined
    State: number | undefined
    Checker: string
    CheckTime: string
    Remark: string
    CreateBy: number
    Sign: string
    UpdateBy: number | undefined
    UpdateOn: Date | undefined
    CreateOn: Date
}

export interface IFlowTable {
    Id: number
    FlowId: number
    TableName: string
    Code: string
    Flow: IFlowCore | undefined
}