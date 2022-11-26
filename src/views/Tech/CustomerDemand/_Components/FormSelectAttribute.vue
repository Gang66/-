<!-- 选择属性 -->
<template>
  <div class="tech-customer-demand-form-select-attribute h-full">
    <div class="p-4 flex">
      <div class="flex-grow pt-1">
        <div class="border-solid border-blue-500 border-l-8 pl-2 text-base h-5 leading-5">选择属性</div>
      </div>
      <div class="flex-none">
        <el-button type="primary" link @click="openDrawerEditAttribute({ Id: 0, MountingsId: data.AttributeList![0].Id || 999 })">
          <el-icon><el-icon-circle-plus /></el-icon>新增属性
        </el-button>
        <el-button type="danger" link>
          <el-icon><el-icon-home-filled /></el-icon>历史对比
        </el-button>
      </div>
    </div>

    <div class="attribute-main flex justify-around pl-4 pr-4">
      <div class="flex-grow mr-4 border-solid border border-gray-300 rounded overflow-hidden">
        <div class="p-2 bg-gray-100">
          <el-input class="attribute-search" v-model="data.searchName" @input="changeSearch" placeholder="请输入属性名称">
            <template #prefix>
              <el-icon><el-icon-search /></el-icon>
            </template>
          </el-input>
        </div>
        <div class="attribute-attribute-box scrollbar flex-grow h-full overflow-auto">
          <div class="p-2">
            <el-tree :data="data.AttributeList" ref="treeRef" :props="treeProps" show-checkbox :check-strictly="true" :filter-node-method="filterNode" @check-change="handleNodeClickAttribute" :default-checked-keys="data.SelectAttributeIds" node-key="Id" :default-expand-all="false">
              <template #default="{ node, data }">
                <div class="property-item flex w-full">
                  <div class="flex-grow">
                    <span>{{ node.label }}</span>
                    <span class="type-name text-xs text-gray-300 pl-1" v-if="data.MountingsId > 0">{{ getPropertyTypeName(data.PropertyTypeInfo) }}</span>
                  </div>
                  <div class="flex-none edit-but">
                    <el-button type="primary" link @click="openDrawerEditAttribute(data)">
                      <el-icon><el-icon-edit /></el-icon>
                    </el-button>
                  </div>
                </div>
              </template>
            </el-tree>
          </div>
        </div>
      </div>
      <div class="flex-none w-52 border-solid border border-gray-300 rounded overflow-hidden relative">
        <div class="flex pt-3 pb-3 pl-4 pr-4 bg-gray-100">
          <div class="flex-grow">
            <div class="text-base text-gray-500">
              已选<b class="ml-2">{{ data.SelectAttributeIds.length }}</b>
            </div>
          </div>
          <div class="flex-none">
            <el-button type="primary" link @click="clearSelectAttribute">清空 </el-button>
          </div>
        </div>
        <div class="attribute-attribute-box scrollbar overflow-auto">
          <div class="pb-12 pl-3 pr-3 pt-2">
            <div class="attribute-select-item flex p-2 text-sm text-gray-600" v-for="item in selectAttributeList" :key="item.Id">
              <div class="flex-grow mr-2">{{ item.Name }}</div>
              <div class="flex-none del-but">
                <el-button type="primary" link @click="deleteRow(item.Id)">
                  <el-icon><el-icon-close /></el-icon>
                </el-button>
              </div>
            </div>
          </div>
          <div class="absolute left-0 bottom-0 right-0 z-10">
            <el-button type="primary" class="use-parts-but w-full" @click="saveProductAttribute()"> 使用属性 </el-button>
          </div>
        </div>
      </div>
    </div>
    <FormEditAttribute title="编辑属性" :attributeInfo="editAttributeOpenData.attributeInfo" :dictionaryData="data.DictionaryData" @closeDrawer="closeDrawerEditAttribute($event)" v-if="editAttributeOpenData.visible" />
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, SetupContext, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { GetProductAttributesTree } from '/@/api/tech/ProductFormula'
import { useCommonStore } from '/@/store/modules/Common'
import FormEditAttribute from './FormEditAttribute.vue'

//获取字典数据
const getDictionaryData = (data: any) => {
  const store = useCommonStore() //记得加这一句
  // 获取产品属性类型选项
  store.getDict('tech_product_property_type_info_options').then((res: any) => {
    data.DictionaryData.PropertyTypeInfoOptions = res.map((x: any) => {
      return { DicKey: parseInt(x.DicKey), DicValue: x.DicValue }
    })
  })
  //获取产品属性是否必填选项
  store.getDict('tech_product_property_required_options').then((res: any) => {
    data.DictionaryData.RequiredOptions = res.map((x: any) => {
      return { DicKey: parseInt(x.DicKey), DicValue: x.DicValue }
    })
  })
  //获取产品阀体类型选项
  store.getDict('tech_product_type_info_options').then((res: any) => {
    data.DictionaryData.TypeInfoOptions = res.map((x: any) => {
      return { DicKey: parseInt(x.DicKey), DicValue: x.DicValue }
    })
  })
}

//编辑属性
const editAttributeOpen = (data: any) => {
  let editAttributeOpenData: any = reactive({
    visible: false,
    attributeInfo: {}
  })

  //打开弹窗
  const openDrawerEditAttribute = (val: any) => {
    if (val.Digit > 0) {
      ElMessage.error('阀门七要素属性无权修改！')
      return false
    }

    editAttributeOpenData.attributeInfo = {
      Id: val.Id,
      TypeInfo: val.TypeInfo || data.productInfo.TypeInfo, //1产品或阀体属性 2配件属性
      Name: val.Name,
      IsRequired: val.IsRequired, //是否必填
      MountingsId: val.MountingsId || 0, //父级（0分组 大于0表示属性）
      orderNum:val.orderNum || 0, //序号
      PropertyTypeInfo: val.PropertyTypeInfo, //属性类型
      AttributesItmeList: val.AttributesItmeList || []
    }

    editAttributeOpenData.visible = true
  }

  //关闭弹窗
  const closeDrawerEditAttribute = (type: string) => {
    editAttributeOpenData.visible = false
    if (type == 'submit') data.getData()
  }

  return {
    editAttributeOpenData,
    openDrawerEditAttribute,
    closeDrawerEditAttribute
  }
}

export default defineComponent({
  components: { FormEditAttribute },
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
      AttributeList: <any>[],
      SelectAttributeIds: <Array<number>>[], //选中项
      searchName: '', //搜索条件
      DictionaryData: {
        PropertyTypeInfoOptions: [], //产品属性类型选项
        RequiredOptions: [], //产品属性是否必填选项
        TypeInfoOptions: [] //产品阀体类型选项
      }
    })
    //Prop配置项
    const treeProps = {
      children: 'children',
      label: 'Name'
    }
    // 计算选中的属性
    const selectAttributeList = <any>computed(() => {
      var _arr = <any>[]
      data.AttributeList.forEach((item: any) => {
        if (item.children) {
          item.children.forEach((row: any) => {
            if (data.SelectAttributeIds.indexOf(row.Id) > -1) {
              _arr.push(row)
            }
          })
        }
      })
      return _arr
    })

    //分类选择事件
    const handleNodeClickAttribute = (dataValue: any, isSelect: boolean) => {
      //排除分类菜单
      if (dataValue.MountingsId > 0) {
        var index = data.SelectAttributeIds.indexOf(dataValue.Id)
        if (index == -1) {
          //确保选中状态时新增
          if (isSelect) {
            data.SelectAttributeIds.push(dataValue.Id)
          }
        } else {
          //删除
          data.SelectAttributeIds.splice(index, 1)
        }
      }
    }

    //属性删除事件
    const deleteRow = (id: number) => {
      ElMessageBox.confirm('确定删除该属性吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var index = data.SelectAttributeIds.indexOf(id)
          if (index > -1) {
            data.SelectAttributeIds.splice(index, 1)
          }
          treeRef.value.setCheckedKeys(data.SelectAttributeIds)
        })
        .catch(() => {})
    }
    // 清空选项
    const clearSelectAttribute = () => {
      ElMessageBox.confirm('确定清空所有属性吗？', '提示', {
        confirmButtonText: '清空',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.SelectAttributeIds = []
          treeRef.value.setCheckedKeys(data.SelectAttributeIds)
        })
        .catch(() => {})
    }
    // 搜索
    const changeSearch = () => {
      treeRef.value!.filter(data.searchName)
    }
    const filterNode = (value: string, list: any) => {
      if (!value) return true
      return list.Name.includes(value)
    }

    // 保存属性
    const saveProductAttribute = () => {
      let info = { PropertysList: <any>[] }
      let tempAttributeList = selectAttributeList.value || []
      tempAttributeList.forEach((item: any) => {
        if (info.PropertysList.indexOf((x: any) => x.Id == item.Id) == -1) {
          let oldAttributeInfo = props.productInfo.PropertysList.find((x: any) => x.Id == item.Id)

          if (oldAttributeInfo) {
            //之前选过
            info.PropertysList.push(oldAttributeInfo)
          } else {
            //新增的属性
            let tempAttributeInfo = {
              Id: item.Id,
              Name: item.Name,
              Value: '',
              IsRequired: item.IsRequired,
              PropertyTypeInfo: item.PropertyTypeInfo,
              ItemVlaVos: item.AttributesItmeList
            }

            //#region 阀门七要素属性附加默认值
            if (item.Digit == 2) {
              // 驱动方式
              tempAttributeInfo.Value = props.productInfo.DriveWay
            } else if (item.Digit == 3) {
              // 连接形式
              tempAttributeInfo.Value = props.productInfo.ConnectioneWay
            } else if (item.Digit == 4) {
              // 结构形式
              tempAttributeInfo.Value = props.productInfo.StructureShape
            } else if (item.Digit == 5) {
              // 密封面材质
              tempAttributeInfo.Value = props.productInfo.SealingSurface
            } else if (item.Digit == 6) {
              // 压力代号
              tempAttributeInfo.Value = props.productInfo.Pressure
            } else if (item.Digit == 7) {
              // 阀体材料
              tempAttributeInfo.Value = props.productInfo.Materials
            }
            //#endregion

            info.PropertysList.push(tempAttributeInfo)
          }
        }
      })

      //向父级传参
      context.emit('updata', info)
    }

    //根据类型 获取数据属性和属性选项值
    const getAttributeList = () => {
      // 1 产品  2 配件
      GetProductAttributesTree(props.productInfo.TypeInfo)
        .then(res => {
          if (res.code == 1) {
            data.AttributeList = res.data || []

            // 已选属性
            let tempSelectAttributeIds = <Array<number>>[]
            props.productInfo.PropertysList.forEach((x: any) => {
              if (x.Id && x.Id > 0) {
                tempSelectAttributeIds.push(x.Id)
              }
            })
            data.SelectAttributeIds = tempSelectAttributeIds
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch(e => {
          console.log(`GetProductAttributesTree${e}`)
        })
    }

    // 获取属性类型名称
    const getPropertyTypeName = (val: number) => {
      let str = ''
      let tempPropertyTypeInfo: any = data.DictionaryData.PropertyTypeInfoOptions.find((x: any) => x.DicKey == val)
      if (tempPropertyTypeInfo) {
        str = tempPropertyTypeInfo.DicValue
      }

      return str
    }

    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)

      getAttributeList()
    })

    return {
      data,
      treeProps,
      filterNode,
      handleNodeClickAttribute,
      treeRef,
      deleteRow,
      clearSelectAttribute,
      changeSearch,
      selectAttributeList,
      saveProductAttribute,
      getPropertyTypeName,
      ...editAttributeOpen({ data, productInfo: props.productInfo, getData: getAttributeList })
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech-customer-demand-form-select-attribute {
  .attribute-main {
    height: calc(100% - 4.5em);
    .attribute-search {
      :deep(.el-input__wrapper) {
        border-radius: 16px;
      }
    }
    .attribute-attribute-box {
      height: calc(100% - 3em);
      :deep(.property-item) {
        .edit-but {
          visibility: hidden;
        }
        &:hover {
          .type-name {
            display: none;
          }
          .edit-but {
            visibility: inherit;
          }
        }
      }
    }
    .use-parts-but {
      border-radius: 0;
    }

    .attribute-select-item {
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
