<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="入职信息" class="TransferInForm">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="90px" label-position="right" class="bf-window-padding" hide-required-asterisk>
      <div class="flex justify-between">
        <el-form-item class="justify-center" prop="InviteName" label="姓名">
          <el-input v-model="data.ruleForm.InviteName" placeholder="姓名" disabled />
        </el-form-item>
        <el-form-item label="部门" prop="DeptId">
          <el-tree-select v-model="data.ruleForm.DeptId" ref="treeRef" :data="data.sourceData" check-strictly :render-after-expand="false" node-key="Id" />
        </el-form-item>
      </div>
      <div class="flex justify-between">
        <el-form-item label="岗位类型" prop="postType">
          <el-select class="w-full" v-model="data.ruleForm.PostType" placeholder="请选择岗位类型">
            <el-option v-for="item in data.postType" :key="item.Id" :label="item.PostName" :value="item.Id" />
          </el-select>
        </el-form-item>
        <el-form-item class="justify-center" prop="PostId" label="岗位">
          <el-select class="w-full" v-model="data.ruleForm.PostId" placeholder="岗位">
            <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id " />
          </el-select>
        </el-form-item>
      </div>
      <template v-if="data.ruleForm.HrPointJson">
        <div class="flex justify-between">
          <el-form-item label="试用期限">
            <el-select v-model="data.ruleForm.HrPointJson.TryTime" placeholder="请选择">
              <el-option v-for="item in data.trialTime" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
          <el-form-item class="justify-center" label="试用期工资">
            <el-input v-model="data.ruleForm.HrPointJson.TryPay" placeholder="试用期工资" @input="(v) => (data.ruleForm.HrPointJson.TryPay = v.replace(/[^\d]/g, ''))" />
          </el-form-item>
        </div>
        <div class="flex justify-between">
          <el-form-item class="justify-center" label="转正工资">
            <el-input v-model="data.ruleForm.HrPointJson.FormalPay" placeholder="转正工资" @input="(v) => (data.ruleForm.HrPointJson.FormalPay = v.replace(/[^\d]/g, ''))" />
          </el-form-item>
          <el-form-item class="justify-center" label="入职时间" prop="ComeDate">
            <el-date-picker v-model="data.ruleForm.ComeDate" type="date" placeholder="入职时间" />
          </el-form-item>
        </div>
      </template>
      <div class="flex justify-between">
        <el-form-item class="justify-center" label="人事" prop="HrName">
          <el-input v-model="data.ruleForm.HrName" placeholder="人事" disabled />
        </el-form-item>
        <el-form-item class="justify-center" label="师傅">
          <el-select v-model="data.ruleForm.MasterWorker" placeholder="师傅">
            <el-option v-for="item in data.userList" :key="item.Id" :label="item.RealName" :value="item.Id" />
          </el-select>
        </el-form-item>
      </div>
      <div class="bf-search-formItem mt-4 relative">
        <div class="btnBorder"></div>
        <div class="bf-text-color-regular text-xs ml-12">注：以上信息一经确认不可修改</div>
        <div class="text-right w-full">
          <el-button @click="closeWindow('close')">取 消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">确 定</el-button>
        </div>
      </div>
    </el-form>
  </OpenWindow>
</template>

<script lang="ts">
import qrcode from '/@/components/qrcode/index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'

import useClipboard from 'vue-clipboard3'
import { GetSelectInterViewInfo, PostEditInterViewComeDate } from '/@/api/hr/Interview'
import { getPostSelect } from '/@/api/system/post'
import { GetDeptOrCompUserList, GetMasterUserList } from '/@/api/system/user'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.HrPointJson = JSON.stringify(arr.HrPointJson)
        arr.DeptId = arr.DeptId.toString()
        arr.PostId = arr.PostId.toString()
        arr.PostType = arr.PostType.toString()
        arr.InterViewId = arr.Id
        arr.Type = '3'
        PostEditInterViewComeDate(arr).then((res) => {
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
    MasterWorker: [
      {
        required: true,
        message: '请选择师傅',
        trigger: 'change'
      }
    ],
    DeptId: [
      {
        required: true,
        message: '请选择部门',
        trigger: 'change'
      }
    ], //
    PostType: [
      {
        required: true,
        message: '请选择岗位类型',
        trigger: 'change'
      }
    ],
    PostId: [
      {
        required: true,
        message: '请选择岗位',
        trigger: 'change'
      }
    ],
    ComeDate: [
      {
        required: true,
        message: '请选择入职时间',
        trigger: 'change'
      }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return { rules, submitForm, resetForm, ruleFormRef }
}
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    // 根据面试Uid获取登记表详情 InterViewInfo面试信息 userList部门列表信息
    await GetSelectInterViewInfo(data.Id).then((res) => {
      if (res.code == 1) {
        res.data.InterViewInfo.HrPointJson = JSON.parse(res.data.InterViewInfo.HrPointJson)
        data.ruleForm = res.data.InterViewInfo
        data.ruleForm.PostType = res.data.PostType.Id > 0 ? res.data.PostType.Id : undefined
        data.ruleForm.MasterWorker = res.data.manager > 0 ? res.data.manager : undefined
      } else {
        ElMessage.error(res.message)
      }
    })
    GetMasterUserList(data.ruleForm.DeptId).then((res: any) => {
      if (res.code == 1) {
        data.userList = res.data.list
      }
    })
  }
  // 获取试用期数据
  store.getDict('hr_trial_time').then((res: any) => {
    data.trialTime = res
  })
  //  获取组织架构树
  store.getDeptTree().then((res: any) => {
    data.sourceData = res
    console.log(data.sourceData)
  })
  // 获取岗位类型
  getPostSelect(1).then((res) => {
    if (res.code == 1) {
      data.postType = res.data
    }
  })
  // 获取岗位列表
  getPostSelect(2).then((res) => {
    if (res.code == 1) {
      data.postList = res.data
    }
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    qrcode
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    Id: {
      type: Number,
      default: null
    },
    // 面试信息
    info: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const { toClipboard } = useClipboard()
    let data: any = reactive({
      value: '', //测试
      userList: [], //部门列表信息
      sourceData: [], //部门组织架构树
      postType: [], //岗位类型
      postList: [], //岗位列表
      trialTime: [], //试用期限
      ruleForm: {
        InterViewId: props.info.Id,
        InviteId: props.info.InviteId,
        Type: '3',
        ComeDate: props.info.ComeDate,
        HrName: props.info.HrName,
        HrId: props.info.HrId
      },
      // 查看详情Id
      Id: props.Id
    })
    const options = [
      {
        value: 'Option1',
        label: 'Option1'
      },
      {
        value: 'Option2',
        label: 'Option2'
      },
      {
        value: 'Option3',
        label: 'Option3'
      },
      {
        value: 'Option4',
        label: 'Option4'
      },
      {
        value: 'Option5',
        label: 'Option5'
      }
    ]
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
      console.log(props.info)
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      options,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.TransferInForm {
  .bf-window-padding {
    padding-right: 30px;
  }
  .el-form-item {
    width: 45%;
  }
  .el-select {
    width: 100%;
  }
  .el-form-item {
    margin-bottom: 18px;
  }
  .btnBorder {
    width: 700px;
    position: absolute;
    top: -15px;
    left: -16px;
    border-top: var(--el-border);
  }
}
</style>
