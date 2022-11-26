<template>
  <div class="quitForm">
    <div>
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="72px" hide-required-asterisk>
        <section class="mt-4">
          <div class="mb-5 flex items-center">
            <div class="leading-none text-sm">基本信息</div>
            <el-popover trigger="hover" placement="bottom" title="离职说明" :width="400">
              <template #reference>
                <i class="iconfont icon-a-24gl-questionCirclebeifen2x ml-1"></i>
              </template>
              <p>离职人员应将经营之公文、公物、公款全部缴清、如有信用公共财务应一并缴回，否则视为未办理完离职手续，如有拒不移交、交代不清、虚报、漏报、使公司蒙受损失等事时，应负责赔偿并被依法追究。</p>
              <p>注：离职申请事业部经理通过后，客户库、报价库、合同库、项目库、平台库、渠道管理、应收管理数据系统自动划拨给被交接人；</p>
              <p>招聘专员离职：部门经理通过后，邀约管理、面试管理、入职管理、员工管理数据系统自动划拨给被交接人；</p>
            </el-popover>
          </div>
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
            <div>
              <el-form-item label="离职类别" prop="QuitType">
                <el-select v-model="data.ruleForm.QuitType" placeholder="请选择离职类别" class="screen-width">
                  <el-option v-for="item in data.quitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="离职原因" prop="QuitReason" label-width="90px">
                <el-input v-model="data.ruleForm.QuitReason" placeholder="请输入" class="screen-width" v-if="data.isQuitReason" @input="QuitReasonInput" />
                <el-select v-model="data.ruleForm.QuitReason" placeholder="请选择离职类别" class="screen-width" v-else @change="QuitReasonChange">
                  <el-option v-for="item in data.quitOptionsRemarks" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="工作交接" prop="HandWork" label-width="90px">
                <el-select v-model="data.ruleForm.HandWork" placeholder="请选择工作交接" :class="data.isWorkUser ? '' : 'screen-width'" @change="quitWorkOptionsChange">
                  <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <div v-if="data.isWorkUser">
              <el-form-item label="交接人" prop="HandoverId" label-width="80px">
                <el-select v-model="data.ruleForm.HandoverId" filterable placeholder="请选择交接人员" style="width: 86px">
                  <el-option v-for="item in data.userList" :key="item.UserId" :label="item.RealName" :value="item.UserId" />
                </el-select>
              </el-form-item>
            </div>
          </div>
          <div class="pr-8 mb-5">
            <el-form-item label="离职原因说明" prop="Explain" class="flex-grow" label-width="104px">
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
import { useCommonStore } from '/@/store/modules/Common'
import { useLayoutStore } from '/@/store/modules/layout'
import { GetWorkCourseFinishedEntity } from '/@/api/hr/CourseDevelop'
import { GetQuitUserInfo, PostAddEditStaffQuitSave, PostAddTrendPositive } from '/@/api/hr/TrendPositive'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetAllUserList } from '/@/api/layout'
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
  // 离职类型
  store.getDict('hr_quit_type').then((res: any) => {
    data.quitOptions = res
  })
  // 离职原因
  store.getDict('hr_quit_Remarks').then((res: any) => {
    data.quitOptionsRemarks = res
  })
  // 离职交接工作
  store.getDict('hr_enb_status').then((res: any) => {
    data.quitWorkOptions = res
  })
  // 获取所有人员
  GetAllUserList().then((res: any) => {
    data.userList = res.data
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
        arr.ApplicationType = JSON.stringify(2)
        PostAddEditStaffQuitSave(arr).then((res) => {
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
    Explain: [
      {
        required: true,
        message: '请填写离职原因',
        trigger: 'blur'
      }
    ],
    QuitType: [
      {
        required: true,
        message: '请选择离职类型',
        trigger: 'change'
      }
    ],
    QuitReason: [
      {
        required: true,
        message: '请选择离职原因',
        trigger: 'change'
      }
    ],
    HandWork: [
      {
        required: true,
        message: '请选择工作交接',
        trigger: 'change'
      }
    ],
    HandoverId: [
      {
        required: true,
        message: '请选择交接人',
        trigger: 'change'
      }
    ]
  })
  // 监听手动离职原因
  const QuitReasonInput = (val: any) => {
    if (val == '') {
      data.isQuitReason = false
    }
  }
  //监听离职原因
  const QuitReasonChange = (val: any) => {
    if (val == '其他') {
      data.ruleForm.QuitReason = ''
      data.isQuitReason = true
    } else {
      data.isQuitReason = false
    }
  }
  // 监听工作交接
  const quitWorkOptionsChange = (val: any) => {
    if (val == 1) {
      data.isWorkUser = true
    } else {
      data.isWorkUser = false
    }
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
  // 传递参数 转url
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
    QuitReasonChange,
    QuitReasonInput,
    quitWorkOptionsChange
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
      ruleForm: {
        value: null, //测试
        ApplicationType: props.ApplicationType //申请类型
      },
      isQuitReason: false, //离职原因默认显示选择框
      quitOptions: {}, //离职类别
      quitOptionsRemarks: {}, //离职原因
      quitWorkOptions: {}, //离职交接工作
      isWorkUser: false, //是否显示交接人
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
.quitForm {
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
    :deep (.el-table th.el-table__cell ) {
      background-color: #f3f3f3;
      color: var(--el-text-color-primary);
      border-radius: 4px;
    }
  }
  :deep(.screen-width) {
    width: 160px !important;
  }
}
</style>
