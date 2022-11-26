import { createApp } from 'vue'
import App from '/@/App.vue'
import ElementPlus from 'element-plus'
import direct from '/@/directive/index'
import router from '/@/router/index'
import { pinia } from '/@/store'
import '/@/permission'
import '/@/assets/css/index.css'
import '/@/assets/font-face/index.css'
import * as echarts from 'echarts'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'
import 'nprogress/nprogress.css'
import 'virtual:svg-icons-register'
import SvgIcon from '/@/components/SvnIcon/index.vue'
import '/@/assets/css/Iconfont/iconfont.css'
import '/@/assets/css/common.css'
import print from 'vue3-print-nb'
import * as ElIcons from '@element-plus/icons-vue'
import vue3PreviewImage from 'vue3-preview-image'
import vue3videoPlay from 'vue3-video-play' // 引入组件
import 'vue3-video-play/dist/style.css' // 引入css
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import 'dayjs/locale/zh-cn'
const app = createApp(App)
app.use(vue3videoPlay)
direct(app)
app.use(print)
app.use(ElementPlus, {
  locale: zhCn
})

app.use(pinia)
app.use(vue3PreviewImage)
app.config.globalProperties.$echarts = echarts
app.component('SvgIcon', SvgIcon)
directives: {
  print
}
const ElIconsData = ElIcons as unknown as Array<() => Promise<typeof import('*.vue')>>
for (const iconName in ElIconsData) {
  app.component(`ElIcon${iconName}`, ElIconsData[iconName])
}
app.use(router).mount('#app')
// app.mount('#app')
