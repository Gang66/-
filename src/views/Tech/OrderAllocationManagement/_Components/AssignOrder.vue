<template>
  <!-- 技术部 -->
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="tech_inquiry_assignorder m-auto">
      <div class="flex flex-wrap max-h-96" style="overflow: auto">
        <template v-for="(item, index) in data.TechnicistUserList" :key="index">
          <div class="w-64 h-28 border rounded-lg m-2 flex p-4 pt-3 pb-1 relative cursor-pointer" @click="column(item.UserId, item.IsCurr)">
            <div class="w-10 h-10 rounded-full relative">
              <img class="w-10 h-10 rounded-full" :src="remoteUrl(item.HeadShot)" alt="" />
              <div class="w-3 h-3 bg-green-500 rounded-full absolute bottom-0 right-0" v-if="item.IsOnline == true"></div>
              <div class="w-3 h-3 bg-gray-400 rounded-full absolute bottom-0 right-0" v-else></div>
            </div>
            <div class="w-32 ml-3.5 text-xs leading-6">
              <div>
                <span class="text-base font-medium">{{ item.RealName }}</span>
              </div>
              <div>
                <span class="text-red-400">超时待办</span><span class="text-red-400">{{ item.OvertimeOrderTotal }}</span> <span class="text-yellow-500">即将超时</span><span class="text-yellow-500">{{ item.WarningOrderTotal }}</span>
              </div>
              <div class="text-gray-400">
                <span>A级</span><span class="ml-1">{{ item.AOrderTotal }}</span> <span class="ml-2">B级</span><span class="ml-1">{{ item.BOrderTotal }}</span> <span class="ml-2">C级</span><span class="ml-1">{{ item.COrderTotal }}</span>
              </div>
            </div>
            <div class="absolute right-0 top-0 w-12 h-12 z-40" v-if="item.IsCurr == true">
              <img src="../../../../assets/img/tech/inquiry/current.png" alt="" />
            </div>
            <el-radio v-if="item.IsCurr != true" v-model="UserListRadio1" :label="item.UserId" size="large" class="ml-4 w-0"></el-radio>
            <div class="absolute bottom-0 left-0">
              <el-progress class="" :percentage="item.OrderProportionRate" type="line" color="#34D399" :stroke-width="5" :text-inside="true" />
            </div>
          </div>
        </template>
      </div>
      <div class="bf-search-formItem mt-4 mb-4 mr-4 float-right">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="SubmitAllocation()">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { GetTechnicistUserList } from '/@/api/tech/EnquiryData'
import { GetSetTechImEnquiryTechnicistUserSave } from '/@/api/tech/TechIm'
import { ElMessage } from 'element-plus'
import { remoteUrl } from '/@/utils/tools'
export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0 //询价单Id
      }
    }
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    const UserListRadio1 = ref()
    // 点击切换用户
    const column = (id: number, IsCurr: any) => {
      if (IsCurr != true) {
        UserListRadio1.value = id
        data.UserId = id
        console.log(id)
      } else {
        return
      }
    }

    let data = reactive({
      TechnicistUserList: [],
      id: 0,
      UserId: 0
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-840',
      boxHeight: ''
    })
    // 获取技术用户列表
    const getTechnicistUserList = async (data: any) => {
      await GetTechnicistUserList(data.id)
        .then((res) => {
          if (res.code == 1) {
            data.TechnicistUserList = res.data || []
            console.log(res)
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch((e) => {
          console.log(`错误：${e}`)
        })
    }
    // 提交分配
    const SubmitAllocation = () => {
      let datas = {
        Id: data.id,
        UserId: data.UserId
      }
      if (UserListRadio1.value == undefined) {
        ElMessage.error('请选择一项！')
        return
      } else {
        GetSetTechImEnquiryTechnicistUserSave(datas).then((res: any) => {
          console.log(res)
          if (res.code == 1) {
            ElMessage.success(res.message)
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    }

    onMounted(() => {
      data.id = props.FormData.Id
      getTechnicistUserList(data)
    })

    return {
      closeWindow,
      data,
      boxStyle,
      column,
      UserListRadio1,
      remoteUrl,
      SubmitAllocation
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_inquiry_assignorder {
  width: 98%;
  .el-progress--line {
    width: 250px;
  }

  :deep(.el-radio.el-radio--large) {
    .el-radio__label {
      color: #ffffff;
    }
  }
  :deep(.el-radio-group) {
    align-items: initial;
  }
}
::-webkit-scrollbar {
  /* 隐藏滚轮 */
  display: none;
}
/*css主要部分的样式*/
</style>
