<template>
  <div class="Tec_ContractApproval">
    <!-- 其他费用管理 -->
    <div class="clearfix pt-1 pr-4 pb-1 pl-0 bg-gray-50 border-b border-gray-200 rounded-t-md">
      <div class="float-left pt-1">
        <span class="ml-4 text-sm">其他费用管理</span>
      </div>
    </div>
    <div class="bg-white pl-4 pr-4 pt-3 relative rounded-b-md mb-6">
      <!-- 搜索框 -->
      <div class="ConsultationList-dow-query clearfix">
        <el-date-picker class="align-bottom mr-4" v-model="form.TimeValue" size="default" type="datetimerange" :shortcuts="data.shortcuts" range-separator="~" start-placeholder="开始时间" end-placeholder="结束时间" style="width: 240px" />
        <el-select v-model="form.ApprovalStatusValue" class="mr-2" placeholder="审批状态" style="width: 120px">
          <el-option v-for="item in data.ApprovalStatusOptions" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-button type="primary" class="ml-2" :icon="Search" @click="search">查询</el-button>
        <div class="float-right mt-px">
          <el-button type="primary" @click="openWindowAddReimbursement(data.selectDetails[0])" :disabled="data.single"> <i class="iconfont icon-chuangjian mr-2"></i>添加报销</el-button>
          <el-button type="info" @click="revoke(data.selectDetails[0])" :disabled="data.single"><i class="iconfont icon-zhongzhi mr-2"></i>撤销审批</el-button>
        </div>
      </div>
      <!-- 表格 -->
      <div class="pb-4">
        <table-search :current-page="form.page" :page-size="form.size" :total="form.totals" @size-change="handleSizeChange" :isAdvancedSearch="false" @current-change="handleCurrentChange">
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe @selection-change="handleSelectionChange">
              <el-table-column type="selection" width="50" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="CreateOn" label="申请时间" width="166" align="center">
                <template #default="scope">{{ scope.row.ConsultTime }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="申请人" width="80">
                <template #default="scope">
                  <span>刘某某</span>
                </template>
              </el-table-column>
              <el-table-column prop="DepartName" label="费用项目" width="100" align="center">
                <template #default="scope">
                  <span>差旅费用</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="申请事由" align="center" min-width="166">
                <template #default="scope">
                  <span>本周末招待来访客户所使用费用</span>
                  <!-- <span>-</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="申请金额" align="center">
                <template #default="scope">
                  <span>100000.00</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="举证" align="center" width="100">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer"> <i class="iconfont icon-zitiyulan"></i> 查看</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="状态" align="center" width="100">
                <template #default="scope">
                  <span class="text-orange-400">审批中</span>
                  <!-- <span class="text-red-500">已驳回</span> -->
                  <!-- <span class="text-green-400">已通过</span> -->
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="款项" align="center" width="100">
                <template #default="scope">
                  <span class="text-gray-400">未发放</span>
                </template>
              </el-table-column>
              <el-table-column prop="WorkAge" label="操作" align="center" width="100">
                <template #default="scope">
                  <span class="text-blue-500 cursor-pointer"> <i class="iconfont icon-zitiyulan"></i>详情</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </table-search>
      </div>
    </div>
    <!-- 添加报销 -->
    <AddReimbursement title="费用报销" v-if="addReimbursementOpenData.visible" :FormData="addReimbursementOpenData.formData" @closeWindow="closeWindowAddReimbursement($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { Search, RefreshLeft } from '@element-plus/icons-vue'
import { parseTime } from '/@/utils/tools'
import { GetEnquiryOrderPage } from '/@/api/tech/EnquiryData'
import TableSearch from '/@/components/TableSearch/index.vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import AddReimbursement from './_Components/AddReimbursement.vue'

// 列表数据请求
const renderTableList = async (form: any, data: any) => {
  await GetEnquiryOrderPage(form).then((res) => {
    console.log(res.data)
    if (res.code == 1) {
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
  // 时间格式转换
  const parseTimeEvent = (val: any) => {
    return parseTime(val, '{y}-{m}-{d} {h}:{i}:{s}')
  }
  const handleSizeChange = (v: number) => (form.size = v) && renderTableList(form, data)
  const handleCurrentChange = (v: number) => (form.page = v) && renderTableList(form, data)
  const indexMethod = (index: number) => (form.page - 1) * form.size + index + 1
  const search = () => {
    form.page = 1
    renderTableList(form, data)
    console.log('ces', form.title)
  }
  // table选择监听
  const handleSelectionChange = (val: any) => {
    data.selectDetails = val
    console.log(data.selectDetails)
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
    parseTimeEvent
  }
}
export default defineComponent({
  components: {
    TableSearch,
    AddReimbursement
  },
  setup() {
    const shortcuts = [
      {
        text: '最近一周',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          return [start, end]
        }
      },
      {
        text: '最近一个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          return [start, end]
        }
      },
      {
        text: '最近三个月',
        value: () => {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          return [start, end]
        }
      }
    ]
    // 筛选数据
    const form = reactive({
      page: 1,
      size: 10,
      QueryTypeId: null,
      TimeValue: '',
      ApprovalStatusValue: ''
    })
    const data = reactive({
      ApprovalStatusOptions: [
        {
          value: '1',
          label: '全部'
        },
        {
          value: '2',
          label: '驳回'
        },
        {
          value: '3',
          label: '待审批'
        },
        {
          value: '4',
          label: '通过'
        }
      ],
      single: true
    })
    // 撤销按钮
    const revoke = (val: any) => {
      ElMessageBox.confirm('确定要撤销该费用审批？', '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage.success('确认审批')
        })
        .catch(() => {
          ElMessage.info('取消审批')
        })
    }
    //添加报销
    const addReimbursementOpen = (data: any) => {
      let addReimbursementOpenData: any = reactive({
        visible: false,
        formData: {}
      })
      //打开弹窗
      const openWindowAddReimbursement = (row: any) => {
        addReimbursementOpenData.formData = {
          selectDetails: row
        }
        addReimbursementOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowAddReimbursement = (type: string) => {
        addReimbursementOpenData.visible = false
      }

      return {
        addReimbursementOpenData,
        openWindowAddReimbursement,
        closeWindowAddReimbursement
      }
    }
    return {
      data,
      form,
      Search,
      ...tableRender(form, data),
      ...addReimbursementOpen({ data }),
      shortcuts,
      revoke
    }
  }
})
</script>

<style lang="postcss" scoped>
.inquiry_components_totalwages {
  @media only screen and (max-width: 1500px) {
    .inquiry_big_img {
      display: none;
    }
  }
}
</style>
