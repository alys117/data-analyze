<script setup>
import MyStep from '@/components/my-step.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import DragDemo from '@/views/drag-demo.vue'
import XlsxDemo from '@/views/xlsx-demo.vue'
import SpanDemo from '@/views/span-demo.vue'
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
    <drag-demo/>
    <xlsx-demo/>
    <span-demo/>
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
