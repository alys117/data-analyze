<script setup>
import MyStep from '@/components/my-step.vue'
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import ColDemo from '@/views/col-demo.vue'
import SortableDemo from '@/views/sortablejs-demo.vue'
import PopoverDemo from '@/views/popover-demo.vue'
const router = useRouter()

const loading = ref(true)
onMounted(() => {
  loading.value = false
})
</script>

<template>
  <div v-loading="loading">
    <col-demo/>
    <sortable-demo/>
    <popover-demo/>
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
