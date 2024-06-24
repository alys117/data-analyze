<script setup>
import MyStep from '@/components/my-step.vue'
import CusTable from '@/components/cus-table.vue'
import { ref, onMounted, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import { fakeData } from '@/views/fakeData.js'
const router = useRouter()
const allData = ref(undefined)
const body = {
  'question': '我想要了解各个地市在家庭宽带业务上的情况，汇报对象是运营经理，行业是通信行业，植本职工作是运营经理助理',
  'other': []
}
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
onBeforeMount(async() => {
  // const data = await fetchTables()
  const data = await fake()
  console.log(data)
  allData.value = data
})

</script>

<template>
  <div v-loading="loading">
    <div class="step-container"  >
      <my-step :step="1" />
    </div>
    <div class="cus-table-container">
      <cus-table :options="[{label: 'prop传入',value: 'prop实际值'}]" :all-data="allData" />
    </div>
    <div class="step-forward">
      <el-button size="small" type="success" @click="router.push('/talk')">返回会话</el-button>
      <el-button size="small" type="primary" @click="router.push('/step2')">下一步</el-button>
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
</style>
