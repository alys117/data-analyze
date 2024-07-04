<script setup>
import XlsxDemo from '@/views/xlsx-demo.vue'
import DragDemo from '@/views/drag-demo.vue'
import SpanDemo from '@/views/span-demo.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

</script>

<template>
  <div>
    <drag-demo/>
    <xlsx-demo/>
    <span-demo/>
    <div class="step-forward">
      <el-button size="default" type="primary" @click="router.push('/step4')">上一步</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-forward{
  padding: 20px;
  text-align: right;
}
</style>
