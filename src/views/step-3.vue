<script setup>
import MyStep from '@/components/my-step.vue'
import { saveAs } from 'file-saver'
import { useRouter } from 'vue-router'
import { ref, reactive, onMounted, toRaw } from 'vue'
import emitter from '@/utils/mitt.js'
import { generateID, findFamily } from '@/utils/util.js'
import TimeLine from '@/components/time-line.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { fetchChartDescription, fetchDrawData, fetchRewriteOutline, fetchFile } from '@/api/request.js'
import CustomChart from '@/components/echart/custom-chart.vue'
import { useStepStore } from '@/stores/step.js'
import InvisibaleChart from '@/components/echart/invisibale-chart.vue'
import to from 'await-to-js'
const step = useStepStore()
const router = useRouter()

const loading = ref(true)
const currentAct = ref({})
const activities = reactive([])
const breadcrumbItems = ref([])
const chartRef = ref()
const invisibleList = ref([])
const invisibleRef = ref([])
const setRef = (el, item) => {
  if (!el) return
  if (invisibleRef.value.find(i => i.id === item.id)) return
  invisibleRef.value.push({ id: item.id, el: el })
}
const exportDataURL = () => {
  invisibleRef.value.forEach(item => {
    console.log(item.id, item.el.getDataURL())
  })
}
const mock = async() => {
  const [err, data] = await to(sometimesWrongRequest())
  if (err) {
    console.error('err', err)
    console.log('出错的处理逻辑')
  } else {
    console.log('success', data)
    console.log('成功的处理逻辑')
  }
}
const sometimesWrongRequest = async() => {
  return new Promise((resolve, reject) => {
    fetch('http://localhost:8000/aaaa/draw_chart', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({ question: 'whatever' })
    }).then(res => res.json()).then(data => {
      resolve(data)
    }).catch((err) => {
      reject({ msg: '/mock/draw_chart 请球失败', error: err })
    })
  })
}
const init = () => {
  // 这里想不通，why
  // 这里想不通，why
  // 这里想不通，why 为什么要要加nextTick，step2 到本页就可以，但是 step4 回到本页就不加nextTick就会有显示问题
  nextTick(() => {
    const tmp = structuredClone(toRaw(step.step2.treeData))
    setId(tmp)
    activities.push(...tmp)
  })
}
const reset = () => {
  activities.length = 0
  breadcrumbItems.value.length = 0
  currentAct.value = {}
  chartRef.value.clear()
  chartRef.value.setTip(false)
}
const changedDataURLArr = ref([])
onActivated(() => {
  if (router.options.history.state.back === '/step4' && activities.length) return
  reset()
  init()
})
onMounted(() => {
  emitter.on('legendselectchanged', (legend) => {
    const changedDataURL = chartRef.value.getDataURL()
    if (changedDataURLArr.value.find(item => item.id === currentAct.value.id)) {
      changedDataURLArr.value.find(item => item.id === currentAct.value.id).dataURL = changedDataURL
    } else {
      changedDataURLArr.value.push({ id: currentAct.value.id, dataURL: changedDataURL })
    }
  })
  loading.value = false
  emitter.on('load-advice', async(activity) => {
    chartRef.value.clear()
    currentAct.value = activity
    breadcrumbItems.value = findFamily(activities, activity.id)
    if (activity.status === 1) {
      // console.log(activity.id, activity.chartData.draw_data.y, 'get')
      if (activity.chartData) {
        if (activity.chartData.draw_data) {
          chartRef.value && chartRef.value.reDraw(activity.chartData, '使用缓存数据')
          if (!activity.dataURL) {
            activity.dataURL = chartRef.value.getDataURL()
          }
        }
      }
      chartRef.value.setTip(!activity.chartData.draw_data)
      activity.type || emitter.emit('change-point', { id: activity.id, type: 'danger' })
      console.log('结束')
      return
    }
    loading.value = true
    const body = {
      question: activity.content,
      columns_name: step.step1.columns_name,
      other: []
    }
    const [err, rewriteData] = await to(fetchRewriteOutline(body))
    if (err) {
      console.log('/api/rewrite_report_outline 接口报错', err)
      loading.value = false
      activity.status = -1
      return
    }
    rewriteData.answer_plot = rewriteData['绘图要求']
    rewriteData.user_input = rewriteData['问题']
    delete rewriteData['绘图要求']
    delete rewriteData['问题']
    rewriteData.table_name_list = step.step1.tables_name
    rewriteData.columns_name = step.step1.columns_name
    const [err2, drawData] = await to(fetchDrawData(rewriteData))
    if (err2) {
      console.log('/api/draw_data 接口报错', err2)
      loading.value = false
      ElMessageBox.alert('未知错误，请重新请求！！', '系统提示', { type: 'error' })
      activity.status = -1
      return
    }
    // console.log(breadcrumbItems.value, 'breadcrumbItems')
    // breadcrumbItems.value.at(-1).chartData = drawData
    activity.chartData = drawData
    if (drawData.draw_data) {
      chartRef.value.reDraw(drawData)
      invisibleRef.value.find((item) => item.id === activity.id).el.reDraw(drawData)
    }
    chartRef.value.setTip(!drawData.draw_data)
    const descriptionBody = {
      sql: drawData.sql,
      question: rewriteData.user_input
    }
    const [err3, descp] = await to(fetchChartDescription(descriptionBody))
    if (err3) {
      console.log('/api/chart_description 接口报错', err3)
      loading.value = false
      activity.status = -1
      return
    }
    breadcrumbItems.value.at(-1).description = descp
    activity.status = 1
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
    } else {
      invisibleList.value.push({ id: activity.id, dataURL: '' })
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
function setDataURL(activities) {
  activities.forEach((activity) => {
    if (activity.chartData && activity.chartData.draw_data) {
      activity.dataURL = invisibleRef.value.find((item) => item.id === activity.id).el.getDataURL()
    }
    if (activity.children && activity.children.length) {
      setDataURL(activity.children)
    }
  })
}
const showDOC = async() => {
  const obj = {
    doc: 'doc',
    data: null
  }
  setId(activities)
  setDataURL(activities)
  obj.data = removePropertyFromTree(activities, 'id')
  obj.data = removePropertyFromTree(obj.data, 'hollow')
  obj.data = removePropertyFromTree(obj.data, 'type')
  obj.data = removePropertyFromTree(obj.data, 'label')
  // obj.data = removePropertyFromTree(obj.data, 'chartData')
  // obj.data = removePropertyFromTree(obj.data, 'description')
  const now = new Date().getTime()
  const data = await fetchFile({ content: obj.data, file_name: now + '.docx' })
  console.log(data, 'file....')
  fetch(`/api/get_chart/${now}.docx`).then(res => res.blob()).then(blob => {
    saveAs(blob, '报告.docx')
  })
  // console.log(JSON.stringify(obj, null, 2))
}
const preview = () => {
  const obj = {
    doc: 'doc',
    data: null
  }
  setDataURL(activities)
  obj.data = removePropertyFromTree(activities, 'hollow')
  obj.data = removePropertyFromTree(obj.data, 'type')
  // obj.data = removePropertyFromTree(obj.data, 'content')
  obj.data = removePropertyFromTree(obj.data, 'dataURL')
  step.setStep3(obj.data)
  router.push('/step4')
}
const pushTasks = (activity, tasks) => {
  const task = async() => {
    const body = {
      question: activity.content,
      columns_name: step.step1.columns_name,
      other: []
    }
    const [err, rewriteData] = await to(fetchRewriteOutline(body))
    if (err) {
      console.log('/api/rewrite_report_outline 接口报错', err)
      activity.status = -1
      return '/api/rewrite_report_outline 接口报错， 终止该节点处理 ' + activity.content
    }
    rewriteData.answer_plot = rewriteData['绘图要求']
    rewriteData.user_input = rewriteData['问题']
    delete rewriteData['绘图要求']
    delete rewriteData['问题']
    rewriteData.table_name_list = step.step1.tables_name
    rewriteData.columns_name = step.step1.columns_name
    const [err2, drawData] = await to(fetchDrawData(rewriteData))
    if (err2) {
      console.log('/api/draw_data 接口报错, 终止该节点处理', err2)
      activity.status = -1
      return '/api/draw_data 接口报错， 终止该节点处理 ' + activity.content
    }
    if (drawData.draw_data) {
      // chartRef.value.reDraw(drawData) // 先不画了
      invisibleRef.value.find((item) => item.id === activity.id).el.reDraw(drawData)
    }
    // chartRef.value.setTip(!drawData.draw_data) // 先不画了
    activity.chartData = drawData
    const descriptionBody = {
      sql: drawData.sql,
      question: rewriteData.user_input
    }
    const [err3, descp] = await to(fetchChartDescription(descriptionBody))
    if (err3) {
      console.log('/api/chart_description 接口报错，终止该节点处理', err3)
      activity.status = -1
      return '/api/chart_description 接口报错, 终止该节点处理 ' + activity.content
    }
    activity.description = descp
    // breadcrumbItems.value = findFamily(activities, activity.id)
    // breadcrumbItems.value.at(-1).description = descp
    activity.status = 1
    // currentAct.value = activity
    return 'task =' + activity.content
  }
  tasks.push(task())
}
const requestAll = (activity, tasks) => {
  if (activity instanceof Array) {
    activity.forEach((child) => {
      requestAll(child, tasks)
    })
    return
  }
  if (activity.children && activity.children.length) {
    requestAll(activity.children, tasks)
  } else {
    pushTasks(activity, tasks)
  }
}
const analyzed = ref(false)
const allMission = (activities) => {
  loading.value = true
  const tasks = []
  requestAll(activities, tasks)
  Promise.allSettled(tasks).then((result) => {
    console.log('Mission all over', result)
    analyzed.value = true
    loading.value = false
  })
}
</script>

<template>
  <div v-loading="loading">
    <div style="width: fit-content">
      <my-step :step="3" />
      <div class="step3-container">
        <div class="timeline-container">
          <div style="display: flex;justify-content: flex-end;padding: 10px">
            <el-button type="primary" @click="allMission(activities)">完成所有分析</el-button>
            <!--            <el-button type="primary" @click="console.log(changedDataURLArr)">changeDataURL</el-button>-->
            <!--            <el-button type="primary" @click="console.log(toRaw(activities))">check</el-button>-->
            <!--            <el-button type="primary" @click="console.log(toRaw(invisibleRef))">check2</el-button>-->
          </div>
          <time-line :activities="activities" :level="1" />
        </div>
        <div class="step3-main">
          <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item v-for="item in breadcrumbItems" :key="item.id">
              <span style="font-size: 16px">{{ item.content }}</span>
            </el-breadcrumb-item>
            <div v-if="!breadcrumbItems.length" style="font-size: 16px">
              {{ analyzed ? '已完成分析' : '未分析' }}
            </div>
          </el-breadcrumb>
          <div class="description">
            <div v-if="!currentAct.description"></div>
            <div v-else v-html="description"></div>
          </div>
          <custom-chart ref="chartRef" />
          <div v-for="item of invisibleList" :key="item.id">
            <!--            <custom-chart ref="shadowRef" :style="{position: 'fixed', left: -100*(index+1)+'vw' }" />-->
            <div style="height: 0; overflow: auto">
              <invisibale-chart :ref="el=>setRef(el, item)" />
            </div>
          </div>

          <!--          <el-button type="primary" @click="completePoint">complete</el-button>-->
          <!--          <el-button type="danger" @click="resetPoint">uncomplete</el-button>-->
          <!--          <el-button type="danger" @click="exportDataURL">export</el-button>-->
          <!--          <el-button type="danger" @click="mock">mock</el-button>-->
        </div>

      </div>
      <div class="step-forward">
        <el-button size="default" type="primary" @click="showDOC">导出</el-button>
        <el-button size="default" type="primary" @click="router.push('/step2')">上一步</el-button>
        <el-button size="default" type="primary" @click="preview">预览</el-button>
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
  .timeline-container{
    max-width: 500px;
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
