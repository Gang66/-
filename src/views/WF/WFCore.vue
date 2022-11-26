<template>
  <div class='bf-content bg-gray-50 rounded-lg'>
    <div class='flex items-center justify-between mx-1'>
      <div class='flex items-center w-600 p-2'>
        <template v-if='viewTab == 1'>
          <el-input v-model='name' class='!w-100 mr-1'>
            <template #prepend>
              <div>审批流</div>
            </template>
          </el-input>
          <el-input v-model='category' class='!w-100 mr-1'>
            <template #prepend>
              <div>类别</div>
            </template>
          </el-input>
          <el-button type='info' @click='getFlowList'>搜索
          </el-button>
          <el-button type='primary' @click='handleAdd'>新增</el-button>
        </template>
        <template v-else>
          <el-input v-model='tname' class='!w-100 mr-1'>
            <template #prepend>
              <div>数据表</div>
            </template>
          </el-input>
          <el-input v-model='tcategory' class='!w-100 mr-1'>
            <template #prepend>
              <div>类别</div>
            </template>
          </el-input>
          <el-button type='info' @click='getFlowTableList'>搜索
          </el-button>
          <el-button type='primary' @click='handleAddTable'>新增</el-button>
        </template>
      </div>
      <div>
        <el-button plain size='small' type='info' @click='handleChangeViewTab'>{{ viewTab == 1 ? '切换绑定' : '切换列表' }}
        </el-button>
      </div>
    </div>
    <el-row>
      <template v-if='viewTab == 1'>
        <el-col :span='18'>
          <el-table :data='flowList' border>
            <el-table-column align='center' label='序号' prop='Id' type='index' width='80px' />
            <el-table-column label='审批流' prop='Name' width='200px' />
            <el-table-column label='类别' prop='Category' width='200px' />
            <el-table-column>
              <template #header>
                <span>操作</span>
              </template>
              <template #default='scope'>
                <div style='display: flex;flex-wrap: wrap'>
                  <el-button size='small' type='success' @click='handleShowNodes(scope.row.Id)'>流程</el-button>
                  <!--                                <el-button size='small' type='warning' @click='handleNeedEditSteps(scope.row.Id)'>审批</el-button>-->
                  <el-button size='small' type='primary' @click='handleEditNodes(scope.row.Id)'>编辑</el-button>
                  <el-popconfirm style='margin-left: 10px' title='确定删除此审批流吗？' @confirm='handleRemoveNodes(scope.row.Id)'>
                    <template #reference>
                      <el-button size='small' type='danger'>删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col :span='6'>
          <div v-if='flowNodesVisible' style='margin-left: 50px'>
            <el-steps direction='vertical'>
              <template v-for='(item,index) in currentFlowNodes' :key='index'>
                <el-step :title='item.NodeName'>
                  <template #description>
                    <div>
                      <div><span>审核人员：</span><span>{{ getUserName(item.Checker, item.UserType) }}</span></div>
                      <div><span>是否会审：</span><span>{{ item.IsAny == '0' ? '是' : '否' }}</span></div>
                      <div><span>审批条件：</span><span v-html='item.WherePara' /></div>
                      <div><span>编辑字段：</span><span v-html='item.Editpara' /></div>
                      <div><span>是否通知：</span><span>{{ item.IsNotice == '1' ? '是' : '否' }}</span></div>
                      <div style='margin-bottom: 20px' />
                    </div>
                  </template>

                </el-step>
              </template>
            </el-steps>
          </div>
          <div v-if='needEditTableVisible' style='margin-left: 50px'>
            <!--                    <needEdit v-if='needEditTableVisible' :flow-id='searchFlowId' />-->
          </div>
        </el-col>
      </template>
      <template v-else>
        <el-col :span='18'>
          <el-table :data='flowTableList' border>
            <el-table-column type='index' label='序号' width='80' />
            <el-table-column label='Id' prop='Id' />
            <el-table-column label='数据表' prop='TableName' />
            <el-table-column label='分类' prop='Code' />
            <el-table-column label='审批'>
              <template #default='scope'>
                <span>{{ scope.row.Flow.Category }}</span>
              </template>
            </el-table-column>
            <el-table-column>
              <template #header>
                <span>操作</span>
              </template>
              <template #default='scope'>
                <div style='display: flex;flex-wrap: wrap'>
                  <el-button size='small' type='primary' @click='handleEditTableBing(scope.row.Id)'>编辑</el-button>
                  <el-popconfirm style='margin-left: 10px' title='确定删除此审批流吗？' @confirm='handleRemoveTableBing(scope.row.Id)'>
                    <template #reference>
                      <el-button size='small' type='danger'>删除</el-button>
                    </template>
                  </el-popconfirm>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </template>
    </el-row>
    <el-dialog v-model='dialogEditVisible' title='审批流编辑' width='80%'>
      <WFEdit v-if='dialogEditVisible' ref='edit' :edit-flow-id='editFlowId' :is-edit='isEdit' :role='role' :user='user' :other='other'
        @submitDataResult='handleSubmitDataResult' />
      <template #footer>
        <el-button size='mini' type='primary' @click='handleSubmitData'>保存</el-button>
      </template>
    </el-dialog>
    <el-dialog v-model='dialogTableEditVisible' title='审批流绑定' width='300px'>
      <WFTableEdit v-if='dialogTableEditVisible' :id='editFlowTableId' ref='tableEdit' :is-edit='isTableEdit' @submitDataResult='handleSubmitTableDataResult' />
      <template #footer>
        <el-button size='mini' type='primary' @click='handleSubmitTableData'>保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang='ts' setup>
import { defineComponent, onMounted, ref } from 'vue'
import { WFEdit, WFTableEdit } from '/@/views/WF/_Components/index'
import {
  GetFlowList,
  GetFlowNodesByFlowId,
  GetFlowRemove,
  GetFlowTableList,
  GetRemoveFlowTable
} from '/@/api/wf/FlowCore'
import { IFlowCore, IFlowNode, IFlowTable } from '/@/type/views/wf/IFlow'
import { ElMessage } from 'element-plus'
import { GetEmployeeRosterPage } from '/@/api/system/roster'
import { getPostTypeList } from '/@/api/system/post'

defineComponent({
  WFEdit
})
const dialogEditVisible = ref(false)
const dialogTableEditVisible = ref(false)
const flowList = ref<IFlowCore[]>([])
const currentFlowNodes = ref<IFlowNode[]>([])
const role = ref<any[]>([])
const user = ref<any[]>([])
const other = ref<any[]>([
  { value: 2, text: '本部门领导' },
  { value: 3, text: '上级部门领导' },
  { value: 4, text: '审批人本部门领导' },
  { value: 5, text: '审批人上级部门领导' },
  { value: 6, text: '自定义' }
])
const isEdit = ref(false)
const editFlowId = ref(0)
const isTableEdit = ref(false)
const editFlowTableId = ref(0)
const flowNodesVisible = ref(false)
const needEditTableVisible = ref(false)
const searchFlowId = ref(-1)
const name = ref('')
const category = ref('')
const tname = ref('')
const tcategory = ref('')
const edit = ref()
const tableEdit = ref()
const viewTab = ref(1)
const flowTableList = ref<IFlowTable[]>([])
const flowTable = ref<IFlowTable>({
  Flow: undefined,
  FlowId: 0,
  Id: 0,
  TableName: '',
  Code: ''
})

const handleAdd = () => {
  isEdit.value = false
  editFlowId.value = 0
  dialogEditVisible.value = true
}
const handleAddTable = () => {
  isTableEdit.value = false
  editFlowTableId.value = 0
  dialogTableEditVisible.value = true
}
const handleSubmitData = () => {
  ;(edit.value as typeof WFEdit).handleSubmitData()
}
const handleSubmitTableData = () => {
  ;(tableEdit.value as typeof WFTableEdit).handleSave()
}
const getFlowList = () => {
  GetFlowList({ name: name.value, category: category.value }).then((res) => {
    if (res.code == 1) {
      flowList.value = res.data
    } else {
      ElMessage.error(res.message)
    }
  })
}
const getFlowTableList = () => {
  GetFlowTableList({ name: tname.value, category: tcategory.value }).then(
    (res) => {
      if (res.code == 1) {
        flowTableList.value = res.data
      } else {
        ElMessage.error(res.message)
      }
    }
  )
}
const getFlowNodesByFlowId = (flowId: number) => {
  GetFlowNodesByFlowId(flowId).then((res) => {
    if (res.code == 1) {
      currentFlowNodes.value = res.data
      flowNodesVisible.value = true
      needEditTableVisible.value = false
    }
  })
}
const handleShowNodes = (id: number) => {
  getFlowNodesByFlowId(id)
}
const handleRemoveNodes = (id: number) => {
  GetFlowRemove(id).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)
      getFlowList()
    } else {
      ElMessage.error(res.message)
    }
  })
}
const handleEditNodes = (id: number) => {
  isEdit.value = true
  editFlowId.value = id
  dialogEditVisible.value = true
}
const handleSubmitDataResult = (res: any) => {
  if (res.code == 1) {
    ElMessage.success(res.message)
    dialogEditVisible.value = false
    getFlowList()
  } else {
    ElMessage.error(res.message)
  }
}
const handleSubmitTableDataResult = (res: any) => {
  dialogTableEditVisible.value = false
  getFlowTableList()
}
const handleNeedEditSteps = (id: number) => {
  flowNodesVisible.value = false
  searchFlowId.value = id
  needEditTableVisible.value = true
}
const handleAllAudit = () => {
  flowNodesVisible.value = false
  searchFlowId.value = -1
  needEditTableVisible.value = true
}
const getUserName = (val: string, type: number) => {
  let currentUsers = val.split(',')
  if (type < 2 && (currentUsers == undefined || currentUsers.length == 0)) {
    return '未指定'
  }
  if (type == 1) {
    let array: string[] = []
    currentUsers.forEach((element) => {
      let name = role.value.find((item) => item.Id == element)
      if (name != undefined) {
        array.push(name.PostName)
      }
    })
    return array.length > 0 ? array.join(',') : '未匹配到相应姓名'
  } else if (type == 0) {
    let array: string[] = []
    currentUsers.forEach((element) => {
      let name = user.value.find((item) => item.Id == element)
      if (name != undefined) {
        array.push(name.RealName)
      }
    })
    return array.length > 0 ? array.join(',') : '未匹配到相应姓名'
  } else if (type == 2) {
    return '本部门领导'
  } else if (type == 3) {
    return '上级部门领导'
  } else if (type == 4) {
    return '审批人本部门领导'
  } else if (type == 5) {
    return '审批人上级部门领导'
  } else {
    return '未匹配'
  }
}
const initHandle = () => {
  GetEmployeeRosterPage({
    page: 1,
    size: 10000
  }).then((res) => {
    if (res.code == 1) {
      user.value = res.data.records.map((m: { User: any }) => {
        return m.User
      })
    }
  })
  getPostTypeList(null).then((res) => {
    if (res.code == 1) {
      let roles_1 = res.data[0].List
      let roles_2 = res.data[1].List
      role.value = roles_1.concat(roles_2)
    }
  })
  getFlowList()
}
const handleChangeViewTab = () => {
  viewTab.value = viewTab.value == 1 ? 2 : 1
}
const handleEditTableBing = (id: number) => {
  isTableEdit.value = true
  editFlowTableId.value = id
  dialogTableEditVisible.value = true
}
const handleRemoveTableBing = (id: number) => {
  GetRemoveFlowTable(id).then((res) => {
    if (res.code == 1) {
      ElMessage.success(res.message)
      getFlowTableList()
    } else {
      ElMessage.error(res.message)
    }
  })
}
onMounted(() => {
  initHandle()
})
</script>

<style scoped>
</style>