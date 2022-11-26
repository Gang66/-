// 创新举措表单
export interface InnovateData<T = any> {
  isEdit: any
  ruleForm: {
    TypeId: string //创新类型Id
    Suggestion: Array<T> //建议
    Anonymous: boolean //匿名
    job: T //字典数据
  }
  Id: T
  selectIndex: number
}
