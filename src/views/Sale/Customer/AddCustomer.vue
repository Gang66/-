<template>
  <div>
    <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow(`close`)'>
      <div class='addCustomer text-base'>
        <div class='salerDialog'>

          <el-form ref='ruleFormRef' :model='data.ruleForm' :rules="rules">
            <el-card class='sale_card'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>基本信息</div>
                  <div class='header-right text-right'>
                    <div class="flex justify-end">

                      <div class="pr-2 w-full cursor-pointer" @click="showdetailsEvent()">
                        <el-icon class="cursor-pointer" v-if="showdetails==true">
                          <el-icon-ArrowDownBold />
                        </el-icon>
                        <el-icon class="cursor-pointer" v-if="showdetails==false">
                          <el-icon-ArrowRightBold />
                        </el-icon>
                      </div>

                      <!--<div>
                        <el-form-item label='客户等级：' prop='Ranking'>
                          <div v-if='data.ruleForm.Ranking>0' @click="showranking" style='color: #DB0C0C;'>{{ data.ruleForm.Ranking }}强</div>
                          <div v-else @click="showranking" class="flex text-gray-400 cursor-pointer">
                            请选择客户等级
                          </div>

                        </el-form-item>
                      </div>
                      <div>
                        <el-button @click='showcontact'>
                          <el-icon-plus class='w-4 h-4 mr-2' /> 新增联系人
                        </el-button>
                        <el-button @click='showrelation'>
                          <el-icon-plus class='w-4 h-4 mr-2' /> 新增关联企业
                        </el-button>
                      </div> -->
                    </div>
                  </div>
                </div>
              </template>
              <div v-if="showdetails==true">
                <div class="bg-white rounded shadow-xl p-1" v-if="data.isShowCustomerMessage==true" style="position: absolute;top: 90px;z-index: 9;left: 130px;">
                  该客户已存在，无法提交，可选择“<span class="text-blue-500 cursor-pointer" @click="opentransferv">申请划拨</span>”
                </div>
                <div class="bg-white rounded shadow-xl p-1" v-if="data.isShowMessage==true" style="position: absolute;top: 90px;z-index: 9;left: 130px;">
                  已经是你的客户无需添加
                </div>
                <el-form-item label='客户名称' prop='Name'>

                  <div class="flex w-full">

                    <el-autocomplete v-model='data.ruleForm.Name' value-key='Name' :disabled='InfoDisabled||data.baseInfoDisable' :fetch-suggestions='querySearchAsync' placeholder='请输入公司名称' class="w-full" style='height:36px;' @select='handleSelect' />

                    <div v-if=" data.baseInfoDisable==false" class="flex">
                      <el-button style="width:5rem;" class="ml-4" @click="showname">
                        <el-icon>
                          <el-icon-search />
                        </el-icon>
                        名称核准
                      </el-button>
                      <el-button @click="openRegion" class="rounded-md w-7rem" style="line-height: 0; width:5rem;">
                        <el-icon>
                          <el-icon-location />
                        </el-icon><br>区域申请
                      </el-button>
                    </div>
                  </div>
                </el-form-item>
                <el-row v-if="data.ruleForm.Ranking<=30 &&data.ruleForm.Ranking!=0 && data.ruleForm.Id==0">
                  <el-col :lg="6">
                    <el-form-item label='客户等级' prop='Ranking'>
                      <div v-if='data.ruleForm.Ranking>0' @click="showranking" class="pl-2 w-full border-gray-300 border-solid border rounded" style='color: #DB0C0C;'>
                        {{ data.ruleForm.Ranking }}强
                      </div>
                      <div v-else @click="showranking" class=" pl-2 w-full flex text-gray-400 cursor-pointer border-gray-300 border-solid border rounded">
                        请选择
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label='行业' label-width="2.5rem" prop='Trade'>
                      <el-cascader @change="TradeChange" :placeholder="Region == null ? '加载中' : '请选择地址'" :options="Trade" :props="regionProps" filterable v-model="data.ruleForm.Trade" style="width:100%;"></el-cascader>

                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label='园区' label-width="2.5rem" prop='ParkAddress'>
                      <el-input v-model='data.ruleForm.ParkAddress' placeholder='请输入' />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="6">
                    <el-form-item label='区域' label-width="2.5rem" prop='CityAddress'>

                      <el-cascader @change="changeRegion" :placeholder="Region == null ? '加载中' : '请选择地址'" :options="Region" :props="regionProps" filterable v-model="data.ruleForm.CityAddress" style="width:100%;"></el-cascader>

                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row v-if="(data.ruleForm.Ranking>30||data.ruleForm.Ranking==0)||data.ruleForm.Id!=0">
                  <el-col :lg="8">
                    <el-form-item label='客户等级' prop='Ranking'>
                      <div v-if='data.ruleForm.Ranking>0' @click="showranking" class="pl-2 w-full border-gray-300 border-solid border rounded" style='color: #DB0C0C;'>
                        {{ data.ruleForm.Ranking }}强
                      </div>
                      <div v-else @click="showranking" class=" pl-2 w-full flex text-gray-400 cursor-pointer border-gray-300 border-solid border rounded">
                        请选择客户等级
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8">
                    <el-form-item label='所属行业' prop='Trade'>
                      <el-cascader :disabled='data.baseInfoDisable' @change="TradeChange" :placeholder="Region == null ? '加载中' : '请选择地址'" :options="Trade" :props="regionProps" filterable v-model="data.ruleForm.Trade" style="width:100%;"></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8">
                    <el-form-item label='所属园区' prop='ParkAddress'>
                      <el-input :readonly='data.baseInfoDisable' v-model='data.ruleForm.ParkAddress' placeholder='请输入' />
                    </el-form-item>
                  </el-col>

                  <el-col :lg="8">
                    <el-form-item label='成立时间' prop='SetupDate'>
                      <el-date-picker :disabled='data.baseInfoDisable' v-model="data.ruleForm.SetupDate" type="date" placeholder="请选择" style="width: 247px;" />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8">
                    <el-form-item label='法人代表' prop='CdelegateMan'>
                      <el-input :readonly='data.baseInfoDisable' v-model='data.ruleForm.CdelegateMan' placeholder='请输入' />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8">
                    <el-form-item label='注册资金' prop='RegisteredAmt'>
                      <el-input :readonly='data.baseInfoDisable' v-model='data.ruleForm.RegisteredAmt' placeholder='请输入' />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="8">
                    <el-form-item label='所属区域' prop='CityAddress'>
                      <el-cascader :disabled='data.baseInfoDisable' @change="changeRegion" :placeholder="Region == null ? '加载中' : '请选择地址'" :options="Region" :props="regionProps" filterable v-model="data.ruleForm.CityAddress" style="width:100%;"></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :lg="16">
                    <el-form-item label='公司官网' prop='CompanyMobile'>
                      <el-input :readonly='data.baseInfoDisable' v-model='data.ruleForm.CompleteWebsit' placeholder='请输入' />
                    </el-form-item>
                  </el-col>
                  <el-col :lg="24">
                    <el-form-item label='公司地址' prop='Address'>
                      <el-input :readonly='data.baseInfoDisable' v-model='data.ruleForm.Address' placeholder='请输入' />
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>

            </el-card>

            <div class="pt-6">
              <div class="flex justify-between">
                <div class="flex">
                  <div class="cursor-pointer" :class="tabletopindex==0?'checktabletitle':'tabletitle'" @click="checktop(0)">联系人</div>
                  <div class="cursor-pointer" :class="tabletopindex==1?'checktabletitle':'tabletitle'" @click="checktop(1)">关联公司</div>
                  <!--                   <div class="cursor-pointer" :class="tabletopindex==2?'checktabletitle':'tabletitle'" @click="checktop(2)">开票信息</div> -->
                </div>
                <div class="mt-1">
                  <div v-if="tabletopindex==0">
                    <el-button v-if="data.ViewType!==4" size="small" type="primary" @click='showcontact' style="background: #027AFF;">
                      <el-icon-plus class='w-4 h-4 mr-2' /> 新增
                    </el-button>
                  </div>
                  <div v-if="tabletopindex==1">
                    <el-button v-if="data.ViewType!==4" size="small" type="primary" @click='showrelation' style="background: #027AFF;">
                      <el-icon-plus class='w-4 h-4 mr-2' /> 新增
                    </el-button>
                  </div>
                  <div v-if="tabletopindex==2">
                    <el-button size="small" type="danger" @click='showrelation' style="background: #F38383;">
                      <el-icon-Document class='w-4 h-4 mr-2' /> 编辑
                    </el-button>
                    <el-button size="small" type="primary" @click='showrelation'>
                      <el-icon-plus class='w-4 h-4 mr-2' /> 历史
                    </el-button>
                  </div>

                </div>
              </div>
              <div class="bg-white border-blue-300 border-solid border rounded-b-lg pb-2">
                <div v-if="tabletopindex==0">
                  <el-table border :data='data.SituationData' :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }" :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
                    <el-table-column type="index" width="40" label='序号' />
                    <el-table-column prop='CreatrOn' width="100" label='录入日期'>
                      <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
                    </el-table-column>
                    <el-table-column prop='Type' width="50" label='类别' />
                    <el-table-column prop='Name' width="80" label='姓名' />
                    <el-table-column prop='Duties' width="80" label='职位' />
                    <el-table-column prop='Telephone' label='联系方式' />
                    <!-- <el-table-column prop='address' width="50" label='属性' /> -->
                    <!-- <el-table-column label='属性' width="80">
                      <template #default="scope">
                        <span class="cursor-pointer" v-if="scope.row.isView==1" style="color:#07C160;" @click="viewcontact(scope.row.Id,3)">详情</span>
                        <span class="cursor-pointer" v-else style="color:#DB0C0C;" @click="viewcontact(scope.row.Id,4)">添加</span>
                      </template>
                    </el-table-column> -->
                    <el-table-column label='操作' width="100">
                      <template #default="scope">
                        <span v-if="scope.row.IsSuccess==true" class="mr-4 cursor-pointer" @click="editcontact(scope.row)">查看</span>
                        <span v-else class="mr-4 cursor-pointer" @click="editcontact(scope.row)">变更</span>
                        <!-- <span class="cursor-pointer" @click="DeleteSituationInfo(scope.row)" style="color:#DB0C0C;">删除</span> -->
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="flex justify-end">
                    <el-pagination small v-model:page-size="sitpage.size" :background="true" layout="prev, pager, next, jumper" :total="sitpage.count" @size-change="sithandleSizeChange" @current-change="sithandleCurrentChange" />
                  </div>
                </div>
                <div v-if="tabletopindex==1">
                  <el-table border :data='data.checkrelationdata' :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }" :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
                    <el-table-column type="index" width="40" label='序号' />
                    <el-table-column prop='Name' label='关联公司名称' />
                    <el-table-column prop='Creater' width="50" label='业务员' />
                    <el-table-column prop='Ranking' width="50" label='规模'>
                      <template #default="scope">
                        <span>{{scope.row.Ranking}}强</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop='TradeName' width="80" label='类型' />
                    <el-table-column prop='Name' width="50" label='操作'>
                      <template #default="scope">
                        <span class="cursor-pointer" @click="delrelation(scope.row)" style="color:#DB0C0C;">删除</span>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="flex justify-end">
                    <el-pagination small v-model:page-size="pageInfo.size" :background="true" layout="prev, pager, next, jumper" :total="pageInfo.count" @size-change="handleSizeChange" @current-change="handleCurrentChange" />
                  </div>
                </div>
                <!--                 <div v-if="tabletopindex==2" class="p-2">
                  <el-row>
                    <el-col :lg="12">
                      <el-form-item label='单位名称'>
                        <el-input v-model='data.ruleForm.CompanyName' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12">
                      <el-form-item label='税号'>
                        <el-input v-model='data.ruleForm.Duty' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12">
                      <el-form-item label='银行账号'>
                        <el-input v-model='data.ruleForm.BankAccount' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12">
                      <el-form-item label='开户银行'>
                        <el-input v-model='data.ruleForm.CompanyName' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12">
                      <el-form-item label='公司地址'>
                        <el-input v-model='data.ruleForm.CompanyName' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12">
                      <el-form-item label='电话'>
                        <el-input v-model='data.ruleForm.CompanyName' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12">
                      <el-form-item label='签收人'>
                        <el-input v-model='data.ruleForm.CompanyName' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                    <el-col :lg="12">
                      <el-form-item label='联系方式'>
                        <el-input v-model='data.ruleForm.CompanyName' placeholder='请输入' />
                      </el-form-item>
                    </el-col>

                    <el-col :lg="24">
                      <el-form-item label='签收地址'>
                        <el-input v-model='data.ruleForm.CompanyName' placeholder='请输入' />
                      </el-form-item>
                    </el-col>
                  </el-row>

                </div> -->

              </div>
            </div>
            <div class='text-center pt-10'>
              <div v-if="data.ruleForm.Id==0">
                <el-button @click='closeWindow()' style="">取消</el-button>
                <el-button type="primary" @click='submit(ruleFormRef,0)'>保存</el-button>
              </div>

              <el-button v-if=" data.ruleForm.Id!=0&&data.baseInfoDisable" @click="setdisable(false)">编辑</el-button>
              <el-button v-if=" data.ruleForm.Id!=0&&data.baseInfoDisable==false" @click='submit(ruleFormRef,-1)'>保存</el-button>
              <el-button v-if="data.ruleForm.Checked==0 && data.ruleForm.Id!=0" @click='showcompany(ruleFormRef)' type="primary">确认核准</el-button>
            </div>

            <div>
              <template v-if="data.ViewType != 1 && data.ViewType != 2">
                <!-- 审批记录 -->
                <slot name="ApprovalProcess"></slot>
                <!-- 审批 -->
                <template v-if="data.ViewType==4">
                  <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
                  <div class="bf-search-formItem ">
                    <div class="text-center w-full mt-4">
                      <el-button type="danger" @click="ApprovalForm(0)">驳 回</el-button>
                      <el-button type="primary" @click="ApprovalForm(1)">审 批</el-button>
                    </div>
                  </div>
                </template>
              </template>
            </div>
          </el-form>
        </div>

        <CusDialog v-if="rankingview" :box-style='rankingboxStyle' title='客户等级选择' :is-show='true' @closeWindow='cancelranking'>
          <div class="py-4">
            <el-card class='sale_card'>
              <div class="text-sm">
                <div class="flex mb-2">
                  <div class="pr-2 w-20">
                    纳税50强
                  </div>
                  <div style="display:flex">
                    <div v-for="(item,index) in radioVals" :key="index">
                      <div style="cursor:pointer;margin-right:10px">
                        <div style="display:flex" @click="chooseRadioBtn('1',item.value)">
                          <div>
                            <el-button style="width:16px;height:16px;padding:0px 0 3px 0;margin-right:5px;border-radius: 10px;font-size: 50px;overflow: hidden;" :style="data.ruleForm.TaxRank==item.value?'background-color:#027AFF;color:#fff;border: 1px solid #027AFF;':'background-color:#fff;border: 1px solid #ccc;'" :class="data.ruleForm.TaxRank==item.value?'el-icon-check':''" round>·</el-button>
                          </div>
                          <div>{{item.title}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex mb-2">
                  <div class="pr-2 w-20">
                    行业10强
                  </div>

                  <div style="display:flex">
                    <div v-for="(item,index) in radioVals" :key="index">
                      <div style="cursor:pointer;margin-right:10px">
                        <div style="display:flex" @click="chooseRadioBtn('2',item.value)">
                          <div>
                            <el-button style="width:16px;height:16px;padding:0px 0 3px 0;margin-right:5px;border-radius: 10px;font-size: 50px;overflow: hidden;" :style="data.ruleForm.IndustryRank==item.value?'background-color:#027AFF;color:#fff;border: 1px solid #027AFF;':'background-color:#fff;border: 1px solid #ccc;'" :class="data.ruleForm.IndustryRank==item.value?'el-icon-check':''" round>·</el-button>
                          </div>
                          <div>{{item.title}}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="flex items-center">
                  <div class="pr-2 w-20">
                    阀门使用量
                  </div>
                  <el-select v-model="data.ruleForm.FMCount" placeholder="请选择" style="" :disabled="InfoDisabled||data.baseInfoDisable">
                    <el-option key="0" label="300万以上" value="60"></el-option>
                    <el-option key="1" label="200万以上" value="40"></el-option>
                    <el-option key="2" label="100万以上" value="20"></el-option>
                    <el-option key="3" label="50~100万" value="10"></el-option>
                    <el-option key="4" label="50万以下" value="0"></el-option>
                  </el-select>
                </div>
              </div>

              <div class="text-center pt-4">
                <el-button class="cancelbut" @click="cancelranking">
                  取消
                </el-button>
                <el-button @click="CalcCustomerRank">
                  提交
                </el-button>
              </div>
            </el-card>

          </div>
        </CusDialog>
        <CusDialog v-if="nameview" :boxStyle='nameboxStyle' title='名称核准' :is-show='true' @closeWindow='cancelname'>
          <div>
            <el-card class='sale_card'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>名称核准</div>
                  <div class='header-right text-right'>

                  </div>
                </div>
              </template>
              <div>
                <div class="text-center">
                  <a href="http://www.gsxt.gov.cn/index.html" target="_blank">
                    <el-button @click="changeCurrentBtnIndex(0)" :style="checkCustomerNameBtnCurrentIndex==0?'background:#E6F2FF;color:#333333':''">
                      国新网
                    </el-button>
                  </a>
                  <a :href="'https://www.qcc.com/search?key=' + nameForm.name" target="_blank">
                    <el-button @click="changeCurrentBtnIndex(1)" :style="checkCustomerNameBtnCurrentIndex==1?'background:#E6F2FF;color:#333333':''">
                      企查查
                    </el-button>
                  </a>
                  <a :href="'https://www.qixin.com/search?key=' + nameForm.name" target="_blank">
                    <el-button @click="changeCurrentBtnIndex(2)" :style="checkCustomerNameBtnCurrentIndex==2?'background:#E6F2FF;color:#333333':''">
                      启信宝
                    </el-button>
                  </a>
                  <a :href="'https://www.tianyancha.com/search?key=' + nameForm.name" target="_blank">
                    <el-button @click="changeCurrentBtnIndex(3)" :style="checkCustomerNameBtnCurrentIndex==3?'background:#E6F2FF;color:#333333':''">
                      天眼查
                    </el-button>
                  </a>
                  <a :href="'https://aiqicha.baidu.com/s/person?q=' + nameForm.name + '&t=2'" target="_blank">
                    <el-button @click="changeCurrentBtnIndex(4)" :style="checkCustomerNameBtnCurrentIndex==4?'background:#E6F2FF;color:#333333':''">
                      爱企查
                    </el-button>
                  </a>
                </div>

                <form :action="'https://www.baidu.com/s?tn=baidu&&word=' + nameForm.name" target="_blank" style="margin-bottom:20px;margin-top:20px">
                  <!--name为参数名-->
                  <div style="display: flex;" class="selectName">
                    <el-input v-model="nameForm.name" type="textarea" autosize style="margin-left:10px;    border: 1px solid #33333333;border-radius: 5px 0px 0px 5px; " name="wd">
                      <!-- <div ref="nameForm" label-width="100px" class="demo-ruleForm">
                <el-button type="primary" style="height: 34px;padding: 2px 0px; border-radius: 4px; width:74px;position: absolute;top: 2px;right: 5px;"
                  slot="reference" @click="checkName"><i class="el-icon-search"></i><br/>名称核准</el-button>
            </div> -->

                      <!-- <input slot="suffix" value="查询" type="submit" style="width: 72px;height: 36px;background: #409EFF;color: #fff;border: none;" /> -->
                    </el-input>
                    <input slot="suffix" value="查询" type="submit" style="width: 50px;height: 36px;background: #409EFF;color: #fff;border: none;margin-right:10px" />
                  </div>
                </form>
              </div>
            </el-card>
          </div>
        </CusDialog>

        <CusDialog v-if="lookintoview" :boxStyle='comboxStyle' title='客户主观调查' :is-show='true' @closeWindow='cancellookinto'>
          <div>
            <el-card class='sale_card'>
              <template #header>
                <div class='card-header'>
                  <div class='header-left'>企业调查</div>
                  <div class='header-right text-right'>
                    <div class="flex justify-end">
                      <div class="flex">
                        <div class="flex">
                          <div class="pt-3">
                            信用结果：
                          </div>
                          <el-radio-group v-model="data.sitcom.CreditResults">
                            <el-radio :label="1">好</el-radio>
                            <el-radio :label="2">一般</el-radio>
                            <el-radio :label="3">差</el-radio>
                          </el-radio-group>
                        </div>

                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div>
                <div>
                  工资是否准时发放，劳资争议或人员更迭是否频繁？企业管理体系是否完善，员工向心力与企业规模是否匹配？
                  企业资金链是否充裕，同行口碑和供应商口碑如何？你认为影响企业信用的还有哪些？
                </div>
                <div class="py-4">
                  <el-input v-model="data.sitcom.CreditNote" placeholder="请输入" type="textarea" class="w-full">

                  </el-input>
                </div>
                <div>
                  <div>
                    历史数据：（时间、添加人、内容、信用结果、总计条数）
                  </div>
                  <div class="pt-6 pl-12 overflow-y-auto max-h-80">
                    <div v-for="(item,index) in data.commList " :key="index" class="border-dashed  border-l-2 border-blue-400 relative p-4">
                      <div class="w-4 h-4 bg-blue-400 rounded-xl absolute -top-2 -left-2"></div>
                      <div>
                        {{item.CreaterName}}<span class="text-gray-400">{{item.CreateOn}}</span>
                      </div>
                      <div class="text-gray-500">{{item.CreditNote}}</div>
                      <div>信用结果：
                        <span v-if="item.CreditResults==1">好</span>
                        <span v-if="item.CreditResults==2">中</span>
                        <span v-if="item.CreditResults==3">差</span>（{{item.Score}}）
                      </div>
                    </div>

                  </div>
                </div>
                <div class="text-center">

                  <el-button class="cancelbut" @click="cancellookinto">
                    取消
                  </el-button>
                  <el-button @click="PostAddSituationCommEvent">
                    提交
                  </el-button>

                </div>
              </div>
            </el-card>
          </div>
        </CusDialog>

        <CusDialog v-if="relationview" :boxStyle='boxStyle' title='添加关联企业' :is-show='true' @closeWindow='cancelrelation'>
          <div>
            <el-card class="sale_card " style="padding:0px">
              <div>
                <el-input v-model="relationpageInfo.Name" style="width:200px"></el-input>
                <el-button @click="CustomersByNameEvent">搜索</el-button>
              </div>

            </el-card>
            <el-card class='sale_card mt-6'>

              <div>
                <el-table border :data='relationdata' :header-cell-style="{'font-size': '12px',padding:'0px' ,background: '#E7F4FE', color: '#303133',height:'24px', textAlign:'center',fontWeight:'500' }" :cell-style="{ textAlign: 'center',color: '#333',height:'24px',padding:'0px' }" style='width: 100%'>
                  <el-table-column type="index" width="40" label='序号' />
                  <el-table-column prop='CreateOn' label='录入时间'>
                    <template #default="scope">{{ (scope.row.CreateOn||'').substring(0,11) }}</template>
                  </el-table-column>
                  <el-table-column prop='Name' label='客户名称' />
                  <el-table-column prop='address' label='操作'>
                    <template #default="scope">
                      <span v-if="data.checkrelationdata.findIndex((f)=>f.Id==scope.row.Id)>-1" class="text-blue-400 cursor-not-allowed">点击选择</span>
                      <span v-else class="text-blue-400 cursor-pointer" @click="checkrelation(scope.row)">点击选择</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="flex justify-end">
                  <el-pagination small v-model:page-size="relationpageInfo.size" :background="true" layout="prev, pager, next, jumper" :total="relationpageInfo.count" @size-change="relationhandleSizeChange" @current-change="relationhandleCurrentChange" />
                </div>
              </div>
            </el-card>
          </div>
        </CusDialog>

        <CusDialog v-if="company.show" :boxStyle='companyboxStyle' title='确认品牌' :is-show='true' @closeWindow='cancelcompany'>
          <div>

            <el-card class='sale_card mt-6'>
              <div class="flex">
                <div class="pt-1">
                  确认品牌：
                </div>
                <div>
                  <el-select @change="changeCompany" v-model="data.ruleForm.CompanyId" placeholder="请选择品牌" class="inputclass">
                    <el-option v-for="item in company.list " :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                  </el-select>
                </div>
              </div>

            </el-card>
            <div class="text-center pt-4">

              <el-button @click="cancelcompany">
                取消
              </el-button>
              <el-button type="primary" @click="submitcompany">
                提交
              </el-button>

            </div>
          </div>
        </CusDialog>

      </div>
      <Contacts v-if='contactview.view' :ViewType='contactview.type' :CustomerName='data.ruleForm.Name' :title="contactview.title" :SituationId="contactview.sitId" :CustomerId='data.ruleForm.Id' :dialog-visible='contactview.view' @cancelcontact='cancelcontact' />

      <transfer v-if='transferview.view' :ViewType='transferview.type' :CustomerId='transferview.cusId' :dialog-visible='transferview.view' @closeWindow='canceltransferv' />

      <Region v-if='data.AddRegion.view' :CusName="data.AddRegion.CusName" :ViewType="data.AddRegion.viewtype" :CustomerId='data.AddRegion.dataid' @closeWindow='closeRegion' />
    </CusDialog>
  </div>
</template>

<script lang="ts">
import Region from './Component/Region.vue'
import { PostApprovalCustomer } from '/@/api/wf/sale/Approval'
import { GetUserinformation } from '/@/api/layout/index'
import CusDialog from '../Component/CusDialog.vue'
import Contacts from './Component/Contacts.vue'
import transfer from './Component/transfer.vue'
import { GetOrderCompany } from '/@/api/Sale/CustomerOder'
import { PostEditQiXinComCreditSave, GetQiXinBasicInfoAsync, GetQiXinLawsuitListByName, GetQiXinExecutedpersonListByName, GetQiXinExecutionListByName, PostQiXinComCredit } from '/@/api/Sale/QiXinBao'
import { GetUserRegionList, GetSituationCommList, PostAddSituationComm, GetRelationList, GetJudgeCustomerClaim, PostConfirmBrand, GetDeleteRelation, GetDeleteSituationInfo, PostAddCustomerRelation, GetCustomersByName, GetCustomer, GetSituationInfoList, PostAddCustomer, GetAllCustomerByAddCustomer, GetCustomerTrade } from '/@/api/Sale/Customer'
import { defineComponent, getCurrentInstance, reactive, SetupContext, ref, watch, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { isMobileTel, isEmail, isURL, isNumber, isBankCard, isTaxNum, isTel } from '/@/utils/validate'
import { info } from 'console'

const windows = () => {
  const sourceList = reactive(['征信机构', '采购平台', '朋友介绍', '客户引荐', '实地考察', '政府网站', '项目网站', 'B2B网站', '其他']) // 客户来源

  const otherRuleDescriptionArr = reactive(['有能力做此公司业务', '有关系做此公司业务', '有关联企业与此公司有业务'])
  const degreeArr = reactive(['紧急', '一般'])

  const rules = reactive<FormRules>({
    ParkAddress: [
      {
        required: true,
        message: '请录入园区地址',
        trigger: 'change'
      }
    ],
    Trade: [
      {
        required: true,
        message: '请选择客户行业',
        trigger: 'change'
      }
    ],
    Ranking: [
      {
        required: true,
        message: '请选择客户等级',
        trigger: 'change'
      }
    ],
    SetupDate: [
      {
        required: true,
        message: '请选择成立时间',
        trigger: 'change'
      }
    ],
    CdelegateMan: [
      {
        required: true,
        message: '请输入法人代表',
        trigger: 'change'
      }
    ],
    RegisteredAmt: [
      {
        required: true,
        message: '请输入注册资金',
        trigger: 'change'
      }
    ],
    CityAddress: [
      {
        required: true,
        message: '请选择所属区域',
        trigger: 'change'
      }
    ],
    CompleteWebsit: [
      {
        required: true,
        message: '请输入公司官网',
        trigger: 'change'
      }
    ],
    Address: [
      {
        required: true,
        message: '请输入公司地址',
        trigger: 'change'
      }
    ]
  })

  const otherRegionRules = reactive({
    CustomerName: [
      {
        required: true,
        // message: '客户名称不能为空',
        message: '     ',
        trigger: 'blur'
      }
    ],
    CityAddress: [
      {
        required: true,
        // message: '公司地址不能为空',
        message: '',
        trigger: 'blur'
      }
    ],
    Description: [
      {
        required: true,
        // message: '原因不能为空',
        message: '',
        trigger: 'blur'
      }
    ]
  })

  const rulesInvoice = reactive({
    InvoiceCustomerName: [
      {
        required: true,
        message: '     ',
        trigger: 'change'
      }
    ],
    TaxNo: [
      {
        required: false,
        message: '     ',
        trigger: 'change'
      },
      {
        validator: isTaxNum,
        message: '请输入正确的税号',
        trigger: 'change'
      }
    ],
    InvoiceAddress: [
      {
        required: false,
        message: '     ',
        trigger: 'change'
      }
    ],
    InvoiceMobile: [
      {
        required: false,
        message: '     ',
        trigger: 'change'
      },
      {
        validator: isMobileTel,
        message: '请输入正确的电话',
        trigger: 'change'
      }
    ],
    CollectPersonName: [
      {
        required: false,
        message: '     ',
        trigger: 'change'
      }
    ],
    CollectMobile: [
      {
        required: false,
        message: '     ',
        trigger: 'change'
      },
      {
        validator: isMobileTel,
        message: '请输入正确的电话',
        trigger: 'change'
      }
    ],
    CollectAddress: [
      {
        required: false,
        message: '     ',
        trigger: 'change'
      }
    ],
    BankNo: [
      {
        validator: isBankCard,
        message: '请输入正确的卡号',
        trigger: 'change'
      }
    ]
  })

  const supplyrules = reactive({
    PurchaseName: [
      {
        required: true,
        message: '平台名称不能为空',
        trigger: 'blur'
      }
    ],
    PurchaseNo: [
      {
        required: false,
        message: '采购账号不能为空',
        trigger: 'blur'
      }
    ],
    UserId: [
      {
        required: false,
        message: '业务员不能为空',
        trigger: 'blur'
      }
    ],
    UseManufactor: [
      {
        required: false,
        message: '使用厂家不能为空',
        trigger: 'blur'
      }
    ],
    PurchaseUrl: [
      {
        required: false,
        message: '平台网址不能为空',
        trigger: 'blur'
      },
      {
        validator: isURL,
        message: '请输入正确的网址',
        trigger: 'change'
      }
    ],
    Email: [
      {
        required: false,
        message: '留用邮箱不能为空',
        trigger: 'blur'
      },
      {
        validator: isEmail,
        message: '请输入正确的邮箱',
        trigger: 'change'
      }
    ],
    Mobile: [
      {
        validator: isMobileTel,
        message: '请输入正确的留用手机',
        trigger: 'change'
      }
    ],
    Tel: [
      {
        validator: isMobileTel,
        message: '请输入正确的留用固话',
        trigger: 'change'
      }
    ],
    PurchaseTel: [
      {
        validator: isMobileTel,
        message: '请输入正确的平台电话',
        trigger: 'change'
      }
    ]
  })

  return {
    rules,
    sourceList,
    otherRuleDescriptionArr,
    degreeArr,
    otherRegionRules,
    rulesInvoice,
    supplyrules
  }
}

export default defineComponent({
  name: 'AddCustomer',
  components: {
    transfer,
    CusDialog,
    Contacts,
    Region
  },
  props: {
    info: {
      type: Object,
      default: {
        checkId: null,
        Id: null,
        // 显示类型 1 添加 2修改 3查看 4审批
        viewType: 1
      }
    },
    checkId: {
      type: Number,
      default: null
    },
    ViewType: {
      type: Number,
      default: 1 //1是添加  2是修改 3是查看
    },
    customerId: {
      type: Number,
      default: 0
    },
    InfoDisabled: {
      type: Boolean
    },
    isEdit: {
      type: Boolean
    },
    otherRegion: {
      type: Object
    },
    screenCustomer: {
      type: Object
    },
    isReadOnly: {
      type: Boolean,
      default: false
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: '客户信息录入'
    },
    // 是否是抽查管理
    isSpot: {
      type: Boolean,
      default: false
    },
    spotData: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 是否是纠正管理
    isCustomerCorrect: {
      type: Boolean,
      default: false
    },
    isShowScreen: {
      type: Boolean,
      default: false
    },
    isApproveRecord: {
      type: Boolean,
      default: false
    }
  },
  emits: ['closeWindow'],

  setup(props, context: SetupContext) {
    const defaultProps = ref({
      children: 'children',
      label: 'title',
      value: 'id'
    })
    const regionProps = {
      children: 'children',
      label: 'title',
      value: 'title',
      expandTrigger: 'hover'
    }

    const Region = ref<any>([])
    const GetRegion = (val: any) => {
      GetUserRegionList(val).then((res) => {
        if (res.code == 1) {
          Region.value = res.data
        }
      })
    }
    const changeRegion = () => {
      if (data.ruleForm.CityAddress.length > 0) {
        data.ruleForm.Addr_Province = data.ruleForm.CityAddress[0]
        data.ruleForm.Addr_City = data.ruleForm.CityAddress[1]
        data.ruleForm.Addr_Area = data.ruleForm.CityAddress[2]
      }
    }

    ///获取行业
    const Trade = ref<any>([])

    const TradeChange = () => {
      if (data.ruleForm.Trade.length > 0) {
        data.ruleForm.Trade_One = data.ruleForm.Trade[0]
        data.ruleForm.Trade_Two = data.ruleForm.Trade[1]
      }
    }

    const CustomerTrade = () => {
      GetCustomerTrade().then((res) => {
        if (res.code == 1) {
          Trade.value = res.data
        }
      })
    }
    const lookinto = reactive({
      radio: 0
    })
    const checkCustomerNameBtnCurrentIndex = ref<Number>(-1)

    const changeCurrentBtnIndex = (index: Number) => {
      checkCustomerNameBtnCurrentIndex.value = index
    }

    //关联企业弹窗

    ///添加关联企业分页
    const relationpageInfo = reactive({
      Name: '',
      count: 0,
      page: 1,
      size: 10
    })
    const relationhandleSizeChange = (val: number) => {
      relationpageInfo.size = val
      CustomersByNameEvent()
    }
    const relationhandleCurrentChange = (val: number) => {
      relationpageInfo.page = val
      CustomersByNameEvent()
    }

    const relationdata = ref<any[]>([])

    const checkrel = ref<any>({})

    const CustomersByNameEvent = () => {
      GetCustomersByName(relationpageInfo).then((res) => {
        if (res.code == 1) {
          relationpageInfo.count = res.data.count
          relationdata.value = res.data.list
        }
      })
    }

    const checkrelation = (val: any) => {
      ElMessageBox.confirm('确定添加为关联企业', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          checkrel.value.CusId = data.ruleForm.Id
          checkrel.value.RCustomerId = val.Id
          AddCustomerRelation(checkrel.value)
        })
        .catch(() => {})
    }

    const DeleteSituationInfo = (val: any) => {
      ElMessageBox.confirm('确定要删除此联系人吗', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          var postdata: any = {}
          postdata.Id = val.Id
          GetDeleteSituationInfo(postdata).then((res) => {
            if (res.code == 1) {
              ElMessage.success('删除成功')
              SituationInfoList()
            } else {
              ElMessage.error(res.message)
            }
          })
        })
        .catch(() => {})
    }

    const delrelation = (val: any) => {
      ElMessageBox.confirm('确定要删除此关联企业吗', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          let postdata: any = {}
          postdata.RCustomerId = val.Id
          postdata.CusId = data.ruleForm.Id
          GetDeleteRelation(postdata).then((res) => {
            if (res.code == 1) {
              ElMessage.success('删除成功')
              GetRelationListEvent()
            } else {
              ElMessage.error(res.message)
            }
          })
        })
        .catch(() => {})
    }
    const AddCustomerRelation = (val: any) => {
      PostAddCustomerRelation(val).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          cancelrelation()
        } else {
          ElMessage.error(res.message)
        }
      })
    }

    //确认品牌
    const company = ref({
      show: false,
      list: []
    })

    const showcompany = (val: any) => {
      GetJudgeCustomerClaim({ CusId: data.ruleForm.Id }).then((res) => {
        if (!res.data) {
          GetOrderCompany().then((res) => {
            if (res.code == 1) {
              company.value.list = res.data
            }
          })
          company.value.show = true
        } else {
          frommothed(data.ruleForm, data).submit(val, 1)
        }
      })
    }

    const changeCompany = () => {
      var item: any = company.value.list.find((f: any) => f.Id == data.ruleForm.CompanyId)
      if (item) {
        data.ruleForm.CompanyName = item.Rename
        data.ruleForm.CompanyNameAbbr = item.Name
      }
    }

    const submitcompany = (val: any) => {
      if (!data.ruleForm.CompanyId) {
        ElMessage.warning('请先选择品牌')
        return false
      }
      var info: any = {}
      info.CustomerId = data.ruleForm.Id
      info.CompanyId = data.ruleForm.CompanyId
      info.CompanyName = data.ruleForm.CompanyName
      info.CompanyNameAbbr = data.ruleForm.CompanyNameAbbr

      PostConfirmBrand(info).then((res) => {
        if (res.code == 1) {
          if (res.data) {
            ElMessage.success(res.message)
            cancelcompany()
            contactview.value.view = true
            contactview.value.title = '添加联系人'
            contactview.value.type = 1
          } else {
            ElMessage.error(res.message)
          }
        }
      })
    }

    const cancelcompany = () => {
      company.value.show = false
    }

    const relationview = ref(false)
    const cancelrelation = () => {
      relationview.value = false
      GetRelationListEvent()
    }
    const showrelation = () => {
      if (data.ruleForm.Id <= 0) {
        ElMessage.warning('请先保存客户信息')
        return false
      }
      relationview.value = true
      CustomersByNameEvent()
    }
    //划拨弹窗
    const transferview = ref({
      view: false,
      type: 1,
      cusId: 0
    })

    const opentransferv = () => {
      transferview.value.view = true
    }

    const canceltransferv = () => {
      transferview.value.view = false
    }

    //联系人弹窗
    const contactview = ref({
      title: '',
      view: false,
      type: 1,
      sitId: 0
    })
    const cancelcontact = () => {
      SituationInfoList()
      contactview.value.view = false
      contactview.value.title = ''
      contactview.value.type = 1
      contactview.value.sitId = 0
    }
    //打开添加联系人
    const showcontact = () => {
      if (data.ruleForm.Id <= 0) {
        ElMessage.warning('请先保存客户信息')
        return false
      }
      GetJudgeCustomerClaim({ CusId: data.ruleForm.Id }).then((res) => {
        if (!res.data) {
          GetOrderCompany().then((res) => {
            if (res.code == 1) {
              company.value.list = res.data
            }
          })
          company.value.show = true
        } else {
          contactview.value.view = true
          contactview.value.title = '添加联系人'
          contactview.value.type = 1
        }
      })
    }
    ///打开变更联系人
    const editcontact = (val: any) => {
      if (val.IsSuccess == true) {
        contactview.value.title = '查看联系人'
        contactview.value.type = 3
      } else {
        contactview.value.title = '变更联系人'
        contactview.value.type = 2
      }
      contactview.value.view = true

      contactview.value.sitId = val.Id
    }
    //打开客情分析窗口
    const viewcontact = (val: any, type: any) => {
      contactview.value.view = true
      contactview.value.title = '客情分析'
      contactview.value.type = type
      contactview.value.sitId = val
    }
    //名称核准弹窗

    const nameview = ref(false)
    const cancelname = () => {
      nameview.value = false
    }
    const showname = () => {
      nameview.value = true
    }
    //主观调查弹窗
    const lookintoview = ref(false)
    const cancellookinto = () => {
      lookintoview.value = false
    }
    const showlookinto = () => {
      frommothed(data.ruleForm, data).GetSituationCommListEvent()
      lookintoview.value = true
    }
    //客户排名弹窗
    const rankingview = ref(false)
    const cancelranking = () => {
      rankingview.value = false
    }
    const showranking = () => {
      if (data.baseInfoDisable == false) {
        rankingview.value = true
      }
    }

    const loading = ref<Boolean>(false)
    const Labordispute = ref<any>({})
    const Otherdisputes = ref<any>({})
    const Executivelist = ref<any>({})

    const frommothed = (ruleForm: any, from: any) => {
      const PostAddSituationCommEvent = () => {
        if (data.sitcom.CreditResults == 0) {
          ElMessage.error('请先选择信用结果')
          return false
        }
        if (data.sitcom.CreditNote == '') {
          ElMessage.error('请输入理由')
          return false
        }
        switch (data.sitcom.CreditResults) {
          case 1:
            data.sitcom.Score = 15
            break
          case 2:
            data.sitcom.Score = 10
            break
          case 3:
            data.sitcom.Score = 5
            break
          default:
            data.sitcom.Score = 0
            break
        }
        var postdata: any = {}
        postdata = data.sitcom
        postdata.CustomerId = data.ruleForm.Id
        PostAddSituationComm(postdata).then((res) => {
          if (res.code == 1) {
            data.sitcom.CreditResults = 0
            data.sitcom.CreditNote = ''
            data.sitcom.Score = 0
            ///关闭客户主观调查弹窗
            cancellookinto()
          }
        })
      }
      ///获取客户主观调查
      const GetSituationCommListEvent = () => {
        if (data.ruleForm.Id > 0) {
          GetSituationCommList({ CusId: data.ruleForm.Id }).then((res) => {
            if (res.code == 1) {
              data.commList = res.data
            }
          })
        }
      }
      const ruleFormRef = ref<FormInstance>()

      ///添加客户
      const submit = (formEl: FormInstance | undefined, val: any) => {
        if (!formEl) return
        formEl.validate(async (valid) => {
          if (valid) {
            if (loading.value == true) {
              return false
            }
            loading.value = true
            console.log(data.ruleForm.Trade)
            if (!data.ruleForm.Name) {
              ElMessage({
                type: 'error',
                message: '请输入客户名称'
              })
              return false
            }
            if (data.ruleForm.Ranking <= 0) {
              ElMessage({
                type: 'error',
                message: '请选择客户等级'
              })
              return false
            }
            if (!data.ruleForm.Trade) {
              ElMessage({
                type: 'error',
                message: '请选择客户所属分类'
              })
              return false
            }

            if (data.ruleForm.Ranking <= 30) {
              let qxb: any = await GetQiXinbao(data.ruleForm.Name)

              if (qxb != true) {
                loading.value = false
                return false
              }
            }

            let postdata: any = JSON.parse(JSON.stringify(data.ruleForm))

            postdata.Trade = JSON.stringify(postdata.Trade)
            postdata.CityAddress = JSON.stringify(postdata.CityAddress)

            postdata.com = data.com
            postdata.Checked = val

            postdata.AddOrEdit = 0
            if (data.ViewType == 1 && val != 1) {
              postdata.AddOrEdit = 1
            }
            ///保存
            if (val == -1) {
              postdata.AddOrEdit = 0
              postdata.Checked = 0
            }

            postdata.com.LawsuitInfo = JSON.stringify(lawsuitInfoList.value)
            let res = await PostAddCustomer(postdata)
            if (res.code == 1) {
              data.ruleForm.Id = res.data
              console.log(' data.ruleForm.Id', data.ruleForm.Id)
              if (data.ruleForm.Id != 0) {
                data.com.CustomerId = data.ruleForm.Id
                await getQiXinBaoinfo(data.ruleForm.QiXinBao_creditNo)
                loading.value = false
              }
              setdisable(false)
              if (postdata.Checked == 1 || val == -1) {
                closeWindow('close')
              }
              ElMessage.success('添加成功')
            } else {
              loading.value = false
              ElMessage.error(res.message)
            }
          } else {
            console.log('asdasdasdasdas')
          }
        })
      }

      //计算得分
      const getLawsuitScore = () => {
        var score = 0
        lawsuitInfoList.value.forEach((lawInfo) => {
          switch (lawInfo.LawsuitType) {
            case '劳资争议':
              var score1 = lawInfo.LawSuitCount * 1 > 5 ? 5 : lawInfo.LawSuitCount * 1
              score += score1
              lawInfo.Score = score1 == 5 ? 0 : 5 - score1
              break
            case '合同纠纷':
              var score2 = lawInfo.BeiGaoCount * 5 + lawInfo.YuanGaoCount * 1 + lawInfo.CheSuCount * 2 > 10 ? 10 : lawInfo.BeiGaoCount * 5 + lawInfo.YuanGaoCount * 1 + lawInfo.CheSuCount * 2
              score += score2
              lawInfo.Score = score2 == 5 ? 0 : 5 - score2

              Labordispute.value = lawInfo
              break
            case '金融纠纷':
              if (lawInfo.LawSuitCount > 0) {
                score += 10
                lawInfo.Score = 0
              }
              break
            case '其他纠纷':
              if (lawInfo.LawSuitCount > 0) {
                score += lawInfo.LawSuitCount * 2
                lawInfo.Score = lawInfo.LawSuitCount * 2
              }
              Otherdisputes.value = lawInfo
              break
            case '执行名单':
              if (lawInfo.LawSuitCount > 0) {
                score += 10 * lawInfo.LawSuitCount > 20 ? 20 : 10 * lawInfo.LawSuitCount
                lawInfo.Score = 20 - (10 * lawInfo.LawSuitCount > 20 ? 20 : 10 * lawInfo.LawSuitCount)
              }
              Executivelist.value = lawInfo
              break
            case '失信名单':
              if (lawInfo.LawSuitCount > 0) {
                score += 30
                lawInfo.Score = 0
              }
              break
          }
        })
        if (score > 70) {
          score = 70
        }
        data.ruleForm.CreditScore = 70 - score

        return 70 - score
      }

      const setLawsuitInfoList = (newList: any) => {
        newList.forEach((_obj: any) => {
          let item: any = {}
          item = _obj
          item.OtherContent = '数据来源启信宝'

          lawsuitInfoList.value.push(item)
        })
        data.com.LawsuitInfo = JSON.stringify(lawsuitInfoList.value)

        var QiXinBaoScore = getLawsuitScore() //计算得分
        if (data.com.Score != QiXinBaoScore) {
          data.com.Score = QiXinBaoScore
          PostEditQiXinComCreditSave(data.com).then((res) => {
            if (res.code == 1) {
            } else {
              ElMessage.error(res.message)
            }
          })
        }
      }

      const lawsuitInfoList = ref<any[]>([])
      const lawsuitList = ref<any[]>([])
      const executedpersonList = ref<any[]>([])
      const executionList = ref<any[]>([])

      //获取启信宝裁判文书列表
      const GetQiXinLawsuitListByNameEvent = async (val: any) => {
        let resA = await GetQiXinLawsuitListByName({ creditNo: val })
        if (resA.code == 1 || resA.message == '查询无结果') {
          var _lawsuitList = JSON.parse((resA.data || {}).records || '[]') || []
          lawsuitList.value = _lawsuitList
        }
      }
      //获取启信宝被执行企业列表
      const GetQiXinExecutedpersonListByNameEvent = async (val: any) => {
        let resB = await GetQiXinExecutedpersonListByName({ creditNo: val })
        if (resB.code == 1 || resB.message == '查询无结果') {
          var _executedpersonList = JSON.parse((resB.data || {}).records || '[]') || []
          executedpersonList.value = _executedpersonList
        }
      }

      //获取客户诉讼信息
      const PostQiXinComCreditEvent = async (val: any) => {
        let resCC = await PostQiXinComCredit(val)

        if (resCC.code == 1) {
          setLawsuitInfoList(resCC.data) //修改诉讼信息
        } else {
          ElMessage.error(resCC.message)
        }
      }

      //获取启信宝失信被执行企业列表
      const GetQiXinExecutionListByNameEvent = async (val: any) => {
        let resC = await GetQiXinExecutionListByName({ creditNo: val })
        if (resC.code == 1 || resC.message == '查询无结果') {
          var _executionList = JSON.parse((resC.data || {}).records || '[]') || []
          executionList.value = _executionList

          var _info = {
            LawsuitList: lawsuitList.value,
            ExecutedpersonList: executedpersonList.value,
            ExecutionList: executionList.value
          }
          await PostQiXinComCreditEvent(_info)
        }
      }

      const getQiXinBaoinfo = async (val: any) => {
        //获取启信宝裁判文书列表
        GetQiXinLawsuitListByNameEvent(val)
        //获取启信宝被执行企业列表
        GetQiXinExecutedpersonListByNameEvent(val)
        //获取启信宝失信被执行企业列表
        await GetQiXinExecutionListByNameEvent(val)
      }

      const GetQiXinbao = async (val: any) => {
        let res = await GetQiXinBasicInfoAsync(val)
        if (res.code == 1) {
          let _obj = JSON.parse(res.data || '')
          if (data.ruleForm.Name != _obj.name) {
            ElMessage({
              type: 'error',
              message: '公司名称于启信宝检测的不一致'
            })
            return false
          }
          // 法人代表
          data.ruleForm.CdelegateMan = _obj.operName
          // 注册资金
          let RegisteredAmt = parseInt((_obj.registCapi || '万').split('万')[0])
          data.ruleForm.RegisteredAmt = RegisteredAmt + ''
          // 成立时间
          data.ruleForm.SetupDate = _obj.startDate
          // 网址
          // that.ruleForm.Url = _obj.startDate;
          // 地址
          data.ruleForm.Address = _obj.address
          // 企业类型
          data.ruleForm.QiXinBao_EconKind = _obj.econKind
          // 经营状态
          data.ruleForm.QiXinBao_Status = _obj.new_status

          data.ruleForm.QiXinBao_creditNo = _obj.creditNo

          return true
        } else {
          ElMessage.warning('启信宝校准失败，请输入正确的客户名')
          return false
        }
      }

      const activeName = ref(1)

      ///提交选择客户等级
      const CalcCustomerRank = () => {
        let taxNum = 0
        let industryNum = 0
        let fmNum = 0
        console.log('TaxRank', data.ruleForm)
        if (data.ruleForm.TaxRank != undefined) {
          if (data.ruleForm.TaxRank) {
            taxNum = 20
          }
        } else {
          ElMessage({
            type: 'error',
            message: '请选择是否为纳税50强'
          })
          return false
        }
        if (data.ruleForm.IndustryRank != undefined) {
          if (data.ruleForm.IndustryRank) {
            industryNum = 20
          }
        } else {
          ElMessage({
            type: 'error',
            message: '请选择是否为行业10强'
          })
          return false
        }
        if (data.ruleForm.FMCount) {
          switch (data.ruleForm.FMCount) {
            case '60':
              fmNum = 60
              break
            case '40':
              fmNum = 40
              break
            case '20':
              fmNum = 20
              break
            case '10':
              fmNum = 10
              break
          }
        } else {
          ElMessage({
            type: 'error',
            message: '请选择阀门使用量'
          })
          return false
        }

        let sum = taxNum + industryNum + fmNum

        let rank = 0

        if (sum >= 60) {
          rank = 10
        } else if (sum >= 40) {
          rank = 20
        } else if (sum >= 20) {
          rank = 30
        } else if (sum >= 10) {
          rank = 40
        } else if (sum < 10) {
          rank = 50
        }
        data.ruleForm.Ranking = rank
        cancelranking()
      }

      const chooseRadioBtn = (type: string, value: any) => {
        if (props.InfoDisabled || from.baseInfoDisable) {
          return
        }
        if (type == '1') {
          data.ruleForm.TaxRank = value
        } else if (type == '2') {
          data.ruleForm.IndustryRank = value
        }
      }
      const activeclike = (val: number) => {
        activeName.value = val
      }

      return {
        getQiXinBaoinfo,
        PostAddSituationCommEvent,
        GetSituationCommListEvent,
        GetQiXinbao,
        lawsuitInfoList,
        ruleFormRef,
        submit,
        activeclike,
        chooseRadioBtn,
        CalcCustomerRank,
        activeName
      }
    }

    const data = reactive({
      customerId: 0,
      ViewType: 1,
      AddRegion: {
        CusName: '',
        view: false,
        dataid: 0,
        viewtype: 1,
        title: ''
      },
      Approval: {
        remark: ''
      },
      //主观调查列表
      commList: [],
      sitcom: {
        CreditResults: 0,
        CreditNote: '',
        Score: 0
      },
      com: {
        LawsuitInfo: '',
        CustomerId: 0,
        Score: 0,
        CreditResults: 0,
        CreditProblem: '',
        CreditScore: 0
      },
      checkrelationdata: [],
      SituationData: [],
      tableData: [{ address: 'asd' }, { address: 'asd' }, { address: 'asd' }, { address: 'asd' }, { address: 'asd' }],
      currentUser: {},
      currentSelectCustomer: '',
      isShowMessage: false,
      isShowCustomerMessage: false,
      customerMessage: '',
      currentCustomer: '',
      messageType: '',
      restaurants: [],
      ruleForm: {
        CompanyId: undefined,
        CompanyName: '',
        CompanyNameAbbr: '',
        TaxRank: undefined,
        IndustryRank: undefined,
        FMCount: undefined,
        ParkAddress: '',
        CityAddress: [],
        Addr_Province: '', //省
        Addr_City: '', //市
        Addr_Area: '', //区
        CreateBy: 0,
        UserName: '',
        CompName: '',
        DeptName: '',
        PostName: '',
        CompId: 0,
        DeptId: 0,
        PostId: 0,
        QiXinBao_creditNo: '',
        CreditScore: 0,
        Id: 0,
        Name: '',
        Checked: 0,
        Ranking: 0,
        CdelegateMan: '',
        RegisteredAmt: '',
        SetupDate: '',
        Address: '',
        CompleteWebsit: '',
        QiXinBao_EconKind: '',
        QiXinBao_Status: '',
        Trade: [],
        Trade_One: '',
        Trade_Two: ''
      },
      baseInfoDisable: false,
      linkInfo: {},
      Name: ''
    })

    const openRegion = () => {
      if (data.ruleForm.Name == '') {
        ElMessage.warning('请先输入客户名')
        return false
      }
      data.AddRegion.CusName = data.ruleForm.Name
      data.AddRegion.view = true
    }

    const closeRegion = () => {
      data.AddRegion.view = false
    }
    const setdisable = (val: any) => {
      if (data.ruleForm.Id == 0) {
        data.baseInfoDisable = false
      } else {
        data.baseInfoDisable = val
      }
      console.log('data.baseInfoDisable', data.baseInfoDisable)
    }
    const radioVals = reactive([
      {
        title: '是',
        value: true
      },
      {
        title: '否',
        value: false
      }
    ])

    //关联客户分页
    const pageInfo = reactive({
      count: 0,
      page: 1,
      size: 10
    })
    const handleSizeChange = (val: number) => {
      pageInfo.size = val
      GetRelationListEvent()
    }
    const handleCurrentChange = (val: number) => {
      pageInfo.page = val
      GetRelationListEvent()
    }

    const GetRelationListEvent = () => {
      let postdata: any = {}
      postdata = pageInfo
      postdata.CusId = data.ruleForm.Id
      if (data.ruleForm.Id > 0) {
        GetRelationList(postdata).then((res) => {
          if (res.code == 1) {
            data.checkrelationdata = res.data.data
            pageInfo.count = res.data.count
          }
        })
      }
    }

    ///联系人分页
    const sitpage = reactive({
      count: 0,
      page: 1,
      size: 10
    })
    const sithandleSizeChange = (val: number) => {
      sitpage.size = val
      SituationInfoList()
    }
    const sithandleCurrentChange = (val: number) => {
      sitpage.page = val
      SituationInfoList()
    }
    const SituationInfoList = () => {
      let postdata: any = {}
      postdata = sitpage
      postdata.CustomerId = data.ruleForm.Id
      if (data.ruleForm.Id > 0) {
        GetSituationInfoList(postdata).then((res) => {
          if (res.code == 1) {
            data.SituationData = res.data.data
            sitpage.count = res.data.count
          }
        })
      }
    }

    const GetCustomerById = async () => {
      if (data.ViewType != 1) {
        let res = await GetCustomer({ CustomerId: data.customerId })

        if (res.code == 1) {
          var cus = res.data.Cus

          cus.Trade = JSON.parse(cus.Trade)
          cus.CityAddress = JSON.parse(cus.CityAddress)
          data.ruleForm = cus

          setdisable(true)
          //关联企业信息
          data.checkrelationdata = res.data.relation.data
          pageInfo.count = res.data.relation.count
          //联系人信息
          data.SituationData = res.data.sit.data
          sitpage.count = res.data.sit.count
          //启信宝信用调查信息
          data.com = res.data.com

          //await frommothed(data.ruleForm, data).getQiXinBaoinfo(data.ruleForm.QiXinBao_creditNo)

          console.log(data.checkrelationdata)
          console.log('---------', data.ruleForm)
        }
        GetRegion(data.ruleForm.CreateBy)
      } else {
        GetUserinformation(0).then((res) => {
          if (res.code == 1) {
            data.ruleForm.CreateBy = res.data.UserId
            data.ruleForm.UserName = res.data.RealName
            data.ruleForm.CompName = res.data.CompName
            data.ruleForm.DeptName = res.data.DeptName
            data.ruleForm.PostName = res.data.PostName
            data.ruleForm.CompId = res.data.CompId
            data.ruleForm.DeptId = res.data.DeptId
            data.ruleForm.PostId = res.data.PostId
            GetRegion(res.data.UserId)
          }
        })
      }
    }

    const nameForm = reactive({})
    const informationForm = reactive({})
    const ApproveStep = reactive({})
    // 筛选数据
    const boxStyle = reactive({
      boxWidth: 'w-1070',
      boxHeight: '',
      boxPaddingTop: 'pt-12'
    })
    const companyboxStyle = reactive({
      boxWidth: 'w-400',
      boxHeight: '',
      boxPaddingTop: 'pt-12'
    })
    const comboxStyle = reactive({
      boxWidth: 'w-1000',
      boxHeight: '',
      boxPaddingTop: 'pt-12'
    })
    const rankingboxStyle = reactive({
      boxWidth: 'w-400',
      boxHeight: '',
      boxPaddingTop: 'pt-12'
    })
    const nameboxStyle = reactive({
      boxWidth: 'w-800',
      boxHeight: '',
      boxPaddingTop: 'pt-12'
    })
    const closeWindow = (type: string) => {
      if (loading.value == false) {
        context.emit('closeWindow', type)
      }
    }
    // watch(data.ruleForm.Name,(newValue,oldValue) => {
    //     console.log('-------------------',newValue)

    // })

    interface LinkItem {
      Id: number
      Name: string
      CreateBy: number
      CreateOn: string
    }

    const handleSelect = (item: any) => {
      data.ruleForm.Name = item.Name
    }

    const links = ref<LinkItem[]>([])

    const createFilter = (queryString: string) => {
      return (restaurant: LinkItem) => {
        return restaurant.Name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      }
    }

    let timeout: NodeJS.Timeout
    const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
      const results = queryString ? links.value.filter(createFilter(queryString)) : links.value

      clearTimeout(timeout)

      timeout = setTimeout(() => {
        cb(results)
      }, 100 * Math.random())
    }

    const autocompleteEvent = () => {
      console.log('**********************************', data.ruleForm.Name)
      if (data.ruleForm.Name) {
        loadAll(data.ruleForm.Name)
      } else {
        data.isShowCustomerMessage = false
      }
    }

    const loadAll = async (val: any) => {
      console.log('wwwwwwwwwwwwwwwwwwwwwww', val)
      await GetAllCustomerByAddCustomer(val).then((res) => {
        if (res.code == 1) {
          links.value = res.data
          data.isShowCustomerMessage = false
          for (let index = 0; index < links.value.length; index++) {
            const element = links.value[index]
            if (element.Name == val) {
              transferview.value.cusId = element.Id

              if (element.CreateBy == data.ruleForm.CreateBy) {
                data.isShowMessage = true
              } else {
                data.isShowCustomerMessage = true
              }
              return
            }
          }
        }
      })
    }

    const disabled = ref(false)
    onMounted(() => {
      if (props.info.viewType == 3 || props.info.viewType == 4) {
        data.customerId = props.info.Id
        data.ViewType = props.info.viewType
      } else {
        data.customerId = props.customerId
        data.ViewType = props.ViewType
      }
      console.log('data.ViewType', data.ViewType)
      CustomerTrade()
      GetCustomerById()
    })
    const showdetails = ref(true)
    const showdetailsEvent = () => {
      if (showdetails.value == true) {
        showdetails.value = false
      } else {
        showdetails.value = true
      }
    }

    const tabletopindex = ref(0)
    const checktop = (val: any) => {
      tabletopindex.value = val
    }
    const ApprovalForm = (num: number) => {
      var arr = {
        checkId: props.info.checkId,
        state: num,
        remark: data.Approval.remark,
        dataid: data.customerId
      }
      PostApprovalCustomer(arr).then((res: any) => {
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
    watch(
      () => data.ruleForm.Name,
      (name) => {
        if (data.ViewType == 1) {
          autocompleteEvent()
        }
      }
    )
    return {
      company,
      showcompany,
      changeCompany,
      submitcompany,
      cancelcompany,
      openRegion,
      closeRegion,
      ApprovalForm,
      setdisable,
      TradeChange,
      changeRegion,
      regionProps,
      Region,
      tabletopindex,
      checktop,
      showdetails,
      showdetailsEvent,
      Labordispute,
      Otherdisputes,
      Executivelist,
      viewcontact,
      editcontact,
      DeleteSituationInfo,
      delrelation,
      checkrelation,
      CustomersByNameEvent,
      relationdata,
      disabled,
      GetCustomerById,
      SituationInfoList,
      sitpage,
      sithandleSizeChange,
      sithandleCurrentChange,
      relationpageInfo,
      relationhandleSizeChange,
      relationhandleCurrentChange,
      relationview,
      cancelrelation,
      showrelation,
      defaultProps,
      Trade,
      changeCurrentBtnIndex,
      checkCustomerNameBtnCurrentIndex,
      nameboxStyle,
      nameview,
      cancelname,
      showname,
      companyboxStyle,
      rankingboxStyle,
      rankingview,
      cancelranking,
      showranking,
      lookinto,
      lookintoview,
      cancellookinto,
      showlookinto,
      pageInfo,
      handleSizeChange,
      handleCurrentChange,
      contactview,
      cancelcontact,
      transferview,
      opentransferv,
      canceltransferv,
      showcontact,
      querySearchAsync,
      handleSelect,
      ...windows(),
      boxStyle,
      comboxStyle,
      data,
      ApproveStep,
      nameForm,
      informationForm,
      radioVals,
      closeWindow,
      ...frommothed(data.ruleForm, data)
    }
  }
})
</script>
<style  type="postcss" scoped>
.addCustomer {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  :deep(.el-select .el-input__wrapper) {
    padding-left: 5px;
  }
  .tabletitle {
    width: 86px;
    text-align: center;
    line-height: 30px;
    height: 30px;
    background: #ffffff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 0px 0px;
  }
  .checktabletitle {
    width: 86px;
    color: #ffffff;
    text-align: center;
    line-height: 30px;
    height: 30px;
    background: #027aff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    border-radius: 4px 4px 0px 0px;
  }
  .cancelbut {
    background: #ffffff;
    border: 1px solid #707070;
    color: #666666;
    &:hover {
      background-color: rgba(2, 122, 255, 0.2);
      border-color: rgba(2, 122, 255, 0.2);
    }
    &:active {
      background-color: rgba(2, 122, 255, 0.2);
      border-color: rgba(2, 122, 255, 0.2);
    }
  }
  .el-radio-group {
    .el-radio {
      margin-right: 10px;
    }
  }

  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 5rem;
  }

  .el-button + .el-button {
    margin-left: 16px;
  }
  .basic_middle {
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    background: #e7f4fe;
    color: #303133;
    .basic_middle_xinyong {
      height: 5rem;
      font-family: Source Han Sans CN;
      .xinyong_center {
        width: 410px;
        background: #ffffff;
        border-top: 1px solid #0274f1;
        border-bottom: 1px solid #0274f1;
      }
      .xinyong {
        width: 145px;
      }
    }
  }
  :deep(.el-table) .cell {
    padding: 0px !important;
  }
  .tableclass {
  }

  .fromdate {
    .el-input {
      .el-input__inner {
        padding: 0px;
      }
    }
    .el-input__prefix {
      display: none;
    }
  }
  .el-form-item {
    margin-bottom: 5px;
  }
  .el-form-item__label {
    color: #303133;
  }
  .demo-tabs {
    .el-tabs__content {
      padding: 32px;
      color: #6b778c;
      font-weight: 600;
    }
    .el-tabs__item {
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 600;
    }
  }
  .newUser_relation {
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
  }
  .newUser_contacts {
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    .newUser_contacts_top {
      text-align: left;
      padding-bottom: 5px;
      border-bottom: 1px solid #707070;
      font-family: Source Han Sans CN;
      font-weight: 600;
    }
  }
  .newUser_qxb {
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    .newUser_qxb_top {
      text-align: left;
      padding-bottom: 5px;
      border-bottom: 1px solid #707070;
      font-family: Source Han Sans CN;
      font-weight: 600;
      color: #027aff;
    }
  }
  .newUser_basic {
    padding: 1rem;
    background: #ffffff;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    .newUser_basic_top {
      padding-bottom: 5px;
      border-bottom: 1px solid #707070;
      font-family: Source Han Sans CN;
      font-weight: 600;
      color: #027aff;
      .newUser_basic_top_title {
        margin-top: auto;
        margin-bottom: auto;
      }
    }

    .newUser_basic_middle {
      padding-top: 0.3rem;
    }
  }

  .newUser-top-fieldset {
    clear: both;
    margin-bottom: 10px;
    fieldset {
      border: 1px solid #e3e3e3;
      padding: 10px 5px;
      legend {
        padding: 0 10px;
      }
    }
  }
}
</style>
