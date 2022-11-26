<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow" title="个性化菜单">
    <div class="bf-window-padding">
      <div class="justify-between">
        <el-row justify="end">
          <el-button type="success" size="small" @click="AddGroup" :disabled="data.dataSource.length > 0 ? false : true">新建分组</el-button>
          <el-button type="warning" size="small" @click="DelGroup(treeRef)" :disabled="data.IsDelDisabled">删除分组</el-button>
        </el-row>
      </div>
      <el-tree :allow-drop="allowDrop" :allow-drag="allowDrag" :data="data.dataSource" @node-click="nodeClick" draggable default-expand-all highlight-current
        :expand-on-click-node="false" node-key="id" id="MenuTree" ref="treeRef">
        <template #default="{ node, data }">
          <el-row>
            <el-col v-if="data.MenuTitle != '未分组'" :span="16">
              <el-input v-model="data.CustomTitle">
                <template #prepend>{{ data.MenuTitle }}</template>
              </el-input>
            </el-col>
            <el-col v-else :span="8">
              <span>{{ data.MenuTitle }}</span>
            </el-col>
          </el-row>
        </template>
      </el-tree>

      <div class="bf-search-formItem">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow">取 消</el-button>
            <el-button type="primary" :disabled="data.dataSource.length > 0 ? false : true" @click="submitForm">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang='ts'>
import { defineComponent, reactive, SetupContext, onMounted, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { GetAppPostMenuCustomList, GetAppUserMenuCustomList, AddAppPostMenuGroupCustomSave, EditDeleteAppPostMenuGroupCustomSave, EditAppPostMenuCustomSave, AddAppUserMenuGroupCustomSave, EditDeleteAppUserMenuGroupCustomSave, EditAppUserMenuCustomSave } from '/@/api/menu/menu'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
import type { ElTree } from 'element-plus'

interface DataForList {
  Id: number
  ParentId: number
  MenuId: number
  PostId: number
  UserId: number
  MenuTitle: string
  CustomTitle: string | null
}
interface DataForTree {
  Id: number
  ParentId: number
  MenuId: number
  PostId: number
  UserId: number
  MenuTitle: string
  CustomTitle: string | null
  children: Array<DataForTree>
}

const ListToTree = (list: Array<DataForList>, pid: number): Array<DataForTree> => {
  let d: Array<DataForTree> = []
  list.forEach((item) => {
    if (item.Id == 0 && item.ParentId == 0 && item.CustomTitle == null) return
    if (item.ParentId == pid) {
      const childrenList = ListToTree(list, item.Id)
      if (childrenList.length > 0) item.children = childrenList
      d.push(item)
    }
  })
  return d
}

const NoCustomMenu = (list: Array<DataForList>, pid: number): Array<DataForTree> => {
  let d: Array<DataForTree> = ListToTree(list, pid)
  let other: MenuDataToTree = {
    Id: 0,
    ParentId: 0,
    MenuId: 0,
    MenuTitle: '未分组',
    CustomTitle: null,
    children: []
  }
  list.forEach((item) => {
    // if(item.ParentId==pid||mneuData.findIndex(v => v.Id == item.ParentId) > -1)
    // 	return;
    if (item.Id == 0 && item.ParentId == 0 && item.CustomTitle == null) other.children.push(item)
  })
  if (other.children.length > 0) d.push(other)
  return d
}

//获取到的个人个性化菜单数据并整理
const getUserMenuCustomTree = async (data: any): void => {
  await GetAppUserMenuCustomList(data.UserId).then((res) => {
    if (res.code == 1) {
      data.dataSource = NoCustomMenu(res.data, 0)
    } else
      ElNotification({
        title: '错误',
        message: res.message,
        type: 'error'
      })
  })
}
//获取到的岗位个性化菜单数据并整理
const getPostMenuCustomTree = async (data: any): void => {
  await GetAppPostMenuCustomList(data.PostId).then((res) => {
    if (res.code == 1) {
      data.dataSource = NoCustomMenu(res.data, 0)
    } else
      ElNotification({
        title: '错误',
        message: res.message,
        type: 'error'
      })
  })
}
//最终提交数据
const submitData = async (data: any, closeWindow): void => {
  if (data.PostId != 0) {
    await EditAppPostMenuCustomSave(data.dataSource).then((res) => {
      if (res.code == 1) {
        ElMessage.success('操作成功')
        closeWindow()
      } else
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
    })
  } else if (data.UserId != 0) {
    await EditAppUserMenuCustomSave(data.dataSource).then((res) => {
      if (res.code == 1) {
        ElMessage.success('操作成功')
        closeWindow()
      } else
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
    })
  }
}
//添加自定义分组
const addGroup = async (data, val): void => {
  if (data.PostId != 0) {
    let p = { PostId: data.PostId, CustomTitle: val }
    await AddAppPostMenuGroupCustomSave(p).then((res) => {
      if (res.code == 1) {
        let d: DataForTree = {
          Id: res.data,
          ParentId: 0,
          MenuId: 0,
          PostId: data.PostId,
          MenuTitle: null,
          CustomTitle: val,
          children: []
        }
        data.dataSource = [d, ...data.dataSource]
      } else
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
    })
  } else if (data.UserId != 0) {
    let p = { UserId: data.UserId, CustomTitle: val }
    await AddAppUserMenuGroupCustomSave(p).then((res) => {
      if (res.code == 1) {
        let d: DataForTree = {
          Id: res.data,
          ParentId: 0,
          MenuId: 0,
          UserId: data.UserId,
          MenuTitle: null,
          CustomTitle: val,
          children: []
        }
        data.dataSource = [d, ...data.dataSource]
      } else
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
    })
  }
}
//删除分组
const delGroup = async (treeRef, data): void => {
  if (data.PostId != 0) {
    await EditDeleteAppPostMenuGroupCustomSave(data.DelTreeNode.data.Id).then((res) => {
      if (res.code == 1) {
        treeRef.remove(data.DelTreeNode)
        data.DelTreeNode = ''
      } else
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
    })
  } else if (data.UserId != 0) {
    await EditDeleteAppUserMenuGroupCustomSave(data.DelTreeNode.data.Id).then((res) => {
      if (res.code == 1) {
        treeRef.remove(data.DelTreeNode)
        data.DelTreeNode = ''
      } else
        ElNotification({
          title: '错误',
          message: res.message,
          type: 'error'
        })
    })
  }
}

//树操作
const TreeOperation = (data: any) => {
  const treeRef = ref<InstanceType<typeof ElTree>>()

  //拖拽时判定目标节点能否成为拖动目标位置。
  //如果返回 false ，拖动节点不能被拖放到目标节点。
  //type 参数有三种情况：'prev'、'inner' 和 'next'，分别表示放置在目标节点前、插入至目标节点和放置在目标节点后
  const allowDrop = (draggingNode, dropNode, type) => {
    //如果拖动节点和被拖动节点均为实际页面 且type="inner" 则返回false禁止放到此处
    if (draggingNode.data.MenuId != 0 && dropNode.data.MenuId != 0 && type == 'inner') return false
    //如果拖动节点和被拖动节点均为自定义菜单 且type="inner" 则返回false禁止放到此处
    // if(draggingNode.data.MenuId==0&&dropNode.data.MenuId==0&&type=="inner")
    // 	return false;
    //如果一个分组要插入实际页面内 则返回false禁止放到此处
    if (draggingNode.data.MenuId == 0 && dropNode.data.MenuId != 0 && type == 'inner') return false
    //如果实际页面要移除分组 且不放入其他节点 则返回false禁止放到此处
    // if(draggingNode.data.MenuId!=0&&dropNode.data.MenuId==0&&type!="inner")
    // 	return false;
    return true
  }
  //判断节点能否被拖拽 如果返回 false ，节点不能被拖动
  const allowDrag = (node) => {
    if (node.data.MenuTitle == '未分组') return false
    return true
  }
  const nodeClick = (d, treeNode) => {
    if (d.MenuTitle == '未分组' || (d.children != null && d.children != undefined && d.children.length > 0) || d.MenuId != 0) {
      data.DelTreeNode = ''
      data.IsDelDisabled = true
    } else {
      data.DelTreeNode = treeNode
      data.IsDelDisabled = false
    }
  }
  //添加分组
  const AddGroup = () => {
    ElMessageBox.prompt('请输入分组名', '', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      inputPattern: /^[\s\S]*.*[^\s][\s\S]*$/,
      inputErrorMessage: '分组名称不能为空'
    })
      .then(({ value }) => {
        addGroup(data, value)
      })
      .catch(() => {})
  }
  //删除分组
  const DelGroup = (treeRef) => {
    if (data.DelTreeNode != '') delGroup(treeRef, data)
  }
  return {
    treeRef,
    allowDrop,
    allowDrag,
    nodeClick,
    AddGroup,
    DelGroup
  }
}
//from操作
const FromOperation = (data: any, closeWindow): void => {
  const submitForm = (): void => {
    submitData(data, closeWindow)
  }
  return {
    submitForm
  }
}

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    PostId: {
      type: Number,
      default: 0
    },
    UserId: {
      type: Number,
      default: 0
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      dataSource: [],
      PostId: props.PostId,
      UserId: props.UserId,
      IsDelDisabled: true,
      DelTreeNode: ''
    })
    // 监听页面关闭
    const closeWindow = () => {
      context.emit('closeWindow')
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    onMounted(() => {
      if (data.PostId != 0) {
        getPostMenuCustomTree(data)
      } else if (data.UserId != 0) {
        getUserMenuCustomTree(data)
      } else {
        ElMessage.error('参数错误')
      }
    })

    return { data, closeWindow, boxStyle, ...TreeOperation(data), ...FromOperation(data, closeWindow) }
  }
})
</script>

<style scoped>
#MenuTree {
  margin-bottom: 5px;
}
:deep #MenuTree ::v-deep .el-tree-node__content {
  padding: 2px 0;
  height: auto;
}
</style>
