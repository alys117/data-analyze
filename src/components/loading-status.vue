<script setup>
import emitter from '@/utils/mitt.js'

const INTERVAL = 200
const { process } = defineProps({
  process: Object
})
const total = process.reduce((acc, cur) => acc + cur.timeConsuming, 0)
const percentages = process.map(item => item.timeConsuming / total * 100)
const processPoints = []
percentages.reduce((acc, cur) => {
  processPoints.push(acc + cur)
  return acc + cur
}, 0)
console.log(processPoints, 'processPoints')
let count = 0
let point = 0
const dian = ref('')
const interval = setInterval(() => {
  // if (percentage.value >= 100 - chuck()) {
  //   clearInterval(interval)
  //   return
  // }
  percentage.value >= 100 - chuck() || (percentage.value = percentage.value + chuck())
  tip.value = percentage.value < processPoints[count] ? process[count].content : process[count++].content
  dian.value = '.'.repeat(point++ % 6)
}, INTERVAL)
const percentage = ref(0)
const tip = ref('')
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]
function chuck() {
  const arr = []
  for (const pr of process) {
    const arrIncrease = Array.from({ length: pr.timeConsuming * 1000 / INTERVAL }, (v, k) => 0)
    arr.push(...arrIncrease)
  }
  return 100 / arr.length
}
const PROCESSES = [
  { content: '挑选', timeConsuming: 35 },
  { content: '图表描述', timeConsuming: 10 },
  { content: '写sql', timeConsuming: 35 },
  { content: '绘图', timeConsuming: 5 },
  { content: '二级标题重写', timeConsuming: 5 },
  { content: '分析思路', timeConsuming: 12 },
  { content: '分析中', timeConsuming: 5 }
]
onMounted(() => {
  console.log(process, 'process')
  if (process) {
    const proc = PROCESSES.find(item => item.content === process.content)
    console.log(proc, '[查找结果]')
  }
  emitter.on('shutdown', (process) => {
    clearInterval(interval)
    percentage.value = 100
  })
})
onUnmounted(() => {
  clearInterval(interval)
})
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <el-progress type="dashboard" :percentage="percentage" :color="colors">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage.toFixed(1) }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </el-progress>
    <h3>
      <span style="display: inline-block;width: 100px;text-align: right">{{ tip }}</span>
      <span style="display: inline-block;width: 60px;text-align: left">{{ dian }}</span>
      <!--      <span style="display: inline-block;width: 50px;text-align: end">{{ percentage.toFixed(0) + '%' }}</span>-->
    </h3>
  </div>
</template>

<style scoped lang="scss">
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}
.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: 12px;
}
</style>
