<script setup>
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import ColDemo from '@/views/col-demo.vue'
import SortableDemo from '@/views/sortablejs-demo.vue'
import PopoverDemo from '@/views/popover-demo.vue'
const router = useRouter()

const loading = ref(true)
const colRef = ref(null)
onMounted(() => {
  loading.value = false
})

import { useLoading } from 'vue-loading-overlay'

const $loading = useLoading({
  // options
})
const tip = ref('step 1')
const submit = () => {
  const loader = $loading.show({
    // Pass props by their camelCased names
    container: colRef.value,
    canCancel: false, // default false
    onCancel: () => {
      console.log('canceled')
    },
    isFullPage: false,
    color: '#000000',
    loader: 'spinner',
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    opacity: 0.5,
    zIndex: 999
  },
  {
    // Pass slots by their names
    default: h('h2', null, `loading...${tip.value}`)
  }
  )
  setTimeout(() => {
    tip.value = 'step 2'
  }, 1000)
  // simulate AJAX
  setTimeout(() => {
    loader.hide()
  }, 3000)
}

</script>

<template>
  <div v-loading="loading">
    <div style="position: relative">
      <div ref="colRef" style="background-color: lightpink;height: 200px"></div>
    </div>
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
