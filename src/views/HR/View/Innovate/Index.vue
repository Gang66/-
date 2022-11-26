<template>
  <div class="bf-content">
    <div class="bf-center-content">
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <el-form :model="form" label-width="70px" class="bf-search-formItem">
          <div class="flex justify-between items-center">
            <div class="bf-table-label">创新举措</div>
            <div class="flex justify-end items-center">
              <!-- <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
                <el-option label="建议类型" value="1" />
                <el-option label="当前状态" value="2" />
                <el-option label="处理人" value="3" />
                <el-option label="建议人" value="4" />
                <el-option label="创建时间" value="5" />
              </el-select>
              <el-select v-model="form.TypeId" placeholder="字典状态" clearable class="screen-width" v-if="form.type==1">
                <el-option v-for="item in data.Suggestion" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey">{{ item.DicValue }}</el-option>
              </el-select>
              <el-select v-model="form.Level" class=" screen-width" placeholder="搜索等级" v-else-if="form.type==2">
                <el-option :label="item.DicValue" :value="item.DicKey" v-for="item in data.CoursewareLevel" />
              </el-select>
              <el-select v-model="form.Class" class=" screen-width" placeholder="搜索类型" v-else-if="form.type==3">
                <el-option :label="item.DicValue" :value="item.DicKey" v-for="item in data.CoursewareClass" />
              </el-select>
              <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type==4" start-placeholder="开始时间"
                end-placeholder="结束时间" :size="size" />
              <el-button type="primary" @click="search()" class="ml-2">搜索</el-button> -->
              <el-button type="primary" @click="openWindow(false)">新增</el-button>
            </div>
          </div>
          <!-- <div class="flex justify-between items-center">
            <div class="bf-table-label">创新举措</div>
            <div class="flex">
             
              <el-form-item label="创建时间" class="ml-2">
                <el-date-picker v-model="form.CreateOn" type="date" placeholder="创建时间" />
              </el-form-item>
              
            </div>
          </div> -->
        </el-form>
        <div class="bf-table-content">
          <el-table :data="data.tableData" class="w-full">
            <el-table-column type="index" label="序号" width="70" align="center" />
            <el-table-column prop="CreateOn" label="创建时间" align="center">
              <template #default="scope">
                {{ parseTimeEvent(scope.row.CreateOn) }}
              </template>
            </el-table-column>
            <el-table-column prop="TypeId" label="建议类型" align="center">
              <template #default="scope">
                {{ getStatus(scope.row.TypeId) }}
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="建议人" align="center" />
            <el-table-column prop="Suggestion" label="建议内容" width="200" align="center">
              <template #default="scope">
                <div class="truncate">{{ scope.row.Suggestion[scope.row.TypeId][0].Remark }}</div>
              </template>
            </el-table-column>
            <el-table-column prop="State" label="处理状态" align="center">
              <template #default="scope">
                <template v-for="(item,index) in data.InnovateState" :key="index">
                  <div v-if="item.DicKey==scope.row.State">
                    <el-button type="primary" link @click="openWindow(true, scope.row.Id,true)">{{item.DicValue}}</el-button>
                  </div>
                </template>
              </template>
            </el-table-column>
            <el-table-column prop="CreateName" label="处理人" align="center" />
            <el-table-column prop="Suggestion" label="处理内容" width="200" align="center">
              <template #default="scope">
                <el-button link key="primary" type="primary" @click="openWindow(true, scope.row.Id)">{{ scope.row.Suggestion[scope.row.TypeId][0].Remark }}</el-button>
                <!-- <div class="truncate">{{ scope.row.Suggestion[scope.row.TypeId][0].Remark }}</div> -->
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
              <template #default="scope">
                <el-button text key="primary" type="primary" @click="openWindow(true, scope.row.Id)">详情</el-button>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </table-search>
    </div>
    <!-- 创新举措表单 -->
    <InnovateForm title="创新举措" v-if="data.indexWindow.show" :isEdit="data.indexWindow.isEdit" :isHandle="data.indexWindow.isHandle " @closeWindow="closeWindow" :Id="data.indexWindow.Id"></InnovateForm>
  </div>
</template>

<script lang="ts">
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive } from 'vue'
import InnovateForm from './_Components/Form.vue'
import { getInnovateList, GetMyInnovatePage } from '/@/api/hr/Innovate'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime } from '/@/utils/tools'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetMyInnovatePage(form).then((res) => {
    if (res.code == 1) {
      res.data.records.forEach((element: any) => {
        element.Suggestion = eval('(' + element.Suggestion + ')')
      })
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
// 筛选
const tableRender = (form: any, data: any) => {
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
  const typeChange = (val: any) => {}
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
  }
  return {
    search,
    getStatus,
    handleSizeChange,
    handleCurrentChange,
    indexMethod,
    parseTimeEvent,
    typeChange
  }
}
const window = (form: any, data: any): any => {
  // 字典类型添加 修改弹窗
  const openWindow = (isEdit: boolean, Id: number, isHandle = false) => {
    data.indexWindow.Id = Id
    data.indexWindow.isHandle = isHandle
    data.indexWindow.isEdit = isEdit
    data.indexWindow.show = true
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.indexWindow.show = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    openWindow,
    closeWindow
  }
}
export default defineComponent({
  components: {
    TableSearch,
    InnovateForm
  },
  props: {},
  setup() {
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1
    })
    const data = reactive({
      InnovateState: [],
      // 弹窗数据
      indexWindow: {
        show: false
      },
      // 列表数据
      tableData: [],
      Suggestion: {}
    })
    onMounted(() => {
      // 根据Id获取详情
      store.getDict('hr_Innovate_status').then((res: any) => {
        data.Suggestion = res
      })
      // 处理状态
      store.getDict('hr_Innovate_state').then((res: any) => {
        data.InnovateState = res
      })
    })

    return { form, data, ...tableRender(form, data), ...window(form, data) }
  }
})
</script>

<style lang="scss" scoped></style>
