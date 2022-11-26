<template>
  <div class="bg-white">
    <div class="flex">
      <div>
        <div class="cursor-pointer">
          <div>
            <div v-for="(item, index) in listOne" :key="index" class="cursor-pointer">
              <div class="flex items-center" @click="getChildrenOne(item, listOne)">
                <!-- <el-icon color="var(--el-color-primary)"><el-icon-menu /></el-icon> -->
                <img src="/src/assets/img/system/bf-icon-top.png" alt="" class="top-img" />
                <div class="text-sm leading-none ml-0.5 font-bold" :style="{ color: item.isShow ? 'var(--el-color-primary)' : '' }">{{ item.label }}</div>
              </div>
              <div v-for="(val, index) in item.children" :key="index" class="relative ml-4 w-full">
                <div class="flex mt-4 items-center" @click="getChildrenTwo(val, item.children, item)">
                  <el-icon color="var(--el-color-primary)"><el-icon-document /></el-icon>
                  <div class="text-sm ml-0.5 leading-none bf-text-color-primary" :style="{ color: val.isShow ? 'var(--el-color-primary)' : '' }">
                    {{ val.label }}
                  </div>
                </div>
                <div v-for="(v, index) in val.children" :key="index" class="relative ml-24 w-full" :class="[v.isOne ? '-mt-7' : '']">
                  <div class="flex mt-3.5 items-center" @click="getChildrenThree(v, val.children, val, item.children)">
                    <div class="rounded-md bf-bg-blue-color w-1.5 h-1.5"></div>
                    <div class="text-sm ml-1 leading-none bf-text-color-primary" :style="{ color: v.isShow ? 'var(--el-color-primary)' : '' }">
                      {{ v.label }}
                    </div>
                  </div>
                  <!-- <div class="absolute -top-1.5" v-show="v.isShow">
                    <div v-for="(vv, index) in v.children" :key="index" class="ml-24" @click="getChildrenFour(vv)">
                      <div class="text-sm ml-0.5 w-20 text-gray-500" :style="{ color: vv.isShow ? 'var(--el-color-primary)' : '' }">
                        {{ vv.label }}
                      </div>
                    </div>
                  </div> -->
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, SetupContext } from "vue";
export default defineComponent({
  props: {
    treeList: {
      type: Array,
      default: [],
    },
  },
  emits: ["transmitLevel"],
  setup(props, context: SetupContext) {
    const { ctx: _this }: any = getCurrentInstance();
    // //isShow给默认值
    props.treeList.forEach((v: any) => {
      v.isShow = false;
    });
    // 列表数据处理为树结构
    //  获取组织架构树
    // 第一层数据
    const listOne = props.treeList;
    listOne.forEach((element: any) => {
      if (element.children && element.children.length > 0) {
        element.children[0].isOne = true;
        element.children.forEach((val: any, index: number) => {
          if (val.children && val.children.length > 0) {
            val.children[0].isOne = true;
          }
        });
      }
    });
    // 一级点击事件
    const getChildrenOne = (val: any, list: any) => {
      // 循环去掉同级显示状态
      list.forEach((v: any) => {
        if (v.Id != val.Id) {
          v.isShow = false;
        }
        // 去掉所有子类数据
        if (v.children && v.children.length > 0) {
          v.children.forEach((element: any) => {
            element.isShow = false;
          });
        }
      });
      context.emit("transmitLevel", val);
      val.isShow = true;
    };
    // 二级点击事件
    const getChildrenTwo = (val: any, list: any, item: any) => {
      list.forEach((v: any) => {
        // 循环去掉同级显示状态
        if (v.Id != val.Id) {
          v.isShow = false;
        }
        // 去掉所有子类数据
        if (v.children && v.children.length > 0) {
          v.children.forEach((element: any) => {
            element.isShow = false;
          });
        }
      });
      context.emit("transmitLevel", val);
      // val.isShow = !val?.isShow;
      val.isShow = true;
      item.isShow = false;
      _this.$forceUpdate();
    };
    // 三级点击事件
    const getChildrenThree = (val: any, list: any, item: any, topLevel: any) => {
      list.forEach((v: any) => {
        // 循环去掉同级显示状态
        if (v.Id != val.Id) {
          v.isShow = false;
        }
        // 去掉所有子类数据
        if (v.children && v.children.lengtth > 0) {
          v.children.forEach((element: any) => {
            element.isShow = false;
          });
        }
      });
      //循环去掉兄弟类显示状态（isShow=false）
      topLevel.forEach((v: any) => {
        if (v.Id != item.Id) {
          if (v.children && v.children.length > 0) {
            v.children.forEach((vv: any) => {
              vv.isShow = false;
            });
          }
        }
      });
      context.emit("transmitLevel", val);
      val.isShow = true;
      item.isShow = false;
      _this.$forceUpdate();
    };
    return {
      listOne,
      getChildrenOne,
      getChildrenTwo,
      getChildrenThree,
      // getChildrenFour,
    };
  },
});
</script>

<style scoped>
.top-img {
  width: 14px;
  height: 14px;
}
</style>
