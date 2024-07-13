<script setup>
import MyStep from '@/components/my-step.vue'
import CusTable from '@/components/cus-table.vue'
import { fetchTables } from '@/api/request.js'
import { useRouter } from 'vue-router'
import { MessageBox } from '@element-plus/icons-vue'
const router = useRouter()

const body = {
  question: '我想要了解各个地市在家庭宽带业务上的情况，汇报对象是运营经理，行业是通信行业，植本职工作是运营经理助理',
  other: []
}
const selectTables = ref([]) // 选择的表，多选
const tableOptions = ref([]) // 选择的表，多选
const tableInfos = ref({})
const loading = ref(false)

onMounted(async() => {
  // 在history的state属性中获取对话中的问题
  body.question = history.state.params.question
  loading.value = true
  const data = await fetchTables(body)
  loading.value = false
  tableInfos.value = data
  for (const tableName in data) {
    tableOptions.value.push({ label: tableName, value: tableName })
  }
})
const childRefs = ref([]) // 用于存储子组件引用的数组

// 回调函数，用于设置子组件的引用
const setChildRef = (el, table) => {
  if (!el) return
  // console.log(table, el, 'setChildRef', selectTables.value)
  childRefs.value.push({ tableName: table, el: el })
}

const next = () => {
  const n = childRefs.value.length - selectTables.value.length
  if(!selectTables.value.length){
    ElMessage.error('请先挑选表！')
    return
  }
  childRefs.value.splice(0, n)
  // console.log(childRefs.value, 'childRefs.value', n)
  const result = {
    question: history.state.params.question,
    tables_name: [],
    columns_name: {}
  }
  childRefs.value.forEach((item) => {
    // console.log(item.el.getUseFields, 'item.el')
    const fields = item.el.getUseFields()
    result.tables_name.push(item.tableName)
    result.columns_name[item.tableName] = fields
  })
  router.push({
    name: 'Step2',
    state: { params: result }
  })
}
</script>

<template>
  <div v-loading="loading">
    <my-step :step="1"/>
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
