import { defineStore } from 'pinia'
import { getDict } from '/@/api/system/dictionary'
import { getDeptTree, GetTypeDepartList } from '/@/api/system/dept'
import { GetPostList } from '/@/api/menu/menu'
import { number } from '@intlify/core-base'
export interface ICommonStore {
  Dict: any
  DeptTree: any
  DeptList: any
  PostList: any
  TechCurrEnquiryId: number
}
export const useCommonStore = defineStore({
  id: 'common',
  state: (): ICommonStore => ({
    Dict: {}, //字典数据
    DeptTree: [], //组织架构树
    DeptList: [], //获取事业部数据
    PostList: [], //获取岗位数据
    TechCurrEnquiryId: 0 //当前询价单Id
  }),
  getters: {
    // 获取字典
    getDict(state: { Dict: { [x: string]: any } }): any {
      return async function (n: any) {
        if (state.Dict[n]) {
          return state.Dict[n]
        } else {
          await getDict(n).then((res) => {
            state.Dict[n] = res.data
          })
          return state.Dict[n]
        }
      }
    },
    // 获取部门数据  1事业部 2部门 3大区
    getDept(state): any {
      return async function (n: any) {
        await GetTypeDepartList(n).then((res) => {
          state.DeptList = res.data
        })
        return state.DeptList
      }
    },
    // 获取岗位
    getPost(state): any {
      return async function (n: any) {
        await GetPostList().then((res) => {
          state.PostList = res.data
        })
        return state.PostList
      }
    },
    //  获取组织架构树
    getDeptTree(state): any {
      return async function (n: any) {
        if (state.DeptTree.length > 0) {
          return state.DeptTree
        } else {
          await getDeptTree().then((res) => {
            state.DeptTree = res.data
          })
          return state.DeptTree
        }
      }
    },
    // 获取当前询价单Id
    getTechCurrEnquiryId(): number {
      return this.TechCurrEnquiryId
    }
  },
  actions: {
    //设置询价单Id
    setTechCurrEnquiryId(val: number): void {
      this.TechCurrEnquiryId = val
    }
  }
})
