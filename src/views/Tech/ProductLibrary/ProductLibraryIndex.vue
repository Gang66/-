<template>
  <div class="bg-white rounded tech_ProductLibrary_ProductLibraryIndex p-5">
    <div class="h-14 bg-blue-50 rounded">
      <div class="w-800 h-14 m-auto">
        <div v-for="(item, index) in data.tabData" class="pt-2 pb-2 pl-6 pr-6 inline-block mt-2 text-sm cursor-pointer" :class="{ active: data.number == index }" @click="huanName(index)">
          {{ item.value }}
        </div>
      </div>
    </div>
    <!-- 首页 -->
    <ProductLibraryIndex v-if="data.number == 0" />
    <!-- 常规产品库 -->
    <GeneralProductLibrary v-if="data.number == 1" />
    <!-- 非常规产品库 -->
    <UnconventionalProductlibrary v-if="data.number == 2" />
    <!-- 组合产品库 -->
    <CombinedProductLibrary v-if="data.number == 3" />
    <!-- 驱动产品库 -->
    <DriveProductLibrary v-if="data.number == 4" />
    <!-- 配件产品库 -->
    <AccessoriesProductLibrary v-if="data.number == 5" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import ProductLibraryIndex from './_Components/ProductLibraryIndex_1.vue'
import GeneralProductLibrary from './_Components/GeneralProductLibrary.vue'
import UnconventionalProductlibrary from './_Components/UnconventionalProductlibrary.vue'
import CombinedProductLibrary from './_Components/CombinedProductLibrary.vue'
import DriveProductLibrary from './_Components/DriveProductLibrary.vue'
import AccessoriesProductLibrary from './_Components/AccessoriesProductLibrary.vue'

export default defineComponent({
  components: {
    ProductLibraryIndex,
    GeneralProductLibrary,
    UnconventionalProductlibrary,
    CombinedProductLibrary,
    DriveProductLibrary,
    AccessoriesProductLibrary
  },
  setup() {
    const data = reactive({
      number: '',
      tabData: [{ value: '首页' }, { value: '常规产品库' }, { value: '非常规产品库' }, { value: '组合产品库' }, { value: '驱动产品库' }, { value: '配件产品库' }]
    })

    // 名称切换
    const huanName = (index: any) => {
      data.number = index
      console.log(data.number)
    }
    const checkList = ref(['selected and disabled', ''])
    return {
      checkList,
      data,
      huanName
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_ProductLibrary_ProductLibraryIndex {
  .tech_ProductLibrary_ProductLibraryIndex_down {
    background-image: url('../../../assets/img/tech/proLibrbg.png');
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .active {
    color: #409eff;
    background: #ffffff;
    border-radius: 8px;
  }
  /* .actives {
    color: #ffffff;
    background: #409eff;
    border-radius: 24px;
  }
  .active2 {
    color: #ffffff;
    background: #409eff;
    border-radius: 8px;
  } */
  :deep(.el-button + .el-button) {
    margin-left: 0 !important;
  }
  .yinc {
    overflow: hidden;
  }
}
</style>
