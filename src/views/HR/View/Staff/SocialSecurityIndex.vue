<template>
  <div>
    <zStatistic></zStatistic>
    <div class="bf-center-content">
      <div class="flex items-center justify-between">
        <div class="bf-table-label">社保管理</div>
        <div class="flex justify-end items-center">
          <el-select v-model="form.type" class="ml-2 screen-width" placeholder="类型" @change="typeChange">
            <el-option label="姓名" value="1" />
            <el-option label="事业部" value="2" />
            <el-option label="岗位" value="3" />
            <el-option label="社保时间" value="5" />
          </el-select>
          <el-input v-model="form.UserName" placeholder="请输入" class="screen-width" v-if="form.type == 1" />
          <el-select v-model="form.CompId" placeholder="请选择事业部" filterable class="screen-width" v-else-if="form.type == 2">
            <el-option v-for="item in data.deptList" :key="item.Id" :label="item.Name" :value="item.Id" />
          </el-select>
          <el-select v-model="form.PostId" placeholder="请选择岗位" filterable class="screen-width" v-else-if="form.type == 3">
            <el-option v-for="item in data.postList" :key="item.Id" :label="item.PostName" :value="item.Id" />
          </el-select>
          <el-input v-model="form.RealName" placeholder="请输入" class="screen-width" v-if="form.type == 4" />
          <el-date-picker v-model="form.time" class="screen-time-width" type="daterange" range-separator="于" v-else-if="form.type == 5" start-placeholder="开始时间" end-placeholder="结束时间" @change="timeChange" />
          <el-button @click="search()" class="ml-3" type="primary" plain>
            <el-icon>
              <el-icon-Search />
            </el-icon>
            <span>搜索</span>
          </el-button>
          <el-button @click="openSocialSecurityFormWindow({})" class="ml-3" type="primary" plain> 社保配置 </el-button>
        </div>
      </div>
      <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
        <div class="bf-table-content leaveIndex">
          <el-table :data="data.tableData" class="w-full" @selection-change="handleSelectionChange">
            <!-- <el-table-column type="selection" width="55" /> -->
            <el-table-column type="index" label="序号" width="55" align="center" />
            <el-table-column prop="SocialSecurityDate" label="社保时间" align="center" width="120" />
            <el-table-column prop="RealName" label="姓名" align="center" width="80" />
            <el-table-column prop="Days" label="部门" align="center" width="130">
              <template #default="scope">
                <DepTabridge :key="scope.row.Id" :deptDetails="{ DivisionName: scope.row.CompName, DeptName: scope.row.DeptName }"></DepTabridge>
              </template>
            </el-table-column>
            <el-table-column prop="postname" label="岗位" align="center" width="120" />
            <el-table-column prop="Situation" label="社保情况" align="center"><template #default="scope">
                <div v-for="(item, index) in data.basicSocialInsuranceOptions" :key="index">
                  <div v-if="scope.row.Situation == item.DicKey">{{ item.DicValue }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="SocialSecurityCompany" label="社保公司" align="center">
              <template #default="scope">
                <el-tooltip class="box-item" effect="dark" :content="scope.row.SocialSecurityCompany" placement="top">
                  <div class="truncate">
                    {{ scope.row.SocialSecurityCompany }}
                  </div>
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column prop="" label="社保金额(元)" align="center">
              <el-table-column prop="TotalMoney" label="总计" align="center">
                <template #default="scope">
                  {{ scope.row.TotalMoney }}
                </template>
              </el-table-column>
              <el-table-column prop="CompanyMoney" label="公司" align="center"> </el-table-column>
              <el-table-column prop="PersonalMoney" label="个人" align="center"> </el-table-column>
            </el-table-column>
            <el-table-column prop="" label="社保状态" align="center">
              <template #default="scope">
                <div v-for="(item, index) in data.socialState" :key="index">
                  <div v-if="scope.row.SocialState == item.DicKey">{{ item.DicValue }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" align="center">
              <template #default="scope">
                <el-button type="primary" link @click="openSocialSecurityFormWindow(scope.row)">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </table-search>
    </div>
    <SocialSecurityForm v-if="data.SocialSecurityForm.view == true" @closeWindow="closeWindow" :Id="data.SocialSecurityForm.Id" :SocialSecurityCompany="data.SocialSecurityForm.SocialSecurityCompany" :UserId="data.SocialSecurityForm.UserId" :viewType="1"> </SocialSecurityForm>
  </div>
</template>

<script lang="ts">
import DepTabridge from '/@/components/DepTabridge/index.vue'
import TableSearch from '/@/components/TableSearch/index.vue'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import { parseTime, remoteUrl } from '/@/utils/tools'
import zStatistic from '../../Components/statistic/Index.vue'
import SocialSecurityForm from './_Components/SocialSecurityForm.vue'
import { GetTypeDepartList } from '/@/api/system/dept'
import { ElMessage } from 'element-plus'
import { GetSocialSecurityPage } from '/@/api/hr/Staff'
const store = useCommonStore() //记得加这一句
// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetSocialSecurityPage(form).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.records
      form.totals = res.data.totals
    }
  })
}
const handleSelectionChange = (val: any) => {}
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
  // 监听时间筛选
  const timeChange = (val: any) => {
    if (val) {
      form.BeginDate = parseTime(val[0], '{y}-{m}-{d}')
      form.EndDate = parseTime(val[1], '{y}-{m}-{d}')
    } else {
      form.BeginDate = ''
      form.EndDate = ''
    }
  }
  // 监听筛选
  const typeChange = (val: any) => {
    form.Name = ''
    form.CompId = ''
    form.time = ''
    form.BeginDate = ''
    form.EndDate = ''
  }
  //打开社保详情
  const openSocialSecurityFormWindow = (val: any) => {
    data.SocialSecurityForm.view = true
    if (val) {
      data.SocialSecurityForm.SocialSecurityCompany = val.SocialSecurityCompany
      data.SocialSecurityForm.UserId = val.Id
      data.SocialSecurityForm.Id = val.SocialSecurityId
    }
  }
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
    handleSelectionChange,
    openSocialSecurityFormWindow,
    timeChange,
    typeChange
  }
}
const window = (form: any, data: any, imageRef: any): any => {
  const openImage = () => {
    console.log((imageRef.value.previewTeleported = false))
  }
  // 关闭弹窗
  const closeWindow = (type: string) => {
    data.SocialSecurityForm.view = false
    if (type == 'submit') {
      form.page = 1
      tableRender(form, data)
    }
  }
  return {
    closeWindow,
    openImage
  }
}
export default defineComponent({
  components: {
    TableSearch,
    zStatistic,
    SocialSecurityForm,
    DepTabridge
  },
  props: {},
  setup() {
    var imageRef = ref()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10,
      total: 1,
      BeginDate: '',
      type: '1'
    })
    const data = reactive({
      socialState: [], //社保状态
      deptList: [], //部门数据
      postList: [], //岗位
      // 列表数据
      tableData: [],
      basicSocialInsuranceOptions: [], //社保情况
      ApprovalData: {},
      SocialSecurityForm: {
        view: false
      }
    })
    onMounted(() => {
      // 获取部门列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.deptList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
      // 获取岗位
      store.getPost(2).then((res: any) => {
        data.postList = res
      })
      // 社会保险
      store.getDict('social_security').then((res: any) => {
        data.basicSocialInsuranceOptions = res
      })
      // 社会状态
      store.getDict('hr_social_state').then((res: any) => {
        data.socialState = res
      })
    })
    return {
      form,
      data,
      ...tableRender(form, data),
      ...window(form, data, imageRef),
      imageRef
    }
  }
})
</script>

<style lang="postcss" scoped>
.leaveIndex {
  :deep(.time) {
    border: 1px solid var(--el-border-color);
    border-right: 0;
  }
  :deep(.rounded-r) {
    border-right: 1px solid var(--el-border-color);
  }
}
</style>
