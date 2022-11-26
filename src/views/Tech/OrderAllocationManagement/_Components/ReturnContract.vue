<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="bg-slate-100 tech_OrderAllocationManagement_ReturnContract">
      <img class="" src="../../../../assets/img/tech/hesuan.png" alt="" />
      <div>
        <div class="w-600 bg-white m-auto rounded-t-md absolute top-5 left-6">
          <p class="p-4 pl-8 inline-block">沟通记录栏</p>
          <p class="float-right p-4 pr-8 cursor-pointer"><span class="text-sm text-green-500">置顶</span><span class="text-sm text-blue-400 ml-4">重要</span></p>
          <div class="w-540 border m-auto h-60" style="overflow: auto">
            <div class="border-b border-dashed clearfix" v-for="item in 6">
              <div class="p-4 pt-2 pb-2 leading-8 float-left text-sm">
                <p>庄小沙(合约专员)</p>
                <p>提报审批</p>
              </div>
              <div class="p-4 pt-2 pb-2 leading-8 float-right text-xs">
                <p class="text-gray-400"><span class="text-green-500 mr-3">已读</span> 2022-06-07 15:07</p>
              </div>
            </div>
          </div>
          <div class="p-4 pl-7 pr-7">
            <el-input v-model="textarea" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
          </div>
          <div class="bg-blue-100 p-4 pt-2 pb-2 rounded-b-md">
            <span> 回复人员： </span>
            <el-select v-model="value" class="m-2" placeholder="请选择" style="width: 300px">
              <el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <el-checkbox v-model="data.CommunicationChecked" label="重点沟通" size="large" />
            <el-button type="danger" class="ml-3">回复</el-button>
          </div>
        </div>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { InfoFilled } from '@element-plus/icons-vue'

export default defineComponent({
  components: {
    OpenWindow,
    InfoFilled
  },
  setup(props, context: SetupContext) {
    const value = ref([])

    const textarea = ref('')
    const data = reactive({
      input: '',
      value: '',
      CommunicationChecked: false
    })
    const cities = [
      {
        value: '软件部',
        label: 'liu某某'
      },
      {
        value: '技术部',
        label: '忘'
      },
      {
        value: '财务部',
        label: '某某'
      },
      {
        value: 'Chengdu',
        label: '武某'
      },
      {
        value: 'Shenzhen',
        label: 'Shenzhen'
      },
      {
        value: 'Guangzhou',
        label: 'Guangzhou'
      }
    ]
    const count = ref(0)
    const load = () => {
      count.value += 2
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-650',
      boxHeight: ''
    })

    return {
      boxStyle,
      closeWindow,
      data,
      textarea,
      value,
      cities,
      load,
      count
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_OrderAllocationManagement_ReturnContract {
  height: 500px;
  :deep(.el-collapse-item__header) {
    background: #fbfbfbbf;
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
}
</style>
