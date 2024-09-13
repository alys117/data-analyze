<script setup>
import CustomChart from '@/components/echart/custom-chart.vue'
import { numToWords } from '@/utils/util.js'
import { useStepStore } from '@/stores/step.js'
const step = useStepStore()

const { nodes } = defineProps({
  nodes: {
    type: Array,
    default: () => []
  },
  level: {
    type: Number,
    default: 1
  }
})
const descp = computed(() => {
  return (description) => {
    return description && description.replace(/\n/g, '<br>')
  }
})
onMounted(() => {
  console.log(step.step3)
})
</script>

<template>
  <div v-for="(node, index) in nodes" :key="node.id" class="node">
    <span :data-node-id="node.id" :class="['title-' + level]">{{ `${ level === 1 ? numToWords(index+1): (index+1)}、${node.label}` }}</span>
    <div v-if="node.description" style="background: #fcfcfc;padding: 10px;margin: 20px 0;">
      <div v-html="descp(node.description)"></div>
    </div>
    <div v-if="node.chartData && node.chartData.draw_data">
      <custom-chart v-if="node.chartData" :data="node.chartData" />
    </div>
    <div v-if="node.children && node.children.length">
      <node-preview :nodes="node.children" :level="level+1" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.node{
  margin: 20px;
}
.title-1{
  font-size: 22px;
}
.title-2{
  font-size: 20px;
}
.title-3{
  font-size: 18px;
}
.title-4{
  font-size: 16px;
}
</style>
