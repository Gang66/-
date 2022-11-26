<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow">
    <el-form ref="ruleFormRef" :model="data.userInfo" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-form-item label="手机号" prop="PhoneNumber">
        <el-input v-model="data.userInfo.PhoneNumber" />
      </el-form-item>
      <el-form-item label="家庭地址" prop="Adress">
        <el-input v-model="data.userInfo.HomeAddress" />
      </el-form-item>
      <el-form-item label="事业部门" prop="DepartId">
        <el-tree-select ref="treeRef" :check-strictly="true" style="width: 100%" placeholder="请选择事业部门" v-model="data.userInfo.DeptId" :data="data.sourceData" collapse-tags
          collapse-tags-tooltip node-key="Id" />
      </el-form-item>
      <el-form-item label="岗位" prop="PostId">
        <el-select v-model="data.userInfo.PostIds" filterable class="" placeholder="请选择岗位" style="width: 100%">
          <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label-width="0">
        <div class="w-full text-center">
          <el-button @click="closeWindow">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
        </div>
      </el-form-item>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { dictionaryTypeData } from '/@/type/views/system/dictionary'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { addDictionaryType, editDictionaryType, getTypeDetails } from '/@/api/system/dictionary'
import { useRoute } from 'vue-router'
import { useCommonStore } from '/@/store/modules/Common'
import { GettEmployeeRosterInfo, PostAddEditEmployeeRosterSave } from '/@/api/system/roster'
import { getPostTypeList } from '/@/api/system/post'
import { GetAllSysPostList } from '/@/api/hr/CourseDevelop'
import { number } from 'echarts'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostAddEditEmployeeRosterSave(data.userInfo).then((res) => {
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
  const rules = reactive<FormRules>({})
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
      default: 0
    },
    EmployeeId: {
      type: Number,
      default: 0
    },
    UserId: {
      type: Number,
      default: null
    },
    DeptId: {
      type: Number,
      default: 0
    }
  },
  setup(props, context: SetupContext) {
    let job: any
    let route = useRoute()
    onMounted(() => {})
    let data: any = reactive({
      postList: [],
      userInfo: {
        DeptId: Number(props.DeptId),
        PostIds: ''
      },
      ruleForm: {
        UserId: props.UserId,
        EmployeeId: props.EmployeeId,
        Id: props.Id,
        PhoneNumber: '',
        HomeAddress: ''
      },
      // 事业部部门
      sourceData: [],
      Id: props.Id
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-400',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      if (props.UserId) {
        GettEmployeeRosterInfo(props.UserId).then((res) => {
          if (res.code == 1) {
            if (res.data) {
              ;(data.userInfo = res.data.userinfo), (data.ruleForm = res.data.employ)
              data.userInfo.PhoneNumber = res.data.employ.PhoneNumber
              data.userInfo.HomeAddress = res.data.employ.HomeAddress
            }
          } else {
            ElMessage.error(res.message)
          }
        })
      }
      //  获取组织架构树
      store.getDeptTree().then((res: any) => {
        data.sourceData = res
      })
      // 获取面向人员
      GetAllSysPostList().then((res: any) => {
        if (res.code == 1) {
          data.postList = res.data
        }
      })
    })
    return { boxStyle, job, data, closeWindow, ...formEvent(data, closeWindow) }
  }
})
</script>

<style scoped></style>
