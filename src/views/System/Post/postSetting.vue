<template>
  <table-search :current-page="1" :page-size="10" :total="10" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
    <el-table :data="data.tableData" class="w-full" :row-key="getRowKeys" :expand-row-keys="data.expands"
      @selection-change="handleSelectionChange($event, (data.single = !data.single))" @expand-change="toggleRowExpansion">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column prop="name" type="expand">
        <template #default="scope">
          <template v-if="scope.row.List && scope.row.List.length > 0">
            <div class="flex" v-for="(item, index) in scope.row.List" :key="index">
              <div class="table_checkBox">
                <el-checkbox :true-label="item.Id" :false-label="null" @change="handleSelectionChange(item, $event, 1)">{{ "" }}</el-checkbox>
              </div>
              <div class="table_select" />
              <div class="table_post"></div>
              <div class="table_role">{{ item.PostName }}</div>
              <div class="table_character">{{ screenList(item.NatureStandard) }}</div>
              <div class="table_Enable">
                <div v-for="(val, index) in data.job" :key="index">
                  <span v-if="val.DicKey == item.Status" class="bf-font-blue-color">{{ val.DicValue }}</span>
                </div>
              </div>
              <div class="table_operation bf-button-bl">
                <el-button text key="primary" type="primary" @click="editPostForm(item.Id, scope.row.postData)">编辑</el-button>
                <el-button text key="primary" type="primary" class="bf-error-color" @click="deletePostEvent(item.Id)">删除</el-button>
              </div>
            </div>
          </template>
          <div class="" v-else style="text-align: center; width: 100%; padding: 16px 0">暂无数据</div>
        </template>
      </el-table-column>
      <el-table-column prop="PostName" label="岗位类型" width="200" />
      <el-table-column prop="CreateName" label="岗位名称" width="180">
        <template #default="scope">
          {{ scope.row.postData ? scope.row.postData.PostName : "-" }}
        </template>
      </el-table-column>
      <el-table-column prop="NatureStandard" label="性格匹配" width="380">
        <template #default="scope">
          {{ scope.row.postData ? screenList(scope.row.postData.NatureStandard) : "-" }}
        </template>
      </el-table-column>
      <el-table-column prop="Status" label="岗位状态" width="120" align="center">
        <template #default="scope">
          <div v-if="scope.row.postData">
            <div v-for="(item, index) in data.job" :key="index">
              <template v-if="item.DicKey == scope.row.postData.Status">
                <span :class="scope.row.postData.Status == 1 ? 'bf-font-blue-color' : 'bf-error-color'">{{ item.DicValue }}</span>
              </template>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120" align="center">
        <template #default="scope">
          <div class="bf-button-bl">
            <el-button text key="primary" type="primary" @click="editPostForm(scope.row.Id, scope.row.postData, 1)">编辑</el-button>
            <el-button text key="primary" type="primary" class="bf-error-color" @click="deletePostEvent(scope.row.Id, 1, scope.row.List, scope.row.postData)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </table-search>
  <!-- 岗位表单 -->
  <postSettingForm title="新增岗位" v-if="data.postFormDialog.view" @closeWindow="closePostWindow" :Id="data.postFormDialog.Id"></postSettingForm>
  <!-- 新增岗位类型 -->
  <postSettingFormType title="新增岗位" v-if="data.postFormTypeDialog.view" @closeWindow="closePostTypeWindow" :Id="data.postFormTypeDialog.Id"></postSettingFormType>
  <!-- 性格配比 -->
  <PostCharacter title="性格配比" v-if="data.characterDialog.view" @closeWindow="closePostCharacterWindow" :Id="data.characterDialog.Id"></PostCharacter>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  SetupContext
} from 'vue'
import Tree from '/@/components/Tree/index.vue'
import { getPostTypeList, deletePost } from '/@/api/system/post'
import postSettingForm from './_Components/PostSettingForm.vue'
import postSettingFormType from './_Components/PostSettingFormType.vue'
import PostCharacter from './_Components/PostCharacter.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
// 弹窗事件
const window = (form: any, data: any) => {
  // 修改岗位管理表单
  const editPostForm = (Id: number, postData: any, type: number) => {
    if (postData) {
      data.postFormDialog.view = true
      if (type == 1) {
        data.postFormDialog.Id = postData.Id
      } else {
        data.postFormDialog.Id = Id
      }
    } else {
      data.postFormTypeDialog.view = true
      data.postFormTypeDialog.Id = Id
    }
  }
  // 关闭岗位弹窗
  const closePostWindow = (type: string) => {
    data.postFormDialog.view = false
    if (type == 'submit') {
      tableRender(form, data)
    }
  }
  // 关闭岗位类型弹窗
  const closePostTypeWindow = (type: string) => {
    data.postFormTypeDialog.view = false
    if (type == 'submit') {
      tableRender(form, data)
    }
  }
  // 关闭岗位性格配比弹窗
  const closePostCharacterWindow = (type: string) => {
    data.characterDialog.view = false
    if (type == 'submit') {
      tableRender(form, data)
    }
  }
  // 删除数据
  const deletePostEvent = (
    Id: number,
    num: number,
    list: Array<any>,
    postData: any
  ) => {
    ElMessageBox.confirm('是否删除此条信息?', '提示', {
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    }).then(() => {
      var arr = Id
      if (num == 1 && list && list.length > 0) {
        ElMessage.error('岗位类型下还存在岗位无法删除')
        return
      }
      if (postData) {
        arr = postData.Id
      }
      deletePost(arr).then((res) => {
        if (res.code == 1) {
          form.page = 1
          tableRender(form, data)
          ElMessage({ type: 'success', message: '删除成功' })
        } else {
          ElMessage({ type: 'info', message: res.message })
        }
      })
    })
  }
  return {
    closePostCharacterWindow,
    closePostWindow,
    closePostTypeWindow,
    deletePostEvent,
    editPostForm
  }
}
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await getPostTypeList(form).then((res) => {
    if (res.code == 1) {
      res.data.forEach((val: any) => {
        if (val.List && val.List.length > 0) {
          val.postData = val.List.splice(0, 1)[0]
        } else {
          val.postData = null
        }
      })
      data.tableData = res.data
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  let _this = getCurrentInstance()
  renderTableList(form, data)
  const handleSizeChange = (v: number) =>
    (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) =>
    (form.page = v) && renderTableList(form, data)
  // 搜索
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  // 处理性格配比数据
  const screenList = (val: any) => {
    var title = ''
    if (val) {
      const item = eval('(' + val + ')')
      item.forEach((element: any) => {
        element.EnneagramCode.forEach((value: any) => {
          data.list.forEach((v: any) => {
            if (value == v.DicKey) {
              title += v.DicValue.substr(3, 2) + '，'
            }
          })
        })
      })
    }
    return title ? title : '-'
  }
  return {
    search,
    handleSizeChange,
    handleCurrentChange,
    tableRender,
    screenList
  }
}
// 表格事件
const tableEvent = (form: any, data: any, context: any) => {
  // 监听列表选择
  const handleSelectionChange = (val: any, v: any, type: number) => {
    if (type == 1) {
      data.characterDialog.Id = val.Id
      if (v) {
        data.selectList.push(val)
      } else {
        data.selectList.forEach((value: any, index: number) => {
          if (val.postId == value.postId) {
            data.selectList.splice(index, 1)
          }
        })
      }
      console.log(val)
    } else {
      data.selectVal = val
      if (val.length > 0) {
        if (!val[0].postData) {
          ElMessage.error('当前岗位类型下不存在岗位无法绑定性格配比')
          return
        }
        data.characterDialog.Id = val[0].postData.Id
      }
    }
    data.summaryList = data.selectList.concat(data.selectVal)
    data.single = data.summaryList.length !== 1
    context.emit('single', data.single)
  }
  // 列表key值绑定列表展开数据
  const getRowKeys = (row: any) => {
    return row.Id
  }
  // 于列表key值进行使用数据更新时不关闭展开列表
  const toggleRowExpansion = (row: any, list: any) => {
    data.selectList = []
    data.summaryList = data.selectList.concat(data.selectVal)
    data.single = data.summaryList.length !== 1
    if (list.length > 0) {
      data.expands = []
      data.expands.push(row.Id)
    }
  }
  return { toggleRowExpansion, handleSelectionChange, getRowKeys }
}
export default defineComponent({
  components: {
    Tree,
    TableSearch,
    postSettingForm,
    postSettingFormType,
    PostCharacter
  },
  emits: ['single'],
  props: {},
  setup(props, context: SetupContext) {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10
    })
    const data = reactive({
      // 岗位表单传参
      postFormDialog: {
        view: false
      },
      // 岗位类型表单传参
      postFormTypeDialog: {
        view: false
      },
      // 性格匹配数据
      characterDialog: {
        view: false
      },
      expands: [],
      // 列表数据
      tableData: [],
      // 选中数据
      selectList: [],
      //val选中数据
      selectVal: [],
      //汇总数据
      summaryList: [],
      //单选
      single: true,
      // 任务状态数据
      job: {},
      // 性格配比
      list: []
    })
    onMounted(() => {
      // 获取任务状态
      store.getDict('sys_job_status').then((res: any) => {
        data.job = res
      })
      // 获取性格字典
      store.getDict('sys_character_test').then((res: any) => {
        data.list = res
      })
    })
    return {
      data,
      form,
      ...tableRender(form, data),
      ...window(form, data),
      ...tableEvent(form, data, context)
    }
  }
})
</script>
<style lang="postcss" scoped>
.table_select {
  width: 37px;
}
.table_checkBox {
  width: 65px;
  padding: 0 4px !important;
  text-align: center;
}
.table_post {
  width: 200px;
  padding: 0 12px !important;
  margin: auto 0;
}
.table_role {
  width: 180px;
  padding: 0 12px !important;
  margin: auto 0;
}
.table_character {
  width: 380px;
  padding: 0 12px !important;
  margin: auto 0;
}
.table_Enable {
  width: 120px;
  padding: 0 12px !important;
  text-align: center;
  margin: auto 0;
}
.table_operation {
  padding: 0 12px !important;
  margin: auto;
  text-align: center;
}
</style>
