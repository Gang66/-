<template>
  <div class="table-search flex flex-col">
    <div ref="searchEl" class="table-search-form">
      <slot name="search" />
    </div>

    <div class="flex justify-between items-center">
      <div>
        <slot name="operationbut" />
      </div>
      <el-button text key="primary" type="primary" @click="toggleSearch" v-if="isAdvancedSearch">
        高级搜索
        <el-icon>
          <el-icon-arrow-up v-if="isShow" />
          <el-icon-arrow-down v-else />
        </el-icon>
      </el-button>
    </div>
    <slot />
    <el-pagination class="justify-end" :current-page="currentPage" :page-sizes="[10, 20, 50, 100]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper"
      :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from "vue";
import { slide } from "/@/utils/animate";
export default defineComponent({
  name: "TableSearch",
  props: {
    currentPage: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },
    isAdvancedSearch: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["size-change", "current-change"],
  setup(props, context: SetupContext) {
    const isShow = ref(false);
    const handleSizeChange = (v: any) => context.emit("size-change", v);
    const handleCurrentChange = (v: any) => context.emit("current-change", v);
    const toggleSearch = () => {
      isShow.value = !isShow.value;
      slide(searchEl, isShow.value);
    };
    const searchEl = ref(null);
    return {
      isShow,
      handleSizeChange,
      handleCurrentChange,
      searchEl,
      toggleSearch,
    };
  },
});
</script>

<style lang="postcss" scoped>
.table-search-form {
  overflow: hidden;
  height: 0;
}
</style>
