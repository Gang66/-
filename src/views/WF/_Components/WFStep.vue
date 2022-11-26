<template>
    <div class='el-approval-step'>
        <el-card class='stepCard'>
            <template #header>
                <div>
                    <span>第{{ step }}步</span>
                    名称
                    <el-input v-model='NodeName' style='width: 150px;height:32px;margin-top:-8px;' />
                    <el-button
                        type='danger'
                        size='media'
                        style='float:right;padding: 5px 3px;margin: -5px 5px'
                        @click='handleDeleteStep'
                    >删除
                    </el-button>
                    <el-button
                        type='primary'
                        size='media'
                        style='float:right;padding: 5px 3px;margin: -5px 5px'
                        @click='handleAddStep'
                    >新增
                    </el-button>
                </div>
            </template>

            <div>
                <el-form>
                    <div style='margin-bottom:5px;font-weight: bold;'>审批人员</div>
                    <div style='border:1px #ccc solid;padding:5px 10px;'>
                        <el-row class='mb-1 flex items-center'>
                            <el-col :span='4'>
                                <div class='label'>岗位</div>
                            </el-col>
                            <el-col :span='20'>
                                <el-select
                                    v-model='selectedRoles'
                                    style='width: 100%'
                                    multiple
                                    filterable
                                    default-first-option
                                    @change='selectRole'
                                >
                                    <el-option
                                        v-for='item in role'
                                        :key='item.Id'
                                        :label='item.PostName'
                                        :value='item.Id'
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class='mb-1 flex items-center'>
                            <el-col :span='4'>
                                <div class='label'>人员</div>
                            </el-col>
                            <el-col :span='20'>
                                <el-select
                                    v-model='selectedUsers'
                                    style='width: 100%'
                                    multiple
                                    filterable
                                    default-first-option
                                    @change='selectUser'
                                >
                                    <el-option
                                        v-for='item in user'
                                        :key='item.Id'
                                        :label='item.RealName'
                                        :value='item.Id'
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                        <el-row class='flex items-center'>
                            <el-col :span='4'>
                                <div class='label'>特殊</div>
                            </el-col>
                            <el-col :span='20'>
                                <el-select
                                    v-model='otherUsers'
                                    style='width: 100%'
                                    filterable
                                    default-first-option
                                    @change='selectOther'
                                >
                                    <el-option
                                        v-for='item in other'
                                        :key='item.value'
                                        :label='item.text'
                                        :value='item.value'
                                    />
                                </el-select>
                            </el-col>
                        </el-row>
                    </div>
                    <!--                    <div style='margin-top:5px;margin-bottom:5px;font-weight: bold;'>审批模式</div>-->
                    <!--                    <div style='border:1px #ccc solid;padding:5px 10px;'>-->
                    <!--                        <el-row>-->

                    <!--                            <el-col :span='24'>-->
                    <!--                                <el-radio-group v-model='IsAny' class='isAnyRadio' style='height:17px'>-->
                    <!--                                    <el-radio label='1'>单人</el-radio>-->
                    <!--                                    <el-radio label='0'>会审</el-radio>-->
                    <!--                                </el-radio-group>-->
                    <!--                            </el-col>-->
                    <!--                        </el-row>-->
                    <!--                    </div>-->
                    <div style='margin-top:5px;margin-bottom:5px;font-weight: bold;'>分支条件</div>
                    <div style='border:1px #ccc solid;padding:5px 10px;'>
                        <el-row>

                            <el-col :span='24'>
                                <el-input
                                    v-model='wherepara'
                                    type='textarea'
                                    placeholder='#字段 > 值&字段 <= 值@节点'
                                    :row='4'
                                    style='width: 100%'
                                />
                            </el-col>
                        </el-row>
                    </div>
                    <div style='margin-top:5px;margin-bottom:5px;font-weight: bold;'>编辑字段</div>
                    <div style='border:1px #ccc solid;padding:5px 10px;'>
                        <el-row>

                            <el-col :span='24'>
                                <el-input v-model='editpara' placeholder='可编辑字段名称,多字段;隔开' style='width: 100%' />
                            </el-col>
                        </el-row>
                    </div>
                    <div style='margin-top:5px;margin-bottom:5px;font-weight: bold;'>审批设置</div>
                    <div style='border:1px #ccc solid;padding:5px 10px;'>
                        <el-row>

                            <el-col :span='24'>
                                <el-checkbox v-model='isNotice'>通知提醒</el-checkbox>
                            </el-col>
                        </el-row>
                    </div>

                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script lang='ts' setup>
import { onMounted, ref, watch } from 'vue'
import { IFlowNode } from '/@/type/views/wf/IFlow'

const props = defineProps({
    role: {
        type: Array,
        default: () => {
            return []
        }
    },
    user: {
        type: Array,
        default: () => {
            return []
        }
    },
    other: {
        type: Array,
        default: () => {
            return []
        }
    },
    item: {
        type: Object,
        default: (): IFlowNode => {
            return {
                Checker: '',
                CreateBy: 0,
                CreateOn: new Date(),
                Editpara: '',
                FlowId: 0,
                FlowNo: '',
                Id: 0,
                IsAny: '1',
                IsNotice: '',
                NodeName: '',
                RoleName: '',
                Step: undefined,
                Category: '',
                UpdateBy: 0,
                UpdateOn: undefined,
                UserType: undefined,
                WherePara: '', CheckerList: []
            }
        }
    },
    step: {
        type: Number,
        default: () => {
            return 1
        }
    }
})
const emit = defineEmits(['deleteStep', 'addStep'])
const IsAny = ref('0')
const selectedRoles = ref<number[]>([])
const selectedUsers = ref<number[]>([])
const otherUsers = ref<number | undefined>(undefined)
const UserType = ref(0)
const wherepara = ref('')
const editpara = ref('')
const isNotice = ref(false)
const Approver = ref('')
const NodeName = ref('')

const handleDeleteStep = () => {
    emit('deleteStep', props.step)
}
const handleAddStep = () => {
    emit('addStep', props.step)
}
const selectRole = (id: number[]) => {
    (props.item as IFlowNode).CheckerList = id;
    (props.item as IFlowNode).Checker = id.join(',');
    (props.item as IFlowNode).UserType = 1
    selectedUsers.value = []
    otherUsers.value = undefined
}
const selectUser = (id: number[]) => {
    (props.item as IFlowNode).CheckerList = id;
    (props.item as IFlowNode).Checker = id.join(',');
    (props.item as IFlowNode).UserType = 0
    selectedRoles.value = []
    otherUsers.value = undefined
}
const selectOther = (id: number) => {
    (props.item as IFlowNode).Checker = id.toString();
    (props.item as IFlowNode).UserType = id
    selectedRoles.value = []
    selectedUsers.value = []
}
onMounted(() => {
    (props.item as IFlowNode).Step = props.step
    IsAny.value = (props.item as IFlowNode).IsAny
    wherepara.value = (props.item as IFlowNode).WherePara
    editpara.value = (props.item as IFlowNode).Editpara
    isNotice.value = (props.item as IFlowNode).IsNotice == '1'
    NodeName.value = (props.item as IFlowNode).NodeName
    if ((props.item as IFlowNode).UserType == 0) {
        let arr = (props.item as IFlowNode).Checker.split(',')
        let intarr = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '')
                continue
            intarr[i] = parseInt(arr[i])
        }
        selectedUsers.value = intarr
    } else if ((props.item as IFlowNode).UserType == 1) {
        let arr = (props.item as IFlowNode).Checker.split(',')
        let intarr = []
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '')
                continue
            intarr[i] = parseInt(arr[i])
        }
        selectedRoles.value = intarr
    } else {
        otherUsers.value = isNaN(parseInt((props.item as IFlowNode).Checker)) ? undefined : parseInt((props.item as IFlowNode).Checker)
    }
})
watch(IsAny, (val) => {
    (props.item as IFlowNode).IsAny = val
})
watch(wherepara, (val) => {
    (props.item as IFlowNode).WherePara = val
})
watch(editpara, (val) => {
    (props.item as IFlowNode).Editpara = val
})
watch(isNotice, (val) => {
    (props.item as IFlowNode).IsNotice = val ? '1' : '0'
})
watch(NodeName, (val) => {
    (props.item as IFlowNode).NodeName = val
})
</script>

<style scoped>

</style>