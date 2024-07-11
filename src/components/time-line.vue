<template>
  <el-timeline>
    <div v-html="dynamicStyleTag"></div>
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
      <div style="margin-bottom: 20px" @click="checkPoint(activity)">
        {{ activity.id + '~' + activity.content }}
      </div>
      <div v-if="activity.children && activity.children.length">
        <time-line :activities="activity.children" :level="level + 1" @relation="changeByChild" style="padding: 0" />
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import emitter from '@/utils/mitt.js'
import { computed } from 'vue'
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
// 这种方法需要些很多css，有多少层就写多少层css
const levelClass = computed(() => {
  return `pass-node ` + Array(level).fill(1).map((i, index) => 'level' + (i + index)).join(' ')
})

const dynamicStyleTag = computed(() => {
  const styles = activities.reduce((pre, cur, index, arr) => {
    if (index === arr.length - 1) {
      return `[data-id='${pre.id}'] .el-timeline-item__tail{ display: block !important;}\n[data-id='${cur.id}'] .el-timeline-item__tail{ display: none !important;}`
    }
    return `[data-id='${pre.id}'] .el-timeline-item__tail{ display: block !important;}\n[data-id='${cur.id}'] .el-timeline-item__tail{ display: block !important;}`
  })
  return `<style>${styles}</style>`
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
        result.push(child.type === 'primary' ? (child.hollow ? 0.5 : 1) : 0)
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
        emit('relation', activity.id)
      }
    }
  })
}
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
</style>
