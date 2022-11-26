<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="tech_orderAllocationManagement__components_rejectOrder">
      <!-- #region  top -->
      <div class="h-32 bg-blue-500">
        <div class="w-600 h-12 ml-8 flex pt-3">
          <div class="w-1/5 h-12 mr-4">
            <div class="w-8 h-8 bg-white rounded-lg inline-block float-left mt-2">
              <img class="w-5 h-5 m-auto mt-2" src="../../../../assets/img/tech/orderallocationmanagement/kehu.png" alt="" />
            </div>
            <div class="inline-block mt-3">
              <span class="text-sm text-white ml-3">客户关系</span>
            </div>
          </div>
          <div class="w-1/5 h-12 mr-4">
            <div class="w-8 h-8 bg-white rounded-lg inline-block float-left mt-2">
              <img class="w-5 h-5 m-auto mt-2" src="../../../../assets/img/tech/orderallocationmanagement/jiage.png" alt="" />
            </div>
            <div class="inline-block mt-3">
              <span class="text-sm text-white ml-3">加价记录</span>
            </div>
          </div>
          <div class="w-1/5 h-12 mr-4">
            <div class="w-8 h-8 bg-white rounded-lg inline-block float-left mt-2">
              <img class="w-5 h-5 m-auto mt-2" src="../../../../assets/img/tech/orderallocationmanagement/hesuan.png" alt="" />
            </div>
            <div class="inline-block mt-3">
              <span class="text-sm text-white ml-3">核算分析</span>
            </div>
          </div>
          <div class="w-1/5 h-12 mr-4">
            <div class="w-8 h-8 bg-white rounded-lg inline-block float-left mt-2">
              <img class="w-5 h-5 m-auto mt-2" src="../../../../assets/img/tech/orderallocationmanagement/fenxi.png" alt="" />
            </div>
            <div class="inline-block mt-3">
              <span class="text-sm text-white ml-3">技术分析</span>
            </div>
          </div>
          <div class="w-1/5 h-12">
            <div class="w-8 h-8 bg-white rounded-lg inline-block float-left mt-2">
              <img class="w-5 h-5 m-auto mt-2" src="../../../../assets/img/tech/orderallocationmanagement/caigou.png" alt="" />
            </div>
            <div class="inline-block mt-3">
              <span class="text-sm text-white ml-3">询价单</span>
            </div>
          </div>
        </div>
      </div>
      <!-- #endregion -->

      <div class="w-600 m-auto bg-white rounded-lg">
        <div class="w-600">
          <div class="w-600 h-14 bg-slate-100 -mt-14 rounded-t-xl">
            <div class="w-460 h-12 m-auto text-sm pt-2 pl-4">
              <span class="text-lg">报价阶段</span>
              <i class="iconfont icon-xiangyou"></i>
              <el-divider direction="vertical" />
              <span>订单创建</span>
              <span> ➨ 加价管理</span>
              <span> ➨ 定期跟踪</span>
              <span> ➨ 订单总结</span>
            </div>
          </div>
          <div class="inline-block w-600 float-left bg-white pb-2">
            <div class="p-4 pt-0">
              <div class="h-72 border mt-4 rounded-b-md" v-infinite-scroll="load" style="overflow: auto">
                <div class="h-28 border-b-2 border-dashed" v-for="(item, index) in data.list" :key="index">
                  <div class="w-3/4 float-left pt-3 pl-3 pb-0">
                    <!-- <el-tag class="mx-1" type="" effect="plain"> 创建沟通 </el-tag> -->
                    <div class="inline-block text-sm ml-3">
                      <span class="mr-3 text-green-500">{{ item.RealName }}</span>
                      <template v-if="item.ReceiveUserList.length > 0">
                        <span class="mr-3">发送</span>
                        <span class="text-orange-500" v-for="row in item.ReceiveUserList">@{{ row.RealName }}</span>
                      </template>
                    </div>
                  </div>

                  <div class="w-1/4 h-10 inline-block text-xs float-right pt-3">
                    <span class="text-green-500" v-if="item.IsRead">已读 </span>
                    <span class="text-gray-400"> {{ item.CreateOn }}</span>
                  </div>
                  <div class="float-left text-sm mt-1 pl-4">
                    <!-- <span>拒接订单：</span>
                    <span>测试测试测试测试测试</span>
                    <el-button type="primary" class="ml-3" plain size="small">拒绝</el-button>
                    <el-button type="danger" plain size="small">取消</el-button> -->
                    <div class="">
                      <!-- <span>沟通对策:</span> -->
                      <span>{{ item.NewsInfo }}</span>
                    </div>
                  </div>
                </div>
              </div>
              <el-form ref="ruleFormRef" :model="data.ruleForm" status-icon :rules="rules" label-width="0" :inline="true">
                <el-form-item prop="NewsInfo" class="w-full" style="margin: 0">
                  <el-input v-model="data.ruleForm.NewsInfo" maxlength="100" placeholder="输入内容" show-word-limit type="textarea" />
                </el-form-item>
                <div class="bg-blue-100 p-4 pt-2 pb-2 rounded-b-md">
                  <span> 接收人员： </span>
                  <el-select v-model="data.ruleForm.AddreUserIds" multiple placeholder="请选择" style="width: 340px">
                    <el-option v-for="item in data.imGroupUserList" :key="item.UserId" :label="item.RealName" :value="item.UserId">
                      <span style="float: left">{{ item.RealName }}</span>
                      <span style="float: right; color: var(--el-text-color-secondary); font-size: 13px">{{ item.RoleName }}</span>
                    </el-option>
                  </el-select>
                  <el-button type="danger" class="ml-3" @click="submitForm(ruleFormRef)">发送</el-button>
                </div>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { GetTechImGroupEnquiryToUserList, PostAddTechImNewsSave, GetTechImNewsPage, PostSetTechImNewsReadTagSave } from '/@/api/tech/TechIm'
import { useLayoutStore } from '/@/store/modules/layout'
import { imStore } from '/@/store/modules/imStore'

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate(valid => {
      if (valid) {
        var info: any = {}

        // 订单作废
        //info.OrderState = -1
        info.OrderState = 0
        info.ApprovalStatus = 0

        // 接收类型 0全员 1指定人员
        info.ReceiveType = 1
        info.AddreUserIds = data.data.ruleForm.AddreUserIds

        // 发送类型 0文字 1图片 2文件 3语音 4视频
        info.SendType = 0
        info.NewsInfo = data.data.ruleForm.NewsInfo

        // 聊天组Id
        info.ImGroupId = data.data.imGroupId

        // 发送者
        info.UserId = data.userInfo.Id

        // 发送消息
        PostAddTechImNewsSave(info).then((res: any) => {
          if (res.code == 1) {
            // 清空消息
            data.data.ruleForm.NewsInfo = ''
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    AddreUserIds: [{ required: true, message: '请选择', trigger: 'blur' }],
    NewsInfo: [{ required: true, message: '请填写', trigger: 'blur' }]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }
  return {
    rules,
    submitForm,
    resetForm,
    ruleFormRef
  }
}

// 获取数据
const getData = async (data: any) => {
  await GetTechImGroupEnquiryToUserList(data.id).then(res => {
    if (res.code == 1) {
      data.imGroupUserList = res.data

      // 获取聊天组Id
      if ((data.imGroupUserList || []).length > 0) {
        data.imGroupId = data.imGroupUserList.find((x: any) => {
          return x.ImGroupId
        }).ImGroupId
      }

      // 获取聊天记录
      getList({ data })
    } else {
      ElMessage.error(res.message)
    }
  })
}

// 获取聊天记录
const getList = async (data: any) => {
  data.data.listQuery.ImGroupId = data.data.imGroupId

  // 最后一页无需查询
  if (parseInt(data.data.listQuery.totals) > 0 && parseInt(data.data.listQuery.page) * parseInt(data.data.listQuery.size) < parseInt(data.data.listQuery.totals)) {
    return false
  }
  await GetTechImNewsPage(data.data.listQuery).then(res => {
    if (res.code == 1) {
      let _list = res.data.records || []
      let _readTagIds: string[] = []
      data.data.listQuery.totals = res.data.totals

      data.data.list.forEach((item: any) => {
        _list.push(item)
      })

      _list.forEach((item: any) => {
        // 未读
        if (!item.IsRead) _readTagIds.push(item.Id)
      })
      data.data.list = _list

      if (parseInt(data.data.page) * parseInt(data.data.size) < parseInt(data.data.totals)) {
        data.data.page = parseInt(data.data.page) + 1
      }

      // 设置已读标记
      if (_readTagIds.length > 0) {
        // 2秒后执行
        setTimeout(async () => {
          await PostSetTechImNewsReadTagSave(_readTagIds)
        }, 2000)
      }
    }
  })
}

export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0 //询价单Id
      }
    }
  },
  setup(props, context: SetupContext) {
    const { getUserInfo } = useLayoutStore()
    const storeIM = imStore()

    const load = () => {}
    const data = reactive({
      id: 0,
      imGroupId: '',
      imGroupUserList: [
        {
          UserId: 0,
          RealName: 0,
          RoleName: ''
        }
      ],
      ruleForm: {
        AddreUserIds: [],
        NewsInfo: ''
      },
      listQuery: {
        page: 1,
        size: 10,
        totals: 0,
        ImGroupId: ''
      },
      list: []
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-620',
      boxHeight: ''
    })

    const socketMessage = { TechEnquiry: <any>{} }
    //订阅状态
    storeIM.$subscribe((mutation, state) => {
      if (state.SocketMessage) {
        if (socketMessage.TechEnquiry != state.SocketMessage.TechEnquiry) {
          if (state.SocketMessage.TechEnquiry && state.SocketMessage.TechEnquiry.Code) {
            // 获取聊天记录
            data.listQuery.page = 1
            data.list = []
            getList({ data })

            console.log('技术询价单', state.SocketMessage.TechEnquiry)
          }
        }
      }
    })

    onMounted(() => {
      data.id = props.FormData.Id
      //获取数据
      getData(data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      ...formEvent({ data, userInfo: getUserInfo, closeWindow }),
      load
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech_orderAllocationManagement__components_rejectOrder {
  :deep(.el-scrollbar__wrap) {
    --tw-bg-opacity: 1;
    background-color: rgba(243, 244, 246, var(--tw-bg-opacity));
  }
  :deep(.el-textarea__inner) {
    line-height: 3.5;
  }
  :deep(.border-b) {
    border-bottom-width: 0;
  }
  ::-webkit-scrollbar {
    /*隐藏滚轮*/
    display: none;
  }
  :deep(.el-form-item__error) {
    margin-left: 126px;
  }
}
</style>
