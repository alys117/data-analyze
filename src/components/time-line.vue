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
    >
      <div style="margin-bottom: 20px" @click="checkPoint(activity)">
        {{ activity.id + '~' + activity.content }}
      </div>
      <div v-if="activity.children && activity.children.length">
        <time-line :activities="activity.children" @relation="changeByChild" style="padding: 0" />
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import emitter from '@/utils/mitt.js'
const { activities } = defineProps({
  activities: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['relation'])

const checkPoint = (activity) => {
  if (activity.children && activity.children.length) {
    // do nothing
  } else {
    // 加载内容
    emitter.emit('load-advice', activity)
  }
}

emitter.on('change-point', ({ id, type }) => {
  activities.forEach((activity) => {
    if (activity.id === id) {
      activity.type = type
      // 除非寻找父节点
      emit('relation', id)
    }
  })
})

const changeByChild = (id) => {
  console.log('changeByChild', id, activities)
  activities.forEach((activity) => {
    if (activity.children && activity.children.length) {
      let flag = false
      const result = []
      activity.children.forEach((child) => {
        result.push(child.type === 'primary' ? 1 : 0)
        child.id === id && (flag = true)
      })
      if (flag) {
        const sum = result.reduce((a, b) => a + b)
        switch (sum) {
          case 0:
            activity.type = 'danger'
            activity.hollow = true
            break
          case activity.children.length:
            activity.type = 'primary'
            activity.hollow = false
            break
          default:
            activity.type = 'primary'
            activity.hollow = true
        }
      }
    }
  })
}
</script>
