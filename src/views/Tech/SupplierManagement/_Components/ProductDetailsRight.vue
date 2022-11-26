<template>
  <div>
    <div class="w-80 bg-white float-right rounded-lg">
      <div class="">
        <div
          class="
            h-10
            bg-blue-500
            rounded-tr-lg rounded-tl-lg
            p-2
            text-white text-sm
          "
        >
          <span>主营产品</span>
        </div>
      </div>
      <div class="text-sm p-4">
        <p>减压阀</p>
        <div class="leading-8">
          <i
            class="arrow inline-block iconfont icon-youbian text-gray-300"
          />
          <p class="inline-block">
            <el-link type="primary"><span>先导活塞式减压阀</span></el-link
            ><span class="text-gray-400 ml-2 text-xs">Y43H-16C DN80</span>
          </p>
          <div
            class="
              w-5
              h-5
              bg-red-500
              rounded-full
              text-center
              float-right
              inline-block
              leading-normal
             mt-2
            "
          >
            <span class="text-white text-xs">常</span>
          </div>
        </div>
        <p>球阀</p>
        <div
          class="leading-8"
          v-for="(item, index) in 3"
        >
          <i
            class="arrow inline-block iconfont icon-youbian text-gray-300"
          />
          <p class="inline-block">
            <el-link type="primary"><span>先导活塞式减压阀</span></el-link
            ><span class="text-gray-400 ml-2 text-xs">Y43H-16C DN80</span>
          </p>
          <div
            class="
              w-5
              h-5
              bg-green-500
              rounded-full
              text-center
              float-right
              inline-block
              leading-normal
              mt-2
            "
          >
            <span class="text-white text-xs">常</span>
          </div>
        </div>
        <p>截止阀</p>
        <div class="leading-8" v-for="item in 3">
          <i
            class="arrow inline-block iconfont icon-youbian text-gray-300"
          />
          <p class="inline-block">
            <el-link type="primary"><span>先导活塞式减压阀</span></el-link
            ><span class="text-gray-400 ml-2 text-xs">Y43H-16C DN80</span>
          </p>
          <div
            class="
              w-5
              h-5
              bg-green-500
              rounded-full
              text-center
              float-right
              inline-block
              leading-normal
              mt-2
            "
          >
            <span class="text-white text-xs">常</span>
          </div>
        </div>
      </div>
    </div>
    <div class="w-80 bg-white float-right rounded-lg mt-4">
      <div
        class="
          h-10
          bg-blue-500
          rounded-tr-lg rounded-tl-lg
          p-2
          text-white text-sm
        "
      >
        <span>最高降价产品</span>
      </div>
      <div class="">
        <div class="mt-3" v-for="item in 4">
          <div class="h-24 pl-4">
            <div class="inline-block float-left">
              <!-- <el-image
              style="width: 100px; height: 100px"
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
            /> -->
              <img
                style="width: 80px; height: 80px"
                src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
                alt=""
              />
            </div>
            <div class="inline-block float-left text-sm leading-7 ml-4">
              <p>
                <el-link type="primary">先导活塞式减压阀 </el-link>
                <span class="text-xs text-blue-400 ml-4">Y43H-16C</span>
              </p>
              <p class="text-blue-400">
                <span class="text-xs text-blue-400">DN80</span>
                <span class="text-blue-400 ml-3">非常规使用</span>
              </p>
              <p class="text-gray-400">
                <span class="text-red-500">1950.00</span>
                <span class="float-right text-green-500">1950.00</span
                ><i
                  class="iconfont icon-downall float-right text-green-500"
                ></i>
              </p>
            </div>
          </div>
          <el-divider />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      showDetail: -1
    })

    const foldAndUnfold = (index: any, item: any) => {
      console.log('index====', index)
      if (data.showDetail === index) {
        //两次点击的对象相同，关闭
        data.showDetail = -1
      } else {
        //点击的对象不同，先关闭前一对象，再打开当前对象
        data.showDetail = index
      }
    }

    return {
      data,
      foldAndUnfold
    }
  }
})
</script>

<style lang="postcss" scoped>
.el-divider--horizontal {
  margin: 0px 0 0 0 !important;
}
</style>
