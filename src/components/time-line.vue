<template>
  <el-timeline>
    <!--    <div v-html="dynamicStyleTag"></div>-->
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
      <div style="margin-bottom: 20px; width: 300px;">
        <div style="display: flex;align-items: center">
          <div style="flex: 1;">
            <span v-if="!activity.edit" @click="checkPoint(activity)">{{ activity.content }}</span>
            <el-input v-if="activity.edit" @blur="activity.edit = false" v-model="activity.content" @change="activity.label=activity.content" />
          </div>
          <div v-if="!activity.children">
            <el-link style="margin-left: 20px" @click="activity.edit = !activity.edit"><Edit style="height: 1.2em"/></el-link>
            <el-link style="margin-left: 5px" @click="rewriteOutline(activity)"><Comment style="height: 1.2em"/></el-link>
            <el-link style="margin-left: 5px" @click="activity.showSubtext = !activity.showSubtext">
              <Open style="height: 1.2em" v-if="activity.showSubtext" />
              <TurnOff style="height: 1.2em" v-if="!activity.showSubtext" />
            </el-link>
          </div>
        </div>
        <div v-if="activity.subtext !== undefined && activity.showSubtext" style="margin-top: 10px;display: flex;align-items: flex-start;gap:5px">
          <el-input style="flex:1;" type="textarea" v-model="activity.subtext" />
          <div style="display: flex;flex-direction: column;gap: 5px">
<!--            <el-link v-if="!activity.children" style="margin-left: 5px" @click="checkPoint(activity)"><PieChart style="height: 1.2em"/></el-link>-->
            <el-link v-if="!activity.children" style="margin-left: 5px" @click="activity.status = -1; checkPoint(activity)"><PieChart style="height: 1.2em"/></el-link>
          </div>
        </div>
      </div>
      <div v-if="activity.children && activity.children.length">
        <time-line :key="activity.id" :activities="activity.children" :level="level + 1" @relation="changeByChild" style="padding: 0" />
      </div>
    </el-timeline-item>
  </el-timeline>
</template>

<script setup>
import emitter from '@/utils/mitt.js'
import { computed } from 'vue'
import { Comment, Edit, Open, PieChart, TurnOff } from '@element-plus/icons-vue'
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
// 有bug，稍后解决
const dynamicStyleTag = computed(() => {
  const styles = activities.reduce((pre, cur, index, arr) => {
    if (index === arr.length - 1) {
      return `[data-id='${pre.id}'] .el-timeline-item__tail{ display: block !important;}\n[data-id='${cur.id}'] .el-timeline-item__tail{ display: none !important;}`
    }
    return `[data-id='${pre.id}'] .el-timeline-item__tail{ display: block !important;}\n[data-id='${cur.id}'] .el-timeline-item__tail{ display: block !important;}`
  }, '')
  return `<style>${styles}</style>`
})
const emit = defineEmits(['relation'])

function checkPoint(activity) {
  !activity.children && emitter.emit('load-advice', activity)
}
function rewriteOutline(activity) {
  emitter.emit('rewrite-outline', activity)
}

emitter.on('change-point', ({ id, type }) => {
  activities.forEach((activity) => {
    if (activity.id === id) {
      // console.log('type', type, id)
      activity.type = type
      // console.log('type activity', activity)
      // 除非寻找父节点
      emit('relation', id)
    }
  })
})

const changeByChild = (id) => {
  // console.log('changeByChild', id, activities)
  activities.forEach((activity) => {
    if (activity.children && activity.children.length) {
      let flag = false
      const result = []
      activity.children.forEach((child) => {
        result.push(child.type === 'primary' ? (child.hollow ? 0.5 : 1) : 0)
        child.id === id && (flag = true)
      })
      if (flag) {
        // console.log('flag', activities, result)
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

.pass-node.level1.level2.level3.level4.level5 :deep(.el-timeline-item__tail) {
  display: block;
}
.pass-node.level1.level2.level3.level4.level5:last-child :deep(.el-timeline-item__tail) {
  display: none;
}
</style>
