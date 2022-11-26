<!--
 * @Author: ZHJ
 * @Date: 2022-11-06 09:23:13
 * @LastEditTime: 2022-11-09 15:04:27
 * @LastEditors: ZHJ
 * @Description: 工资考核项表单
 * @FilePath: \beifangrenzixitong\src\views\HR\View\Salary\_Components\SalaryItemsAssessForm.vue
 * 版权声明
-->
<template>
  <div class="SalarySettingForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="明细构成">
      <div class="bf-window-padding">
        <div class="library-basic">
          <div class="library-header clearfix">
            <div class="library-header-title">固定工资</div>
          </div>
          <div class="library-body mt-2 mb-2">
            <ul class="clearfix">
              <li><b>考核项目：</b><span>{{data.ruleForm.Name}}</span></li>
              <li><b>金　　额：</b><span>{{data.ruleForm.TotalAmount}}</span></li>
              <li v-if="data.cycleType.length>0"><b>考核周期：</b>
                <template v-for="(item,index) in data.cycleType" :key="index">
                  <span v-if="data.ruleForm.CycleType==item.DicKey">{{item.DicValue}}</span>
                </template>
              </li>
              <li><b>启用时间：</b><span>{{(data.ruleForm.StartTime||'-').substring(0,10)}}</span></li>
            </ul>
          </div>
        </div>
        <div class="edit-library library-basic bf-table-content">
          <div class="library-header flex justify-between">
            <div class="library-header-title">二级工资构成</div>
            <div class="library-header-but">
              <el-button type="primary" @click="addWork">添加</el-button>
            </div>
          </div>
          <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="0px" hide-required-asterisk>
            <el-table :data="data.ruleForm.LibraryItemList" border fit highlight-current-row style="width: 100%;">

              <el-table-column align="center" label="序号" width="70">
                <template #default="scope">
                  <span style="display: block; margin-right: 10px;">{{scope.$index+1}}</span>
                </template>
              </el-table-column>
              <el-table-column width="200" align="center" label="考核项目">
                <template #default="scope">
                  <el-form-item :prop="'LibraryItemList.'+ scope.$index + '.Name'" :rules="rules.Name">
                    <el-input type="text" class="filter-item" v-model="scope.row.Name" placeholder="请输入..."></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center" label="合计金额">
                <template #default="scope">
                  <el-form-item :prop="'LibraryItemList.'+ scope.$index + '.TotalAmount'" :rules="rules.TotalAmount">
                    <el-input type="number" class="filter-item" v-model="scope.row.TotalAmount" placeholder="请输入..." min="0" @input="getWagesTotal"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center" label="金额上限">
                <template #default="scope">
                  <el-form-item :prop="'LibraryItemList.'+ scope.$index + '.MaxAmount'" :rules="rules.MaxAmount">
                    <el-input type="number" class="filter-item" v-model="scope.row.MaxAmount" placeholder="请输入..." min="0"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="100" align="center" label="周期单价">
                <template #default="scope">
                  <el-form-item :prop="'LibraryItemList.'+ scope.$index + '.UnitPrice'" :rules="rules.UnitPrice">
                    <el-input type="number" class="filter-item" v-model="scope.row.UnitPrice" placeholder="请输入..." min="0" @input="getWagesTotal"></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column width="80" align="center" label="考核周期">
                <template #default="scope">
                  <el-form-item :prop="'LibraryItemList.'+ scope.$index + '.CycleType'" :rules="rules.CycleType">
                    <el-select v-model="scope.row.CycleType" placeholder="请选择">
                      <el-option v-for="item in data.cycleType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column min-width="120" align="center" label="数据源">
                <template #default="scope">
                  <el-form-item :prop="'LibraryItemList.'+ scope.$index + '.DataSource'" :rules="rules.DataSource">
                    <el-select v-model="scope.row.DataSource" placeholder="请选择" filterable style="width: 100%;">
                      <el-option v-for="item in data.dataSourceList" :key="item.MethodName" :label="item.DisplayName+' - '+item.TypeName" :value="item.MethodName"></el-option>
                    </el-select>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                <template #default="scope">
                  <el-button v-if="scope.$index!=0" type="text" @click="delWork(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="bf-search-formItem mt-4" v-if="!data.isEdit">
              <div class="text-center w-full">
                <el-button @click="closeWindow('close')">取 消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { computed, defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { PostEditWagesItemLibrarySave, GetWagesItemLibraryEntity, GetWagesItemMethodList, PostEditWagesItemLibraryItemSave } from '../../../../../api/hr/Salary'
import { GetAllSysPostList, GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句

const tempObj = {
  Code: '0', // 编号
  RoleId: 0, // 角色Id
  ParentId: 0, // 父级Id 0表示顶级
  Name: null, // 工资项名称
  StartTime: null, // 启用时间
  TotalAmount: 0, // 总金额
  MaxAmount: 0, // 上限金额 0表示没有上限
  CycleType: '1', // 考核周期 1日 2周 3月
  DataSource: null, //数据源
  LibraryItemList: [
    {
      Code: '0', // 编号
      RoleId: 0, // 角色Id
      ParentId: 0, // 父级Id 0表示顶级
      Name: null, // 工资项名称
      StartTime: null, // 启用时间
      TotalAmount: 0, // 总金额
      UnitPrice: 0, //单价
      MaxAmount: 0, // 上限金额 0表示没有上限
      CycleType: 1, // 考核周期 1日 2周 3月
      DataSource: null //数据源
    }
  ]
}
const GetContractManagementInfoEvent = async (data: any) => {
  // 获取岗位类别
  store.getDict('hr_cycle_type').then((res: any) => {
    data.cycleType = res
  })
  GetWagesItemMethodList().then((res: any) => {
    data.dataSourceList = res.data
  })
  GetWagesItemLibraryEntity(data.ruleForm.Id).then((res: any) => {
    if (res.code == 1) {
      res.data.records.CycleType += ''
      data.ruleForm = res.data.records
      data.ruleForm.LibraryItemList.forEach((element: any) => {
        element.CycleType = String(element.CycleType)
      })
    } else {
      ElMessage.error(res.message)
    }
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
        if (data.ruleForm.MaxAmount > 0 && data.ruleForm.MaxAmount < data.ruleForm.TotalAmount) {
          ElMessage.error('金额不能高于上限')
          return false
        }
        if (data.ruleForm.TotalAmount != data.wagesTotal) {
          ElMessage.error('固定工资金额与二级工资构成合计金额不吻合')
          return false
        }
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        PostEditWagesItemLibraryItemSave(arr).then((res: any) => {
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
    Name: [{ required: true, message: '请填写', trigger: 'blur' }],
    StartTime: [{ required: true, message: '请填写', trigger: 'blur' }],
    TotalAmount: [{ required: true, message: '请填写', trigger: 'blur' }],
    UnitPrice: [{ required: true, message: '请填写', trigger: 'blur' }],
    MaxAmount: [{ required: true, message: '请填写', trigger: 'blur' }],
    CycleType: [{ required: true, message: '请填写', trigger: 'blur' }],
    DataSource: [{ required: true, message: '请填写', trigger: 'blur' }]
  })
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  //添加
  const addWork = () => {
    var value = JSON.parse(JSON.stringify(tempObj))
    value.ParentId = data.ruleForm.Id
    data.ruleForm.LibraryItemList.push(value)
    getWagesTotal()
  }
  //删除
  const delWork = (index: any) => {
    data.ruleForm.LibraryItemList.splice(index, 1)
    getWagesTotal()
  }
  //计算工资合计
  const getWagesTotal = () => {
    data.wagesTotal = data.ruleForm.LibraryItemList.reduce((a: any, b: any) => {
      return a + parseFloat(b.TotalAmount) || 0
    }, 0)
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
    addWork,
    delWork,
    getWagesTotal
  }
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    details: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      cycleType: [],
      dataSourceList: [],
      ruleForm: {},
      roleType: {
        TwoList: []
      },
      currRoleId: 0
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
    const currRoleTypeList = computed(() => {
      var pid = (data.currRoleId || 0).toString()
      var arr = (data.roleType.TwoList || []).filter((x: any) => {
        return x.ParentId == pid
      })
    })
    onMounted(() => {
      data.ruleForm = Object.assign(data.ruleForm, props.details)
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      currRoleTypeList,
      ...formEvent(data, closeWindow)
    }
  }
})
</script>

<style lang="postcss">
.library-basic {
  .library-header {
    clear: both;
    border-bottom: 4px solid #fdd647;
    .library-header-title {
      float: left;
      font-size: 16px;
      color: #333;
      height: 32px;
      line-height: 32px;
      padding: 0 20px;
      border-radius: 5px 5px 0 0;
      background-color: #ffe688;
    }
  }
  .library-body {
    ul {
      clear: both;
      li {
        float: left;
        width: 160px;
        height: 32px;
        line-height: 32px;
        font-size: 14px;
        padding: 0;
        b {
          color: #333;
          font-weight: normal;
        }
        span {
          color: #666;
        }
      }
    }
  }
}
.edit-library {
  padding: 0 10px 0 0;
  .el-form-item {
    margin-bottom: 0px !important;
  }
  :deep(.el-form) {
    .el-form-item {
      margin-bottom: 10px;
      .el-form-item__label {
        font-weight: normal;
        color: #606266;
      }
      .el-form-item__content {
        .el-select__tags {
          & > span {
            width: 100%;
            height: 26px;
            display: block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
        .el-form-item__error {
          padding-top: 0;
        }
      }
    }
  }
  :deep(.el-table) {
    th {
      border-color: #e6f2ff;
      &.table-header-cell {
        background-color: #e6f2ff;
        color: #333;
      }
    }
    td {
      border-color: transparent transparent #e2e2e2 transparent;
      background-color: #fff;
    }
    .library-item-table {
      padding: 0;
      .cell {
        padding: 0;
      }
      .el-form-item {
        margin-bottom: 0;
        .el-input {
          input {
            border-radius: 0;
            border-color: #fff;
          }
        }
      }
      .el-form-item__error {
        top: 20px;
        z-index: 99;
      }
    }
  }
  .wages-total {
    padding: 8px 10px;
    font-size: 14px;
    color: #333;
  }
}
:deep(.el-form-item) {
  margin-bottom: 0px;
}
</style>
