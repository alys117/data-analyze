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
const router = useRouter()

const loading = ref(true)
const currentAct = ref({})
const activities = reactive([])
const breadcrumbItems = ref([])
onMounted(() => {
  activities.push(...history.state.params.treeData)
  // Object.assign(activities, history.state.params.treeData)
  setId(activities)
  // setTimeout(() => {
  //   if (activities instanceof Array) {
  //     activities.length = 0
  //     console.log(1233333)
  //   } else {
  //     Object.keys(activities).forEach((v, i) => {
  //       delete activities[v]
  //     })
  //   }
  //   Object.assign(activities, timelineData)
  //   setId(activities)
  // }, 2000)
  loading.value = false
  emitter.on('load-advice', async(activity) => {
    currentAct.value = activity
    console.log('set CurrentAct', currentAct.value)
    breadcrumbItems.value = findFamily(activities, activity.id)
    loading.value = true
    const body = {
      question: activity.content,
      columns_name: history.state.params.columns_name,
      other: []
    }
    const rewriteData = await fetchRewriteOutline(body)
    loading.value = false
    console.log('rewrite', rewriteData)
    const drawData = await fetchDrawData(rewriteData)
    console.log('draw', drawData)
    breadcrumbItems.value.at(-1).chartData = drawData
    chartRef.value.reDraw(drawData)
    const descp = await fetchChartDescription()
    console.log('descp', descp)
    breadcrumbItems.value.at(-1).description = descp
    if (!activity.type) {
      emitter.emit('change-point', { id: currentAct.value.id, type: 'danger' })
    }
  })
})

function setId(activities) {
  activities.forEach((activity) => {
    activity.id = generateID(8)
    activity.content = activity.label || activity.content
    if (activity.children && activity.children.length) {
      setId(activity.children)
    }
  })
}
const completePoint = () => {
  emitter.emit('change-point', { id: currentAct.value.id, type: 'primary' })
}
const resetPoint = () => {
  emitter.emit('change-point', { id: currentAct.value.id, type: 'danger' })
}
const description = computed(() => {
  return currentAct.value.description.replace(/\n/g, '<br>')
})
const chartRef = ref()
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
          <div style="background: #fcfcfc;padding: 10px;margin: 20px;">
            <div v-if="!currentAct.description"></div>
            <div v-else v-html="description"></div>
          </div>
          <el-button type="primary" @click="completePoint">complete</el-button>
          <el-button type="danger" @click="resetPoint">uncomplete</el-button>
          <custom-chart ref="chartRef"/>
        </div>
      </div>
      <div class="step-forward">
        <el-button size="default" type="primary" @click="router.push('/step2')">上一步</el-button>
        <el-button size="default" type="primary" @click="router.push('/step4')">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.step-forward{
  padding: 20px;
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
    padding-left: 20px;
    width: 100%;
  }
}
</style>
