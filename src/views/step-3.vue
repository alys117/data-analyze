<script setup>
import MyStep from '@/components/my-step.vue'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted } from 'vue'
import emitter from '@/utils/mitt.js'
import { generateID, findFamily } from '@/utils/util.js'
import TimeLine from '@/components/time-line.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { fetchChartDescription, fetchDrawData, fetchRewriteOutline } from '@/api/request.js'
import CustomChart from '@/components/echart/custom-chart.vue'
import { useStepStore } from '@/stores/step.js'
const step = useStepStore()
const router = useRouter()

const loading = ref(true)
const currentAct = ref({})
const activities = reactive([])
const breadcrumbItems = ref([])
const chartRef = ref()
const init = () => {
  // 这里想不通，why
  // 这里想不通，why
  // 这里想不通，why 为什么要要加nextTick，step2 到本页就可以，但是 step4 回到本页就不加nextTick就会有显示问题
  nextTick(() => {
    const tmp = structuredClone(toRaw(step.step2.treeData))
    setId(tmp)
    activities.push(...tmp)
    chartRef.value.clear()
    chartRef.value.resize()
  })
}
const reset = () => {
  activities.length = 0
  breadcrumbItems.value.length = 0
  currentAct.value = {}
}
onActivated(() => {
  reset()
  init()
})
onMounted(() => {
  loading.value = false
  emitter.on('load-advice', async(activity) => {
    currentAct.value = activity
    breadcrumbItems.value = findFamily(activities, activity.id)
    if (activity.chartData) {
      chartRef.value.reDraw(activity.chartData, '使用缓存数据')
      activity.type || emitter.emit('change-point', { id: activity.id, type: 'danger' })
      return
    }
    loading.value = true
    const body = {
      question: activity.content,
      columns_name: step.step1.columns_name,
      other: []
    }
    const rewriteData = await fetchRewriteOutline(body)
    const drawData = await fetchDrawData(rewriteData)
    console.log(breadcrumbItems.value, 'breadcrumbItems')
    breadcrumbItems.value.at(-1).chartData = drawData
    chartRef.value.reDraw(drawData)
    const descp = await fetchChartDescription()
    breadcrumbItems.value.at(-1).description = descp
    activity.dataURL = chartRef.value.getDataURL()
    emitter.emit('change-point', { id: activity.id, type: 'danger' })

    loading.value = false
  })
})

function setId(activities) {
  activities.forEach((activity) => {
    activity.id = activity.id || generateID(8)
    activity.content = activity.label || activity.content
    if (activity.children && activity.children.length) {
      setId(activity.children)
    }
  })
}
const completePoint = () => {
  emitter.emit('change-point', { id: currentAct.value.id, type: 'primary' })
  currentAct.value.dataURL = chartRef.value.getDataURL()
}
const resetPoint = () => {
  emitter.emit('change-point', { id: currentAct.value.id, type: 'danger' })
}
const description = computed(() => {
  return currentAct.value.description.replace(/\n/g, '<br>')
})

function removePropertyFromTree(tree, propName) {
  if (Array.isArray(tree)) {
    // 如果是数组，对数组的每个元素递归处理
    return tree.map(item => removePropertyFromTree(item, propName))
  } else if (typeof tree === 'object' && tree !== null) {
    // 如果是对象，创建一个新对象，复制除了要删除的属性外的所有属性
    const result = {}
    for (const key in tree) {
      if (key === propName) {
        // 如果是要删除的属性，则跳过
        continue
      }
      // 对象的值可能也是对象或数组，需要递归处理
      result[key] = removePropertyFromTree(tree[key], propName)
    }
    return result
  }
  // 如果既不是对象也不是数组，直接返回原值
  return tree
}
const showDOC = () => {
  const obj = {
    doc: 'doc',
    data: null
  }
  obj.data = removePropertyFromTree(activities, 'id')
  obj.data = removePropertyFromTree(obj.data, 'hollow')
  obj.data = removePropertyFromTree(obj.data, 'type')
  obj.data = removePropertyFromTree(obj.data, 'label')
  // obj.data = removePropertyFromTree(obj.data, 'chartData')
  // obj.data = removePropertyFromTree(obj.data, 'description')
  console.log(obj)
  // console.log(JSON.stringify(obj, null, 2))
}
const preview = () => {
  const obj = {
    doc: 'doc',
    data: null
  }
  obj.data = removePropertyFromTree(activities, 'hollow')
  obj.data = removePropertyFromTree(obj.data, 'type')
  // obj.data = removePropertyFromTree(obj.data, 'content')
  obj.data = removePropertyFromTree(obj.data, 'dataURL')
  step.setStep3(obj.data)
  router.push('/step4')
}
</script>

<template>
  <div v-loading="loading">
    <div style="width: fit-content">
      <my-step :step="3" />
      <div class="step3-container">
        <div class="timeline-container">
          <time-line :activities="activities" :level="1" />
        </div>
        <div class="step3-main">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.id">
              <span style="font-size: 16px">{{ item.content }}</span>
            </el-breadcrumb-item>
            <div v-if="!breadcrumbItems.length" style="font-size: 16px">
              未分析
            </div>
          </el-breadcrumb>
          <div class="description">
            <div v-if="!currentAct.description"></div>
            <div v-else v-html="description"></div>
          </div>
          <custom-chart ref="chartRef" />
          <el-button type="primary" @click="completePoint">complete</el-button>
          <el-button type="danger" @click="resetPoint">uncomplete</el-button>
        </div>

      </div>
      <div class="step-forward">
        <el-button size="default" type="primary" @click="showDOC">查看</el-button>
        <el-button size="default" type="primary" @click="router.push('/step2')">上一步</el-button>
        <el-button size="default" type="primary" @click="preview">预览</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-forward{
  padding: 20px;
  //text-align: left;
  text-align: right;
}
.step3-container{
  display: flex;
  min-width: 1628px;
  //height: calc(100vh - 112px - 72px - 17px);
  .timeline-container{
    border-right: 1px dashed #acacac ;
    padding-right: 20px;
    flex-shrink: 0;
  }
  .step3-main{
    .description{
      background: #fcfcfc;
      padding: 10px;
      margin: 20px 20px 20px 0;
    }
    padding-left: 20px;
    width: 100%;
    overflow: auto;
  }
}
</style>
