<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10" justify="end">
        <el-col :md="24" :lg="12">
          <el-form-item label="上级部门" prop="ParentId">
            <!-- <el-tree-select class="w-full" clearable node-key="Id" check-strictly v-model="data.ruleForm.ParentId" :data="data.sourceData" filterable
              @node-click="getCheckedNodes" /> -->
            <el-tree-select class="w-full" v-model.number="data.ruleForm.ParentId" node-key="Id" :data="data.sourceData" check-strictly :render-after-expand="false"
              @node-click="getCheckedNodes" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="部门类型" prop="Cls">
            <!-- disabled -->
            <el-select class="w-full" v-model="data.ruleForm.Cls" placeholder="请选择部门等级">
              <el-option v-for="item in data.levelData" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" justify="end">
        <el-col :md="24" :lg="12">
          <el-form-item label="部门名称" prop="Name">
            <el-input v-model="data.ruleForm.Name" placeholder="请填写部门名称" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="部门编码" prop="Code">
            <el-input v-model="data.ruleForm.Code" placeholder="请填写部门编码" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10" justify="end">
        <el-col :md="24" :lg="12">
          <el-form-item label="显示排序" prop="SortNo">
            <el-input v-model.number="data.ruleForm.SortNo" placeholder="请填写显示排序" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="部门角色" prop="PostValue">
            <el-select class="w-full" v-model="data.ruleForm.PostValue" placeholder="请选择部门等级">
              <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id + ''" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="12">
          <el-form-item label="部门领导" prop="OtherManage">
            <el-select v-model="data.ruleForm.OtherManage" filterable multiple collapse-tags collapse-tags-tooltip placeholder="请选择" class="w-full">
              <el-option v-for="item in data.userList" :key="item.UserId" :label="item.RealName" :value="item.UserId" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="12">
          <el-form-item label="部门状态" prop="Status">
            <el-radio-group v-model="data.ruleForm.Status" placeholder="请选择部门状态">
              <el-radio :label="item.DicKey" v-for="(item, index) in data.ruleForm.job" :key="index" :value="item.DicValue">{{ item.DicValue }}</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-row>

      <div class="bf-search-formItem">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { addDept, getDeptDetails, PostEditSysDepartmentSave } from '/@/api/system/dept'
import { getPostSelect } from '/@/api/system/post'
import { GetAllUserList } from '/@/api/layout'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (data.Id) {
          var arr = JSON.parse(JSON.stringify(data.ruleForm))
          arr.OtherManage =(data.ruleForm.OtherManage==null||data.ruleForm.OtherManage=="")?"": JSON.stringify(data.ruleForm.OtherManage)
          PostEditSysDepartmentSave(arr).then((res) => {
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
        } else {
          data.ruleForm.OtherManage =(data.ruleForm.OtherManage==null||data.ruleForm.OtherManage=="")?"": JSON.stringify(data.ruleForm.OtherManage)
          addDept(data.ruleForm).then((res) => {
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
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    Name: [{ required: true, message: '请填写部门名称', trigger: 'blur' }],
    SortNo: [
      { required: true, message: '请填写显示排序' },
      { type: 'number', message: '排序只允许数字' }
    ],
    Code:[{ required: true, message: '请填写字典类型', trigger: 'blur' }],
    Type: [{ required: true, message: '请填写字典类型', trigger: 'blur' }],
    ParentId: [{ required: true, message: '请选择上级部门', trigger: 'changge' }],
    Cls: [{ required: true, message: '请选择部门等级', trigger: 'changge' }],
    Role: [{ required: true, message: '请选择部门岗位', trigger: 'changge' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return { rules, submitForm, resetForm, ruleFormRef }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      userList: [],
      ruleForm: {
        OtherManage: [],
        Name: '',
        Code:'',
        Type: '',
        Remark: '',
        ParentId: 0,
        Status: '1',
        job: {},
        Cls: ''
      },
      levelData: [],
      sourceData: [],
      postList: [], //岗位数据
      Id: props.Id
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1/4',
      boxHeight: ''
    })
    // 树监听
    const getCheckedNodes = (val: any) => {
      data.ruleForm.Cls = val.Cls + 1 + ''
    }
    onMounted(async () => {
      //  获取组织架构树
      await store.getDeptTree().then((res: any) => {
        data.sourceData = res
      })
      // 根据Id获取详情
      if (props.Id) {
        await getDeptDetails(props.Id).then((res) => {
          if (res.code == 1) {
            data.ruleForm = res.data
            data.ruleForm.Cls = res.data.Cls + ''
            data.ruleForm.ParentId = res.data.ParentId
            data.ruleForm.OtherManage =(res.data.OtherManage=""||res.data.OtherManage==null)?"": JSON.parse(res.data.OtherManage)
          } else {
            ElMessage.error(res.message)
          }
        })
      }
      // 获取所有人员
      GetAllUserList().then((res: any) => {
        data.userList = res.data
      })
      // 获取岗位类型
      getPostSelect(2).then((res) => {
        if (res.code == 1) {
          data.postList = res.data
        }
      })
      // 获取任务状态
      store.getDict('sys_job_status').then((res: any) => {
        console.log(res)
        data.ruleForm.job = res
      })
      // 获取部门等级
      store.getDict('sys_dept_level').then((res: any) => {
        data.levelData = res
      })
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      getCheckedNodes
    }
  }
})
</script>

<style scoped></style>
