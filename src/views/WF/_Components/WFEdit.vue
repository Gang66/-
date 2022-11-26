<template>
    <div class='el-approval-edit'>
        <el-form :inline='true'>
            <el-row class='row1'>
                <el-col :span='6'>
                    <el-form-item label='审批流名称' label-width='100px'>
                        <el-input v-model='flow.Name' style='width:220px;' />
                    </el-form-item>
                </el-col>
                <el-col :span='6'>
                    <el-form-item label='类别' label-width='100px'>
                        <el-input v-model='flow.Category' style='width:220px;' />
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if='loaded' style='display: flex;flex-wrap: wrap;'>
                <template v-for='(item,i) in flowNodes' :key='i + Date.now()'>
                    <step
                        :step='i + 1'
                        :item='item'
                        :role='role'
                        :user='user'
                        :other='other'
                        @deleteStep='handleDeleteStep'
                        @addStep='handleAddStep'
                    />
                </template>
            </el-row>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
import step from '/@/views/WF/_Components/WFStep.vue'
import { defineComponent, onMounted, ref } from 'vue'
import { IFlowCore, IFlowNode } from '/@/type/views/wf/IFlow'
import { ElMessage } from 'element-plus'
import { GetEditInfoById, PostAddFlowSave, PostEditFlowSave } from '/@/api/wf/FlowCore'


const props = defineProps({
    isEdit: {
        type: Boolean,
        default: () => {
            return false
        }
    },
    editFlowId: {
        type: Number,
        default: () => {
            return 0
        }
    },
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
    }
})

const flow = ref<IFlowCore>({
    CreateBy: 0,
    CreateOn: new Date(),
    FlowNo: '',
    FlowNodes: [],
    Id: 0,
    IsConfirm: '',
    IsDel: 0,
    Name: '',
    Category: '',
    UpdateBy: 0,
    UpdateOn: new Date()
})

const role = ref<any[]>([])
const user = ref<any[]>([])
const other = ref<any[]>([])
const loaded = ref(false)
const flowNodes = ref<IFlowNode[]>([])
const template = ref<IFlowNode>({
    Checker: '',
    CreateBy: 0,
    CreateOn: new Date(),
    Editpara: '',
    FlowId: 0,
    FlowNo: '',
    Id: 0,
    IsAny: '',
    IsNotice: '',
    NodeName: '',
    RoleName: '',
    Step: undefined,
    Category: '',
    UpdateBy: 0,
    UpdateOn: new Date(),
    UserType: undefined,
    WherePara: '', CheckerList: []
})
const editHistory = ref<any[]>([])
const emit = defineEmits(['submitDataResult', 'submitDataResult'])
const getCommonInfo = () => {
    role.value = props.role
    user.value = props.user
    other.value = props.other
    if (props.isEdit && props.editFlowId > 0) {
        handleEditModel(props.editFlowId)
    } else {
        handleCreateModel()
    }
}
const initHandle = () => {
    getCommonInfo()
}
const handleDeleteStep = (step: number) => {
    if (flowNodes.value.length == 1) {
        ElMessage.error('至少拥有一步审批')
        return
    }
    flowNodes.value.splice(step - 1, 1)
}
const handleAddStep = (step: number) => {
    flowNodes.value.splice(step, 0, JSON.parse(JSON.stringify(template.value)))
}
const handleCreateModel = () => {
    flowNodes.value = [JSON.parse(JSON.stringify(template.value))]
    loaded.value = true
}
const handleEditModel = (val: number) => {
    GetEditInfoById(val)
        .then(response => {
            if (response.code == 1) {
                flow.value = response.data
                flowNodes.value = response.data.FlowNodes
                editHistory.value = [{ option: 'Origin', data: JSON.parse(JSON.stringify(response.data.FlowNodes)) }]
                loaded.value = true
            } else {
                ElMessage.error(response.message)
            }
        })
}
const handleSubmitData = () => {
    for (let i = 0; i < flowNodes.value.length; i++) {
        let str = ''
        let nodeuser = flowNodes.value[i].CheckerList
        if (typeof nodeuser == 'object') {
            flowNodes.value[i].Checker = nodeuser.join(',')
        }
    }
    console.log('flowNodes', flowNodes.value)
    flow.value.FlowNodes = flowNodes.value
    if (props.isEdit) {
        PostEditFlowSave(flow.value)
            .then(response => {
                emit('submitDataResult', response)
            })
    } else {
        PostAddFlowSave(flow.value)
            .then(response => {
                emit('submitDataResult', response)
            })
    }
}


onMounted(() => {
    initHandle()
})
defineComponent({ step })
defineExpose({
    handleSubmitData
})
</script>

<style scoped>

</style>