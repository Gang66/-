<template>
    <div class='bg-white rounded-lg px-3 py-4 w-full mb-2'>
        <div class='justify-between flex items-end mb-3'>
            <div>
                <div class='flex justify-between items-center relative'>
                    <div class='absolute text-blue-100 font-bold text-2xl italic'>MEMORANDUM</div>
                    <div class='text-blue-500 text-sm font-semibold relative z-1'>备忘录</div>
                </div>
                <div class='h-px w-16 bg-blue-500 ' />
            </div>
        </div>
        <div class='relative'>
            <textarea
                v-model='bwlInfo.textarea'
                class='textarea-sty w-full border-gray-300 border rounded h-19 text-sm p-2'
                placeholder='请输入'
                :rows='3'
            />
            <el-button
                v-if='bwlInfo.textarea.length>0'
                type='primary'
                size='small'
                class='absolute top-12 right-1'
                color='#027AFF'
                @click='bwlSubmit'
            >保存</el-button>
            <ul style='overflow: auto' class='h-52 '>
                <li v-for='(itm, idx) in bwlInfo.ly_list' :key='idx' class='text-xs mb-1'>
                    <span class='w-2 h-2 rounded-full bg-blue-500 mx-1 block float-left relative top-1.5' />
                    <span class='text-gray-500 mr-4'>{{ itm.time }}</span>
                    <span>{{ itm.name }}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
const bwlInfo:any = reactive({
    textarea: '',
    ly_list: [
        { name: '这是一条备忘录', time: '2021/05/30' },
        { name: '这是二条备忘录', time: '2021/06/30' }
    ]
})

// 添加备忘录
function bwlSubmit() {
    if (!bwlInfo.textarea) {
        ElMessage.error('备忘录内容不得为空')
        return false
    }
    bwlInfo.ly_list.unshift({
        time: new Date().toLocaleDateString(),
        name: bwlInfo.textarea
    })
    bwlInfo.textarea = ''
    ElMessage.success('添加成功')
}
</script>

<style>
.textarea-sty{
    resize: none;
    background:none;
    outline:none;
}
</style>