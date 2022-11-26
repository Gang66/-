<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
      <div class='projectview text-base'>
        <div class='salerDialog'>
          <el-card class='sale_card'>
            <el-tabs v-model="activeName" class="demo-tabs">
              <el-tab-pane label="项目介绍" name="first">
                <div class="zxw-basics">
                  <table cellpadding="0" cellspacing="0" width="100%">
                    <tbody>
                      <tr>
                        <th>发行时间</th>
                        <td>{{data.temp.posttime || '-'}}</td>
                        <th>跟踪版本</th>
                        <td>{{data.temp.edition || '0'}}</td>
                        <th>项目性质</th>
                        <td>{{data.temp.xmxz || '-'}}</td>
                      </tr>
                      <tr>
                        <th>项目所属行业</th>
                        <td v-html="data.temp.industry || '-'"></td>
                        <th>所属领域类型</th>
                        <td v-html="data.temp.lylx || '-'"></td>
                        <td colspan="2"></td>
                      </tr>
                      <tr>
                        <th>预算总投资额</th>
                        <td :class="data.diffs.price_diff ? 'new-feature':''">
                          <div v-if="data.diffs.price_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.price || '-'}}万元
                        </td>
                        <th>投资性质</th>
                        <td :class="data.diffs.tzxz_diff ? 'new-feature':''">
                          <div v-if="data.diffs.tzxz_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.tzxz || '-'}}
                        </td>
                        <th>资金到位情况</th>
                        <td :class="data.diffs.zjdw_diff ? 'new-feature':''">
                          <div v-if="data.diffs.zjdw_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.zjdw || '-'}}
                        </td>
                      </tr>
                      <tr>
                        <th>项目建设等级</th>
                        <td :class="data.diffs.jsdj_diff ? 'new-feature':''">
                          <div v-if="data.diffs.jsdj_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.jsdj || '-'}}
                        </td>
                        <th>预计开建年月</th>
                        <td :class="data.diffs.kjny_diff ? 'new-feature':''">
                          <div v-if="data.diffs.kjny_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.kjny || '-'}}
                        </td>
                        <th>预计截至日期</th>
                        <td :class="data.diffs.jzny_diff ? 'new-feature':''">
                          <div v-if="data.diffs.jzny_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.jzny || '-'}}
                        </td>
                      </tr>
                      <tr>
                        <th>建筑面积</th>
                        <td :class="data.diffs.build_area_diff ? 'new-feature':''">
                          <div v-if="data.diffs.build_area_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.build_area || '-'}}
                        </td>
                        <th>占地面积</th>
                        <td :class="data.diffs.cover_area_diff ? 'new-feature':''">
                          <div v-if="data.diffs.cover_area_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.cover_area || '-'}}
                        </td>
                        <th>有无钢结构</th>
                        <td :class="data.diffs.is_has_steel_structure_diff ? 'new-feature':''">
                          <div v-if="data.diffs.is_has_steel_structure_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.is_has_steel_structure || '-'}}
                        </td>
                      </tr>
                      <tr>
                        <th>所属省份</th>
                        <td v-html="data.temp.shengfen || '-'"></td>
                        <th>所属地级市</th>
                        <td v-html="data.temp.jishi || '-'"></td>
                        <th>设备来源</th>
                        <td v-html="data.temp.sbly || '-'"></td>
                      </tr>
                      <tr>
                        <th>进展阶段</th>
                        <td :class="data.diffs.stage_diff ? 'new-feature':''">
                          <div v-if="data.diffs.stage_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.stage || '-'}}
                        </td>
                        <th>主体施工阶段</th>
                        <td :class="data.diffs.construction_stage_diff ? 'new-feature':''">
                          <div v-if="data.diffs.construction_stage_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.construction_stage || '-'}}
                        </td>
                        <th>主体设计阶段</th>
                        <td :class="data.diffs.design_stage_diff ? 'new-feature':''">
                          <div v-if="data.diffs.design_stage_diff"><span>新</span>
                            <p>{{data.temp.posttime}}更新此项信息</p>
                          </div>
                          {{data.temp.design_stage || '-'}}
                        </td>
                      </tr>
                      <tr v-if="data.temp.sjms">
                        <th>商机描述</th>
                        <td colspan="5" class="text-left" :class="data.diffs.sjms_diff ? 'new-feature':''" v-html="data.temp.sjms">

                        </td>
                      </tr>
                      <tr>
                        <th>所需材料设备</th>
                        <td colspan="5" class="equiment text-left" style="padding-left:20px; padding-right:20px;">
                          <p ref="equipmentTd" v-html="data.temp.xqsb || '-'" style="line-height:18px"></p>
                        </td>
                      </tr>
                      <tr v-if="data.temp.xqjt">
                        <th>具体需求情况</th>
                        <td colspan="5" class="text-left equiment" style="padding-left:20px; padding-right:20px;">
                          <p v-html="data.temp.xqjt" style="line-height:18px"></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </el-tab-pane>
              <el-tab-pane label="项目详情" name="second">
                <div class="zxw-details" v-html="data.temp.content"></div>
              </el-tab-pane>
              <el-tab-pane label="项目进展" name="third">
                <div class="zxw-progress" v-html="data.temp.jzjt"></div>
              </el-tab-pane>
              <el-tab-pane label="项目联系人" name="fourth">
                <div class="zxw-contacts" v-for="(item,index) in data.companyInfoList" :key="index">
                  <div class="zxw-contacts-title"><b>{{item.title}}：</b><span>{{item.company_name}}</span></div>
                  <div class="zxw-contacts-linkmen" v-for="(row,i) in item.linkmen" :key="i">
                    <p v-html="row"></p>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </el-card>
        </div>
      </div>
    </CusDialog>
  </div>
</template>
<script lang="ts" setup>
import { GetZxwContentInfo } from '/@/api/Sale/CustomerProjeck'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
const props = defineProps({
  DataId: {
    type: String,
    default: 0
  },
  title: {
    type: String,
    default: ''
  }
})

const data = reactive({
  companyInfoList: <any>[],
  diffs: {},
  temp: <any>{},
  form: {}
})
const getinfo = () => {
  GetZxwContentInfo({ Id: props.DataId })
    .then((response) => {
      if (response.code == 1) {
        data.temp = response.data

        console.log(response.data)

        data.diffs = JSON.parse(JSON.stringify(response.data))
        var companyInfo = JSON.parse(data.temp.companyInfoJSON)
        var _companyInfoList = []
        if (companyInfo) {
          for (var item in companyInfo) {
            var row = companyInfo[item]
            if (row && row.company_name && row.company_name.length > 0) {
              _companyInfoList.push(row)
            }
          }
        }
        data.companyInfoList = _companyInfoList
      } else ElMessage.error(response.message)
    })
    .catch((e) => {
      console.log('错误:', e)
    })
}

const emit = defineEmits(['closeWindow'])

const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
onMounted(() => {
  getinfo()
})
const activeName = ref('first')
</script>
<style lang="postcss" scoped>
.projectview {
  .zxw-contacts {
    font-size: 16px;
    color: #333;
    line-height: 2;
    border: 1px solid #dee2e6;
    margin-bottom: 10px;
    .zxw-contacts-title {
      font-size: 16px;
      line-height: 1.5;
      color: #222;
      padding: 8px 15px;
      background-color: #f3f3f3;
      border-bottom: 1px solid #dee2e6;
    }
    .zxw-contacts-linkmen {
      padding: 0 10px;
      font-size: 16px;
      color: #333;
      line-height: 1.5;
    }
  }
  .zxw-details {
    padding: 0 10px 10px;
    font-size: 16px;
    color: #333;
    line-height: 2;
  }
  .zxw-progress {
    padding: 0 10px 10px;
    font-size: 16px;
    color: #333;
    line-height: 2;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      font-size: 14px;
      line-height: 1.5;
      color: #333;
      border: 1px solid #dee2e6;
      padding: 8px 5px;
    }
    th {
      width: 110px;
      font-weight: bold;
      background-color: #f3f3f3;
    }
  }
}
</style>
