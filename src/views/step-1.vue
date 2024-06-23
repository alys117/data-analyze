<script setup>
import MyStep from '@/components/my-step.vue'
import CusTable from '@/components/cus-table.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="step-container" >
    <my-step :step="1" />
  </div>
  <div class="cus-table-container">
    <cus-table :options="[{label: 'prop传入',value: 'prop实际值'}]" />
  </div>
  <div class="step-forward">
    <el-button size="small" type="success" @click="router.push('/talk')">返回会话</el-button>
    <el-button size="small" type="primary" @click="router.push('/step2')">下一步</el-button>
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
