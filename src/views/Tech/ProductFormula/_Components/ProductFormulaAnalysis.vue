<template>
    <!-- 阀门解析 -->
    <div class='tech-product-formula-analysis'>
        <el-row :gutter='10'>
            <template v-for="item in list" :key="item.Id">

                <el-col :md='24' :lg='getLgNum(item.Digit)'>
                    <div class="flex justify-between items-center border  border-solid border-gray-300 rounded-md mb-2" :title="item.Mean">
                        <div class="pl-2 text-sm text-gray-900 truncate mr-1">
                            {{item.Digit}}、{{item.Mean}}
                        </div>
                        <div>
                            <el-button class="analysis-but" type="primary" text @click="handleEditAnalysis(item.Digit)">
                                <el-icon><el-icon-edit  /></el-icon>
                            </el-button>
                        </div>
                    </div>
                    <div class="analysis-item overflow-y-auto w-full scrollbar">
                        <template v-for="row in item.ProductFormulaDirectoryTypeList" :key="row.SortNo">
                            <div class="p-2 border-b border-solid border-gray-300">{{row.Name}}</div>
                                <div v-if="item.Digit==6">{{item.Remark}}</div>
                                <ul v-else class="clearfix">
                                    <template v-for="(x,i) in row.ProductMeanList" :key="i">
                                    <li class="flex justify-between w-full float-left p-2" :class="{'bg-indigo-50':(i+1)%2==0}">
                                        <div class="text-base text-gray-900">{{x.Code}}</div>
                                        <div class="text-base text-gray-900 truncate ml-1" :title="x.Mean">{{x.Mean}}</div>
                                    </li>
                                    </template>
                                    <div v-if="row.ProductMeanList.length==0" class="text-base text-red-600 truncate ml-1">暂无配置</div>
                                </ul>
                        </template>
                    </div>
                </el-col>
                <el-col :md='24' :lg='1' v-if="item.Digit==5">
                    <div class=" text-xl text-center text-gray-900 font-black">——</div>
                </el-col>
            </template>
            
        </el-row>
    </div>
    <BasicFormulaList v-if="basicFormulaListOpenData.visible" :digit="basicFormulaListOpenData.digit" @closeWindow="closeWindowBasicFormulaList($event)" />
</template>

<script lang="ts">
import { getGBProductTypeDirectoryList } from '/@/api/tech/ProductFormula'
import { defineComponent, ref , reactive,onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import BasicFormulaList from './BasicFormulaList.vue'

//编辑配置弹窗
const basicFormulaListOpen = (data:any)=>{
    let basicFormulaListOpenData:any = reactive({
        visible:false,
        digit:0
    });

    //设置分析
    const handleEditAnalysis = (digit:number)=>{
        basicFormulaListOpenData.digit = digit
        if(digit==6){
            ElMessage.error('无需审批！');
        }
        else{
            basicFormulaListOpenData.visible =true
        }
    }

    //关闭弹窗
    const closeWindowBasicFormulaList = (type: string)=>{
        basicFormulaListOpenData.visible=false
        if(type=='close')
        data.getList()
    }

    return {
        basicFormulaListOpenData,
        closeWindowBasicFormulaList,
        handleEditAnalysis
    }
}

export default defineComponent({
    components:{
        BasicFormulaList
    },
    setup() {
        const list = ref([])
        
        //获取数据
        const getList = async ()=>{
            await getGBProductTypeDirectoryList().then(res => {
                if(res.code === 1) {
                    list.value = res.data
                }
                else{
                    ElMessage.error(res.message);
                }
            })
            .catch(e => { 
                console.log(`getGBProductTypeDirectoryList${e}`) 
            })
        }

        //设置Lg
        const getLgNum = (num:number)=>{
            let n=3;
            if(num>=4&&num<=5){
                n=4
            }
            return n
        }
        

        onMounted(() => {
            //获取数据
            getList()
        });

        return {
            list,
            getLgNum,
            ...basicFormulaListOpen({getList})
        }
    }
})
</script>

<style lang="postcss" scoped>
  .tech-product-formula-analysis{
      .analysis-but{
          font-size: 20px;
      }
      .analysis-item{
          height: 75vh;
      }
   



  }
</style>