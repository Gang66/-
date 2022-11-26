<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <el-form :model="form" label-width="70px" class="bf-search-formItem">
        <div class="flex justify-between items-center">
          <div class="bf-table-label">菜单管理</div>
          <el-row :gutter="10" justify="end" style="min-width:294px;">
            <el-col :md="24" :lg="8" v-action='"add"'>
              <el-button type="primary" @click="btn_OpenAddWindow">添加菜单</el-button>
            </el-col>
            <el-col :md="24" :lg="8" v-action='"edit"'>
              <el-button type="success" @click="btn_OpenEditWindow" :disabled="data.IsEditDisabled">编辑菜单</el-button>
            </el-col>
            <el-col :md="24" :lg="8" v-action='"del"'>
              <el-button type="warning" @click="btn_DelMenu" :disabled="data.IsDelDisabled">删除菜单</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form>
      <div class="bf-table-content">
        <el-table row-key="Id" :data="data.tableData" class="w-full" highlight-current-row @current-change="handleCurrentChange">
          <el-table-column prop="Icon" label="图标" width="120" align="center">
            <template #default="scope">
              <img :src="remoteUrlEvent(scope.row.Icon)" alt="" style="width:30px;height:30px;">
              <!-- <el-icon :size="20">
                <component :is='scope.row.Icon'></component>
              </el-icon> -->
            </template>
          </el-table-column>
          <el-table-column prop="Title" label="标题" align="center" />
          <el-table-column prop="Name" label="Name" align="center" />
          <el-table-column prop="Path" label="路径" align="center" />
          <!-- <el-table-column prop="Component" label="Component" align="center" /> -->
          <el-table-column prop="Redirect" label="重定向地址" align="center" />
          <el-table-column prop="NoCache" label="是否缓存" width="80">
            <template #default="scope">
              {{scope.row.NoCache==0?"已开启":"不缓存"}}
            </template>
          </el-table-column>
          <el-table-column prop="Permission" label="指令" align="center">
            <template #default="scope">
              <el-tag v-for="tag in scope.row.Permission" :key="tag.Code" class="mx-1">
                {{ tag.Remark }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="OrderBy" label="排序" width="54" align="center" />
        </el-table>
      </div>
    </div>
    <EditForm v-if='data.EditFormWindow' @closeWindow="closeWindow" :EditData="data.EditData" :ParentSelectData="data.tableData"></EditForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { GetMenuList, EditMenuSave, GetAppMenuList, EditAppMenuSave } from '/@/api/menu/menu'
import { ElMessage, ElMessageBox } from 'element-plus'
import EditForm from './_Components/EditForm.vue'
import { remoteUrl } from '/@/utils/tools'

interface IMenuList {
  ParentId: number | string
  Id: number | string
  Name: string
  Path: string
  Redirect?: string | { name: string }
  Icon: string
  Title: string
  Permission?: string[]
  NoCache: boolean // 菜单是否不缓存
  Component: string
  children?: Array<IMenuList>
  IsDel: Number
  OrderBy: Number
}

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  //组合表格数据
  const tableDataTree = (data: Array<IMenuList>, ParentId: Number) => {
    const d = []
    data.forEach((item) => {
      if (item.ParentId == ParentId) {
        const childrenList = tableDataTree(data, item.Id)
        if (childrenList.length > 0) item.children = childrenList
        d.push(item)
      }
    })
    return d
  }
  //获取数据
  await GetAppMenuList(form).then((res) => {
    if (res.code == 1) {
      data.tableData = tableDataTree(res.data, 0)
    } else
      ElNotification({
        title: '错误',
        message: res.message,
        type: 'error'
      })
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
  renderTableList(form, data)

  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }

  const handleCurrentChange = (val: any) => {
    if (val != undefined) {
      data.selectDetails = val
      data.IsEditDisabled = false
      data.IsDelDisabled = false
      //如果选择的行存在子节点禁用删除
      if (val.children && val.children.length > 0) data.IsDelDisabled = true
    } else {
      data.IsEditDisabled = true
      data.IsDelDisabled = true
    }
  }
  // 网址拼接
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  return {
    search,
    remoteUrlEvent,
    handleCurrentChange
  }
}
const window = (form: any, data: any): any => {
  //点击添加菜单
  const btn_OpenAddWindow = () => {
    data.EditFormWindow = true
    data.EditData = null
  }
  //点击编辑菜单
  const btn_OpenEditWindow = () => {
    data.EditFormWindow = true
    data.EditData = data.selectDetails
  }
  //提交删除信息
  const SubDel = async (d: IMenuList) => {
    await EditAppMenuSave(d).then((res) => {
      if (res.code == 1) {
        ElMessage({
          message: res.message,
          type: 'success'
        })
        tableRender(form, data)
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  //点击删除按钮
  const btn_DelMenu = async () => {
    let d = data.selectDetails
    ElMessageBox.confirm(`确认删除 “${d.Title}"" ?`, '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        d.IsDel = 1
        SubDel(d)
      })
      .catch(() => {})
  }

  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.EditFormWindow = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    closeWindow,
    btn_OpenAddWindow,
    btn_OpenEditWindow,
    btn_DelMenu
  }
}
export default defineComponent({
  name: 'SystemMenu',
  components: {
    EditForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      // 添加菜单弹窗
      EditFormWindow: false,
      selectDetails: [], //列表当前选中详情
      PathList: [], //上传展示数据
      // 列表数据
      tableData: [],
      IsEditDisabled: true, //是否禁用按钮
      IsDelDisabled: true,
      EditData: null,
      lgMun: 8
    })
    onMounted(() => {})
    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>
