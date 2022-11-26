<template>
  <div class="drawer">
    <el-drawer v-model="drawer" :with-header="false" size="460px" @close="closeWindow">
      <div class="absolute z-40 h-16 pt-6 bg-white">
        <div class="flex">
          <el-input v-model="data.filterText" placeholder="请输入" @keyup.enter.native="handleSubmit()" />
          <el-button type="success" icon="el-icon-check" class="ml-2" @click="handleSubmit()">确定</el-button>
          <el-button type="info" icon="el-icon-sort" @click="toggleExpandAll">折叠/展开</el-button>
          <div class="absolute cursor-pointer -right-8 top-2" @click="closeWindow">
            <el-icon>
              <el-icon-CircleClose />
            </el-icon>
          </div>
        </div>
      </div>
      <!--   @check-change="handleCheckChange"-->
      <el-tree ref="refOrgTree" class="mt-16" v-if="data.refreshTree" @check-change="handleCheckChange" :data="data.list" node-key="Identify" @check="checkEvent" :filter-node-method="filterNode" :default-expand-all="data.isExpand" :expand-on-click-node="false" show-checkbox check-on-click-node :props="{ class: customNodeClass }" :default-expanded-keys="[2, 3]">
        <template #default="{ node, data }">
          <span class="custom-tree-node">
            <span class="text-sm">{{ node.label }}</span>
            <template v-if="data.NodeType == 'dept'">
              <div class="disabled" @click.stop></div>
            </template>
          </span>
        </template>
        <!-- <template #default="{ node, data }">
          <span>{{ node }}</span>
          <div v-if="data.NodeType=='dept'" class="disabled" @click.stop></div>
        </template> -->
      </el-tree>
    </el-drawer>
  </div>
</template>

<script lang="ts">
import { defineComponent, nextTick, onMounted, reactive, SetupContext } from 'vue'
import { ref } from 'vue'
export default defineComponent({
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  emits: ['closeWindow', 'transferData'],
  setup(props, context: SetupContext) {
    const refOrgTree = ref()
    const drawer = ref(true)
    const data: any = reactive({
      list: props.list, //岗位树数据
      filterText: '', //筛选数据
      transferData: {}, //选中数据
      refreshTree: true, //true  打开树 false关闭树
      isExpand: true, //true为展开 false关闭
      checkedId: 0
    })
    const customNodeClass = (val: any, node: Node) => {
      if (val.NodeType === 'dept') {
        return 'NodeTypeDept'
      }
      if (val.NodeType === 'post') {
        return 'NodeTypePost'
      }
      if (val.NodeType === 'user') {
        return 'NodeTypePost'
      }
      return null
    }
    // 筛选确定
    const handleSubmit = (val: any) => {
      if (data.transferData && JSON.stringify(data.transferData) != '{}') {
        context.emit('transferData', data.transferData)
        closeWindow()
        return
      }
      refOrgTree.value.filter(data.filterText)
    }
    // 3.2 过滤
    const filterNode = (value: any, data: any) => {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
    const asdChange = (val: any) => {
      console.log(val)
      console.log(refOrgTree.value.getHalfCheckedNodes())
    }
    // 关闭弹窗
    const closeWindow = () => {
      context.emit('closeWindow')
    }
    // 折叠展开事件
    const toggleExpandAll = () => {
      data.refreshTree = false
      data.isExpand = !data.isExpand
      nextTick(() => {
        data.refreshTree = true
      })
    }
    const handleCheckChange = (val: any, checked: any, tree: any) => {
      if (val.NodeType != 'dept') {
        if (checked) {
          data.checkedId = val.Identify
          console.log(val)
          console.log(data.checkedId)
          refOrgTree.value.setCheckedKeys([val.Identify])
        } else {
          if (data.checkedId === val.Identify) {
            refOrgTree.value.setCheckedKeys([val.Identify])
          }
        }
      }
    }
    // 监听选中数据
    const checkEvent = (details: any, val: any) => {
      var arr: any = []
      console.log(details)
      val.halfCheckedNodes.forEach((element: any) => {
        element.children.forEach((item: any) => {
          if (data.checkedId == item.Identify) {
            details = item
          }
        })
        arr.push(element.Id)
      })
      data.transferData = {
        PostIds: details.Id,
        DeptIds: arr,
        Details: details
      }
      if (val.checkedNodes) {
        val.checkedNodes.forEach((val: any) => {
          if (val.NodeType == 'user') {
            data.transferData.Details = val
            return
          }
        })
      }
    }
    onMounted(() => {})
    return {
      drawer,
      data,
      customNodeClass,
      handleSubmit,
      toggleExpandAll,
      refOrgTree,
      filterNode,
      closeWindow,
      checkEvent,
      handleCheckChange,
      asdChange
    }
  }
})
</script>

<style  lang="postcss" scoped>
.drawer {
  :deep(.el-drawer__body) {
    padding: 0 20px 20px;
  }
  :deep(.el-tree-node__content) {
    position: relative;
  }
  :deep(.NodeTypeDept > .el-tree-node__content) {
    color: var(--el-color-primary);
  }
  :deep(.NodeTypeDept .el-checkbox) {
    display: none;
  }
  :deep(.NodeTypePost > .el-tree-node__content) {
    color: var(--el-color-success);
  }
  :deep(.NodeTypePost .el-checkbox) {
    display: flex;
  }
  .disabled {
    cursor: not-allowed;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
  }
}
</style>
