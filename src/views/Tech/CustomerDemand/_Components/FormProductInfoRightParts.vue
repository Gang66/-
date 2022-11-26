<template>
  <div class="tech-customer-demand-form-product-info-right-parts">
    <div class="p-4 flex">
      <div class="flex-grow pt-1">
        <div class="border-solid border-blue-500 border-l-8 pl-2 text-base h-5 leading-5">加载配件</div>
      </div>
      <div class="flex-none">
        <el-button type="danger" link @click="closeAddParts" v-if="data.isCloseParts">
          <el-icon><el-icon-circle-close /></el-icon>关闭增加
        </el-button>
        <el-button type="primary" link @click="addParts" v-else>
          <el-icon><el-icon-circle-plus /></el-icon>添加配件
        </el-button>
      </div>
    </div>
    <div class="pb-4">
      <div class="text-sm font-black text-gray-700 bg-gray-100 pt-2 pb-2 pl-4 pr-4 border-solid border-gray-200 border-t border-b">阀体</div>
      <div class="parts-list">
        <el-row class="parts-list-row text-sm" :gutter="11" v-for="(item, index) in productMinMain" :key="index">
          <el-col :md="24" :lg="8">
            <div class="parts-title">{{ item.SystemName }}</div>
          </el-col>
          <el-col :md="24" :lg="7">{{ item.SystemModel }}</el-col>
          <el-col :md="24" :lg="3">{{ item.SystemSpecification }}</el-col>
          <el-col :md="24" :lg="3">{{ item.Quantity }}{{ item.UnitInfo }} </el-col>
          <el-col :md="24" :lg="3">
            <div class="parts-but">
              <el-button type="primary" link @click="editProduct(item)">
                <el-icon><el-icon-edit-pen /></el-icon>
              </el-button>
              <el-button type="danger" link @click="delProduct(index)">
                <el-icon><el-icon-delete /></el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="text-sm font-black text-gray-700 bg-gray-100 pt-2 pb-2 pl-4 pr-4 border-solid border-gray-200 border-t border-b">配件</div>
      <div class="parts-list">
        <el-row class="parts-list-row text-sm" :gutter="11" v-for="(item, index) in partsList" :key="index">
          <el-col :md="24" :lg="8">
            <div class="parts-title">{{ item.SystemName }}</div>
          </el-col>
          <el-col :md="24" :lg="7">{{ item.SystemModel }}</el-col>
          <el-col :md="24" :lg="3">{{ item.SystemSpecification }}</el-col>
          <el-col :md="24" :lg="3">{{ item.Quantity }}{{ item.UnitInfo }} </el-col>
          <el-col :md="24" :lg="3">
            <div class="parts-but">
              <el-button type="primary" link @click="editParts(item)">
                <el-icon>
                  <el-icon-edit-pen />
                </el-icon>
              </el-button>
              <el-button type="danger" link @click="delParts(index)">
                <el-icon>
                  <el-icon-delete />
                </el-icon>
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, computed, SetupContext } from 'vue'
import { ElMessageBox, ElMessage } from 'element-plus'

export default defineComponent({
  components: {},
  emits: ['updata', 'update:product', 'update:parts'],
  props: {
    //阀体
    product: {
      type: Array,
      default: []
    },
    //配件
    parts: {
      type: Array,
      default: []
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      isCloseParts: false
    })

    //#region  配件
    // 添加配件
    const addParts = () => {
      let row = <any>{}
      if (props.product && props.product.length > 0) {
        row = props.product[0]
      }

      if ((row.SystemName || '').length < 1) {
        ElMessage.error('请填写系统名称')
        return false
      }
      if ((row.RoutineType || '').length < 1) {
        ElMessage.error('请填写常规类别')
        return false
      }
      if ((row.Fungible || '').length < 1) {
        ElMessage.error('请填写可替代性')
        return false
      }
      if ((row.TechHard || '').length < 1) {
        ElMessage.error('请填写技术难度')
        return false
      }

      data.isCloseParts = true
      // 更新父级数据
      updataParentData('setConfigInfo', { left: 'partsSeletc', right: '' })

      //partsList.value.push({})
    }
    // 关闭添加配件
    const closeAddParts = () => {
      if (data.isCloseParts) {
        data.isCloseParts = false
        // 更新父级数据
        updataParentData('setConfigInfo', { left: '', right: '' })
      }
    }
    // 编辑配件
    const editParts = (row: any) => {
      //关闭选择配件
      closeAddParts()

      // 更新父级数据
      updataParentData('setConfigInfo', { left: 'partsEdit', right: '', partsInfo: row })
    }
    // 删除配件
    const delParts = (index: number) => {
      ElMessageBox.confirm('确定删除该配件吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //关闭选择配件
          closeAddParts()

          partsList.value.splice(index, 1)
          context.emit('update:parts', partsList.value) // 可写可不写，防止失效保底作用
        })
        .catch(() => {})
    }
    //#endregion

    //#region  阀体
    // 编辑阀体
    const editProduct = (row: any) => {
      //关闭选择配件
      closeAddParts()

      // 更新父级数据
      updataParentData('setConfigInfo', { left: 'productEdit', right: 'productAttribute', valveInfo: row })
    }
    // 删除阀体
    const delProduct = (index: number) => {
      ElMessageBox.confirm('确定删除该阀体吗？', '提示', {
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          //关闭选择配件
          closeAddParts()

          if (productMinMain.value.length <= 1) {
            //先更新设置在更新数据
            updataParentData('setConfigInfo', { left: '', right: '' })
          }

          productMinMain.value.splice(index, 1)
          context.emit('update:product', productMinMain.value) // 可写可不写，防止失效保底作用

          // 更新父级数据
          updataParentData('updataProductInfo', '')
        })
        .catch(() => {})
    }

    //#endregion

    // 更新父级数据
    const updataParentData = (type: string, info: any) => {
      context.emit('updata', { type, info })
    }

    //#region 双向绑定
    //阀体
    const productMinMain = <any>computed({
      get() {
        return props.product
      },
      set(val) {
        context.emit('update:product', val)
      }
    })
    // 配件
    const partsList = <any>computed({
      get() {
        return props.parts
      },
      set(val) {
        context.emit('update:parts', val)
      }
    })
    //#endregion

    return {
      data,
      productMinMain,
      partsList,
      addParts,
      closeAddParts,
      editParts,
      delParts,
      editProduct,
      delProduct
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech-customer-demand-form-product-info-right-parts {
  .parts-list {
    overflow: hidden;

    :deep(.parts-list-row) {
      .el-col {
        padding: 10px 1px;
        text-align: center;

        .parts-title {
          text-align: left;
          padding-left: 1rem;
        }

        .parts-but {
          display: flex;
          justify-content: space-between;

          .el-button + .el-button {
            margin-left: 0;
          }
        }
      }

      &:nth-child(2n) {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>
