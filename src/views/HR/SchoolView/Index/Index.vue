
<template>
  <!-- 商学院根目录 -->
  <div class="SchoolView ">
    <!-- 导航栏 -->
    <SchoolNavbar></SchoolNavbar>
  </div>
</template>

<script lang="ts">
import SchoolNavbar from '../_Components/navbar.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: {
    SchoolNavbar
  },
  props: {},
  setup() {
    return {}
  }
})
</script>

<style lang="postcss" scoped>
.SchoolView {
  height: 100vh;
  background: #f3f6fb;
  overflow-y: auto;
}
</style>
