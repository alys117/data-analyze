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
      <el-button size="default" type="primary" @click="router.push('/demo1')">demo-1</el-button>
      <el-button size="default" type="primary" @click="router.push('/base')">base</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-forward{
  padding: 20px;
  text-align: right;
}
</style>
