<template>
  <div>
    <div>
      <el-card class="sale_card">
        <el-table border :data="messagelist" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '24px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '24px', padding: '0px' }" style="width: 100%">
          <el-table-column type="index" width="60" label="序号" />
          <el-table-column prop="CreateOn" label="录入时间">
            <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
          </el-table-column>
          <el-table-column prop="ConName" label="联系人" />
          <el-table-column prop="Integral" label="评分">
            <template #default="scope">
              <span v-if="scope.row.Integral">{{ scope.row.Integral }}</span>
              <span v-else>未评定</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template #default="scope">
              <span class="text-blue-400 cursor-pointer" @click="checkSentiment(scope.row)">查看</span>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex justify-end">
          <div>
            <el-pagination small v-model:page-size="change.size" :background="true" layout="prev, pager, next, jumper" :total="change.totals" @size-change="chandleSizeChange" @current-change="chandleCurrentChange" />
          </div>
        </div>
      </el-card>
    </div>
    <IntelligenceMsg v-if="data.AddCommunicate.view" :ViewType="data.AddCommunicate.viewtype" :DataId="data.AddCommunicate.dataid" :CustomerName="data.AddCommunicate.CusName" @closeWindow="closeCommunicate" />
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted } from 'vue'
import { GetCusCommunicateList } from '/@/api/hr/School/PracticalBase'
import IntelligenceMsg from './IntelligenceMsg.vue'

const props = defineProps({
  CustomerId: {
    type: Number,
    default: 0
  }
})
const data = reactive({
  AddCommunicate: {
    CusName: '',
    view: false,
    dataid: 0,
    viewtype: 1,
    title: ''
  }
})
const messagelist = ref<any[]>([])
const change = reactive({
  size: 10,
  page: 1,
  totals: 0,
  CusId: 0
})
const getchangelist = () => {
  change.CusId = props.CustomerId
  GetCusCommunicateList(change).then((res) => {
    if (res.code == 1) {
      messagelist.value = res.data.list
      change.totals = res.data.count
    }
  })
}

const chandleSizeChange = (val: number) => {
  change.size = val
  getchangelist()
}
const chandleCurrentChange = (val: number) => {
  change.page = val
  getchangelist()
}
const checkSentiment = (val: any) => {
  data.AddCommunicate.viewtype = 5
  data.AddCommunicate.CusName = val.Name
  data.AddCommunicate.dataid = val.Id
  data.AddCommunicate.view = true
}

const closeCommunicate = () => {
  data.AddCommunicate.view = false
  getchangelist()
}

onMounted(() => {
  getchangelist()
})
</script>

<style lang="postcss" scoped>
.addcontact {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  :deep(.el-card__body) {
    padding: 0px;
  }
  :deep(.el-radio__input.is-disabled + span.el-radio__label) {
    font-size: 12px;
    color: var(--el-radio-text-color);
  }
  :deep(.el-radio__input.is-disabled.is-checked .el-radio__inner::after) {
    background-color: var(--el-disabled-bg-color);
  }
  :deep(.el-radio__input.is-disabled.is-checked .el-radio__inner) {
    border-color: var(--el-color-primary);
    background: var(--el-color-primary);
  }

  .cancelbut {
    background: #ffffff;
    border: 1px solid #707070;
    color: #666666;
    &:hover {
      background-color: rgba(255, 255, 255, 0.966);
      border-color: rgba(2, 122, 255, 0.2);
    }
    &:active {
      background-color: rgba(255, 255, 255, 0.966);
      border-color: rgba(2, 122, 255, 0.2);
    }
  }
  .el-radio-group {
    .el-radio {
      margin-right: 10px;
    }
  }
  .headerbut {
    width: 20px;
    height: 20px;
    color: #ffffff;
    border-radius: 10px;
    text-align: center;
    line-height: 20px;
    margin-right: 5px;
    background: #a8abb2;
  }
  .inputclass {
    width: 190px;
    height: 32px;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  .el-form-item__label {
    color: #303133;
  }

  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 3.5rem;
  }
}
</style>
