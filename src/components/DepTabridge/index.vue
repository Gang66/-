<!--
 * @Author: ZHJ
 * @Date: 2022-05-11 17:28:51
 * @LastEditTime: 2022-08-04 15:04:26
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\components\DepTabridge\index.vue
 * 版权声明
-->
<template>
  <div class="flex items-center w-full">
    <el-tooltip class="box-item" effect="dark" :content="data.DivisionName" placement="top">
      <div class="bf-window-header-bg w-5 h-5 text-center leading-5 rounded-full text-sm">{{ data.DivisionName ? data.DivisionName.substr(0, 1) : '' }}</div>
    </el-tooltip>
    <div class="ml-1">{{ data.DeptName }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref, watch } from 'vue'
export default defineComponent({
  props: {
    deptDetails: {
      type: Object,
      default: {
        DivisionName: '潍坊事业部', //事业部名称
        DeptName: '销售一部' //部门名称
      }
    }
  },
  setup(props) {
    const { ctx: _this }: any = getCurrentInstance()
    let isShow: any = ref(false) //每次显示 不加会出现部门更改后不更新问题
    const data = reactive({
      DivisionName: props.deptDetails.DivisionName, //事业部名称
      DeptName: props.deptDetails.DeptName //部门名称
    })
    // watch(
    //   isShow,
    //   (newvalue, oldvalue) => {
    //     console.log(newvalue, oldvalue);
    //     isShow = !newvalue;
    //     // _this.$forceUpdate();
    //   },
    //   { immediate: true }
    // );
    return { data, isShow }
  }
})
</script>

<style lang="scss" scoped></style>
