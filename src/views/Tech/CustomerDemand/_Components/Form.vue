<template>
  <transition name="el-fade-in">
    <div class="tech-technical-treatment open-select-mask w-full h-full bg-black bg-opacity-30 z-50 fixed top-0 left-0 flex flex-center items-start pt-24 pb-12 overflow-y-auto">
      <div class="overflow-y-auto" :class="[boxClass.boxWidth, boxClass.boxHeight]">
        <div class="bf-windows-content max-w-screen-xl bg-white flex flex-col overflow-x-hidden">
          <div class="bf-window-header-bg h-10 flex justify-between items-center px-3 shadow-sm border-b border-gray-100">
            <div class="flex items-center justify-between w-full mr-4">
              <div>技术处理</div>
            </div>
            <div class="cursor-pointer rounded-full bg-gray-200 bg-opacity-50 p-0.5" style="line-height: 0">
              <el-icon @click="closeWindow('close')">
                <el-icon-close />
              </el-icon>
            </div>
          </div>
          <div class="flex-1 overflow-hidden">
            <el-scrollbar>
              <div class="box">
                <FormProductInfo ref="ruleProductInfoRef" :productInfo="data.ProductInfo" :dictionaryData="data.DictionaryData" @updata="updataProductInfo($event)" @submit="submitProductInfo($event)" v-if="!data.IsLoad" />
              </div>
            </el-scrollbar>
          </div>
          <div class="open-select-btn pt-2 pb-2 pl-4 pr-4 flex justify-end border-gray-100">
            <el-button @click="closeWindow('close')">取消 </el-button>
            <el-button type="danger" @click="submitForm(0)">暂存</el-button>
            <el-button type="primary" @click="submitForm(1)">保存</el-button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script lang="ts">
import { defineComponent, SetupContext, reactive, onMounted, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { GetProductBasicsServiceEntityById, PostEditTechProductBasicsSave } from '/@/api/tech/ProductBasics'

import FormProductInfo from './FormProductInfo.vue'
import { useCommonStore } from '/@/store/modules/Common'

//获取字典数据
const getDictionaryData = (data: any) => {
  const store = useCommonStore() //记得加这一句
  // 获取常规类别
  store.getDict('tech_product_general_options').then((res: any) => {
    data.DictionaryData.ClassOptions = res
  })
  //获取产品单位
  store.getDict('tech_product_unit').then((res: any) => {
    data.DictionaryData.UnitOptions = res
  })
  //获取质量等级
  store.getDict('tech_product_quality').then((res: any) => {
    data.DictionaryData.QualityOptions = res.map((x: any) => {
      return { DicKey: parseInt(x.DicKey), DicValue: x.DicValue }
    })
  })
  //获取可替代性
  store.getDict('tech_product_fungibility').then((res: any) => {
    data.DictionaryData.FungibilityOptions = res.map((x: any) => {
      return { DicKey: parseInt(x.DicKey), DicValue: x.DicValue }
    })
  })
  //获取技术难度
  store.getDict('tech_product_difficulty').then((res: any) => {
    data.DictionaryData.DifficultyOptions = res.map((x: any) => {
      return { DicKey: parseInt(x.DicKey), DicValue: x.DicValue }
    })
  })
}

// 产品信息方法
const productInfoForm = (data: any) => {
  const ruleProductInfoRef = ref()

  const submitForm = (val: number) => {
    data.submitState = val
    //存在提交关闭窗口父级需要刷新数据
    ruleProductInfoRef.value.submitForm()
  }
  return {
    ruleProductInfoRef,
    submitForm
  }
}

export default defineComponent({
  components: { FormProductInfo },
  emits: ['closeWindow'],
  props: {
    FormData: {
      type: Object,
      default: {
        Id: 0,
        CurrEnquiryId: 0
      }
    }
  },
  setup(props, context: SetupContext) {
    // 页面样式
    const boxClass = reactive({
      boxWidth: 'w-700',
      boxHeight: 'h-700'
    })

    // 监听页面关闭
    const closeWindow = (type: string) => {
      context.emit('closeWindow', type)
    }

    const data = reactive({
      Id: '',
      CurrEnquiryId: 0,
      ProductInfo: {
        PropertysList: [], //映射属性
        ProductMinMain: [], //阀体
        AccessoriesList: [], //配件
        IsSetAttribute: false //是否设置属性（仅前端交互）
      },
      IsLoad: true, //加载数据
      DictionaryData: {
        ClassOptions: [], //常规类别
        UnitOptions: [], //产品单位
        QualityOptions: [], //质量等级
        FungibilityOptions: [], //可替代性
        DifficultyOptions: [] //技术难度
      },
      submitState: 0 //保存状态 0暂存 1提交
    })

    // 获取基础数据
    const getData = () => {
      data.IsLoad = true
      GetProductBasicsServiceEntityById(data.Id)
        .then(res => {
          if (res.code == 1) {
            let _obj = res.data || {}
            let _accessoryList = _obj.AccessoryList || []
            let _productInfo = JSON.parse(JSON.stringify(_obj))
            _productInfo.AccessoryList = undefined

            _productInfo.ProductMinMain = []
            _productInfo.AccessoriesList = []
            _accessoryList.forEach((item: any) => {
              if (item.TypeInfo == 1) {
                //阀体
                _productInfo.ProductMinMain.push(item)
              } else {
                //配件
                _productInfo.AccessoriesList.push(item)
              }
            })

            data.ProductInfo = _productInfo
            data.IsLoad = false

            // 设置盒子样式
            setBoxClass()
          } else {
            ElMessage.error('加载产品出错')
          }
        })
        .catch(e => {
          ElMessage.error('加载信息出错')
          console.log(`GetProductBasicsServiceEntityById${e}`)
        })
    }

    // 设置盒子样式
    const setBoxClass = () => {
      //存在阀体或者 设置产品属性时
      if (data.ProductInfo.ProductMinMain.length > 0 || data.ProductInfo.IsSetAttribute == true) {
        boxClass.boxWidth = 'w-1200'
      } else {
        boxClass.boxWidth = 'w-700'
      }
    }

    // 产品信息被更新
    const updataProductInfo = (val: any) => {
      data.ProductInfo = val
      // 设置盒子样式
      setBoxClass()
    }

    // 提交产品信息
    const submitProductInfo = (val: any) => {
      data.ProductInfo = val
      let info = JSON.parse(JSON.stringify(data.ProductInfo))
      info.ProductMinMain = undefined
      info.AccessoriesList = undefined
      info.AccessoryList = []

      //阀体
      data.ProductInfo.ProductMinMain.forEach((item: any) => {
        item.TypeInfo = 1
        info.AccessoryList.push(item)
      })

      //配件
      data.ProductInfo.AccessoriesList.forEach((item: any) => {
        item.TypeInfo = 2
        info.AccessoryList.push(item)
      })

      // 保存
      PostEditTechProductBasicsSave(info)
        .then(res => {
          if (res.code == 1) {
            ElMessage.success('保存成功！')

            if (data.submitState == 1) {
              //关闭窗口
              closeWindow('submit')
            } else {
              //重新获取产品信息
              getData()
            }
          } else {
            ElMessage.error(res.message)
          }
        })
        .catch(e => {
          console.log(`PostEditTechProductBasicsSave${e}`)
        })
    }

    //页面完成加载后执行
    onMounted(() => {
      data.Id = props.FormData.Id
      data.CurrEnquiryId = props.FormData.CurrEnquiryId

      //获取字典数据
      getDictionaryData(data)

      //获取基础数据
      getData()
    })
    return {
      boxClass,
      data,
      closeWindow,
      updataProductInfo,
      submitProductInfo,
      ...productInfoForm(data)
    }
  }
})
</script>
<style lang="postcss" scoped>
.tech-technical-treatment {
}
</style>
