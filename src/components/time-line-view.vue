<template>
  <el-timeline>
    <el-timeline-item
      v-for="(activity, index) in activities"
      :key="index"
      :icon="activity.icon"
      :type="activity.type"
      :color="activity.color"
      :size="activity.size"
      :hollow="activity.hollow"
      :timestamp="activity.timestamp"
      :hide-timestamp="true"
      :class="levelClass"
      :data-id="activity.id"
    >
      <div :style="{'margin-bottom': '20px', 'font-weight': activity.id === boldId ?'900':'500', 'color': activity.id === boldId ?'#2667db':''}" @click="checkPoint(activity)">
        {{ activity.content + activity.id }}
      </div>
      <div v-if="activity.children && activity.children.length">
        <time-line-view :key="activity.id" :activities="activity.children" :level="level + 1" style="padding: 0" />
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import emitter from '@/utils/mitt.js'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const { activities, level } = defineProps({
  activities: {
    type: Array,
    default: () => []
  },
  level: {
    type: Number,
    default: 1
  }
})
const boldId = ref()
// 这种方法需要些很多css，有多少层就写多少层css
const levelClass = computed(() => {
  return `pass-node ` + Array(level).fill(1).map((i, index) => 'level' + (i + index)).join(' ')
})

const checkPoint = (activity) => {
  emitter.emit('scroll-to', activity.id)
  emitter.emit('bold', activity.id)
}

emitter.on('bold', (id) => {
  boldId.value = id // 加粗标题字体
})
onActivated(() => {
  boldId.value = null
})
</script>
<style lang="scss" scoped>
.el-timeline-item {
  padding-bottom: 0.02px;
}
.pass-node[data-id="var(--primary-color)"] {
  background: #7c7c7c;
}
.pass-node.level1 :deep(.el-timeline-item__tail) {
  display: block;
}
.pass-node.level1:last-child :deep(.el-timeline-item__tail) {
  display: none;
}

.pass-node.level1.level2 :deep(.el-timeline-item__tail) {
  display: block;
}
.pass-node.level1.level2:last-child :deep(.el-timeline-item__tail) {
  display: none;
}

.pass-node.level1.level2.level3 :deep(.el-timeline-item__tail) {
  display: block;
}
.pass-node.level1.level2.level3:last-child :deep(.el-timeline-item__tail) {
  display: none;
}

.pass-node.level1.level2.level3.level4 :deep(.el-timeline-item__tail) {
  display: block;
}
.pass-node.level1.level2.level3.level4:last-child :deep(.el-timeline-item__tail) {
  display: none;
}

.pass-node.level1.level2.level3.level4.level5 :deep(.el-timeline-item__tail) {
  display: block;
}
.pass-node.level1.level2.level3.level4.level5:last-child :deep(.el-timeline-item__tail) {
  display: none;
}
</style>
