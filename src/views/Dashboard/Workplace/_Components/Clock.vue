<template>
  <div class="clock">
    <p class="date">{{ date }}</p>
    <p class="time">{{ time }}</p>
    <p class="text">{{ text }}</p>
  </div>
</template>

<script lang='ts'>
import { defineComponent, onMounted, ref } from 'vue'
import { zeroPadding } from '/@/utils/tools'
import calendar from '/@/assets/ts/calendar'

export default defineComponent({
  setup() {
    const date = ref(null)
    const time = ref(null)
    const text = ref(null)
    let timerId = null;

    const updateTime = () => {
      var cd = new Date();
      time.value = zeroPadding(cd.getHours(), 2) + ':' + zeroPadding(cd.getMinutes(), 2) + ':' + zeroPadding(cd.getSeconds(), 2);

      if ((date.value || '').length < 10) {
        const { IMonthCn, IDayCn, gzYear, Animal, gzMonth, gzDay, ncWeek } = calendar(cd.getFullYear(), cd.getMonth() + 1, cd.getDate())
        date.value = zeroPadding(cd.getFullYear(), 4) + '-' + zeroPadding(cd.getMonth() + 1, 2) + '-' + zeroPadding(cd.getDate(), 2) + ' ' + ncWeek;

        text.value = IMonthCn + IDayCn + ' ' + gzYear + '年(' + Animal + ') ' + gzMonth + '月' + gzDay + '日'
        // console.log(IMonthCn,IDayCn,gzYear,Animal,gzMonth,gzDay,ncWeek)
      }
    };


    onMounted(() => {
      if (timerId) {
        clearInterval(timerId) // 清除定时任务
      }
      timerId = setInterval(updateTime, 1000);
      updateTime();

    })


    return {
      date,
      time,
      text
    }
  }
})
</script>

<style lang='postcss' scoped>
.clock {
  clear: both;
  font-family: "Share Tech Mono", monospace;
  color: #fff;
  text-align: center;
  color: #daf6ff;
  text-shadow: 0 0 20px #0aafe6, 0 0 20px rgba(10, 175, 230, 0);

  .date {
    letter-spacing: 0.1em;
    font-size: 1.1rem;
    line-height: 1.1;
  }

  .time {
    letter-spacing: 0.05em;
    font-size: 2.4rem;
    line-height: 1.1;
  }

  .text {
    font-size: 0.8rem;
    line-height: 1.1;
  }
}
</style>
