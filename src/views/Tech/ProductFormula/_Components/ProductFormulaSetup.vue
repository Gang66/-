<template>
    <!-- 解析设置 -->
    <div class='tech-product-formula-setup'>
        <div class="bf-table-content ">
            <el-table :data="data.list" class="w-full" :key="1">
            <el-table-column prop="Mean" label="解析名称" width="100" align="center" />
            <el-table-column prop="Digit" label="位置" width="100" align="center" />
            <el-table-column prop="AttrName" label="对应属性" min-width="100" align="center" />
            <el-table-column label="操作" width="100" align="center">
                <template #default="scope">
                <el-button text key="primary" type="primary" v-if="scope.row.Digit>1" @click="openWindowProductFormulaSetupForm(scope.row)">编辑</el-button>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
    <ProductFormulaSetupForm v-if="productFormulaSetupFormOpenData.visible" :FormData="productFormulaSetupFormOpenData.formData" @closeWindow="closeWindowProductFormulaSetupForm($event)" />
</template>

<script lang="ts">
import { defineComponent, ref , reactive,onMounted } from 'vue'
import { getGBProductFormulaDirectoryList } from "/@/api/tech/ProductFormula";
import { ElMessage } from 'element-plus'
import ProductFormulaSetupForm from './ProductFormulaSetupForm.vue'

//编辑解析设置弹窗
const productFormulaSetupFormOpen = (data:any)=>{
    let productFormulaSetupFormOpenData:any = reactive({
        visible:false,
        formData:{}
    });

    //打开弹窗
    const openWindowProductFormulaSetupForm = (val:any)=>{
        productFormulaSetupFormOpenData.formData={
          Id:val.Id,
          Mean:val.Mean,
          AttrId:val.AttrId,
          propertysList:data.data.propertysList
        }
        productFormulaSetupFormOpenData.visible=true
    }

    //关闭弹窗
    const closeWindowProductFormulaSetupForm = (type: string)=>{
        productFormulaSetupFormOpenData.visible=false
        if(type=='close')
        data.getData({data:data.data})
    }

    return {
        productFormulaSetupFormOpenData,
        openWindowProductFormulaSetupForm,
        closeWindowProductFormulaSetupForm
    }
}

//获取数据
const getData = async (data:any)=>{
  await getGBProductFormulaDirectoryList().then(res => {
      if(res.code === 1) {
          let _obj = res.data||{}
          
          data.data.list = _obj.FormulaDirectoryList
          data.data.propertysList = _obj.PropertysList
      }
      else{
          ElMessage.error(res.message);
      }
  })
  .catch(e => { 
      console.log(`getProductFormulaData${e}`) 
  })
}

export default defineComponent({
    components:{
        ProductFormulaSetupForm
    },
    setup() {
        let data: any = reactive({
            list: [],
            propertysList:[]
        })
      
        onMounted(() => {
            getData({data})
        })

        return {
            data,
            ...productFormulaSetupFormOpen({data,getData})
        }
    }
})
</script>

<style lang="postcss" scoped>
  .tech-product-formula-setup{
   
   



  }
</style>