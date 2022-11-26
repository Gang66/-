<template>
  <div class="ExamineAllocation">
    <OpenWindow :boxStyle="boxStyle" :isShow="true">
      <template #title>
        <div class="bf-window-header-bg h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100">
          <div class="flex items-center justify-between w-full mr-4">
            <div>工作量设置</div>
          </div>
          <div class="cursor-pointer rounded-full bg-gray-200 bg-opacity-50 p-0.5" style="line-height: 0">
            <el-icon @click="closeWindow('close')">
              <el-icon-close />
            </el-icon>
          </div>
        </div>
      </template>
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex justify-between mb-2">
            <div class="flex">
              <el-form-item label="岗位类型：" prop="PostIds">
                <el-select v-model="data.ruleForm.PostIds" placeholder="请选择岗位类型" class="screen-width">
                  <el-option v-for="item in data.postTypeList" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
              <el-form-item label="备注：" prop="Remarks">
                <el-input v-model="data.ruleForm.Remarks" placeholder="请输入备注" class="screen-width" />
              </el-form-item>
              <el-form-item label="类型：" prop="TermType">
                <el-select v-model="data.ruleForm.TermType" placeholder="请选择类型" class="screen-width">
                  <el-option v-for="item in data.examineTypeList" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </el-form-item>
            </div>
            <el-button type="primary" class="ml-8" @click="addContentList">新增</el-button>
          </div>
          <main>
            <div class="flex">
              <div class="cursor-pointer mr-8" :class="data.selectIndex == index ? 'bf-title-color font-semibold' : 'bf-no-color'"
                v-for="(item, index) in data.ruleForm.AssesSettingsTypeList" :key="index" @click="selectEvent(index)">
                {{ item.SetTypeInfo.name }}
              </div>
            </div>
            <div v-for="(val, index) in data.ruleForm.AssesSettingsTypeList" :key="index">
              <template v-if="data.selectIndex + 1 == val.SetTypeInfo.Month">
                <section v-for="(item, i) in val.contentList" class="mt-4">
                  <div class="flex">
                    <el-form-item label="考核大类：" :prop="'AssesSettingsTypeList.' + index +'.contentList.' + i + '.AssesBigType'" :rules="rules.AssesBigType">
                      <el-select v-model="item.AssesBigType" placeholder="请选择考核大类" class="screen-width" @change="examineLargeTypeChange($event, item)">
                        <el-option v-for="item in data.examineLargeTypeList" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                      </el-select>
                    </el-form-item>
                    <el-form-item label="分值占比：" :prop="'AssesSettingsTypeList.' + index + '.contentList.' + i +'.AssesBigTypeSorce'" :rules="rules.AssesBigTypeSorce">
                      <el-input v-model.number="item.AssesBigTypeSorce" placeholder="请输入分值占比" class="screen-width" />
                    </el-form-item>
                    <el-button type="danger" @click="deleteContentList(index)" class="ml-4">
                      <el-icon>
                        <el-icon-Delete />
                      </el-icon>
                    </el-button>
                  </div>
                  <el-table :data="item.AssesSettingsItemList" style="width: 100%">
                    <el-table-column type="index" label="序号" width="120" />
                    <el-table-column prop="date" label="考核分类">
                      <template #default="scope">
                        <el-form-item label="" :prop="'AssesSettingsTypeList.' + index + '.contentList.' + i + '.AssesSettingsItemList.' + scope.$index + '.ClassifyTable'"
                          :rules="rules.ClassifyTable" label-width="0">
                          <el-select v-model="scope.row.ClassifyTable" placeholder="请选择考核分类" class="main_input_width">
                            <el-option v-for="v in item.AssesList" :key="v.DicKey" :label="v.DicValue" :value="v.DicKey" />
                          </el-select>
                        </el-form-item>
                        <!-- 给小分类列表赋值 -->
                        <div v-show="false">{{ (scope.row.AssesBigType = val.AssesBigType) }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="name" label="考核分值">
                      <template #default="scope">
                        <el-form-item label="" :prop="'AssesSettingsTypeList.' + index + '.contentList.' + i + '.AssesSettingsItemList.' + scope.$index + '.AssesScore'"
                          :rules="rules.AssesScore" label-width="0">
                          <el-input v-model.number="scope.row.AssesScore" placeholder="请输入考核分值" class="main_input_width" />
                        </el-form-item>
                        <!-- 给小分类列表赋值 -->
                        <div v-show="false">{{ (scope.row.AssesBigTypeSorce = val.AssesBigTypeSorce) }}</div>
                      </template>
                    </el-table-column>
                    <el-table-column prop="" label="操作" width="160" align="center">
                      <template #default="scope">
                        <el-button type="primary" @click="addTableContentList(item.AssesSettingsItemList)">
                          <el-icon :size="16">
                            <el-icon-Plus />
                          </el-icon>
                        </el-button>
                        <el-button type="danger" @click="deleteTableContentList(scope.$index, item.AssesSettingsItemList)">
                          <el-icon>
                            <el-icon-Delete />
                          </el-icon>
                        </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <el-divider />
                </section>
              </template>
            </div>
          </main>
          <div class="bf-search-formItem mt-4">
            <div class="text-center w-full">
              <el-button @click="closeWindow('close')">取 消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
            </div>
          </div>
        </el-form>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import tabs from '/@/components/Tabs/Index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { PostWorkAssesSettingsSave } from '/@/api/hr/ExamineAllocation'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    // GetWorkCourseFinishedEntity(data.Id).then((res: any) => {
    //   if (res.code == 1) {
    //     data.ruleForm = res.data
    //   } else {
    //     ElMessage.error(res.message)
    //   }
    // })
  }
  // 获取岗位类型
  store.getDict('hr_examine_postType').then((res: any) => {
    data.postTypeList = res
  })
  // 获取岗位类型
  store.getDict('hr_examine_type').then((res: any) => {
    data.examineTypeList = res
  })
  // 获取考核大类
  store.getDict('hr_examine_largeType').then((res: any) => {
    data.examineLargeTypeList = res
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

        // 月份列表
        arr.AssesSettingsTypeList.forEach((element: any) => {
          delete element.AssesBigTypeSorce
          delete element.AssesBigType
          // 大类循环
          element.contentList.forEach((val: any) => {
            element.AssesSettingsItemList = val.AssesSettingsItemList
          })
        })
        PostWorkAssesSettingsSave(arr).then((res) => {
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
    AssesBigTypeSorce: [
      {
        required: true,
        message: '请填写分值占比',
        trigger: 'blur'
      }
    ],
    AssesBigType: [
      {
        required: true,
        message: '请选择考核大类',
        trigger: 'change'
      }
    ],
    ClassifyTable: [
      {
        required: true,
        message: '请选择考核分类',
        trigger: 'change'
      }
    ],
    AssesScore: [
      {
        required: true,
        message: '请填写考核分值',
        trigger: 'blur'
      }
    ],
    PostIds: [
      {
        required: true,
        message: '请选择岗位类型',
        trigger: 'change'
      }
    ],
    TermType: [
      {
        required: true,
        message: '请选择类型',
        trigger: 'change'
      }
    ]
  })
  // 新增内容列表
  const addContentList = () => {
    data.ruleForm.AssesSettingsTypeList[data.selectIndex].contentList.push({
      AssesSettingsItemList: [
        {
          AssesBigTypeSorce: null,
          AssesScore: null,
          ClassifyTable: null,
          AssesBigType: null
        },
        {
          AssesBigTypeSorce: null,
          AssesScore: null,
          ClassifyTable: null,
          AssesBigType: null
        }
      ]
    })
  }
  // 删除内容列表
  const deleteContentList = (index: number) => {
    data.ruleForm.AssesSettingsTypeList[data.selectIndex].contentList.splice(index, 1)
  }
  // 新增table数据
  const addTableContentList = (AssesSettingsItemList: any) => {
    AssesSettingsItemList.push({
      AssesBigTypeSorce: null,
      AssesScore: null,
      ClassifyTable: null,
      AssesBigType: null
    })
  }
  // 删除table数据
  const deleteTableContentList = (index: number, AssesSettingsItemList: any) => {
    AssesSettingsItemList.splice(index, 1)
  }
  // 监听考核大类
  const examineLargeTypeChange = (val: any, item: any) => {
    store.getDict(val).then((res: any) => {
      item.AssesList = res
      console.log(res)
    })
    console.log(item)
  }
  // 监听上下午事件
  const selectEvent = (index: number) => {
    data.selectIndex = index
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
    selectEvent,
    addContentList,
    deleteContentList,
    addTableContentList,
    deleteTableContentList,
    examineLargeTypeChange
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    tabs
  },
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      postTypeList: [], //岗位类型
      examineTypeList: [], //考核类型
      examineLargeTypeList: [], //考核大类型
      ruleForm: {
        // tab数据
        AssesSettingsTypeList: [
          {
            AssesBigType: null,
            SetTypeInfo: {
              Month: 1,
              name: '第一周'
            },
            contentList: [
              {
                AssesSettingsItemList: [
                  {
                    AssesBigTypeSorce: null,
                    AssesScore: null,
                    ClassifyTable: null,
                    AssesBigType: null
                  },
                  {
                    AssesBigTypeSorce: null,
                    AssesScore: null,
                    ClassifyTable: null,
                    AssesBigType: null
                  }
                ]
              }
            ]
          },
          {
            AssesBigType: null,
            SetTypeInfo: {
              Month: 2,
              name: '第二周'
            },
            contentList: [
              {
                AssesSettingsItemList: [
                  {
                    AssesBigTypeSorce: null,
                    AssesScore: null,
                    ClassifyTable: null,
                    AssesBigType: null
                  },
                  {
                    AssesBigTypeSorce: null,
                    AssesScore: null,
                    ClassifyTable: null,
                    AssesBigType: null
                  }
                ]
              }
            ]
          },
          {
            AssesBigType: null,
            SetTypeInfo: {
              Month: 3,
              name: '第三周'
            },
            contentList: [
              {
                AssesSettingsItemList: [
                  {
                    AssesBigTypeSorce: null,
                    AssesScore: null,
                    ClassifyTable: null,
                    AssesBigType: null
                  },
                  {
                    AssesBigTypeSorce: null,
                    AssesScore: null,
                    ClassifyTable: null,
                    AssesBigType: null
                  }
                ]
              }
            ]
          }
        ]
      },
      Id: props.Id,
      selectIndex: 0, //tab下标
      // 内容列表区域
      contentList: [{ title: '1' }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-940',
      boxHeight: '',
      boxPaddingTop: 'pt-40'
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
.ExamineAllocation {
  :deep(.el-form-item__label) {
    color: var(--el-text-color-primary);
    padding: 0;
  }
  :deep(.bf-window-padding) {
    padding: 1rem 1.25rem;
  }
  :deep(.el-divider--horizontal) {
    margin: 12px 0;
  }
  :deep(.w-940) {
    border-radius: 9px;
  }
  :deep(.screen-width) {
    width: 170px !important;
  }
  :deep(.el-table th.el-table__cell.is-leaf) {
    color: var(--el-text-color-primary) !important;
    border-bottom: none;
  }
  :deep(table__inner-wrapper::before) {
    background-color: #fff;
  }
  .main_input_width {
    width: 280px;
  }
  :deep(.el-form-item) {
    margin-bottom: 0px;
  }
}
</style>
