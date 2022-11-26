/*
 * @Author: ZHJ
 * @Date: 2022-04-21 09:12:11
 * @LastEditTime: 2022-11-03 17:08:52
 * @LastEditors: ZHJ
 * @Description:
 * @FilePath: \beifangrenzixitong\src\permission.ts
 * 版权声明
 */
import router from '/@/router'
import { configure, start, done } from 'nprogress'
import { RouteRecordRaw } from 'vue-router'
import { decode, encode } from '/@/utils/tools'
import { useLayoutStore } from '/@/store/modules/layout'
import { useLocal } from '/@/utils/tools'
import { msg } from '/@/assets/ts/hr/FurtherModalIndex'

configure({ showSpinner: false })
var num = 1
const loginRoutePath = '/Login'
const newUserRoutePath = ''
const loginFreePathArr = ['/HRInvite', '/HRInvite/HRForm']
const defaultRoutePath = '/'

router.beforeEach(async (to, from) => {
  start()
  const { getStatus, getMenubar, getTags, getUserInfo, setToken, logout, GenerateRoutes, getUser, concatAllowRoutes, changeTagNavList, addCachedViews, changeNocacheViewStatus } = useLayoutStore()
  // 修改页面title
  const reg = new RegExp(/^(.+)(\s\|\s.+)$/)
  const appTitle = import.meta.env.VITE_APP_TITLE
  document.title = !to.meta.title ? appTitle : appTitle.match(reg) ? appTitle.replace(reg, `${to.meta.title}$2`) : `${to.meta.title} | ${appTitle}`
  // 判断当前是否在登陆页面
  if (to.path.toLocaleLowerCase() === loginRoutePath.toLocaleLowerCase()) {
    done()
    if (getStatus.ACCESS_TOKEN) return typeof to.query.from === 'string' ? decode(to.query.from) : defaultRoutePath
    return
  }
  // 免登录
  for (let i = 0; i < loginFreePathArr.length; i++) {
    if (to.path.toLocaleLowerCase() === loginFreePathArr[i].toLocaleLowerCase()) {
      done()
      return
    }
  }

  // 判断是否登录
  if (!getStatus.ACCESS_TOKEN) {
    return loginRoutePath + (to.fullPath ? `?from=${encode(to.fullPath)}` : '')
  }

  // 前端检查token是否失效
  useLocal('token')
    .then((d) => setToken(d.ACCESS_TOKEN))
    .catch(() => logout())

  // 判断是否还没添加过路由
  if (getMenubar.menuList.length === 0) {
    await GenerateRoutes()
    await getUser()
    for (let i = 0; i < getMenubar.menuList.length; i++) {
      router.addRoute(getMenubar.menuList[i] as RouteRecordRaw)
    }
    concatAllowRoutes()
    return to.fullPath
  }
  // 跳转到完善档案
  if (getUserInfo.StaffState == '2' && to.path.toLocaleLowerCase() != '/AddFileForm'.toLocaleLowerCase()) {
    done()
    return '/AddFileForm'
  } else if (getUserInfo.StaffState == '1' && to.path.toLocaleLowerCase() == '/AddFileForm'.toLocaleLowerCase()) {
    if (getStatus.ACCESS_TOKEN) return typeof to.query.from === 'string' ? decode(to.query.from) : defaultRoutePath
    return
  }
  // 判断是否关停
  else if (getUserInfo.UnWorkStudyStatus == 2 && to.path.toLocaleLowerCase() != '/HR/SchoolView/Further/Index'.toLocaleLowerCase()) {
    if (router.currentRoute.value.path.toLocaleLowerCase() == '/HR/SchoolView/Further/Index'.toLocaleLowerCase()) {
      return false
    }
    msg({ router: router }) // 通过 `vm` 访问组件实例
    return false
  }
  // 判断是否是新人TrainStudyStatus==0
  else if (getUserInfo.TrainStudyStatus == 0 && to.path.toLocaleLowerCase() != '/HR/SchoolView/NewcomerTraining/Index'.toLocaleLowerCase() && to.path.toLocaleLowerCase() != '/AddFileForm'.toLocaleLowerCase()) {
    return '/HR/SchoolView/NewcomerTraining/Index'
  }
  changeTagNavList(to) // 切换导航，记录打开的导航(标签页)

  // 离开当前页面时是否需要添加当前页面缓存
  !new RegExp(/^\/redirect\//).test(from.path) &&
    getTags.tagsList.some((v) => v.name === from.name) &&
    !getTags.cachedViews.some((v) => v === from.name) &&
    !getTags.isNocacheView &&
    addCachedViews({
      name: from.name as string,
      noCache: from.meta.noCache as boolean
    })

  // 缓存重置
  changeNocacheViewStatus(false)
})

router.afterEach(() => {
  done()
})
