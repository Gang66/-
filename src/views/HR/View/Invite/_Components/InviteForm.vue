<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="邀约管理" class="InviteForm">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="40px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10">
        <el-col :md="24" :lg="5">
          <el-form-item label="姓名" prop="InviteName">
            <el-input v-model="data.ruleForm.InviteName" :onkeyup="(data.ruleForm.InviteName = data.ruleForm.InviteName.replace(/[^\u4e00-\u9fa5]/g, ''))" placeholder="请填写姓名" :disabled="data.isEdit" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="5">
          <el-form-item label="性别" prop="Sex">
            <el-select v-model="data.ruleForm.Sex" placeholder="请选择" :disabled="data.isEdit">
              <el-option v-for="item in data.gender" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="7">
          <el-form-item label="岗位" prop="PostName">
            <div v-if="data.isEdit">
              <el-input v-model="data.ruleForm.PostName" placeholder="请选择岗位" :disabled="data.isEdit"> </el-input>
            </div>
            <div @click.stop="openPostEvent" v-else class="bf-remove-input-disabled-bg">
              <el-input v-model="data.ruleForm.PostName" placeholder="请选择岗位" disabled> </el-input>
            </div>
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="7">
          <el-form-item label="渠道" prop="RecruitChannel">
            <el-select v-model="data.ruleForm.RecruitChannel" placeholder="请选择渠道" :disabled="data.isEdit">
              <el-option v-for="item in data.channel" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="8">
          <el-form-item label="手机" prop="PhoneNumber">
            <el-input v-model="data.ruleForm.PhoneNumber" placeholder="请填写手机号" :disabled="data.isEdit" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="9">
          <el-form-item label="有效期限" prop="ShareExpireTime" label-width="70px">
            <el-date-picker v-model="data.ruleForm.ShareExpireTime" type="date" placeholder="请选择" :disabled="data.isHeavy && data.isEdit" @calendar-change="calendarChange" :disabled-date="disabledDate" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="7">
          <el-form-item label="简历" prop="ContractUnitName">
            <el-button type="primary" @click="data.UploadWindow.view = true" v-if="data.PathList.length <= 0">上传简历</el-button>
            <el-button type="success" @click="data.UploadWindow.view = true" v-else>查看简历</el-button>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :md="24" :lg="17">
          <div>
            <div class="bf-font-blue-color mb-2">链接分享</div>
            <el-row :gutter="10">
              <el-col :md="24" :lg="24">
                <el-form-item label="邀约内容" prop="ContractUnitName" label-width="70px">
                  <div class="InviteContent">
                    <div class="flex items-end">
                      <template v-if="data.ruleForm.InviteName">
                        <span class="leading-none">{{ data.ruleForm.InviteName }}{{ data.ruleForm.Sex == 1 ? '先生' : '女士' }}：</span>
                      </template>
                      <template v-else>
                        <div class="ic-name w-14"></div>
                        <div class="leading-none">女士/先生：</div>
                      </template>
                    </div>
                    <div class="leading-5 mt-2 text-sm">您好！北方阀门集团初步认为您符合招聘要求，诚邀您前来面试。 请点击链接了解公司详情并预约面试时间（本链接于{{ parseTimeEvent(data.ruleForm.ShareExpireTime) }}）失效：</div>
                    <div class="overflow-clip text-sm bf-font-blue-color">{{ data.url }}</div>
                    <div @click="copy" class="bf-warning-color cursor-pointer">复制内容（填写人才姓名后复制分享内容）</div>
                  </div>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :md="24" :lg="7">
          <div class="bf-font-blue-color text-center">邀约二维码</div>
          <qrcode :url="data.url" v-if="data.url"></qrcode>
        </el-col>
      </el-row>

      <div class="bf-search-formItem" v-if="data.isHeavy == false || !data.isEdit">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>
  </OpenWindow>
  <!-- 选择部门岗位 -->
  <OrgTreeDrawer ref="OrgTreeDrawerRef" :list="data.list" @transferData="transferData" v-if="data.OrgTreeDrawer.view" @closeWindow="data.OrgTreeDrawer.view = false" />
  <!-- 上传图片 -->
  <Upload @uploadFileData="uploadFileData" title="上传简历" :uploadFileData="data.PathList" :isView="data.isEdit" v-if="data.UploadWindow.view" @closeWindow="data.UploadWindow.view = false"></Upload>
</template>

<script lang="ts">
import qrcode from '/@/components/qrcode/index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import OrgTreeDrawer from '../../../Components/OrgTree/drawer.vue'
import useClipboard from 'vue-clipboard3'
import Upload from '/@/components/Upload/Index.vue'
import { GetHRInviteManagementInfo, GetInviteUid, PostAddEditHRInviteManagementSave } from '/@/api/hr/Invite'
import { GetRecruitPostTree } from '/@/api/system/post'
import { parseTime } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        if (data.PathList.length <= 0) {
          ElMessage({
            message: '请上传简历后提交',
            type: 'warning'
          })
          return
        }
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.ResumePath = JSON.stringify(data.PathList)
        console.log(arr.ResumePath)
        if (data.isHeavy == false) {
          var date1 = new Date(data.ruleForm.ShareExpireTime)
          var date2 = new Date()
          var year = date2.getFullYear() //  返回的是年份
          var month: any = date2.getMonth() + 1 //  返回的月份上个月的月份，记得+1才是当月
          var dates = date2.getDate()
          var date3 = new Date(year + '-' + month + '-' + dates)
          // setHours( 时,分,秒)
          if (date1 < date3) {
            ElMessage.error('邀约有效期限已过期，请及时修改。')
            return
          }
        }
        PostAddEditHRInviteManagementSave(arr).then((res) => {
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
    DepartIds: [{ required: true, message: '请选择事业部门', trigger: 'change' }],
    Sex: [{ required: true, message: '请选择性别', trigger: 'change' }],
    RecruitChannel: [{ required: true, message: '请选择招聘渠道', trigger: 'change' }],
    ShareExpireTime: [{ required: true, message: '请选择有效时间', trigger: 'change' }],
    InviteName: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
    PostName: [{ required: true, message: '请选择岗位', trigger: 'blur' }],
    PhoneNumber: [
      { required: true, message: '请填写手机号', trigger: 'blur' },
      {
        pattern: /^1[3456789]\d{9}$/,
        message: '手机号码格式不正确',
        trigger: 'blur'
      }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  // 监听岗位返回数据
  const transferData = (val: any) => {
    data.ruleForm.PostName = val.Details.label
    data.ruleForm.PostIds = val.Details.Id + ''
    data.ruleForm.DeptIds = JSON.stringify(val.DeptIds)
  }
  // 监听上传返回的数据
  const uploadFileData = (val: any) => {
    data.PathList = val
  }
  // 时间格式转换
  const parseTimeEvent = (val: any, num: number) => {
    return parseTime(val, '{y}年{m}月{d}日')
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef,
    uploadFileData,
    transferData,
    parseTimeEvent
  }
}
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Uid) {
    await GetHRInviteManagementInfo(data.Uid).then((res) => {
      if (res.code == 1) {
        data.ruleForm = res.data
        data.url = `${import.meta.env.VITE_HR_H5}` + '#/?uid=' + res.data.Uid
        data.PathList = JSON.parse(res.data.ResumePath)
        console.log(data.url)
      } else {
        ElMessage.error(res.message)
      }
    })
  } else {
    var date2 = new Date()
    var year = date2.getFullYear() //  返回的是年份
    var month: any = date2.getMonth() + 1 //  返回的月份上个月的月份，记得+1才是当月
    var dates = date2.getDate() + 2
    data.ruleForm.ShareExpireTime = new Date(year + '-' + month + '-' + dates)
    GetInviteUid().then((v) => {
      data.ruleForm.Uid = v.data
      data.url = `${import.meta.env.VITE_HR_H5}` + v.data
      console.log(data.url)
    })
  }
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
  // 获取招聘渠道数据
  store.getDict('hr_channel_status').then((res: any) => {
    data.channel = res
  })
  // 获取岗位树
  GetRecruitPostTree().then((res) => {
    data.list = res.data
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    OrgTreeDrawer,
    Upload,
    qrcode
  },
  emits: ['closeWindow'],
  props: {
    // 用户Uid
    Uid: {
      type: Number,
      default: null
    },
    //是否可以编辑(false 是 true不是)
    isEdit: {
      type: Boolean,
      default: false
    },
    //是否是重发信息(false 是 true不是)
    isHeavy: {
      type: Boolean,
      default: true
    }
  },
  setup(props, context: SetupContext) {
    const { toClipboard } = useClipboard()
    const OrgTreeDrawerRef = ref()
    let orgTreeDrawerOptions = reactive({
      open: false,
      orgType: 'post',
      show: false,
      multi: false
    })
    let data: any = reactive({
      startDate: null, //有效期开始时间
      list: [], //岗位树数据
      ruleForm: {
        Uid: '', //根据Uid查询详情
        InviteName: '', //姓名
        PostIds: '', //岗位Id
        PostName: '', //岗位名称
        Sex: '', //性别
        PhoneNumber: '', //手机号
        RecruitChannel: '', //招聘渠道
        ShareExpireTime: '', //有效时间
        ResumePath: '' //简历
      },
      isEdit: props.isEdit, //是否可以修改
      isHeavy: props.isHeavy, //是否可以修改有效期限
      PathList: [], //上传返回数据
      channel: [], //招聘渠道
      gender: [], //性别数据
      sourceData: [], //组织架构树数据
      // 查看详情Uid
      Uid: props.Uid,
      url: '',
      // 打开岗位弹窗
      OrgTreeDrawer: {
        view: false
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false
      }
    })
    const calendarChange = (dates: any) => {
      let hasSelectDate = dates !== null && dates.length > 0
      data.startDate = hasSelectDate ? dates[0] : null
    }
    // 有效期限只能选择当前时间之后
    const disabledDate = (time: Date) => {
      // 8.64e7就是一天的时间戳 24*60*60*1000
      // 根据选择的开始日期，日期范围限定在30天之内
      return (
        time.getTime() < new Date().getTime() - 8.64e7 || time.getTime() >= new Date().getTime() + 2 * 8.64e7
        // time.getTime() >= new Date().getTime() ||
        // time.getTime() > data.startDate.getTime() + 10 * 8.64e7
      )
      // 默认只能选择今天以及今天之前的日期
      // return time.getTime() >= new Date().getTime()
    }
    // 复制路径
    const copy = async () => {
      if (!data.Uid) {
        ElMessage.error('未保存数据，无法复制链接')
        return
      }
      try {
        await toClipboard(data.ruleForm.InviteName + (data.ruleForm.Sex == '1' ? '先生' : '女士') + '您好！北方阀门集团初步认为您符合招聘要求，诚邀您前来面试。 请点击链接了解公司详情并预约面试时间：' + data.url)
        ElMessage({
          message: '复制成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
      }
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 打开岗位弹窗
    const openPostEvent = () => {
      data.OrgTreeDrawer.view = true
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
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
      disabledDate,
      orgTreeDrawerOptions,
      openPostEvent,
      OrgTreeDrawerRef,
      copy,
      calendarChange
    }
  }
})
</script>

<style lang="postcss" scoped>
.buttonHeight {
  height: 28px;
}
.InviteContent {
  border: 1px solid var(--el-border-color);
  padding: 16px;
  width: 375px;
  min-height: 142px;
  .ic-name {
    border-bottom: 1px solid var(--el-border-color);
  }
}
.InviteForm {
  :deep(.el-input.is-disabled) {
    cursor: pointer;
  }
  :deep(.el-input.is-disabled .el-input__inner) {
    color: var(--el-input-text-color, var(--el-text-color-regular));
    cursor: pointer;
  }
}
</style>
