<template>
  <div>
    <div :box-style="boxStyle" :title="title" :is-show="true" @closeWindow="closeWindow">
      <div class="addcredit text-base">
        <div class="salerDialog">
          <el-card class="sale_card" :class="ViewType != 2 && ViewType != 5 ? 'tablecard' : ''">
            <template #header v-if="ViewType != 2 && ViewType != 5">
              <div class="card-header">
                <div class="header-left">竞争对手</div>
                <div class="header-right">
                  <div class="header-right">
                    <div class="flex justify-end">
                      <div class="flex">
                        <el-button v-if="ViewType != 2 && ViewType != 5" size="small" @click="openCompetitor(1, 0)">
                          <el-icon-Plus class="w-4 h-4" />
                          新增
                        </el-button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <div>
              <el-table border :data="data.list" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '24px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '24px', padding: '0px' }" style="width: 100%">
                <el-table-column type="index" width="50" label="序号" />
                <el-table-column prop="Company" label="公司名称" show-overflow-tooltip />
                <el-table-column prop="Attribute" width="100" label="属性" show-overflow-tooltip />
                <el-table-column prop="Relationship" width="100" label="客户关系" show-overflow-tooltip>
                  <template #default="scope"> </template>
                </el-table-column>
                <el-table-column prop="Address" label="公司驻地" show-overflow-tooltip />
                <el-table-column prop="Cooperation" width="80" label="合作状态" show-overflow-tooltip />
                <el-table-column width="80" v-if="data.disabled == false" label="操作">
                  <template #default="scope">
                    <div v-if="ViewType != 5">
                      <span v-if="scope.row.IsSuccess == false" class="cursor-pointer" style="color: #db0c0c" @click="openCompetitor(3, scope.row)">去分析</span>
                      <span v-else class="cursor-pointer" @click="openCompetitor(2, scope.row)">查看</span>
                    </div>
                    <div v-else>
                      <span class="cursor-pointer" @click="openCompetitor(2, scope.row)">查看</span>
                    </div>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="flex justify-end">
              <div>
                <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.totals" @size-change="chandleSizeChange" @current-change="chandleCurrentChange" />
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <AddCompetitor v-if="data.AddCompetitor.view" :DataId="data.AddCompetitor.dataid" :ViewType="data.AddCompetitor.viewtype" :CustomerId="data.AddCompetitor.customerid" :CustomerName="data.AddCompetitor.cusname" :title="data.AddCompetitor.title" @closeWindow="closeCompetitor" />
  </div>
</template>
<script lang="ts" setup>
import AddCompetitor from '../Compete/AddCompetitor.vue'
import { GetCompeteList } from '/@/api/hr/School/PracticalBase'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  CustomerId: {
    type: Number,
    default: 0
  },
  DataId: {
    type: Number,
    default: 0
  },
  CustomerName: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ]
})
const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const mesboxStyle = reactive({
  boxWidth: 'w-900',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const messagelog = reactive({
  View: false,
  CusId: props.CustomerId
})
const showmessage = () => {
  messagelog.View = true
}
const closeshow = () => {
  messagelog.View = false
}
const page = reactive({
  CusId: props.CustomerId,
  size: 10,
  page: 1,
  totals: 0
})

const chandleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const chandleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}

const getlist = () => {
  GetCompeteList(page).then((res) => {
    if (res.code == 1) {
      data.list = res.data.list
      page.totals = res.data.count
    }
  })
}

const data = reactive({
  list: <any>[],
  disabled: false,
  AddCompetitor: {
    dataid: {},
    customerid: 0,
    cusname: '',
    view: false,
    viewtype: 1,
    title: ''
  }
})

const addCompetitor = (val: any) => {
  console.log(val)
  data.list.push(val)
  closeCompetitor()
}
const openCompetitor = (val: any, vdata: any) => {
  data.AddCompetitor.viewtype = val
  data.AddCompetitor.dataid = vdata.Id
  data.AddCompetitor.customerid = props.CustomerId
  data.AddCompetitor.cusname = props.CustomerName
  data.AddCompetitor.title = '新增竞争对手'
  data.AddCompetitor.view = true
}
const closeCompetitor = () => {
  data.AddCompetitor.view = false
  getlist()
}

onMounted(() => {
  getlist()
})
</script>
<style lang="postcss" scoped>
.addcredit {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  .tablecard {
    :deep(.el-card__body) {
      padding: 0px;
    }
  }
}
</style>
