<template>
    <div>
        <CusDialog :box-style='boxStyle' :title='title' :is-show='true' @closeWindow='closeWindow'>
            <div class='addaftersales text-base'>
                <div class='salerDialog'>
                    <el-form ref='ruleFormRef' :model='data.form' :rules='rules' :inline='true'>
                        <el-card class='sale_card'>
                            <el-form-item label='客户名称' prop='CustomerName'>
                                <el-input v-model='data.form.CustomerName' :readonly='true' placeholder='请输入' style='width:410px' @click="showBargain"/>
                            </el-form-item>
                            <el-form-item label='合同编号' prop='ContractNo'>
                                <el-input v-model='data.form.ContractNo' :readonly='true' placeholder='请输入' class='inputclass' />
                            </el-form-item>
                            <el-form-item label='提交时间' prop='CreateOn'>
                                <el-date-picker v-model='data.form.CreateOn' :readonly='data.disabled' type='date' placeholder='请选择' style=' width: 170px;' />
                            </el-form-item>

                            <el-form-item label='合同金额' prop='ContractAmount'>
                                <el-input v-model='data.form.ContractAmount' :readonly='true' placeholder='请输入' class='inputclass' />
                            </el-form-item>
                            <el-form-item label='合同欠款' prop='ContractArrears'>
                                <el-input v-model='data.form.ContractArrears' :readonly='true' placeholder='请输入' class='inputclass' />
                            </el-form-item>
                            <el-form-item label='合同时间' prop='ContractTime'>
                                <el-input v-model='data.form.ContractTime' :readonly='true' placeholder='请输入' class='inputclass' />
                            </el-form-item>
                            <el-form-item label='质保期' prop='Warranty'>
                                <el-input v-model='data.form.Warranty' :readonly='data.disabled' placeholder='请输入' class='inputclass' />
                            </el-form-item>

                            <el-form-item label='业务员' prop='Salerman'>
                                <el-input v-model='data.form.Salerman' :readonly='true' placeholder='请输入' class='inputclass' />
                            </el-form-item>
                            <el-form-item label='事业部' prop='CompName'>
                                <el-input v-model='data.form.CompName' :readonly='true' placeholder='请输入' class='inputclass' />
                            </el-form-item>

                            <el-form-item label='售后时间' prop='AfterSalersTime'>
                                <el-date-picker v-model='data.form.AfterSalersTime' :readonly='data.disabled' type='date' placeholder='请选择' style=' width: 170px;' />
                            </el-form-item>

                            <el-form-item label='售后等级' prop='AfterSalesStage'>
                                <el-select v-model='data.form.AfterSalesStage' :disabled='data.disabled' placeholder='请选择开票阶段' class='inputclass'>
                                    <el-option v-for='item in dic.Stage ' :key='item.DicKey' :label='item.DicValue' :value='item.DicKey' />
                                </el-select>
                            </el-form-item>

                            <el-form-item label='联系人' prop='Contacts'>
                                <el-input v-model='data.form.Contacts' :readonly='data.disabled' placeholder='请输入' class='inputclass' />
                            </el-form-item>
                            <el-form-item label='联系电话' prop='Telephone'>
                                <el-input v-model='data.form.Telephone' :readonly='data.disabled' placeholder='请输入' class='inputclass' />
                            </el-form-item>
                            <el-form-item label='售后地址' prop='Address'>
                                <el-input v-model='data.form.Address' :readonly='data.disabled' placeholder='请输入' style='width:410px' />
                            </el-form-item>
                            <el-form-item label='备注' prop='Note'>
                                <el-input
                                    v-model='data.form.Note'
                                    :readonly='data.disabled'
                                    :autosize='{ minRows: 1, maxRows: 10 }'
                                    type='textarea'
                                    placeholder='请输入'
                                    style='width:893px'
                                />
                            </el-form-item>
                        </el-card>
                        <el-card class='sale_card mt-2'>
                            <el-form-item label='售后原因' prop='CreateOn'>
                                <el-select v-model='data.form.Reason' :disabled='data.disabled' placeholder='请选择开票阶段' class='inputclass'>
                                    <el-option v-for='item in dic.Reason' :key='item.DicKey' :label='item.DicValue' :value='item.DicKey' />
                                </el-select>
                            </el-form-item>
                            <el-form-item label='问题描述' prop='Remark'>
                                <el-input
                                    v-model='data.form.Remark'
                                    :readonly='data.disabled'
                                    :autosize='{ minRows: 1, maxRows: 10 }'
                                    type='textarea'
                                    placeholder='请输入'
                                    style='width:893px'
                                />
                            </el-form-item>
                            <div class='flex pt-8'>
                                <div class='bg-blue-400 w-2 h-2 rounded-lg mt-2 mr-2' />
                                <div class='font-semibold'>附件列表</div>
                            </div>
                            <div class='pt-2 ' :class='data.disabled?&apos;&apos;:&apos;-mt-12&apos;'>
                                <uploadfile :isdisabled='data.disabled' :upload-file-list='data.FileList' @uploadFileData='uploadFileData' />
                            </div>

                        </el-card>
                    </el-form>
                </div>
                <div v-if='ViewType==1' class='text-center pt-2'>
                    <el-button class='cancelbut' @click='closeWindow'>
                        取消
                    </el-button>
                    <el-button type='primary' @click='submitentity(ruleFormRef)'>
                        提交
                    </el-button>
                </div>
            </div>
        </CusDialog>
        <!-- 合同列表 -->
        <changeContract ref="changeContractRef" @changeOk="changeOk"></changeContract>
    </div>
</template>
<script lang="ts" setup>
import { parseTime, getTime } from '/@/utils/tools'
import { isMobileTel } from '/@/utils/validate'
import { GetUserinformation } from '/@/api/layout/index'
import { PostAddAfterSalesInfo, GetAfterSalesById } from '/@/api/Sale/AfterSale'
import { GetContractBillInfo } from '/@/api/Sale/Contract'
import CusDialog from '/@/views/Sale/Component/CusDialog.vue'
import uploadfile from '/@/components/Upload/uploadfile.vue'
import changeContract from '/@/views/Sale/Contract/AfterSalesService/changeContract.vue'
import { reactive, ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox, FormInstance, FormRules } from 'element-plus'
import { useCommonStore } from '/@/store/modules/Common'
const store = useCommonStore() // 记得加这一句

//#region 合同列表
const changeContractRef = ref(null)

const showBargain = () => {
  if (props.ContractId == 0 && props.DataId == 0) {
    changeContractRef.value.showBargain()
  }
}
const changeOk = () => {
    getContractInfo()
}

//#endregion


const dic = reactive({
    Stage: [],
    Reason: []
})
// 获取字典数据
const getDictionaryData = () => {
    // 售后等级
    store.getDict('sale_AfterSales_State').then((res: any) => {
        dic.Stage = res
    })
    // 售后原因阶段
    store.getDict('sale_AfterSale_Reason').then((res: any) => {
        dic.Reason = res
        console.log(' dic.Reason', dic.Reason)
    })
}

const props = defineProps({
    ViewType: {
        type: Number,
        default: 1 // 1是添加  2是修改联系人 3是查看
    },
    DataId: {
        type: Number,
        default: 0
    },
    ContractId: {
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
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules>({
    Warranty: [
        {
            required: true,
            message: '请输入保质期',
            trigger: 'change'
        }
    ],
    AfterSalersTime: [
        {
            required: true,
            message: '请输入保质期',
            trigger: 'change'
        }
    ],
    AfterSalesStage: [
        {
            required: true,
            message: '请选择售后等级',
            trigger: 'change'
        }
    ],
    Contacts: [
        {
            required: true,
            message: '请输入联系人',
            trigger: 'change'
        }
    ],
    Telephone: [
        {
            required: true,
            message: '请输入联系电话',
            trigger: 'change'
        },
        {
            validator: isMobileTel,
            message: '格式不正确',
            trigger: 'change'
        }
    ],
    Address: [
        {
            required: true,
            message: '请输入售后地址',
            trigger: 'change'
        }
    ],

    Reason: [
        {
            required: true,
            message: '请选择售后原因',
            trigger: 'change'
        }
    ],
    Remark: [
        {
            required: true,
            message: '请输入问题描述',
            trigger: 'change'
        }
    ]
})
const emit = defineEmits(['cancelContract'])

const closeWindow = () => {
    emit('cancelContract')
}
const boxStyle = reactive({
    boxWidth: 'w-1070',
    boxHeight: '',
    boxPaddingTop: 'pt-12'
})

const data = reactive({
    disabled: false,
    FileList: [],
    form: {
        CreateOn: parseTime(getTime('day'), ''),
        Id: 0,
        CompName: '',
        DeptName: '',
        PostName: '',
        CompId: 0,
        DeptId: 0,
        PostId: 0,
        Salerman: '',
        CustomerName: '',
        CustomerId: 0,
        ContractId: 0,
        ContractNo: '',
        ContractAmount: '',
        ContractArrears: '',
        ContractTime: '',
        Warranty: '',
        AfterSalersTime: null,
        AfterSalesStage: null,
        Contacts: '',
        Telephone: '',
        Address: '',
        Note: '',
        Reason: null,
        Remark: ''
    }
})
const uploadFileData = (val: any) => {
    data.FileList = val
}
const getuserinfo = () => {
    GetUserinformation(0).then((res) => {
        if (res.code == 1) {
            data.form.Salerman = res.data.RealName
            data.form.CompName = res.data.CompName
            data.form.DeptName = res.data.DeptName
            data.form.PostName = res.data.PostName
            data.form.CompId = res.data.CompId
            data.form.DeptId = res.data.DeptId
            data.form.PostId = res.data.PostId
        }
    })
}
const getContractInfo = () => {
    const id = props.ContractId ? props.ContractId : changeContractRef.value.bargain.Id
    GetContractBillInfo({ Id: id }).then((res) => {
        if (res.code == 1) {
            let info = res.data
            data.form.CustomerName = info.CustomerName
            data.form.CustomerId = info.CustomerId
            data.form.ContractNo = info.BillNo
            data.form.ContractId = info.Id
            data.form.ContractAmount = info.Amount
            data.form.ContractArrears = info.ContractArrears
            data.form.ContractTime = info.CreateOn
        }
    })
}

const submitentity = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            let postdata = JSON.parse(JSON.stringify(data.form))
            postdata.FileList = JSON.stringify(postdata.FileList)
            PostAddAfterSalesInfo(postdata).then((res) => {
                if (res.code == 1) {
                    ElMessage.success(res.message)
                    closeWindow()
                } else {
                    ElMessage.error(res.message)
                }
            })
        } else {
            console.log('error submit!')
            return false
        }
    })
}

const getDataInfo = () => {
    GetAfterSalesById({ Id: props.DataId }).then((res) => {
        if (res.code == 1) {
            res.data.FileList = JSON.parse(res.data.FileList)
            data.form = res.data
        }
    })
}

onMounted(() => {
    if (props.ViewType == 1) {
        getuserinfo()
    } else {
        data.disabled = true
        getDataInfo()
    }

    getDictionaryData()
    if (props.ContractId != 0) {
        getContractInfo()
    }
})
</script>
<style lang="postcss" scoped>
.addaftersales {
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
}
</style>
