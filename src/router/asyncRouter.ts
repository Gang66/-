import { IMenubarList } from '/@/type/store/layout'
import { listToTree } from '/@/utils/tools'
import { useLayoutStore } from '/@/store/modules/layout'

// 动态路由名称映射表
const modules = import.meta.glob('../views/**/**.vue')
const components: IObject<() => Promise<typeof import('*.vue')>> = {
  Layout: (() => import('/@/layout/index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
  School: (() => import('/@/views/HR/SchoolView/Index/Index.vue')) as unknown as () => Promise<typeof import('*.vue')>,
  ComponentLayout: (() => import('/@/views/ComponentLayout.vue')) as unknown as () => Promise<typeof import('*.vue')>
}
Object.keys(modules).forEach((key) => {
  const nameMatch = key.match(/^\.\.\/views\/(.+)\.vue/)
  if (!nameMatch) return
  // 排除_Components文件夹下的文件
  if (nameMatch[1].includes('_Components')) return
  // 如果页面以Index命名，则使用父文件夹作为name
  const indexMatch = nameMatch[1].match(/(.*)\/Index$/i)
  let name = indexMatch ? indexMatch[1] : nameMatch[1]
  ;[name] = name.split('/').splice(-1)

  // HR文件夹下使用完整的路径 20220412修改
  if (nameMatch[1].includes('HR')) {
    ;[name] = key.split('../views').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  } else if (nameMatch[1].includes('System')) {
    // 字典
    ;[name] = key.split('../views').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  } else if (nameMatch[1].includes('Sale')) {
    // 销售
    ;[name] = key.split('../views').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  } else if (nameMatch[1].includes('Tech')) {
    // 技术
    ;[name] = key.split('../views').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  } else if (nameMatch[1].includes('Menu')) {
    // 岗位绑定
    ;[name] = key.split('../views').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  } else if (nameMatch[1].includes('AppMenu')) {
    // APP岗位绑定
    ;[name] = key.split('../views').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  } else if (nameMatch[1].includes('WF')) {
    // 审批流
    ;[name] = key.split('../views').splice(-1)
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  } else {
    components[name] = modules[key] as () => Promise<typeof import('*.vue')>
  }
})

const asyncRouter: IMenubarList[] = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: components['404'],
    meta: {
      title: 'NotFound',
      icon: '',
      hidden: true
    },
    redirect: {
      name: '404'
    }
  }
]

const generatorDynamicRouter = (data: IMenubarList[]): void => {
  const { setRoutes } = useLayoutStore()
  const routerList: IMenubarList[] = listToTree(data, 0)
  asyncRouter.forEach((v) => routerList.push(v))
  // 首页路由
  let homePath = ''
  const f = (data: IMenubarList[], pData: IMenubarList | null) => {
    for (let i = 0, len = data.length; i < len; i++) {
      const v: IMenubarList = data[i]
      if ((v.id || 0) > 0) {
        if (v.component != 'Layout') {
          // 记录第一个路由作为首页路由
          if (v.path && v.path.length > 1 && homePath == '') homePath = v.path
        }
      }
      if (typeof v.component === 'string') v.component = components[v.component]
      if (!v.component) {
        console.log('---- 错误路由 -----------', v.component, v)
      }
      if (!v.meta.permission || (pData && v.meta.permission.length === 0)) {
        v.meta.permission = pData && pData.meta && pData.meta.permission ? pData.meta.permission : []
      }
      if (v.children && v.children.length > 0) {
        f(v.children, v)
      }
    }
  }
  f(routerList, null)

  // 修改重定向
  routerList.forEach((item, index) => {
    if (index == 0) {
      // 修改默认首页的重定向
      item.path = '/'
      item.redirect = homePath
    } else if (item.name.indexOf('Component') == 0 && (item.children || []).length > 0) {
      item.redirect = (item.children || [])[0].path
    }
  })

  const _list = filterAsyncRoutes(routerList)
  console.log('---- 路由 -----------', _list)
  setRoutes(_list)
}

const filterAsyncRoutes = (routes: any) => {
  // 对后端返回的路由进行格式转换
  const asyncRoutes: Array<any> = []
  routes.forEach((route: any) => {
    const _obj = {} as any
    if (route.redirect) {
      if (typeof route.redirect === 'string' && route.redirect.indexOf('/') == 0) {
        _obj.redirect = route.redirect
      }
    }
    _obj.id = route.id
    _obj.component = route.component
    _obj.permission = route.permission
    _obj.name = route.name
    _obj.path = route.path
    _obj.meta = route.meta

    // 处理children嵌套路由
    if (route?.children?.length) {
      _obj.children = filterAsyncRoutes(route.children)
    }

    asyncRoutes.push(_obj)
  })
  return asyncRoutes
}

export { components, generatorDynamicRouter }
