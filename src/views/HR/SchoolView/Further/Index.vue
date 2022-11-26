<!--
 * @Author: ZHJ
 * @Date: 2022-08-08 14:37:07
 * @LastEditTime: 2022-08-09 09:45:49
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\SchoolView\Further\Index.vue
 * 版权声明
-->

<template>
  <div class="FurtherCurrentIndex">
    <CurrentIndex v-if="data.selectIndex == 8" :isHeader="false"></CurrentIndex>
    <RecordIndex v-if="data.selectIndex == 9" :isHeader="false"></RecordIndex>
  </div>
</template>

<script lang="ts">
import CurrentIndex from './_Components/CurrentIndex.vue'
import RecordIndex from './_Components/RecordIndex.vue'
import { useRouter } from 'vue-router'
import { defineComponent, onBeforeMount, onMounted, reactive } from 'vue'
import { onUpdated } from 'vue'

export default defineComponent({
  components: { CurrentIndex, RecordIndex },
  props: {},
  setup() {
    const router = useRouter()
    const data: any = reactive({
      selectIndex: 8
    })
    const handleSelect = (key: string, keyPath: string[]) => {
      data.selectIndex = key
    }
    onUpdated(() => {
      if (router.currentRoute.value.query.Id) {
        data.selectIndex = router.currentRoute.value.query.Id
      } else {
        data.selectIndex = 8
      }
    })
    onMounted(() => {
      if (router.currentRoute.value.query.Id) {
        data.selectIndex = router.currentRoute.value.query.Id
      } else {
        data.selectIndex = 8
      }
    })
    return {
      handleSelect,
      data
    }
  }
})
</script>

<style lang="postcss" scoped>
</style>
