<template>
  <div class="registerForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
      <template #title>
        <div class="rounded-full text-right bf-window-padding" style="padding-bottom: 0">
          <el-icon class="cursor-pointer" @click="closeWindow('close')">
            <el-icon-close />
          </el-icon>
        </div>
      </template>
      <div id="printMe" class="bf-table-style-static p-8" popTitle="北方阀门">
        <div style="padding-top: 0">
          <div class="text-2xl text-center mt-8 mb-5">应聘登记表</div>
          <table border="1" cellspacing="0">
            <tbody>
              <tr>
                <td width="90px" align="center">应聘日期</td>
                <td width="160px" colspan="2" align="center">{{ data.ruleForm.ApplyDate }}</td>
                <td width="90px" align="center">姓名</td>
                <td width="220px" colspan="2" align="center">{{ data.ruleForm.ApplyName }}</td>
                <td width="90px" align="center">应聘岗位</td>
                <td width="160px" colspan="2" align="center">{{ data.ruleForm.PostName }}</td>
              </tr>
              <tr>
                <td align="center">出生年月</td>
                <td colspan="2" align="center">{{ data.ruleForm.BirthDate }}</td>
                <td align="center">性别</td>
                <td colspan="2" align="center">
                  <div v-for="item in data.SexData">
                    <span v-if="data.ruleForm.Sex == item.DicKey">{{ item.DicValue }}</span>
                  </div>
                </td>
                <td align="center">政治面貌</td>
                <td colspan="2" align="center">
                  <div v-for="item in data.politics">
                    <span v-if="data.ruleForm.PoliticalOutlook == item.DicKey">{{ item.DicValue }}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td align="center">籍　　贯</td>
                <td colspan="2" align="center">{{ data.ruleForm.NativePlace }}</td>
                <td align="center">婚育情况</td>
                <td colspan="2" align="center">
                  <template v-for="item in data.basicMarriage">
                    <div class="mc_value" v-if="data.ruleForm.Marry == item.DicKey">{{ item.DicValue }}</div>
                  </template>
                </td>
                <td align="center">社保情况</td>
                <td colspan="2" align="center">
                  <template v-for="item in data.basicSocialInsuranceOptions">
                    <div class="mc_value" v-if="data.ruleForm.SocialSecurity == item.DicKey">{{ item.DicValue }}</div>
                  </template>
                </td>
              </tr>
              <tr>
                <td align="center">联系电话</td>
                <td colspan="2" align="center">{{ data.ruleForm.PhoneNumber }}</td>
                <td align="center">驾照情况</td>
                <td colspan="2" align="center">
                  <template v-for="item in data.haveNoOptions">
                    <div class="mc_value" v-if="data.ruleForm.DrivingLicense == item.DicKey">{{ item.DicValue }}</div>
                  </template>
                </td>
                <td align="center">业务等级</td>
                <td colspan="2" align="center">
                  <template v-for="item in data.businessLevel">
                    <div class="mc_value" v-if="data.ruleForm.BusinessLevel == item.DicKey">{{ item.DicValue ? item.DicValue.substring(0, 2) : '-' }}</div>
                  </template>
                </td>
              </tr>
              <tr>
                <td align="center">最高学历</td>
                <td colspan="2" align="center">
                  <template v-for="item in data.education">
                    <div class="mc_value" v-if="data.ruleForm.Education == item.DicKey">{{ item.DicValue }}</div>
                  </template>
                </td>
                <td align="center">毕业方式</td>
                <td colspan="2" align="center">
                  <template v-for="item in data.graduationMode">
                    <div class="mc_value" v-if="data.ruleForm.Graduation == item.DicKey">{{ item.DicValue }}</div>
                  </template>
                </td>
                <td align="center">毕业时间</td>
                <td colspan="2" align="center">{{ data.ruleForm.GraduationDate }}</td>
              </tr>
              <tr>
                <td align="center">毕业院校</td>
                <td colspan="3" align="center">{{ data.ruleForm.Colleges }}</td>
                <td align="center" colspan="2">专业</td>
                <td colspan="3" align="center">{{ data.ruleForm.Professional }}</td>
              </tr>
              <tr>
                <td align="center">居住范围</td>
                <td colspan="2" align="center">
                  <template v-for="item in data.distanceRange">
                    <div class="mc_value" v-if="data.ruleForm.LiveArea == item.DicKey">{{ item.DicValue }}</div>
                  </template>
                </td>
                <td align="center">现住址</td>
                <td colspan="4" align="center">{{ data.ruleForm.NowAddress }}</td>
              </tr>
              <template v-if="data.ruleForm.InterProInfo">
                <tr>
                  <td :rowspan="data.ruleForm.InterProInfo.length + 1" align="center">工作经历 （从首次 工作起）</td>
                  <td colspan="3" align="center">从业时间</td>
                  <td colspan="2" align="center">单位名称</td>
                  <td align="center">任职岗位</td>
                  <td align="center">薪酬</td>
                </tr>
                <tr v-for="(item, index) in data.ruleForm.InterProInfo" :key="index">
                  <td colspan="3" align="center">{{ item.InductionBeginDate }}<span v-if="item.InductionBeginDate">至</span>{{ item.InductionEndDate }}</td>
                  <td colspan="2" align="center">{{ item.CompanyName }}</td>
                  <td align="center">{{ item.PostName }}</td>
                  <td align="center">{{ item.Pay }}</td>
                </tr>
              </template>
              <tr>
                <td align="center">期望薪资</td>
                <td colspan="3" align="center">{{ data.ruleForm.ExpectPay }}</td>
                <td align="center" colspan="2">可到岗时间</td>
                <td colspan="3" align="center">{{ data.ruleForm.ComeDate }}</td>
              </tr>
              <tr>
                <td align="center">声 明</td>
                <td colspan="7" style="width: 700px">
                  <div class="pl-2 pr-2">
                    <span class="text-left pt-5">本人保证所提供的个人信息等真实、准确。如因提供虚假或遗漏相关信息导致用人单位误解而与本人签订劳动合同</span>
                    <span>的，由此致使用人单位承担连带责任的，用人单位有权向本人进行追偿。</span>
                    <div class="text-right pr-2 pb-4">
                      签字：
                      <span>_____________</span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="text-center mt-10 pb-8">
        <el-button @click="closeWindow('close')">取消</el-button>
        <el-button type="primary" v-print="print">打印</el-button>
      </div>
    </OpenWindow>
  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, SetupContext } from 'vue'
import { ElMessage } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetApplicationRegInfo } from '/@/api/hr/Interview'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    await GetApplicationRegInfo(data.Id).then((res) => {
      if (res.code == 1) {
        if (res.data.InterProInfo && res.data.InterProInfo.length < 3) {
          let arr = {
            CompanyName: '',
            CreateOn: '',
            Id: 0,
            InductionBeginDate: '',
            InductionEndDate: '',
            InterViewId: 0,
            Pay: '',
            PostName: ''
          }
          // data.ruleForm.InterProInfo.push(arr)
          res.data.InterProInfo.push(arr)
        }
        data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 政治面貌
  store.getDict('hr_archive_zzmm').then((res: any) => {
    data.politics = res
  })
  // 最高学历
  store.getDict('bffm_hr_education').then((res: any) => {
    data.education = res
  })
  // 婚育情况
  store.getDict('hr_user_marriage').then((res: any) => {
    data.basicMarriage = res
  })
  // 系统有无（驾照情况）
  store.getDict('sys_have_no').then((res: any) => {
    data.haveNoOptions = res
  })
  // 社会保险
  store.getDict('social_security').then((res: any) => {
    data.basicSocialInsuranceOptions = res
  })
  // 距离范围
  store.getDict('register_distance_range').then((res: any) => {
    data.distanceRange = res
  })
  // 毕业方式
  store.getDict('graduation_mode').then((res: any) => {
    data.graduationMode = res
  })
  // 业务等级
  store.getDict('hr_business_grade').then((res: any) => {
    data.businessLevel = res
  })
  // 性别
  store.getDict('sys_user_gender').then((res: any) => {
    console.log(res)
    data.SexData = res
  })
}
export default defineComponent({
  components: {
    OpenWindow
  },
  emits: ['closeWindow'],
  props: {
    // 面试Id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      ruleForm: {
        //基本信息
        InterProInfo: [{ InductionBeginDate: null, InductionEndDate: null, CompanyName: '', PostName: '', Pay: '' }] //工作经历
      },
      Id: props.Id, //面试Id
      politics: [], // 政治面貌
      education: [], //最高学历
      basicMarriage: [], // 婚育情况
      haveNoOptions: [], //驾照资格
      basicSocialInsuranceOptions: [], //社保情况
      distanceRange: [], //距离范围
      graduationMode: [], //毕业方式
      businessLevel: [], //业务等级
      SexData: [] //性别
    })
    let print = reactive({
      id: 'printMe',
      popTitle: '中国·北方阀门'
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-900',
      boxHeight: 'h-1200'
    })
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return { boxStyle, data, closeWindow, print }
  }
})
</script>
<style lang="postcss" >
/* 原生table公共样式 */
.bf-table-style-static {
  table {
    border: 1px solid #333;
    border-collapse: collapse;

    th,
    td {
      font-family: SimSun;
      padding: 12px 2px;
      border-bottom: 1px solid #333;
      border-right: 1px solid #333;
      font-size: 14px;
      height: 2.1rem;
      empty-cells: show;
    }
  }
}
</style>
<style lang="postcss" scoped>
.registerForm {
  :deep(.bf-windows-content) {
    transform: scale(0.79);
    margin-top: 0px;
  }
  :deep(.overflow-y-auto) {
    overflow-y: hidden !important;
  }
  :deep(.pt-24) {
    padding-top: 0 !important;
  }
  :deep(td) {
    height: 2.4rem;
  }
}
</style>
