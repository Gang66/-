<template>
  <div class="bg-white border-red-400 rounded text-white flex-1 flex flex-col overflow-hidden">
    <div class="py-1 px-3 bg-red-400 shadow-md">危机专栏</div>
    <div class="flex flex-col items-center justify-center flex-1">
      <div class="grid grid-cols-2 gap-x-6 gap-y-1 text-center">
        <div v-for="(itm, idx) in list" :key="idx" class="rounded-xs bg-yellow-500 w-28 rounded flex flex-col justify-between text-sm">
          <div class="relative top-1">{{ itm.title }}</div>
          <div class="w-full py-1 bg-red-400 rounded-md mt-1 flex items-center text-xs justify-center">
            <div class="flex items-center">
              <div class="w-4 h-4 rounded-full bg-blue-500 text-white text-xs text-center leading-4 mr-0.5">潍</div>
              <div>{{ itm.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive } from 'vue'
const prop = defineProps({
  list: {
    type: Array,
    default: () => []
  }
})
const { list } = reactive(prop)
console.log(list)
</script>

<style scoped></style>
