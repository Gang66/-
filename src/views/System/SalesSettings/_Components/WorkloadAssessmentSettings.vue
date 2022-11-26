<template>
  <div>
    <div class="absolute -top-8 right-0 z-30">
      <el-button type="primary" @click="openWindowSendCopy(data.selectDetails.Id)" :disabled="data.single"> <i class="iconfont icon-huifu mr-2"></i> 抄送</el-button>
      <el-button type="primary" @click="openWindowWorkloadSetting(1, '新增工作量设置', data.performanceList)"> <i class="iconfont icon-order mr-2"></i> 新建考核</el-button>
    </div>
    <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
      <div class="bf-table-content">
        <el-table :data="data.performanceList" class="w-full" ref="multipleTableRef" @select="selectRow" @selection-change="handleSelectionChange" @filter-change="filterData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="Name" label="启动日期" align="center" min-width="100">
            <template #default="scope">
              <span v-if="scope.row.StartDate == null">-</span>
              <span v-else>{{ parseTimeEvent(scope.row.StartDate) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="类型" align="center">
            <template #default="scope">{{ getClass(scope.row.AssesType) }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="名称" align="center">
            <template #default="scope">{{ scope.row.RealName || '-' }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="创建人" align="center">
            <template #default="scope">系统管理员</template>
          </el-table-column>
          <el-table-column prop="Name" label="创建时间" align="center" min-width="120">
            <template #default="scope">{{ parseTimeEvent(scope.row.CreateOn) }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="备注" align="center" min-width="140" show-overflow-tooltip>
            <template #default="scope">{{ scope.row.Remarks || '' }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="操作" align="center">
            <template #default="scope">
              <div class="text-blue-500 cursor-pointer">
                <span @click="openWindowWorkloadSetting(0, '详情工作量设置', scope.row)">详情</span>
                <span class="ml-2 text-red-500" @click="delte(scope.row.Id)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </table-search>
    <!-- 查看工作量设置 -->
    <WorkloadSetting :title="workloadSettingOpenData.formData.ClientName" v-if="workloadSettingOpenData.visible" :FormData="workloadSettingOpenData.formData" @closeWindow="closeWindowWorkloadSetting($event)" />
    <!-- 抄送 -->
    <SendCopy :title="'抄送'" v-if="sendCopyOpenData.visible" :FormData="sendCopyOpenData.formData" @closeWindow="closeWindowSendCopy($event)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, onMounted } from 'vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import WorkloadSetting from './WorkloadSetting.vue'
import { GetWorkAssesSettingsPage, GetDelWorkAssesSettingsSave } from '/@/api/system/SalesSettings'
import { parseTime } from '/@/utils/tools'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
import { ElMessage, ElMessageBox } from 'element-plus'
import SendCopy from './sendCopy.vue'

//获取字典数据
const getDictionaryData = (data: any) => {
  //获取考核类型
  store.getDict('hr_asses_type').then((res: any) => {
    data.classification = res
  })
}

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWorkAssesSettingsPage(form).then((res) => {
    if (res.code == 1) {
      console.log(res)
      data.performanceList = res.data.records
      form.totals = res.data.totals
      // EntryDay
    }
  })
}

// 筛选
const tableRender = (form: any, data: any, multipleTableRef: any) => {
  renderTableList(form, data)
  const getStatus = (val: string) => {
    var title = ''
    if (data.Suggestion.length > 0) {
      data.Suggestion.forEach((element: any) => {
        if (val == element.DicKey) {
          title = element.DicValue
        }
      })
    }
    return title
  }
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
    form.time = ''
    form.HRName = ''
    form.BeginDate = ''
    form.EndDate = ''
  }
  // 监听tab选项改为单选
  const selectRow = (selection: any, row: any) => {
    data.selectDetails = row
    if (selection.length > 1) {
      multipleTableRef.value.clearSelection()
      multipleTableRef.value.toggleRowSelection(selection.pop())
    }
    console.log(data.selectDetails)
  }
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  const filterData = (val: any) => {
    if (val.Sex && val.Sex.length > 0) {
      form.Sex = JSON.stringify(val.Sex)
    } else {
      form.Sex = []
    }
    if (val.StaffState && val.StaffState.length > 0) {
      form.StaffState = JSON.stringify(val.StaffState)
    } else {
      form.StaffState = []
    }
    search()
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    if (val.length !== 1) {
    } else {
      console.log(val[0].TemplateType)
      if (val.length !== 1 || val[0].TemplateType != 1) {
        data.single = true
      } else {
        data.single = false
      }
    }
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    handleSelectionChange,
    typeChange,
    filterData,
    selectRow,
    parseTimeEvent
  }
}

export default defineComponent({
  components: {
    TableSearch,
    WorkloadSetting,
    SendCopy
  },
  setup() {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0
    })
    const data = reactive({
      performanceList: [],
      classification: [],
      single: true
    })
    const getData = () => {
      renderTableList(form, data)
    }
    //查看工作量设置
    const workloadSettingOpen = (data: any) => {
      let workloadSettingOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowWorkloadSetting = (val: any, Name: any, List: any) => {
        workloadSettingOpenData.formData = {
          ClientName: Name,
          type: val,
          List: List
        }
        console.log(List)
        workloadSettingOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowWorkloadSetting = (type: string) => {
        workloadSettingOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        workloadSettingOpenData,
        openWindowWorkloadSetting,
        closeWindowWorkloadSetting
      }
    }
    // 抄送

    const sendCopyOpen = (data: any) => {
      let sendCopyOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowSendCopy = (Id: number) => {
        sendCopyOpenData.formData = {
          Id: Id
        }
        console.log(Id)
        sendCopyOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowSendCopy = (type: string) => {
        sendCopyOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        sendCopyOpenData,
        openWindowSendCopy,
        closeWindowSendCopy
      }
    }

    // 获取考核分类
    const getClass = (val: number) => {
      let _obj = data.classification.find((x: any) => x.DicKey == val)
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    //删除业绩设置
    const delte = (id: any) => {
      ElMessageBox.confirm('确定删除？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          GetDelWorkAssesSettingsSave(id).then((res) => {
            if (res.code == 1) {
              console.log(res)
              ElMessage({
                type: 'success',
                message: '确定删除'
              })
              renderTableList(form, data)
            }
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除'
          })
        })
    }
    onMounted(() => {
      getDictionaryData(data)
    })

    return {
      data,
      form,
      ...tableRender(form, data, multipleTableRef),
      multipleTableRef,
      ...workloadSettingOpen({ data, getData }),
      getClass,
      delte,
      ...sendCopyOpen({ data, getData })
    }
  }
})
</script>

<style lang="postcss" scoped></style>
