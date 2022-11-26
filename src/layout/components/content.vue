<template>
  <el-scrollbar>
    <div class="bf-layout-content">
      <template v-if="setting.showLayoutRight">
        <el-row :gutter="10" class="h-screen">
          <el-col :md="24" :lg="setting.showLayoutRight == false ? 24 : 19">
            <router-view v-slot="{ Component }">
              <transition name="fade-transform" mode="out-in">
                <keep-alive :include="setting.showTags ? data.cachedViews : []">
                  <component :is="Component" :key="key" class="page relative" />
                </keep-alive>
              </transition>
            </router-view>
          </el-col>
          <el-col :md="24" :lg="5" v-if="setting.showLayoutRight">
            <layoutRight />
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <keep-alive :include="setting.showTags ? data.cachedViews : []">
              <component :is="Component" :key="key" class="page relative" />
            </keep-alive>
          </transition>
        </router-view>
      </template>
    </div>
    <el-backtop target=".layout-main-content>.el-scrollbar>.el-scrollbar__wrap" :bottom="15" :right="15">
      <div>
        <el-icon>
          <el-icon-caret-top />
        </el-icon>
      </div>
    </el-backtop>
  </el-scrollbar>
</template>

<script lang="ts">
import LayoutRight from '/@/views/HR/Components/LayoutRight/ManageRight.vue'
import { computed, defineComponent, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useLayoutStore } from '/@/store/modules/layout'

export default defineComponent({
  components: {
    LayoutRight
  },
  name: 'LayoutContent',
  setup() {
    const route = useRoute()
    const { getSetting, getTags } = useLayoutStore()

    const key = computed(() => route.path)

    let data = reactive({
      cachedViews: [...getTags.cachedViews]
    })
    // keep-alive的include重新赋值，解决bug https://github.com/vuejs/vue-next/issues/2550
    watch(
      () => getTags.cachedViews.length,
      () => (data.cachedViews = [...getTags.cachedViews])
    )
    return {
      key,
      data,
      setting: getSetting
    }
  }
})
</script>

<style lang="postcss" scoped>
:deep(.el-card) {
  overflow: visible;
}

/* :deep(.el-scrollbar__view) {
    height: 100%;
} */

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-transform-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
