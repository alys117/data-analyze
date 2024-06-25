<script setup>
import MyStep from '@/components/my-step.vue'
import CusTable from '@/components/cus-table.vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { fakeData } from '@/views/fakeData.js'
const router = useRouter()
const body = {
  'question': '我想要了解各个地市在家庭宽带业务上的情况，汇报对象是运营经理，行业是通信行业，植本职工作是运营经理助理',
  'other': []
}
const selectTables = ref([]) // 选择的表，多选
const tableOptions = ref([]) // 选择的表，多选
const tableInfos = ref({})
const loading = ref(false)
const fetchTables = async() => {
  loading.value = true
  const response = await fetch('/api/select_tables', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json'
    },
    body: JSON.stringify(body)
  })
  const json = await response.json()
  loading.value = false
  console.log(json)
}
const fake = async() => {
  loading.value = true
  return await new Promise((resolve) => {
    setTimeout(() => {
      loading.value = false
      resolve(fakeData)
    }, 1000)
  })
}

const changeTable = () => {
  console.log(selectTables.value, childRefs.value.length, 'changeTable')
  // childRefs.value = childRefs.value.filter((item) => {
  //   console.log(item.tableName, selectTables.value.includes(item.tableName))
  //   return selectTables.value.includes(item.tableName)
  // })
}
onMounted(async() => {
  // const data = await fetchTables()
  const data = await fake()
  tableInfos.value = data
  for (const tableName in data) {
    tableOptions.value.push({ label: tableName, value: tableName })
  }
})
const childRefs = ref([]) // 用于存储子组件引用的数组

// 回调函数，用于设置子组件的引用
const setChildRef = (el, table) => {
  if (!el) return
  console.log(table, el, 'setChildRef', selectTables.value)
  childRefs.value.push({ tableName: table, el: el })
}

const next = () => {
  const n = childRefs.value.length - selectTables.value.length
  childRefs.value.splice(0, n)
  // console.log(childRefs.value, 'childRefs.value', n)
  const result = {
    theme: '',
    tables_name: [],
    columns_name: {}
  }
  childRefs.value.forEach((item) => {
    // console.log(item.el.getUseFields, 'item.el')
    const fields = item.el.getUseFields()
    result.tables_name.push(item.tableName)
    result.columns_name[item.tableName] = fields
  })
  console.log(result, 'result')
  router.push({
    name: 'Step2',
    params: { a: 123 }
  })
}
</script>

<template>
  <div v-loading="loading">
    <div class="step-container"  >
      <my-step :step="1" />
    </div>
    <div class="cus-table-container">
      <div class="cus-table-head">
        <div class="left-label">请选择</div>
        <el-select v-model="selectTables"
                   @change="changeTable"
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
      <el-button size="small" type="success" @click="router.push('/talk')">返回会话</el-button>
      <el-button size="small" type="primary" @click="next">下一步</el-button>
      <el-button size="small" type="primary" @click="console.log(childRefs)">tet</el-button>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.step-container{
  padding: 20px;
}
.chat-container{
  padding: 0 20px;
}
.cus-table-container{
  padding: 20px 20px 0 20px;
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
