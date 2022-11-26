<template>
  <div class="SchoolViewNavbar">
    <div class="fixed top-0 right-0 z-20 w-full boxShadow bg-white">
      <div class="flex px-52 h-20">
        <div class="logo-login-size">
          <svg-icon icon-class="svg-logo-login" />
        </div>
        <div class="ml-8 flex items-start justify-between w-full">
          <el-menu :default-active="data.activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" @select="handleSelect">
            <template v-for="(item, index) in permission_routers">
              <el-menu-item :index="item.path" v-if="item.dropdownList.length <= 0">{{ item.title }}</el-menu-item>
              <el-sub-menu :index="item.path" v-else>
                <template #title>{{ item.title }}</template>
                <el-menu-item :index="v.value" v-for="(v, i) in item.dropdownList">{{ v.label }}</el-menu-item>
              </el-sub-menu>
            </template>
          </el-menu>
          <div class="header_content_title">
            <ul>
              <template v-for="(item, index) in rightRouters">
                <router-link :to="item.path">
                  <li>
                    {{ item.title }}
                  </li>
                </router-link>
              </template>
              <li class="contents">
                <el-dropdown class="m-auto">
                  <div class="user_bg flex items-center">
                    <el-avatar :size="32" :src="data.avatar" />
                    <span class="ml-2">{{ data.userInfo.RealName }}</span>
                  </div>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <el-dropdown-item @click="Store.logout()">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <router-view class="view app-main"></router-view>
  <el-backtop :right="100" :bottom="100" :visibility-height="100" />
  <div class="relative" style="height: 144px">
    <div class="appLayoutFooter py-3 mt-64 absolute bottom-0">
      <img src="/src/assets/img/hr/SchoolView/home/home-logo.png" alt="" class="m-auto" />
      <div class="text-xs">中国·北方阀门集团有限公司 版权所有 | 鲁ICP123456789号</div>
    </div>
  </div>
</template>

<script lang="ts">
import ceshiTwo from '/@/assets/img/hr/SchoolView/home/ceshiTwo.png'
import { ElMessage } from 'element-plus'
import { defineComponent, onMounted, onUpdated, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useLayoutStore } from '/@/store/modules/layout'
import { prohibitOclick } from '../../../../assets/ts/hr/FurtherModalIndex'
let Store = useLayoutStore()
export default defineComponent({
  props: {},
  setup() {
    const router = useRouter()
    const permission_routers = ref([])
    const rightRouters = ref([
      { title: '创新举措', path: '/HR/View/Innovate/Index' },
      { title: '返回工作台', path: '/HR/View/Index' }
    ])
    const data = reactive({
      avatar: ceshiTwo, //头像图片
      userInfo: Store.getUserInfo,
      activeIndex: '/SchoolViewHome'
    })
    // 监听tab选项卡
    const handleSelect = (key: string, keyPath: string[]) => {
      // 根据用户状态禁止路由跳转
      const arr = prohibitOclick(Store.getUserInfo, keyPath[0])
      if (arr) return
      // 根据菜单进行路由跳转
      if (keyPath.length == 1) {
        router.push({ path: keyPath[0] })
      } else {
        router.push({ path: keyPath[0], query: { Id: keyPath[1] } })
      }
    }
    // 页面加载完毕生命周期
    onMounted(() => {
      // 获取路由状态选中不同tab
      if (router.currentRoute.value.query.Id) {
        data.activeIndex = String(router.currentRoute.value.query.Id)
      } else {
        data.activeIndex = router.currentRoute.value.path
      }
      var arr: any = []
      arr = [
        { title: '首页', path: '/SchoolViewHome', dropdownList: [] },
        {
          title: '培训江湖',
          path: '/HR/SchoolView/Train/Index',
          dropdownList: []
        },
        {
          title: '新人营地',
          path: '/HR/SchoolView/NewcomerTraining/Index',
          dropdownList: [
            {
              label: '当前学习',
              value: '1'
            },
            {
              label: '实操基地',
              value: '2'
            },
            {
              label: '我的总结',
              value: '3'
            },
            {
              label: '我的考勤',
              value: '4'
            },
            {
              label: '我的去向',
              value: '5'
            }
          ]
        },
        {
          title: '深造营地',
          path: '/HR/SchoolView/Further/Index',
          dropdownList: [
            {
              label: '学习任务',
              value: '8'
            },
            {
              label: '学习记录',
              value: '9'
            }
          ]
        }
      ]
      if (data.userInfo.PostIds.indexOf('152') == -1 && data.userInfo.PostIds.indexOf('169') == -1 && data.userInfo.PostIds.indexOf('105') == -1) {
      } else {
        arr.splice(1, 0, {
          title: '课程集市',
          path: '/CourseMarket',
          dropdownList: [
            {
              label: '当前课程',
              value: '6'
            },
            {
              label: '历史课程',
              value: '7'
            }
          ]
        })
      }
      permission_routers.value = arr
    })
    return {
      handleSelect,
      permission_routers,
      data,
      rightRouters,
      Store
    }
  }
})
</script>

<style lang="postcss" scoped>
.SchoolViewNavbar {
  height: 5rem;
  .el-menu-item {
    --el-menu-hover-bg-color: #fff !important;
  }
  .el-menu--horizontal {
    display: flex;
    flex-wrap: nowrap;
    border-bottom: none;
    border-right: none;
  }
  .logo-login-size {
    font-size: 7rem;
    .svg-icon {
      height: 80px;
    }
  }
  .header_content_title {
    /* text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    overflow-x: auto; */
  }

  .header_content_title > ul {
    display: flex;
    line-height: 80px;
  }

  .header_content_title li {
    font-size: 16px;
    color: rgba(54, 56, 94, 1);
    padding: 0 20px 0px 0px;
  }
  .homeActive {
    color: #409eff !important;
    font-weight: bold;
  }
  .boxShadow {
    box-shadow: 0 0.1rem 0.4rem rgb(0 21 41 / 8%);
  }
  .hr {
    width: 0%;
    margin: -17px auto 0 auto;
    background-color: #1e6ceb;
    height: 2px;
    transition: width 0.5s;
  }

  a:hover .hr {
    width: 100%;
  }
  .el-avatar {
    margin: auto;
  }
  .el-menu-demo {
    height: 80px;
  }
  :deep(.el-menu--horizontal > .el-menu-item.is-active) {
    border-bottom: none;
    color: var(--el-menu-active-color) !important;
  }
  :deep(.el-menu--horizontal > .el-menu-item) {
    border-bottom: none;
    font-size: 16px;
  }
  :deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__title) {
    border-bottom: none;
    font-size: 16px;
  }
  :deep(.el-menu--horizontal > .el-sub-menu .el-sub-menu__icon-arrow) {
    display: none;
  }
  .user_bg {
    height: 38px;
    line-height: 38px;
    padding: 0 10px;
    background: #f5f6f7;
    border-radius: 18px;
  }
}
.app-main {
  min-height: calc(100vh - 14rem);
  position: relative;
  overflow: hidden;
}
.appLayoutFooter {
  background-color: rgb(68, 69, 71);
  color: rgb(174, 174, 174);
  text-align: center;
  width: 100%;
}
.left-title {
  :deep(.el-dropdown) {
    font-size: 16px;
    margin: 32px 0 0;
  }
}
</style>
