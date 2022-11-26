<!--
 * @Author: ZHJ
 * @Date: 2022-08-23 10:53:58
 * @LastEditTime: 2022-09-17 09:34:54
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\SchoolView\_Components\PDFTemplate.vue
 * 版权声明
-->
<template>
  <!-- <div class="pageNum">{{data.currentPageNum}} / {{data.pdfPages}}页</div> -->
  <div class="pdf-viewer relative" @scroll="onScroll" v-loading="loading">
    <template v-for="item in  data.pdfPages" :key="item">
      <canvas class="pdf-item" :id="`pdf-canvas-${item}`" />
    </template>
  </div>
  <slot name="note"></slot>
</template>
 
<script lang="ts">
import * as PDF from 'pdfjs-dist'
import entry from 'pdfjs-dist/build/pdf.worker.entry' // 引入时会报红线错误，不影响运行， 或在index.d.ts中声明declare
import url from '/@/assets/img/hr/SchoolView/home/9e3a9c734ce648989e8fe701c48e7a5a.pdf'
import { defineComponent, toRefs, nextTick, reactive, toRaw } from '@vue/runtime-core'
import { ref, SetupContext } from 'vue'
import { ElLoading } from 'element-plus'
/**
 * 帮助文档:HelpPage
 * ==========================================
 */
export default defineComponent({
  props: {
    url: {
      type: String,
      default: ''
    } // pdf文件路径
  },
  code: '帮助文档',
  name: 'HelpPage',
  components: {},
  emits: ['watchPDFEvent'],
  setup(props, context: SetupContext) {
    var loading = ref(true)
    const data = reactive<any>({
      pdfPath: props.url, //本地PDF文件路径放在/public中
      pdfPages: [], // 页数
      pdfWidth: '', // 宽度
      pdfSrc: '', // 地址
      pdfDoc: '', // 文档内容
      pdfScale: 1.0, // 放大倍数
      zoom: 10, // 目前暂时采用css方式缩放页面
      currentPageNum: 0
    })
    PDF.GlobalWorkerOptions.workerSrc = entry
    const loadFile = (url: string) => {
      let loadingTask = PDF.getDocument(url)
      loadingTask.promise.then((pdf: any) => {
        data.pdfDoc = pdf
        data.pdfPages = pdf.numPages
        data.currentPageNum = 1
        nextTick(() => {
          renderPage(1)
        })
      })
    }
    const renderPage = (num: number) => {
      toRaw(data.pdfDoc)
        .getPage(num)
        .then((page: any) => {
          const canvas: any = document.getElementById(`pdf-canvas-${num}`)
          const ctx = canvas.getContext('2d')
          let dpr = window.devicePixelRatio || 1
          let bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1
          let ratio = dpr / bsr
          let viewport = page.getViewport({ scale: data.pdfScale })
          canvas.width = viewport.width * ratio
          canvas.height = viewport.height * ratio
          // canvas.style.width = viewport.width + "px";
          // canvas.style.height = viewport.height + "px";
          canvas.style.width = '100%'
          canvas.style.height = '100%'
          data.pdfWidth = viewport.width + 'px'
          ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
          // 将 PDF 页面渲染到 canvas 上下文中
          let renderContext = {
            canvasContext: ctx,
            viewport: viewport
          }
          page.render(renderContext)
          if (data.pdfPages > num) {
            renderPage(num + 1)
          } else {
            setTimeout(() => {
              loading.value = false
            }, 1000)
          }
        })
    }
    const onScroll = (e: any) => {
      let pages: any = document.getElementsByClassName('pdf-item')
      for (let i = 0; i < data.pdfPages; i++) {
        let offset = e.target.offsetHeight / 2 - 100 // 距顶部的距离(当前页在滚动到页面可视区的哪个位置时更改currentPageNum)
        if (e.target.scrollTop >= (pages[i].offsetTop * data.zoom) / 10 - offset) {
          if ((pages[i + 1] && e.target.scrollTop < (pages[i + 1].offsetTop * data.zoom) / 10 - offset) || !pages[i + 1]) {
            data.currentPageNum = i + 1
            context.emit('watchPDFEvent', data)
          }
        }
      }
    }
    loadFile(data.pdfPath)
    return { PDF, renderPage, loadFile, data, onScroll, loading }
  }
})
</script>
 
<style lang="postcss" scoped>
.pdf-viewer {
  padding: 0px 0px 0px;
  overflow-y: auto;
  background-color: #f5f5f5;
  height: 89.2vh;
  .pdf-item {
    width: 100% !important;
    height: auto !important;
  }
}
.tool-bar {
  z-index: 2;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 45px;
  line-height: 45px;
  color: #fff;
  padding: 0 20px;
  background-color: rgba(85, 85, 85, 0.6);
  display: flex;
  justify-content: flex-end;
  .pageNum {
    flex: 1;
    font-size: 17px;
  }
  .txt {
    font-size: 16px;
    padding-right: 5px;
    margin-left: 20px;
  }
  .box {
    position: relative;
    margin-top: 5px;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background-color: #3476fe;
    border-radius: 50%;
    .van-icon {
      vertical-align: middle;
      font-weight: bold;
    }
    .mask {
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(109, 109, 109, 0.7);
      border-radius: 50%;
    }
  }
}
</style>