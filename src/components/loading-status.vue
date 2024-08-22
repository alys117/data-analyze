<script setup>
const tip = ref('')
const INTERVAL = 100
setInterval(() => {
  tip.value = 'loading...' + percentage.value
  if (percentage.value === 99) return
  percentage.value = (percentage.value % 100) + 1
}, INTERVAL)
const percentage = ref(0)
const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 }
]
function calcTiming() {
  const arrIncrease = Array.from({ length: process.timeConsuming * 1000 / INTERVAL }, (v, k) => 0)
  const n = arrIncrease.length / 100
}
const PROCESSES = [
  { content: '挑选', timeConsuming: 35 },
  { content: '图表描述', timeConsuming: 10 },
  { content: '写sql', timeConsuming: 35 },
  { content: '绘图', timeConsuming: 5 },
  { content: '二级标题重写', timeConsuming: 5 },
  { content: '分析思路', timeConsuming: 12 },
  { content: '分析中...', timeConsuming: 5 }
]
const { process } = defineProps({
  process: Object
})
onMounted(() => {
  console.log(process, 'process')
  if (process) {
    const proc = PROCESSES.find(item => item.content === process.content)
    console.log(proc, '[查找结果]')
  }
})
</script>

<template>
  <div style="display: flex; flex-direction: column; align-items: center">
    <el-progress type="dashboard" :percentage="percentage" :color="colors">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </el-progress>
    <h3>loading-test {{ tip }}</h3>
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
