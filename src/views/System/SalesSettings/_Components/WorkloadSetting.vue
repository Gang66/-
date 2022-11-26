<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="pl-3 pr-3 hr_salesSettings_workloadSetting">
      <!-- #region 编辑 -->
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="0px" hide-required-asterisk>
        <div class="flex pt-2" v-if="data.type == 1">
          <el-form-item label="类型" label-width="80">
            <el-select v-model="data.ruleForm.Type" class="m-2" placeholder="请选择" @change="changeTpeClick">
              <el-option v-for="item in data.TypeOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
          <el-form-item label="备注" label-width="80" class="ml-11" prop="remarksInput">
            <el-input v-model="data.ruleForm.remarksInput" style="min-width: 210px" placeholder="请填写" />
          </el-form-item>
        </div>
        <!-- #endregion -->

        <!-- #region  详情-->
        <!-- <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="0px" hide-required-asterisk > -->
        <div class="flex pt-2" v-else>
          <el-form-item label="类型" label-width="80" v-if="data.TemplateType == 0">
            <el-select v-model="data.ruleForm.Type" class="m-2" placeholder="请选择" disabled>
              <el-option v-for="item in data.TypeOpt" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
          <el-form-item label="类型" label-width="80" v-else>
            <el-select v-model="data.TemplateType" class="m-2" placeholder="请选择" disabled>
              <el-option v-for="item in data.TypeOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
            </el-select>
          </el-form-item>
          <!-- 人员 data.ruleForm.Type==1 -->
          <!-- 部门 data.ruleForm.Type==2 -->
          <!-- 事业部 data.ruleForm.Type==1 -->
          <el-form-item label="人员" label-width="80" v-if="data.ruleForm.Type == 1">
            <el-select v-model="data.ruleForm.CreateBy" placeholder="请选择" disabled>
              <el-option v-for="(item, index) in data.CreateBy" :key="index" :label="item.RealName" :value="item.UserId" />
            </el-select>
          </el-form-item>
          <el-form-item label="部门" label-width="80" v-else-if="data.ruleForm.Type == 2">
            <el-input v-model="data.ruleForm.CreateBy" placeholder="请填写" disabled />
          </el-form-item>
          <el-form-item label="事业部" label-width="80" class="ml-11" v-else>
            <el-input v-model="data.ruleForm.CreateBy" placeholder="请填写" disabled />
          </el-form-item>
          <el-form-item label="启动日期" label-width="80" class="ml-11" prop="StartDate">
            <el-date-picker v-model="data.ruleForm.StartDate" type="date" placeholder="请选择日期" />
          </el-form-item>
          <el-form-item label="备注" label-width="80" class="ml-11" prop="remarksInput">
            <el-input v-model="data.ruleForm.remarksInput" placeholder="请填写" />
          </el-form-item>
        </div>
        <!-- </el-form> -->
        <!-- #endregion -->

        <!-- #region 集团工作量 -->
        <div class="tableclass bf-table-content" v-if="data.ruleForm.Type == 1">
          <div class="flex justify-end mb-2">
            <el-button type="primary" @click="AddList"> <i class="iconfont icon-chuangjian mr-2"></i> 添加</el-button>
          </div>
          <!-- @select="selectRow" @selection-change="handleSelectionChange" -->
          <el-table :data="data.WorkloadSettingList" class="w-full" border ref="multipleTableRef">
            <el-table-column type="selection" width="50" align="center" />
            <el-table-column type="index" label="序号" width="54" align="center" />
            <el-table-column prop="Name" label="考核分类" align="center" min-width="140">
              <template #default="scope">
                <div class="tab_select">
                  <el-select v-model="scope.row.ClassifyTable" placeholder="请输入">
                    <el-option v-for="item in data.classOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="考核类型" align="center">
              <template #default="scope">
                <el-select v-model="scope.row.AssesType" placeholder="请输入">
                  <el-option v-for="item in data.assTypeOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="考核标准" align="center">
              <template #default="scope">
                <div class="tab_select">
                  <el-select v-model="scope.row.AssesMark" placeholder="请输入">
                    <el-option v-for="item in data.criteria" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="数量" align="center">
              <template #default="scope">
                <el-input v-model="scope.row.AmountMin" placeholder="请输入" type="number" />
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="是否关停" align="center" width="80">
              <template #default="scope">
                <div class="tab_select">
                  <el-select v-model="scope.row.IsStop" placeholder="请输入">
                    <el-option v-for="item in data.shutDownOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="Name" label="操作" align="center">
              <template #default="scope">
                <div class="text-blue-500 cursor-pointer" @click="deldeList(scope.$index)">
                  <span class="ml-2 text-red-500">删除</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <!-- #endregion -->
        <!-- #region 新人工作量 -->
        <div v-else>
          <tabs :tabList="data.tabList" @handleClick="selectEvent" v-if="data.TemplateType == 2">
            <!-- <template #button>
             
            </template> -->
          </tabs>
          <div class="flex justify-end">
            <el-button type="primary" @click="AddList" v-if="data.tabIndex == 0"> <i class="iconfont icon-chuangjian mr-2"></i> 添加</el-button>
            <el-button type="primary" @click="AddList2" v-else-if="data.tabIndex == 1"> <i class="iconfont icon-chuangjian mr-2"></i> 添加</el-button>
            <el-button type="primary" @click="AddList3" v-else> <i class="iconfont icon-chuangjian mr-2"></i> 添加</el-button>
          </div>
          <!-- <div class="flex">
          <div class="cursor-pointer mr-8" :class="data.tabIndex == index ? 'bf-title-color font-semibold' : 'bf-no-color'" v-for="(item, index) in data.tabList" :key="index" @click="selectEvent(index)">
            {{ item.name }}
          </div>
        </div> -->
          <!-- region 第一个月-->
          <div class="tableclass bf-table-content" v-if="data.tabIndex == 0">
            <!-- @select="selectRow" @selection-change="handleSelectionChange" -->
            <el-table :data="data.WorkloadSettingList" class="w-full" ref="multipleTableRef">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="Name" label="考核分类" align="center" min-width="140">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.ClassifyTable" class="m-2" placeholder="请输入">
                      <el-option v-for="item in data.classOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="考核类型" align="center">
                <template #default="scope">
                  <el-select v-model="scope.row.AssesType" class="m-2" placeholder="请输入">
                    <el-option v-for="item in data.assTypeOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="考核标准" align="center">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.AssesMark" class="m-2" placeholder="请输入">
                      <el-option v-for="item in data.criteria" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="数量" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.AmountMin" placeholder="请输入" type="number" />
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="是否关停" align="center" width="80">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.IsStop" placeholder="请输入">
                      <el-option v-for="item in data.shutDownOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="操作" align="center">
                <template #default="scope">
                  <div class="text-blue-500 cursor-pointer" @click="deldeList(scope.$index)">
                    <span class="ml-2">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- endregion -->
          <!-- region 第二个月-->
          <div class="tableclass bf-table-content" v-else-if="data.tabIndex == 1">
            <!-- @select="selectRow" @selection-change="handleSelectionChange" -->
            <el-table :data="data.WorkloadSettingList" class="w-full" ref="multipleTableRef">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="Name" label="考核分类" align="center" min-width="140">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.ClassifyTable" class="m-2" placeholder="请输入">
                      <el-option v-for="item in data.classOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="考核类型" align="center">
                <template #default="scope">
                  <el-select v-model="scope.row.AssesType" class="m-2" placeholder="请输入">
                    <el-option v-for="item in data.assTypeOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="考核标准" align="center">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.AssesMark" class="m-2" placeholder="请输入">
                      <el-option v-for="item in data.criteria" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="数量" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.AmountMin" placeholder="请输入" type="number" />
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="是否关停" align="center" width="80">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.IsStop" placeholder="请输入">
                      <el-option v-for="item in data.shutDownOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="操作" align="center">
                <template #default="scope">
                  <div class="text-blue-500 cursor-pointer" @click="deldeList(scope.$index)">
                    <span class="ml-2">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- endregion -->
          <!-- #region 第三个月 -->
          <div class="tableclass bf-table-content" v-else>
            <!-- @select="selectRow" @selection-change="handleSelectionChange" -->
            <el-table :data="data.WorkloadSettingList" class="w-full" ref="multipleTableRef">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="Name" label="考核分类" align="center" min-width="140">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.ClassifyTable" class="m-2" placeholder="请输入">
                      <el-option v-for="item in data.classOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="考核类型" align="center">
                <template #default="scope">
                  <el-select v-model="scope.row.AssesType" class="m-2" placeholder="请输入">
                    <el-option v-for="item in data.assTypeOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="考核标准" align="center">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.AssesMark" class="m-2" placeholder="请输入">
                      <el-option v-for="item in data.criteria" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="数量" align="center">
                <template #default="scope">
                  <el-input v-model="scope.row.AmountMin" placeholder="请输入" type="number" />
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="是否关停" align="center" width="80">
                <template #default="scope">
                  <div class="tab_select">
                    <el-select v-model="scope.row.IsStop" placeholder="请输入">
                      <el-option v-for="item in data.shutDownOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="Name" label="操作" align="center">
                <template #default="scope">
                  <div class="text-blue-500 cursor-pointer" @click="deldeList(scope.$index)">
                    <span class="ml-2">删除</span>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <!-- #endregion -->
        </div>

        <!-- #endregion -->

        <div class="text-center mb-6 mt-6">
          <el-button class="w-20" @click="closeWindow('close')">取 消</el-button>
          <el-button class="w-20" type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
        </div>
      </el-form>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import tabs from '/@/components/Tabs/Index.vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
import { parseTime } from '/@/utils/tools'
import { PostWorkAssesSettingsSave } from '/@/api/system/SalesSettings'
import { GetAllUserList } from '/@/api/layout/index'
import { GetTypeDepartList } from '/@/api/system/dept'

//获取字典数据
const getDictionaryData = (data: any) => {
  //获取考核类型
  store.getDict('hr_cycle_type').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    data.assTypeOptions = res
  })
  //获取考核类型
  store.getDict('hr_asses_type').then((res: any) => {
    data.classification = res
  })
  //获取考核分类
  store.getDict('hr_classifyTable').then((res: any) => {
    data.classOptions = res
  })
  //获取考核标准
  store.getDict('HR_AssesMark').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    data.criteria = res
    console.log('-------------', data.criteria)
  })
  //获取是否关停
  // store.getDict('hr_sale_shutdown').then((res: any) => {
  //   data.shutDownOptions = res
  // })
}

export default defineComponent({
  components: {
    OpenWindow,
    tabs
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0
    })
    const data = reactive({
      tabList: [{ name: '第一个月' }, { name: '第二个月' }, { name: '第三个月' }],
      type: 0, //1编辑
      WorkloadSettingList: [],
      WorkloadSettingList2: [],
      WorkloadSettingList3: [],
      TypeOptions: [
        { DicKey: 1, DicValue: '集团工作量' },
        { DicKey: 2, DicValue: '新人工作量' }
      ], //类型
      TypeOpt: [
        { DicKey: 1, DicValue: '人员' },
        { DicKey: 2, DicValue: '部门' },
        { DicKey: 3, DicValue: '事业部' }
      ],
      classOptions: [], //考核分类
      assTypeOptions: [], //考核类型
      criteria: [], //考核标准
      shutDownOptions: [
        { DicValue: '是', DicKey: true },
        { DicValue: '否', DicKey: false }
      ], //是否关停
      NumberInput: '',
      assType: '',
      ruleForm: {
        departmentInput: '',
        Type: 1,
        StartDate: '',
        remarksInput: '',
        CreateBy: ''
      },
      tabIndex: 0,
      TemplateType: 0,
      CreateBy: [],
      UserId: 0,
      deptList: [], //部门列表
      divisionList: [] //事业部列表
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: ''
    })

    // 表单事件
    const formEvent = (data: any, closeWindow: any) => {
      const ruleFormRef = ref<FormInstance>()
      // 表单提交
      const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
        if (!formEl) return
        await formEl.validate((valid, fields) => {
          if (valid) {
            var time = parseTimeEvent(data.ruleForm.StartDate)
            if (props.FormData.type == 1) {
              const datas = {
                Remarks: data.ruleForm.remarksInput,
                AssesSettingsItemList: data.WorkloadSettingList,
                TemplateType: data.ruleForm.Type,
                EntryDay: data.tabIndex + 1
              }
              console.log(datas)
              // return
              //新建业绩设置
              PostWorkAssesSettingsSave(datas).then((res) => {
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
            } else {
              const datas = {
                Id: props.FormData.List.Id,
                StartDate: time,
                Remarks: data.ruleForm.remarksInput,
                AssesSettingsItemList: data.WorkloadSettingList,
                EntryDay: data.tabIndex
              }
              //编辑业绩设置
              PostWorkAssesSettingsSave(datas).then((res) => {
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
          }
        })
      }
      // 校验
      const rules = reactive<FormRules>({
        remarksInput: [{ required: true, message: '', trigger: 'blur' }],
        StartDate: [{ required: true, message: '', trigger: 'blur' }]
      })
      // 表单重置
      const resetForm = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.resetFields()
      }
      return { rules, submitForm, resetForm, ruleFormRef }
    }
    //添加列表
    const AddList = () => {
      var dedata: any = {}

      data.WorkloadSettingList.push(dedata)
      console.log('add')
    }
    const AddList2 = () => {
      var dedata2: any = {}

      data.WorkloadSettingList.push(dedata2)
      console.log('add')
    }
    const AddList3 = () => {
      var dedata3: any = {}

      data.WorkloadSettingList.push(dedata3)
      console.log('add')
    }

    ///删除
    const deldeList = (index: any) => {
      data.WorkloadSettingList.splice(index, 1)
      console.log(index)
    }

    // 类型的切换
    const changeTpeClick = (val: any) => {
      console.log(val)
      data.tabIndex = -1
      if (val == 2) {
        data.TemplateType = 2
      }
    }
    //tab
    const selectEvent = (index: any) => {
      console.log(index)
      data.tabIndex = index
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
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

    findAllUserList()
    onMounted(() => {
      getTypeList()
      console.log(props.FormData)
      data.type = props.FormData.type
      if (props.FormData.type == 1) {
        // data.WorkloadSettingList = []
      } else {
        data.WorkloadSettingList = props.FormData.List.AssesSettingsItemList
        data.ruleForm.Type = props.FormData.List.AssesType
        data.TemplateType = props.FormData.List.TemplateType
        data.ruleForm.remarksInput = props.FormData.List.Remarks
        data.ruleForm.StartDate = props.FormData.List.StartDate
        data.ruleForm.CreateBy = props.FormData.List.RealName
        console.log('TemplateType---------------', data.TemplateType)
        console.log('Type---------------', data.ruleForm.Type)
      }

      getDictionaryData(data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      form,
      ...formEvent(data, closeWindow),
      AddList,
      deldeList,
      changeTpeClick,
      selectEvent,
      parseTimeEvent,
      AddList3,
      AddList2
    }
  }
})
</script>
<style lang="postcss" scoped>
.hr_salesSettings_workloadSetting {
  :deep(.el-form-item__label) {
    line-height: 48px !important;
  }
  :deep(.el-form-item) {
    margin-bottom: 0 !important;
  }
  :deep(.el-input__inner) {
    border: none !important;
    box-shadow: none !important;
  }
  .tableclass {
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: #fff;
    }
    :deep(.el-table .cell) {
      padding: 0px;
      text-align: center;
    }

    :deep(.el-input__wrapper) {
      .el-input__inner {
        text-align: center;
      }
      box-shadow: 0 0 0 1px #ffffff inset;
    }
    :deep(.el-form-item.is-error .el-input__wrapper) {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
    .el-form-item {
      margin-bottom: 0px;
      width: 100%;
      .el-form-item__content {
        .el-textarea {
          :deep(.el-textarea__inner) {
            box-shadow: none;
          }
        }
      }
    }
  }
}
</style>
