<script setup>
import MyStep from '@/components/my-step.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import TimeLine from '@/components/time-line.vue'
const router = useRouter()

const loading = ref(true)
onMounted(() => {
  loading.value = false
})
</script>

<template>
  <div v-loading="loading">
    <div class="step-container">
      <my-step :step="3" />
    </div>
    <time-line level="end"/>
    <div class="step-forward">
      <el-button size="default" type="primary" @click="router.push('/step2')">上一步</el-button>
      <el-button size="default" type="primary" @click="router.push('/step4')">下一步</el-button>
    </div>
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
