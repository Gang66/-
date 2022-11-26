<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" class="edit-sales-contract-open-window">
    <template #title>
      <div class="header px-4 pt-2 pb-2 sale_bg EditSalesContract_header">
        <div class="flex justify-between">
          <div class="text-sm">
            销售合同 (<el-dropdown @command="handleCommand">
              <span class="text-white">
                {{ data.contract }}
                <i class="iconfont icon-down"></i>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item :command="item.title" v-for="item in data.contractList">{{ item.title }}</el-dropdown-item>
                </el-dropdown-menu>
              </template> </el-dropdown
            >)
          </div>
          <el-icon @click="closeWindow('close')" class="cursor-pointer">
            <el-icon-Close />
          </el-icon>
        </div>
      </div>
      <div class="sales-contract-right rounded-tr-md rounded-br-md rounded-bl-lg">
        <div class="absolute w-28 h-6 bg-blue-500 -top-6 rounded-t-md text-white text-center">
          <i class="iconfont icon-fenxi"></i>
          <span class="text-sm">价格趋势</span>
        </div>
        <div class="p-2">
          <div class="w-32 bg-white text-xs rounded-t-lg pl-2 pt-2 pb-2 leading-5">
            <p class="text-gray-400">最低价：<span class="text-blue-500">774</span></p>
            <p class="text-gray-400">销售额：<span class="text-blue-500">800</span></p>
            <p class="text-gray-400">加价费：<span class="text-blue-500">30</span></p>
            <p class="text-gray-400">居间费：<span class="text-blue-500">10</span></p>
          </div>
          <div class="w-32 bg-white text-xs pl-2 pt-2 pb-2 leading-5 mt-2 mb-2">
            <p class="text-sm">固定成本管理</p>
            <p class="text-gray-400">税收：<span class="text-blue-500">15%</span></p>
            <p class="text-gray-400">质保金：<span class="text-blue-500">60%</span></p>
            <p class="text-gray-400">风险金：<span class="text-blue-500">0%</span></p>
            <p class="text-gray-400">运费：<span class="text-blue-500">5%</span></p>
            <p class="text-gray-400">提成：<span class="text-blue-500">1%</span></p>
          </div>
          <div class="w-32 bg-white text-xs pl-2 pt-2 pb-2 leading-5 rounded-b-lg">
            <p class="text-sm">销售加价管理</p>
            <p class="text-gray-400">常规/正常：<span class="text-blue-500">5.0%</span></p>
            <p class="text-gray-400">常规/异常：<span class="text-blue-500">0%</span></p>
            <p class="text-gray-400">非常规/正常：<span class="text-blue-500">0%</span></p>
            <p class="text-gray-400">非常规/异常：<span class="text-blue-500">50%</span></p>
            <p class="text-gray-400">居间费：<span class="text-blue-500">10%</span></p>
          </div>
        </div>
      </div>
    </template>
    <div class="p-4 relative EditSalesContract_bottom">
      <div class="w-1160 h-60 border">
        <div class="h-12 border-b-2 clearfix p-3">
          <div class="float-left text-sm">
            <span class="text-gray-400 mr-8">基本信息</span>
            <span class="text-blue-400">客户信用:</span>
            <span class="text-red-500">好</span>
            <span class="text-blue-400">一般</span>
            <span class="text-gray-400">差</span>
            <span class="ml-6">润扬事业部</span>
          </div>
          <div class="float-right text-sm"><span>固定合同（SE2111060001）</span></div>
        </div>
        <div class="pr-2 pl-3 pt-4 clearfix EditSalesContract_bottom_information">
          <el-form ref="ruleFormRef" :model="data.ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm flex flex-wrap" :inline="true">
            <el-form-item prop="Demander">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">需求方</span>
                <el-input v-model="data.ruleForm.Demander" placeholder="请输入内容" style="width: 300px" @click="openWindowImportQuotation()"> </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="SigningTime">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-top bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">签约时间</span>
                <el-date-picker v-model="data.ruleForm.SigningTime" type="date" placeholder="选择日期" style="width: 190px" />
              </div>
            </el-form-item>
            <el-form-item prop="ContractAmount">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">合同金额</span>
                <el-input v-model="data.ruleForm.ContractAmount" placeholder="请输入内容" style="width: 150px"> </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="ActualAmount">
              <div class="mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">实际金额</span>
                <el-input v-model="data.ruleForm.ActualAmount" placeholder="请输入内容" style="width: 150px"> </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="Supplier">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">供货方</span>
                <el-select v-model="data.ruleForm.Supplier" placeholder="选择选项" style="width: 300px">
                  <el-option v-for="item in data.SupplierOptions" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item prop="ContractingPlace">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">签约地点</span>
                <el-cascader v-model="data.ruleForm.ContractingPlace" :options="data.ContractingPlaceOptions" style="width: 190px" />
              </div>
            </el-form-item>
            <el-form-item prop="Minimum">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">最低售价</span>
                <el-input v-model="data.ruleForm.Minimum" placeholder="请输入内容" style="width: 150px"> </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="Royalties">
              <div class="mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">提成费</span>
                <el-input v-model="data.ruleForm.Royalties" placeholder="请输入内容" style="width: 150px">
                  <template #suffix>
                    <span class="text-xs text-red-500">10%</span>
                  </template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="Intermediary" :show-message="false">
              <div class="mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">居间费</span>
                <el-input v-model="data.ruleForm.Intermediary" placeholder="请输入内容" style="width: 100px"> </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="Markup" :show-message="false">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300 ml-5">加价费</span>
                <el-input v-model="data.ruleForm.Markup" placeholder="请输入内容" style="width: 100px"> </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="Cooperation">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">合作状态</span>
                <el-select v-model="data.ruleForm.Cooperation" placeholder="选择选项" style="width: 190px">
                  <el-option v-for="item in data.CooperationOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item prop="taxation">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">税费</span>
                <el-select v-model="data.ruleForm.taxation" placeholder="选择选项" style="width: 150px">
                  <el-option v-for="item in data.taxationOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item prop="Freight">
              <div class="mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">运费</span>
                <el-input v-model="data.ruleForm.Freight" placeholder="请输入内容" style="width: 150px">
                  <template #suffix>
                    <span class="text-xs text-blue-500">10%</span>
                  </template>
                </el-input>
              </div>
            </el-form-item>
            <el-form-item prop="Signage" :show-message="false">
              <div class="mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">标牌证件</span>
                <el-select v-model="data.ruleForm.Signage" placeholder="选择选项" style="width: 100px">
                  <el-option v-for="item in data.SignageCertificateOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300 ml-5">业务员</span>
                <el-input v-model="data.ruleForm.salesman" disabled placeholder="刘某某" style="width: 100px"></el-input>
              </div>
            </el-form-item>
            <el-form-item prop="Urgency" :show-message="false">
              <div class="mr-2 mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">紧急程度</span>
                <el-select v-model="data.ruleForm.Urgency" placeholder="选择选项" style="width: 190px">
                  <el-option v-for="item in data.UrgencyOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="mr-2 mb-2 EditSalesContract_bottom_information_period">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">供货周期</span>
                <el-input v-model="data.ruleForm.period" placeholder="请输入供货周期" style="width: 100px"> </el-input>
                <span class="inline-block w-12 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-r rounded-r border-gray-300">天</span>
              </div>
            </el-form-item>
            <el-form-item prop="Remarks" :show-message="false">
              <div class="mb-2">
                <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">备注</span>
                <el-input v-model="data.ruleForm.remarks" placeholder="请输入内容" style="width: 150px"> </el-input>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="mt-4">
        <el-tabs type="border-card">
          <el-tab-pane label="联系人">
            <!-- <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="姓名" align="center">
                  <template #default="scope">
                    <span>唐经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="电话" align="center">
                  <template #default="scope">
                    <span>-</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="手机" align="center">
                  <template #default="scope">
                    <span>1555555555</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="职务" align="center">
                  <template #default="scope">
                    <span>采购经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="类别" align="center">
                  <template #default="scope">
                    <span>决策人</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="用途" align="center">
                  <template #default="scope">
                    <span>收货</span>
                  </template>
                </el-table-column>
              </el-table>
            </div> -->
            联系人
          </el-tab-pane>
          <el-tab-pane label="付款/开票计划">
            <!-- <div class="bf-table-content float-left w-540 mr-10">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="付款日期" align="center">
                  <template #default="scope">
                    <span>2021-09-15</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款阶段" align="center">
                  <template #default="scope">
                    <span>发货款</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款占比%" align="center">
                  <template #default="scope">
                    <span>100</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款金额" align="center">
                  <template #default="scope">
                    <span>10800.00</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bf-table-content float-left w-540">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="开票日期" align="center">
                  <template #default="scope">
                    <span>2021-09-30</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="开票阶段" align="center">
                  <template #default="scope">
                    <span>发货后</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="开票金额" align="center">
                  <template #default="scope">
                    <span>10800.00</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="备注" align="center">
                  <template #default="scope">
                    <span>-</span>
                  </template>
                </el-table-column>
              </el-table>
            </div> -->
            付款/开票计划
          </el-tab-pane>
          <el-tab-pane label="收货人">
            <!-- <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="收货人" align="center">
                  <template #default="scope">
                    <span>唐经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="联系方式" align="center">
                  <template #default="scope">
                    <span>15555555555</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="收货地址" align="center" min-width="300">
                  <template #default="scope">
                    <span>山东威海荣成市河阳东路198号凯丽特种纸</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="所属批次" align="center">
                  <template #default="scope">
                    <span>-</span>
                  </template>
                </el-table-column>
              </el-table>
            </div> -->
            收货人
          </el-tab-pane>
          <el-tab-pane label="合同清单">
            <div class="pt-1 pb-1 clearfix tech_editSalesContract_Contract">
              <div class="text-sm">
                <span>表单1</span>
                <div class="inline-block w-1070 h-1 ml-3 bg-slate-100"></div>
              </div>
              <div class="flex">
                <div class="flex-auto"></div>
                <div class="mt-2">
                  <el-button type="primary" class="ml-3" plain size="small">设置字段</el-button>
                </div>
              </div>
              <div class="bf-table-content">
                <el-table :data="data.tableData" stripe>
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="ProductName" label="产品名称" align="center">
                    <template #default="scope">
                      <span>阀门</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="型号" align="center">
                    <template #default="scope">
                      <span>11111111</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="规格" align="center">
                    <template #default="scope">
                      <span>11111111</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单位" align="center">
                    <template #default="scope">
                      <span>台</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="数量" align="center">
                    <template #default="scope">
                      <span>200</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="金额" align="center">
                    <template #default="scope">
                      <span>20000.00</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="备注" align="center">
                    <template #default="scope">
                      <span>12222222222</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="h-10 bg-sky-50 leading-10 text-center text-sm">
                  <div class="w-14 float-left ml-2">
                    <span class="text-gray-400">合同金额</span>
                  </div>
                  <div class="w-600 inline-block">
                    <p>
                      （大写）：人民币<span class="ml-3 font-semibold">{{ toChies(27750) }}</span>
                    </p>
                  </div>
                  <div class="w-400 inline-block text-right">
                    <span class="text-gray-400">小写</span>
                    <span class="font-semibold ml-28">27000 元</span>
                  </div>
                </div>
                <div class="h-10 bg-sky-50 leading-10 text-center text-sm">
                  <div class="w-14 float-left ml-2">
                    <span class="text-gray-400">优惠金额</span>
                  </div>
                  <div class="w-600 inline-block">
                    <p>
                      （大写）：人民币<span class="ml-3 font-semibold">{{ toChies(0) }}</span>
                    </p>
                  </div>
                  <div class="w-400 inline-block text-right">
                    <span class="text-gray-400">小写</span>
                    <el-input v-model="data.discountInput" placeholder="输入内容" style="width: 100px" class="ml-14" />
                    <span class="font-semibold"> 元</span>
                  </div>
                </div>
                <div class="h-10 bg-sky-50 leading-10 text-center text-sm">
                  <div class="w-14 float-left ml-2">
                    <span class="text-gray-400">备注</span>
                  </div>
                  <div>
                    <el-input v-model="data.remarksInput" placeholder="输入内容" style="width: 1000px" />
                  </div>
                </div>
              </div>
              <div class="text-sm pt-4 pb-3">
                <span>表单2</span>
                <div class="inline-block w-1070 h-1 ml-3 bg-slate-100"></div>
              </div>
              <div class="text-sm leading-6 tech_editSalesContract_Contract_appendices">
                <p>合同附件</p>
                <p>甲方：唐山东江化工有限公司</p>
                <p class="inline-block">乙方：北方高中压阀门有限公司</p>
                <div class="float-right">
                  <el-button type="info" class="mr-3" plain size="small" @click="openWindowHechnicalMarkup()">查阅成本</el-button>
                  <span class="inline-block w-20 h-6 align-bottom bg-slate-100 text-center text-xs text-gray-400 leading-6 border-t border-b border-l rounded-l border-gray-300">小数部分</span>
                  <el-select v-model="data.ruleForm.Signage" placeholder="选择选项" style="width: 100px" size="small">
                    <el-option v-for="item in data.DecimalOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                  <el-button type="primary" class="ml-3" plain size="small">设置字段</el-button>
                </div>
              </div>

              <div class="bf-table-content">
                <el-table :data="data.tableData" stripe>
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="ProductName" label="产品名称" align="center">
                    <template #default="scope">
                      <span>衬氟手动球阀</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="型号" align="center">
                    <template #default="scope">
                      <span>J41H-16C</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="规格" align="center">
                    <template #default="scope">
                      <span>DN150</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单位" align="center">
                    <template #default="scope">
                      <span>个</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="数量" align="center">
                    <template #default="scope">
                      <span>200</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单价" align="center">
                    <template #default="scope">
                      <span>3654</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="最低价" align="center">
                    <template #default="scope">
                      <span>2753</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="金额" align="center">
                    <template #default="scope">
                      <span>10800</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="备注" align="center">
                    <template #default="scope">
                      <span>12222222222</span>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="h-10 bg-sky-50 leading-10 text-center text-sm">
                  <div class="w-14 float-left">
                    <span>合计</span>
                  </div>
                  <div class="w-400 inline-block">
                    <p>
                      （大写）：人民币<span class="ml-3 font-semibold">{{ toChies(27750) }}</span>
                    </p>
                  </div>
                  <div class="w-400 inline-block">
                    <p>（小写）：¥<span class="font-semibold">27750</span>元</p>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="合同条款">
            <div class="text-sm">
              <p>二、质量要求、技术要求、乙方对质量负责的条件和限期</p>
              <p>1．质量以采购标的物要求品名，主要技术参数按国家标准进行制造和验收；</p>
              <p>2．乙方在认可约定质量要求和技术标准条件下对标的产品的质量负责，因产品质量问题而发生损坏时（不包括易损件），我方将为用户更换损坏件。质保期为收货后12个月。</p>
              <p>三、交（提）货时间、地点、方式及退货期限、数量</p>
              <p>1．交（提）货时间：合同生效后5天发货。</p>
              <p>2. 交（提）货地点: 唐山市南堡开发区西外环东侧，荣福道南侧</p>
              <p>3．交（提）货方式：汽车配送。</p>
              <p>4．收货人： 田经理 电话：18713859771</p>
              <p>四、运输方式和费用负担</p>
              <p>1．运输方式：货运。</p>
              <p>2．费用负担：乙方负责支付。</p>
              <p>五、验收标准、方式及提出异议的期限</p>
              <p>1．验收标准以本合同“一”、“二”条款规定执行；验收方式为甲方当场验收；</p>
              <p>2．提出异议的期限：甲方收货后7天内以书面形式提出。</p>
              <p>六、付款、结算方式及期限 合同生效，乙方安排生产备货，发货前甲方支付合同金额95% 留5%质保，质保期满支付</p>
              <p>七、违约责任</p>
              <p>1．甲方在规定期限内对货物未提出异议，视为甲方认为满足验收条件。</p>
              <p>2．乙方提供的货物未能达到本合同规定的验收标准，则乙方应予以维修、更换。</p>
              <p>3、如甲方逾期付款，则每日按照货款总额的0.5%计算违约金。</p>
              <p>八、解决合同纠纷的方式 执行本合同发生争议，由当事人双方协商，协商不成，可向合同签订地法院提起诉讼。</p>
              <p>九、双方协商的其他条款</p>
              <p>1、本合同执行过程中所涉及到的价位、费用等均属甲、乙方双方商业机密，甲、乙方人员不得以任何方式向任何第三方泄露。</p>
              <p>2、本合同未尽事宜由双方协商解决，协商不成均可向合同签订地法院起诉。</p>
              <p>3、本合同一式两份，甲乙双方各壹份。传真件、复印件、扫描件具有与本合同同等的法律效力。</p>
              <p>4、本合同条款均由甲乙双方共同协商制定，经甲乙双方签字或盖章后回传。</p>
            </div>
          </el-tab-pane>
          <el-tab-pane label="供需方信息">
            <div class="tech_editSalesContract_demander_information">
              <el-checkbox-group v-model="checkList">
                <div class="w-540 border inline-block mr-10 ml-2 rounded-md relative">
                  <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>供货方</span></div>
                  <el-form class="bf-window-padding" hide-required-asterisk>
                    <!-- ref="ruleFormRef" :model="data.ruleForm" :rules="rules" -->
                    <el-form-item prop="CompanyName">
                      <div class="mt-2 mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="单位名称" /></span>
                        <el-input v-model="data.Supplier.CompanyNameInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item prop="CompanyAddress">
                      <div class="mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="单位地址" /></span>
                        <el-input v-model="data.Supplier.CompanyAddressInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item prop="Representative">
                      <div class="mb-3">
                        <span class="inline-block w-24 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="法定代表" /></span>
                        <el-input v-model="data.Supplier.Representativeinput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Agent">
                      <div class="mb-3">
                        <span class="inline-block w-24 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="委托代理" /></span>
                        <el-input v-model="data.Supplier.Agentinput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Depositbank">
                      <div class="mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="开户银行" /></span>
                        <el-input v-model="data.Supplier.Depositbankinput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="BankAccount">
                      <div class="mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="银行账号" /></span>
                        <el-input v-model="data.Supplier.BankAccountInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Telephone">
                      <div class="mb-3">
                        <span class="inline-block w-24 pr-6 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="电话" /></span>
                        <el-input v-model="data.Supplier.TelephoneInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Fax">
                      <div class="mb-3">
                        <span class="inline-block w-24 pr-6 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="传真" /></span>
                        <el-input v-model="data.Supplier.FaxInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Paragraph">
                      <div>
                        <span class="inline-block w-24 pr-6 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="税号" /></span>
                        <el-input v-model="data.Supplier.ParagraphInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="w-540 border inline-block rounded-md relative">
                  <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>需求方</span></div>
                  <el-form class="bf-window-padding" hide-required-asterisk>
                    <!-- ref="ruleFormRef" :model="data.ruleForm" :rules="rules" -->
                    <el-form-item prop="CompanyName">
                      <div class="mt-2 mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="单位名称" /></span>
                        <el-input v-model="data.Supplier1.CompanyNameInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item prop="CompanyAddress">
                      <div class="mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="单位地址" /></span>
                        <el-input v-model="data.Supplier1.CompanyAddressInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item prop="Representative">
                      <div class="mb-3">
                        <span class="inline-block w-24 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="法定代表" /></span>
                        <el-input v-model="data.Supplier1.Representativeinput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Agent">
                      <div class="mb-3">
                        <span class="inline-block w-24 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="委托代理" /></span>
                        <el-input v-model="data.Supplier1.Agentinput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Depositbank">
                      <div class="mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="开户银行" /></span>
                        <el-input v-model="data.Supplier1.Depositbankinput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="BankAccount">
                      <div class="mb-3">
                        <span class="inline-block pl-2 pr-2 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="银行账号" /></span>
                        <el-input v-model="data.Supplier1.BankAccountInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Telephone">
                      <div class="mb-3">
                        <span class="inline-block w-24 pr-6 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="电话" /></span>
                        <el-input v-model="data.Supplier1.TelephoneInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Fax">
                      <div class="mb-3">
                        <span class="inline-block w-24 pr-6 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="传真" /></span>
                        <el-input v-model="data.Supplier1.FaxInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                    <el-form-item label="" prop="Paragraph">
                      <div>
                        <span class="inline-block w-24 pr-6 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300"><el-checkbox class="mr-2" label="税号" /></span>
                        <el-input v-model="data.Supplier1.ParagraphInput" placeholder="请输入" style="width: 400px"> </el-input>
                      </div>
                    </el-form-item>
                  </el-form>
                </div>
              </el-checkbox-group>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="text-sm text-blue-500 pt-5 leading-7">
        <div class="inline-block cursor-pointer">
          <i class="iconfont icon-mxjl mr-1"></i>
          <span>预览合同</span>
        </div>
        <div class="float-right pb-3">
          <el-button @click="resetForm(ruleFormRef)">取消</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
        </div>
      </div>
      <!--  （加价记录） 销售加价 -->
      <PriceIncreaseManagement title="加价管理" v-if="hechnicalMarkupOpenData.visible" :FormData="hechnicalMarkupOpenData.formData" @closeWindow="closeWindowHechnicalMarkup($event)" />
      <!-- 导入报价单 -->
      <ImportQuotation title="导入报价单" v-if="importQuotationOpenData.visible" :FormData="importQuotationOpenData.formData" @closeWindow="closeWindowImportQuotation($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { toChies } from '/@/utils/tools'
import PriceIncreaseManagement from '../../OrderAllocationManagement/_Components/PriceIncreaseManagement.vue'
import type { TabsPaneContext, FormInstance } from 'element-plus'
import { FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import ImportQuotation from './ImportQuotation.vue'

const store = useCommonStore() //记得加这一句

//获取字典数据
const getDictionaryData = (data: any) => {
  // 标牌证件
  store.getDict('sale_Order_Signage').then((res: any) => {
    data.SignageCertificateOptions = res
    console.log(res)
  })
  //   税费
  store.getDict('sale_Contract_InvoiceType').then((res: any) => {
    data.taxationOptions = res
  })
  //   紧急程度
  store.getDict('sale_Order_Urgency').then((res: any) => {
    data.UrgencyOptions = res
  })
  //合作状态
  store.getDict('sale_Order_Cooperation').then((res: any) => {
    data.CooperationOptions = res
  })
}

// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!')
        return false
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    SigningTime: [
      {
        required: true,
        message: '请选择签约时间',
        trigger: 'blur'
      }
    ],
    Demander: [
      {
        required: true,
        message: '请填写需求方',
        trigger: 'blur'
      }
    ],
    ContractAmount: [
      {
        required: true,
        message: '请填写合同金额',
        trigger: 'blur'
      }
    ],
    ActualAmount: [
      {
        required: true,
        message: '请填写实际金额',
        trigger: 'blur'
      }
    ],
    Supplier: [
      {
        required: true,
        message: '请填写供货方',
        trigger: 'blur'
      }
    ],
    ContractingPlace: [
      {
        required: true,
        message: '请选择签约地点',
        trigger: 'blur'
      }
    ],
    Minimum: [
      {
        required: true,
        message: '请填写最低售价',
        trigger: 'blur'
      }
    ],
    Royalties: [
      {
        required: true,
        message: '请填写提成费',
        trigger: 'blur'
      }
    ],
    Intermediary: [
      {
        required: true,
        message: '请填写居间费',
        trigger: 'blur'
      }
    ],
    Markup: [
      {
        required: true,
        message: '请填写加价费',
        trigger: 'blur'
      }
    ],
    Cooperation: [
      {
        required: true,
        message: '请选择合作状态',
        trigger: 'blur'
      }
    ],
    taxation: [
      {
        required: true,
        message: '请选择税费',
        trigger: 'blur'
      }
    ],
    Freight: [
      {
        required: true,
        message: '请选择运费',
        trigger: 'blur'
      }
    ],
    Signage: [
      {
        required: true,
        message: '请选择标牌证件',
        trigger: 'change'
      }
    ],
    Urgency: [
      {
        required: true,
        message: '请选择紧急程度',
        trigger: 'change'
      }
    ],
    Remarks: [
      {
        required: true,
        message: '请填写备注',
        trigger: 'change'
      }
    ]
  })
  // 表单重置
  const resetForm = (formEl: FormInstance | undefined) => {
    closeWindow()
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

export default defineComponent({
  components: {
    OpenWindow,
    InfoFilled,
    PriceIncreaseManagement,
    ImportQuotation
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      Supplier: {
        CompanyNameInput: '',
        CompanyAddressInput: '',
        Representativeinput: '',
        Agentinput: '',
        Depositbankinput: '',
        BankAccountInput: '',
        TelephoneInput: '',
        FaxInput: '',
        ParagraphInput: ''
      },
      Supplier1: {
        CompanyNameInput: '',
        CompanyAddressInput: '',
        Representativeinput: '',
        Agentinput: '',
        Depositbankinput: '',
        BankAccountInput: '',
        TelephoneInput: '',
        FaxInput: '',
        ParagraphInput: ''
      },
      input: '',
      value: '',
      tableData: [{ value: 1 }],
      contract: '固定合同',
      contractList: [
        { title: '固定合同', val: 1 },
        { title: '客户合同', val: 2 },
        { title: '订货单', val: 3 },
        { title: '特殊合同', val: 4 }
      ],
      DecimalOptions: [
        { DicValue: '取整', DicKey: 1 },
        { DicValue: '四舍五入', DicKey: 2 },
        { DicValue: '一位小数', DicKey: 3 },
        { DicValue: '两位小数', DicKey: 4 }
      ],
      ruleForm: {
        Demander: '',
        SigningTime: '',
        ContractAmount: '',
        ActualAmount: '',
        Supplier: '',
        ContractingPlace: '',
        Minimum: '',
        Royalties: '',
        Intermediary: '',
        Markup: '',
        Cooperation: '',
        taxation: '',
        Freight: '',
        Signage: '',
        Urgency: '',
        Remarks: '',
        salesman: '',
        period: '',
        remarks: ''
      },
      SupplierOptions: [
        {
          value: '上海阀门二厂有限公司',
          label: '上海阀门二厂有限公司'
        },
        {
          value: '上海阀门二厂有限公司',
          label: '北方阀门集团有限公司'
        }
      ],
      ContractingPlaceOptions: [
        {
          value: 'guide',
          label: 'Guide',
          children: [
            {
              value: 'disciplines',
              label: 'Disciplines',
              children: [
                {
                  value: 'consistency',
                  label: 'Consistency'
                },
                {
                  value: 'feedback',
                  label: 'Feedback'
                },
                {
                  value: 'efficiency',
                  label: 'Efficiency'
                },
                {
                  value: 'controllability',
                  label: 'Controllability'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'side nav',
                  label: 'Side Navigation'
                },
                {
                  value: 'top nav',
                  label: 'Top Navigation'
                }
              ]
            }
          ]
        },
        {
          value: 'component',
          label: 'Component',
          children: [
            {
              value: 'basic',
              label: 'Basic',
              children: [
                {
                  value: 'layout',
                  label: 'Layout'
                },
                {
                  value: 'color',
                  label: 'Color'
                },
                {
                  value: 'typography',
                  label: 'Typography'
                },
                {
                  value: 'icon',
                  label: 'Icon'
                },
                {
                  value: 'button',
                  label: 'Button'
                }
              ]
            },
            {
              value: 'form',
              label: 'Form',
              children: [
                {
                  value: 'radio',
                  label: 'Radio'
                },
                {
                  value: 'checkbox',
                  label: 'Checkbox'
                },
                {
                  value: 'input',
                  label: 'Input'
                },
                {
                  value: 'input-number',
                  label: 'InputNumber'
                },
                {
                  value: 'select',
                  label: 'Select'
                },
                {
                  value: 'cascader',
                  label: 'Cascader'
                },
                {
                  value: 'switch',
                  label: 'Switch'
                },
                {
                  value: 'slider',
                  label: 'Slider'
                },
                {
                  value: 'time-picker',
                  label: 'TimePicker'
                },
                {
                  value: 'date-picker',
                  label: 'DatePicker'
                },
                {
                  value: 'datetime-picker',
                  label: 'DateTimePicker'
                },
                {
                  value: 'upload',
                  label: 'Upload'
                },
                {
                  value: 'rate',
                  label: 'Rate'
                },
                {
                  value: 'form',
                  label: 'Form'
                }
              ]
            },
            {
              value: 'data',
              label: 'Data',
              children: [
                {
                  value: 'table',
                  label: 'Table'
                },
                {
                  value: 'tag',
                  label: 'Tag'
                },
                {
                  value: 'progress',
                  label: 'Progress'
                },
                {
                  value: 'tree',
                  label: 'Tree'
                },
                {
                  value: 'pagination',
                  label: 'Pagination'
                },
                {
                  value: 'badge',
                  label: 'Badge'
                }
              ]
            },
            {
              value: 'notice',
              label: 'Notice',
              children: [
                {
                  value: 'alert',
                  label: 'Alert'
                },
                {
                  value: 'loading',
                  label: 'Loading'
                },
                {
                  value: 'message',
                  label: 'Message'
                },
                {
                  value: 'message-box',
                  label: 'MessageBox'
                },
                {
                  value: 'notification',
                  label: 'Notification'
                }
              ]
            },
            {
              value: 'navigation',
              label: 'Navigation',
              children: [
                {
                  value: 'menu',
                  label: 'Menu'
                },
                {
                  value: 'tabs',
                  label: 'Tabs'
                },
                {
                  value: 'breadcrumb',
                  label: 'Breadcrumb'
                },
                {
                  value: 'dropdown',
                  label: 'Dropdown'
                },
                {
                  value: 'steps',
                  label: 'Steps'
                }
              ]
            },
            {
              value: 'others',
              label: 'Others',
              children: [
                {
                  value: 'dialog',
                  label: 'Dialog'
                },
                {
                  value: 'tooltip',
                  label: 'Tooltip'
                },
                {
                  value: 'popover',
                  label: 'Popover'
                },
                {
                  value: 'card',
                  label: 'Card'
                },
                {
                  value: 'carousel',
                  label: 'Carousel'
                },
                {
                  value: 'collapse',
                  label: 'Collapse'
                }
              ]
            }
          ]
        },
        {
          value: 'resource',
          label: 'Resource',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'docs',
              label: 'Design Documentation'
            }
          ]
        }
      ],
      SignageCertificateOptions: [],
      UrgencyOptions: [],
      remarksInput: '',
      discountInput: ''
    })
    const checkList = ref([])
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1200',
      boxHeight: ''
    })
    // 加价记录
    const hechnicalMarkupOpen = (data: any) => {
      let hechnicalMarkupOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowHechnicalMarkup = (val: any) => {
        hechnicalMarkupOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        hechnicalMarkupOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowHechnicalMarkup = (type: string) => {
        hechnicalMarkupOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        hechnicalMarkupOpenData,
        openWindowHechnicalMarkup,
        closeWindowHechnicalMarkup
      }
    }
    // 导入报价单
    const importQuotationOpen = (data: any) => {
      let importQuotationOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowImportQuotation = (val: any) => {
        importQuotationOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        importQuotationOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowImportQuotation = (type: string) => {
        importQuotationOpenData.visible = false
        // if(type=='close')
        // data.getData(data.data)
      }

      return {
        importQuotationOpenData,
        openWindowImportQuotation,
        closeWindowImportQuotation
      }
    }

    // 选择合同
    const handleCommand = (command: string | number | object) => {
      console.log(`click on item ${command}`)
      data.contract = ` ${command}`
    }
    onMounted(() => {
      //获取字典数据
      getDictionaryData(data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      toChies,
      ...hechnicalMarkupOpen({ data }),
      ...importQuotationOpen({ data }),
      ...formEvent(data, closeWindow),
      handleCommand,
      checkList
    }
  }
})
</script>
<style lang="postcss">
.edit-sales-contract-open-window {
  .bf-window-cp {
    overflow: initial;
    .bf-windows-content {
      position: relative;
      overflow: initial;
      .sales-contract-right {
        position: absolute;
        top: 40px;
        right: -160px;
        background: linear-gradient(rgb(76, 137, 238) 0%, rgb(22, 191, 220) 100%);
        width: 144px;
        height: 400px;
        z-index: 2;
      }
    }
  }
}
</style>
<style lang="postcss" scoped>
.EditSalesContract_header {
  background-color: var(--7ba5bd90-themeStyle_sidebarBg) !important;
  color: #ffffff;
  :deep(.el-dropdown) {
    padding-top: 2px !important;
  }
}
.EditSalesContract_bottom {
  :deep(.el-form--inline .el-form-item) {
    margin-right: 0 !important;
  }
  :deep(.el-form-item) {
    margin-bottom: 0 !important;
  }

  .EditSalesContract_bottom_information,
  .tech_editSalesContract_demander_information {
    :deep(.el-input__wrapper) {
      border-top-left-radius: 0 !important;
      border-bottom-left-radius: 0 !important;
    }
    :deep(.el-checkbox:last-of-type) {
      margin-right: 3px;
      vertical-align: bottom;
    }
    :deep(.el-checkbox-group) {
      font-size: 16px;
      line-height: 24px;
    }
    .EditSalesContract_bottom_information_period {
      :deep(.el-input__wrapper) {
        border-top-right-radius: 0 !important;
        border-bottom-right-radius: 0 !important;
      }
    }
  }
  .tech_editSalesContract_Contract {
    .tech_editSalesContract_Contract_appendices {
      :deep(.el-input__wrapper) {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
    }
  }
}

:deep(.el-collapse-item__header) {
  background: #fbfbfbbf;
}
:deep(#tab-6) {
  position: absolute;
  right: -570px;
}
</style>
