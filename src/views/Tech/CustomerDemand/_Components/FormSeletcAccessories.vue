<!--选择配件-->
<template>
  <div class="tech-form-product-seletc-accessories h-full">
    <div class="p-4">
      <div class="pt-1">
        <div class="border-solid border-blue-500 border-l-8 pl-2 text-base h-5 leading-5">选择配件</div>
      </div>
    </div>
    <div class="accessories-main flex justify-around pl-4 pr-4">
      <div class="flex-grow mr-4 border-solid border border-gray-300 rounded overflow-hidden">
        <div class="p-2 bg-gray-100">
          <el-input class="accessories-search" v-model="data.searchName" @input="changeSearch" placeholder="请输入类别名称">
            <template #prefix>
              <el-icon><el-icon-search /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="accessories-classify-box scrollbar flex-grow h-full overflow-auto">
          <div class="p-2">
            <el-tree :data="data.ClassifyList" ref="treeRef" :props="treeProps" show-checkbox :check-strictly="true" :filter-node-method="filterNode" @check-change="handleNodeClickClassify" :default-checked-keys="data.SelectClassifyIds" node-key="Id" :default-expand-all="false" />
          </div>
        </div>
      </div>
      <div class="flex-none w-60 border-solid border border-gray-300 rounded overflow-hidden relative">
        <div class="flex pt-3 pb-3 pl-4 pr-4 bg-gray-100">
          <div class="flex-grow">
            <div class="text-base text-gray-500">
              已选<b class="ml-2">{{ data.SelectClassifyIds.length }}</b>
            </div>
          </div>
          <div class="flex-none">
            <el-button type="primary" link @click="clearSelectClassify">清空 </el-button>
          </div>
        </div>
        <div class="accessories-classify-box scrollbar overflow-auto">
          <div class="pb-12 pl-3 pr-3 pt-2">
            <div class="accessories-select-item flex p-2 text-sm text-gray-600" v-for="item in selectClassifyList" :key="item.Id">
              <div class="flex-grow mr-2">{{ item.label }}</div>
              <div class="flex-none del-but">
                <el-button type="primary" link @click="deleteRow(item.Id)">
                  <el-icon><el-icon-close /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
          <div class="absolute left-0 bottom-0 right-0 z-10">
            <el-button type="primary" class="use-parts-but w-full" @click="saveProductPropertysAccessories()"> 使用配件 </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, computed, SetupContext } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetBasicProductChildrenList, PostGetProductAccessoriesInfoList } from '/@/api/tech/ProductBasics'

//获取产品配件tree
const getData = (data: any) => {
  data.data.SelectClassifyIds = <Array<number>>[]
  GetBasicProductChildrenList()
    .then(res => {
      if (res.code == 1) {
        data.data.ClassifyList = res.data || []

        // 已选附件
        let tempSelectClassifyIds = <Array<number>>[]
        data.productInfo.AccessoriesList.forEach((x: any) => {
          if (x.AccessoriesTypeId && x.AccessoriesTypeId > 0) {
            tempSelectClassifyIds.push(x.AccessoriesTypeId)
          }
        })
        data.data.SelectClassifyIds = tempSelectClassifyIds
      }
    })
    .catch(e => {
      ElMessage.error('加载配件分类出错')
      console.log(`GetBasicProductChildrenList${e}`)
    })
}

export default defineComponent({
  props: {
    productInfo: {
      type: Object,
      default: {}
    }
  },
  emits: ['updata'],
  setup(props, context: SetupContext) {
    const treeRef = ref()

    const data = reactive({
      ClassifyList: <any>[],
      SelectClassifyIds: <Array<number>>[], //选中项
      searchName: '' //搜索条件
    })

    //TreeProp配置项
    const treeProps = {
      children: 'children',
      label: 'label'
    }

    // 计算选中的配件
    const selectClassifyList = <any>computed(() => {
      var _arr = <any>[]
      data.ClassifyList.forEach((item: any) => {
        if (item.children) {
          item.children.forEach((row: any) => {
            if (data.SelectClassifyIds.indexOf(row.Id) > -1) {
              _arr.push(row)
            }
          })
        }
      })
      return _arr
    })

    //分类选择事件
    const handleNodeClickClassify = (dataValue: any, isSelect: boolean) => {
      //只处理二级菜单
      if (dataValue.Level == 1) {
        var index = data.SelectClassifyIds.indexOf(dataValue.Id)
        if (index == -1) {
          //确保选中状态时新增
          if (isSelect) {
            data.SelectClassifyIds.push(dataValue.Id)
          }
        } else {
          //删除
          data.SelectClassifyIds.splice(index, 1)
        }
      }
    }

    //属性删除事件
    const deleteRow = (id: number) => {
      ElMessageBox.confirm('确定删除该配件吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var index = data.SelectClassifyIds.indexOf(id)
          if (index > -1) {
            data.SelectClassifyIds.splice(index, 1)
          }
          treeRef.value.setCheckedKeys(data.SelectClassifyIds)
        })
        .catch(() => {})
    }
    // 清空选项
    const clearSelectClassify = () => {
      ElMessageBox.confirm('确定清空所有配件吗？', '提示', {
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.SelectClassifyIds = []
          treeRef.value.setCheckedKeys(data.SelectClassifyIds)
        })
        .catch(() => {})
    }
    // 搜索
    const changeSearch = () => {
      treeRef.value!.filter(data.searchName)
    }
    const filterNode = (value: string, list: any) => {
      if (!value) return true
      return list.label.includes(value)
    }

    //获取分类数据
    const saveProductPropertysAccessories = () => {
      let info = JSON.parse(JSON.stringify(props.productInfo))
      //配件信息，之前已配置的
      info.AccessoryList = info.AccessoriesList.filter((x: any) => data.SelectClassifyIds.indexOf(x.AccessoriesTypeId) > -1) || []
      // 新增配件
      data.SelectClassifyIds.forEach((item: number) => {
        if (!info.AccessoryList.find((x: any) => x.AccessoriesTypeId == item)) {
          info.AccessoryList.push({ AccessoriesTypeId: item })
        }
      })

      PostGetProductAccessoriesInfoList(info)
        .then(res => {
          if (res.code == 1) {
            info.AccessoriesList = res.data || []

            //向父级传参
            context.emit('updata', info)
          } else ElMessage.error(res.message)
        })
        .catch(e => {
          ElMessage.error('获取配件信息列表出错')
          console.log(`PostGetProductAccessoriesInfoList${e}`)
        })
    }

    //页面完成加载后执行
    onMounted(() => {
      //获取产品配件tree
      getData({ data, productInfo: props.productInfo })
    })
    return {
      data,
      treeProps,
      selectClassifyList,
      handleNodeClickClassify,
      treeRef,
      deleteRow,
      clearSelectClassify,
      changeSearch,
      filterNode,
      saveProductPropertysAccessories
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech-form-product-seletc-accessories {
  .accessories-main {
    height: calc(100% - 4.5em);
    .accessories-search {
      :deep(.el-input__wrapper) {
        border-radius: 16px;
      }
    }
    .accessories-classify-box {
      height: calc(100% - 3em);
    }
    .use-parts-but {
      border-radius: 0;
    }

    .accessories-select-item {
      border: 1px solid #fff;
      .del-but {
        visibility: hidden;
      }
      &:hover {
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
        background-color: var(--el-color-primary-light-9);
        .del-but {
          visibility: inherit;
        }
      }
    }
  }
}
</style>
