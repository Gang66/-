<template>
  <div class="bf-fillet" v-if="JSON.stringify(data.userInfo) != '{}'">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" :title="data.Type == 0 ? 'HR评测表' : data.Type == 1 ? '初试评测表' : '复试评测表'">
      <div class="bf-window-padding">
        <!-- 面试者信息 -->
        <header class="vs-header">
          <div class="flex justify-between items-center">
            <div class="flex items-center">
              <div class="hr"></div>
              <div class="title">面试者信息</div>
            </div>
            <div v-if="data.interViewInfo.InterManageInfo?.OneKeyEmployment" class="-mt-2">
              <div class="ml-2 flex items-baseline">
                <div class="text-sm mr-1 text-center">面试结果</div>
                <div class="text-lg text-red-400">一键录用</div>
              </div>
            </div>
            <div class="flex items-baseline" v-else>
              <div class="flex items-baseline">
                <div class="text-sm bf-text-color-regular">综合评分</div>
                <div class="ml-1 text-xl text-red-400 font-medium text-center" v-if="data.interViewInfo.InterManageInfo">{{ data.interViewInfo.InterManageInfo.synthesize }}</div>
              </div>
              <div class="ml-2 flex items-baseline">
                <div class="text-sm mr-1 bf-text-color-regular">面试结果</div>
                <div class="text-lg text-gray-600 font-medium h-8" v-if="!data.interViewInfo.InMarkInfo">出具中</div>
                <div class="text-lg text-gray-600 font-medium h-8" v-else-if="!data.interViewInfo.HrMarkInfo">出具中</div>
                <div class="text-lg text-red-400 font-medium" v-else-if="data.interViewInfo.InterManageInfo">{{ data.interViewInfo.InterManageInfo.synthesize >= 60 ? '合格' : '淘汰' }}</div>
              </div>
            </div>
          </div>
          <div class="mt-1 flex place-items-center justify-between">
            <div class="flex items-center">
              <el-avatar :size="62" :src="data.avatar" />
              <div class="ml-3">
                <div class="flex items-center">
                  <div class="mr-1">{{ data.userInfo.ApplyName }}</div>
                  <img src="/src/assets/img/hr/Interview/nv.png" v-if="data.userInfo.Sex == 2" class="mr-4" style="width: 16px; height: 16px" />
                  <img src="/src/assets/img/hr/Interview/nan.png" v-else-if="data.userInfo.Sex == 1" class="mr-4" style="width: 16px; height: 16px" />
                  <img src="/src/assets/img/hr/Interview/shouji.png" alt="" style="width: 14px; height: 14px" />
                  <div class="ml-0.5 mr-4" style="fontsize: 13px">{{ data.userInfo.PhoneNumber }}</div>
                  <img src="/src/assets/img/hr/Interview/time.png" alt="" style="width: 13px; height: 14px" />
                  <div class="text-sm ml-1" style="fontsize: 13px">{{ data.userInfo.ApplyDate }}</div>
                </div>
                <div class="flex items-center mt-2.5">
                  <div class="dept_bg">{{ data.userInfo.ParentDeptName }}</div>
                  <div class="dept_bg">{{ data.userInfo.DeptName }}</div>
                  <div class="dept_bgTwo">{{ data.userInfo.PostName }}</div>
                </div>
              </div>
            </div>
            <div>
              <div class="mr-4">
                <qrcode :url="data.url" v-if="data.url" :QRMargin="1" :QRWidth="62" :QRHeight="62"></qrcode>
                <div class="text-sm bf-font-blue-color cursor-pointer text-center" @click="copy">复制链接</div>
              </div>
            </div>
          </div>
        </header>
        <template v-if="data.interViewInfo.InterManageInfo?.OneKeyEmployment">
          <div class="flex items-center mt-2">
            <div class="flex items-center">
              <div class="hr"></div>
              <div class="title">一键录入原因</div>
            </div>
          </div>
          <div class="text-sm mt-2">
            {{ data.interViewInfo.InterManageInfo.OneKeyComment }}
          </div>
        </template>
        <template v-else>
          <!--  评分内容-->
          <div class="mt-2">
            <div class="flex items-center">
              <div class="flex items-center">
                <div class="hr"></div>
                <div class="title">成绩单</div>
              </div>
            </div>
            <div class="vs-content" v-if="data.interViewInfo.InterManageInfo">
              <div>
                <div class="text-center">
                  <span class="num">{{ data.interViewInfo.InterManageInfo.synthesize }}</span>
                  <span class="wnum">/100</span>
                </div>
                <div class="title mt-1">综合评分</div>
              </div>
              <div>
                <div class="text-center">
                  <span class="num">{{ data.interViewInfo.InterManageInfo.CompanyScore }}</span>
                  <span class="wnum">/30</span>
                </div>
                <div class="title mt-1">集团评分</div>
              </div>
              <div>
                <div class="text-center">
                  <span class="num">{{ data.interViewInfo.InterManageInfo.CharacterScore }}</span>
                  <span class="wnum">/20</span>
                </div>
                <div class="title mt-1">性格评分</div>
              </div>
              <div>
                <div class="text-center">
                  <span class="num">{{ data.interViewInfo.InterManageInfo.MentalityScore }}</span>
                  <span class="wnum">/10</span>
                </div>
                <div class="title mt-1">心态评分</div>
              </div>
              <div>
                <div class="text-center">
                  <span class="num">{{ data.interViewInfo.InterManageInfo.HrMarkPoint }}</span>
                  <span class="wnum">/10</span>
                </div>
                <div class="title mt-1">HR评分</div>
              </div>
              <div>
                <div class="text-center">
                  <span class="num">{{ data.Type == 2 ? data.interViewInfo.InterManageInfo.SecMarkPoint : data.interViewInfo.InterManageInfo.InMarkPoint }}</span>
                  <span class="wnum">/30</span>
                </div>
                <div class="title mt-1">面试官评分</div>
              </div>
            </div>
          </div>
          <div class="mt-4" v-if="data.interViewInfo.HrMarkInfo">
            <div class="flex items-center">
              <div class="flex items-center">
                <div class="hr"></div>
                <div class="title">HR评分</div>
              </div>
            </div>
            <div class="vs-content" style="padding: 0px">
              <div v-for="(item, index) in data.interViewInfo.HrMarkInfo.MarkOptions">
                <div class="content-bg h-8 pl-4" :style="{ width: index == 0 ? '143px' : index == 1 ? '143px' : index == 2 ? '276px' : index == 3 ? '146px' : '' }">
                  <div class="title truncate bf-text-color-primary" style="line-height: 2rem; text-align: left">{{ item.QuestionJson.Name }}</div>
                </div>
                <template v-for="(v, i) in item.QuestionJson.Options" :key="i">
                  <div class="text-left pl-4 text-sm mt-1 truncate bf-text-color-regular" v-if="item.Score == v.Score">
                    {{ v.Name }}
                  </div>
                </template>
              </div>
            </div>
            <div class="vs-content" style="padding: 0px; margin-top: 0">
              <div>
                <div class="content-bg h-8 pl-4" style="width: 143px">
                  <div class="title truncate" style="line-height: 2rem; text-align: left">薪酬类型</div>
                </div>
                <div class="text-left pl-4 text-sm mt-1 truncate bf-text-color-regular">
                  <template v-for="item in data.payType" :key="item.DicKey">
                    <template v-if="item.DicKey == data.interViewInfo.HrMarkInfo.PayType">
                      {{ item.DicValue }}
                    </template>
                  </template>
                </div>
              </div>
              <div>
                <div class="content-bg h-8 pl-4" style="width: 143px">
                  <div class="title truncate" style="line-height: 2rem; text-align: left">正式薪酬</div>
                </div>
                <div class="text-left text-sm mt-1 truncate pl-4 bf-text-color-regular">{{ data.interViewInfo.HrMarkInfo.FormalPay }}元</div>
              </div>
              <div>
                <div class="content-bg h-8 pl-4" style="width: 276px">
                  <div class="title truncate" style="line-height: 2rem; text-align: left">试用薪酬</div>
                </div>
                <div class="text-left text-sm mt-1 truncate pl-4 bf-text-color-regular">
                  {{ data.interViewInfo.HrMarkInfo.TryPay }}
                </div>
              </div>
              <div>
                <div class="content-bg h-8 pl-4" style="width: 146px">
                  <div class="title truncate" style="line-height: 2rem; text-align: left">试用期限</div>
                </div>
                <div class="text-left text-sm mt-1 truncate pl-4 bf-text-color-regular">
                  <template v-for="item in data.trialTime" :key="item.DicKey">
                    <template v-if="item.DicKey == data.interViewInfo.HrMarkInfo.TryTime">
                      {{ item.DicValue }}
                    </template>
                  </template>
                </div>
              </div>
              <!-- <div>
                <div class="content-bg h-8 pl-4" style="width:182px">
                  <div class="title truncate" style="line-height:2rem;text-align:left;"> </div>
                </div>
                <div class="text-left text-sm mt-1 truncate pl-4 bf-text-color-regular">

                </div>
              </div> -->
            </div>
            <div class="vs-content" style="display: block; padding: 0">
              <div class="content-bg h-8 pl-4">
                <div class="title truncate" style="line-height: 2rem; text-align: left">薪酬备注</div>
              </div>
              <div class="text-left text-sm mt-1 pl-4 bf-text-color-regular break-words">
                {{ data.interViewInfo.HrMarkInfo.PayRemark }}
              </div>
            </div>
            <div class="vs-content" style="display: block; padding: 0">
              <div class="content-bg h-8 pl-4">
                <div class="title truncate" style="line-height: 2rem; text-align: left">综合评语</div>
              </div>
              <div class="text-left text-sm mt-1 pl-4 bf-text-color-regular break-words">
                {{ data.interViewInfo.HrMarkInfo.Comment }}
              </div>
            </div>
          </div>
          <div class="mt-4" v-if="data.interViewInfo.InMarkInfo">
            <div class="flex items-center">
              <div class="flex items-center">
                <div class="hr"></div>
                <div class="title">面试官评分</div>
              </div>
            </div>
            <template v-if="data.Type == 1">
              <div class="vs-content" style="padding: 0px; margin-top: 6px">
                <div v-for="(item, index) in data.interViewInfo.InMarkInfo.MarkOptions">
                  <div class="content-bg h-8 pl-4" :style="{ width: '118px' }">
                    <div class="title truncate" style="line-height: 2rem; text-align: left">{{ item.QuestionJson.Name }}</div>
                  </div>
                  <template v-for="(v, i) in item.QuestionJson.Options" :key="i">
                    <div class="text-left pl-4 text-sm mt-1 truncate bf-text-color-regular" v-if="item.Score == v.Score">
                      {{ v.Name }}
                    </div>
                  </template>
                </div>
              </div>
              <div class="vs-content" style="display: block; padding: 0">
                <div class="content-bg h-8 pl-4">
                  <div class="title truncate" style="line-height: 2rem; text-align: left">面试官综合评语</div>
                </div>
                <div class="text-left text-sm mt-1 pl-4 bf-text-color-regular break-words">
                  {{ data.interViewInfo.InMarkInfo.Comment }}
                </div>
              </div>
            </template>
            <template v-else>
              <div class="vs-content" style="padding: 0px; margin-top: 6px">
                <div v-for="(item, index) in data.interViewInfo.SecMarkInfo.MarkOptions">
                  <div class="content-bg h-8 pl-4" :style="{ width: '118px' }">
                    <div class="title truncate" style="line-height: 2rem; text-align: left">{{ item.QuestionJson.Name }}</div>
                  </div>
                  <template v-for="(v, i) in item.QuestionJson.Options" :key="i">
                    <div class="text-left pl-4 text-sm mt-1 truncate bf-text-color-regular" v-if="item.Score == v.Score">
                      {{ v.Name }}
                    </div>
                  </template>
                </div>
              </div>
              <div class="vs-content" style="display: block; padding: 0">
                <div class="content-bg h-8 pl-4">
                  <div class="title truncate" style="line-height: 2rem; text-align: left">面试官综合评语</div>
                </div>
                <div class="text-left text-sm mt-1 pl-4 bf-text-color-regular">
                  {{ data.interViewInfo.SecMarkInfo.Comment }}
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import ceshiTwo from '/@/assets/img/hr/Interview/touxiang.png'
import qrcode from '/@/components/qrcode/index.vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import { ElMessage } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetApplicationRegInfo, GetInterViewerAssessmentInfo } from '/@/api/hr/Interview'
import useClipboard from 'vue-clipboard3'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    // 根据面试Id获取登记表详情
    GetApplicationRegInfo(data.Id).then((res) => {
      if (res.code == 1) {
        data.userInfo = res.data
      }
    })
    // 根据面试Id获取评测表详情
    GetInterViewerAssessmentInfo(data.Id).then((res) => {
      if (res.code == 1) {
        if (!res.data.InterManageInfo.OneKeyEmployment) {
          if (data.Type == 2) {
            res.data.InterManageInfo.synthesize = res.data.InterManageInfo.CharacterScore + res.data.InterManageInfo.CompanyScore + res.data.InterManageInfo.HrMarkPoint + res.data.InterManageInfo.SecMarkPoint + res.data.InterManageInfo.MentalityScore
          } else {
            res.data.InterManageInfo.synthesize = res.data.InterManageInfo.CharacterScore + res.data.InterManageInfo.CompanyScore + res.data.InterManageInfo.HrMarkPoint + res.data.InterManageInfo.InMarkPoint + res.data.InterManageInfo.MentalityScore
          }
          res.data.HrMarkInfo.MarkOptions.forEach((val: any) => {
            val.QuestionJson = JSON.parse(val.QuestionJson)
          })
          if (res.data.InMarkInfo) {
            res.data.InMarkInfo.MarkOptions.forEach((val: any) => {
              val.QuestionJson = JSON.parse(val.QuestionJson)
            })
          }
          if (res.data.SecMarkInfo.MarkOptions) {
            res.data.SecMarkInfo.MarkOptions.forEach((val: any) => {
              val.QuestionJson = JSON.parse(val.QuestionJson)
            })
          }
        }
        data.interViewInfo = res.data
      }
    })
  }
  // 获取试用期数据
  store.getDict('hr_trial_time').then((res: any) => {
    data.trialTime = res
  })
  // 获取薪酬类型
  store.getDict('hr_pay_type').then((res: any) => {
    data.payType = res
  })
}
export default defineComponent({
  components: {
    OpenWindow,
    qrcode
  },
  emits: ['closeWindow'],
  props: {
    //父类传递过来的打分类型  0:hr 1:初试官 2:复试官
    Type: {
      type: Number,
      default: 0
    },
    // 用户id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    const { toClipboard } = useClipboard()
    let data = reactive({
      avatar: ceshiTwo, //头像图片
      interViewInfo: {}, //测评信息
      Id: props.Id, // 查看详情id
      // 用户信息
      userInfo: {},
      // 薪酬类型
      payType: [],
      //试用期
      trialTime: [],
      //  0:hr 1:初试官 2:复试官
      Type: props.Type,
      url: `${import.meta.env.VITE_HR_H5}#/pages/sysUser/mark/view?Id=` + props.Id + '&Type=' + props.Type
    })
    // 有效期限只能选择当前时间之后
    const disabledDate = (time: Date) => {
      return time.getTime() < Date.now() - 8.64e7
    }
    // 复制路径
    const copy = async () => {
      try {
        await toClipboard(data.url)
        ElMessage({
          message: '复制成功',
          type: 'success'
        })
      } catch (e) {
        console.error(e)
      }
    }
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-740',
      boxHeight: ''
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return {
      boxStyle,
      data,
      closeWindow,
      disabledDate,
      copy
    }
  }
})
</script>

<style lang="postcss" scoped>
.hr {
  width: 4px;
  height: 16px;
  background: #468bfd;
}

.title {
  margin-left: 6px;
  font-size: 14px;
  color: var(--el-text-color-primary);
  line-height: 1;
}

header {
  .h_bg {
    .hb-left {
      width: 80%;
      padding: 14px 12px 14px 12px;
    }

    .qrcode {
      width: 50px !important;
      height: 50px !important;
    }

    margin-top: 8px;
    height: 83px;
    background: url('/src/assets/img/hr/Interview/ScoreForm-header-bg.png') no-repeat;
    background-size: 100% 100%;

    .hb_center {
      width: 4px;
      height: 83px;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.53) 0%, #ffffff 50%, rgba(255, 255, 255, 0.52) 100%);
    }
  }
  .dept_bg {
    margin-right: 6px;
    border: 1px solid #468bfd;
    border-radius: 3px;
    font-size: 12px;
    color: #468bfd;
    padding: 2px 6px;
  }
  .dept_bgTwo {
    margin-right: 6px;
    border: 1px solid #f27b33;
    border-radius: 3px;
    font-size: 12px;
    color: #f27b33;
    padding: 2px 6px;
  }
}
.vs-content {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  width: 100%;
  min-height: 60px;
  padding: 11px 10px 7px;
  border-radius: 4px;
  .content-bg {
    background: #f5f6f7;
  }
  .title {
    margin-left: 0;
    margin-bottom: 4px;
    font-size: 14px;
    text-align: center;
  }
  .num {
    font-size: 18px;
  }
  .wnum {
    font-size: 14px;
    color: var(--el-text-color-regular);
  }
}
:deep(.el-radio) {
  margin-right: 10px;
}

.Scores {
  :deep(.el-form-item) {
    margin-bottom: 6px;
  }
}
</style>
