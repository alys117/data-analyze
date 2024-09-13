<script setup>
import MyStep from '@/components/my-step.vue'
import CusTable from '@/components/cus-table.vue'
import { fetchTables, fetchTable } from '@/api/request.js'
import { useStepStore } from '@/stores/step.js'
import emitter from '@/utils/mitt.js'
import CustomMind from '@/components/custom-mind.vue'
import { callLoading } from '@/components/loading.js'
const router = useRouter()
const step = useStepStore()
const activeNames = ref(['1'])
const body = {
  question: '',
  other: []
}
const selectTables = ref([]) // 选择的表，多选
const tableOptions = ref([]) // 选择的表，多选
const tableOrder = ref([]) // 选择的表，多选
const tableInfos = ref({})
const loading = ref(false)
const childRefs = ref([]) // 用于存储子组件引用的数组
// 回调函数，用于设置子组件的引用
const setChildRef = (el, table) => {
  if (!el) {
    childRefs.value = childRefs.value.filter(item => item.tableName !== table)
    return
  }
  // console.log(table, 'setChildRef 2', selectTables.value)
  if (childRefs.value.findIndex(item => item.tableName === table) > -1) return
  // console.log('add table')
  childRefs.value.push({ tableName: table, el: el })
}
const next = () => {
  if (!selectTables.value.length) {
    ElMessage.error('请先挑选表！')
    return
  }
  // const n = childRefs.value.length - selectTables.value.length
  // childRefs.value.splice(0, n)
  // console.log(childRefs.value, 'childRefs.value', n)
  const result = {
    question: step.aiConversation.question,
    tables_name: [],
    columns_name: {}
  }
  childRefs.value.forEach((item) => {
    // console.log(item.el.getUseFields, 'item.el')
    const fields = item.el.getUseFields({ n: 0, show: false })
    result.tables_name.push(item.tableName)
    result.columns_name[item.tableName] = fields
  })
  const flag = JSON.stringify(step.step1) === JSON.stringify(result)
  console.log(flag, 'flag', step.step1)
  if (step.step1 && !flag) {
    ElMessageBox.confirm(`确定重新生成思路？`, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '放弃',
      type: 'warning'
    }).then(() => {
      step.setOutline(null)
      step.setTreeCache(null)
      step.setStep1(result) // 设置step1的pinia状态
      router.push({
        name: 'Step2',
        state: { params: result }
      })
    }).catch(() => {
      step.setStep1(result) // 设置step1的pinia状态
      router.push({
        name: 'Step2',
        state: { params: result }
      })
    })
  } else {
    step.setStep1(result) // 设置step1的pinia状态
    router.push({
      name: 'Step2',
      state: { params: result }
    })
  }
}
const mindRef = ref()
const init = async() => {
  body.question = step.aiConversation.question
  /*
  loading.value = true
  const data = await fetchTables(body)
  loading.value = false
  */
  const data = await callLoading(async() => fetchTables(body), [{ content: '查找数据源', timeConsuming: import.meta.env.VITE_PICK_TABLE }])
  tableInfos.value = data
  tableOptions.value.length = 0
  for (const tableName in data) {
    tableOptions.value.push({ label: data[tableName]['中文名'], value: tableName })
    selectTables.value.push(tableName)
  }
}
watch(() => tableOrder.value, (newVal, oldVal) => {
  if (selectTables.value.length === newVal.length) {
    tableOrder.value.sort((a, b) => {
      if (a.order === null || b.order === null) {
        return a.order === null ? 1 : -1
      }
      const _a = a.order.split('-')
      const _b = b.order.split('-')
      for (let i = 0; i < _a.length; i++) {
        if (_a[i] !== _b[i]) {
          return _a[i] - _b[i]
        }
      }
    })
    selectTables.value = tableOrder.value.map(item => item.tableName)
  }
}, { deep: true })
const uniq = (ary) => {
  const strings = ary.map((item) => JSON.stringify(item))
  return Array.from(new Set(strings)).map((item) => JSON.parse(item))
}
const isBusiTreeReady = ref(false) // 业务树是否准备好
const stopWatch = watchEffect(() => {
  // console.log('变化了', isBusiTreeReady.value, tableOptions.value)
  if (!isBusiTreeReady.value) return
  if (tableOptions.value.length === 0) return
  console.log('开始高亮')
  for (const item of tableOptions.value) {
    mindRef.value.hightlightNode(item.value, item.label)
  }
  stopWatch()
})

onActivated(async() => {
  // 在history的state属性中获取对话中的问题
  body.question === step.aiConversation.question || await init()
  emitter.on('add-table', async data => {
    if (data.operation === 'delete') {
      selectTables.value = selectTables.value.filter(item => item !== data.table_ename)
      // tableOptions.value = tableOptions.value.filter(item => item.value !== data.table_ename)
      // delete tableInfos.value[data.table_ename]
      return
    }
    if (tableOptions.value.findIndex(item => item.value === data.table_ename) > -1) {
      // ElMessageBox.alert(`${data.table_cname}（${data.table_ename}） 已存在`, '提示', { type: 'warning' })
      selectTables.value = [...new Set([...selectTables.value, data.table_ename])]
      return
    }
    const tmp = await fetchTable({
      'table_name': data.table_ename,
      'other': []
    })
    tmp[data.table_ename]['中文名'] = tmp[data.table_ename]['中文名'] || '未知'
    tableInfos.value[data.table_ename] = tmp[data.table_ename]
    tableOptions.value.push({ label: data.table_cname, value: data.table_ename })
    tableOptions.value = uniq(tableOptions.value)
    selectTables.value = [...new Set([...selectTables.value, data.table_ename])]
  })
})
onMounted(async() => {
  console.log('step-1 mounted, clear pinia state')
  step.setTreeCache(null)
  step.setOutline(null)
  step.setStep1(null)
  emitter.on('business-tree-ready', async data => {
    isBusiTreeReady.value = true
  })
})
</script>

<template>
  <div v-loading="loading">
    <my-step :step="1"/>
    <el-collapse v-model="activeNames" style="border: none;">
      <el-collapse-item name="1">
        <template #title>
          <div style="display: flex;justify-content: flex-end;width: 100%">
            <el-link type="primary" style="height: 30px">业务脑图</el-link>
          </div>
        </template>
        <custom-mind ref="mindRef" v-model:tableOrder="tableOrder"/>
      </el-collapse-item>
    </el-collapse>
    <div class="cus-table-container">
      <div class="cus-table-head" v-if="false">
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
      <!--      <el-button @click="console.log(tableInfos)">tableInfos</el-button>-->
      <!--      <el-button @click="console.log(childRefs)">childRefs</el-button>-->
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
      <!--      <el-button size="default" type="success" @click="console.log(childRefs)">childRefs</el-button>-->
      <!--      <el-button size="default" type="success" @click="console.log(selectTables)">selectTables</el-button>-->
      <el-button size="default" type="success" @click="router.push('/talk')">返回会话</el-button>
      <el-button size="default" type="primary" @click="next">下一步</el-button>
      <!--      <el-button size="small" type="primary" @click="console.log(childRefs)">childRefs</el-button>-->
    </div>
  </div>
</template>
<style lang="scss" scoped>
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
:deep(.el-collapse-item__arrow) {
  margin: 0 50% 0 0;
}
:deep(.el-collapse-item__header) {
  height: 30px;
}
:deep(.el-collapse-item__wrap) {
  border: none;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
}
</style>
