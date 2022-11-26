<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="bf-window-padding">
      <el-row :gutter="10">
        <el-col :md="24" :lg="17">
          <div>
            <div class="bf-font-blue-color mb-2">链接分享</div>
            <el-row :gutter="10">
              <el-col :md="24" :lg="24">
                <div class="InviteContent">
                  <div class="flex items-end">
                    <template>
                      <!-- {{ data.userInfo.Sex == 1 ? "先生" : "女士" }}： -->
                      <span class="leading-none">张晓先生</span>
                    </template>
                  </div>
                  <div class="leading-5 mt-2 text-sm">您好！北方阀门集团初步认为您符合招聘要求，诚邀您前来入职。请点击链接了解公司详情并完善入职信息：</div>
                  <div class="overflow-clip text-sm bf-font-blue-color">{{ data.url }}</div>
                  <div @click="copy" class="bf-warning-color cursor-pointer">复制内容</div>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :md="24" :lg="7">
          <div class="bf-font-blue-color text-center">入职二维码</div>
          <qrcode :url="data.url" v-if="data.url"></qrcode>
        </el-col>
      </el-row>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import qrcode from '/@/components/qrcode/index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, reactive, SetupContext } from 'vue'
import useClipboard from 'vue-clipboard3'
import { ElMessage } from 'element-plus'
export default defineComponent({
  components: {
    OpenWindow,
    qrcode
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    Id: {
      type: Number,
      default: null
    },
    // 跳转H5页面
    url: {
      type: String,
      default: ''
    }
  },
  setup(props, context: SetupContext) {
    const { toClipboard } = useClipboard()
    let data = reactive({
      url: props.url
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 复制路径
    const copy = async () => {
      try {
        await toClipboard(
          // data.userInfo.InviteName +
          //   (data.userInfo.Sex == "1" ? "先生" : "女士") +
          '您好！北方阀门集团初步认为您符合招聘要求，诚邀您前来入职。请点击链接了解公司详情并完善入职信息：' +
            data.url
        )
        ElMessage({
          message: '复制成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
      }
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    return { closeWindow, data, boxStyle, copy }
  }
})
</script>

<style lang="postcss" scoped>
</style>
