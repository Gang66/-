// 字典管理
export interface dictionaryData {
  ruleForm: {
    Name: string;
    Type: string;
    Status?: string;
    Remark: string;
    job: any;
  };
  Id?: number;
}
// 字典类型
export interface dictionaryTypeData {
  ruleForm: {
    ParentId: number | undefined;
    InfoLabel: string;
    NumSort: number | undefined;
    DicKey: string;
    Status: string;
    Remark: string;
    Type: any;
    job: any;
  };
  Id?: number;
}
