<template>
  <div class="AddFileForm open-select-mask w-full h-full bg-black bg-opacity-30 z-50 h-vh flex flex-center items-start pt-16 overflow-y-auto pb-12"
    :class="[boxStyle.boxPaddingTop, boxStyle.boxPaddingBottom]" v-if="data.isView">
    <div class="bf-window-cp overflow-y-auto" :class="[boxStyle.boxWidth, boxStyle.boxHeight]">
      <!-- <div class="max-w-screen-xl bg-white flex flex-col overflow-x-hidden bf-windows-content"> -->
      <div class="bg-white flex flex-col overflow-x-hidden bf-windows-content">
        <div class="bf-window-header-bg h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100">
          <div class="flex items-center justify-between w-full mr-4">
            <div>完善档案信息</div>
            <slot name="topBtn" />
          </div>
          <div class="cursor-pointer rounded-full bg-gray-200 bg-opacity-50 p-0.5" style="line-height: 0">
            <el-icon @click="close">
              <el-icon-close />
            </el-icon>
          </div>
        </div>
        <div class="flex-1 overflow-hidden">
          <div class="">
            <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" class="bf-window-padding bf-no-error" hide-required-asterisk>
              <div v-show="data.step == 1">
                <div class="flex justify-between">
                  <div class="bf-font-blue-color font-semibold">请上传身份证照片</div>
                  <!-- <div class="absolute right-4 cursor-pointer" @click="data.CodeFormWindow.view = true">
                    <img src="/src/assets/img/hr/Induction/FileFormCode.png" alt="" class="w-16 h-16" />
                    <div class="absolute top-8 -left-7">
                      <p class="text-sm bf-font-blue-color">手机扫码</p>
                      <p class="text-sm bf-font-blue-color">完善资料</p>
                    </div>
                  </div> -->
                </div>
                <div class="px-14 mt-5">
                  <div class="flex justify-evenly">
                    <div>
                      <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="handleChange">
                        <template #trigger>
                          <img :src="remoteUrlEvent(data.ruleForm.IdCardFrontFilePath)" alt="" class="userId-bg" v-if="data.ruleForm.IdCardFrontFilePath" />
                          <img src="/src/assets/img/hr/Induction/FileFormUserId.png" alt="" class="userId-bg" v-else />
                        </template>
                      </el-upload>
                      <div class="text-center mt-2 bf-font-blue-color">请上传身份证正面照</div>
                    </div>
                    <div>
                      <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="handleTwoChange">
                        <img :src="remoteUrlEvent(data.ruleForm.IdCardBackFilePath)" alt="" class="userId-bg" v-if="data.ruleForm.IdCardBackFilePath" />
                        <img src="/src/assets/img/hr/Induction/FileFormUserIdTwo.png" alt="" class="userId-bg" v-else />
                      </el-upload>
                      <div class="text-center mt-2 bf-font-blue-color">请上传身份证背面照</div>
                    </div>
                  </div>
                  <div class="text-sm text-orange-400 text-center">PS:请规范上传身份证，拍照时需对齐身份证边缘，不要出现其他的内容；(如上图所示)</div>
                </div>
                <div class="mt-8">
                  <el-row :gutter="10">
                    <el-col :md="24" :lg="6">
                      <el-form-item label="姓　　名" prop="Name">
                        <el-input v-model="data.ruleForm.Name" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="6">
                      <el-form-item label="性　　别" prop="Sex">
                        <el-input v-model="data.ruleForm.Sex" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="6">
                      <el-form-item label="民　　族" prop="Nationality">
                        <el-input v-model="data.ruleForm.Nationality" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="6">
                      <el-form-item label="年　　龄" prop="Age">
                        <el-input v-model="data.ruleForm.Age" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :md="24" :lg="12">
                      <el-form-item label="身份证号" prop="IdCard">
                        <el-input v-model="data.ruleForm.IdCard" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="12">
                      <el-form-item label="发证机构" prop="IdCardOffice">
                        <el-input v-model="data.ruleForm.IdCardOffice" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="10">
                    <el-col :md="24" :lg="12">
                      <el-form-item label="有效期限" prop="IdCardterm">
                        <el-input v-model="data.ruleForm.IdCardterm" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                    <el-col :md="24" :lg="12">
                      <el-form-item label="家庭地址" prop="HomeAddress">
                        <el-input v-model="data.ruleForm.HomeAddress" placeholder="" :disabled="data.isEdit" />
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <div class="bf-search-formItem mt-2">
                  <el-form-item class="justify-center" label-width="0">
                    <div class="text-center w-full">
                      <el-button @click="closeWindow('close')" size="large">取 消</el-button>
                      <el-button type="primary" @click="stepEvent(2)" size="large">下一步</el-button>
                    </div>
                  </el-form-item>
                </div>
              </div>
              <div v-if="data.step == 2">
                <div>
                  <div>
                    <el-row :gutter="10">
                      <el-col :md="24" :lg="6">
                        <el-form-item label="手　　机" prop="PhoneNumber" label-width="40">
                          <el-input v-model="data.ruleForm.PhoneNumber" placeholder="请填写手机号">
                            <template v-slot:append>
                              <span class="cursor-pointer" @click="phoneTrue" :class="{ 'text-green-400 w-70 bf-bg-color-fill-color-light': data.formTrue.phoneTrue }">
                                {{ data.formTrue.phoneTrue ? '已确认' : '点击确认' }}
                              </span>
                            </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="微　　信" prop="VXNumber" label-width="40">
                          <el-input v-model="data.ruleForm.VXNumber" placeholder="请填写微信" />
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="Q　　Q" prop="QQNumber" label-width="90">
                          <el-input v-model="data.ruleForm.QQNumber" placeholder="请填写QQ" style="marginLeft:5px;" />
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="入职时间" prop="ComeDate" label-width="40">
                          <el-date-picker v-model="data.ruleForm.ComeDate" type="date" placeholder="请选择入职时间" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :md="24" :lg="6">
                        <el-form-item label="邮　　箱" prop="Email" label-width="40">
                          <el-input v-model="data.ruleForm.Email" placeholder="请填写邮箱" />
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="政治面貌" prop="PoliticalOutlook" label-width="40">
                          <el-select v-model="data.ruleForm.PoliticalOutlook" placeholder="请选择政治面貌">
                            <el-option v-for="item in data.PoliticalOutlook" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="社保情况" prop="SocialSecurity" label-width="40">
                          <el-select v-model="data.ruleForm.SocialSecurity" placeholder="请选择社保情况">
                            <el-option v-for="item in data.SocialSecurity" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="驾驶情况" prop="DrivingLicense" label-width="40">
                          <el-select v-model="data.ruleForm.DrivingLicense" placeholder="请选择驾驶情况">
                            <el-option v-for="item in data.DrivingLicense" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :md="24" :lg="6">
                        <el-form-item label="居住范围" prop="LiveArea" label-width="40" v-if="data.LiveArea.length > 0">
                          <el-select v-model="data.ruleForm.LiveArea" placeholder="请选择居住范围">
                            <el-option v-for="item in data.LiveArea" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="最高学历" prop="Education" label-width="40">
                          <el-select v-model="data.ruleForm.Education" placeholder="请选择最高学历">
                            <el-option v-for="item in data.highestEducation" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="毕业方式" prop="Graduation" label-width="40">
                          <el-select v-model="data.ruleForm.Graduation" placeholder="请选择毕业方式">
                            <el-option v-for="item in data.Graduation" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                          </el-select>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="毕业时间" prop="GraduationDate" label-width="40">
                          <el-input v-model="data.ruleForm.GraduationDate" placeholder="请填写毕业时间"></el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :md="24" :lg="8">
                        <el-form-item label="毕业院校" prop="Colleges" label-width="40">
                          <el-input v-model="data.ruleForm.Colleges" placeholder="请填写毕业院校"> </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="8">
                        <el-form-item label="专业" prop="Professional" label-width="40">
                          <el-input v-model="data.ruleForm.Professional" placeholder="请填写专业" />
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="8">
                        <el-form-item label="籍贯" prop="NativePlace" label-width="40">
                          <el-input v-model="data.ruleForm.NativePlace" placeholder="请填写籍贯" />
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :md="24" :lg="12">
                        <el-form-item label="开户行" prop="OpeningBank" label-width="70">
                          <el-input v-model="data.ruleForm.OpeningBank" placeholder="请填写开户行"> </el-input>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="12">
                        <el-form-item label="银行卡号" prop="BankCard" label-width="40">
                          <el-input v-model="data.ruleForm.BankCard" placeholder="此卡号仅用于发放薪资，谨慎填写">
                            <template #append>
                              <span class="cursor-pointer" @click="BankTrue" :class="{ 'w-70 text-green-400 bf-bg-color-fill-color-light': data.formTrue.BankTrue }">
                                {{ data.formTrue.BankTrue ? '已确认' : '点击确认' }}
                              </span>
                            </template>
                          </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                    <el-row :gutter="10">
                      <el-col :md="24" :lg="6">
                        <el-form-item label="失信记录" prop="DishonestyRecord">
                          <el-radio-group v-model="data.ruleForm.DishonestyRecord">
                            <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="劳务纠纷" prop="LaborDispute">
                          <el-radio-group v-model="data.ruleForm.LaborDispute">
                            <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="犯罪记录" prop="CriminalRecord">
                          <el-radio-group v-model="data.ruleForm.CriminalRecord">
                            <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                      <el-col :md="24" :lg="6">
                        <el-form-item label="法律纠纷" prop="LegalDisputes">
                          <el-radio-group v-model="data.ruleForm.LegalDisputes">
                            <el-radio v-for="item in data.haveNoOptions" :label="item.DicKey">{{ item.DicValue }}</el-radio>
                          </el-radio-group>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </div>
                  <div>
                    <div class="flex justify-between">
                      <div class="bf-font-blue-color text-sm font-semibold mb-2">家庭情况</div>
                      <div class="bf-font-blue-color text-sm cursor-pointer" @click="addFamily">添加家庭信息</div>
                    </div>
                    <div v-for="(item, index) in data.ruleForm.FamilySituations" :key="index">
                      <el-row :gutter="10">
                        <el-col :md="24" :lg="4">
                          <el-form-item label="关系" label-width="40" :prop="`FamilySituations.${index}.FamilyRelat`" :rules="rules.FamilyRelat">
                            <el-input v-model="item.FamilyRelat" placeholder="请填写" />
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="4">
                          <el-form-item label="姓名" label-width="40" :prop="`FamilySituations.${index}.Name`" :rules="rules.Name">
                            <el-input v-model="item.Name" placeholder="请填写" />
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="6">
                          <el-form-item label="电话" label-width="40" :prop="`FamilySituations.${index}.PhoneNumber`" :rules="rules.PhoneNumber">
                            <el-input v-model="item.PhoneNumber" placeholder="请填写">
                              <template #append>
                                <span class="cursor-pointer" @click="phoneEvent(index)"
                                  :class="{ 'w-70 text-green-400 bf-bg-color-fill-color-light': data.ruleForm.FamilySituations[index].Telephone }">
                                  {{ data.ruleForm.FamilySituations[index].Telephone ? '已确认' : '点击确认' }}
                                </span>
                              </template>
                              <!-- <template #append>
                                <span class="cursor-pointer" @click="phoneEvent" :class="{ 'text-green-400': data.formTrue.Telephone }">
                                  {{ data.formTrue.Telephone ? '已确认' : '点击确认' }}
                                </span>
                              </template> -->
                            </el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="5">
                          <el-form-item label="生日" label-width="40" :prop="`FamilySituations.${index}.Brith`" :rules="rules.Brith">
                            <el-input v-model="item.Brith" placeholder="请填写" />
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="5">
                          <el-form-item label="职业" label-width="40" :prop="`FamilySituations.${index}.Profession`" :rules="rules.Profession">
                            <el-input v-model="item.Profession" placeholder="请填写" />
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div>
                    <div class="bf-font-blue-color text-sm font-semibold mb-2">紧急联系人</div>
                    <div>
                      <el-row :gutter="10">
                        <el-col :md="24" :lg="8">
                          <el-form-item label="关　　系" prop="EmergencyRelation">
                            <el-input v-model="data.ruleForm.EmergencyRelation" placeholder="请填写" class="w-full" />
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="8">
                          <el-form-item label="姓　　名" prop="EmergencyName">
                            <el-input v-model="data.ruleForm.EmergencyName" placeholder="请填写" class="w-full" />
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="8">
                          <el-form-item label="联系方式" prop="EmergencyNumber">
                            <el-input v-model="data.ruleForm.EmergencyNumber" placeholder="请填写" class="w-full">
                              <template #append>
                                <span class="cursor-pointer" @click="contactTrue" :class="{ 'w-70 text-green-400 bf-bg-color-fill-color-light': data.formTrue.contactTrue }">
                                  {{ data.formTrue.contactTrue ? '已确认' : '点击确认' }}
                                </span>
                              </template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div>
                    <div class="flex w-full justify-between">
                      <div class="bf-font-blue-color text-sm font-semibold mb-2">职业信息</div>
                      <div class="bf-font-blue-color text-sm cursor-pointer" @click="addWork">添加职业信息</div>
                    </div>
                    <div>
                      <el-row :gutter="10" v-for="(item, index) in data.ruleForm.StaffProInfos" :key="index">
                        <el-col :md="24" :lg="8">
                          <el-form-item label="" label-width="0" :prop="`StaffProInfos.${index}.time`" :rules="rules.time">
                            <el-date-picker v-model="item.time" type="daterange" value-format="YYYY-MM-DD" range-separator="于" start-placeholder="在职开始时间" end-placeholder="在职结束时间"
                              style="width: 14.375rem" @change="dateTimeChange($event, item)" />
                          </el-form-item>

                        </el-col>
                        <el-col :md="24" :lg="6">
                          <el-form-item label="" label-width="0" :prop="`StaffProInfos.${index}.CompanyName`" :rules="rules.CompanyName">
                            <el-input v-model="item.CompanyName" placeholder="请填写离职公司" class="w-full" />
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="5">
                          <el-form-item label="" label-width="0" :prop="`StaffProInfos.${index}.QuitReason`" :rules="rules.QuitReason">
                            <el-input v-model="item.QuitReason" placeholder="请填写离职原因" class="w-full" />
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="5">
                          <el-form-item label="" label-width="0" :prop="`StaffProInfos.${index}.QuitNameorNumber`" :rules="rules.QuitNameorNumber">
                            <el-input v-model="item.QuitNameorNumber" placeholder="证明人及联系方式" class="w-full">
                              <template #append>
                                <span class="cursor-pointer" @click="witnessTrue(index)"
                                  :class="{ 'w-70 text-green-400 bf-bg-color-fill-color-light': data.ruleForm.StaffProInfos[index].isShow }">
                                  {{ data.ruleForm.StaffProInfos[index].isShow ? '已确认' : '点击确认' }}
                                </span>
                              </template>
                            </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <div>
                    <div class="bf-font-blue-color text-sm font-semibold mb-2">证明文件上传</div>
                    <div>
                      <el-row :gutter="10">
                        <el-col :md="24" :lg="6">
                          <el-form-item label="学历证明" prop="EducationFile">
                            <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="EducationFileHandleChange">
                              <div class="bf-remove-input-disabled-bg">
                                <el-input v-model="data.ruleForm.EducationFile" placeholder="选择文件" disabled />
                              </div>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="6">
                          <el-form-item label="资格证书" prop="CertificateFile">
                            <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="CertificateFileHandleChange">
                              <div class="bf-remove-input-disabled-bg">
                                <el-input v-model="data.ruleForm.CertificateFile" placeholder="选择文件" disabled />
                              </div>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="6">
                          <el-form-item label="驾驶证" prop="DriveFile">
                            <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="DriveFileHandleChange">
                              <div class="bf-remove-input-disabled-bg">
                                <el-input v-model="data.ruleForm.DriveFile" placeholder="选择文件" disabled />
                              </div>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                        <el-col :md="24" :lg="6">
                          <el-form-item label="其它文件" prop="OtherFile">
                            <el-upload ref="uploadRef" action :auto-upload="false" list-type="picture-card" :on-change="OtherFileHandleChange">
                              <div class="bf-remove-input-disabled-bg">
                                <el-input v-model="data.ruleForm.OtherFile" placeholder="选择文件" disabled />
                              </div>
                            </el-upload>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                  <!-- <div class="bf-warning-color text-center cursor-pointer" @click="CodeFormWindowEvent ">请点击此处，扫码电子签名</div> -->
                </div>
                <div class="bf-search-formItem mt-4">
                  <el-form-item class="justify-center" label-width="0">
                    <div class="text-center w-full">
                      <el-button @click="stepEvent(1)" size="large">上一步</el-button>
                      <el-button type="primary" @click="submitForm(ruleFormRef)" size="large">提 交</el-button>
                    </div>
                  </el-form-item>
                </div>
              </div>
            </el-form>
            <CodeForm v-if="data.CodeFormWindow.view" @closeWindow="data.CodeFormWindow.view = false" :url="data.CodeFormWindow.Uid" :title="data.step == 1 ? '扫码完善资料' : '扫码签字'">
            </CodeForm>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext, getCurrentInstance } from 'vue'
import { isMobileTel, isEmail, isBankCard } from '/@/utils/validate'
import { ElMessage, ElMessageBox, FormInstance, FormRules, ElOption, ElSelect } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import OrgTreeDrawer from '../../Components/OrgTree/drawer.vue'
import { remoteUrl } from '/@/utils/tools'
import CodeForm from './_Components/CodeForm.vue'
import { GetFileStaffInfo, PostGetStaffManagementInfo, PostInsertStaffFile } from '/@/api/hr/Induction'
import { Postidcard, PostUploadFile } from '/@/api/upload/upload'
const uploadRef = ref()
const store = useCommonStore() //记得加这一句

// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined, num: number) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        let isReturn = true
        let isFamily = true
        if (!data.formTrue.phoneTrue || !data.formTrue.BankTrue || !data.formTrue.contactTrue) {
          ElMessage.error('请确认手机号、银行卡号、紧急联系人联系方式是否已确认')
          return
        }
        data.ruleForm.FamilySituations.forEach((val: any) => {
          if (!val.Telephone) {
            isFamily = false
          }
        })
        if (!isFamily) {
          ElMessage.error('请点击确认家庭情况手机号')
          return
        }
        data.ruleForm.StaffProInfos.forEach((val: any) => {
          if (!val.isShow) {
            isReturn = false
          }
        })
        if (!isReturn) {
          ElMessage.error('请点击确认职业信息证明人及联系方式')
          return
        }
        var arr = {
          Staff: JSON.parse(JSON.stringify(data.ruleForm)),
          FamilySituations: [],
          StaffProInfos: []
        }
        arr.Staff.Sex == '男' ? (arr.Staff.Sex = '1') : (arr.Staff.Sex = '2')
        arr.FamilySituations = arr.Staff.FamilySituations
        arr.StaffProInfos = arr.Staff.StaffProInfos
        delete arr.Staff.FamilySituations
        delete arr.Staff.StaffProInfos
        PostInsertStaffFile(arr).then(async (res) => {
          if (res.code == 1) {
            ElMessage({
              message: res.message,
              type: 'success'
            })
            await GetContractManagementInfoEvent(data, 2)
            // data.isView = false
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    })
  }
  // 身份证识别
  const PostidcardEvent = (arr: any) => {
    Postidcard(arr).then((res) => {
      if (res.code == 1) {
        data.ruleForm = Object.assign(data.ruleForm, res.data)
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 上传文件
  const PostUploadFileEvent = (type: string) => {
    var arr = {
      file: '',
      side: type
    }
    var fileData = new FormData()
    if (type == 'front') {
      fileData.append('files', data.UserIdFront.raw)
    } else if (type == 'back') {
      fileData.append('files', data.UserIdBack.raw)
    } else if (type == 'Education') {
      fileData.append('files', data.Education.raw)
    } else if (type == 'CertificateFile') {
      fileData.append('files', data.CertificateFile.raw)
    } else if (type == 'DriveFile') {
      fileData.append('files', data.DriveFile.raw)
    } else if (type == 'OtherFile') {
      fileData.append('files', data.OtherFile.raw)
    }
    PostUploadFile({ type: 'HR', data: fileData }).then((res) => {
      if (res.code == 1) {
        res.data.PathList.forEach((val: any) => {
          if (val.State) arr.file = val.Path
        })
        if (type == 'front') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.IdCardFrontFilePath = val.Path
          })
          PostidcardEvent(arr)
        } else if (type == 'back') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.IdCardBackFilePath = val.Path
          })
          PostidcardEvent(arr)
        } else if (type == 'Education') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.EducationFile = val.Path
          })
        } else if (type == 'CertificateFile') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.CertificateFile = val.Path
          })
        } else if (type == 'DriveFile') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.DriveFile = val.Path
          })
        } else if (type == 'OtherFile') {
          res.data.PathList.forEach((val: any) => {
            if (val.State) data.ruleForm.OtherFile = val.Path
          })
        }
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 根据上传文件拼接路径
  const remoteUrlEvent = (url: string) => {
    return remoteUrl(url)
  }
  //监听身份证正面上传选中
  const handleChange = (val: any, _list: any) => {
    data.UserIdFront = val
    PostUploadFileEvent('front')
  }
  // 监听身份证背面照
  const handleTwoChange = (val: any) => {
    data.UserIdBack = val
    PostUploadFileEvent('back')
  }
  //监听学历证明
  const EducationFileHandleChange = (val: any, _list: any) => {
    data.Education = val
    PostUploadFileEvent('Education')
  }
  //监听资格证书
  const CertificateFileHandleChange = (val: any, _list: any) => {
    data.CertificateFile = val
    PostUploadFileEvent('CertificateFile')
  }
  //监听驾驶证
  const DriveFileHandleChange = (val: any, _list: any) => {
    data.DriveFile = val
    PostUploadFileEvent('DriveFile')
  }
  //监听其它文件
  const OtherFileHandleChange = (val: any, _list: any) => {
    data.OtherFile = val
    PostUploadFileEvent('OtherFile')
  }
  const dateTimeChange = (val: any, item: any) => {
    item.InductionBeginDate = val[0]
    item.InductionEndDate = val[1]
  }

  //校验
  const rules = reactive<FormRules>({
    Name: [{ required: true, message: '请填写姓名', trigger: 'blur' }],
    Sex: [{ required: true, message: '请填写性别', trigger: 'blur' }],
    Nationality: [{ required: true, message: '请填写民族', trigger: 'blur' }],
    IdCard: [{ required: true, message: '请填写身份证号', trigger: 'blur' }],
    Age: [{ required: true, message: '请填写年龄', trigger: 'blur' }],
    IdCardOffice: [{ required: true, message: '请填写发证机构', trigger: 'blur' }],
    IdCardterm: [{ required: true, message: '请填写有效期限', trigger: 'blur' }],
    HomeAddress: [{ required: true, message: '请填写家庭地址', trigger: 'blur' }],
    PhoneNumber: [
      { required: true, message: '请填写手机号码', trigger: 'blur' },
      {
        validator: isMobileTel,
        message: '手机号码格式不正确',
        trigger: 'change'
      }
    ],
    VXNumber: [{ required: true, message: '请填写微信号码', trigger: 'blur' }],
    QQNumber: [{ required: true, message: '请填写QQ号码', trigger: 'blur' }],
    ComeDate: [{ required: true, message: '请选入职时间', trigger: 'change' }],
    Email: [
      { required: true, message: '请填写邮箱', trigger: 'blur' },
      {
        validator: isEmail,
        message: '邮箱格式不正确',
        trigger: 'change'
      }
    ],
    PoliticalOutlook: [{ required: true, message: '请选择政治面貌', trigger: 'change' }],
    SocialSecurity: [{ required: true, message: '请选择社保情况', trigger: 'change' }],
    DrivingLicense: [{ required: true, message: '请选择驾驶情况', trigger: 'change' }],
    LiveArea: [{ required: true, message: '请选择居住范围', trigger: 'change' }],
    Education: [{ required: true, message: '请选择最高学历', trigger: 'change' }],
    Graduation: [{ required: true, message: '请选择毕业方式', trigger: 'change' }],
    GraduationDate: [{ required: true, message: '请填写毕业时间', trigger: 'change' }],
    Colleges: [{ required: true, message: '请填写毕业院校', trigger: 'blur' }],
    Professional: [{ required: true, message: '请填写专业', trigger: 'blur' }],
    NativePlace: [{ required: true, message: '请填写籍贯', trigger: 'blur' }],
    OpeningBank: [{ required: true, message: '请填写开户行', trigger: 'blur' }],
    BankCard: [
      { required: true, message: '请填写银行卡号', trigger: 'blur' },
      {
        validator: isBankCard,
        message: '银行卡号格式不正确',
        trigger: 'change'
      }
    ],
    DishonestyRecord: [{ required: true, message: '请选择失信记录', trigger: 'change' }],
    LaborDispute: [{ required: true, message: '请选择劳务纠纷', trigger: 'change' }],
    CriminalRecord: [{ required: true, message: '请选择犯罪记录', trigger: 'change' }],
    LegalDisputes: [{ required: true, message: '请选择法律纠纷', trigger: 'change' }],
    FamilyRelat: [{ required: true, message: '请填写家庭关系', trigger: 'blur' }],
    Brith: [{ required: true, message: '请填写家庭生日', trigger: 'blur' }],
    Profession: [{ required: true, message: '请填写家庭职业', trigger: 'blur' }],
    EmergencyName: [{ required: true, message: '请填写紧急联系人姓名', trigger: 'blur' }],
    EmergencyRelation: [{ required: true, message: '请填写紧急联系人关系', trigger: 'blur' }],
    EmergencyNumber: [{ required: true, message: '请填写紧急联系人联系方式', trigger: 'blur' }],
    time: [{ required: true, message: '请选择职业信息时间', trigger: 'change' }],
    EducationFile: [{ required: true, message: '请上传学历证书', trigger: 'change' }],
    CompanyName: [{ required: true, message: '请填写职业信息离职公司', trigger: 'blur' }],
    QuitReason: [{ required: true, message: '请填写职业信息离职原因', trigger: 'blur' }],
    QuitNameorNumber: [{ required: true, message: '请填写职业信息离职证明人及联系人', trigger: 'blur' }]
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
    ruleFormRef,
    uploadRef,
    EducationFileHandleChange,
    CertificateFileHandleChange,
    DriveFileHandleChange,
    OtherFileHandleChange,
    handleChange,
    handleTwoChange,
    PostidcardEvent,
    remoteUrlEvent,
    dateTimeChange
  }
}
// 窗口事件
const window = (data: any) => {
  // 步骤
  const stepEvent = (num: number) => {
    data.step = num
  }
  // 页面样式
  const boxStyle = reactive({
    boxWidth: 'w-1100',
    boxHeight: ''
  })
  const CodeFormWindowEvent = () => {
    data.CodeFormWindow.Uid = `${import.meta.env.VITE_HR_H5}#/?uid=` + data.ruleForm.Uid
    data.CodeFormWindow.view = true
  }
  return { stepEvent, boxStyle, CodeFormWindowEvent }
}
// 页面进入
const GetContractManagementInfoEvent = async (data: any, type: any) => {
  GetFileStaffInfo().then((val: any) => {
    if (val.code == 1) {
      if (val.data != 0) {
        var arr = {
          Id: val.data,
          DealWith: '2'
        }
        PostGetStaffManagementInfo(arr).then((res) => {
          if (res.code == 1) {
            data.details = res.data
            if (type && type == 2) {
              data.CodeFormWindow.Uid = `${import.meta.env.VITE_HR_H5}#/?uid=` + res.data.info.Uid
              data.CodeFormWindow.view = true
            }
            if (JSON.stringify(data.details) != '{}') {
              if (data.details.info) {
                data.details.info.Id = val.data
                data.ruleForm = data.details.info
              }
              data.ruleForm.StaffId = data.ruleForm.Id
              if (!data.details.FamilySituations) {
                data.ruleForm.FamilySituations = [
                  {
                    Telephone: false,
                    FamilyRelat: '',
                    Name: '',
                    Brith: '',
                    PhoneNumber: '',
                    Profession: ''
                  },
                  {
                    FamilyRelat: '',
                    Name: '',
                    Brith: '',
                    PhoneNumber: '',
                    Profession: ''
                  }
                ]
              } else {
                data.ruleForm.FamilySituations = data.details.FamilySituations
              }
              if (!data.details.StaffProInfos) {
                data.ruleForm.StaffProInfos = [
                  {
                    isShow: false,
                    CompanyName: '',
                    InductionBeginDate: '',
                    InductionEndDate: '',
                    QuitReason: '',
                    QuitNameorNumber: ''
                  }
                ]
              } else {
                data.ruleForm.StaffProInfos = data.details.StaffProInfos
                data.ruleForm.StaffProInfos.forEach((element: any) => {
                  element.time = [element.InductionBeginDate, element.InductionEndDate]
                })
              }
            }
          } else {
            ElMessage.error(res.message)
          }
        })
      }
    } else {
      ElMessage.error(res.message)
    }
  })
  // 获取性别数据
  store.getDict('sys_user_gender').then((res: any) => {
    data.gender = res
  })
  // 系统有无（驾照情况）
  store.getDict('sys_have_no').then((res: any) => {
    data.haveNoOptions = res
  })
  //获取政治面貌的字典
  store.getDict('hr_archive_zzmm').then((res: any) => {
    console.log(res)
    data.PoliticalOutlook = res
  })
  //获取社保情况的字典
  store.getDict('social_security').then((res: any) => {
    console.log(res)
    data.SocialSecurity = res
  })
  //获取驾照的字典
  store.getDict('sys_have_no').then((res: any) => {
    console.log(res)
    data.DrivingLicense = res
  })
  //获取居住范围
  store.getDict('register_distance_range').then((res: any) => {
    console.log(res)
    data.LiveArea = res
  })
  //获取最高学历
  store.getDict('bffm_hr_education').then((res: any) => {
    console.log(res)
    data.highestEducation = res
  })
  // 获取毕业方式
  store.getDict('graduation_mode').then((res: any) => {
    console.log(res)
    data.Graduation = res
  })
}

export default defineComponent({
  components: {
    OpenWindow,
    OrgTreeDrawer,
    CodeForm
  },
  emits: ['closeWindow'],
  props: {
    // 用户Id
    Id: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      details: {},
      isView: true, //是否显示页面
      Type: '',
      // 身份证正面
      UserIdFront: {
        PathList: '' //图片路径
      },
      // 身份证背面
      UserIdBack: {
        PathList: '' //图片路径
      },
      Education: {}, //学历证明
      CertificateFile: {}, //资格证书
      DriveFile: {}, //驾驶证
      OtherFile: {}, //其他文件
      // （true不 false是 是否修改）
      isEdit: true,
      //工作经历
      workList: [
        {
          time: '2020.01-2022.02',
          Name: '潍坊曙光大数据有限公司',
          aa: '',
          dd: ''
        },
        {
          time: '2020.01-2022.02',
          Name: '潍坊曙光大数据有限公司',
          aa: '',
          dd: ''
        }
      ],
      // 二维码弹窗
      CodeFormWindow: {
        view: false
      },
      // 政治面貌
      PoliticalOutlook: [],
      // 社保情况
      SocialSecurity: [],
      // 驾照
      DrivingLicense: [],
      // 居住范围
      LiveArea: [],
      // 最高学历
      highestEducation: [],
      // 毕业方式
      Graduation: [],
      step: 1, //步骤
      ruleForm: {
        PoliticalOutlook: null,
        // Staff: {
        //   StaffId: props.Id,
        //   IdCardFrontFilePath: '', //身份证正面
        //   IdCardBackFilePath: '', //身份证反面
        //   PhoneNumber: '', //电话
        //   Age: '', //年龄
        //   HomeAddress: '',
        //   Birth: '',
        //   IdCardterm: '',
        //   IdCard: '',
        //   Name: '',
        //   Nationality: '',
        //   IdCardOffice: '',
        //   Sex: '',
        //   PoliticalOutlook: '', //政治面貌
        //   SocialSecurity: '', //社保情况
        //   DrivingLicense: '', //驾驶情况
        //   LiveArea: '', //居住范围
        //   Education: '', //最高学历
        //   Graduation: '', //毕业方式
        //   GraduationDate: '', //毕业时间
        //   Colleges: '', //毕业院校
        //   Professional: '', //专业
        //   NativePlace: '' //籍贯
        // },

        // 家庭情况
        FamilySituations: [
          {
            Telephone: false,
            FamilyRelat: '',
            Name: '',
            Brith: '',
            PhoneNumber: '',
            Profession: ''
          },
          {
            FamilyRelat: '',
            Name: '',
            Brith: '',
            PhoneNumber: '',
            Profession: ''
          }
        ],
        // 职业信息
        StaffProInfos: [
          {
            isShow: false,
            CompanyName: '',
            InductionBeginDate: '',
            InductionEndDate: '',
            QuitReason: '',
            QuitNameorNumber: ''
          }
        ]
      },
      // 查看详情Id
      url: props.Id,
      haveNoOptions: [], //系统有无
      formTrue: {
        phoneTrue: false,
        Telephone: false,
        BankTrue: false,
        contactTrue: false,
        witnessTrue: false
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 添加工作经历
    const addWork = () => {
      var arr = {
        isShow: false,
        QuitReason: '',
        CompanyName: '',
        QuitNameorNumber: ''
      }
      data.ruleForm.StaffProInfos.push(arr)
    }
    const addFamily = () => {
      var arr: any = {
        Telephone: false,
        FamilyRelat: '',
        Name: '',
        Brith: '',
        PhoneNumber: '',
        Profession: ''
      }
      data.ruleForm.FamilySituations.push(arr)
    }

    // 确认手机号
    const phoneTrue = () => {
      ElMessageBox.confirm('请确认手机号是否正确', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (!/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(data.ruleForm.PhoneNumber)) {
            ElMessage.error('手机号填写格式不正确')
            return
          }
          ElMessage({
            type: 'success',
            message: '确认成功'
          })

          data.formTrue.phoneTrue = true
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消确认'
          })
        })
    }

    // 确认银行卡号
    const BankTrue = () => {
      ElMessageBox.confirm('请确认银行卡号是否正确', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (!/^([1-9]{1})(\d{8,27})$/.test(data.ruleForm.BankCard)) {
            ElMessage.error('银行卡号填写格式不正确')
            return
          }
          ElMessage({
            type: 'success',
            message: '确认成功'
          })

          data.formTrue.BankTrue = true
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消确认'
          })
        })
    }

    // 确认联系人方式
    const contactTrue = () => {
      ElMessageBox.confirm('请确认联系人信息是否正确', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          if (!/^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/.test(data.ruleForm.EmergencyNumber)) {
            ElMessage.error('手机号填写格式不正确')
            return
          }
          ElMessage({
            type: 'success',
            message: '确认成功'
          })
          data.formTrue.contactTrue = true
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消确认'
          })
        })
    }
    // 确认家庭关系
    const phoneEvent = (index: any) => {
      ElMessageBox.confirm('请确认证明人信息是否正确', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '确认成功'
          })

          data.ruleForm.FamilySituations[index].Telephone = true
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消确认'
          })
        })
    }
    // 确认证明人方式
    const witnessTrue = (index: any) => {
      ElMessageBox.confirm('请确认证明人信息是否正确', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          ElMessage({
            type: 'success',
            message: '确认成功'
          })

          data.ruleForm.StaffProInfos[index].isShow = true
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消确认'
          })
        })
    }

    //
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
    })

    return {
      addFamily,
      witnessTrue,
      phoneEvent,
      contactTrue,
      BankTrue,
      data,
      ElOption,
      ElSelect,
      addWork,
      closeWindow,
      ...formEvent(data, closeWindow),
      ...window(data),
      // ...getDict(data),
      phoneTrue
    }
  }
})
</script>

<style lang="postcss" scoped>
.h-vh {
  height: 100vh;
}
.userId-bg {
  width: 11.75rem;
  height: 8.4375rem;
}
.w-70 {
  width: 70px;
}
:deep(.el-upload--picture-card) {
  width: 100%;
  height: 100%;
}
:deep(.el-select) {
  width: 100%;
}
:deep(.el-upload-list--picture-card .el-upload-list__item) {
  display: none;
}
:deep(.el-radio) {
  margin-right: 0.625rem;
}
:deep(.el-radio .el-radio--large) {
  height: 0;
}
:deep(.el-form-item__label) {
  font-weight: bold;
  color: var(--el-text-color-primary);
}
:deep(.el-input-group__append) {
  width: 70px;
  background: var(--el-color-primary) !important;
  padding: 0;
  text-align: center;
  color: #fff;
}
:deep(.el-form-item) {
  margin-bottom: 18px;
}
:deep(.el-date-editor.el-input, .el-date-editor.el-input__wrapper) {
  height: var(--el-input-height, var(--el-component-size));
  width: 100%;
}
</style>
