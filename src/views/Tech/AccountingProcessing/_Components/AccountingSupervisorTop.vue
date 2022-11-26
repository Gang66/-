<template>
  <el-row :gutter="20">
    <!-- 今日 -->
    <el-col :md="24" :lg="6">
      <div class="inquiry_big_bg bg-red-400 grid-content ep-bg-purple rounded-xl">
        <div class="text-white p-3 pt-2">
          <div class="h-32 float-left leading-8 pt-2 ml-2">
            <div>
              <span class="text-white">今日成单量(笔)</span>
            </div>
            <div>
              <span class="font-bold text-2xl text-white">100</span>
            </div>
            <div>
              <span class="text-xs text-white">较昨日 15.9% <i class="iconfont icon-upall"></i> </span>
            </div>
          </div>
          <div>
            <i class="iconfont icon-dingdan1 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
          </div>
        </div>
      </div>
    </el-col>
    <!-- 本周 -->
    <el-col :md="24" :lg="6">
      <div class="inquiry_big_bg bg-orange-400 grid-content ep-bg-purple rounded-xl">
        <div class="text-white p-3 pt-2">
          <div class="h-32 float-left leading-8 pt-2 ml-2">
            <div>
              <span class="text-white">本周成单量(笔)</span>
            </div>
            <div>
              <span class="font-bold text-2xl text-white">100</span>
            </div>
            <div>
              <span class="text-xs text-white">较上周 15.9%<i class="iconfont icon-upall"></i> </span>
            </div>
          </div>
          <div>
            <i class="iconfont icon-dingdan3 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
          </div>
        </div>
      </div>
    </el-col>
    <!-- 本月 -->
    <el-col :md="24" :lg="6">
      <div class="inquiry_big_bg bg-blue-500 grid-content ep-bg-purple rounded-xl">
        <div class="text-white p-3 pt-2">
          <div class="h-32 float-left leading-8 pt-2 ml-2">
            <div>
              <span class="text-white">本月成单量(笔)</span>
            </div>
            <div>
              <span class="font-bold text-2xl text-white">100</span>
            </div>
            <div>
              <span class="text-xs text-white">较上月 15.9% <i class="iconfont icon-upall"></i> </span>
            </div>
          </div>
          <div>
            <i class="iconfont icon-dingdan21 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
          </div>
        </div>
      </div>
    </el-col>
    <!-- 总成交量 -->
    <el-col :md="24" :lg="6">
      <div class="inquiry_big_bg bg-green-400 grid-content ep-bg-purple rounded-xl">
        <div class="text-white p-3 pt-2">
          <div class="h-32 float-left leading-8 pt-2 ml-2">
            <div>
              <span class="text-white">总成单量(笔)</span>
            </div>
            <div>
              <span class="font-bold text-2xl text-white">450</span>
            </div>
            <div>
              <span class="text-xs text-white">较去年 15.9% <i class="iconfont icon-upall"></i> </span>
            </div>
          </div>
          <div>
            <i class="iconfont icon-dingdan2 float-right mr-3 mt-3 inquiry_big_img" style="font-size: 60px"></i>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '/@/assets/css/tech.css'

export default defineComponent({
  setup() {}
})
</script>

<style lang="postcss" scoped>
@media only screen and (max-width: 1500px) {
  .inquiry_big_img {
    display: none;
  }
}
</style>
