<template>
  <div class="bf-content hr-department-content">
    1111
    <el-row v-action='"add"' class='mb-1'>
      <el-button type='primary'>添加权限</el-button>
      <el-tag class='ml-1'>v-action='"add"'</el-tag>
    </el-row>
  </div>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { useLayoutStore } from '/@/store/modules/layout'

const departmentRender = () => {
  const { login, getUser } = useLayoutStore()
  let form = reactive({
    name: 'admin',
    pwd: 'bf2020'
  })


  return {
    form
  }
}

export default defineComponent({
  name: 'HRDepartment',
  setup () {



    return {
      ...departmentRender()
    }
  }
})
</script>

<style>
</style>
