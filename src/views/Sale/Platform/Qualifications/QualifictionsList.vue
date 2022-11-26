<template>
  <div class="otherlist">

    <div class="py-2">
      <div class="py-2 text-right flex justify-between">
        <div class="pt-1" style=" font-size: 16px;color: #666;font-weight: 550;">
          资质管理
        </div>
        <div class="flex">
          <el-select v-model="page.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
            <el-option v-for="item in data.Company " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
          </el-select>

          <el-button type="primary" class="butclass ml-2" @click="getlist">
            <svg-icon icon-class='svg-cus_search' />搜索
          </el-button>
          <el-button type="primary" class="addbutclass" @click="openContract">
            <svg-icon icon-class='svg-addzz' />新增企业资质
          </el-button>
        </div>

      </div>

      <!--  <el-select v-model="page.CompanyId" placeholder="请选择使用厂家" class="otherinputwidth">
        <el-option v-for="item in data.Company " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
      </el-select>
      <el-button type="primary" @click="openContract">新增企业资质</el-button> -->
    </div>
    <div class="">
      <el-table :data='data.tableData' @selection-change="handleSelectionChange"
        :header-cell-style='{ background: &apos;#4E8AFC&apos;, color: &apos;#F5F8FF&apos;,height:&apos;50px&apos;, textAlign: &apos;center&apos;,fontWeight:&apos;600&apos; }'
        :cell-style='{ textAlign: &apos;center&apos;,color: &apos;#333&apos;,height:&apos;45px&apos;,padding:&apos;0px&apos; }'>
        <el-table-column type='selection' width='30' />
        <el-table-column type="index" width='60' label='序号'>

        </el-table-column>
        <el-table-column prop='CreateOn' label='添加时间'>
          <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
        </el-table-column>
        <el-table-column label='事业部'>
          <template #default="scope">{{ scope.row.CompName }}</template>
        </el-table-column>
        <el-table-column label='部门'>
          <template #default="scope">{{ scope.row.DeptName }}</template>
        </el-table-column>
        <el-table-column label='添加人'>
          <template #default="scope">{{ scope.row.UserName }}</template>
        </el-table-column>
        <el-table-column label='公司名称'>
          <template #default="scope">{{ retCompanyName(scope.row.CompanyId) }}</template>
        </el-table-column>
        <el-table-column label='文件类型'>
          <template #default="scope">
            <span v-if="scope.row.Type=='自定义'">
              {{scope.row.TypeName}}
            </span>
            <span v-else>
              {{scope.row.Type}}
            </span>
          </template>
        </el-table-column>
        <el-table-column label='文件名称'>
          <template #default="scope">{{ scope.row.FileName }}</template>
        </el-table-column>

        <el-table-column label='操作'>
          <template #default="scope">
            <span class="mr-4 cursor-pointer text-blue-500" @click="editinfo(scope.row)">详情</span>
            <span class="mr-4 cursor-pointer text-red-500" @click="delinfo(scope.row)">删除</span>
          </template>
        </el-table-column>
        <!--  <el-table-column label='订单分析'>
          <template #default="scope"></template>
        </el-table-column>
 -->
      </el-table>
      <div class="flex justify-end">
        <el-pagination small v-model:page-size="page.size" :background="true" layout="prev, pager, next, jumper" :total="page.count" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </div>
    </div>
    <Add :title="ShowChildDialog.title" v-if="ShowChildDialog.show" :ViewType='ShowChildDialog.viewtype' :DataId='ShowChildDialog.dataId' @cancelContract="cancelContract"></Add>
  </div>
</template>
<script lang="ts" setup>
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import { ElMessage, ElMessageBox } from 'element-plus'
import Add from './AddQualifications.vue'
import { GetQualificationsList, GetDelQualifications } from '/@/api/Sale/Platfrom'
import { reactive, ref, onMounted, getCurrentInstance } from 'vue'

const props = defineProps({})
const ShowChildDialog = ref({
  show: false,
  viewtype: 1, //1是新增2是修改3是查看
  dataId: 0,
  title: '新增企业资质'
})

const openContract = () => {
  ShowChildDialog.value.viewtype = 1
  ShowChildDialog.value.show = true
}
const cancelContract = () => {
  ShowChildDialog.value.show = false
  getlist()
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const data = reactive({
  count: 0,
  tableData: [],
  Company: []
})

const page = reactive({
  page: 1,
  size: 10,
  count: 0,
  CompanyId: null
})
//获取报价单位
const GetOrderCompanyEvent = () => {
  GetOrderCompany().then((res) => {
    if (res.code == 1) {
      data.Company = res.data
    }
  })
}
///获取公司名称
const retCompanyName = (val: any) => {
  var res: any = data.Company.find((f: any) => {
    if (f.Id == val) {
      return f
    }
  })
  if (res) {
    return res.Name
  } else {
    return ''
  }
}
const getlist = () => {
  GetQualificationsList(page).then((res) => {
    if (res.code == 1) {
      data.tableData = res.data.list
      page.count = res.data.count
    }
  })
}

const editinfo = (row: any) => {
  if (row.State == 0 || row.State == -2) {
    ShowChildDialog.value.viewtype = 2
    ShowChildDialog.value.title = '编辑其它费'
  } else {
    ShowChildDialog.value.viewtype = 3
    ShowChildDialog.value.title = '企业资质'
  }
  ShowChildDialog.value.dataId = row.Id
  ShowChildDialog.value.show = true
}

const delinfo = (row: any) => {
  ElMessageBox.confirm('确定要删除此条数据吗？', '提醒', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      GetDelQualifications({ Id: row.Id }).then((res) => {
        if (res.code == 1) {
          if (res.data == true) {
            ElMessage.success(res.message)
            getlist()
          } else {
            ElMessage.error(res.message)
          }
        } else {
          ElMessage.error(res.message)
        }
      })
    })
    .catch(() => {})
}

const multipleSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
}
const handleSizeChange = (val: number) => {
  page.size = val
  getlist()
}
const handleCurrentChange = (val: number) => {
  page.page = val
  getlist()
}
onMounted(() => {
  GetOrderCompanyEvent()
  getlist()
})
</script>
<style lang="postcss" scoped>
.otherlist {
  .butclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #468bfd;
    background: #ffffff;
    &:focus {
      background-color: #e3ebf3;
    }
    &:hover {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
    &:active {
      background-color: #e3ebf3;
      border-color: #468bfd;
    }
  }
  .addbutclass {
    .svg-icon {
      margin-right: 3px;
      font-size: 18px;
    }
    border: 1px solid #468bfd;

    color: #fff;
    background: #468bfd;
    &:focus {
      background-color: #3971ce;
    }
    &:hover {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
    &:active {
      background-color: #3971ce;
      border-color: #027aff9e;
    }
  }
  :deep(.el-checkbox__inner) {
    margin-right: 3px;
  }
}
</style>
