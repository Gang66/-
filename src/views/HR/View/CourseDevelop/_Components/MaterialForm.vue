<template>
  <div class="MaterialForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="上传素材">
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
                  <el-switch v-model="data.ruleForm.IsNewest" :active-value="1" :inactive-value="0" :disabled="data.isdisabled" />
                </div>
              </div>
            </div>
            <div class="mt-2">
              <el-form-item label="课件名称" prop="Name">
                <el-input v-model="data.ruleForm.Name" placeholder="请输入" :disabled="data.isdisabled" />
              </el-form-item>
              <div class="flex">
                <!-- <el-form-item label="课件名称" prop="Name">
                  <el-input v-model="data.ruleForm.Name" placeholder="请输入" :disabled="data.isdisabled" class="input-number" />
                </el-form-item> -->
                <el-form-item label="培训需求" prop="TrainingNeeds">
                  <el-select v-model="data.ruleForm.TrainingNeeds" placeholder="请选择" :disabled="data.isdisabled" class="input-number">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.TrainingNeeds" />
                  </el-select>
                </el-form-item>
                <el-form-item label="课程等级" prop="Level">
                  <el-select v-model="data.ruleForm.Level" placeholder="请选择" :disabled="data.isdisabled" style="width:200px;">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareLevel" />
                  </el-select>
                </el-form-item>
                <el-form-item label="课件类型" prop="Class" class="flex-grow">
                  <el-select v-model="data.ruleForm.Class" placeholder="请选择" :disabled="data.isdisabled" class="w-full">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareClass" />
                  </el-select>
                </el-form-item>
              </div>
              <div class="flex w-full">
                <el-form-item label="学习时长" prop="Remark">
                  <el-input type="Number" v-model="data.ruleForm.MinMinutes" :min="1" :disabled="data.isdisabled" class="input-number"></el-input>
                </el-form-item>
                <!-- style="width: 220px" -->
                <el-form-item label="面向人员" prop="CodeType">

                  <el-select v-model="data.ruleForm.CodeType" multiple collapse-tags collapse-tags-tooltip placeholder="请选择" :disabled="data.isdisabled" style="width:200px;">
                    <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.CoursewareCodeType" />
                  </el-select>
                </el-form-item>
                <el-form-item label="课件说明" prop="Contents" class="flex-grow">
                  <el-input v-model="data.ruleForm.Contents" placeholder="请输入" :disabled="data.isdisabled" />
                </el-form-item>
              </div>
            </div>
          </div>
          <div class="mt-4">
            <uploadfile :isdisabled="data.isdisabled" :uploadFileList="data.ruleForm.FileList" @uploadFileData="uploadFileData">
              <template #leftContent>
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <div class="m-hr bf-bg-blue-color"></div>
                    <div class="leading-none ml-2 font-semibold">课件内容</div>
                  </div>
                </div>
              </template>
              <template #rightContent>
                <div v-if="!data.isdisabled">
                  <el-button type="success" @click="openUpload" v-if="data.ImgUrl.length > 0" class="mr-3">查看素材封面</el-button>
                  <el-button type="primary" @click="openUpload" v-else class="mr-3">上传素材封面</el-button>
                </div>
              </template>
            </uploadfile>
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
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, getCurrentInstance, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import Upload from '/@/components/Upload/Index.vue'
import { GetAllSysPostList, GetApplyWorkCourseMaterialEntity, GetWorkCourseMaterialEntity, PostEditWorkCourseMaterialSave } from '/@/api/hr/CourseDevelop'
import { parseTime } from '/@/utils/tools'
import { PostApprovalWorkCourseMaterialSave } from '/@/api/wf/hr/Approval'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    if (data.viewType == 4 || data.viewType == 5) {
      GetApplyWorkCourseMaterialEntity(data.Id).then((res: any) => {
        if (res.code == 1) {
          res.data.CodeType = eval('(' + res.data.CodeType + ')')
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
    } else {
      GetWorkCourseMaterialEntity(data.Id).then((res: any) => {
        if (res.code == 1) {
          console.log(res.data.CodeType)
          res.data.CodeType = eval('(' + res.data.CodeType + ')')
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
  }
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
  // GetAllSysPostList().then((res: any) => {
  //   if (res.code == 1) {
  //     data.CoursewareCodeType = res.data
  //   }
  // })
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
        arr.CodeType = JSON.stringify(arr.CodeType)
        PostEditWorkCourseMaterialSave(arr).then((res) => {
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
        PostApprovalWorkCourseMaterialSave(arr).then((res: any) => {
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
        message: '请填写课件名称',
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
    TrainingNeeds: [
      {
        required: true,
        message: '请选择培训需求',
        trigger: 'change'
      }
    ],
    Level: [
      {
        required: true,
        message: '请选择培训等级',
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
    remark: [
      {
        required: true,
        message: '请填写审批意见',
        trigger: 'blur'
      }
    ]
  })
  // 打开上传照片
  const openUpload = () => {
    data.UploadWindow.view = true
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ImgUrl = val
    data.ruleForm.CoverImg = val[0].Path
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
    ApprovalForm
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    Upload,
    uploadfile
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
    const options = [
      {
        value: 107,
        label: 'Option1'
      },
      {
        value: 156,
        label: 'Option2'
      },
      {
        value: 157,
        label: 'Option3'
      },
      {
        value: 4,
        label: 'Option4'
      },
      {
        value: 5,
        label: 'Option5'
      }
    ]
    const num = ref(null)
    let data = reactive({
      viewType: props.info.viewType,
      Approval: {
        checkId: props.info.checkId,
        remark: ''
      },
      state: 0, //审批状态
      isdisabled: false, //是否禁用上传课件
      TrainingNeeds: [], //培训需求
      CoursewareCodeType: [], //面向人员
      CoursewareLevel: [], //课件等级
      CoursewareClass: [], //课件分类
      ImgUrl: [], //上传展示数据
      ruleForm: {
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
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      },
      Id: props.info.Id
    })
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
      num,
      tableData,
      options
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
}
</style>
