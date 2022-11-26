<!--
 * @Author: ZHJ
 * @Date: 2022-08-08 14:37:07
 * @LastEditTime: 2022-08-11 17:00:14
 * @LastEditors: ZHJ
 * @Description: 
 * @FilePath: \beifangrenzixitong\src\views\HR\SchoolView\Further\_Components\RecordIndex.vue
 * 版权声明
-->

<template>
  <div class="FurtherCurrentIndex bf-SchoolView-margin">
    <div class="pt-4">
      <div class="flex items-start">
        <div class="w-full">
          <el-card class="box-card right-minHeight" shadow="never">
            <main class="relative rounded border p-3 mt-5" v-for="(val, index) in data.planList" :key="index">
              <div class="flex items-center">
                <div class="w-6/12 flex items-center">
                  <el-image style="width: 160px; height: 96px; border-radius: 4px" :src="remoteUrlEvent(val.CoverImg)" fit="cover" />
                  <div class="ml-4">
                    <div class="mb-3 font-semibold">{{ val.Name }}</div>
                    <div class="FileType" v-if="val.FileType">
                      <span v-if="val.FileType == 'PDF'"> PDF </span>
                      <span v-if="val.FileType == 'VIDEO'">视频</span>
                    </div>
                    <div class="flex items-center justify-between">
                      <el-rate v-model="val.Rate" disabled />
                    </div>
                  </div>
                </div>
              </div>
              <div class="Score_bg text-xs text-white">学习次数{{ val.StudyCount }}次</div>
            </main>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { defineComponent, onBeforeMount, onMounted, reactive } from 'vue'
// import CurrentLearning from './_Components/CurrentLearning.vue'
import MyAttendance from '/@/views/HR/View/Attendance/MyAttendance/Index.vue'
import WorkSummary from '/@/views/HR/View/WorkSummary/Index.vue'
import MyWhereabouts from '/@/views/HR/View/MyWhereabouts/Index.vue'
import { GetFinishStudyHistry } from '/@/api/hr/School/Train'
import { remoteUrl } from '/@/utils/tools'
export default defineComponent({
  components: { MyAttendance, MyWhereabouts, WorkSummary },
  props: {},
  setup() {
    const router = useRouter()
    // 筛选数据
    const form: Isearch = reactive({
      page: 1,
      size: 10000,
      planStatus: '10,20,30',
      force: 1
    })
    const data: any = reactive({
      activeNames: '1',
      planList: []
    })
    // 网址拼接
    const remoteUrlEvent = (val: any) => {
      return remoteUrl(val)
    }
    const handleChange = (val: string[]) => {
      console.log(val)
    }
    onMounted(() => {
      GetFinishStudyHistry(form).then((res: any) => {
        if (res.code == 1) {
          data.planList = res.data.records
        }
      })
    })
    return {
      data,
      handleChange,
      remoteUrlEvent
    }
  }
})
</script>

<style lang="postcss" scoped>
.right-minHeight {
  min-height: calc(100vh - 16.6rem);
  overflow-y: auto;
}
:deep(.el-collapse-item__header) {
  background: #f5f6f7;
  padding: 0 12px;
}
:deep(.el-collapse-item__wrap) {
  border-bottom: none;
}
.FileType {
  margin: 10px 0 3px;
  width: 52px;
  height: 24px;
  line-height: 24px;
  border: 1px solid #468bfd;
  border-radius: 4px;
  font-size: 12px;
  color: #468bfd;
  text-align: center;
}
:deep(.el-rate) {
  --el-rate-icon-size: 25px;
  --el-rate-icon-margin: 0px;
}
.Score_bg {
  line-height: 28px;
  text-align: center;
  position: absolute;
  right: -1px;
  top: -1px;
  min-width: 100px;
  height: 28px;
  background: #36a6fb;
  border-radius: 0 4px 0 4px;
}
</style>
