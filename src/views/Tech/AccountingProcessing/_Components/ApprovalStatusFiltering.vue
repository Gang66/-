<template>
  <el-drawer size="34%" :with-header="false" v-model="visibleApprovalStatusFiltering" @close="closeApprovalStatusFiltering" custom-class="bf-drawer">
    <div class="h-12 bg-slate-100 p-3"><i class="iconfont icon-shaixuan inline-block mr-2"></i><span class="">高级筛选</span></div>
    <template v-slot:header>
      <div class="bg-slate-100 p-3">
        <p class="iconfont icon-shujuku inline-block"></p>
        <span class="ml-2">产品清单</span>
      </div>
    </template>
    <div class="p-2 pt-0 tech_AccountingProcessing_Components_ApprovalStatusFiltering">
      <el-tabs v-model="activeName_shai" class="demo-tabs">
        <el-tab-pane :label="item.Name" :name="index" v-for="(item, index) in data.checkTab" :key="index">
          <template #label>
            <span>{{ item.Name }}</span>
            <div class="w-5 h-5 text-white rounded-full bg-red-400 text-center inline-block ml-2 mt-1 leading-5">
              <span class="text-white">{{ data.checkList[item.ListName].length }}</span>
            </div>
          </template>
          <div>
            <div class="">
              <el-checkbox-group v-model="item.ChangeList" size="small">
                <el-checkbox-button v-for="row in data.checkList[item.ListName]" :key="row" :label="row">
                  {{ row }}
                  <div class="w-4 h-4 bg-green-400 text-white text-xs rounded-full inline-block" v-if="index == 0"><span>商</span></div>
                </el-checkbox-button>
              </el-checkbox-group>
            </div>
          </div>
        </el-tab-pane>

        <el-divider />
        
        <template v-for="(item, index) in data.checkTab" :key="index">
          <el-tag  v-for="(tag, idx) in item.ChangeList" :key="idx" class="mx-1 ml-2" closable effect="plain" type="info" @close="handClose(index, idx)">
            {{ tag }}
          </el-tag>
        </template>
        
      </el-tabs>
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch, nextTick } from 'vue'
import type { TabsPaneContext } from 'element-plus'

export default defineComponent({
  emits: ['closeApprovalStatusFiltering'],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    FormData: {
      type: Object,
      default: (()=>{})
    }
  },
  setup(props, context) {
    const data = reactive({
      checkList: <any>[],
      checkTab: <any>[
        {Name: '名称', ListName: 'ProductNames', ChangeList: []},
        {Name: '型号', ListName: 'Models', ChangeList: []},
        {Name: '规格', ListName: 'Specifications', ChangeList: []},
      ]
    })
    const activeName_shai = ref(0)
    const visibleApprovalStatusFiltering = ref(false)
    // 关闭抽屉
    const closeApprovalStatusFiltering = () => {
      context.emit('closeApprovalStatusFiltering', data.checkTab)
    }

    // 探听开关
    watch(props, (newData, oldData) => {
      visibleApprovalStatusFiltering.value = newData.visible
    })
    const Change = (ev: any) => {
      console.log(ev)
    }
    // 关闭任意一个tags
    const handClose = (index: any, idx: any) => {
      data['checkTab'][index]['ChangeList'].splice(idx,1)
    }

    const setCheckList = () => {
      nextTick(()=>{
        data.checkList = props.FormData
        console.log(data.checkList, 888)
      })
    }
    onMounted(()=>{

    })

    return {
      data,
      activeName_shai,
      Change,
      handClose,
      setCheckList,
      closeApprovalStatusFiltering,
      visibleApprovalStatusFiltering
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_AccountingProcessing_Components_ApprovalStatusFiltering {
  :deep(.el-checkbox-button) {
    border-left: 1px solid #dcdfe6;
    margin: 2px;
  }
  :deep(.el-checkbox-button--small .el-checkbox-button__inner) {
    border-radius: 0;
  }
  :deep(.el-divider--horizontal) {
    margin: 20px 0 20px 0 !important;
  }
}
:deep(.el-drawer__header) {
  margin-bottom: 0 !important;
}
</style>
