<template>
  <div class="DailyPlanForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="培训计划">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div>
            <div class="flex justify-between">
              <div class="flex items-center">
                <div class="m-hr bf-bg-blue-color"></div>
                <div class="leading-none ml-2 font-semibold">基础信息</div>
              </div>
            </div>
            <div class="mt-2">
              <div class="flex">
                <el-form-item label="培训主题" prop="Name">
                  <el-input v-model="data.ruleForm.Name" placeholder="请输入" />
                </el-form-item>
                <el-button class="ml-2" @click="data.UploadWindow.view = true">上传封面</el-button>
                <el-form-item label="开放时间" prop="time">
                  <el-date-picker v-model="data.ruleForm.time" type="datetimerange" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" @change="timeChange" />
                </el-form-item>
              </div>
              <div class="flex w-full">
                <el-form-item label="培训类型" prop="CategoryId">
                  <el-select v-model="data.ruleForm.CategoryId" class="screen-width" placeholder="请选择" style="width: 128px">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.LearningPlanType" />
                  </el-select>
                </el-form-item>
                <el-form-item label="备注说明" prop="Content" class="flex-grow">
                  <el-input v-model="data.ruleForm.Content" placeholder="请输入" class="flex-grow" />
                </el-form-item>
              </div>
            </div>
            <div class="mt-2">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="m-hr bf-bg-blue-color"></div>
                  <div class="leading-none ml-2 font-semibold">培训人员</div>
                </div>
                <el-button type="primary" @click="data.SelectUserWindow.view = true" :disabled="data.isEdit">选择人员</el-button>
              </div>
              <div class="border mt-2">
                <el-table :data="data.PlanUserList" style="width: 100%">
                  <el-table-column type="index" label="序号" width="70" align="center" />
                  <el-table-column prop="UserName" label="姓名" width="180" align="center" />
                  <el-table-column prop="CompName" label="事业部" width="180" align="center" />
                  <el-table-column prop="DeptName" label="部门" width="240" align="center" />
                  <el-table-column prop="" label="操作" align="center">
                    <template #default="scope">
                      <el-button type="danger" @click="handleDeleteUser(scope.row.UserId)" link :disabled="data.isEdit"> 删除 </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="mt-3 Courseware">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="m-hr bf-bg-blue-color"></div>
                  <div class="leading-none ml-2 font-semibold">培训课件</div>
                </div>
                <el-button type="primary" @click="data.selectCoursewareWindow.view = true" :disabled="data.isEdit">选择课件</el-button>
              </div>
              <div class="border mt-2">
                <el-table :data="data.PlanCoursewareList" style="width: 100%">
                  <el-table-column type="index" label="序号" width="60" align="center" />
                  <el-table-column prop="CoursewareNo" label="课件编码" align="center" width="180" />
                  <el-table-column prop="CoursewareName" label="课件名称" width="180" align="center" />
                  <el-table-column prop="CoursewareMinMinutes" label="时长" align="center" width="60" />
                  <el-table-column prop="" label="排序" width="60">
                    <template #default="scope">
                      <el-input type="number" v-model="scope.row.Sort" size="small" :disabled="data.isEdit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="笔记">
                    <template #default="scope">
                      <el-switch v-model="scope.row.Note" :active-value="1" :inactive-value="0" :disabled="data.isEdit"> </el-switch>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="刷题" width="60">
                    <template #default="scope">
                      <el-input type="number" v-model="scope.row.TestCount" size="small" :disabled="data.isEdit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="考试" width="60">
                    <template #default="scope">
                      <el-input type="number" v-model="scope.row.ExamCount" size="small" :disabled="data.isEdit"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="操作" align="center">
                    <template #default="scope">
                      <el-button type="danger" @click="handleDeleteCourseware(scope.row.CoursewareId)" link :disabled="data.isEdit"> 删除 </el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="mt-3">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="m-hr bf-bg-blue-color"></div>
                  <div class="leading-none ml-2 font-semibold">大考设置</div>
                </div>
                <div>分数：{{ getPaperScore() }}</div>
              </div>
              <div class="mt-2 bg-bigTest p-2 py-3">
                <div class="flex items-center">
                  <el-form-item label="单选个数" prop="SingleCount">
                    <el-input v-model="data.ruleForm.SingleCount" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                  <el-form-item label="单选分数" prop="SingleScore">
                    <el-input v-model="data.ruleForm.SingleScore" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                  <el-form-item label="多选个数" prop="MultipleCount">
                    <el-input v-model="data.ruleForm.MultipleCount" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                  <el-form-item label="多选分数" prop="MultipleScore">
                    <el-input v-model="data.ruleForm.MultipleScore" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                </div>
                <div class="flex items-center bf-search-formItem">
                  <el-form-item label="判断个数" prop="JudgeCount">
                    <el-input v-model="data.ruleForm.JudgeCount" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                  <el-form-item label="判断分数" prop="JudgeScore">
                    <el-input v-model="data.ruleForm.JudgeScore" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                  <el-form-item label="考试时长" prop="SuggestTime">
                    <el-input v-model="data.ruleForm.SuggestTime" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                  <el-form-item label="及格分数" prop="SuggestMinScore">
                    <el-input v-model="data.ruleForm.SuggestMinScore" placeholder="请输入" :disabled="data.isEdit" />
                  </el-form-item>
                </div>
              </div>
            </div>
          </div>
          <div class="bf-search-formItem mt-4" v-if="!data.isdisabled">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </OpenWindow>
    <SelectUser v-if="data.SelectUserWindow.view" @closeWindow="data.SelectUserWindow.view = false" @selectDetails="selectDetailsEvent"></SelectUser>
    <selectCourseware v-if="data.selectCoursewareWindow.view" @closeWindow="data.selectCoursewareWindow.view = false" @CoursewareDetails="CoursewareDetails" :IsNewest="2"> </selectCourseware>
    <!-- 上传图片 -->
    <Upload :uploadFileData="data.ImgUrl" @uploadFileData="uploadFileDataEvent" v-if="data.UploadWindow.view" @closeWindow="data.UploadWindow.view = false" title="上传封面"> </Upload>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import SelectUser from '../../../Components/SelectUser/Index.vue'
import selectCourseware from './selectCourseware.vue'
import Upload from '/@/components/Upload/Index.vue'
import { computed, defineComponent, getCurrentInstance, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetWorkStudyPlanEntity, PostEditWorkStudyPlanSave } from '/@/api/hr/LearningPlan'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetWorkStudyPlanEntity(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ruleForm = Object.assign(res.data.PlanTestPaperOptionsEntity, res.data.PlanTestPaperEntity, res.data.PlanEntity)
        data.ruleForm.CategoryId = data.ruleForm.CategoryId + ''
        data.ruleForm.time = [data.ruleForm.BeginDate, data.ruleForm.EndDate]
        data.PlanUserList = res.data.PlanUserList
        //课程
        var _coursewareList: any = []
        res.data.PlanCoursewareList.forEach((item: any) => {
          var _coursewareObj = res.data.CoursewareList.find((x: any) => {
            return x.Id == item.CoursewareId
          })
          _coursewareList.push({
            Id: item.Id,
            CoursewareId: item.CoursewareId,
            CoursewareName: _coursewareObj.Name, //课件名称
            CoursewareNo: _coursewareObj.No, //课件编号
            CoursewareMinMinutes: _coursewareObj.MinMinutes, //课件最低学习时间
            CoursewareClass: _coursewareObj.Class, //课件类型
            Note: item.Note, //是否笔记 0 否 1 是
            Stage: item.Stage, //时间段 1上午 2下午
            TestCount: item.TestCount, //刷题次数
            ExamCount: item.ExamCount, //考试次数
            Sort: item.Sort
          })
        })
        data.isEdit = true
        data.PlanCoursewareList = _coursewareList
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 获取请假表详情
  var arr: any = { Id: 0, date: parseTime(new Date()) }
  if (data.Id) arr.Id = data.Id
  // 获取培训类型
  store.getDict('hr_LearningPlan_type').then((res: any) => {
    data.LearningPlanType = res
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
        //  JSON.parse(JSON.stringify(data.ruleForm))
        var arr = {
          PlanEntity: {
            CategoryId: ''
          },
          PlanUserList: [],
          PlanCoursewareList: [],
          PlanTestPaperEntity: {},
          PlanTestPaperOptionsEntity: {}
        }
        arr.PlanEntity = data.ruleForm
        arr.PlanEntity.CategoryId = data.ruleForm.CategoryId + ''
        arr.PlanUserList = data.PlanUserList
        arr.PlanCoursewareList = data.PlanCoursewareList
        arr.PlanTestPaperEntity = {
          SuggestTime: data.ruleForm.SuggestTime,
          SuggestMinScore: data.ruleForm.SuggestMinScore,
          Score: data.ruleForm.Score,
          ContentType: data.ruleForm.ContentType
        }
        arr.PlanTestPaperOptionsEntity = {
          SingleCount: data.ruleForm.SingleCount,
          SingleScore: data.ruleForm.SingleScore,
          MultipleCount: data.ruleForm.MultipleCount,
          MultipleScore: data.ruleForm.MultipleScore,
          JudgeCount: data.ruleForm.JudgeCount,
          JudgeScore: data.ruleForm.JudgeScore,
          AQCount: data.ruleForm.AQCount,
          AQScore: data.ruleForm.AQScore
        }
        PostEditWorkStudyPlanSave(arr).then((res) => {
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
    Name: [
      {
        required: true,
        message: '请填写培训主题',
        trigger: 'blur'
      }
    ],
    Contents: [
      {
        required: true,
        message: '请填写课件说明',
        trigger: 'blur'
      }
    ],
    MinMinutes: [
      {
        required: true,
        message: '请填写学习时长',
        trigger: 'blur'
      }
    ],
    time: [
      {
        required: true,
        message: '请选择开放时间',
        trigger: 'change'
      }
    ],
    CategoryId: [
      {
        required: true,
        message: '请选择培训分类',
        trigger: 'change'
      }
    ],
    CodeType: [
      {
        required: true,
        message: '请选择面向人员',
        trigger: 'change'
      }
    ],
    Class: [
      {
        required: true,
        message: '请选择课件类型',
        trigger: 'change'
      }
    ],
    SingleCount: [{ required: true, message: '请填写', trigger: 'change' }],
    SingleScore: [{ required: true, message: '请填写', trigger: 'change' }],
    MultipleCount: [{ required: true, message: '请填写', trigger: 'change' }],
    MultipleScore: [{ required: true, message: '请填写', trigger: 'change' }],
    JudgeCount: [{ required: true, message: '请填写', trigger: 'change' }],
    JudgeScore: [{ required: true, message: '请填写', trigger: 'change' }],
    AQCount: [{ required: true, message: '请填写', trigger: 'change' }],
    AQScore: [{ required: true, message: '请填写', trigger: 'change' }],
    SuggestTime: [{ required: true, message: '请填写', trigger: 'change' }],
    SuggestMinScore: [{ required: true, message: '请填写', trigger: 'change' }],
    Score: [{ required: true, message: '请填写', trigger: 'change' }],
    ContentType: [{ required: true, message: '请填写', trigger: 'change' }]
  })
  //删除培训人员
  const handleDeleteUser = (userId: number) => {
    data.PlanUserList = data.PlanUserList.filter((x: any) => {
      return x.UserId != userId
    })
  }
  //删除培训课件
  const handleDeleteCourseware = (coursewareId: any) => {
    data.PlanCoursewareList = data.PlanCoursewareList.filter((x: any) => {
      return x.CoursewareId != coursewareId
    })
  }
  // 监听时间筛选
  const timeChange = (val: any) => {
    data.ruleForm.BeginDate = val[0]
    data.ruleForm.EndDate = val[1]
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ImgUrl = val
    data.ruleForm.CoverImg = val[0].Path
  }
  // 监听选中人员
  const selectDetailsEvent = (val: any) => {
    val.forEach((element: any) => {
      element.UserId = element.Id
      element.UserName = element.label
    })
    data.PlanUserList = Object.values(val)
  }
  // 监听课件选中
  const CoursewareDetails = (val: any) => {
    var arr = data.PlanCoursewareList || []
    var i = 1
    val.forEach((item: any) => {
      if (arr.findIndex((x: any) => x.CoursewareId == item.Id) == -1) {
        arr.push({
          CoursewareId: item.Id,
          CoursewareName: item.Name, //课件名称
          CoursewareNo: item.No, //课件编号
          CoursewareMinMinutes: item.MinMinutes, //课件最低学习时间
          CoursewareClass: item.Class, //课件类型
          Note: 0, //是否笔记 0 否 1 是
          Stage: 1, //时间段 1上午 2下午
          TestCount: 0, //刷题次数
          ExamCount: 0, //考试次数
          Sort: i
        })
        i++
      }
    })
    data.PlanCoursewareList = arr
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
    uploadFileDataEvent,
    timeChange,
    selectDetailsEvent,
    handleDeleteUser,
    handleDeleteCourseware,
    CoursewareDetails
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    SelectUser,
    selectCourseware,
    Upload
  },
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    },
    // 是否修改
    isdisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      isEdit: false,
      PlanUserList: [], //培训人员数据
      PlanCoursewareList: [], //培训课件数据
      LearningPlanType: [], //培训类型
      ImgUrl: [], //上传展示数据
      getPaperScore: null, //大考成绩
      ruleForm: {
        Name: '', //培训主题
        time: '', //开放时间
        CategoryId: null, //培训类型
        SingleCount: 20,
        SingleScore: 2,
        MultipleCount: 20,
        MultipleScore: 2,
        JudgeCount: 10,
        JudgeScore: 2,
        AQCount: 0,
        AQScore: 0,
        SuggestTime: 40,
        SuggestMinScore: 90,
        Score: 100,
        ContentType: 0,
        AssessmentTypeArray: ['1', '3', '4']
      },
      Id: props.Id,
      //   选择人员弹窗
      SelectUserWindow: {
        view: false
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      },
      //   选择课件弹窗
      selectCoursewareWindow: {
        view: false
      }
    })
    const getPaperScore = () => {
      var num = data.ruleForm.SingleCount * data.ruleForm.SingleScore + data.ruleForm.MultipleCount * data.ruleForm.MultipleScore + data.ruleForm.JudgeCount * data.ruleForm.JudgeScore + data.ruleForm.AQCount * data.ruleForm.AQScore
      return num
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-850',
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
      ...formEvent(data, closeWindow),
      getPaperScore
    }
  }
})
</script>

<style lang="postcss" scoped>
.DailyPlanForm {
  .m-hr {
    width: 3px;
    height: 16px;
  }
  .input-number {
    width: 112px;
  }
  :deep(.el-table th.el-table__cell) {
    -webkit-user-select: none;
    user-select: none;
    background-color: #e6f2ff;
    height: 39px !important;
  }
  :deep(.el-table .el-table__cell) {
    height: 40px !important;
  }
  :deep(.el-table--fit) {
    z-index: 0;
  }
  .w-i-240 {
    width: 240px;
  }
  .bg-bigTest {
    background-color: #e6f2ff;
  }
  .Courseware {
    :deep(.el-input__wrapper) {
      padding: 1px 0px;
      box-shadow: none;
    }
  }
}
</style>
