<template>
  <div>
    <CusDialog :box-style="boxStyle" :title="title" :is-show="true" @closeWindow="closeWindow">
      <div class="addcontract text-base">
        <div class="salerDialog">
          <el-form ref="ruleFormRef" :model="data" :rules="rules" :inline="true">
            <el-card class="sale_card">
              <template #header>
                <div class="card-header">
                  <div class="header-left">基本信息</div>
                  <div class="header-right text-right">
                    <div class="flex justify-end">
                      <div class="flex">
                        <el-form-item label="合同编号:" prop="Ranking">
                          <div class="-mt-1">
                            <div v-if="data.form.BillNo == ''" class="flex text-gray-400 cursor-not-allowed">系统保存生成</div>
                            <div v-else>
                              {{ data.form.BillNo }}
                            </div>
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
              <div v-show="showdetails">
                <el-form-item label="需求方" prop="form.CustomerName" class="Contactclass" :rules="rules.CustomerName">
                  <div class="relative">
                    <div @click="showrelation" class="w-20 h-8 absolute -left-20 cursor-pointer"></div>
                    <el-input :readonly="data.disabled" @click="showorder" v-model="data.form.CustomerName" placeholder="请输入" style="width: 410px" />
                  </div>
                </el-form-item>
                <el-form-item label="签约时间" prop="CreateOn">
                  <el-date-picker :readonly="data.disabled" v-model="data.form.AgreeDate" type="date" placeholder="请选择" style="width: 170px" />
                </el-form-item>
                <el-form-item label="合同金额" prop="form.Amount" :rules="rules.Amount">
                  <el-input :readonly="true" v-model="data.form.Amount" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="供货方" class="Contactclass" prop="form.CompanyId" :rules="rules.CompanyId">
                  <el-select v-if="!data.disabled" :disabled="data.disabled" @change="changeCompany" v-model="data.form.CompanyId" placeholder="请选择供货方" style="width: 410px">
                    <el-option v-for="item in data.Company" :key="item.Id" :label="item.Name" :value="item.Id"></el-option>
                  </el-select>
                  <el-input v-else :readonly="true" v-model="data.form.CompanyName" style="width: 410px" />
                </el-form-item>
                <el-form-item label="签约地点" prop="form.SigningAddress" :rules="rules.SigningAddress">
                  <el-input :readonly="true" v-model="data.form.SigningAddress" placeholder="请输入" class="inputclass" />

                  <el-cascader :disabled="data.disabled" @change="addresschange" :placeholder="Region == null ? '加载中' : '请选择地址'" :options="Region" :props="regionProps" filterable v-model="data.address" style="width: 170px; position: absolute; opacity: 0; left: 0; right: 0; top: 0; bottom: 0"> </el-cascader>
                </el-form-item>
                <el-form-item label="最低售价" prop="form.SaleMinPrice" :rules="rules.SaleMinPrice">
                  <el-input :readonly="true" v-model="data.form.SaleMinPrice" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="客户信用" prop="ComName">
                  <el-input :readonly="true" v-model="data.form.CreditScore" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="紧急程度" prop="form.Urgency" :rules="rules.Urgency">
                  <el-select :disabled="data.disabled" v-model="data.form.Urgency" placeholder="请选择紧急程度" class="inputclass">
                    <el-option v-for="item in dic.Urgency" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="合作状态" prop="form.Cooperation" :rules="rules.Cooperation">
                  <el-select :disabled="data.disabled" v-model="data.form.Cooperation" placeholder="请选择合作状态" class="inputclass">
                    <el-option v-for="item in dic.Cooperation" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="业绩金额" prop="ComName">
                  <el-input :readonly="true" v-model="compRealAmount" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="供货品牌" prop="form.Signage" :rules="rules.Signage">
                  <el-select :disabled="data.disabled" @change="changeSignage" v-model="data.form.Signage" placeholder="请选择供货品牌" class="inputclass">
                    <el-option v-for="item in dic.Signage" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="运费" prop="ComName">
                  <el-input :readonly="true" v-model="data.form.Freight" placeholder="请输入" class="inputclass">
                    <template #append>{{ data.form.FreightRate }}%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="加价费" prop="ComName">
                  <el-input :readonly="data.disabled" type="Number" v-model="data.form.MarkupFee" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="居间费" prop="ComName">
                  <el-input :readonly="data.disabled" type="Number" v-model="data.form.IntroductionFee" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="发票" prop="form.InvoiceType" :rules="rules.InvoiceType">
                  <el-select :disabled="data.disabled" @change="changeInvoiceType" v-model="data.form.InvoiceType" placeholder="请选择发票" class="inputclass">
                    <el-option v-for="item in dic.invoiceType" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="税费" prop="form.Taxation" :rules="rules.Taxation">
                  <el-input :readonly="true" v-model="compTaxation" placeholder="请输入" class="inputclass">
                    <template #append>{{ data.form.Taxrate }}%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="提成费" prop="Percentage">
                  <el-input :readonly="true" v-model="data.form.Percentage" placeholder="请输入" class="inputclass">
                    <template #append>{{ data.form.PercentageRate }}%</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="成交金额" prop="form.DiscountAmount" :rules="rules.DiscountAmount">
                  <el-input :readonly="data.disabled" type="Number" v-model="data.form.DiscountAmount" placeholder="请输入" class="inputclass" />
                </el-form-item>

                <el-form-item label="业务员" prop="SalerName">
                  <el-input :readonly="true" v-model="data.form.SalerName" placeholder="请输入" class="inputclass" />
                </el-form-item>
                <el-form-item label="供货周期" prop="form.DeliveryTime" :rules="rules.DeliveryTime">
                  <el-input :readonly="data.disabled" type="Number" v-model="data.form.DeliveryTime" placeholder="请输入" class="inputclass">
                    <template #append>天</template>
                  </el-input>
                </el-form-item>
                <el-form-item label="备注" prop="ComName">
                  <el-input :readonly="data.disabled" v-model="data.form.Note" placeholder="请输入" style="width: 410px" />
                </el-form-item>
              </div>
            </el-card>

            <div class="mt-2">
              <div class="flex">
                <div class="cursor-pointer" :class="tabletopindex == 0 ? 'checktabletitle' : 'tabletitle'" @click="checktop(0)">合同清单</div>
                <div class="cursor-pointer" :class="tabletopindex == 1 ? 'checktabletitle' : 'tabletitle'" @click="checktop(1)">收货信息</div>
                <div class="cursor-pointer" :class="tabletopindex == 2 ? 'checktabletitle' : 'tabletitle'" @click="checktop(2)">付款/开票计划</div>
                <div class="cursor-pointer" :class="tabletopindex == 3 ? 'checktabletitle' : 'tabletitle'" @click="checktop(3)">合同条款</div>
                <div class="cursor-pointer" :class="tabletopindex == 4 ? 'checktabletitle' : 'tabletitle'" @click="checktop(4)">供需方关系</div>
                <!--<div class="cursor-pointer" :class="tabletopindex==2?'checktabletitle':'tabletitle'" @click="checktop(2)">开票信息</div> -->
              </div>
              <div class="bg-white border-blue-400 border-solid border rounded-b-lg p-2">
                <div v-show="tabletopindex == 0" class="relative">
                  <div class="flex justify-end pd-2 absolute -top-10 right-1">
                    <div class="cursor-pointer" :class="formattype == 2 ? 'checkformattitle' : 'formattitle'" @click="checkformat(2)">综合</div>
                    <div class="cursor-pointer ml-2" :class="formattype == 1 ? 'checkformattitle' : 'formattitle'" @click="checkformat(1)">格式一</div>
                  </div>
                  <div v-if="formattype == 0 || formattype == 2">
                    <div class="flex justify-between">
                      <div class="flex">
                        <div class="bg-blue-400 w-1 h-4"></div>
                        <div class="pl-1 -mt-1">表单一</div>
                      </div>
                      <div v-if="!data.disabled">
                        <el-button :disabled="data.disabled" size="small" type="primary" @click="openFieldSetView(1)">设置字段</el-button>
                      </div>
                    </div>
                    <div class="tableclass">
                      <el-table border :data="data.detail1" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                        <el-table-column type="selection" width="30" />
                        <el-table-column type="index" width="40" label="序号" />
                        <el-table-column v-if="data.ColumnData1.length > 0" v-for="(item, index) in data.ColumnData1" :key="index">
                          <template #header>{{ item.rename == '' ? item.colname : item.rename }}</template>
                          <template #default="scope">
                            <el-input v-if="item.name == 'Quantity' || item.name == 'Price'" type="Number" :readonly="data.disabled" v-model="scope.row[item.name]" placeholder=""> </el-input>
                            <el-input v-else :readonly="data.disabled" v-model="scope.row[item.name]" placeholder=""></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="flex text-center leading-9 h-9">
                        <div style="background: #e7f4fe; border: 1px solid #c0c4cc; width: 180px">合同金额</div>
                        <div style="border: 1px solid #c0c4cc; width: 502px">{{ toChies(data.form.Amount) }}</div>
                        <div style="background: #e7f4fe; border: 1px solid #c0c4cc; width: 110px">小写</div>
                        <div style="border: 1px solid #c0c4cc; width: 220px">{{ data.form.Amount }}元</div>
                      </div>
                      <div></div>
                    </div>
                  </div>

                  <div class="pt-2" v-if="formattype == 1 || formattype == 2">
                    <div class="flex justify-between">
                      <div class="flex">
                        <div class="bg-blue-400 w-1 h-4"></div>
                        <div class="pl-1 -mt-1">表单二</div>
                      </div>
                      <div v-if="!data.disabled">
                        <el-button size="small" type="primary" @click="adddetail" :disabled="data.disabled"> <el-icon-plus class="w-4 h-4" />新增 </el-button>
                        <el-button size="small" type="danger" @click="deldetail" :disabled="data.disabled"> <el-icon-delete class="w-4 h-4" />删除 </el-button>
                        <el-button size="small" type="primary" @click="showbatch" :disabled="data.disabled">物流批次</el-button>
                        <el-button :disabled="data.disabled" size="small" type="primary" @click="openFieldSetView(2)">设置字段</el-button>
                      </div>
                    </div>
                    <div>
                      <div class="text-lg font-semibold">合同附件</div>
                      <div>甲方：{{ data.form.CustomerName }}</div>
                      <div>乙方：{{ data.form.CompanyName }}</div>
                    </div>
                    <div class="tableclass">
                      <el-table border :data="data.detail2" @selection-change="handledetailChange" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                        <el-table-column type="selection" width="30" />
                        <el-table-column type="index" width="40" label="序号">
                          <template #default="scope">
                            <div class="relative">
                              <div v-if="scope.row.BatchNum" class="text-xs bg-blue-but text-white w-4 h-4 rounded-lg absolute left-6">
                                {{ scope.row.BatchNum }}
                              </div>
                              <div class="leading-9 h-9">{{ scope.$index + 1 }}</div>
                            </div>
                          </template>
                        </el-table-column>
                        <el-table-column v-if="data.ColumnData2.length > 0" v-for="(item, index) in data.ColumnData2" :key="index">
                          <template #header>{{ item.rename == '' ? item.colname : item.rename }}</template>
                          <template #default="scope">
                            <el-input v-if="item.name == 'Quantity' || item.name == 'Price'" type="Number" :readonly="data.disabled" v-model="scope.row[item.name]" placeholder=""> </el-input>
                            <el-input v-else-if="item.name == 'Amount'" type="Number" :readonly="true" v-model="scope.row[item.name]" placeholder="" style="text-align: right"> </el-input>
                            <el-input v-else :readonly="data.disabled" v-model="scope.row[item.name]" placeholder=""></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                      <div class="flex text-center leading-9 h-9">
                        <div style="background: #e7f4fe; border: 1px solid #c0c4cc; width: 180px">合同金额</div>
                        <div style="border: 1px solid #c0c4cc; width: 502px">{{ toChies(data.form.Amount) }}</div>
                        <div style="background: #e7f4fe; border: 1px solid #c0c4cc; width: 110px">小写</div>
                        <div style="border: 1px solid #c0c4cc; width: 220px">{{ data.form.Amount }}元</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div v-show="tabletopindex == 1" class="relative">
                  <div v-if="!data.disabled" class="flex justify-end pd-2 absolute -top-10 right-1">
                    <el-button size="small" type="primary" @click="addreceiving" :disabled="data.disabled"> <el-icon-plus class="w-4 h-4" />新增 </el-button>
                    <el-button size="small" type="danger" @click="delreceiving" :disabled="data.disabled"> <el-icon-delete class="w-4 h-4" />删除 </el-button>
                  </div>
                  <div class="tableclass">
                    <el-table border :data="data.receivinglist" @selection-change="handlereceivingChange" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                      <el-table-column type="selection" width="30" />
                      <el-table-column type="index" width="50" label="序号"> </el-table-column>
                      <el-table-column prop="CreatrOn" width="100" label="收货人">
                        <template #default="scope">
                          <el-form-item :prop="'receivinglist[' + scope.$index + '].Consignee'" :rules="rules.Consignee">
                            <el-input :readonly="data.disabled" v-model="scope.row.Consignee" placeholder=""></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column prop="Type" width="100" label="联系人">
                        <template #default="scope">
                          <el-form-item :prop="'receivinglist[' + scope.$index + '].Contacts'" :rules="rules.Contacts">
                            <el-input :readonly="data.disabled" v-model="scope.row.Contacts" placeholder=""></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column prop="Name" width="80" label="职务">
                        <template #default="scope">
                          <el-form-item :prop="'receivinglist[' + scope.$index + '].Post'" :rules="rules.Post">
                            <el-input :readonly="data.disabled" v-model="scope.row.Post" placeholder=""></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column prop="Duties" label="收货地址">
                        <template #default="scope">
                          <el-form-item :prop="'receivinglist[' + scope.$index + '].Address'" :rules="rules.Address">
                            <el-input :readonly="data.disabled" v-model="scope.row.Address" placeholder=""></el-input>
                          </el-form-item>
                        </template>
                      </el-table-column>
                      <el-table-column prop="Telephone" label="物流批次">
                        <template #default="scope">
                          <el-form-item :prop="'receivinglist[' + scope.$index + '].Batch'" :rules="rules.Batch">
                            <el-select :disabled="data.disabled" v-model="scope.row.Batch" placeholder="请选择物流批次" style="width: 100%">
                              <el-option v-for="item in data.batchlist" :key="item.Num" :label="item.BatchTime" :value="item.BatchTime"></el-option>
                            </el-select>
                          </el-form-item>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
                <div v-show="tabletopindex == 2">
                  <div class="tableclass">
                    <div class="flex justify-between">
                      <div class="flex">
                        <div class="bg-blue-400 w-1 h-4"></div>
                        <div class="pl-1 -mt-1">付款计划</div>
                      </div>
                      <div v-if="!data.disabled">
                        <el-button size="small" type="primary" @click="addpayment" :disabled="data.disabled"> <el-icon-plus class="w-4 h-4" />新增 </el-button>
                        <el-button size="small" type="danger" @click="delpayment" :disabled="data.disabled"> <el-icon-delete class="w-4 h-4" />删除 </el-button>
                      </div>
                    </div>
                    <div>
                      <el-table border :data="data.paymentlist" @selection-change="handlepaymentChange" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                        <el-table-column type="selection" width="30" />
                        <el-table-column type="index" width="60" label="序号" />
                        <el-table-column prop="CreatrOn" label="付款日期">
                          <template #default="scope">
                            <el-form-item :prop="'paymentlist[' + scope.$index + '].PaymentDate'" :rules="rules.PaymentDate">
                              <el-date-picker :readonly="data.disabled" v-model="scope.row.PaymentDate" type="date" placeholder="请选择" style="width: 100%" />
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="Type" label="付款阶段">
                          <template #default="scope">
                            <el-form-item :prop="'paymentlist[' + scope.$index + '].Stage'" :rules="rules.Stage">
                              <el-select :disabled="data.disabled" v-model="scope.row.Stage" placeholder="请选择付款阶段" style="width: 100%">
                                <el-option v-for="item in dic.PaymentStage" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="Name" label="付款金额">
                          <template #default="scope">
                            <el-form-item :prop="'paymentlist[' + scope.$index + '].Amount'" :rules="rules.Amount">
                              <el-input :readonly="data.disabled" @change="paymentchange(scope.$index)" type="Number" v-model="scope.row.Amount" placeholder=""></el-input>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="Duties" label="付款占比（%）">
                          <template #default="scope">
                            <el-input :readonly="true" v-model="scope.row.Proportion" placeholder=""></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>

                  <div class="pt-2">
                    <div class="flex justify-between">
                      <div class="flex">
                        <div class="bg-blue-400 w-1 h-4"></div>
                        <div class="pl-1 -mt-1">开票计划</div>
                      </div>
                      <div v-if="!data.disabled">
                        <el-button size="small" type="primary" @click="addinvoice" :disabled="data.disabled"> <el-icon-plus class="w-4 h-4" />新增 </el-button>
                        <el-button size="small" type="danger" @click="delinvoice" :disabled="data.disabled">
                          <!-- <el-icon></el-icon> -->
                          <el-icon-delete class="w-4 h-4" />删除
                        </el-button>
                      </div>
                    </div>
                    <div class="tableclass">
                      <el-table border :data="data.invoicelist" @selection-change="handleinvoiceChange" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                        <el-table-column type="selection" width="30" />
                        <el-table-column type="index" width="60" label="序号" />
                        <el-table-column prop="CreatrOn" label="开票日期">
                          <template #default="scope">
                            <el-form-item :prop="'invoicelist[' + scope.$index + '].PaymentDate'" :rules="rules.PaymentDate">
                              <el-date-picker :readonly="data.disabled" v-model="scope.row.PaymentDate" style="width: 190px" type="date" placeholder="请选择" />
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="Type" label="开票阶段">
                          <template #default="scope">
                            <el-form-item :prop="'invoicelist[' + scope.$index + '].Stage'" :rules="rules.Stage">
                              <el-select :disabled="data.disabled" v-model="scope.row.Stage" placeholder="请选择开票阶段" style="width: 100%">
                                <el-option v-for="item in dic.InvoiceStage" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey"></el-option>
                              </el-select>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="Name" label="开票金额">
                          <template #default="scope">
                            <el-form-item :prop="'invoicelist[' + scope.$index + '].Amount'" :rules="rules.Amount">
                              <el-input :readonly="data.disabled" @change="invoicechange(scope.$index)" type="Number" v-model="scope.row.Amount" placeholder=""></el-input>
                            </el-form-item>
                          </template>
                        </el-table-column>
                        <el-table-column prop="Duties" label="开票占比（%）">
                          <template #default="scope">
                            <el-input :readonly="true" v-model="scope.row.Proportion" placeholder=""></el-input>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                  </div>
                </div>
                <div v-show="tabletopindex == 3" class="relative">
                  <div v-if="!data.disabled" class="flex justify-end pd-2 absolute -top-10 right-1">
                    <el-button size="small" type="primary" @click="openContractEmplate(0)" :disabled="data.disabled">系统模版 </el-button>
                    <el-button size="small" type="danger" @click="openContractEmplate(1)" :disabled="data.disabled">客户模版 </el-button>
                  </div>
                  <div class="absolute z-50 right-px select-wai" style="width: 180px; height: 38px; top: 40px">
                    <el-select v-model="data.contract_type" clearable placeholder="请选择" @clear="clearContract" :disabled="data.disabled">
                      <el-option-group v-for="item in contract" :key="item.label" :label="item.label" :value="item.id">
                        <el-option v-for="itm in item.options" :key="itm.id" :label="itm.label" :value="itm.id" @click="changeContract(item.id, itm.id)" />
                      </el-option-group>
                    </el-select>
                  </div>
                  <Editor v-model="data.form.ContractTerms" :disabled="data.disabled" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" :init="{ language: 'zh_CN', height: 450 }"> </Editor>
                </div>
                <div v-show="tabletopindex == 4">
                  <div v-if="!data.disabled" class="border-blue-400 border-dashed border-b-2 pb-2">
                    <el-checkbox-group v-model="data.InfoField" :disabled="data.disabled">
                      <el-checkbox :label="0">单位名称</el-checkbox>
                      <el-checkbox :label="1">单位地址</el-checkbox>
                      <el-checkbox :label="2">法定代表人</el-checkbox>
                      <el-checkbox :label="3">委托代理人</el-checkbox>
                      <el-checkbox :label="4">开户银行</el-checkbox>
                      <el-checkbox :label="5">银行账户</el-checkbox>
                      <el-checkbox :label="6">电话</el-checkbox>
                      <el-checkbox :label="7">税号</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <div class="flex pt-6">
                    <div class="w-1/2 pr-1">
                      <div class="border-blue-400 border-solid border-2 rounded-xl pt-2">
                        <div class="border-blue-400 border-solid border-2 rounded-md w-16 text-center bg-white text-blue-400 -mt-6 ml-6">需求方</div>
                        <div class="py-2">
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 0) > -1" label="单位名称" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_CompanyName" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 1) > -1" label="单位地址" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_CompanyAddress" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 2) > -1" label="法定代表" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_LegalPerson" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 3) > -1" label="委托代理" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_Entrust" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 4) > -1" label="开户银行" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_Bank" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 5) > -1" label="银行账号" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_BankAccount" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 6) > -1" label="电话" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_Telephone" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 7) > -1" label="税号" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.J_Duty" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                    <div class="w-1/2 pl-1">
                      <div class="border-blue-400 border-solid border-2 rounded-xl pt-2">
                        <div class="border-blue-400 border-solid border-2 rounded-md w-16 text-center bg-white text-blue-400 -mt-6 ml-6">供货方</div>
                        <div class="py-2">
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 0) > -1" label="单位名称" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_CompanyName" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 1) > -1" label="单位地址" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_CompanyAddress" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 2) > -1" label="法定代表" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_LegalPerson" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 3) > -1" label="委托代理" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_Entrust" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 4) > -1" label="开户银行" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_Bank" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 5) > -1" label="银行账号" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_BankAccount" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 6) > -1" label="电话" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_Telephone" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                          <el-form-item v-if="data.InfoField.findIndex((f) => f == 7) > -1" label="税号" prop="ComName">
                            <el-input :readonly="data.disabled" v-model="data.form.Y_Duty" placeholder="请输入" class="otherinputclass" />
                          </el-form-item>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-form>
        </div>
        <el-dialog custom-class="tabledialog" v-if="batchview.show" :before-close="cancelbatch" v-model="batchview.show" width="400px" :close-on-click-modal="false" :close-on-press-escape="false">
          <div class="text-center font-semibold">物流分批</div>
          <div class="text-center pt-4">
            预计物流时间:
            <el-date-picker v-model="batchview.time" type="date" placeholder="请选择" style="width: 230px" />
          </div>
          <div class="text-center pt-4">
            <el-button size="small" @click="cancelbatch">取消</el-button>
            <el-button size="small" type="primary" @click="submitbatch">确认</el-button>
          </div>
        </el-dialog>
        <el-dialog custom-class="tabledialog" v-if="FieldSetView.show" :before-close="cancelFieldSetView" v-model="FieldSetView.show" width="850px" :close-on-click-modal="false" :close-on-press-escape="false">
          <div>
            <div class="text-center font-semibold">字段设置</div>
            <div class="inquiry-edit-excel-column-check pt-2">
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
              <el-button type="primary" size="small" @click="cancelFieldSetView">取消</el-button>
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
        <div>
          <template v-if="data.ViewType != 1">
            <!-- 审批记录 -->
            <slot name="ApprovalProcess"></slot>
            <!-- 审批 -->
            <template v-if="data.ViewType == 4">
              <el-input v-model="data.Approval.remark" placeholder="请输入审批意见" type="textarea" :rows="3" />
              <div class="bf-search-formItem">
                <div class="text-center w-full mt-4">
                  <el-button type="danger" @click="ApprovalForm(0)">驳 回</el-button>
                  <el-button type="primary" @click="ApprovalForm(1)">审 批</el-button>
                </div>
              </div>
            </template>
          </template>
        </div>

        <div v-if="data.ViewType != 4" class="text-center pt-6">
          <el-button class="cancelbut" @click="closeWindow"> 取消 </el-button>
          <el-button type="warning" @click="previewContract()"> 预览合同 </el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)" v-if="!data.disabled"> 提交 </el-button>
        </div>
      </div>
    </CusDialog>

    <CusDialog v-if="relationdata.show" :boxStyle="cusboxStyle" title="选择客户" :is-show="true" @closeWindow="cancelrelation">
      <div>
        <el-card class="sale_card" style="padding: 0px">
          <div>
            <el-input v-model="relationpageInfo.Name" style="width: 200px"></el-input>
            <el-button @click="CustomersByNameEvent">搜索</el-button>
          </div>
        </el-card>

        <el-card class="sale_card mt-6">
          <div>
            <el-table border :data="relationdata.list" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
              <el-table-column type="index" width="50" label="序号" />
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

    <CusDialog v-if="orderdata.show" :boxStyle="cusboxStyle" title="选择报价单" :is-show="true" @closeWindow="cancelorder">
      <div>
        <div class="sale_card flex flex-row-reverse" style="padding: 0px">
          <div>
            <el-input v-model="orderpageInfo.cusname" style="width: 200px" class="mr-2" placeholder="请输入报价单名称"></el-input>
            <el-button @click="GetCustomerOrderListEvent" color="#027aff">搜索</el-button>
          </div>
        </div>

        <el-card class="sale_card mt-2">
          <div>
            <el-table border :data="orderdata.list" @selection-change="handleSelectionChange" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
              <el-table-column type="selection" width="50" />
              <el-table-column type="index" width="50" label="序号" />
              <el-table-column prop="CreateOn" width="110" label="创建时间">
                <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
              </el-table-column>
              <el-table-column prop="CustomerName" label="客户名称" show-overflow-tooltip />
              <el-table-column prop="Amount" width="100" label="报价金额" />
              <el-table-column prop="OrderNo" width="130" label="报价单号" />
              <el-table-column prop="address" width="50" label="等级">
                <template #default="scope">{{ scope.row.Grade }}级</template>
              </el-table-column>
            </el-table>
            <div class="flex justify-end">
              <el-pagination small v-model:page-size="orderpageInfo.size" :background="true" layout="prev, pager, next, jumper" :total="orderpageInfo.count" @size-change="orderhandleSizeChange" @current-change="orderhandleCurrentChange" />
            </div>
            <div class="text-center pt-6">
              <el-button class="cancelbut" @click="cancelorder"> 取消 </el-button>
              <el-button type="primary" @click="choiceorder"> 选择 </el-button>
              <el-button class="warningbut" @click="mergeEvent"> 合并 </el-button>
            </div>
          </div>
        </el-card>
      </div>
      <CusDialog v-if="orderdata.mergeshow" :boxStyle="cusboxStyle" title="合并报价单" :is-show="true" @closeWindow="canclemerge">
        <div>
          <el-card class="sale_card" style="padding: 0px">
            <div>
              <div class="font-semibold">主体报价单</div>
              <el-table border :data="orderdata.checklist" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                <el-table-column type="index" width="100" label="序号" />
                <el-table-column prop="CreateOn" width="110" label="创建时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>
                <el-table-column prop="CustomerName" label="客户名称" show-overflow-tooltip />
                <el-table-column prop="Amount" width="100" label="报价金额" />
                <el-table-column prop="OrderNo" width="130" label="报价单号" />
                <el-table-column prop="address" width="50" label="等级">
                  <template #default="scope">{{ scope.row.Grade }}级</template>
                </el-table-column>
              </el-table>
            </div>
          </el-card>

          <el-card class="sale_card mt-6" style="padding: 0px">
            <div>
              <div class="font-semibold">合并报价单</div>
              <el-table border :data="orderdata.mergelist" @selection-change="mergehandleSelectionChange" :header-cell-style="{ 'font-size': '12px', padding: '0px', background: '#E7F4FE', color: '#303133', height: '36px', textAlign: 'center', fontWeight: '500' }" :cell-style="{ textAlign: 'center', color: '#333', height: '36px', padding: '0px' }" style="width: 100%">
                <el-table-column type="selection" width="50" />
                <el-table-column type="index" width="50" label="序号" />
                <el-table-column prop="CreateOn" width="110" label="创建时间">
                  <template #default="scope">{{ (scope.row.CreateOn || '').substring(0, 11) }}</template>
                </el-table-column>
                <el-table-column prop="CustomerName" label="客户名称" show-overflow-tooltip />
                <el-table-column prop="Amount" width="100" label="报价金额" />
                <el-table-column prop="OrderNo" width="130" label="报价单号" />
                <el-table-column prop="address" width="50" label="等级">
                  <template #default="scope">{{ scope.row.Grade }}级</template>
                </el-table-column>
              </el-table>

              <div class="text-center pt-6">
                <el-button type="primary" @click="choicmerge"> 选择 </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </CusDialog>
    </CusDialog>
    <!-- 侧边栏 -->
    <Sidebar :Info="data.form" :width="1070"></Sidebar>
    <!-- 合同模板管理 -->
    <ContractEmplate ref="ContractEmplateRef"></ContractEmplate>
    <!-- 浏览合同 -->
    <PrintPreview ref="PrintPreviewRef" :ContractTerms="data.form.ContractTerms" :FormData="data.form" :ColumnData1="data.ColumnData1" :detail1="data.detail1" :ColumnData2="data.ColumnData2" :detail2="data.detail2" :InfoField="data.InfoField" :formattype="formattype" />
    <!-- 加价管理 -->
    <CompanyModel v-if="CompanyModelRef.show" :ViewType="2" :dialogVisible="CompanyModelRef.show" :IdList="CompanyModelRef.IdList" @closeWindow="colsecompany" @GetOrderMarkUpInfoEven="GetOrderMarkUpInfoEven"></CompanyModel>
  </div>
</template>
<script lang="ts" setup>
import { PostOrderMarkUpInfo } from '/@/api/Sale/MarkUp'
import { accMul, accAdd, accSub, accDiv, BlRoutineType } from '/@/utils/operation'
import CompanyModel from '/@/views/Sale/Contract/RaisePrice/CompanyModel.vue'
import PrintPreview from '/@/views/Sale/Contract/Preview/PrintPreview.vue'
import ContractEmplate from '/@/views/Sale/Contract/Preview/ContractEmplate.vue'
import { GetUserinformation } from '/@/api/layout/index'
import { toChies } from '/@/utils/tools'
import Editor from '@tinymce/tinymce-vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { GetCustomersByName, GetCustomerInvoiceById, GetAllRegionTree, GetCompanyByCustomer, GetCustomerOrderList, GetMergeOrderList, PostAddContract, GetContractInfo } from '/@/api/hr/School/PracticalBase'
import { PostApprovalContract } from '/@/api/Sale/Contract'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import Sidebar from '/@/views/Sale/Contract/RaisePrice/Sidebar.vue'
import { parseTime, getTime } from '/@/utils/tools'
import { contract } from '/@/utils/contract'
import { reactive, ref, onMounted, watch, computed } from 'vue'
import { useCommonStore } from '/@/store/modules/Common'
import MagicString from 'magic-string'
const ContractEmplateRef = ref<any>()

const store = useCommonStore() //记得加这一句
const Editorinit = reactive({
  apikey: 'qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc',

  init: {
    language: 'zh_CN', //语言类型
    placeholder: '在这里输入文字', //textarea中的提示信息

    height: 450, //注：引入autoresize插件时，此属性失效
    resize: 'both', //编辑器宽高是否可变，false-否,true-高可变，'both'-宽高均可，注意引号
    branding: false, //tiny技术支持信息是否显示
    font_formats: '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;', //字体样式
    plugins: 'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern autosave emoticons noneditable template importcss ' //插件配置 axupimgs indent2em
  }
})
const dic = reactive({
  InvoiceStage: [],
  PaymentStage: [],
  taxation: [],
  Cooperation: [],
  invoiceType: [],
  Urgency: [],
  Signage: [] //标牌证件
})
//获取字典数据
const getDictionaryData = () => {
  //开票阶段
  store.getDict('sale_Contract_InvoiceStage').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.InvoiceStage = res

    // console.log('dic.InvoiceStage', dic.InvoiceStage)
  })
  //付款阶段
  store.getDict('sale_Contract_PaymentStage').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.PaymentStage = res
  })
  //发票种类
  store.getDict('sale_Contract_InvoiceType').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.invoiceType = res
  })
  //合作状态
  store.getDict('sale_Order_Cooperation').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Cooperation = res
  })
  /*   //税费种类
  store.getDict('sale_Contract_InvoiceType').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.invoiceType = res
  }) */
  //紧急程度
  store.getDict('sale_Order_Urgency').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Urgency = res
  })

  //付款阶段
  store.getDict('sale_Order_Signage').then((res: any) => {
    res.forEach((item: any) => {
      item.DicKey = Number(item.DicKey)
    })
    dic.Signage = res
  })
}

const props = defineProps({
  info: {
    type: Object,
    default: {
      checkId: null,
      Id: null,
      // 显示类型 1 添加 2修改 3查看 4审批
      viewType: 1
    }
  },
  ViewType: {
    type: Number,
    default: 1 //1是添加  2是修改 3是查看
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
    default: '新增销售合同'
  }
})
const regionProps = {
  children: 'children',
  label: 'title',
  value: 'title',
  expandTrigger: 'hover'
}

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
  CustomerName: [
    {
      required: true,
      message: '请选择需求方',
      trigger: 'change'
    }
  ],
  SigningAddress: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  Amount: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  Taxation: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  Cooperation: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  Signage: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  Urgency: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  DeliveryTime: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  DiscountAmount: [
    {
      required: true,
      message: '请输入',
      trigger: 'change'
    }
  ],
  InvoiceType: [
    {
      required: true,
      message: '请选择税费',
      trigger: 'change'
    }
  ],
  CompanyId: [
    {
      required: true,
      message: '请选择供货方',
      trigger: 'change'
    }
  ],
  PaymentDate: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  Stage: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],

  Proportion: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  Consignee: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  Contacts: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  Post: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  Address: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ],
  Batch: [
    {
      required: true,
      message: '请选择',
      trigger: 'change'
    }
  ]
})

//#region 字段设置
///自定义字段
const CustomColumns = ref([
  {
    id: 20,
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
    id: 21,
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
    id: 22,
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
    id: 23,
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
    id: 24,
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
//表单1字段设置
const FieldData1 = ref([
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
    sort: 0,
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
    sort: 0,
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
    sort: 4,
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
    sort: 5,
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
    sort: 6,
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
    sort: 7,
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
  },
  {
    id: 19,
    width: 80,
    name: 'SaleMinPrice',
    colname: '最低价',
    sort: 0,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  }
])
const FieldDataValue1 = ref([1, 2, 3, 6, 7, 9, 10, 8])
//表单2字段设置
const FieldData2 = ref([
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
    sort: 0,
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
    sort: 0,
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
    sort: 4,
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
    sort: 5,
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
    sort: 6,
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
    sort: 7,
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
  },
  {
    id: 19,
    width: 80,
    name: 'SaleMinPrice',
    colname: '最低价',
    sort: 7,
    merge: false,
    show: 1,
    hide: 0,
    base: 1,
    rename: '',
    mergeid: 0
  }
])
const FieldDataValue2 = ref([1, 2, 3, 6, 7, 9, 19, 10, 8])
//字段设置弹窗显示
const FieldSetView = reactive({
  show: false,
  type: 0
})
const eltran: any = ref()
//字段设置弹窗中穿梭框数据
const checkFieldData: any = ref([])
//选定的值
const checkFieldDataValue = ref<number[]>([])

//复制列表
const getFieldData = (val: any) => {
  let list: any[] = []
  val.forEach((item: any) => {
    let a = JSON.parse(JSON.stringify(item))
    list.push(a)
  })
  return list
}
//打开字段设置弹窗
const openFieldSetView = (val: any) => {
  if (val == 1) {
    data.ColumnData1 = []
    checkFieldDataValue.value = getFieldData(FieldDataValue1.value)
    checkFieldData.value = getFieldData(FieldData1.value)
  } else if (val == 2) {
    data.ColumnData2 = []
    checkFieldDataValue.value = getFieldData(FieldDataValue2.value)
    checkFieldData.value = getFieldData(FieldData2.value)
  }

  FieldSetView.type = val
  FieldSetView.show = true
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
  // console.log(value, direction, movedKeys)
}

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
}

///合并字段
const mergefield = () => {
  let checkeds = getRightCheckChangeList()
  if (checkeds.length < 2) {
    ElMessage.warning('至少选择两个字段进行合并')
    return
  }
  let checkone = checkFieldData.value.find((f: any) => f.id == checkeds[0])

  // console.log('checkone', checkone)
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
  // console.log('checkFieldData.value', checkFieldData.value)
}

///确认字段设置
const submitField = () => {
  if (FieldSetView.type == 1) {
    FieldDataValue1.value = getFieldData(checkFieldDataValue.value)
    FieldData1.value = getFieldData(checkFieldData.value)
    data.ColumnData1 = getTableColumn(FieldDataValue1.value, FieldData1.value)
    // console.log('data.ColumnData1', data.ColumnData1)
  } else if (FieldSetView.type == 2) {
    data.ColumnData2 = []
    FieldDataValue2.value = getFieldData(checkFieldDataValue.value)
    FieldData2.value = getFieldData(checkFieldData.value)
    data.ColumnData2 = getTableColumn(FieldDataValue2.value, FieldData2.value)
  }
  cancelFieldSetView()
}

///获取列表列
const getTableColumn = (ValueList: any, DataList: any) => {
  var columns: any = []
  ValueList.forEach((item: any) => {
    var index = DataList.findIndex((f: any) => f.id == item)
    if (index >= 0) {
      var column = DataList[index]
      columns.push(column)
    }
  })
  return columns
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
//新增字段弹窗
const columnvisible = ref(false)

const columnoption: any = ref({})

const showcolumn = () => {
  let bl = false
  for (let index = 0; index < CustomColumns.value.length; index++) {
    bl = checkFieldData.value.findIndex((f: any) => f.id == CustomColumns.value[index].id) > 0
    // console.log('bl', bl)
    if (!bl) {
      columnoption.value = CustomColumns.value[index]
      break
    }
  }
  // console.log('bl', bl)
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

///拆分字段
const splitfield = (val: any) => {
  // console.log('val', val)

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
}
//关闭字段设置弹窗
const cancelFieldSetView = () => {
  if (FieldSetView.type == 1) {
    data.ColumnData1 = getTableColumn(FieldDataValue1.value, FieldData1.value)
    // console.log('data.ColumnData1', data.ColumnData1)
  } else if (FieldSetView.type == 2) {
    data.ColumnData2 = getTableColumn(FieldDataValue2.value, FieldData2.value)
  }
  FieldSetView.show = false
}
//#endregion
const tabletopindex = ref(0)
const checktop = (val: any) => {
  tabletopindex.value = val
}
const formattype = ref(2)
const checkformat = (val: any) => {
  formattype.value = val
}

//#region 客户弹窗

///查询客户
const relationpageInfo = reactive({
  Name: '',
  count: 0,
  page: 1,
  size: 10
})
const relationdata = reactive({
  show: false,
  list: []
})
const cancelrelation = () => {
  relationdata.show = false
}
const showrelation = () => {
  if (data.disabled == false) {
    relationdata.show = true
    CustomersByNameEvent()
  }
}
const CustomersByNameEvent = () => {
  GetCustomersByName(relationpageInfo).then((res) => {
    if (res.code == 1) {
      relationpageInfo.count = res.data.count
      relationdata.list = res.data.list
    }
  })
}
///客户分页
const relationhandleSizeChange = (val: number) => {
  relationpageInfo.size = val
  CustomersByNameEvent()
}
///获取客户开票信息
const getcusinvoice = () => {
  GetCustomerInvoiceById({ CusId: data.form.CustomerId }).then((res) => {
    if (res.code == 1) {
      data.form.J_CompanyName = res.data.CompanyName
      data.form.J_CompanyAddress = res.data.CompanyAddress
      data.form.J_LegalPerson = res.data.LegalPerson
      data.form.J_Entrust = res.data.Entrust
      data.form.J_Bank = res.data.Bank
      data.form.J_BankAccount = res.data.BankAccount
      data.form.J_Telephone = res.data.Telephone
      data.form.J_Duty = res.data.Duty
    }
  })
}
const checkcustomer = (val: any) => {
  data.form.CustomerName = val.Name
  data.form.CustomerId = val.Id
  data.form.CustomerOrderId = 0
  data.form.CustomerOrderNo = ''
  data.form.CreditScore = val.CreditScore
  getcusinvoice()
  GetOrderCompanyEvent()
  cancelrelation()
}
const relationhandleCurrentChange = (val: number) => {
  relationpageInfo.page = val
  CustomersByNameEvent()
}
//#endregion

//#region 加价弹窗
const CompanyModelRef = ref({
  show: false,
  IdList: <any>[]
})
const colsecompany = () => {
  CompanyModelRef.value.show = false
}

//获取加价及报价单详情
var GetOrderMarkUpInfoEven = (val: any) => {
  var postdata: any = { MarkUpId: val, OrderIds: data.orderIds }
  PostOrderMarkUpInfo(postdata).then((res) => {
    if (res.code == 1) {
      var dto = res.data
      var list = dto.Entity
      var order = dto.OrderBill
      var markup = dto.Bill
      //报价单位赋值
      data.form.CompanyId = order.CompanyId
      changeCompany()
      data.form.Taxrate = markup.Taxrate
      data.form.BondRate = markup.BondRate
      data.form.RiskFundRate = markup.RiskFundRate
      data.form.FreightRate = markup.FreightRate
      data.form.PercentageRate = markup.PercentageRate
      data.form.IntermediatorRate = markup.IntermediatorRate
      data.form.RoutineRate = markup.RoutineRate
      data.form.UnRoutineRate = markup.UnRoutineRate

      data.form.IntroductionFee = markup.Intermediator
      data.form.MarkupFee = markup.MarkupFee

      //赋值报价单信息
      data.form.CustomerOrderId = order.Id
      data.form.CustomerOrderNo = order.OrderNo
      data.detail2.length = 0
      dto.OrderEntitie.forEach((item: detail) => {
        var f = list.find((f: any) => f.OrderEntityId == item.Id)
        if (f) {
          item.Price = f.Price
          item.SaleMinPrice = f.SaleMinPrice
          item.RoutineType = BlRoutineType(item.Routine)
          data.detail2.push(item)
        }
      })
    }
  })
}

//#endregion

//#region 报价单弹窗

///查询客户
const orderpageInfo = reactive({
  Name: '',
  count: 0,
  page: 1,
  size: 10,
  orderstate: 41
})
const orderdata = reactive({
  mergeshow: false,
  show: false,
  list: [],
  checklist: <any>[],
  mergelist: []
})
const cancelorder = () => {
  orderdata.show = false
}
const showorder = () => {
  if (data.disabled == false) {
    orderdata.show = true
    GetCustomerOrderListEvent()
  }
}
const GetCustomerOrderListEvent = () => {
  GetCustomerOrderList(orderpageInfo).then((res) => {
    if (res.code == 1) {
      orderpageInfo.count = res.data.count
      orderdata.list = res.data.list
    }
  })
}
///报价单分页
const orderhandleSizeChange = (val: number) => {
  orderpageInfo.size = val
  GetCustomerOrderListEvent()
}
const checkorder = (val: any) => {
  cancelorder()
}
const orderhandleCurrentChange = (val: number) => {
  orderpageInfo.page = val
  GetCustomerOrderListEvent()
}
///导入报价单选中列表
const orderSelection = ref<any[]>([])
const handleSelectionChange = (val: any) => {
  orderSelection.value = val
}
///合并报价单选中列表
const mergeSelection = ref<any[]>([])
const mergehandleSelectionChange = (val: any) => {
  mergeSelection.value = val
}

const choiceorder = () => {
  if (orderSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (orderSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }

  data.form.CustomerName = orderSelection.value[0].CustomerName
  data.form.CustomerId = orderSelection.value[0].CustomerId

  data.orderIds = []
  data.orderIds.push(Number(orderSelection.value[0].Id))

  CompanyModelRef.value.IdList = data.orderIds
  CompanyModelRef.value.show = true
  cancelorder()

  // console.log(data.orderIds)
  GetOrderCompanyEvent()

  /*   PostOrderEntityList(data.orderIds).then((res) => {
    if (res.code == 1) {
      data.detail2.length = 0
      res.data.entities.forEach((item: detail) => {
        data.detail2.push(item)
      })
      cancelorder()
    }
  }) */

  getcusinvoice()
}

const mergeEvent = () => {
  if (orderSelection.value.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }

  if (orderSelection.value.length > 1) {
    ElMessage.warning('只能选择一条数据')
    return false
  }
  data.form.CustomerName = orderSelection.value[0].CustomerName
  data.form.CustomerId = orderSelection.value[0].CustomerId

  GetOrderCompanyEvent()

  orderdata.checklist.length = 0
  var check = orderSelection.value[0]
  orderdata.checklist.push(check)
  GetMergeOrderList({ BillId: check.Id, CusId: check.CustomerId }).then((res) => {
    if (res.code == 1) {
      orderdata.mergelist = res.data
      orderdata.mergeshow = true
    }
  })
}

const choicmerge = () => {
  data.orderIds = []
  data.orderIds.push(orderdata.checklist[0].Id)
  mergeSelection.value.forEach((item: any) => {
    data.orderIds.push(Number(item.Id))
  })

  CompanyModelRef.value.IdList = data.orderIds
  CompanyModelRef.value.show = true
  cancelorder()

  /*   PostOrderEntityList(data.orderIds).then((res) => {
    if (res.code == 1) {
      data.detail2.length = 0
      res.data.entities.forEach((item: detail) => {
        data.detail2.push(item)
      })
      cancelorder()
    }
  }) */
}

const canclemerge = () => {
  orderdata.mergeshow = false
}
//#endregion

//#region 物流批次
const batchview = reactive({
  show: false,
  time: ''
})
//打开添加批次弹窗
const showbatch = () => {
  if (data.detailSelection.length == 0) {
    ElMessage.warning('请至少选择一条数据')
    return false
  }
  batchview.time = ''
  batchview.show = true
}

//关闭添加批次弹窗
const cancelbatch = () => {
  batchview.show = false
}

const submitbatch = () => {
  if (batchview.time == '') {
    ElMessage.warning('请选择时间')
    return false
  }
  var batchtime = parseTime(new Date(batchview.time), '{y}-{m}-{d}') || ''

  data.detailSelection.forEach((iteminfo) => {
    var index = data.detail2.findIndex((f) => f == iteminfo)
    if (data.batchlist.length > 0) {
      var batch = data.batchlist.find((f) => {
        if (batchtime == f.BatchTime) {
          return f
        }
      })
      // console.log(batch)

      if (batch) {
        if (index > -1) {
          data.detail2[index].BatchNum = batch.Num
        }
      } else {
        var item: batch = {}
        item.Num = data.batchlist.length + 1
        item.BatchTime = batchtime
        data.batchlist.push(item)
        if (index > -1) {
          data.detail2[index].BatchNum = item.Num
        }
      }
    } else {
      var item: batch = {}
      item.Num = data.batchlist.length + 1
      item.BatchTime = batchtime
      data.batchlist.push(item)
      if (index > -1) {
        data.detail2[index].BatchNum = item.Num
      }
    }
  })

  cancelbatch()
}

//#endregion
///物流批次
interface batch {
  Id?: number
  Num?: Number
  BatchTime?: string
}

interface detail {
  Id?: string
  TechId?: string
  Name?: string
  Model?: MagicString
  Specifications?: string
  Pressure?: string
  Material?: string
  Unit?: string
  Quantity?: number
  Note?: string
  CostPrice?: number
  Price?: number
  SaleMinPrice?: number
  Amount?: number
  Weight?: string
  Driving?: string
  Structural?: string
  Sealing?: string
  Connection?: string
  RoutineType?: number
  Routine?: string
  Technical?: string
  SerialNumber?: string
  Column1?: string
  Column2?: string
  Column3?: string
  Column4?: string
  Column5?: string
  BatchNum?: Number
}
interface receiving {
  Id?: number
  Consignee?: string //收货人
  Contacts?: string //联系人
  Post?: string //职务
  Address?: string //地址
  Batch?: string //批次
}

interface payment {
  Id?: number
  PaymentDate?: string //付款日期
  Stage?: string //阶段
  Amount?: number //金额
  Proportion?: number //占比
}

interface invoice {
  Id?: number
  PaymentDate?: string //付款日期
  Stage?: string //阶段
  Amount?: number //金额
  Proportion?: number //占比
}
//计算实际金额
const compRealAmount: any = computed(() => {
  return data.form.DiscountAmount - data.form.IntroductionFee
})
//计算税费
const compTaxation: any = computed(() => {
  return Number(accMul(accDiv(data.form.DiscountAmount, 1 + data.form.Taxrate / 100), data.form.Taxrate / 100).toFixed(2))
})

const data = reactive({
  address: <any>[],
  ContractTerms: '',
  batchlist: <Array<batch>>[], //批次列表
  orderIds: <Array<Number>>[],
  InfoField: [0, 1, 2, 3, 4, 5, 6, 7],
  paymentSelection: [], //付款计划选择列表
  invoiceSelection: [], //开票计划选择列表
  receivingSelection: [], //收货信息选择列表
  detailSelection: [], //合同清单选中列表
  ColumnData1: [],
  ColumnData2: [],
  detail1: <Array<detail>>[{ Name: '阀门', Unit: '批' }],
  detail2: <Array<detail>>[],

  form: <any>{
    Urgency: null,
    CostPrice: 0,
    SaleMinPrice: 0,
    Taxrate: 0, //税率
    BondRate: 0, //质保金比例
    RiskFundRate: 0, //风险金比例
    FreightRate: 0, //运费比例
    PercentageRate: 0, //提成比例
    IntermediatorRate: 0, //居间费比例
    RoutineRate: 0, //常规加价比例
    UnRoutineRate: 0, //非常规加价比例

    IntroductionFee: 0, //居间费
    Cooperation: null,
    Taxation: 0,
    InvoiceType: null,
    MarkupFee: 0, //加价费
    DiscountAmount: 0, //成交金额
    SignageName: '',
    DeliveryTime: 0,
    Signage: null,
    CustomerOrderId: 0,
    CustomerOrderNo: '',
    BillNo: '',
    CustomerName: '',
    CustomerId: 0,
    CreditScore: 0,
    Id: 0,
    CompName: '',
    DeptName: '',
    PostName: '',
    CompId: 0,
    DeptId: 0,
    PostId: 0,
    SalerName: '',
    AgreeDate: parseTime(getTime('day'), ''),
    CompanyId: null,
    CompanyName: '',
    SigningAddress: '',
    Amount: 0,
    RealAmount: 0,
    Freight: 0,
    Percentage: 0, //提成费
    ContractTerms: <any>'',
    J_CompanyName: '',
    J_CompanyAddress: '',
    J_LegalPerson: '',
    J_Entrust: '',
    J_Bank: '',
    J_BankAccount: '',
    J_Telephone: '',
    J_Duty: '',

    Y_CompanyName: '',
    Y_CompanyAddress: '',
    Y_LegalPerson: '',
    Y_Entrust: '',
    Y_Bank: '',
    Y_BankAccount: '',
    Y_Telephone: '',
    Y_Duty: ''
  },

  Approval: {
    remark: ''
  },
  Company: [],
  receivinglist: <Array<receiving>>[],
  paymentlist: <Array<payment>>[],
  invoicelist: <Array<invoice>>[],
  disabled: false,
  ViewType: 1,
  contract_type: undefined // 合同类型
})

//#region 计算

///计算最低成本价
const ComputeCostMinPrice = (costPrice: any) => {
  let perc = accAdd(1, data.form.BondRate / 100)
  perc = accAdd(perc, data.form.RiskFundRate / 100)
  perc = accAdd(perc, data.form.FreightRate / 100)
  perc = accAdd(perc, data.form.PercentageRate / 100)

  let price = Number(accMul(accMul(costPrice, perc), accAdd(1, data.form.Taxrate / 100)).toFixed(1))
  return price
}

//#endregion

// 选择合同模板
const changeContract = (val: any, val2: any) => {
  // 查询模板
  let bigItm: any = contract.find((itm: any) => itm.id == val)
  var option = []
  if (bigItm) {
    option = bigItm.options
  }

  let content = option.find((itm: any) => itm.id == val2)
  if (content) {
    data.form.ContractTerms = content.content
  }
}
// 清空模板
const clearContract = () => {
  data.form.ContractTerms = ''
}

const openContractEmplate = (val: any) => {
  ContractEmplateRef.value.openContractEmplate(val)
}

//#region 签约地点
const Region = ref<any>([])
const GetRegion = () => {
  GetAllRegionTree().then((res) => {
    if (res.code == 1) {
      Region.value = res.data
    }
  })
}
const addresschange = () => {
  if (data.address.length > 0) {
    var address = ''
    data.address.forEach((item: any) => {
      address += item
    })
    data.form.SigningAddress = address
  }
}

//#endregion

//#region 合同清单
///添加分录
const adddetail = () => {
  var dedata: detail = {}
  data.detail2.push(dedata)
}

const handledetailChange = (val: any) => {
  data.detailSelection = val
}
///删除分录
const deldetail = () => {
  if (data.detailSelection.length > 0) {
    data.detailSelection.forEach((f: any) => {
      var index = data.detail2.indexOf(f)
      data.detail2.splice(index, 1)
    })
  } else {
    ElMessage.warning('请先选择分录')
  }
}
//#endregion

//#region 收货信息
///添加分录
const addreceiving = () => {
  var dedata: receiving = {}
  data.receivinglist.push(dedata)
}

const handlereceivingChange = (val: any) => {
  data.receivingSelection = val
}
///删除分录
const delreceiving = () => {
  if (data.receivingSelection.length > 0) {
    data.receivingSelection.forEach((f: any) => {
      var index = data.receivinglist.indexOf(f)
      data.receivinglist.splice(index, 1)
    })
  } else {
    ElMessage.warning('请先选择分录')
  }
}
//#endregion

//#region 开票信息
///添加分录
const addinvoice = () => {
  var dedata: invoice = {}
  data.invoicelist.push(dedata)
}

const handleinvoiceChange = (val: any) => {
  data.invoiceSelection = val
}
///删除分录
const delinvoice = () => {
  if (data.invoiceSelection.length > 0) {
    data.invoiceSelection.forEach((f: any) => {
      var index = data.invoicelist.indexOf(f)
      data.invoicelist.splice(index, 1)
    })
  } else {
    ElMessage.warning('请先选择分录')
  }
}
const invoicechange = (val: any) => {
  var amount = Number(data.invoicelist[val].Amount)
  if (data.form.DiscountAmount <= 0) {
    ElMessage.warning('成交金额不能为0')
    data.invoicelist[val].Amount = 0
    return false
  }
  if (amount > data.form.DiscountAmount) {
    ElMessage.warning('开票金额必须小于或等于成交金额')
    data.invoicelist[val].Amount = 0
    return false
  }

  data.invoicelist[val].Proportion = Number((amount / data.form.DiscountAmount).toFixed(2)) * 100
  // console.log((amount / data.form.Amount).toFixed(2))
}

//#endregion

//#region 付款信息
///添加分录
const addpayment = () => {
  var dedata: payment = {}
  data.paymentlist.push(dedata)
}

const handlepaymentChange = (val: any) => {
  data.paymentSelection = val
}
///删除分录
const delpayment = () => {
  if (data.paymentSelection.length > 0) {
    data.paymentSelection.forEach((f: any) => {
      var index = data.paymentlist.indexOf(f)
      data.paymentlist.splice(index, 1)
    })
  } else {
    ElMessage.warning('请先选择分录')
  }
}

const paymentchange = (val: any) => {
  var amount = Number(data.paymentlist[val].Amount)
  if (data.form.DiscountAmount <= 0) {
    ElMessage.warning('成交金额不能为0')
    data.paymentlist[val].Amount = 0
    return false
  }
  if (amount > data.form.DiscountAmount) {
    ElMessage.warning('付款金额必须小于或等于成交金额')
    data.paymentlist[val].Amount = 0
    return false
  }

  data.paymentlist[val].Proportion = Number((amount / data.form.DiscountAmount).toFixed(2)) * 100
  // console.log((amount / data.form.Amount).toFixed(2))
}
//#endregion
//获取报价单位
const GetOrderCompanyEvent = () => {
  GetCompanyByCustomer({ CusId: data.form.CustomerId }).then((res) => {
    if (res.code == 1) {
      data.Company = res.data
    }
  })
}

///监听报价单位变化
const changeCompany = () => {
  var item: any = data.Company.find((f: any) => f.Id == data.form.CompanyId)
  if (item) {
    data.form.CompanyName = item.Rename
    console.log('data.form.CompanyName', item)
    data.form.SigningAddress = item.Address

    data.form.Y_CompanyName = item.Rename
    data.form.Y_CompanyAddress = item.Address
    data.form.Y_LegalPerson = item.LegalPerson
    data.form.Y_Entrust = item.Entrust
    data.form.Y_Bank = item.Bank
    data.form.Y_BankAccount = item.BankAccount
    data.form.Y_Telephone = item.Telephone
    data.form.Y_Duty = item.Duty
  }
  ComputeTaxation()
}
const changeSignage = () => {
  var item: any = dic.Signage.find((f: any) => f.DicKey == data.form.Signage)
  if (item) {
    data.form.SignageName = item.DicValue
  }
  ComputeTaxation()
}
///计算税率
const ComputeTaxation = () => {
  data.form.Taxrate = 13
  console.log('data.form.CompanyName', data.form.CompanyName)

  if (data.form.CompanyName == '上海阀门二厂有限公司' && (data.form.SignageName == '中字牌' || data.form.SignageName == '签约单位')) {
    data.form.Taxrate = 20
  } else if (data.form.CompanyName == '湖北高中压阀门有限责任公司' && (data.form.SignageName == '湖高' || data.form.SignageName == '签约单位')) {
    data.form.Taxrate = 18
  } else if ((data.form.CompanyName == '北方阀门集团有限公司' || data.form.CompanyName == '北方高中压有限公司') && data.form.SignageName == '中字牌') {
    data.form.Taxrate = 15
  } else if (data.form.CompanyName == '北京高中压阀门科技集团有限公司' && (data.form.SignageName == '北高科' || data.form.SignageName == '签约单位')) {
    data.form.Taxrate = 13
  } else if ((data.form.CompanyName == '北方阀门集团有限公司' || data.form.CompanyName == '北方高中压阀门有限公司') && data.form.SignageName == '签约单位') {
    data.form.Taxrate = 13
  }
}

const changeInvoiceType = () => {
  console.log('data.form.InvoiceType', data.form.InvoiceType)
  if (data.form.InvoiceType == 2) {
    data.form.Taxrate = 0
  } else {
    ComputeTaxation()
  }
  sumAmount()
}

const emit = defineEmits(['closeWindow'])

const showdetails = ref(true)
const showdetailsEvent = (val: any) => {
  showdetails.value = val
}
const closeWindow = () => {
  emit('closeWindow')
}
const boxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})
const cusboxStyle = reactive({
  boxWidth: 'w-1070',
  boxHeight: '',
  boxPaddingTop: 'pt-12'
})

const sumAmount = () => {
  var Amount = 0
  var SaleMinPrice = 0
  var CostPrice = 0
  data.detail2.forEach((item) => {
    const Quantity = Number(item.Quantity)
    const Price = Number(item.Price)

    if (item.TechId) {
      item.SaleMinPrice = ComputeCostMinPrice(item.CostPrice)
    } else {
      item.SaleMinPrice = item.Price
      item.CostPrice = item.Price
    }
    CostPrice = accAdd(CostPrice, accMul(item.CostPrice, item.Quantity))
    SaleMinPrice = accAdd(SaleMinPrice, accMul(item.SaleMinPrice, item.Quantity))

    // console.log(item)

    // console.log(item)
    if (!Number.isNaN(Quantity) && !Number.isNaN(Price)) {
      item.Amount = accMul(Price, Quantity)
      Amount = Amount + item.Amount
    }
  })

  if (data.form.Freight == 2) {
    data.form.FreightRate = 0
  } else if (CostPrice < 5000) {
    data.form.FreightRate = 10
  } else if (CostPrice < 10000) {
    data.form.FreightRate = 6
  } else if (CostPrice < 50000) {
    data.form.FreightRate = 5
  } else if (CostPrice < 500000) {
    data.form.FreightRate = 4
  } else {
    data.form.FreightRate = 3
  }

  //根据销售价和最低销售价设置提成比例
  if (Amount >= SaleMinPrice) {
    data.form.PercentageRate = 3
  } else {
    //低于最低销售价百分之90只有百分之15的提成
    if (Amount < SaleMinPrice * 0.9) {
      data.form.PercentageRate = 1.5
    } else {
      data.form.PercentageRate = 2
    }
  }

  data.form.SaleMinPrice = Number(SaleMinPrice.toFixed(2))
  data.form.CostPrice = Number(CostPrice.toFixed(2))
  return Number(Amount.toFixed(2))
}
const PrintPreviewRef = ref<any>()
// 预览打印效果
const previewContract = () => {
  PrintPreviewRef.value.openPrint()
}

const submitdisplay = ref(false)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      if (data.receivinglist.length <= 0) {
        ElMessage.error('请填写收货信息')
        submitdisplay.value = false
        return false
      }
      if (submitdisplay.value == true) {
        return false
      }
      submitdisplay.value = true

      if (data.form.Amount <= 0) {
        ElMessage.error('合同金额不能为零')
        submitdisplay.value = false
        return false
      }
      var payment = 0
      for (let index = 0; index < data.paymentlist.length; index++) {
        const item = data.paymentlist[index]
        payment = payment + Number(item.Amount)
      }
      if (payment != data.form.DiscountAmount) {
        ElMessage.error('付款计划金额不能大于或小于成交金额')
        submitdisplay.value = false
        return false
      }
      var invoice = 0
      for (let index = 0; index < data.invoicelist.length; index++) {
        const item = data.invoicelist[index]
        invoice = invoice + Number(item.Amount)
      }
      if (invoice != data.form.DiscountAmount) {
        ElMessage.error('开票计划金额不能大于或小于成交金额')
        submitdisplay.value = false
        return false
      }
      var postdata: any = {}
      postdata.bill = data.form
      postdata.bill.RealAmount = compRealAmount //成交金额赋值
      postdata.bill.Taxation = compTaxation //税费赋值
      postdata.bill.Detail = JSON.stringify(data.detail1)
      postdata.bill.FieldData1 = JSON.stringify(FieldData1.value)
      postdata.bill.FieldData2 = JSON.stringify(FieldData2.value)
      postdata.bill.FieldDataValue1 = JSON.stringify(FieldDataValue1.value)
      postdata.bill.FieldDataValue2 = JSON.stringify(FieldDataValue2.value)

      postdata.entities = data.detail2
      postdata.paymentlist = data.paymentlist
      postdata.invoicelist = data.invoicelist
      postdata.receivinglist = data.receivinglist
      postdata.batchlist = data.batchlist

      PostAddContract(postdata).then((res) => {
        if (res.code == 1 && res.data == true) {
          ElMessage.success(res.message)
          closeWindow()
        } else {
          submitdisplay.value = false
          ElMessage.error(res.message)
        }
      })
    } else {
      ElMessage.warning('请填写完整！请检查收货信息，付款或开票计划是否有信息未填写。')
    }
  })
}
//审批合同
const ApprovalForm = (num: number) => {
  var arr = {
    checkId: props.info.checkId,
    state: num,
    remark: data.Approval.remark,
    dataid: data.form.Id
  }
  PostApprovalContract(arr).then((res: any) => {
    if (res.code == 1) {
      ElMessage({
        message: res.message,
        type: 'success'
      })
      closeWindow()
    } else {
      ElMessage.error(res.message)
    }
  })
}

const getuserinfo = () => {
  GetUserinformation(0).then((res) => {
    if (res.code == 1) {
      data.form.SalerName = res.data.RealName
      data.form.CompName = res.data.CompName
      data.form.DeptName = res.data.DeptName
      data.form.PostName = res.data.PostName
      data.form.CompId = res.data.CompId
      data.form.DeptId = res.data.DeptId
      data.form.PostId = res.data.PostId
    }
  })
}

const GetContractInfoEvent = () => {
  var Id = props.info.Id ? props.info.Id : props.DataId
  GetContractInfo({ Id: Id }).then((res) => {
    if (res.code == 1) {
      var info = res.data

      for (var item in data.form) {
        data.form[item] = info.bill[item]
      }

      data.detail1 = JSON.parse(info.bill.Detail)
      FieldData1.value = JSON.parse(info.bill.FieldData1)
      FieldData2.value = JSON.parse(info.bill.FieldData2)
      FieldDataValue1.value = JSON.parse(info.bill.FieldDataValue1)
      FieldDataValue2.value = JSON.parse(info.bill.FieldDataValue2)
      data.detail2.length = 0
      info.entities.forEach((item: detail) => {
        data.detail2.push(item)
      })
      data.paymentlist = info.paymentlist
      data.invoicelist = info.invoicelist
      data.receivinglist = info.receivinglist
      data.batchlist = info.batchlist
      data.ColumnData1 = getTableColumn(FieldDataValue1.value, FieldData1.value)
      data.ColumnData2 = getTableColumn(FieldDataValue2.value, FieldData2.value)

      GetOrderCompanyEvent()
    }
  })
}

onMounted(() => {
  GetRegion()
  getDictionaryData()

  if (props.info.viewType != 1) {
    data.ViewType = props.info.viewType
  } else {
    data.ViewType = props.ViewType
  }

  if (data.ViewType > 1) {
    if (data.ViewType == 2) {
      data.disabled = false
    } else if (data.ViewType == 3 || data.ViewType == 4) {
      data.disabled = true
    }
    GetContractInfoEvent()
  } else {
    getuserinfo()
    data.ColumnData1 = getTableColumn(FieldDataValue1.value, FieldData1.value)
    data.ColumnData2 = getTableColumn(FieldDataValue2.value, FieldData2.value)
  }
})
watch(data.detail2, (val) => {
  data.form.Amount = sumAmount()
  data.form.DiscountAmount = data.form.Amount
  data.form.Freight = Number(accMul(data.form.CostPrice, data.form.FreightRate / 100).toFixed(2))
  data.form.Percentage = Number(accMul(data.form.CostPrice, data.form.PercentageRate / 100).toFixed(2))
})
</script>
<style lang="postcss">
.addcontract {
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
.addcontract {
  .tableclass {
    :deep(.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell) {
      background-color: #fff;
    }
    :deep(.el-table .cell) {
      padding: 0px;
      text-align: center;
    }

    :deep(.el-input__wrapper) {
      .el-input__inner {
        text-align: center;
      }
      box-shadow: 0 0 0 1px #ffffff inset;
    }
    :deep(.el-form-item.is-error .el-input__wrapper) {
      box-shadow: 0 0 0 1px var(--el-color-danger) inset;
    }
    .el-form-item {
      margin-bottom: 0px;
      width: 100%;
      .el-form-item__content {
        .el-textarea {
          :deep(.el-textarea__inner) {
            box-shadow: none;
          }
        }
      }
    }
  }
  .otherinputclass {
    width: 400px;
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
  :deep(.el-form-item__content) {
    .el-input-group__append {
      padding: 0px 5px;
    }
  }
  :deep(.el-form-item__label) {
    padding: 0 5px 0 0;
    width: 4.45rem;
  }
  :deep(.el-input.is-disabled .el-input__wrapper) {
    background-color: #fff;
    .el-input__inner {
      color: #606266;
      -webkit-text-fill-color: #606266;
    }
  }
  .formattitle {
    width: 75px;
    text-align: center;
    line-height: 25px;
    height: 25px;
    background: #ffffff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
  }
  .checkformattitle {
    width: 75px;
    color: #ffffff;
    text-align: center;
    line-height: 25px;
    height: 25px;

    background: #027aff;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.16);
    border-radius: 4px;
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
}
.select-wai {
  :deep(.el-input__wrapper) {
    border: none;
    width: 100%;
    border-radius: 0;
    height: 38px;
    box-shadow: none;
    border-left: 1px solid rgb(204, 204, 204);
  }
  :deep(.el-input__wrapper:hover) {
    border: none;
    box-shadow: none;
    border-left: 1px solid rgb(204, 204, 204);
  }
  :deep(.el-select .el-input.is-focus .el-input__wrapper) {
    box-shadow: 0;
  }
}
</style>
