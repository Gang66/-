<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div>
      <div class="inline-block pl-4 pr-4 pt-2 pb-6 leading-9">
        <p>
          <span class="mr-4">询价单号</span>
          <span>{{ data.dataList.OrderNo || '-' }}</span>
        </p>
        <p style="width: 340px" class="truncate">
          <span class="mr-4">客户名称</span>
          <el-tooltip :content="data.dataList.ClientName" placement="top" :disabled="getTextLength(data.dataList.ClientName, 16)">
            <span>{{ data.dataList.ClientName }}</span>
          </el-tooltip>
        </p>
        <p class="text-blue-500">
          <span class="mr-4">原技术员</span>
          <span>{{ data.dataList.TechnicistName }}</span>
        </p>
      </div>

      <div class="inline-block float-right pl-4 pr-4 pt-2 pb-6 leading-9">
        <p>
          <span class="mr-4">询价时间</span>
          <span>{{ (data.dataList.ConsultTime || '').substring(0,11) }}</span>
        </p>
        <p>
          <span class="ml-8 mr-4">等级</span>
          <span>{{ data.dataList.GradeCode }}</span>
        </p>
        <p class="text-red-500">
          <span class="mr-4">现调整为</span>
          <span>{{ data.RealName }}</span>
        </p>
      </div>
      <div class="float-right mr-6 mb-4">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="primary" @click="applyForPostponesClick()">确定</el-button>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { useLayoutStore } from '/@/store/modules/layout'
import { ElMessage } from 'element-plus'
import { GetSetTechImEnquiryTechnicistUserSave } from '/@/api/tech/TechIm'

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
    const { getUserInfo } = useLayoutStore()

    const data = reactive({
      dataList: {},
      RealName: '',
      id: 0,
      UserId: 0,
      TechnicistName: ''
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-600',
      boxHeight: ''
    })

    const applyForPostponesClick = () => {
      let datas = {
        Id: data.id,
        UserId: data.UserId
      }
      if (data.RealName == data.TechnicistName) {
        ElMessage.error('自己的询价单无需领取')
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

    // 判断文本是否溢出
    const getTextLength = (text: any, num: any) => {
      let _disabled = <boolean>true
      if (text) {
        if (text.length >= num) {
          _disabled = false
        }
      }
      return _disabled
    }

    onMounted(() => {
      console.log(props.FormData)
      data.dataList = props.FormData.dataList
      data.id = props.FormData.dataList.Id
      data.TechnicistName = props.FormData.dataList.TechnicistName
      data.UserId = getUserInfo.Id
      data.RealName = getUserInfo.RealName
    })
    return {
      boxStyle,
      closeWindow,
      data,
      getTextLength,
      applyForPostponesClick
    }
  }
})
</script>
<style lang="postcss" scoped></style>
