import { defineStore } from 'pinia'

export interface ITechStore {
  TechCurrEnquiryId: number
  AccountBoomId: number
  Account: ITechAccountStore
}
export interface ITechAccountStore {
  Name: any
  Grouping: any
  Materials: any
  Specifications: any
  Model: any
}
export const useTechStore = defineStore({
  id: 'techStore',
  state: (): ITechStore => ({
    TechCurrEnquiryId: 0, //当前询价单Id
    AccountBoomId: 0, //当前询价单Id
    Account: {
      Name: [], //（核算）名称
      Grouping: [], //核算分组
      Materials: [], //产品材质
      Specifications: [], //获取产品规格
      Model: [] //获取产品型号
    }
  }),
  getters: {
    // 获取当前询价单Id
    getTechCurrEnquiryId(): number {
      return this.TechCurrEnquiryId
    },
    // 获取报价单Id
    getAccountBoomId(): number {
      return this.AccountBoomId
    },
    // 获取核算名称
    getAccountName(): any {
      return this.Account.Name
    },
    // 获取核算分组
    getAccountGrouping(): any {
      return this.Account.Grouping
    },
    // 获取产品材质
    getAccountMaterials(): any {
      return this.Account.Materials
    },
    //获取产品规格
    getAccountSpecifications(): any {
      return this.Account.Specifications
    },
    getAccountModel(): any {
      return this.Account.Model
    }
  },
  actions: {
    //设置询价单Id
    setTechCurrEnquiryId(val: number): void {
      this.TechCurrEnquiryId = val
    },
    // 设置报价单Id
    setAccountBoomId(val: number): void {
      this.AccountBoomId = val
    },
    // 设置核算名称
    setAccountName(val: any): void {
      this.Account.Name = val
    },
    // 设置核算分组
    setAccountGrouping(val: any): void {
      this.Account.Grouping = val
    },
    //设置产品材质
    setAccountMaterials(val: any): void {
      this.Account.Materials = val
    },
    //设置产品规格
    setAccountSpecifications(val: any): void {
      this.Account.Specifications = val
    },
    // 设置产品型号
    setAccountModel(val: any): void {
      this.Account.Model = val
    },
    // 清空Account中数据
    setAccount(): void {
      this.Account = {
        Name: [], //（核算）名称
        Grouping: [], //核算分组
        Materials: [], //产品材质
        Specifications: [], //获取产品规格
        Model: [] //获取产品型号
      }
    },
    
  }
})
