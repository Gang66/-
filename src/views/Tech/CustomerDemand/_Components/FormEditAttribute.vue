<!-- 选择属性 -->
<template>
  <div class="tech-customer-demand-form-edit-attribute">
    <el-drawer v-model="data.visible" title="属性" size="400px" :show-close="false" :close-on-click-modal="false" @closed="closeDrawer('close')">
      <template #header="{ close, titleId, titleClass }">
        <div :id="titleId" :class="titleClass">
          <el-button class="close-but" type="danger" link @click="close">
            <el-icon><el-icon-circle-close /></el-icon>
          </el-button>
          <div class="text-right">
            <el-button type="primary" link @click="addAttributeGroup" v-if="data.ProductPropertys.MountingsId > 0">新增分组</el-button>
            <el-button type="primary" link @click="addAttribute">新增属性</el-button>
          </div>
        </div>
      </template>
      <div>
        <div class="mr-3">
          <el-form ref="ruleFormRef" :model="data.ProductPropertys" :rules="rules" status-icon :hide-required-asterisk="true" :show-message="false" label-width="80px">
            <el-row :gutter="11">
              <el-col :md="24" :lg="24">
                <el-form-item class="w-full" label="属性分类" prop="TypeInfo">
                  <el-select v-model="data.ProductPropertys.TypeInfo" class="w-full" placeholder="请选择" disabled>
                    <el-option v-for="item in dictionaryData.TypeInfoOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                  </el-select>
                </el-form-item>
              </el-col>
              <template v-if="data.ProductPropertys.MountingsId > 0">
                <el-col :md="24" :lg="24">
                  <el-form-item class="w-full" label="所 属 组" prop="MountingsId">
                    <el-select v-model="data.ProductPropertys.MountingsId" class="w-full" placeholder="请选择">
                      <el-option v-for="item in data.AttributeList" :key="item.Id" :label="item.Name" :value="item.Id" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item class="w-full" label="属性名称" prop="Name">
                    <el-input v-model="data.ProductPropertys.Name" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item class="w-full" label="填写方式" prop="PropertyTypeInfo">
                    <el-select v-model="data.ProductPropertys.PropertyTypeInfo" class="w-full" placeholder="请选择">
                      <el-option v-for="item in dictionaryData.PropertyTypeInfoOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item class="w-full" label="是否必填" prop="IsRequired">
                    <el-select v-model="data.ProductPropertys.IsRequired" class="w-full" placeholder="请选择">
                      <el-option v-for="item in dictionaryData.RequiredOptions" :key="item.DicKey" :label="item.DicValue" :value="item.DicKey" />
                    </el-select>
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="24">
                  <el-form-item class="w-full" label="属性排序" prop="orderNum">
                    <el-input-number v-model="data.ProductPropertys.orderNum" placeholder="请输入" :min="1" :max="99999" />
                  </el-form-item>
                </el-col>
              </template>
              <template v-else>
                <el-col :md="24" :lg="24">
                  <el-form-item class="w-full" label="分组名称" prop="Name">
                    <el-input v-model="data.ProductPropertys.Name" placeholder="请输入" />
                  </el-form-item>
                </el-col>
              </template>
            </el-row>
            <template v-if="data.ProductPropertys.PropertyTypeInfo > 1">
              <el-divider content-position="left">
                <span class=" mr-5 ">属性选项</span> 
                <el-button link @click="addAttributesItme"><el-icon><el-icon-plus /></el-icon>添加</el-button>
              </el-divider>
              <el-row :gutter="11" v-for="(item,index) in data.ProductPropertys.AttributesItmeList" :key="index">
                <el-col :md="20" :lg="20">
                  <el-form-item class="w-full" :label="'选项'+(index+1)" :prop="'AttributesItmeList.' + index + '.Value'" :rules="rules.ComInput">
                    <el-input v-model="item.Value" placeholder="请输入" />
                  </el-form-item>
                </el-col>
                <el-col :md="24" :lg="4">
                  <el-button type="danger" link @click="addAttributesItme"><el-icon><el-icon-delete /></el-icon>删除</el-button>
                </el-col>
              </el-row>
            </template>
          </el-form>
        </div>
        <div><el-button type="primary" class="w-full" @click="submitForm">提交</el-button></div>
      </div>
    </el-drawer>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, reactive, ref, SetupContext, computed } from 'vue'
import { ElMessage, FormRules, ElMessageBox } from 'element-plus'
import { GetProductAttributesTree,PostEditProductAttributesSave } from '/@/api/tech/ProductFormula'

// 表单事件
const formEvent = (data: any) => {
  const ruleFormRef = ref()
  // 表单提交
  const submitForm = async () => {
    const valid = await ruleFormRef.value.validate().catch(() => {})
    if (valid) {
      PostEditProductAttributesSave(data.data.ProductPropertys)
      .then(res => {
      if (res.code == 1) {
        ElMessage.success(res.message)
        data.closeDrawer('submit')
      } else {
        ElMessage.error(res.message)
      }
    })
    .catch(e => {
      ElMessage.error('表单提交出错')
      console.log(`PostEditProductAttributesSave${e}`)
    })
      
    }
  }

  //校验
  const rules = reactive<FormRules>({
    Name: [{ required: true, message: '请填写', trigger: 'blur' }],
    MountingsId: [{ required: true, message: '请选择', trigger: 'blur' }],
    TypeInfo: [{ required: true, message: '请选择', trigger: 'blur' }],
    PropertyTypeInfo: [{ required: true, message: '请选择', trigger: 'blur' }],
    IsRequired: [{ required: true, message: '请选择', trigger: 'blur' }],
    orderNum: [{ required: true, message: '请选择', trigger: 'blur' }],

    ComInput: [{ required: true, message: '请填写', trigger: 'blur' }]
  })

  //新增属性
  const addAttributesItme = ()=>{
    data.data.ProductPropertys.AttributesItmeList.push({
      Id:0,
      Value:''
    })
  }

  return {
    rules,
    submitForm,
    ruleFormRef,
    addAttributesItme
  }
}

// 获取基础数据
const getData = (data: any) => {
  GetProductAttributesTree(data.attributeInfo.TypeInfo)
    .then(res => {
      if (res.code == 1) {
        data.data.AttributeList = res.data || []

        data.data.ProductPropertys = JSON.parse(JSON.stringify(data.attributeInfo))
      } else {
        ElMessage.error('加载属性出错')
      }
    })
    .catch(e => {
      ElMessage.error('加载属性信息出错')
      console.log(`GetProductAttributesTree${e}`)
    })
}

export default defineComponent({
  props: {
    attributeInfo: {
      type: Object,
      default: {}
    },
    //数据字典数据
    dictionaryData: {
      type: Object,
      default: {
        PropertyTypeInfoOptions: [], //产品属性类型选项
        RequiredOptions: [], //产品属性是否必填选项
        TypeInfoOptions: [] //产品阀体类型选项
      }
    }
  },
  emits: ['closeDrawer'],
  setup(props, context: SetupContext) {
    let data = reactive({
      visible: true,
      AttributeList: <Array<any>>[],
      ProductPropertys: {
        Id: 0,
        Name: '', //属性名称
        PropertyTypeInfo: 1, //填写方式
        MountingsId: 0, //分组id
        TypeInfo: 1, //1 产品  2 配件
        IsRequired: 0, //是否必填
        orderNum: 1,
        AttributesItmeList: [] //属性选项
      }
    })

    // 新建分组
    const addAttributeGroup = () => {
      data.ProductPropertys.Id = 0
      data.ProductPropertys.Name = ''
      data.ProductPropertys.PropertyTypeInfo = 1
      data.ProductPropertys.MountingsId = 0
      data.ProductPropertys.TypeInfo = props.attributeInfo.TypeInfo
      data.ProductPropertys.IsRequired = 0
      data.ProductPropertys.orderNum = 0
      data.ProductPropertys.AttributesItmeList = []
    }

    // 新建属性
    const addAttribute = () => {
      data.ProductPropertys.Id = 0
      data.ProductPropertys.Name = ''
      data.ProductPropertys.PropertyTypeInfo = props.attributeInfo.PropertyTypeInfo
      data.ProductPropertys.MountingsId = props.attributeInfo.MountingsId>0?props.attributeInfo.MountingsId:props.attributeInfo.Id
      data.ProductPropertys.TypeInfo = props.attributeInfo.TypeInfo
      data.ProductPropertys.IsRequired = props.attributeInfo.IsRequired
      data.ProductPropertys.orderNum = props.attributeInfo.orderNum
      data.ProductPropertys.AttributesItmeList = []
    }

    // 关闭弹窗
    const closeDrawer = (type: string) => {
      context.emit('closeDrawer', type)
    }

    onMounted(() => {
      getData({ data, attributeInfo: props.attributeInfo })
    })
    return {
      data,
      closeDrawer,
      addAttributeGroup,
      addAttribute,
      ...formEvent({ data, closeDrawer })
    }
  }
})
</script>

<style lang="postcss" scoped>
.tech-customer-demand-form-edit-attribute {
  :deep(.el-drawer__header) {
    margin-bottom: 0;
    .close-but {
      position: absolute;
      top: 0.2rem;
      left: 0.5rem;
      font-size: 1.5rem;
    }
  }
}
</style>
