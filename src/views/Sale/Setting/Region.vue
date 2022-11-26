<template>
    <OpenWindow title='区域设置' :is-show='winshow' :box-style='boxStyle'>
        <el-form
            ref='dataForm'
            label-position='right'
            label-width='100px'
            style='width: 300px; margin-left:50px; '
        >
            <el-scrollbar style='height:50%'>
                <el-tree
                    ref='tree'
                    class='filter-tree flow-tree'
                    :data='cityData'
                    :props='defaultProps'
                    :default-checked-keys='arrayList'
                    show-checkbox
                    node-key='id'
                    @check-change='handleTreeCityClick'
                />
            </el-scrollbar>
            <el-button @click='clos'>关闭</el-button>
            <el-button type='primary' @click='createCityData'>选择</el-button>
        </el-form>
    </OpenWindow>
    
</template>

<script lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { getTree } from '/@/api/Sale/CNRegionInfo'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import OpenWindow from '/@/components/OpenWindow/index.vue'
export default defineComponent({
    name: 'Region',
    components: {
        OpenWindow
    },
    props:{
        isShow:{
            type:Boolean,
            default:false
        }
    },
    setup() {
       
        const winshow = ref(true)
        const cityData = ref([])
        const arrayList = ref([])
        const checkedData = ref([])
        const defaultProps = ref({
            children: 'children',
            label: 'title'
        })
        const boxStyle = reactive({
            boxWidth: 'w-3/5',
            boxHeight: 'h-3/5'
        })
        const clos = async() => {
            winshow.value = false
        }
        const creategetTree = () => {
            getTree().then(res => {
                if (res.code == 1) {
                    cityData.value = res.data
                    console.log('11111111111111',cityData)
                  
                } else {
                    ElMessage.error(res.message)
                }
            })
        }
        const handleTreeCityClick = async(data:any, checked:any) => {
            if (checked) {
                // 选中
                checkedData.value.push(data)
            } else {
                // 移除
                checkedData.value.splice(checkedData.value.indexOf(data), 1)
            }
        }
        
        return {
            winshow,
            boxStyle,
            cityData,
            arrayList,
            defaultProps,
            handleTreeCityClick,
            clos,
            creategetTree
        }
    },
    mounted() {
        this.creategetTree()
    }
})

</script>