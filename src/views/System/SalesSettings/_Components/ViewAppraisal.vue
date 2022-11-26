<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="header px-4">
      <!-- <div class="flex mt-6">
        <el-avatar :size="62" src="/src/assets/img/hr/Interview/touxiang.png" />
        <div class="ml-3">
          <div class="flex items-center">
            <div class="mr-2">王某某</div>
            <img src="/src/assets/img/hr/Interview/nv.png" class="mr-4" style="width: 16px; height: 16px" />
            <img src="/src/assets/img/hr/Interview/nv.png" v-if="data.userInfo.Sex == 2" class="mr-4" style="width: 16px; height: 16px" />
            <img src="/src/assets/img/hr/Interview/nan.png" v-else-if="data.userInfo.Sex == 1" class="mr-4" style="width: 16px; height: 16px" />
            <img src="/src/assets/img/hr/Interview/shouji.png" alt="" style="width: 14px; height: 14px" />
            <div class="ml-0.5 mr-4" style="fontsize: 13px">15888888888</div>
            <span> <i class="iconfont icon-shijian text-blue-500 mr-2"></i>2022-11-10 </span>
          </div>
          <div class="flex items-center mt-2.5">
            <div class="dept_bg">招聘部</div>
            <div class="dept_bgTwo">人事经理</div>
          </div>
          <div class="text-sm mt-2">自 <span class="text-orange-400">2021年11月01日</span> 加入这个大家庭，现在是第371天，在新人训获得0分。</div>
        </div>
      </div> -->
      <div class="text-base flex pt-2">
        <p>
          <span class="text-blue-500">人员：</span> <span>{{ data.performanceList.RealName || '-' }}</span>
        </p>
        <p class="ml-10">
          <span class="text-blue-500">启动时间：</span> <span>{{ parseTimeEvent(data.performanceList.StartDate) }}</span>
        </p>
        <p class="ml-10">
          <span class="text-blue-500">备注：</span> <span>{{ data.performanceList.Remarks || '-' }}</span>
        </p>
      </div>

      <div class="bf-table-content">
        <!-- @selection-change="handleSelectionChange" -->
        <el-table :data="data.workloadList" class="w-full" ref="multipleTableRef">
          <el-table-column type="index" label="序号" width="54" align="center" />
          <el-table-column prop="Name" label="考核分类" align="center" min-width="140">
            <template #default="scope">{{ getClass(scope.row.ClassifyTable) }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="考核类型" align="center">
            <template #default="scope">
              <span>{{ getOrderStatus(scope.row.AssesType) }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="Name" label="考核标准" align="center" min-width="140">
            <template #default="scope">{{ getCriteria(scope.row.AssesType) }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="数量" align="center">
            <template #default="scope">{{ scope.row.AmountMin }}</template>
          </el-table-column>
          <el-table-column prop="Name" label="是否关停" align="center">
            <template #default="scope">
              <span v-if="scope.row.IsStop == true">是</span>
              <span v-else>否</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="text-center mt-4 mb-4" v-if="data.type == 1">
        <el-button class="w-20" @click="closeWindow('close')">取 消</el-button>
        <el-button class="w-20" type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句
import { parseTime } from '/@/utils/tools'

//获取字典数据
const getDictionaryData = (data: any) => {
  //获取考核类型
  store.getDict('hr_cycle_type').then((res: any) => {
    data.assessmentType = res
  })
  //获取考核分类
  store.getDict('hr_classifyTable').then((res: any) => {
    data.classification = res
  })
  //获取考核标准
  store.getDict('HR_AssesMark').then((res: any) => {
    data.criteria = res
  })
}

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      type: 0, //1编辑
      workloadList: [],
      assessmentType: [],
      performanceList: [],
      classification: [],
      criteria: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    // 获取考核类型
    const getOrderStatus = (val: number) => {
      let _obj = data.assessmentType.find((x: any) => x.DicKey == val.toFixed(0))
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    // 获取考核分类
    const getClass = (val: number) => {
      let _obj = data.classification.find((x: any) => x.DicKey == val)
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    // 获取考核标准
    const getCriteria = (val: number) => {
      let _obj = data.criteria.find((x: any) => x.DicKey == val.toFixed(0))
      let str = '-'
      if (_obj) str = _obj.DicValue

      return str
    }
    // 时间格式转换
    const parseTimeEvent = (val: any) => {
      return parseTime(val, '{y}-{m}-{d}')
    }

    onMounted(() => {
      console.log(props.FormData)
      // data.workloadList = props.FormData.AssesSettingsItemList
      data.performanceList = props.FormData.performanceList
      data.workloadList = props.FormData.performanceList.AssesSettingsItemList
      data.type = props.FormData.type
      getDictionaryData(data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      getOrderStatus,
      getClass,
      getCriteria,
      parseTimeEvent
    }
  }
})
</script>
<style lang="postcss" scoped></style>
