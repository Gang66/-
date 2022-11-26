<template>
  <div>
    <div class="absolute -top-8 right-0 z-30">
      <el-button type="primary" @click="openWindowEditAddTarget(0, '新增目标')"> <i class="iconfont icon-order mr-2"></i> 添加目标</el-button>
    </div>
    <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
      <div class="bf-table-content">
        <el-table :data="data.performanceList" class="w-full" ref="multipleTableRef" @select="selectRow" @selection-change="handleSelectionChange" @filter-change="filterData">
          <el-table-column type="selection" width="50" align="center" />
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="Name" label="启动日期" align="center" min-width="140">
            <template #default="scope">{{ parseTimeEvent(scope.row.StartDate) }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="目标类型" align="center">
            <template #default="scope">
              <span v-if="scope.row.TargetType == 1">常规目标</span>
              <span v-else>对赌目标</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="目标周期" align="center">
            <template #default="scope">
              <span v-if="scope.row.Cycle == 0">每个月</span>
              <span v-else-if="scope.row.Cycle == 1">第一个月</span>
              <span v-else-if="scope.row.Cycle == 2">第二个月</span>
              <span v-else-if="scope.row.Cycle == 3">第三个月</span>
              <span v-else>第四个个月</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="目标量" align="center">
            <template #default="scope">{{ scope.row.TargetAmount || '-' }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="备注" align="center" min-width="140" show-overflow-tooltip>
            <template #default="scope">{{ scope.row.Remarks }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="操作" align="center">
            <template #default="scope">
              <div class="text-blue-500 cursor-pointer">
                <span @click="openWindowEditAddTarget(1, '编辑目标', scope.row.Id)">编辑</span>
                <span class="ml-2 text-red-500" @click="delte(scope.row.Id)">删除</span>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </table-search>
    <!-- 编辑/新增目标 -->
    <EditAddTarget :title="editAddTargetOpenData.formData.ClientName" v-if="editAddTargetOpenData.visible" :FormData="editAddTargetOpenData.formData" @closeWindow="closeWindowEditAddTarget($event)" />
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import EditAddTarget from './Edit-Add-Target.vue'
import { GetWorkSetupKachPage, GetDelWorkSetupKach } from '/@/api/system/SalesSettings'
import { parseTime } from '/@/utils/tools'
import { ElMessage, ElMessageBox } from 'element-plus'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetWorkSetupKachPage(form).then((res) => {
    if (res.code == 1) {
      console.log(res)
      data.performanceList = res.data.records
      form.totals = res.data.totals
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
    data.selectDetailsId = row.Id
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    if (val.length !== 1) {
      data.single = true
    } else {
      data.single = false
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
    EditAddTarget
  },
  setup() {
    const multipleTableRef: any = ref(null)
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      totals: 0,
      TargetType: 1
    })
    const data = reactive({
      performanceList: [],
      selectDetailsId: 0
    })

    //编辑/新增目标
    const editAddTargetOpen = (data: any) => {
      let editAddTargetOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowEditAddTarget = (val: any, Name: any, Id: number) => {
        editAddTargetOpenData.formData = {
          ClientName: Name,
          type: val,
          Id: Id
        }
        // console.log(Id)
        editAddTargetOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowEditAddTarget = (type: string) => {
        editAddTargetOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        editAddTargetOpenData,
        openWindowEditAddTarget,
        closeWindowEditAddTarget
      }
    }
    const getData = () => {
      renderTableList(form, data)
    }
    //删除业绩设置
    const delte = (id: any) => {
      ElMessageBox.confirm('确定删除？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          GetDelWorkSetupKach(id).then((res) => {
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

    return {
      data,
      form,
      ...tableRender(form, data, multipleTableRef),
      multipleTableRef,
      ...editAddTargetOpen({ data, getData }),
      delte
    }
  }
})
</script>

<style lang="postcss" scoped></style>
