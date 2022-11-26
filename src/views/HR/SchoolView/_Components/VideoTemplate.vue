
<template>
  <div class="relative">
    <!-- url代表课程学习 没有代表课程集市 -->
    <template v-if="!url">
      <el-button type="primary" v-if="data.FileType == 'VIDEO'" class="absolute top-0 left-60 z-50" @click="routerGoEvent">返回</el-button>
      <el-button type="primary" v-else class="absolute top-0 left-10 z-50" @click="routerGoEvent">返回</el-button>
    </template>
    <div v-if="data.FileType == 'VIDEO'">
      <vue3VideoPlay class="m-auto" v-bind="options" @ended="endedEvent" />
      <slot name="footer" />
    </div>
    <div v-else class="mt-2">
      <PDFTemplate ref="PDFTemplateRef" class="justify-center" :url="remoteUrlEvent(data.SavePath)"> </PDFTemplate>
    </div>
  </div>
</template>

<script lang="ts">
import ScoringForm from '../StudyTemplate/_Components/ScoringForm.vue'
import { defineComponent, onMounted, reactive, SetupContext } from 'vue'
import { useRoute } from 'vue-router'
import router from '/@/router/index'
import PDFTemplate from '../_Components/PDFTemplate.vue'
import { remoteUrl } from '/@/utils/tools'
import { GetTrainCourseWareFileInfo } from '/@/api/hr/School/Train'
export default defineComponent({
  components: { ScoringForm, PDFTemplate },
  props: {
    url: {
      type: String,
      default: 'http://192.168.0.194:53785/HrSale/2022/20220630/453689245ce841328d08907b24089bd2.mp4'
    }
  },
  setup(props, context: SetupContext) {
    let route = useRoute()
    const data = reactive({
      Id: route.query.Id,
      FileType: 'VIDEO',
      SavePath: null
    })
    const options = reactive({
      width: '1500px', //播放器高度
      height: '850px', //播放器高度
      color: '#409eff', //主题色
      title: '', //视频名称
      src: props.url, //视频源
      muted: false, //静音
      webFullScreen: false,
      speedRate: ['0.75', '1.0', '1.25', '1.5', '2.0'], //播放倍速
      autoPlay: false, //自动播放
      loop: false, //循环播放
      mirror: false, //镜像画面
      ligthOff: false, //关灯模式
      volume: 0.5, //默认音量大小
      control: true, //是否显示控制
      speed: true, //是否可以拖动
      controlBtns: [
        'audioTrack',
        'quality',
        'speedRate',
        'volume',
        'setting',
        'pip',
        'pageFullScreen'
        // 'fullScreen'
      ] //显示所有按钮,
    })
    // 网址拼接
    const remoteUrlEvent = (val: any) => {
      return '/hr/' + val
      // return remoteUrl(val)
    }
    // 返回上一个页面
    const routerGoEvent = (val: any) => {
      router.go(-1)
    }
    // 播放结束
    const endedEvent = (val: any) => {
      context.emit('endedEvent')
    }
    onMounted(() => {
      // 根据课件Id获取详情
      if (data.Id) {
        GetTrainCourseWareFileInfo(data.Id).then((res: any) => {
          if (res.code == 1) {
            data.FileType = res.data.FileType
            data.SavePath = res.data.SavePath
            options.src = remoteUrl(res.data.SavePath)
          }
        })
      }
    })
    return { options, endedEvent, data, remoteUrlEvent, routerGoEvent }
  }
})
</script>

<style lang="postcss" scoped>
:deep(.d-player-wrap) {
  margin: auto;
}
</style>
