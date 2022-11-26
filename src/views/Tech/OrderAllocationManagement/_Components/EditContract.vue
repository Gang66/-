<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="p-5 tech_OrderAllocationManagement_EditContract">
      <el-collapse accordion v-model="data.activeNames">
        <!-- #region 合同基础信息 -->
        <el-collapse-item name="1">
          <template #title>
            <span class="pl-4">合同基础信息</span>
          </template>
          <div class="pt-6 tech_OrderAllocationManagement_EditContract_information">
            <el-form ref="ruleFormRef2" :model="data.ruleForm2" status-icon :rules="rules2" label-width="120px" class="demo-ruleForm flex flex-wrap" :inline="true">
              <el-form-item prop="Demander">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">需求方</span>
                  <el-input v-model="data.ruleForm2.Demander" placeholder="请输入内容" style="width: 260px"> </el-input>
                </div>
              </el-form-item>
              <el-form-item prop="SigningTime">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-top bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">签约时间</span>
                  <el-date-picker v-model="data.ruleForm2.SigningTime" type="date" placeholder="选择日期" style="width: 170px" />
                </div>
              </el-form-item>
              <el-form-item prop="ContractingPlace">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">签约地点</span>
                  <el-cascader v-model="data.ruleForm2.ContractingPlace" :options="data.ContractingPlaceOptions" style="width: 170px" />
                </div>
              </el-form-item>
              <el-form-item prop="Division">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">事业部</span>
                  <el-select v-model="data.ruleForm2.Division" placeholder="事业部" style="width: 170px">
                    <el-option v-for="item in data.CompList" :key="item.Id" :label="item.Name" :value="item.Id" />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="Supplier">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">供货方</span>
                  <el-select v-model="data.ruleForm2.Supplier" placeholder="选择选项" style="width: 260px">
                    <el-option v-for="item in data.SupplierOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="Salesman">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">业务员</span>
                  <el-select v-model="data.ruleForm2.Salesman" placeholder="选择选项" style="width: 170px">
                    <el-option v-for="item in data.SalesmanOptions" :key="item.value" :label="item.label" :value="item.value" />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="ContractAmount">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">合同金额</span>
                  <el-input v-model="data.ruleForm2.ContractAmount" placeholder="请输入内容" style="width: 170px"> </el-input>
                </div>
              </el-form-item>
              <el-form-item prop="ContractStatus">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">合同状态</span>
                  <el-select v-model="data.ruleForm2.ContractStatus" placeholder="选择选项" style="width: 170px">
                    <el-option v-for="item in data.ContractStatusOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="Qualified">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">标牌合格</span>
                  <el-select v-model="data.ruleForm2.Qualified" placeholder="选择选项" style="width: 260px">
                    <el-option v-for="item in data.QualifiedOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="taxation">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">税费</span>
                  <el-select v-model="data.ruleForm2.taxation" placeholder="选择选项" style="width: 170px">
                    <el-option v-for="item in data.taxationOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="Supply">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">供货天数</span>
                  <el-input v-model="data.ruleForm2.Supply" placeholder="输入内容" style="width: 170px"></el-input>
                </div>
              </el-form-item>
              <el-form-item prop="Level" :show-message="false">
                <div class="mr-4 mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">供货级别</span>
                  <el-select v-model="data.ruleForm2.Level" placeholder="选择选项" style="width: 170px">
                    <el-option v-for="item in data.LevelOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item prop="address" :show-message="false">
                <div class="mb-2 mr-4">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">供货地址</span>
                  <el-input v-model="data.ruleForm2.address" placeholder="请输入内容" style="width: 524px"> </el-input>
                </div>
              </el-form-item>
              <el-form-item prop="Remarks" :show-message="false">
                <div class="mb-2">
                  <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">备注</span>
                  <el-input v-model="data.ruleForm2.remarks" placeholder="请输入内容" style="width: 440px"> </el-input>
                </div>
              </el-form-item>
            </el-form>
          </div>
        </el-collapse-item>
        <!-- #endregion -->
        <!-- #region  联系人/付款计划-->
        <el-collapse-item name="2">
          <template #title>
            <span class="pl-4">联系人/付款计划</span>
          </template>
          <div class="p-3 clearfix">
            <div class="bf-table-content tables inline-block float-left">
              <div class="float-right mb-3">
                <el-button type="primary" size="small">新增</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </div>
              <el-table :data="data.tableData" stripe>
                <el-table-column type="selection" width="30" align="center" />
                <el-table-column prop="Name" label="姓名" align="center">
                  <template #default="scope"><el-input v-model="scope.row.Name" placeholder="请输入" size="small" /></template>
                </el-table-column>
                <el-table-column prop="mobile" label="电话" align="center">
                  <template #default="scope"><el-input v-model="scope.row.mobile" placeholder="请输入" size="small" /></template>
                </el-table-column>
                <el-table-column prop="phone" label="手机" align="center">
                  <template #default="scope"><el-input v-model="scope.row.phone" placeholder="请输入" size="small" /></template>
                </el-table-column>
                <el-table-column prop="work" label="工种" align="center">
                  <template #default="scope">
                    <el-select v-model="data.value9" class="m-2" placeholder="请选择" size="small">
                      <el-option v-for="item in data.options8" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="bf-table-content tables inline-block float-left">
              <div class="float-right mb-3">
                <el-button type="primary" size="small">新增</el-button>
                <el-button type="danger" size="small">删除</el-button>
              </div>
              <el-table :data="data.tableData" stripe>
                <el-table-column type="selection" width="30" align="center" />
                <el-table-column prop="CreateOn" label="付款日期" align="center">
                  <template #default="scope">
                    <el-date-picker v-model="data.value10" type="date" placeholder="请选择日期" size="small" style="width: 100px" />
                  </template>
                </el-table-column>
                <el-table-column prop="PostName" label="付款阶段" align="center">
                  <template #default="scope">
                    <el-select v-model="data.value11" class="m-2" placeholder="请选择" size="small">
                      <el-option v-for="item in data.options9" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </template>
                </el-table-column>
                <el-table-column prop="DepartName" label="付款百分比" align="center">
                  <template #default="scope">
                    <el-input-number v-model="data.num" class="mx-4" :min="1" :max="10" size="small" controls-position="right" @change="handleChange" style="width: 100px" />
                  </template>
                </el-table-column>
                <el-table-column prop="Name" label="付款金额" align="center">
                  <template #default="scope">
                    <el-input-number v-model="data.num2" class="mx-4" size="small" style="width: 100px" />
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <!-- #endregion -->
        <!-- #region  合同清单-->
        <el-collapse-item name="4">
          <template #title>
            <span class="pl-4">合同清单</span>
          </template>
          <div class="p-3 clearfix">
            <div class="float-right">
              <el-button type="info" plain size="small" @click="openWindowHechnicalMarkup()">查阅成本</el-button>
              <el-button type="primary" size="small">新增</el-button>
              <el-button type="danger" size="small">删除</el-button>
              <div class="inline-block ml-3 mr-3">
                <el-checkbox v-model="data.checked1" label="附件清单" size="small" />
              </div>
              <el-button type="primary" plain size="small" @click="openWindowExtendedProperties()">设置</el-button>
            </div>
          </div>
          <Editor v-model="data.ContractTerms" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" :init="{ language: 'zh_CN' }"></Editor>
          <div class="bf-table-content">
            <el-table :data="data.tableData" stripe>
              <el-table-column type="selection" width="30" align="center" />
              <el-table-column type="index" label="序号" width="54" align="center" />
              <el-table-column prop="ProductName" label="产品名称" align="center">
                <template #default="scope"><el-input v-model="scope.row.ProductName" placeholder="请输入" size="small" /></template>
              </el-table-column>
              <el-table-column prop="Specifications" label="规格" align="center">
                <template #default="scope"><el-input v-model="scope.row.Specifications" placeholder="请输入" size="small" /></template>
              </el-table-column>
              <el-table-column prop="model" label="型号" align="center">
                <template #default="scope"><el-input v-model="scope.row.model" placeholder="请输入" size="small" /></template>
              </el-table-column>
              <el-table-column prop="Company" label="单位" align="center">
                <template #default="scope"><el-input v-model="scope.row.Company" placeholder="请输入" size="small" /></template>
              </el-table-column>
              <el-table-column prop="quantity" label="数量" align="center">
                <template #default="scope"><el-input v-model="scope.row.quantity" placeholder="请输入" size="small" /></template>
              </el-table-column>
              <el-table-column prop="UnitPrice" label="单价" align="center">
                <template #default="scope"><el-input v-model="scope.row.UnitPrice" placeholder="请输入" size="small" /></template>
              </el-table-column>
              <el-table-column prop="DepartName" label="操作" align="center">
                <template #default="scope">
                  <el-button type="danger" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="p-8 pt-4 pb-1">
            <div class="flex ml-16 mb-4">
              <div class="w-96"><span>合计金额</span></div>
              <div class="w-96"><span>大写：捌仟肆佰玖拾元整</span></div>
              <div class="w-96"><span>小写：8490 </span></div>
            </div>
            <div>
              <span class="ml-4">备注</span>
              <el-input v-model="data.input9" class="ml-6" placeholder="请输入内容" style="width: 1000px" />
            </div>
          </div>
        </el-collapse-item>
        <!-- #endregion -->
        <!-- #region  条例模板-->
        <el-collapse-item name="5">
          <template #title>
            <span class="pl-4">条例模板</span>
          </template>
          <div class="p-3 relative">
            <div class="regulation">
              <el-select v-model="data.value12" class="m-2 absolute top-2 right-4 z-10" placeholder="请选择">
                <el-option v-for="item in data.options10" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
              <!-- <el-button>管理模板</el-button> -->
              <Editor v-model="data.Managementtemplate" api-key="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc" :init="{ language: 'zh_CN' }"></Editor>
            </div>
          </div>
        </el-collapse-item>
        <!-- #endregion -->
        <!-- #region  合同附件-->
        <el-collapse-item name="7">
          <template #title>
            <span class="pl-4">合同附件</span>
          </template>
          <div class="p-3">
            <el-button type="primary">选取文件</el-button>
            <el-button type="primary" plain>上传服务器</el-button>
            <div class="bf-table-content">
              <el-table :data="data.tableData">
                <el-table-column type="selection" width="30" align="center" />
                <el-table-column prop="Name" label="文件名" min-width="200px">
                  <template #default="scope">
                    <span>052-阀门-8490元-北京高中压阀门科技集团有限公司（最终版）.doc</span>
                  </template>
                </el-table-column>
                <el-table-column prop="mobile" label="大小" align="center">
                  <template #default="scope">
                    <span>1559.22 KB</span>
                  </template>
                </el-table-column>
                <el-table-column prop="phone" label="状态" align="center">
                  <template #default="scope">
                    <span>上传成功</span>
                  </template>
                </el-table-column>
                <el-table-column prop="work" label="操作" align="center">
                  <template #default="scope">
                    <el-button type="success">预览</el-button>
                    <el-button type="danger">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </el-collapse-item>
        <!-- #endregion -->
        <!-- #region  合同审批-->
        <el-collapse-item name="8">
          <template #title>
            <span class="pl-4">合同审批</span>
          </template>
          <!-- #region 审批项目 -->
          <div class="p-3 clearfix relative">
            <div><i class="iconfont icon-biaoqian text-blue-500 mr-1"></i><span class="text-sm">审批项目</span></div>
            <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="8em" class="bf-window-padding" hide-required-asterisk>
              <el-form-item label="清单数量型号" prop="QuantityModel">
                <el-radio-group v-model="data.ruleForm.QuantityModel">
                  <el-radio v-for="item in data.quantityModelOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="价格及生产效益" prop="ProductionBenefit">
                <el-radio-group v-model="data.ruleForm.ProductionBenefit">
                  <el-radio v-for="item in data.ProductionBenefitOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="质量风险等级" prop="RiskLevel">
                <el-radio-group v-model="data.ruleForm.RiskLevel">
                  <el-radio v-for="item in data.RiskLevelOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="合同建议" prop="ContractProposal">
                <el-radio-group v-model="data.ruleForm.ContractProposal">
                  <el-radio v-for="item in data.ContractProposalOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="原因" prop="Reason">
                <el-input v-model="data.ruleForm.Reason" maxlength="30" style="width: 900px" placeholder="请输入内容" show-word-limit type="textarea" />
              </el-form-item>

              <el-form-item label="技术质量标准" prop="Standards" class="absolute top-8 right-16">
                <el-radio-group v-model="data.ruleForm.Standards" placeholder="请选择">
                  <el-radio v-for="item in data.standardsOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="供货周期" prop="SupplyCycle" class="absolute top-16 right-16">
                <el-radio-group v-model="data.ruleForm.SupplyCycle" placeholder="请选择">
                  <el-radio v-for="item in data.SupplyCycleOptions" :key="item.value" :label="item.label">{{ item.label }}</el-radio>
                </el-radio-group>
              </el-form-item>
            </el-form>
            <div class="m-auto w-12">
              <el-button type="primary" @click="submitForm(ruleFormRef)">提交审批</el-button>
            </div>
            <!-- #region 审批记录 -->
            <div><i class="iconfont icon-biaoqian text-blue-500 mr-1"></i><span class="text-sm">审批记录</span></div>
            <div class="bf-table-content">
              <el-table :data="data.tableData" stripe>
                <el-table-column prop="CreateOn" label="审批部门" align="center">
                  <template #default="scope">
                    <span>1111</span>
                  </template>
                </el-table-column>
                <el-table-column prop="PostName" label="审批时间" align="center">
                  <template #default="scope">
                    <span>1111</span>
                  </template>
                </el-table-column>
                <el-table-column prop="DepartName" label="审批意见" align="center">
                  <template #default="scope">
                    <span>1111</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Name" label="审批依据" align="center">
                  <template #default="scope">
                    <span>1111</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Name" label="审批人" align="center">
                  <template #default="scope">
                    <span>1111</span>
                  </template>
                </el-table-column>
                <el-table-column prop="Name" label="操作" align="center">
                  <template #default="scope">
                    <span>1111</span>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- #endregion -->
          </div>
          <!-- #endregion -->
        </el-collapse-item>
        <!-- #endregion -->
        <!-- #region  供需方信息-->
        <el-collapse-item name="6">
          <template #title>
            <span class="pl-4">供需方信息</span>
          </template>
          <div class="p-3 pt-8">
            <div class="w-540 border inline-block mr-10 ml-2 rounded-md relative">
              <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>供货方</span></div>
              <el-form class="bf-window-padding" hide-required-asterisk>
                <!-- ref="ruleFormRef" :model="data.ruleForm" :rules="rules" -->
                <el-form-item prop="CompanyName">
                  <div class="mt-2">
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">单位名称</span>
                    <el-input v-model="data.Supplier.CompanyNameInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item prop="CompanyAddress">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">单位地址</span>
                    <el-input v-model="data.Supplier.CompanyAddressInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item prop="Representative">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">法定代表人</span>
                    <el-input v-model="data.Supplier.Representativeinput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Agent">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">委托代理人</span>
                    <el-input v-model="data.Supplier.Agentinput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Depositbank">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">开户银行</span>
                    <el-input v-model="data.Supplier.Depositbankinput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="BankAccount">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">银行账号</span>
                    <el-input v-model="data.Supplier.BankAccountInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Telephone">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">电话</span>
                    <el-input v-model="data.Supplier.TelephoneInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Fax">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">传真</span>
                    <el-input v-model="data.Supplier.FaxInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Paragraph">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">税号</span>
                    <el-input v-model="data.Supplier.ParagraphInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
              </el-form>
            </div>
            <div class="w-540 border inline-block rounded-md relative">
              <div class="w-20 text-center h-7 bg-white absolute -top-3 left-3"><span>需求方</span></div>
              <el-form class="bf-window-padding" hide-required-asterisk>
                <!-- ref="ruleFormRef" :model="data.ruleForm" :rules="rules" -->
                <el-form-item prop="CompanyName">
                  <div class="mt-2">
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">单位名称</span>
                    <el-input v-model="data.Supplier1.CompanyNameInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item prop="CompanyAddress">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">单位地址</span>
                    <el-input v-model="data.Supplier1.CompanyAddressInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item prop="Representative">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">法定代表人</span>
                    <el-input v-model="data.Supplier1.Representativeinput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Agent">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">委托代理人</span>
                    <el-input v-model="data.Supplier1.Agentinput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Depositbank">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">开户银行</span>
                    <el-input v-model="data.Supplier1.Depositbankinput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="BankAccount">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">银行账号</span>
                    <el-input v-model="data.Supplier1.BankAccountInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Telephone">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">电话</span>
                    <el-input v-model="data.Supplier1.TelephoneInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Fax">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">传真</span>
                    <el-input v-model="data.Supplier1.FaxInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
                <el-form-item label="" prop="Paragraph">
                  <div>
                    <span class="inline-block w-20 h-8 align-bottom bg-slate-100 text-center text-gray-400 leading-8 border-t border-b border-l rounded-l border-gray-300">税号</span>
                    <el-input v-model="data.Supplier1.ParagraphInput" placeholder="请输入" style="width: 420px"> </el-input>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-collapse-item>
        <!-- #endregion -->
      </el-collapse>
      <div class="clearfix pt-4">
        <div class="float-left text-sm text-blue-500 cursor-pointer">
          <i class="iconfont icon-jianjie mr-1"></i>
          <span class="">预览合同</span>
        </div>
        <div class="float-right">
          <el-button @click="resetForm(ruleFormRef2)">取消</el-button>
          <el-button type="primary" @click="submitForm1(ruleFormRef2)">保存</el-button>
        </div>
      </div>
      <!-- 扩展属性 -->
      <ExtendedProperties title="扩展属性" v-if="extendedPropertiesOpenData.visible" :FormData="extendedPropertiesOpenData.formData" @closeWindow="closeWindowExtendedProperties($event)" />
      <!--  （加价记录） 销售加价 -->
      <PriceIncreaseManagement title="加价管理" v-if="hechnicalMarkupOpenData.visible" :FormData="hechnicalMarkupOpenData.formData" @closeWindow="closeWindowHechnicalMarkup($event)" />
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref, onMounted } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { InfoFilled } from '@element-plus/icons-vue'
import ExtendedProperties from './ExtendedProperties.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import Editor from '@tinymce/tinymce-vue'
import PriceIncreaseManagement from '../../OrderAllocationManagement/_Components/PriceIncreaseManagement.vue'
import { GetTypeDepartList } from '/@/api/system/dept'
import { useCommonStore } from '/@/store/modules/Common'

const store = useCommonStore() //记得加这一句

// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef2 = ref<FormInstance>()
  // 表单提交
  const submitForm1 = (formEl: FormInstance | undefined) => {
    if (!formEl) return

    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
      } else {
        console.log('error submit!', 'erbi')
        return false
      }
    })
  }
  //校验
  const rules2 = reactive<FormRules>({
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
    taxation: [
      {
        required: true,
        message: '请选择税费',
        trigger: 'blur'
      }
    ],
    Remarks: [
      {
        required: true,
        message: '请填写备注',
        trigger: 'change'
      }
    ],
    Division: [
      {
        required: true,
        message: '请选择事业部',
        trigger: 'change'
      }
    ],
    Salesman: [
      {
        required: true,
        message: '请选择业务员',
        trigger: 'change'
      }
    ],
    ContractStatus: [
      {
        required: true,
        message: '请选择合同状态',
        trigger: 'change'
      }
    ],
    Qualified: [
      {
        required: true,
        message: '请选择标牌合格',
        trigger: 'change'
      }
    ],
    Supply: [
      {
        required: true,
        message: '请填写供货天数',
        trigger: 'change'
      }
    ],
    Level: [
      {
        required: true,
        message: '请选择供货级别',
        trigger: 'change'
      }
    ],
    address: [
      {
        required: true,
        message: '请填写供货地址',
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
    rules2,
    submitForm1,
    resetForm,
    ruleFormRef2
  }
}

//  项目审批 （合同审批  提交审批）
const formEvent2 = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
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
    Standards: [{ required: true, message: '请选择', trigger: 'blur' }],
    SupplyCycle: [{ required: true, message: '请选择', trigger: 'blur' }],
    QuantityModel: [{ required: true, message: '请选择', trigger: 'blur' }],
    ProductionBenefit: [{ required: true, message: '请选择', trigger: 'blur' }],
    RiskLevel: [{ required: true, message: '请选择', trigger: 'blur' }],
    ContractProposal: [{ required: true, message: '请选择', trigger: 'blur' }],
    Reason: [{ required: true, message: '请输入', trigger: 'blur' }]
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

//获取字典数据
const getDictionaryData = (data: any) => {
  // 标牌证件
  store.getDict('sale_Order_Signage').then((res: any) => {
    data.QualifiedOptions = res
  })
  //   税费
  store.getDict('sale_Contract_InvoiceType').then((res: any) => {
    data.taxationOptions = res
  })
  // 合同状态
  store.getDict('tech_EditContract_ContractStatus').then((res: any) => {
    data.ContractStatusOptions = res
  })
  // 供货级别
  store.getDict('tech_EditContract_Level').then((res: any) => {
    data.LevelOptions = res
  })
}

export default defineComponent({
  components: {
    OpenWindow,
    InfoFilled,
    ExtendedProperties,
    Editor,
    PriceIncreaseManagement
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      activeNames: '1',
      ContractTerms: '',
      Managementtemplate: '',
      //事业部信息
      CompList: [],
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
      ruleForm2: {
        Demander: '',
        SigningTime: '',
        ContractAmount: '',
        ContractStatus: '',
        Level: '',
        address: '',
        Salesman: '',
        Supply: '',
        Supplier: '',
        Division: '',
        ContractingPlace: '',
        taxation: '',
        Remarks: ''
      },
      quantityModelOptions: [
        { value: 'A', label: '准确' },
        { value: 'B', label: '不准确' }
      ],
      standardsOptions: [
        { value: 'A', label: '满足' },
        { value: 'B', label: '一般满足' },
        { value: 'C', label: '不满足' }
      ],
      SupplyCycleOptions: [
        { value: 'A', label: '满足' },
        { value: 'B', label: '一般满足' },
        { value: 'C', label: '不满足' }
      ],
      ProductionBenefitOptions: [
        { value: 'A', label: '较好' },
        { value: 'B', label: '一般' },
        { value: 'C', label: '不好' }
      ],
      RiskLevelOptions: [
        { value: 'A', label: '高' },
        { value: 'B', label: '中' },
        { value: 'C', label: '低' }
      ],
      ContractProposalOptions: [
        { value: 'A', label: '建议合作' },
        { value: 'B', label: '可以合作' },
        { value: 'C', label: '放弃合作' }
      ],
      checked1: false,
      input1: '',
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      input7: '',
      input8: '',
      input9: '',
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '',
      value11: '',
      value12: '',
      options1: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options2: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options3: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options4: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options5: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options6: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options7: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options8: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options9: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      options10: [
        {
          value: 'Option1',
          label: 'Option1'
        },
        {
          value: 'Option2',
          label: 'Option2'
        },
        {
          value: 'Option3',
          label: 'Option3'
        },
        {
          value: 'Option4',
          label: 'Option4'
        },
        {
          value: 'Option5',
          label: 'Option5'
        }
      ],
      tableData: [{ value: 1 }, { value: 1 }],
      num2: 2,
      num: 1,
      radio1: 3,
      radio2: 3,
      radio3: 3,
      radio4: 3,
      textarea: '',
      ruleForm: {
        Standards: '',
        SupplyCycle: '',
        QuantityModel: '',
        ProductionBenefit: '',
        RiskLevel: '',
        ContractProposal: '',
        Reason: ''
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

    const handleChange = (value: number) => {
      console.log(value)
    }
    // 扩展属性
    const extendedPropertiesOpen = (data: any) => {
      let extendedPropertiesOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowExtendedProperties = (val: any) => {
        extendedPropertiesOpenData.formData = {
          //   Id:val.Id,
          //   ClientName:val.ClientName
        }
        extendedPropertiesOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowExtendedProperties = (type: string) => {
        extendedPropertiesOpenData.visible = false
      }

      return {
        extendedPropertiesOpenData,
        openWindowExtendedProperties,
        closeWindowExtendedProperties
      }
    }
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
    //获取事业部列表
    const getCompList = (data: any) => {
      // 获取事业部列表
      GetTypeDepartList(1).then((res) => {
        if (res.code == 1) {
          data.CompList = res.data
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    onMounted(() => {
      getCompList(data)
      //获取字典数据
      getDictionaryData(data)
    })

    return {
      boxStyle,
      closeWindow,
      data,
      handleChange,
      ...extendedPropertiesOpen({ data }),
      ...hechnicalMarkupOpen({ data }),
      ...formEvent(data, closeWindow),
      ...formEvent2(data, closeWindow)
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-collapse-item__header) {
  background: #fbfbfbbf;
}
.tech_OrderAllocationManagement_EditContract {
  .tables {
    width: 568px;
  }
  .el-select {
    border-radius: 0 !important;
  }
  .regulation {
    :deep(.el-select) {
      position: absolute;
    }
  }
  .tech_OrderAllocationManagement_EditContract_information {
    :deep(.el-form--inline .el-form-item) {
      margin-right: 0 !important;
    }
    :deep(.el-form-item) {
      margin-bottom: 0 !important;
    }
  }

  :deep(.el-input__wrapper) {
    border-top-left-radius: 0 !important;
    border-bottom-left-radius: 0 !important;
  }
}
</style>
