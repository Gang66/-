<template>
  <div class="tech_customerDemand_technicalSettings">
    <el-tabs type="border-card">
      <!-- #region 加价设置 -->
      <el-tab-pane label="加价设置">
        <div class="flex">
          <div class="w-1/3 rounded-md border border-gray-200">
            <p class="text-base pt-3 pb-3 pl-4">组织架构</p>
            <el-divider />
          </div>
          <div class="w-2/3 ml-8">
            <!-- v-for="item in data.categoryList" -->
            <div class="rounded-md border border-gray-200 mb-8 text-sm">
              <p class="text-base pt-3 pb-3 pl-4">常规类</p>
              <el-divider />
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8">
                <p>正常订单</p>
                <p>金额或数量较大</p>
              </div>
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8 text-gray-400">
                <p>未设置</p>
                <p>未设置</p>
              </div>
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8 text-blue-500">
                <p class="cursor-pointer" @click="openWindowNotEnabled()">未启用</p>
                <p class="cursor-pointer" @click="openWindowNotEnabled()">未启用</p>
              </div>
            </div>
            <div class="rounded-md border border-gray-200 mb-8 text-sm">
              <p class="text-base pt-3 pb-3 pl-4">非常规常见类</p>
              <el-divider />
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8">
                <p>正常订单</p>
                <p>金额或数量较大</p>
              </div>
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8 text-gray-400">
                <p>未设置</p>
                <p>未设置</p>
              </div>
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8 text-blue-500">
                <p @click="notEnabled">未启用</p>
                <p @click="notEnabled">未启用</p>
              </div>
            </div>
            <div class="rounded-md border border-gray-200 mb-8 text-sm">
              <p class="text-base pt-3 pb-3 pl-4">非常规非常见类</p>
              <el-divider />
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8">
                <p>正常订单</p>
                <p>金额或数量较大</p>
              </div>
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8 text-gray-400">
                <p>未设置</p>
                <p>未设置</p>
              </div>
              <div class="w-1/3 inline-block text-center pt-4 pb-4 leading-8 text-blue-500">
                <p @click="notEnabled">未启用</p>
                <p @click="notEnabled">未启用</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- #endregion -->
      <!-- #region  基础设置-->
      <el-tab-pane label="基础设置">
        <div class="flex">
          <div class="tech_technicalSettings_settings mr-6 rounded-md border border-gray-200">
            <div class="w-6 h-6 bg-blue-500 rounded-full inline-block text-center leading-6 ml-4 mr-2">
              <span class="text-sm text-white">常</span>
            </div>
            <p class="text-base pt-3 pb-3 inline-block">常规类 <span class="ml-2 mr-2">15% </span> <span class="mr-2">(40% ~ 45%)</span></p>
            <span class="float-right text-blue-500 mr-4 mt-3 cursor-pointer" @click="openWindowBasicEditing()">编辑</span>
            <el-divider />
            <div class="flex">
              <div class="w-1/2 pl-4">
                <p class="text-sm text-gray-400 mt-2 mb-2">金额数量较大</p>
                <p class="text-lg mb-2">15% + 25% = 40%</p>
                <p class="text-lg mb-2">25%</p>
              </div>
              <div style="width: 1px; height: 80px; background: #eeeeee; display: inline-block; margin-top: 10px"></div>
              <div class="w-1/2 pl-4">
                <p class="text-sm text-gray-400 mt-2 mb-2">金额数量正常</p>
                <p class="text-lg mb-2">15% + 30% = 45%</p>
                <p class="text-lg mb-2">30%</p>
              </div>
            </div>
          </div>
          <div class="tech_technicalSettings_settings mr-6 rounded-md border border-gray-200">
            <div class="w-6 h-6 bg-orange-500 rounded-full inline-block text-center leading-6 ml-4 mr-2">
              <span class="text-sm text-white">非</span>
            </div>
            <p class="text-base pt-3 pb-3 inline-block">非常规常见类 <span class="ml-2 mr-2">25% </span> <span class="mr-2">(45% ~ 50%)</span></p>
            <span class="float-right text-blue-500 mr-4 mt-3 cursor-pointer">编辑</span>
            <el-divider />
            <div class="flex">
              <div class="w-1/2 pl-4">
                <p class="text-sm text-gray-400 mt-2 mb-2">金额数量较大</p>
                <p class="text-lg mb-2">25% + 20% = 45%</p>
                <p class="text-lg mb-2">20%</p>
              </div>
              <div style="width: 1px; height: 80px; background: #eeeeee; display: inline-block; margin-top: 10px"></div>
              <div class="w-1/2 pl-4">
                <p class="text-sm text-gray-400 mt-2 mb-2">金额数量正常</p>
                <p class="text-lg mb-2">25% + 25% = 50%</p>
                <p class="text-lg mb-2">25%</p>
              </div>
            </div>
          </div>
          <div class="tech_technicalSettings_settings rounded-md border border-gray-200">
            <div class="w-6 h-6 bg-orange-500 rounded-full inline-block text-center leading-6 ml-4 mr-2">
              <span class="text-sm text-white">非</span>
            </div>
            <p class="text-base pt-3 pb-3 inline-block">非常规非常见类 <span class="ml-2 mr-2">25% </span> <span class="mr-2">( 45% ~ 50% )</span></p>
            <span class="float-right text-blue-500 mr-4 mt-3 cursor-pointer">编辑</span>
            <el-divider />
            <div class="flex">
              <div class="w-1/2 pl-4">
                <p class="text-sm text-gray-400 mt-2 mb-2">金额数量较大</p>
                <p class="text-lg mb-2">25% + 20% = 45%</p>
                <p class="text-lg mb-2">20%</p>
              </div>
              <div style="width: 1px; height: 80px; background: #eeeeee; display: inline-block; margin-top: 10px"></div>
              <div class="w-1/2 pl-4">
                <p class="text-sm text-gray-400 mt-2 mb-2">金额数量正常</p>
                <p class="text-lg mb-2">25% + 25% = 50%</p>
                <p class="text-lg mb-2">25%</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- #endregion -->

      <el-tab-pane label="扩展设置">
        <div class="tech_extendedSettings">
          <!-- #region  重视质量-->
          <div class="border border-gray-200 mb-3">
            <p class="text-base pt-3 pb-3 pl-4">重视质量</p>
            <el-divider />
            <div class="p-4 pt-0">
              <!-- <div class="bf-table-content"> -->
              <el-table :data="data.tableData1" stripe>
                <el-table-column type="index" align="center" width="195">
                  <template #header>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-if="data.QualityEditingShow == 2">编辑</span>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-else>保存</span>
                  </template>
                  <template #default="scope">
                    <div class="text-sm">
                      <span class=""> >=80%</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span class="" v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="scope.row.val" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.ConventionalMoreInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UsuallyLargerInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规非常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UncommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonlyLargeInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <!-- </div> -->
            </div>
          </div>
          <!-- #endregion -->
          <!-- #region  重视价格-->
          <div class="border border-gray-200 mb-3">
            <p class="text-base pt-3 pb-3 pl-4">重视价格</p>
            <el-divider />
            <div class="p-4 pt-0">
              <!-- <div class="bf-table-content"> -->
              <el-table :data="data.tableData1" stripe>
                <el-table-column type="index" align="center" width="195">
                  <template #header>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-if="data.QualityEditingShow == 2">编辑</span>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-else>保存</span>
                  </template>
                  <template #default="scope">
                    <div class="text-sm">
                      <span class=""> >=80%</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span class="" v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="scope.row.val" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.ConventionalMoreInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UsuallyLargerInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规非常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UncommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonlyLargeInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <!-- </div> -->
            </div>
          </div>
          <!-- #endregion -->
          <!-- #region  供货周期-->
          <div class="border border-gray-200 mb-3">
            <p class="text-base pt-3 pb-3 pl-4">供货周期</p>
            <el-divider />
            <div class="p-4 pt-0">
              <!-- <div class="bf-table-content"> -->
              <el-table :data="data.tableData1" stripe>
                <el-table-column type="index" align="center" width="195">
                  <template #header>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-if="data.QualityEditingShow == 2">编辑</span>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-else>保存</span>
                  </template>
                  <template #default="scope">
                    <div class="text-sm">
                      <span class="">正常</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span class="" v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="scope.row.val" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.ConventionalMoreInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UsuallyLargerInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规非常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UncommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonlyLargeInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <!-- </div> -->
            </div>
          </div>
          <!-- #endregion -->
          <!-- #region  付款方式-->
          <div class="border border-gray-200 mb-3">
            <p class="text-base pt-3 pb-3 pl-4">付款方式</p>
            <el-divider />
            <div class="p-4 pt-0">
              <!-- <div class="bf-table-content"> -->
              <el-table :data="data.tableData1" stripe>
                <el-table-column type="index" align="center" width="195">
                  <template #header>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-if="data.QualityEditingShow == 2">编辑</span>
                    <span class="text-blue-400 cursor-pointer" @click="QualityEditingClick()" v-else>保存</span>
                  </template>
                  <template #default="scope">
                    <div class="text-sm">
                      <span class="">无账期</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column prop="" label="常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span class="" v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="scope.row.val" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.ConventionalMoreInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UsuallyLargerInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
                <el-table-column prop="" label="非常规非常用" align="center">
                  <el-table-column prop="" label="一般" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.UncommonGeneralInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                  <el-table-column prop="Absenteeism" label="较大" align="center">
                    <template #default="scope">
                      <div class="text-sm">
                        <span v-if="data.QualityEditingShow == 2">3%</span>
                        <el-input v-model="data.quality.CommonlyLargeInput" placeholder="请输入内容" v-else />
                      </div>
                    </template>
                  </el-table-column>
                </el-table-column>
              </el-table>
              <!-- </div> -->
            </div>
          </div>
          <!-- #endregion -->
        </div>
      </el-tab-pane>
      <!-- #region 技术设置 -->
      <el-tab-pane label="技术设置">
        <div class="pl-4 pr-4 pt-2">
          <div>
            <p class="text-xs pt-3 pb-3 text-gray-400 inline-block mr-3">新增标准</p>
            <el-input v-model="data.standardInput" style="width: 200px" placeholder="输入内容" />
            <el-button type="primary" class="ml-3" plain>确定</el-button>
          </div>
          <p class="text-xs pt-3 pb-3 text-gray-400">更新历史</p>
          <div class="pb-4">
            <div class="pl-4 pr-4 pt-3 text-xs flex" v-for="item in 6">
              <div class="w-3 h-3 mt-1 mr-2 border-4 border-blue-400 rounded-full"></div>
              <div>
                <p class="text-xs text-gray-400">2021-11-23 14:01:15</p>
                <p class="text-sm mt-1">更新日期处理标准为：2880条</p>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
      <!-- #endregion -->
    </el-tabs>
    <!-- 加价设置  未启用 -->
    <NotEnabled title="编辑" v-if="notEnabledOpenData.visible" :FormData="notEnabledOpenData.formData" @closeWindow="closeWindowNotEnabled($event)" />
    <!-- 基础设置  编辑 -->
    <BasicEditing title="编辑" v-if="basicEditingOpenData.visible" :FormData="basicEditingOpenData.formData" @closeWindow="closeWindowBasicEditing($event)" />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import NotEnabled from './_Components/notEnabled.vue'
import BasicEditing from './_Components/BasicEditing.vue'

export default defineComponent({
  components: {
    NotEnabled,
    BasicEditing
  },
  setup() {
    const data = reactive({
      QualityEditingShow: 2, //1能编辑 2不能编辑  重视质量
      categoryList: [],
      standardInput: '',
      tableData1: [{ val: 1 }, { val: 1 }],
      quality: {
        GeneralInput: '',
        ConventionalMoreInput: '',
        CommonGeneralInput: '',
        UsuallyLargerInput: '',
        UncommonGeneralInput: '',
        CommonlyLargeInput: ''
      } //重视质量
    })

    //  加价设置  未启用
    const notEnabledOpen = (data: any) => {
      let notEnabledOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowNotEnabled = (row: any) => {
        notEnabledOpenData.formData = {}
        notEnabledOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowNotEnabled = (type: string) => {
        notEnabledOpenData.visible = false
        if (type == 'submit') data.getData(data.data)
      }

      return {
        notEnabledOpenData,
        openWindowNotEnabled,
        closeWindowNotEnabled
      }
    }
    // 基础设置  编辑
    const basicEditingOpen = (data: any) => {
      let basicEditingOpenData: any = reactive({
        visible: false,
        formData: {}
      })

      //打开弹窗
      const openWindowBasicEditing = (row: any) => {
        basicEditingOpenData.formData = {}
        basicEditingOpenData.visible = true
      }

      //关闭弹窗
      const closeWindowBasicEditing = (type: string) => {
        basicEditingOpenData.visible = false
        // if (type == 'submit') data.getData(data.data)
      }

      return {
        basicEditingOpenData,
        openWindowBasicEditing,
        closeWindowBasicEditing
      }
    }
    // 重视质量编辑
    const QualityEditingClick = () => {
      if (data.QualityEditingShow == 2) {
        data.QualityEditingShow = 1
      } else {
        data.QualityEditingShow = 2
      }
    }

    return {
      data,
      ...notEnabledOpen({ data }),
      ...basicEditingOpen({ data }),
      QualityEditingClick
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech_customerDemand_technicalSettings {
  .el-divider--horizontal {
    width: 94% !important;
    margin: auto;
  }
  .tech_technicalSettings_settings {
    width: 32%;
    .el-divider--horizontal {
      width: 100% !important;
    }
  }
  .tech_extendedSettings {
    .el-divider--horizontal {
      width: 100% !important;
      margin: 0 auto 20px auto;
    }
    :deep(.el-input__inner) {
      color: #409eff !important;
    }
  }
}
</style>
