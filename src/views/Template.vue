<template>
    <div class='bf-content'>
        <div class='bf-center-content'>
            模板示例
        </div>
    </div>

</template>

<script lang='ts'>
import { defineComponent, reactive } from 'vue'
import { GetUserList } from '/@/api/menu/menu'
import { ElMessageBox, ElMessage, ElNotification } from 'element-plus'
// 加载数据
const onLoadData = async(data: any): void => {
    await GetUserList().then((res) => {
        if (res.code == 1) {
            console.log(res)
        } else
            ElNotification({
                title: '请求失败',
                message: d.msg,
                type: 'error'
            })
    })
}
// 操作
const operation = (data: any) => {
    const btn_operation = () => {}

    return {
        btn_operation
    }
}

export default defineComponent({
    // 想要被keep-alive缓存必须设置name
    name: 'PageTemplate',
    components: {},
    setup() {
        const data = reactive({
            PostData: []
        })
        return { data, ...onLoadData(data) }
    }
})
</script>

<style scoped>
</style>
