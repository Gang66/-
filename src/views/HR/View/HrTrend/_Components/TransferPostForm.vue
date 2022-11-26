<template>
  <div class="TransferPostForm">
    <div>
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="72px" hide-required-asterisk>
        <section class="mt-4">
          <div class="leading-none text-sm mb-5">基本信息</div>
          <div class="flex justify-between px-8 mb-5">
            <div>
              <el-form-item label="申请人员">
                <el-input v-model="data.ruleForm.Name" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
              <el-form-item label="入职时间" class="">
                <el-date-picker v-model="data.ruleForm.InStaffDate" type="date" placeholder="请选择" class="screen-width" disabled />
              </el-form-item>
              <el-form-item label="申请日期" class="">
                <el-date-picker v-model="data.ruleForm.CreateTime" type="date" placeholder="请选择" class="screen-width" disabled />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="性别">
                <el-select v-model="data.ruleForm.Sex" placeholder="请选择离职类别" class="screen-width" disabled>
                  <el-option v-for="item in data.gender" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
              <el-form-item label="所属部门" class="">
                <el-input v-model="data.ruleForm.DeptName" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
              <el-form-item label="合同到期" class="">
                <el-date-picker v-model="data.ruleForm.ContractDate" type="date" placeholder="请选择" class="screen-width" disabled />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="电话">
                <el-input v-model="data.ruleForm.Phone" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
              <el-form-item label="职务" class="">
                <el-input v-model="data.ruleForm.PostName" placeholder="请输入" class="screen-width" disabled />
              </el-form-item>
            </div>
          </div>
        </section>
        <section class="mt-4">
          <div class="leading-none text-sm mb-5">申请信息</div>
          <div class="flex justify-between px-8">
            <div class="deptTree">
              <el-form-item label="调后部门" prop="NewDeptId">
                <el-tree-select v-model="data.ruleForm.NewDeptId" node-key="Id" @change="NewDeptIdChange" :default-expanded-keys="[26]" :data="data.deptTree" check-strictly :render-after-expand="false" placeholder="请选择调后部门" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="调后职位" prop="NewPostId">
                <el-select v-model="data.ruleForm.NewPostId" placeholder="请选择调后职位" class="screen-width" :disabled="data.ruleForm.NewDeptId ? false : true">
                  <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="生效日期" prop="StartDate" label-width="90px">
                <el-date-picker v-model="data.ruleForm.StartDate" type="date" placeholder="请选择" class="screen-width" />
              </el-form-item>
            </div>
          </div>
          <div class="flex justify-between px-8">
            <div>
              <el-form-item label="新岗位试用期" prop="TryTime" label-width="100px" class="-ml-7">
                <el-select v-model="data.ruleForm.TryTime" placeholder="请选择" style="width: 160px">
                  <el-option v-for="item in data.trialTime" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
                <!-- <el-date-picker v-model="data.ruleForm.TryTime" type="date" placeholder="请选择" class="screen-width" /> -->
              </el-form-item>
            </div>
            <div>
              <el-form-item label="调岗性质" prop="PostNature" label-width="82px">
                <el-select v-model="data.ruleForm.PostNature" placeholder="请选择调岗性质" class="screen-width">
                  <el-option v-for="item in data.quitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="功能调整" prop="AdjustPost" label-width="100px">
                <el-select v-model="data.ruleForm.AdjustPost" placeholder="请选择功能调整" class="screen-width">
                  <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="flex px-8" v-if="data.ruleForm.AdjustPost == 1">
            <div>
              <el-form-item label="调前薪资" prop="BeforeMoney" label-width="100px" class="-ml-7">
                <el-input v-model.number="data.ruleForm.BeforeMoney" placeholder="请输入" class="screen-width" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="调后薪资" prop="AfterMoney" label-width="118px">
                <el-input v-model.number="data.ruleForm.AfterMoney" placeholder="请输入" class="screen-width" />
              </el-form-item>
            </div>
          </div>
          <div class="pr-8 mb-5">
            <el-form-item label="调岗原因说明" prop="Explain" class="flex-grow" label-width="104px">
              <el-input v-model="data.ruleForm.Explain" placeholder="请输入" class="flex-grow" autosize type="textarea" />
            </el-form-item>
          </div>
        </section>
        <div class="mt-4">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { getDeptTree } from '/@/api/system/dept'
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetWorkCourseFinishedEntity } from '/@/api/hr/CourseDevelop'
import { GetQuitUserInfo, PostAddEditPostTransferSave, PostAddTrendPositive } from '/@/api/hr/TrendPositive'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { getPostBinding } from '/@/api/system/post'
const store = useCommonStore() //记得加这一句
const userStore = useLayoutStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkCourseFinishedEntity(data.Id).then((res: any) => {
      if (res.code == 1) {
        res.data.CodeType = JSON.parse(res.data.CodeType)
        res.data.FileList.forEach((element: any) => {
          element.name = element.FileName
          element.size = element.FileSize
          element.url = element.SavePath
          element.status = 'success'
        })
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 获取试用期数据
  store.getDict('hr_trial_time').then((res: any) => {
    data.trialTime = res
  })
  // 获取部门树数据
  getDeptTree().then((res: any) => {
    data.deptTree = res.data
  })
  GetQuitUserInfo().then((res: any) => {
    data.ruleForm.CreateTime = parseTime(new Date())
    data.ruleForm.ContractDate = res.data.ContractDate
  })
  data.ruleForm.UserId = userStore.getUserInfo.Id
  data.ruleForm.Sex = userStore.getUserInfo.Sex
  data.ruleForm.Name = userStore.getUserInfo.RealName
  data.ruleForm.Phone = userStore.getUserInfo.UserName
  data.ruleForm.InStaffDate = userStore.getUserInfo.CreateOn
  data.ruleForm.DeptName = userStore.getUserInfo.department
  data.ruleForm.DeptId = userStore.getUserInfo.DeptId
  data.ruleForm.PostIds = userStore.getUserInfo.PostIds
  data.ruleForm.PostName = userStore.getUserInfo.postname
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
  // 功能调整
  store.getDict('hr_TransferPost_adjust').then((res: any) => {
    data.quitOptions = res
  })
  // 调岗性质
  store.getDict('hr_TransferPost_nature').then((res: any) => {
    data.quitWorkOptions = res
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.ApplicationType = JSON.stringify(3)
        PostAddEditPostTransferSave(arr).then((res) => {
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
    BeforeMoney: [
      {
        required: true,
        message: '请填写调前薪资',
        trigger: 'blur'
      }
    ],
    AfterMoney: [
      {
        required: true,
        message: '请填写调后薪资',
        trigger: 'blur'
      }
    ],
    NewDeptId: [
      {
        required: true,
        message: '请选择调后部门',
        trigger: 'change'
      }
    ],
    NewPostId: [
      {
        required: true,
        message: '请选择调后职位',
        trigger: 'change'
      }
    ],
    StartDate: [
      {
        required: true,
        message: '请选择生效日期',
        trigger: 'change'
      }
    ],
    TryTime: [
      {
        required: true,
        message: '请选择试用期期限',
        trigger: 'change'
      }
    ],
    PostNature: [
      {
        required: true,
        message: '请选择调岗性质',
        trigger: 'change'
      }
    ],
    AdjustPost: [
      {
        required: true,
        message: '请选择功能调整',
        trigger: 'change'
      }
    ],
    SocialTime: [
      {
        required: true,
        message: '请选择社保时间',
        trigger: 'change'
      }
    ]
  })
  // 监听部门选择
  const NewDeptIdChange = (val: any) => {
    getPostBinding(val, 1).then((res: any) => {
      data.postList = res.data
    })
  }
  // 根据传递参数 转url
  const retviewurl = (list: any) => {
    var retlist: any = []
    if (list.length > 0) {
      list.forEach((f: any) => {
        var item = remoteUrl(f.Path)
        retlist.push(item)
      })
    }
    console.log(retlist)
    return retlist
  }
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    remoteUrlEvent,
    retviewurl,
    NewDeptIdChange
  }
}
export default defineComponent({
  components: {},
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    },
    // 申请类型
    ApplicationType: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      trialTime: [], //试用期数据
      deptTree: [], //获取组织架构树
      ruleForm: {
        value: null, //测试
        ApplicationType: props.ApplicationType //申请类型
      },
      postList: [], //岗位列表
      quitOptions: {}, //功能调整
      quitWorkOptions: {}, //调岗性质
      Id: props.Id,
      //   选择课件弹窗
      selectCoursewareWindow: {
        view: false
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-900',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss" scoped>
.TransferPostForm {
  .quitForm-header-bg {
    display: flex;
    align-items: center;
    margin-top: 6px;
    min-height: 86px;
    background: linear-gradient(180deg, #f3f7ff 0%, #e3edff 100%);
    border-radius: 4px;
    border: 1px solid #bfcbff;
    :deep(.el-form-item) {
      margin-right: 20px !important;
    }
  }
  :deep(.el-radio) {
    margin-right: 20px;
  }
  :deep(.el-checkbox) {
    margin-right: 20px;
  }
  .remarks {
    text-indent: 2em;
  }
  .title-bg {
    min-height: 42px;
    background: #f4f4f4;
    border: 1px solid #eeeeee;
  }
  .content-style {
    min-height: 48px;
    background: #ffffff;
    border: 1px solid #eeeeee;
  }
  .el-label {
    display: inline-flex;
    justify-content: flex-end;
    align-items: flex-start;
    flex: 0 0 auto;
    font-size: var(--el-form-label-font-size);
    color: var(--el-text-color-regular);
    height: 32px;
    line-height: 32px;
    padding: 0 12px 0 0;
    box-sizing: border-box;
  }
  :deep (.el-tabs__nav-wrap::after) {
    background: none !important;
  }
  .demo-tabs {
    :deep (.el-table th.el-table__cell) {
      background-color: #f3f3f3;
      color: var(--el-text-color-primary);
      border-radius: 4px;
    }
  }
  :deep(.screen-width) {
    width: 160px !important;
  }
  .deptTree {
    :deep(.el-input) {
      width: 160px;
    }
  }
}
</style>
