<template>
  <div class="RookieProgramForm">
    <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="新人训计划">
      <template #topBtn>
        <el-button type="primary" size="small" @click="submitForm(ruleFormRef)">保存</el-button>
      </template>
      <div class="bf-window-padding">
        <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="80px" hide-required-asterisk>
          <div class="flex items-center">
            <el-form-item label="计划类型" prop="store.Category" :rules="rules.Category">
              <el-select v-model="data.ruleForm.store.Category" placeholder="请选择" style="width: 130px">
                <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.planType" />
              </el-select>
            </el-form-item>
            <el-form-item label="计划关卡" prop="store.Stage" :rules="rules.Stage">
              <el-select v-model="data.ruleForm.store.Stage" placeholder="请选择" style="width: 130px" @change="handleChangeStage">
                <el-option :label="item['DicValue']" :value="item['DicKey']" v-for="item in data.panStage" />
              </el-select>
            </el-form-item>
            <el-link :underline="false" type="primary" class="-mt-3 ml-2 w-20" @click="data.UploadWindow.view = true">上传封面</el-link>
            <el-form-item label="启用时间" prop="store.StartTime" :rules="rules.StartTime">
              <el-date-picker v-model="data.ruleForm.store.StartTime" type="date" placeholder="请选择" style="width: 145px" />
            </el-form-item>
            <el-form-item label="面向岗位" prop="store.PostIds" :rules="rules.PostIds">
              <el-select v-model="data.ruleForm.store.PostIds" multiple collapse-tags collapse-tags-tooltip placeholder="请选择">
                <el-option :label="item['PostName']" :value="item['Id']" v-for="item in data.CoursewareCodeType" />
              </el-select>
            </el-form-item>
          </div>
        </el-form>

        <el-tabs v-model="data.activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane :label="item.title" :name="item.Id" v-for="(item, index) in data.ruleForm.courses" :key="index">
            <div class="flex">
              <!-- <el-form-item label="计划主题">
                <el-input v-model="data.ruleForm.courses[index].singlePlan.Name" placeholder="请输入计划主题(30字以内)" class="w-r-500" />
              </el-form-item> -->
              <el-form-item label="计划主题">
                <el-input v-model="item.singlePlan.Name" placeholder="请输入计划主题(30字以内)" class="w-r-500" />
              </el-form-item>
              <el-button class="ml-2" @click="openUploadTwoWindow(item.singlePlan)">上传封面</el-button>
            </div>
            <div>
              <div class="flex justify-between items-center">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <div class="m-hr bf-bg-blue-color"></div>
                    <div class="leading-none ml-2 font-semibold">基础信息</div>
                  </div>
                </div>
                <div class="flex">
                  <el-button type="primary" @click="openselectCoursewareWindowEvent(item)">选择课程</el-button>
                  <el-button class="ml-2" v-if="item.autocheck == true" @click="item.autocheck = !item.autocheck">关闭批量</el-button>
                  <el-button class="ml-2" v-else @click="item.autocheck = !item.autocheck">开启批量</el-button>
                </div>
              </div>

              <div class="border mt-2 Courseware">
                <el-table :data="item.plancourses" style="width: 100%">
                  <el-table-column type="index" label="序号" width="50" align="center" />
                  <el-table-column prop="Name" label="课程名称" align="center" />
                  <el-table-column prop="StudyTime" label="学习时长" align="center" width="70" />
                  <el-table-column prop="address" label="学习段" align="center" width="60">
                    <template #default="scope">
                      <el-select v-model="scope.row.Stage" @change="batchEvent(index, scope.row.Stage, 'Stage')" clearable>
                        <el-option :value="1" label="上午" />
                        <el-option :value="2" label="下午" />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="学习设置" align="center">
                    <el-table-column prop="" label="刷题" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'TestCount'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" :min="0" style="width: 100%" v-model="scope.row.TestCount" @input="batchEvent(index, scope.row.TestCount, 'TestCount')"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="考试" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'scope.row.ExamCount'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" :min="0" style="width: 100%" v-model="scope.row.ExamCount" @input="batchEvent(index, scope.row.ExamCount, 'ExamCount')"></el-input>
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="笔记" width="40" align="center">
                      <template #default="scope">
                        <el-switch @change="batchEvent(index, scope.row.Note, 'Note')" :active-value="1" :inactive-value="0" v-model="scope.row.Note" />
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column prop="address" label="试题设置" align="center">
                    <el-table-column prop="address" label="单选" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'scope.row.SingleCount'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.SingleCount, 'SingleCount')" v-model="scope.row.SingleCount" :min="0" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="分数" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'scope.row.SingleScore'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.SingleScore, 'SingleScore')" v-model="scope.row.SingleScore" :min="0" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="多选" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'scope.row.MultipleCount'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.MultipleCount, 'MultipleCount')" v-model="scope.row.MultipleCount" :min="0" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="分数" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'scope.row.MultipleScore'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.MultipleScore, 'MultipleScore')" v-model="scope.row.MultipleScore" :min="0" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="判断" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'scope.row.JudgeCount'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.JudgeCount, 'JudgeCount')" v-model="scope.row.JudgeCount" :min="0" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                    <el-table-column prop="address" label="分数" width="40" align="center">
                      <template #default="scope">
                        <el-form-item :prop="'scope.row.JudgeScore'" style="margin-bottom: 0px">
                          <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.JudgeScore, 'JudgeScore')" v-model="scope.row.JudgeScore" :min="0" />
                        </el-form-item>
                      </template>
                    </el-table-column>
                  </el-table-column>
                  <el-table-column prop="name" label="合格线" align="center" width="50">
                    <template #default="scope">
                      <el-form-item :prop="'scope.row.MinScore'" style="margin-bottom: 0px">
                        <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.MinScore, 'MinScore')" v-model="scope.row.MinScore" :min="0" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="考试时长" align="center" width="80">
                    <template #default="scope">
                      <el-form-item :prop="'scope.row.ExamTime'" style="margin-bottom: 0px">
                        <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" @input="batchEvent(index, scope.row.ExamTime, 'ExamTime')" v-model="scope.row.ExamTime" :min="0" />
                      </el-form-item>
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="排序" align="center" width="40">
                    <template #default="scope">
                      <el-input type="number" :min="1" style="width: 100%" v-model="scope.row.Sort"></el-input>
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="操作" align="center" width="60">
                    <template #default="scope">
                      <div @click="handleDeleteBodyMiddleTr(item.plancourses, scope.$index)" class="cursor-pointer">删除</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between">
                <div class="flex items-center">
                  <div class="m-hr bf-bg-blue-color"></div>
                  <div class="leading-none ml-2 font-semibold">大考设置</div>
                </div>
              </div>
              <div class="mt-2 bg-bigTest p-2 bf-search-formItem flex items-center form-item-fontSize">
                <el-form-item label="单选题数" prop="Name">
                  <el-input v-model="item.singlePlan.SingleCount" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="单选分数" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.SingleScore" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="多选题数" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.MultipleCount" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="多选分数" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.MultipleScore" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="判断题数" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.JudgeCount" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="判断分数" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.JudgeScore" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="大考总数" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.ExamScore" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="合格分数" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.MinScore" placeholder="" class="w-r-50" />
                </el-form-item>
                <el-form-item label="考试时长" prop="Name" class="ml-2">
                  <el-input v-model="item.singlePlan.ExamTime" placeholder="" class="w-r-50" />
                </el-form-item>
              </div>
            </div>
            <div class="mt-4">
              <div class="flex justify-between items-center">
                <div class="flex justify-between">
                  <div class="flex items-center">
                    <div class="m-hr bf-bg-blue-color"></div>
                    <div class="leading-none ml-2 font-semibold">实操设置</div>
                  </div>
                </div>
                <div class="flex">
                  <el-dropdown @command="choiceMorning">
                    <el-button type="primary">
                      <span v-if="data.typeMorning == 1">上午</span>
                      <span v-else>下午</span>
                      <el-icon>
                        <el-icon-arrow-down />
                      </el-icon>
                    </el-button>
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item command="1">上午</el-dropdown-item>
                        <el-dropdown-item command="2">下午</el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <el-button class="ml-2" @click="AddList(item.options, index)">新增</el-button>
                </div>
              </div>

              <div class="border mt-2 tableclass">
                <el-table :data="item.options" style="width: 100%" max-height="280">
                  <el-table-column prop="date" label="实操项目" align="center">
                    <template #default="scope">
                      <el-select v-model="scope.row.MoneyCategory" placeholder="请输入">
                        <el-option v-for="item in data.practicalItem" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="时段" align="center">
                    <template #default="scope">
                      <span v-if="scope.row.Stage == 1">上午</span>
                      <span v-else>下午</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="最低考核量/部分分解(个)" align="center" width="160px">
                    <template #default="scope">
                      <el-input v-model="scope.row.Count" placeholder="请填写" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="A级/拆解(个/元)" align="center">
                    <template #default="scope">
                      <el-input v-model="scope.row.UnitA" placeholder="请填写" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="B级/组装(个/元)" align="center">
                    <template #default="scope">
                      <el-input v-model="scope.row.UnitB" placeholder="请填写" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="C级/小结(个/元)" align="center">
                    <template #default="scope">
                      <el-input v-model="scope.row.UnitC" placeholder="请填写" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="D级/小结(个/元)" align="center">
                    <template #default="scope">
                      <el-input v-model="scope.row.UnitD" placeholder="请填写" />
                    </template>
                  </el-table-column>
                  <el-table-column prop="" label="操作" align="center" width="60">
                    <template #default="scope">
                      <div class="cursor-pointer" @click="deldeList(item.options, scope.$index)">删除</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </OpenWindow>
    <selectCourseware v-if="data.selectCoursewareWindow.view" @closeWindow="data.selectCoursewareWindow.view = false" @CoursewareDetails="CoursewareDetails" :IsNewest="1"> </selectCourseware>
    <!-- 上传计划封面图片 -->
    <Upload :uploadFileData="data.ImgUrl" @uploadFileData="uploadFileDataEvent" v-if="data.UploadWindow.view" @closeWindow="data.UploadWindow.view = false" title="上传证明材料"> </Upload>
    <!-- 上传计划主题图片 -->
    <Upload :uploadFileData="data.UploadTwoWindow.info.ImgUrlList" @uploadFileData="uploadFileEvent" v-if="data.UploadTwoWindow.view" @closeWindow="data.UploadTwoWindow.view = false" title="上传证明材料"> </Upload>
  </div>
</template>

<script lang="ts">
import { convertToChinaNum } from '/@/utils/tools'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import selectCourseware from './selectCourseware.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext } from 'vue'
import Upload from '/@/components/Upload/Index.vue'
import { ElNotification } from 'element-plus'
import { ElMessage, FormInstance, FormRules, TabsPaneContext } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
import { GetAllSysPostList, GetWorkCourseFinishedEntity, PostEditWorkCourseFinishedSave } from '/@/api/hr/CourseDevelop'
import { parseTime, remoteUrl } from '/@/utils/tools'
import { GetNewGetNewestPlanStoreById, PostNewAddNewestPlanStore, PostNewEditNewestPlanStore } from '/@/api/hr/LearningPlan'
const store = useCommonStore() //记得加这一句
const GetContractManagementInfoEvent = async (data: any) => {
  if (data.Id) {
    GetNewGetNewestPlanStoreById(data.Id).then((res: any) => {
      if (res.code == 1) {
        data.ImgUrl = [{ Path: res.data.store.Poster }]
        res.data.store.PostIds = JSON.parse(res.data.store.PostIds)
        data.ruleForm = res.data
        console.log(res)
        // data.WorkloadSettingList = res.data.courses[0].options
        if (data.ruleForm.courses.length > 0) {
          data.ruleForm.courses.forEach((element: any) => {
            ;(element.title = '第' + convertToChinaNum(element.singlePlan.TimeSort) + '天'), (element.Id = element.singlePlan.TimeSort)
          })
          data.activeName = data.ruleForm.courses[0].singlePlan.TimeSort
        }
        // res.data.CodeType = JSON.parse(res.data.CodeType)
        // res.data.FileList.forEach((element: any) => {
        //   element.name = element.FileName
        //   element.size = element.FileSize
        //   element.url = element.SavePath
        //   element.status = 'success'
        // })
        // data.ruleForm = res.data
      } else {
        ElMessage.error(res.message)
      }
    })
  }
  // 获取计划阶段
  store.getDict('hr_pan_stage').then((res: any) => {
    data.panStage = res
  })
  // 计划类型
  store.getDict('NewestPlanCategory').then((res: any) => {
    data.planType = res
  })

  // 获取面向人员
  GetAllSysPostList().then((res: any) => {
    if (res.code == 1) {
      data.CoursewareCodeType = res.data
    }
  })
}
// 表单事件
const formEvent = (data: any, closeWindow: any) => {
  const ruleFormRef = ref<FormInstance>()
  // 表单提交
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
      if (valid) {
        sumscore()
        for (let i = 0; i < data.ruleForm.courses.length; i++) {
          var singlePlan = data.ruleForm.courses[i].singlePlan
          var courses = data.ruleForm.courses[i].plancourses

          if (!singlePlan.Name) {
            ElNotification({
              title: `计划(${i + 1})警告`,
              position: 'top-right',
              type: 'warning',
              message: `计划主题不能为空`
            })
            return
          }
          if (singlePlan.ExamScore > 100) {
            ElNotification({
              title: `计划(${i + 1})警告`,
              position: 'top-right',
              type: 'warning',
              message: `大考总分超过100分`
            })
            return
          }
          if (singlePlan.ExamScore < 100) {
            ElNotification({
              title: `计划(${i + 1})警告`,
              position: 'top-right',
              type: 'warning',
              message: `大考总分未达到100分`
            })
            return
          }

          if (!singlePlan.MinScore) {
            ElNotification({
              title: `计划(${i + 1})警告`,
              position: 'top-right',
              type: 'warning',
              message: `请输入大考合格分数`
            })
            return
          }
          if (!singlePlan.ExamTime) {
            ElNotification({
              title: `计划(${i + 1})警告`,
              position: 'top-right',
              type: 'warning',
              message: `请输入大考考试时长`
            })
            return
          }

          if (courses.length == 0) {
            ElNotification({
              title: `计划(${i + 1})警告`,
              position: 'top-right',
              type: 'warning',
              message: `请选择学习课程`
            })
            return
          }

          for (let y = 0; y < courses.length; y++) {
            if (!courses[y].Sort) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入排序`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].MinScore) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入合格线`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].JudgeScore) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入判断题分数`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].JudgeCount) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入判断题个数`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].MultipleScore) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入多选题分数`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].MultipleCount) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入多选题个数`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].SingleScore) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入单选题分数`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].SingleCount) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入单选题个数`
              })
              return
            }
            if (!courses[y].ExamCount) {
              if (courses[y].ExamCount != 0) {
                console.log('考试', courses[y].ExamCount)
                ElNotification({
                  title: `计划(${i + 1})警告`,
                  position: 'top-right',
                  type: 'warning',
                  message: `请输入考试`
                })
                return
              }
            }
            if (!courses[y].TestCount) {
              if (courses[y].ExamCount != 0) {
                ElNotification({
                  title: `计划(${i + 1})警告`,
                  position: 'top-right',
                  type: 'warning',
                  message: `请输入刷题`
                })
                return
              }
            }
            if (courses[y].ExamCount != 0 && !courses[y].StudyTime) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入学习时长`
              })
              return
            }
            if (courses[y].ExamCount != 0 && !courses[y].ExamTime) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `请输入考试时长`
              })
              return
            }
            if (courses[y].ExamCount != 0 && courses[y].ExamScore > 100) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `总分超过100分`
              })
              return
            }
            if (courses[y].ExamCount != 0 && courses[y].ExamScore < 100) {
              ElNotification({
                title: `计划(${i + 1})警告`,
                position: 'top-right',
                type: 'warning',
                message: `总分未达到100分`
              })
              return
            }
          }
        }
        console.log(data.ruleForm)
        console.log(data.WorkloadSettingList)
        var arr = JSON.parse(JSON.stringify(data.ruleForm))
        arr.store.PostIds = JSON.stringify(arr.store.PostIds)
        console.log(arr)
        // return
        if (data.Id) {
          PostNewEditNewestPlanStore(arr).then((res) => {
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
        } else {
          PostNewAddNewestPlanStore(arr).then((res) => {
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
      }
    })
  }
  //校验
  const rules = reactive<FormRules>({
    Name: [{ required: true, message: '请输入客戶名称', trigger: 'blur' }],
    Category: [
      {
        required: true,
        message: '请选择计划类型',
        trigger: 'change'
      }
    ],
    Stage: [
      {
        required: true,
        message: '请选择计划阶段',
        trigger: 'change'
      }
    ],
    StartTime: [
      {
        required: true,
        message: '请选择启用时间',
        trigger: 'change'
      }
    ],
    PostIds: [
      {
        required: true,
        message: '请选择面试岗位',
        trigger: 'change'
      }
    ]
  })
  // 监听课件选中
  const CoursewareDetails = (val: any) => {
    console.log(val)
    var arr = data.details.plancourses || []
    var i = 1
    val.forEach((item: any) => {
      if (arr.findIndex((x: any) => x.CoursewareId == item.Id) == -1) {
        arr.push({
          CoursewareId: item.Id,
          Name: item.Name, //课件名称
          CoursewareNo: item.No, //课件编号
          StudyTime: item.MinMinutes, //课件最低学习时间
          CoursewareClass: item.Class, //课件类型
          Note: 0, //是否笔记 0 否 1 是
          Stage: 1, //时间段 1上午 2下午
          TestCount: 0, //刷题次数
          ExamCount: 0, //考试次数
          Sort: i,
          SingleCount: 0,
          SingleScore: 0,
          MultipleCount: 0,
          MultipleScore: 0,
          JudgeCount: 0,
          JudgeScore: 0,
          AQCount: 0,
          AQScore: 0,
          MinScore: 0,
          ExamScore: 0,
          ExamTime: 0
        })
        i++
      }
    })
    data.details.plancourses = arr
    console.log(data.details.plancourses)
  }
  // 计算考试分数
  const sumscore = () => {
    for (let i = 0; i < data.ruleForm.courses.length; i++) {
      for (let y = 0; y < data.ruleForm.courses[i].plancourses.length; y++) {
        data.ruleForm.courses[i].plancourses[y].ExamScore = data.ruleForm.courses[i].plancourses[y].SingleCount * data.ruleForm.courses[i].plancourses[y].SingleScore + data.ruleForm.courses[i].plancourses[y].MultipleCount * data.ruleForm.courses[i].plancourses[y].MultipleScore + data.ruleForm.courses[i].plancourses[y].JudgeCount * data.ruleForm.courses[i].plancourses[y].JudgeScore
      }
    }
  }
  const openselectCoursewareWindowEvent = (val: any) => {
    data.selectCoursewareWindow.view = true
    data.details = val
  }
  // 计划阶段监听
  const handleChangeStage = (val: any) => {
    data.ruleForm.courses = []
    for (var i = 0; i < val; i++) {
      data.ruleForm.courses.push({
        title: '第' + convertToChinaNum(i + 1) + '天',
        Id: i,
        options: [],
        // data.WorkloadSettingList
        autocheck: false,
        plancourses: [],
        timeArray: Number(i + 1),
        singlePlan: {
          TimeSort: i + 1,
          SingleCount: 0,
          SingleScore: 0,
          MultipleCount: 0,
          MultipleScore: 0,
          JudgeCount: 0,
          JudgeScore: 0,
          AQCount: 0,
          AQScore: 0,
          MinScore: 0,
          ExamScore: 0,
          ExamTime: 0,
          Name: ''
        }
      })
    }
  }
  // 批量设置
  const batchEvent = (index: any, val: any, label: any) => {
    if (data.ruleForm.courses[index].autocheck == true) {
      var obj = JSON.parse(JSON.stringify(data.ruleForm.courses))
      obj[index].plancourses.forEach((item: any) => {
        item[label] = val.replace(/[^\d.]/g, '')
      })
      data.ruleForm.courses = obj
    }
  }
  // 上传封面
  const openUploadTwoWindow = (val: any) => {
    data.UploadTwoWindow.info = val
    if (val.Poster) {
      data.UploadTwoWindow.info.ImgUrlList = [{ Path: val.Poster }]
    }
    data.UploadTwoWindow.view = true
  }
  // 删除课件
  const handleDeleteBodyMiddleTr = (plancourses: any, tabidnex: any) => {
    plancourses.splice(tabidnex, 1)
  }
  // 监听上传照片
  const uploadFileDataEvent = (val: any) => {
    data.ImgUrl = val
    data.ruleForm.store.Poster = val[0].Path
  }
  // 监听上传照片
  const uploadFileEvent = (val: any) => {
    data.UploadTwoWindow.info.ImgUrlList = val
    data.UploadTwoWindow.info.Poster = val[0].Path
  }
  // 时间格式转换
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
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
    remoteUrlEvent,
    uploadFileDataEvent,
    uploadFileEvent,
    CoursewareDetails,
    batchEvent,
    openselectCoursewareWindowEvent,
    handleDeleteBodyMiddleTr,
    handleChangeStage,
    openUploadTwoWindow,
    sumscore
  }
}
export default defineComponent({
  components: {
    OpenWindow,
    selectCourseware,
    Upload
  },
  emits: ['closeWindow'],
  props: {
    // 请假Id
    Id: {
      type: Number,
      default: null
    },
    // 是否修改
    isdisabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context: SetupContext) {
    let data = reactive({
      practicalItem: [], //实操项目
      WorkloadSettingList: [], //实操设置列表
      typeMorning: 1, //实操设置选择  1上午 2下午
      isdisabled: props.isdisabled, //是否禁用上传课件
      panStage: [], //计划阶段
      planType: [], //计划类型
      ImgUrl: [], //上传展示数据
      details: {
        plancourses: []
      }, //当前选中计划详情
      activeName: 0,
      ruleForm: {
        store: {
          Category: '', //计划类型
          PostIds: [], //面向岗位
          Stage: '', //计划阶段
          StartTime: '' //启用时间
        },
        //学习阶段
        courses: [
          {
            title: '第一天',
            Id: 0,
            autocheck: false,
            plancourses: [],
            singlePlan: {
              SingleCount: 0,
              SingleScore: 0,
              MultipleCount: 0,
              MultipleScore: 0,
              JudgeCount: 0,
              JudgeScore: 0,
              AQCount: 0,
              AQScore: 0,
              MinScore: 0,
              ExamScore: 0,
              ExamTime: 0,
              Name: '',
              Poster: ''
            },
            options: []
            // null
          }
        ]
      },
      Id: props.Id,
      //   选择课件弹窗
      selectCoursewareWindow: {
        view: false
      },
      // 打开上传弹窗
      UploadWindow: {
        view: false,
        isShow: false
      },
      // 打开上传弹窗
      UploadTwoWindow: {
        view: false,
        isShow: false,
        info: {
          ImgUrlList: [] //上传主题展示数据
        }
      }
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // tab切换监听
    const handleClick = (tab: TabsPaneContext, event: Event) => {
      console.log(tab, event)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-1070',
      boxHeight: ''
    })

    // 选择上午下午
    const choiceMorning = (val: any) => {
      console.log(val)
      data.typeMorning = val
    }
    //添加列表
    const AddList = (options: any, index: any) => {
      var dedata: any = {
        Stage: data.typeMorning
      }
      options.push(dedata)

      console.log('add', dedata, index)
    }
    ///删除
    const deldeList = (options: any, index: any) => {
      options.splice(index, 1)
      console.log(index)
    }
    //获取字典数据
    const getDictionaryData = (data: any) => {
      //获取新人训实操项目
      store.getDict('newplan_moneycategory').then((res: any) => {
        data.practicalItem = res
      })
    }
    onMounted(() => {
      // 根据Id获取详情
      GetContractManagementInfoEvent(data)
      getDictionaryData(data)
    })
    return {
      boxStyle,
      data,
      closeWindow,
      ...formEvent(data, closeWindow),
      handleClick,
      choiceMorning,
      AddList,
      deldeList
    }
  }
})
</script>

<style lang="postcss" scoped>
.RookieProgramForm {
  .w-r-500 {
    width: 500px !important;
  }
  .w-r-50 {
    width: 60px;
  }
  .m-hr {
    width: 3px;
    height: 16px;
  }
  .form-item-fontSize {
    font-size: 14px;
    :deep(.el-form-item__label) {
      padding: 0 4px 0 0;
    }
  }
  :deep(.el-table th.el-table__cell) {
    -webkit-user-select: none;
    user-select: none;
    background-color: #e6f2ff;
    height: 21px !important;
    padding: 4px 0;
  }
  :deep(.el-table .el-table__cell) {
    height: 40px !important;
  }
  :deep(.el-table .cell) {
    padding: 0 0px;
    color: #333;
  }
  :deep(.el-table td.el-table__cell, .el-table th.el-table__cell.is-leaf) {
    border-bottom: none;
  }
  :deep(.el-table--border .el-table__cell) {
    border-right: none;
  }
  :deep(.el-table--fit) {
    z-index: 0;
  }
  .w-i-240 {
    width: 240px;
  }
  .bg-bigTest {
    background-color: #e6f2ff;
  }
  .Courseware {
    :deep(.el-input__wrapper) {
      padding: 1px 0px;
      box-shadow: none;
    }
  }
  :deep(.el-input__inner) {
    text-align: center;
  }

  :deep(.el-form-item__label) {
    line-height: 48px !important;
  }
  :deep(.el-form-item) {
    margin-bottom: 0 !important;
  }
  :deep(.el-input__inner) {
    border: none !important;
    box-shadow: none !important;
  }
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
}
</style>
