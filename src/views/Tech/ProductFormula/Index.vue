<template>
    <div class='bf-content tech-product-formula bg-gray-50 rounded-lg'>
      <div class="relative">
        <div class="absolute top-1 right-0 z-50 w-400"><product-formula-model-analysis /></div>
      </div>
      <el-tabs v-model='activeName'>
          <el-tab-pane label='阀门解析' name='analysis'>
              <div class='p-3'>
                  <product-formula-analysis v-if="activeName=='analysis'" />
              </div>
          </el-tab-pane>
          <el-tab-pane label='解析设置' name='setup'>
              <div class='p-3'>
                  <product-formula-setup v-if="activeName=='setup'" />
              </div>
          </el-tab-pane>
      </el-tabs>
         
    </div>
</template>

<script lang="ts">
import ProductFormulaAnalysis from './_Components/ProductFormulaAnalysis.vue'
import ProductFormulaSetup from './_Components/ProductFormulaSetup.vue'
import ProductFormulaModelAnalysis from './_Components/ProductFormulaModelAnalysis.vue'
import { defineComponent, ref } from 'vue'
export default defineComponent({
    name:'TechProductFormula',
    components:{
        ProductFormulaAnalysis,
        ProductFormulaSetup,
        ProductFormulaModelAnalysis
    },
    setup() {
        const activeName = ref('analysis')
      
        return {
            activeName
        }
    }
})
</script>

<style lang="postcss" scoped>
  .tech-product-formula{
    :deep(.el-tabs){
      .el-tabs__header{
        margin-bottom: 0;
        .el-tabs__nav{
          .el-tabs__item{
            margin: 0 0.5rem;
            padding: 0 0.5rem;
          }
        }
      }
    }



  }
</style>