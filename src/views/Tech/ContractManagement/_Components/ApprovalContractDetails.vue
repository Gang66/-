<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-4 relative">
      <div class="w-1160 border clearfix relative">
        <div class="h-12 border-b-4 clearfix p-3">
          <div class="float-left">
            <i class="iconfont icon-shujuku mr-2"></i>
            <span>基础信息</span>
            <span class="ml-8">润扬事业部</span>
            <span class="text-red-500 ml-8">紧急</span>
            <span class="text-blue-500">一般</span>
            <span class="text-green-500 ml-8">已完成</span>
            <span class="text-red-500">已超时</span>
            <span class="text-green-500 ml-2">(2021-11-06 15:02)</span>
          </div>
          <div class="float-right mr-5"><span>固定合同（SE2111060001）</span> <i class="iconfont icon-bianji1 text-blue-600 align-middle cursor-pointer" @click="FixedContract"></i></div>
        </div>

        <div class="flex">
          <div class="w-1/3">
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">需求方</span>
              <div class="w-72 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                黑龙江信维源化工有限公司
                <div class="float-right w-5 h-5 border border-yellow-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-yellow-500">
                  <span>良</span>
                </div>
                <div class="float-right w-5 h-5 border border-green-500 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-green-500">
                  <span>优</span>
                </div>
                <div class="float-right w-5 h-5 border border-gray-400 rounded-t-none rounded-br-full rounded-bl-full inline-block text-center text-sm text-gray-400">
                  <span>差</span>
                </div>
              </div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">供货方</span>
              <div class="w-72 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">上海阀门二厂有限公司</div>
            </div>
            <div>
              <div class="ml-3 inline-block">
                <span class="float-left mt-3 text-sm">居间费</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm">
                  <span>-</span>
                </div>
              </div>
              <div class="inline-block ml-6">
                <span class="float-left mt-3 text-sm">加价费</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm">
                  <span>12</span>
                </div>
              </div>
            </div>
            <div>
              <div class="ml-3 inline-block">
                <span class="float-left mt-3 text-sm">供货期</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm" v-if="data.BasicInformationShow == 1">
                  <span>5</span>
                  <span class="float-right">天</span>
                </div>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm" v-else>
                  <el-input v-model="data.periodInput" style="width: 80px; border: 0" placeholder="请填写" />
                  <span class="float-right">天</span>
                </div>
              </div>
              <div class="inline-block ml-6">
                <span class="float-left mt-3 text-sm">业务员</span>
                <div class="w-24 h-10 inline-block border-b ml-4 pt-3 text-sm">
                  <span>王迪</span>
                </div>
              </div>
            </div>
          </div>
          <div class="">
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">签约时间</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">2021-11-06</div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">签约地点</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">上海闵行区</div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">发票税费</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">1957</div>
            </div>
            <div class="ml-3">
              <span class="float-left mt-3 text-sm">标牌证件</span>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3" v-if="data.BasicInformationShow == 1">中字版</div>
              <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3" v-else>
                <el-select v-model="data.certificate" placeholder="选择选项" style="width: 160px">
                  <el-option v-for="item in data.SignageCertificateOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                </el-select>
              </div>
            </div>
          </div>
          <div class="">
            <div>
              <div class="inline-block">
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">合同金额</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">11744</div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">最低售价</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">21430</div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">合作状态</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3" v-if="data.BasicInformationShow == 1">合作客户-执行完毕</div>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3" v-else>
                    <el-select v-model="data.status" placeholder="选择选项" style="width: 160px">
                      <el-option v-for="item in data.statusOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="inline-block">
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">实际金额</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                    <span class="text-sm">11744</span>
                    <span class="float-right text-sm text-red-500">-15.2%</span>
                  </div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">提成费用</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                    <span class="text-sm">117.4</span>
                    <span class="float-right text-sm text-red-500">2%</span>
                  </div>
                </div>
                <div class="ml-3">
                  <span class="float-left mt-3 text-sm">物流费用</span>
                  <div class="w-40 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                    <span class="text-sm">489.4</span>
                    <span class="float-right text-sm">8%</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">备注说明</span>
                <div class="w-96 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3" v-if="data.BasicInformationShow == 1">月底之前到货</div>
                <div class="w-96 h-10 inline-block border-b ml-4 text-gray-500 text-sm pt-3" v-else><el-input v-model="data.remarksInput" style="width: 384px; border: 0" placeholder="请输入备注说明" /></div>
              </div>
            </div>
          </div>
        </div>
        <div class="float-right pr-4 clearfix pt-3 text-sm">
          <p class="text-red-500 pb-2">【审核】<span class="text-black">请检查基础信息是否准确无误</span></p>
          <div class="float-right pb-3">
            <el-button type="primary" @click="confirmedClick"><i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
          </div>
        </div>
        <img class="absolute bottom-24 right-10 w-20" v-if="data.confirmedImg == 1" src="../../../../assets/img/tech/ContractApproval/ok.png" alt="" />
      </div>
      <div class="mt-6">
        <el-tabs type="border-card">
          <!-- #region  联系人-->
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>联系人</span>
                <i class="iconfont icon-bianji1 align-middle ml-1" @click="contacts"></i>
              </span>
            </template>
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="姓名" align="center">
                  <template #default="scope">
                    <span v-if="data.contactsShow == 1">唐经理</span>
                    <el-input v-model="data.contacts.contactsInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="电话" align="center">
                  <template #default="scope">
                    <span v-if="data.contactsShow == 1">-</span>
                    <el-input v-model="data.contacts.mobileInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="手机" align="center">
                  <template #default="scope">
                    <span v-if="data.contactsShow == 1">1555555555</span>
                    <el-input v-model="data.contacts.phoneInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="职务" align="center">
                  <template #default="scope">
                    <span v-if="data.contactsShow == 1">采购经理</span>
                    <el-input v-model="data.contacts.postInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="类别" align="center">
                  <template #default="scope">
                    <span v-if="data.contactsShow == 1">决策人</span>
                    <el-select v-model="data.status" placeholder="选择选项" style="width: 160px" v-else>
                      <el-option v-for="item in data.statusOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="用途" align="center">
                  <template #default="scope">
                    <span v-if="data.contactsShow == 1">收货</span>
                    <el-select v-model="data.status" placeholder="选择选项" style="width: 160px" v-else>
                      <el-option v-for="item in data.statusOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <img class="absolute bottom-24 right-10 w-20 z-10" v-if="data.contactsImg == 1" src="../../../../assets/img/tech/ContractApproval/ok.png" alt="" />
            <div class="float-right clearfix pt-3 text-sm">
              <p class="text-red-500 pb-2">【审核】<span class="text-black">请检查联系人信息是否准确无误</span></p>
              <div class="float-right pb-3">
                <el-button type="primary" @click="contactsClick"><i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
              </div>
            </div>
          </el-tab-pane>
          <!-- #endregion -->

          <!-- #region  付款/开票计划-->
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>付款/开票计划</span>
                <i class="iconfont icon-bianji1 align-middle ml-1" @click="payment"></i>
              </span>
            </template>
            <div class="bf-table-content float-left w-540 mr-10 relative">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="付款日期" align="center">
                  <template #default="scope">
                    <span v-if="data.PaymentInvoicingShow == 1">2021-09-15</span>
                    <el-date-picker v-model="data.PaymentInvoicing.PaymentDateValue" style="width: 100px" type="date" size="default" placeholder="选择日期" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款阶段" align="center">
                  <template #default="scope">
                    <span v-if="data.PaymentInvoicingShow == 1">发货款</span>
                    <el-select v-model="data.status" placeholder="选择选项" style="width: 100px" v-else>
                      <el-option v-for="item in data.statusOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款占比%" align="center">
                  <template #default="scope">
                    <span v-if="data.PaymentInvoicingShow == 1">100</span>
                    <el-input v-model="data.PaymentInvoicing.proportionInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="付款金额" align="center">
                  <template #default="scope">
                    <span v-if="data.PaymentInvoicingShow == 1">10800.00</span>
                    <el-input v-model="data.PaymentInvoicing.PaymentAmountInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
              </el-table>

              <img class="absolute top-2 right-4 w-20 z-10" src="../../../../assets/img/tech/ContractApproval/ok.png" alt="" v-if="data.paymentImg == 1" />
              <div class="float-right clearfix pt-3 text-sm">
                <p class="text-red-500 pb-2">【审核】<span class="text-black">请检查付款计划是否准确无误</span></p>
                <div class="float-right pb-3">
                  <el-button type="primary" @click="paymentClick"><i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
                </div>
              </div>
            </div>
            <div class="bf-table-content float-left w-540 relative">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="ProductName" label="开票日期" align="center">
                  <template #default="scope">
                    <span v-if="data.InvoicingShow == 1">2021-09-30</span>
                    <el-date-picker v-model="data.PaymentInvoicing.InvoicingDateValue" style="width: 100px" type="date" size="default" placeholder="选择日期" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="开票阶段" align="center">
                  <template #default="scope">
                    <span v-if="data.InvoicingShow == 1">发货后</span>
                    <el-select v-model="data.status" placeholder="选择选项" style="width: 100px" v-else>
                      <el-option v-for="item in data.statusOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="开票金额" align="center">
                  <template #default="scope">
                    <span v-if="data.InvoicingShow == 1">10800.00</span>
                    <el-input v-model="data.PaymentInvoicing.InvoicedAmountInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="备注" align="center">
                  <template #default="scope">
                    <span v-if="data.InvoicingShow == 1">-</span>
                    <el-input v-model="data.PaymentInvoicing.remarksInput" placeholder="输入内容" v-else />
                  </template>
                </el-table-column>
              </el-table>

              <img class="absolute top-2 w-20 z-10 right-4" src="../../../../assets/img/tech/ContractApproval/ok.png" alt="" v-if="data.InvoicingImg == 1" />
              <div class="float-right clearfix pt-3 text-sm">
                <p class="text-red-500 pb-2">【审核】<span class="text-black">请检查开票计划是否准确无误</span></p>
                <div class="float-right pb-3">
                  <el-button type="primary" @click="InvoicingClick"><i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- #endregion -->

          <!-- #region  收货人-->
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>收货人</span>
                <i class="iconfont icon-bianji1 align-middle ml-1" @click="consignee"></i>
              </span>
            </template>
            <div class="tech_ContractManagement_ApprovalContractDetails_Consignee">
              <div class="bf-table-content">
                <!-- 暂时去掉 -->
                <!-- <div class="float-right mb-3">
                  <el-button type="primary"> <i class="iconfont icon-chuangjian mr-2"></i> 新增</el-button>
                  <el-button type="danger"> <i class="iconfont icon-shanchu"></i> 删除</el-button>
                </div> -->
                <el-table :data="data.tableData" stripe>
                  <el-table-column prop="ProductName" label="收货人" align="center">
                    <template #default="scope">
                      <span v-if="data.consigneeShow == 1">唐经理</span>
                      <el-input v-model="data.Consignee.consigneeInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="联系方式" align="center">
                    <template #default="scope">
                      <span v-if="data.consigneeShow == 1">15555555555</span>
                      <el-input v-model="data.Consignee.addressInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="收货地址" align="center" min-width="300">
                    <template #default="scope">
                      <span v-if="data.consigneeShow == 1">山东威海荣成市河阳东路198号凯丽特种纸</span>
                      <el-input v-model="data.Consignee.addressInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="所属批次" align="center">
                    <template #default="scope">
                      <span v-if="data.consigneeShow == 1">-</span>
                      <el-input v-model="data.Consignee.batchInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <img class="absolute top-8 w-20 z-10 right-4" src="../../../../assets/img/tech/ContractApproval/ok.png" alt="" v-if="data.consigneeImg == 1" />
            <div class="float-right clearfix pt-3 text-sm">
              <p class="text-red-500 pb-2">【审核】<span class="text-black">请检查开票计划是否准确无误</span></p>
              <div class="float-right pb-3">
                <el-button type="primary" @click="ConfirmedClick"><i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
              </div>
            </div>
          </el-tab-pane>
          <!-- #endregion -->

          <!-- #region  合同清单-->
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>合同清单</span>
                <i class="iconfont icon-bianji1 align-middle ml-1" @click="ContractList"></i>
              </span>
            </template>
            <div class="pt-1 pb-1 clearfix">
              <div class="flex">
                <div class="flex-auto"></div>
                <div>
                  <el-button type="primary"> <i class="iconfont icon-dingdan4 mr-2"></i> 预览报价单</el-button>
                  <el-button type="danger" @click="openWindowApprovalStatus()"><i class="iconfont icon-jjjl mr-2"></i>技术记录</el-button>
                  <el-button type="warning" @click="openWindowAccountingRecords()"><i class="iconfont icon-suanshu mr-2"></i>核算记录</el-button>
                  <el-button type="success" @click="openWindowHechnicalMarkup()"> <i class="iconfont icon-jiage mr-2"></i> 加价记录</el-button>
                </div>
              </div>
              <div class="text-sm">
                <span>表单1</span>
                <div class="inline-block w-1070 h-1 ml-3 bg-slate-100"></div>
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
              <div class="text-sm pt-4 pb-3">
                <span>表单2</span>
                <div class="inline-block w-1070 h-1 ml-3 bg-slate-100"></div>
              </div>
              <div class="text-sm leading-6">
                <p>合同附件</p>
                <p>甲方：唐山东江化工有限公司</p>
                <p>乙方：北方高中压阀门有限公司</p>
              </div>
              <div class="bf-table-content relative">
                <el-table :data="data.tableData" stripe>
                  <el-table-column type="index" label="序号" width="54" align="center" />
                  <el-table-column prop="ProductName" label="产品名称" align="center">
                    <template #default="scope">
                      <span v-if="data.ContractListShow == 1">衬氟手动球阀</span>
                      <el-input v-model="data.ContractList.ProductInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="型号" align="center">
                    <template #default="scope">
                      <span v-if="data.ContractListShow == 1">J41H-16C</span>
                      <el-input v-model="data.ContractList.ModelInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="规格" align="center">
                    <template #default="scope">
                      <span v-if="data.ContractListShow == 1">DN150</span>
                      <el-input v-model="data.ContractList.SpecificationsInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单位" align="center">
                    <template #default="scope">
                      <span>个</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="数量" align="center">
                    <template #default="scope">
                      <span v-if="data.ContractListShow == 1">200</span>
                      <el-input v-model="data.ContractList.QuantityInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="单价" align="center">
                    <template #default="scope">
                      <span v-if="data.ContractListShow == 1">3654</span>
                      <el-input v-model="data.Consignee.batchInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="最低价" align="center">
                    <template #default="scope">
                      <span v-if="data.ContractListShow == 1">2753</span>
                      <el-input v-model="data.ContractList.PriceInput" placeholder="输入内容" v-else />
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="金额" align="center">
                    <template #default="scope">
                      <span>10800</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="ProductName" label="备注" align="center">
                    <template #default="scope">
                      <span v-if="data.ContractListShow == 1">12222222222</span>
                      <el-input v-model="data.ContractList.RemarksInput" placeholder="输入内容" v-else />
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
                <img class="absolute top-8 w-20 z-10 right-4" src="../../../../assets/img/tech/ContractApproval/ok.png" alt="" v-if="data.ContractListImg == 1" />
                <div class="float-right clearfix pt-3 text-sm">
                  <p class="text-red-500 pb-2">【审核】<span class="text-black">请检查合同清单是否准确无误</span></p>
                  <div class="float-right pb-3">
                    <el-button type="primary" @click="ContractListClick"><i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- #endregion -->

          <!-- #region  合同条款-->
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>合同条款</span>
                <i class="iconfont icon-bianji1 align-middle ml-1" @click="Conditions"></i>
              </span>
            </template>
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
          <!-- #endregion -->

          <!-- #region  供需方信息-->
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>供需方信息</span>
                <i class="iconfont icon-bianji1 align-middle ml-1" @click="SupplierInformation"></i>
              </span>
            </template>
            <div class="w-540 border inline-block mr-10 ml-2 p-4 pl-8 rounded-md relative">
              <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>供货方</span></div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位名称</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">北方高中压阀门有限公司</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.compyNameInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位地址</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">山东省济南市天桥区小清河北路8888号滨海商务中心D座602室</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.addressInput" placeholder="输入内容" />
                </div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">法定代表人</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">贺利娟</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.LegalInput" placeholder="输入内容" />
                </div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">委托代理人</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.agentInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">开户银行</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">中国工商银行济南明湖支行</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.depositInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">银行账号</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">1602003209200096163</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.accountInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">电话</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">0531-88703355</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.telephoneInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">传真</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">0531-88703355</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.faxInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">税号</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">91370105MA3MJ33K79</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Supplier.paragraphInput" placeholder="输入内容" />
                </div>
              </div>
            </div>
            <div class="w-540 border inline-block rounded-md relative p-4 pl-8">
              <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>需求方</span></div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位名称</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">北方高中压阀门有限公司</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.compyNameInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">单位地址</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">山东省济南市天桥区小清河北路8888号滨海商务中心D座602室</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.addressInput" placeholder="输入内容" />
                </div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">法定代表人</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">贺利娟</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.LegalInput" placeholder="输入内容" />
                </div>
              </div>
              <div>
                <span class="float-left mt-3 text-sm">委托代理人</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">-</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.agentInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">开户银行</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">中国工商银行济南明湖支行</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.depositInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-3">
                <span class="float-left mt-3 text-sm">银行账号</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">1602003209200096163</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.accountInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">电话</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">0531-88703355</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.telephoneInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">传真</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">0531-88703355</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.faxInput" placeholder="输入内容" />
                </div>
              </div>
              <div class="ml-10">
                <span class="float-left mt-3 text-sm">税号</span>
                <div v-if="data.SupplierDemanderShow == 1" class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">91370105MA3MJ33K79</div>
                <div v-else class="w-96 inline-block border-b ml-4 text-gray-500 text-sm pt-3">
                  <el-input v-model="data.SupplierDemander.Demander.paragraphInput" placeholder="输入内容" />
                </div>
              </div>
            </div>
            <img class="absolute bottom-24 w-20 z-10 right-4" src="../../../../assets/img/tech/ContractApproval/ok.png" alt="" v-if="data.SupplierDemanderImg == 1" />
            <div class="float-right clearfix pt-3 text-sm">
              <p class="text-red-500 pb-2">【审核】<span class="text-black">请检查供需方信息是否准确无误</span></p>
              <div class="float-right pb-3">
                <el-button type="primary" @click="SupplierDemanderClick"><i class="iconfont icon-wancheng mr-2"></i> 确认无误</el-button>
              </div>
            </div>
          </el-tab-pane>
          <!-- #endregion -->

          <!-- #region 审批记录 -->
          <el-tab-pane>
            <template #label>
              <span class="custom-tabs-label">
                <span>审批记录</span>
              </span>
            </template>
            <div>
              <div class="clearfix">
                <el-form ref="ruleFormRef" :model="data.ruleForm" status-icon :rules="rules" :hide-required-asterisk="true" label-width="120px" class="demo-ruleForm" :inline="true">
                  <div class="clearfix">
                    <div class="w-1/2 inline-block">
                      <div>
                        <div class="w-2 h-5 bg-blue-400 inline-block align-text-bottom mr-2"></div>
                        <span>审批待确认</span>
                      </div>
                      <div class="text-sm text-left pb-2 pt-2">
                        <div class="w-1/3 inline-block pt-2 pb-1" v-for="(item, index) in data.ApprovalList" :key="index">
                          <span>{{ item.val }}</span>
                          <span class="text-red-500 ml-3">待确认</span>
                          <!-- <span class="text-green-500 ml-3">已确认</span> -->
                        </div>
                      </div>
                    </div>
                    <div class="w-1/2 float-right tech_approvalContractDetails_evaluation">
                      <div class="mb-2">
                        <div class="w-2 h-5 bg-blue-400 inline-block align-text-bottom mr-2"></div>
                        <span>审批评定</span>
                      </div>
                      <el-form-item label="违约责任约定" prop="RtypeState">
                        <el-radio-group v-model="data.ruleForm.RtypeState" placeholder="请选择">
                          <el-radio v-for="item in data.rtypeOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="诉讼地约定" prop="Agreement">
                        <el-radio-group v-model="data.ruleForm.Agreement" placeholder="请选择">
                          <el-radio v-for="item in data.agreementOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item label="质量风险等级" prop="Quality">
                        <el-radio-group v-model="data.ruleForm.Quality" placeholder="请选择">
                          <el-radio v-for="item in data.qualityOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                    </div>
                    <div>
                      <div>
                        <div class="w-2 h-5 bg-blue-400 inline-block align-text-bottom mr-2"></div>
                        <span>审批操作</span>
                      </div>
                      <el-form-item label="审批结果" prop="Results">
                        <el-radio-group v-model="data.ruleForm.Results" placeholder="请选择">
                          <el-radio v-for="item in data.resultsOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <div>
                        <el-form-item label="审批理由" prop="Approval">
                          <el-input v-model="data.ruleForm.Approval" style="width: 1000px" type="textarea" placeholder="请输入内容" />
                        </el-form-item>
                      </div>
                    </div>
                  </div>
                </el-form>
                <div class="float-right mr-6">
                  <el-button type="primary" @click="submitForm(ruleFormRef)"> <i class="iconfont icon-wancheng mr-2"></i> 提交审批</el-button>
                </div>
              </div>
            </div>
            <div>
              <div class="w-2 h-5 bg-blue-400 inline-block align-text-bottom mr-2"></div>
              <span>审批记录</span>
            </div>
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column type="index" label="序号" width="54" align="center" />
                <el-table-column prop="ProductName" label="审批时间" align="center">
                  <template #default="scope">
                    <span>2021-09-08 10:46</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="审批人" align="center">
                  <template #default="scope">
                    <span>刘某某</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="岗位" align="center">
                  <template #default="scope">
                    <span>销售经理</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="审批结果" align="center">
                  <template #default="scope">
                    <!-- <span class="text-red-500">驳回</span> -->
                    <span class="text-green-500">通过</span>
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="审批意见" align="center">
                  <template #default="scope">
                    <span class="text-gray-400">无</span>
                    <!-- <span>低于最低销售价</span> -->
                  </template>
                </el-table-column>
                <el-table-column prop="ProductName" label="操作" align="center">
                  <template #default="scope">
                    <span class="text-blue-500 cursor-pointer">撤销</span>
                    <!-- <span>-</span> -->
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </el-tab-pane>
          <!-- #endregion -->
        </el-tabs>
      </div>
      <div class="text-sm text-blue-500 pt-5">
        <div class="inline-block cursor-pointer">
          <i class="iconfont icon-mxjl mr-1"></i>
          <span>预览合同</span>
        </div>
        <div class="inline-block ml-10 cursor-pointer">
          <i class="iconfont icon-shujuku mr-1"></i>
          <span>审批记录</span>
        </div>
      </div>
      <!--  （加价记录） 销售加价 -->
      <PriceIncreaseManagement title="加价管理" v-if="hechnicalMarkupOpenData.visible" :FormData="hechnicalMarkupOpenData.formData" @closeWindow="closeWindowHechnicalMarkup($event)" />
      <!-- 技术记录 -->
      <ApprovalStatus title="技术记录" v-if="approvalStatusOpenData.visible" :FormData="approvalStatusOpenData.formData" @closeWindow="closeWindowApprovalStatus($event)" />
      <!-- 核算记录 -->
      <AccountingRecords title="核算记录" v-if="accountingRecordsOpenData.visible" :FormData="accountingRecordsOpenData.formData" @closeWindow="closeWindowAccountingRecords($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import { toChies } from '/@/utils/tools'
import { ElMessage, ElMessageBox, FormRules, FormInstance } from 'element-plus'
import PriceIncreaseManagement from '../../OrderAllocationManagement/_Components/PriceIncreaseManagement.vue'
import { useCommonStore } from '/@/store/modules/Common'
import ApprovalStatus from '../../TechnicalAnalysis/_Components/ApprovalStatus.vue'
import AccountingRecords from '../../AccountingProcessing/_Components/ApprovalStatus.vue'
import { approvalStatusOpen, accountingRecordsOpen } from '/@/assets/ts/techOpenWindow'

const store = useCommonStore() //记得加这一句

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
        ElMessage({
          type: 'error',
          message: '您有未选择项'
        })
        return false
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    RtypeState: [{ required: true, message: '', trigger: 'blur' }],
    Approval: [{ required: true, message: '请填写审批理由', trigger: 'blur' }],
    Results: [{ required: true, message: '', trigger: 'blur' }],
    Quality: [{ required: true, message: '', trigger: 'blur' }],
    Agreement: [{ required: true, message: '', trigger: 'blur' }]
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

//获取字典数据
const getDictionaryData = (data: any) => {
  // 标牌证件
  store.getDict('sale_Order_Signage').then((res: any) => {
    data.SignageCertificateOptions = res
    console.log(res)
  })
  //   合作状态
  store.getDict('sale_Order_Cooperation').then((res: any) => {
    data.statusOptions = res
    console.log(res)
  })
}

export default defineComponent({
  components: {
    OpenWindow,
    InfoFilled,
    PriceIncreaseManagement,
    ApprovalStatus,
    AccountingRecords
  },
  emits: ['closeWindow'],
  setup(props, context: SetupContext) {
    const data = reactive({
      ApprovalList: [{ val: '基础信息' }, { val: '联系人信息' }, { val: '付款计划' }, { val: '开票计划' }, { val: '收货人信息' }, { val: '合同清单' }, { val: '合同条款' }, { val: '供需方信息' }],
      rtypeOptions: [
        { value: 'A', label: '有利' },
        { value: 'B', label: '不利' }
      ],
      agreementOptions: [
        { value: 'A', label: '有利' },
        { value: 'B', label: '不利' }
      ],
      qualityOptions: [
        { value: 'A', label: '高' },
        { value: 'B', label: '中' },
        { value: 'C', label: '低' }
      ],
      resultsOptions: [
        { value: 'A', label: '通过' },
        { value: 'B', label: '驳回' }
      ],

      ruleForm: {
        Quality: '',
        Agreement: '',
        RtypeState: '',
        Results: '',
        Approval: ''
      },
      //判断基础信息是否可以编辑
      BasicInformationShow: 1, //1不能编辑2能编辑
      //判断联系人是否可以编辑
      contactsShow: 1, //1不能编辑2能编辑
      //判断付款/开票是否可以编辑
      PaymentInvoicingShow: 1, //1不能编辑2能编辑
      InvoicingShow: 1,
      //   判断收货人  是否可以编辑
      consigneeShow: 1,
      //   合同清单  是否可以编辑
      ContractListShow: 1,
      //   供需方  是否可以编辑
      SupplierDemanderShow: 1,
      //   基础信息  是否显示已确认img
      confirmedImg: 0, //1 不显示  2显示
      //   联系人    是否显示已确认img
      contactsImg: 0,
      //    付款    是否显示已确认img
      paymentImg: 0,
      //   开票    是否显示已确认img
      InvoicingImg: 0,
      //   收货人 是否显示img
      consigneeImg: 0,
      //   合同清单  是否显示 img
      ContractListImg: 0,
      //   供需方  是否显示img
      SupplierDemanderImg: 0,
      periodInput: '',
      certificate: '',
      status: '',
      remarksInput: '',
      tableData: [{ value: 1 }],
      SignageCertificateOptions: [],
      statusOptions: [],
      contacts: {
        contactsInput: '',
        mobileInput: '',
        phoneInput: '',
        postInput: ''
      },
      PaymentInvoicing: {
        PaymentDateValue: '',
        proportionInput: '',
        PaymentAmountInput: '',
        InvoicingDateValue: '',
        InvoicedAmountInput: '',
        remarksInput: ''
      },
      Consignee: {
        consigneeInput: '',
        addressInput: '',
        batchInput: ''
      },
      ContractList: {
        ProductInput: '',
        ModelInput: '',
        SpecificationsInput: '',
        QuantityInput: '',
        PriceInput: '',
        RemarksInput: ''
      },
      SupplierDemander: {
        Supplier: {
          compyNameInput: '',
          addressInput: '',
          LegalInput: '',
          agentInput: '',
          depositInput: '',
          accountInput: '',
          telephoneInput: '',
          faxInput: '',
          paragraphInput: ''
        },
        Demander: {
          compyNameInput: '',
          addressInput: '',
          LegalInput: '',
          agentInput: '',
          depositInput: '',
          accountInput: '',
          telephoneInput: '',
          faxInput: '',
          paragraphInput: ''
        }
      }
    })
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
    //
    // 修改固定合同
    const FixedContract = () => {
      ElMessageBox.confirm('确定修改基础信息？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
          data.BasicInformationShow = 2
          data.confirmedImg = 2
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    // 修改联系人
    const contacts = () => {
      ElMessageBox.confirm('确定修改联系人？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
          data.contactsShow = 2
          data.contactsImg = 2
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    //修改付款/开票计划
    const payment = () => {
      ElMessageBox.confirm('确定修改付款/开票计划？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
          data.PaymentInvoicingShow = 2
          data.InvoicingShow = 2
          data.paymentImg = 2
          data.InvoicingImg = 2
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    //修改收货人
    const consignee = () => {
      ElMessageBox.confirm('确定修改收货人？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
          data.consigneeShow = 2
          data.consigneeImg = 2
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    //修改合同清单
    const ContractList = () => {
      ElMessageBox.confirm('确定修改合同清单？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
          data.ContractListShow = 2
          data.ContractListImg = 2
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    //修改合同条款
    const Conditions = () => {
      ElMessageBox.confirm('确定修改合同条款？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    // 修改供需方信息
    const SupplierInformation = () => {
      ElMessageBox.confirm('确定修改合同条款？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: 'Delete completed'
          })
          data.SupplierDemanderShow = 2
          data.SupplierDemanderImg = 2
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: 'Delete canceled'
          })
        })
    }
    // 基础信息 确认无误
    const confirmedClick = () => {
      data.BasicInformationShow = 1
      data.confirmedImg = 1
    }
    // 联系人 确认无误
    const contactsClick = () => {
      data.contactsShow = 1
      data.contactsImg = 1
    }
    // 付款 确认无误
    const paymentClick = () => {
      data.PaymentInvoicingShow = 1
      data.paymentImg = 1
    }
    // 开票 确认无误
    const InvoicingClick = () => {
      data.InvoicingShow = 1
      data.InvoicingImg = 1
    }
    // 收货人 确认无误
    const ConfirmedClick = () => {
      data.consigneeShow = 1
      data.consigneeImg = 1
    }
    //合同清单
    const ContractListClick = () => {
      data.ContractListShow = 1
      data.ContractListImg = 1
    }
    // 供需方
    const SupplierDemanderClick = () => {
      data.SupplierDemanderShow = 1
      data.SupplierDemanderImg = 1
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
      FixedContract,
      contacts,
      payment,
      consignee,
      ContractList,
      Conditions,
      SupplierInformation,
      confirmedClick,
      contactsClick,
      paymentClick,
      InvoicingClick,
      ConfirmedClick,
      ContractListClick,
      SupplierDemanderClick,
      ...approvalStatusOpen({ data }),
      ...accountingRecordsOpen({ data }),
      ...formEvent(data, closeWindow)
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-collapse-item__header) {
  background: #fbfbfbbf;
}
:deep(#tab-6) {
  position: absolute;
  right: -450px;
}
/* :deep(.el-input__inner) {
  border: none !important;
} */
:deep(.el-input__inner) {
  border: none !important;
  border-width: 0 0 1px;
  border-bottom-color: #0c9eff;
  padding: 0;
  border-radius: 0;
  line-height: 25px;
  height: 25px;
  color: #0c9eff;
}
/* 收货人 */
.tech_ContractManagement_ApprovalContractDetails_Consignee {
  .bf-table-content {
    margin-top: 0;
  }
}
/* 审批评定 */
.tech_approvalContractDetails_evaluation {
  :deep(.el-form-item) {
    margin: 0 !important;
  }
}
:deep(.el-form-item__label) {
  width: 100px !important;
  justify-content: center;
  /* margin-left: 20px; */
}
</style>
