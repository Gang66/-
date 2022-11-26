<template>
  <div class="inquiry_components_totalwages">
    <div class="mb-3 mt-3">
      <el-row :gutter="20">
        <!-- 工资合计 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-green-400 grid-content ep-bg-purple rounded-xl">
            <div class="m-8 my-0 p-5">
              <div class="inline-block text-center leading-8">
                <div class="mt-5">
                  <div>
                    <span class="font-bold text-2xl text-white">0.00</span>
                  </div>
                  <div>
                    <span class="text-sm text-white">工资合计 (元)</span>
                  </div>
                </div>
              </div>
              <div class="float-right inline-block inquiry_big_img">
                <i class="iconfont icon-qiandai ml-5 text-white" style="font-size: 60px" />
              </div>
            </div>
          </div>
        </el-col>
        <!-- 跟单量 -->

        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-yellow-500 grid-content ep-bg-purple rounded-xl">
            <div class="">
              <div class="h-32 float-left inquiry_big_img">
                <div class="mt-2 ml-2">
                  <i class="iconfont icon-dingdan2 text-white ml-5 w-7 h-8" style="font-size: 25px" />
                </div>
              </div>
              <div class="h-32 float-left leading-8 pt-2 ml-2">
                <div>
                  <span class="text-white">跟单量（个）</span>
                </div>
                <div>
                  <span class="font-bold text-2xl text-white">1000</span>
                </div>
                <div>
                  <span class="text-xs text-white">A级：10 个</span>
                  <span class="text-xs text-white ml-2">B级：4500 个</span>
                  <span class="text-xs text-white ml-2">C级：2000 个</span>
                </div>
              </div>
            </div>
          </div>
        </el-col>
        <!-- 跟进中 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-red-400 grid-content ep-bg-purple rounded-xl">
            <div class="float-left text-white ml-8 mt-8">
              <p class="text-2xl font-semibold">3</p>
              <p>跟进中（个）</p>
            </div>
            <i class="iconfont icon-dingdan7 float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
          </div>
        </el-col>
        <!-- 已结束 -->
        <el-col :md="24" :lg="6">
          <div class="inquiry_big_bg bg-blue-500 rounded-xl">
            <div class="float-left text-white ml-8 mt-8">
              <p class="text-2xl font-semibold">100</p>
              <p>已结束（个）</p>
            </div>
            <i class="iconfont icon-dingdan3 float-right text-white w-20 h-20 mt-5 inquiry_big_img" style="font-size: 60px" />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import '/@/assets/css/tech.css'

export default defineComponent({
  setup() {}
})
</script>

<style lang="postcss" scoped>
.inquiry_components_totalwages {
  @media only screen and (max-width: 1500px) {
    .inquiry_big_img {
      display: none;
    }
  }
}
</style>
