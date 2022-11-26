<template>
  <div>
    <CusDialog :box-style="boxStyle" :is-show="true" :title="title" @closeWindow="closeWindow">
      <div class="addquotation text-base">
        <div class="salerDialog">
          <el-form ref="ruleFormRef" :model="data.form" :rules="rules" :inline="true">
            <el-card class="sale_card">
              <template #header>
                <div class="card-header">
                  <div class="header-left">基本信息</div>
                  <div class="header-right text-right">
                    <div class="flex justify-end">
                      <div class="flex">
                        <el-form-item label="订单编号:" prop="Ranking">
                          <div v-if="data.form.OrderNo == ''" class="flex text-gray-400 cursor-not-allowed">系统保存生成</div>
                          <div v-else>
                            {{ data.form.OrderNo }}
                          </div>
                        </el-form-item>
                        <div class="p-2">
                          <el-icon class="cursor-pointer" v-if="showdetails == true" @click="showdetailsEvent(false)">
                            <el-icon-ArrowDownBold />
                          </el-icon>
                          <el-icon class="cursor-pointer" v-if="showdetails == false" @click="showdetailsEvent(true)">
                            <el-icon-ArrowRightBold />
                          </el-icon>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div v-show="showdetails == true">
                <el-form-item label="客户名称" class="Contactclass" @click="showrelation" prop="CustomerName">
                  <el-input :readonly="data.disabled" v-model="data.form.CustomerName" placeholder="请输入" style="width: 410px" />
                </el-form-item>
                <el-form-item label="业务日期" prop="CreateOn">
                  <el-input :readonly="data.disabled" v-model="data.form.CreateOn" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="事业部" prop="ComName">
                  <el-input :readonly="data.disabled" v-model="data.form.CompName" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="联系人" class="Contactclass" @click="showcontact(1)" prop="CustomerConName">
                  <el-select :disabled="data.disabled" v-model="data.form.CustomerConName" @change="contactchange(1)" placeholder="请选择" class="Nameinputclass">
                    <el-option v-for="item in data.SituationData.filter((f) => f.Type != '居间人')" :key="item.Id" :label="item.Name" :value="item.Name"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="手机" prop="CC_Telephone" v-if="data.form.ContactsContact.findIndex((f) => f == 1) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CC_Telephone" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="微信" v-if="data.form.ContactsContact.findIndex((f) => f == 2) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CC_WeiXin" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="邮箱" v-if="data.form.ContactsContact.findIndex((f) => f == 3) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CC_Email" placeholder="请输入" class="emailinputclass" />
                </el-form-item>
                <el-form-item label="公司手机" v-if="data.form.ContactsContact.findIndex((f) => f == 4) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CC_CompanyMobile" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="QQ" v-if="data.form.ContactsContact.findIndex((f) => f == 5) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CC_QQ" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="电话" v-if="data.form.ContactsContact.findIndex((f) => f == 6) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CC_Mobile" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="业务员" class="Contactclass" @click="showcontact(2)" prop="SalerName">
                  <el-input :readonly="data.disabled" v-model="data.form.SalerName" placeholder="请输入" class="Nameinputclass" />
                </el-form-item>
                <el-form-item label="手机" prop="S_Telephone" v-if="data.form.SalesmanContact.findIndex((f) => f == 1) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.S_Telephone" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="微信" v-if="data.form.SalesmanContact.findIndex((f) => f == 2) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.S_WeiXin" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="邮箱" v-if="data.form.SalesmanContact.findIndex((f) => f == 3) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.S_Email" placeholder="请输入" class="emailinputclass" />
                </el-form-item>
                <el-form-item label="公司手机" v-if="data.form.SalesmanContact.findIndex((f) => f == 4) > -1">
                  <el-input :readonly="data.disabled" t v-model="data.form.S_CompanyMobile" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="QQ" v-if="data.form.SalesmanContact.findIndex((f) => f == 5) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.S_QQ" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="电话" v-if="data.form.SalesmanContact.findIndex((f) => f == 6) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.S_Mobile" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="居间人" class="Contactclass" @click="showcontact(3)">
                  <el-select v-if="!data.disabled" v-model="data.form.CustomerIntId" @change="contactchange(2)" placeholder="请选择" class="Nameinputclass">
                    <el-option v-for="item in data.IntermediatorData" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                    {{ data.form.CustomerIntId }}
                  </el-select>
                  <el-input v-else :readonly="true" v-model="data.form.CustomerIntName" placeholder="请输入" class="Nameinputclass" />
                </el-form-item>
                <el-form-item label="手机" v-if="data.form.BrokerContact.findIndex((f) => f == 1) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CI_Telephone" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="微信" v-if="data.form.BrokerContact.findIndex((f) => f == 2) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CI_WeiXin" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="邮箱" v-if="data.form.BrokerContact.findIndex((f) => f == 3) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CI_Email" placeholder="请输入" class="emailinputclass" />
                </el-form-item>
                <el-form-item label="公司手机" v-if="data.form.BrokerContact.findIndex((f) => f == 4) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CI_CompanyMobile" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="QQ" v-if="data.form.BrokerContact.findIndex((f) => f == 5) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CI_QQ" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="电话" v-if="data.form.BrokerContact.findIndex((f) => f == 6) > -1">
                  <el-input :readonly="data.disabled" v-model="data.form.CI_Mobile" placeholder="请输入" class="inputclass" />
                </el-form-item>
              </div>
            </el-card>

            <el-card v-show="showdetails == true" class="sale_card mt-4">
              <template #header>
                <div class="card-header">
                  <div class="header-left">报价信息</div>
                  <div class="header-right text-right">
                    <div class="flex justify-end">
                      <div class="flex">
                        <el-form-item label="报价程度:" prop="Ranking">
                          <div class="flex cursor-not-allowed">
                            <div class="text-red-600" v-if="data.form.Degree == '必跟订单'">
                              {{ data.form.Degree }}
                            </div>
                            <div class="text-green-500" v-if="data.form.Degree == '重点订单'">
                              {{ data.form.Degree }}
                            </div>
                            <div class="text-blue-500" v-if="data.form.Degree == '普通订单'">
                              {{ data.form.Degree }}
                            </div>
                            <div v-if="data.form.Degree == ''">自动计算生成</div>
                          </div>
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <div>
                <el-form-item label="报价单位" prop="CompanyId">
                  <el-select v-if="!data.disabled" :disabled="data.disabled" @change="changeCompany" v-model="data.form.CompanyId" placeholder="请选择报价单位" class="inputclass">
                    <el-option v-for="item in data.Company" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                  </el-select>
                  <el-input v-else :readonly="true" v-model="data.form.CompanyName" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="标牌证件" prop="Signage">
                  <el-select :disabled="data.disabled" @change="changeSignage" v-model="data.form.Signage" placeholder="请选择标牌证件" class="inputclass">
                    <el-option v-for="item in dic.Signage" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="税收情况" prop="TaxType">
                  <el-select :disabled="data.disabled" v-model="data.form.TaxType" placeholder="请选择税收情况" class="inputclass">
                    <el-option v-for="item in dic.TaxType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="税费" prop="Taxation">
                  <el-input :readonly="true" v-model="data.form.Taxation" placeholder="请输入" class="otherinputclass">
                    <template #append>%</template>
                  </el-input>
                </el-form-item>

                <el-form-item label="询价阶段" prop="IS_State">
                  <el-input :readonly="data.disabled" v-model="data.form.IS_State" @click="showInquirystage" placeholder="请选择" class="inputclass">
                    <template #append>{{ data.form.IS_Rate }}%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="询价性质" prop="IN_State">
                  <el-input :readonly="data.disabled" v-model="data.form.IN_State" @click="showInquiryNature" placeholder="请选择" class="inputclass">
                    <template #append>{{ data.form.IN_Rate }}%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="询价数量" prop="IQ_State">
                  <el-input :readonly="data.disabled" v-model="data.form.IQ_State" @click="showInquiryQuantity" placeholder="请选择" class="inputclass">
                    <template #append>{{ data.form.IQ_Rate }}%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="信用等级" prop="CreditScore">
                  <el-input :readonly="true" v-model="data.form.CreditScore" placeholder="请输入" class="otherinputclass" />
                </el-form-item>

                <el-form-item label="付款方式" prop="Payment">
                  <el-input :readonly="true" v-model="data.form.Payment" placeholder="请输入" style="display: none" />
                  <div class="flex justify-between">
                    <div class="flex">
                      <div style="line-height: 31px" class="pr-2">预付</div>
                      <el-input @click="openPayment" :readonly="true" v-model="data.form.Advance" type="Number" placeholder="" class="payinputclass">
                        <template #append>%</template>
                      </el-input>
                    </div>
                    <div class="flex">
                      <div style="line-height: 31px" class="pr-2">发货</div>
                      <el-input @click="openPayment" :readonly="true" v-model="data.form.Deliver" type="Number" placeholder="" class="payinputclass">
                        <template #append>%</template>
                      </el-input>
                    </div>
                    <div class="flex">
                      <div style="line-height: 31px" class="pr-2">到付</div>
                      <el-input @click="openPayment" :readonly="true" v-model="data.form.Arrival" type="Number" placeholder="" class="payinputclass">
                        <template #append>%</template>
                      </el-input>
                    </div>
                    <div class="flex">
                      <div style="line-height: 31px" class="pr-2">质保</div>
                      <el-input @click="openPayment" :readonly="true" v-model="data.form.Warranty" type="Number" placeholder="" class="payinputclass">
                        <template #append>%</template>
                      </el-input>
                    </div>
                  </div>
                </el-form-item>

                <el-form-item label="运费" prop="Freight">
                  <el-select :disabled="data.disabled" v-model="data.form.Freight" placeholder="请选择运费" class="otherinputclass">
                    <el-option v-for="item in dic.FreightType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="付款备注" prop="Name">
                  <el-input @click="openPayment" :readonly="true" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" v-model="data.form.PaymentNote" placeholder="请输入" style="width: 893px" />
                </el-form-item>

                <el-form-item label="采购调查" prop="Name">
                  <el-input :readonly="true" @click="openCredit" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" v-model="data.form.PurchaseNote" placeholder="请输入" style="width: 893px" />
                </el-form-item>
                <el-form-item label="方案对策" prop="Name">
                  <el-input :readonly="true" @click="openCredit" :autosize="{ minRows: 1, maxRows: 10 }" type="textarea" v-model="data.form.PurchaseMethod" placeholder="请输入" style="width: 893px" />
                </el-form-item>
                <div class="pl-2">
                  <el-link type="primary" style="font-size: 14px" @click="openCompete">查看并添加竞争对手</el-link>
                </div>

                <!--                 <div>
                  <div class="uploadfile flex">
                    <div class='header-left'>附件信息</div>
                    <div class="header-right pl-4">
                      <el-form-item label='' prop="Name">
                        <div>
                          客户方技术联系人：
                          <el-input v-model='data.form.TechnicalName' placeholder='请输入' class="otherinputclass" />
                        </div>

                      </el-form-item>
                      <el-form-item label='' prop="Name">
                        <div>
                          联系方式：
                          <el-input v-model='data.form.TechnicalContact' placeholder='请输入' class="otherinputclass" />
                        </div>

                      </el-form-item>

                    </div>
                  </div>
                  <div class="pt-4 -mt-12">
                    <uploadfile :isdisabled='false' :uploadFileList='data.form.FileList' @uploadFileData='uploadFileData'></uploadfile>
                  </div>

                </div> -->
              </div>
            </el-card>
            <div class="flex justify-between mt-2">
              <div class="flex">
                <div class="cursor-pointer" :class="tabletopindex == 0 ? 'checktabletitle' : 'tabletitle'" @click="checktop(0)">产品清单</div>
                <div class="cursor-pointer" :class="tabletopindex == 1 ? 'checktabletitle' : 'tabletitle'" @click="checktop(1)">上传文件</div>
                <div v-if="ViewType != 1" class="cursor-pointer" :class="tabletopindex == 2 ? 'checktabletitle' : 'tabletitle'" @click="checktop(2)">订单跟踪</div>
                <!--                   <div class="cursor-pointer" :class="tabletopindex==2?'checktabletitle':'tabletitle'" @click="checktop(2)">开票信息</div> -->
              </div>
              <div class="mt-1">
                <div v-if="tabletopindex == 0">
                  <div class="flex justify-end" v-show="showinfo && data.disabled == false">
                    <el-button size="small" type="primary" @click="getvalveinfo">解析型号</el-button>
                    <el-button size="small" type="primary" @click="showtable">分离表单</el-button>
                    <el-popover placement="top" :width="220" trigger="click">
                      <template #reference>
                        <el-button size="small" type="primary">特殊功能</el-button>
                      </template>
                      <div class="flex">
                        <el-button size="small" type="primary" @click="showFieldSetView">字段设置</el-button>

                        <el-popover placement="top" :width="200" trigger="click">
                          <template #reference>
                            <el-button size="small" type="primary">符号</el-button>
                          </template>
                          <div>∅，×，寸（"，'），¼，⅜，½，¾，1½，1¼，2½</div>
                        </el-popover>
                        <el-popover placement="top" :width="200" trigger="click">
                          <template #reference>
                            <el-button type="primary" size="small">行高</el-button>
                          </template>
                          <div class="flex">
                            <el-input-number size="small" v-model="hottablerowheight" :min="10" :max="100" />
                            <el-button type="primary" size="small" @click="saverowheight" class="ml-1">确定</el-button>
                          </div>
                        </el-popover>
                      </div>
                    </el-popover>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-white border-blue-300 border-solid border rounded-b-lg">
              <div v-show="tabletopindex == 0">
                <div v-show="showinfo" :class="hottabledata.tableVisible ? 'table_excel' : ''">
                  <div :class="hottabledata.tableVisible ? 'table_excel_div' : ''">
                    <div v-if="hottabledata.tableVisible" class="text-right p-4">
                      <el-button type="primary" @click="getvalveinfo">解析型号</el-button>
                      <el-button class="warningbut" @click="canceltable">取消分离</el-button>
                      <el-popover placement="top" :width="220" trigger="click">
                        <template #reference>
                          <el-button type="primary">特殊功能</el-button>
                        </template>
                        <div class="flex">
                          <el-button type="primary" @click="showFieldSetView" size="small">字段设置</el-button>

                          <el-popover placement="top" :width="200" trigger="click">
                            <template #reference>
                              <el-button type="primary" size="small">符号</el-button>
                            </template>
                            <div>∅，×，寸（"，'），¼，⅜，½，¾，1½，1¼，2½</div>
                          </el-popover>
                          <el-popover placement="top" :width="200" trigger="click">
                            <template #reference>
                              <el-button type="primary" size="small">行高</el-button>
                            </template>
                            <div class="flex">
                              <el-input-number size="small" v-model="hottablerowheight" :min="10" :max="100" />
                              <el-button type="primary" size="small" @click="saverowheight" class="ml-1">确定</el-button>
                            </div>
                          </el-popover>
                        </div>
                      </el-popover>
                    </div>
                    <tableindex ref="hotTable" :data="hottabledata"></tableindex>
                    <el-dialog custom-class="tabledialog" v-if="FieldSetView" :before-close="cancelFieldSetView" v-model="FieldSetView" width="850px" :close-on-click-modal="false" :close-on-press-escape="false">
                      <div>
                        <div class="p-4">
                          <el-button type="primary" size="small" @click="showprintview">预览</el-button>
                        </div>
                        <div class="inquiry-edit-excel-column-check">
                          <el-transfer ref="eltran" v-model="checkFieldDataValue" target-order="push" style="text-align: left; display: inline-block" :titles="['字段集', '已选字段']" :props="{ key: 'id', label: 'colname' }" :data="checkFieldData.filter((f) => f.hide == 0)" @change="handleChange" @right-check-change="rightCheckChange">
                            <template #default="{ option }">
                              <div class="transfer-label">
                                <div class="label-name">
                                  <span v-if="option.sort > 0">{{ option.sort }}、</span>
                                  <span v-if="option.rename != ''">{{ option.rename }}</span>
                                  <span v-else>{{ option.colname }}</span>
                                </div>
                                <div class="label-switch" v-if="option.show == 1">
                                  <el-switch v-model="option.base" size="large" active-color="#409eff" inactive-color="#e6a23c" inline-prompt active-text="可见" inactive-text="隐藏" :active-value="1" :inactive-value="0"> </el-switch>
                                </div>
                                <div class="label-input">
                                  列宽
                                  <el-input-number v-model="option.width" size="small"></el-input-number>
                                </div>
                                <div class="label-operate">
                                  <el-button class="successbut" v-if="option.merge" size="small" @click="showreanme(option)">重命名</el-button>
                                  <el-button class="dangerbut" v-if="option.merge" size="small" @click="splitfield(option)">拆分</el-button>
                                </div>
                              </div>
                            </template>
                          </el-transfer>
                        </div>
                        <div class="text-center p-6">
                          <el-button type="primary" size="small" @click="showcolumn">新增字段</el-button>
                          <el-button type="primary" size="small" @click="mergefield">合并</el-button>
                          <el-button type="success" size="small" @click="changesort(1)">上移</el-button>
                          <el-button type="warning" size="small" @click="changesort(2)">下移</el-button>
                          <el-button type="primary" size="small" @click="submitField">确定</el-button>
                        </div>
                      </div>

                      <el-dialog custom-class="renameclass" v-model="renameVisible" width="20%" :before-close="cancelreanme" :close-on-click-modal="false" :close-on-press-escape="false" title="重命名">
                        <div>
                          <div class="pb-4">请输入新名称</div>
                          <el-input v-model="renameoption.rename"></el-input>
                        </div>
                        <div class="text-center pt-6">
                          <el-button class="dangerbut" @click="cancelreanme">取消</el-button>
                          <el-button @click="submitrename">确认</el-button>
                        </div>
                      </el-dialog>

                      <el-dialog custom-class="renameclass" v-model="columnvisible" width="20%" :before-close="cancelcolumn" :close-on-click-modal="false" :close-on-press-escape="false">
                        <div>
                          <div class="pb-4">请输新增字段名称</div>
                          <el-input v-model="columnoption.rename"></el-input>
                        </div>
                        <div class="text-center pt-6">
                          <el-button class="dangerbut" @click="cancelcolumn">取消</el-button>
                          <el-button @click="submitcolumn">确认</el-button>
                        </div>
                      </el-dialog>
                    </el-dialog>
                  </div>
                </div>
              </div>
              <div v-show="tabletopindex == 1" class="p-2">
                <div>
                  <el-form-item label="">
                    <div>
                      客户方技术联系人：
                      <el-input v-model="data.form.TechnicalName" placeholder="请输入" class="otherinputclass" />
                    </div>
                  </el-form-item>
                  <el-form-item label="">
                    <div>
                      联系方式：
                      <el-input v-model="data.form.TechnicalContact" placeholder="请输入" class="otherinputclass" />
                    </div>
                  </el-form-item>
                </div>
                <div class="pt-2" :class="data.disabled ? '' : '-mt-12'">
                  <uploadfile :isdisabled="data.disabled" :uploadFileList="data.form.FileList" @uploadFileData="uploadFileData"></uploadfile>
                </div>
              </div>
              <div v-if="tabletopindex == 2">
                <div class="flex border-dashed border-b-2 border-blue-400 p-2">
                  <div class="w-20">跟进内容</div>
                  <div class="w-full">
                    <el-input v-model="data.track.Note" type="textarea" :autosize="{ minRows: 3, maxRows: 6 }" placeholder="请输入" />
                  </div>
                </div>
                <div class="p-2 overflow-y-auto max-h-80" style="border-radius: 0px">
                  <div v-for="(item, index) in data.trackList" :key="index" class="border-dashed border-l-2 border-blue-400 relative p-4">
                    <div class="w-4 h-4 bg-blue-400 rounded-xl absolute -top-2 -left-2"></div>
                    <div>
                      {{ item.CreatName }}<span class="text-gray-400">{{ item.CreateOn }}</span
                      ><span class="text-gray-400"> {{ item.Stage }}</span>
                    </div>
                    <div class="text-gray-500">{{ item.CreditNote }}</div>
                    <div>正常跟进:{{ item.Note }}</div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
          <div class="text-center pt-6">
            <div v-if="ViewType == 5">
              <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
              <el-button type="primary" @click="submitTrack"> 提交 </el-button>
            </div>
            <div v-if="ViewType == 1">
              <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
            </div>
          </div>
        </div>
      </div>
    </CusDialog>
    <CusDialog v-if="purchaseview" :box-style="tableboxStyle" title="企业采购原则调查" :is-show="true" @closeWindow="cancelpurchaseview">
      <el-card class="sale_card">
        <template #header>
          <div class="card-header">
            <div class="header-left">主观调查</div>
            <div class="header-right">
              <div class="flex justify-end">
                <div>
                  <el-badge :value="purchmessage.count" type="primary" class="mr-8">
                    <el-button @click="showmessageview">
                      消息记录
                      <el-icon-ChatLineRound class="w-4 h-4 mr-2" />
                    </el-button>
                  </el-badge>

                  <el-button @click="addpurchase()">
                    新增
                    <el-icon-plus class="w-4 h-4 mr-2" />
                  </el-button>
                </div>
              </div>
            </div>
          </div>
        </template>
        <div>
          <div>客户对以往供应商有哪些要求？客户以往采购的付款方式和竞争对手有哪些？客户对产品质量等级和技术有哪些要求？</div>
          <el-input :readonly="purchmessage.viewtype == 2" v-model="purchmessage.data.Note" placeholder="请输入" type="textarea" class="w-full" />
        </div>
      </el-card>

      <el-card class="mt-4">
        <template #header>
          <div class="card-header">
            <div class="header-left">方案对策</div>
            <div class="header-right">
              <div class="flex justify-between">
                <div class="pt-4 pl-2">以下方案可供参考</div>
                <div></div>
              </div>
            </div>
          </div>
        </template>
        <el-row>
          <el-col :lg="12"> 1、通过品牌或专业性或同类使用案例影响采购</el-col>
          <el-col :lg="12">3、通过付款方式或价格来影响采购</el-col>
          <el-col :lg="12">2、通过客情或多次拜访影响采购</el-col>
          <el-col :lg="12"> 4、通过供应周期和售后服务影响采购</el-col>
          <el-col :lg="24">
            <el-input :readonly="purchmessage.viewtype == 2" placeholder="请输入" type="textarea" v-model="purchmessage.data.Way"> </el-input>
          </el-col>
        </el-row>
        <div v-if="purchmessage.viewtype == 1" class="text-center pt-4">
          <el-button class="cancelbut" @click="cancelpurchaseview"> 取消 </el-button>
          <el-button type="primary" @click="submitpurch()"> 提交 </el-button>
        </div>
      </el-card>
      <CusDialog v-if="purchmessage.messageview" :box-style="mesboxStyle" title="消息记录" :is-show="true" @closeWindow="cancelmessageview">
        <el-card class="sale_card">
          <el-table border :data="purchmessage.listdata" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '24px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '24px', padding: '0px' }" style="width: 100%">
            <el-table-column type="index" width="60" label="序号" />
            <el-table-column prop="CreateOn" label="录入时间">
              <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
            </el-table-column>
            <el-table-column prop="CreaterName" label="业务员" />
            <el-table-column prop="address" label="操作">
              <template #default="scope">
                <span class="text-blue-400 cursor-pointer" @click="checkSentiment(scope.row)">查看</span>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </CusDialog>
    </CusDialog>
    <CusDialog v-if="data.contactview" :box-style="conboxStyle" title="选择联系方式" :is-show="true" @closeWindow="cancelcontact">
      <el-card class="sale_card">
        <div>
          <el-checkbox-group v-model="data.Contact">
            <el-checkbox :label="1">手机</el-checkbox>
            <el-checkbox :label="2">微信</el-checkbox>
            <el-checkbox :label="3">邮箱</el-checkbox>
            <el-checkbox :label="4">公司手机</el-checkbox>
            <el-checkbox :label="5">QQ</el-checkbox>
            <el-checkbox :label="6">电话</el-checkbox>
          </el-checkbox-group>
        </div>
        <div class="text-center pt-4">
          <el-button class="cancelbut" @click="cancelcontact"> 取消 </el-button>
          <el-button type="primary" @click="changeContact()"> 提交 </el-button>
        </div>
      </el-card>
    </CusDialog>
    <CusDialog v-if="data.Inquirystage.show" :box-style="conboxStyle" title="选择询价阶段" :is-show="true" @closeWindow="cancelInquirystage">
      <el-card class="sale_card">
        <div>
          <div class="flex pt-2">
            <div class="pt-2 pr-4">询价阶段</div>
            <div>
              <el-radio-group v-model="data.Inquirystage.state">
                <el-radio label="采购阶段">采购阶段</el-radio>
                <el-radio label="比价阶段">比价阶段</el-radio>
                <el-radio label="预算阶段">预算阶段</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="flex">
            <div class="pt-2 pr-4">信息准确度</div>
            <div>
              <el-radio-group v-model="data.Inquirystage.rate">
                <el-radio :label="30">30%</el-radio>
                <el-radio :label="60">60%</el-radio>
                <el-radio :label="80">80%</el-radio>
                <el-radio :label="100">100%</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div>
            <el-input type="textarea" :row="2" v-model="data.Inquirystage.note" placeholder="请输入理由"></el-input>
          </div>
        </div>
        <div class="text-center pt-4">
          <el-button class="cancelbut" @click="cancelInquirystage"> 取消 </el-button>
          <el-button type="primary" @click="submitInquirystage()"> 提交 </el-button>
        </div>
      </el-card>
    </CusDialog>
    <CusDialog v-if="data.InquiryQuantity.show" :box-style="conboxStyle" title="选择询价数量" :is-show="true" @closeWindow="cancelInquiryQuantity">
      <el-card class="sale_card">
        <div>
          <div class="flex pt-2">
            <div class="pt-2 pr-4">询价数量</div>
            <div>
              <el-radio-group v-model="data.InquiryQuantity.state">
                <el-radio label="新项目">新项目</el-radio>
                <el-radio label="检修或批量">检修或批量</el-radio>
                <el-radio label="零星采购">零星采购</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="flex">
            <div class="pt-2 pr-4">信息准确度</div>
            <div>
              <el-radio-group v-model="data.InquiryQuantity.rate">
                <el-radio :label="30">30%</el-radio>
                <el-radio :label="60">60%</el-radio>
                <el-radio :label="80">80%</el-radio>
                <el-radio :label="100">100%</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div>
            <el-input type="textarea" :row="2" v-model="data.InquiryQuantity.note" placeholder="请输入理由"></el-input>
          </div>
        </div>
        <div class="text-center pt-4">
          <el-button class="cancelbut" @click="cancelInquiryQuantity"> 取消 </el-button>
          <el-button type="primary" @click="submitInquiryQuantity()"> 提交 </el-button>
        </div>
      </el-card>
    </CusDialog>
    <CusDialog v-if="data.InquiryNature.show" :box-style="conboxStyle" title="选择询价性质" :is-show="true" @closeWindow="cancelInquiryNature">
      <el-card class="sale_card">
        <div>
          <div class="flex pt-2">
            <div class="pt-2 pr-4">询价性质</div>
            <div>
              <el-radio-group v-model="data.InquiryNature.state">
                <el-radio label="重点比价">重点比价</el-radio>
                <el-radio label="选择比价">选择比价</el-radio>
                <el-radio label="陪衬比价">陪衬比价</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div class="flex pt-2">
            <div class="pt-2 pr-4 w-16">定义</div>
            <div class="w-full">
              <el-input type="textarea" :readonly="true" :autosize="{ minRows: 2, maxRows: 10 }" v-model="data.InquiryNature.info.find((f) => f.name == (data.InquiryNature.state == '' ? '重点比价' : data.InquiryNature.state)).mean" placeholder="请输入理由"></el-input>
            </div>
          </div>
          <div class="flex pt-2">
            <div class="pt-2 pr-4 w-16">特点</div>
            <div class="w-full">
              <el-input type="textarea" :readonly="true" :autosize="{ minRows: 2, maxRows: 10 }" v-model="data.InquiryNature.info.find((f) => f.name == (data.InquiryNature.state == '' ? '重点比价' : data.InquiryNature.state)).points" placeholder="请输入理由"></el-input>
            </div>
          </div>
          <div class="flex">
            <div class="pt-2 pr-4">信息准确度</div>
            <div>
              <el-radio-group v-model="data.InquiryNature.rate">
                <el-radio :label="30">30%</el-radio>
                <el-radio :label="60">60%</el-radio>
                <el-radio :label="80">80%</el-radio>
                <el-radio :label="100">100%</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div>
            <el-input type="textarea" :row="2" v-model="data.InquiryNature.note" placeholder="请输入理由"></el-input>
          </div>
        </div>
        <div class="text-center pt-4">
          <el-button class="cancelbut" @click="cancelInquiryNature"> 取消 </el-button>
          <el-button type="primary" @click="submitInquiryNature()"> 提交 </el-button>
        </div>
      </el-card>
    </CusDialog>

    <CusDialog v-if="relationview" :boxStyle="boxStyle" title="选择客户" :is-show="true" @closeWindow="cancelrelation">
      <div>
        <div class="sale_card flex flex-row-reverse w-full" style="padding: 0px">
          <div></div>
          <div>
            <el-input v-model="relationpageInfo.Name" placeholder="请输入客户名称" style="width: 200px" class="mr-2"></el-input>
            <el-button type="primary" @click="CustomersByNameEvent">搜索</el-button>
          </div>
        </div>

        <el-card class="sale_card mt-2">
          <div>
            <el-table border :data="relationdata" :header-cell-style="{ 'font-size': '14px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '24px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '24px', padding: '0px' }" style="width: 100%">
              <el-table-column type="index" width="70" label="序号" />
              <el-table-column prop="CreateOn" label="录入时间" width="120">
                <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
              </el-table-column>
              <el-table-column prop="Name" label="客户名称" />
              <el-table-column prop="address" width="120" label="操作">
                <template #default="scope">
                  <span class="text-blue-400 cursor-pointer" @click="checkcustomer(scope.row)">点击选择</span>
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
    <AddPurchase v-if="AddCreditinfo.view" :CustomerName="AddCreditinfo.CusName" :ViewType="AddCreditinfo.viewtype" :CustomerId="AddCreditinfo.dataid" :title="AddCreditinfo.title" @closeWindow="closeCredit" />
    <AddPayment v-if="Paymentview.view" :CustomerName="Paymentview.CusName" :ViewType="Paymentview.viewtype" :CustomerId="Paymentview.dataid" :title="Paymentview.title" @closeWindow="closePayment" />
    <CompeteList v-if="Competeview.view" :CustomerName="Competeview.CusName" :ViewType="Competeview.viewtype" :CustomerId="Competeview.dataid" :title="Competeview.title" @closeWindow="closeCompete" />

    <printindex v-if="printdata.view" :printData="printdata" @closeWindow="cancelprintview"></printindex>
  </div>
</template>
<script lang="ts" setup>
import CompeteList from '/@/views/Sale/Customer/Credit/Compete/CompeteList.vue'
import AddPayment from '/@/views/Sale/Customer/Credit/Payment/AddPayment.vue'
import AddPurchase from '/@/views/Sale/Customer/Credit/Purchase/AddPurchase.vue'

import printindex from '/@/views/Sale/Print/printindex.vue'
import { getGBValveModelAnalysis, postGBValveModelBatchAnalysis } from '/@/api/tech/ProductFormula'
import { GetUserinformation } from '/@/api/layout/index'
import { GetCustomersByName, GetSituationInfoList, GetPurchaseList, GetPurchaseInfo, PostAddPurchase, GetCustomerReportsById, GetPaymentInfo } from '/@/api/hr/School/PracticalBase'
import { GetTrackList, PostAddOrderTrack, GetCompanyByCustomer, PostAddCustomerOrder, GetCustomerOrderInfo } from '/@/api/hr/School/PracticalBase'
import { GetIntermediatorByCusId } from '/@/api/Sale/Intermediator'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import tableindex from './QuotainIndex.vue'
import { isMobileTel, isEmail, isNumber, isTel } from '/@/utils/validate'
import { parseTime, getTime } from '/@/utils/tools'
import {
  rtype, //询价性质
  FreightType, //运费
  Signage, //标牌证件
  PayMethodDetail //付款方式
} from '/@/utils/techprocess'
import { reactive, ref, onMounted } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() //记得加这一句

const dic = reactive({
  TaxType: [],
  FreightType: [],
  PayMethodDetail: [],
  Signage: [] //标牌证件
})
//获取字典数据
const getDictionaryData = () => {
  //运费
  store.getDict('sale_Order_FreightType').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.FreightType = res
    console.log('dic.InvoiceStage', dic.FreightType)
  })

  //标牌证件
  store.getDict('sale_Order_PayMethodDetail').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.PayMethodDetail = res
  })
  //税收情况
  store.getDict('sale_Order_TaxType').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.TaxType = res
  })

  //标牌证件
  store.getDict('sale_Order_Signage').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Signage = res
  })
}

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  Payment: [
    {
      required: true,
      message: '请选择付款方式',
      trigger: 'change'
    }
  ],
  Freight: [
    {
      required: true,
      message: '请选择运费',
      trigger: 'change'
    }
  ],
  Taxation: [
    {
      required: true,
      message: '请输入税费',
      trigger: 'change'
    }
  ],
  Signage: [
    {
      required: true,
      message: '请选择标牌证件',
      trigger: 'change'
    }
  ],
  TaxType: [
    {
      required: true,
      message: '请选择税收情况',
      trigger: 'change'
    }
  ],
  CompanyId: [
    {
      required: true,
      message: '请选择报价单位',
      trigger: 'change'
    }
  ],
  CustomerName: [
    {
      required: true,
      message: '请选择客户',
      trigger: 'change'
    }
  ],
  CustomerConName: [
    {
      required: true,
      message: '请选择客户联系人',
      trigger: 'change'
    }
  ],
  CC_Telephone: [
    {
      required: true,
      message: '请输入客户联系人手机',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  CC_WeiXin: [
    {
      required: true,
      message: '请输入客户微信',
      trigger: 'change'
    }
  ],
  CC_Email: [
    {
      required: true,
      message: '请输入客户邮箱',
      trigger: 'change'
    },
    {
      validator: isEmail,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  CC_CompanyMobile: [
    {
      required: true,
      message: '请输入客户联系人公司手机',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  CC_QQ: [
    {
      required: true,
      message: '请输入客户QQ',
      trigger: 'change'
    }
  ],
  CC_Mobile: [
    {
      required: true,
      message: '请输入客户QQ',
      trigger: 'change'
    }
  ],
  S_Telephone: [
    {
      required: true,
      message: '请输入个人手机',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  S_WeiXin: [
    {
      required: true,
      message: '请输入业务员微信',
      trigger: 'change'
    }
  ],
  S_Email: [
    {
      required: true,
      message: '请输入业务员邮箱',
      trigger: 'change'
    },
    {
      validator: isEmail,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  S_CompanyMobile: [
    {
      required: true,
      message: '请输入业务员公司手机',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  S_QQ: [
    {
      required: true,
      message: '请输入业务员QQ',
      trigger: 'change'
    }
  ],
  S_Mobile: [
    {
      required: true,
      message: '请输入业务员电话',
      trigger: 'change'
    }
  ],
  CustomerIntId: [
    {
      required: true,
      message: '请选择居间人',
      trigger: 'change'
    }
  ],
  CI_Telephone: [
    {
      required: true,
      message: '请输入居间人手机',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  CI_WeiXin: [
    {
      required: true,
      message: '请输入居间人微信',
      trigger: 'change'
    }
  ],
  CI_Email: [
    {
      required: true,
      message: '请输入居间人邮箱',
      trigger: 'change'
    },
    {
      validator: isEmail,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  CI_CompanyMobile: [
    {
      required: true,
      message: '请输入居间人公司手机',
      trigger: 'change'
    },
    {
      validator: isMobileTel,
      message: '格式不正确',
      trigger: 'change'
    }
  ],
  CI_QQ: [
    {
      required: true,
      message: '请输入居间人QQ',
      trigger: 'change'
    }
  ],

  CI_Mobile: [
    {
      required: true,
      message: '请输入居间人电话',
      trigger: 'change'
    }
  ],

  IS_State: [
    {
      required: true,
      message: '请选择询价阶段',
      trigger: 'change'
    }
  ],

  IN_State: [
    {
      required: true,
      message: '请选择询价性质',
      trigger: 'change'
    }
  ],

  IQ_State: [
    {
      required: true,
      message: '请选择询价数量',
      trigger: 'change'
    }
  ]
})

const eltran: any = ref({})

let rightCheckChangeKeys: any = []
let rightCheckItem: any = []
const rightCheckChange = (keys: any, currKey: any) => {
  let _keys = []
  for (let item in keys) {
    _keys.push(keys[item])
  }
  rightCheckChangeKeys = _keys
}

const getRightCheckChangeList = () => {
  rightCheckItem = checkFieldData.value.filter((x: any) => {
    return checkFieldDataValue.value.indexOf(x.id) > -1
  })

  return checkFieldDataValue.value.filter((x) => {
    return rightCheckChangeKeys.indexOf(x) > -1
  })
}

const hotTable: any = ref()

const props = defineProps({
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改联系人 3是查看
  },
  DataId: {
    type: Number,
    default: 0
  },
  dialogVisible: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '新增报价单'
  }
})

const CustomColumns = ref([
  {
    id: 19,
    width: 80,
    name: 'Column1',
    colname: '自定义列1',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '自定义列1',
    mergeid: 0
  },
  {
    id: 20,
    width: 80,
    name: 'Column2',
    colname: '自定义列2',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '自定义列2',
    mergeid: 0
  },
  {
    id: 21,
    width: 80,
    name: 'Column3',
    colname: '自定义列3',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '自定义列3',
    mergeid: 0
  },
  {
    id: 22,
    width: 80,
    name: 'Column4',
    colname: '自定义列4',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '自定义列4',
    mergeid: 0
  },
  {
    id: 23,
    width: 80,
    name: 'Column5',
    colname: '自定义列5',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '自定义列5',
    mergeid: 0
  }
])

const FieldData = ref([
  {
    id: 1,
    width: 80,
    name: 'Name',
    colname: '产品名称',
    sort: 1,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 2,
    width: 80,
    name: 'Model',
    colname: '型号',
    sort: 2,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 3,
    width: 80,
    name: 'Specifications',
    colname: '规格',
    sort: 3,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 4,
    width: 80,
    name: 'Pressure',
    colname: '压力',
    sort: 4,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 5,
    width: 80,
    name: 'Material',
    colname: '材质',
    sort: 5,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 6,
    width: 80,
    name: 'Unit',
    colname: '单位',
    sort: 6,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 7,
    width: 80,
    name: 'Quantity',
    colname: '数量',
    sort: 7,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 8,
    width: 80,
    name: 'Note',
    colname: '备注',
    sort: 8,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 9,
    width: 80,
    name: 'Price',
    colname: '单价',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 10,
    width: 80,
    name: 'Amount',
    colname: '金额',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },

  {
    id: 11,
    width: 80,
    name: 'Weight',
    colname: '重量',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 12,
    width: 80,
    name: 'Driving',
    colname: '驱动方式',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 13,
    width: 80,
    name: 'Structural',
    colname: '结构形式',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 14,
    width: 80,
    name: 'Sealing',
    colname: '密封面',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 15,
    width: 80,
    name: 'Connection',
    colname: '连接形式',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 16,
    width: 80,
    name: 'Routine',
    colname: '常规性',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 17,
    width: 80,
    name: 'Technical',
    colname: '技术描述',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  },
  {
    id: 18,
    width: 80,
    name: 'SerialNumber',
    colname: '序列号',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  }
])
const tabletopindex = ref(0)
const checktop = (val: any) => {
  tabletopindex.value = val
}

//打印
const printdata = reactive({
  view: false,
  bill: {
    Amount: 0,
    FieldData: [],
    FieldDataValue: []
  },
  entities: []
})
const showprintview = () => {
  getprinttable()

  printdata.view = true
}

const cancelprintview = () => {
  printdata.view = false
}

//设置打印的表单字段
const getprinttable = () => {
  printdata.bill = JSON.parse(JSON.stringify(data.form))
  printdata.bill.FieldData = JSON.parse(JSON.stringify(checkFieldData.value))
  printdata.bill.FieldDataValue = JSON.parse(JSON.stringify(checkFieldDataValue.value))

  let hotdata = hotTable.value.GetHotData()
  printdata.entities = hotdata.list
  printdata.bill.Amount = hotdata.Amount
  console.log('printdata.bill.Amount', printdata.bill.Amount)
}

//客户名称

const relationpageInfo = reactive({
  Name: '',
  count: 0,
  page: 1,
  size: 10
})
const relationdata = ref([])
const relationview = ref(false)
const cancelrelation = () => {
  relationview.value = false
}
const showrelation = () => {
  if (data.disabled == false) {
    relationview.value = true
    CustomersByNameEvent()
  }
}
const relationhandleSizeChange = (val: number) => {
  relationpageInfo.size = val
  CustomersByNameEvent()
}
const relationhandleCurrentChange = (val: number) => {
  relationpageInfo.page = val
  CustomersByNameEvent()
}
const CustomersByNameEvent = () => {
  GetCustomersByName(relationpageInfo).then((res) => {
    if (res.code == 1) {
      relationpageInfo.count = res.data.count
      relationdata.value = res.data.list
    }
  })
}

const checkcustomer = (val: any) => {
  SituationInfoList(val.Id)
  data.form.CustomerName = val.Name
  data.form.CustomerId = val.Id
  data.form.CreditScore = val.CreditScore
  GetPurchaseInfoEvent()
  GetPaymentInfoEvent()
  GetOrderCompanyEvent()
  cancelrelation()
  GetIntermeList(val.Id)
  // 清空居间人信息
  data.form.CI_Telephone = ''
  data.form.CI_WeiXin = ''
  data.form.CI_Email = ''
  data.form.CI_CompanyMobile = ''
  data.form.CI_QQ = ''
  data.form.CI_Mobile = ''
  data.form.CustomerIntName = null
  data.form.CustomerIntId = null
}

// 获取居间人列表
const GetIntermeList = (Id: any) => {
  GetIntermediatorByCusId({ CusId: Id }).then((res) => {
    if (res.code) {
      data.IntermediatorData = res.data
    }
  })
}
//获取最新采购原则
const GetPurchaseInfoEvent = () => {
  GetPurchaseInfo({ CusId: data.form.CustomerId }).then((res) => {
    if (res.code == 1) {
      data.form.PurchaseNote = res.data.PurchaseNote
      data.form.PurchaseMethod = res.data.PurchaseMethod
    } else {
      data.form.PurchaseNote = ''
      data.form.PurchaseMethod = ''
    }
  })
}
//获取最新付款方式
const GetPaymentInfoEvent = () => {
  GetPaymentInfo({ CusId: data.form.CustomerId }).then((res) => {
    if (res.code == 1) {
      data.form.PaymentNote = res.data.Note
      data.form.Payment = res.data.Payment
      data.form.Advance = res.data.Advance
      data.form.Deliver = res.data.Deliver
      data.form.Arrival = res.data.Arrival
      data.form.Warranty = res.data.Warranty
    } else {
      {
        data.form.PaymentNote = ''
        data.form.Payment = ''
        data.form.Advance = 0
        data.form.Deliver = 0
        data.form.Arrival = 0
        data.form.Warranty = 0
      }
    }
  })
}

const SituationInfoList = (val: number) => {
  let postdata: any = { page: 1, size: 100 }
  postdata.CustomerId = val
  GetSituationInfoList(postdata).then((res) => {
    if (res.code == 1) {
      data.SituationData = res.data.data
    }
  })
}
const contactchange = (val: number) => {
  if (val == 1) {
    let item: any = data.SituationData.find((f: any) => f.Name == data.form.CustomerConName)
    data.form.CC_Telephone = item.Telephone
    data.form.CustomerConId = item.Id
    data.form.CC_WeiXin = item.WeiXin
    data.form.CC_Email = item.Email
    data.form.CC_CompanyMobile = item.CompanyMobile
    data.form.CC_QQ = item.QQ
    data.form.CC_Mobile = item.Mobile
  } else {
    let item: any = data.IntermediatorData.find((f: any) => f.Id == data.form.CustomerIntId)
    data.form.CustomerIntName = item.Name
    data.form.CI_Telephone = item.MobilePhone
    data.form.CI_WeiXin = item.WeChat
    data.form.CI_Email = item.Mailbox
    data.form.CI_CompanyMobile = item.CompanyMobile
    data.form.CI_QQ = item.QQ
    data.form.CI_Mobile = item.Telephone
  }
}

///采购原则数据

const purchmessage = reactive({
  data: {
    CustomerId: 0,
    Note: '',
    Way: ''
  },

  listdata: [],
  messageview: false,
  viewtype: 1, //1是新增2是查看
  count: 0
})

const AddCreditinfo = reactive({
  CusName: '',
  view: false,
  dataid: 0,
  viewtype: 1,
  title: ''
})
const closeCredit = () => {
  AddCreditinfo.view = false
  GetPurchaseInfoEvent()
}

const openCredit = () => {
  if (data.disabled) {
    return false
  }
  if (data.form.CustomerId == 0) {
    ElMessage.warning('请先选择客户')
    return
  } else {
    AddCreditinfo.dataid = data.form.CustomerId
    AddCreditinfo.view = true
    AddCreditinfo.viewtype = 3
    AddCreditinfo.CusName = data.form.CustomerName
    AddCreditinfo.title = data.form.CustomerName + '-采购原则'
  }
}
const Competeview = reactive({
  CusName: '',
  view: false,
  dataid: 0,
  viewtype: 1,
  title: ''
})
const closeCompete = () => {
  Competeview.view = false
}

const openCompete = () => {
  if (data.disabled) {
    Competeview.viewtype = 5
  } else {
    Competeview.viewtype = 3
  }
  if (data.form.CustomerId == 0) {
    ElMessage.warning('请先选择客户')
    return
  } else {
    Competeview.dataid = data.form.CustomerId
    Competeview.view = true

    Competeview.CusName = data.form.CustomerName
    Competeview.title = data.form.CustomerName + '-竞争对手'
  }
}
const Paymentview = reactive({
  CusName: '',
  view: false,
  dataid: 0,
  viewtype: 1,
  title: ''
})
const closePayment = () => {
  Paymentview.view = false
  GetPaymentInfoEvent()
}

const openPayment = () => {
  if (data.disabled) {
    return false
  }
  if (data.form.CustomerId == 0) {
    ElMessage.warning('请先选择客户')
    return
  } else {
    Paymentview.dataid = data.form.CustomerId
    Paymentview.view = true
    Paymentview.viewtype = 3
    Paymentview.CusName = data.form.CustomerName
    Paymentview.title = data.form.CustomerName + '-付款方式'
  }
}

const addpurchase = () => {
  purchmessage.data.CustomerId = data.form.CustomerId
  purchmessage.data.Way = ''
  purchmessage.data.Note = ''
  purchmessage.viewtype = 1
}

const showmessageview = () => {
  GetPurchaseListEvent()
  purchmessage.messageview = true
}

const cancelmessageview = () => {
  purchmessage.messageview = false
}

const GetPurchaseListEvent = () => {
  GetPurchaseList({ CusId: data.form.CustomerId }).then((res) => {
    if (res.code == 1) {
      purchmessage.listdata = res.data
    }
  })
}

//采购调查页面
const purchaseview = ref(false)

const showpurchaseview = () => {
  if (data.form.CustomerId == 0) {
    ElMessage.warning('请先选择客户')
    return
  } else {
    purchmessage.data.CustomerId = data.form.CustomerId
    purchaseview.value = true
  }
}
const checkSentiment = (val: any) => {
  purchmessage.data.Way = val.Way
  purchmessage.data.Note = val.Note
  cancelmessageview()
}

const submitpurch = () => {
  var data = purchmessage.data
  if (data.Note == '' || data.Way == '' || data.CustomerId == 0) {
    ElMessage.warning('请录入完整后再提交')
    return
  }
  PostAddPurchase(data).then((res) => {
    if (res.code == 1) {
      ElMessage.success('添加成功')
      cancelpurchaseview()
    } else {
      ElMessage.error(res.message)
    }
  })
}
///监听报价单位变化
const changeCompany = () => {
  var item: any = data.Company.find((f: any) => f.Id == data.form.CompanyId)
  if (item) {
    data.form.CompanyName = item.Rename
  }
  ComputeTaxation()
}
///监听标牌证件变化
const changeSignage = () => {
  console.log('data.form.Signage', data.form.Signage)
  var item: any = dic.Signage.find((f: any) => f.DicKey == data.form.Signage)
  if (item) {
    data.form.SignageName = item.DicValue
  }
  ComputeTaxation()
}

///计算税费
const ComputeTaxation = () => {
  data.form.Taxation = 13
  console.log('data.form.CompanyName', data.form.CompanyName)

  if (data.form.CompanyName == '上海阀门二厂有限公司' && (data.form.SignageName == '中字牌' || data.form.SignageName == '签约单位')) {
    data.form.Taxation = 20
  } else if (data.form.CompanyName == '湖北高中压阀门有限责任公司' && (data.form.SignageName == '湖高' || data.form.SignageName == '签约单位')) {
    data.form.Taxation = 18
  } else if ((data.form.CompanyName == '北方阀门集团有限公司' || data.form.CompanyName == '北方高中压有限公司') && data.form.SignageName == '中字牌') {
    data.form.Taxation = 15
  } else if (data.form.CompanyName == '北京高中压阀门科技集团有限公司' && (data.form.SignageName == '北高科' || data.form.SignageName == '签约单位')) {
    data.form.Taxation = 13
  } else if ((data.form.CompanyName == '北方阀门集团有限公司' || data.form.CompanyName == '北方高中压阀门有限公司') && data.form.SignageName == '签约单位') {
    data.form.Taxation = 13
  }
}
const cancelpurchaseview = () => {
  purchaseview.value = false
}

//新增字段弹窗
const columnvisible = ref(false)

const columnoption: any = ref({})

const showcolumn = () => {
  let bl = false
  for (let index = 0; index < CustomColumns.value.length; index++) {
    bl = checkFieldData.value.findIndex((f: any) => f.id == CustomColumns.value[index].id) > 0
    console.log('bl', bl)
    if (!bl) {
      columnoption.value = CustomColumns.value[index]
      break
    }
  }
  console.log('bl', bl)
  if (bl) {
    ElMessage.warning('最多只支持5个自定义字段')
  } else {
    columnvisible.value = true
  }
}
const cancelcolumn = () => {
  columnvisible.value = false
  columnoption.value = {}
}

const submitcolumn = () => {
  if (columnoption.value) {
    checkFieldData.value.push(columnoption.value)
  }
  cancelcolumn()
}

//重命名弹窗
const renameVisible = ref(false)
const renameoption: any = ref({})

const showreanme = (val: any) => {
  renameoption.value = val
  renameVisible.value = true
}

const cancelreanme = () => {
  renameVisible.value = false
}

//字段重命名
const submitrename = () => {
  let checkrename = checkFieldData.value.find((f: any) => f.id == renameoption.value.id)

  if (checkrename) {
    checkrename.rename = renameoption.value.rename
  }
  cancelreanme()
}

const getFieldData = (val: any) => {
  let list: any[] = []
  val.forEach((item: any) => {
    let a = JSON.parse(JSON.stringify(item))
    list.push(a)
  })
  return list
}

//字段设置弹窗中穿梭框数据
const checkFieldData: any = ref([])
//选定的值
const checkFieldDataValue = ref<number[]>([])
const FieldDataValue = ref([1, 2, 3, 4, 5, 6, 7, 8])

///拆分字段
const splitfield = (val: any) => {
  console.log('val', val)

  checkFieldData.value.forEach((item: any) => {
    if (item.mergeid == val.id) {
      item.mergeid = 0
      item.hide = 0
      var vindex = checkFieldDataValue.value.findIndex((f) => f == val.id)
      checkFieldDataValue.value.splice(vindex + 1, 0, item.id)
      //判断拆分的字段是不是合并过多次
      var index = checkFieldData.value.findIndex((f: any) => f.mergeid == item.id)
      if (index < 0) {
        item.merge = false
      }
    }
  })

  var check = checkFieldData.value.find((f: any) => f.id == val.id)
  check.rename = ''
  check.merge = false

  //重新排序
  refreshcolumn(checkFieldDataValue.value)
  console.log('checkFieldData.value', checkFieldData.value)
}
///合并字段
const mergefield = () => {
  let checkeds = getRightCheckChangeList()
  if (checkeds.length < 2) {
    ElMessage.warning('至少选择两个字段进行合并')
    return
  }
  let checkone = checkFieldData.value.find((f: any) => f.id == checkeds[0])

  console.log('checkone', checkone)
  checkeds.forEach((c: any) => {
    if (c == checkeds[0]) {
      checkone.rename = checkone.colname
      checkone.merge = true
    } else {
      let checkother = checkFieldData.value.find((f: any) => f.id == c)

      if (checkother.rename != '') {
        checkone.rename = checkone.rename + ' ' + checkother.rename
      } else {
        checkone.rename = checkone.rename + ' ' + checkother.colname
      }
      checkother.sort = 0
      checkother.merge = true
      checkother.mergeid = checkone.id

      checkother.hide = 1

      //合并时去掉选中的值
      var vindex = checkFieldDataValue.value.findIndex((f) => f == checkother.id)
      checkFieldDataValue.value.splice(vindex, 1)
    }
  })

  //重新排序
  refreshcolumn(checkFieldDataValue.value)

  console.log('checkFieldData.value', checkFieldData.value)
}

///调整字段位置
const changesort = (val: Number) => {
  //1是上移 2是下移
  let checkeds = getRightCheckChangeList()

  let selectedColumns = rightCheckItem
  if (checkeds.length != 1) {
    ElMessage.warning('暂时仅支持单个字段移动')
    return
  } else if (selectedColumns.length == 1) {
    ElMessage.warning('无需移动')
    return
  }

  let checkitem: any = checkFieldData.value.find((f: any) => f.id == checkeds[0])
  if (val == 1) {
    if (checkitem.sort == 1) {
      ElMessage.warning('已到达顶部')
      return
    }
    let beforeitem = selectedColumns.find((f: any) => f.sort == checkitem.sort - 1)
    checkitem.sort -= 1
    beforeitem.sort += 1
  } else if (val == 2) {
    let last = selectedColumns[selectedColumns.length - 1]
    if (checkitem.sort == last.sort) {
      ElMessage.warning('已到达底部')
      return
    }
    let next = selectedColumns.find((f: any) => f.sort == checkitem.sort + 1)

    checkitem.sort += 1
    next.sort -= 1
  }
  checkFieldData.value.sort((a: any, b: any) => {
    return a.sort - b.sort
  })
  let sortfile: any = []
  checkFieldData.value.forEach((item: any) => {
    if (checkFieldDataValue.value.includes(item.id)) {
      sortfile.push(item.id)
    }
  })
  checkFieldDataValue.value = sortfile
  console.log('checkFieldDataValue', checkFieldDataValue.value)
  console.log('checkFieldData', checkFieldData.value)
  console.log('FieldData', FieldData.value)
}

//刷新字段设置排序
const refreshcolumn = (val: any) => {
  checkFieldData.value.forEach((item: any) => {
    if (val.includes(item.id)) {
      val.forEach((v: any, index: number) => {
        if (v == item.id) {
          item.sort = index + 1
        }
      })
    } else {
      item.sort = 0
    }
  })
  checkFieldData.value.sort((a: any, b: any) => {
    return a.sort - b.sort
  })
}
const handleChange = (value: any, direction: 'left' | 'right', movedKeys: number[]) => {
  refreshcolumn(value)
  console.log(value, direction, movedKeys)
}
const emit = defineEmits(['cancelQuotation'])

const hottablerowheight = ref(30)
const hottabledata = reactive({
  cellsetting: [],
  data: <any>[],
  colHeaders: <any>[],
  columns: <any>[],
  rowheight: 30,
  tableVisible: false,
  width: 1028
})
//解析型号赋值表单
const sethottabledata = (list: any) => {
  let hotdata = hotTable.value.GetHotData().list
  console.log('hottabledata.columns', list)
  var cellsetting: any = []
  list.forEach((item: any, index: number) => {
    var col: any = {}
    if (item.IsAnalysis == true) {
      col = hotdata[index]
      /* col = hotdata.find((f: any) => {
        var old = ''
        if (f.Model) {
          old = f.Model
          if (f.Specifications) {
            old = old + ' ' + f.Specifications
          }
        }
        if (old == item.oldModel) {
          return f
        }
      }) */

      // var rowindex = hotdata.findIndex((f: any) => f == col)

      if (col) {
        var hotcol = hottabledata.columns.find((f: any) => f.data == 'Name')
        var cell: any = {}
        if (hotcol) {
          cell.index = index
          cell.source = item.Name
        }
        cellsetting.push(cell)

        if (item.Name.findIndex((f: any) => f == col.Name) == -1) {
          col.Name = item.Name[0]
        }
        if (item.Specifications.length > 0) {
          col.Specifications = item.Specifications[0]
        }
        col.Model = item.Model
        col.Driving = item.Driving //驱动方式
        col.Connection = item.Connection //连接形式
        col.Structural = item.Structural //结构形式
        col.Sealing = item.Sealing //密封面
        col.Pressure = item.Pressure //压力
        col.Material = item.Material //材质
      }
    } else {
      var hotcol = hottabledata.columns.find((f: any) => f.data == 'Model')
      var cell: any = {}
      if (hotcol) {
        cell.index = index
        cell.className = 'custom-cell'
      }
      cellsetting.push(cell)
    }
  })
  console.log('hottabledata.columns', hottabledata.columns)
  hottabledata.data = hotdata
  hottabledata.cellsetting = cellsetting
  console.log('cellsetting', cellsetting)

  hotTable.value.refresh()
}

///获取阀门解析数据
const getvalveinfo = async () => {
  let list: any = []
  let hotdata = hotTable.value.GetHotData().list

  //let postdata = hotdata[0].Model
  let postdata: any = []

  if (hotdata.length > 0) {
    hotdata.forEach((item: any) => {
      var data = ''
      if (item.Model) {
        data = item.Model
        if (item.Specifications) {
          data = data + ' ' + item.Specifications
        }
        postdata.push(data)
      }
    })
  } else {
    return false
  }

  console.log('hotdata', hotdata)
  var res = await postGBValveModelBatchAnalysis(postdata)
  if (res.code == 1) {
    var data = res.data

    data.forEach((d: any) => {
      var item: any = { Name: [] }
      item.IsAnalysis = d.IsAnalysis
      if (d.IsAnalysis) {
        item.Model = d.Model
        item.oldModel = d.OldModel
        item.Specifications = d.OtherList

        d.ProductModelAnalysisList.forEach((f: any, index: number) => {
          item.Name.push(f.Name)
          if (index == 0) {
            item.Driving = f.ProductModelAnalysisList.find((c: any) => c.Digit == 2).Mean //驱动方式
            item.Connection = f.ProductModelAnalysisList.find((c: any) => c.Digit == 3).Mean //连接形式
            item.Structural = f.ProductModelAnalysisList.find((c: any) => c.Digit == 4).Mean //结构形式
            item.Sealing = f.ProductModelAnalysisList.find((c: any) => c.Digit == 5).Mean //密封面
            item.Pressure = f.ProductModelAnalysisList.find((c: any) => c.Digit == 6).Mean //压力
            item.Material = f.ProductModelAnalysisList.find((c: any) => c.Digit == 7).Mean //材质
          }
        })
      }
      list.push(item)
    })

    sethottabledata(list)
  }
}

//设置表单字段
const gethottablesetting = (list: any) => {
  let Heades = <any>[]
  let columns = <any>[]
  FieldDataValue.value.forEach((item: any) => {
    var index = FieldData.value.findIndex((f) => f.id == item)
    if (index >= 0) {
      let field = FieldData.value[index]
      var h = field.rename == '' ? field.colname : field.rename
      Heades.push(h)

      var column = <any>{}
      column.data = field.name
      if (field.name == 'Quantity' || field.name == 'Price' || field.name == 'Amount') {
        column.type = 'numeric'
      }

      if (field.name == 'Name') {
        column.type = 'dropdown'
      }
      if (field.name == 'Specifications') {
        column.type = 'dropdown'
      }
      columns.push(column)
    }
  })
  hottabledata.colHeaders = Heades
  hottabledata.columns = columns

  hottabledata.data = list

  hotTable.value.refresh()
}

const saverowheight = () => {
  hottabledata.rowheight = hottablerowheight.value
  console.log('-----------------', hottabledata.rowheight)
}

const data = reactive({
  disabled: false,
  trackList: [], //跟单信息
  track: {
    Note: '',
    OrderId: 0,
    CreatName: '',
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0
  },
  form: {
    PaymentNote: '',
    PurchaseNote: '',
    PurchaseMethod: '',
    Advance: 0,
    Deliver: 0,
    Arrival: 0,
    Warranty: 0,

    Id: 0,
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    Procurement: '',
    Grade: '',
    FileList: [], //附件
    OrderNo: '', //订单编号
    Signage: '', //标牌证件
    TaxType: '', //税收情况
    SignageName: '', //标牌证件
    Taxation: 0, //税费
    Freight: '', //运费
    Payment: '', //付款方式
    Degree: '', //报价程度
    TechnicalName: '', //客户方技术联系人
    TechnicalContact: '', //客户方技术联系方式
    CompanyId: null,
    CompanyName: '',
    CustomerId: 0,
    CustomerName: '',
    CreditScore: 0,
    CustomerConName: null,
    CustomerConId: null,
    CreateOn: parseTime(getTime('day'), ''),
    CC_Telephone: '',
    CC_WeiXin: '',
    CC_Email: '',
    CC_CompanyMobile: '',
    CC_QQ: '',
    CC_Mobile: '',
    SalerName: '',
    S_Telephone: '',
    S_WeiXin: '',
    S_Email: '',
    S_CompanyMobile: '',
    S_QQ: '',
    S_Mobile: '',
    CustomerIntName: null,
    CustomerIntId: null,
    CI_Telephone: '',
    CI_WeiXin: '',
    CI_Email: '',
    CI_CompanyMobile: '',
    CI_QQ: '',
    CI_Mobile: '',

    IS_State: '',
    IS_Rate: 0,
    IS_Note: '',
    IN_State: '',
    IN_Rate: 0,
    IN_Note: '',
    IQ_State: '',
    IQ_Rate: 0,
    IQ_Note: '',
    ContactsContact: [1, 2, 3],
    SalesmanContact: [1, 2, 3],
    BrokerContact: [1, 2, 3]
  },
  AddOrEdit: 1,
  OrderCompany: {},
  SituationData: [],
  IntermediatorData: [],
  FreightType,
  Contact: [1, 2, 3],
  contactview: false,
  contactType: 1,
  InquiryNature: {
    //询价性质弹窗
    show: false,
    state: '',
    rate: 0,
    note: '',
    info: rtype
  },
  InquiryQuantity: {
    //询价数量弹窗
    show: false,
    state: '',
    rate: 0,
    note: ''
  },
  Company: [],
  Inquirystage: {
    //询价阶段弹窗
    show: false,
    state: '',
    rate: 0,
    note: ''
  }
})

//获取报价单位
const GetOrderCompanyEvent = () => {
  GetCompanyByCustomer({ CusId: data.form.CustomerId }).then((res) => {
    if (res.code == 1) {
      data.Company = res.data
    }
  })
}

const getDegree = () => {
  let level: any = []
  switch (data.form.IS_State) {
    case '采购阶段':
      level.push(3)
      break
    case '比价阶段':
      level.push(2)
      break
    case '预算阶段':
      level.push(1)
      break
    default:
      level.push(0)
      break
  }
  switch (data.form.IN_State) {
    case '重点比价':
      level.push(3)
      break
    case '选择比价':
      level.push(2)
      break
    case '陪衬比价':
      level.push(1)
      break
    default:
      level.push(0)
      break
  }
  switch (data.form.IQ_State) {
    case '新项目':
      level.push(3)
      break
    case '检修或批量':
      level.push(2)
      break
    case '零星采购':
      level.push(1)
      break
    default:
      level.push(0)
      break
  }

  console.log('level', level)
  if (level.filter((f: any) => f == 3).length > 1) {
    data.form.Degree = '必跟订单'
    data.form.Grade = 'A'
  } else if (level.filter((f: any) => f == 2).length > 1) {
    data.form.Degree = '重点订单'
    data.form.Grade = 'B'
  } else if (level.filter((f: any) => f == 1).length > 1) {
    data.form.Degree = '普通订单'
    data.form.Grade = 'C'
  } else {
    data.form.Degree = '重点订单'
    data.form.Grade = 'B'
  }
}
//打开询价性质弹窗
const showInquiryNature = () => {
  if (data.disabled == false) {
    data.InquiryNature.state = data.form.IN_State
    data.InquiryNature.rate = data.form.IN_Rate
    data.InquiryNature.note = data.form.IN_Note
    data.InquiryNature.show = true
  }
}
//关闭询价性质弹窗
const cancelInquiryNature = () => {
  data.InquiryNature.show = false
}

//提交询价性质
const submitInquiryNature = () => {
  if (data.InquiryNature.state == '' || data.InquiryNature.rate == 0) {
    ElMessage.warning('请把信息选择完整')
    return false
  }
  if (data.InquiryNature.rate < 80 && data.InquiryNature.note == '') {
    ElMessage.warning('准确度太低请选择理由')
    return false
  }

  ElMessageBox.confirm('此信息是否准确，会影响信用', '个人信用', {
    confirmButtonText: '准确',
    cancelButtonText: '再想想',
    type: 'warning'
  })
    .then(() => {
      data.form.IN_State = data.InquiryNature.state
      data.form.IN_Rate = data.InquiryNature.rate
      data.form.IN_Note = data.InquiryNature.note
      getDegree()
      cancelInquiryNature()
    })
    .catch(() => {})
}

//打开询价数量弹窗
const showInquiryQuantity = () => {
  if (data.disabled == false) {
    data.InquiryQuantity.state = data.form.IQ_State
    data.InquiryQuantity.rate = data.form.IQ_Rate
    data.InquiryQuantity.note = data.form.IQ_Note
    data.InquiryQuantity.show = true
  }
}
//关闭询价数量弹窗
const cancelInquiryQuantity = () => {
  data.InquiryQuantity.show = false
}

//提交询价数量
const submitInquiryQuantity = () => {
  if (data.InquiryQuantity.state == '' || data.InquiryQuantity.rate == 0) {
    ElMessage.warning('请把信息选择完整')
    return false
  }
  if (data.InquiryQuantity.rate < 80 && data.InquiryQuantity.note == '') {
    ElMessage.warning('准确度太低请选择理由')
    return false
  }

  ElMessageBox.confirm('此信息是否准确，会影响信用', '个人信用', {
    confirmButtonText: '准确',
    cancelButtonText: '再想想',
    type: 'warning'
  })
    .then(() => {
      data.form.IQ_State = data.InquiryQuantity.state
      data.form.IQ_Rate = data.InquiryQuantity.rate
      data.form.IQ_Note = data.InquiryQuantity.note
      getDegree()
      cancelInquiryQuantity()
    })
    .catch(() => {})
}

//打开询价阶段弹窗
const showInquirystage = () => {
  if (data.disabled == false) {
    data.Inquirystage.state = data.form.IS_State
    data.Inquirystage.rate = data.form.IS_Rate
    data.Inquirystage.note = data.form.IS_Note
    data.Inquirystage.show = true
  }
}
//关闭询价阶段弹窗
const cancelInquirystage = () => {
  data.Inquirystage.show = false
}

//提交询价阶段
const submitInquirystage = () => {
  if (data.Inquirystage.state == '' || data.Inquirystage.rate == 0) {
    ElMessage.warning('请把信息选择完整')
    return false
  }
  if (data.Inquirystage.rate < 80 && data.Inquirystage.note == '') {
    ElMessage.warning('准确度太低请选择理由')
    return false
  }

  ElMessageBox.confirm('此信息是否准确，会影响信用', '个人信用', {
    confirmButtonText: '准确',
    cancelButtonText: '再想想',
    type: 'warning'
  })
    .then(() => {
      data.form.IS_State = data.Inquirystage.state
      data.form.IS_Rate = data.Inquirystage.rate
      data.form.IS_Note = data.Inquirystage.note
      getDegree()
      cancelInquirystage()
    })
    .catch(() => {})
}

//
//更改联系方式弹窗
const showcontact = (val: number) => {
  if (data.disabled == false) {
    data.contactType = val
    if (val == 1) {
      data.Contact = data.form.ContactsContact
    } else if (val == 2) {
      data.Contact = data.form.SalesmanContact
    } else if (val == 3) {
      data.Contact = data.form.BrokerContact = data.Contact
    }
    data.contactview = true
  }
}

const cancelcontact = () => {
  data.contactview = false
}

const changeContact = () => {
  if (data.Contact.length != 3) {
    ElMessage.warning('只能选择3个联系方式')
    return false
  }
  console.log(data.Contact)
  if (data.contactType == 1) {
    data.form.ContactsContact = data.Contact
  } else if (data.contactType == 2) {
    data.form.SalesmanContact = data.Contact
  } else if (data.contactType == 3) {
    data.form.BrokerContact = data.Contact
  }
  cancelcontact()
}

const showinfo = ref(true)

const showinfoEvent = (val: any) => {
  showinfo.value = val
}
const showdetails = ref(true)
const showdetailsEvent = (val: any) => {
  showdetails.value = val
}
const uploadFileData = (val: any) => {
  data.form.FileList = val
  console.log('+++++++++++++++++++++++++', val)
}

const showtable = () => {
  hottabledata.tableVisible = true
  hottabledata.width = 1170
}
const canceltable = () => {
  hottabledata.tableVisible = false
  hottabledata.width = 850
}

const FieldSetView = ref(false)

const showFieldSetView = () => {
  checkFieldDataValue.value = getFieldData(FieldDataValue.value)
  checkFieldData.value = getFieldData(FieldData.value)
  FieldSetView.value = true
}

const cancelFieldSetView = () => {
  FieldSetView.value = false
}

const submitField = () => {
  FieldDataValue.value = getFieldData(checkFieldDataValue.value)

  console.log('FieldDataValue.value', FieldDataValue.value)
  console.log('checkFieldDataValue.value', checkFieldDataValue.value)
  FieldData.value = getFieldData(checkFieldData.value)
  cancelFieldSetView()
  var data = hotTable.value.GetHotData()
  gethottablesetting(data.list)
}
const closeWindow = () => {
  emit('cancelQuotation')
}
const submitdisplay = ref(false)
///提交报价单
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (submitdisplay.value == true) {
        return false
      }
      submitdisplay.value = true

      var postdata: any = {}
      postdata.AddOrEdit = data.AddOrEdit
      postdata.bill = JSON.parse(JSON.stringify(data.form))
      postdata.bill.FieldData = JSON.stringify(FieldData.value)
      postdata.bill.FieldDataValue = JSON.stringify(FieldDataValue.value)
      postdata.bill.FileList = JSON.stringify(data.form.FileList)
      postdata.bill.ContactsContact = JSON.stringify(data.form.ContactsContact)
      postdata.bill.SalesmanContact = JSON.stringify(data.form.SalesmanContact)
      postdata.bill.BrokerContact = JSON.stringify(data.form.BrokerContact)
      let hotdata = hotTable.value.GetHotData()
      postdata.bill.Amount = hotdata.Amount
      postdata.entities = hotdata.list
      PostAddCustomerOrder(postdata).then((res) => {
        if (res.code == 1) {
          ElMessage.success(res.message)
          closeWindow()
        } else {
          submitdisplay.value = false
          ElMessage.error(res.message)
        }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}
///提交跟单
const submitTrack = () => {
  if (data.track.Note == '') {
    ElMessage.warning('请输入跟单信息')
    return false
  }
  var postdata = data.track
  postdata.OrderId = data.form.Id
  PostAddOrderTrack(postdata).then((res) => {
    if (res.code == 1) {
      if (res.data == true) {
        ElMessage.success(res.message)
        closeWindow()
      } else {
        ElMessage.error(res.message)
      }
    } else {
      ElMessage.error(res.message)
    }
  })
}

///获取报价单详情
const getorderinfo = () => {
  data.AddOrEdit = 2
  GetCustomerOrderInfo({ BillId: props.DataId }).then((res) => {
    if (res.code == 1) {
      FieldData.value = JSON.parse(res.data.bill.FieldData)
      FieldDataValue.value = JSON.parse(res.data.bill.FieldDataValue)
      res.data.bill.FileList = JSON.parse(res.data.bill.FileList)
      res.data.bill.ContactsContact = JSON.parse(res.data.bill.ContactsContact)
      res.data.bill.SalesmanContact = JSON.parse(res.data.bill.SalesmanContact)
      res.data.bill.BrokerContact = JSON.parse(res.data.bill.BrokerContact)
      data.form = res.data.bill
      console.log('*******************************', data.form)
      if (props.ViewType == 5 || props.ViewType == 2) {
        GetTrackList({ OrderId: data.form.Id }).then((res) => {
          if (res.code == 1) {
            data.trackList = res.data
          }
        })
      }
      gethottablesetting(res.data.entities)
      GetIntermeList(res.data.bill.CustomerId)
    }
  })
}

const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const mesboxStyle = ref({
  boxWidth: 'w-1000',
  boxHeight: '',
  boxpt: 'pt-2'
})
const conboxStyle = ref({
  boxWidth: 'w-800',
  boxHeight: '',
  boxpt: 'pt-2'
})
const tableboxStyle = reactive({
  boxWidth: 'w-1000',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      if (props.ViewType == 1) {
        data.form.SalerName = res.data.RealName
        data.form.S_Telephone = res.data.Phone
        data.form.CompName = res.data.CompName
        data.form.DeptName = res.data.DeptName
        data.form.PostName = res.data.PostName
        data.form.CompId = res.data.CompId
        data.form.DeptId = res.data.DeptId
        data.form.PostId = res.data.PostId
      } else {
        data.track.CreatName = res.data.RealName
        data.track.CompName = res.data.CompName
        data.track.DeptName = res.data.DeptName
        data.track.PostName = res.data.PostName
        data.track.CompId = res.data.CompId
        data.track.DeptId = res.data.DeptId
        data.track.PostId = res.data.PostId
      }
    }
  })
}
onMounted(() => {
  getDictionaryData()
  getuserinfo()
  if (props.ViewType == 1) {
    gethottablesetting([])
  } else if (props.ViewType == 2 || props.ViewType == 5) {
    data.disabled = true
    getorderinfo()
  }
  // 点击跟单录入默认订单跟踪栏目
  if (props.ViewType == 5) {
    tabletopindex.value = 2
  }
})
</script>
<style lang="postcss">
.addquotation {
  .Contactclass {
    .el-form-item__label {
      cursor: pointer;
      color: #2f95ffcc;
    }
  }
  .tabledialog {
    border-radius: 20px;

    .el-dialog__header {
      display: none;
    }
    .renameclass {
      border-radius: 20px;
    }
    .inquiry-edit-excel-column-check {
      text-align: center;

      .el-transfer {
        text-align: left;

        .el-transfer-panel {
          .el-transfer-panel__list {
            .el-transfer-panel__item.el-checkbox {
              border-bottom: 1px solid lightgrey;
              height: auto;
              margin-right: 0px;
            }
          }
        }

        .el-transfer-panel:first-child {
          width: 150px;

          .el-checkbox__label {
            width: 100px;
          }

          .el-transfer-panel__body {
            height: 400px;
          }

          .el-transfer-panel__list {
            height: 400px;
          }
        }

        .el-transfer-panel:last-child {
          width: 480px;

          .el-checkbox__label {
            width: 440px;
          }

          .el-transfer-panel__body {
            height: 400px;
          }

          .el-transfer-panel__list {
            height: 100%;
          }
        }

        .el-transfer__button {
          padding: 5px;
        }
      }

      .transfer-label {
        //border-bottom: 1px solid lightgrey;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .label-name {
          width: 100px;
          flex-shrink: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .label-switch {
          width: 60px;
          text-align: center;
          flex-shrink: 0;
          height: 34px;
        }
        .label-input {
          color: #606266;
          .el-input-number--small {
            width: 90px;
          }
        }

        .label-operate {
          width: 140px;
          text-align: center;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
<style lang="postcss" scoped>
.addquotation {
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
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
  .table_excel {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    .table_excel_div {
      width: 1200px;
      align-self: center;
      border-radius: 10px;
      margin: 0 auto;
      padding: 10px;
      background-color: #ffffff;
    }
  }
  .uploadfile {
    .header-left {
      background-color: #027aff;
      color: #ffff;
      text-align: center;
      width: 80px;
      border-radius: 4px 0px 0px 0px;
      line-height: 30px;
      height: 30px;
      font-size: 14px;
    }
    .header-right {
      background: linear-gradient(81deg, #e7f6ff 0%, #ffffff 100%);
      line-height: 30px;
      width: 100%;
      height: 30px;
    }
  }
  .inputclass {
    width: 170px;
  }
  .el-form-item {
    margin-right: 0px;
    margin-bottom: 5px;
  }
  .el-form-item__label {
    color: #303133;
  }

  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 4.45rem;
  }
  :deep(.el-form-item__content) {
    .el-input-group__append {
      padding: 0px 5px;
    }
  }

  .Nameinputclass {
    width: 170px;
  }
  .emailinputclass {
    width: 170px;
  }
  .otherinputclass {
    width: 170px;
  }
  .payinputclass {
    width: 127px;
  }
}
</style>
