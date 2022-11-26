<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="0px" class="bf-window-padding" hide-required-asterisk>
      <div class="flex">
        <el-form-item label="类型" label-width="40" class="ml-7" prop="typeMold">
          <el-select v-model="data.ruleForm.typeMold" placeholder="请选择类型" style="width: 210px">
            <el-option v-for="item in data.classification" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
          </el-select>
        </el-form-item>
        <el-form-item label="启动日期" label-width="40" prop="StartDate" class="ml-6">
          <el-date-picker v-model="data.ruleForm.StartDate" type="date" placeholder="请选择日期" style="width: 210px" />
        </el-form-item>
      </div>
      <el-form-item label="人员" label-width="40" class="ml-7" v-if="data.ruleForm.typeMold == 1">
        <el-select multiple v-model="data.ruleForm.CreateBy" placeholder="请选择" style="width: 800px">
          <el-option v-for="(item, index) in data.CreateBy" :key="index" :label="item.RealName" :value="item.UserId" />
        </el-select>
      </el-form-item>
      <el-form-item label="部门" label-width="40" class="ml-7" v-else-if="data.ruleForm.typeMold == 2">
        <!-- department -->
        <el-select multiple v-model="data.ruleForm.CreateBy" placeholder="请选择" style="width: 800px">
          <el-option v-for="(item, index) in data.deptList" :key="index" :label="item.Name" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="事业部" label-width="40" class="ml-4" v-else>
        <!-- division -->
        <el-select multiple v-model="data.ruleForm.CreateBy" placeholder="请选择" style="width: 800px">
          <el-option v-for="(item, index) in data.divisionList" :key="index" :label="item.Name" :value="item.Id" />
        </el-select>
      </el-form-item>
      <el-form-item label="备注" label-width="80" class="ml-7" prop="remarksInput">
        <el-input v-model="data.ruleForm.remarksInput" style="min-width: 210px" placeholder="请填写" />
      </el-form-item>
    </el-form>
    <div class="text-center mb-6">
      <el-button class="w-20" @click="closeWindow('close')">取 消</el-button>
      <el-button class="w-20" type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { WorkAssesSettingsCCSave } from '/@/api/system/SalesSettings'
import { GetAllUserList } from '/@/api/layout/index'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
import { GetTypeDepartList } from '/@/api/system/dept'
import { parseTime } from '/@/utils/tools'

//获取字典数据
const getDictionaryData = (data: any) => {
  //获取销售设置目标周期
  store.getDict('salestetting_trage_cycle').then((res: any) => {
    data.TargetOptions = res
    console.log(res)
  })
  //获取考核类型
  store.getDict('hr_asses_type').then((res: any) => {
    data.classification = res
  })
}

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      type: 0, // 1 编辑
      ruleForm: {
        StartDate: '',
        typeMold: '1',
        remarksInput: '',
        CreateBy: '',
        department: '',
        division: ''
      },
      CreateBy: [],
      UserId: 0,
      TargetOptions: [], //目标周期
      classification: [], //类型
      deptList: [], //部门列表
      divisionList: [] //事业部列表
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: ''
    })
    // 获取销售设置目标周期
    const getCriteria = (val: number) => {
      let _obj = data.TargetOptions.find((x: any) => x.DicKey == val.toFixed(0))
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    // 获取考核分类
    const getClass = (val: number) => {
      let _obj = data.classification.find((x: any) => x.DicKey == val)
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    // 表单事件
    const formEvent = (data: any, closeWindow: any) => {
      const ruleFormRef = ref<FormInstance>()
      // 表单提交
      const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
          if (valid) {
            var time = parseTimeEvent(data.ruleForm.StartDate)
            const datas = {
              Id: props.FormData.Id,
              StartDate: time,
              AssesDataIds: data.ruleForm.CreateBy,
              Remarks: data.ruleForm.remarksInput,
              AssesType: data.ruleForm.typeMold
            }
            // {
            //     UserId: data.ruleForm.CreateBy,
            //     DeptIdId: data.ruleForm.department,
            //     CompId: data.ruleForm.division
            //   },
            console.log(datas)
            //编辑业绩设置
            WorkAssesSettingsCCSave(datas).then((res) => {
              if (res.code == 1) {
                console.log(res)
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
      // 校验
      const rules = reactive<FormRules>({
        StartDate: [{ required: true, message: '请选择启动日期', trigger: 'blur' }],
        typeMold: [{ required: true, message: '请选择类型', trigger: 'blur' }],
        remarksInput: [{ required: true, message: '请填写备注', trigger: 'blur' }]
      })
      // 表单重置
      const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
      }
      return { rules, submitForm, resetForm, ruleFormRef }
    }
    // 获取所有公司人员
    const findAllUserList = async () => {
      const res = await GetAllUserList()
      data.UserId = res.data
      data.CreateBy = res.data
    }
    // 获取部门列表
    const getTypeList = () => {
      //1、事业部 2、部门 3、大区
      GetTypeDepartList(2).then((res) => {
        if (res.code == 1) {
          console.log(res)
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.divisionList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
    }

    findAllUserList()
    onMounted(() => {
      console.log(props.FormData)
      getDictionaryData(data)
      getTypeList()
    })
    return {
      boxStyle,
      closeWindow,
      data,
      ...formEvent(data, closeWindow),
      getCriteria,
      getClass
    }
  }
})
</script>
<style lang="postcss" scoped></style>
