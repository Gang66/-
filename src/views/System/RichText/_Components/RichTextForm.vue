 <template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="富文本编译器">
    <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" class="bf-window-padding" hide-required-asterisk>
      <el-row :gutter="10">
        <el-col :md="24" :lg="6">
          <el-form-item label="业务类型" prop="Type">
            <el-input v-model="data.ruleForm.Type" placeholder="请输入业务类型" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="6">
          <el-form-item label="业务名称" prop="Name">
            <el-input v-model="data.ruleForm.Name" placeholder="请输入业务名称" />
          </el-form-item>
        </el-col>
        <el-col :md="24" :lg="6">
          <el-form-item label="业务编码" prop="Code">
            <el-input v-model="data.ruleForm.Code" placeholder="请输入业务编码" />
          </el-form-item>
        </el-col>
        <div v-show="false">{{data.ruleForm.Page=data.tabIndex+''}}</div>
        <el-col :md="24" :lg="6">
          <el-form-item label="业务分页" prop="Page">
            <el-input v-model="data.ruleForm.Page" placeholder="请输入业务分页" disabled />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="tinymce-boxz">
        <Editor v-model="data.ruleForm.Content" :api-key="apiKey" :init="init" />
      </div>
      <div class="bf-search-formItem mt-4">
        <el-form-item class="justify-center" label-width="0">
          <div class="text-center w-full">
            <el-button @click="closeWindow('close')">取 消</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </div>
    </el-form>

  </OpenWindow>
</template>

<script lang="ts">
import Editor from '@tinymce/tinymce-vue'
import { onMounted, SetupContext } from 'vue'
import { reactive, ref, toRefs } from '@vue/reactivity'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { GetRichTextInfo, PostAddEditRichTextSave } from '/@/api/system/richText'
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, Id: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        PostAddEditRichTextSave(data.ruleForm).then((res) => {
          if (res.code == 1) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            closeWindow('submit')
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    // PostName: [{ required: true, message: "请填写岗位名称", trigger: "blur" }],
  })
  return { rules, submitForm, ruleFormRef }
}
export default {
  name: 'About',
  components: {
    Editor,
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    Id: {
      type: Number,
      default: 0
    }
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      ruleForm: {
        Id: props.Id,
        Type: '',
        Name: '',
        Code: '',
        Page: '',
        Content: ''
      },
      editableTabsValue: '1', //分页默认1
      tabIndex: 1, //长度下标
      list: [], //岗位数据
      checkboxGroup: [],
      Id: props.Id
    })
    onMounted(() => {
      // 根据Id获取详情
      if (props.Id) {
        GetRichTextInfo(props.Id).then((res: any) => {
          if (res.code == 1) {
            data.ruleForm = res.data
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1150',
      boxHeight: '',
      boxPaddingTop: 'pt-4',
      boxPaddingBottom: 'pb-0'
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    const content = ref('')
    const tiny = reactive({
      apiKey: 'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc', //https://github.com/tinymce/tinymce-vue/blob/main/src/demo/views/Iframe.vue
      init: {
        language: 'zh_CN', //语言类型
        placeholder: '在这里输入文字', //textarea中的提示信息
        min_width: 320,
        min_height: 220,
        width: 1140,
        height: 670, //注：引入autoresize插件时，此属性失效
        resize: 'both', //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
        branding: false, //tiny技术支持信息是否显示
        // statusbar: false,  //最下方的元素路径和字数统计那一栏是否显示
        // elementpath: false, //元素路径是否显示
        // selectall visualblocks
        font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;', //字体样式
        plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons noneditable template importcss ', //插件配置 axupimgs indent2em
        toolbar: ['fullscreen undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | blockquote subscript superscript removeformat', 'styleselect formatselect fontselect fontsizeselect |  table image axupimgs media emoticons charmap hr pagebreak insertdatetime  searchreplace | code print preview | indent2em lineheight formatpainter template '], //工具栏配置，设为false则隐藏
        templates: [
          {
            title: '员工档案表',
            description: '员工档案表',
            url: '/public/HR/EmployeeFiles.html'
          },
          {
            title: '劳务协议',
            description: '劳务协议',
            url: '/public/HR/serviceAgreement.html'
          },
          {
            title: '劳动合同',
            description: '劳动合同',
            url: '/public/HR/LaborContract.html'
          },
          {
            title: '制度学习及合同条款确认表',
            description: '制度学习及合同条款确认表',
            url: '/public/HR/ClauseconfigForm.html'
          }
        ],
        content_css: '/public/HR/EmployeeFiles.postcss',
        // menubar: "file edit my1", //菜单栏配置，设为false则隐藏，不配置则默认显示全部菜单，也可自定义配置--查看 http://tinymce.ax-z.cn/configure/editor-appearance.php --搜索“自定义菜单”

        // images_upload_url: '/apib/api-upload/uploadimg',  //后端处理程序的url，建议直接自定义上传函数image_upload_handler，这个就可以不用了
        // images_upload_base_path: '/demo',  //相对基本路径--关于图片上传建议查看--http://tinymce.ax-z.cn/general/upload-images.php
        paste_data_images: true, //图片是否可粘贴
        //此处为图片上传处理函数
        images_upload_handler: (blobInfo: any, success: any, failure: any) => {
          // 这里用base64的图片形式上传图片,
          let reader = new FileReader() //本地预览
          reader.readAsDataURL(blobInfo.blob())
          reader.onloadend = function () {
            const imgbase64 = reader.result
            success(imgbase64)
          }
        },

        file_picker_types: 'file image media', //file image media分别对应三个类型文件的上传：link插件，image和axupimgs插件，media插件。想屏蔽某个插件的上传就去掉对应的参数
        // 文件上传处理函数
        file_picker_callback: function (callback: any, value: any, meta: any) {
          // 使用案例http://tinymce.ax-z.cn/general/upload-images.php
          // meta.filetype  //根据这个判断点击的是什么file image media

          let filetype //限制文件的上传类型,需要什么就添加什么的后缀
          if (meta.filetype == 'image') {
            filetype = '.jpg, .jpeg, .png, .gif, .ico, .svg'
          } else if (meta.filetype == 'media') {
            filetype = '.mp3, .mp4, .avi, .mov'
          } else {
            filetype = '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .jpg, .jpeg, .png, .gif, .ico, .svg'
          }
          let inputElem: any = document.createElement('input') //创建文件选择
          inputElem.setAttribute('type', 'file')
          inputElem.setAttribute('accept', filetype)
          inputElem.click()
          inputElem.onchange = () => {
            let file = inputElem.files[0] //获取文件信息

            // 所有都转成base64文件流,来自官方文档https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback
            let reader: any = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = function () {
              // Note: Now we need to register the blob in TinyMCEs image blob
              // registry. In the next release this part hopefully won't be
              // necessary, as we are looking to handle it internally.
              let id = 'blobid' + new Date().getTime()
              let blobCache = tinymce.activeEditor.editorUpload.blobCache
              let base64 = reader.result.split(',')[1]
              let blobInfo = blobCache.create(id, file, base64)

              blobCache.add(blobInfo)

              // call the callback and populate the Title field with the file name
              callback(blobInfo.blobUri(), { title: file.name })
            }
          }
        }
      }
    })
    return {
      content,
      ...toRefs(tiny),
      boxStyle,
      closeWindow,
      data,
      ...formEvent(data, closeWindow)
    }
  }
}
</script>
<style scoped>
.tinymce-boxz > textarea {
  display: none;
}
</style>
<style>
/* 隐藏apikey没有绑定当前域名的提示 */
.tox-notifications-container .tox-notification--warning {
  display: none !important;
}

.tox.tox-tinymce {
  max-width: 100%;
}
</style>
