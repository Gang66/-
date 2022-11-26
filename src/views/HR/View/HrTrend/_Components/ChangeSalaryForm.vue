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
              <el-form-item label="总调薪次数" class="-ml-7" label-width="100px">
                <el-input v-model="data.ruleForm.AdjustTotal" placeholder="请输入" class="screen-width" disabled />
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
          <div class="mb-5 flex items-center">
            <div class="leading-none text-sm">申请信息</div>
            <el-popover trigger="hover" placement="bottom" title="年薪制说明：" :width="400">
              <template #reference>
                <i class="iconfont icon-a-24gl-questionCirclebeifen2x ml-1"></i>
              </template>
              <p>1、年度绩效工资统一于次年1、2、3月分三次发放；</p>
              <p>2、年承包月薪；年薪的80%取整数；</p>
              <p>3、年承包绩效：年薪剩余的薪资；</p>
            </el-popover>
          </div>
          <div class="flex justify-between px-8">
            <div>
              <el-form-item label="申请类别" prop="ApplyType">
                <el-select v-model="data.ruleForm.ApplyType" placeholder="请选择申请类别" class="screen-width">
                  <el-option v-for="item in data.quitOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="调薪类型" prop="AdjustType" label-width="100px">
                <el-select v-model="data.ruleForm.AdjustType" placeholder="请选择调薪类型" class="screen-width">
                  <el-option v-for="item in data.quitWorkOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="调薪前薪资" prop="BeforeSalary" label-width="100px">
                <el-input v-model.number="data.ruleForm.BeforeSalary" placeholder="请输入" class="screen-width">
                  <template #append>元</template>
                </el-input>
              </el-form-item>
            </div>
          </div>
          <template v-if="data.ruleForm.ApplyType == 2">
            <div class="flex justify-between px-8">
              <div>
                <el-form-item label="年薪总额" prop="YearSalary" label-width="100px" class="-ml-7">
                  <el-input v-model.number="data.ruleForm.YearSalary" placeholder="请输入" class="screen-width">
                    <template #append>元</template>
                  </el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="年承包月薪" prop="YearMonthSalary" label-width="100px">
                  <el-input v-model.number="data.ruleForm.YearMonthSalary" placeholder="请输入" class="screen-width">
                    <template #append>元</template>
                  </el-input>
                </el-form-item>
              </div>
              <div>
                <el-form-item label="年承包绩效" prop="YearAchievement" label-width="100px">
                  <el-input v-model.number="data.ruleForm.YearAchievement" placeholder="请输入" class="screen-width" />
                </el-form-item>
              </div>
            </div>
            <div class="flex justify-between px-8">
              <div>
                <el-form-item label="生效日期" prop="AffectDate" label-width="100px" class="-ml-7">
                  <el-date-picker v-model="data.ruleForm.AffectDate" type="date" placeholder="请选择" class="screen-width" />
                </el-form-item>
              </div>
            </div>
          </template>
          <div class="flex justify-between px-8" v-else>
            <div>
              <el-form-item label="调薪后薪资" prop="AfterSalary" label-width="100px" class="-ml-7">
                <el-input v-model.number="data.ruleForm.AfterSalary" placeholder="请输入" class="screen-width">
                  <template #append>元</template>
                </el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="生效日期" prop="AffectDate" label-width="100px">
                <el-date-picker v-model="data.ruleForm.AffectDate" type="date" placeholder="请选择" class="screen-width" />
              </el-form-item>
            </div>
            <div>
              <el-form-item label="发放规则" label-width="100px">
                <el-input v-model="data.ruleForm.SendRule" placeholder="例：月中正常发放" class="screen-width" />
              </el-form-item>
            </div>
          </div>
          <div class="px-8 mb-5">
            <el-form-item label="申请理由" prop="Remark" class="flex-grow">
              <el-input v-model="data.ruleForm.Remark" placeholder="请输入" class="flex-grow" autosize type="textarea" />
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
import { GetQuitUserInfo, PostAddEditAdjustSalarySave, PostAddTrendPositive } from '/@/api/hr/TrendPositive'
import { parseTime, remoteUrl } from '/@/utils/tools'
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
    data.ruleForm.AdjustTotal = res.data.AdjustTotal
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
  // 申请类型
  store.getDict('hr_ChangeSalary_type').then((res: any) => {
    data.quitOptions = res
  })
  // 调薪类型
  store.getDict('hr_ChangeSalary_moneyType').then((res: any) => {
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
        arr.ApplicationType = JSON.stringify(4)
        PostAddEditAdjustSalarySave(arr).then((res) => {
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
    BeforeSalary: [
      {
        required: true,
        message: '请填写调薪前薪资',
        trigger: 'blur'
      }
    ],
    AfterSalary: [
      {
        required: true,
        message: '请填写调薪后薪资',
        trigger: 'blur'
      }
    ],
    Remark: [
      {
        required: true,
        message: '请填写申请理由',
        trigger: 'blur'
      }
    ],
    YearSalary: [
      {
        required: true,
        message: '请填写年薪总额',
        trigger: 'blur'
      }
    ],
    YearMonthSalary: [
      {
        required: true,
        message: '请填写年承包月薪',
        trigger: 'blur'
      }
    ],
    YearAchievement: [
      {
        required: true,
        message: '请填写年承包绩效',
        trigger: 'blur'
      }
    ],
    ApplyType: [
      {
        required: true,
        message: '请选择申请类型',
        trigger: 'change'
      }
    ],
    AdjustType: [
      {
        required: true,
        message: '请选择调薪类型',
        trigger: 'change'
      }
    ],
    AffectDate: [
      {
        required: true,
        message: '请选择生效日期',
        trigger: 'change'
      }
    ]
  })
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
    retviewurl
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
        ApplicationType: props.ApplicationType, //申请类型
        ApplyType: null
      },
      quitOptions: {}, //申请类别
      quitWorkOptions: {}, //调薪类别
      Id: props.Id
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
}
</style>
