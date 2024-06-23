<script setup>
import MyStep from '@/components/my-step.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <div class="step-container">
    <my-step :step="3" />
  </div>
  <div class="step-forward">
    <el-button size="small" type="primary" @click="router.push('/step2')">上一步</el-button>
    <el-button size="small" type="type" @click="router.push('/step4')">下一步</el-button>
  </div>
</template>

<style scoped lang="scss">
.step-container{
  padding: 20px;
}
.step-forward{
  padding: 20px;
  text-align: right;
}
</style>
