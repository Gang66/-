<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div>
      <div class="w-460 border rounded-md m-auto mt-4 mb-4">
        <!-- #region  合同审批-->
        <div>
          <div class="w-460 h-10 bg-blue-50 flex p-2">
            <span class="flex-auto text-sm">合同审批</span>
            <el-button size="small" type="danger" plain @click="approvalCancellationClick()"> <i class="iconfont icon-bianji1 mr-1"></i> 撤销审批</el-button>
          </div>

          <el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in data.approvalData" :label="item.title" :name="index" :key="index">
              <div class="pb-4">
                <div class="pl-4 pr-4 pt-3 text-xs flex" v-for="item in data.approvalList" v-if="index == 0">
                  <div class="flex-auto inline-flex">
                    <div class="w-3 h-3 mt-1 mr-2 border-4 border-blue-400 rounded-full"></div>
                    <div>
                      <p class="text-sm">{{ item.name }}</p>
                      <p class="text-xs mt-1 mb-1">申请</p>
                      <p class="text-xs text-gray-400"><i class="iconfont icon-time pr-2" style="font-size: 12px"></i>2022-08-23 10:26</p>
                    </div>
                  </div>
                  <div class="mt-1">
                    <div>
                      <div class="w-3 h-3 mr-1 bg-blue-500 rounded-full inline-block"></div>
                      <span>申请</span>
                    </div>
                    <!-- <div>
                  <div class="w-3 h-3 mr-1 bg-red-500 rounded-full inline-block"></div>
                  <span>驳回</span>
                </div> -->
                    <!-- <div>
                  <div class="w-3 h-3 mr-1 bg-green-500 rounded-full inline-block"></div>
                    <span>通过</span>
                    </div> -->
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- #endregion -->
      </div>
      <div class="w-460 border rounded-md m-auto mt-4 mb-4">
        <!-- #region 备货审批 -->
        <div>
          <div class="w-460 h-10 bg-blue-50 flex p-2">
            <span class="flex-auto text-sm">备货审批</span>
            <el-button size="small" type="danger" plain @click="approvalPreparationClick()"> <i class="iconfont icon-bianji1 mr-1"></i>撤销审批</el-button>
          </div>

          <el-tabs v-model="data.preparationName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane v-for="(item, index) in data.preparationData" :label="item.title" :name="index" :key="index">
              <div class="pb-4">
                <div class="pl-4 pr-4 pt-3 text-xs flex" v-for="item in data.preparationList" v-if="index == 0">
                  <div class="flex-auto inline-flex">
                    <div class="w-3 h-3 mt-1 mr-2 border-4 border-blue-400 rounded-full"></div>
                    <div>
                      <p class="text-sm">{{ item.name }}</p>
                      <p class="text-xs mt-1 mb-1">申请</p>
                      <p class="text-xs text-gray-400"><i class="iconfont icon-time pr-2" style="font-size: 12px"></i>2022-08-23 10:26</p>
                    </div>
                  </div>
                  <div class="mt-1">
                    <div>
                      <div class="w-3 h-3 mr-1 bg-blue-500 rounded-full inline-block"></div>
                      <span>申请</span>
                    </div>
                    <!-- <div>
                  <div class="w-3 h-3 mr-1 bg-red-500 rounded-full inline-block"></div>
                  <span>驳回</span>
                </div> -->
                    <!-- <div>
                  <div class="w-3 h-3 mr-1 bg-green-500 rounded-full inline-block"></div>
                  <span>通过</span>
                </div> -->
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
        <!-- #endregion -->
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { TabsPaneContext, ElMessage, ElMessageBox } from 'element-plus'

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
      activeName: 0,
      approvalData: [{ title: '第1次审批' }, { title: '第2次审批' }, { title: '第3次审批' }],
      approvalList: [
        { title: '第1次审批', name: 'wang' },
        { title: '第2次审批', name: 'liu' },
        { title: '第3次审批', name: 'zhao' }
      ],
      preparationName: 0,
      preparationData: [{ title: '第1次审批' }, { title: '第2次审批' }],
      preparationList: [
        { title: '第1次审批', name: 'wang' },
        { title: '第2次审批', name: 'liu' },
        { title: '第3次审批', name: 'zhao' }
      ]
    })

    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab)
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })
    // 合同审批撤销
    const approvalCancellationClick = () => {
      ElMessageBox.confirm('确定驳回本次合同审批？', '驳回审批', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    // 备货撤销
    const approvalPreparationClick = () => {
      ElMessageBox.confirm('确定驳回本次合同审批？', '驳回审批', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }

    return {
      boxStyle,
      closeWindow,
      data,
      handleClick,
      approvalCancellationClick,
      approvalPreparationClick
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-tabs--top .el-tabs__item.is-top:nth-child(2)) {
  padding-left: 15px;
}
</style>
