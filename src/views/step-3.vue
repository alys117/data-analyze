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
    <vxe-button size="mini" status="primary" content="上一步" @click="router.push('/step2')"></vxe-button>
    <vxe-button size="mini" status="primary" content="下一步" @click="router.push('/step4')"></vxe-button>
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
