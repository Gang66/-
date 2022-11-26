<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')">
    <div class="">
      <el-form ref="ruleFormRef" :model="data.ruleForm" :rules="rules" label-width="5em" class="bf-window-padding" hide-required-asterisk label-position="top" :inline="true">
        <el-form-item>
          <el-input v-model="data.ruleForm.AdminInput" placeholder="系统管理员" style="width: 200px" disabled>
            <template #prepend>申请人</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="data.ruleForm.DepartmentInput" placeholder="集团总部" style="width: 200px" disabled>
            <template #prepend>所属部门</template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="data.ruleForm.TimeInput" placeholder="2022-08-25 09:21" style="width: 200px" disabled>
            <template #prepend>申请日期</template>
          </el-input>
        </el-form-item>
        <div class="pt-4 pb-4">
          <span class="text-xs text-gray-500 pl-3 mr-4">报销类型</span>
          <div class="inline-block">
            <el-radio-group v-model="data.costRadio">
              <el-radio-button v-for="item in data.costRadioArr" :key="item.value" :label="item.label" @change="changeCost(item.label)">{{ item.label }} </el-radio-button>
            </el-radio-group>
          </div>
        </div>

        <!-- #region  招待费-->
        <div class="tech_addReimbursement_entertainment" v-if="data.costRadio == '招待费'">
          <el-form-item prop="VisitorInput">
            <el-input v-model="data.ruleForm.VisitorInput" placeholder="请输入来客单位" style="width: 380px">
              <template #prepend>来客单位</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">申请费用</div>
            <el-input-number v-model="data.ruleForm.costInput" :min="0" :max="10" controls-position="right" style="width: 160px"></el-input-number>
          </el-form-item>
          <el-form-item prop="guestsInput">
            <el-input v-model="data.ruleForm.guestsInput" placeholder="陪客人数" style="width: 180px">
              <template #prepend>陪客人数</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="visitorsInput">
            <el-input v-model="data.ruleForm.visitorsInput" placeholder="来客人数" style="width: 180px">
              <template #prepend>来客人数</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="ReceptionTimeInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">招待时间</div>
            <el-date-picker v-model="data.ruleForm.ReceptionTimeInput" type="datetime" placeholder="选择时间" style="width: 160px" />
          </el-form-item>
          <el-form-item prop="RemarksInput" style="width: 640px">
            <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="申请事由" show-word-limit type="textarea" />
          </el-form-item>
          <div class="w-650 border-dashed rounded-md border">
            <div class="p-2">
              <div class="pl-2 pb-2">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                  <i class="iconfont icon-chuangjian"></i>
                  <template #file="{ file }">
                    <div>
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="iconfont icon-fangda"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="iconfont icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="iconfont icon-shanchu"></i>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
              </div>
              <p class="text-xs text-gray-400">说明：一次可上传多张图片，最多支持上传10张。每张图片大小不超过5M，格式为:jpg、gif、png、bmp</p>
            </div>
          </div>
          <div class="text-sm clearfix">
            <div class="float-right p-2 pr-6">
              <el-button @click="closeWindow('close')">取消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
            </div>
          </div>
        </div>
        <!-- #endregion -->
        <!-- #region  礼品费-->
        <div class="tech_addReimbursement_entertainment" v-if="data.costRadio == '礼品费'">
          <el-form-item prop="RecipientInput">
            <el-input v-model="data.ruleForm.RecipientInput" placeholder="请输入受赠单位" style="width: 380px">
              <template #prepend>受赠单位</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">申请费用</div>
            <el-input-number v-model="data.ruleForm.giftCostInput" :min="0" :max="10" controls-position="right" style="width: 160px"></el-input-number>
          </el-form-item>
          <el-form-item prop="NumberGiftsInput">
            <el-input v-model="data.ruleForm.NumberGiftsInput" placeholder="礼品数量" style="width: 180px">
              <template #prepend>礼品数量</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="GiftUnitInput">
            <el-input v-model="data.ruleForm.GiftUnitInput" placeholder="礼品单位" style="width: 180px">
              <template #prepend>礼品单位</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="DemandTimeInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">需求时间</div>
            <el-date-picker v-model="data.ruleForm.DemandTimeInput" type="datetime" placeholder="选择时间" style="width: 160px" />
          </el-form-item>
          <el-form-item prop="RemarksInput" style="width: 640px">
            <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="申请事由" show-word-limit type="textarea" />
          </el-form-item>
          <div class="w-650 border-dashed rounded-md border">
            <div class="p-2">
              <div class="pl-2 pb-2">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                  <i class="iconfont icon-chuangjian"></i>
                  <template #file="{ file }">
                    <div>
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="iconfont icon-fangda"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="iconfont icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="iconfont icon-shanchu"></i>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
              </div>
              <p class="text-xs text-gray-400">说明：一次可上传多张图片，最多支持上传10张。每张图片大小不超过5M，格式为:jpg、gif、png、bmp</p>
            </div>
          </div>
          <div class="text-sm clearfix">
            <div class="float-right p-2 pr-6">
              <el-button @click="closeWindow('close')">取消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
            </div>
          </div>
        </div>
        <!-- #endregion -->
        <!-- #region  差旅费-->
        <div class="tech_addReimbursement_entertainment" v-if="data.costRadio == '差旅费'">
          <el-form-item prop="VisitingCustomersInput">
            <el-input v-model="data.ruleForm.VisitingCustomersInput" placeholder="请输入拜访客户" style="width: 380px">
              <template #prepend>拜访客户</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="TravelTimeInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">出差时间</div>
            <el-date-picker v-model="data.ruleForm.TravelTimeInput" type="datetime" placeholder="选择时间" style="width: 160px" />
          </el-form-item>
          <el-form-item prop="startCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">起始里程</div>
            <el-input-number v-model="data.ruleForm.startCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>
          <el-form-item prop="endCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">结束里程</div>
            <el-input-number v-model="data.ruleForm.endCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>
          <el-form-item prop="consumeCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">消耗里程</div>
            <el-input-number v-model="data.ruleForm.consumeCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>
          <el-form-item prop="speedCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">高速费用</div>
            <el-input-number v-model="data.ruleForm.speedCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>
          <el-form-item prop="comeCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">加油费用</div>
            <el-input-number v-model="data.ruleForm.comeCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>
          <el-form-item prop="parkingCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">停车费用</div>
            <el-input-number v-model="data.ruleForm.parkingCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>
          <el-form-item prop="trafficCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">交通费用</div>
            <el-input-number v-model="data.ruleForm.trafficCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>
          <el-form-item prop="ReimbursementCostInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">报销总额</div>
            <el-input-number v-model="data.ruleForm.ReimbursementCostInput" :min="0" :max="10" controls-position="right" style="width: 120px"></el-input-number>
          </el-form-item>

          <el-form-item prop="RemarksInput" style="width: 640px">
            <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="申请事由" show-word-limit type="textarea" />
          </el-form-item>
          <div class="text-sm clearfix">
            <div class="float-right p-2 pr-6">
              <el-button @click="closeWindow('close')">取消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
            </div>
          </div>
        </div>
        <!-- #endregion -->
        <!-- #region  其他费-->
        <div class="tech_addReimbursement_entertainment" v-if="data.costRadio == '其他费'">
          <el-form-item prop="RecipientInput">
            <el-input v-model="data.ruleForm.RecipientInput" placeholder="请输入受赠单位" style="width: 380px">
              <template #prepend>受赠单位</template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">申请费用</div>
            <el-input-number v-model="data.ruleForm.giftCostInput" :min="0" :max="10" controls-position="right" style="width: 160px"></el-input-number>
          </el-form-item>
          <el-form-item prop="NumberGiftsInput">
            <el-input v-model="data.ruleForm.NumberGiftsInput" placeholder="礼品数量" style="width: 180px">
              <template #prepend>礼品数量</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="GiftUnitInput">
            <el-input v-model="data.ruleForm.GiftUnitInput" placeholder="礼品单位" style="width: 180px">
              <template #prepend>礼品单位</template>
            </el-input>
          </el-form-item>
          <el-form-item prop="DemandTimeInput">
            <div class="w-20 h-8 bg-slate-50 inline-flex pl-3 text-gray-400">需求时间</div>
            <el-date-picker v-model="data.ruleForm.DemandTimeInput" type="datetime" placeholder="选择时间" style="width: 160px" />
          </el-form-item>
          <el-form-item prop="RemarksInput" style="width: 640px">
            <el-input v-model="data.ruleForm.RemarksInput" maxlength="100" placeholder="申请事由" show-word-limit type="textarea" />
          </el-form-item>
          <div class="w-650 border-dashed rounded-md border">
            <div class="p-2">
              <div class="pl-2 pb-2">
                <el-upload action="#" list-type="picture-card" :auto-upload="false">
                  <i class="iconfont icon-chuangjian"></i>
                  <template #file="{ file }">
                    <div>
                      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                      <span class="el-upload-list__item-actions">
                        <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
                          <i class="iconfont icon-fangda"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">
                          <i class="iconfont icon-download"></i>
                        </span>
                        <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">
                          <i class="iconfont icon-shanchu"></i>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img w-full :src="dialogImageUrl" alt="Preview Image" />
                </el-dialog>
              </div>
              <p class="text-xs text-gray-400">说明：一次可上传多张图片，最多支持上传10张。每张图片大小不超过5M，格式为:jpg、gif、png、bmp</p>
            </div>
          </div>
          <div class="text-sm clearfix">
            <div class="float-right p-2 pr-6">
              <el-button @click="closeWindow('close')">取消</el-button>
              <el-button type="primary" @click="submitForm(ruleFormRef)">保存</el-button>
            </div>
          </div>
        </div>
        <!-- #endregion -->
      </el-form>
    </div>
  </OpenWindow>
</template>

<script lang="ts">
import { defineComponent, reactive, SetupContext, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import type { UploadFile } from 'element-plus'

export default defineComponent({
  components: {
    OpenWindow
  },
  props: {
    FormData: {
      type: Object,
      default: {}
    }
  },
  setup(props, context: SetupContext) {
    const dialogImageUrl = ref('')
    const dialogVisible = ref(false)
    const disabled = ref(false)

    const ruleFormRef = ref<FormInstance>()
    const data = reactive({
      costRadio: '招待费',
      costRadioArr: [
        { value: 'A', label: '招待费' },
        { value: 'B', label: '礼品费' },
        { value: 'C', label: '差旅费' },
        { value: 'D', label: '其他费' }
      ],
      ruleForm: {
        AdminInput: '',
        DepartmentInput: '',
        TimeInput: '',
        RemarksInput: '',
        costInput: 0,
        giftCostInput: 0,
        startCostInput: 0,
        endCostInput: 0,
        consumeCostInput: 0,
        speedCostInput: 0,
        comeCostInput: 0,
        parkingCostInput: 0,
        trafficCostInput: 0,
        ReimbursementCostInput: 0,
        CompanyInput: '',
        VisitorInput: '',
        guestsInput: '',
        NumberGiftsInput: '',
        visitorsInput: '',
        GiftUnitInput: '',
        ReceptionTimeInput: '',
        TravelTimeInput: '',
        VisitingCustomersInput: '',
        RecipientInput: '',
        DemandTimeInput: ''
      }
    })
    // 表单提交
    const submitForm = async (formEl: FormInstance | undefined) => {
      if (!formEl) return
      await formEl.validate((valid, fields) => {
        if (valid) {
          console.log('success')
        } else {
          ElMessage.error('存在必填项未选')
        }
      })
    }
    // 校验
    const rules = reactive<FormRules>({
      VisitorInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      costInput: [{ required: true, message: '请选择', trigger: 'blur' }],
      guestsInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      NumberGiftsInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      ReceptionTimeInput: [{ required: true, message: '请选择', trigger: 'blur' }],
      RemarksInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      visitorsInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      GiftUnitInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      VisitingCustomersInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      RecipientInput: [{ required: true, message: '请输入', trigger: 'blur' }],
      DemandTimeInput: [{ required: true, message: '请选择', trigger: 'blur' }],
      TravelTimeInput: [{ required: true, message: '请选择', trigger: 'blur' }]
    })
    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-700',
      boxHeight: ''
    })
    const changeCost = (val: any) => {
      console.log(val)
      data.costRadio = val
    }
    const handleRemove = (file: UploadFile) => {
      console.log(file)
    }

    const handlePictureCardPreview = (file: UploadFile) => {
      dialogImageUrl.value = file.url!
      dialogVisible.value = true
    }

    const handleDownload = (file: UploadFile) => {
      console.log(file)
    }

    return {
      boxStyle,
      closeWindow,
      data,
      ruleFormRef,
      rules,
      submitForm,
      changeCost,
      disabled,
      dialogImageUrl,
      dialogVisible,
      handleRemove,
      handlePictureCardPreview,
      handleDownload
    }
  }
})
</script>
<style lang="postcss" scoped>
:deep(.el-form--inline .el-form-item) {
  margin-left: 10px;
  margin-right: 10px;
}
.tech_addReimbursement_entertainment {
  :deep(.el-form-item) {
    display: inline-flex;
  }
  :deep(.el-upload--picture-card) {
    width: 100px;
    height: 100px;
  }
  :deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 100px !important;
    height: 100px !important;
  }
}
</style>
