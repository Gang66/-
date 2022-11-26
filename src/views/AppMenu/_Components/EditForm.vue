<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="菜单管理">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="选择父级" prop="ParentId">
        <el-tree-select v-model="data.ruleForm.ParentId" placeholder="请选择父级菜单" @change="SelParentIdChange" :data='data.ParentSelectData' check-strictly style="width: 100%;"
          :props='data.TreeSelectProp'>
        </el-tree-select>
      </el-form-item>
      <el-form-item label="页面图标" prop="Icon">
        <img :src="remoteUrlEvent(data.ruleForm.Icon)" alt="" v-if="data.ruleForm.Icon" style="width:50px;height:50px;">
        <el-button type="primary" @click="data.UploadWindow.view=true">上传图片</el-button>
      </el-form-item>
      <!-- <el-form-item label="页面图标" prop="Icon">
        <el-select v-model="data.ruleForm.Icon" placeholder="请选择页面图标" style="width: 100%;">
          <el-option v-for="item in ElIconsData" :key="`ElIcon${item.name}`" :value="`ElIcon${item.name}`">
            <span style="float: left">
              <el-icon :size="20">
                <component :is='`ElIcon${item.name}`'></component>
              </el-icon>
            </span>
            <span style="float: right;color: var(--el-text-color-secondary);font-size: 13px;">ElIcon{{ item.name }}</span>
          </el-option>
        </el-select>
      </el-form-item> -->
      <el-form-item label="页面标题" prop="Title">
        <el-input v-model="data.ruleForm.Title" placeholder="请输入标题" />
      </el-form-item>
      <!-- <el-form-item label="Component" prop="Component">
        <el-select v-model="data.ruleForm.Component" placeholder="布局选择" style="width: 100%;" v-if="computedObj.Component">
          <el-option label="一级布局" value="Layout" />
          <el-option label="二级布局" value="ComponentLayout" />
          <el-option label="商学院布局" value="School" />
          <el-option label="页面路径" value="/" />
        </el-select>
        <el-input v-model="data.ruleForm.Component" placeholder="请输入Component" @blur="blurComponent" v-else />
      </el-form-item>
      <el-form-item label="Name" prop="Name">
        <el-input v-model="data.ruleForm.Name" placeholder="请输入Name" :disabled="!computedObj.Component" />
      </el-form-item> -->
      <el-form-item label="路由地址" prop="Path">
        <el-input v-model="data.ruleForm.Path" placeholder="请输入路由地址" :disabled="!computedObj.Component" />
      </el-form-item>
      <!-- <el-form-item label="重定向" prop="Redirect">
        <el-input v-model="data.ruleForm.Redirect" placeholder="重定向地址(选填)" />
      </el-form-item>
      <el-form-item label="是否缓存" prop="NoCacheStr">
        <el-select v-model="data.ruleForm.NoCacheStr" placeholder="请选择是否缓存" style="width: 100%;">
          <el-option label="开启缓存" value="0" />
          <el-option label="不缓存" value="1" />
        </el-select>
      </el-form-item>
      <el-form-item label="是否隐藏" prop="Hidden">
        <el-select v-model="data.ruleForm.Hidden" placeholder="请选择是否缓存" style="width: 100%;">
          <el-option label="不隐藏" :value="false" />
          <el-option label="隐藏" :value="true" />
        </el-select>
      </el-form-item>
      <el-form-item label="页面指令" prop="Permission" v-if="data.ruleForm.ParentId!=0">
        <template v-for="tag in data.ruleForm.Permission" :key="tag.Code">
          <el-tag v-if="tag.IsDel==0" class="mx-1 mytag" size="large" closable @close="btn_DelPermission(tag)" @click="btn_EditPermissionWindow(tag)">
            {{ tag.Remark }}
          </el-tag>
        </template>
        <div class='addIconBorder' @click="btn_AddPermissionWindow">
          <el-icon :size='30'>
            <el-icon-plus></el-icon-plus>
          </el-icon>
        </div>
      </el-form-item> -->
      <el-form-item label="页面排序" prop="OrderBy">
        <el-input-number v-model="data.ruleForm.OrderBy" :precision="0" :step="1" />
      </el-form-item>

      <div class="bf-search-formItem">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
    <EditPermission v-if="data.EditPermissionShow" @closeWindow="closePermissionWindow" :EditData="data.EditPermissionData"></EditPermission>
    <!-- 上传图片 -->
    <Upload :uploadFileData="data.ImgUrl" @uploadFileData="uploadFileDataEvent" v-if="data.UploadWindow.view" @closeWindow="data.UploadWindow.view=false" title="上传图片">
    </Upload>
  </OpenWindow>

</template>


<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import Upload from '/@/components/Upload/Index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext, computed } from 'vue'
import { ElMessage, FormInstance, FormRules, ElMessageBox } from 'element-plus'
import { AddAppMenuSave, EditAppMenuSave, GetMenuList } from '/@/api/menu/menu'
import EditPermission from './EditPermission.vue'
import * as ElIcons from '@element-plus/icons-vue'
import { remoteUrl } from '/@/utils/tools'

const ElIconsData = ElIcons as unknown as Array<() => Promise<typeof import('*.vue')>>

// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        data.ruleForm.NoCache = data.ruleForm.NoCacheStr == '0' ? false : true
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        if (arr.ParentId == 0 && arr.Component != 'School') arr.Component = 'Layout'

        //判断是否是编辑
        if (data.IsEdit)
          EditAppMenuSave(arr).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: 'success'
              })
              closeWindow('submit')
            } else {
              ElMessage.error(res.message)
            }
          })
        else
          AddAppMenuSave(arr).then((res) => {
            if (res.code == 1) {
              ElMessage({
                message: res.message,
                type: 'success'
              })
              closeWindow('submit')
            } else {
              ElMessage.error(res.message)
            }
          })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    ParentId: [
      {
        required: true,
        message: '请选择父级',
        trigger: 'change'
      }
    ],
    Name: [
      {
        required: true,
        message: '请填写Name',
        trigger: 'change'
      }
    ],
    Title: [
      {
        required: true,
        message: '请填写标题',
        trigger: 'change'
      }
    ],
    Path: [
      {
        required: true,
        message: '请填写路径',
        trigger: 'change'
      }
    ],
    Redirect: [
      {
        required: false,
        trigger: 'blur'
      }
    ],
    Icon: [
      {
        required: true,
        message: '请选择图标',
        trigger: 'blur'
      }
    ],
    NoCacheStr: [
      {
        required: true,
        message: '请选择是否缓存页面',
        trigger: 'blur'
      }
    ],
    HiddenStr: [
      {
        required: true,
        message: '请选择是否隐藏页面',
        trigger: 'blur'
      }
    ],
    Component: [
      {
        required: false,
        message: '请填写Component名称',
        trigger: 'blur'
      }
    ],
    Redirect: [
      {
        required: false,
        message: '请填写重定向地址',
        trigger: 'blur'
      }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  const SelParentIdChange = (val: any) => {
    if (data.IsEdit) return
    try {
      const d = data.ParentSelectData.filter((x) => x.Id == val)[0]
      if (d.children && d.children.length > 0) data.ruleForm.OrderBy = d.children[d.children.length - 1].OrderBy + 1
      else data.ruleForm.OrderBy = 1
    } catch (e) {
      data.ruleForm.OrderBy = 1
    }
  }

  //计算属性
  let computedObj = reactive({
    Component: false
  })
  //是否为布局
  computedObj.Component = computed(() => {
    return !(data.ruleForm.Component.substring(0, 1) == '/')
  })

  //路径修改结束后
  const blurComponent = (e) => {
    //页面路径
    const indexMatch = data.ruleForm.Component.match(/(.*)\/Index$/i)
    let name = indexMatch ? indexMatch[1] : data.ruleForm.Component
    //路由地址
    data.ruleForm.Path = name.replace(new RegExp('.vue', 'ig'), '')

    //路由名称
    data.ruleForm.Name = data.ruleForm.Path.replace(new RegExp('/', 'g'), '')
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ImgUrl = val
    data.ruleForm.Icon = val[0].Path
  }
  // 网址拼接
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    SelParentIdChange,
    computedObj,
    blurComponent,
    uploadFileDataEvent,
    remoteUrlEvent
  }
}
//指令相关事件
const permission = (data: any) => {
  //删除指令
  const btn_DelPermission = (d) => {
    ElMessageBox.confirm(`确认删除指令 “${d.Remark}” ?`, '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
    })
      .then(() => {
        d.IsDel = 1
      })
      .catch(() => {})
  }
  //打开添加指令
  const btn_AddPermissionWindow = () => {
    data.EditPermissionData = null
    data.EditPermissionShow = true
  }
  //编辑指令
  const btn_EditPermissionWindow = (d: any) => {
    data.EditPermissionData = d
    data.EditPermissionShow = true
  }
  // 关闭指令弹窗，获取指令数据
  const closePermissionWindow = (d: any) => {
    if (d.type == 'add') {
      //查找是否存在已添加未删除的重复指令
      let item = data.ruleForm.Permission.findIndex((x) => x.Code == d.Code && x.IsDel == 0)
      if (item != -1) {
        ElMessage.error('指令名称已存在')
        return
      }
      data.ruleForm.Permission.push(d)
    } else if (d.type == 'edit') {
      //查找是否存在已添加未删除的与本次修改名称重复的指令
      let i = data.ruleForm.Permission.findIndex((x) => x.Code == d.Code && x.Id != d.Id && x.IsDel == 0)
      if (i != -1) {
        ElMessage.error('指令名称已存在')
        return
      }
      //查找要修改的指令的位置
      let i2 = data.ruleForm.Permission.findIndex((x) => x.Id == d.Id)
      if (i2 != -1) {
        const menuId = data.ruleForm.Permission[i2].MenuId || 0
        d.MenuId = menuId
        data.ruleForm.Permission[i2] = d
      }
    }
    data.EditPermissionShow = false
  }
  return {
    btn_DelPermission,
    btn_AddPermissionWindow,
    btn_EditPermissionWindow,
    closePermissionWindow
  }
}

export default defineComponent({
  components: {
    OpenWindow,
    EditPermission,
    Upload
  },
  emits: ['closeWindow'],
  props: {
    EditData: {
      default: null
    },
    ParentSelectData: {
      default: []
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ImgUrl: [],
      ruleForm: {
        ParentId: '',
        Name: '',
        Path: '',
        Redirect: '',
        Icon: '',
        Title: '',
        NoCacheStr: '0',
        NoCache: false,
        HiddenStr: '0',
        Hidden: false,
        Component: '',
        OrderBy: 1,
        Permission: [],
        IsDel: 0
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      },
      ParentSelectData: [],
      TreeSelectProp: {
        label: 'Title',
        value: 'Id'
      },
      IsEdit: false,
      EditPermissionShow: false,
      EditPermissionData: null
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    onMounted(() => {
      //获取菜单列表数据
      if (props.ParentSelectData.length > 0) {
        let d = JSON.parse(JSON.stringify(props.ParentSelectData))
        d.splice(0, 0, { Id: 0, Title: '根目录' })
        data.ParentSelectData = d
      } else data.ParentSelectData = [{ Id: 0, Title: '根目录' }]
      //获取本次编辑的数据
      if (props.EditData != null) {
        data.IsEdit = true
        let d = JSON.parse(JSON.stringify(props.EditData))
        data.ruleForm = d
        data.ruleForm.NoCacheStr = d.NoCache ? '1' : '0'
      }
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      ...permission(data),
      ElIconsData
    }
  }
})
</script>

<style scoped>
.addIconBorder {
  border: 1px solid var(--el-border-color);
  height: 32px;
  width: 32px;
  color: var(--el-border-color);
  cursor: pointer;
}
.mytag {
  cursor: pointer;
}
</style>
