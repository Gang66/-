<template>
  <div class="MaterialForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="试题导入">
      <div class="bf-window-padding bf-remove-input-disabled-bg">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div>
            <div class="flex justify-between">
              <div class="flex items-center">
                <div class="m-hr bf-bg-blue-color"></div>
                <div class="leading-none ml-2 font-semibold">基础信息</div>
              </div>
              <div class="flex items-center">
                <div class="text-sm bf-text-color-regular">新人训课程</div>
                <div class="ml-2">
                  <el-switch v-model="data.details.IsNewest" :active-value="1" :inactive-value="0" :disabled="true" />
                </div>
              </div>
            </div>
            <div class="mt-2">
              <div class="flex">
                <el-form-item label="课件名称" prop="Name">
                  <el-input v-model="data.details.Name" placeholder="请输入" :disabled="true" />
                </el-form-item>
                <el-form-item label="培训需求" prop="TrainingNeeds">
                  <el-select v-model="data.details.TrainingNeeds" class="screen-width" placeholder="请选择" :disabled="true">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.TrainingNeeds" />
                  </el-select>
                </el-form-item>
                <el-form-item label="课程等级" prop="Level">
                  <el-select v-model="data.details.Level" class="screen-width" placeholder="请选择" :disabled="true">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareLevel" />
                  </el-select>
                </el-form-item>
                <el-form-item label="课件类型" prop="Class">
                  <el-select v-model="data.details.Class" class="screen-width" placeholder="请选择" :disabled="true">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareClass" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex w-full">
                <el-form-item label="学习时长" prop="Remark">
                  <el-input-number v-model="data.details.MinMinutes" :min="1" class="input-number" :disabled="true" />
                </el-form-item>
                <el-form-item label="面向人员" prop="CodeType">
                  <el-select v-model="data.details.CodeType" multiple collapse-tags collapse-tags-tooltip placeholder="请选择" :disabled="data.isdisabled" style="width: 220px">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareCodeType" />
                  </el-select>
                </el-form-item>
                <!-- <el-form-item label="面向人员" prop="CodeType">
                  <el-select v-model.trim="data.details.CodeType" multiple collapse-tags collapse-tags-tooltip class="screen-width" placeholder="请选择" :disabled="true" style="width: 128px">
                    <el-option :label="item['PostName']" :value="item['Id']" v-for="item in data.CoursewareCodeType" />
                  </el-select>
                </el-form-item> -->
                <el-form-item label="课件说明" prop="Contents" class="flex-grow">
                  <el-input v-model="data.details.Contents" placeholder="请输入" :disabled="true" />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between items-center">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="m-hr bf-bg-blue-color"></div>
                  <div class="leading-none ml-2 font-semibold">试题说明</div>
                </div>
              </div>
              <!-- <el-button type="primary" @click="data.QuestionBankErrorWindow.view=true">异常</el-button> -->
              <el-upload ref="importExcel" action :show-file-list="false" :accept="'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'"
                :http-request="handleImportExcelTrainTestUpload" :before-upload="importExcelTrainTestBeforeAvatarUpload">
                <div>
                  <el-button type="primary">导入试题</el-button>
                  <el-button @click="handleDownloadTemplate">下载模板</el-button>
                </div>
              </el-upload>
            </div>
            <div class="flex mt-3">
              <el-form-item label="版本号" prop="Version">
                <el-input v-model="data.ruleForm.Version" placeholder="请输入" />
              </el-form-item>
              <el-form-item label="面向人员" prop="CodeType">
                <el-select v-model="data.ruleForm.CodeType" style="width: 220px" placeholder="请选择">
                  <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareCodeType" />
                </el-select>
              </el-form-item>
              <el-form-item label="课件类型" prop="Class" class="flex-grow">
                <el-select v-model="data.ruleForm.Class" class="screen-width flex-grow" placeholder="请选择">
                  <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareClass" />
                </el-select>
              </el-form-item>
            </div>
            <div class="view-table">
              <el-table :data="data.list" highlight-current-row style="width: 100%; border: 1px solid #d8dadb" max-height="300"
                :header-cell-style="{ background: '#E6F2FF', height: '36px', color: '#333' }" :cell-style="{ color: '#333', height: '36px' }">
                <el-table-column align="center" type="index" label="序号" width="60"></el-table-column>
                <el-table-column align="center" label="题干" min-width="110" show-overflow-tooltip>
                  <template #default="scope">
                    <span>{{ scope.row.Title }}</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="题型" width="80">
                  <template #default="scope">
                    <div v-for="(item, index) in data.questionTypeList" :key="index">
                      <template v-if="item.DicKey == scope.row.QuestionType">
                        {{ item.DicValue }}
                      </template>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="难度" width="80">
                  <template #default="scope">
                    <div v-for="(item, index) in data.TextQuestionsTypeList" :key="index">
                      <template v-if="item.DicKey == scope.row.Difficult">
                        {{ item.DicValue }}
                      </template>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="审批状态" width="80">
                  <template #default="scope">
                    <span v-if="scope.row.State == -2" style="color: red">驳回</span>
                    <span v-else-if="scope.row.State == -1" style="color: red">不通过</span>
                    <span v-else-if="scope.row.State < 100 && scope.row.State > 0" style="color: #00b854">审批中</span>
                    <span v-else-if="scope.row.State == 100">通过</span>
                    <span v-else>-</span>
                  </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="85">
                  <template #default="scope">
                    <el-button type="text" style="color: red" @click="handleDelTest(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="py-2 text-xs text-red-700">注意：导入试题时，请确保表格每个工作簿第二行第一列要有数据(哪怕是空格)</div>
            </div>
          </div>
          <div class="bf-search-formItem mt-4" v-if="!data.isdisabled">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
          <template v-if="data.viewType != 1 && data.viewType != 2">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 审批 -->
            <template v-if="data.viewType == 4">
              <el-form-item label="" :prop="data.state == 0 ? 'remark' : ''" label-width="0">
                <el-input v-model="data.ruleForm.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
              </el-form-item>
              <div class="bf-search-formItem">
                <div class="text-center w-full mt-4">
                  <el-button type="danger" @click="ApprovalForm(ruleFormRef, 0)">驳 回</el-button>
                  <el-button type="primary" @click="ApprovalForm(ruleFormRef, 1)">审 批</el-button>
                </div>
              </div>
            </template>
          </template>
        </el-form>
      </div>
    </OpenWindow>
    <!-- 上传图片 -->
    <Upload :uploadFileData="data.ImgUrl" @uploadFileData="uploadFileDataEvent" v-if="data.UploadWindow.view" @closeWindow="data.UploadWindow.view = false" title="上传证明材料">
    </Upload>
    <QuestionBankError :testErrorData="data.testErrorData" v-if="data.QuestionBankErrorWindow.view" @closeWindow="data.QuestionBankErrorWindow.view = false"></QuestionBankError>
  </div>
</template>

<script lang="ts">
import { preview } from 'vue3-preview-image'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import Upload from '/@/components/Upload/Index.vue'
import QuestionBankError from './QuestionBankError.vue'
import { GetAllSysPostList, GetWorkCourseFinishedEntity, PostEditWorkCourseQuestionBankSave, PostImportExcelTrainTest, GetWorkCourseQuestionBankEntity, GetAdoptWorkCourseQuestionBankEntityInfo } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { PostApprovalTestImportFile } from '/@/api/wf/hr/Approval'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    if (data.viewType == 4 || data.viewType == 5) {
      GetWorkCourseQuestionBankEntity(data.Id).then((res: any) => {
        if (res.code == 1) {
          res.data.TrainCourseWareInfo.CodeType = JSON.parse(res.data.TrainCourseWareInfo.CodeType)
          res.data.TestLibraryList.forEach((element: any) => {
            element.name = element.FileName
            element.size = element.FileSize
            element.url = element.SavePath
            element.status = 'success'
          })
          data.ruleForm = res.data.TestImportFileInfo
          data.list = res.data.TestLibraryList
          data.details = res.data.TrainCourseWareInfo
        } else {
          ElMessage.error(res.message)
        }
      })
    } else {
      GetWorkCourseFinishedEntity(data.Id).then((res: any) => {
        if (res.code == 1) {
          res.data.CodeType = JSON.parse(res.data.CodeType)
          res.data.FileList.forEach((element: any) => {
            element.name = element.FileName
            element.size = element.FileSize
            element.url = element.SavePath
            element.status = 'success'
          })
          data.details = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }
  }
  // 获取试题类型
  store.getDict('hr_question_type').then((res: any) => {
    data.questionTypeList = res
  })
  // 获取试题难度
  store.getDict('hr_TextQuestions_difficulty').then((res: any) => {
    data.TextQuestionsTypeList = res
  })
  // 获取请假表详情
  var arr: any = { Id: 0, date: parseTime(new Date()) }
  if (data.Id) arr.Id = data.Id
  // 获取培训需求
  store.getDict('TrainingNeeds').then((res: any) => {
    data.TrainingNeeds = res
  })
  // 获取课件等级
  store.getDict('CoursewareLevel').then((res: any) => {
    data.CoursewareLevel = res
  })
  // 获取课件分类
  store.getDict('CoursewareClass').then((res: any) => {
    data.CoursewareClass = res
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
        var arr: any = { TestLibraryList: [], TestImportFileInfo: {} }
        arr.TestLibraryList = data.list
        arr.TestImportFileInfo = data.ruleForm
        arr.TestImportFileInfo.CoursewareId = data.details.Id
        arr.IsApply = true
        PostEditWorkCourseQuestionBankSave(arr).then((res) => {
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
  // 审批
  const ApprovalForm = async (formEl: FormInstance | undefined, num: number) => {
    data.state = num
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        var arr = {
          checkId: data.Approval.checkId,
          state: num,
          remark: data.ruleForm.remark,
          dataid: data.Id
        }
        PostApprovalTestImportFile(arr).then((res: any) => {
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
    remark: [
      {
        required: true,
        message: '请填写审批意见',
        trigger: 'blur'
      }
    ]
  })
  //下载模板
  const handleDownloadTemplate = () => {
    window.open(remoteUrl('/Template/Shop/问卷导入题目模板.xlsx'))
  }
  //导入问题
  const handleImportExcelTrainTestUpload = (file: any) => {
    let FormDatas = new FormData()
    FormDatas.append('files', file.file)
    // FormDatas.append('dirName', 'ImportExcel')
    PostImportExcelTrainTest(FormDatas).then((response: any) => {
      if (response.code == 1) {
        var list = response.data.records
        var errorList = response.data.errorList
        var repeatTestList = response.data.repeatTestList
        data.list = list
        if ((errorList && errorList.length > 0) || (repeatTestList && repeatTestList.length)) {
          handleOpenDialogViewTestError({ errorList, repeatTestList })
        } else {
          ElMessage({
            showClose: true,
            message: '导入成功',
            type: 'success'
          })
        }
      } else {
        ElMessage({
          showClose: true,
          message: response.message,
          type: 'error'
        })
      }
    })
  }
  //验证Excel
  const importExcelTrainTestBeforeAvatarUpload = (file: any) => {
    const Xls = file.name.split('.')
    const isLt2M = file.size / 1024 / 1024 < 10
    if (Xls[1] === 'xls' || Xls[1] === 'xlsx') {
      return file
    } else {
      ElMessage({
        message: '上传文件只能是 xls/xlsx 格式',
        type: 'warning'
      })
      return false
    }
    if (!isLt2M) {
      ElMessage({
        message: '上传模板大小不能超过 10MB',
        type: 'warning'
      })
      return false
    }
  }
  //打开查看异常试题窗口
  const handleOpenDialogViewTestError = (obj: any) => {
    data.QuestionBankErrorWindow.view = true
    data.testErrorData = [...obj.errorList, ...obj.repeatTestList]
    // this.testErrorData = obj;
    // this.isVisibleViewTestError = true;
  }
  // 打开上传照片
  const openUpload = () => {
    data.UploadWindow.view = true
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ImgUrl = val
    data.ruleForm.CoverImg = val[0].Path
  }
  // 路径转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听上传返回的数据
  const uploadFileData = (val: any) => {
    val.forEach((element: any) => {
      element.SavePath = element.url
      element.FileSize = element.size
      element.FileName = element.name
    })
    data.ruleForm.FileList = val
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    uploadFileData,
    uploadFileDataEvent,
    openUpload,
    remoteUrlEvent,
    handleImportExcelTrainTestUpload,
    importExcelTrainTestBeforeAvatarUpload,
    handleDownloadTemplate,
    handleOpenDialogViewTestError,
    ApprovalForm
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    Upload,
    uploadfile,
    QuestionBankError
  },
  emits: ['closeWindow'],
  props: {
    // 传递参数
    info: {
      type: Object,
      default: {
        checkId: null,
        Id: null,
        viewType: 3
      }
    }
  },
  setup(props, context: SetupContext) {
    const tableData: any = []
    let data = reactive({
      state: 0, //审批状态
      viewType: props.info.viewType,
      Approval: {
        checkId: props.info.checkId,
        remark: ''
      },
      list: [], //试题说明列表
      isdisabled: false, //是否禁用上传课件
      TrainingNeeds: [], //培训需求
      CoursewareCodeType: [], //面向人员
      CoursewareLevel: [], //课件等级
      CoursewareClass: [], //课件分类
      ImgUrl: [], //上传展示数据
      testErrorData: [], //异常列表数据
      questionTypeList: [], //试题类型
      TextQuestionsTypeList: [], //试题难度
      details: {
        IsNewest: 0, //是否新人训
        Name: '', //课件名称
        TrainingNeeds: '', //培训需求
        Level: '', //培训等级
        Class: null, //课件类型
        CodeType: [], //面向人员
        Contents: '', //课件说明
        MinMinutes: 1, //学习时长
        FileList: [] //文件列表
      },
      ruleForm: {
        Version: '', //版本号
        CodeType: '', //面试人员
        Class: '' //课件类型
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      },
      // 打开异常试题弹窗
      QuestionBankErrorWindow: {
        view: false,
        isShow: false
      },
      Id: props.info.Id
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    //删除试题
    const handleDelTest = (row: any) => {
      ElMessageBox.confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          data.list = data.list.filter((x) => {
            return x != row
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-850',
      boxHeight: ''
    })
    onMounted(() => {
      if (props.info.viewType == 3 || props.info.viewType == 4 || props.info.viewType == 5) {
        data.isdisabled = true
      }
      // 获取面向人员
      store.getDict('CoursewareCodeType').then((res: any) => {
        data.CoursewareCodeType = res
      })
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      tableData,
      handleDelTest
    }
  }
})
</script>

<style lang="postcss" scoped>
.MaterialForm {
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
  .view-table {
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 3px;
    :deep(.el-table) {
      tr {
        &:nth-child(2n) {
          td {
            background-color: #fbf2d5;
          }
        }
        th {
          &.table-header-cell {
            padding: 8px 0;
            color: #333;
          }
        }
        td {
          border-color: #d6dee6;
          background-color: #f8f8fc;
          &.table-cell {
            padding: 8px 0;
            color: #333;
            .el-button {
              padding: 0;
            }
          }
        }
      }
    }
  }
}
</style>
