<template>
  <el-drawer size="34%" :with-header="true" custom-class="bf-drawer">
    <template v-slot:header>
      <div class="bg-slate-100 p-3">
        <p class="iconfont icon-shaixuan inline-block"></p>
        <span class="ml-2">高级筛选</span>
      </div>
    </template>
    <div class="ml-6 mr-6 mt-4">
      <!--类别 -->
      <div class="">
        <div class="inline-block float-left"><span>类别：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="闸阀系列" />
            <el-checkbox label="球阀系列" />
            <el-checkbox label="蝶阀系列" />
            <el-checkbox label="截止阀系列" />
            <el-checkbox label="安全阀系列" />
            <el-checkbox label="疏水阀系列" />
            <el-checkbox label="止回阀系列" />
            <el-checkbox label="排气阀系列" />
            <el-checkbox label="控制阀" />
            <el-checkbox label="配件" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 材质 -->
      <div class="">
        <div class="inline-block float-left"><span>材质：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="不锈钢" />
            <el-checkbox label="铸铁" />
            <el-checkbox label="碳钢" />
            <el-checkbox label="黄铜" />
            <el-checkbox label="铸钢" />
            <el-checkbox label="球墨铸铁" />
            <el-checkbox label="合金钢" />
            <el-checkbox label="铜" />
            <el-checkbox label="塑料" />
            <el-checkbox label="铜合金" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 压力 -->
      <div class="">
        <div class="inline-block float-left"><span>压力：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="0.25MP" />
            <el-checkbox label="1.0MP" />
            <el-checkbox label="1.6MP" />
            <el-checkbox label="2.5MP" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 加长杆 -->
      <div class="">
        <div class="inline-block float-left"><span>加长杆：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="150mm" />
            <el-checkbox label="200mm" />
            <el-checkbox label="300mm" />
            <el-checkbox label="400mm" />
            <el-checkbox label="500mm" />
            <el-checkbox label="1000mm" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 电压 -->
      <div class="">
        <div class="inline-block float-left"><span>电压：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="电压名称1" />
            <el-checkbox label="电压名称2" />
            <el-checkbox label="电压名称3" />
            <el-checkbox label="电压名称4" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 防爆等级 -->
      <div class="">
        <div class="inline-block float-left"><span>防爆等级：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="防爆等级1" />
            <el-checkbox label="防爆等级2" />
            <el-checkbox label="防爆等级3" />
            <el-checkbox label="防爆等级4" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 整定压力 -->
      <div class="">
        <div class="inline-block float-left"><span>整定压力：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="整定压力1" />
            <el-checkbox label="整定压力2" />
            <el-checkbox label="整定压力3" />
            <el-checkbox label="整定压力4" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 工作压力 -->
      <div class="">
        <div class="inline-block float-left"><span>工作压力：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="工作压力1" />
            <el-checkbox label="工作压力2" />
            <el-checkbox label="工作压力3" />
            <el-checkbox label="工作压力4" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 结构长度 -->
      <div class="">
        <div class="inline-block float-left"><span>结构长度：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="长度1" />
            <el-checkbox label="长度2" />
            <el-checkbox label="长度3" />
            <el-checkbox label="长度4" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
      <!-- 产品重量 -->
      <div class="">
        <div class="inline-block float-left"><span>产品重量：</span></div>
        <div class="inline-block w-500">
          <el-checkbox-group v-model="data.checkList" @change="changeCheck()">
            <el-checkbox label="重量1" />
            <el-checkbox label="重量2" />
            <el-checkbox label="重量3" />
            <el-checkbox label="重量4" />
          </el-checkbox-group>
        </div>
      </div>
      <el-divider />
    </div>
  </el-drawer>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const data = reactive({
      checkList: ['']
    })

    return {
      data
    }
  }
})
</script>
<style lang="less" scoped></style>
