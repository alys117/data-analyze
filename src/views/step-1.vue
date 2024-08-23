<script setup>
import MyStep from '@/components/my-step.vue'
import CusTable from '@/components/cus-table.vue'
import { fetchTables, fetchTable } from '@/api/request.js'
import { useRouter } from 'vue-router'
import { useStepStore } from '@/stores/step.js'
import emitter from '@/utils/mitt.js'
import CustomMind from '@/components/custom-mind.vue'
import { callLoading } from '@/components/loading.js'
const router = useRouter()
const step = useStepStore()
const body = {
  question: '',
  other: []
}
const selectTables = ref([]) // 选择的表，多选
const tableOptions = ref([]) // 选择的表，多选
const tableInfos = ref({})
const loading = ref(false)
const childRefs = ref([]) // 用于存储子组件引用的数组
// 回调函数，用于设置子组件的引用
const setChildRef = (el, table) => {
  if (!el) return
  // console.log(table, el, 'setChildRef', selectTables.value)
  childRefs.value.push({ tableName: table, el: el })
}

const next = () => {
  const n = childRefs.value.length - selectTables.value.length
  if (!selectTables.value.length) {
    ElMessage.error('请先挑选表！')
    return
  }
  childRefs.value.splice(0, n)
  // console.log(childRefs.value, 'childRefs.value', n)
  const result = {
    question: step.aiConversation.question,
    tables_name: [],
    columns_name: {}
  }
  childRefs.value.forEach((item) => {
    // console.log(item.el.getUseFields, 'item.el')
    const fields = item.el.getUseFields()
    result.tables_name.push(item.tableName)
    result.columns_name[item.tableName] = fields
  })

  step.setStep1(result) // 设置step1的pinia状态
  router.push({
    name: 'Step2',
    state: { params: result }
  })
}
const mindRef = ref()
const init = async() => {
  body.question = step.aiConversation.question
  // loading.value = true
  // const data = await fetchTables(body)
  const data = await callLoading(async() => fetchTables(body), [{ content: '挑表', timeConsuming: 10 }])
  // loading.value = false
  tableInfos.value = data
  tableOptions.value.length = 0
  for (const tableName in data) {
    tableOptions.value.push({ label: data[tableName]['中文名'], value: tableName })
    // mindRef.value.hightlightNode(tableName) // 这里还没有取到mind数据
  }
}
const uniq = (ary) => {
  const strings = ary.map((item) => JSON.stringify(item))
  return Array.from(new Set(strings)).map((item) => JSON.parse(item))
}
const ready = ref(false)
const high = ref(false)
watch(() => tableOptions.value, (val) => {
  if (!ready.value) return
  if (high.value) return
  for (const item of tableOptions.value) {
    mindRef.value.hightlightNode(item.value)
  }
  high.value = true
}, { deep: true })

watch(() => ready.value, (val) => {
  if (!ready.value) return
  if (high.value) return
  for (const item of tableOptions.value) {
    mindRef.value.hightlightNode(item.value)
  }
  high.value = true
})

onActivated(async() => {
  // 在history的state属性中获取对话中的问题
  body.question === step.aiConversation.question || await init()
  emitter.on('add-table', async data => {
    if (tableOptions.value.findIndex(item => item.value === data.table_ename) > -1) {
      ElMessageBox.alert(`${data.table_cname}（${data.table_ename}） 已存在`, '提示', { type: 'warning' })
      return
    }
    const tmp = await fetchTable({
      'table_name': data.table_ename,
      'other': []
    })
    tableInfos.value[data.table_ename] = tmp[data.table_ename]
    tableOptions.value.push({ label: data.table_cname, value: data.table_ename })
    tableOptions.value = uniq(tableOptions.value)
  })
})
onMounted(async() => {
  console.log('step-1 mounted')
  step.setTreeCache(null)
  step.setOutline(null)
  step.setStep1(null)
  step.setStep2(null)
  step.setStep3(null)
  emitter.on('highlight', async data => {
    console.log(data, 'highlight')
    ready.value = true
  })
})
</script>

<template>
  <div v-loading="loading">
    <my-step :step="1"/>
    <div class="mind-container">
      <custom-mind ref="mindRef"/>
    </div>
    <div class="cus-table-container">
      <div class="cus-table-head">
        <div class="left-label">请选择</div>
        <el-select v-model="selectTables"
                   placeholder="请选择"
                   style="width: 500px"
                   multiple
                   collapse-tags
                   collapse-tags-tooltip
                   :max-collapse-tags="2">
          <el-option
            v-for="item in tableOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
      <transition-group
        name="custom-classes-transition"
        enter-active-class="animate__animated animate__fadeInLeft"
        leave-active-class="animate__animated animate__fadeOutLeft"
      >
        <div v-for="table in selectTables" :key="table">
          <cus-table :ref="(el)=> setChildRef(el, table)" :table-info="tableInfos[table]" />
        </div>
      </transition-group>
    </div>
    <div class="step-forward">
      <el-button size="default" type="success" @click="router.push('/talk')">返回会话</el-button>
      <el-button size="default" type="primary" @click="next">下一步</el-button>
      <!--      <el-button size="small" type="primary" @click="console.log(childRefs)">childRefs</el-button>-->
    </div>
  </div>
</template>
<style lang="scss" scoped>
.mind-container{
}
.cus-table-container{
  padding: 20px 20px 0 20px;
  //width: fit-content;
  min-width: 1628px;
}
.step-forward{
  padding: 20px;
  text-align: right;
}

.cus-table-head{
  display: flex;
  align-items: center;
  justify-content: left;
  .left-label{
    margin-right: 20px;
  }
}
</style>
