<template>
  <div class="bf-content">
    <el-row :gutter="10">
      <el-col :md="24" :lg="12">
        <tree :tree-list="list" />
      </el-col>
      <el-col :md="24" :lg="12">
        <div>
          <el-tabs type="border-card">
            <el-tab-pane label="通知">
              <list :data="data">
                <template #default="scope">
                  <el-button @click="edit(scope.item)">操作</el-button>
                </template>
              </list>
            </el-tab-pane>
            <el-tab-pane label="关注">
              <list :data="data" />
            </el-tab-pane>
            <el-tab-pane label="待办">
              <list :data="data" />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import List, { IList } from '/@/components/List/index.vue'
import { IMenubarList } from '/@/type/store/layout'
import { listToTree } from '/@/utils/tools'
import tree from '/src/components/Tree/index.vue'
export default defineComponent({
  name: 'ListTest',
  components: {
    List,
    tree
  },
  setup() {
    let list = reactive([
      {
        id: 2,
        parentId: 0,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '集团总部', icon: 'el-icon-phone' }
      },
      {
        id: 20,
        parentId: 2,
        name: 'ProjectList',
        path: '/Project/ProjectList',
        isShow: true,
        component: 'ProjectList',
        meta: { title: '潍坊事业部', icon: 'el-icon-goods' }
      },
      {
        id: 21,
        parentId: 2,
        name: 'ProjectList',
        path: '/Project/ProjectList',
        isShow: true,
        component: 'ProjectList',
        meta: { title: '汉庭事业部', icon: 'el-icon-goods' }
      },
      {
        id: 22,
        parentId: 2,
        name: 'ProjectList',
        path: '/Project/ProjectList',
        isShow: true,
        component: 'ProjectList',
        meta: { title: '北京事业部', icon: 'el-icon-goods' }
      },
      {
        id: 200,
        parentId: 20,
        name: 'ProjectList',
        path: '/Project/ProjectList',
        isShow: false,
        component: 'ProjectList',
        meta: { title: '邀约管理', icon: 'el-icon-goods' }
      },
      {
        id: 201,
        parentId: 20,
        name: 'ProjectList',
        path: '/Project/ProjectList',
        isShow: false,
        component: 'ProjectList',
        meta: { title: '测试', icon: 'el-icon-goods' }
      },
      {
        id: 202,
        parentId: 20,
        name: 'ProjectList',
        path: '/Project/ProjectList',
        isShow: false,
        component: 'ProjectList',
        meta: { title: '侧视22', icon: 'el-icon-goods' }
      },
      {
        id: 3,
        parentId: 0,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '第一大区', icon: 'el-icon-phone' }
      },
      {
        id: 30,
        parentId: 3,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '南京事业部', icon: 'el-icon-phone' }
      },
      {
        id: 31,
        parentId: 3,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '测试事业部', icon: 'el-icon-phone' }
      },
      {
        id: 300,
        parentId: 30,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: false,
        redirect: '/Project/ProjectList',
        meta: { title: '销售一部', icon: 'el-icon-phone' }
      },
      {
        id: 4,
        parentId: 0,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '第二大区', icon: 'el-icon-phone' }
      },
      {
        id: 40,
        parentId: 4,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '南京事业部', icon: 'el-icon-phone' }
      },
      {
        id: 41,
        parentId: 4,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '南京事业部', icon: 'el-icon-phone' }
      },
      {
        id: 42,
        parentId: 4,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: true,
        redirect: '/Project/ProjectList',
        meta: { title: '南京事业部', icon: 'el-icon-phone' }
      },
      {
        id: 400,
        parentId: 40,
        name: 'Project',
        path: '/Project',
        component: 'Layout',
        isShow: false,
        redirect: '/Project/ProjectList',
        meta: { title: '销售一部', icon: 'el-icon-phone' }
      }
    ])
    const data: IList[] = [
      {
        iconClass: 'el-icon-goods',
        subTitle: '斗通关无际县军连用知政以该果思快领c。',
        tag: '科学搬砖组',
        time: '2021/01/28 15:21:32',
        href: 'javascript:;'
      },
      {
        iconClass: 'el-icon-goods',
        subTitle: '斗通关无际县军连用知政以该果思快领c。',
        tag: '科学搬砖组',
        time: '2021/01/28 15:21:32',
        href: 'javascript:;'
      },
      {
        iconClass: 'el-icon-goods',
        subTitle: '斗通关无际县军连用知政以该果思快领c。',
        tag: '科学搬砖组',
        time: '2021/01/28 15:21:32',
        href: 'javascript:;'
      }
    ]

    const edit = (item: IList) => console.log(item)
    return {
      data,
      edit,
      list
    }
  }
})
</script>
