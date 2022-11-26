<template>
  <div v-if="getSetting.mode === 'vertical' || getMenubar.isPhone" class="flex items-center px-4 flex-wrap h-12 leading-12">
    <el-icon class="text-2xl cursor-pointer h-12 leading-12" @click="changeCollapsed">
      <el-icon-expand v-if="getMenubar.status" />
      <el-icon-fold v-else />
    </el-icon>
    <!-- 面包屑导航 -->
    <div class="px-4">
      <el-breadcrumb separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item key="/" :to="{ path: '/' }">主页</el-breadcrumb-item>
          <el-breadcrumb-item v-for="v in data.breadcrumbList" :key="v.path" :to="v.path">{{ v.title }}</el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
  </div>
  <div v-else class="flex items-center px-4 flex-wrap h-12 flex-1">
    <div class="layout-sidebar-logo flex relative shadow-lg w-40 leading-12 items-center">
      <img class="w-10 h-10" :src="icon" />
      <div v-if="getMenubar.status === 0 || getMenubar.status === 2" class="pl-2">
        <h1 class="text-2xl">北方阀业</h1>
        <h2 class="text-xs tracking-widest text-center">BEIFANGFAYE</h2>
      </div>
    </div>
    <div class="layout-sidebar-menubar flex flex-1 overflow-hidden">
      <layout-menubar />
    </div>
  </div>
  <div class="flex items-center flex-row-reverse px-4 min-width-32">
    <!-- 用户下拉 -->
    <el-dropdown>
      <span class="el-dropdown-link flex flex-center px-2">
        <el-avatar :size="30" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
        <span class="ml-2">{{ userInfo.RealName }}</span>
        <el-icon>
          <el-icon-arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>
            <div @click="openUserWindow">修改密码</div>
            <!-- <el-link href="http://code.zgbffm.com:8003" target="_blank" :underline="false">个人中心</el-link> -->
          </el-dropdown-item>
          <el-dropdown-item>
            <el-link href="http://code.zgbffm.com:8004" target="_blank" :underline="false">商学院</el-link>
          </el-dropdown-item>
          <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>

    <Notice />
    <Screenfull />
    <Search />
    <userInfo v-if="data.userInfoWindow" @closeWindow="data.userInfoWindow=false"></userInfo>
  </div>
</template>

<script lang="ts">
import userInfo from './userInfo.vue'
import { defineComponent, reactive, watch } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import Notice from '/@/layout/components/notice.vue'
import Screenfull from '/@/layout/components/screenfull.vue'
import Search from '/@/layout/components/search.vue'
import LayoutMenubar from '/@/layout/components/menubar.vue'
import icon from '/@/assets/img/icon.png'

interface IBreadcrumbList {
  path: string
  title: string | symbol
}
// 面包屑导航
const breadcrumb = (route: RouteLocationNormalizedLoaded) => {
  const fn = () => {
    const breadcrumbList: Array<IBreadcrumbList> = []
    const notShowBreadcrumbList = ['Dashboard', 'RedirectPage'] // 不显示面包屑的导航
    if (route.matched[0] && notShowBreadcrumbList.includes(route.matched[0].name as string)) return breadcrumbList
    route.matched.forEach((v) => {
      const obj: IBreadcrumbList = {
        title: v.meta.title as string,
        path: v.path
      }
      breadcrumbList.push(obj)
    })
    return breadcrumbList
  }
  let data = reactive({
    breadcrumbList: fn()
  })
  watch(
    () => route.path,
    () => (data.breadcrumbList = fn())
  )
  return { data }
}
///弹窗
const window = (data: any) => {
  //打开个人中心弹窗
  const openUserWindow = () => {
    data.userInfoWindow = true
  }
  return { openUserWindow }
}
export default defineComponent({
  name: 'LayoutNavbar',
  components: {
    Notice,
    Search,
    Screenfull,
    LayoutMenubar,
    userInfo
  },
  setup() {
    const data = reactive({
      userInfoWindow: false
    })
    const { getMenubar, getUserInfo, changeCollapsed, logout, getSetting } = useLayoutStore()
    const route = useRoute()
    return {
      getMenubar,
      userInfo: getUserInfo,
      changeCollapsed,
      logout,
      ...breadcrumb(route),
      data,
      ...window(data),
      getSetting,
      icon
    }
  }
})
</script>

<style lang="postcss" scoped>
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.5s;
}

.breadcrumb-enter-from,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.5s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
