<template>
    <div>
        <el-form>
            <el-form-item label='数据表'>
                <el-input v-model='flowTable.TableName' />
            </el-form-item>
            <el-form-item label='分类(code)'>
                <el-input v-model='flowTable.Code' />
            </el-form-item>
            <el-form-item label='审批流'>
                <el-select v-model='flowTable.FlowId' filterable>
                    <el-option
                        v-for='item in flowList'
                        :key='item.Id'
                        :label='item.Category'
                        :value='item.Id'
                    />
                </el-select>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang='ts' setup>
import { IFlowCore, IFlowTable } from '/@/type/views/wf/IFlow'
import { onMounted, ref } from 'vue'
import { GetFlowList, GetFlowTableById, PostAddFlowTableSave, PostEditFlowTableSave } from '/@/api/wf/FlowCore'
import { ElMessage } from 'element-plus/es'

const props = defineProps({
    id: {
        type: Number,
        default: () => {
            return 0
        }
    },
    isEdit: {
        type: Boolean,
        default: () => {
            return false
        }
    }
})

const flowTable = ref<IFlowTable>({ Flow: undefined, FlowId: 0, Id: 0, TableName: '', Code: '' })
const flowList = ref<IFlowCore[]>([])
onMounted(() => {
    initHandle()
})
const getFlowTableById = () => {
    GetFlowTableById(props.id)
        .then(res => {
            if (res.code == 1) {
                flowTable.value = res.data
            } else {
                ElMessage.error(res.message)
            }
        })
}
const initHandle = () => {
    if (props.isEdit) {
        getFlowTableById()
    }
    getFlowList()
}

const getFlowList = () => {
    GetFlowList({ name: '', category: '' })
        .then(res => {
            if (res.code == 1) {
                flowList.value = res.data
            } else {
                ElMessage.error(res.message)
            }
        })
}
const handleSave = () => {
    if (flowTable.value.FlowId == 0) {
        ElMessage.error('请选择流程')
        return
    }
    if (flowTable.value.TableName == '') {
        ElMessage.error('请输入数据表名称')
        return
    }
    if (flowTable.value.Code == '') {
        ElMessage.error('请输入code')
        return
    }
    if (props.isEdit) {
        PostEditFlowTableSave(flowTable.value)
            .then(res => {
                if (res.code == 1) {
                    ElMessage.success('保存成功')
                    emit('submitDataResult', { isSuccess: true })
                } else {
                    ElMessage.error(res.message)
                }
            })
    } else {
        PostAddFlowTableSave(flowTable.value)
            .then(res => {
                if (res.code == 1) {
                    ElMessage.success('保存成功')
                    emit('submitDataResult', { isSuccess: true })
                } else {
                    ElMessage.error(res.message)
                }
            })
    }
}
const emit = defineEmits(['submitDataResult'])
defineExpose({
    handleSave
})
</script>

<style scoped>

</style>