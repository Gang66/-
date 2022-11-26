<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='addquotation text-base'>
        <div class='salerDialog'>
        </div>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
const props = defineProps({})
const emit = defineEmits(['cancelcontact'])

const closeWindow = () => {
  emit('cancelcontact')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
</script>
<style lang="postcss" scoped>
</style>
