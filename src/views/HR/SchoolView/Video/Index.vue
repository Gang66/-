
<template>
  <div>
    <VideoTemplate></VideoTemplate>
    <slot name="footer">
      <div class="w-1500 m-auto mt-5">
        <el-card shadow="never">
          <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="课程概述" name="课程概述">
              <h1 class="font-semibold mb-2 text-2xl">跟对人做对事选对平台-MG2</h1>
              <div class="flex items-center">
                <!-- <div class="Video-hr bf-bg-blue-color"></div> -->
                <div class="flex items-center">
                  <div>课程评分：</div>
                  <el-rate v-model="value" size="large" />
                </div>
              </div>
              <div class="flex items-center my-1">
                <div class="flex items-center">
                  <el-tooltip class="box-item" effect="light" content="浏览量" placement="bottom">
                    <el-icon :size="16" class="cursor-pointer">
                      <el-icon-View />
                    </el-icon>
                  </el-tooltip>
                  <div class="ml-1">3</div>
                </div>
                <div class="flex items-center ml-3">
                  <el-tooltip class="box-item" effect="light" content="评论量" placement="bottom">
                    <el-icon :size="16" class="cursor-pointer">
                      <el-icon-ChatRound />
                    </el-icon>
                  </el-tooltip>
                  <div class="ml-1">0</div>
                </div>
                <div class="flex items-center ml-3">
                  <el-tooltip class="box-item" effect="light" content="收藏量" placement="bottom">
                    <el-icon :size="16" class="cursor-pointer">
                      <el-icon-Collection />
                    </el-icon>
                  </el-tooltip>
                  <div class="ml-1">0</div>
                </div>
                <div class="flex items-center ml-3">
                  <el-tooltip class="box-item" effect="light" content="个人学习次数" placement="bottom">
                    <el-icon :size="16" class="cursor-pointer">
                      <el-icon-Notebook />
                    </el-icon>
                  </el-tooltip>
                  <div class="ml-1">0/3</div>
                </div>
              </div>
              <div class="flex items-center">
                <div>创建时间：</div>
                <div>2022-04-30</div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="课程评论" name="课程评论">课程评论</el-tab-pane>
          </el-tabs>
        </el-card>
      </div>
    </slot>
  </div>
</template>

<script lang="ts">
import VideoTemplate from '../_Components/VideoTemplate.vue'
import { defineComponent, ref } from 'vue'
import { TabsPaneContext } from 'element-plus'
export default defineComponent({
  components: { VideoTemplate },
  props: {},
  setup() {
    const activeName = ref('课程概述')
    const value = 3
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
    return { activeName, handleClick, value }
  }
})
</script>

<style lang="postcss" scoped>
.Video-hr {
  height: 20px;
  width: 3px;
}
:deep(.el-rate--large) {
  height: 24px;
}
</style>
