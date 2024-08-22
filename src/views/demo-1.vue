<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import ColDemo from '@/views/col-demo.vue'
import SortableDemo from '@/views/sortablejs-demo.vue'
import PopoverDemo from '@/views/popover-demo.vue'
import { hide, startLoading } from '@/components/loading.js'
const router = useRouter()
const { proxy } = getCurrentInstance()
const loading = ref(true)
onMounted(() => {
  loading.value = false
})

const submit = async() => {
  startLoading(proxy.$refs['loadingRef'], { content: '查询中...', timeConsuming: 11 })
  // simulate AJAX
  await new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, 2000)
  })
  hide()
}

</script>

<template>
  <div v-loading="loading">
    <div ref="loadingRef" style="background-color: bisque;height: 500px;position: relative"></div>
    <el-button size="default" type="primary" @click="submit">vue-loading-overlay</el-button>
    <col-demo />
    <sortable-demo/>
    <popover-demo />
    <div class="step-forward">
      <el-button size="default" type="primary" @click="router.push('/step4')">上一步</el-button>
      <el-button size="default" type="primary" @click="router.push('/demo2')">demo-2</el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.step-forward{
  padding: 20px;
  text-align: right;
}
</style>
