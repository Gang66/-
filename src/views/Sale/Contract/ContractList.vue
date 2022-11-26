<template>
  <div>
    <el-button @click="openContract">新建合同</el-button>
    <Add :title="ShowContract.title" v-if="ShowContract.show" :ViewType='ShowContract.viewtype' :DataId='ShowContract.dataId' @cancelContract="cancelContract"></Add>
  </div>
</template>
<script lang="ts" setup>
import Add from './AddContract.vue'
import { reactive, ref } from 'vue'
const props = defineProps({})
const ShowContract = ref({
  show: false,
  viewtype: 1,
  dataId: 0,
  title: '新增合同'
})

const openContract = () => {
  ShowContract.value.show = true
}
const cancelContract = () => {
  ShowContract.value.show = false
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
</script>
<style lang="postcss" scoped>
</style>
