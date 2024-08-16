<script setup>
import MyStep from '@/components/my-step.vue'
import CusTable from '@/components/cus-table.vue'
import { fetchTables } from '@/api/request.js'
import { useRouter } from 'vue-router'
import { useStepStore } from '@/stores/step.js'
import JsMind from '@/components/js-mind.vue'
import emitter from '@/utils/mitt.js'
import MindTest from '@/components/mind-test.vue'
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
const init = async() => {
  body.question = step.aiConversation.question
  loading.value = true
  const data = await fetchTables(body)
  loading.value = false
  tableInfos.value = data
  tableOptions.value.length = 0
  for (const tableName in data) {
    tableOptions.value.push({ label: tableName, value: tableName })
  }
  console.log(body.question, 'init question')
}
onActivated(async() => {
  // 在history的state属性中获取对话中的问题
  body.question === step.aiConversation.question || await init()
  const data = [
    {
      id: 'easy', // [必选] ID, 所有节点的ID不应有重复，否则ID重复的结节将被忽略
      topic: 'Easy', // [必选] 节点上显示的内容
      direction: 'right', // [可选] 节点的方向，此数据仅在第一层节点上有效，目前仅支持 left 和 right 两种，默认为 right
      expanded: true, // [可选] 该节点是否是展开状态，默认为 true
      children: [
        { id: 'easy1', topic: '<span onclick="abc(\'easy1\')">点击</span>' },
        { id: 'easy2', topic: 'Easy to edit' },
        { id: 'easy3', topic: 'Easy to store' },
        { id: 'easy4', topic: 'Easy to embed' }
      ]
    },
    {
      id: 'open',
      topic: 'Open Source',
      direction: 'right',
      expanded: true,
      children: [
        { id: 'open1', topic: 'on GitHub' },
        { id: 'open2', topic: 'BSD License' }
      ]
    },
    {
      id: 'powerful',
      topic: 'Powerful',
      direction: 'right',
      children: [
        { id: 'powerful1', topic: 'Base on Javascript' },
        { id: 'powerful2', topic: 'Base on HTML5', children: [
          { id: 'powerful21', topic: 'Base on HTML5' },
          { id: 'powerful22', topic: 'Base on HTML5', children: [
            { id: 'powerful221', topic: 'Base on HTML5' },
            { id: 'powerful222', topic: 'Base on HTML5' }
          ] }
        ] },
        { id: 'powerful3', topic: 'Depends on you' }
      ]
    },
    {
      id: 'other',
      topic: 'test node',
      direction: 'right',
      children: [
        { id: 'other1', topic: "I'm from local variable" },
        { id: 'other2', topic: 'I can do everything' }
      ]
    }
  ]

  emitter.emit('data-js-mind', data)
})
onMounted(async() => {
  console.log('step-1 mounted')
  window.abc = function(para) {
    console.log('abc', para)
  }
  step.setTreeCache(null)
  step.setOutline(null)
  step.setStep1(null)
  step.setStep2(null)
  step.setStep3(null)
})
</script>

<template>
  <div v-loading="loading">
    <my-step :step="1"/>
    <div class="mind-container">
      <mind-test />
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
