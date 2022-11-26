<template>
  <div class="ApprovalProcess">
    <el-collapse accordion>
      <el-collapse-item name="1">
        <template #title>
          <div class="text-sm bf-text-color-primary font-normal">审批记录</div>
        </template>
        <slot name="remarks"></slot>
        <div class="px-3">
          <Timeline>
            <TimelineItem v-for="(item, index) in data.StepList" :key="index">
              <template #others>
                <el-avatar v-if="item.HeadShot" :size="46" :src="remoteUrlEvent(item.HeadShot)" />
                <el-avatar v-else :size="46" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
              </template>
              <div class="ml-2 text-sm" :class="StateEvent(item).color">
                {{ StateEvent(item).title }}
              </div>
              <div class="flex ml-2 items-center">
                <template v-if="item.wFNodes">
                  <div>
                    <div class="flex items-center">
                      <div class="bf-text-color-primary">
                        {{ item.wFNodes.NodeName }}
                        <span v-if="item.CheckerName"> ({{ item.CheckerName }}) </span>
                      </div>
                      <div class="text-xs ml-4 bf-text-color-primary">{{ item.CheckTime }}</div>
                    </div>
                    <div class="" v-if="item.Remark">备注内容：{{ item.Remark }}</div>
                    <div v-if="item.Sign">
                      <el-image style="width: 100px; height: 26px" src="/src/assets/img/qianziceshi.png" fit="contain" />
                    </div>
                  </div>
                </template>
                <template v-else>
                  <div class="font-semibold">
                    {{ item.NodeName }}
                  </div>
                </template>
              </div>
            </TimelineItem>
          </Timeline>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script lang="ts">
import 'vue3-timeline/dist/style.css'
import { Timeline, TimelineTitle, TimelineItem } from 'vue3-timeline'
import { defineComponent, onMounted, reactive, SetupContext } from 'vue'
import { GetStepList } from '/@/api/wf/WFManagement'
import { remoteUrl } from '/@/utils/tools'
const changeEvent = (val: any) => {
  // 网址拼接
  const remoteUrlEvent = (val: any) => {
    return remoteUrl(val)
  }
  // 根据状态返回文字及颜色
  const StateEvent = (val: any) => {
    var arr = {
      title: '',
      color: ''
    }
    if (val.PrevStep == 0) {
      arr.title = '发起审批'
      arr.color = 'text-blue-400'
      return arr
    }
    if (val.State == 1) {
      arr.title = '审批通过'
      arr.color = 'text-green-400'
    } else if (val.State == 0) {
      arr.title = '审批驳回'
      arr.color = 'bf-error-color'
    } else {
      arr.title = '待审批'
      arr.color = 'text-yellow-600'
    }
    return arr
  }
  return { StateEvent, remoteUrlEvent }
}
export default defineComponent({
  components: {
    Timeline,
    TimelineTitle,
    TimelineItem
  },
  props: {
    checkId: {
      type: Number,
      default: null
    }
  },
  setup(props, context: SetupContext) {
    const data = reactive({
      StepList: []
    })
    onMounted(() => {
      GetStepList(props.checkId).then((res: any) => {
        if (res.code == 1) data.StepList = res.data.steps
      })
    })
    return { data, ...changeEvent(data) }
  }
})
</script>

<style lang="postcss" scoped>
.ApprovalProcess {
  :deep(.el-collapse-item__wrap) {
    will-change: height;
    background-color: var(--el-collapse-content-bg-color);
    overflow: hidden;
    box-sizing: border-box;
    border: none;
  }
  :deep(.el-collapse) {
    border: none;
  }
  :deep(.el-collapse-item__header) {
    border: none;
  }
  :deep(.timeline-item) {
    border-bottom: none;
  }
  :deep(.timeline-item) {
    margin: 0 0 16px 26px;
    padding-bottom: 1em;
  }
  :deep(.timeline) {
    margin: 0px 26px;
  }
  :deep(.timeline:after) {
    height: 96%;
  }
  :deep(.el-collapse-item__content) {
    padding-bottom: 25px;
    font-size: var(--el-collapse-content-font-size);
    color: var(--el-collapse-content-text-color);
    line-height: 1.7692307692;
  }
  :deep(.timeLineBottom) {
    margin: 0 0 0 23px;
  }
}
</style>
