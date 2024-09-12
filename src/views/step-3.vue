<script setup>
import MyStep from '@/components/my-step.vue'
import { saveAs } from 'file-saver'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import emitter from '@/utils/mitt.js'
import { generateID, findFamily } from '@/utils/util.js'
import TimeLine from '@/components/time-line.vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { fetchChartDescription, fetchDrawData, fetchRewriteOutline, fetchFile } from '@/api/request.js'
import CustomChart from '@/components/echart/custom-chart.vue'
import { useStepStore } from '@/stores/step.js'
import InvisibaleChart from '@/components/echart/invisibale-chart.vue'
import to from 'await-to-js'
import { callLoading } from '@/components/loading.js'
import DemoTinymce from '@/components/tinymce/demo-tinymce.vue'
const step = useStepStore()
const router = useRouter()

const loading = ref(true)
const currentAct = ref({})
const show = ref(false)
const activities = step.treeCache
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
    // const tmp = toRaw(step.treeCache)
    // activities.length = 0
    // activities.push(...tmp) //  有bug，先不调了
  })
  addProperties(activities) // invisibleList 赋值 赋值content和label，一个用于树的显示，一个用于timeline的显示
}
const reset = () => {
  breadcrumbItems.value.length = 0
  currentAct.value = {}
  chartRef.value.clear()
  chartRef.value.setTip(false)
}
const changedDataURLArr = ref([])
onActivated(() => {
  if (router.options.history.state.back === '/step4' && activities.length) return
  console.log('step-3 activated')
  if (step.treeCache && step.treeCache.length) {
    reset()
    init()
  }
})
watch(() => step.treeCache, (val) => {
  if (val && val.length) {
    // const tmp = toRaw(step.treeCache)
    // activities.length = 0
    // activities.push(...tmp) //  有bug，先不调了
  }
}, { deep: true })
onMounted(() => {
  console.log('step-3 mounted')
  emitter.on('legendselectchanged', (legend) => {
    const changedDataURL = chartRef.value.getDataURL()
    if (changedDataURLArr.value.find(item => item.id === currentAct.value.id)) {
      changedDataURLArr.value.find(item => item.id === currentAct.value.id).dataURL = changedDataURL
    } else {
      changedDataURLArr.value.push({ id: currentAct.value.id, dataURL: changedDataURL })
    }
  })
  loading.value = false
  emitter.on('changeData', (data) => {
    setTimeout(() => {
      chartRef.value.reDraw(data)
      console.log(data, 'reDraw')
    }, 10)
    currentAct.value.chartData.draw_data = data.draw_data
    invisibleRef.value.find((item) => item.id === currentAct.value.id).el.reDraw(data)
  })
  emitter.on('rewrite-outline', async(activity) => {
    const body = {
      question: activity.content,
      columns_name: step.step1.columns_name,
      other: []
    }
    // const [err, rewriteData] = await to(fetchRewriteOutline(body))
    const [err, rewriteData] = await to(
      callLoading(
        async() => fetchRewriteOutline(body),
        [{ content: '重写思路', timeConsuming: import.meta.env.VITE_REWRITE_TITLE }]
      )
    )
    if (err) {
      console.log('/api/rewrite_report_outline 接口报错', err)
      loading.value = false
      activity.status = -1
      return
    }
    activity.drawDemond = rewriteData['绘图要求']
    activity.subtext = rewriteData['问题']
    activity.showSubtext = true
  })
  emitter.on('load-advice', async(activity) => {
    show.value = false
    chartRef.value.clear()
    chartRef.value.setTip(false)
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
      activity.type || emitter.emit('change-point', { id: activity.id, type: 'primary' })
      console.log('结束')
      return
    }
    // loading.value = true
    const body = {
      question: activity.content,
      columns_name: step.step1.columns_name,
      other: []
    }
    const rewriteDataBody = {}
    rewriteDataBody.table_name_list = step.step1.tables_name
    rewriteDataBody.columns_name = step.step1.columns_name
    rewriteDataBody.answer_plot = activity.drawDemond
    rewriteDataBody.user_input = activity.subtext
    if (!activity.subtext) {
      const [err, rewriteData] = await to(
        callLoading(
          async() => fetchRewriteOutline(body),
          [{ content: '重写思路', timeConsuming: import.meta.env.VITE_REWRITE_TITLE }]
        )
      )
      if (err) {
        console.log('/api/rewrite_report_outline 接口报错', err)
        loading.value = false
        activity.status = -1
        return
      }
      rewriteDataBody.answer_plot = rewriteData['绘图要求']
      rewriteDataBody.user_input = rewriteData['问题']
    }

    const [err2, drawData] = await to(
      callLoading(
        async() => fetchDrawData(rewriteDataBody),
        [{ content: '画图', timeConsuming: import.meta.env.VITE_DRAW }]
      )
    )
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
      question: rewriteDataBody.user_input
    }
    const [err3, descp] = await to(
      callLoading(
        async() => fetchChartDescription(descriptionBody),
        [{ content: '描述', timeConsuming: import.meta.env.VITE_DESCRIPTION }]
      )
    )
    if (err3) {
      console.log('/api/chart_description 接口报错', err3)
      loading.value = false
      activity.status = -1
      return
    }
    breadcrumbItems.value.at(-1).description = descp
    activity.status = 1
    step.setTreeCache(activities)
    emitter.emit('change-point', { id: activity.id, type: 'primary' })

    // loading.value = false
  })
})

function addProperties(activities) {
  activities.forEach((activity) => {
    activity.id = activity.id || generateID(8)
    activity.content = activity.label || activity.content
    if (activity.children && activity.children.length) {
      addProperties(activity.children)
    } else {
      invisibleList.value.push({ id: activity.id, dataURL: '' })
    }
  })
}
const completePoint = () => {
  emitter.emit('change-point', { id: currentAct.value.id, type: 'success' })
  currentAct.value.dataURL = chartRef.value.getDataURL()
}
const resetPoint = () => {
  emitter.emit('change-point', { id: currentAct.value.id, type: 'primary' })
}

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
  addProperties(activities)
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
  router.push('/step4')
}
const pushTasks = (activity, tasks) => {
  const task = async() => {
    const body = {
      question: activity.content,
      columns_name: step.step1.columns_name,
      other: []
    }
    const rewriteDataBody = {}
    const [err, rewriteData] = await to(fetchRewriteOutline(body))
    if (err) {
      console.log('/api/rewrite_report_outline 接口报错', err)
      activity.status = -1
      return '/api/rewrite_report_outline 接口报错， 终止该节点处理 ' + activity.content
    }
    rewriteDataBody.answer_plot = rewriteData['绘图要求']
    rewriteDataBody.user_input = rewriteData['问题']
    activity.subtext = rewriteData['问题']
    activity.drawDemond = rewriteData['绘图要求']
    rewriteData.table_name_list = step.step1.tables_name
    rewriteData.columns_name = step.step1.columns_name
    const [err2, drawData] = await to(fetchDrawData(rewriteDataBody))
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
      question: rewriteDataBody.user_input
    }
    const [err3, descp] = await to(fetchChartDescription(descriptionBody))
    if (err3) {
      console.log('/api/chart_description 接口报错，终止该节点处理', err3)
      activity.status = -1
      return '/api/chart_description 接口报错, 终止该节点处理 ' + activity.content
    }
    activity.description = descp
    activity.status = 1
    activity.type = 'primary'
    emitter.emit('change-point', { id: activity.id, type: 'primary' })
    return 'task = ' + activity.id
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
const allMission = async(activities) => {
  const tasks = []
  requestAll(activities, tasks)
  /*
  loading.value = true
  Promise.allSettled(tasks).then((result) => {
    console.log('Mission all over', result)
    analyzed.value = true
    loading.value = false
  })
*/
  const result = await callLoading(
    async() => { return Promise.allSettled(tasks) },
    [{ content: '全部任务', timeConsuming: import.meta.env.VITE_ALL_MISSION }]
  )
  analyzed.value = true
  console.log('Mission all over', result)
}
</script>

<template>
  <div v-loading="loading" style="overflow: hidden">
    <my-step :step="3" />
    <div class="view">
      <el-scrollbar class="index">
        <div style="display: flex;justify-content: flex-end;padding-bottom: 10px">
          <el-button style="margin: 10px" type="default" @click="allMission(activities)">执行所有分析思路</el-button>
          <!--            <el-button type="primary" @click="console.log(changedDataURLArr)">changeDataURL</el-button>-->
          <!--            <el-button type="primary" @click="console.log(toRaw(activities))">check</el-button>-->
          <!--            <el-button type="primary" @click="console.log(toRaw(invisibleRef))">check2</el-button>-->
        </div>
        <div style="margin-right: 20px">
          <time-line :activities="activities" :level="1" />
        </div>
      </el-scrollbar>
      <div class="content">
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
<!--            <div v-else v-html="currentAct.description.replace(/\n/g, '<br>')"></div>-->
            <demo-tinymce v-else v-model:description="currentAct.description" v-model:show="show" />
          </div>
          <custom-chart ref="chartRef" />
          <div v-for="item of invisibleList" :key="item.id">
            <!--            <custom-chart ref="shadowRef" :style="{position: 'fixed', left: -100*(index+1)+'vw' }" />-->
            <div style="height: 0; overflow: auto">
              <invisibale-chart :ref="el=>setRef(el, item)" />
            </div>
          </div>

          <el-button v-if="false" type="primary" @click="completePoint">complete</el-button>
          <el-button v-if="false" type="danger" @click="resetPoint">uncomplete</el-button>
          <el-button v-if="false" type="danger" @click="exportDataURL">export</el-button>
          <el-button v-if="false" type="danger" @click="mock">mock</el-button>
        </div>
        <div class="step-forward">
          <el-button size="default" type="primary" @click="showDOC">导出</el-button>
          <el-button size="default" type="primary" @click="router.push('/step2')">上一步</el-button>
          <el-button size="default" type="primary" @click="preview">预览</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
ul{
  padding-inline-start: 30px;
}
.view{
  border-top: 1px solid #fcfcfc ;
  min-width: 1628px;
  display: flex;
  .index{
    flex-shrink: 0;
    border-right: 1px dotted #eee;
    overflow-y: auto;
    height: calc(100vh - 113px);
    background-color: #fcfcfc;
  }
  .content{
    height: calc(100vh - 113px);
    overflow: auto;
    .step3-main{
      padding: 20px;
      .description{
        background: #fcfcfc;
        padding: 10px;
        margin: 20px 20px 20px 0;
      }
      width: 100%;
      overflow: auto;
    }
    .step-forward{
      text-align: right;
      margin: 0 20px 20px 20px;
    }
  }
  @media screen and (max-width: 1628px) {
    .content{
      width: calc(100vw - 407px);
    }
    .step3-main{
      min-width: calc(1628px - 407px - 17px);
    }
  }
  @media screen and (min-width: 1628px) {
    .step3-main{
      min-width: calc(100vw - 407px - 17px);
    }
  }
}
</style>
