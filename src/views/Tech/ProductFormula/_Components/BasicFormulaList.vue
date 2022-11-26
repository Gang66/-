<template>
  <OpenWindow :boxStyle="boxStyle" :isShow="true" @closeWindow="closeWindow('close')" title="编辑配置" class="tech-product-basic-formula-list">
    <div class="relative">
      <div class="absolute top-2 right-2 z-50"><el-button type="primary" size="small" @click="openWindowBasicFormulaForm({})">新增</el-button></div>
    </div>
    <el-tabs v-model='data.activeName'>
          <template v-if="data.digit==1">
            <el-tab-pane label='类型' name='type'>
                <div class="bf-table-content ">
                  <el-table :data="data.typeList" class="w-full" :key="1">
                    <el-table-column type="index" label="序号" width="70" align="center" />
                    <el-table-column prop="Code" label="编号" width="70" align="center" />
                    <el-table-column prop="Mean" label="含义" min-width="100" align="center" />
                    <el-table-column prop="" label="操作" width="80" align="center">
                      <template #default="scope">
                        <el-button text key="primary" type="primary" @click="openWindowBasicFormulaForm(scope.row)">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
            </el-tab-pane>
            <el-tab-pane label='前缀' name='prefix'>
                <div class="bf-table-content ">
                  <el-table :data="data.prefixList" class="w-full" :key="1">
                    <el-table-column type="index" label="序号" width="70" align="center" />
                    <el-table-column prop="Prefix" label="前缀" width="70" align="center" />
                    <el-table-column prop="Mean" label="含义" width="100" align="center" />
                    <el-table-column prop="Remark" label="备注" min-width="100" align="center"  />
                    <el-table-column prop="" label="操作" width="80" align="center">
                      <template #default="scope">
                        <el-button text key="primary" type="primary" @click="openWindowBasicFormulaForm(scope.row)">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
            </el-tab-pane>
          </template>
          <template v-else-if="data.digit==4">
            <el-tab-pane label='结构形式' name='structure'>
              <template #label>
                <el-popover placement="bottom-start" v-model:visible="data.visiblePopover" :width="400" trigger="click">
                  <template #reference>
                    <span @click="data.visiblePopover=true">{{countObj.StructuralName}} <el-icon><el-icon-ArrowDown  /></el-icon></span>
                  </template>
                  <ul class="clearfix">
                    <li class="float-left w-1/3 text-base pt-1 pb-1 cursor-pointer" v-for="item in data.typeList" :key="item.Id" @click="handleStructuralChoice(item)">
                      <span :class="{'text-blue-500':item.Id==data.formulaTypeId}">{{item.Mean}}</span>
                    </li>
                  </ul>
                </el-popover>
              </template>
              <div class="bf-table-content ">
                  <el-table :data="data.list" class="w-full" :key="1">
                    <el-table-column type="index" label="序号" width="60" align="center" />
                    <el-table-column prop="Code" label="编号" width="60" align="center" />
                    <el-table-column prop="Mean" label="含义" min-width="200" align="center" />
                    <!-- <el-table-column prop="Remark" label="备注" min-width="100" align="center"  /> -->
                    <el-table-column prop="" label="操作" width="80" align="center">
                      <template #default="scope">
                        <el-button text key="primary" type="primary" @click="openWindowBasicFormulaForm(scope.row)">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
            </el-tab-pane>
          </template>
          <template v-else>
            <el-tab-pane label='通用' name='currency'>
                <div class="bf-table-content ">
                  <el-table :data="data.meanList" class="w-full" :key="1">
                    <el-table-column type="index" label="序号" width="70" align="center" />
                    <el-table-column prop="Code" label="编号" width="70" align="center" />
                    <el-table-column prop="Mean" label="含义" width="100" align="center" />
                    <el-table-column prop="Remark" label="备注" min-width="100" align="center"  />
                    <el-table-column prop="" label="操作" width="80" align="center">
                      <template #default="scope">
                        <el-button text key="primary" type="primary" @click="openWindowBasicFormulaForm(scope.row)">编辑</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
            </el-tab-pane>
          </template>
      </el-tabs>
      <BasicFormulaForm v-if="basicFormulaFormOpenData.visible" :FormData="basicFormulaFormOpenData.formData" @closeWindow="closeWindowBasicFormulaForm($event)" />
  </OpenWindow>
</template>


<script lang="ts">
import OpenWindow from '/@/components/OpenWindow/index.vue'
import { defineComponent, onMounted, reactive, ref, SetupContext,computed } from 'vue'
import { ElMessage } from 'element-plus'
import { getProductFormulaData } from "/@/api/tech/ProductFormula";
import BasicFormulaForm from './BasicFormulaForm.vue'


//编辑配置信息弹窗
const basicFormulaFormOpen = (data:any)=>{
    let basicFormulaFormOpenData:any = reactive({
        visible:false,
        formData:{}
    });

    //打开弹窗
    const openWindowBasicFormulaForm = (val:any)=>{
        basicFormulaFormOpenData.formData={
          Id:val.Id,
          FormulaTypeId:val.FormulaTypeId||data.data.formulaTypeId,
          Code:val.Code||val.Prefix,
          Mean:val.Mean,
          Remark:val.Remark,
          Digit:data.data.digit,
          FormulaType:data.data.activeName
        }
        basicFormulaFormOpenData.visible=true
    }

    //关闭弹窗
    const closeWindowBasicFormulaForm = (type: string)=>{
        basicFormulaFormOpenData.visible=false
        if(type=='close')
        data.getData(data.data)
    }

    return {
        basicFormulaFormOpenData,
        openWindowBasicFormulaForm,
        closeWindowBasicFormulaForm
    }
}

//获取数据
const getFormulaData = async (digit:null)=>{
  let obj:any = {
    TypeList:[],
    PrefixList:[],
    MeanList:[]
  }
  await getProductFormulaData({formulaId:0,digit}).then(res => {
      if(res.code === 1) {
          obj = res.data
      }
      else{
          ElMessage.error(res.message);
      }
  })
  .catch(e => { 
      console.log(`getProductFormulaData${e}`) 
  })
  return obj
}

//获取数据
const getData = async (data:any)=>{
  
  if(data.digit==1){
    //类型、前缀
    data.activeName='type'
    let _obj = await getFormulaData(data.digit)
    data.typeList=_obj.TypeList
    data.prefixList=_obj.PrefixList
  }
  else if(data.digit==4){
    //结构形式
    data.activeName='structure'
    let _obj = await getFormulaData(data.digit)
    data.typeList=_obj.TypeList
    data.meanList=_obj.MeanList
    if((data.formulaTypeId||0)<=0){
      if(data.typeList.length>0)
        data.formulaTypeId = data.typeList[0].Id
    }
    data.list = data.meanList.filter((x:any)=>{ return x.FormulaTypeId==data.formulaTypeId})
  }
  else if(data.digit==6){
      ElMessage.error('无需审批！');
  }
  else{
    //通用
    data.activeName='currency'
    let _obj = await getFormulaData(data.digit)
    data.meanList= _obj.MeanList
  }

}

export default defineComponent({
  components: {
    OpenWindow,
    BasicFormulaForm
  },
  emits: ['closeWindow'],
  props: {
    // 解析代号
    digit: {
      type: Number,
      default: null
    },
  },
  setup(props, context: SetupContext) {
    let data: any = reactive({
      digit: 0,
      typeList:[],
      prefixList:[],
      meanList:[],
      list: [],
      activeName:'',
      visiblePopover:false,
      formulaTypeId:0
    })

    let countObj:any = reactive({
        StructuralName:''
    })

    //计算
    countObj.StructuralName = computed(():string=>{
      let _obj = data.typeList.find((x:any)=>{return x.Id==data.formulaTypeId})
      return (_obj||{}).Mean
    })


    // 关闭弹窗
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }
    
    // 页面样式
    const boxStyle = reactive({
      boxWidth: 'w-500',
      boxHeight: ''
    })

    //选择结构形式
    const handleStructuralChoice = (row:any)=>{
      data.formulaTypeId = row.Id
      data.visiblePopover = false
      data.list = data.meanList.filter((x:any)=>{ return x.FormulaTypeId==row.Id})
    }

    onMounted(() => {
      data.digit = props.digit
      getData(data)
    })

    return {
      boxStyle,
      data,
      closeWindow,
      ...basicFormulaFormOpen({data,getData}),
      handleStructuralChoice,
      countObj
      
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech-product-basic-formula-list{
 
 
}
</style>
